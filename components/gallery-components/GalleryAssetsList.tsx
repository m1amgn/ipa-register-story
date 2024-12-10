"use client";

import { useEffect, useState } from "react";
import { getLastAssetsList } from "@/utils/api-utils/getLastAssetsList";
import IPAssetCard from "@/components/asset-details/AssetCard";

interface AssetDetails {
  id: `0x${string}`;
  name: string;
  imageUrl: string;
}

interface GalleryAssetsListProps {
  asset: string;
}

export default function GalleryAssetsList({ asset }: GalleryAssetsListProps) {
  const [IPAsListState, setIPAsListState] = useState<AssetDetails[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const limit = 8;
        const { assets, total } = await getLastAssetsList(currentPage, limit, asset);

        setIPAsListState(assets);
        setTotalPages(Math.ceil(total / limit));
      } catch (error) {
        console.error("Error fetching IPAsList:", error);
      }
    }

    fetchData();
  }, [currentPage]);

  return (
    <div className="mt-10">
      <div className="flex justify-center mb-6">
        {Array.from({ length: totalPages }).map((_, pageIndex) => (
          <button
            key={pageIndex}
            onClick={() => setCurrentPage(pageIndex + 1)}
            className={`px-3 py-1 mx-1 rounded ${currentPage === pageIndex + 1
                ? "bg-gray-500 text-white"
                : "bg-gray-200 text-gray-700"
              }`}
          >
            {pageIndex + 1}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {IPAsListState.map((asset, index) => (
          <IPAssetCard
            key={asset.id}
            IPAssetDetails={{
              id: asset.id,
              name: asset.name,
              imageUrl: asset.imageUrl,
              licenseId: 1,
            }}
            index={index}
            isNeedShowCommercial={false}
          />
        ))}
      </div>

    </div>
  );
}
