import Image from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FC } from "react";
import Link from "next/link";
export const NavBar: FC = () => {
  return (
    <div className="md:fixed md:inset-y-0 md:left-0 flex flex-col items-center h-full space-y-4 p-4 bg-gray-800 text-white">
      <div className="space-y-4">
        <div className="border-b border-purple-500 w-full text-center pb-2">
          <Link href="/dashboard">
            <Image src="/funderLogo.png" height={30} width={200} alt="Funder Logo" />
          </Link>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <Link href="/dashboard/sendSol" className="border-b border-purple-500 w-full text-center px-4 py-2 hover:bg-purple-700 hover:text-white">
            Send SOL
          </Link>
          <Link href="/dashboard" className="border-b border-purple-500 w-full text-center px-4 py-2 hover:bg-purple-700 hover:text-white">
            New Transaction
          </Link>
          <Link href="/dashboard" className="border-b border-purple-500 w-full text-center px-4 py-2 hover:bg-purple-700 hover:text-white">
            New Transaction
          </Link>
        </div>
        <div className="flex justify-center">
          <span className="inline-block bg-purple-500 hover:bg-blue-700 text-white font-bold rounded">
            <WalletMultiButton />
          </span>
        </div>
      </div>
    </div>
  );
};
