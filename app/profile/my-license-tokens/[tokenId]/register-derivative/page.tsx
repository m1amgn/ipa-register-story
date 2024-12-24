"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { createHash } from "crypto";
import { IpMetadata } from "@story-protocol/core-sdk";
import { useParams, useRouter } from 'next/navigation';
import { setupStoryClient } from "@/utils/resources/storyClient";
import { uploadFileToIPFS } from "@/utils/api-utils/uploadFileToIPFS";
import { uploadJSONToIPFS } from "@/utils/api-utils/uploadJSONToIPFS";
import { getNftContractByAddress } from "@/utils/api-utils/getNftContractByAddress";
import { updateNftContract } from "@/utils/api-utils/updateNftContract";
import { licenseTokenBurnApproveTransaction } from "@/utils/approve-transactions/licenseTokenBurnApproveTransaction";
import { derivativeWorkflowsContractAddress } from "@/utils/contracts/derivativeWorkflowsContracts";
import BackToProfileButton from "@/components/buttons/BackToProfileButton";


const RegisterDerivativeWithLicenseTokenPage: React.FC = () => {
    const { address, isConnected } = useAccount();
    const { data: wallet } = useWalletClient();
    const router = useRouter();
    const params = useParams();

    const [formData, setFormData] = useState<{
        title: string;
        description: string;
        imageFile: File | null;
    }>({
        title: "",
        description: "",
        imageFile: null,
    });

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [nftContract, setNftContract] = useState<string | null | undefined>(null);
    const [needsCollection, setNeedsCollection] = useState<boolean>(false);
    const [collectionData, setCollectionData] = useState({
        name: "",
        symbol: "",
        isPublicMinting: true,
        mintOpen: true,
        mintFeeRecipient: address || "",
        contractURI: "",
    });

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchNftContract = async () => {
            if (isConnected && address) {
                try {
                    const nftContract = await getNftContractByAddress(address)
                    if (nftContract) {
                        setNftContract(nftContract);
                    } else {
                        setNeedsCollection(true);
                    }
                } catch (error) {
                    console.error("Error fetching nftContract:", error);
                    setErrorMessage("Error fetching nftContract. Please try again.");
                    alert(`Error: ${errorMessage}`)
                }
            }
        };
        fetchNftContract();
    }, [isConnected, address]);

    const handleFormChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target as HTMLInputElement;

        if (name === "imageFile") {
            const file = (e.target as HTMLInputElement).files?.[0] || null;
            setFormData((prev) => ({ ...prev, imageFile: file }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const updateNftOwners = async (address: `0x${string}`, nftContract: `0x${string}`) => {
        try {
            const response = await updateNftContract(address, nftContract)
            if (!response.success) {
                throw new Error(response.error || "Failed to update NFT owners.");
            }
        } catch (error: any) {
            console.error("Error updating NFT owners:", error);
            setErrorMessage(`Error updating NFT owners: ${error.message}`);
            alert(`Error: ${errorMessage}`)
        }
    };

    const handleSubmitCollectionCreate = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!wallet) {
            setErrorMessage("Error: wallet not found. Please try again.");
            alert(`Error: ${errorMessage}`)
            setLoading(false);
            return;
        }

        try {
            const client = setupStoryClient(wallet);
            if (!client) {
                setErrorMessage("Error initializing StoryClient.");
                alert(`Error: ${errorMessage}`)
                setLoading(false);
                return;
            }

            const newCollection = await client.nftClient.createNFTCollection({
                name: collectionData.name,
                symbol: collectionData.symbol,
                isPublicMinting: collectionData.isPublicMinting,
                mintOpen: collectionData.mintOpen,
                mintFeeRecipient: address as `0x${string}`,
                contractURI: collectionData.contractURI,
                txOptions: { waitForTransaction: true },
            });

            setNftContract(newCollection.spgNftContract);
            setNeedsCollection(false);

            await updateNftOwners(
                address!,
                newCollection.spgNftContract as `0x${string}`
            );

            alert(`NFT Collection created successfully! Address: ${newCollection.spgNftContract}`);
        } catch (error: any) {
            console.error("Error creating NFT collection:", error);
            setErrorMessage(`Error creating NFT collection: ${error.message}`);
            alert(`Error: ${errorMessage}`)
        } finally {
            setLoading(false);
        }
    };

    const handleCollectionChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCollectionData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitDerivativeCreate = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!isConnected || !address) {
            setErrorMessage("Please connect your wallet.");
            alert(`Error: ${errorMessage}`)
            setLoading(false);
            return;
        }

        if (!wallet) {
            setErrorMessage("Error: wallet not found. Please try again.");
            alert(`Error: ${errorMessage}`)
            setLoading(false);
            return;
        }

        const client = setupStoryClient(wallet);
        if (!client) {
            setErrorMessage("Error initializing StoryClient.");
            alert(`Error: ${errorMessage}`)
            setLoading(false);
            return;
        }

        try {
            const tokenIdFromParams = Array.isArray(params["tokenId"])
                ? params["tokenId"][0]
                : params["tokenId"];

            if (!tokenIdFromParams) {
                console.error("Token ID is missing!");
                return null;
            }

            if (!formData.imageFile) {
                setErrorMessage("Please select an image file.");
                setLoading(false);
                return;
            }

            const tokenId = BigInt(tokenIdFromParams);

            const approveReceipt = await licenseTokenBurnApproveTransaction(wallet, derivativeWorkflowsContractAddress, tokenId)
            if (!approveReceipt || approveReceipt.status !== 'success') {
                setErrorMessage("Approve transaction failed.");
                setLoading(false);
                return;
            }
            alert(`Approve transaction confirmed. Hash: ${approveReceipt.transactionHash}`);

            const imageIpfsHash = await uploadFileToIPFS(formData.imageFile);

            const nftMetadata = {
                name: formData.title,
                description: formData.description,
                image: `https://ipfs.io/ipfs/${imageIpfsHash}`,
            };

            const ipMetadata: IpMetadata = client.ipAsset.generateIpMetadata({
                title: formData.title,
                description: formData.description,
            });

            const ipIpfsHash = await uploadJSONToIPFS(ipMetadata);

            const ipHash = `0x${createHash("sha256")
                .update(JSON.stringify(ipMetadata))
                .digest("hex")}`;

            const nftIpfsHash = await uploadJSONToIPFS(nftMetadata);

            const nftHash = `0x${createHash("sha256")
                .update(JSON.stringify(nftMetadata))
                .digest("hex")}`;

            const response = await client.ipAsset.mintAndRegisterIpAndMakeDerivativeWithLicenseTokens({
                spgNftContract: nftContract as `0x${string}`,
                licenseTokenIds: [tokenId],
                ipMetadata: {
                    ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
                    ipMetadataHash: ipHash as `0x${string}`,
                    nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
                    nftMetadataHash: nftHash as `0x${string}`,
                },
                txOptions: { waitForTransaction: true },
            });

            console.log("Response:", response);

            alert(`Completed at transaction hash ${response.txHash}, IPA ID: ${response.ipId}, Token ID: ${response.tokenId}`);

        } catch (error: any) {
            console.error("Error in registration IPA:", error);
            setErrorMessage(`Error in registration IPA: ${error.message}`);
            alert(`Error: ${errorMessage}`)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 p-8">
            <div className="flex justify-between items-center mb-4">
                <BackToProfileButton />
            </div>
            <div className="max-w-lg w-full mx-auto bg-white rounded-lg shadow-lg p-6">
                {!isConnected || !address ? (
                    <p className="text-center text-gray-500">
                        Please connect your wallet to proceed.
                    </p>
                ) : loading ? (
                    <p className="text-center text-gray-500">Processing...</p>
                ) : needsCollection ? (
                    <>
                        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-700">
                            Create NFT Collection
                        </h1>
                        <form onSubmit={handleSubmitCollectionCreate} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    name="name"
                                    value={collectionData.name}
                                    onChange={handleCollectionChange}
                                    required
                                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Symbol
                                </label>
                                <input
                                    name="symbol"
                                    value={collectionData.symbol}
                                    onChange={handleCollectionChange}
                                    required
                                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-300"
                            >
                                Create Collection
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-700">
                            Register Derivative
                        </h1>
                        <form onSubmit={handleSubmitDerivativeCreate} className="space-y-5">
                            <div>
                                <input
                                    name="title"
                                    placeholder="Title"
                                    value={formData.title}
                                    onChange={handleFormChange}
                                    required
                                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <textarea
                                    name="description"
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={handleFormChange}
                                    required
                                    rows={4}
                                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mt-5">
                                    Upload Image (.png, .jpeg, .jpg, .webp)
                                </label>
                                <input
                                    type="file"
                                    name="imageFile"
                                    accept="image/*"
                                    onChange={handleFormChange}
                                    required
                                    className="mt-2 w-full"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 px-4 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-300"
                            >
                                Submit
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default RegisterDerivativeWithLicenseTokenPage;
