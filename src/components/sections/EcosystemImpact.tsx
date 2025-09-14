import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, TrendingUp, Target, Award, Zap, Database, Globe, Rocket, CheckCircle, AlertTriangle, DollarSign } from 'lucide-react'
import ecosystemImpact from '../../data/ecosystem-impact.json'

export default function EcosystemImpact() {
  const [activeTab, setActiveTab] = useState('developer')
  
  const developerExperience = ecosystemImpact.developerExperience
  const ecosystemImpactData = ecosystemImpact.ecosystemImpact
  const adoptionBarriers = ecosystemImpact.adoptionBarriers
  const adoptionIncentives = ecosystemImpact.adoptionIncentives
  const successMetrics = ecosystemImpact.successMetrics

  const tabs = [
    { id: 'developer', label: 'Developer Experience', icon: Code },
    { id: 'ecosystem', label: 'Ecosystem Impact', icon: Globe },
    { id: 'adoption', label: 'Adoption Strategy', icon: Rocket },
    { id: 'metrics', label: 'Success Metrics', icon: Target }
  ]

  return (
    <section id="ecosystem-impact" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Ecosystem Impact & Developer Experience
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive analysis of how state compression will transform the Solana ecosystem, 
            improve developer experience, and drive adoption across the blockchain.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="card mb-8"
        >
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Developer Experience Tab */}
          {activeTab === 'developer' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <Code className="w-6 h-6 mr-3 text-blue-600" />
                Developer Experience Framework
              </h3>

              {/* SDK Features */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  Compression SDK
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
                  {developerExperience.sdk.compressionClient.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-3">Key Features</h5>
                    <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                      {developerExperience.sdk.compressionClient.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-3">API Examples</h5>
                    <div className="space-y-3">
                      {Object.entries(developerExperience.sdk.compressionClient.api).map(([method, details]) => (
                        <div key={method} className="bg-blue-100 dark:bg-blue-800 rounded p-3">
                          <h6 className="font-medium text-blue-900 dark:text-blue-100 text-sm">{method}</h6>
                          <p className="text-xs text-blue-800 dark:text-blue-200 mb-2">{details.description}</p>
                          <div className="bg-blue-900 text-blue-100 p-2 rounded text-xs font-mono">
                            {details.example}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Migration Support */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center">
                  <Rocket className="w-5 h-5 mr-2" />
                  Migration Support
                </h4>
                <p className="text-sm text-green-800 dark:text-green-200 mb-4">
                  {developerExperience.migrationSupport.migrationTools.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {developerExperience.migrationSupport.migrationStrategies.map((strategy, index) => (
                    <div key={index} className="bg-green-100 dark:bg-green-800 rounded-lg p-4">
                      <h5 className="font-medium text-green-900 dark:text-green-100 mb-2">{strategy.name}</h5>
                      <p className="text-sm text-green-800 dark:text-green-200 mb-3">{strategy.description}</p>
                      
                      <div className="space-y-2">
                        <div>
                          <h6 className="text-xs font-medium text-green-900 dark:text-green-100">Pros:</h6>
                          <ul className="text-xs text-green-800 dark:text-green-200 space-y-1">
                            {strategy.pros.map((pro, i) => (
                              <li key={i}>• {pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-xs font-medium text-green-900 dark:text-green-100">Cons:</h6>
                          <ul className="text-xs text-green-800 dark:text-green-200 space-y-1">
                            {strategy.cons.map((con, i) => (
                              <li key={i}>• {con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Ecosystem Impact Tab */}
          {activeTab === 'ecosystem' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <Globe className="w-6 h-6 mr-3 text-green-600" />
                Ecosystem Impact Analysis
              </h3>

              {/* Adoption Modeling */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Adoption Modeling
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-3">Early Adopters</h5>
                    <div className="space-y-3">
                      {ecosystemImpactData.adoptionModeling.earlyAdopters.categories.map((category, index) => (
                        <div key={index} className="border border-blue-200 dark:border-blue-800 rounded p-3">
                          <div className="flex justify-between items-start mb-2">
                            <h6 className="font-medium text-blue-900 dark:text-blue-100">{category.name}</h6>
                            <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                              {(category.adoptionProbability * 100).toFixed(0)}%
                            </span>
                          </div>
                          <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">{category.reason}</p>
                          <div className="text-xs text-blue-700 dark:text-blue-300">
                            Timeline: {category.timeline}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-3">Adoption Curve</h5>
                    <div className="space-y-3">
                      {Object.entries(ecosystemImpactData.adoptionModeling.adoptionCurve).map(([phase, details]) => (
                        <div key={phase} className="border border-blue-200 dark:border-blue-800 rounded p-3">
                          <div className="flex justify-between items-start mb-2">
                            <h6 className="font-medium text-blue-900 dark:text-blue-100">{details.name}</h6>
                            <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                              {details.adoptionRate}
                            </span>
                          </div>
                          <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">{details.characteristics}</p>
                          <div className="text-xs text-blue-700 dark:text-blue-300">
                            Duration: {details.duration}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Economic Impact */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Economic Impact
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-100 dark:bg-green-800 rounded-lg p-4">
                    <h5 className="font-medium text-green-900 dark:text-green-100 mb-3">Developers</h5>
                    <div className="space-y-2 text-sm text-green-800 dark:text-green-200">
                      <div><strong>Rent Reduction:</strong> {ecosystemImpactData.economicImpact.costSavings.developers.rentReduction}</div>
                      <div><strong>Annual Savings:</strong> {ecosystemImpactData.economicImpact.costSavings.developers.annualSavings}</div>
                      <div><strong>Scalability:</strong> {ecosystemImpactData.economicImpact.costSavings.developers.scalabilityBenefits}</div>
                    </div>
                  </div>
                  
                  <div className="bg-green-100 dark:bg-green-800 rounded-lg p-4">
                    <h5 className="font-medium text-green-900 dark:text-green-100 mb-3">Validators</h5>
                    <div className="space-y-2 text-sm text-green-800 dark:text-green-200">
                      <div><strong>Hardware Reduction:</strong> {ecosystemImpactData.economicImpact.costSavings.validators.hardwareReduction}</div>
                      <div><strong>Monthly Savings:</strong> {ecosystemImpactData.economicImpact.costSavings.validators.operationalSavings}</div>
                      <div><strong>Decentralization:</strong> {ecosystemImpactData.economicImpact.costSavings.validators.decentralizationImprovement}</div>
                    </div>
                  </div>
                  
                  <div className="bg-green-100 dark:bg-green-800 rounded-lg p-4">
                    <h5 className="font-medium text-green-900 dark:text-green-100 mb-3">Users</h5>
                    <div className="space-y-2 text-sm text-green-800 dark:text-green-200">
                      <div><strong>Transaction Costs:</strong> {ecosystemImpactData.economicImpact.costSavings.users.transactionCosts}</div>
                      <div><strong>Performance:</strong> {ecosystemImpactData.economicImpact.costSavings.users.applicationPerformance}</div>
                      <div><strong>Experience:</strong> {ecosystemImpactData.economicImpact.costSavings.users.userExperience}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Market Impact */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Market Impact Projections
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(ecosystemImpactData.economicImpact.marketImpact).map(([metric, data]) => (
                    <div key={metric} className="bg-purple-100 dark:bg-purple-800 rounded-lg p-4">
                      <h5 className="font-medium text-purple-900 dark:text-purple-100 mb-3 capitalize">
                        {metric.replace(/([A-Z])/g, ' $1').trim()}
                      </h5>
                      <div className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
                        <div><strong>Current:</strong> {(data as {current: string, projected: string, growth: string}).current}</div>
                        <div><strong>Projected:</strong> {(data as {current: string, projected: string, growth: string}).projected}</div>
                        <div><strong>Growth:</strong> {(data as {current: string, projected: string, growth: string}).growth}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Adoption Strategy Tab */}
          {activeTab === 'adoption' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <Rocket className="w-6 h-6 mr-3 text-orange-600" />
                Adoption Strategy & Incentives
              </h3>

              {/* Adoption Barriers */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Adoption Barriers & Mitigations
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(adoptionBarriers).map(([category, barriers]) => (
                    <div key={category} className="bg-red-100 dark:bg-red-800 rounded-lg p-4">
                      <h5 className="font-medium text-red-900 dark:text-red-100 mb-3 capitalize">
                        {category.replace(/([A-Z])/g, ' $1').trim()} Barriers
                      </h5>
                      <div className="space-y-3">
                        {barriers.map((barrier, index) => (
                          <div key={index} className="border border-red-200 dark:border-red-700 rounded p-3">
                            <h6 className="font-medium text-red-900 dark:text-red-100 text-sm">{barrier.barrier}</h6>
                            <p className="text-xs text-red-800 dark:text-red-200 mb-2">{barrier.description}</p>
                            <div className="text-xs text-red-700 dark:text-red-300">
                              <strong>Mitigation:</strong> {barrier.mitigation}
                            </div>
                            <div className="mt-2">
                              <span className={`text-xs px-2 py-1 rounded ${
                                barrier.impact === 'High' ? 'bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-200' :
                                barrier.impact === 'Medium' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200' :
                                'bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200'
                              }`}>
                                {barrier.impact} Impact
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Adoption Incentives */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Adoption Incentives
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(adoptionIncentives).map(([category, incentives]) => (
                    <div key={category} className="bg-green-100 dark:bg-green-800 rounded-lg p-4">
                      <h5 className="font-medium text-green-900 dark:text-green-100 mb-3 capitalize">
                        {category.replace(/([A-Z])/g, ' $1').trim()} Incentives
                      </h5>
                      <div className="space-y-3">
                        {incentives.map((incentive, index) => (
                          <div key={index} className="border border-green-200 dark:border-green-700 rounded p-3">
                            <h6 className="font-medium text-green-900 dark:text-green-100 text-sm">{incentive.type}</h6>
                            <p className="text-xs text-green-800 dark:text-green-200 mb-2">{incentive.description}</p>
                            <div className="text-xs text-green-700 dark:text-green-300">
                              <strong>Amount:</strong> {incentive.amount}
                            </div>
                            <div className="text-xs text-green-700 dark:text-green-300">
                              <strong>Criteria:</strong> {incentive.criteria}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Success Metrics Tab */}
          {activeTab === 'metrics' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <Target className="w-6 h-6 mr-3 text-purple-600" />
                Success Metrics & KPIs
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Object.entries(successMetrics).map(([category, metrics]) => (
                  <div key={category} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 capitalize">
                      {category.replace(/([A-Z])/g, ' $1').trim()} Metrics
                    </h4>
                    <div className="space-y-4">
                      {Object.entries(metrics).map(([metric, data]) => (
                        <div key={metric} className="border border-gray-200 dark:border-gray-700 rounded p-4">
                          <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2 capitalize">
                            {metric.replace(/([A-Z])/g, ' $1').trim()}
                          </h5>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Target:</span>
                              <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">{data.target}</span>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Measurement:</span>
                              <span className="ml-2 text-gray-700 dark:text-gray-300">{data.measurement}</span>
                            </div>
                            <div>
                              <span className="text-gray-600 dark:text-gray-400">Current:</span>
                              <span className="ml-2 text-gray-700 dark:text-gray-300">{data.current}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
