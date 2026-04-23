# Tesfa Blockchain

Community currency smart contracts with UBI distribution.

## Features

### TSF Token Creation
- Only through `authorizedCallers` via transactions
- **60%** to buyer, **40%** to seller
- **1.5%** tax → UBI Pool
- Rate formula: `BASE_RATE × (1 - S / 21,000,000)`
- Max supply: **21,000,000 TSF**

### Account Types
| Type | Mints TSF | Receives UBI |
|------|-----------|--------------|
| Personal | ❌ | ✅ |
| Business | ✅ | ❌ |

### Demurrage (Weekly → UBI Pool)
| Balance | Annual Rate | Weekly PPM |
|---------|-------------|------------|
| 0-10 TSF | 0% | 0 |
| 10-1,000 TSF | 0.5% | 96 |
| 1,000-10,000 TSF | 1% | 192 |
| 10,000-100,000 TSF | 2% | 385 |
| 100,000-500,000 TSF | 5% | 962 |
| >500,000 TSF | 8% | 1,538 |

### UBI Distribution
- Distributed equally to all personal accounts
- Funded by transaction tax + demurrage

### Barter System
- `recordBarter(party1, party2, estimatedValue, facilitator)`
- 50/50 split, 1.5% tax

### Inactive Recovery
- 4 years inactive + <1,000 TSF → UBI Pool

## Setup

```bash
cd blockchain
npm install
```

## Commands

```bash
# Compile contracts
npm run compile

# Run tests
npm test

# Start local node
npm run node

# Deploy locally
npm run deploy:local

# Deploy to testnet
npm run deploy:testnet
```

## Security
- ReentrancyGuard
- Pausable
- Access control via `onlyAuthorized` modifier
- Solidity 0.8.20 (built-in overflow protection)
