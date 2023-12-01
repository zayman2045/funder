"use client";
import useCheckWalletDisconnection from "@/app/hooks/useCheckWalletDisconnection";
import { Game } from "@/app/models/Game";
import GameList from "@/components/GameList";
import GameReviewForm from "@/components/GameReviewForm";

export default function GameReviews() {
  useCheckWalletDisconnection();

  return (
    <div>
      <h1 className="text-4xl mt-4 ml-4 font-mono">
        <div className="inline-block border-b border-custom-teal pb-1">
          Game Reviews
        </div>
      </h1>
      <div>
        <GameReviewForm />
        <h2 className="text-2xl mt-4 ml-4 font-mono">Existing Reviews</h2>
        <GameList />
      </div>
    </div>
  );
}
