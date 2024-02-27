import axios from 'axios';

import { apiNft } from '../../../src/services/api';

interface TransferNFTData {
  tokenId: string;
  fromAddress: string;
  toAddress: string;
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

export async function postCrossmintTransfer(data: TransferNFTData): Promise<TransferNFTResponse> {
  try {
    const response = await api.post<TransferNFTResponse>('/transfer', data);

    if (response.status === 200 && response.data.transactionId) {
      await apiNft.postNftTransfers(
        data.tokenId,
        data.toAddress,
        data.fromAddress,
        response.data.transactionId,
      );
    }
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
