# Funder

Funder is a full-stack decentralized application (dApp) that runs a custom Solana on-chain program. 

## Overview

Funder leverages the power of blockchain technology to provide a secure, high-performance, and cost effective transaction platform. It is built on the Solana devnet blockchain, utilizing Typescript and Next.js for the frontend and Rust for the on-chain code. Once a user connects their Phantom wallet, the Funder UI provides access to a wallet dashboard and two custom on-chain programs:

* Game Reviews
    * A review system where users can read and write reviews for their favorite video games
* Tokens
    * TODO

## Usage

Before using Funder, make sure you have Docker and Docker Compose installed. If not, you can download and install Docker from [here](https://docs.docker.com/get-docker/) and Docker Compose from [here](https://docs.docker.com/compose/install/).

Once Docker and Docker Compose are installed, you can build and run the application using the following command from the project root directory:

```zsh
docker-compose up --build
``` 

The application will be available at http://localhost:3000.

