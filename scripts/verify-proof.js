#!/usr/bin/env node
// Verifies Merkle proofs from src/data/merkle-proofs.json
// Outputs CSV with proof sizes and verification timings

import fs from 'fs'
import path from 'path'
import { createHash } from 'crypto'

function sha256(buf) {
  return createHash('sha256').update(buf).digest()
}

function hexToBuf(hex) {
  return Buffer.from(hex, 'hex')
}

function verifyProof(leaf, proof, root) {
  let hash = Buffer.from(leaf)
  for (const node of proof) {
    const sib = Buffer.isBuffer(node) ? node : hexToBuf(node)
    // Order-agnostic concat for this PoC (sorted pair)
    const [a, b] = Buffer.compare(hash, sib) <= 0 ? [hash, sib] : [sib, hash]
    hash = sha256(Buffer.concat([a, b]))
  }
  return Buffer.compare(hash, Buffer.isBuffer(root) ? root : hexToBuf(root)) === 0
}

function measure(fn) {
  const start = process.hrtime.bigint()
  const ok = fn()
  const end = process.hrtime.bigint()
  const ns = Number(end - start)
  return { ok, ms: ns / 1e6 }
}

function main() {
  const proofsPath = path.resolve('src/data/merkle-proofs.json')
  if (!fs.existsSync(proofsPath)) {
    console.error('Missing src/data/merkle-proofs.json. Run: node scripts/generate-merkle.js')
    process.exit(1)
  }
  const doc = JSON.parse(fs.readFileSync(proofsPath, 'utf-8'))
  const root = doc.root
  const proofs = doc.proofs
  const count = doc.count
  const results = []

  for (let i = 0; i < Math.min(count, proofs.length); i++) {
    const proof = proofs[i]
    // For PoC, synthesize leaf identical to generator: sha256(pubkey:data)
    // We cannot reconstruct leaves here without original inputs, so time the path hashing cost using a random 32B leaf
    const leaf = sha256(Buffer.from(String(i).padStart(32, '0')))
    const { ok, ms } = measure(() => verifyProof(leaf, proof, root))
    results.push({ index: i, depth: proof.length, proof_bytes: proof.length * 32, verify_ms_node: ms.toFixed(6), valid: ok })
  }

  const csv = ['index,depth,proof_bytes,verify_ms_node,valid'].concat(
    results.map((r) => `${r.index},${r.depth},${r.proof_bytes},${r.verify_ms_node},${r.valid}`)
  ).join('\n')

  const outDir = path.resolve('poc', 'data')
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
  const outCsv = path.join(outDir, 'benchmarks.csv')
  fs.writeFileSync(outCsv, csv)
  console.log('Wrote', outCsv)
}

main()








