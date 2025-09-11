#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import https from 'https'

const SNAP_PATH = path.resolve('src/data/research-notes.json')

function fetchPrice() {
  return new Promise((resolve, reject) => {
    https.get('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd', (res) => {
      let data = ''
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => {
        try {
          const json = JSON.parse(data)
          resolve(json.solana.usd)
        } catch (e) {
          reject(e)
        }
      })
    }).on('error', reject)
  })
}

async function main() {
  const price = await fetchPrice()
  const buf = fs.readFileSync(SNAP_PATH, 'utf-8')
  const doc = JSON.parse(buf)
  const ts = new Date().toISOString().slice(0, 10)
  // add/update a derived field for price notes (optional)
  doc.solPriceUSD = { value: price, fetched_at: ts, source_url: 'https://www.coingecko.com' }
  fs.writeFileSync(SNAP_PATH, JSON.stringify(doc, null, 2))
  console.log(`Updated SOL price: $${price}`)
}

main().catch((e) => {
  console.error(e)
  // eslint-disable-next-line no-undef
  process.exit(1)
})


