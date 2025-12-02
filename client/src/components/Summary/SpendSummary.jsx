import React, { useMemo } from 'react'
import './SpendSummary.css'

/**
 * SpendSummary
 * Renders three responsive cards: Total Spend, AWS Spend, GCP Spend.
 * Props:
 * - totalSpend: number
 * - spendByProvider: { [provider: string]: number }
 * - items?: array (optional, not required when totals are passed)
 */
export default function SpendSummary({ totalSpend = 0, spendByProvider = {}, items }) {
  // If items are provided, compute totals here; otherwise use props
  const computed = useMemo(() => {
    if (!Array.isArray(items)) {
      return {
        total: Number(totalSpend) || 0,
        aws: Number(spendByProvider?.AWS || 0),
        gcp: Number(spendByProvider?.GCP || 0),
      }
    }
    let total = 0
    let aws = 0
    let gcp = 0
    for (const it of items) {
      const amt = Number(it?.cost_usd) || 0
      total += amt
      const prov = String(it?.cloud_provider || '').toUpperCase()
      if (prov === 'AWS') aws += amt
      if (prov === 'GCP') gcp += amt
    }
    return { total, aws, gcp }
  }, [items, totalSpend, spendByProvider])

  // Build dynamic provider list from spendByProvider prop
  const providerEntries = useMemo(() => {
    const entries = Object.entries(spendByProvider || {})
    // Stable order: AWS, GCP, AZURE, then others alphabetically
    const order = ['AWS', 'GCP', 'AZURE']
    return entries
      .map(([k, v]) => [String(k), Number(v || 0)])
      .sort((a, b) => {
        const ai = order.indexOf(a[0].toUpperCase())
        const bi = order.indexOf(b[0].toUpperCase())
        if (ai !== -1 || bi !== -1) return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
        return a[0].localeCompare(b[0])
      })
  }, [spendByProvider])

  // Colors per provider to match chart theme
  const colorMap = {
    AWS: '#f59e0b',    // amber
    GCP: '#10b981',    // emerald
    AZURE: '#3b82f6',  // blue
  }

  return (
    <section className="card section">
      <h2 className="heading-zero">Total Spend Insights</h2>
      <div className="summary-grid">
        <div className="summary-card" style={{ ['--summary-accent']: 'var(--ss-accent)' }}>
          <div className="summary-label">Total Spend</div>
          <div className="summary-value">${computed.total.toFixed(2)}</div>
        </div>
        {providerEntries.map(([name, val]) => {
          const clr = colorMap[String(name).toUpperCase()] || 'var(--ss-accent)'
          return (
            <div key={name} className="summary-card" style={{ ['--summary-accent']: clr }}>
              <div className="summary-label">{name} Spend</div>
              <div className="summary-value">${val.toFixed(2)}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
