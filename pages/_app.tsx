import { Sepolia } from '@thirdweb-dev/chains';
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { MediaRenderer } from "@thirdweb-dev/react";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = {
  // === Required information for connecting to the network === \\
  chainId: 11155111, // Chain ID of the network
  // Array of RPC URLs to use
  rpc: ["https://sepolia.rpc.thirdweb.com"],
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID="5cd481e55f17fda87747c35c7275b347"}
      activeChain={Sepolia}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
