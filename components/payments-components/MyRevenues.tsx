import React, { useEffect, useState } from "react";
import MyMintingFeeRevenues from "@/components/payments-components/MyMintingFeeRevenues";


interface MyRevenuesProps {
    address: `0x${string}`;
}

export default function MyRevenues({ address }: MyRevenuesProps) {
    const [viewType, setViewType] = useState<"minting_fees" | "royalties">("minting_fees");

    return (
        <div>
          <div className="mt-2">
            <div className="flex space-x-4 justify-center mb-4">
              <button
                onClick={() => setViewType("minting_fees")}
                className={`py-2 px-4 rounded-md font-semibold text-sm transition-colors ${viewType === "minting_fees"
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
              >
                Minting Fees
              </button>
              <button
                onClick={() => setViewType("royalties")}
                className={`py-2 px-4 rounded-md font-semibold text-sm transition-colors ${viewType === "royalties"
                  ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
              >
                Royalties
              </button>
            </div>
            <div className="mb-4">
              {viewType === "minting_fees" ? (
                <MyMintingFeeRevenues
                  address={address}
                />
              ) : (
                <MyMintingFeeRevenues
                  address={address}
                />
              )}
            </div>
          </div>
        </div>
      );
    
};