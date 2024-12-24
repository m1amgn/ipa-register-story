'use client'

import IPAssetsList from "@/components/assets-list/AssetsList";
import RegisterIpaButton from "@/components/buttons/RegisterIpaButton";


interface MyIPAssetsProps {
    address: `0x${string}`;
}

export default function MyIPAssets({ address }: MyIPAssetsProps) {
    return (
        <div>
            <div className="bg-gray-100 p-8">
                {address ? (
                    <>
                        <RegisterIpaButton />
                        <IPAssetsList address={address} isDerivativeFlag={false} isNeedShowCommercial={true} />
                    </>
                ) : (
                    <p className="text-center">Please connect your wallet to view your IP assets.</p>
                )}
            </div>
        </div>
    );
};