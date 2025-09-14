import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Scale, Globe, AlertTriangle, CheckCircle, FileText, Users, BarChart3, Clock } from 'lucide-react'
import complianceLegal from '../../data/compliance-legal.json'

export default function ComplianceLegal() {
  const [activeTab, setActiveTab] = useState('regulatory')
  
  const regulatory = complianceLegal.regulatoryCompliance
  const jurisdictional = complianceLegal.jurisdictionalConsiderations
  const legalRisks = complianceLegal.legalRisks
  const compliance = complianceLegal.complianceFramework
  const metrics = complianceLegal.complianceMetrics

  const tabs = [
    { id: 'regulatory', label: 'Regulatory Compliance', icon: Shield },
    { id: 'jurisdictional', label: 'Jurisdictional', icon: Globe },
    { id: 'risks', label: 'Legal Risks', icon: AlertTriangle },
    { id: 'framework', label: 'Compliance Framework', icon: FileText },
    { id: 'metrics', label: 'Compliance Metrics', icon: BarChart3 }
  ]

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <section id="compliance-legal" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Compliance & Legal Framework Analysis
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive legal and regulatory compliance framework ensuring adherence to international 
            data protection, financial, and cybersecurity regulations across multiple jurisdictions.
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

          {/* Regulatory Compliance Tab */}
          {activeTab === 'regulatory' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-blue-600" />
                Regulatory Compliance Framework
              </h3>

              {/* Data Protection */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
                  <Scale className="w-5 h-5 mr-2" />
                  Data Protection Regulations
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(regulatory.dataProtection).map(([regulation, details]) => (
                    <div key={regulation} className="bg-blue-100 dark:bg-blue-800 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h5 className="font-medium text-blue-900 dark:text-blue-100 uppercase">{regulation}</h5>
                        <span className={`text-xs px-2 py-1 rounded ${getRiskLevelColor(details.riskLevel)}`}>
                          {details.riskLevel} Risk
                        </span>
                      </div>
                      
                      <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">{details.applicability}</p>
                      
                      <div className="space-y-3">
                        <div>
                          <h6 className="font-medium text-blue-900 dark:text-blue-100 text-sm mb-2">Key Requirements</h6>
                          <ul className="space-y-1 text-xs text-blue-800 dark:text-blue-200">
                            {details.requirements.slice(0, 3).map((requirement, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{requirement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h6 className="font-medium text-blue-900 dark:text-blue-100 text-sm mb-2">Compliance Measures</h6>
                          <ul className="space-y-1 text-xs text-blue-800 dark:text-blue-200">
                            {details.complianceMeasures.slice(0, 3).map((measure, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <CheckCircle className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                                <span>{measure}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Regulations */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center">
                  <Scale className="w-5 h-5 mr-2" />
                  Financial Regulations
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(regulatory.financialRegulations).map(([regulation, details]) => (
                    <div key={regulation} className="bg-green-100 dark:bg-green-800 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h5 className="font-medium text-green-900 dark:text-green-100 uppercase">{regulation}</h5>
                        <span className={`text-xs px-2 py-1 rounded ${getRiskLevelColor(details.riskLevel)}`}>
                          {details.riskLevel} Risk
                        </span>
                      </div>
                      
                      <p className="text-sm text-green-800 dark:text-green-200 mb-3">{details.applicability}</p>
                      
                      <div className="space-y-3">
                        <div>
                          <h6 className="font-medium text-green-900 dark:text-green-100 text-sm mb-2">Key Requirements</h6>
                          <ul className="space-y-1 text-xs text-green-800 dark:text-green-200">
                            {details.requirements.slice(0, 3).map((requirement, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{requirement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h6 className="font-medium text-green-900 dark:text-green-100 text-sm mb-2">Compliance Measures</h6>
                          <ul className="space-y-1 text-xs text-green-800 dark:text-green-200">
                            {details.complianceMeasures.slice(0, 3).map((measure, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>{measure}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cybersecurity */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Cybersecurity Standards
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(regulatory.cybersecurity).map(([standard, details]) => (
                    <div key={standard} className="bg-purple-100 dark:bg-purple-800 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h5 className="font-medium text-purple-900 dark:text-purple-100 uppercase">{standard}</h5>
                        <span className={`text-xs px-2 py-1 rounded ${getRiskLevelColor(details.riskLevel)}`}>
                          {details.riskLevel} Risk
                        </span>
                      </div>
                      
                      <p className="text-sm text-purple-800 dark:text-purple-200 mb-3">{details.applicability}</p>
                      
                      <div className="space-y-3">
                        <div>
                          <h6 className="font-medium text-purple-900 dark:text-purple-100 text-sm mb-2">Key Requirements</h6>
                          <ul className="space-y-1 text-xs text-purple-800 dark:text-purple-200">
                            {details.requirements.slice(0, 3).map((requirement, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-1 h-1 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{requirement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h6 className="font-medium text-purple-900 dark:text-purple-100 text-sm mb-2">Compliance Measures</h6>
                          <ul className="space-y-1 text-xs text-purple-800 dark:text-purple-200">
                            {details.complianceMeasures.slice(0, 3).map((measure, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <CheckCircle className="w-3 h-3 text-purple-600 mt-0.5 flex-shrink-0" />
                                <span>{measure}</span>
                              </li>
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

          {/* Jurisdictional Considerations Tab */}
          {activeTab === 'jurisdictional' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <Globe className="w-6 h-6 mr-3 text-green-600" />
                Jurisdictional Considerations
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Object.entries(jurisdictional).map(([jurisdiction, details]) => (
                  <div key={jurisdiction} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 capitalize">
                        {jurisdiction.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded ${getRiskLevelColor(details.riskLevel)}`}>
                        {details.riskLevel} Risk
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{details.regulatoryLandscape}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Key Regulators</h5>
                        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          {details.keyRegulators.slice(0, 3).map((regulator, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{regulator}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Compliance Requirements</h5>
                        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          {details.complianceRequirements.slice(0, 3).map((requirement, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <CheckCircle className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                              <span>{requirement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Mitigation Strategy</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{details.mitigation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legal Risks Tab */}
          {activeTab === 'risks' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />
                Legal Risk Assessment
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Object.entries(legalRisks).map(([category, risks]) => (
                  <div key={category} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 capitalize">
                      {category.replace(/([A-Z])/g, ' $1').trim()} Risks
                    </h4>
                    
                    <div className="space-y-4">
                      {risks.map((risk, index) => (
                        <div key={index} className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium text-gray-900 dark:text-gray-100 text-sm">{risk.risk}</h5>
                            <div className="flex gap-2">
                              <span className={`text-xs px-2 py-1 rounded ${getRiskLevelColor(risk.impact)}`}>
                                {risk.impact} Impact
                              </span>
                              <span className={`text-xs px-2 py-1 rounded ${
                                risk.probability === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                risk.probability === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              }`}>
                                {risk.probability} Probability
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{risk.description}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            <strong>Mitigation:</strong> {risk.mitigation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compliance Framework Tab */}
          {activeTab === 'framework' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-blue-600" />
                Compliance Framework
              </h3>

              {/* Governance */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Governance Structure
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-100 dark:bg-blue-800 rounded-lg p-4">
                    <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-3">Compliance Officer</h5>
                    <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">{compliance.governance.complianceOfficer.role}</p>
                    <div>
                      <h6 className="font-medium text-blue-900 dark:text-blue-100 text-sm mb-2">Responsibilities</h6>
                      <ul className="space-y-1 text-xs text-blue-800 dark:text-blue-200">
                        {compliance.governance.complianceOfficer.responsibilities.slice(0, 3).map((responsibility, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-blue-100 dark:bg-blue-800 rounded-lg p-4">
                    <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-3">Compliance Committee</h5>
                    <div className="space-y-3">
                      <div>
                        <h6 className="font-medium text-blue-900 dark:text-blue-100 text-sm mb-2">Composition</h6>
                        <ul className="space-y-1 text-xs text-blue-800 dark:text-blue-200">
                          {compliance.governance.complianceCommittee.composition.slice(0, 3).map((member, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{member}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Policies */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Policies & Procedures
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(compliance.policies).map(([policy, details]) => (
                    <div key={policy} className="bg-green-100 dark:bg-green-800 rounded-lg p-4">
                      <h5 className="font-medium text-green-900 dark:text-green-100 mb-2 capitalize">
                        {policy.replace(/([A-Z])/g, ' $1').trim()}
                      </h5>
                      <p className="text-sm text-green-800 dark:text-green-200 mb-3">{details.purpose}</p>
                      <div>
                        <h6 className="font-medium text-green-900 dark:text-green-100 text-sm mb-2">Key Components</h6>
                        <ul className="space-y-1 text-xs text-green-800 dark:text-green-200">
                          {details.components.slice(0, 3).map((component, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{component}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-3 text-xs text-green-700 dark:text-green-300">
                        <strong>Review:</strong> {details.reviewFrequency}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Procedures */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Compliance Procedures
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(compliance.procedures).map(([procedure, details]) => (
                    <div key={procedure} className="bg-purple-100 dark:bg-purple-800 rounded-lg p-4">
                      <h5 className="font-medium text-purple-900 dark:text-purple-100 mb-2 capitalize">
                        {procedure.replace(/([A-Z])/g, ' $1').trim()}
                      </h5>
                      <div className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
                        <div>
                          <strong>Frequency:</strong> {details.frequency}
                        </div>
                        <div>
                          <strong>Scope:</strong> {details.scope}
                        </div>
                        <div>
                          <strong>Process:</strong>
                          <ul className="mt-1 space-y-1 text-xs">
                            {details.process.slice(0, 3).map((step, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-1 h-1 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{step}</span>
                              </li>
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

          {/* Compliance Metrics Tab */}
          {activeTab === 'metrics' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 mr-3 text-indigo-600" />
                Compliance Metrics & KPIs
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Object.entries(metrics).map(([category, categoryMetrics]) => (
                  <div key={category} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 capitalize">
                      {category.replace(/([A-Z])/g, ' $1').trim()} Metrics
                    </h4>
                    
                    <div className="space-y-4">
                      {Object.entries(categoryMetrics).map(([metric, data]) => (
                        <div key={metric} className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
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
