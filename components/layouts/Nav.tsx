"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React from "react";
import ThemeSwitcher from "@/components/resources/ThemeSwitcher";

const Navigation: React.FC = () => {

  return (
    <nav className="bg-gray-600 text-white font-medium py-4 px-2">
      <div className="mx-auto flex items-center justify-between px-10">
        <div className="text-lg font-bold">
          <Link href="/" className="hover:text-gray-300">
            StoryApp
          </Link>
        </div>
        <div className="flex items-center space-x-10">
          <Link href="/register-ipa" className="hover:text-gray-300">
            Register IP
          </Link>
          <Link href="/gallery" className="hover:text-gray-300">
            Gallery
          </Link>
          <Link href="/payments" className="hover:text-gray-300">
            Payments
          </Link>
          <Link href="/profile" className="hover:text-gray-300">
            Profile
          </Link>
          <ThemeSwitcher />
          <div>
            <ConnectButton showBalance={false} accountStatus="address" label="Connect" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
