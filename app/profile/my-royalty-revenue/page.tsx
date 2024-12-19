"use client";

import React, { useEffect, useState } from "react";
import { getNftContractByAddress } from "@/utils/api-utils/getNftContractByAddress";
import { getMyTokensAmount } from "@/utils/get-data/assets/getMyTokensAmount";
import { useAccount, useWalletClient } from "wagmi";
import { getNameAndImageIPA } from "@/utils/get-data/assets/getNameAndImageIPA";
import { getIPAssetId } from "@/utils/get-data/assets/getIPAssetId";
import { royaltyModuleContractABI, royaltyModuleContractAddress } from "@/utils/contracts/royaltyModuleContract";
import { setupStoryClient } from "@/utils/resources/storyClient";
import { vaultContractABI } from "@/utils/contracts/vaultContract";
import { getLogsFromMintAndRegisterIpAndMakeDerivativeEvent } from "@/utils/get-data/royalty/getLogsFromMintAndRegisterIpAndMakeDerivativeEvent";
import { getIpRoyaltyVault } from "@/utils/get-data/royalty/getIpRoyaltyVault";
import { getRevenuesAddedToVaultLogs } from "@/utils/get-data/royalty/getRevenuesAddedToVaultLogs";
import { currencyTokensAddress } from "@/utils/resources/currencyTokenAddress";
import Image from "next/image";
import dynamic from "next/dynamic";
import { encodeFunctionData } from "viem";
import { SUSDContractABI, SUSDContractAddress } from "@/utils/contracts/SUSDContract";

const AssetDetails = dynamic(() => import('@/components/asset-details/AssetDetails'), {
  ssr: false,
});

interface RevenueItem {
  childIpId: `0x${string}`;
  amount: bigint;
  token: `0x${string}`;
}

interface IPAsset {
  id: `0x${string}`;
  name: string;
  imageUrl: string;
  revenue?: RevenueItem[];
}

const IPAssetsRoyaltyList: React.FC = () => {
  const [ipAssets, setIpAssets] = useState<IPAsset[]>([]);
  const [tokensAmount, setTokensAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAllAssetsChecked, setIsAllAssetsChecked] = useState<boolean>(false);
  const { address, isConnected } = useAccount();
  const [assetData, setAssetData] = useState<`0x${string}` | null>(null);
  const [selectedToken, setSelectedToken] = useState<`0x${string}` | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { data: wallet } = useWalletClient();

  useEffect(() => {
    if (isConnected && address) {
      setIpAssets([]);
      setTokensAmount(null);
      setIsAllAssetsChecked(false);
      setIsLoading(true);
      getIPAseetsList(address);
    }
  }, [isConnected, address]);

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

        const newAssets = batchResults.filter((asset): asset is IPAsset =>
          asset !== null && (asset.revenue?.length ?? 0) > 0
        );

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

  async function getRevenue(ipId: `0x${string}`) {
    const royaltyVaultIpIdAddress = await getIpRoyaltyVault(
      royaltyModuleContractAddress,
      royaltyModuleContractABI,
      ipId
    );

    const revenues = await getRevenuesAddedToVaultLogs(
      0 as number,
      "latest",
      royaltyVaultIpIdAddress as `0x${string}`,
      vaultContractABI
    );

    const revenueData = await Promise.all(
      revenues.map(async ({ transactionHash, args }) => {
        const { amount, token } = args as { amount: bigint; token: `0x${string}` };
        const childIpId = await getLogsFromMintAndRegisterIpAndMakeDerivativeEvent(transactionHash);

        if (childIpId) {
          return { childIpId, amount, token };
        }
        return null;
      })
    );
    return revenueData.filter((rev): rev is RevenueItem => rev !== null);
  }

  async function getIPADataForAssetsList(
    nftContractAddress: string,
    index: number
  ): Promise<IPAsset | null> {
    try {
      const id = await getIPAssetId(nftContractAddress, index);
      const [{ name, imageUrl }] = await Promise.all([
        getNameAndImageIPA(id as `0x${string}`),
      ]);

      const revenues = await getRevenue(id as `0x${string}`);

      if (!revenues || revenues.length === 0) {
        return null;
      }

      return {
        id,
        name,
        imageUrl,
        revenue: revenues,
      };
    } catch (error) {
      console.error("Error in fetching data for index " + index + ":", error);
      return null;
    }
  }

  const handleCardClick = async (asset: `0x${string}`) => {
    try {
      setSelectedToken(asset);
      setAssetData(null);
      setError(null);
      setAssetData(asset);
    } catch (err) {
      console.error("Error fetching token asset data:", err);
      setError("Failed to load asset details.");
    }
  };

  const handleClaimRoyaltyRevenue = async (
    parentIpId: `0x${string}`,
    childIpId: `0x${string}`,
    token: `0x${string}`,
    amount: bigint
  ) => {
    if (!isConnected || !address) {
      setError("Please connect your wallet.");
      alert(`Error: ${error}`);
      return;
    }

    if (!wallet) {
      setError("Error: wallet not found. Please try again.");
      alert(`Error: ${error}`);
      return;
    }

    const client = setupStoryClient(wallet);
    if (!client) {
      setError("Error initializing StoryClient.");
      alert(`Error: ${error}`);
      return;
    }
    try {

      // const claimRevenue = await client.royalty.transferToVaultAndSnapshotAndClaimByTokenBatch({
      //   ancestorIpId: parentIpId,
      //   claimer: ancestorIpId,
      //   royaltyClaimDetails: [{
      //     childIpId: childIpId,
      //     royaltyPolicy: "0x28b4F70ffE5ba7A26aEF979226f77Eb57fb9Fdb6",
      //     currencyToken: token,
      //     amount: 300000000000000000
      //   }],
      //   txOptions: { waitForTransaction: true },
      // });
      // console.log(`Claimed ${claimRevenue.amountsClaimed} revenue at snapshotId ${claimRevenue.snapshotId}`)

      const calldata = encodeFunctionData({
        abi: SUSDContractABI,
        functionName: "transfer",
        args: ["0x4C796dAA70F4572A580C19aed0c13019cD8FcE20" as `0x${string}`, BigInt(300000000000000000)]
      });

      const transfer = await client?.ipAccount.execute({
        ipId: parentIpId,
        to: SUSDContractAddress,
        value: 0,
        data: calldata,
        txOptions: { waitForTransaction: true },
      })

      console.log(transfer);

    } catch (err) {
      console.error("Error:", err);
      setError("Failed to load asset details.");
    }
  };

  function getTokenNameByAddress(address: `0x${string}`): string {
    const entry = Object.entries(currencyTokensAddress).find(([, addr]) => addr.toLowerCase() === address.toLowerCase());
    return entry ? entry[0] : address;
  }

  if (!isConnected || !address) {
    return (
      <div className="p-8 text-center text-gray-700">
        Please connect your wallet to view revenue streams.
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-lg font-bold text-gray-800 text-center m-8">Minting fees revenue</h1>
      {isLoading && ipAssets.length === 0 ? (
        <div className="text-center p-8 text-gray-600">Loading your assets...</div>
      ) : isAllAssetsChecked && ipAssets.length === 0 ? (
        <div className="text-center p-8 text-gray-600">No revenue streams found</div>
      ) : tokensAmount === 0 ? (
        <div className="text-center p-8 text-gray-600">No revenue streams found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {ipAssets.map((asset) => (
            <div
              key={asset.id}
              className="border border-gray-200 p-4 rounded-md shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
            >
              <div
                className="relative mb-4 w-full h-48 flex justify-left items-center bg-gray-100 rounded"
                onClick={() => handleCardClick(asset.id)}
              >
                <Image
                  src={
                    asset.imageUrl.startsWith("ipfs://")
                      ? asset.imageUrl.replace("ipfs://", "https://ipfs.io/ipfs/")
                      : asset.imageUrl
                  }
                  alt={asset.name}
                  width={200}
                  height={200}
                  className="object-contain h-auto w-auto max-h-full max-w-full cursor-pointer"
                  title="View asset details"
                />
              </div>
              <a
                target="_blank"
                href={`/ipa/${asset.id}`}
                rel="noopener noreferrer"
                className="block rounded cursor-pointer">
                <h3 className="text-lg font-semibold text-gray-800 truncate cursor-pointer  hover:underline hover:text-gray-600"
                  title="Go to asset page"
                >
                  {asset.name || "Unnamed Asset"}
                </h3></a>

              {(asset.revenue?.length ?? 0) > 0 ? (
                <div className="mt-4 text-sm text-gray-700">
                  <h3 className="font-bold mb-2">Revenue Streams:</h3>
                  {asset.revenue!.map((rev, idx) => {
                    const tokenName = getTokenNameByAddress(rev.token);
                    const amountFormatted = (Number(rev.amount) / 10 ** 18).toFixed(3);
                    return (
                      <div key={idx} className="mb-4 border-b border-gray-100 pb-4">
                        <p
                          className="underline cursor-pointer text-indigo-600 hover:text-indigo-800"
                          onClick={() => handleCardClick(rev.childIpId)}
                          title="View child IP asset details"
                        >
                          Child IP Asset
                        </p>
                        <p className="text-gray-600 mt-1">
                          Amount: <span className="font-semibold">{amountFormatted} {tokenName}</span>
                        </p>
                        <button
                          className="mt-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClaimRoyaltyRevenue(asset.id, rev.childIpId, rev.token, rev.amount);
                          }}
                        >
                          Claim Revenue
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-2 text-sm text-gray-500">No revenue</p>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedToken && assetData && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
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
                <AssetDetails ipaid={assetData} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IPAssetsRoyaltyList;
