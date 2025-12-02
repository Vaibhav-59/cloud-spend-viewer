import React, { useEffect } from 'react'
import './SpendDetailModal.css'

export default function SpendDetailModal({ open, item, onClose }) {
  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  const data = item || {}
  const desc = `This is ${data.cloud_provider || ''} ${data.service || ''} spend from the ${data.team || ''} team in the ${data.env || ''} environment.`

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-header">
          <h3 className="modal-title">Spend Details</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="modal-body">
          <div className="modal-row"><span className="k">Date</span><span className="v">{data.date}</span></div>
          <div className="modal-row"><span className="k">Cloud</span><span className="v">{data.cloud_provider}</span></div>
          <div className="modal-row"><span className="k">Service</span><span className="v">{data.service}</span></div>
          <div className="modal-row"><span className="k">Team</span><span className="v">{data.team}</span></div>
          <div className="modal-row"><span className="k">Env</span><span className="v">{data.env}</span></div>
          <div className="modal-row"><span className="k">Cost (USD)</span><span className="v">${Number(data.cost_usd || 0).toFixed(2)}</span></div>

          <p className="modal-desc">{desc}</p>
        </div>
        <div className="modal-footer">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
