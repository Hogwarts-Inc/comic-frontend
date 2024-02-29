/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

export interface ImagesQuery {
  prompt: string;
}
export default async (
  req: NextApiRequest,
  res: NextApiResponse<{ data: { url?: string }[] } | { message: string; error: any }>,
) => {
  if (req.method === 'GET') {
    const { prompt } = req.query;
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });

    openai.images
      .generate({ prompt: prompt as string, model: 'dall-e-2', n: 1 })
      .then(response => res.status(200).json(response))
      .catch(error => {
        console.error('Error transferring NFT:', error);
        res.status(500).json({ message: 'Error getting images', error });
      });
    return;
  }
  res.status(404).send({ message: 'Not Found', error: '' });
};
