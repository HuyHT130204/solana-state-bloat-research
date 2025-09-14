import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, AlertTriangle, Clock, Database, Users, BarChart3, CheckCircle, Zap, Globe } from 'lucide-react'
import disasterRecovery from '../../data/disaster-recovery.json'

export default function DisasterRecovery() {
  const [activeTab, setActiveTab] = useState('recovery')
  
  const recovery = disasterRecovery.disasterRecovery
  const emergency = disasterRecovery.emergencyProcedures
  const continuity = disasterRecovery.businessContinuity
  const testing = disasterRecovery.testingAndValidation
  const metrics = disasterRecovery.recoveryMetrics

  const tabs = [
    { id: 'recovery', label: 'Disaster Recovery', icon: Shield },
    { id: 'emergency', label: 'Emergency Procedures', icon: AlertTriangle },
    { id: 'continuity', label: 'Business Continuity', icon: Database },
    { id: 'testing', label: 'Testing & Validation', icon: CheckCircle },
    { id: 'metrics', label: 'Recovery Metrics', icon: BarChart3 }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'High': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <section id="disaster-recovery" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Disaster Recovery & Emergency Procedures
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive disaster recovery and business continuity framework ensuring rapid recovery 
            from system failures, cyber attacks, and catastrophic events with minimal data loss.
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

          {/* Disaster Recovery Tab */}
          {activeTab === 'recovery' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-blue-600" />
                Disaster Recovery Framework
              </h3>

              {/* Recovery Objectives */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Recovery Objectives
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(recovery.recoveryObjectives).map(([objective, details]) => (
                    <div key={objective} className="bg-blue-100 dark:bg-blue-800 rounded-lg p-4">
                      <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2 uppercase">{objective}</h5>
                      <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">{details.description}</p>
                      
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-blue-700 dark:text-blue-300">Target:</span>
                          <span className="ml-2 font-medium text-blue-900 dark:text-blue-100">{details.target}</span>
                        </div>
                        <div>
                          <span className="text-blue-700 dark:text-blue-300">Critical:</span>
                          <span className="ml-2 font-medium text-blue-900 dark:text-blue-100">{details.critical}</span>
                        </div>
                        <div>
                          <span className="text-blue-700 dark:text-blue-300">Measurement:</span>
                          <span className="ml-2 text-blue-800 dark:text-blue-200">{details.measurement}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backup Strategy */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  Backup Strategy
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-green-900 dark:text-green-100 mb-3">Data Backup</h5>
                    <div className="space-y-2 text-sm text-green-800 dark:text-green-200">
                      <div><strong>Frequency:</strong> {recovery.backupStrategy.dataBackup.frequency}</div>
                      <div><strong>Retention:</strong> {recovery.backupStrategy.dataBackup.retention}</div>
                      <div><strong>Encryption:</strong> {recovery.backupStrategy.dataBackup.encryption}</div>
                      <div><strong>Verification:</strong> {recovery.backupStrategy.dataBackup.verification}</div>
                    </div>
                    
                    <div className="mt-3">
                      <h6 className="font-medium text-green-900 dark:text-green-100 text-sm mb-2">Locations</h6>
                      <ul className="space-y-1 text-xs text-green-800 dark:text-green-200">
                        {recovery.backupStrategy.dataBackup.locations.map((location, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{location}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-green-900 dark:text-green-100 mb-3">System Backup</h5>
                    <div className="space-y-2 text-sm text-green-800 dark:text-green-200">
                      <div><strong>Frequency:</strong> {recovery.backupStrategy.systemBackup.frequency}</div>
                      <div><strong>Retention:</strong> {recovery.backupStrategy.systemBackup.retention}</div>
                      <div><strong>Encryption:</strong> {recovery.backupStrategy.systemBackup.encryption}</div>
                      <div><strong>Verification:</strong> {recovery.backupStrategy.systemBackup.verification}</div>
                    </div>
                    
                    <div className="mt-3">
                      <h6 className="font-medium text-green-900 dark:text-green-100 text-sm mb-2">Scope</h6>
                      <ul className="space-y-1 text-xs text-green-800 dark:text-green-200">
                        {recovery.backupStrategy.systemBackup.scope.map((item, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recovery Procedures */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Recovery Procedures
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(recovery.recoveryProcedures).map(([level, details]) => (
                    <div key={level} className="bg-purple-100 dark:bg-purple-800 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h5 className="font-medium text-purple-900 dark:text-purple-100">{details.name}</h5>
                        <span className="text-xs bg-purple-200 dark:bg-purple-700 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">
                          {details.responseTime}
                        </span>
                      </div>
                      
                      <p className="text-sm text-purple-800 dark:text-purple-200 mb-3">{details.description}</p>
                      
                      <div>
                        <h6 className="font-medium text-purple-900 dark:text-purple-100 text-sm mb-2">Procedures</h6>
                        <ul className="space-y-1 text-xs text-purple-800 dark:text-purple-200">
                          {details.procedures.map((procedure, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{procedure}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-3 text-xs text-purple-700 dark:text-purple-300">
                        <strong>Escalation:</strong> {details.escalation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Emergency Procedures Tab */}
          {activeTab === 'emergency' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />
                Emergency Response Procedures
              </h3>

              {/* Incident Classification */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Incident Classification
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(emergency.incidentClassification).map(([severity, details]) => (
                    <div key={severity} className="bg-red-100 dark:bg-red-800 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h5 className="font-medium text-red-900 dark:text-red-100">{details.name}</h5>
                        <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(details.name)}`}>
                          {details.name}
                        </span>
                      </div>
                      
                      <p className="text-sm text-red-800 dark:text-red-200 mb-3">{details.description}</p>
                      
                      <div className="space-y-2 text-xs text-red-700 dark:text-red-300">
                        <div><strong>Response:</strong> {details.responseTime}</div>
                        <div><strong>Escalation:</strong> {details.escalation}</div>
                        <div><strong>Communication:</strong> {details.communication}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response Team */}
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Response Team Structure
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(emergency.responseTeam).map(([role, details]) => (
                    <div key={role} className="bg-orange-100 dark:bg-orange-800 rounded-lg p-4">
                      <h5 className="font-medium text-orange-900 dark:text-orange-100 mb-2 capitalize">
                        {role.replace(/([A-Z])/g, ' $1').trim()}
                      </h5>
                      <p className="text-sm text-orange-800 dark:text-orange-200 mb-3">{details.role}</p>
                      
                      <div>
                        <h6 className="font-medium text-orange-900 dark:text-orange-100 text-sm mb-2">Responsibilities</h6>
                        <ul className="space-y-1 text-xs text-orange-800 dark:text-orange-200">
                          {details.responsibilities.map((responsibility, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <CheckCircle className="w-3 h-3 text-orange-600 mt-0.5 flex-shrink-0" />
                              <span>{responsibility}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-3 text-xs text-orange-700 dark:text-orange-300">
                        <strong>Escalation:</strong> {details.escalation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Communication Plan */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Communication Plan
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-3">Internal Communication</h5>
                    <div className="space-y-3">
                      {Object.entries(emergency.communicationPlan.internal).map(([timeline, details]) => (
                        <div key={timeline} className="bg-blue-100 dark:bg-blue-800 rounded-lg p-3">
                          <h6 className="font-medium text-blue-900 dark:text-blue-100 text-sm mb-2 capitalize">
                            {timeline.replace(/([A-Z])/g, ' $1').trim()}
                          </h6>
                          <div className="space-y-1 text-xs text-blue-800 dark:text-blue-200">
                            <div><strong>Audience:</strong> {details.audience}</div>
                            <div><strong>Method:</strong> {details.method}</div>
                            <div><strong>Timeline:</strong> {details.timeline}</div>
                            <div><strong>Content:</strong> {details.content}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-3">External Communication</h5>
                    <div className="space-y-3">
                      {Object.entries(emergency.communicationPlan.external).map(([audience, details]) => (
                        <div key={audience} className="bg-blue-100 dark:bg-blue-800 rounded-lg p-3">
                          <h6 className="font-medium text-blue-900 dark:text-blue-100 text-sm mb-2 capitalize">
                            {audience}
                          </h6>
                          <div className="space-y-1 text-xs text-blue-800 dark:text-blue-200">
                            <div><strong>Method:</strong> {details.method}</div>
                            <div><strong>Timeline:</strong> {details.timeline}</div>
                            <div><strong>Content:</strong> {details.content}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Business Continuity Tab */}
          {activeTab === 'continuity' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <Database className="w-6 h-6 mr-3 text-green-600" />
                Business Continuity Planning
              </h3>

              {/* Continuity Planning */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Continuity Planning
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h5 className="font-medium text-green-900 dark:text-green-100 mb-3">Critical Functions</h5>
                    <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
                      {continuity.continuityPlanning.criticalFunctions.map((function_, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{function_}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-green-900 dark:text-green-100 mb-3">Recovery Priorities</h5>
                    <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
                      {continuity.continuityPlanning.recoveryPriorities.map((priority, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-4 h-4 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5 flex-shrink-0">
                            {index + 1}
                          </div>
                          <span>{priority}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-green-900 dark:text-green-100 mb-3">Alternate Procedures</h5>
                    <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
                      {continuity.continuityPlanning.alternateProcedures.map((procedure, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{procedure}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Resource Management */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Resource Management
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(continuity.resourceManagement).map(([resource, details]) => (
                    <div key={resource} className="bg-blue-100 dark:bg-blue-800 rounded-lg p-4">
                      <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-3 capitalize">
                        {resource.replace(/([A-Z])/g, ' $1').trim()}
                      </h5>
                      
                      <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                        {Object.entries(details).map(([key, value]) => (
                          <div key={key}>
                            <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</strong>
                            <div className="mt-1">
                              {Array.isArray(value) ? (
                                <ul className="list-disc list-inside space-y-1 text-xs">
                                  {value.map((item, i) => (
                                    <li key={i}>{item}</li>
                                  ))}
                                </ul>
                              ) : (
                                <span className="text-xs">{value}</span>
                              )}
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

          {/* Testing & Validation Tab */}
          {activeTab === 'testing' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 mr-3 text-purple-600" />
                Testing & Validation Framework
              </h3>

              {/* Testing Schedule */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Testing Schedule
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(testing.testingSchedule).map(([frequency, details]) => (
                    <div key={frequency} className="bg-purple-100 dark:bg-purple-800 rounded-lg p-4">
                      <h5 className="font-medium text-purple-900 dark:text-purple-100 mb-2 capitalize">
                        {frequency}
                      </h5>
                      
                      <div className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
                        <div>
                          <strong>Tests:</strong>
                          <ul className="mt-1 space-y-1 text-xs">
                            {details.tests.map((test, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-1 h-1 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                                <span>{test}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div><strong>Duration:</strong> {details.duration}</div>
                        <div><strong>Responsibility:</strong> {details.responsibility}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Test Scenarios */}
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Test Scenarios
                </h4>
                
                <div className="space-y-6">
                  {Object.entries(testing.testScenarios).map(([scenario, details]) => (
                    <div key={scenario} className="bg-orange-100 dark:bg-orange-800 rounded-lg p-4">
                      <h5 className="font-medium text-orange-900 dark:text-orange-100 mb-2">{details.name}</h5>
                      <p className="text-sm text-orange-800 dark:text-orange-200 mb-3">{details.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h6 className="font-medium text-orange-900 dark:text-orange-100 text-sm mb-2">Test Steps</h6>
                          <ul className="space-y-1 text-xs text-orange-800 dark:text-orange-200">
                            {details.testSteps.map((step, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-4 h-4 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5 flex-shrink-0">
                                  {index + 1}
                                </div>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h6 className="font-medium text-orange-900 dark:text-orange-100 text-sm mb-2">Success Criteria</h6>
                          <p className="text-xs text-orange-800 dark:text-orange-200">{details.successCriteria}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Recovery Metrics Tab */}
          {activeTab === 'metrics' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 mr-3 text-indigo-600" />
                Recovery Metrics & KPIs
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(metrics).map(([metric, data]) => (
                  <div key={metric} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 capitalize">
                      {metric.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Target:</span>
                        <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">{data.target}</span>
                      </div>
                      {'critical' in data && data.critical && (
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Critical:</span>
                          <span className="ml-2 font-medium text-red-600 dark:text-red-400">{data.critical}</span>
                        </div>
                      )}
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
          )}
        </motion.div>
      </div>
    </section>
  )
}
