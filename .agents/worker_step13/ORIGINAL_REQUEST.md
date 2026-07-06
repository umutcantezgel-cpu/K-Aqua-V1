## 2026-06-14T13:24:05Z
You are Step 13 Worker. Your task is to implement Step 13: Produktfinder & CO2-Rechner in the codebase `/Users/umurey/Downloads/kaqua-antigravity 2`.

Please save your coordination metadata (progress.md, handoff.md) in your own folder: `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step13`.

### Tasks:
1. **Check off Step 11 & Step 12**:
   - Update `docs/AGENT_LOG.md` to check off `Agent 11` and `Agent 12`.
2. **Create Product Data Module in `lib/data/products.ts`**:
   - Define TypeScript interfaces matching `docs/DATA_CONTRACTS.md` and the prototype:
     - `PipeType` which can be `'mono' | 'fiber' | 'fitting'` (or also include `'valve' | 'tool'` as placeholder options if needed, but match the prototype's types: `'mono' | 'fiber' | 'fitting'`).
     - `ProductRow` containing `type`, `typeLabel`, `short`, `d`, `sdr` (number | null), `wall` (number | null), `di` (number | null), `pn` (string).
   - Port the `buildCatalog()` product catalog matrix generation logic from `prototype/kaqua-views-3.jsx` (lines 13-35) verbatim.
   - Generate and export `K_CATALOG` as a strongly-typed array of `ProductRow`.
3. **Implement ProductFinder in `components/tools/ProductFinder.tsx`**:
   - Must be a client component ('use client').
   - Port the visual presentation and filter logic from `FinderView` in `prototype/kaqua-views-3.jsx` (lines 38-131).
   - Include filter chips for pipe types (mono, fiber, fitting) and pressure classes (SDRs).
   - Include a slider for maximum diameter (`d20` to `d630` range).
   - Display a count badge of matches found.
   - Render the dynamic table listing matching items (Type/Short, Dimension, SDR, Wall thickness, Inner diameter, PN pressure rating). Capped at 120 visible rows, with a localized message if there are more.
   - Localize all number outputs based on the current locale (using `Intl.NumberFormat` or `.toLocaleString()`).
   - Ensure complete keyboard access: use button tags for chips, add appropriate `aria-pressed` values, and handle click states.
   - Retrieve translations from the next-intl namespace `finder`.
4. **Implement Co2Calculator in `components/tools/Co2Calculator.tsx`**:
   - Must be a client component ('use client').
   - Port the CO2 estimation and material comparison visual bars from `CO2View` in `prototype/kaqua-views-3.jsx` (lines 133-236).
   - Estimate CO2 outputs based on diameter, length (slider inputs), and SDR (class chip inputs) matching the prototype's math.
   - Compare K-Aqua PP-RCT vs PVC-C, Copper, and Stainless Steel. Render visual bar rows where the fills scale dynamically relative to the highest/worst value.
   - Translate the savings into trees saved (`saved / 25`) and equivalent passenger car-km saved (`saved / 0.15`).
   - Retain the **Disclaimer** visible on the tool: "Richtwerte — echte EPD-Daten einpflegen" and mark calculations as demo estimates via `// TODO(content)` in factors code.
   - Localize all numbers.
   - Retrieve translations from next-intl namespace `co2`.
5. **Set up Page Routes**:
   - `app/[locale]/produkte/finder/page.tsx` importing and rendering `<ProductFinder />`. (Server component importing client component, dynamic import or standard import is fine).
   - `app/[locale]/co2-rechner/page.tsx` importing and rendering `<Co2Calculator />`.
   - Ensure all layout margins, tables, and spacing use logical properties (`text-start`, `ms-`, `pe-`, etc.) to support RTL flow in Arabic locale.
   - ABSOLUTELY NO HARDCODED STRINGS: ESLint `react/jsx-no-literals` is active. Every visible text MUST come from translation keys.
6. **Verification checks**:
   - Run `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm i18n:check`. All must pass successfully.
   - Document your changes and verification logs in `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step13/handoff.md`.
