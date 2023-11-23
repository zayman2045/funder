"use client";
import styles from "../styles/Home.module.css";
import { NavBar } from "../components/NavBar";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.App}>
      <Head>
        <title>Funder</title>
        <meta name="description" content="Funder" />
      </Head>
      <NavBar />
      <div className={styles.AppBody}>
        <h1>Welcome to Funder</h1>
        <h2>Connect your wallet to continue</h2>
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </div>
  );
}
