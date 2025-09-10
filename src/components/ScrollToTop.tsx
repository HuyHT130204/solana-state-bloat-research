import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          aria-label="Scroll to top"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronUp className="w-6 h-6" />
          </motion.div>
          
          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-white/20"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.5, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  )
}