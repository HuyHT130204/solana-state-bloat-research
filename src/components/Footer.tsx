import { Link } from 'react-router-dom'
import { ExternalLink, Calendar } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Solana State Bloat Research
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Comprehensive research and analysis of Solana's state bloat problem with proposed enduring solutions for account data storage. 
              This research is conducted by Huy Ho as an independent blockchain research project.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>September 2025</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>🇻🇳</span>
                <span>Vietnam</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#overview"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  Problem Overview
                </a>
              </li>
              <li>
                <a
                  href="#dashboard"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  Data Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#solutions"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  Proposed Solutions
                </a>
              </li>
              <li>
                <a
                  href="#comparison"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  Blockchain Comparison
                </a>
              </li>
              <li>
                <a
                  href="#about-researcher"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  About Researcher
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about-researcher"
                  className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  <span>About Researcher</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://docs.solana.com/developers/courses/state-compression/generalized-state-compression"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  <span>Solana Docs</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/solana-labs/solana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  <span>Solana GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link
                  to="/research-notes"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                  Research Notes
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* References Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
            References
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-gray-600 dark:text-gray-400">
            <div>
              <p className="font-medium mb-2">Official Documentation:</p>
              <ul className="space-y-1">
                <li>
                  <a
                    href="https://docs.solana.com/developers/courses/state-compression/generalized-state-compression"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    Solana State Compression Docs
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/solana-labs/solana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    Solana GitHub Repository
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <p className="font-medium mb-2">Technical Guides:</p>
              <ul className="space-y-1">
                <li>
                  <a
                    href="https://www.quicknode.com/guides/solana-development/getting-started/understanding-rent-on-solana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    QuickNode: Understanding Rent
                  </a>
                </li>
                <li>
                  <a
                    href="https://getblock.io/blog/solana-full-node-complete-guide/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    GetBlock: Full Node Guide
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <p className="font-medium mb-2">Storage Solutions:</p>
              <ul className="space-y-1">
                <li>
                  <a
                    href="https://www.arweave.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    Arweave - Permanent Storage
                  </a>
                </li>
                <li>
                  <a
                    href="https://filecoin.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    Filecoin - Decentralized Storage
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © {currentYear} Solana State Bloat Research. Independent blockchain research by Huy Ho.
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Built with React, TypeScript, and TailwindCSS
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
