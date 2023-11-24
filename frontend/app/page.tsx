"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import styles from "../styles/Home.module.css";
import Head from "next/head";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Home() {
  const { connected } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (connected) {
      router.push('/dashboard');
    }
  }, [connected, router]);

  return (
    <div className={styles.App}>
      <Head>
        <title>Funder</title>
        <meta name="description" content="Funder" />
      </Head>
      <div className={styles.AppBody}>
        <h1>Welcome to Funder</h1>
        <h2>Connect your wallet to continue</h2>
        <WalletMultiButton />
      </div>
    </div>
  );
}