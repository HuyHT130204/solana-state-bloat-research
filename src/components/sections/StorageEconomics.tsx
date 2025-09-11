import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import notes from '../../data/research-notes.json'

type ResearchNotes = {
  solPriceUSD?: { value?: number }
  providers?: {
    arweave?: { pricePerGbYear?: number; source_url?: string; fetched_at?: string; pricingModel?: 'one_time' | 'yearly' }
    filecoin?: { pricePerGbYear?: number; source_url?: string; fetched_at?: string }
    ipfs?: { pricePerGbYear?: number; source_url?: string; fetched_at?: string }
  }
  rentParams?: { lamportsPerByteYear?: number; exemptionYears?: number }
}

const BYTES_PER_UNIT: Record<'KB' | 'MB' | 'GB' | 'TB', number> = {
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4,
}

export default function StorageEconomics() {
  const baseNotes = (notes as unknown as ResearchNotes)
  const [solPrice, setSolPrice] = useState<number>(baseNotes.solPriceUSD?.value ?? 200)
  const [arweavePerGbYear, setArweavePerGbYear] = useState<number>(baseNotes.providers?.arweave?.pricePerGbYear ?? 10.24)
  const [filecoinPerGbYear, setFilecoinPerGbYear] = useState<number>(baseNotes.providers?.filecoin?.pricePerGbYear ?? 0.24)
  const [ipfsPerGbYear, setIpfsPerGbYear] = useState<number>(baseNotes.providers?.ipfs?.pricePerGbYear ?? 1.80)
  const [sizeValue, setSizeValue] = useState<number>(1)
  const [sizeUnit, setSizeUnit] = useState<'KB' | 'MB' | 'GB' | 'TB'>('GB')
  const [years, setYears] = useState<number>(1)
  const [kOfN, setKOfN] = useState<{ k: number; n: number }>({ k: 2, n: 3 })
  const [safetyMultiplier, setSafetyMultiplier] = useState<number>(1.5)
  const [arweaveOneTime, setArweaveOneTime] = useState<boolean>(baseNotes.providers?.arweave?.pricingModel === 'one_time')

  useEffect(() => {
    // Optional: try to refresh SOL price from public API (no-fail)
    void (async () => {
      try {
        const r = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd')
        if (r.ok) {
          const j = await r.json()
          if (j?.solana?.usd) setSolPrice(Number(j.solana.usd))
        }
      } catch { void 0 }
    })()
  }, [])

  const sizeGb = useMemo(() => {
    const bytes = sizeValue * BYTES_PER_UNIT[sizeUnit]
    return bytes / (1024 ** 3)
  }, [sizeValue, sizeUnit])

  const blendedPricePerGbYear = useMemo(() => {
    // Simple: majority Filecoin weighting when n>=3 else average
    const arw = arweavePerGbYear
    const fil = filecoinPerGbYear
    if (kOfN.n >= 3) return (fil * (kOfN.k) + arw * Math.max(0, kOfN.k - 1)) / kOfN.k
    return (arw + fil) / 2
  }, [arweavePerGbYear, filecoinPerGbYear, kOfN])

  const totalUsd = useMemo(() => {
    const arwComponent = sizeGb * (arweavePerGbYear) * safetyMultiplier
    const filComponent = sizeGb * (filecoinPerGbYear) * safetyMultiplier
    // If Arweave is one-time, do not multiply Arweave portion by years
    const yearlyFactorArw = arweaveOneTime ? 1 : years
    // Approximate split of blended between Arweave and Filecoin by their ratio
    const totalWeight = arweavePerGbYear + filecoinPerGbYear
    const arwShare = totalWeight > 0 ? arweavePerGbYear / totalWeight : 0.5
    const filShare = 1 - arwShare
    return arwShare * arwComponent * yearlyFactorArw + filShare * filComponent * years
  }, [sizeGb, years, safetyMultiplier, arweavePerGbYear, filecoinPerGbYear, arweaveOneTime])
  const totalSol = useMemo(() => totalUsd / (solPrice || 1), [totalUsd, solPrice])
  return (
    <section id="storage-economics" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">Storage Economics</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Illustrative pricing and deposit formula for off-chain data availability with k-of-n redundancy and SLAs.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="font-medium mb-1">Arweave</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">${arweavePerGbYear.toFixed(2)}/GB/{arweaveOneTime ? 'one-time*' : 'year'}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{(arweavePerGbYear / solPrice).toFixed(4)} SOL/GB/year</div>
              {baseNotes.providers?.arweave?.source_url && (
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  <a href={baseNotes.providers.arweave.source_url} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400">Source</a>
                  {baseNotes.providers.arweave.fetched_at && <span className="ml-1">({baseNotes.providers.arweave.fetched_at})</span>}
                </div>
              )}
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="font-medium mb-1">Filecoin</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">${filecoinPerGbYear.toFixed(2)}/GB/year</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{(filecoinPerGbYear / solPrice).toFixed(4)} SOL/GB/year</div>
              {baseNotes.providers?.filecoin?.source_url && (
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  <a href={baseNotes.providers.filecoin.source_url} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400">Source</a>
                  {baseNotes.providers.filecoin.fetched_at && <span className="ml-1">({baseNotes.providers.filecoin.fetched_at})</span>}
                </div>
              )}
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="font-medium mb-1">IPFS</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">${ipfsPerGbYear.toFixed(2)}/GB/year</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{(ipfsPerGbYear / solPrice).toFixed(4)} SOL/GB/year</div>
              {baseNotes.providers?.ipfs?.source_url && (
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  <a href={baseNotes.providers.ipfs.source_url} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400">Source</a>
                  {baseNotes.providers.ipfs.fetched_at && <span className="ml-1">({baseNotes.providers.ipfs.fetched_at})</span>}
                </div>
              )}
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="font-medium mb-1">On-Chain (Solana)</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">$10,485.76/GB/year</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{(10485.76 / solPrice).toFixed(2)} SOL/GB/year</div>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="font-medium mb-3">Live Calculator</div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <label className="flex items-center gap-2">Size
                  <input type="number" className="input" value={sizeValue} min={0.001} step={0.001} onChange={(e) => setSizeValue(parseFloat(e.target.value || '0'))} />
                </label>
                <label className="flex items-center gap-2">Unit
                  <select className="input" value={sizeUnit} onChange={(e) => setSizeUnit(e.target.value as 'KB' | 'MB' | 'GB' | 'TB')}>
                    <option>KB</option><option>MB</option><option>GB</option><option>TB</option>
                  </select>
                </label>
                <label className="flex items-center gap-2">Years
                  <input type="number" className="input" value={years} min={1} step={1} onChange={(e) => setYears(parseInt(e.target.value || '1'))} />
                </label>
                <label className="flex items-center gap-2">Safety x
                  <input type="number" className="input" value={safetyMultiplier} min={1} step={0.1} onChange={(e) => setSafetyMultiplier(parseFloat(e.target.value || '1'))} />
                </label>
                <label className="flex items-center gap-2 col-span-2">
                  <input type="checkbox" className="checkbox" checked={arweaveOneTime} onChange={(e) => setArweaveOneTime(e.target.checked)} />
                  Treat Arweave as one-time payment
                </label>
                <label className="flex items-center gap-2 col-span-2">k-of-n
                  <input type="number" className="input" value={kOfN.k} min={1} step={1} onChange={(e) => setKOfN((p) => ({ ...p, k: parseInt(e.target.value || '1') }))} />
                  <span>/</span>
                  <input type="number" className="input" value={kOfN.n} min={1} step={1} onChange={(e) => setKOfN((p) => ({ ...p, n: parseInt(e.target.value || '1') }))} />
                </label>
              </div>
              <div className="mt-3 text-sm">
                <div>Blended price: ${blendedPricePerGbYear.toFixed(4)}/GB/year</div>
                <div>Total: <span className="font-semibold">${totalUsd.toFixed(4)}</span> (~{totalSol.toFixed(4)} SOL)</div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="font-medium mb-3">Override Provider Prices</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <label className="flex items-center gap-2">Arweave
                  <input type="number" className="input" min={0} step={0.01} value={arweavePerGbYear} onChange={(e) => setArweavePerGbYear(parseFloat(e.target.value || '0'))} />
                </label>
                <label className="flex items-center gap-2">Filecoin
                  <input type="number" className="input" min={0} step={0.01} value={filecoinPerGbYear} onChange={(e) => setFilecoinPerGbYear(parseFloat(e.target.value || '0'))} />
                </label>
                <label className="flex items-center gap-2">IPFS
                  <input type="number" className="input" min={0} step={0.01} value={ipfsPerGbYear} onChange={(e) => setIpfsPerGbYear(parseFloat(e.target.value || '0'))} />
                </label>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Prices are examples; update with current market quotes.</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="font-medium mb-2">Deposit Formula</div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">deposit = bytes × price_per_byte × retention_years × safety_multiplier</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Safety multiplier: 1.5x (50% buffer for volatility)</div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="font-medium mb-2">SLA & Incentives</div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">k-of-n providers, periodic attestations, penalties on unavailability</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">99.9% uptime, &lt;5s retrieval, 3x redundancy</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
              <h4 className="font-medium mb-2">Compute Unit Estimator</h4>
              <EstimatorCU />
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
              <h4 className="font-medium mb-2">Worked Examples</h4>
              <div className="text-sm space-y-1">
                <div>1 KB × 1 yr → {(0.001 * blendedPricePerGbYear * safetyMultiplier).toFixed(6)} USD (~{(0.001 * blendedPricePerGbYear * safetyMultiplier / (solPrice || 1)).toFixed(6)} SOL)</div>
                <div>1 MB × 3 yr → {(0.001 * 3 * blendedPricePerGbYear * safetyMultiplier).toFixed(4)} USD (~{(0.001 * 3 * blendedPricePerGbYear * safetyMultiplier / (solPrice || 1)).toFixed(4)} SOL)</div>
                <div>10 MB × 5 yr → {(0.01 * 5 * blendedPricePerGbYear * safetyMultiplier).toFixed(4)} USD (~{(0.01 * 5 * blendedPricePerGbYear * safetyMultiplier / (solPrice || 1)).toFixed(4)} SOL)</div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="font-medium mb-3" id="rent-calculator">Protocol Rent Calculator (Parameterized)</div>
              <RentCalculator 
                defaultSolPrice={{ value: solPrice }} 
                defaultLamportsPerByteYear={baseNotes.rentParams?.lamportsPerByteYear}
                defaultExemptionYears={baseNotes.rentParams?.exemptionYears}
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Formula reference: minimum_balance(bytes) ≈ bytes × lamports_per_byte_year × exemption_years. Configure parameters below to match current protocol values.</div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="font-medium mb-3">Notes</div>
              <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>Exemption years thường đặt 2 năm; có thể thay đổi theo phiên bản.</li>
                <li>Lamports per byte-year cần lấy từ Sysvar Rent/phiên bản runtime hiện hành.</li>
                <li>Kết quả quy đổi USD dùng giá SOL ở trên (auto/refreshed).</li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Detailed Cost Analysis</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                <h4 className="font-medium mb-2">Filecoin (Recommended)</h4>
                <div className="text-sm space-y-1">
                  <div>1 GB × 1 year × ${filecoinPerGbYear.toFixed(2)} = ${filecoinPerGbYear.toFixed(2)}</div>
                  <div>1 TB × 1 year × ${(filecoinPerGbYear * 1024).toFixed(2)} = {(filecoinPerGbYear * 1024).toFixed(2)}</div>
                  <div>With safety multiplier (1.5x): ${(245.76 * 1.5).toFixed(2)}</div>
                  <div className="text-primary-600 dark:text-primary-400">In SOL: {((245.76 * 1.5) / solPrice).toFixed(3)} SOL</div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                <h4 className="font-medium mb-2">Savings vs On-Chain</h4>
                <div className="text-sm space-y-1">
                  <div>On-chain cost: $10,485.76/GB/year</div>
                  <div>Off-chain cost: $0.24/GB/year</div>
                  <div className="text-green-600 dark:text-green-400">Savings: 99.997%</div>
                  <div className="text-green-600 dark:text-green-400">Cost reduction: 43,690x</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


function EstimatorCU() {
  const [depth, setDepth] = useState<number>(10)
  const [proofBytes, setProofBytes] = useState<number>(320)
  const [base, setBase] = useState<number>(20000)
  const [perDepth, setPerDepth] = useState<number>(3000)
  const [perKbVerify, setPerKbVerify] = useState<number>(50000)
  const kb = Math.max(1, Math.ceil(proofBytes / 1024))
  const estimate = base + perDepth * depth + perKbVerify * kb
  return (
    <div className="text-sm space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <label className="flex items-center gap-2">Depth
          <input className="input" type="number" min={1} max={32} value={depth} onChange={(e) => setDepth(parseInt(e.target.value || '1'))} />
        </label>
        <label className="flex items-center gap-2">Proof bytes
          <input className="input" type="number" min={32} step={32} value={proofBytes} onChange={(e) => setProofBytes(parseInt(e.target.value || '32'))} />
        </label>
        <label className="flex items-center gap-2">Base CU
          <input className="input" type="number" min={0} step={1000} value={base} onChange={(e) => setBase(parseInt(e.target.value || '0'))} />
        </label>
        <label className="flex items-center gap-2">CU per depth
          <input className="input" type="number" min={0} step={500} value={perDepth} onChange={(e) => setPerDepth(parseInt(e.target.value || '0'))} />
        </label>
        <label className="flex items-center gap-2">CU per KB
          <input className="input" type="number" min={0} step={1000} value={perKbVerify} onChange={(e) => setPerKbVerify(parseInt(e.target.value || '0'))} />
        </label>
      </div>
      <div>Estimated CU: <span className="font-semibold">{estimate.toLocaleString()}</span></div>
    </div>
  )
}


type RentCalculatorProps = { defaultSolPrice?: { value?: number }; defaultLamportsPerByteYear?: number; defaultExemptionYears?: number }
function RentCalculator({ defaultSolPrice, defaultLamportsPerByteYear, defaultExemptionYears }: RentCalculatorProps) {
  const LAMPORTS_PER_SOL = 1_000_000_000
  const [sizeValue, setSizeValue] = useState<number>(1)
  const [sizeUnit, setSizeUnit] = useState<'B' | 'KB' | 'MB' | 'GB'>('KB')
  const [lamportsPerByteYear, setLamportsPerByteYear] = useState<number>(defaultLamportsPerByteYear ?? 3480) // example; configure to protocol value
  const [exemptionYears, setExemptionYears] = useState<number>(defaultExemptionYears ?? 2)
  const [solPriceUsd, setSolPriceUsd] = useState<number>(defaultSolPrice?.value ?? 200)

  const bytes = useMemo(() => {
    const unit = sizeUnit
    if (unit === 'B') return sizeValue
    if (unit === 'KB') return sizeValue * 1024
    if (unit === 'MB') return sizeValue * 1024 * 1024
    if (unit === 'GB') return sizeValue * 1024 * 1024 * 1024
    return sizeValue
  }, [sizeValue, sizeUnit])

  const lamports = useMemo(() => {
    return Math.max(0, Math.floor(bytes * lamportsPerByteYear * exemptionYears))
  }, [bytes, lamportsPerByteYear, exemptionYears])

  const sol = useMemo(() => lamports / LAMPORTS_PER_SOL, [lamports])
  const usd = useMemo(() => sol * (solPriceUsd || 1), [sol, solPriceUsd])

  return (
    <div className="text-sm space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <label className="flex items-center gap-2">Size
          <input type="number" className="input" min={0} step={0.001} value={sizeValue} onChange={(e) => setSizeValue(parseFloat(e.target.value || '0'))} />
        </label>
        <label className="flex items-center gap-2">Unit
          <select className="input" value={sizeUnit} onChange={(e) => setSizeUnit(e.target.value as 'B' | 'KB' | 'MB' | 'GB')}>
            <option>B</option><option>KB</option><option>MB</option><option>GB</option>
          </select>
        </label>
        <label className="flex items-center gap-2 col-span-2">Lamports/byte-year
          <input type="number" className="input" min={0} step={1} value={lamportsPerByteYear} onChange={(e) => setLamportsPerByteYear(parseInt(e.target.value || '0'))} />
        </label>
        <label className="flex items-center gap-2">Exemption years
          <input type="number" className="input" min={1} step={1} value={exemptionYears} onChange={(e) => setExemptionYears(parseInt(e.target.value || '1'))} />
        </label>
        <label className="flex items-center gap-2">SOL price (USD)
          <input type="number" className="input" min={0} step={0.01} value={solPriceUsd} onChange={(e) => setSolPriceUsd(parseFloat(e.target.value || '0'))} />
        </label>
      </div>
      <div className="space-y-1">
        <div>Bytes: <span className="font-medium">{bytes.toLocaleString()}</span></div>
        <div>Minimum balance: <span className="font-medium">{lamports.toLocaleString()} lamports</span></div>
        <div>≈ <span className="font-medium">{sol.toFixed(6)} SOL</span> (~${usd.toFixed(2)})</div>
      </div>
    </div>
  )
}

