"use client"; // Establishes this as a Client Component, allowing access to the window object
import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { NavBar } from "../components/NavBar";
import SendSolForm from "../components/SendSolForm";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className={styles.App}>
      <Head>
        <title>Funder</title>
        <meta name="description" content="Funder" />
      </Head>
      <NavBar />
      <div className={styles.AppBody}>
        <p>(Display Balance Here)</p>
        <SendSolForm />
      </div>
    </div>
  );
};

export default Home;
