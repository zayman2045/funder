import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import Link from "next/link";
import BalanceDisplay from "./BalanceDisplay";

export default function SendSolForm() {
  const [sol, setSol] = useState("");
  const [recipient, setRecipient] = useState("");
  const [transactionInfo, setTransactionInfo] = useState("");
  const [showTransactionInfo, setShowTransactionInfo] = useState(false);
  const [balanceUpdate, setBalanceUpdate] = useState(false);

  // Sends message to BalanceDisplay.tsx to update balance
  const updateBalance = () => {
    setBalanceUpdate((prevState) => !prevState);
  };

  // Connect to wallet
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  // Event handler for sending SOL
  const sendSol = (event: React.FormEvent) => {
    event.preventDefault();

    // Reset transaction info
    setShowTransactionInfo(false);
    setTransactionInfo("");

    // Check if wallet is connected
    if (!connection || !publicKey) {
      alert("Connection not found");
      return;
    }

    // Create new transaction
    const transaction = new web3.Transaction();

    // Create transfer instruction using form data
    const recipientPublicKey = new web3.PublicKey(recipient);
    const lamports = web3.LAMPORTS_PER_SOL * parseFloat(sol);
    const transferSolInstruction = web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: recipientPublicKey,
      lamports,
    });

    // Add transfer instruction to transaction
    transaction.add(transferSolInstruction);

    // Send transaction and display confirmation with transaction URL
    sendTransaction(transaction, connection).then((signature) => {
      const transactionUrl = `https://explorer.solana.com/tx/${signature}?cluster=devnet`;
      setTransactionInfo(transactionUrl);
      setShowTransactionInfo(true);

      // Update balance, giving 1 second for Solana to process transaction
      setTimeout(updateBalance, 1000);
    });
  };

  return (
    <>
      <div className="text-2xl mt-4 ml-4 font-mono">
        <BalanceDisplay externalUpdate={balanceUpdate} />
      </div>
      <div className="flex flex-col items-center justify-center mt-4">
        <form
          className="p-6 bg-black text-white rounded shadow-md w-4/5 md:max-w-2xl mx-auto border-2 border-purple-500"
          onSubmit={sendSol}
        >
          <div className="mb-4">
            <label className="block" htmlFor="amount">
              Amount (in SOL) to send:
            </label>
            <input
              className="mt-1 p-2 w-full border rounded-md text-black"
              id="amount"
              type="text"
              placeholder="e.g. 0.1"
              required
              onChange={(e) => setSol(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block" htmlFor="recipient">
              Send SOL to:
            </label>
            <input
              className="mt-1 p-2 w-full border rounded-md text-black"
              id="recipient"
              type="text"
              placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA"
              required
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <button
            className="w-full py-2 px-4 bg-purple-500 text-black rounded hover:bg-custom-teal"
            type="submit"
          >
            Send
          </button>
        </form>
        {showTransactionInfo && (
          <div className="mt-5 text-center border-purple-500 border p-5 relative">
            <button
              onClick={() => setShowTransactionInfo(false)}
              className="absolute top-[-9%] right-[-6%] px-2 bg-purple-500 text-black hover:bg-custom-teal rounded-full cursor-pointer"
            >
              X
            </button>
            <p>Transaction Complete</p>
            <Link
              href={transactionInfo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple-500 text-black px-4 py-2 mt-5 rounded hover:bg-custom-teal"
            >
              View Transaction
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
