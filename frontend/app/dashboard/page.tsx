"use client";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import BalanceDisplay from "@/components/BalanceDisplay";
import SendSolForm from "@/components/SendSolForm";
import { NavBar } from "@/components/NavBar";
import useCheckWalletConnection from "../hooks/useCheckWalletConnection";

export default function Dashboard() {
  useCheckWalletConnection();

  return (
    <div className={styles.App}>
      <Head>
        <title>Funder Dashboard</title>
        <meta name="description" content="Funder Dashboard" />
      </Head>
      <NavBar />
      <div className={styles.AppBody}>
        <BalanceDisplay />
        <SendSolForm />
      </div>
    </div>
  );
}
