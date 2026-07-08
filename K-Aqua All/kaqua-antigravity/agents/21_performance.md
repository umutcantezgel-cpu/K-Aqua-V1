# Agent 21 — Performance

## Aufgabe
- **Globus**: `dynamic(ssr:false)` + Intersection-basiertes Lazy-Mount; TopoJSON aus `public/data/`
  (kein externer Fetch). Sicherstellen, dass der Globus **nie** das LCP-Element ist.
- **Fonts**: `next/font/local` mit `display: 'swap'`, nur benötigte Achsen; Preload des Hero-Textfonts.
- **Bilder**: noch keine echten — `MediaSlot` rendert ohne Layout-Shift (festes `aspect-ratio`).
  Sobald Assets kommen: `next/image`, `sizes`, AVIF/WebP, LCP-Bild `priority`.
- **JS**: `optimizePackageImports` (lucide, motion) ist gesetzt; Tools (Finder/CO₂/Quiz/Wizard) als
  Client-Inseln, Seiten ansonsten Server Components. Keine unnötigen `'use client'`.
- **CLS/INP**: Reveal-Transforms ohne Layout-Shift; Scroll-Choreografie rAF-gedrosselt.

## Definition of Done
- Lighthouse **Performance ≥ 95** auf Home, `/maerkte`, einer Geo-Seite (Mobile-Profil).
- LCP < 2.0s lokal; CLS < 0.1; keine Render-blockierenden Drittressourcen.
- Report als `docs/lighthouse.md` ablegen.
