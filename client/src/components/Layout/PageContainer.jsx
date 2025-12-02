import React, { useState } from 'react'
import SpendFilters from '../Filters/SpendFilters.jsx'
import SpendSummary from '../Summary/SpendSummary.jsx'
import SpendTable from '../Table/SpendTable.jsx'
import SpendDetailModal from '../Details/SpendDetailModal.jsx'
import SpendByProviderChart from '../Charts/SpendByProviderChart.jsx'
import './PageContainer.css'

/**
 * PageContainer
 * Encapsulates the full dashboard layout: header, filters, summary, data table, and chart.
 * Props:
 * - title, subtitle: strings
 * - filters: current filter object
 * - onChangeFilters: function(nextFilters)
 * - loading, error, count: UI states from API
 * - items: array of spend records
 * - totalSpend: number
 * - spendByProvider: map { provider: amount }
 */
export default function PageContainer({
  title,
  subtitle,
  filters,
  onChangeFilters,
  loading,
  error,
  count,
  items,
  totalSpend,
  spendByProvider,
}) {
  const [detailOpen, setDetailOpen] = useState(false)
  const [detailItem, setDetailItem] = useState(null)

  function handleRowClick(row) {
    setDetailItem(row)
    setDetailOpen(true)
  }
  function handleClose() {
    setDetailOpen(false)
  }

  return (
    <div className="page-container">
      {(title || subtitle) && (
        <header className="header">
          {title && <h1 className="title-zero">{title}</h1>}
          {subtitle && <p className="subtitle">{subtitle}</p>}
        </header>
      )}

      {/* Filters */}
      <SpendFilters filters={filters} onChange={onChangeFilters} />

      {/* Summary */}
      <div id="summary">
        <SpendSummary totalSpend={totalSpend} spendByProvider={spendByProvider} />
      </div>

      {/* Data table */}
      <section id="table" className="card section">
        <h2 className="heading-zero">Cloud Spend Table</h2>
        {loading && <p>Loading data…</p>}
        {!loading && error && <p className="error">{error}</p>}
        {!loading && !error && Number(count) === 0 && <p>No data found for this filter.</p>}

        {!loading && !error && Number(count) > 0 && (
          <SpendTable
            items={items}
            onRowClick={handleRowClick}
          />
        )}
      </section>

      {/* Chart */}
      <section id="chart" className="card section">
        <h2 className="heading-zero">Cost Allocation Chart</h2>
        <SpendByProviderChart spendByProvider={spendByProvider} />
      </section>

      {/* Detail modal */}
      <SpendDetailModal open={detailOpen} item={detailItem} onClose={handleClose} />
    </div>
  )
}
