import styles from '../styles/Home.module.css'
import Image from 'next/image'

export const NavBar= () => {
    return (
        <div className={styles.AppHeader}>
            <Image src="/solanaLogo.png" height={30} width={200} alt="Solana Logo" />
            <span>Funder</span>
            <button>Connect</button>
        </div>
    )
}