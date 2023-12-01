import * as web3 from '@solana/web3.js'
import { Game } from '../models/Game'

const REVIEW_PROGRAM_ID = 'CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN'

export class GameCoordinator { 
    static accounts: web3.PublicKey[] = []

    static async prefetchAccounts(connection: web3.Connection) {
        const accounts = await connection.getProgramAccounts(
            new web3.PublicKey(REVIEW_PROGRAM_ID),
            {
              dataSlice: { offset: 0, length: 0 },
            }
          )
        
          this.accounts = accounts.map(account => account.pubkey)
    }
  
    static async fetchPage(connection: web3.Connection, page: number, perPage: number): Promise<Game[]> {
        // Prefetch accounts if needed
        if (this.accounts.length === 0) {
            await this.prefetchAccounts(connection)
          }
        
          // Paginate accounts
          const paginatedPublicKeys = this.accounts.slice(
            (page - 1) * perPage,
            page * perPage,
          )
        
          // If there are no accounts to fetch on this page, return an empty array
          if (paginatedPublicKeys.length === 0) {
            return []
          }
        
          // Fetch account info for all accounts on the page
          const accounts = await connection.getMultipleAccountsInfo(paginatedPublicKeys)
        
          // Deserialize game data
          const games = accounts.reduce((accum: Game[], account) => {
            const game = Game.deserialize(account?.data)
            if (!game) {
              return accum
            }
        
            return [...accum, game]
          }, [])
        
          return games
    }
}