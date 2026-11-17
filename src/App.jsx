import React from 'react'
import AppRouter from './router.jsx'
import { WatchlistProvider } from './context/WatchlistContext.jsx'

export default function App() {
  return (
    <WatchlistProvider>
      <AppRouter />
    </WatchlistProvider>
  )
}
