#!/usr/bin/env node
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import { fileURLToPath } from 'url'

const execAsync = promisify(exec)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function runPocScripts() {
  try {
    const pocDir = path.join(__dirname, '..', 'poc')
    
    console.log('🚀 Running PoC scripts...')
    
    // Run generate-proofs script
    console.log('📝 Generating proofs...')
    await execAsync('npm run generate', { cwd: pocDir })
    
    // Run benchmark script
    console.log('📊 Running benchmarks...')
    await execAsync('npm run benchmark', { cwd: pocDir })
    
    // Run export script
    console.log('📤 Exporting data...')
    await execAsync('npm run export', { cwd: pocDir })
    
    console.log('✅ PoC scripts completed successfully!')
    
    // Copy updated files to public directory
    console.log('📋 Copying files to public directory...')
    await execAsync('copy poc\\data\\benchmark-summary.json public\\poc\\data\\', { cwd: path.join(__dirname, '..') })
    await execAsync('copy poc\\data\\merkle-trees.json public\\poc\\data\\', { cwd: path.join(__dirname, '..') })
    await execAsync('copy poc\\data\\proofs.json public\\poc\\data\\', { cwd: path.join(__dirname, '..') })
    await execAsync('if not exist public\\poc\\data mkdir public\\poc\\data', { cwd: path.join(__dirname, '..') })
    await execAsync('if exist poc\\data\\benchmarks.csv copy poc\\data\\benchmarks.csv public\\poc\\data\\', { cwd: path.join(__dirname, '..') })
    await execAsync('if not exist public\\poc\\artifacts mkdir public\\poc\\artifacts', { cwd: path.join(__dirname, '..') })
    await execAsync('if exist poc\\artifacts\\transaction-ids.json copy poc\\artifacts\\transaction-ids.json public\\poc\\artifacts\\', { cwd: path.join(__dirname, '..') })
    
    console.log('🎉 All done! New data is ready.')
    
  } catch (error) {
    console.error('❌ Error running PoC scripts:', error)
    process.exit(1)
  }
}

runPocScripts()
