
import {useEffect, useState } from 'react'
import GameCard from './GameCard'
import { Game } from '@/app/models/Game'

const REVIEW_PROGRAM_ID = 'CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN'

export default function GameList() {
    const [games, setGames] = useState<Game[]>([])

    useEffect(() => {
        setGames(Game.mocks)
    }, [])
    
    return (
        <div>
            {
                games.map((game, i) => {
                    return (
                        <GameCard key={i} game={game} />
                    )
                })
            }
        </div>
    )
}