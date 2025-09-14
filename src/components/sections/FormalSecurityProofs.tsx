import { motion } from 'framer-motion'
import { Shield, Lock, CheckCircle, AlertTriangle, FileText, Calculator, Database, Zap } from 'lucide-react'
import securityProofs from '../../data/security-proofs.json'

export default function FormalSecurityProofs() {
  const cryptoProofs = securityProofs.cryptographicProofs
  const consensusSecurity = securityProofs.consensusSecurity
  const economicSecurity = securityProofs.economicSecurity
  const threatModel = securityProofs.threatModel
  const securityMetrics = securityProofs.securityMetrics

  return (
    <section id="formal-security-proofs" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Formal Security Proofs & Cryptographic Analysis
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Mathematical proofs, cryptographic analysis, and formal verification of security properties 
            for the Solana state compression system.
          </p>
        </motion.div>

        {/* Cryptographic Proofs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="card mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
            <Lock className="w-6 h-6 mr-3 text-blue-600" />
            Cryptographic Security Proofs
          </h3>
          
          <div className="space-y-8">
            {/* Merkle Tree Security */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                {cryptoProofs.merkleTreeSecurity.title}
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
                {cryptoProofs.merkleTreeSecurity.description}
              </p>
              
              <div className="bg-blue-100 dark:bg-blue-800 rounded p-4 mb-4">
                <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Theorem</h5>
                <p className="text-sm text-blue-800 dark:text-blue-200 font-mono">
                  {cryptoProofs.merkleTreeSecurity.theorem}
                </p>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-medium text-blue-900 dark:text-blue-100">Proof Steps</h5>
                {Object.entries(cryptoProofs.merkleTreeSecurity.proof).map(([step, content], index) => (
                  <div key={step} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-200 dark:bg-blue-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-blue-900 dark:text-blue-100">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-sm text-blue-800 dark:text-blue-200">{content}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <div>
                  <span className="text-blue-700 dark:text-blue-300">Security Level:</span>
                  <span className="ml-2 font-medium text-blue-900 dark:text-blue-100">
                    {cryptoProofs.merkleTreeSecurity.securityLevel}
                  </span>
                </div>
                <div>
                  <span className="text-blue-700 dark:text-blue-300">Assumptions:</span>
                  <span className="ml-2 text-blue-800 dark:text-blue-200">
                    {cryptoProofs.merkleTreeSecurity.assumptions.join(', ')}
                  </span>
                </div>
              </div>
            </div>

            {/* Proof Verification Security */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                {cryptoProofs.proofVerificationSecurity.title}
              </h4>
              <p className="text-sm text-green-800 dark:text-green-200 mb-4">
                {cryptoProofs.proofVerificationSecurity.description}
              </p>
              
              <div className="bg-green-100 dark:bg-green-800 rounded p-4 mb-4">
                <h5 className="font-medium text-green-900 dark:text-green-100 mb-2">Theorem</h5>
                <p className="text-sm text-green-800 dark:text-green-200 font-mono">
                  {cryptoProofs.proofVerificationSecurity.theorem}
                </p>
              </div>
              
              <div className="space-y-3">
                {Object.entries(cryptoProofs.proofVerificationSecurity.proof).map(([property, description]) => (
                  <div key={property} className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h6 className="font-medium text-green-900 dark:text-green-100 capitalize">
                        {property.replace(/([A-Z])/g, ' $1').trim()}
                      </h6>
                      <p className="text-sm text-green-800 dark:text-green-200">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Commitment Scheme Security */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4 flex items-center">
                <Database className="w-5 h-5 mr-2" />
                {cryptoProofs.commitmentSchemeSecurity.title}
              </h4>
              <p className="text-sm text-purple-800 dark:text-purple-200 mb-4">
                {cryptoProofs.commitmentSchemeSecurity.description}
              </p>
              
              <div className="bg-purple-100 dark:bg-purple-800 rounded p-4 mb-4">
                <h5 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Theorem</h5>
                <p className="text-sm text-purple-800 dark:text-purple-200 font-mono">
                  {cryptoProofs.commitmentSchemeSecurity.theorem}
                </p>
              </div>
              
              <div className="space-y-3">
                {Object.entries(cryptoProofs.commitmentSchemeSecurity.proof).map(([property, description]) => (
                  <div key={property} className="flex items-start space-x-3">
                    <Lock className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h6 className="font-medium text-purple-900 dark:text-purple-100 capitalize">
                        {property.replace(/([A-Z])/g, ' $1').trim()}
                      </h6>
                      <p className="text-sm text-purple-800 dark:text-purple-200">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Consensus Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="card mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
            <Zap className="w-6 h-6 mr-3 text-yellow-600" />
            Consensus Security Analysis
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Byzantine Fault Tolerance */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-4">
                {consensusSecurity.byzantineFaultTolerance.title}
              </h4>
              <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-4">
                {consensusSecurity.byzantineFaultTolerance.description}
              </p>
              
              <div className="bg-yellow-100 dark:bg-yellow-800 rounded p-4 mb-4">
                <h5 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">Theorem</h5>
                <p className="text-sm text-yellow-800 dark:text-yellow-200 font-mono">
                  {consensusSecurity.byzantineFaultTolerance.theorem}
                </p>
              </div>
              
              <div className="space-y-2">
                {Object.entries(consensusSecurity.byzantineFaultTolerance.proof).map(([step, description]) => (
                  <div key={step} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">{description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Availability */}
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-4">
                {consensusSecurity.dataAvailability.title}
              </h4>
              <p className="text-sm text-orange-800 dark:text-orange-200 mb-4">
                {consensusSecurity.dataAvailability.description}
              </p>
              
              <div className="bg-orange-100 dark:bg-orange-800 rounded p-4 mb-4">
                <h5 className="font-medium text-orange-900 dark:text-orange-100 mb-2">Theorem</h5>
                <p className="text-sm text-orange-800 dark:text-orange-200 font-mono">
                  {consensusSecurity.dataAvailability.theorem}
                </p>
              </div>
              
              <div className="space-y-2">
                {Object.entries(consensusSecurity.dataAvailability.proof).map(([step, description]) => (
                  <div key={step} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-orange-800 dark:text-orange-200">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Economic Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="card mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
            <Calculator className="w-6 h-6 mr-3 text-red-600" />
            Economic Security Analysis
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Attack Cost Analysis */}
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-4">
                {economicSecurity.attackCostAnalysis.title}
              </h4>
              <p className="text-sm text-red-800 dark:text-red-200 mb-4">
                {economicSecurity.attackCostAnalysis.description}
              </p>
              
              <div className="bg-red-100 dark:bg-red-800 rounded p-4 mb-4">
                <h5 className="font-medium text-red-900 dark:text-red-100 mb-2">Theorem</h5>
                <p className="text-sm text-red-800 dark:text-red-200 font-mono">
                  {economicSecurity.attackCostAnalysis.theorem}
                </p>
              </div>
              
              <div className="space-y-4">
                {Object.entries(economicSecurity.attackCostAnalysis.proof).map(([attackType, details]) => (
                  <div key={attackType} className="border border-red-200 dark:border-red-800 rounded p-3">
                    <h6 className="font-medium text-red-900 dark:text-red-100 mb-2 capitalize">
                      {attackType.replace(/([A-Z])/g, ' $1').trim()}
                    </h6>
                    <div className="space-y-1 text-sm text-red-800 dark:text-red-200">
                      <div><strong>Cost:</strong> {details.cost}</div>
                      <div><strong>Gain:</strong> {details.gain}</div>
                      <div><strong>Ratio:</strong> {details.ratio}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Incentive Compatibility */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">
                {economicSecurity.incentiveCompatibility.title}
              </h4>
              <p className="text-sm text-green-800 dark:text-green-200 mb-4">
                {economicSecurity.incentiveCompatibility.description}
              </p>
              
              <div className="bg-green-100 dark:bg-green-800 rounded p-4 mb-4">
                <h5 className="font-medium text-green-900 dark:text-green-100 mb-2">Theorem</h5>
                <p className="text-sm text-green-800 dark:text-green-200 font-mono">
                  {economicSecurity.incentiveCompatibility.theorem}
                </p>
              </div>
              
              <div className="space-y-2">
                {Object.entries(economicSecurity.incentiveCompatibility.proof).map(([participant, description]) => (
                  <div key={participant} className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h6 className="font-medium text-green-900 dark:text-green-100 capitalize">
                        {participant.replace(/([A-Z])/g, ' $1').trim()}
                      </h6>
                      <p className="text-sm text-green-800 dark:text-green-200">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Threat Model */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="card mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-3 text-orange-600" />
            Threat Model & Attack Vectors
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4">Attack Vector</th>
                  <th className="text-left py-3 px-4">Probability</th>
                  <th className="text-left py-3 px-4">Impact</th>
                  <th className="text-left py-3 px-4">Mitigation</th>
                  <th className="text-left py-3 px-4">Cost</th>
                </tr>
              </thead>
              <tbody>
                {threatModel.attackVectors.map((attack, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900 dark:text-gray-100">{attack.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{attack.description}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-900 dark:text-gray-100">{attack.probability}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        attack.impact === 'Critical' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        attack.impact === 'High' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {attack.impact}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{attack.mitigation}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{attack.cost}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Security Assumptions</h4>
            <ul className="space-y-2">
              {threatModel.securityAssumptions.map((assumption, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{assumption}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Security Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="card"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
            <FileText className="w-6 h-6 mr-3 text-gray-600" />
            Security Metrics Summary
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-3">Cryptographic Security</h4>
              <div className="space-y-2 text-sm">
                {Object.entries(securityMetrics.cryptographicSecurity).map(([property, value]) => (
                  <div key={property} className="flex justify-between">
                    <span className="text-blue-800 dark:text-blue-200 capitalize">
                      {property.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="font-medium text-blue-900 dark:text-blue-100">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-3">Consensus Security</h4>
              <div className="space-y-2 text-sm">
                {Object.entries(securityMetrics.consensusSecurity).map(([property, value]) => (
                  <div key={property} className="flex justify-between">
                    <span className="text-yellow-800 dark:text-yellow-200 capitalize">
                      {property.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="font-medium text-yellow-900 dark:text-yellow-100">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
              <h4 className="font-medium text-red-900 dark:text-red-100 mb-3">Economic Security</h4>
              <div className="space-y-2 text-sm">
                {Object.entries(securityMetrics.economicSecurity).map(([property, value]) => (
                  <div key={property} className="flex justify-between">
                    <span className="text-red-800 dark:text-red-200 capitalize">
                      {property.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="font-medium text-red-900 dark:text-red-100">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-3">Implementation Security</h4>
              <div className="space-y-2 text-sm">
                {Object.entries(securityMetrics.implementationSecurity).map(([property, value]) => (
                  <div key={property} className="flex justify-between">
                    <span className="text-green-800 dark:text-green-200 capitalize">
                      {property.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="font-medium text-green-900 dark:text-green-100">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

