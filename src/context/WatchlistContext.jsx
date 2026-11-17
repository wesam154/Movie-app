import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getWatchlist, saveWatchlist } from '../utils/storage.js'

const WatchlistContext = createContext(null)

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(getWatchlist)

  useEffect(() => {
    saveWatchlist(watchlist)
  }, [watchlist])

  const toggleItem = (item) => {
    if (!item?.id || !item?.type) return

    setWatchlist((current) => {
      const exists = current.some(
        (savedItem) => savedItem.id === item.id && savedItem.type === item.type
      )

      if (exists) {
        return current.filter(
          (savedItem) => !(savedItem.id === item.id && savedItem.type === item.type)
        )
      }

      return [...current, item]
    })
  }

  const isInWatchlist = (id, type) =>
    watchlist.some((item) => item.id === id && item.type === type)

  const value = useMemo(
    () => ({ watchlist, toggleItem, isInWatchlist }),
    [watchlist]
  )

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>
}

export function useWatchlist() {
  const context = useContext(WatchlistContext)

  if (!context) {
    throw new Error('useWatchlist must be used inside WatchlistProvider')
  }

  return context
}
