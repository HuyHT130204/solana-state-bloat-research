import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { StateData } from '../components/visualizations/StateGrowth3D'

interface DataContextValue {
  isLoaded: boolean
  threeData: StateData[]
}

const DataContext = createContext<DataContextValue>({ isLoaded: false, threeData: [] })

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [threeData, setThreeData] = useState<StateData[]>([])

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const mod = await import('../data/snapshot-2025-09-09.json')
        type RawGrowth = { date: string; solana: number; ethereum: number }
        type Snapshot = { metrics?: { comparison?: { stateSizeGrowth?: RawGrowth[] } } }
        const asModule = mod as { default?: Snapshot } & Snapshot
        const source: Snapshot = asModule.default ?? asModule
        const arr: RawGrowth[] = source.metrics?.comparison?.stateSizeGrowth ?? []
        const transformed: StateData[] = arr.map((d) => ({
          date: (d.date ?? '').slice(0, 7).replace('-01', ''),
          solana: Number(d.solana ?? 0) || 0,
          ethereum: Number(d.ethereum ?? 0) || 0,
        }))
        if (mounted) {
          setThreeData(transformed)
        }
      } catch (_e) {
        if (mounted) {
          setThreeData([])
        }
      } finally {
        if (mounted) setIsLoaded(true)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  const value = useMemo(() => ({ isLoaded, threeData }), [isLoaded, threeData])
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  return useContext(DataContext)
}


