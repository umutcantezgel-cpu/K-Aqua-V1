# BRIEFING — 2026-06-14T14:28:39Z

## Mission
Analyze codebase and recommend a fix/implementation strategy for Step 18: Geo City Pages (pSEO) SEO requirements, routing, translations, and validation.

## 🔒 My Identity
- Archetype: explorer
- Roles: Teamwork explorer, Read-only investigation: analyze problems, synthesize findings, produce structured reports
- Working directory: /Users/umurey/Downloads/kaqua-antigravity 2/.agents/explorer_step18_3
- Original parent: ab7867bc-ae1b-4117-a2cb-1cfa6cc0718a
- Milestone: Step 18: Geo City Pages (pSEO)

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- Focus specifically on SEO requirements: generateStaticParams and generateMetadata.
- Check how metadata properties (canonical URLs, alternates.languages hreflang, OpenGraph, title/description translations) must be returned from generateMetadata.
- Examine how next-intl translation lookup handles missing keys or how the namespaces (like "geo", "geoContent") are retrieved.
- Detail the validation checks that should be run (e.g. pnpm build, pnpm lint, pnpm typecheck, pnpm i18n:check).

## Current Parent
- Conversation ID: ab7867bc-ae1b-4117-a2cb-1cfa6cc0718a
- Updated: 2026-06-14T14:31:00Z

## Investigation State
- **Explored paths**:
  - `lib/data/geo.ts` (Data model for markets and `nearestMarkets` logic)
  - `app/[locale]/maerkte/page.tsx` (Current Markets Hub server component)
  - `components/sections/MarketsHub.tsx` (Current Markets Hub client component and Globe integration)
  - `messages/*.json` (Translation files `de.json`, `en.json`, `ar.json` containing `geo` and `geoContent` namespaces)
  - `eslint.config.mjs` (Linter rules, specifically `react/jsx-no-literals` and ignored directories)
  - `tests/step17.spec.ts` (Playwright tests for step 17)
- **Key findings**:
  - `GEO_MARKETS` has exactly 28 markets in `lib/data/geo.ts` matching the prototype `K_GEO`.
  - The translations in `messages/de.json`, `en.json`, and `ar.json` have identical key sets, including `geo` and `geoContent.<slug>` for all 28 markets, which is validated by `scripts/check-locale-parity.mjs`.
  - To respect `react/jsx-no-literals` without modifying the global config or message files, string constants like `const KM = "km"` must be defined in the component and used as dynamic expressions.
  - The ESLint config does not ignore `.agents/` directory, causing lint command to fail globally, but running `npx eslint app components lib` succeeds cleanly.
  - Next.js 15.3.0 compiles the project cleanly and pre-renders all 63 static pages (3 locales x 21 paths).
- **Unexplored areas**: None. The scope has been fully investigated.

## Key Decisions Made
- Propose a new folder structure: `app/[locale]/maerkte/[slug]/page.tsx` and a new presentation component: `components/sections/GeoCity.tsx`.
- Keep slug validation simple: load `GEO_MARKETS`, check if the slug exists; if not, call `notFound()`.
- Use next-intl's `.raw("geoContent")` dynamically retrieved via `getTranslations` to safely lookup slug-specific regulator, water, focus, and note data.
- Construct the `generateMetadata` function by building the `languages` dictionary dynamically from `routing.locales` and setting `x-default` to the German version.

## Artifact Index
- `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/explorer_step18_3/handoff.md` — Final Handoff Report for Step 18 pSEO City pages strategy.
