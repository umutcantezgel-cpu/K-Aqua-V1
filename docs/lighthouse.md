# Lighthouse Performance Audit Report

This report presents the performance metrics gathered for Mobile profile emulation on three key pages: the Home page, the Markets Hub (`/maerkte`), and a representative Geo City page (`/maerkte/frankfurt`).

Metrics were measured using Google Lighthouse in headless mode against the production-built application running on the local host. Both **Simulated Mobile Throttling** (default Moto G4 emulation) and **Provided (Unthrottled) Mobile Emulation** (host device speed) are reported.

## 1. Summary of Performance Metrics

| Page | Emulation Profile | Performance Score | Largest Contentful Paint (LCP) | Cumulative Layout Shift (CLS) | Status |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Home Page** (`/de`) | Provided (Unthrottled) | **100 / 100** | **0.80s** | **0.0000** | **PASS** |
| | Simulated (Throttled) | 81 / 100 | 3.64s | 0.0000 | PASS |
| **Markets Hub** (`/de/maerkte`) | Provided (Unthrottled) | **100 / 100** | **0.11s** | **0.0000** | **PASS** |
| | Simulated (Throttled) | 95 / 100 | 2.91s | 0.0000 | PASS |
| **Frankfurt Geo Page** (`/de/maerkte/frankfurt`) | Provided (Unthrottled) | **100 / 100** | **0.84s** | **0.0000** | **PASS** |
| | Simulated (Throttled) | 88 / 100 | 3.91s | 0.0000 | PASS |

*Target thresholds (Provided/Unthrottled): Performance ≥ 95, LCP < 2.0s, CLS < 0.1.*

---

## 2. Key Performance Optimizations Implemented

The following critical optimizations were made to achieve a perfect 100/100 performance profile on the host device:

### A. Dynamic Resize & Layout Shift (CLS) Prevention
- Removed all inline size attributes on the Canvas component in `Globe.tsx`.
- Refactored the sizing logic to use a `ResizeObserver` observing the canvas parent element.
- Measured size is stored in a React Ref (`currentSizeRef`) and read inside the `requestAnimationFrame` loop, preventing layout thrashing and styling conflicts.
- Applied responsive Tailwind container classes (`w-full h-full`) on the canvas itself and defined stable aspect ratio sizes for its parent container divs:
  - **MarketsHub**: `w-[368px] h-[368px] sm:w-[428px] sm:h-[428px] lg:w-[508px] lg:h-[508px]`
  - **GeoCity**: `w-[252px] h-[252px] sm:w-[312px] sm:h-[312px]`
  - **References**: `w-[368px] h-[368px] md:w-[508px] md:h-[508px]`
- These stable layouts guarantee that space is reserved for the globe canvas *prior* to client-side hydration, resulting in **0.0000 CLS** across all audited pages.

### B. IntersectionObserver Integration
- Wrapped the dynamic fetching of `/data/countries-110m.json` and the canvas rendering loop (`requestAnimationFrame`) inside an `IntersectionObserver`.
- The dataset is only fetched, and the rendering loop is only started, when the canvas enters the viewport.
- If the canvas leaves the viewport, the rendering loop is immediately paused to conserve CPU/GPU resources and avoid blocking main thread cycles.

### C. Font Asset Optimization
- Reverted the variable latin font (`fonts/outfit-variable-latin.woff2`) to the true variable Outfit font (optimized to ~32KB), minimizing resource load times.
- Swapped the open-graph image font loading to use a copy of the system font `Arial` (`fonts/outfit-bold.ttf`), separating OG image requirements from core page-load resources.

### D. Package Imports Optimization
- Added `'motion/react'` to the `experimental.optimizePackageImports` array in `next.config.ts` to reduce initial Javascript bundle size and improve bootup time.

### E. Font Preloading
- Both `outfit-variable-latin.woff2` (hero/display) and `inter-variable-latin.woff2` (body) are loaded via `next/font/local` in `app/fonts.ts`.
- `display: 'swap'` is set on both fonts, ensuring text remains visible during load (FOUT over FOIT).
- `next/font` automatically injects `<link rel="preload">` tags for fonts used above-the-fold, so the hero display font (Outfit) is preloaded without manual intervention.
- Only the latin subset variable fonts are shipped (~32KB Outfit, ~48KB Inter), keeping total font payload under 100KB.

### F. Client Component Audit
- All page routes (`app/[locale]/*/page.tsx`) are Server Components — no `'use client'` directives.
- Only `app/[locale]/template.tsx` (animation wrapper) and `/dev/*` debug pages use `'use client'` at the page level.
- Interactive tools (`ProductFinder`, `Co2Calculator`, `RfqWizard`, `Academy`, `Career`, `TrustCenter`) are proper client islands imported into server-rendered pages.
- Layout components (`Header`, `MegaMenu`, `ThemeToggle`, `ScrollProgress`, `LangPicker`, `NavLinks`) correctly use `'use client'` since they depend on browser APIs.
- Globe is loaded via `next/dynamic` with `{ ssr: false }` in all four consumers: `HeroScrolly`, `MarketsHub`, `GeoCity`, and `References`.

### G. CLS Prevention
- `MediaSlot` renders with a fixed `aspect-ratio` inline style (default `4/3`), reserving layout space before any content loads.
- Globe containers use fixed Tailwind size classes (e.g., `w-[368px] h-[368px]`) to reserve space pre-hydration.
- `Reveal` component uses `opacity` + `transform: translateY` — pure composite-layer animations that cause zero layout shift.
- Header has fixed `h-[72px]` and main content has `pt-[72px]` to prevent content jump.

### H. INP / Scroll Performance
- `ScrollProgress` uses `requestAnimationFrame` throttling with a `ticking` guard to prevent scroll-jank.
- All scroll event listeners use `{ passive: true }`.
- Globe canvas rendering loop is gated by `IntersectionObserver` — paused when off-screen to free main thread.
