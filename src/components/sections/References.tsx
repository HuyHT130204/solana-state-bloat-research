import { motion } from 'framer-motion'
import { ExternalLink, FileText, Github, Globe, BookOpen, Users } from 'lucide-react'
import type { ComponentType } from 'react'
import refs from '../../data/references.json'

const typeColors = {
  'Documentation': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  'Source Code': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  'Technical Guide': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  'Infrastructure Guide': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  'Comparison Guide': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'Storage Network': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  'Technical Article': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  'Research Article': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  'Hardware Guide': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
}

type ReferenceItem = {
  title: string
  url: string
  description: string
  type: keyof typeof typeColors | string
  fetched_at?: string
}

type ReferenceCategory = {
  category: string
  type: string
  items: ReferenceItem[]
}

type ReferencesJson = {
  categories: ReferenceCategory[]
}

type IconComponent = ComponentType<{ className?: string }>
const iconMap: Record<string, IconComponent> = {
  'Official Documentation': FileText,
  'Technical Guides': BookOpen,
  'Storage Solutions': Globe,
  'Research & Analysis': Users,
  'Infrastructure & Hardware': Github,
}

export default function References() {
  const data = refs as ReferencesJson
  return (
    <section id="references" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            References
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive list of authoritative sources, documentation, and research materials 
            used in this analysis of Solana's state bloat problem and proposed solutions.
          </p>
        </motion.div>

        {/* References by Category */}
        {data.categories.map((category, categoryIndex) => {
          const Icon = iconMap[category.category] ?? FileText
          return (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * categoryIndex }}
              viewport={{ once: true }}
              className="card mb-8"
            >
              <div className="flex items-center mb-6">
                <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {category.category}
                </h3>
              </div>
              
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 * itemIndex }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">
                          {item.title}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[item.type as keyof typeof typeColors] ?? 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'}`}>
                          {item.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {item.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {item.url}
                      </p>
                      {item.fetched_at && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Fetched: {item.fetched_at}</p>
                      )}
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 p-2 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900 rounded-lg transition-colors duration-200"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )
        })}

        {/* Citation Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="card"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            How to Cite This Research
          </h3>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">APA Format</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 font-mono">
              Ho, H. (2025). <em>Solana State Bloat Research: Proposing Enduring Solutions for Account Data Storage</em>. 
              Technical Research Paper. Retrieved from https://solana-state-bloat-research.vercel.app
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">MLA Format</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 font-mono">
              Ho, Huy. "Solana State Bloat Research: Proposing Enduring Solutions for Account Data Storage." 
              <em>Technical Research Paper</em>, 2025, https://solana-state-bloat-research.vercel.app.
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">BibTeX Format</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 font-mono">
              @misc&#123;solana_state_bloat_2025,<br/>
              &nbsp;&nbsp;title=&#123;&#123;Solana State Bloat Research: Proposing Enduring Solutions for Account Data Storage&#125;&#125;,<br/>
              &nbsp;&nbsp;author=&#123;&#123;Ho, Huy&#125;&#125;,<br/>
              &nbsp;&nbsp;year=&#123;&#123;2025&#125;&#125;,<br/>
              &nbsp;&nbsp;howpublished=&#123;&#123;Technical Research Paper&#125;&#125;,<br/>
              &nbsp;&nbsp;url=&#123;&#123;https://solana-state-bloat-research.vercel.app&#125;&#125;<br/>
              &#125;
            </p>
          </div>
        </motion.div>

        {/* Data Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="card mt-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Data Sources & Methodology
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Research Methodology</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                This research was conducted through comprehensive analysis of official documentation, 
                technical guides, academic papers, and community discussions. All quantitative data 
                was verified against multiple authoritative sources where possible.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Data Collection Period</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Research conducted from September 1-10, 2025. All sources were accessed and verified 
                during this period to ensure accuracy and currency of information.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Source Verification</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                All HTTP links were verified for accessibility and accuracy. Where numerical data 
                varied across sources, ranges are provided with source attribution. Estimates are 
                clearly labeled with assumptions and methodology.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
