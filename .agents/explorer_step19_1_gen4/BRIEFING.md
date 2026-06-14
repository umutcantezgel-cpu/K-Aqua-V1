# BRIEFING — 2026-06-14T07:47:00-07:00

## Mission
Explore the codebase to identify active pages, root metadata setup, message keys for SEO, and design the helper utility lib/seo/metadata.ts.

## 🔒 My Identity
- Archetype: Teamwork explorer
- Roles: Read-only investigation, analyze problems, synthesize findings, produce structured reports
- Working directory: /Users/umurey/Downloads/kaqua-antigravity 2/.agents/explorer_step19_1_gen4
- Original parent: 199485d6-aaad-4ab9-9109-756fb3c76556
- Milestone: Step 19: SEO Metadata & JSON-LD

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- Network Restrictions: CODE_ONLY mode (no external web access)

## Current Parent
- Conversation ID: 199485d6-aaad-4ab9-9109-756fb3c76556
- Updated: 2026-06-14T07:45:47-07:00

## Investigation State
- **Explored paths**:
  - `app/` and `app/[locale]/` directories
  - `app/[locale]/layout.tsx`, `app/[locale]/page.tsx`, and individual pages like `academy/page.tsx`, `co2-rechner/page.tsx`, `impressum/page.tsx`, `maerkte/[slug]/page.tsx`
  - `messages/` translations files (`de.json`, `en.json`, `ar.json`)
  - `lib/i18n/routing.ts` and `lib/i18n/navigation.ts`
- **Key findings**:
  - Identified 18 active page routes under `app/[locale]` (excluding dev routes).
  - Found `app/[locale]/layout.tsx` lacks metadata definition, but properly handles HTML language (`lang`) and text direction (`dir`) dynamically.
  - Page `app/[locale]/page.tsx` is marked with `'use client'`, which prevents direct metadata export. Needs refactoring into a Server Component page wrapper.
  - Translation files have no SEO keys; we must add a root-level `"seo"` block for all pages.
  - Found custom dynamic SEO implementation already active in `app/[locale]/maerkte/[slug]/page.tsx`.
- **Unexplored areas**:
  - None. Codebase search is fully complete.

## Key Decisions Made
- Designed a unified metadata helper `lib/seo/metadata.ts` that outputs hreflang alternates (de, en, ar, and x-default pointing to de), canonical URLs, and OpenGraph/Twitter details.
- Structured new `"seo"` translation block format for translation files.
- Designed JSON-LD schema generation helper `lib/seo/jsonld.ts` for Organization, WebSite, LocalBusiness, and VideoObject schemas.

## Artifact Index
- /Users/umurey/Downloads/kaqua-antigravity 2/.agents/explorer_step19_1_gen4/handoff.md — Handoff report with findings and designs
