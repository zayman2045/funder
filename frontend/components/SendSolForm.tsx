import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function SendSolForm() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const sendSol = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(`Send ${amount} SOL to ${recipient}`);
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
          onChange={(e) => setAmount(e.target.value)}
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
