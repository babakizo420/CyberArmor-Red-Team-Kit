# Deployment Instructions

## Prerequisites
- Node + Hardhat or Remix
- Funded deployer wallet (Sepolia)
- Contract source: `MaliciousDrain.sol`

---

## Step 1 — Deploy PermitToken (optional test token)

Use OpenZeppelin's draft-ERC20Permit.sol for full permit support.

## Step 2 — Deploy MaliciousDrain

Deploy `MaliciousDrain` and copy its address.

Add to `.env` as:
MALICIOUS_CONTRACT_ADDRESS=0xDeployedAddressHere


## Step 3 — Fund Attacker Wallet
Send test ETH or tokens to attacker wallet in `.env`

## Step 4 — Start Backend
```bash
cd backend
pm2 start listener.js --name cyberarmor-listener

## Step 5 — Interact via Frontend
- Connect wallet

- Sign permit

- Trigger drain

- Watch Telegram & PM2 logs

