# 🚀 Dynamic SOL Token Launch

This project enables the launch of a custom Solana token using a **Dynamic Bonding Curve (DBC)** mechanism. It includes functionality for simulating trades, configuring fees, and migrating to a DAMM V2 liquidity pool on Solana Devnet.

## 🔧 Features

- 🪙 SPL Token launch on Solana Devnet
- 📈 Dynamic Bonding Curve (DBC) integration
- 💱 DAMM V2 pool migration support
- 🧪 Trading simulation with price impact visualization
- ⚙️ Fee configuration for buy/sell operations
- ✅ Complete transaction logging with Solscan links

## 📦 Tech Stack

- **Solana Web3.js**
- **TypeScript**
- **Anchor / DAMM SDK**
- **Node.js**
- **Supabase (optional)** for persistence
- **Vercel** (for frontend deployment)

## 📁 Structure

- `/scripts` – CLI scripts to launch, buy, simulate trades
- `/utils` – helpers for curve logic, price tracking, fees
- `/frontend` – React/Next.js-based UI for interacting with the launch
- `/config` – Token metadata, bonding curve settings, etc.

## 🚀 How to Run

```bash
npm install
npm run launch
