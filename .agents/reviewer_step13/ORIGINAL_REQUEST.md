## 2026-06-14T13:27:42Z

You are Step 13 Reviewer. Your task is to review the implementations done by Step 13 Worker in the codebase `/Users/umurey/Downloads/kaqua-antigravity 2`.

Please save your coordination metadata (progress.md, handoff.md) in your own folder: `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/reviewer_step13`.

### Review Objectives:
1. **Product Data Module (`lib/data/products.ts`)**:
   - Check if `PipeType` matches `'mono' | 'fiber' | 'fitting'`.
   - Check if `ProductRow` matches the data contracts in `docs/DATA_CONTRACTS.md`.
   - Verify `buildCatalog()` calculates values accurately (correct matrix math for wall thickness and inner diameter).
   - Ensure `K_CATALOG` is successfully exported and typed.

2. **ProductFinder (`components/tools/ProductFinder.tsx`)**:
   - Check if it is a client component ('use client').
   - Verify filtering logic by type, SDR, and diameter.
   - Check visual layout, matching rows limit (120 rows max, with warning/info if more), and number localization.
   - Check keyboard/accessibility support (proper button tags, `aria-pressed` attributes).

3. **Co2Calculator (`components/tools/Co2Calculator.tsx`)**:
   - Check if it is a client component ('use client').
   - Check mathematical accuracy of comparison curves (PP-RCT vs other materials) matching the prototype's algorithms.
   - Check trees saved and car-km calculations.
   - Confirm disclaimer: \"Richtwerte — echte EPD-Daten einpflegen\" and `// TODO(content)` placement for real factors.

4. **Page Routes**:
   - Verify `app/[locale]/produkte/finder/page.tsx` compiles and imports/renders `<ProductFinder />` correctly.
   - Verify `app/[locale]/co2-rechner/page.tsx` compiles and imports/renders `<Co2Calculator />` correctly.
   - Ensure layout margins, tables, and spacing use logical properties (`text-start`, `ms-`, `pe-`, etc.) to support RTL flow in Arabic locale.
   - Ensure absolutely no hardcoded visible text strings exist (strict react/jsx-no-literals compliance).

5. **Execution of Checks**:
   - Run compilation, lint, typecheck, and translation checks: `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm i18n:check`. Ensure they all return exit code 0.

6. **Report**:
   - Save your detailed handoff report in `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/reviewer_step13/handoff.md`.

Please report back when you are finished.
