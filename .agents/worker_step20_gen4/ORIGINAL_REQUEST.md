## 2026-06-14T15:04:27Z

You are worker_step20_gen4.
Your working directory is `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step20_gen4`.
Your task is to implement Step 20: Sitemap, Robots, OG, and Manifest.

### Instructions:
1. Create `app/sitemap.ts` to return an XML sitemap of all active routes. It must cover:
   - 17 core static routes for each of the 3 locales (`de`, `en`, `ar`), totaling 51 pages.
   - 28 dynamic geo-city routes (mapped from `GEO_MARKETS` in `lib/data/geo.ts`) for each of the 3 locales, totaling 84 pages.
   - Total pages must be exactly 135.
   - Return entries with `alternates.languages` listing hreflangs for `de`, `en`, `ar`, and `x-default` (pointing to `de`).
   - Standardize URLs: homepage canonicals/alternates must end in `/` (e.g. `https://k-aqua.de/de/`), while subpages must not (e.g. `https://k-aqua.de/de/produkte`), to satisfy E2E tests.
2. Create `app/robots.ts` referencing `/sitemap.xml` and specifying host directives.
3. Create `app/manifest.ts` returning a valid Web App Manifest. Use brand purple `#5B2D8C` and background `#FAFAFA`. Refer to icons `icon-192.png` and `icon-512.png` (include a `// TODO(content)` since actual bitmap files are missing).
4. Create dynamic opengraph image files using Next.js `ImageResponse` under the Edge runtime:
   - `app/[locale]/opengraph-image.tsx` for general routes.
   - `app/[locale]/maerkte/[slug]/opengraph-image.tsx` for dynamic geo city routes.
   - Load the font `fonts/outfit-variable-latin.woff2` dynamically using a fetch or fs read, so it can render the page titles in Outfit font.
   - Draw a beautiful brand gradient background (purple `#5B2D8C` to aqua `#0081A5`), render the page title, and embed a clean SVG droplet/brand logo.
5. Create an E2E verification test file at `tests/step20.spec.ts`. The test should launch the local server, verify `/sitemap.xml` is valid XML with exactly 135 entries and correct hreflang alternate tags, verify `/robots.txt` contains sitemap and host rules, verify `/manifest.webmanifest` returns valid JSON with K-Aqua name and theme colors, and check that `opengraph-image` URLs return 200 OK and render correctly.
6. Verify your implementation by running:
   - `pnpm lint`
   - `pnpm typecheck`
   - `pnpm build`
   - `npx playwright test tests/step20.spec.ts` (make sure the dev server is started or handle it cleanly).
7. Report all findings, compilation results, and E2E test runs in your handoff report at `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step20_gen4/handoff.md`.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
