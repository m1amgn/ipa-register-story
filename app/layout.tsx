import type { Metadata } from 'next';
import './globals.css';
import { PropsWithChildren } from 'react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'StoryApp',
  description: 'StoryApp',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ru">
      <body className="flex flex-col min-h-screen">
        <Nav />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
