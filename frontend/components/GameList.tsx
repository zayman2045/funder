import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { Game } from "@/app/models/Game";
import { useConnection } from "@solana/wallet-adapter-react";
import { GameCoordinator } from "@/app/models/GameCoordinator";

interface GameListProps {
  refreshKey: number;
}

export default function GameList({ refreshKey }: GameListProps) {
  const { connection } = useConnection();
  const [games, setGames] = useState<Game[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch the page of games on page change
  useEffect(() => {
    GameCoordinator.fetchPage(connection, page, itemsPerPage).then(setGames);
  }, [page]);

  // Fetch the page of games on new addition
  useEffect(() => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(GameCoordinator.prefetchAccounts(connection));
      }, 1000);
    }).then(() => {
      setPage(1);
    });
  }, [refreshKey]);

  return (
    <div className="flex flex-col items-center space-y-4 pb-5">
      {games.map((game, i) => (
        <GameCard key={i} game={game} />
      ))}
      <div className="w-full mt-2 mb-4 ml-4 mr-4 flex justify-center space-x-4">
        {page > 1 && (
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
        )}
        {GameCoordinator.accounts.length > page * itemsPerPage && (
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
