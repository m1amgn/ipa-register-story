'use client';

import { useState } from 'react';
import { getNameAndImageIPA } from '@/utils/get-data/assets/getNameAndImageIPA';
import Image from "next/image";

const FindIPA = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState<{
        name: string;
        imageUrl: string;
    } | null>(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        setError('');
        setSearchResult(null);

        if (!searchQuery) {
            setError('Please enter a valid IPA address.');
            return;
        }

        try {
            const result = await getNameAndImageIPA(searchQuery as `0x${string}`);
            setSearchResult({
                name: result.name,
                imageUrl: result.imageUrl,
            });
        } catch (err) {
            console.error(err);
            setError('Could not find IPA with the given address.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full space-y-6 m-8">
            <div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter IPA Address (0x...)"
                    className="w-96 border border-solid border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500 text-sm"
                />
            </div>
            <button
                onClick={handleSearch}
                className="px-6 py-2 bg-indigo-500 text-white rounded text-sm hover:bg-ingigo-600 transition"
            >
                Search
            </button>

            {error && <p className="text-gray-500 text-lg">{error}</p>}

            {searchResult && (
                <div className="flex flex-col items-center space-y-4">
                    <a
                        href={`/ipa/${searchQuery}`}
                        rel="noopener noreferrer"
                        className="block rounded p-2 cursor-pointer hover:bg-gray-200 m-12"
                    >
                        <div
                            className="w-64 h-64 relative">
                            <Image
                                src={
                                    searchResult.imageUrl.startsWith('ipfs://')
                                        ? searchResult.imageUrl.replace(
                                            'ipfs://',
                                            'https://ipfs.io/ipfs/'
                                        )
                                        : searchResult.imageUrl
                                }
                                alt={searchResult.name}
                                className="w-full h-full object-cover rounded shadow-lg"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                fill
                            />
                        </div>
                        <h3 className="text-lg text-center">
                            {searchResult.name}
                        </h3>
                    </a>
                </div>
            )
            }
        </div >
    );
};

export default FindIPA;
