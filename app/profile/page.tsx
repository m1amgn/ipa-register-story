'use client';

import MyIPAssets from '@/components/profile-components/MyIPAssets';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import MyDerivatives from '@/components/profile-components/MyDerivatives';
import MyLicenseTokens from '@/components/profile-components/MyLicenseTokens';


const TABS = {
    MY_IPAS: 'my_ipas',
    MY_DERIVATIVES: 'my_derivatives',
    MY_LICENSE_TOKENS: 'my_license_tokens',
    MY_CONTRACT: 'my_contract',
};

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState(TABS.MY_IPAS);
    const { address, isConnected } = useAccount();

    return (
        <div className="flex bg-gray-100">
            <div className="w-1/8 bg-gray-100 p-4">
                <ul className="space-y-2">
                    <li>
                        <button
                            onClick={() => setActiveTab(TABS.MY_IPAS)}
                            className={`block w-full text-sm text-left p-2 rounded ${activeTab === TABS.MY_IPAS ? 'bg-gray-600 text-white' : 'bg-gray-100'
                                }`}
                        >
                            My IP assets
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveTab(TABS.MY_DERIVATIVES)}
                            className={`block w-full text-sm text-left p-2 rounded ${activeTab === TABS.MY_DERIVATIVES ? 'bg-gray-600 text-white' : 'bg-gray-100'
                                }`}
                        >
                            My derivatives
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveTab(TABS.MY_LICENSE_TOKENS)}
                            className={`block w-full text-sm text-left p-2 rounded ${activeTab === TABS.MY_LICENSE_TOKENS ? 'bg-gray-600 text-white' : 'bg-gray-100'
                                }`}
                        >
                            My license tokens
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveTab(TABS.MY_CONTRACT)}
                            className={`block w-full text-sm text-left p-2 rounded ${activeTab === TABS.MY_CONTRACT ? 'bg-gray-600 text-white' : 'bg-gray-100'
                                }`}
                        >
                            My contract
                        </button>
                    </li>
                </ul>
            </div>

            <div className="w-5/6 p-4 ml-2">
                {isConnected && address ? (
                    <>
                        {activeTab === TABS.MY_IPAS && <MyIPAssets address={address} />}
                        {activeTab === TABS.MY_DERIVATIVES && <MyDerivatives address={address} />}
                        {activeTab === TABS.MY_LICENSE_TOKENS && <MyLicenseTokens address={address} />}
                    </>
                ) : (
                    <p className="text-center">Please connect your wallet to view details.</p>

                )}
            </div>
        </div>
    );
}
