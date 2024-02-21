import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import BalanceDisplay from "./BalanceDisplay";

export default function AirdropSolForm() {
  const [transactionInfo, setTransactionInfo] = useState("");
  const [showTransactionInfo, setShowTransactionInfo] = useState(false);
  const [balanceUpdate, setBalanceUpdate] = useState(false);
  const [airdropProcessing, setAirdropProcessing] = useState(false);

  // Sends message to BalanceDisplay.tsx to update balance
  const updateBalance = () => {
    setBalanceUpdate((prevState) => !prevState);
  };

  // Connect to wallet
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  // Event handler for requesting airdrop
  const requestAirdrop = async (event: React.FormEvent) => {
    event.preventDefault();

    // Reset transaction info
    setShowTransactionInfo(false);
    setTransactionInfo("");

    // Check if wallet is connected
    if (!connection || !publicKey) {
      alert("Wallet is not connected");
      return;
    }

    setAirdropProcessing(true);

    // Request airdrop and display confirmation with transaction URL
    const lamports = web3.LAMPORTS_PER_SOL;
    try {
      const signature = await connection.requestAirdrop(publicKey, lamports);

      const transactionUrl = `https://explorer.solana.com/tx/${signature}?cluster=devnet`;
      setTransactionInfo(transactionUrl);
      setShowTransactionInfo(true);

      // Update balance
      setTimeout(updateBalance, 1000);

      // Catch and display error
    } catch (error) {
      console.error("Error during airdrop:", error);
      let errorMessage = "Airdrop failed: Unknown error";
      if (error instanceof Error) {
        try {
          const jsonStart = error.message.indexOf("{");
          if (jsonStart !== -1) {
            const errorData = JSON.parse(error.message.substring(jsonStart));
            if (errorData.error && errorData.error.message) {
              errorMessage = `Airdrop failed: ${errorData.error.message}`;
            }
          }
        } catch (parseError) {
          console.error("Error parsing error message:", parseError);
        }
      }
      setTransactionInfo(errorMessage);
      setShowTransactionInfo(true);
    }

    setAirdropProcessing(false);
  };

  return (
    <>
      <div className="text-2xl mt-4 ml-4 font-mono">
        <BalanceDisplay externalUpdate={balanceUpdate} />
      </div>
      <div className="flex flex-col items-center justify-center mt-4">
        <form
            className="p-6 bg-black text-white rounded shadow-md w-1/3 md:max-w-2xl mx-auto border-2 border-purple-500"
            onSubmit={requestAirdrop}
        >
            <button
                className="w-full py-2 px-4 bg-purple-500 text-black rounded hover:bg-custom-teal"
                type="submit"
                disabled={airdropProcessing}
            >
                {airdropProcessing ? "Processing Airdrop..." : "Airdrop 1 SOL"}
            </button>
        </form>
        {showTransactionInfo && (
          <div className="mt-5 text-center border-purple-500 border p-5 relative w-1/2 mx-auto">
            <button
              onClick={() => setShowTransactionInfo(false)}
              className="absolute top-[-9%] right-[-6%] px-2 bg-purple-500 text-black hover:bg-custom-teal rounded-full cursor-pointer"
            >
              X
            </button>
            {transactionInfo.startsWith("http") ? (
              <>
                <p>Airdrop Successful</p>
                <a
                  href={transactionInfo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-purple-500 text-black px-4 py-2 mt-5 rounded hover:bg-custom-teal"
                >
                  View Transaction
                </a>
              </>
            ) : (
              <p>{transactionInfo}</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
