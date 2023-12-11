"use client";
import useCheckWalletDisconnection from "@/app/hooks/useCheckWalletDisconnection";
import GameList from "@/components/GameList";
import GameReviewForm from "@/components/GameReviewForm";
import { useState } from "react";

export default function GameReviews() {
  useCheckWalletDisconnection();

  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div>
      <h1 className="text-4xl mt-4 ml-4 font-mono">
        <div className="inline-block border-b border-custom-teal pb-1">
          Game Reviews
        </div>
      </h1>
      <div>
        <GameReviewForm
          onFormSubmit={() => {
            setRefreshKey((prevKey) => prevKey + 1);
          }}
        />
        <h2 className="text-2xl mt-4 ml-4 font-mono">Existing Reviews</h2>
        <GameList refreshKey={refreshKey} />
      </div>
    </div>
  );
}
