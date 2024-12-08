"use client";

import React, { useEffect, useState } from "react";
import { getNftContractByAddress } from "@/utils/api-utils/getNftContractByAddress";
import { getIPADataForAssetsList } from "@/utils/get-data/assets/getIPADataForAssetsList";
import { getMyTokensAmount } from "@/utils/get-data/assets/getMyTokensAmount";
import IPAssetCard from '@/components/asset-details/AssetCard';

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
      setIpAssets([]);
      setTokensAmount(null);
      setIsAllAssetsChecked(false);
      setIsLoading(true);
      getIPAseetsList();
    }
  }, [address, isDerivativeFlag]);

  if (!address) {
    return null;
  }

  const getIPAseetsList = async () => {
    try {
      setIsLoading(true);
      const nftContract = await getNftContractByAddress(address);
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
            <div className="flex justify-end m-4">
              <label className="inline-flex items-center cursor-pointer w-fit p-2 rounded">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={showCommercialOnly}
                    onChange={() => setShowCommercialOnly(!showCommercialOnly)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer-checked:bg-indigo-600 peer transition-colors duration-300"></div>
                  <div className="absolute top-[2px] left-[2px] bg-white w-5 h-5 rounded-full border border-gray-300 transition-all duration-300 transform peer-checked:translate-x-full"></div>
                </div>
                <span className="ml-3 text-sm font-medium text-gray-700 select-none">
                  Show only commercial
                </span>
              </label>
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
