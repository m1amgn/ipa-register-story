'use client';

import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import LicenseDetails from '@/components/asset-details/LicenseDetails';
import AddCommercialLicenseButton from '@/components/buttons/AddCommercialLicenseButton';
import { checksumAddress } from 'viem';
import { getIPAMetadata } from '@/utils/get-data/assets/getIPAMetadata';
import AssetDetails from '@/components/asset-details/AssetDetails';
import { useParams } from 'next/navigation';
import { getParentIpCount } from '@/utils/get-data/parents/getParentIpCount';
import ParentsList from '@/components/assets-list/ParentsList';
import DerivativesList from '@/components/assets-list/DerivativesList';
import { getDerivativeIpCount } from '@/utils/get-data/derivatives/getDerivativeIpCount';


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
    return <div className="text-center p-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-gray-500">Error: {error || "Asset not found"}</div>;
  }

  return (
    <div className="flex flex-col flex-grow h-full">
      {!isConnected && (
        <div className="flex text-red-800 text-sm font-bold justify-end mt-6 mr-6">
          <p>Connect wallet to manage IP Asset</p>
        </div>
      )}
      <div className="flex flex-col flex-grow h-full container mx-auto pt-2">
        <AssetDetails ipaid={ipaid} />
        {parentIpCount !== 0 && derivativeIpCount === 0 && (
          <div className="bg-gray-100 border-solid border-y-2 border-gray-300">
            <ParentsList ipaid={ipaid} assetsCount={parentIpCount} />
          </div>
        )}
        {derivativeIpCount !== 0 && parentIpCount === 0 && (
          <div className="bg-gray-100 border-solid border-y-2 border-gray-300">
            <DerivativesList ipaid={ipaid} assetsCount={derivativeIpCount} />
          </div>
        )}
        {parentIpCount !== 0 && derivativeIpCount !== 0 && (
          <div className="bg-gray-100 grid grid-cols-2 border-solid border-y-2 border-gray-300">
            <div>
              <ParentsList ipaid={ipaid} assetsCount={parentIpCount} />
            </div>
            <div>
              <DerivativesList ipaid={ipaid} assetsCount={derivativeIpCount} />
            </div>
          </div>
        )}
        {parentIpCount === 0 && isConnected && address && isOwner && (
          <div className="text-center rounded mt-10 mb-4">
            <AddCommercialLicenseButton ipaid={ipaid} />
          </div>
        )}
        {isConnected ? (
          <div className='flex flex-col flex-grow h-full'>
            <LicenseDetails
              ipaid={ipaid}
              isConnected={isConnected}
              isOwner={isOwner}
              showDerivativeButton={true}
            />
          </div>
        ) : (
          <div className='flex flex-col flex-grow h-full'>
            <LicenseDetails
              ipaid={ipaid}
              isConnected={isConnected}
              isOwner={isOwner}
              showDerivativeButton={false}
            />
          </div>
        )}

      </div>
    </div>
  );



};

export default AssetDetailsPage;
