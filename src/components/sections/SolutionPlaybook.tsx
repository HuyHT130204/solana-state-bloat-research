import React from 'react'
import { motion } from 'framer-motion'
import { Layers, Database, RefreshCw, ExternalLink, ShieldCheck, Zap, Coins, Archive, Network, Wrench } from 'lucide-react'

type PlayItem = {
  title: string
  bullets: string[]
  notes?: string
  sources?: { label: string; url: string }[]
}

type PlaySection = {
  id: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  items: PlayItem[]
}

const sections: PlaySection[] = [
  {
    id: 'rent-lifecycle',
    icon: Coins,
    title: 'Rent & Lifecycle Restructuring',
    description: 'Replace one-time rent-exempt funding with ongoing, usage-aware lifecycle policies to curb perpetual account growth.',
    items: [
      {
        title: 'Subscription-like Rent',
        bullets: [
          'Allow creating accounts below rent-exempt; charge per-epoch rent proportional to bytes when inactive',
          'Auto-delete or tombstone when balance exhausts; owner can top-up to retain',
          'Validator share: distribute collected lamports to storage providers'
        ],
        notes: 'Aligns with community proposals discussing epoch-based debits for idle state.',
        sources: [
          { label: 'HackMD (expiry)', url: 'https://hackmd.io/' },
          { label: 'QuickNode (rent)', url: 'https://www.quicknode.com/guides/solana-development/getting-started/understanding-rent-on-solana' }
        ]
      },
      {
        title: 'Auto-closure & Refund Flows',
        bullets: [
          'SDKs/dApps automatically close empty token/NFT PDAs and return lamports',
          'Introduce “sweep” transactions that permissionlessly close trivially empty accounts and share refunds as incentives'
        ],
        sources: [
          { label: 'Helius Docs', url: 'https://docs.helius.dev/' }
        ]
      },
      {
        title: 'Dynamic Pricing',
        bullets: [
          'Increase rent-exempt thresholds over time or by size tiers',
          'Usage-tiered pricing: higher fees for long-idle large accounts'
        ],
        sources: [
          { label: 'QuickNode (rent)', url: 'https://www.quicknode.com/guides/solana-development/getting-started/understanding-rent-on-solana' }
        ]
      }
    ]
  },
  {
    id: 'state-expiry',
    icon: RefreshCw,
    title: 'State Expiry & Tombstoning',
    description: 'Expire long-idle accounts from hot state while preserving recoverability via proofs/witnesses.',
    items: [
      {
        title: 'TTL & Epoch-based Expiry',
        bullets: [
          'Attach TTL to accounts; if untouched for N epochs, move to tombstone',
          'Accessing expired account requires reinstate fee plus witness to restore'
        ],
        sources: [
          { label: 'HackMD (expiry)', url: 'https://hackmd.io/' },
          { label: 'Soroban Docs', url: 'https://developers.stellar.org/docs/soroban' }
        ]
      },
      {
        title: 'Witnessed Recovery',
        bullets: [
          'Proof includes Merkle path or commitment root to reconstruct account bytes',
          'Runtime verifies proof and rehydrates minimal state on-demand'
        ],
        sources: [
          { label: 'Soroban Blog', url: 'https://stellar.org/blog/developers/not-all-data-is-equal-how-soroban-is-solving-state-bloat-with-state-expiration' }
        ]
      }
    ]
  },
  {
    id: 'tiered-storage',
    icon: Layers,
    title: 'Hot/Cold Tiered Storage',
    description: 'Keep frequently accessed accounts in hot state; shift cold data to lower-cost layers with higher-latency retrieval.',
    items: [
      {
        title: 'Policy-based Tiering',
        bullets: [
          'Promote/demote accounts based on recent access ratio',
          'Charge higher gas/rent tier for cold access to reflect retrieval costs'
        ],
        sources: [
          { label: 'Soroban Docs', url: 'https://developers.stellar.org/docs/soroban' },
          { label: 'DexterLab RAW', url: 'https://dexterlab.com/solana-raw-data/' }
        ]
      },
      {
        title: 'Cold Pointers & Commitments',
        bullets: [
          'Validator keeps pointer and commitment (Merkle root); content stored with archivers',
          'On access, fetch and verify against commitment before serving'
        ],
        sources: [
          { label: 'Blockchain.news', url: 'https://blockchain.news/' },
          { label: 'DexterLab Archival', url: 'https://dexterlab.com/solana-archival-rpc/' }
        ]
      }
    ]
  },
  {
    id: 'compression-offchain',
    icon: Database,
    title: 'State Compression & Off-chain Storage',
    description: 'Store only commitments/hashes on-chain while moving large payloads off-chain with verifiable integrity.',
    items: [
      {
        title: 'Generalized Account Compression',
        bullets: [
          'Extend SPL compression patterns to broader account types',
          'Keep Merkle roots on-chain; store leaves in DA networks (Arweave/Filecoin)'
        ],
        sources: [
          { label: 'SPL Compression', url: 'https://spl.solana.com/state-compression' },
          { label: 'Solana Docs', url: 'https://docs.solana.com/developers/courses/state-compression/generalized-state-compression' }
        ]
      },
      {
        title: 'CPI-safe Fetch APIs',
        bullets: [
          'Runtime/syscalls to fetch compressed slices with proofs inside CPI',
          'Selective decompression and caching to reduce latency'
        ],
        sources: [
          { label: 'SPL Compression', url: 'https://spl.solana.com/state-compression' }
        ]
      }
    ]
  },
  {
    id: 'archival',
    icon: Archive,
    title: 'Archiving & Deterministic Rollouts',
    description: 'Reduce contention and duplication by deterministically moving cohorts of idle accounts to archival layers.',
    items: [
      {
        title: 'Deterministic Archival Windows',
        bullets: [
          'At fixed epochs, all validators archive the same cohort of idle accounts',
          'Avoid reward races and duplicate compression transactions'
        ],
        sources: [
          { label: 'Blockchain.news', url: 'https://blockchain.news/' },
          { label: 'DexterLab Whitepaper', url: 'https://dexterlab.com/improving-solana-historical-data-accessibility/' }
        ]
      },
      {
        title: 'Compact Merkle Segments',
        bullets: [
          'Freeze archived cohorts into small Merkle segments',
          'Keep segment roots on-chain; bulk data in archiver networks'
        ],
        sources: [
          { label: 'Blockchain.news', url: 'https://blockchain.news/' },
          { label: 'DexterLab Archival RPC', url: 'https://dexterlab.com/solana-archival-rpc/' }
        ]
      }
    ]
  },
  {
    id: 'app-design',
    icon: Wrench,
    title: 'Application-level Optimizations',
    description: 'Design accounts and data formats to minimize persistent bytes and promote clean-up.',
    items: [
      {
        title: 'Granular PDAs & Lifecycle',
        bullets: [
          'Split data into smaller PDAs created on-demand and closed when unused',
          'Avoid monolithic accounts; isolate frequently updated fields'
        ],
        sources: [
          { label: 'Solana StackExchange', url: 'https://solana.stackexchange.com/' }
        ]
      },
      {
        title: 'Compact Encoding & Compression',
        bullets: [
          'Binary codecs, varints, domain-specific compression for text/JSON',
          'Deduplicate blobs; store only references plus content hashes'
        ],
        sources: [
          { label: 'SPL Compression', url: 'https://spl.solana.com/state-compression' }
        ]
      }
    ]
  },
  {
    id: 'network-ops',
    icon: Network,
    title: 'Network & Operations',
    description: 'Operational patterns to keep validator requirements manageable without sacrificing security.',
    items: [
      {
        title: 'Snapshots & Light/Stateless Modes',
        bullets: [
          'Increase snapshot cadence; boot from snapshots instead of replaying full history',
          'Explore stateless verification for non-producers with witness-carrying txs'
        ],
        sources: [
          { label: 'GetBlock (snapshots)', url: 'https://getblock.io/blog/solana-full-node-complete-guide/' },
          { label: 'HackMD (stateless)', url: 'https://hackmd.io/' },
          { label: 'DexterLab Streams', url: 'https://dexterlab.com/solana-real-time-data-streams/' }
        ]
      },
      {
        title: 'Future Partitioning/Sharding (Exploratory)',
        bullets: [
          'Investigate program- or address-range partitioning of state',
          'Independent validator subsets per shard for storage scaling'
        ],
        sources: [
          { label: 'BNB Chain Blog', url: 'https://bnbchain.org/en/blog' }
        ]
      }
    ]
  },
  {
    id: 'incentives',
    icon: ShieldCheck,
    title: 'Incentives & Economics',
    description: 'Align incentives so storage costs are internalized and clean-up is rewarded.',
    items: [
      {
        title: 'Rewards for Cleanup/Compression',
        bullets: [
          'Pay a share of recovered lamports to closers/compressors',
          'Grant emissions or fee rebates to archival providers with SLAs'
        ],
        sources: [
          { label: 'Helius Docs', url: 'https://docs.helius.dev/' },
          { label: 'Blockchain.news', url: 'https://blockchain.news/' }
        ]
      },
      {
        title: 'Time-varying Storage Fees',
        bullets: [
          'Gradually increase storage price for long-lived idle state',
          'Discounts for hot-but-small working sets that rotate frequently'
        ],
        sources: [
          { label: 'QuickNode (rent)', url: 'https://www.quicknode.com/guides/solana-development/getting-started/understanding-rent-on-solana' }
        ]
      }
    ]
  }
]

export default function SolutionPlaybook() {
  return (
    <section id="solution-playbook" className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Solution Playbook
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            A comprehensive set of actionable strategies to reduce Solana account state bloat. Each cluster below outlines implementation
            ideas tailored to Solana’s runtime, economics, and developer ergonomics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, i) => {
            const Icon = section.icon
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 * i }}
                viewport={{ once: true }}
                className="card"
              >
                <div className="flex items-center mb-4">
                  <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{section.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{section.description}</p>
                <div className="space-y-6">
                  {section.items.map((it, idx) => (
                    <div key={idx} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5">
                      <div className="font-medium text-gray-900 dark:text-gray-100 mb-2">{it.title}</div>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        {it.bullets.map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                      {it.notes && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-3">{it.notes}</div>
                      )}
                      {it.sources && it.sources.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {it.sources.map((s, sIdx) => (
                            <a key={sIdx} href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 inline-flex items-center hover:opacity-90 transition-opacity">
                              <ExternalLink className="w-3.5 h-3.5 mr-1" />
                              {s.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <ExternalLink className="w-3.5 h-3.5 mr-1" />
                  See References section for sources and prior art.
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="card mt-10"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
            <Zap className="w-5 h-5 mr-2" /> Deployment Guidance
          </h3>
          <ul className="list-disc pl-6 text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <li>Start with app-level optimizations and auto-closure flows (no protocol changes).</li>
            <li>Add CPI-safe compression fetch APIs and generalized account compression.</li>
            <li>Pilot state expiry + deterministic archival on testnet with opt-in cohorts.</li>
            <li>Tune rent/economic parameters to sustain storage providers and incentivize cleanup.</li>
          </ul>
        </motion.div>

        {/* Storage Economics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="card mt-10"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Storage Economics (Illustrative)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="font-medium mb-1">DA Pricing (order-of-magnitude)</div>
              <div className="text-gray-600 dark:text-gray-300">Arweave/Filecoin: $1–$5 / GB-year (varies)</div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="font-medium mb-1">Deposit Formula</div>
              <div className="text-gray-600 dark:text-gray-300">deposit = bytes × price_per_byte × retention_years</div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="font-medium mb-1">SLA & Incentives</div>
              <div className="text-gray-600 dark:text-gray-300">k-of-n providers; periodic attestations; slashing on unavailability</div>
            </div>
          </div>
        </motion.div>

        {/* Pilot & Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="card mt-10"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Pilot & Partners (Targets)</h3>
          <ul className="list-disc pl-6 text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <li>DexterLab — archival RPC and historical data pilot</li>
            <li>Helius / QuickNode — rent/closure automation and indexer compatibility</li>
            <li>Arweave / Filecoin providers — DA retention SLAs</li>
            <li>Wallet/SDK teams — auto-close sweep UX</li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}


