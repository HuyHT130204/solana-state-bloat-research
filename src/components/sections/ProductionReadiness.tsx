import { useState } from 'react'
import { motion } from 'framer-motion'
import { Monitor, AlertTriangle, Clock, Database, Zap, TrendingUp, Activity } from 'lucide-react'
import productionReadiness from '../../data/production-readiness.json'

export default function ProductionReadiness() {
  const [activeTab, setActiveTab] = useState('monitoring')
  
  const monitoring = productionReadiness.monitoringFramework
  const incidentResponse = productionReadiness.incidentResponse
  const observability = productionReadiness.observability
  const deployment = productionReadiness.deploymentStrategy

  const tabs = [
    { id: 'monitoring', label: 'Monitoring', icon: Monitor },
    { id: 'incidents', label: 'Incident Response', icon: AlertTriangle },
    { id: 'observability', label: 'Observability', icon: Activity },
    { id: 'deployment', label: 'Deployment', icon: Database }
  ]


  return (
    <section id="production-readiness" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Production Readiness & Monitoring Framework
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive monitoring, incident response, and operational excellence framework 
            for production deployment of Solana state compression.
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

          {/* Monitoring Tab */}
          {activeTab === 'monitoring' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <Monitor className="w-6 h-6 mr-3 text-blue-600" />
                Monitoring Framework
              </h3>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Compression Metrics
                  </h4>
                  <div className="space-y-4">
                    {Object.entries(monitoring.metrics.compressionMetrics).map(([key, metric]) => (
                      <div key={key} className="border border-blue-200 dark:border-blue-800 rounded p-3">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-blue-900 dark:text-blue-100 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h5>
                          <span className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                            Target: {metric.target}
                          </span>
                        </div>
                        <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">{metric.description}</p>
                        <div className="text-xs text-blue-700 dark:text-blue-300">
                          Alert: {metric.alertThreshold} | Measure: {metric.measurement}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    Data Availability Metrics
                  </h4>
                  <div className="space-y-4">
                    {Object.entries(monitoring.metrics.dataAvailabilityMetrics).map(([key, metric]) => (
                      <div key={key} className="border border-green-200 dark:border-green-800 rounded p-3">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-green-900 dark:text-green-100 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h5>
                          <span className="text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                            Target: {metric.target}
                          </span>
                        </div>
                        <p className="text-sm text-green-800 dark:text-green-200 mb-2">{metric.description}</p>
                        <div className="text-xs text-green-700 dark:text-green-300">
                          Alert: {metric.alertThreshold} | Measure: {metric.measurement}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Alerting System */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Alerting System
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-red-900 dark:text-red-100 mb-3">Critical Alerts</h5>
                    <div className="space-y-3">
                      {monitoring.alerting.criticalAlerts.map((alert, index) => (
                        <div key={index} className="border border-red-200 dark:border-red-800 rounded p-3">
                          <div className="flex justify-between items-start mb-2">
                            <h6 className="font-medium text-red-900 dark:text-red-100">{alert.name}</h6>
                            <span className="text-xs bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 px-2 py-1 rounded">
                              {alert.severity}
                            </span>
                          </div>
                          <p className="text-sm text-red-800 dark:text-red-200 mb-2">{alert.condition}</p>
                          <div className="text-xs text-red-700 dark:text-red-300">
                            Response: {alert.responseTime} | {alert.escalation}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-900 dark:text-red-100 mb-3">Warning Alerts</h5>
                    <div className="space-y-3">
                      {monitoring.alerting.warningAlerts.map((alert, index) => (
                        <div key={index} className="border border-red-200 dark:border-red-800 rounded p-3">
                          <div className="flex justify-between items-start mb-2">
                            <h6 className="font-medium text-red-900 dark:text-red-100">{alert.name}</h6>
                            <span className="text-xs bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">
                              {alert.severity}
                            </span>
                          </div>
                          <p className="text-sm text-red-800 dark:text-red-200 mb-2">{alert.condition}</p>
                          <div className="text-xs text-red-700 dark:text-red-300">
                            Response: {alert.responseTime} | {alert.escalation}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Incident Response Tab */}
          {activeTab === 'incidents' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />
                Incident Response Framework
              </h3>

              {/* Severity Levels */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(incidentResponse.severityLevels).map(([level, details]) => (
                  <div key={level} className={`rounded-lg p-4 ${
                    level === 'critical' ? 'bg-red-50 dark:bg-red-900/20' :
                    level === 'high' ? 'bg-orange-50 dark:bg-orange-900/20' :
                    level === 'medium' ? 'bg-yellow-50 dark:bg-yellow-900/20' :
                    'bg-green-50 dark:bg-green-900/20'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className={`font-semibold capitalize ${
                        level === 'critical' ? 'text-red-900 dark:text-red-100' :
                        level === 'high' ? 'text-orange-900 dark:text-orange-100' :
                        level === 'medium' ? 'text-yellow-900 dark:text-yellow-100' :
                        'text-green-900 dark:text-green-100'
                      }`}>
                        {level}
                      </h4>
                      <Clock className={`w-4 h-4 ${
                        level === 'critical' ? 'text-red-600' :
                        level === 'high' ? 'text-orange-600' :
                        level === 'medium' ? 'text-yellow-600' :
                        'text-green-600'
                      }`} />
                    </div>
                    <p className={`text-sm mb-3 ${
                      level === 'critical' ? 'text-red-800 dark:text-red-200' :
                      level === 'high' ? 'text-orange-800 dark:text-orange-200' :
                      level === 'medium' ? 'text-yellow-800 dark:text-yellow-200' :
                      'text-green-800 dark:text-green-200'
                    }`}>
                      {details.description}
                    </p>
                    <div className="space-y-2 text-xs">
                      <div><strong>Response:</strong> {details.responseTime}</div>
                      <div><strong>Escalation:</strong> {details.escalation}</div>
                      <div><strong>Communication:</strong> {details.communication}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Response Procedures */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Response Procedures</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {Object.entries(incidentResponse.responseProcedures).map(([step, details]) => (
                    <div key={step} className="bg-white dark:bg-gray-700 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-3 capitalize">
                        {step.replace(/([A-Z])/g, ' $1').trim()}
                      </h5>
                      {typeof details === 'object' ? (
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                          {Object.entries(details).map(([key, value]) => (
                            <div key={key}>
                              <strong className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {value}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600 dark:text-gray-300">{details}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Observability Tab */}
          {activeTab === 'observability' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <Activity className="w-6 h-6 mr-3 text-purple-600" />
                Observability Framework
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Logging */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    Logging
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Structured Logging</h5>
                      <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                        <div><strong>Format:</strong> {observability.logging.structuredLogging.format}</div>
                        <div><strong>Retention:</strong> {observability.logging.structuredLogging.retention}</div>
                        <div><strong>Fields:</strong> {observability.logging.structuredLogging.fields.join(', ')}</div>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Log Levels</h5>
                      <div className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                        {Object.entries(observability.logging.logLevels).map(([level, description]) => (
                          <div key={level}>
                            <strong className="capitalize">{level}:</strong> {description}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tracing */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Tracing
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-green-900 dark:text-green-100 mb-2">Distributed Tracing</h5>
                      <div className="text-sm text-green-800 dark:text-green-200 space-y-1">
                        <div><strong>Enabled:</strong> {observability.tracing.distributedTracing.enabled ? 'Yes' : 'No'}</div>
                        <div><strong>Sampling:</strong> {observability.tracing.distributedTracing.sampling}</div>
                        <div><strong>Retention:</strong> {observability.tracing.distributedTracing.retention}</div>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-green-900 dark:text-green-100 mb-2">Trace Points</h5>
                      <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                        {observability.tracing.tracePoints.map((point, index) => (
                          <li key={index}>• {point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Metrics
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Collection</h5>
                      <div className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                        <div><strong>Frequency:</strong> {observability.metrics.collection.frequency}</div>
                        <div><strong>Aggregation:</strong> {observability.metrics.collection.aggregation}</div>
                        <div><strong>Retention:</strong> {observability.metrics.collection.retention}</div>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Custom Metrics</h5>
                      <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                        {observability.metrics.customMetrics.map((metric, index) => (
                          <li key={index}>• {metric}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Deployment Tab */}
          {activeTab === 'deployment' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                <Database className="w-6 h-6 mr-3 text-indigo-600" />
                Deployment Strategy
              </h3>

              {/* Deployment Phases */}
              <div className="space-y-6">
                {Object.entries(deployment.phases).map(([phase, details]) => (
                  <div key={phase} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {details.name}
                      </h4>
                      <span className="text-sm bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded">
                        {details.duration}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{details.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong className="text-gray-900 dark:text-gray-100">Participants:</strong>
                        <span className="ml-2 text-gray-600 dark:text-gray-300">{details.participants}</span>
                      </div>
                      <div>
                        <strong className="text-gray-900 dark:text-gray-100">Success Criteria:</strong>
                        <span className="ml-2 text-gray-600 dark:text-gray-300">{details.successCriteria}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rollback Procedures */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-4">Rollback Procedures</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-red-900 dark:text-red-100 mb-3">Automatic Rollback</h5>
                    <div className="space-y-2 text-sm text-red-800 dark:text-red-200">
                      <div><strong>Triggers:</strong></div>
                      <ul className="list-disc list-inside space-y-1">
                        {deployment.rollbackProcedures.automatic.triggers.map((trigger, index) => (
                          <li key={index}>{trigger}</li>
                        ))}
                      </ul>
                      <div><strong>Action:</strong> {deployment.rollbackProcedures.automatic.action}</div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-900 dark:text-red-100 mb-3">Manual Rollback</h5>
                    <div className="space-y-2 text-sm text-red-800 dark:text-red-200">
                      <div><strong>Triggers:</strong></div>
                      <ul className="list-disc list-inside space-y-1">
                        {deployment.rollbackProcedures.manual.triggers.map((trigger, index) => (
                          <li key={index}>{trigger}</li>
                        ))}
                      </ul>
                      <div><strong>Action:</strong> {deployment.rollbackProcedures.manual.action}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
