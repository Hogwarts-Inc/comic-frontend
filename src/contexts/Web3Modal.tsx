'use client';

import React from 'react';

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';

const projectId = 'c577d5a940b01da900138756f9d0b946';

const testnet = {
  chainId: 80001,
  name: 'Polygon',
  currency: 'MATIC',
  explorerUrl: process.env.NEXT_PUBLIC_POLYGONSCAN_URL ?? '',
  rpcUrl: process.env.NEXT_PUBLIC_QUICKNODE_HTTP_ENDPOINT ?? '',
};

const metadata = {
  name: 'La historieta mas larga del mundo',
  description: '',
  url: process.env.NEXT_PUBLIC_BASE_URL ?? '',
  icons: [''],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [testnet],
  projectId,
});

export function Web3ModalProvider({ children }: { children: React.ReactNode }) {
  return children;
}
