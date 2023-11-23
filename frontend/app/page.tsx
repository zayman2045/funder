"use client"; // Establishes this as a Client Component, allowing access to the window object
import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { NavBar } from "../components/NavBar";
import SendSolForm from "../components/SendSolForm";
import WalletContextProvider from "../components/WalletContextProvider";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className={styles.App}>
      <Head>
        <title>Funder</title>
        <meta name="description" content="Funder" />
      </Head>
      <WalletContextProvider>
        <NavBar />
        <div className={styles.AppBody}>
          <p>(Display Balance Here)</p>
          <SendSolForm />
        </div>
      </WalletContextProvider>
    </div>
  );
};

export default Home;
