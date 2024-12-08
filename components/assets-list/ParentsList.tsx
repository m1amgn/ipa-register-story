'use client';

import React, { useEffect, useState } from "react";
import { getDataForParentsList } from "@/utils/get-data/parents/getDataForParentsList";
import IPAssetCard from "@/components/asset-details/AssetCard";


interface ParentsListProps {
    ipaid: `0x${string}`,
    assetsCount: number
}

interface ParentsAssets {
    id: `0x${string}`;
    name: string;
    imageUrl: string;
}

const ParentsList: React.FC<ParentsListProps> = ({ ipaid, assetsCount }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [parentsAssets, setParentsAssets] = useState<ParentsAssets[]>([]);


    const fetchParents = async (ipaid: `0x${string}`, assetsCount: number) => {
        const assetPromises = Array.from({ length: assetsCount }, (_, i) =>
            getDataForParentsList(ipaid, i)
        );

        const promiseResults = await Promise.all(assetPromises);
        const validAssets = promiseResults.filter(
            (asset): asset is ParentsAssets => asset !== null
        );

        setParentsAssets(validAssets);
    }

    useEffect(() => {
        const getParents = async () => {
            try {
                setIsLoading(true);
                await fetchParents(ipaid, assetsCount);
            } catch (error) {
                console.error("Error in fetching NFT contract", error);
            } finally {
                setIsLoading(false);
            }
        };

        getParents();
    }, [ipaid, assetsCount]);

    if (isLoading) {
        return <div className="text-center p-8">Loading...</div>;
    }

    return (
        <div className="pb-6 pt-6">
            <h2 className="text-xl text-center font-bold mb-2">Parents</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                {parentsAssets.map((asset, index) => (
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

export default ParentsList;