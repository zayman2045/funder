import styles from "../styles/Home.module.css";
import Image from "next/image";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FC } from "react";
export const NavBar: FC = () => {
  return (
    <div className={styles.AppHeader}>
      <Image src="/solanaLogo.png" height={30} width={200} alt="Solana Logo" />
      <span>Funder</span>
      <WalletMultiButton />
    </div>
  );
};
