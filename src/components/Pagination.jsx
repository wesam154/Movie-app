import React from 'react'
import './Pagination.css'

// Builds a compact page list like: 1 ... 4 5 6 ... 20
function buildPageList(current, total) {
  const pages = []
  const windowSize = 1

  pages.push(1)
  if (current - windowSize > 2) pages.push('...')

  for (
    let p = Math.max(2, current - windowSize);
    p <= Math.min(total - 1, current + windowSize);
    p++
  ) {
    pages.push(p)
  }

  if (current + windowSize < total - 1) pages.push('...')
  if (total > 1) pages.push(total)

  return pages
}

export default function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = buildPageList(currentPage, totalPages)

  const goTo = (page) => {
    if (page === currentPage || page < 1 || page > totalPages) return
    onPageChange && onPageChange(page)
  }

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="pagination__arrow"
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        ‹
      </button>

      {pages.map((page, index) =>
        page === '...' ? (
          <span key={`dots-${index}`} className="pagination__dots">
            …
          </span>
        ) : (
          <button
            type="button"
            key={page}
            className={`pagination__page ${page === currentPage ? 'is-active' : ''}`}
            onClick={() => goTo(page)}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        className="pagination__arrow"
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  )
}
