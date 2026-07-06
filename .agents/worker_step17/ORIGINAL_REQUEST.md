## 2026-06-14T14:15:32Z

You are worker_step17, a teamwork_preview_worker.
Your working directory is /Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step17.
Your task is to implement Step 17: Geo: Märkte-Hub (360°-Welt) in the codebase.

Objective:
Implement the `lib/data/geo.ts` data slice and the `/maerkte` markets hub page. The hub page should show an interactive globe showing 27 market markers, filter chips for the 4 regions with correct item counts, and a sidebar list of markets. Hovering on a market list item centers the globe on that market (flyTo) and displays a tooltip card with details (city, country, and distance from Waldsolms). Clicking a marker or a list item navigates to `/maerkte/<slug>`.

Tasks:
1. Implement `lib/data/geo.ts`:
   - Define types according to `docs/DATA_CONTRACTS.md` (RegionId, Region, GeoMarket, WALDSOLMS).
   - Export `WALDSOLMS = { lat: 50.37, lon: 8.51 }`.
   - Export `REGIONS` (4 regions) and `GEO_MARKETS` (27 markets) populated with the exact values from `prototype/kaqua-geo.jsx` (lines 7-190).
   - Implement `haversineKm(a, b)`:
     ```typescript
     export function haversineKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
       const rad = Math.PI / 180;
       const dLat = (b.lat - a.lat) * rad;
       const dLon = (b.lon - a.lon) * rad;
       const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
       return Math.round(6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)));
     }
     ```
   - Implement `nearestMarkets(slug: string, n = 3)` which returns the n closest markets by distance.
2. Implement route `app/[locale]/maerkte/page.tsx` as a React Server Component:
   - Fetches translations for `geo`, `regions`, and `geoContent` using next-intl.
   - Passes serializable structure to `<MarketsHub />`.
3. Implement `components/sections/MarketsHub.tsx` (Client Component):
   - Uses `dynamic(ssr: false)` to import `components/globe/Globe.tsx`.
   - Renders a list of the 27 markets (filtered by active region chip).
   - Region filter chips show counts: "Alle (27)", "DACH (6)", "Europa (5)", "Naher & Mittlerer Osten (11)", "Afrika & Asien-Pazifik (5)".
   - Hovering over a list item centers the Globe (`globeRef.current.flyTo(lon, lat)`), highlights the marker, and updates details (City, Country, Distance from Waldsolms computed via `haversineKm` and formatted via `Intl.NumberFormat`).
   - Clicking a market item or globe marker redirects to `/maerkte/<slug>` (using `next-intl` Link or router).
   - Handles `prefers-reduced-motion`: disables animations, flyTo transitions jump immediately, list remains fully functional.
   - Completely accessible (keyboard tab indexing, outline focus borders, aria labels).
   - Layout logical properties for RTL Arabic `/ar` support (no physical margin/padding, mirrored arrows).
4. Verify build & quality gates:
   - pnpm typecheck
   - pnpm lint
   - pnpm i18n:check
   - pnpm build
5. Create a verification spec `tests/step17.spec.ts` containing Playwright test cases that verify:
   - `/de/maerkte` and `/ar/maerkte` load successfully.
   - Region chips filter list items and show correct counts.
   - Hovering list items updates tooltips/details.
   - Keyboard tab-navigation and interactions work.
   - RTL attributes are set correctly on Arabic locale page.
   - All text content uses localized strings (no hardcoded text in JSX).

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Write a detailed handoff.md in your directory, and notify me (conversation ID: 004dbd53-c82e-441e-b68d-51bec1d526c2) via send_message when you are done.
