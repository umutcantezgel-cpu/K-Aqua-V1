# Agent 17 — Geo: Märkte-Hub (360°-Welt)

## Input
`prototype/kaqua-geo.jsx` (`K_GEO`, `K_REGIONS`, `MarketsView`, Haversine, flyTo-Verdrahtung),
`components/globe/Globe.tsx` (Agent 10), `docs/DATA_CONTRACTS.md`. Texte aus i18n `geo`, `regions`.

## Aufgabe
1. **`lib/data/geo.ts`**: `GEO_MARKETS` (27), `REGIONS` (4), `WALDSOLMS`, `haversineKm`, `nearestMarkets`
   — typisiert nach DATA_CONTRACTS. Fließtexte bleiben für `de` hier; `en/ar` aus `geoContent.<slug>` (i18n).
2. **`/maerkte`** (`components/sections/MarketsHub.tsx`, Client): großer 360°-Globus (nicht-auto-rotierend,
   frei dreh- und kippbar mit Trägheit) + **Regionsfilter-Chips** (mit Zählern) + Marktliste.
   - Listen-**Hover** → `flyTo(lon,lat)` zentriert die Stadt + Canvas-Label + Tooltip-Card
     (Stadt, Land, Entfernung via `haversineKm` ab Waldsolms).
   - Listen-/Marker-**Klick** → `/maerkte/<slug>`.
3. Globus via `dynamic(ssr:false)`; reduced-motion → Standbild + reine Liste bleibt voll nutzbar.

## Definition of Done
- 27 Märkte gelistet; Filter zählt korrekt; Hover fliegt punktgenau (Länge + Breite); Klick navigiert.
- Tastatur: Liste vollständig bedienbar ohne Globus; in de/en/ar; `/ar` gespiegelt. `pnpm typecheck` grün.
