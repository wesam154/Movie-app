# Movie App — Person 1: UI Shared & Foundation

This is the foundation layer of the Movie App project: project setup, router,
design tokens, navbar, and the shared components every other page will be
built on top of (`MediaCard`, `MediaGrid`, `Pagination`, `Loading`,
`EmptyState`).

It intentionally does **not** include: any API calls, real watchlist logic,
or the AI assistant page — those belong to the other team members.

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
/src
├── App.jsx
├── router.jsx
├── /styles
│   ├── variables.css      Design tokens (colors, spacing) — do not change
│   └── global.css         Base resets + page container
├── /pages
│   ├── Home.jsx            /            (also previews the shared components)
│   ├── MovieDetails.jsx     /movies/:id  (empty — Person 2)
│   ├── TVShows.jsx          /tv          (empty — Person 3)
│   ├── TVDetails.jsx        /tv/:id      (empty — Person 3)
│   ├── SearchResults.jsx    /search      (empty — Person 3)
│   ├── Watchlist.jsx        /watchlist   (empty — Person 4)
│   ├── AIAssistant.jsx      /assistant-ai(empty — Person 5)
│   └── NotFound.jsx         *            (simple 404)
└── /components
    ├── Navbar.jsx / .css
    ├── MediaCard.jsx / .css
    ├── MediaGrid.jsx / .css
    ├── Pagination.jsx / .css
    ├── Loading.jsx / .css
    └── EmptyState.jsx / .css
```

## Design tokens (`src/styles/variables.css`)

| Token | Value | Use |
|---|---|---|
| `--color-primary` | `#FFE353` | Navbar, filled heart, buttons |
| `--color-bg` | `#F5F5F5` | Page background |
| `--color-card-bg` | `#FFFFFF` | Card background |
| `--color-text-primary` | `#363636` | Main text |
| `--color-text-secondary` | `#767676` | Secondary text (dates, etc.) |

These are fixed — nobody on the team should override them ad hoc.

## MediaCard props

```jsx
<MediaCard
  id={1}
  type="movie"        // "movie" | "tv"
  image="poster-url"
  title="Black Widow"
  date="Sep 25, 2017"
  rating={85}          // 0-100
  isFavorite={true}
  onToggleFavorite={(id) => { /* visual only for now */ }}
/>
```

`MediaCard` never fetches data itself and the heart button is visual-only —
Person 4 will connect it to the real watchlist state/API.

## Definition of done

- [x] Project runs with no errors (`npm run dev`)
- [x] All 7 routes work and navigate correctly, plus a 404 fallback
- [x] Navbar renders on every page
- [x] `MediaCard` renders a movie correctly (name, image, date, rating, heart)
- [x] `MediaGrid` renders a grid of multiple cards
- [x] `Pagination` changes the active page on click
- [x] Shared components tested with dummy data (see the Home page demo)

## Not in scope here (built by other teammates on top of this)

- No API calls to TMDB (Person 2 & 3)
- No real watchlist logic behind the heart button (Person 4)
- No AI Assistant chat page (Person 5)
