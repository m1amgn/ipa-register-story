"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider, lightTheme, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { odyssey } from "@story-protocol/core-sdk";

const config = getDefaultConfig({
  appName: "StoryApp",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
  chains: [odyssey],
  ssr: true,
});

const queryClient = new QueryClient();

export default function Web3Providers({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale="en-US"
          theme={darkTheme({
            accentColor: 'white',
            accentColorForeground: 'green',
            borderRadius: 'medium',
            fontStack: 'rounded',
            overlayBlur: 'small',
          })}>
          <div className="min-h-screen m-0 flex flex-col">{children}</div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}