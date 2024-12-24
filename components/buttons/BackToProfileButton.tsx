'use client';

import React from 'react';
import { useRouter } from 'next/navigation';



const BackToProfileButton: React.FC = () => {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push(`/profile`)}
            className="py-2 px-4 rounded-md bg-gray-100 text-gray-700 font-semibold hover:bg-gray-300 transition duration-300"
        >
            Back
        </button>
    );
};

export default BackToProfileButton;