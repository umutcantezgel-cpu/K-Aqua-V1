# Agent 16 — Referenzen (Globus)

## Input
`prototype/kaqua-views-5.jsx` (`GlobeRefView`), `components/globe/Globe.tsx` (Agent 10).
Texte aus i18n `refs`.

## Aufgabe — `/referenzen` (`components/sections/References.tsx`, Client)
- Interaktiver Globus mit ~7 Projekt-Markern (Beispielprojekte — `// TODO(content): echte Referenzen`).
- Marker-Hover/-Klick → Detail-Card (Stadt + Kurzbeschreibung). Listen-Chips synchron zum Globus.
- Hinweistext, dass echte Projektnamen/Fotos/Kennzahlen redaktionell ergänzt werden.
- Globus via `dynamic(ssr:false)`; `prefers-reduced-motion` → Standbild.

## Definition of Done
- Globus rendert (nicht leer); Marker-Auswahl aktualisiert die Detail-Card; in de/en/ar; `/ar` gespiegelt.
- `pnpm lint`/`typecheck` grün.
