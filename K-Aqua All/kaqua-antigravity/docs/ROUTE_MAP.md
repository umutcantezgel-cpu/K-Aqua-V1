# Routen-Map — Prototyp-Hash → Next.js App Router

Der Prototyp routet über `#hash` in `kaqua-app.jsx` (`VIEWS` + `resolveView`).
In Next.js wird jede View zu einer Datei unter `app/[locale]/…/page.tsx`.

| Prototyp-Hash | Next.js-Pfad | Datei | View-Quelle (Prototyp) | Render |
|---|---|---|---|---|
| `#home` | `/[locale]` | `app/[locale]/page.tsx` | `HomeView` (`kaqua-views-1`) + `HeroScrolly` + `HomeBuyers` | SSG |
| `#products` | `/[locale]/produkte` | `…/produkte/page.tsx` | `ProductsView` (`views-1`) | SSG |
| `#finder` | `/[locale]/produkte/finder` | `…/produkte/finder/page.tsx` | `FinderView` (`views-3`) | Client |
| `#solutions` | `/[locale]/loesungen` | `…/loesungen/page.tsx` | `SolutionsView` (`views-1`) | SSG |
| `#co2` | `/[locale]/co2-rechner` | `…/co2-rechner/page.tsx` | `CO2View` (`views-3`) | Client |
| `#academy` | `/[locale]/academy` | `…/academy/page.tsx` | `AcademyView` (`views-4`) | Client |
| `#trust` | `/[locale]/trust-center` | `…/trust-center/page.tsx` | `TrustView` (`views-4`) | Client |
| `#partner` | `/[locale]/partnerschaft` | `…/partnerschaft/page.tsx` | `PartnerView` (`views-4`) | SSG |
| `#service` | `/[locale]/service` | `…/service/page.tsx` | `ServiceView` (`views-2`) | SSG |
| `#markets` | `/[locale]/maerkte` | `…/maerkte/page.tsx` | `MarketsView` (`kaqua-geo`) | SSG + Client globe |
| `#geo/<slug>` | `/[locale]/maerkte/<slug>` | `…/maerkte/[slug]/page.tsx` | `GeoCityView` (`kaqua-geo`) | **SSG via generateStaticParams** |
| `#references` | `/[locale]/referenzen` | `…/referenzen/page.tsx` | `GlobeRefView` (`views-5`) | SSG + Client globe |
| `#about` | `/[locale]/unternehmen` | `…/unternehmen/page.tsx` | `AboutView` (`views-2`) | SSG |
| `#career` | `/[locale]/karriere` | `…/karriere/page.tsx` | `CareerToolsView` (`views-5`) | Client |
| `#rfq` | `/[locale]/projektanfrage` | `…/projektanfrage/page.tsx` | `RFQView` (`views-6`) | Client |
| `#news` | `/[locale]/news` | `…/news/page.tsx` | `NewsView` (`views-2`) | SSG |
| `#contact` | `/[locale]/kontakt` | `…/kontakt/page.tsx` | `ContactView` (`views-2`) | SSG |
| `#imprint` | `/[locale]/impressum` | `…/impressum/page.tsx` | `ImprintView` (`views-2`) | SSG |
| *(neu, Phase 3.0)* `/[locale]/produkte/katalog/[category]/[slug]` | dieselbe | `…/produkte/katalog/[category]/[slug]/page.tsx` | `CatalogDeep` (`kaqua-catalog-view.jsx` + `kaqua-catalog-data.js`, 79 reale Artikel / 7 Kategorien) | **SSG via `generateStaticParams`** |

## Locale-Segment

- Locales: `de` (default), `en`, `ar` (RTL) — **freigeschaltet**; weitere erst nach 100 % Übersetzung (siehe `RULES.md`).
- `app/[locale]/layout.tsx` setzt `<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>`.
- Mengengerüst freigeschaltet: 3 Locales × 18 Routen + 3 × 27 Geo = **135 statische Seiten**
  (Phase 1/2.0-Stand). **Phase 3.0 ergänzt** 3 × 79 Katalog-Detailseiten = **+237 Seiten** →
  neues Gesamt **372 statische Seiten**.
- Voll ausgebaut (12 Locales): 12 × 18 + 12 × 27 + 12 × 79 = **1.488 Seiten**.

## Slugs

Deutsche Slugs sind kanonisch (Phase 1). Slug-Lokalisierung pro Sprache ist Phase 2
(`next-intl` `pathnames`-Map) — Architektur in `19_seo_metadata_jsonld.md` vorgesehen.

## Geo-Slugs (27)

`waldsolms, frankfurt, berlin, muenchen, hamburg, wien, zuerich, london, paris,
mailand, prag, warschau, istanbul, dubai, abu-dhabi, doha, riad, dschidda, neom,
kuwait-stadt, maskat, manama, amman, kairo, kuala-lumpur, mumbai, nairobi`

(Exakte Liste = `K_GEO.map(g => g.slug)` aus `prototype/kaqua-geo.jsx` — Quelle der Wahrheit.)
