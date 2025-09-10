import { motion } from 'framer-motion'
import { AlertTriangle, HardDrive, DollarSign, Users, TrendingUp, Database } from 'lucide-react'

const problems = [
  {
    icon: HardDrive,
    title: 'Massive Storage Requirements',
    description: 'Solana\'s account model requires all account data to be stored fully on-chain and replicated across all validators indefinitely.',
    stats: '500 GB live state, 400+ TB full ledger',
    impact: 'High'
  },
  {
    icon: DollarSign,
    title: 'Exorbitant Operational Costs',
    description: 'Validators require high-end hardware (384+ GB RAM, enterprise NVMe storage) driving operational costs of $500-$1,000/month.',
    stats: '$500-1,000/month per validator',
    impact: 'High'
  },
  {
    icon: Users,
    title: 'Developer Rent Burden',
    description: 'Developers face rent costs proportional to data size, with small accounts requiring 0.001-0.01 SOL for rent exemption.',
    stats: '0.001-0.01 SOL per small account',
    impact: 'Medium'
  },
  {
    icon: TrendingUp,
    title: 'Exponential Growth',
    description: 'Ledger growth is substantial; industry guides report tens → hundreds of TB per year depending on role (archive/full history).',
    stats: 'Ledger growth: tens → hundreds TB/year',
    impact: 'Critical'
  },
  {
    icon: Database,
    title: 'Centralization Risk',
    description: 'High hardware requirements create barriers to entry for validators, potentially leading to centralization.',
    stats: '384+ GB RAM requirement',
    impact: 'High'
  },
  {
    icon: AlertTriangle,
    title: 'Scalability Bottleneck',
    description: 'State bloat becomes a fundamental scalability bottleneck that could limit Solana\'s growth potential.',
    stats: 'Critical for long-term viability',
    impact: 'Critical'
  }
]

const impactColors = {
  Low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  High: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  Critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
}

export default function ProblemOverview() {
  return (
    <section id="overview" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            The State Bloat Problem
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Solana's account model, while enabling high throughput, creates significant challenges 
            through its requirement for full on-chain data replication across all validators.
          </p>
        </motion.div>

        {/* Key Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <div className="card text-center">
            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">≈500 GB</div>
            <div className="text-gray-600 dark:text-gray-400">Live Account State (Accounts DB)</div>
            <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              Source: <a href="https://getblock.io/blog/solana-full-node-complete-guide/" 
                        target="_blank" rel="noopener noreferrer" 
                        className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                GetBlock Guide
              </a>
            </div>
          </div>
          
          <div className="card text-center">
            <div className="text-4xl font-bold text-accent-600 dark:text-accent-400 mb-2">400+ TB</div>
            <div className="text-gray-600 dark:text-gray-400">Full Unpruned Ledger (Archive)</div>
            <div className="text-sm text-gray-500 dark:text-gray-500 mt-1 space-x-1">
              <span>Sources:</span>
              <a href="https://rpcfast.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400">RPC Fast</a>
              <span>·</span>
              <a href="https://getblock.io/blog/solana-full-node-complete-guide/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400">GetBlock</a>
            </div>
          </div>
          
          <div className="card text-center">
            <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">$500–$1,000</div>
            <div className="text-gray-600 dark:text-gray-400">Monthly Validator Costs (est.)</div>
            <div className="text-sm text-gray-500 dark:text-gray-500 mt-1 space-x-1">
              <span>Examples:</span>
              <a href="https://www.servermania.com/kb/articles/how-to-host-solana-validator-node" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400">ServerMania</a>
              <span>·</span>
              <a href="https://rpcfast.com/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400">RPC Fast</a>
            </div>
          </div>
        </motion.div>

        {/* Problem Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {problems.map((problem, index) => {
            const Icon = problem.icon
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="card hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {problem.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${impactColors[problem.impact as keyof typeof impactColors]}`}>
                        {problem.impact}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {problem.description}
                    </p>
                    <div className="text-sm font-medium text-primary-600 dark:text-primary-400">
                      {problem.stats}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              The Need for Enduring Solutions
            </h3>
            <p className="text-lg mb-6 opacity-90">
              These challenges require comprehensive solutions that balance validator storage reduction, 
              developer data interoperability, and seamless user experience.
            </p>
            <button
              onClick={() => {
                const element = document.querySelector('#solutions')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Explore Proposed Solutions
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
