import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { apiNft } from '../../src/services/api';

export interface TransferNFTData {
  tokenId: string;
  fromAddress: string;
  toAddress: string;
  userToken: string;
  chain: string;
  tokenMintAddress: string;
}

interface TransferNFTResponse {
  message?: string;
  transactionId?: string;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CROSSMINT_API_URL,
  headers: {
    'X-API-KEY': process.env.CROSSMINT_API_KEY as string,
    'Content-Type': 'application/json',
  },
});

async function postCrossmintTransfer(data: TransferNFTData): Promise<TransferNFTResponse> {
  try {
    console.log({ api: process.env.CROSSMINT_API_KEY });

    const response = await api.post<TransferNFTResponse>('/transfer', data);

    if (response.status === 200 && response.data.transactionId) {
      await apiNft.postNftTransfers(
        data.tokenId,
        data.toAddress,
        data.fromAddress,
        response.data.transactionId,
        data.userToken,
      );
    }
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export default async (req: NextApiRequest, res: NextApiResponse<TransferNFTResponse | string>) => {
  if (req.method === 'POST') {
    const data = JSON.parse(req.body) as TransferNFTData;

    await postCrossmintTransfer(data)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        console.error('Error transferring NFT:', error);
        res.status(500).json({ message: 'Error transferring NFT' });
      });
    return;
  }

  res.status(404).send('Not found');
};
