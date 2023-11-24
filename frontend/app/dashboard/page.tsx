"use client";
import BalanceDisplay from "@/components/BalanceDisplay";
import useCheckWalletConnection from "../hooks/useCheckWalletConnection";

export default function Dashboard() {
  useCheckWalletConnection();

  return (
    <div>
      <h1 className="text-4xl mt-4 ml-4 font-mono">Dashboard</h1>
      <div className="text-2xl mt-4 ml-4 font-mono">
        <BalanceDisplay />
      </div>
    </div>
  );
}
