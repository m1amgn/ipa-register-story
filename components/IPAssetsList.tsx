"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getNftContract } from "@/utils/api-utils/getNftContract";
import { getIPADataForAssetsList } from "@/utils/get-data/getIPADataForAssetsList";
import { getMyTokensAmount } from "@/utils/get-data/getMyTokensAmount";

interface IPAsset {
  id: `0x${string}`;
  name: string;
  imageUrl: string;
  licenseId?: number;
}

interface IPAssetsListProps {
  address: `0x${string}`;
  isDerivativeFlag: boolean;
}

const IPAssetsList: React.FC<IPAssetsListProps> = ({ address, isDerivativeFlag }) => {
  const [ipAssets, setIpAssets] = useState<IPAsset[]>([]);
  const [showCommercialOnly, setShowCommercialOnly] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (address) {
      fetchNFTContract();
    }
  }, [address]);

  const fetchNFTContract = async () => {
    try {
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
      const tokensQuantityBigInt = await getMyTokensAmount(
        nftContractAddress,
        address
      );
      const tokensQuantity = Number(tokensQuantityBigInt);

      if (!tokensQuantity) {
        throw new Error("There is no token in NFT contract");
      }

      const assetPromises = Array.from({ length: tokensQuantity }, (_, i) =>
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

          return Array.from(uniqueAssetsMap.values());
        });
      }
    } catch (error) {
      console.error("Error in fetching IPA:", error);
    }
  };

  const filteredAssets = showCommercialOnly
    ? ipAssets.filter((asset) => asset.licenseId && asset.licenseId !== 1)
    : ipAssets;

  return (
    <div>
      {
        !isDerivativeFlag && (
          <div className="flex justify-end">
            <button
              onClick={() => setShowCommercialOnly(!showCommercialOnly)}
              className="bg-gray-600 text-white font-semibold px-4 py-2 mb-2 rounded hover:bg-indigo-700 transition-colors"
            >
              {showCommercialOnly ? "Show all" : "Show only commercial"}
            </button>
          </div>
        )
      }
      {filteredAssets.length === 0 && (
        <div className="text-center p-8">Loading...</div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset, index) => (
          <div
            key={asset.id}
            className="bg-white rounded p-4 cursor-pointer hover:bg-gray-300"
            onClick={() => router.push(`/ipa/${asset.id}`)}
          >
            <div className="relative w-full h-48 md:h-64">
              <Image
                src={
                  asset.imageUrl.startsWith("ipfs://")
                    ? asset.imageUrl.replace(
                      "ipfs://",
                      "https://ipfs.io/ipfs/"
                    )
                    : asset.imageUrl
                }
                alt={asset.name}
                fill
                className="object-contain rounded"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index < 2}
                loading={index < 2 ? undefined : "lazy"}
              />
            </div>
            <h2 className="text-xl text-center font-bold mb-2">{asset.name}</h2>
            {asset.licenseId && asset.licenseId !== 1 && (
              <p className="text-gray-600 text-center">(commercial license)</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IPAssetsList;
