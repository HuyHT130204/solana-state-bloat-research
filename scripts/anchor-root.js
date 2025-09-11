#!/usr/bin/env node
// Anchors a Merkle root on Solana devnet via Memo program for public verifiability
// Usage:
//   NODE_OPTIONS=--experimental-fetch node scripts/anchor-root.js --root <hex> [--key <base58_or_path>]
// If --root is omitted, reads from src/data/merkle-proofs.json

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function loadRootFromFile() {
  const p = path.resolve(__dirname, '..', 'src', 'data', 'merkle-proofs.json')
  const doc = JSON.parse(fs.readFileSync(p, 'utf-8'))
  if (!doc.root) throw new Error('No root in merkle-proofs.json')
  return String(doc.root)
}

function parseArgs() {
  const args = process.argv.slice(2)
  const out = {}
  for (let i = 0; i < args.length; i += 1) {
    const k = args[i]
    const v = args[i + 1]
    if (k === '--root') out.root = v
    if (k === '--key') out.key = v
  }
  return out
}

function loadKeypair(maybePathOrBase58) {
  // Priority: env SOLANA_PRIVATE_KEY (base58 JSON array), then --key path, else ephemeral
  const envKey = process.env.SOLANA_PRIVATE_KEY
  try {
    if (envKey) {
      const arr = JSON.parse(envKey)
      return Keypair.fromSecretKey(Uint8Array.from(arr))
    }
  } catch {}
  if (maybePathOrBase58 && fs.existsSync(maybePathOrBase58)) {
    const raw = JSON.parse(fs.readFileSync(maybePathOrBase58, 'utf-8'))
    return Keypair.fromSecretKey(Uint8Array.from(raw))
  }
  console.warn('No key provided. Using ephemeral airdropped keypair on devnet.')
  return Keypair.generate()
}

async function ensureAirdrop(conn, pubkey) {
  const targetLamports = 0.5 * 1e9
  for (let attempt = 0; attempt < 3; attempt++) {
    const bal = await conn.getBalance(pubkey)
    if (bal >= targetLamports) return
    try {
      const sig = await conn.requestAirdrop(pubkey, 1e9)
      await conn.confirmTransaction(sig, 'confirmed')
    } catch (e) {
      console.warn(`Airdrop attempt ${attempt + 1} failed:`, e.message)
    }
    await new Promise((r) => setTimeout(r, 1500))
  }
  const finalBal = await conn.getBalance(pubkey)
  if (finalBal < 1e7) throw new Error('Insufficient funds after airdrop attempts')
}

async function main() {
  const { root: cliRoot, key } = parseArgs()
  const rootHex = (cliRoot ?? loadRootFromFile()).toLowerCase()
  if (!/^([0-9a-f]{64})$/.test(rootHex)) throw new Error('Root must be 32-byte hex')

  const kp = loadKeypair(key)
  const conn = new Connection('https://api.devnet.solana.com', 'confirmed')
  await ensureAirdrop(conn, kp.publicKey)

  // Memo program id
  const MEMO = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr')
  const memoData = Buffer.from(JSON.stringify({ t: 'merkle_root', algo: 'sha256', root: rootHex }))

  const ix = {
    keys: [],
    programId: MEMO,
    data: memoData,
  }

  const tx = new Transaction().add(ix)
  tx.feePayer = kp.publicKey
  const { blockhash } = await conn.getLatestBlockhash('confirmed')
  tx.recentBlockhash = blockhash
  tx.sign(kp)
  const sig = await conn.sendRawTransaction(tx.serialize())
  await conn.confirmTransaction({ signature: sig, blockhash, lastValidBlockHeight: (await conn.getLatestBlockhash()).lastValidBlockHeight }, 'confirmed')

  console.log('Anchored Merkle root on devnet via Memo:')
  console.log('  Root:', rootHex)
  console.log('  Tx  :', sig)
  console.log('  View:', `https://explorer.solana.com/tx/${sig}?cluster=devnet`)

  // Persist artifact for site
  const artifactsDir1 = path.resolve(__dirname, '..', 'public', 'poc', 'artifacts')
  const artifactsDir2 = path.resolve(__dirname, '..', 'poc', 'artifacts')
  const payload = { merkle_root: rootHex, network: 'devnet', tx: sig, explorer: `https://explorer.solana.com/tx/${sig}?cluster=devnet`, anchored_at: new Date().toISOString() }
  for (const d of [artifactsDir1, artifactsDir2]) {
    try {
      fs.mkdirSync(d, { recursive: true })
      fs.writeFileSync(path.join(d, 'transaction-ids.json'), JSON.stringify(payload, null, 2))
    } catch {}
  }
}

main().catch((e) => {
  console.error('Failed to anchor root:', e)
  process.exit(1)
})


