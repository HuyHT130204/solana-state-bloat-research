import { motion } from 'framer-motion'
import { Calendar, CheckCircle, Clock, Code, Database } from 'lucide-react'

const timelinePhases = [
  {
    phase: 'Phase 1',
    title: 'Research & Design',
    duration: '3-6 months',
    status: 'completed',
    description: 'Comprehensive analysis of state bloat problem and solution design',
    activities: [
      'Problem analysis and metrics collection',
      'Solution architecture design',
      'Technical feasibility assessment',
      'Security and privacy analysis',
      'Cost-benefit evaluation'
    ],
    deliverables: [
      'Research report and analysis',
      'Technical specifications',
      'Security audit plan',
      'Implementation roadmap'
    ],
    risks: [
      'Incomplete understanding of requirements',
      'Technical feasibility challenges'
    ]
  },
  {
    phase: 'Phase 2',
    title: 'Protocol Development',
    duration: '6-12 months',
    status: 'in-progress',
    description: 'Core protocol development and testing for enhanced state compression',
    activities: [
      'CPI-aware fetch API development',
      'Merkle proof system implementation',
      'Compression engine development',
      'Middleware layer creation',
      'Unit and integration testing'
    ],
    deliverables: [
      'Core protocol implementation',
      'API documentation',
      'Test suite and benchmarks',
      'Developer tooling'
    ],
    risks: [
      'Protocol complexity challenges',
      'Performance optimization difficulties',
      'Backward compatibility issues'
    ]
  },
  {
    phase: 'Phase 3',
    title: 'Pilot Testing',
    duration: '3-6 months',
    status: 'planned',
    description: 'Limited pilot deployment with select validators and developers',
    activities: [
      'Validator node setup and testing',
      'Developer SDK development',
      'Pilot dApp integration',
      'Performance monitoring',
      'Bug fixes and optimizations'
    ],
    deliverables: [
      'Pilot deployment report',
      'Performance metrics',
      'Developer feedback',
      'Optimization recommendations'
    ],
    risks: [
      'Pilot participant recruitment',
      'Performance issues in production',
      'Developer adoption challenges'
    ]
  },
  {
    phase: 'Phase 4',
    title: 'Gradual Rollout',
    duration: '6-12 months',
    status: 'planned',
    description: 'Phased rollout with opt-in participation and incentives',
    activities: [
      'Incentivized migration program',
      'Validator onboarding',
      'Developer training and support',
      'Community education',
      'Monitoring and support'
    ],
    deliverables: [
      'Migration tools and documentation',
      'Training materials',
      'Support infrastructure',
      'Adoption metrics'
    ],
    risks: [
      'Low adoption rates',
      'Technical support challenges',
      'Community resistance'
    ]
  },
  {
    phase: 'Phase 5',
    title: 'Full Deployment',
    duration: '3-6 months',
    status: 'planned',
    description: 'Mandatory adoption after successful testing and community approval',
    activities: [
      'Network-wide upgrade',
      'Legacy system deprecation',
      'Full monitoring deployment',
      'Performance optimization',
      'Documentation finalization'
    ],
    deliverables: [
      'Production deployment',
      'Final documentation',
      'Performance reports',
      'Success metrics'
    ],
    risks: [
      'Network upgrade complications',
      'Legacy system migration issues',
      'Performance degradation'
    ]
  }
]

const statusColors = {
  completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  planned: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
}

const statusIcons = {
  completed: CheckCircle,
  'in-progress': Clock,
  planned: Calendar
}

export default function MigrationTimeline() {
  // Removed S-segment component (not used in vertical layout)

  return (
    <section id="migration-timeline" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Migration Timeline
          </h2>
        </motion.div>

        {/* Vertical center line timeline */}
        <div className="relative space-y-6">
          <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[3px] rounded bg-gradient-to-b from-emerald-500 to-blue-500 opacity-90 z-0"></div>
          {timelinePhases.map((phase, index) => {
            const StatusIcon = statusIcons[phase.status as keyof typeof statusIcons]
            const isLeft = index % 2 === 0
            return (
              <div key={phase.phase} className="grid grid-cols-1 md:grid-cols-[1fr_16px_1fr] items-stretch gap-4">
                {/* Left column */}
                <div className={`${isLeft ? '' : 'md:invisible'}`}>
                  {isLeft && (
                    <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 140, damping: 18, mass: 0.6 }} className="card">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{phase.phase}: {phase.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300">Duration: {phase.duration}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[phase.status as keyof typeof statusColors]} flex items-center`}>
                          <StatusIcon className="w-4 h-4 mr-1" />
                          {phase.status.replace('-', ' ')}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{phase.description}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center"><Code className="w-4 h-4 mr-2" />Key Activities</h4>
                          <ul className="space-y-1">
                            {phase.activities.slice(0,4).map((a, i) => (
                              <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-300"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />{a}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center"><Database className="w-4 h-4 mr-2" />Deliverables</h4>
                          <ul className="space-y-1">
                            {phase.deliverables.slice(0,4).map((d, i) => (
                              <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-300"><CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />{d}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Center marker + connector */}
                <div className="relative flex items-center justify-center z-10">
                  <div className="w-3 h-3 bg-white dark:bg-gray-900 border-4 border-primary-500 rounded-full shadow" />
                  <div className={`absolute h-0.5 ${isLeft ? 'right-2 md:right-auto md:left-2 md:-translate-x-full w-10' : 'left-2 md:left-auto md:right-2 md:translate-x-full w-10'} bg-gradient-to-r from-primary-500 to-blue-500`}></div>
                </div>

                {/* Right column */}
                <div className={`${!isLeft ? '' : 'md:invisible'}`}>
                  {!isLeft && (
                    <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 140, damping: 18, mass: 0.6 }} className="card">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{phase.phase}: {phase.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300">Duration: {phase.duration}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[phase.status as keyof typeof statusColors]} flex items-center`}>
                          <StatusIcon className="w-4 h-4 mr-1" />
                          {phase.status.replace('-', ' ')}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{phase.description}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center"><Code className="w-4 h-4 mr-2" />Key Activities</h4>
                          <ul className="space-y-1">
                            {phase.activities.slice(0,4).map((a, i) => (
                              <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-300"><CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />{a}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center"><Database className="w-4 h-4 mr-2" />Deliverables</h4>
                          <ul className="space-y-1">
                            {phase.deliverables.slice(0,4).map((d, i) => (
                              <li key={i} className="flex items-start text-sm text-gray-600 dark:text-gray-300"><CheckCircle className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />{d}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Success Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="card mt-16"
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-8">
            Success Metrics & KPIs
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">30-50%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Storage Reduction</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">80%+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Validator Adoption</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">70%+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Developer Satisfaction</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">95%+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Uptime</div>
            </div>
          </div>
        </motion.div>

        {/* Risk Mitigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="card mt-8"
        >
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-8">
            Risk Mitigation Strategies
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Technical Risks</h4>
              <ul className="space-y-3">
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  Comprehensive testing in testnet environment
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  Gradual rollout with rollback capabilities
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  Performance monitoring and optimization
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Adoption Risks</h4>
              <ul className="space-y-3">
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  Incentivized migration programs
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  Comprehensive developer education
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  Community engagement and feedback
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
