# Sepolia Faucet DApp

A decentralized faucet application for the Sepolia testnet.

## Features
- Smart contract to dispense 0.1 SepoliaETH per day per user
- Frontend for requesting test ETH
- Hardhat tests and deploy script

## Getting Started
```bash
npm install
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.js --network sepolia
```
