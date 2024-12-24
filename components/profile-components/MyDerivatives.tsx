'use client'

import IPAssetsList from "@/components/assets-list/AssetsList";


interface MyDerivativesProps {
    address: `0x${string}`;
}

export default function MyDerivatives({ address }: MyDerivativesProps) {
    return (
        <div>
            <div className="bg-gray-100 p-8">
                {address ? (
                    <>
                        <IPAssetsList address={address} isDerivativeFlag={true} isNeedShowCommercial={false} />
                    </>
                ) : (
                    <p className="text-center">Please connect your wallet to view your IP assets.</p>
                )}
            </div>
        </div>
    );
};