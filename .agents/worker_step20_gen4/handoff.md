# Handoff Report - Step 20: Sitemap, Robots, OG, and Manifest

## 1. Observation
- Created the following files in the project workspace:
  - `app/sitemap.ts`: Handles the generation of `/sitemap.xml` returning 135 entries (17 static routes and 28 dynamic market routes for 3 locales each), with proper alternates and x-default language tags, and slash handling (trailing slash for homepages, none for subpages).
  - `app/robots.ts`: Generates `/robots.txt` referencing `/sitemap.xml` and declaring the host as `https://k-aqua.de`.
  - `app/manifest.ts`: Generates `/manifest.webmanifest` with theme color `#5B2D8C` and background `#FAFAFA` referencing icon-192.png and icon-512.png.
  - `app/[locale]/opengraph-image.tsx`: Dynamic opengraph image for general routes (loading `fonts/outfit-bold.ttf`).
  - `app/[locale]/maerkte/[slug]/opengraph-image.tsx`: Dynamic opengraph image for dynamic market routes (loading `fonts/outfit-bold.ttf`).
  - `tests/step20.spec.ts`: Playwright E2E verification test suite.
- Replaced the font file `fonts/outfit-variable-latin.woff2` with the TrueType font `fonts/outfit-bold.ttf` because Satori / `ImageResponse` under Edge runtime failed with:
  > `Error: Unsupported OpenType signature wOF2`
- Discovered and resolved a pre-existing floating-point bug in `lib/data/geo.ts` under `haversineKm` where `h` could exceed `1` (e.g., `1.0000000000000002`), causing `Math.sqrt(1 - h)` to return `NaN` and failing `tests/geo-stress.spec.ts`. The fix was clamping `1 - h` to be at least `0`.
- Ran the Playwright test suite `npx playwright test` which successfully passed 167/167 E2E tests:
  > `167 passed (19.0s)`
- Ran typecheck and lint checks:
  > `tsc --noEmit` and `next lint` completed successfully with no errors or warnings.

## 2. Logic Chain
- **Requirement 1: 135 sitemap entries with trailing-slash constraints.** Under `app/sitemap.ts`, we iterate through 17 static routes and 28 dynamic markets from `GEO_MARKETS` across 3 locales (`de`, `en`, `ar`), producing exactly 135 entries. Homepages are rendered ending with `/` and subpages without, matching the requested specification.
- **Requirement 2: Robots referencing sitemap and host.** Under `app/robots.ts`, the returned metadata maps to the sitemap URL and host header specified in the request.
- **Requirement 3: manifest.webmanifest config.** `app/manifest.ts` returns a valid JSON structure with requested colors and icons.
- **Requirement 4: Edge OG images with Outfit font.** Satori parses the font data dynamically but lacks `.woff2` support. By using the TrueType font `fonts/outfit-bold.ttf`, Satori successfully decodes the font stream at runtime under the Edge runtime.
- **Requirement 5: E2E tests and full suite verification.** E2E tests in `tests/step20.spec.ts` assert HTTP 200 responses, correct tag structure, exact length of sitemap, and correct content types. Running the tests against the rebuilt Next.js production server validated the setup.
- **Defect Resolution:** Fixing `lib/data/geo.ts` by replacing `Math.sqrt(1 - h)` with `Math.sqrt(Math.max(0, 1 - h))` ensures that values of `h` slightly greater than `1` (due to floating-point rounding errors) do not result in a `NaN` distance, resolving the pre-existing stress test failure.

## 3. Caveats
- The icon files `/icon-192.png` and `/icon-512.png` are referenced in the manifest config but are not present as physical assets in the codebase (marked with `// TODO(content)`).

## 4. Conclusion
- Step 20 is fully implemented and passes all verification tests (build, typecheck, lint, and Playwright E2E). A pre-existing floating-point bug in `haversineKm` has also been resolved.

## 5. Verification Method
- To verify the implementation, execute the following commands in the workspace root:
  - Run typecheck: `npm run typecheck`
  - Run lint: `npm run lint`
  - Rebuild the application: `npm run build`
  - Run the Step 20 Playwright E2E tests: `npx playwright test tests/step20.spec.ts`
  - Run the entire Playwright test suite: `npx playwright test`
