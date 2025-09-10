import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, HardDrive, DollarSign, Users } from 'lucide-react'

const stateGrowthData = [
  { date: '2023-01', solana: 200, ethereum: 0.8 },
  { date: '2023-06', solana: 280, ethereum: 0.9 },
  { date: '2023-12', solana: 350, ethereum: 1.0 },
  { date: '2024-06', solana: 420, ethereum: 1.1 },
  { date: '2024-12', solana: 480, ethereum: 1.2 },
  { date: '2025-06', solana: 500, ethereum: 1.2 },
  { date: '2025-09', solana: 500, ethereum: 1.2 },
]

const validatorCostsData = [
  { category: 'Hardware', cost: 400, color: '#3B82F6' },
  { category: 'Storage', cost: 200, color: '#10B981' },
  { category: 'Bandwidth', cost: 100, color: '#F59E0B' },
  { category: 'Maintenance', cost: 100, color: '#EF4444' },
]

const blockchainComparisonData = [
  { name: 'Solana', stateSize: 500, unit: 'GB', color: '#14F195' },
  { name: 'Ethereum', stateSize: 1.2, unit: 'TB', color: '#627EEA' },
  { name: 'Aptos', stateSize: 50, unit: 'GB', color: '#00D4AA' },
  { name: 'Sui', stateSize: 30, unit: 'GB', color: '#4F46E5' },
  { name: 'Avalanche', stateSize: 20, unit: 'GB', color: '#E84142' },
]

const rentCostsData = [
  { accountSize: '1KB', rent: 0.001, sol: 0.001 },
  { accountSize: '10KB', rent: 0.01, sol: 0.01 },
  { accountSize: '100KB', rent: 0.1, sol: 0.1 },
  { accountSize: '1MB', rent: 1.0, sol: 1.0 },
  { accountSize: '10MB', rent: 10.0, sol: 10.0 },
]

// const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']

export default function QuantitativeDashboard() {
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
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">500 GB</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Live State Size</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              <a href="#about-researcher" 
                 target="_blank" rel="noopener noreferrer" 
                 className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                Source: Independent Research
              </a>
            </div>
          </div>
          
          <div className="card text-center">
            <HardDrive className="w-8 h-8 text-accent-600 dark:text-accent-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">400+ TB</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Full Ledger</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              <a href="#about-researcher" 
                 target="_blank" rel="noopener noreferrer" 
                 className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                Source: Independent Research
              </a>
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
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">384+ GB</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">RAM Required</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              <a href="#about-researcher" 
                 target="_blank" rel="noopener noreferrer" 
                 className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                Source: Independent Research
              </a>
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
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-2 space-x-1">
              <span>Sources:</span>
              <a href="https://getblock.io/blog/solana-full-node-complete-guide/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400">GetBlock</a>
              <span>·</span>
              <a href="https://www.quicknode.com/guides/infrastructure/node-setup/ethereum-full-node-vs-archive-node" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400">QuickNode</a>
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
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Validator Cost Breakdown (Monthly)
            </h3>
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
              Source: <a href="#about-researcher" 
                         target="_blank" rel="noopener noreferrer" 
                         className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                Independent Research
              </a>
            </div>
          </motion.div>
        </div>

        {/* Blockchain Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="card mb-16"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Blockchain State Size Comparison
          </h3>
          <ResponsiveContainer width="100%" height={400}>
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
                label={{ value: 'State Size', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--tw-bg-opacity)',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: 'var(--tw-text-opacity)'
                }}
                formatter={(value, _name, props) => [
                  `${value} ${props.payload.unit}`,
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
            <a href="https://getblock.io/blog/solana-full-node-complete-guide/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400">GetBlock</a>
            <span>·</span>
            <a href="https://www.quicknode.com/guides/infrastructure/node-setup/ethereum-full-node-vs-archive-node" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400">QuickNode</a>
          </div>
        </motion.div>

        {/* Rent Costs Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="card"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Solana Rent Costs by Account Size
          </h3>
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
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-4">
            *Assuming SOL = $100 USD (auto-updatable by script). Reference: <a href="https://www.quicknode.com/guides/solana-development/getting-started/understanding-rent-on-solana" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">QuickNode</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
