'use client';

import { useState } from 'react';
import NFTContractsList from '@/components/gallery-components/NFTContractsList';
import GalleryAssetsList from '@/components/gallery-components/GalleryAssetsList';
import FindIPA from '@/components/gallery-components/FindIPA';

const TABS = {
  IPAS: 'ipas',
  DERIVATIVES: 'derivatives',
  CONTRACTS: 'contracts',
  FIND_IPA: 'find_ipa',
};

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState(TABS.IPAS);

  return (
    <div className="flex bg-gray-100">
      <div className="w-1/8 bg-gray-100 p-4">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveTab(TABS.IPAS)}
              className={`block w-full text-sm text-left p-2 rounded ${activeTab === TABS.IPAS ? 'bg-gray-600 text-white' : 'bg-gray-100'
                }`}
            >
              New IP Assets
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab(TABS.DERIVATIVES)}
              className={`block w-full text-sm text-left p-2 rounded ${activeTab === TABS.DERIVATIVES ? 'bg-gray-600 text-white' : 'bg-gray-100'
                }`}
            >
              New Derivatives
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab(TABS.CONTRACTS)}
              className={`block w-full text-sm text-left p-2 rounded ${activeTab === TABS.CONTRACTS ? 'bg-gray-600 text-white' : 'bg-gray-100'
                }`}
            >
              NFT Contracts
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab(TABS.FIND_IPA)}
              className={`block w-full text-sm text-left p-2 rounded ${activeTab === TABS.FIND_IPA ? 'bg-gray-600 text-white' : 'bg-gray-100'
                }`}
            >
              Find IPA
            </button>
          </li>
        </ul>
      </div>

      <div className="w-5/6 p-4 ml-2">
        {activeTab === TABS.IPAS && <GalleryAssetsList asset={TABS.IPAS} />}
        {activeTab === TABS.DERIVATIVES && <GalleryAssetsList asset={TABS.DERIVATIVES} />}
        {activeTab === TABS.CONTRACTS && <NFTContractsList />}
        {activeTab === TABS.FIND_IPA && <FindIPA />}
      </div>
    </div>
  );
}
