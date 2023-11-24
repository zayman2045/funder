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
      <div className="flex flex-col md:flex-row h-screen">
        <div className="md:w-60">
          <NavBar />
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
