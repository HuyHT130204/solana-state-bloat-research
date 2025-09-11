import { motion } from 'framer-motion'

const vectors = [
  { 
    v: 'Data Availability Failure', 
    m: 'k-of-n providers, periodic attestations, fallback mirrors, economic penalties',
    risk: 'High',
    impact: 'Could prevent account access and break applications'
  },
  { 
    v: 'Invalid/Malleable Proofs', 
    m: 'Domain-separated hashing, strict proof formats, versioned codecs, audits',
    risk: 'Critical',
    impact: 'Could lead to incorrect account data'
  },
  { 
    v: 'Archival Race/Spam', 
    m: 'Deterministic archival windows, rate limits, rewards only once per cohort',
    risk: 'Medium',
    impact: 'Could disrupt archival process and waste resources'
  },
  { 
    v: 'CPI Surface Abuse', 
    m: 'Compute metering, size caps, proof verification before read, syscall gating',
    risk: 'High',
    impact: 'Could lead to resource exhaustion or incorrect data'
  },
  { 
    v: 'Replay/Consistency', 
    m: 'Root commitments per slot, replay protection, pointer epochs',
    risk: 'High',
    impact: 'Could lead to incorrect application state'
  },
  { 
    v: 'Economic Attacks', 
    m: 'Minimum stake requirements, slashing conditions, insurance fund',
    risk: 'Medium',
    impact: 'Could manipulate economic incentives'
  },
  { 
    v: 'Network Partition', 
    m: 'Multi-provider redundancy, cross-chain attestations, fallback mechanisms',
    risk: 'Medium',
    impact: 'Could cause temporary unavailability'
  },
  { 
    v: 'Code Vulnerabilities', 
    m: 'Independent audits, fuzzing, formal verification, bug bounty program',
    risk: 'High',
    impact: 'Could lead to system compromise'
  }
]

export default function SecurityAppendix() {
  return (
    <section id="security-appendix" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-max">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="card">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">Security & Threat Model</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Threat vectors and primary mitigations for compression and off-chain availability paths.</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4">Threat Vector</th>
                  <th className="text-left py-3 px-4">Risk Level</th>
                  <th className="text-left py-3 px-4">Impact</th>
                  <th className="text-left py-3 px-4">Mitigations</th>
                </tr>
              </thead>
              <tbody>
                {vectors.map((r) => (
                  <tr key={r.v} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 font-medium">{r.v}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        r.risk === 'Critical' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        r.risk === 'High' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {r.risk}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">{r.impact}</td>
                    <td className="py-3 px-4 text-sm">{r.m}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Audit Plan & Recommendations</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                <h4 className="font-medium mb-2">Phase 1: Code Review</h4>
                <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                  <li>• Proof verification logic</li>
                  <li>• Syscall implementation</li>
                  <li>• Error handling and edge cases</li>
                  <li>• Memory safety and bounds checking</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                <h4 className="font-medium mb-2">Phase 2: Cryptographic Analysis</h4>
                <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                  <li>• Merkle tree construction and verification</li>
                  <li>• Hash function usage and domain separation</li>
                  <li>• Proof format and validation</li>
                  <li>• Commitment scheme security</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                <h4 className="font-medium mb-2">Phase 3: Economic Analysis</h4>
                <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                  <li>• Incentive mechanism design</li>
                  <li>• Attack cost analysis</li>
                  <li>• Slashing condition effectiveness</li>
                  <li>• Fee structure and cost recovery</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                <h4 className="font-medium mb-2">Phase 4: Integration Testing</h4>
                <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                  <li>• End-to-end system testing</li>
                  <li>• Stress testing and load testing</li>
                  <li>• Fuzzing and property-based testing</li>
                  <li>• Network partition testing</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Key Recommendations</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Engage third-party security firm for independent audit</li>
                <li>• Launch bug bounty program with significant rewards</li>
                <li>• Deploy in stages with comprehensive monitoring</li>
                <li>• Implement incident response procedures</li>
                <li>• Regular security reviews and updates</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


