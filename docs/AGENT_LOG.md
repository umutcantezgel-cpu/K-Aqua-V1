# Agent Log

## Architektur-Check: Prototyp-Datei → Ziel-Artefakt(e)

| Prototyp-Datei / View-Quelle | Ziel-Artefakt(e) (Next.js Route) |
|---|---|
| `HomeView` (`kaqua-views-1`) | `app/[locale]/page.tsx` |
| `ProductsView` (`views-1`) | `app/[locale]/produkte/page.tsx` |
| `FinderView` (`views-3`) | `app/[locale]/produkte/finder/page.tsx` |
| `SolutionsView` (`views-1`) | `app/[locale]/loesungen/page.tsx` |
| `CO2View` (`views-3`) | `app/[locale]/co2-rechner/page.tsx` |
| `AcademyView` (`views-4`) | `app/[locale]/academy/page.tsx` |
| `TrustView` (`views-4`) | `app/[locale]/trust-center/page.tsx` |
| `PartnerView` (`views-4`) | `app/[locale]/partnerschaft/page.tsx` |
| `ServiceView` (`views-2`) | `app/[locale]/service/page.tsx` |
| `MarketsView` (`kaqua-geo`) | `app/[locale]/maerkte/page.tsx` |
| `GeoCityView` (`kaqua-geo`) | `app/[locale]/maerkte/[slug]/page.tsx` |
| `GlobeRefView` (`views-5`) | `app/[locale]/referenzen/page.tsx` |
| `AboutView` (`views-2`) | `app/[locale]/unternehmen/page.tsx` |
| `CareerToolsView` (`views-5`) | `app/[locale]/karriere/page.tsx` |
| `RFQView` (`views-6`) | `app/[locale]/projektanfrage/page.tsx` |
| `NewsView` (`views-2`) | `app/[locale]/news/page.tsx` |
| `ContactView` (`views-2`) | `app/[locale]/kontakt/page.tsx` |
| `ImprintView` (`views-2`) | `app/[locale]/impressum/page.tsx` |
| `lib/data/geo.ts` | Geo-Daten (Regionen, Märkte, WALDSOLMS) |
| `lib/data/products.ts` | Produkt-Matrix (Finder) |

## Freigeschaltete Locales
- **Freigeschaltet:** `de` (default), `en`, `ar` (RTL)
- **Gesperrt:** `fr, es, it, pt, nl, pl, tr, ru, zh`
- **Sperrgrund:** Eine Sprache wird erst freigeschaltet, wenn ihre Schlüsselmenge zu 100 % übersetzt ist. Niemals gemischtsprachige Seiten ausliefern.

## Risiken & Platzhalter (`// TODO(content)`)
Folgende Daten sind bewusst als Platzhalter belassen und dürfen nicht durch die KI erfunden/ausgefüllt werden:
- **CO₂-Faktoren (Material-Vergleich):** Richtwerte (`// TODO(content): echte EPD/Ökobilanz`)
- **Zertifikatsnummern (ISO 9001/14001/50001):** Platzhalter (`// TODO(content): echte Zertifikat-IDs + PDF`)
- **Referenzprojekte (Globus-Marker):** Beispielprojekte (`// TODO(content): echte Referenzen + Fotos`)
- **Normen je Markt:** Recherchiert-plausibel (`// TODO(content): rechtlich/fachlich validieren`)
- **Benefits-Beträge (Karriere):** Typische Richtwerte (`// TODO(content): mit Lohnbuchhaltung abstimmen`)

## Checkliste: Arbeitspakete (Agent 01 … 26)

- [x] Agent 00: Erledigt am 14.06.2026 von Antigravity
- [x] Agent 01: Erledigt am 14.06.2026 von Scaffold and Toolchain Reviewer
- [x] Agent 02: Erledigt am 14.06.2026 von Design Tokens and Theme Toggle Reviewer
- [x] Agent 03: Erledigt am 14.06.2026 von UI Primitives Reviewer
- [x] Agent 04: Erledigt am 14.06.2026 von Icons and Motion Reviewer
- [x] Agent 05: Erledigt am 14.06.2026 von i18n Infrastructure Reviewer
- [x] Agent 06: Erledigt am 14.06.2026 von i18n Content Translation Reviewer
- [x] Agent 07: Erledigt am 14.06.2026 von App-Shell Reviewer
- [x] Agent 08: Erledigt am 14.06.2026 von MegaMenu and LangPicker Reviewer
- [x] Agent 09: Erledigt am 14.06.2026 von Geo-Core Reviewer
- [x] Agent 10: Erledigt am 14.06.2026 von Geo-City and References Reviewer
- [x] Agent 11: Erledigt am 14.06.2026
- [x] Agent 12: Erledigt am 14.06.2026
- [x] Agent 13: Erledigt am 14.06.2026 von Step 13 Worker
- [x] Agent 14: Erledigt am 14.06.2026
- [x] Agent 15: Erledigt am 14.06.2026
- [x] Agent 16: Erledigt am 14.06.2026
- [x] Agent 17: Erledigt am 14.06.2026
- [x] Agent 18: Erledigt am 14.06.2026
- [x] Agent 19: Erledigt am 14.06.2026
- [x] Agent 20: Erledigt am 14.06.2026
- [x] Agent 21: Erledigt am 14.06.2026 — Performance Optimization
- [x] Agent 22: Erledigt am 14.06.2026 — Accessibility Audit (WCAG AA)
- [x] Agent 23: Erledigt am 14.06.2026 — Testing & CI
- [x] Agent 24: Erledigt am 14.06.2026 von Antigravity
- [x] Agent 25: Erledigt am 14.06.2026 von Antigravity
- [x] Agent 26: Erledigt am 14.06.2026 von Antigravity

## @review - Locale-Übersetzung für Restsprachen
Die 9 Restsprachen (`fr`, `es`, `it`, `pt`, `nl`, `pl`, `tr`, `ru`, `zh`) wurden mit identischer Schlüsselmenge generiert.
- Kern-UI (`nav`, `groups`, `pages`, `home`, `geo`, `footer`) wurde aus `prototype/kaqua-i18n.jsx` extrahiert.
- Seitenspezifische Namespaces (`homex`, `products`, `solutions`, `service`, `about`, `news`, `career`, `contact`, `imprint`, `finder`, `co2`, `trust`, `partner`, `academy`, `refs`, `buyers`, `rfq`, `geoContent`, etc.) fallen auf Englisch (`messages/en.json`) zurück, da für diese Sprachen laut Prototyp noch keine vollständigen Übersetzungen vorliegen.
- Vor dem produktiven Freischalten der Locales in `lib/i18n/routing.ts` sollten diese Namespaces von Muttersprachlern validiert werden.

