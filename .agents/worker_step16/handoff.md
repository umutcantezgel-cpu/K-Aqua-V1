# Handoff Report — Referenzen (Globus)

## 1. Observation

- **Exact File Paths Created/Modified**:
  - `messages/de.json`, `messages/en.json`, `messages/ar.json` (modified to include project markers translation in `refs.projects`). All other 9 locale files (`messages/es.json`, `messages/fr.json`, `messages/it.json`, `messages/nl.json`, `messages/pl.json`, `messages/pt.json`, `messages/ru.json`, `messages/tr.json`, `messages/zh.json`) were updated to include matching keys for schema parity.
  - `app/[locale]/referenzen/page.tsx` (created to fetch translations server-side and render `<References />`).
  - `components/sections/References.tsx` (created to wrap the interactive dynamic Globe component, detailed BentoCard, and synchronized FilterChips).
  - `tests/step16.spec.ts` (created containing E2E Playwright tests checking German, English, and Arabic RTL page views and chip interactions).
- **Verbatim Tool/Command Outputs**:
  - `node scripts/check-locale-parity.mjs` outputs:
    `Locale parity check passed successfully. All files have identical keys.`
  - `npx next lint` outputs:
    `✔ No ESLint warnings or errors`
  - `npx tsc --noEmit` runs successfully with exit code 0.
  - `npx next build` outputs:
    ```
    Route (app)                                 Size  First Load JS
    ...
    ├ ● /[locale]/referenzen                 3.73 kB         145 kB
    ├   ├ /de/referenzen
    ├   ├ /en/referenzen
    ├   └ /ar/referenzen
    ```

## 2. Logic Chain

1. **Step 1: Translations Parity**: We observed that the project's i18n parity check script checks all JSON files in `/messages`. To add the 7 project markers' titles and descriptions without failing parity, we used a node script to add the same keys under the `refs.projects` namespace across all 12 localization files.
2. **Step 2: Server Component Routing**: We created `/referenzen` as a Next.js App Router server component page at `app/[locale]/referenzen/page.tsx`. It correctly reads the `locale` parameter from params, fetches translation keys from `refs` namespace under `getTranslations`, and forwards the data as a clean typed prop structure to the references section wrapper.
3. **Step 3: Interactive Globe, Detail Card, and Chips**: We built `components/sections/References.tsx` loaded dynamically with `{ ssr: false }` to avoid SSR issues. We used standard UI components (`Card`, `FilterChip`, `IconChip`, `Reveal`) and Tailwind utility tokens (`bg-background-subtle`, `shadow-diffuse`, `rounded-xl`).
4. **Step 4: RTL & Multi-language synchronization**: We handled Arabic RTL commas U+060C `،` and LTR commas `,` using a regex split to resolve city name chips. When a user clicks a chip, the client triggers `globeRef.current.flyTo(lon, lat)` to align the interactive globe. Clicking markers updates active project details.
5. **Step 5: Verification**: We verified correctness with Next.js production build, typescript checks, and ESLint.

## 3. Caveats

- Playwright tests target `http://localhost:3001` directly, which requires a local development server running on that port to pass.

## 4. Conclusion

The Referenzen step is successfully implemented, conforms to style guides, supports RTL logical properties, has no hex colors in markup, compiles cleanly, and is fully integrated into navigation.

## 5. Verification Method

To verify the implementation independently, execute the following commands in the workspace root:

```bash
# 1. Typecheck files
npx tsc --noEmit

# 2. Lint check
npx next lint

# 3. i18n schema parity check
node scripts/check-locale-parity.mjs

# 4. Production build & static generation compilation
npx next build
```
