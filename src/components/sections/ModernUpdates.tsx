/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Cpu, 
  Database, 
  Users, 
  CheckCircle, 
  Code,
  Zap
} from 'lucide-react'
import complianceData from '../../data/compliance-legal.json'
import technologyData from '../../data/technology-stack.json'
import daProvidersData from '../../data/da-providers.json'
import governanceData from '../../data/governance-framework.json'

// Type definitions for better type safety
interface ComplianceData {
  regulatoryCompliance: {
    [key: string]: {
      title: string
      description: string
      applicability: string
      requirements: string[]
      complianceMeasures: string[]
      riskLevel: string
      complianceStatus: string
    }
  }
}

interface GovernanceData {
  modernGovernanceMechanisms: {
    [key: string]: {
      title: string
      description: string
      features: string[]
      benefits: string[]
      useCases: string[]
    }
  }
}

export default function ModernUpdates() {
  const [activeTab, setActiveTab] = useState('compliance')

  const tabs = [
    { id: 'compliance', name: 'Compliance Updates', icon: Shield },
    { id: 'technology', name: 'Technology Stack', icon: Cpu },
    { id: 'da-providers', name: 'DA Providers', icon: Database },
    { id: 'governance', name: 'Governance', icon: Users }
  ]

  const getRiskColor = (level: string | undefined) => {
    if (!level) return 'text-gray-600 dark:text-gray-400'
    switch (level.toLowerCase()) {
      case 'critical': return 'text-red-600 dark:text-red-400'
      case 'high': return 'text-orange-600 dark:text-orange-400'
      case 'medium': return 'text-yellow-600 dark:text-yellow-400'
      case 'low': return 'text-green-600 dark:text-green-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getRiskBg = (level: string | undefined) => {
    if (!level) return 'bg-gray-100 dark:bg-gray-900/20'
    switch (level.toLowerCase()) {
      case 'critical': return 'bg-red-100 dark:bg-red-900/20'
      case 'high': return 'bg-orange-100 dark:bg-orange-900/20'
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/20'
      case 'low': return 'bg-green-100 dark:bg-green-900/20'
      default: return 'bg-gray-100 dark:bg-gray-900/20'
    }
  }

  return (
    <section id="modern-updates" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Modern Updates for 2025
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Cutting-edge compliance, technology, and governance frameworks updated for the modern blockchain ecosystem
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.name}</span>
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
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
        >
          {/* Compliance Updates */}
          {activeTab === 'compliance' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  📋 Regulatory Compliance Updates
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Latest regulatory requirements for 2025
                </p>
              </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {Object.entries((complianceData as unknown as ComplianceData).regulatoryCompliance)
                   .filter(([, regulation]) => regulation?.title) // Chỉ hiển thị regulations có title
                   .map(([key, regulation]) => (
                  <div key={key} className={`rounded-lg p-6 ${getRiskBg(regulation?.riskLevel)}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {regulation?.title || 'Unknown Regulation'}
                      </h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(regulation?.riskLevel)}`}>
                        {regulation?.riskLevel || 'Unknown'}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {regulation?.description || 'No description available'}
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">Key Requirements:</h5>
                        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                          {(regulation?.requirements || []).slice(0, 3).map((req: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          Status: {regulation?.complianceStatus || 'Required'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technology Stack */}
          {activeTab === 'technology' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  ⚡ Modern Technology Stack
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Cutting-edge technologies for 2025
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Post-Quantum Cryptography */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-purple-600" />
                    Post-Quantum Cryptography
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">Current Schemes</h5>
                      <div className="space-y-2">
                        {((technologyData as any).cryptographicSecurity?.postQuantumCryptography?.currentSchemes ? Object.values((technologyData as any).cryptographicSecurity.postQuantumCryptography.currentSchemes) : []).map((scheme: any, index: number) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-300">{scheme.name}</span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              scheme.status === 'Recommended' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {scheme.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">Implementation Strategy</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {(technologyData as any).cryptographicSecurity?.postQuantumCryptography?.description || 'No description available'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* WebAssembly Integration */}
                <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Code className="w-6 h-6 mr-2 text-green-600" />
                    WebAssembly Integration
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">Benefits</h5>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        {((technologyData as any).cryptographicSecurity?.webAssemblyIntegration?.benefits || []).map((benefit: any, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">Use Cases</h5>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        {((technologyData as any).cryptographicSecurity?.webAssemblyIntegration?.useCases || []).map((useCase: any, index: number) => (
                          <li key={index} className="flex items-start">
                            <Zap className="w-4 h-4 mr-2 mt-0.5 text-blue-500" />
                            {useCase}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DA Providers */}
          {activeTab === 'da-providers' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  🌐 Modern DA Provider Ecosystem
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Latest data availability solutions for 2025
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {Object.entries((daProvidersData as any).modularDAProviders || {}).map(([key, provider]: [string, any]) => (
                  <div key={key} className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {provider.title}
                      </h4>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Available
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {provider.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">Key Features:</h5>
                        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                          {(provider.features || []).slice(0, 3).map((feature: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Cost:</span>
                            <span className="ml-1 font-medium text-gray-900 dark:text-white">{provider.technicalSpecs?.cost || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Throughput:</span>
                            <span className="ml-1 font-medium text-gray-900 dark:text-white">{provider.technicalSpecs?.throughput || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Governance */}
          {activeTab === 'governance' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  🗳️ Modern Governance Mechanisms
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Advanced governance systems for 2025
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {Object.entries((governanceData as unknown as GovernanceData).modernGovernanceMechanisms).map(([key, mechanism]) => (
                  <div key={key} className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Users className="w-6 h-6 mr-2 text-purple-600" />
                      {mechanism?.title || 'Unknown Mechanism'}
                    </h4>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {mechanism?.description || 'No description available'}
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white mb-2">Key Features:</h5>
                        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                          {(mechanism.features || []).slice(0, 3).map((feature: string, index: number) => (
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
                          {(mechanism.benefits || []).slice(0, 2).map((benefit: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <Zap className="w-4 h-4 mr-2 mt-0.5 text-blue-500" />
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
        </motion.div>
      </div>
    </section>
  )
}
