"use client";
import useCheckWalletConnection from "@/app/hooks/useCheckWalletConnection";
import BalanceDisplay from "@/components/BalanceDisplay";
import SendSolForm from "@/components/SendSolForm";

export default function Dashboard() {
  useCheckWalletConnection();

  return (
    <div>
      <h1 className="text-4xl mt-4 ml-4 font-mono">Send Sol</h1>
      <div className="text-2xl mt-4 ml-4 font-mono">
        <BalanceDisplay />
      </div>
      <SendSolForm />
    </div>
  );
}
