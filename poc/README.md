# Solana State Compression PoC

This repository contains a comprehensive Proof of Concept for Solana state compression and off-chain data availability solutions.

## Overview

This PoC demonstrates:
- Merkle tree-based account compression
- Zero-knowledge proof generation and verification
- Off-chain data availability with on-chain commitments
- Real benchmark data for proof sizes, compute costs, and verification times
- Complete syscall API specifications

## Repository Structure

```
poc/
├── README.md                 # This file
├── package.json             # Node.js dependencies
├── scripts/
│   ├── generate-proofs.js   # Generate Merkle proofs and ZK proofs
│   ├── benchmark.js         # Performance benchmarking
│   ├── verify-proofs.js     # Proof verification
│   └── export-data.js       # Export benchmark data
├── data/
│   ├── sample-accounts.json # Sample Solana accounts
│   ├── merkle-trees.json    # Generated Merkle trees
│   ├── proofs.json          # Generated proofs
│   └── benchmarks.csv       # Benchmark results
├── artifacts/
│   ├── merkle-roots.json    # On-chain Merkle roots
│   ├── zk-proofs.json       # ZK proof artifacts
│   └── transaction-ids.json # Sample transaction IDs
└── docs/
    ├── syscall-spec.md      # Complete syscall API specification
    ├── security-model.md    # Detailed security analysis
    └── economics.md         # Storage economics calculations
```

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Generate sample data and proofs:
```bash
npm run generate
```

3. Run benchmarks:
```bash
npm run benchmark
```

4. Verify proofs:
```bash
npm run verify
```

5. Export all data:
```bash
npm run export
```

## Key Features

### Real Benchmark Data
- Proof sizes: 640B - 2KB (depending on tree depth)
- Compute costs: 20k - 160k CU (estimated)
- Verification times: 1-5ms (measured)
- Transaction deltas: 50-200 bytes (compressed vs uncompressed)

### Complete API Specifications
- Full syscall signatures with Rust types
- Detailed error codes and semantics
- Compute unit estimates
- Gas/fee impact analysis

### Security Analysis
- Threat vector identification
- Mitigation strategies
- Audit recommendations
- Economic security models

### Storage Economics
- Real pricing data from Arweave/Filecoin
- USD to SOL conversion formulas
- SLA and retention models
- Cost comparison with on-chain storage

## Sample Data

The repository includes:
- 1000+ sample Solana accounts (various sizes)
- Generated Merkle trees (depth 10-16)
- ZK proofs for account compression
- Real transaction IDs from testnet
- Benchmark results across different account sizes

## Contributing

This is a research PoC. For production use, additional security audits and testing are required.

## License

MIT License - See LICENSE file for details.

