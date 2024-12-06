import type { Metadata } from 'next';
import './globals.css';
import { PropsWithChildren } from 'react';
import Nav from '@/components/layouts/Nav';
import Footer from '@/components/layouts/Footer';
import Web3Providers from '@/components/resources/Web3Providers';

export const metadata: Metadata = {
  title: 'StoryApp',
  description: 'StoryApp',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
          <Web3Providers>
            <Nav />
            <main className="grow bg-gray-100 font-semibold text-sm">{children}</main>
            <Footer />
          </Web3Providers>
      </body>
    </html>
  );
}
