import { motion } from 'framer-motion'
import { Calendar, ExternalLink, Search, FileText, Link as LinkIcon } from 'lucide-react'
import notes from '../data/research-notes.json'

type ResearchLogEntry = {
  date: string
  source: string
  url: string
  keyFacts: string[]
  snippet?: string
  fetched_at?: string
}

type TopClaim =
  | { id: string; label: string; value: number; unit: string; source_url: string; fetched_at?: string; note?: string }
  | { id: string; label: string; min: number; max: number; unit: string; source_url: string; fetched_at?: string; note?: string }

export default function ResearchNotes({ embedded = false }: { embedded?: boolean }) {
  const researchLog = (notes as { log: ResearchLogEntry[] }).log
  const topClaims = (notes as { topClaims: TopClaim[] }).topClaims

  const wrapperClass = embedded ? 'bg-transparent pt-1' : 'min-h-screen bg-gray-50 dark:bg-gray-900 pt-16'
  const innerClass = embedded ? 'container-max px-4 md:px-5 pb-4' : 'container-max section-padding'

  return (
    <div className={wrapperClass}>
      <div className={innerClass}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          {/* Back link removed in embedded modal */}
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Research Notes & Methodology
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
            Detailed documentation of the research process, sources consulted, and methodology 
            used to develop the proposed solutions for Solana's state bloat problem.
          </p>
        </motion.div>

        {/* Top Claims with Inline Citations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 flex items-center">
            <FileText className="w-6 h-6 mr-3" />
            Top Numerical Claims & Citations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topClaims.map((c) => (
              <div key={c.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{c.label}</div>
                <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {'value' in c ? `${c.value} ${c.unit}` : `${c.min}–${c.max} ${c.unit}`}
                </div>
                {c.note && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{c.note}</div>
                )}
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-2 flex items-center justify-between">
                  <a href={c.source_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:underline">
                    <LinkIcon className="w-3.5 h-3.5 mr-1" /> Source
                  </a>
                  {c.fetched_at && <span>Fetched: {c.fetched_at}</span>}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Research Methodology */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 flex items-center">
            <Search className="w-6 h-6 mr-3" />
            Research Methodology
          </h2>
          
          <div className="space-y-8">
            {[{
              step: '1',
              title: 'Problem Analysis',
              description: 'Analyzed the baseline problem statement and identified key metrics that needed verification',
              sources: ['Independent Research', 'Solana Documentation'],
              outcome: 'Confirmed current state size, validator requirements, and operational costs'
            }, {
              step: '2',
              title: 'Technical Research',
              description: 'Researched existing solutions including SIMD-0341, Avocado project, and state compression',
              sources: ['Solana GitHub', 'Official Documentation', 'Technical Guides'],
              outcome: 'Identified limitations and areas for improvement in current approaches'
            }, {
              step: '3',
              title: 'Comparative Analysis',
              description: 'Analyzed how other blockchains handle state management and storage optimization',
              sources: ['Stellar Documentation', 'Accumulate Research', 'Ethereum Guides'],
              outcome: 'Identified best practices and lessons learned from other networks'
            }, {
              step: '4',
              title: 'Solution Design',
              description: 'Developed three comprehensive solutions based on research findings',
              sources: ['All previous research', 'Technical feasibility analysis'],
              outcome: 'Created detailed technical specifications and implementation plans'
            }, {
              step: '5',
              title: 'Verification & Validation',
              description: 'Cross-referenced all claims and data points with multiple sources',
              sources: ['Multiple authoritative sources', 'Community discussions'],
              outcome: 'Ensured accuracy and reliability of all presented information'
            }].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="flex items-start space-x-6"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    {step.step}
                  </span>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {step.description}
                  </p>
                  
                  <div className="mb-3">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Sources:</h4>
                    <div className="flex flex-wrap gap-2">
                      {step.sources.map((source, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-sm">
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <h4 className="font-medium text-green-900 dark:text-green-100 mb-1">Outcome:</h4>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      {step.outcome}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Research Log */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 flex items-center">
            <FileText className="w-6 h-6 mr-3" />
            Research Log
          </h2>
          
          <div className="space-y-6">
            {researchLog.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {entry.source}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {entry.date}
                    </div>
                    {entry.fetched_at && (
                      <div className="text-xs text-gray-400 dark:text-gray-500">Fetched: {entry.fetched_at}</div>
                    )}
                  </div>
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View Source
                  </a>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Key Facts Extracted:</h4>
                  <ul className="space-y-1">
                    {entry.keyFacts.map((fact, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {entry.snippet && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">Source Snippet:</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      {entry.snippet}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Data Verification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="card"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Data Verification & Quality Assurance
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Verification Process</h3>
              <ul className="space-y-3">
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  All numerical data cross-referenced with multiple sources
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  HTTP links verified for accessibility and accuracy
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Technical claims validated against official documentation
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Estimates clearly labeled with assumptions and methodology
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Source Quality</h3>
              <ul className="space-y-3">
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Prioritized official documentation and authoritative sources
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Included peer-reviewed research and technical papers
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Referenced established infrastructure providers
                </li>
                <li className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  Balanced technical accuracy with accessibility
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h3 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">Research Limitations</h3>
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              This research was conducted over a limited period in September 2025. While comprehensive, 
              the rapidly evolving nature of blockchain technology means some information may become 
              outdated. All sources were accessed and verified during the research period, but 
              readers should verify current information for time-sensitive decisions.
            </p>
          </div>
          
          {/* Appendix */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Appendix: Excerpts & Artifacts</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Short excerpts from sources and downloadable research log.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                <div className="text-sm font-medium mb-2">Selected Excerpts</div>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  {researchLog.slice(0,4).map((e, i) => (
                    <li key={i}>
                      <span className="font-medium">{e.source}:</span> {e.snippet ?? '—'}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
                <div className="text-sm font-medium mb-2">Download Research Log</div>
                <button
                  className="btn-secondary"
                  onClick={() => {
                    const blob = new Blob([JSON.stringify(notes, null, 2)], { type: 'application/json' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = 'research-notes.json'
                    a.click()
                    URL.revokeObjectURL(url)
                  }}
                >
                  Download JSON
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
