import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { DataProvider, useData } from './contexts/DataContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ResearchNotes from './pages/ResearchNotes'
// import { Toaster } from 'react-hot-toast'

function AppContent() {
  const { isLoaded } = useData()
  const [delayPassed, setDelayPassed] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setDelayPassed(true), 1200)
    return () => clearTimeout(id)
  }, [])
  const showLoader = !isLoaded || !delayPassed
  if (showLoader) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src="/superteamvn.jpg" alt="Superteam VN" className="h-8 w-8 rounded-full object-cover" />
            <img src="/solana-sol-logo.png" alt="Solana" className="h-8 w-8" />
          </div>
          <div className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Solana State Bloat Research</div>
          <div className="mx-auto mb-2 h-10 w-10 rounded-full border-2 border-gray-300 dark:border-gray-600 border-t-transparent animate-spin"></div>
          <ElapsedTimer />
          <div className="text-gray-700 dark:text-gray-300 mt-1">Đang tải dữ liệu…</div>
        </div>
      </div>
    )
  }
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/research-notes" element={<ResearchNotes />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

function ElapsedTimer() {
  const [ms, setMs] = useState(0)
  useEffect(() => {
    const started = Date.now()
    const id = setInterval(() => {
      setMs(Date.now() - started)
    }, 100)
    return () => clearInterval(id)
  }, [])
  const seconds = Math.floor(ms / 1000)
  const centis = Math.floor((ms % 1000) / 10)
  const pad = (n: number, l = 2) => String(n).padStart(l, '0')
  return (
    <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
      {pad(seconds)}:{pad(centis)}
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <AppContent />
          {/* <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--toast-bg)',
                color: 'var(--toast-color)',
              },
            }}
          /> */}
        </div>
      </DataProvider>
    </ThemeProvider>
  )
}

export default App
