import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'

const execAsync = promisify(exec)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Run PoC scripts to generate new data
    const pocDir = path.join(process.cwd(), 'poc')
    
    console.log('Running PoC scripts...')
    
    // Run generate-proofs script
    await execAsync('npm run generate', { cwd: pocDir })
    
    // Run benchmark script
    await execAsync('npm run benchmark', { cwd: pocDir })
    
    // Run export script
    await execAsync('npm run export', { cwd: pocDir })
    
    console.log('PoC scripts completed successfully')
    
    res.status(200).json({ 
      success: true, 
      message: 'Proofs generated successfully',
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Error running PoC scripts:', error)
    res.status(500).json({ 
      error: 'Failed to generate proofs',
      details: error.message 
    })
  }
}
