'use client'

import "@rainbow-me/rainbowkit/styles.css";
import "../styles/globals.css";

import { publicProvider } from "wagmi/providers/public";
import { createConfig, WagmiConfig, configureChains } from "wagmi";
import { createPublicClient, http } from "viem";
import { sepolia } from "@wagmi/core/chains";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import React from "react";

const { chains } = configureChains(
  [sepolia],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Sepolia NFT Market",
  projectId: "80d507b460c69cbaaa0659957c484631",
  chains,
});

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: sepolia,
    transport: http()
  }),
  connectors
});

export default function MyApp({ Component, pageProps }) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if(!ready) {
      setReady(true);
    }
  }, [])
  if(!ready){
    return null;
  }
  else{
    return (
      <WagmiConfig config={config} suppressHydrationWarning>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    )
  }
}