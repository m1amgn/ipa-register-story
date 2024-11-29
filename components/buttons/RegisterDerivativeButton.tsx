'use client';

import React from 'react';
import { useRouter } from 'next/navigation';


interface RegisterDerivativeButtonProps {
  ipaid: string;
  licenseTermsId: string;
  mintingFee: bigint;
  currency: `0x${string}`;
}

const RegisterDerivativeButton: React.FC<RegisterDerivativeButtonProps> = ({ ipaid, licenseTermsId, mintingFee, currency }) => {
  const router = useRouter();

  return (
    <button
      className="bg-gray-600 text-white font-semibold mt-4 px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
      onClick={() => router.push(`/ipa/${ipaid}/register-derivative/${licenseTermsId}?fee=${mintingFee}&currency=${currency}`)}
    >
      Register Derivative
    </button>
  );
};

export default RegisterDerivativeButton;
