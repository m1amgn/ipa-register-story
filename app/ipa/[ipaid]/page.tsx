'use client';

import React, { useEffect, useState, use } from 'react';
import { useAccount } from 'wagmi';
import LicenseDetails from '@/components/LicenseDetails';
import AddCommercialLicenseButton from '@/components/buttons/AddCommercialLicenseButton';
import { checksumAddress } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { getIPAMetadata } from '@/utils/get-data/getIPAMetadata';
import AssetDetails from '@/components/AssetDetails';
import { useParams } from 'next/navigation';
import { getParentIpCount } from '@/utils/get-data/getParentIpCount';
import ParentsList from '@/components/ParentsList';
import DerivativesList from '@/components/DerivativesList';
import { getDerivativeIpCount } from '@/utils/get-data/getDerivativeIpCount';


const AssetDetailsPage: React.FC = () => {
  const params = useParams();
  const { ipaid } = params as { ipaid: `0x${string}` };
  const { address, isConnected } = useAccount();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [parentIpCount, setParentIpCount] = useState<number>(0);
  const [derivativeIpCount, setDerivativeIpCount] = useState<number>(0);


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!ipaid || typeof ipaid !== 'string') {
          setError('Invalid IP asset ID.');
          setIsLoading(false);
          return;
        }

        const assetData = await getIPAMetadata(ipaid as `0x${string}`);

        if (address && checksumAddress(address) === checksumAddress(assetData.owner)) {
          setIsOwner(true);
        } else {
          setIsOwner(false);
        }

        if (!assetData) {
          setError('Asset not found.');
          setIsLoading(false);
          return;
        }

        const parentIpCountBigInt = await getParentIpCount(ipaid);
        const parentIpCount = Number(parentIpCountBigInt);
        setParentIpCount(parentIpCount);

        const derivativeIpCountBigInt = await getDerivativeIpCount(ipaid);
        const derivativeIpCount = Number(derivativeIpCountBigInt);
        setDerivativeIpCount(derivativeIpCount);

      } catch (err) {
        console.error('Error fetching asset metadata:', err);
        setError('Error fetching asset metadata.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [ipaid, address]);

  if (isLoading) {
    return <div className="text-center p-8">Loading your IP asset...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-gray-500">Error: {error || "Asset not found"}</div>;
  }

  return (
    <>
      <div className="flex justify-end mb-2 mt-4 mr-2">
        <ConnectButton />
      </div>
      {!isConnected && (
        <div className='flex text-gray-500 text-sm justify-end mb-2 mt-2 mr-3'>
          <p>Connect wallet to manage IP Asset</p>
        </div>
      )}
      <div className="container mx-auto pb-4 pt-2">
        <div className="container pb-6">
          <AssetDetails ipaid={ipaid} />
        </div>
        {parentIpCount !== 0 && derivativeIpCount === 0 && (
          <div
            className="bg-gray-100"
          >
            <h2 className="text-xl text-center font-bold mb-2">Parents</h2>
            <ParentsList ipaid={ipaid} assetsCount={parentIpCount} />
          </div>
        )}
        {derivativeIpCount !== 0 && parentIpCount === 0 && (
          <div
            className="bg-gray-100"
          >
            <h2 className="text-xl text-center font-bold mb-2">Derivatives</h2>
            <DerivativesList ipaid={ipaid} assetsCount={derivativeIpCount} />
          </div>
        )}
        {parentIpCount !== 0 && derivativeIpCount !== 0 && (
          <div
            className="bg-gray-100 grid grid-cols-2"
          >
            <div>
              <h2 className="text-xl font-bold mb-2">Parents</h2>
              <ParentsList ipaid={ipaid} assetsCount={parentIpCount} />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Derivatives</h2>
              <DerivativesList ipaid={ipaid} assetsCount={derivativeIpCount} />
            </div>
          </div>
        )}

        {isConnected ? (
          <div>
            <LicenseDetails ipaid={ipaid} isConnected={isConnected} isOwner={isOwner} showDerivativeButton={true} />
          </div>
        ) : (
          <div>
            <LicenseDetails ipaid={ipaid} isConnected={isConnected} isOwner={isOwner} showDerivativeButton={false} />
          </div>
        )}
        {parentIpCount === 0 && isConnected && address && isOwner && (
          <div className='text-left rounded mb-4'>
            <AddCommercialLicenseButton ipaid={ipaid} />
          </div>
        )}
      </div>
    </>
  );
};

export default AssetDetailsPage;
