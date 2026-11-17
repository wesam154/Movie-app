const STORAGE_KEY = 'movie-app-watchlist'

export function getWatchlist() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return []

    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveWatchlist(watchlist) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist))
  } catch {
    // Ignore storage errors.
  }
}
