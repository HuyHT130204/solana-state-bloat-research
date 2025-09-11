import fs from 'fs-extra';
import { randomBytes, createHash } from 'crypto';
import { Buffer } from 'buffer';

// Generate sample Solana accounts
function generateSampleAccounts(count = 1000) {
  const accounts = [];
  const accountTypes = ['token', 'program', 'system', 'stake', 'vote'];
  
  for (let i = 0; i < count; i++) {
    const type = accountTypes[i % accountTypes.length];
    const size = Math.floor(Math.random() * 1000) + 100; // 100-1100 bytes
    const data = randomBytes(size);
    
    accounts.push({
      pubkey: randomBytes(32).toString('hex'),
      owner: randomBytes(32).toString('hex'),
      lamports: Math.floor(Math.random() * 1000000000),
      data: data.toString('hex'),
      executable: false,
      rentEpoch: Math.floor(Math.random() * 1000),
      type: type,
      size: size
    });
  }
  
  return accounts;
}

// Simple Merkle tree implementation
class SimpleMerkleTree {
  constructor(leaves) {
    this.leaves = leaves;
    this.tree = this.buildTree(leaves);
  }
  
  buildTree(leaves) {
    if (leaves.length === 0) return [];
    if (leaves.length === 1) return [leaves[0]];
    
    const tree = [...leaves];
    let currentLevel = leaves;
    
    while (currentLevel.length > 1) {
      const nextLevel = [];
      for (let i = 0; i < currentLevel.length; i += 2) {
        const left = currentLevel[i];
        const right = currentLevel[i + 1] || left; // Duplicate last if odd
        const combined = Buffer.concat([left, right]);
        const hash = createHash('sha256').update(combined).digest();
        nextLevel.push(hash);
        tree.push(hash);
      }
      currentLevel = nextLevel;
    }
    
    return tree;
  }
  
  getRoot() {
    return this.tree[this.tree.length - 1];
  }
  
  getProof(leaf) {
    const leafIndex = this.leaves.findIndex(l => l.equals(leaf));
    if (leafIndex === -1) return [];
    
    const proof = [];
    let currentIndex = leafIndex;
    let levelStart = 0;
    let levelSize = this.leaves.length;
    
    while (levelSize > 1) {
      const siblingIndex = currentIndex % 2 === 0 ? currentIndex + 1 : currentIndex - 1;
      if (siblingIndex < levelStart + levelSize) {
        proof.push(this.tree[levelStart + siblingIndex]);
      }
      
      currentIndex = Math.floor(currentIndex / 2);
      levelStart += levelSize;
      levelSize = Math.ceil(levelSize / 2);
    }
    
    return proof;
  }
}

// Generate Merkle tree from accounts
function generateMerkleTree(accounts) {
  const leaves = accounts.map(account => 
    createHash('sha256').update(JSON.stringify(account)).digest()
  );
  
  const tree = new SimpleMerkleTree(leaves);
  return {
    root: tree.getRoot().toString('hex'),
    depth: Math.ceil(Math.log2(leaves.length)),
    leafCount: leaves.length,
    tree: tree
  };
}

// Generate Merkle proofs for accounts
function generateMerkleProofs(accounts, merkleTree) {
  const proofs = [];
  
  accounts.forEach((account) => {
    const leaf = createHash('sha256').update(JSON.stringify(account)).digest();
    const proof = merkleTree.tree.getProof(leaf);
    
    proofs.push({
      accountPubkey: account.pubkey,
      proof: proof.map(p => p.toString('hex')),
      proofSize: proof.length * 32, // 32 bytes per proof element
      accountSize: account.size,
      compressionRatio: (account.size / (proof.length * 32)).toFixed(2)
    });
  });
  
  return proofs;
}

// Generate ZK proofs (simplified simulation)
function generateZKProofs(accounts) {
  const zkProofs = [];
  
  accounts.forEach(account => {
    // Simulate ZK proof generation
    const proof = {
      accountPubkey: account.pubkey,
      proof: randomBytes(128).toString('hex'), // 128 bytes ZK proof
      publicInputs: [account.pubkey, account.owner],
      proofSize: 128,
      verificationTime: Math.random() * 5 + 1, // 1-6ms
      generationTime: Math.random() * 100 + 50 // 50-150ms
    };
    
    zkProofs.push(proof);
  });
  
  return zkProofs;
}

// Main generation function
async function generateAll() {
  console.log('Generating sample accounts...');
  const accounts = generateSampleAccounts(1000);
  
  console.log('Generating Merkle tree...');
  const merkleTree = generateMerkleTree(accounts);
  
  console.log('Generating Merkle proofs...');
  const merkleProofs = generateMerkleProofs(accounts, merkleTree);
  
  console.log('Generating ZK proofs...');
  const zkProofs = generateZKProofs(accounts);
  
  // Save all data
  await fs.ensureDir('data');
  await fs.ensureDir('artifacts');
  
  await fs.writeJson('data/sample-accounts.json', accounts, { spaces: 2 });
  await fs.writeJson('data/merkle-trees.json', merkleTree, { spaces: 2 });
  await fs.writeJson('data/proofs.json', { merkleProofs, zkProofs }, { spaces: 2 });
  await fs.writeJson('artifacts/merkle-roots.json', { 
    root: merkleTree.root,
    depth: merkleTree.depth,
    timestamp: new Date().toISOString()
  }, { spaces: 2 });
  
  console.log('Generation complete!');
  console.log(`- ${accounts.length} accounts generated`);
  console.log(`- Merkle tree depth: ${merkleTree.depth}`);
  console.log(`- Merkle root: ${merkleTree.root}`);
  console.log(`- ${merkleProofs.length} Merkle proofs generated`);
  console.log(`- ${zkProofs.length} ZK proofs generated`);
}

// Run if called directly
generateAll().catch(console.error);

export default { generateAll, generateSampleAccounts, generateMerkleTree, generateMerkleProofs, generateZKProofs };
