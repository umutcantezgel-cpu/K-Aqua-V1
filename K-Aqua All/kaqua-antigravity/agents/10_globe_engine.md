# Agent 10 — Globus-Engine

## Input
`prototype/kaqua-loader.js` (framework-freier Canvas-Code — **Logik 1:1 übernehmen, nicht neu erfinden**),
`agents/RULES.md` (§9 Globus).

## Aufgabe
- **`components/globe/Globe.tsx`** (Client Component, `'use client'`):
  - Orthografische Projektion; Ländergrenzen aus **world-atlas `countries-110m`** TopoJSON.
  - **TopoJSON zur Build-Zeit vendoren:** `scripts/vendor-topojson.mjs` lädt die Datei einmalig nach
    `public/data/countries-110m.json`. Zur Laufzeit nur `fetch('/data/...')` (kein externes CDN).
  - **360°-Drag:** Yaw unbegrenzt, Pitch ±83°. **Trägheit** nach `pointerup` (Decay ~0.95/Frame).
  - **`flyTo(lon, lat)`**: kürzester Pfad, `easeInOutCubic`, ~900ms; zentriert Länge **und** Breite.
  - **Marker**: Punkt + Puls-Ring; aktiver Marker bekommt Canvas-Label. Callbacks `onMarkerClick`, `onDrag`.
  - `devicePixelRatio`-aware; sauberes Cleanup (`stop()`); `prefers-reduced-motion` → statisches Bild, kein Auto-Spin.
  - Props: `size`, `markers`, `interactive`, `speed` (Auto-Rotation), `whirl` (Komet-Trails für Loader).
- **`components/globe/GlobeLoader.tsx`**: 200px-Whirl-Variante als Fullscreen-Splash (Suspense-Fallback),
  min ~1.4s, max ~8s; monochrom, off-white Hintergrund (wie Prototyp-Loader).
- Per `next/dynamic` mit `ssr: false` laden (Canvas braucht kein SSR; verbessert LCP).

## Definition of Done
- `/de/dev/globe`: 520px-Globus, Drag wirft mit Schwung aus, `flyTo` zentriert z. B. Sydney↔London korrekt.
- Kein Runtime-Fetch zu fremden Domains; reduced-motion zeigt Standbild. `pnpm typecheck` grün.
