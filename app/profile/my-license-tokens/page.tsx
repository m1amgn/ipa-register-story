"use client";

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { readContracts } from "@/utils/get-data/readContracts";
import { licenseTokenContractAddress, licenseTokenContractABI } from "@/utils/contracts/licenseTokenContract";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { getIPAMetadata } from "@/utils/get-data/getIPAMetadata";
import { getNameAndImageIPA } from "@/utils/get-data/getNameAndImageIPA";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';

const AssetDetails = dynamic(() => import('@/components/AssetDetails'), {
    ssr: false,
});

const LicenseDetails = dynamic(() => import('@/components/LicenseDetails'), {
    ssr: false,
});


type LicenseTokenMetadata = {
    tokenId: string;
    licensorIpId: `0x${string}`;
    licenseTemplate: `0x${string}`;
    licenseTermsId: BigInt;
    transferable: boolean;
    name: string;
    imageUrl: string;
};

const MyLicenseTokensPage = () => {
    const { address, isConnected } = useAccount();
    const [metadataList, setMetadataList] = useState<LicenseTokenMetadata[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedToken, setSelectedToken] = useState<LicenseTokenMetadata | null>(null);
    const [tokenAssetData, setTokenAssetData] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();


    const fetchLicenseTokensBalanceOf = async () => {
        if (!isConnected || !address) return BigInt(0);
        try {
            return await readContracts(licenseTokenContractAddress, licenseTokenContractABI, "balanceOf", [address]);
        } catch (error) {
            console.error("Error in balanceOf:", error);
            return BigInt(0);
        }
    };

    const fetchMetadata = async () => {
        if (!isConnected || !address) {
            setLoading(false);
            setError("Wallet is not connected.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const balance = await fetchLicenseTokensBalanceOf();
            if (balance === BigInt(0)) {
                setMetadataList([]);
                return;
            }

            const metadataArray = await Promise.all(
                Array.from({ length: Number(balance) }, (_, index) => BigInt(index)).map(async (i) => {
                    const tokenId = await readContracts(
                        licenseTokenContractAddress,
                        licenseTokenContractABI,
                        "tokenOfOwnerByIndex",
                        [address, i]
                    );
                    const metadata = await readContracts(
                        licenseTokenContractAddress,
                        licenseTokenContractABI,
                        "getLicenseTokenMetadata",
                        [tokenId]
                    );

                    const { name, imageUrl } = await getNameAndImageIPA(metadata.licensorIpId);

                    return {
                        tokenId: tokenId.toString(),
                        ...metadata,
                        name,
                        imageUrl,
                    };
                })
            );

            setMetadataList(metadataArray);
        } catch (error) {
            console.error("Error fetching metadata:", error);
            setError("Failed to load license tokens.");
        } finally {
            setLoading(false);
        }
    };


    const handleCardClick = async (metadata: LicenseTokenMetadata) => {
        setSelectedToken(metadata);
        setTokenAssetData(null);

        try {
            const assetData = await getIPAMetadata(metadata.licensorIpId);
            setTokenAssetData(assetData);
        } catch (err) {
            console.error("Error fetching token asset data:", err);
            setError("Failed to load asset details.");
        }
    };

    useEffect(() => {
        if (isConnected && address) {
            fetchMetadata();
        } else {
            setMetadataList([]);
            setLoading(false);
            setError(null);
        }
    }, [isConnected, address]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
            <div className="flex justify-end">
                <ConnectButton />
            </div>
            <h1 className="text-2xl font-bold mb-8 text-center">My License Tokens</h1>

            {!isConnected && (
                <div className="flex justify-center items-center">
                    <p className="text-gray-500">Please connect your wallet to view license tokens.</p>
                </div>
            )}

            {loading && (
                <div className="flex justify-center items-center">
                    <p className="text-gray-500">Fetching license tokens...</p>
                </div>
            )}

            {!loading && metadataList.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                    {metadataList.map((metadata, index) => (
                        <div
                            key={index}
                            className="border p-4 rounded-md bg-gray-200 cursor-pointer text-left hover:bg-gray-300 flex items-center"
                            onClick={() => handleCardClick(metadata)}
                        >
                            <Image
                                src={
                                    metadata.imageUrl.startsWith("ipfs://")
                                        ? metadata.imageUrl.replace("ipfs://", "https://ipfs.io/ipfs/")
                                        : metadata.imageUrl
                                }
                                alt={metadata.name}
                                width={250}
                                height={250}
                                className="object-contain rounded mr-4"
                            />
                            <div>
                                <h2 className="text-xl font-bold">{metadata.name || "Unnamed Asset"}</h2>
                                <p><strong>Token ID:</strong> {metadata.tokenId}</p>
                                <p><strong>License ID:</strong> {metadata.licenseTermsId.toString()}</p>
                                <p>
                                    <strong>
                                        <a
                                            href={`/ipa/${metadata.licensorIpId}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline hover:text-gray-400"
                                        >
                                            Parent IPA
                                        </a>
                                    </strong>
                                </p>
                                <button
                                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(`my-license-tokens/${metadata.tokenId}/register-derivative`)
                                    }}
                                >
                                    Register Derivative
                                </button>
                            </div>
                        </div>

                    ))}
                </div>
            )}

            {selectedToken && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setSelectedToken(null);
                        }
                    }}
                >
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
                        <button
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                            onClick={() => setSelectedToken(null)}
                        >
                            ✕
                        </button>
                        {tokenAssetData && (
                            <>
                                <p className="text-left text-xl font-bold">Parent IPA</p>
                                <AssetDetails ipaid={selectedToken.licensorIpId} />
                                <LicenseDetails ipaid={selectedToken.licensorIpId} isConnected={false} isOwner={false} showDerivativeButton={false} />
                            </>
                        )}
                    </div>
                </div>
            )}

            {error && <p className="text-gray-500 text-center mt-4">{error}</p>}
        </div>
    );
};

export default MyLicenseTokensPage;
