"use client";

import { useEffect, useState } from "react";
import { getLastDerivativesList } from "@/utils/api-utils/getLastDerivativesList";
import IPAssetCard from "@/components/asset-details/AssetCard";

interface AssetDetails {
  id: `0x${string}`;
  name: string;
  imageUrl: string;
}

export default function DerivativesList() {
  const [derivativesList, setDerivativesList] = useState<AssetDetails[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getLastDerivativesList();
        setDerivativesList(data);
      } catch (error) {
        console.error("Error fetching derivativesList:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {derivativesList.map((asset, index) => (
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
