"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Abi } from "viem";
import { readContracts } from "@/utils/get-data/readContracts";
import { spgTokenContractAbi } from "@/abi/spgTokenContract";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import {
  IPAssetRegistryContractAddress,
  IPAssetRegistryContractABI,
} from "@/abi/IPAssetRegistry";

import { getNftContract } from "@/utils/api-utils/getNftContract";
import { getLicenseTermsData } from "@/utils/get-data/getLicenseTermsData";
import { getNameAndImageIPA } from "@/utils/get-data/getNameAndImageIPA";

interface IPAsset {
  id: string;
  name: string;
  imageUrl: string;
  licenseId?: number;
}

interface IPAssetsListProps {
  address: `0x${string}`;
}

const IPAssetsList: React.FC<IPAssetsListProps> = ({ address }) => {
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
      const tokensQuantityBigInt = await getTokensQuantity(
        nftContractAddress,
        address
      );
      const tokensQuantity = Number(tokensQuantityBigInt);

      if (!tokensQuantity) {
        throw new Error("There is no token in NFT contract");
      }

      const assetPromises = Array.from({ length: tokensQuantity }, (_, i) =>
        fetchIPAssetData(nftContractAddress, i + 1)
      );

      const maxConcurrent = 5;

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

  const getTokensQuantity = async (
    nftContractAddress: string,
    address: `0x${string}`
  ): Promise<BigInt> => {
    const quantity = await readContracts(
      nftContractAddress as `0x${string}`,
      spgTokenContractAbi as Abi,
      "balanceOf",
      [address]
    );
    return quantity as BigInt;
  };

  const fetchIPAssetData = async (
    nftContractAddress: string,
    index: number
  ): Promise<IPAsset | null> => {
    try {
      const id = await fetchIPAssetId(nftContractAddress, index);
      const [{ name, imageUrl }, licenses] = await Promise.all([
        getNameAndImageIPA(id as `0x${string}`),
        getLicenseTermsData(id as `0x${string}`),
      ]);
      const mainLicense = licenses[0];

      return {
        id,
        name,
        imageUrl,
        licenseId: mainLicense ? parseInt(mainLicense.id, 10) : undefined,
      };
    } catch (error) {
      console.error(`Error in fetching data for index ${index}:`, error);
      return null;
    }
  };

  const fetchIPAssetId = async (
    nftContractAddress: string,
    index: number
  ): Promise<string> => {
    return (await readContracts(
      IPAssetRegistryContractAddress as `0x${string}`,
      IPAssetRegistryContractABI as Abi,
      "ipId",
      [process.env.NEXT_PUBLIC_X_CHAIN, nftContractAddress, index]
    )) as string;
  };

  const filteredAssets = showCommercialOnly
    ? ipAssets.filter((asset) => asset.licenseId && asset.licenseId !== 1)
    : ipAssets;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowCommercialOnly(!showCommercialOnly)}
          className="bg-gray-600 text-white font-semibold mt-4 px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
        >
          {showCommercialOnly
            ? "Show all"
            : "Show only commercial"}
        </button>
      </div>
      {filteredAssets.length === 0 && (
        <div className="text-center p-8">Loading...</div>
      )}
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={1}
        slidesPerView={2}
        className="mb-2"
      >
        {filteredAssets.map((asset, index) => (
          <SwiperSlide key={`${asset.id}-${index}`}>
            <div
              className="bg-white rounded p-4 mr-10 ml-10 cursor-pointer"
              onClick={() => router.push(`/ipa/${asset.id}`)}
            >
              <div className="relative w-full h-48 md:h-64 lg:h-80">
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
                  priority={index < 2}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading={index < 2 ? undefined : "lazy"}
                />
              </div>
              <h2 className="text-xl text-center font-bold mb-2">
                {asset.name}
              </h2>
              {asset.licenseId && asset.licenseId !== 1 && (
                <p className="text-gray-600 text-center">
                  (commercial license)
                </p>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default IPAssetsList;
