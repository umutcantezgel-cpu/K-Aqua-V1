# Agent 24 — Content-Layer / CMS (Phase 2, optional)

> Erst starten, wenn die statische Site steht und freigegeben ist. Bis dahin sind alle Daten
> typisierte TS-Module in `lib/data/` — das ist bewusst und völlig ausreichend für Launch.

## Aufgabe
1. **Abstraktion**: Datenzugriff hinter Repository-Funktionen kapseln (`lib/data/geo.ts` exportiert
   `getMarkets()/getMarket(slug)`; `products.ts` analog), damit die Quelle (TS-Modul ↔ CMS) tauschbar ist.
2. **CMS-Auswahl** (Vorschlag: Sanity/Storyblok/Payload — i18n-fähig): Schemata für
   GeoMarket, ProductRow, NewsPost, Referenzprojekt, Zertifikat (mit PDF-Upload), Media.
3. **Echte Inhalte einpflegen** — die `// TODO(content)`-Liste aus `docs/DATA_CONTRACTS.md` abarbeiten:
   CO₂/EPD-Faktoren, Zertifikat-IDs + PDFs, Referenzprojekte + Fotos, Normen je Markt validieren,
   Benefits-Beträge mit Lohnbuchhaltung.
4. **Bilder**: `MediaSlot` → `next/image` mit CMS-Assets (remotePatterns in `next.config.ts`).
5. **ISR**: `revalidate` pro Datenquelle; Webhook → On-Demand-Revalidation bei CMS-Publish.

## Definition of Done
- Eine Geo-Seite und ein News-Post werden aus dem CMS gerendert; Bildslots zeigen echte Assets;
  Publish im CMS aktualisiert die Seite via Revalidation. Statischer Fallback bleibt funktionsfähig.
