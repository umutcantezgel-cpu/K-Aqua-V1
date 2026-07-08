# Agent 19 — SEO: Metadata & strukturierte Daten

## Input
Alle Routen (Agents 11–18), `docs/ROUTE_MAP.md`, i18n.

## Aufgabe
1. **`generateMetadata`** pro Route: lokalisierter Title (Muster `… · K-Aqua`), Description,
   OpenGraph + Twitter, `alternates.languages` (hreflang je freigeschaltete Locale + `x-default`),
   `alternates.canonical`. Zentrale Helfer in `lib/seo/metadata.ts`.
2. **JSON-LD** (`components/seo/JsonLd.tsx`):
   - Root: `Organization` (KWT GmbH, Marke K-Aqua, Auweg 3, 35647 Waldsolms-Brandoberndorf,
     +49 6085 9868-410, `info@k-aqua.de`, `sameAs` falls vorhanden).
   - Produkte: `Product`/`ItemList`. Geo-Seiten: `Product` + `FAQPage` (aus Regulatorik/Wasser-Q&A).
3. **Slug-Lokalisierung (Phase 2, optional):** `next-intl` `pathnames`-Map vorbereiten (deutsche
   Slugs bleiben Default) — nur Gerüst + Doku, nicht zwingend aktivieren.

## Definition of Done
- Jede Route liefert vollständiges `<head>` (Title/Description/OG/hreflang/canonical).
- Rich-Results-Test besteht für Organization + eine Geo-FAQ. `pnpm typecheck` grün.
