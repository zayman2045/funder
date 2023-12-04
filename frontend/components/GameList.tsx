
import {useEffect, useState } from 'react'
import GameCard from './GameCard'
import { Game } from '@/app/models/Game'
import { useConnection } from "@solana/wallet-adapter-react"
import { GameCoordinator } from '@/app/models/GameCoordinator'


export default function GameList() {
    const { connection } = useConnection()
    const [games, setGames] = useState<Game[]>([])
    const [page, setPage] = useState(1)
    const itemsPerPage = 5;
    

    // Fetch the page of games
    useEffect(() => {
        GameCoordinator.fetchPage(
          connection,
          page,
          itemsPerPage
        ).then(setGames)
      }, [page])
    
    return (
        <div className="flex flex-col items-center space-y-4">
            {
                games.map((game, i) => <GameCard key={i} game={game} /> )
            }
            <div className="w-full mt-2 mb-8 ml-4 mr-4 flex justify-between">
                {
                    page > 1 && 
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </button>
                }
                {
                    GameCoordinator.accounts.length > page * itemsPerPage &&
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                }
            </div>
        </div>
    )
}