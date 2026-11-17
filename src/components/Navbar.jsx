import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useWatchlist } from '../context/WatchlistContext.jsx'
import './Navbar.css'

export default function Navbar() {
  const { watchlist } = useWatchlist()

  const linkClass = ({ isActive }) =>
    `navbar__link ${isActive ? 'is-active' : ''}`

  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand">
        Movie App
      </Link>

      <nav className="navbar__links" aria-label="Main navigation">
        <NavLink to="/" end className={linkClass}>
          Movies
        </NavLink>
        <NavLink to="/tv" className={linkClass}>
          TV Shows
        </NavLink>
        <NavLink to="/ai-assistant" className={linkClass}>
          AI Assistant
        </NavLink>
        <NavLink
          to="/watchlist"
          className={({ isActive }) =>
            `navbar__watchlist ${isActive ? 'is-active' : ''}`
          }
        >
          <span className="navbar__heart" aria-hidden="true">♥</span>
          <span>watchlist</span>
          <span className="navbar__badge">{watchlist.length}</span>
        </NavLink>
      </nav>
    </header>
  )
}
