## 2026-06-14T13:18:24Z

You are Step 12 Worker. Your task is to implement Step 12: Statische Kernseiten in the codebase `/Users/umurey/Downloads/kaqua-antigravity 2`.

Please save your coordination metadata (progress.md, handoff.md) in your own folder: `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step12`.

### Tasks:
1. **Check off Step 10**:
   - Update `docs/AGENT_LOG.md` to check off `Agent 10`.
2. **Implement 7 Static Core Page Components**:
   - The following pages must be implemented under their respective routes under `app/[locale]/`. They must be **Server Components** (do NOT add `'use client'` to the page files). Use `getTranslations` from `next-intl/server` to query the dictionaries:
     a. **`/produkte`** (`app/[locale]/produkte/page.tsx`):
        - Port `ProductsView` from `prototype/kaqua-views-1.jsx` (lines 177-253).
        - Showcase the 4-component system (Rohre, Formteile, Schweißtechnik, Heiß- & Kaltwasser) (reads from `products.range`).
        - Dimension and pressure ratings table (reads from `products.tableHead` and `products.tableRows`).
        - PDF catalog and features download buttons (link to static PDFs, use `<MediaSlot>` placeholders for the visual side).
     b. **`/loesungen`** (`app/[locale]/loesungen/page.tsx`):
        - Port `SolutionsView` from `prototype/kaqua-views-1.jsx` (lines 255-305).
        - Material benefits bento grid: environmentally friendly, recyclable, superior, durable (reads from `solutions.benefits`). Use `<MediaSlot>` placeholders for the benefit images.
     c. **`/service`** (`app/[locale]/service/page.tsx`):
        - Port `ServiceView` from `prototype/kaqua-views-2.jsx`.
        - Download resources list + video tutorial grid linking to YouTube.
     d. **`/unternehmen`** (`app/[locale]/unternehmen/page.tsx`):
        - Port `AboutView` from `prototype/kaqua-views-2.jsx`.
        - Showcase company policies, the GENAU management system, and the three ISO certificates cards.
     e. **`/news`** (`app/[locale]/news/page.tsx`):
        - Port `NewsView` from `prototype/kaqua-views-2.jsx`.
        - Render the ISO triple-certification news release and local events.
     f. **`/kontakt`** (`app/[locale]/kontakt/page.tsx`):
        - Port `ContactView` from `prototype/kaqua-views-2.jsx`.
        - Render physical location contact details (Auweg 3, 35647 Waldsolms), support hotlines, and sales routing information.
     g. **`/impressum`** (`app/[locale]/impressum/page.tsx`):
        - Port `ImprintView` from `prototype/kaqua-views-2.jsx`.
        - Render corporate information table with legal disclosures.
3. **Rules & Constraints**:
   - Reuse standard primitives: `<Card>`, `<Button>`, `<Eyebrow>`, `<SectionHead>`, etc. from `components/ui/`.
   - Ensure all layouts support RTL logic (using logical properties `ms-`, `pe-`, `text-start`, etc.).
   - ABSOLUTELY NO HARDCODED STRINGS: ESLint `react/jsx-no-literals` is active. Every visible text MUST come from `getTranslations`.
4. **Execution of build checks**:
   - Run: `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm i18n:check`. Ensure they all return exit code 0.
   - Write your detailed handoff report in `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step12/handoff.md`.

### MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Please report back when you are finished.
