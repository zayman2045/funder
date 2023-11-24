import Image from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FC } from "react";
import Link from "next/link";
export const NavBar: FC = () => {
  return (
    <div className="fixed inset-y-0 left-0 flex flex-col items-center justify-start h-full space-y-4 p-4 bg-gray-800 text-white">
      <Image src="/funderLogo.png" height={30} width={200} alt="Funder Logo" />
      <Link href="/dashboard">Transfer SOL</Link>
      <Link href="/dashboard">Link 2</Link>
      <Link href="/dashboard">Link 3</Link>
      <span className="inline-block bg-purple-500 hover:bg-blue-700 text-white font-bold rounded">
        <WalletMultiButton />
      </span>
    </div>
  );
};
