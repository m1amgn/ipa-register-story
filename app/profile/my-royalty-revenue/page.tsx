"use client";

import React, { useEffect, useState } from "react";
import { getNftContractByAddress } from "@/utils/api-utils/getNftContractByAddress";
import { getMyTokensAmount } from "@/utils/get-data/assets/getMyTokensAmount";
import { useAccount } from "wagmi";
import { getNameAndImageIPA } from "@/utils/get-data/assets/getNameAndImageIPA";
import { getIPAssetId } from "@/utils/get-data/assets/getIPAssetId";
import { readContracts } from "@/utils/get-data/readContracts";
import { Abi } from "viem";
import { royaltyModuleContractABI, royaltyModuleContractAddress } from "@/utils/contracts/royaltyModuleContract";
import Image from "next/image";
import AssetDetails from "@/components/asset-details/AssetDetails";

interface IPAsset {
  id: `0x${string}`;
  name: string;
  imageUrl: string;
  revenue?: bigint;
}

const IPAssetsList: React.FC = () => {
  const [ipAssets, setIpAssets] = useState<IPAsset[]>([]);
  const [tokensAmount, setTokensAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAllAssetsChecked, setIsAllAssetsChecked] = useState<boolean>(false);
  const { address, isConnected } = useAccount();

  const [assetData, setAssetData] = useState<any | null>(null);
  const [selectedToken, setSelectedToken] = useState<IPAsset | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Новое состояние для отображения только тех ассетов, у которых есть ревенью
  const [showOnlyClaimable, setShowOnlyClaimable] = useState<boolean>(false);

  useEffect(() => {
    if (isConnected && address) {
      setIpAssets([]);
      setTokensAmount(null);
      setIsAllAssetsChecked(false);
      setIsLoading(true);
      getIPAseetsList(address);
    }
  }, [isConnected, address]);

  const getTotalRevenueTokensReceived = async (
    royaltyModuleAddress: `0x${string}`,
    royaltyModuleAbi: Abi,
    ipId: `0x${string}`
  ): Promise<bigint> => {
    return (await readContracts(
      royaltyModuleAddress,
      royaltyModuleAbi,
      "totalRevenueTokensReceived",
      [ipId, "0xC0F6E387aC0B324Ec18EAcf22EE7271207dCE3d5"]
    )) as bigint;
  };

  async function getIPAseetsList(walletAddress: `0x${string}`) {
    try {
      setIsLoading(true);
      const nftContract = await getNftContractByAddress(walletAddress);
      if (nftContract) {
        await fetchIPAssets(nftContract, walletAddress);
      } else {
        console.error("Can't find NFT collection.");
      }
    } catch (error) {
      console.error("Error in fetching NFT contract", error);
      setIsLoading(false);
    }
  }

  async function fetchIPAssets(nftContractAddress: string, walletAddress: `0x${string}`) {
    try {
      const tokensAmountBigInt = await getMyTokensAmount(nftContractAddress, walletAddress);
      const tokensAmount = Number(tokensAmountBigInt);

      if (tokensAmount === 0) {
        setIsLoading(false);
        setTokensAmount(tokensAmount);
        setIsAllAssetsChecked(true);
        return;
      }

      const assetPromises = Array.from({ length: tokensAmount }, (_, i) =>
        getIPADataForAssetsList(nftContractAddress, i + 1)
      );

      const maxConcurrent = 2;
      for (let i = 0; i < assetPromises.length; i += maxConcurrent) {
        const batch = assetPromises.slice(i, i + maxConcurrent);
        const batchResults = await Promise.all(batch);
        const newAssets = batchResults.filter((asset): asset is IPAsset => asset !== null);

        setIpAssets((prevAssets) => {
          const allAssets = [...prevAssets, ...newAssets];
          const uniqueAssetsMap = new Map<string, IPAsset>();
          allAssets.forEach((asset) => {
            uniqueAssetsMap.set(asset.id, asset);
          });
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
  }

  async function getIPADataForAssetsList(
    nftContractAddress: string,
    index: number,
  ): Promise<IPAsset | null> {
    try {
      const id = await getIPAssetId(nftContractAddress, index);
      const [{ name, imageUrl }] = await Promise.all([
        getNameAndImageIPA(id as `0x${string}`),
      ]);

      const revenue = await getTotalRevenueTokensReceived(
        royaltyModuleContractAddress,
        royaltyModuleContractABI,
        id as `0x${string}`
      );

      return {
        id,
        name,
        imageUrl,
        revenue
      };
    } catch (error) {
      console.error(`Error in fetching data for index ${index}:`, error);
      return null;
    }
  }

  const handleCardClick = async (asset: IPAsset) => {
    try {
      setSelectedToken(asset);
      setAssetData(null);
      setError(null);
      // Тут можно выполнить дополнительную логику загрузки данных об ассете, если необходимо.
      // Сейчас просто передадим asset:
      setAssetData(asset);
    } catch (err) {
      console.error("Error fetching token asset data:", err);
      setError("Failed to load asset details.");
    }
  };

  if (!isConnected || !address) {
    return (
      <div>
        <p className="text-center">Please connect your wallet to view your IP assets.</p>
      </div>
    );
  }

  const filteredAssets = showOnlyClaimable
    ? ipAssets.filter(asset => (asset.revenue ?? BigInt(0)) > BigInt(0))
    : ipAssets;

  return (
    <div>
      {isLoading && ipAssets.length === 0 ? (
        <div className="text-center p-8">Loading...</div>
      ) : isAllAssetsChecked && ipAssets.length === 0 ? (
        <div className="text-center p-8">No derivatives found</div>
      ) : tokensAmount === 0 ? (
        <div className="text-center p-8">No assets found</div>
      ) : (
        <>
          <div className="flex justify-end m-8 ml-16">
            <label className="inline-flex items-center cursor-pointer w-fit p-2">
              <div className="relative">
                <input
                  type="checkbox"
                  id="showClaimable"
                  checked={showOnlyClaimable}
                  onChange={() => setShowOnlyClaimable(!showOnlyClaimable)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer-checked:bg-indigo-600 peer transition-colors duration-300"></div>
                <div className="absolute top-[2px] left-[2px] bg-white w-5 h-5 rounded-full border border-gray-300 transition-all duration-300 transform peer-checked:translate-x-full"></div>
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700 select-none">Show assets with claimable revenue</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2 m-8 ml-16">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className="border p-4 rounded-md cursor-pointer text-left hover:bg-gray-300 flex items-center"
                onClick={() => handleCardClick(asset)}
              >
                <Image
                  src={
                    asset.imageUrl.startsWith("ipfs://")
                      ? asset.imageUrl.replace("ipfs://", "https://ipfs.io/ipfs/")
                      : asset.imageUrl
                  }
                  alt={asset.name}
                  width={180}
                  height={180}
                  className="object-contain rounded mr-4"
                />
                <div>
                  <h2 className="text-lg font-bold">{asset.name || "Unnamed Asset"}</h2>
                  <p>Claimable revenue: <span>{asset.revenue?.toString() ?? "0"}</span></p>
                  {asset.revenue && asset.revenue > BigInt(0) && (
                    <button
                      className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      Claim revenue
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedToken && assetData && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedToken(null);
              setAssetData(null);
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={() => {
                setSelectedToken(null);
                setAssetData(null);
              }}
            >
              ✕
            </button>
            {error ? (
              <p className="text-gray-500">{error}</p>
            ) : (
              <>
                <AssetDetails ipaid={assetData.id} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IPAssetsList;
