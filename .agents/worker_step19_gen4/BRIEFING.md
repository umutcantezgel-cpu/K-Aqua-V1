# BRIEFING — 2026-06-14T14:57:00Z

## Mission
Implement Next.js metadata and JSON-LD structured data for K-Aqua's web application across all 18 routes, ensuring canonical URLs, hreflangs, OpenGraph support, and test verification.

## 🔒 My Identity
- Archetype: implementer/qa/specialist
- Roles: implementer, qa, specialist
- Working directory: /Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step19_gen4
- Original parent: 199485d6-aaad-4ab9-9109-756fb3c76556
- Milestone: Step 19: SEO Metadata & JSON-LD

## 🔒 Key Constraints
- CODE_ONLY network mode (no external websites, no curl/wget/lynx targeting external URLs)
- Minimal change principle: only modify what is necessary
- No hardcoded test results or dummy/facade implementations
- Write only to our own workspace directory (.agents/worker_step19_gen4) for metadata files, and target code files directly
- Do not add new translation keys to JSON files if possible

## Current Parent
- Conversation ID: 199485d6-aaad-4ab9-9109-756fb3c76556
- Updated: yes

## Task Summary
- **What to build**: Next.js metadata utility (`lib/seo/metadata.ts`), JSON-LD script component (`components/seo/JsonLd.tsx`), global Organization schema integration in `app/[locale]/layout.tsx`, integrations across 18 routes under `app/[locale]/`, and Playwright test suite `tests/seo.spec.ts`.
- **Success criteria**: All 18 routes compile and render properly, with correct title formatting `* · K-Aqua`, canonical URLs, alternate hreflang tags, specific JSON-LD schemas (WebPage, Organization, ProductCatalog, Product + FAQPage), and pass all lint, typecheck, translation, build, and Playwright tests.
- **Interface contracts**: next-intl routing, Next.js Metadata API, Playwright test framework.
- **Code layout**: Source files under their respective project directories (`lib/`, `components/`, `app/`, `tests/`), metadata only in `.agents/worker_step19_gen4`.

## Key Decisions Made
- Replaced the missing translation key warning `about.brandEyebrow` on the `/unternehmen` page by using `about.eyebrow` ("Über uns") to keep translations clean and error-free without adding new locale keys.

## Change Tracker
- **Files modified**:
  - `app/[locale]/unternehmen/page.tsx`: Fixed missing message warning for brandEyebrow.
- **Build status**: PASS
- **Pending issues**: None

## Quality Status
- **Build/test result**: PASS (all 19 playwright tests passed)
- **Lint status**: PASS (zero errors)
- **Tests added/modified**: `tests/seo.spec.ts` E2E checks

## Artifact Index
- `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step19_gen4/handoff.md` — Final handoff report
- `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step19_gen4/progress.md` — Liveness heartbeat progress file
