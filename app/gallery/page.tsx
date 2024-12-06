'use client';

import { useState, useEffect } from 'react';
import IPAsList from '@/components/gallery-components/IPAsList';
import DerivativesList from '@/components/gallery-components/DerivativesList';
import NFTContractsList from '@/components/gallery-components/NFTContractsList';

const TABS = {
  IPAS: 'ipas',
  DERIVATIVES: 'derivatives',
  CONTRACTS: 'contracts',
};

export default function IPAAssetsPage() {
  const [activeTab, setActiveTab] = useState(TABS.IPAS);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="w-1/6 bg-gray-100 p-4 border-r border-solid border-gray-300">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveTab(TABS.IPAS)}
              className={`block w-full text-sm text-left p-2 rounded ${
                activeTab === TABS.IPAS ? 'bg-gray-600 text-white' : 'bg-gray-100'
              }`}
            >
              Recent IP Assets
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab(TABS.DERIVATIVES)}
              className={`block w-full text-sm text-left p-2 rounded ${
                activeTab === TABS.DERIVATIVES ? 'bg-gray-600 text-white' : 'bg-gray-100'
              }`}
            >
              Recent Derivatives
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab(TABS.CONTRACTS)}
              className={`block w-full text-sm text-left p-2 rounded ${
                activeTab === TABS.CONTRACTS ? 'bg-gray-600 text-white' : 'bg-gray-100'
              }`}
            >
              Recent NFT Contracts
            </button>
          </li>
        </ul>
      </div>

      <div className="w-3/4 p-4 ml-4">
        {activeTab === TABS.IPAS && <IPAsList />}
        {activeTab === TABS.DERIVATIVES && <DerivativesList />}
        {activeTab === TABS.CONTRACTS && <NFTContractsList />}
      </div>
    </div>
  );
}
