import Image from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FC } from "react";
import Link from "next/link";
import funderLogo from "../public/funderLogo.png";
import { usePathname } from "next/navigation";

export const NavBar: FC = () => {
  const pathname = usePathname();

  return (
    <div className="md:fixed md:inset-y-0 md:left-0 flex flex-col items-center h-full space-y-4 p-4 bg-gray-800 text-white">
      <div className="space-y-4">
        <Link href="/dashboard">
          <div
            className={`border-b w-48 h-10 text-center pb-2 mt-1.5 hover:border-custom-teal ${
              pathname === "/dashboard"
                ? "border-custom-teal"
                : "border-purple-500"
            }`}
          >
            <Image src={funderLogo} alt="Funder Logo" />
          </div>
        </Link>
        <div className="flex flex-col items-center space-y-4">
          <Link
            href="/dashboard/sendSol"
            className={`border border-purple-500 bg-black w-full text-center px-4 py-2 hover:border-custom-teal hover:text-custom-teal ${
              pathname === "/dashboard/sendSol"
                ? "text-custom-teal border-custom-teal"
                : ""
            }`}
          >
            Send SOL
          </Link>
          <Link
            href="/dashboard/gameReviews"
            className={`border border-purple-500 bg-black w-full text-center px-4 py-2 hover:border-custom-teal hover:text-custom-teal ${
              pathname === "/dashboard/gameReviews"
                ? "text-custom-teal border-custom-teal"
                : ""
            }`}
          >
            Game Reviews
          </Link>
          {/* <Link
            href="/dashboard/splTokens"
            className={`border border-purple-500 bg-black w-full text-center px-4 py-2 hover:border-custom-teal hover:text-custom-teal ${
              pathname === "/dashboard/splTokens"
                ? "text-custom-teal border-custom-teal"
                : ""
            }`}
          >
            SPL Tokens
          </Link> */}
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
