'use client';

import { useRouter } from "next/navigation";
import Image from "next/image";


interface IPAssetsCardProps {
    IPAssetDetails:
    {
        id: `0x${string}`;
        name: string;
        imageUrl: string;
        licenseId?: number;
    },
    index: number,
    isNeedShowCommercial: boolean;
}

const IPAssetCard: React.FC<IPAssetsCardProps> = ({ IPAssetDetails, index, isNeedShowCommercial }) => {
    const router = useRouter();

    return (
        <a
            href={`/ipa/${IPAssetDetails.id}`}
            rel="noopener noreferrer"
            className="block bg-white rounded p-2 cursor-pointer hover:bg-gray-300"
        >
            <div className="relative w-full h-48">
                <Image
                    src={
                        IPAssetDetails.imageUrl.startsWith("ipfs://")
                            ? IPAssetDetails.imageUrl.replace("ipfs://", "https://ipfs.io/ipfs/")
                            : IPAssetDetails.imageUrl
                    }
                    alt={IPAssetDetails.name}
                    fill
                    className="object-contain rounded"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 2}
                    loading={index < 2 ? undefined : "lazy"}
                />
            </div>
            <h3 className="text-base text-center font-semibold">{IPAssetDetails.name}</h3>
            {isNeedShowCommercial &&
                IPAssetDetails.licenseId && IPAssetDetails.licenseId !== 1 && (
                    <p className="text-gray-600 text-sm text-center">(commercial license)</p>
                )
            }
        </a>
    );
};

export default IPAssetCard;