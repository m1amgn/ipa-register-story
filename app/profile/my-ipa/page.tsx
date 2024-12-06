'use client';

import React from 'react';
import IPAssetsList from '@/components/assets-list/AssetsList';
import { useAccount } from 'wagmi';
import RegisterIpaButton from '@/components/buttons/RegisterIpaButton';


const MyIPAssets: React.FC = () => {
  const { address, isConnected } = useAccount();

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <div>
      <div className="bg-gray-100 p-8">
        {isConnected && address ? (
          <>
            <RegisterIpaButton />
            <IPAssetsList address={address} isDerivativeFlag={false} isNeedShowCommercial={true}/>
          </>
        ) : (
          <p className="text-center">Please connect your wallet to view your IP assets.</p>
        )}
      </div>
    </div>
  );
};

export default MyIPAssets;
