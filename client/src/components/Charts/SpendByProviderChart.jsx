import React, { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import './SpendByProviderChart.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

/**
 * SpendByProviderChart
 * Bar chart for spend grouped by cloud provider.
 * Props:
 * - spendByProvider: { [provider: string]: number }
 */
export default function SpendByProviderChart({ spendByProvider = {} }) {
  const { labels, values } = useMemo(() => {
    const entries = Object.entries(spendByProvider)
    // Keep a stable order AWS, GCP, AZURE, then others alphabetically
    const order = ['AWS', 'GCP', 'AZURE']
    const sorted = entries.sort((a, b) => {
      const ai = order.indexOf(String(a[0]).toUpperCase())
      const bi = order.indexOf(String(b[0]).toUpperCase())
      if (ai !== -1 || bi !== -1) {
        return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
      }
      return String(a[0]).localeCompare(String(b[0]))
    })
    return {
      labels: sorted.map(([k]) => k),
      values: sorted.map(([, v]) => Number(v || 0)),
    }
  }, [spendByProvider])

  // Themed colors per provider
  const colorMap = {
    AWS: '#f59e0b',    // amber
    GCP: '#10b981',    // emerald
    AZURE: '#3b82f6',  // blue
  }
  const fallback = '#719ceb' // app accent
  const barColors = labels.map((label) => colorMap[String(label).toUpperCase()] || fallback)

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Spend (USD)'
        , data: values,
        backgroundColor: barColors,
        borderColor: barColors,
        borderWidth: 1,
        hoverBackgroundColor: barColors.map(c => c),
        borderRadius: 6,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'left',
        align: 'center',
        labels: {
          color: '#0f172a',
          font: { weight: '600' },
          boxWidth: 14,
          boxHeight: 14,
          usePointStyle: true,
          pointStyle: 'rectRounded',
          // Generate a label entry for each provider (category) with its color
          generateLabels: (chart) => {
            // Use current labels array and barColors from closure
            return labels.map((lbl, i) => ({
              text: String(lbl),
              fillStyle: barColors[i],
              strokeStyle: barColors[i],
              datasetIndex: 0,
              index: i,
              hidden: false,
            }))
          },
        },
        onClick: () => {}, // disable toggling since we use a single dataset
      },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const val = Number(ctx.parsed.y || 0).toFixed(2)
            return `$${val}`
          },
        },
      },
    },
    layout: { padding: { left: 4, right: 4, top: 0, bottom: 0 } },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(148,163,184,0.25)' },
        ticks: {
          color: '#475569',
          callback: (value) => `$${Number(value).toLocaleString()}`,
        },
      },
      x: {
        grid: { display: false },
        ticks: { maxRotation: 0, minRotation: 0, color: '#475569' },
      },
    },
    maintainAspectRatio: false,
  }

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3 className="chart-title">Spend by Provider</h3>
      </div>
      <div className="chart-body">
        {labels.length ? (
          <Bar data={data} options={options} />
        ) : (
          <p className="chart-empty">No data for chart.</p>
        )}
      </div>
    </div>
  )
}
