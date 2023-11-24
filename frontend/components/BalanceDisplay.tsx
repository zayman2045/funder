import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { useEffect, useState } from "react";

export default function BalanceDisplay() {

  // Get connection and wallet from the provider
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();

  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Get balance on connection change
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
  }, [connection, publicKey, connected]);

  // Display the balance
  return connected ? (
    <div className="text-white">
      {isLoading ? (
        <h2>&nbsp;</h2>
      ) : (
        <h2>Balance: {balance} SOL</h2>
      )}
    </div>
  ) : (
    <div className="text-white">
      <h2>Wallet Not Connected</h2>
    </div>
  );
}
