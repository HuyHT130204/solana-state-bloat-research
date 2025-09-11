# Storage Economics

## Overview

This document provides detailed economic analysis for off-chain data availability and storage costs.

## Pricing Models

### Arweave Pricing

**Current Rate:** $0.01 per MB per year
**1 GB Cost:** $10.24 per year
**1 TB Cost:** $10,485.76 per year

**Formula:**
```
cost = bytes × $0.01 / (1024 × 1024) × years
```

### Filecoin Pricing

**Current Rate:** $0.02 per GB per month
**1 GB Cost:** $0.24 per year
**1 TB Cost:** $245.76 per year

**Formula:**
```
cost = bytes × $0.02 / (1024 × 1024 × 1024) × months
```

### IPFS Pricing

**Current Rate:** $0.15 per GB per month
**1 GB Cost:** $1.80 per year
**1 TB Cost:** $1,843.20 per year

**Formula:**
```
cost = bytes × $0.15 / (1024 × 1024 × 1024) × months
```

## USD to SOL Conversion

**Current SOL Price:** $200 (as of January 2025)

**Conversion Formula:**
```
sol_cost = usd_cost / sol_price_usd
```

### Example Calculations

**1 GB for 1 year:**
- Arweave: $10.24 / $200 = 0.0512 SOL
- Filecoin: $0.24 / $200 = 0.0012 SOL
- IPFS: $1.80 / $200 = 0.009 SOL

**1 TB for 1 year:**
- Arweave: $10,485.76 / $200 = 52.43 SOL
- Filecoin: $245.76 / $200 = 1.23 SOL
- IPFS: $1,843.20 / $200 = 9.22 SOL

## Deposit Formula

**Base Formula:**
```
deposit = bytes × price_per_byte × retention_years × safety_multiplier
```

**Safety Multiplier:** 1.5x (50% buffer for price volatility)

**Example:**
```
1 GB × $0.01/MB × 1 year × 1.5 = $15.36
```

## SLA and Retention Models

### Service Level Agreements

**Availability:** 99.9% uptime
**Retrieval Time:** < 5 seconds
**Data Integrity:** Cryptographic verification
**Backup:** 3x redundancy across providers

### Retention Policies

**Standard:** 1 year minimum
**Extended:** 5 years with premium pricing
**Permanent:** Arweave-style permanent storage
**Archive:** Cold storage with longer retrieval times

## Cost Comparison

### On-Chain vs Off-Chain

**On-Chain Storage (Solana):**
- Cost: ~$0.01 per KB per year
- 1 GB: $10,485.76 per year
- 1 TB: $10,737,418.24 per year

**Off-Chain Storage (Filecoin):**
- Cost: ~$0.02 per GB per month
- 1 GB: $0.24 per year
- 1 TB: $245.76 per year

**Savings:** 99.997% cost reduction

### Provider Comparison

| Provider | 1 GB/Year | 1 TB/Year | SLA | Redundancy |
|----------|-----------|-----------|-----|------------|
| Arweave  | $10.24    | $10,485.76| 99.9% | 3x |
| Filecoin | $0.24     | $245.76   | 99.9% | 3x |
| IPFS     | $1.80     | $1,843.20 | 99.5% | 2x |

## Economic Incentives

### Validator Rewards

**Compression Rewards:** 0.001 SOL per account compressed
**Verification Rewards:** 0.0001 SOL per proof verified
**Archival Rewards:** 0.01 SOL per successful archival

### Penalties

**Unavailability:** 10% of stake slashed
**Invalid Proofs:** 5% of stake slashed
**Late Archival:** 1% of stake slashed

### Fee Structure

**Compression Fee:** 0.001 SOL per account
**Fetch Fee:** 0.0001 SOL per operation
**Decompression Fee:** 0.002 SOL per account

## Risk Analysis

### Price Volatility

**SOL Price Risk:** Hedged with stablecoin reserves
**Storage Price Risk:** Multi-provider diversification
**Exchange Rate Risk:** Real-time price feeds

### Economic Security

**Minimum Stake:** 1000 SOL per validator
**Slashing Conditions:** Clear and measurable
**Recovery Mechanisms:** Insurance fund and governance

## Recommendations

1. **Multi-Provider Strategy:** Use 3+ providers for redundancy
2. **Price Monitoring:** Real-time price feeds and alerts
3. **Reserve Fund:** Maintain 6 months of operational costs
4. **Gradual Migration:** Phase out on-chain storage over time
5. **Cost Optimization:** Regular provider cost analysis

