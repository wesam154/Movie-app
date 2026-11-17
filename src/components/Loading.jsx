import React from 'react'
import './Loading.css'

export default function Loading({ label = 'Loading...' }) {
  return (
    <div className="loading" role="status" aria-live="polite">
      <span className="loading__spinner" />
      <span className="loading__label">{label}</span>
    </div>
  )
}
