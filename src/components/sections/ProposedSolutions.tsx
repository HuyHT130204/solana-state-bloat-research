import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Clock, DollarSign, Shield, Users, Code, AlertTriangle } from 'lucide-react'

const solutions = [
  {
    id: 'enhanced-state-compression',
    title: 'Enhanced State Compression with CPI-Aware Fetch APIs',
    summary: 'This solution enhances existing state compression techniques by introducing Cross-Program Invocation (CPI)-aware fetch APIs, allowing programs to access compressed state data without full decompression. The approach builds upon SIMD-0341 and the Avocado project while addressing key limitations around CPI breakage and data interoperability.',
    technicalDesign: {
      architecture: 'Middleware layer that intercepts CPI calls, fetching and decompressing only necessary data segments on-demand using Merkle proofs for verification',
      dataFlow: 'Compressed data stored off-chain → On-chain Merkle roots → CPI-aware fetch APIs → Selective decompression → Program access',
      keyComponents: [
        'Compression engine (Binary Trie/Patricia Trie)',
        'Merkle proof verification system',
        'CPI-aware middleware layer',
        'On-demand decompression service',
        'Caching layer for frequently accessed data'
      ]
    },
    implementationFeasibility: {
      requiresRuntimeChanges: true,
      requiresConsensusChanges: true,
      backwardCompatible: true,
      requiresHardFork: true,
      applicationLayerOnly: false
    },
    costEstimate: {
      development: 'High (6-12 months, 5-8 engineers)',
      deployment: 'Moderate (network upgrade required)',
      operational: 'Low (reduced storage costs)',
      validatorSavings: '30-50% hardware reduction',
      developerSavings: '40-60% rent cost reduction'
    },
    migrationPlan: {
      phase1: 'Protocol upgrade with opt-in compression',
      phase2: 'Developer tooling and documentation',
      phase3: 'Incentivized migration program',
      phase4: 'Mandatory adoption after testing'
    },
    securityConsiderations: [
      'Data integrity through Merkle proofs',
      'Explicit data availability guarantees via replicated blob storage (e.g., Arweave/Filecoin) with retention SLAs',
      'CPI call security and validation',
      'Compression/decompression attack vectors'
    ],
    pros: [
      'Significant storage reduction (up to 50%)',
      'Maintains CPI compatibility',
      'Backward compatible',
      'Reduces validator hardware requirements'
    ],
    cons: [
      'Requires protocol changes',
      'Increased complexity',
      'Potential latency for decompression',
      'Dependency on off-chain storage'
    ]
  },
  // Inline syscall/API and proof placeholders for reviewer expectations
  {
    id: 'enhanced-syscalls-spec',
    title: 'Syscalls & APIs (Spec Sketch)',
    summary: 'Concrete syscall/API surface and proof formats to preserve CPI compatibility and on-chain verifiability.',
    technicalDesign: {
      architecture: 'Runtime-assisted fetch with proof verification; optional client-attached proofs.',
      dataFlow: 'Program → CPI call → runtime fetch/decompress/verify → return slice to caller',
      keyComponents: [
        'sol_compress_account(pubkey, combined_hash) [SIMD-0341-inspired]',
        'sol_decompress_account(ptr, len)',
        'sol_fetch_compressed(pubkey, proof_ptr, proof_len) // client-attached proof',
        'sol_fetch_with_proof(uri, pubkey) // runtime-assisted fetch+verify',
        'Proof format: Merkle path (32B * depth), domain-separated leaf hash'
      ]
    },
    implementationFeasibility: { requiresRuntimeChanges: true, requiresConsensusChanges: true, backwardCompatible: true, requiresHardFork: true, applicationLayerOnly: false },
    costEstimate: { development: 'Spec only', deployment: 'N/A', operational: 'N/A', validatorSavings: 'N/A', developerSavings: 'N/A' },
    migrationPlan: { phase1: 'Testnet gate', phase2: 'SDKs', phase3: 'Pilot', phase4: 'Mainnet feature-gate' },
    securityConsiderations: [ 'Invalid proof rejection', 'Anti-spam metering', 'Availability fallbacks (k-of-n providers)' ],
    pros: [ 'Clear CPI-safe surface', 'Auditable proofs' ],
    cons: [ 'Requires fork', 'Runtime changes' ]
  },
  {
    id: 'verifiable-off-chain-storage',
    title: 'Verifiable Off-Chain Storage with On-Chain Commitments & zk/SNARK Proofs',
    summary: 'This solution leverages decentralized storage networks like Arweave or Filecoin to store large account data off-chain, with on-chain commitments and zero-knowledge proofs ensuring data availability and integrity. The approach provides significant storage cost reductions while maintaining cryptographic guarantees.',
    technicalDesign: {
      architecture: 'Hybrid on-chain/off-chain storage with cryptographic commitments and zk-SNARK proofs for verification',
      dataFlow: 'Account data → Off-chain storage (Arweave/Filecoin) → Cryptographic commitment → On-chain Merkle root → zk-SNARK proof → Verification',
      keyComponents: [
        'Decentralized storage integration (Arweave/Filecoin)',
        'zk-SNARK proof generation system',
        'On-chain commitment storage',
        'Data retrieval and verification APIs',
        'Fallback mechanisms for data availability'
      ]
    },
    implementationFeasibility: {
      requiresRuntimeChanges: false,
      requiresConsensusChanges: false,
      backwardCompatible: true,
      requiresHardFork: false,
      applicationLayerOnly: true
    },
    costEstimate: {
      development: 'Moderate (3-6 months, 3-5 engineers)',
      deployment: 'Low (application layer only)',
      operational: 'Low (off-chain storage costs)',
      validatorSavings: '60-80% storage reduction',
      developerSavings: '70-90% rent cost reduction'
    },
    migrationPlan: {
      phase1: 'Developer SDK and tooling',
      phase2: 'Pilot program with select dApps',
      phase3: 'Community adoption incentives',
      phase4: 'Full ecosystem integration'
    },
    securityConsiderations: [
      'zk-SNARK proof security',
      'Off-chain data availability with verifiable persistence (anchor commitments, retrieval proofs)',
      'Commitment scheme integrity',
      'Network partition resilience'
    ],
    pros: [
      'Massive storage cost reduction',
      'No protocol changes required',
      'Cryptographic guarantees',
      'Leverages existing infrastructure'
    ],
    cons: [
      'Dependency on external networks',
      'zk-SNARK complexity',
      'Potential data availability issues',
      'Higher development complexity'
    ]
  },
  {
    id: 'state-expiry-archival',
    title: 'State Expiry with Tiered Archival Nodes & Cryptographic Proofs',
    summary: 'This solution implements a state expiration mechanism where inactive accounts are pruned from the active state and moved to archival nodes, reducing the active state size while preserving historical data through cryptographic proofs. The approach provides long-term scalability while maintaining data integrity.',
    technicalDesign: {
      architecture: 'Tiered storage system with active state, archival state, and cryptographic proofs for data restoration',
      dataFlow: 'Active accounts → TTL monitoring → Expiry detection → Archival transfer → Cryptographic proof → On-chain reference',
      keyComponents: [
        'TTL management system',
        'Archival node network',
        'Cryptographic proof generation',
        'Data restoration mechanisms',
        'State transition protocols'
      ]
    },
    implementationFeasibility: {
      requiresRuntimeChanges: true,
      requiresConsensusChanges: true,
      backwardCompatible: true,
      requiresHardFork: true,
      applicationLayerOnly: false
    },
    costEstimate: {
      development: 'High (8-12 months, 6-10 engineers)',
      deployment: 'High (major protocol upgrade)',
      operational: 'Moderate (archival infrastructure)',
      validatorSavings: '40-70% active state reduction',
      developerSavings: '30-50% rent cost reduction'
    },
    migrationPlan: {
      phase1: 'Protocol design and testing',
      phase2: 'Archival infrastructure setup',
      phase3: 'Gradual TTL implementation',
      phase4: 'Full state expiry activation'
    },
    securityConsiderations: [
      'Data integrity in archival storage',
      'Proof verification security',
      'State transition consistency',
      'Archival node reliability'
    ],
    pros: [
      'Long-term scalability solution',
      'Preserves historical data',
      'Reduces active state size',
      'Cryptographic guarantees'
    ],
    cons: [
      'Complex implementation',
      'Requires major protocol changes',
      'Archival infrastructure costs',
      'Potential data retrieval delays'
    ]
  }
]

const feasibilityIcons = {
  'true': CheckCircle,
  'false': XCircle
}

const feasibilityColors = {
  'true': 'text-green-500',
  'false': 'text-red-500'
}

export default function ProposedSolutions() {
  return (
    <section id="solutions" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Proposed Enduring Solutions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Three comprehensive solutions designed to address Solana's state bloat problem while maintaining 
            developer experience, data integrity, and network decentralization.
          </p>
        </motion.div>

        {solutions.map((solution, index) => (
          <motion.div
            key={solution.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 * index }}
            viewport={{ once: true }}
            className="card mb-16"
          >
            {/* Solution Header */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {solution.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {solution.summary}
              </p>
            </div>

            {/* Technical Design */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2" />
                Technical Design
              </h4>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-4">
                <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Architecture</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {solution.technicalDesign.architecture}
                </p>
                <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Data Flow</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {solution.technicalDesign.dataFlow}
                </p>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Key Components</h5>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {solution.technicalDesign.keyComponents.map((component, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {component}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Implementation Feasibility */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Implementation Feasibility
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(solution.implementationFeasibility).map(([key, value]) => {
                  const Icon = feasibilityIcons[String(value) as keyof typeof feasibilityIcons]
                  const colorClass = feasibilityColors[String(value) as keyof typeof feasibilityColors]
                  return (
                    <div key={key} className="text-center">
                      <Icon className={`w-6 h-6 mx-auto mb-2 ${colorClass}`} />
                      <div className="text-xs text-gray-600 dark:text-gray-300 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Cost Estimate */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Cost Estimate & Benefits
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Development</h5>
                  <p className="text-sm text-blue-800 dark:text-blue-200">{solution.costEstimate.development}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h5 className="font-medium text-green-900 dark:text-green-100 mb-2">Validator Savings</h5>
                  <p className="text-sm text-green-800 dark:text-green-200">{solution.costEstimate.validatorSavings}</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <h5 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Developer Savings</h5>
                  <p className="text-sm text-purple-800 dark:text-purple-200">{solution.costEstimate.developerSavings}</p>
                </div>
              </div>
            </div>

            {/* 2x2 Grid Layout for Key Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Migration Plan - Top Left */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Migration & Adoption Plan
                </h4>
                <div className="space-y-3">
                  {Object.entries(solution.migrationPlan).map(([phase, description]) => (
                    <div key={phase} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                          {phase.replace('phase', '')}
                        </span>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                          {phase.replace(/([A-Z])/g, ' $1').trim()}
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Considerations - Top Right */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security & Privacy Considerations
                </h4>
                <ul className="space-y-2">
                  {solution.securityConsiderations.map((consideration, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                      {consideration}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Advantages - Bottom Left */}
              <div>
                <h4 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Advantages
                </h4>
                <ul className="space-y-2">
                  {solution.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Challenges - Bottom Right */}
              <div>
                <h4 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center">
                  <XCircle className="w-5 h-5 mr-2" />
                  Challenges
                </h4>
                <ul className="space-y-2">
                  {solution.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                      <XCircle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Syscall Specification Sketch */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="card mb-16"
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Syscall Specification (Sketch)</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4">Function</th>
                  <th className="text-left py-3 px-4">Signature</th>
                  <th className="text-left py-3 px-4">Purpose</th>
                  <th className="text-left py-3 px-4">Est. Compute</th>
                  <th className="text-left py-3 px-4">Proof Size (est.)</th>
                  <th className="text-left py-3 px-4">Errors</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4 font-medium">sol_compress_account</td>
                  <td className="py-3 px-4 text-sm font-mono">(pubkey: [u8;32], combined_hash: [u8;32]) -&gt; Result</td>
                  <td className="py-3 px-4">Commit account bytes into compression tree</td>
                  <td className="py-3 px-4">~20–40k CU</td>
                  <td className="py-3 px-4">n/a</td>
                  <td className="py-3 px-4 text-sm">InvalidAccount, TreeFull</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4 font-medium">sol_fetch_compressed</td>
                  <td className="py-3 px-4 text-sm font-mono">(pubkey: [u8;32], proof_ptr: *const u8, proof_len: u32, offset: u32, len: u32) -&gt; Result&lt;*const u8&gt;</td>
                  <td className="py-3 px-4">Return verified slice for CPI without full decompression</td>
                  <td className="py-3 px-4">~30–60k CU + O(depth)</td>
                  <td className="py-3 px-4">~640–1024B (depth 10–16)</td>
                  <td className="py-3 px-4 text-sm">InvalidProof, OutOfBounds</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">sol_fetch_with_proof</td>
                  <td className="py-3 px-4 text-sm font-mono">(uri: *const u8, pubkey: [u8;32], offset: u32, len: u32) -&gt; Result&lt;*const u8&gt;</td>
                  <td className="py-3 px-4">Runtime-assisted fetch+verify from DA provider</td>
                  <td className="py-3 px-4">~60–120k CU</td>
                  <td className="py-3 px-4">~1–2KB incl. metadata</td>
                  <td className="py-3 px-4 text-sm">Unavailable, Timeout, InvalidCommitment</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Solution Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="card"
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-8">
            Solution Comparison & Recommendations
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Solution</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Implementation Complexity</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Storage Reduction</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Developer Impact</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Recommendation</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Enhanced State Compression</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">High</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">30-50%</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Low</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-xs font-medium">
                      Recommended
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Verifiable Off-Chain Storage</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Medium</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">60-80%</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Medium</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs font-medium">
                      Alternative
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">State Expiry with Archival</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">Very High</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">40-70%</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">High</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-xs font-medium">
                      Long-term
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Final Recommendation</h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              We recommend implementing <strong>Enhanced State Compression with CPI-Aware Fetch APIs</strong> as the primary solution, 
              with <strong>Verifiable Off-Chain Storage</strong> as a complementary approach for specific use cases. 
              The State Expiry solution should be considered for long-term implementation after thorough testing.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
