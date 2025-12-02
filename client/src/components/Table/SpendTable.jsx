import React, { useMemo, useState } from 'react'
import './SpendTable.css'

/**
 * SpendTable
 * - Displays spend rows with sortable headers (Date, Cost)
 * - Zebra rows, responsive, scrollable on mobile
 * Props:
 * - items: Array<{ date, cloud_provider, service, team, env, cost_usd }>
 * - onRowClick?: function(row)
 */
export default function SpendTable({ items = [], onRowClick }) {
  const [sort, setSort] = useState({ key: 'date', dir: 'asc' }) // key: 'date' | 'cost', dir: 'asc' | 'desc'
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  function toggleSort(key) {
    setSort((prev) => {
      const dir = prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc'
      return { key, dir }
    })
  }

  const sorted = useMemo(() => {
    const arr = [...items]
    arr.sort((a, b) => {
      if (sort.key === 'date') {
        const da = new Date(a?.date || 0).getTime()
        const db = new Date(b?.date || 0).getTime()
        return sort.dir === 'asc' ? da - db : db - da
      }
      if (sort.key === 'cost') {
        const ca = Number(a?.cost_usd) || 0
        const cb = Number(b?.cost_usd) || 0
        return sort.dir === 'asc' ? ca - cb : cb - ca
      }
      return 0
    })
    return arr
  }, [items, sort])

  // Reset to first page when dataset or pageSize changes
  useMemo(() => { setPage(1) }, [items, pageSize])

  // Pagination slice
  const total = sorted.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, totalPages)
  const startIdx = (currentPage - 1) * pageSize
  const endIdx = Math.min(startIdx + pageSize, total)
  const pageRows = sorted.slice(startIdx, endIdx)

  function goto(p) {
    const clamped = Math.max(1, Math.min(totalPages, p))
    setPage(clamped)
  }

  function SortIndicator({ col }) {
    const isActive = sort.key === col
    const symbol = isActive ? (sort.dir === 'asc' ? '▲' : '▼') : '▲▼'
    const cls = `sort-indicator ${isActive ? 'active' : 'inactive'}`
    return <span className={cls}>{symbol}</span>
  }

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th className="th-sort" onClick={() => toggleSort('date')}>
              Date <SortIndicator col="date" />
            </th>
            <th>Provider</th>
            <th>Service</th>
            <th>Team</th>
            <th>Env</th>
            <th className="th-right th-sort" onClick={() => toggleSort('cost')}>
              Cost (USD) <SortIndicator col="cost" />
            </th>
          </tr>
        </thead>
        <tbody>
          {pageRows.map((it, idx) => (
            <tr key={idx} className="row" onClick={() => onRowClick && onRowClick(it)}>
              <td>{it.date}</td>
              <td>{it.cloud_provider}</td>
              <td>{it.service}</td>
              <td>{it.team}</td>
              <td>{it.env}</td>
              <td className="td-right">${Number(it.cost_usd).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination controls */}
      <div className="table-pagination">
        <div className="table-pagination__left">
          <label>
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value) || 10)}
            >
              {[5, 10, 20, 50].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
          <span className="table-pagination__range">{total === 0 ? '0' : `${startIdx + 1}-${endIdx}`} of {total}</span>
        </div>
        <div className="table-pagination__right">
          <button className="tp-btn" disabled={currentPage <= 1} onClick={() => goto(currentPage - 1)}>Prev</button>
          {/* Render up to 5 page numbers around current */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
            .map((p, i, arr) => (
              <React.Fragment key={p}>
                {i > 0 && p - arr[i - 1] > 1 && <span className="tp-ellipsis">…</span>}
                <button
                  className={`tp-btn ${p === currentPage ? 'active' : ''}`}
                  onClick={() => goto(p)}
                >{p}</button>
              </React.Fragment>
            ))}
          <button className="tp-btn" disabled={currentPage >= totalPages} onClick={() => goto(currentPage + 1)}>Next</button>
        </div>
      </div>
    </div>
  )
}
