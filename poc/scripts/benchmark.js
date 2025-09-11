import fs from 'fs-extra';
import { createHash } from 'crypto';
import { createObjectCsvWriter } from 'csv-writer';

// Benchmark Merkle proof verification
function benchmarkMerkleVerification(proofs, iterations = 1000) {
  const results = [];
  
  for (let i = 0; i < iterations; i++) {
    const proof = proofs[Math.floor(Math.random() * proofs.length)];
    const start = performance.now();
    
    // Simulate proof verification
    createHash('sha256').update(proof.proof.join('')).digest();
    
    const end = performance.now();
    results.push({
      type: 'merkle_verification',
      proofSize: proof.proofSize,
      accountSize: proof.accountSize,
      timeMs: end - start,
      compressionRatio: proof.compressionRatio
    });
  }
  
  return results;
}

// Benchmark ZK proof verification
function benchmarkZKVerification(zkProofs, iterations = 100) {
  const results = [];
  
  for (let i = 0; i < iterations; i++) {
    const proof = zkProofs[Math.floor(Math.random() * zkProofs.length)];
    const start = performance.now();
    
    // Simulate ZK proof verification
    createHash('sha256').update(proof.proof).digest();
    
    const end = performance.now();
    results.push({
      type: 'zk_verification',
      proofSize: proof.proofSize,
      timeMs: end - start,
      generationTime: proof.generationTime
    });
  }
  
  return results;
}

// Benchmark account compression
function benchmarkCompression(accounts, iterations = 100) {
  const results = [];
  
  for (let i = 0; i < iterations; i++) {
    const account = accounts[Math.floor(Math.random() * accounts.length)];
    const start = performance.now();
    
    // Simulate compression
    createHash('sha256').update(account.data).digest();
    
    const end = performance.now();
    results.push({
      type: 'compression',
      originalSize: account.size,
      compressedSize: 32, // SHA256 hash
      timeMs: end - start,
      compressionRatio: (account.size / 32).toFixed(2)
    });
  }
  
  return results;
}

// Calculate statistics
function calculateStats(results) {
  const times = results.map(r => r.timeMs);
  const sizes = results.map(r => r.proofSize || r.originalSize);
  
  return {
    count: results.length,
    avgTime: times.reduce((a, b) => a + b, 0) / times.length,
    minTime: Math.min(...times),
    maxTime: Math.max(...times),
    avgSize: sizes.reduce((a, b) => a + b, 0) / sizes.length,
    minSize: Math.min(...sizes),
    maxSize: Math.max(...sizes)
  };
}

// Main benchmark function
async function runBenchmarks() {
  console.log('Loading data...');
  const accounts = await fs.readJson('data/sample-accounts.json');
  const { merkleProofs, zkProofs } = await fs.readJson('data/proofs.json');
  
  console.log('Running Merkle proof verification benchmarks...');
  const merkleResults = benchmarkMerkleVerification(merkleProofs, 1000);
  
  console.log('Running ZK proof verification benchmarks...');
  const zkResults = benchmarkZKVerification(zkProofs, 100);
  
  console.log('Running compression benchmarks...');
  const compressionResults = benchmarkCompression(accounts, 100);
  
  // Calculate statistics
  const merkleStats = calculateStats(merkleResults);
  const zkStats = calculateStats(zkResults);
  const compressionStats = calculateStats(compressionResults);
  
  // Create CSV writer
  const csvWriter = createObjectCsvWriter({
    path: 'data/benchmarks.csv',
    header: [
      { id: 'type', title: 'Type' },
      { id: 'proofSize', title: 'Proof Size (bytes)' },
      { id: 'accountSize', title: 'Account Size (bytes)' },
      { id: 'timeMs', title: 'Time (ms)' },
      { id: 'compressionRatio', title: 'Compression Ratio' }
    ]
  });
  
  // Write all results to CSV
  const allResults = [...merkleResults, ...zkResults, ...compressionResults];
  await csvWriter.writeRecords(allResults);
  
  // Save summary statistics
  const summary = {
    timestamp: new Date().toISOString(),
    merkle: merkleStats,
    zk: zkStats,
    compression: compressionStats,
    recommendations: {
      merkleProofSize: `${merkleStats.avgSize.toFixed(0)} bytes (avg)`,
      zkProofSize: `${zkStats.avgSize.toFixed(0)} bytes (avg)`,
      merkleVerifyTime: `${merkleStats.avgTime.toFixed(2)}ms (avg)`,
      zkVerifyTime: `${zkStats.avgTime.toFixed(2)}ms (avg)`,
      compressionRatio: `${compressionStats.avgSize.toFixed(0)}:1 (avg)`
    }
  };
  
  await fs.writeJson('data/benchmark-summary.json', summary, { spaces: 2 });
  
  console.log('\nBenchmark Results:');
  console.log('==================');
  console.log(`Merkle Proofs: ${merkleStats.avgTime.toFixed(2)}ms avg, ${merkleStats.avgSize.toFixed(0)} bytes avg`);
  console.log(`ZK Proofs: ${zkStats.avgTime.toFixed(2)}ms avg, ${zkStats.avgSize.toFixed(0)} bytes avg`);
  console.log(`Compression: ${compressionStats.avgTime.toFixed(2)}ms avg, ${compressionStats.avgSize.toFixed(0)}:1 ratio`);
  console.log('\nDetailed results saved to data/benchmarks.csv');
  console.log('Summary saved to data/benchmark-summary.json');
}

// Run if called directly
runBenchmarks().catch(console.error);

export default { runBenchmarks, benchmarkMerkleVerification, benchmarkZKVerification, benchmarkCompression };
