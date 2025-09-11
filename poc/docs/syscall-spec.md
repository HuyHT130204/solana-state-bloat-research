# Complete Syscall API Specification

## Overview

This document provides the complete specification for the Solana state compression syscalls, including full signatures, semantics, error codes, and compute unit estimates.

## Syscall Functions

### sol_compress_account

**Signature:**
```rust
pub fn sol_compress_account(
    pubkey: [u8; 32],
    combined_hash: [u8; 32]
) -> Result<(), CompressionError>
```

**Purpose:** Commit current account bytes into compression tree and update on-chain Merkle root.

**Parameters:**
- `pubkey`: The account's public key
- `combined_hash`: SHA256 hash of account data + metadata

**Returns:** `Result<(), CompressionError>`

**Compute Units:** 20,000 - 40,000 CU
- Hash computation: 10,000 CU
- Tree update: 15,000 CU
- Bookkeeping: 5,000 CU

**Error Codes:**
- `InvalidAccount`: Account not found or invalid
- `TreeFull`: Compression tree at capacity
- `NotAuthorized`: Caller lacks permission
- `InvalidHash`: Hash verification failed

### sol_fetch_compressed

**Signature:**
```rust
pub fn sol_fetch_compressed(
    pubkey: [u8; 32],
    proof_ptr: *const u8,
    proof_len: u32,
    offset: u32,
    len: u32
) -> Result<*const u8, CompressionError>
```

**Purpose:** Verify Merkle proof and return read-only slice for CPI without full decompression.

**Parameters:**
- `pubkey`: Account public key
- `proof_ptr`: Pointer to Merkle proof bytes
- `proof_len`: Length of proof in bytes
- `offset`: Byte offset within account data
- `len`: Number of bytes to fetch

**Returns:** `Result<*const u8, CompressionError>`

**Compute Units:** 30,000 - 60,000 CU
- Proof verification: 20,000 CU
- Hash path verification: 10,000 CU
- Memory allocation: 5,000 CU

**Proof Size:** 640 - 1,024 bytes (depth 10-16)

**Error Codes:**
- `InvalidProof`: Merkle proof verification failed
- `OutOfBounds`: Requested range exceeds account size
- `NotCompressed`: Account not in compression tree

### sol_fetch_with_proof

**Signature:**
```rust
pub fn sol_fetch_with_proof(
    uri_ptr: *const u8,
    uri_len: u32,
    pubkey: [u8; 32],
    offset: u32,
    len: u32
) -> Result<*const u8, CompressionError>
```

**Purpose:** Runtime-assisted fetch from data availability provider with on-chain commitment verification.

**Parameters:**
- `uri_ptr`: Pointer to DA provider URI
- `uri_len`: Length of URI string
- `pubkey`: Account public key
- `offset`: Byte offset within account data
- `len`: Number of bytes to fetch

**Returns:** `Result<*const u8, CompressionError>`

**Compute Units:** 60,000 - 120,000 CU
- Network fetch: 40,000 CU
- Commitment verification: 30,000 CU
- Data validation: 20,000 CU

**Proof Size:** 1,024 - 2,048 bytes (includes metadata)

**Error Codes:**
- `Unavailable`: DA provider unavailable
- `Timeout`: Fetch operation timed out
- `InvalidCommitment`: On-chain commitment mismatch
- `ProviderMismatch`: URI points to wrong provider

### sol_decompress_account

**Signature:**
```rust
pub fn sol_decompress_account(
    dst_ptr: *mut u8,
    dst_cap: u32
) -> Result<u32, CompressionError>
```

**Purpose:** Optional helper to materialize entire account into scratch space when needed.

**Parameters:**
- `dst_ptr`: Pointer to destination buffer
- `dst_cap`: Capacity of destination buffer

**Returns:** `Result<u32, CompressionError>` (actual bytes written)

**Compute Units:** 80,000 - 160,000 CU
- Decompression: 60,000 CU
- Memory operations: 40,000 CU
- Validation: 20,000 CU

**Error Codes:**
- `DstTooSmall`: Destination buffer too small
- `NotCompressed`: Account not compressed

## Error Types

```rust
#[derive(Debug, Clone, PartialEq)]
pub enum CompressionError {
    InvalidAccount,
    TreeFull,
    NotAuthorized,
    InvalidHash,
    InvalidProof,
    OutOfBounds,
    NotCompressed,
    Unavailable,
    Timeout,
    InvalidCommitment,
    ProviderMismatch,
    DstTooSmall,
}
```

## Gas/Fee Impact

- **Compression:** 0.001 - 0.005 SOL per account
- **Fetch:** 0.0001 - 0.001 SOL per operation
- **Decompression:** 0.002 - 0.01 SOL per account

## Security Considerations

1. **Proof Verification:** All proofs are cryptographically verified
2. **Memory Safety:** Bounds checking on all pointer operations
3. **Rate Limiting:** Built-in rate limits to prevent abuse
4. **Access Control:** Proper authorization checks

## Implementation Notes

- All syscalls are metered and have compute unit limits
- Proof verification is deterministic and reproducible
- Error codes are designed for easy debugging
- Memory management is handled by the runtime

