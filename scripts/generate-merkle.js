#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { createHash } from 'crypto'
import { Buffer } from 'buffer'

function sha256(buf) {
  return createHash('sha256').update(buf).digest()
}

function buildMerkleTree(leaves) {
  if (leaves.length === 0) return { root: Buffer.alloc(32), layers: [] }
  let layer = leaves.map((x) => Buffer.from(x))
  const layers = [layer]
  while (layer.length > 1) {
    const next = []
    for (let i = 0; i < layer.length; i += 2) {
      const left = layer[i]
      const right = layer[i + 1] ?? layer[i]
      next.push(sha256(Buffer.concat([left, right])))
    }
    layer = next
    layers.push(layer)
  }
  return { root: layer[0], layers }
}

function proofForIndex(layers, index) {
  const proof = []
  let idx = index
  for (let d = 0; d < layers.length - 1; d++) {
    const layer = layers[d]
    const pairIndex = idx ^ 1
    proof.push(layer[pairIndex] ?? layer[idx])
    idx = Math.floor(idx / 2)
  }
  return proof
}

const INPUT = path.resolve('src/data/sample-accounts.json')
const OUT = path.resolve('src/data/merkle-proofs.json')

if (!fs.existsSync(INPUT)) {
  fs.writeFileSync(INPUT, JSON.stringify([
    { pubkey: 'A'.repeat(44), data: 'deadbeef', slot: 1 },
    { pubkey: 'B'.repeat(44), data: 'c0ffee', slot: 1 },
    { pubkey: 'C'.repeat(44), data: 'bada55', slot: 1 }
  ], null, 2))
}

const arr = JSON.parse(fs.readFileSync(INPUT, 'utf-8'))
const leaves = arr.map((a) => sha256(Buffer.from(`${a.pubkey}:${a.data}`)))
const { root, layers } = buildMerkleTree(leaves)
const proofs = arr.map((_a, i) => proofForIndex(layers, i).map((b) => b.toString('hex')))

const out = {
  root: root.toString('hex'),
  proofs,
  count: arr.length,
  generated_at: new Date().toISOString()
}
fs.writeFileSync(OUT, JSON.stringify(out, null, 2))
console.log('Wrote', OUT)


