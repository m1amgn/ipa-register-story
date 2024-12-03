"use client";

import React, { useEffect, useState } from "react";
import { getNftContract } from "@/utils/api-utils/getNftContract";
import { getIPADataForAssetsList } from "@/utils/get-data/getIPADataForAssetsList";
import { getMyTokensAmount } from "@/utils/get-data/getMyTokensAmount";
import IPAssetCard from '@/components/AssetCard';

interface IPAsset {
  id: `0x${string}`;
  name: string;
  imageUrl: string;
  licenseId?: number;
}

interface IPAssetsListProps {
  address: `0x${string}`;
  isDerivativeFlag: boolean;
  isNeedShowCommercial: boolean;
}

const IPAssetsList: React.FC<IPAssetsListProps> = ({ address, isDerivativeFlag, isNeedShowCommercial }) => {
  const [ipAssets, setIpAssets] = useState<IPAsset[]>([]);
  const [tokensAmount, setTokensAmount] = useState<number | null>(null);
  const [showCommercialOnly, setShowCommercialOnly] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAllAssetsChecked, setIsAllAssetsChecked] = useState<boolean>(false);

  useEffect(() => {
    if (address) {
      getIPAseetsList();
    }
  }, [address]);

  if (!address) {
    return null;
  }

  const getIPAseetsList = async () => {
    try {
      setIsLoading(true);
      const nftContract = await getNftContract(address);
      if (nftContract) {
        await fetchIPAssets(nftContract);
      } else {
        console.error("Can't find NFT collection.");
      }
    } catch (error) {
      console.error("Error in fetching NFT contract", error);
    }
  };

  const fetchIPAssets = async (nftContractAddress: string) => {
    try {
      const tokensAmountBigInt = await getMyTokensAmount(
        nftContractAddress,
        address
      );
      const tokensAmount = Number(tokensAmountBigInt);

      if (tokensAmount === 0) {
        setIsLoading(false);
        setTokensAmount(tokensAmount);
        setIsAllAssetsChecked(true);
      }

      const assetPromises = Array.from({ length: tokensAmount }, (_, i) =>
        getIPADataForAssetsList(nftContractAddress, i + 1, isDerivativeFlag)
      );

      const maxConcurrent = 2;

      for (let i = 0; i < assetPromises.length; i += maxConcurrent) {
        const batch = assetPromises.slice(i, i + maxConcurrent);
        const batchResults = await Promise.all(batch);
        const newAssets = batchResults.filter(
          (asset): asset is IPAsset => asset !== null
        );
        setIpAssets((prevAssets) => {
          const allAssets = [...prevAssets, ...newAssets];
          const uniqueAssetsMap = new Map<string, IPAsset>();
          allAssets.forEach((asset) => {
            uniqueAssetsMap.set(asset.id, asset);
          });
          setIsLoading(false);
          return Array.from(uniqueAssetsMap.values());
        });
        if (i === 0) setIsLoading(false);
      }
      setIsAllAssetsChecked(true);
    } catch (error) {
      console.error("Error in fetching IPA:", error);
      setIsLoading(false);
      setIsAllAssetsChecked(true);
    }
  };

  const filteredAssets = showCommercialOnly
    ? ipAssets.filter((asset) => asset.licenseId && asset.licenseId !== 1)
    : ipAssets;

  return (
    <div>
      {isLoading && ipAssets.length === 0 ? (
        <div className="text-center p-8">Loading...</div>
      ) : isDerivativeFlag && isAllAssetsChecked && ipAssets.length === 0 ? (
        <div className="text-center p-8">No derivatives found</div>
      ) : tokensAmount === 0 ? (
        <div className="text-center p-8">No assets found</div>
      ) : (
        <>
          {!isDerivativeFlag && (
            <div className="flex justify-end">
              <button
                onClick={() => setShowCommercialOnly(!showCommercialOnly)}
                className="bg-gray-600 text-white font-semibold px-4 py-2 mb-2 rounded hover:bg-indigo-700 transition-colors"
              >
                {showCommercialOnly ? "Show all" : "Show only commercial"}
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredAssets.map((asset, index) => (
              <IPAssetCard
                key={`${asset.id}-${index}`}
                IPAssetDetails={asset}
                index={index}
                isNeedShowCommercial={isNeedShowCommercial} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default IPAssetsList;
