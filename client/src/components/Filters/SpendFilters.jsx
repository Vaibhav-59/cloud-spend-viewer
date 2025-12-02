import React, { useEffect, useState } from 'react'
import './SpendFilters.css'

/**
 * SpendFilters
 * - Manages local filter UI state
 * - Calls onChange(updatedFilters) whenever any control changes
 * Props:
 * - filters: { provider, team, env, month }
 * - onChange: function(updatedFilters)
 */
export default function SpendFilters({ filters, onChange }) {
  const [local, setLocal] = useState({ provider: '', team: '', env: '', month: '' })

  const PROVIDERS = ['AWS', 'GCP', 'AZURE']
  const TEAMS = ['Core', 'Web', 'Data']
  const ENVS = ['prod', 'staging', 'dev']

  // Initialize/Sync local state when parent filters change
  useEffect(() => {
    setLocal({
      provider: filters?.provider || '',
      team: filters?.team || '',
      env: filters?.env || '',
      month: filters?.month || '',
    })
  }, [filters])

  function update(partial) {
    const next = { ...local, ...partial }
    setLocal(next)
    onChange?.(next)
  }

  return (
    <div className="spend-filters card section">
      <h2 className="heading-zero">Filters</h2>
      <div className="spend-filters__grid">
        <label className="spend-filters__field">
          <div className="spend-filters__label">Cloud Provider</div>
          <input
            type="text"
            list="provider-options"
            placeholder="Type to search… (e.g., AWS)"
            value={local.provider}
            onChange={(e) => update({ provider: e.target.value })}
          />
          <datalist id="provider-options">
            <option value="" />
            {PROVIDERS.map((p) => (
              <option key={p} value={p} />
            ))}
          </datalist>
        </label>

        <label className="spend-filters__field">
          <div className="spend-filters__label">Team</div>
          <input
            type="text"
            list="team-options"
            placeholder="Type to search… (e.g., Web)"
            value={local.team}
            onChange={(e) => update({ team: e.target.value })}
          />
          <datalist id="team-options">
            <option value="" />
            {TEAMS.map((t) => (
              <option key={t} value={t} />
            ))}
          </datalist>
        </label>

        <label className="spend-filters__field">
          <div className="spend-filters__label">Environment</div>
          <input
            type="text"
            list="env-options"
            placeholder="Type to search… (e.g., prod)"
            value={local.env}
            onChange={(e) => update({ env: e.target.value })}
          />
          <datalist id="env-options">
            <option value="" />
            {ENVS.map((e) => (
              <option key={e} value={e} />
            ))}
          </datalist>
        </label>

        <label className="spend-filters__field">
          <div className="spend-filters__label">Month</div>
          <input type="month" value={local.month} onChange={(e) => update({ month: e.target.value })} />
        </label>
      </div>
    </div>
  )
}
