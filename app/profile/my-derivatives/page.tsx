"use client";

import React from 'react';
import IPAssetsList from '@/components/assets-list/AssetsList';
import { useAccount } from 'wagmi';

const MyDerivatives: React.FC = () => {
  const { address, isConnected } = useAccount();

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <div>
      <div className="bg-gray-100 p-8">
        {isConnected && address ? (
          <div className='mt-16'>
            <IPAssetsList address={address} isDerivativeFlag={true} isNeedShowCommercial={false} />
          </div>
        ) : (
          <p className="text-center">Please connect your wallet to view your Derivatives.</p>
        )}
      </div>
    </div>
  );
};

export default MyDerivatives;

