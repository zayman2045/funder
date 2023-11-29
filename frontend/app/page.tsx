"use client";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import Head from "next/head";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useCheckWalletConnection from "./hooks/useCheckWalletConnection";

export default function Home() {
  const { wallet } = useWallet();

  useCheckWalletConnection();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white">
      <Head>
        <title>Funder</title>
        <meta name="description" content="Funder" />
      </Head>
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 w-full md:w-3/4 mx-auto gap-4 md:gap-8 max-w-screen-lg mx-4 md:mx-auto">
        <div className="md:w-2/3 space-y-4 mx-4 md:mx-0">
          <div className="flex space-x-4 items-center">
            <div className="max-w-full">
              <Image
                src="/funderLogo.png"
                height={45}
                width={300}
                alt="Funder Logo"
              />
            </div>
            <span className="mx-2">X</span>
            <div className="max-w-full">
              <Image
                src="/solanaLogo.png"
                height={45}
                width={300}
                alt="Solana Logo"
              />
            </div>
          </div>
          <p className="text-lg">
            Welcome to Funder! Connect your Phantom wallet to begin managing
            your Solana digital assets. Check your SOL balance, transfer funds
            to other Solana accounts, and keep track of your recent transactions
            all in one place.
          </p>
        </div>
        <div
          className={`w-full max-w-xs md:max-w-[200px] flex flex-col items-center justify-center space-y-4 border ${
            wallet ? "border-custom-teal" : "border-purple-500"
          } bg-black rounded-lg p-4 mx-auto text-white`}
        >
          <p className="text-lg text-center font-bold">
            {wallet
              ? "Connect your wallet to continue"
              : "Select your wallet to continue"}
          </p>
          <div className="bg-purple-500 rounded">
            <WalletMultiButton />
          </div>
        </div>
      </div>
    </div>
  );
}
