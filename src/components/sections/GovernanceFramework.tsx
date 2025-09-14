import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Settings, Vote, Shield, CheckCircle, BarChart3 } from 'lucide-react'
import governanceFramework from '../../data/governance-framework.json'

export default function GovernanceFramework() {
  const [activeTab, setActiveTab] = useState('modern')
  
  const modernMechanisms = (governanceFramework as any).modernGovernanceMechanisms

  const tabs = [
    { id: 'modern', label: 'Modern Mechanisms', icon: Users },
    { id: 'liquid', label: 'Liquid Democracy', icon: Vote },
    { id: 'quadratic', label: 'Quadratic Voting', icon: BarChart3 },
    { id: 'ai', label: 'AI-Assisted', icon: Settings },
    { id: 'crosschain', label: 'Cross-Chain', icon: Shield }
  ]

  return (
    <section id="governance-framework" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Modern Governance Framework
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Advanced governance mechanisms including liquid democracy, quadratic voting, AI-assisted decisions, 
            and cross-chain coordination for modern blockchain systems.
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

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8"
          >
            {/* Modern Mechanisms Overview */}
            {activeTab === 'modern' && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Modern Governance Mechanisms
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Advanced governance systems for 2025 blockchain ecosystems
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {Object.entries(modernMechanisms).map(([key, mechanism]: [string, any]) => (
                    <div key={key} className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <Users className="w-6 h-6 mr-2 text-blue-600" />
                        {mechanism.title}
                      </h4>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {mechanism.description}
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white mb-2">Key Features:</h5>
                          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                            {mechanism.features.slice(0, 3).map((feature: string, index: number) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white mb-2">Benefits:</h5>
                          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                            {mechanism.benefits.slice(0, 2).map((benefit: string, index: number) => (
                              <li key={index} className="flex items-start">
                                <BarChart3 className="w-4 h-4 mr-2 mt-0.5 text-blue-500" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Liquid Democracy */}
            {activeTab === 'liquid' && modernMechanisms.liquidDemocracy && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Liquid Democracy
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {modernMechanisms.liquidDemocracy.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Vote className="w-5 h-5 mr-2 text-green-600" />
                      Implementation Details
                    </h4>
                    
                    <div className="space-y-3">
                      {Object.entries(modernMechanisms.liquidDemocracy.implementation).map(([key, value]: [string, any]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-purple-600" />
                      Use Cases
                    </h4>
                    
                    <ul className="space-y-2">
                      {modernMechanisms.liquidDemocracy.useCases.map((useCase: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-purple-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Quadratic Voting */}
            {activeTab === 'quadratic' && modernMechanisms.quadraticVoting && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Quadratic Voting
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {modernMechanisms.quadraticVoting.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-orange-600" />
                      Implementation Details
                    </h4>
                    
                    <div className="space-y-3">
                      {Object.entries(modernMechanisms.quadraticVoting.implementation).map(([key, value]: [string, any]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-teal-600" />
                      Use Cases
                    </h4>
                    
                    <ul className="space-y-2">
                      {modernMechanisms.quadraticVoting.useCases.map((useCase: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-teal-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* AI-Assisted Governance */}
            {activeTab === 'ai' && modernMechanisms.aiAssistedGovernance && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    AI-Assisted Governance
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {modernMechanisms.aiAssistedGovernance.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Settings className="w-5 h-5 mr-2 text-indigo-600" />
                      Implementation Details
                    </h4>
                    
                    <div className="space-y-3">
                      {Object.entries(modernMechanisms.aiAssistedGovernance.implementation).map(([key, value]: [string, any]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-pink-600" />
                      Use Cases
                    </h4>
                    
                    <ul className="space-y-2">
                      {modernMechanisms.aiAssistedGovernance.useCases.map((useCase: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-pink-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Cross-Chain Governance */}
            {activeTab === 'crosschain' && modernMechanisms.crossChainGovernance && (
              <div className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Cross-Chain Governance Coordination
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {modernMechanisms.crossChainGovernance.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-emerald-600" />
                      Implementation Details
                    </h4>
                    
                    <div className="space-y-3">
                      {Object.entries(modernMechanisms.crossChainGovernance.implementation).map(([key, value]: [string, any]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}:
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-amber-600" />
                      Use Cases
                    </h4>
                    
                    <ul className="space-y-2">
                      {modernMechanisms.crossChainGovernance.useCases.map((useCase: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-amber-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
