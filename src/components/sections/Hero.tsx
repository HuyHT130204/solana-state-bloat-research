import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Calendar, Trophy, Users } from 'lucide-react'
import StateGrowth3D from '../visualizations/StateGrowth3D'
import { useData } from '../../contexts/DataContext'

export default function Hero() {
  const [webglOK, setWebglOK] = useState(true)
  const { threeData } = useData()

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
      setWebglOK(!!gl)
    } catch {
      setWebglOK(false)
    }
  }, [])

  // Data is now preloaded globally via DataContext
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')]"></div>
      </div>

      <div className="container-max hero-padding relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 lg:w-3/5 xl:w-1/2 min-w-0"
          >
            {/* Research Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-4 py-2 rounded-full text-sm font-medium"
            >
              <Trophy className="w-4 h-4" />
              <span>Blockchain Research & Development</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight"
            >
              <div className="gradient-text">Solana State Bloat</div>
              <div className="text-gray-900 dark:text-gray-100 whitespace-nowrap">Research & Solutions</div>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              Comprehensive analysis of Solana's state bloat problem with proposed enduring solutions for account data storage. 
              Balancing validator storage reduction, developer data interoperability, and seamless user experience.
            </motion.p>

            {/* Key Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">500 GB</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Live State Size</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="text-2xl font-bold text-accent-600 dark:text-accent-400">400+ TB</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Full Ledger Size</div>
              </div>
            </motion.div>

            {/* Research Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl p-6 text-white"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Research Publication</h3>
                <div className="flex items-center space-x-1">
                  <span>September 2025</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Published: Sep 2025</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Blockchain Research</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4" />
                  <span>Technical Analysis</span>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => {
                  const element = document.querySelector('#overview')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="btn-primary px-8 py-3 text-lg"
              >
                Explore Research
              </button>
              <button
                onClick={() => {
                  const element = document.querySelector('#solutions')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="btn-secondary px-8 py-3 text-lg"
              >
                View Solutions
              </button>
            </motion.div>
          </motion.div>

          {/* 3D Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[600px] lg:h-[700px] lg:w-1/2 flex justify-center"
          >
            <div className="w-full max-w-lg relative">
              {webglOK && <StateGrowth3D data={threeData} />}
            </div>
            
            {/* Fallback for devices without WebGL */}
            {!webglOK && (
              <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <div className="text-sm">3D Visualization</div>
                  <div className="text-xs">Interactive state growth over time</div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
