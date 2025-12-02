// Cloud Spend Viewer - dashboard with API integration
import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Layout/Navbar.jsx'
import PageContainer from './components/Layout/PageContainer.jsx'
import Footer from './components/Layout/Footer.jsx'
import { fetchSpendData } from './api/spendApi.js'
import './App.css'

function App() {
  // Filters used by API (provider, team, env, month YYYY-MM)
  const [filters, setFilters] = useState({ provider: '', team: '', env: '', month: '' })

  // Data + UI state
  const [items, setItems] = useState([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch whenever filters change
  useEffect(() => {
    let cancelled = false
    async function run() {
      setLoading(true)
      setError(null)
      const { data, error } = await fetchSpendData(filters)
      if (cancelled) return
      if (error) {
        setError(error.message || String(error))
        setItems([])
        setCount(0)
      } else {
        setItems(data.items || [])
        setCount(data.count || 0)
      }
      setLoading(false)
    }
    run()
    return () => {
      cancelled = true
    }
  }, [filters])

  // Simple summary derived on client for now (can move to backend later)
  const totalSpend = useMemo(() => items.reduce((sum, it) => sum + (Number(it.cost_usd) || 0), 0), [items])
  const spendByProvider = useMemo(() => {
    const map = {}
    for (const it of items) {
      const key = (it.cloud_provider || 'Unknown').toUpperCase()
      map[key] = (map[key] || 0) + (Number(it.cost_usd) || 0)
    }
    return map
  }, [items])

  return (
    <>
      <Navbar />
      <PageContainer
        title="K&Co. Cloud Spend Viewer"
        subtitle="Explore cloud cost data with filters and summaries."
        filters={filters}
        onChangeFilters={setFilters}
        loading={loading}
        error={error}
        count={count}
        items={items}
        totalSpend={totalSpend}
        spendByProvider={spendByProvider}
      />
      <Footer />
    </>
  )
}

export default App
