"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import Head from "next/head";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Home() {
  const { connected } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (connected) {
      router.push("/dashboard");
    }
  }, [connected, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-800 text-white">
      <Head>
        <title>Funder</title>
        <meta name="description" content="Funder" />
      </Head>
      <div className="grid grid-cols-3 gap-4 w-3/4 mx-auto">
        <div className="col-span-2 space-y-4">
          <div className="flex space-x-4 items-center">
            <Image
              src="/funderLogo.png"
              height={45}
              width={300}
              alt="Funder Logo"
            />
            <span className="mx-2">X</span>
            <Image
              src="/solanaLogo.png"
              height={45}
              width={300}
              alt="Solana Logo"
            />
          </div>
          <p className="text-lg">
            Welcome to Funder! Connect your Phantom wallet to begin managing your Solana digital assets. Check your SOL balance, transfer funds to other Solana
            accounts, and keep track of your recent transactions all
            in one place.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <p className="text-lg text-center">Connect your wallet to continue</p>
          <div className="inline-block bg-purple-500 hover:bg-blue-700 text-white font-bold rounded">
            <WalletMultiButton />
          </div>
        </div>
      </div>
    </div>
  );
}
