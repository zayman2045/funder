# Funder

Funder is a full-stack decentralized application (dApp) that runs custom Solana on-chain programs. 

## Overview

Funder leverages the power of blockchain technology to provide a secure, high-performance, and cost effective transaction platform. It is built on the Solana Devnet blockchain, utilizing Typescript and Next.js for the frontend and Rust for the on-chain code. Once a user connects their Phantom wallet, the Funder UI provides access to a wallet dashboard and various interactive programs:

* Dashboard
    * The homepage serves as a personal dashboard for users. It displays the user's current SOL balance in real-time. Additionally, it provides an option for users to request an airdrop of 1 SOL, which can be useful for testing purposes or for new users who want to get started with SOL.

* Send SOL
    * An easy-to-use transaction interface allows users to transfer SOL to any public key of their choice. Users can specify the exact amount of SOL they wish to send, providing them with full control over their transactions.

* Game Reviews
    * Users can read reviews written by other gamers to gain insights about various games, and share their own opinions by submitting their own reviews.

The frontend enhances the user experience by leveraging client-side rendering. It utilizes React hooks and components to efficiently retrieve data from the blockchain. Critical tools from the `@solana/web3.js` and `@solana/wallet-adapter-react` npm packages are imported to support these operations. The `WalletContextProvider` component, integrated into the overall application layout, manages a persistent connection to Solana's Devnet. This connection state can be accessed anywhere within the site using the `useWallet` and `useConnection` hooks, allowing the program to securely build and send transactions with the user's public key.

The backend library crate is used to define the on-chain programs that are deployed on the Solana Devnet blockchain. These programs make use of tools from the `solana_program` crate, and accept instruction information including the user's public key and the list of accounts involved in the operation. The incoming data is deserialized into Rust structs using the `borsh` crate, and is then used to create and seed program derived accounts on the blockchain.

## Getting Started

### To run this project locally:

This project requires the Phantom browser extension. If you don't already have it, you can download it [here](https://phantom.app/download). Follow Phantom’s instructions for creating a new account and a new wallet. Once you have a wallet, click the settings gear on the bottom left in the Phantom UI sidebar menu. Scroll down and click on the line item “Developer Settings” and select “Solana Devnet.”

Before running the application, make sure you have Docker and Docker Compose installed. If not, you can download and install Docker from [here](https://docs.docker.com/get-docker/) and Docker Compose from [here](https://docs.docker.com/compose/install/).

Once Docker and Docker Compose are installed, you can build and run the application using the following command from the project root directory:

```zsh
docker-compose up --build
``` 

The application will be available at http://localhost:3000.

