"use client";
import { NavBar } from "@/components/NavBar";
import Head from "next/head";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Head>
        <title>Funder Dashboard</title>
        <meta name="description" content="Funder Dashboard" />
      </Head>
    <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4">
            <NavBar />
        </div>
        <div className="md:w-3/4">
            {children}
        </div>
    </div>
    </div>
  );
}
