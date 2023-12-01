
import {useEffect, useState } from 'react'
import GameCard from './GameCard'
import { Game } from '@/app/models/Game'
import * as web3 from '@solana/web3.js'
import { useConnection } from "@solana/wallet-adapter-react"

const REVIEW_PROGRAM_ID = 'CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN'

export default function GameList() {
    const { connection } = useConnection()
    const [games, setGames] = useState<Game[]>([])

    useEffect(() => {
        connection.getProgramAccounts(new web3.PublicKey(REVIEW_PROGRAM_ID)).then(async (accounts) => {
            const games: Game[] = accounts.map(({ account }) => {
                return Game.deserialize(account.data)
            }).filter(game => game !== null) as Game[];
      
            setGames(games)
          })
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