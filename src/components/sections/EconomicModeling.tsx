import { motion } from 'framer-motion'
import { Shield, DollarSign, AlertTriangle, CheckCircle, BarChart3, Calculator } from 'lucide-react'
import economicModeling from '../../data/economic-modeling.json'

export default function EconomicModeling() {
  const gameTheory = economicModeling.gameTheory
  const tokenomics = economicModeling.tokenomics
  const economicSecurity = economicModeling.economicSecurity
  const costBenefit = economicModeling.costBenefitAnalysis

  return (
    <section id="economic-modeling" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Formal Economic Modeling & Game Theory Analysis
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Mathematical analysis of economic incentives, Nash equilibrium conditions, and security guarantees 
            for Solana state compression adoption.
          </p>
        </motion.div>

        {/* Game Theory Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="card mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
            <BarChart3 className="w-6 h-6 mr-3 text-primary-600" />
            Game Theory Analysis
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Nash Equilibrium */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Nash Equilibrium Proof
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
                {gameTheory.nashEquilibrium.description}
              </p>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Players & Strategies</h5>
                  <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• <strong>Validators:</strong> Adopt Compression vs Maintain Status Quo</li>
                    <li>• <strong>Developers:</strong> Migrate to Compression vs Stay On-Chain</li>
                    <li>• <strong>Users:</strong> Use Compressed Apps vs Traditional Apps</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Equilibrium Outcome</h5>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Type:</strong> {gameTheory.nashEquilibrium.equilibrium.type}<br/>
                    <strong>Outcome:</strong> {gameTheory.nashEquilibrium.equilibrium.outcome}<br/>
                    <strong>Proof:</strong> {gameTheory.nashEquilibrium.equilibrium.proof}
                  </p>
                </div>
              </div>
            </div>

            {/* MEV Analysis */}
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                MEV Analysis
              </h4>
              <p className="text-sm text-orange-800 dark:text-orange-200 mb-4">
                {gameTheory.mevAnalysis.description}
              </p>
              <div className="space-y-3">
                {gameTheory.mevAnalysis.opportunities.map((opportunity, index) => (
                  <div key={index} className="border border-orange-200 dark:border-orange-800 rounded p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h6 className="font-medium text-orange-900 dark:text-orange-100">{opportunity.type}</h6>
                      <span className={`px-2 py-1 rounded text-xs ${
                        opportunity.riskLevel === 'Low' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        opportunity.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {opportunity.riskLevel} Risk
                      </span>
                    </div>
                    <p className="text-xs text-orange-800 dark:text-orange-200 mb-2">{opportunity.description}</p>
                    <p className="text-xs text-orange-700 dark:text-orange-300">
                      <strong>Profitability:</strong> {(opportunity.profitability * 100).toFixed(1)}% | 
                      <strong> Mitigation:</strong> {opportunity.mitigation}
                    </p>
                  </div>
                ))}
                <div className="mt-4 p-3 bg-orange-100 dark:bg-orange-800 rounded">
                  <p className="text-sm text-orange-900 dark:text-orange-100">
                    <strong>Total MEV Impact:</strong> {(gameTheory.mevAnalysis.totalMEVImpact * 100).toFixed(1)}%<br/>
                    <strong>Conclusion:</strong> {gameTheory.mevAnalysis.conclusion}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sybil Attack Analysis */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Sybil Attack Cost-Benefit Analysis
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h5 className="font-medium text-red-900 dark:text-red-100 mb-2">Attack Costs</h5>
                <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                  <li>• <strong>Minimum Stake:</strong> {gameTheory.sybilAttackAnalysis.attackCosts.minimumStake} SOL</li>
                  <li>• <strong>USD Equivalent:</strong> ${gameTheory.sybilAttackAnalysis.attackCosts.usdEquivalent.toLocaleString()}</li>
                  <li>• <strong>Reputation Cost:</strong> {(gameTheory.sybilAttackAnalysis.attackCosts.reputationCost * 100).toFixed(0)}%</li>
                  <li>• <strong>Technical Complexity:</strong> {(gameTheory.sybilAttackAnalysis.attackCosts.technicalComplexity * 100).toFixed(0)}%</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-red-900 dark:text-red-100 mb-2">Attack Benefits</h5>
                <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                  <li>• <strong>Potential Gains:</strong> {(gameTheory.sybilAttackAnalysis.attackBenefits.potentialGains * 100).toFixed(1)}%</li>
                  <li>• <strong>Success Probability:</strong> {(gameTheory.sybilAttackAnalysis.attackBenefits.probabilityOfSuccess * 100).toFixed(1)}%</li>
                  <li>• <strong>Expected Value:</strong> {(gameTheory.sybilAttackAnalysis.attackBenefits.expectedValue * 100).toFixed(2)}%</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-red-900 dark:text-red-100 mb-2">Analysis Result</h5>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-900 dark:text-red-100 mb-2">
                    {gameTheory.sybilAttackAnalysis.costBenefitRatio}:1
                  </div>
                  <p className="text-sm text-red-800 dark:text-red-200">
                    Cost-Benefit Ratio
                  </p>
                  <p className="text-xs text-red-700 dark:text-red-300 mt-2">
                    {gameTheory.sybilAttackAnalysis.conclusion}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tokenomics Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="card mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
            <DollarSign className="w-6 h-6 mr-3 text-green-600" />
            Tokenomics Integration
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Inflation Schedule */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">Inflation Schedule Adjustments</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-800 dark:text-green-200">Current Inflation</span>
                  <span className="font-bold text-green-900 dark:text-green-100">{(tokenomics.inflationSchedule.currentInflation * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-800 dark:text-green-200">Compression Adjusted</span>
                  <span className="font-bold text-green-900 dark:text-green-100">{(tokenomics.inflationSchedule.compressionAdjustedInflation * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center border-t border-green-200 dark:border-green-800 pt-2">
                  <span className="text-sm text-green-800 dark:text-green-200">Reduction</span>
                  <span className="font-bold text-green-900 dark:text-green-100">-{(tokenomics.inflationSchedule.reduction * 100).toFixed(1)}%</span>
                </div>
                <p className="text-xs text-green-700 dark:text-green-300 mt-3">
                  {tokenomics.inflationSchedule.rationale}
                </p>
              </div>
            </div>

            {/* Fee Distribution */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4">Fee Distribution Mechanism</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Compression Fees</h5>
                  <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                    <li>• Compress Account: {tokenomics.feeDistribution.compressionFees.compressAccount} SOL</li>
                    <li>• Fetch Compressed: {tokenomics.feeDistribution.compressionFees.fetchCompressed} SOL</li>
                    <li>• Decompress Account: {tokenomics.feeDistribution.compressionFees.decompressAccount} SOL</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Distribution</h5>
                  <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                    <li>• Validators: {(tokenomics.feeDistribution.distribution.validators * 100).toFixed(0)}%</li>
                    <li>• Treasury: {(tokenomics.feeDistribution.distribution.treasury * 100).toFixed(0)}%</li>
                    <li>• Burn: {(tokenomics.feeDistribution.distribution.burn * 100).toFixed(0)}%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Validator Rewards & Penalties */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">Validator Rewards</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                <li>• Per Account Compressed: {tokenomics.validatorRewards.compressionRewards.perAccountCompressed} SOL</li>
                <li>• Per Proof Verified: {tokenomics.validatorRewards.compressionRewards.perProofVerified} SOL</li>
                <li>• Per Archival Success: {tokenomics.validatorRewards.compressionRewards.perArchivalSuccess} SOL</li>
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-4">Penalties</h4>
              <ul className="text-sm text-red-800 dark:text-red-200 space-y-2">
                <li>• Unavailability: {(tokenomics.validatorRewards.penalties.unavailability * 100).toFixed(0)}% of stake</li>
                <li>• Invalid Proofs: {(tokenomics.validatorRewards.penalties.invalidProofs * 100).toFixed(0)}% of stake</li>
                <li>• Late Archival: {(tokenomics.validatorRewards.penalties.lateArchival * 100).toFixed(0)}% of stake</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Cost-Benefit Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="card mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
            <Calculator className="w-6 h-6 mr-3 text-blue-600" />
            Cost-Benefit Analysis
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Validator Costs */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Validator Cost Savings</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Before Compression</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Monthly: ${costBenefit.validatorCosts.beforeCompression.monthly}<br/>
                    Annual: ${costBenefit.validatorCosts.beforeCompression.annual.toLocaleString()}
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">After Compression</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Monthly: ${costBenefit.validatorCosts.afterCompression.monthly}<br/>
                    Annual: ${costBenefit.validatorCosts.afterCompression.annual.toLocaleString()}
                  </p>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <h5 className="font-medium text-green-600 dark:text-green-400 mb-2">Savings</h5>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Monthly: ${costBenefit.validatorCosts.savings.monthly}<br/>
                    Annual: ${costBenefit.validatorCosts.savings.annual.toLocaleString()}<br/>
                    <strong>{(costBenefit.validatorCosts.savings.percentage * 100).toFixed(0)}% reduction</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Developer Costs */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Developer Cost Savings</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Before Compression</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Rent per Account: {costBenefit.developerCosts.beforeCompression.rentPerAccount} SOL
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">After Compression</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Rent per Account: {costBenefit.developerCosts.afterCompression.rentPerAccount} SOL
                  </p>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <h5 className="font-medium text-green-600 dark:text-green-400 mb-2">Savings</h5>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Per Account: {costBenefit.developerCosts.savings.perAccount} SOL<br/>
                    <strong>{(costBenefit.developerCosts.savings.percentage * 100).toFixed(0)}% reduction</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Network Benefits */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Network Benefits</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Scalability</h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• TPS Increase: {(costBenefit.networkBenefits.scalability.tpsIncrease * 100).toFixed(0)}%</li>
                    <li>• State Size Reduction: {(costBenefit.networkBenefits.scalability.stateSizeReduction * 100).toFixed(0)}%</li>
                    <li>• Validator Barrier Reduction: {(costBenefit.networkBenefits.scalability.validatorBarrierReduction * 100).toFixed(0)}%</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Decentralization</h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>• Validator Count Increase: {(costBenefit.networkBenefits.decentralization.validatorCountIncrease * 100).toFixed(0)}%</li>
                    <li>• Geographic Distribution: {(costBenefit.networkBenefits.decentralization.geographicDistribution * 100).toFixed(0)}%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Economic Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="card"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-3 text-red-600" />
            Economic Security Model
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Security Parameters</h4>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Minimum Stake Requirements</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Value:</strong> {economicSecurity.minimumStake.value} {economicSecurity.minimumStake.unit}<br/>
                    <strong>Rationale:</strong> {economicSecurity.minimumStake.rationale}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Insurance Fund</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Size:</strong> {economicSecurity.insuranceFund.size.toLocaleString()} {economicSecurity.insuranceFund.unit}<br/>
                    <strong>Purpose:</strong> {economicSecurity.insuranceFund.purpose}<br/>
                    <strong>Funding:</strong> {economicSecurity.insuranceFund.funding}
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Slashing Conditions</h4>
              <div className="space-y-3">
                {economicSecurity.slashingConditions.map((condition, index) => (
                  <div key={index} className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium text-red-900 dark:text-red-100">{condition.condition}</h5>
                      <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded text-xs font-medium">
                        {(condition.penalty * 100).toFixed(0)}% Slash
                      </span>
                    </div>
                    <p className="text-sm text-red-800 dark:text-red-200">{condition.description}</p>
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
