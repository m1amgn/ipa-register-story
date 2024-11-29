'use client';

import Web3Providers from '@/components/resources/Web3Providers';
import { PropsWithChildren } from 'react';

export default function CreateDerivativeLayout({ children }: PropsWithChildren) {
  return <Web3Providers>{children}</Web3Providers>;
}