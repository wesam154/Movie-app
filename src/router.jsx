import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'

import Home from './pages/Home.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import TVShows from './pages/TVShows.jsx'
import TVDetails from './pages/TVDetails.jsx'
import SearchResults from './pages/SearchResults.jsx'
import Watchlist from './pages/Watchlist.jsx'
import AIAssistant from './pages/AIAssistant.jsx'
import NotFound from './pages/NotFound.jsx'

// All 7 routes required by the project spec, plus a simple 404 fallback.
// Every page below (except Home's demo section) is intentionally left
// empty/minimal — teammates 2-5 will build the real page content on top
// of this foundation.
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/tv" element={<TVShows />} />
          <Route path="/tv/:id" element={<TVDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
