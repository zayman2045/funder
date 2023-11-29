import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { useEffect, useState } from "react";

interface BalanceDisplayProps {
  externalUpdate: boolean;
}

// Displays wallet balance and updates on changes in connection, wallet, or due to an external update request
export default function BalanceDisplay({ externalUpdate }: BalanceDisplayProps) {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();

  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Get wallet balance on connection
  useEffect(() => {
    if (connected && connection && publicKey) {
      setIsLoading(true);
      connection.getBalance(publicKey).then((balance) => {
        setBalance(balance / web3.LAMPORTS_PER_SOL);
        setIsLoading(false);
      });
    } else {
      setBalance(0);
      setIsLoading(false);
    }
  }, [connection, publicKey, connected, externalUpdate]);

  // Display balance when loaded
  return (
    <div className="text-white">
      {isLoading ? <h2>&nbsp;</h2> : <h2>Balance: {balance} SOL</h2>}
    </div>
  );
}