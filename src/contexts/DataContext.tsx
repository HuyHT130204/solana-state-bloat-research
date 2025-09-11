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
        // Dynamically pick the newest snapshot that actually contains comparison.stateSizeGrowth
        const dataModules = import.meta.glob('../data/snapshot-*.json', { eager: true }) as Record<string, unknown>
        const candidates = Object.entries(dataModules)
          .map(([path, mod]) => ({ path, mod }))
          .sort((a, b) => {
            const da = a.path.match(/snapshot-(\d{4})-(\d{2})-(\d{2})\.json$/)
            const db = b.path.match(/snapshot-(\d{4})-(\d{2})-(\d{2})\.json$/)
            const ta = da ? new Date(`${da[1]}-${da[2]}-${da[3]}T00:00:00Z`).getTime() : 0
            const tb = db ? new Date(`${db[1]}-${db[2]}-${db[3]}T00:00:00Z`).getTime() : 0
            return tb - ta
          })

        let chosen: unknown = {}
        for (const c of candidates) {
          const asModule = (c.mod as { default?: unknown })
          const source = (asModule?.default ?? c.mod) as { metrics?: { comparison?: { stateSizeGrowth?: unknown[] } } }
          if (Array.isArray(source.metrics?.comparison?.stateSizeGrowth) && source.metrics!.comparison!.stateSizeGrowth!.length > 0) {
            chosen = c.mod
            break
          }
        }
        const mod = chosen
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


