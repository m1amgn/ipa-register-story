"use client";

import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';
import IPAssetsList from '@/components/AssetsList';
import { useAccount } from 'wagmi';

const MyDerivatives: React.FC = () => {
  const { address, isConnected } = useAccount();

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="flex justify-end">
          <ConnectButton />
        </div>
        {isConnected && address ? (
          <>
            <h1 className="text-3xl font-bold text-center mb-8">My Derivatives</h1>
            <IPAssetsList address={address} isDerivativeFlag={true} isNeedShowCommercial={false} />
          </>
        ) : (
          <p className="text-center">Please connect your wallet to view your Derivatives.</p>
        )}
      </div>
    </div>
  );
};

export default MyDerivatives;

