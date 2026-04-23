# Tesfa (TSF) — Constitution

This document states the immutable rules and social contract of the Tesfa protocol.

## Section 1 — Purpose

Tesfa is a public monetary protocol designed to:

- Provide a transparent, rules-based issuance mechanism during the growth phase.
- Fund a shared UBI pool via an on-chain tax mechanism.
- Reduce long-term hoarding pressure via weekly demurrage.
- Remain neutral and permissionless: the protocol does not select “winners”.

## Section 2 — Participation

1. Participation is permissionless.
2. Any address may register on-chain.
3. Protocol functions are executed by users and by any third party that is willing to pay gas.
4. The protocol does not require an administrator to operate.

## Section 3 — Core Economic Rules

### 3.1 Supply cap

- Tesfa has a hard cap of **21,000,000 TSF**.
- The supply cap is absolute and must never be exceeded.

### 3.2 Growth-phase minting (pre-cap)

Before the cap is reached:

- Each recorded real-economy transaction results in a mint according to a deterministic formula.
- A fixed tax is collected into the UBI pool.
- The non-tax portion is split between buyer and seller.

### 3.3 Post-cap operation (after the cap)

After the cap is reached:

- **No new minting occurs**.
- Economic activity continues.
- Tax continues, but is collected by transferring existing TSF from transacting parties into the pool.
- UBI continues, but is paid from the pool’s TSF balance.

### 3.4 UBI pool

- Taxes and demurrage feed a shared UBI pool.
- Claims are algorithmic and rule-based.

### 3.5 Demurrage

- Balances above the minimum threshold are subject to weekly demurrage.
- Demurrage continues even after the supply cap is reached.
- A portion of demurrage incentivizes “hunters” who execute the demurrage collection.

### 3.6 Inactivity recovery

- Wallets that are inactive for a long period and under a threshold can be recovered into the UBI pool, according to the contract rules.

## Section 4 — The Code Is Law

The Tesfa smart contract is locked forever.

No Governance.
No DAO.
No admin keys.
No upgrades.
No voting.
No changes.

After deployment, the contract is immutable.
Not the founder.
Not the community.
Not a government.

The code decides everything.

## Section 5 — Neutrality and Non-Discrimination

- The protocol is neutral with respect to nationality, ideology, religion, wealth, and identity.
- The protocol does not include privileged roles that can censor, freeze, or selectively restrict users.

## Section 6 — Transparency

- All rules are on-chain and verifiable.
- The reference implementation is the deployed bytecode.
- Off-chain applications (UI/API/indexers) may change over time, but they must not claim to change protocol rules.

## Section 7 — Finality

- If a rule is not enforceable by the smart contract, it is not a protocol rule.
- All participants accept that the protocol is executed exactly as written.
