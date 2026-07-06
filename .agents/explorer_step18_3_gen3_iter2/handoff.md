# Handoff Report - Step 18 Iteration 2 Verification Plan

## 1. Observation

Direct observations from the workspace files and configuration:

* **Translation Files Directory**:
  `/Users/umurey/Downloads/kaqua-antigravity 2/messages/` contains exactly 12 translation files:
  `ar.json`, `de.json`, `en.json`, `es.json`, `fr.json`, `it.json`, `nl.json`, `pl.json`, `pt.json`, `ru.json`, `tr.json`, and `zh.json`.

* **Locale Parity Check Logic**:
  `scripts/check-locale-parity.mjs` performs the key synchronization check:
  ```javascript
  const files = fs.readdirSync(MESSAGES_DIR).filter(file => file.endsWith('.json'));
  // ...
  // Compare each file against the union of all keys
  for (const file of files) {
    const keys = fileKeysMap[file];
    const missing = [...allKeysSet].filter(k => !keys.has(k));
    if (missing.length > 0) {
      console.error(`\x1b[31mError: Locale file "${file}" is missing keys:\x1b[0m`);
      missing.forEach(k => console.error(`  - ${k}`));
      hasDiscrepancy = true;
    }
  }
  ```
  Corresponding npm script in `package.json`:
  ```json
  "i18n:check": "node scripts/check-locale-parity.mjs"
  ```

* **Linting Rules (`eslint.config.mjs`)**:
  Lines 18-25 define the strict JSX literal guard:
  ```javascript
  'react/jsx-no-literals': [
    'error',
    {
      noStrings: true,
      allowedStrings: ['·', '—', '/', '+', '×', '•', 'K-Aqua', 'KWT', 'KESSEL', 'PP-R', 'PP-RCT', 'ISO', 'CO₂'],
      ignoreProps: true,
    },
  ]
  ```

* **TypeScript Compilation Configuration**:
  `package.json` contains:
  ```json
  "typecheck": "tsc --noEmit"
  ```

* **E2E Playwright Suite (`tests/step18.spec.ts`)**:
  Contains 7 test cases under `Step 18: Geo City Pages (pSEO)`:
  - `German Locale /de/maerkte/dubai` -> `should load the Dubai page successfully and incorporate Dubai in the title`
  - `German Locale /de/maerkte/dubai` -> `should have the correct meta description`
  - `German Locale /de/maerkte/dubai` -> `should have correct canonical and hreflang alternate links`
  - `German Locale /de/maerkte/dubai` -> `should render the 3 closest markets correctly`
  - `Arabic Locale /ar/maerkte/dubai` -> `should render in RTL`
  - `Arabic Locale /ar/maerkte/dubai` -> `should have Arabic translations in title, description and links`
  - `Unknown Slug Behavior` -> `should return 404 for unknown slug`

---

## 2. Logic Chain

1. **Parity Check**:
   - The addition of `prodNote` and `km` keys inside the `geo` namespace is required to fix the hardcoded translation bypass in `components/sections/GeoCity.tsx`.
   - Modifying only some of the locale files will cause the custom script `check-locale-parity.mjs` (run via `pnpm i18n:check`) to fail, since it checks that the union of all keys across all 12 `.json` files is present in each individual file.
   - Therefore, the first verification step must be running `pnpm i18n:check` to ensure perfect key parity.

2. **Lint and Type Safety**:
   - The code edits will modify `components/sections/GeoCity.tsx` and `app/[locale]/maerkte/[slug]/page.tsx` to handle `geoTrans.prodNote` and `geoTrans.km`.
   - To guarantee that no TypeScript interfaces are broken and the prop types are fully aligned, `pnpm typecheck` must run.
   - To guarantee that the fix itself does not introduce new string literals into the JSX (which would fail due to the strict `react/jsx-no-literals` rule configured in `eslint.config.mjs`), `pnpm lint` must run.

3. **Production Compilation**:
   - Next.js must build successfully. A successful build compiles the programmatic routes (84 routes, representing 3 active locales * 28 cities) statically.
   - Thus, `pnpm build` is run.

4. **Runtime and Behavioral Tests**:
   - The final guarantee is the Playwright test suite `tests/step18.spec.ts` which tests:
     - Document title formatting and locale-aware headings.
     - Alternate link arrays in the page `<head>` (verifying `canonical` and all locale `hreflang` alternates).
     - Geographic nearest-neighbors calculation and link formatting (`${nm.country} · ${formattedNmDist} ${geoTrans.km}`).
     - Right-to-Left (RTL) mode support (verifying `dir="rtl"` in the `<html>` tag).
     - Fallbacks for non-existent city slugs.
   - This requires running the production build served on port 3001 using `npx next start -p 3001` followed by `npx playwright test tests/step18.spec.ts`.

---

## 3. Caveats

* The Playwright tests depend on port `3001`. If another process is using port `3001`, the start command or tests will fail. The port must be free.
* The tests expect a clean build; if the project is built with older, stale translation keys, the server will serve outdated files, causing the E2E tests to fail. The build must always be compiled *after* the locale keys are synchronized.

---

## 4. Conclusion

A robust and complete verification plan for Step 18 Iteration 2 requires executing five checks in sequence:
1. **Locale Key Parity**: `pnpm i18n:check` to check `messages/*.json` consistency.
2. **Code Linting**: `pnpm lint` to enforce i18n guards.
3. **Type Safety**: `pnpm typecheck` to confirm component prop integrity.
4. **Production Build**: `pnpm build` to compile the 84 static routes.
5. **E2E Behavior**: `npx next start -p 3001` + `npx playwright test tests/step18.spec.ts` to verify RTL, metadata, layout, and link structure.

---

## 5. Verification Method

To execute the verification plan, run the following commands in the workspace root:

```bash
# 1. Verify i18n Key Parity
pnpm i18n:check

# 2. Verify Lint Compliance (especially react/jsx-no-literals)
pnpm lint

# 3. Verify TypeScript Safety
pnpm typecheck

# 4. Verify Next.js Production Compilation
pnpm build

# 5. Run Playwright Integration Tests
# Note: Start the server in one process, then run the tests
pnpm start --port 3001
# (In another terminal/process)
npx playwright test tests/step18.spec.ts
```

*Invalidation Conditions*:
- Any locale file missing `geo.prodNote` or `geo.km` (fails step 1).
- Unescaped strings in JSX or syntax errors (fails step 2).
- Mismatched prop definition inside `GeoCityProps` vs `GeoCityPage` (fails step 3).
- Static generation error (fails step 4).
- Title, translation or RTL tag mismatch (fails step 5).
