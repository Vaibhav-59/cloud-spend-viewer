import React from 'react'

export default function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <div className="navbar__inner">
        {/* Brand */}
        <a className="navbar__brand" href="#top" aria-label="Cloud Spend Viewer Home">
          <span style={{ marginLeft: 10 }}>K&Co.</span>
        </a>

        {/* Mobile menu checkbox toggle (CSS-only) */}
        <input className="navbar__checkbox" id="nav-toggle" type="checkbox" aria-hidden="true" />
        <label className="navbar__toggle" htmlFor="nav-toggle" aria-label="Toggle navigation" aria-controls="primary-menu" aria-expanded="false">
          <span />
          <span />
          <span />
        </label>

        {/* Menu */}
        <ul id="primary-menu" className="navbar__menu" role="menubar" aria-label="Primary">
          <li role="none">
            <a role="menuitem" href="#summary" className="navbar__link">Summary</a>
          </li>
          <li role="none">
            <a role="menuitem" href="#table" className="navbar__link">Data</a>
          </li>
          <li role="none">
            <a role="menuitem" href="#chart" className="navbar__link">Chart</a>
          </li>
        </ul>

        <div className="navbar__spacer" />
      </div>
    </nav>
  )
}

