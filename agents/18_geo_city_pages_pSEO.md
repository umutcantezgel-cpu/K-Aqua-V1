# Agent 18 — Geo: Stadt-Landingpages (Programmatic SEO)

## Input
`prototype/kaqua-geo.jsx` (`GeoCityView`), `lib/data/geo.ts` (Agent 17), `docs/ROUTE_MAP.md`
(Geo-Slugs). Texte aus i18n `geo` + `geoContent.<slug>`.

## Aufgabe — `app/[locale]/maerkte/[slug]/page.tsx`
1. **`generateStaticParams`**: kartesisches Produkt `routing.locales × GEO_MARKETS.slug`
   (freigeschaltet: 3 × 27 = 81; voll: 12 × 27 = 324). Unbekannter Slug → `notFound()`.
2. Seiteninhalt (`components/sections/GeoCity.tsx`):
   - Hero mit **Mini-Globus** (`flyTo` auf die Stadt, Marker + Label).
   - **Regulatorik-Karte** (`regulator`, `norms`), **Wasserprofil** (`water`), **Fokus-Projekte** (`focus`),
     **Logistik-Hinweis** (`note`), Academy-Verweis.
   - **„In der Nähe"**: 3 nächste Märkte via `nearestMarkets(slug, 3)` — interne Verlinkung
     (Orphan-Prävention).
3. **`generateMetadata`** pro Geo-Seite: lokalisierter Title/Description, `alternates.languages`
   (hreflang für alle freigeschalteten Locales + `x-default`), `alternates.canonical`.

## Regeln
- `regulator`/`norms` sind recherchiert-plausibel → `// TODO(content): fachlich validieren` im Datenmodul.
- Geo-Fließtexte für `en`/`ar` aus `geoContent.<slug>`, nicht hartkodiert. `lat/lon/slug` sprachneutral.

## Definition of Done
- `pnpm build` generiert alle freigeschalteten Geo-Seiten statisch; `/ar/maerkte/dubai` rendert RTL
  mit korrektem Globus + hreflang-Alternates im `<head>`.
- `nearestMarkets` zeigt geografisch plausible Nachbarn. `pnpm lint`/`typecheck` grün.
