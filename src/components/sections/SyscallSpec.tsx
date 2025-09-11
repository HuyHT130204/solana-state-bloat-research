import { motion } from 'framer-motion'

type Row = {
  fn: string
  signature: string
  purpose: string
  compute: string
  proof: string
  errors: string
}

const rows: Row[] = [
  {
    fn: 'sol_compress_account',
    signature: '(pubkey: [u8;32], combined_hash: [u8;32]) -> Result<(), Error>',
    purpose: 'Commit current account bytes into compression tree (updates on-chain root)',
    compute: '~20–40k CU (hash + bookkeeping)',
    proof: 'n/a',
    errors: 'InvalidAccount, TreeFull, NotAuthorized'
  },
  {
    fn: 'sol_fetch_compressed',
    signature: '(pubkey: [u8;32], proof_ptr: *const u8, proof_len: u32, offset: u32, len: u32) -> Result<*const u8, Error>',
    purpose: 'Verify Merkle proof and return read-only slice for CPI without full decompression',
    compute: '~30–60k CU + O(depth) (hash path verify)',
    proof: '~640–1024B (depth 10–16)',
    errors: 'InvalidProof, OutOfBounds, NotCompressed'
  },
  {
    fn: 'sol_fetch_with_proof',
    signature: '(uri_ptr: *const u8, uri_len: u32, pubkey: [u8;32], offset: u32, len: u32) -> Result<*const u8, Error>',
    purpose: 'Runtime-assisted fetch from DA (Arweave/Filecoin) + verify vs on-chain commitment',
    compute: '~60–120k CU (fetch+verify) + I/O latency hidden by runtime',
    proof: '~1–2KB incl. metadata and encoding',
    errors: 'Unavailable, Timeout, InvalidCommitment, ProviderMismatch'
  },
  {
    fn: 'sol_decompress_account',
    signature: '(dst_ptr: *mut u8, dst_cap: u32) -> Result<u32, Error>',
    purpose: 'Optional helper to materialize entire account into scratch when needed',
    compute: '~80–160k CU (depends on size/codec)',
    proof: 'n/a',
    errors: 'DstTooSmall, NotCompressed'
  },
]

export default function SyscallSpec() {
  return (
    <section id="syscall-spec" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">Syscall API Specification (Detailed)</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Signatures, semantics, estimated compute units (CU), typical proof sizes, and error conditions. Values are indicative and should be validated on testnet.</p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4">Function</th>
                  <th className="text-left py-3 px-4">Signature</th>
                  <th className="text-left py-3 px-4">Purpose</th>
                  <th className="text-left py-3 px-4">Est. Compute</th>
                  <th className="text-left py-3 px-4">Proof Size</th>
                  <th className="text-left py-3 px-4">Errors</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.fn} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4 font-medium">{r.fn}</td>
                    <td className="py-3 px-4 text-sm font-mono break-all">{r.signature}</td>
                    <td className="py-3 px-4 text-sm">{r.purpose}</td>
                    <td className="py-3 px-4 text-sm">{r.compute}</td>
                    <td className="py-3 px-4 text-sm">{r.proof}</td>
                    <td className="py-3 px-4 text-sm">{r.errors}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Binary Layout & ABI</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">All pointers are guest virtual addresses. Lengths are little-endian <code className="font-mono">u32</code>. Returns <code className="font-mono">i64</code> where <code className="font-mono">&gt;=0</code> indicates either pointer or success code; negatives are errors.</p>
              <pre className="bg-gray-900 text-gray-100 text-xs p-3 rounded overflow-x-auto">
{`// sol_fetch_compressed(
//   pubkey: [u8;32],
//   proof_ptr: u64,
//   proof_len: u32,
//   offset: u32,
//   len: u32
// ) -> i64
// Memory: proof_ptr points to contiguous hash path nodes (32B * depth)
// Return: >=0 pointer to runtime buffer; caller must treat as read-only
// Errors: -1 INVALID_PROOF, -2 OUT_OF_BOUNDS, -3 NOT_COMPRESSED, -4 INVALID_ARG
// Est. CU: 50,000 per 1KB of proof; base 20,000 + 3,000 * depth
`}
              </pre>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Error Codes</h3>
              <ul className="list-disc pl-6 text-sm text-gray-700 dark:text-gray-300">
                <li><code className="font-mono">-1 INVALID_PROOF</code>: Merkle path does not reconstruct committed root.</li>
                <li><code className="font-mono">-2 OUT_OF_BOUNDS</code>: Requested slice exceeds committed length.</li>
                <li><code className="font-mono">-3 NOT_COMPRESSED</code>: Account not enrolled in compression cohort.</li>
                <li><code className="font-mono">-4 INVALID_ARG</code>: Null/unaligned pointer or zero length.</li>
                <li><code className="font-mono">-5 DA_UNAVAILABLE</code>: For fetch_with_proof, provider unreachable or timeout.</li>
                <li><code className="font-mono">-6 INVALID_COMMITMENT</code>: External bytes mismatch on-chain commitment.</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}



