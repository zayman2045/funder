"use client";
import useCheckWalletDisconnection from "@/app/hooks/useCheckWalletDisconnection";

export default function GameReviews() {
  useCheckWalletDisconnection();

  return (
    <div>
      <h1 className="text-4xl mt-4 ml-4 font-mono">
        <div className="inline-block border-b border-custom-teal pb-1">
          Game Reviews
        </div>
      </h1>
      <div className="text-2xl mt-4 ml-4 font-mono">
        Hello Games
      </div>
    </div>
  );
}