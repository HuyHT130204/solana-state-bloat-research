import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Download,
  ExternalLink,
  ChevronDown
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import LanguageSwitcher from './LanguageSwitcher'

  const navigation = [
    { name: 'Overview', href: '#overview' },
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Solutions', href: '#solutions' },
    { 
      name: 'Advanced Analysis', 
      href: '#advanced-analysis',
      submenu: [
        { name: 'Economic Modeling', href: '#economic-modeling' },
        { name: 'Working Prototype', href: '#working-prototype' },
        { name: 'Security Proofs', href: '#formal-security-proofs' },
        { name: 'Production Readiness', href: '#production-readiness' },
        { name: 'Ecosystem Impact', href: '#ecosystem-impact' },
        { name: 'Governance Framework', href: '#governance-framework' },
        { name: 'Compliance & Legal', href: '#compliance-legal' },
        { name: 'Disaster Recovery', href: '#disaster-recovery' },
        { name: 'Modern Updates', href: '#modern-updates' }
      ]
    },
    { name: 'About', href: '#about-researcher' },
    { name: 'References', href: '#references' },
  ]

// External pages were replaced by floating modals on Home. Keep header minimal.

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { theme, toggleTheme } = useTheme()

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setMobileMenuOpen(false)
  }

  const handleDownloadPDF = () => {
    // Prefer direct global trigger if available, else fallback to custom event
    // @ts-ignore
    if (typeof window.generateResearchPDF === 'function') {
      // @ts-ignore
      window.generateResearchPDF()
    } else {
      const event = new CustomEvent('download-pdf')
      window.dispatchEvent(event)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <nav className="container-max">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/superteamvn.jpg"
              alt="Superteam Vietnam"
              className="w-8 h-8 rounded"
            />
            <span className="font-bold text-lg gradient-text">
              Solana State Bloat Research
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.submenu ? (
                  <div
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.name}
                    <ChevronDown className="w-4 h-4 ml-1" />
                    
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
                      >
                        <div className="py-2">
                          {item.submenu.map((subItem, index) => (
                            <motion.button
                              key={subItem.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              onClick={(e) => {
                                e.preventDefault()
                                scrollToSection(subItem.href)
                                setActiveDropdown(null)
                              }}
                              className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                            >
                              {subItem.name}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {item.name}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            <LanguageSwitcher />
            <button
              onClick={handleDownloadPDF}
              className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 shadow-sm"
              title="Download PDF"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            >
              <div className="py-6 px-4 space-y-6">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.submenu ? (
                      <div>
                        <div className="px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 rounded-lg mb-2">
                          {item.name}
                        </div>
                        <div className="ml-4 space-y-1">
                          {item.submenu.map((subItem) => (
                            <button
                              key={subItem.name}
                              onClick={() => scrollToSection(subItem.href)}
                              className="block w-full text-left px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                            >
                              {subItem.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => scrollToSection(item.href)}
                        className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                      >
                        {item.name}
                      </button>
                    )}
                  </div>
                ))}
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-center space-x-3">
                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center justify-center p-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-sm"
                    title="Download PDF"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={() => scrollToSection('#about-researcher')}
                    className="flex items-center justify-center p-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    title="About Researcher"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
