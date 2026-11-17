import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404 — Page Not Found</h1>
      <p className="page-note" style={{ margin: '0 auto 16px' }}>
        The page you're looking for doesn't exist.
      </p>
      <Link to="/">Back to home</Link>
    </div>
  )
}
