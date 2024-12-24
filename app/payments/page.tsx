'use client';

import MyIPAssets from '@/components/profile-components/MyIPAssets';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import MyDerivatives from '@/components/profile-components/MyDerivatives';
import MyLicenseTokens from '@/components/profile-components/MyLicenseTokens';
import MyRoyalties from '@/components/payments-components/MyMintingFeeRevenues';
import MyRevenues from '@/components/payments-components/MyRevenues';


const TABS = {
    MY_REVENUES: 'my_revenues',
    MY_PAYMENTS: 'my_payments',
};

export default function PaymentsPage() {
    const [activeTab, setActiveTab] = useState(TABS.MY_REVENUES);
    const { address, isConnected } = useAccount();

    return (
        <div className="flex bg-gray-100">
            <div className="w-1/8 bg-gray-100 p-4">
                <ul className="space-y-2">
                    <li>
                        <button
                            onClick={() => setActiveTab(TABS.MY_REVENUES)}
                            className={`block w-full text-sm text-left p-2 rounded ${activeTab === TABS.MY_REVENUES ? 'bg-gray-600 text-white' : 'bg-gray-100'
                                }`}
                        >
                            My revenues
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveTab(TABS.MY_PAYMENTS)}
                            className={`block w-full text-sm text-left p-2 rounded ${activeTab === TABS.MY_PAYMENTS ? 'bg-gray-600 text-white' : 'bg-gray-100'
                                }`}
                        >
                            My payments
                        </button>
                    </li>
                </ul>
            </div>

            <div className="w-5/6 p-4 ml-2">
                {isConnected && address ? (
                    <>
                        {activeTab === TABS.MY_REVENUES && <MyRevenues address={address} />}
                        {/* {activeTab === TABS.MY_DERIVATIVES && <MyDerivatives address={address} />}
                        {activeTab === TABS.MY_LICENSE_TOKENS && <MyLicenseTokens address={address} />} */}
                    </>
                ) : (
                    <p className="text-center">Please connect your wallet to view details.</p>

                )}
            </div>
        </div>
    );
}
