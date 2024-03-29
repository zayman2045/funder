"use client";
import AirdropSolForm from "@/components/AirdropSolForm";
import useCheckWalletDisconnection from "../hooks/useCheckWalletDisconnection";

export default function Dashboard() {
  useCheckWalletDisconnection();

  return (
    <div>
      <h1 className="text-4xl mt-4 ml-4 font-mono">
        <div className="inline-block border-b border-custom-teal pb-1">
          Dashboard
        </div>
      </h1>
      <div>
        <AirdropSolForm />
      </div>
    </div>
  );
}
