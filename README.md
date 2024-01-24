# Funder

Funder is a full-stack decentralized application (dApp) that runs custom Solana on-chain programs. 

## Overview

Funder leverages the power of blockchain technology to provide a secure, high-performance, and cost effective transaction platform. It is built on the Solana devnet blockchain, utilizing Typescript and Next.js for the frontend and Rust for the on-chain code. Once a user connects their Phantom wallet, the Funder UI provides access to a wallet dashboard and various on-chain programs:

* Send SOL
    * A transaction interface that allows users to view their SOL balance and specify the amount to transfer to a chosen public key.

* Game Reviews
    * A review system where users can read and write reviews for their favorite video games.

The frontend enhances the user experience by leveraging client-side rendering. It utilizes React hooks and components to efficiently retrieve data from the blockchain. Critical tools from the `@solana/web3.js` and `@solana/wallet-adapter-react` npm packages are imported to support these operations. The `WalletContextProvider` component, integrated into the overall application layout, manages a persistent connection to Solana's Devnet. This connection state can be accessed anywhere within the site using the `useWallet` and `useConnection` hooks, allowing the program to securely build and send transactions with the user's public key.

The backend library crate is used to define the on-chain programs that are deployed on the Solana Devnet blockchain. These programs make use of tools from the `solana_program` crate, and accept instruction information including the user's public key and the list of accounts involved in the operation. The incoming data is deserialized into Rust structs using the `borsh` crate, and is then used to create and seed program derived accounts on the blockchain.

## Getting Started

### To run this project locally:

This project requires the Phantom browser extension. If you don't already have it, you can download it [here](https://phantom.app/download). Follow Phantom’s instructions for creating a new account and a new wallet. Once you have a wallet, click the settings gear on the bottom right in the Phantom UI. Scroll down and click on the line item “Change Network” and select “Devnet.”

Before running the application, make sure you have Docker and Docker Compose installed. If not, you can download and install Docker from [here](https://docs.docker.com/get-docker/) and Docker Compose from [here](https://docs.docker.com/compose/install/).

Once Docker and Docker Compose are installed, you can build and run the application using the following command from the project root directory:

```zsh
docker-compose up --build
``` 

The application will be available at http://localhost:3000.

