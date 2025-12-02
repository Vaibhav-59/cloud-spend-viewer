import React from 'react'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__inner">
        <div className="site-footer__brand">K&Co. Cloud Spend Viewer</div>
        <div className="site-footer__meta">© {year} All rights reserved.</div>
      </div>
    </footer>
  )
}
