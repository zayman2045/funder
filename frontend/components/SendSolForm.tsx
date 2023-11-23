import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import styles from "../styles/Home.module.css";

export default function SendSolForm() {
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
    <div>
      <form onSubmit={sendSol} className={styles.form}>
        <label htmlFor="amount">Amount (in SOL) to send:</label>
        <input
          id="amount"
          type="text"
          className={styles.formField}
          placeholder="e.g. 0.1"
          required
          onChange={(e) => setSol(e.target.value)}
        />
        <br />
        <label htmlFor="recipient">Send SOL to:</label>
        <input
          id="recipient"
          type="text"
          className={styles.formField}
          placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA"
          required
          onChange={(e) => setRecipient(e.target.value)}
        />
        <button type="submit" className={styles.formButton}>
          Send
        </button>
      </form>
    </div>
  );
}
