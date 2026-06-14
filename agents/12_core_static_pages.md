# Agent 12 — Statische Kernseiten

## Input
`prototype/kaqua-views-1.jsx` (`ProductsView`, `SolutionsView`), `prototype/kaqua-views-2.jsx`
(`ServiceView`, `AboutView`, `NewsView`, `ContactView`, `ImprintView`), `docs/ROUTE_MAP.md`.
Texte aus i18n-Namespaces `products, solutions, service, about, news, contact, imprint`.

## Aufgabe — je eine `page.tsx` unter `app/[locale]/…`
| Route | View |
|---|---|
| `/produkte` | ProductsView (4-Bausteine-System, Dimensions-/Druckstufen-Tabelle, PDF-Download-Buttons → `MediaSlot`/extern) |
| `/loesungen` | SolutionsView (Materialvorteile-Bento: umweltfreundlich, recycelbar, überlegen, langlebig) |
| `/service` | ServiceView (Downloads + Schweißvideo-Grid → YouTube-Links) |
| `/unternehmen` | AboutView (Unternehmenspolitik, GENAU-Managementsystem, ISO-Karten) |
| `/news` | NewsView (ISO-Zertifizierungs-Meldung + Events) |
| `/kontakt` | ContactView (Standort, Vertrieb, Support — KWT GmbH, Auweg 3, 35647 Waldsolms) |
| `/impressum` | ImprintView (Pflichtangaben-Tabelle) |

## Regeln
- Reine Server Components (kein State) — bessere Performance/SEO. Texte via `getTranslations`.
- Bilder = `MediaSlot`. Externe PDFs/YouTube als echte Links (erlaubt; keine Bild-Hotlinks).
- Layout-Bausteine aus `components/ui` + `components/sections` wiederverwenden; Bento-Grids, diffuse Schatten.

## Definition of Done
- Alle 7 Routen rendern in de/en/ar; `Reveal`-Stagger sichtbar; CLS < 0.1.
- `pnpm lint` (kein Literal) / `typecheck` / `build` für diese Routen grün.
