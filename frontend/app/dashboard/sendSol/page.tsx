"use client";
import useCheckWalletConnection from "@/app/hooks/useCheckWalletConnection";
import SendSolForm from "@/components/SendSolForm";

export default function Dashboard() {
  useCheckWalletConnection();

  return (
    <div>
      <h1>Send Sol</h1>
      <SendSolForm />
    </div>
  );
}