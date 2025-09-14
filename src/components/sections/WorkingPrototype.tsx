import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Code, CheckCircle, AlertTriangle, Download, Upload, Database, Zap } from 'lucide-react'
import { CompressionClient, DEFAULT_COMPRESSION_CONFIG, CompressedAccount, CompressionResult, FetchResult } from '../../lib/compression-prototype'
import { Connection, PublicKey } from '@solana/web3.js'
import { Buffer } from 'buffer'

export default function WorkingPrototype() {
  const [client, setClient] = useState<CompressionClient | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [compressedAccounts, setCompressedAccounts] = useState<CompressedAccount[]>([])
  const [stats, setStats] = useState<{
    totalAccounts: number
    totalOriginalSize: number
    totalCompressedSize: number
    averageCompressionRatio: number
  } | null>(null)
  const [isCompressing, setIsCompressing] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [lastResult, setLastResult] = useState<CompressionResult | FetchResult | null>(null)
  const [selectedAccount, setSelectedAccount] = useState<CompressedAccount | null>(null)

  // Initialize compression client
  useEffect(() => {
    const initializeClient = async () => {
      try {
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed')
        const client = new CompressionClient(connection, DEFAULT_COMPRESSION_CONFIG)
        setClient(client)
        setIsInitialized(true)
      } catch (error) {
        console.error('Failed to initialize compression client:', error)
      }
    }

    initializeClient()
  }, [])

  // Update stats when accounts change
  useEffect(() => {
    if (client) {
      const newStats = client.getStats()
      setStats(newStats)
    }
  }, [compressedAccounts, client])

  const generateSampleData = (size: number): Uint8Array => {
    const data = new Uint8Array(size)
    for (let i = 0; i < size; i++) {
      data[i] = Math.floor(Math.random() * 256)
    }
    return data
  }

  const compressSampleAccount = async () => {
    if (!client) return

    setIsCompressing(true)
    try {
      // Generate sample account data
      const pubkey = new PublicKey('11111111111111111111111111111112') // System program as example
      const data = generateSampleData(1024) // 1KB sample data

      const result = await client.compressAccount(pubkey, Buffer.from(data))
      setLastResult(result)

      if (result.success && result.compressedAccount) {
        setCompressedAccounts(prev => [...prev, result.compressedAccount!])
        setSelectedAccount(result.compressedAccount)
      }
    } catch (error) {
      console.error('Compression failed:', error)
    } finally {
      setIsCompressing(false)
    }
  }

  const fetchCompressedData = async (account: CompressedAccount) => {
    if (!client) return

    setIsFetching(true)
    try {
      const result = await client.fetchCompressed(account.pubkey, 0, 256) // Fetch first 256 bytes
      setLastResult(result)
    } catch (error) {
      console.error('Fetch failed:', error)
    } finally {
      setIsFetching(false)
    }
  }

  const clearAllData = () => {
    setCompressedAccounts([])
    setSelectedAccount(null)
    setLastResult(null)
  }

  return (
    <section id="working-prototype" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Working Prototype Implementation
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Live demonstration of the Enhanced State Compression solution with real Merkle tree implementation, 
            proof generation, and CPI-aware fetch APIs.
          </p>
        </motion.div>

        {/* Status and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="card mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Compression Engine Status
              </h3>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isInitialized ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {isInitialized ? 'Initialized and Ready' : 'Initializing...'}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={compressSampleAccount}
                disabled={!isInitialized || isCompressing}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                {isCompressing ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                {isCompressing ? 'Compressing...' : 'Compress Sample Account'}
              </button>
              
              {selectedAccount && (
                <button
                  onClick={() => fetchCompressedData(selectedAccount)}
                  disabled={isFetching}
                  className="btn-secondary flex items-center gap-2 disabled:opacity-50"
                >
                  {isFetching ? (
                    <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  {isFetching ? 'Fetching...' : 'Fetch Compressed Data'}
                </button>
              )}
              
              <button
                onClick={clearAllData}
                className="btn-secondary flex items-center gap-2"
              >
                <Database className="w-4 h-4" />
                Clear All Data
              </button>
            </div>
          </div>

          {/* Configuration Display */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Configuration</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Merkle Tree Depth:</span>
                <div className="font-mono text-gray-900 dark:text-gray-100">{DEFAULT_COMPRESSION_CONFIG.merkleTreeDepth}</div>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Max Accounts:</span>
                <div className="font-mono text-gray-900 dark:text-gray-100">{DEFAULT_COMPRESSION_CONFIG.maxAccounts}</div>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">DA Provider:</span>
                <div className="font-mono text-gray-900 dark:text-gray-100 capitalize">{DEFAULT_COMPRESSION_CONFIG.daProvider}</div>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Redundancy:</span>
                <div className="font-mono text-gray-900 dark:text-gray-100">{DEFAULT_COMPRESSION_CONFIG.redundancy}x</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statistics Dashboard */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="card mb-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-blue-600" />
              Compression Statistics
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {stats.totalAccounts}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Accounts</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                  {(stats.totalOriginalSize / 1024).toFixed(1)} KB
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Original Size</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                  {(stats.totalCompressedSize / 1024).toFixed(1)} KB
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Compressed Size</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                  {stats.averageCompressionRatio.toFixed(1)}x
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Ratio</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results Display */}
        {lastResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="card mb-8"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              {lastResult.success ? (
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
              )}
              Last Operation Result
            </h3>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Status:</span>
                  <div className={`font-medium ${lastResult.success ? 'text-green-600' : 'text-red-600'}`}>
                    {lastResult.success ? 'Success' : 'Failed'}
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Compute Units:</span>
                  <div className="font-mono text-gray-900 dark:text-gray-100">
                    {lastResult.computeUnits.toLocaleString()}
                  </div>
                </div>
                
                {'transactionFee' in lastResult && (
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Transaction Fee:</span>
                    <div className="font-mono text-gray-900 dark:text-gray-100">
                      {lastResult.transactionFee.toFixed(6)} SOL
                    </div>
                  </div>
                )}
                
                {'verificationTime' in lastResult && (
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Verification Time:</span>
                    <div className="font-mono text-gray-900 dark:text-gray-100">
                      {lastResult.verificationTime}ms
                    </div>
                  </div>
                )}
              </div>
              
              {!lastResult.success && lastResult.error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
                  <div className="text-sm text-red-800 dark:text-red-200">
                    <strong>Error:</strong> {lastResult.error}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Compressed Accounts List */}
        {compressedAccounts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="card"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
              <Database className="w-5 h-5 mr-2 text-purple-600" />
              Compressed Accounts
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4">Public Key</th>
                    <th className="text-left py-3 px-4">Original Size</th>
                    <th className="text-left py-3 px-4">Compressed Size</th>
                    <th className="text-left py-3 px-4">Compression Ratio</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {compressedAccounts.map((account, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 px-4">
                        <div className="font-mono text-sm text-gray-900 dark:text-gray-100">
                          {account.pubkey.toBase58().slice(0, 8)}...
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                        {account.originalSize} bytes
                      </td>
                      <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                        {account.compressedSize} bytes
                      </td>
                      <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                        {account.compressionRatio.toFixed(1)}x
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => setSelectedAccount(account)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 text-sm"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Code Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="card mt-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <Code className="w-5 h-5 mr-2 text-gray-600" />
            Usage Example
          </h3>
          
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`// Initialize compression client
const connection = new Connection('https://api.devnet.solana.com')
const client = new CompressionClient(connection, {
  merkleTreeDepth: 10,
  maxAccounts: 1024,
  daProvider: 'arweave',
  redundancy: 3,
  autoReactivation: true
})

// Compress an account
const pubkey = new PublicKey('11111111111111111111111111111112')
const data = Buffer.from('your account data here')
const result = await client.compressAccount(pubkey, data)

// Fetch compressed data
const fetchResult = await client.fetchCompressed(pubkey, 0, 256)

// Get compression statistics
const stats = client.getStats()
console.log('Total accounts:', stats.totalAccounts)
console.log('Average compression ratio:', stats.averageCompressionRatio)`}
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
