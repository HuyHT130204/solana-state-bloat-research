import { motion } from 'framer-motion'

const partners = [
  { name: 'DexterLab', role: 'Archival RPC / Historical Data', status: 'Target', link: 'https://dexterlab.com/' },
  { name: 'Helius', role: 'Rent/Closure Automation, Indexer', status: 'Target', link: 'https://docs.helius.dev/' },
  { name: 'QuickNode', role: 'RPC / Indexer Compatibility', status: 'Target', link: 'https://www.quicknode.com' },
  { name: 'Arweave', role: 'Data Availability Provider', status: 'Target', link: 'https://www.arweave.org' },
  { name: 'Filecoin', role: 'Data Availability Provider', status: 'Target', link: 'https://filecoin.io' },
]

const sampleEmail = `Subject: Pilot collaboration on Solana state bloat mitigation (compression + DA)

Hi <Name>,

We are preparing a pilot to evaluate CPI-safe state compression and off-chain DA with audited proofs.
We’d love to collaborate on (a) archival/rpc integration and (b) DA retention SLAs. Happy to share PoC scripts and benchmarks.

Best,
Huy`

export default function PilotPartners() {
  return (
    <section id="pilot-partners" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-max">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="card">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">Pilot & Partners</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Targeted partners for pilot deployments. Status will be updated as outreach proceeds.</p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4">Partner</th>
                  <th className="text-left py-3 px-4">Role</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Link</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((p) => (
                  <tr key={p.name} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 font-medium">{p.name}</td>
                    <td className="py-3 px-4 text-sm">{p.role}</td>
                    <td className="py-3 px-4 text-sm">{p.status}</td>
                    <td className="py-3 px-4 text-sm"><a href={p.link} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">Visit</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Sample Outreach Email</h3>
            <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded text-xs whitespace-pre-wrap">{sampleEmail}</pre>
          </div>
        </motion.div>
      </div>
    </section>
  )
}



