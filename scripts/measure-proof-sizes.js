#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

function merkleProofSizes(count) {
  // perfect binary tree depth ~ ceil(log2(count))
  const depth = Math.ceil(Math.log2(Math.max(1, count)))
  const proofBytes = depth * 32
  return { depth, proofBytes }
}

const sizes = [256, 1024, 10 * 1024]
const rows = []
for (const size of sizes) {
  const sampleCount = 1024
  const { depth, proofBytes } = merkleProofSizes(sampleCount)
  rows.push({ accountSizeBytes: size, sampleCount, depth, proofBytes })
}

const OUT = path.resolve('src/data/benchmarks.json')
const now = new Date().toISOString()
const doc = { benchmarks: { proofSizes: rows, generated_at: now } }
fs.writeFileSync(OUT, JSON.stringify(doc, null, 2))
console.log('Wrote', OUT)


