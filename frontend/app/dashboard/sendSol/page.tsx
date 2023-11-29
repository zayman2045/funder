"use client";
import useCheckWalletDisconnection from "@/app/hooks/useCheckWalletDisconnection";
import SendSolForm from "@/components/SendSolForm";

export default function Dashboard() {

  useCheckWalletDisconnection();

  return (
    <div>
      <h1 className="text-4xl mt-4 ml-4 font-mono">
        <div className="inline-block border-b border-custom-teal pb-1">
          Send SOL
        </div>
      </h1>
      <SendSolForm />
    </div>
  );
}
