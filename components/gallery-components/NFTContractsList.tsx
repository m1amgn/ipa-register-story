"use client";

import { useEffect, useState } from "react";
import { getRecentNftContracts } from "@/utils/api-utils/getRecentNftContracts";
import IPAssetsList from '@/components/assets-list/AssetsList';

interface ContractInfo {
  address: `0x${string}`;
  contract: `0x${string}`;
}

export default function NFTContractsList() {
  const [recentContracts, setRecentContracts] = useState<ContractInfo[] | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<`0x${string}` | null>(null);
  const [viewType, setViewType] = useState<"parents" | "derivatives">("parents");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    async function fetchContracts() {
      try {
        const contracts = await getRecentNftContracts();
        setRecentContracts(contracts);
      } catch (error) {
        console.error("Error fetching recent NFT contracts:", error);
      }
    }
    fetchContracts();
  }, []);

  if (selectedAddress) {
    return (
      <div>
        <button
          className="py-2 px-4 text-sm rounded-md bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition duration-300 mb-4"
          onClick={() => setSelectedAddress(null)}
        >
          Back
        </button>

        <div className="mt-2">
          <h2 className="text-center text-lg mb-10">Owner Address {selectedAddress}</h2>
          <div className="flex space-x-4 justify-center mb-4">
            <button
              onClick={() => setViewType("parents")}
              className={`py-2 px-4 rounded-md font-semibold text-sm transition-colors ${viewType === "parents"
                ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
            >
              Parents IP Assets
            </button>
            <button
              onClick={() => setViewType("derivatives")}
              className={`py-2 px-4 rounded-md font-semibold text-sm transition-colors ${viewType === "derivatives"
                ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
            >
              Derivatives IP Assets
            </button>
          </div>
          <div className="mb-4">
            {viewType === "parents" ? (
              <IPAssetsList
                address={selectedAddress}
                isDerivativeFlag={false}
                isNeedShowCommercial={true}
              />
            ) : (
              <IPAssetsList
                address={selectedAddress}
                isDerivativeFlag={true}
                isNeedShowCommercial={false}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  const filteredContracts = recentContracts
    ? recentContracts.filter(({ address, contract }) => {
      const q = searchQuery.toLowerCase();
      return (
        address.toLowerCase().includes(q) || contract.toLowerCase().includes(q)
      );
    })
    : [];

  return (
    <div>
      {recentContracts && recentContracts.length > 0 ? (
        <>
          <div className="mt-4 mb-4 max-w-sm">
            <input
              type="text"
              placeholder="Search by address or contract..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-solid border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>

          <table className="min-w-full divide-y divide-gray-200 border mt-4 table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-normal break-words"
                >
                  NAME
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-normal break-words"
                >
                  DESCRIPTION
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-normal break-words"
                >
                  OWNER ADDRESS
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-normal break-words"
                >
                  CONTRACT
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-100 divide-y divide-gray-200">
              {filteredContracts.length > 0 ? (
                filteredContracts.map(({ address, contract }) => (
                  <tr
                    key={address}
                    className="cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => {
                      setSelectedAddress(address);
                      setViewType("parents");
                    }}
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-normal break-words">
                      Contract Name
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-normal break-words">
                      Description of Conract Name
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-normal break-all w-80">
                      {address}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-normal break-all w-80">
                      {contract}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-center text-sm text-gray-500">
                    No matches found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      ) : (
        <p>No recent contracts available.</p>
      )}
    </div>
  );
}
