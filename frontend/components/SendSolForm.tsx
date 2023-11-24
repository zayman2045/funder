import { useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";

export default function SendSolForm() {
  // Prevent SSR
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [sol, setSol] = useState("");
  const [recipient, setRecipient] = useState("");

  // Connect to wallet
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const sendSol = (event: React.FormEvent) => {
    event.preventDefault();

    // Check if wallet is connected
    if (!connection || !publicKey) {
      alert("Connection not found");
      return;
    }

    // Create transaction and transfer instruction
    const transaction = new web3.Transaction();
    const recipientPublicKey = new web3.PublicKey(recipient);
    const lamports = web3.LAMPORTS_PER_SOL * parseFloat(sol);

    const transferSolInstruction = web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: recipientPublicKey,
      lamports,
    });

    transaction.add(transferSolInstruction);

    // Send transaction and display confirmation
    sendTransaction(transaction, connection).then((signature) => {
      console.log(`Transaction sent: ${signature}`);
    });

    console.log(`Send ${sol} SOL to ${recipient}`);
  };

  return (
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
            className="mt-1 p-2 w-full border rounded-md"
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
            className="mt-1 p-2 w-full border rounded-md"
            id="recipient"
            type="text"
            placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA"
            required
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
        <button
          className="w-full py-2 px-4 bg-purple-500 text-black rounded hover:bg-purple-600"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
}
