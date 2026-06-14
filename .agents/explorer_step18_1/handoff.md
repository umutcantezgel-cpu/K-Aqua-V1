# Handoff Report — Step 18: Geo City Pages (pSEO)

## 1. Observation

- **Data Source (`lib/data/geo.ts`)**:
  - `GEO_MARKETS` contains 28 entries:
    ```typescript
    export const GEO_MARKETS: GeoMarket[] = [ ... ];
    ```
    Slugs included are: `frankfurt`, `berlin`, `muenchen`, `hamburg`, `wien`, `zuerich`, `london`, `paris`, `mailand`, `warschau`, `prag`, `dubai`, `abudhabi`, `doha`, `riad`, `dschidda`, `neom`, `kuwait`, `maskat`, `manama`, `amman`, `kairo`, `istanbul`, `singapur`, `kualalumpur`, `mumbai`, `kapstadt`, `nairobi`.
  - Distances and related markets are computed via `haversineKm` and `nearestMarkets`:
    ```typescript
    export function nearestMarkets(slug: string, n = 3): GeoMarket[] { ... }
    ```

- **Localization JSONs (`messages/*.json`)**:
  - `de.json`, `en.json`, and `ar.json` have identical keys as verified by `node scripts/check-locale-parity.mjs` returning `"Locale parity check passed successfully."`
  - In `de.json` line 120-140, the `"geo"` namespace contains page-specific translations, e.g.:
    ```json
    "geo": {
      "eyebrow": "Märkte & Standorte",
      "cityTitle": "PP-R/PP-RCT Rohrsysteme in {city}.",
      "cityLead": "Trinkwassersysteme d20–d630, geprüft gegen die Anforderungen vor Ort —",
      "fromPlant": "km ab Werk Waldsolms",
      ...
    }
    ```
  - In `de.json` line 1025, the `"geoContent"` namespace contains city-specific dynamic texts for `regulator`, `water`, `focus`, `note`, and `focusHeading` translations.

- **Next-intl Setup (`lib/i18n/routing.ts` & `lib/i18n/navigation.ts`)**:
  - Locales configured are `['de', 'en', 'ar']` with `defaultLocale: 'de'`.
  - Custom i18n navigation helpers (`Link`, `useRouter`, etc.) are created in `lib/i18n/navigation.ts`.

- **Existing Layout (`app/[locale]/layout.tsx`)**:
  - Sets up the root layout with support for RTL:
    ```typescript
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    return <html lang={locale} dir={dir} ...>
    ```
  - Layout has a `<main>` tag with top padding:
    ```typescript
    <main id="main-content" className="pt-[72px] min-h-screen">
    ```

- **ESLint Literal Rules (`eslint.config.mjs` line 18)**:
  - Banned literal children/strings in JSX unless explicitly permitted in `allowedStrings`:
    ```javascript
    'react/jsx-no-literals': [
      'error',
      {
        noStrings: true,
        allowedStrings: ['·', '—', '/', '+', '×', '•', 'K-Aqua', 'KWT', 'KESSEL', 'PP-R', 'PP-RCT', 'ISO', 'CO₂'],
        ignoreProps: true,
      }
    ]
    ```

- **Prototype code (`prototype/kaqua-geo.jsx`)**:
  - `GeoCityView` lists the sections: Hero with Mini-Globus, Regulatorik-Karte (Bento card 1, span 3), Wasserprofil (Bento card 2, span 3), Fokus-Projekte (Bento card 3, span 4), Academy-Verweis (Bento card 4, span 2), and "In der Nähe" related markets.

---

## 2. Logic Chain

1. **Page/Component split**:
   - The page `app/[locale]/maerkte/[slug]/page.tsx` must be a Server Component to fetch translations using `getTranslations` server-side, avoiding client-side i18n hydration issues.
   - The UI rendering should be handled by a Client Component `components/sections/GeoCity.tsx` (using `"use client"`) because it renders the `Globe` component (which uses `requestAnimationFrame` and `canvas` API) and Framer Motion elements (`Reveal` and `useReducedMotion`).
2. **Dynamic static path generation**:
   - Since both `[locale]` and `[slug]` are dynamic path segments in `app/[locale]/maerkte/[slug]`, `generateStaticParams` must return the cartesian product of `routing.locales` and `GEO_MARKETS.slug` (3 locales × 28 slugs = 84 static routes).
3. **Locale-specific SEO Metadata**:
   - `generateMetadata` must construct:
     - Localized `title` and `description`.
     - Alternate links mapping `de`, `en`, and `ar` to their respective URL paths, plus `x-default` mapping to the German (`de`) version.
     - Canonical link pointing to the exact current locale path.
     - Origin constructed from `process.env.NEXT_PUBLIC_SITE_URL` (with fallback to `https://k-aqua.de`).
4. **Mini-Globe Integration**:
   - The `Globe` component must be imported dynamically with `ssr: false` to avoid server-side canvas compilation errors.
   - The Globe should center on the target city (`flyTo`) and highlight the marker (`setActive`). To avoid stale state or layout shifts, this must be triggered using a callback ref `handleGlobeRef` when the canvas mounts.
5. **RTL and Layout**:
   - The layout must use Tailwind logical properties (e.g. `text-start`, `ps-4`, `pe-4`, logical flex directions) instead of directional ones (`text-left`, `pl-4`).
   - Arrow icons should automatically mirror in RTL (the project `ArrowRight` icon includes a built-in `rtl-flip` class).
6. **ESLint & Language Purity Compliance**:
   - The internal production note `Hinweis Produktion: ...` must be localized and stored in a locale-mapped variable (`PROD_NOTES`) outside the JSX body to prevent ESLint literal errors and comply with Arabic/English language purity rules.

---

## 3. Caveats

- **Domain Base URL**: Absolute paths for alternate/canonical tags in metadata are constructed using `process.env.NEXT_PUBLIC_SITE_URL`. We assume `https://k-aqua.de` is a safe default fallback value if the environment variable is not defined.
- **Nearest Markets Distance**: The prototype shows nearest markets distances from the *current* market (using `haversineKm(market, nm)`), while the hero shows distance from the *Waldsolms plant*. This distinction is correctly preserved.

---

## 4. Conclusion

The implementation strategy requires:
1. Creating the dynamic route directory `app/[locale]/maerkte/[slug]/`.
2. Placing `page.tsx` in this directory as a Server Component handling static params, metadata alternates/canonicals, and data localization.
3. Creating `components/sections/GeoCity.tsx` as a Client Component rendering the interactive layout and dynamically loading the responsive mini-globe.
Complete code models have been created in the explorer folder as:
- `/.agents/explorer_step18_1/proposed_page.tsx`
- `/.agents/explorer_step18_1/proposed_GeoCity.tsx`

---

## 5. Verification Method

To independently verify the implementation:
1. **Build & Typecheck**:
   - Run `npx tsc --noEmit` and `npx next lint` to confirm no type or lint errors are introduced.
   - Run `npx next build` to confirm all 84 pages are statically generated successfully.
2. **HTML Head Verification**:
   - Inspect the compiled output of `/ar/maerkte/dubai` to verify:
     - `<html dir="rtl" lang="ar">` is set.
     - Canonical points to `https://k-aqua.de/ar/maerkte/dubai`.
     - Alternate hreflang tags for `de`, `en`, `ar`, and `x-default` are present.
3. **Interactive Verification**:
   - Load `/ar/maerkte/dubai` in browser to confirm the mini-globe centers on Dubai, is interactive, and displays the localized Arabic texts without layout breaks.

---

## 6. Remaining Work

1. Create directory `app/[locale]/maerkte/[slug]`.
2. Move `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/explorer_step18_1/proposed_page.tsx` to `app/[locale]/maerkte/[slug]/page.tsx`.
3. Move `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/explorer_step18_1/proposed_GeoCity.tsx` to `components/sections/GeoCity.tsx`.
4. Perform local typecheck, lint, and build tests.
