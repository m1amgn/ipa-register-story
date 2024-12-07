"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const Navigation: React.FC = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(event.target as Node)
    ) {
      setIsProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
            Register IPA
          </Link>
          <Link href="/gallery" className="hover:text-gray-300">
            Gallery
          </Link>
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={toggleProfileMenu}
              className="hover:text-gray-300 focus:outline-none"
            >
              Profile
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg z-50">
                <Link
                  href="/profile/my-ipa"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-gray-500 hover:text-white"
                >
                  My IPA
                </Link>
                <Link
                  href="/profile/my-derivatives"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-gray-500 hover:text-white"
                >
                  My Derivatives
                </Link>
                <Link
                  href="/profile/my-license-tokens"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-gray-500 hover:text-white"
                >
                  My License Tokens
                </Link>
                <Link
                  href="/profile/my-royalty-revenue"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="block px-4 py-2 text-sm hover:bg-gray-500 hover:text-white"
                >
                  My Royalty Revenue
                </Link>
              </div>
            )}
          </div>
          <div>
            <ConnectButton showBalance={false} accountStatus="address" label="Connect" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
