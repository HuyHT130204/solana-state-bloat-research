import { motion } from 'framer-motion'
import { CheckCircle, XCircle, AlertTriangle, ExternalLink, Code, Database, Users } from 'lucide-react'

const simdFeatures = [
  {
    title: 'State Compression',
    description: 'Replaces account data with hashes and migrates account index to Binary Trie or Patricia Trie',
    status: 'implemented',
    details: 'Reduces storage footprint by compressing inactive accounts'
  },
  {
    title: 'Avocado Project',
    description: 'Compression system that binds accounts to specific lamports per byte during allocation',
    status: 'implemented',
    details: 'Accounts compressed over multiple epochs if economically viable'
  },
  {
    title: 'Merkle Tree Storage',
    description: 'Uses cryptographic commitments to maintain data integrity while reducing storage',
    status: 'implemented',
    details: 'Enables verification without storing full data'
  }
]

const limitations = [
  {
    icon: XCircle,
    title: 'CPI Breakage',
    description: 'Cross-Program Invocations cannot directly access compressed accounts without decompression',
    impact: 'High',
    details: 'Transactions referencing compressed accounts fail unless decompressed'
  },
  {
    icon: Users,
    title: 'UI/Indexer Reliance',
    description: 'Applications must rely on external indexers to access compressed data',
    impact: 'High',
    details: 'Creates dependency on third-party infrastructure'
  },
  {
    icon: Database,
    title: 'Data Interoperability',
    description: 'Compressed data may not be directly accessible across different applications',
    impact: 'Medium',
    details: 'Requires additional abstraction layers for cross-app compatibility'
  },
  {
    icon: AlertTriangle,
    title: 'Decompression Overhead',
    description: 'Accessing compressed data requires computational overhead for decompression',
    impact: 'Medium',
    details: 'May introduce latency and increased transaction costs'
  }
]

const impactColors = {
  Low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  High: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
}

export default function SIMDReview() {
  return (
    <section id="simd-review" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            SIMD-0341 & State Compression Analysis
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive evaluation of existing state compression proposals, their benefits, and critical limitations that need to be addressed.
          </p>
        </motion.div>

        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="card mb-16"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                What is SIMD-0341?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                SIMD-0341 and related state compression proposals (including the Avocado project) aim to reduce Solana's on-chain storage requirements 
                by replacing detailed account data with cryptographic hashes and implementing compression techniques for inactive accounts.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Key Insight:</strong> These proposals can potentially save up to 50% of the snapshot size by compressing accounts 
                  that have not been accessed for over six months, but introduce significant developer and UI friction.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Current Implementation Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-8">
            Current Implementation Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {simdFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="card"
              >
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {feature.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {feature.details}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Critical Limitations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-8">
            Critical Limitations & Challenges
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {limitations.map((limitation, index) => {
              const Icon = limitation.icon
              return (
                <motion.div
                  key={limitation.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="card border-l-4 border-red-500"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Icon className="w-6 h-6 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                          {limitation.title}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${impactColors[limitation.impact as keyof typeof impactColors]}`}>
                          {limitation.impact} Impact
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {limitation.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {limitation.details}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Technical Deep Dive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="card mb-16"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Technical Deep Dive: How State Compression Works
          </h3>
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">1. Account Allocation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Each account is bound to a specific amount of lamports per byte during allocation. 
                If economically viable, the account is kept in memory and compressed over multiple epochs.
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                Source: <a href="https://docs.solana.com/developers/courses/state-compression/generalized-state-compression" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400">Solana Docs</a>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">2. Data Replacement</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Account data is replaced with hash values, and the account index is migrated to a Binary Trie or Patricia Trie structure.
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                Source: <a href="https://github.com/solana-foundation/solana-improvement-documents" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400">SIMD Discussion</a>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">3. Access Limitations</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Transactions referencing compressed accounts fail unless the account is decompressed, 
                which requires uploading the original data similar to loading programs.
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                Sources: <a href="https://docs.solana.com/developers/courses/state-compression/generalized-state-compression" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400">Solana Docs</a>
                <span className="mx-1">·</span>
                <a href="https://www.helius.dev/blog/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400">Helius Blog</a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* References */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="card"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            References & Further Reading
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  Solana State Compression Documentation
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Official documentation on generalized state compression
                </p>
              </div>
              <a
                href="https://docs.solana.com/developers/courses/state-compression/generalized-state-compression"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:underline"
              >
                <span>View Docs</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  Solana GitHub Repository
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Source code and implementation details
                </p>
              </div>
              <a
                href="https://github.com/solana-labs/solana"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:underline"
              >
                <span>View Code</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  Stellar Soroban State Expiration Analysis
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Comparative analysis of state management approaches
                </p>
              </div>
              <a
                href="https://stellar.org/blog/developers/not-all-data-is-equal-how-soroban-is-solving-state-bloat-with-state-expiration"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:underline"
              >
                <span>Read Article</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
