import { motion } from 'framer-motion'
import { ExternalLink, CheckCircle, XCircle, AlertTriangle } from 'lucide-react'

const blockchains = [
  {
    name: 'Solana',
    logo: '/solana-sol-logo.png',
    approach: 'Full on-chain replication',
    currentState: '500 GB live state, 400+ TB full ledger',
    solutions: ['SIMD-0341', 'Avocado Project', 'State Compression'],
    effectiveness: 'Moderate - reduces storage but introduces complexity',
    pros: [
      'High throughput and low latency',
      'Strong developer ecosystem',
      'Active development and innovation'
    ],
    cons: [
      'Significant state bloat issues',
      'High validator hardware requirements',
      'Complex state management'
    ],
    source: 'Independent Research'
  },
  {
    name: 'Ethereum',
    logo: '/ethereum-eth-logo.png',
    approach: 'State pruning and proposed state expiry',
    currentState: '~1.2TB full node, ~12TB archive',
    solutions: ['Danksharding', 'ZK-rollups', 'State expiry proposals'],
    effectiveness: 'Moderate - slows growth but doesn\'t limit it',
    pros: [
      'Mature ecosystem and tooling',
      'Strong security guarantees',
      'Extensive research and development'
    ],
    cons: [
      'High gas fees and congestion',
      'Slow transaction finality',
      'Complex state management'
    ],
    source: 'https://www.quicknode.com/guides/infrastructure/node-setup/ethereum-full-node-vs-archive-node'
  },
  {
    name: 'Stellar',
    logo: '/stellar-xlm-logo.png',
    approach: 'State expiration in Soroban platform',
    currentState: 'Proactive state management from launch',
    solutions: ['Built-in state expiration', 'Tiered archival'],
    effectiveness: 'High - designed for state management from start',
    pros: [
      'Built-in state expiration',
      'Efficient resource management',
      'Strong focus on scalability'
    ],
    cons: [
      'Newer smart contract platform',
      'Limited ecosystem compared to others',
      'Less battle-tested'
    ],
    source: 'https://stellar.org/blog/developers/not-all-data-is-equal-how-soroban-is-solving-state-bloat-with-state-expiration'
  },
  {
    name: 'Accumulate',
    logo: '🔗',
    approach: 'Modular architecture with data anchoring',
    currentState: 'Distributed storage across multiple chains',
    solutions: ['Cross-chain anchoring', 'Modular data storage'],
    effectiveness: 'High - distributes storage burden',
    pros: [
      'Distributed storage approach',
      'Cross-chain compatibility',
      'Modular architecture'
    ],
    cons: [
      'Complex multi-chain coordination',
      'Newer and less established',
      'Potential security risks'
    ],
    source: 'https://accumulate.org/2022/07/solving-for-state-bloat-with-anchoring'
  },
  {
    name: 'Aptos',
    logo: '/aptos-apt-logo.png',
    approach: 'Novel data structures and consensus',
    currentState: 'Optimized state management',
    solutions: ['Move language optimizations', 'Efficient data structures'],
    effectiveness: 'Moderate - newer chain with optimizations',
    pros: [
      'Move language efficiency',
      'Parallel execution',
      'Modern architecture'
    ],
    cons: [
      'Newer and less battle-tested',
      'Limited ecosystem',
      'Unproven at scale'
    ],
    source: 'https://aptos.dev/'
  },
  {
    name: 'Sui',
    logo: '/sui-sui-logo.png',
    approach: 'Object-centric model with efficient storage',
    currentState: 'Designed for scalability from start',
    solutions: ['Object-based storage', 'Parallel execution'],
    effectiveness: 'High - built for scale',
    pros: [
      'Object-centric design',
      'Parallel execution capabilities',
      'Built for scalability'
    ],
    cons: [
      'Newer and unproven',
      'Limited ecosystem',
      'Complex object model'
    ],
    source: 'https://sui.io/'
  }
]

const effectivenessColors = {
  'High': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'Moderate': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'Low': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
}

export default function BlockchainComparison() {
  return (
    <section id="comparison" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Blockchain Comparison
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comparative analysis of how different blockchain networks approach state management, 
            storage optimization, and scalability solutions.
          </p>
        </motion.div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {blockchains.map((blockchain, index) => (
            <motion.div
              key={blockchain.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="card hover:shadow-xl transition-shadow duration-300"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {blockchain.logo.endsWith('.png') ? (
                    <img src={blockchain.logo} alt={`${blockchain.name} Logo`} className="w-7 h-7 rounded-sm" />
                  ) : (
                    <span className="text-2xl">{blockchain.logo}</span>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {blockchain.name}
                  </h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${effectivenessColors[blockchain.effectiveness.split(' - ')[0] as keyof typeof effectivenessColors]}`}>
                  {blockchain.effectiveness.split(' - ')[0]}
                </span>
              </div>

              {/* Approach */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Approach</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {blockchain.approach}
                </p>
              </div>

              {/* Current State */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Current State</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {blockchain.currentState}
                </p>
              </div>

              {/* Solutions */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Solutions</h4>
                <div className="flex flex-wrap gap-1">
                  {blockchain.solutions.map((solution, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs">
                      {solution}
                    </span>
                  ))}
                </div>
              </div>

              {/* Effectiveness */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Effectiveness</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {blockchain.effectiveness}
                </p>
              </div>

              {/* Pros and Cons */}
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2 text-sm">Pros</h4>
                  <ul className="space-y-1">
                    {blockchain.pros.slice(0, 2).map((pro, idx) => (
                      <li key={idx} className="flex items-start text-xs text-gray-600 dark:text-gray-300">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 text-sm">Cons</h4>
                  <ul className="space-y-1">
                    {blockchain.cons.slice(0, 2).map((con, idx) => (
                      <li key={idx} className="flex items-start text-xs text-gray-600 dark:text-gray-300">
                        <XCircle className="w-3 h-3 text-red-500 mr-1 flex-shrink-0 mt-0.5" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Source */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <a
                  href={blockchain.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-xs text-primary-600 dark:text-primary-400 hover:underline"
                >
                  <span>View Source</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="card mb-16"
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-8">
            Detailed Comparison Matrix
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Blockchain</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">State Size</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Storage Approach</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Solutions</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Effectiveness</th>
                </tr>
              </thead>
              <tbody>
                {blockchains.map((blockchain, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        {blockchain.logo.endsWith('.png') ? (
                          <img src={blockchain.logo} alt={`${blockchain.name} Logo`} className="w-5 h-5 rounded-sm" />
                        ) : (
                          <span className="text-lg">{blockchain.logo}</span>
                        )}
                        <span className="font-medium text-gray-900 dark:text-gray-100">{blockchain.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">
                      {blockchain.currentState}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">
                      {blockchain.approach}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">
                      {blockchain.solutions.join(', ')}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${effectivenessColors[blockchain.effectiveness.split(' - ')[0] as keyof typeof effectivenessColors]}`}>
                        {blockchain.effectiveness.split(' - ')[0]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Key Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="card"
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-8">
            Key Insights & Lessons Learned
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                Best Practices
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  Design state management from the beginning (Stellar, Sui)
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  Implement state expiration mechanisms early
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  Use modular and distributed storage approaches
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  Focus on developer experience and tooling
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
                Common Challenges
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <XCircle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  Retroactive implementation is complex (Ethereum)
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <XCircle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  Balancing decentralization with efficiency
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <XCircle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  Developer adoption and migration challenges
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <XCircle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  Maintaining backward compatibility
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Recommendation for Solana</h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Solana should adopt a hybrid approach combining the best practices from multiple blockchains: 
              implement state expiration mechanisms (inspired by Stellar), use distributed storage solutions 
              (inspired by Accumulate), and maintain strong developer tooling and backward compatibility 
              (inspired by Ethereum's ecosystem approach).
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
