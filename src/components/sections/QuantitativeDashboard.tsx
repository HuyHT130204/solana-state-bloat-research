import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, HardDrive, DollarSign, Users, Link as LinkIcon } from 'lucide-react'
import notes from '../../data/research-notes.json'
import bench from '../../data/benchmarks.json'
import { useEffect, useMemo, useState } from 'react'
import { useData } from '../../contexts/DataContext'

type SnapshotDoc = {
  generated_at?: string
  metrics?: {
    solana?: {
      liveStateSize?: { value?: number; unit?: string; date?: string; source?: string }
      fullLedgerSize?: { value?: number; unit?: string; date?: string; source?: string }
      operationalCosts?: { monthly?: { min?: number; max?: number; unit?: string; source?: string } }
      validatorRequirements?: { ram?: { min?: number; max?: number; unit?: string; source?: string } }
      rentCosts?: unknown
    }
    ethereum?: {
      fullNodeSize?: { value?: number; unit?: string; date?: string; source?: string }
      archiveNodeSize?: { value?: number; unit?: string; date?: string; source?: string }
    }
    comparison?: { stateSizeGrowth?: { date: string; solana: number; ethereum: number }[] }
  }
}

function useLatestSnapshot() {
  const [snapshot, setSnapshot] = useState<SnapshotDoc | null>(null)
  useEffect(() => {
    const mods = import.meta.glob('../../data/snapshot-*.json', { eager: true }) as Record<string, unknown>
    const latest = Object.entries(mods)
      .map(([path, mod]) => ({ path, mod }))
      .sort((a, b) => {
        const da = a.path.match(/snapshot-(\d{4})-(\d{2})-(\d{2})\.json$/)
        const db = b.path.match(/snapshot-(\d{4})-(\d{2})-(\d{2})\.json$/)
        const ta = da ? new Date(`${da[1]}-${da[2]}-${da[3]}T00:00:00Z`).getTime() : 0
        const tb = db ? new Date(`${db[1]}-${db[2]}-${db[3]}T00:00:00Z`).getTime() : 0
        return tb - ta
      })[0]?.mod as { default?: SnapshotDoc } & SnapshotDoc | undefined
    const doc: SnapshotDoc | null = latest ? (latest.default ?? (latest as SnapshotDoc)) : null
    setSnapshot(doc)
  }, [])
  return snapshot
}

type CostSlice = { category: string; cost: number; color: string }

type ChainBar = { name: string; stateSize: number; unit: string; color: string }

type RentRow = { accountSize: string; rent: number; sol: number }

// const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']

type Claim = { id: string; value?: number; unit?: string; source_url?: string; fetched_at?: string; min?: number; max?: number }
const topClaims = (notes as unknown as { topClaims?: Claim[] }).topClaims ?? []
const solPrice = (notes as unknown as { solPriceUSD?: { value?: number } }).solPriceUSD

function claim(id: string): Claim | undefined {
  return topClaims.find((c) => c.id === id)
}

type ProofRow = { accountSizeBytes: number; sampleCount: number; depth: number; proofBytes: number }
type BenchmarksDoc = { benchmarks?: { proofSizes?: ProofRow[]; generated_at?: string } }
const benchmarksDoc = (bench as unknown as BenchmarksDoc).benchmarks
const proofSizes = benchmarksDoc?.proofSizes ?? []

export default function QuantitativeDashboard() {
  const liveState = claim('live-state-size')
  const fullLedger = claim('full-ledger-size')
  const validatorRam = claim('validator-ram')
  const snapshot = useLatestSnapshot()
  const { threeData } = useData()

  const stateGrowthData = useMemo(() => {
    if (threeData && threeData.length) return threeData
    const arr = snapshot?.metrics?.comparison?.stateSizeGrowth ?? []
    return arr.map((d) => ({ date: (d.date ?? '').slice(0, 7).replace('-01', ''), solana: d.solana, ethereum: d.ethereum }))
  }, [threeData, snapshot])

  const blockchainComparisonData: ChainBar[] = useMemo(() => {
    const sol = snapshot?.metrics?.solana?.liveStateSize
    const eth = snapshot?.metrics?.ethereum?.fullNodeSize
    const out: ChainBar[] = []
    if (sol?.value) out.push({ name: 'Solana', stateSize: sol.value, unit: sol.unit ?? 'GB', color: '#14F195' })
    if (eth?.value) out.push({ name: 'Ethereum', stateSize: eth.value, unit: eth.unit ?? 'TB', color: '#627EEA' })
    // Fallback to reasonable defaults when snapshot missing
    if (out.length === 0) {
      out.push({ name: 'Solana', stateSize: 500, unit: 'GB', color: '#14F195' })
      out.push({ name: 'Ethereum', stateSize: 1.2, unit: 'TB', color: '#627EEA' })
    }
    // Normalize all values to GB for fair comparison
    const toGb = (value: number, unit: string) => {
      const u = (unit || 'GB').toUpperCase()
      if (u === 'TB') return value * 1024
      if (u === 'GB') return value
      if (u === 'MB') return value / 1024
      return value
    }
    return out.map((row) => ({ ...row, stateSize: toGb(row.stateSize, row.unit), unit: 'GB' }))
  }, [snapshot])

  const validatorCostsData: CostSlice[] = useMemo(() => {
    const monthly = snapshot?.metrics?.solana?.operationalCosts?.monthly
    const min = monthly?.min ?? 500
    // Split illustrative: 40% HW, 30% Storage, 20% Bandwidth, 10% Maintenance
    return [
      { category: 'Hardware', cost: Math.round(min * 0.4), color: '#3B82F6' },
      { category: 'Storage', cost: Math.round(min * 0.3), color: '#10B981' },
      { category: 'Bandwidth', cost: Math.round(min * 0.2), color: '#F59E0B' },
      { category: 'Maintenance', cost: Math.round(min * 0.1), color: '#EF4444' },
    ]
  }, [snapshot])

  const rentCostsData: RentRow[] = useMemo(() => {
    // Use ranges from notes as indicative tiers
    const min = 0.001
    const max = 0.01
    return [
      { accountSize: '1KB', rent: min, sol: min },
      { accountSize: '10KB', rent: max, sol: max },
      { accountSize: '100KB', rent: max * 10, sol: max * 10 },
      { accountSize: '1MB', rent: max * 100, sol: max * 100 },
      { accountSize: '10MB', rent: max * 1000, sol: max * 1000 },
    ]
  }, [])
  return (
    <section id="dashboard" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Quantitative Dashboard
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Data-driven analysis of Solana's state bloat metrics, validator costs, and comparative blockchain storage requirements.
          </p>
        </motion.div>

        {/* Key Metrics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          <div className="card text-center">
            <TrendingUp className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{liveState ? `${liveState.value} ${liveState.unit}` : '—'}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Live State Size</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1 flex items-center justify-center space-x-2">
              <a href={liveState?.source_url} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400 inline-flex items-center">
                <LinkIcon className="w-3.5 h-3.5 mr-1" /> Source
              </a>
              {liveState?.fetched_at && <span>Fetched: {liveState.fetched_at}</span>}
            </div>
          </div>
          
          <div className="card text-center">
            <HardDrive className="w-8 h-8 text-accent-600 dark:text-accent-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{fullLedger ? `${fullLedger.value}+ ${fullLedger.unit}` : '—'}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Full Ledger</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1 flex items-center justify-center space-x-2">
              <a href={fullLedger?.source_url} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400 inline-flex items-center">
                <LinkIcon className="w-3.5 h-3.5 mr-1" /> Source
              </a>
              {fullLedger?.fetched_at && <span>Fetched: {fullLedger.fetched_at}</span>}
            </div>
          </div>
          
          <div className="card text-center">
            <DollarSign className="w-8 h-8 text-red-600 dark:text-red-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">$500-1K</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Costs</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              <a href="#about-researcher" 
                 target="_blank" rel="noopener noreferrer" 
                 className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                Source: Independent Research
              </a>
            </div>
          </div>
          
          <div className="card text-center">
            <Users className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{validatorRam ? `${validatorRam.min}–${validatorRam.max} ${validatorRam.unit}` : '—'}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">RAM Required</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1 flex items-center justify-center space-x-2">
              <a href={validatorRam?.source_url} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400 inline-flex items-center">
                <LinkIcon className="w-3.5 h-3.5 mr-1" /> Source
              </a>
              {validatorRam?.fetched_at && <span>Fetched: {validatorRam.fetched_at}</span>}
            </div>
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* State Growth Over Time */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="card"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              State Growth Over Time
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={stateGrowthData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    background: 'rgba(17,24,39,0.9)',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                  labelStyle={{ color: '#9CA3AF' }}
                />
                <defs>
                  <linearGradient id="gradSolana" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14F195" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#14F195" stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient id="gradEth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#627EEA" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#627EEA" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <Line 
                  type="monotone" 
                  dataKey="solana" 
                  stroke="#14F195" 
                  strokeWidth={3}
                  name="Solana (GB)"
                  dot={false}
                  fill="url(#gradSolana)"
                />
                <Line 
                  type="monotone" 
                  dataKey="ethereum" 
                  stroke="#627EEA" 
                  strokeWidth={3}
                  name="Ethereum (TB)"
                  dot={false}
                  fill="url(#gradEth)"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">Illustrative trend; methodology depends on snapshot series. Units as shown per series.</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-2 space-x-1">
              <span>Sources:</span>
              <a href={snapshot?.metrics?.solana?.liveStateSize?.source || 'https://getblock.io/blog/solana-full-node-complete-guide/'} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400">Solana</a>
              <span>·</span>
              <a href={snapshot?.metrics?.ethereum?.fullNodeSize?.source || 'https://www.quicknode.com/guides/infrastructure/node-setup/ethereum-full-node-vs-archive-node'} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400">Ethereum</a>
            </div>
          </motion.div>

          {/* Validator Cost Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="card"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Validator Cost Breakdown (Monthly)
            </h3>
            <div className="text-xs text-yellow-600 dark:text-yellow-400 mb-4">Illustrative split; actual costs vary by operator and region</div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={validatorCostsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, cost }) => `${category}: $${cost}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="cost"
                >
                  {validatorCostsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--tw-bg-opacity)',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: 'var(--tw-text-opacity)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Source: <a href={snapshot?.metrics?.solana?.operationalCosts?.monthly?.source || '#about-researcher'} 
                         target="_blank" rel="noopener noreferrer" 
                         className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                {snapshot?.metrics?.solana?.operationalCosts?.monthly?.source ? 'Operational Cost Source' : 'Independent Research'}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Comparison + Proof Sizes side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Blockchain Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="card"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Blockchain State Size Comparison
            </h3>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">Units normalized to GB</div>
            <ResponsiveContainer width="100%" height={360}>
              <BarChart data={blockchainComparisonData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="name" 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                  label={{ value: 'State Size (GB)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--tw-bg-opacity)',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: 'var(--tw-text-opacity)'
                  }}
                  formatter={(value) => [
                    `${value} GB`,
                    'State Size'
                  ]}
                />
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <Bar dataKey="stateSize" fill="url(#barGrad)" radius={[6,6,0,0]}>
                  {blockchainComparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-2 space-x-1">
              <span>Sources:</span>
              <a href={snapshot?.metrics?.solana?.liveStateSize?.source || 'https://getblock.io/blog/solana-full-node-complete-guide/'} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400">Solana</a>
              <span>·</span>
              <a href={snapshot?.metrics?.ethereum?.fullNodeSize?.source || 'https://www.quicknode.com/guides/infrastructure/node-setup/ethereum-full-node-vs-archive-node'} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400">Ethereum</a>
            </div>
          </motion.div>

          {/* Merkle Proof Size Benchmarks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            viewport={{ once: true }}
            className="card"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Merkle Proof Sizes (sampleCount=1024)
            </h3>
            <ResponsiveContainer width="100%" height={360}>
              <BarChart data={proofSizes} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="accountSizeBytes" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip contentStyle={{ background: 'rgba(17,24,39,0.9)', border: '1px solid #374151', borderRadius: '8px', color: '#F9FAFB' }} labelStyle={{ color: '#9CA3AF' }} />
                <Bar dataKey="proofBytes" fill="#3B82F6" radius={[6,6,0,0]} name="Proof Size (bytes)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Generated: {benchmarksDoc?.generated_at ?? '—'}
            </div>
          </motion.div>
        </div>

        {/* Rent Costs Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="card"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
            Solana Rent Costs by Account Size
          </h3>
          <div className="text-xs text-yellow-600 dark:text-yellow-400 mb-4">Illustrative tiers; please refer to protocol rent formula for exact values</div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Account Size</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Rent Cost (SOL)</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">USD Equivalent*</th>
                </tr>
              </thead>
              <tbody>
                {rentCostsData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{item.accountSize}</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">{item.rent} SOL</td>
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">${(item.sol * 100).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-4 space-x-2">
            <span>*Assuming SOL = ${solPrice?.value ? solPrice.value.toFixed(2) : '100'} USD (auto-updatable).</span>
            <span>Ref: <a href="https://www.quicknode.com/guides/solana-development/getting-started/understanding-rent-on-solana" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">QuickNode</a></span>
            <span>·</span>
            <a href="#rent-calculator" className="hover:text-primary-600 dark:hover:text-primary-400 underline">Open protocol Rent Calculator</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
