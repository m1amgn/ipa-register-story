'use client';

import React, { useEffect, useState } from "react";
import IPAssetCard from "@/components/AssetCard";
import { getDataForDerivativesList } from "@/utils/get-data/getDataForDerivativesList";


interface DerivativesListProps {
    ipaid: `0x${string}`,
    assetsCount: number
}

interface DerivativesAssets {
    id: `0x${string}`;
    name: string;
    imageUrl: string;
}

const DerivativesList: React.FC<DerivativesListProps> = ({ ipaid, assetsCount }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [derivativesAssets, setDerivativesAssets] = useState<DerivativesAssets[]>([]);


    const fetchDerivatives = async (ipaid: `0x${string}`, assetsCount: number) => {
        const assetPromises = Array.from({ length: assetsCount }, (_, i) =>
            getDataForDerivativesList(ipaid, i)
        );

        const promiseResults = await Promise.all(assetPromises);
        const validAssets = promiseResults.filter(
            (asset): asset is DerivativesAssets => asset !== null
        );

        setDerivativesAssets(validAssets);
    }

    useEffect(() => {
        const getDerivatives = async () => {
            try {
                setIsLoading(true);
                await fetchDerivatives(ipaid, assetsCount);
            } catch (error) {
                console.error("Error in fetching NFT contract", error);
            } finally {
                setIsLoading(false);
            }
        };

        getDerivatives();
    }, [ipaid, assetsCount]);

    if (isLoading) {
        return <div className="text-center p-8">Loading...</div>;
    }

    return (
        <div>
            <div className="grid grid-cols-2 gap-2">
                {derivativesAssets.map((asset, index) => (
                    <IPAssetCard
                        key={`${asset.id}-${index}`}
                        IPAssetDetails={asset}
                        index={index}
                        isNeedShowCommercial={false} />
                ))}
            </div>
        </div>
    );
};

export default DerivativesList;