# BRIEFING — 2026-06-14T08:24:30-07:00

## Mission
Implement Step 20: Sitemap, Robots, OG, and Manifest.

## 🔒 My Identity
- Archetype: implementer
- Roles: implementer, qa, specialist
- Working directory: /Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step20_gen4
- Original parent: 199485d6-aaad-4ab9-9109-756fb3c76556
- Milestone: Step 20: Sitemap, Robots, OG, and Manifest

## 🔒 Key Constraints
- Exactly 135 sitemap entries (17 static * 3 locales = 51 pages; 28 dynamic * 3 locales = 84 pages).
- Alternatives listing hreflangs for de, en, ar, and x-default (pointing to de).
- Homepage URLs must end in `/` (e.g. `https://k-aqua.de/de/`), while subpages must not (e.g. `https://k-aqua.de/de/produkte`).
- `robots.ts` must reference `/sitemap.xml` and specify host.
- `manifest.ts` returns Web App Manifest (purple `#5B2D8C`, background `#FAFAFA`, icon-192.png, icon-512.png).
- Dynamic opengraph image files (`app/[locale]/opengraph-image.tsx` and `app/[locale]/maerkte/[slug]/opengraph-image.tsx`) under Edge runtime loading `fonts/outfit-bold.ttf` dynamically.
- E2E verification test file at `tests/step20.spec.ts`.
- Genuine implementation with no hardcoding or facade test/verification results.

## Current Parent
- Conversation ID: 199485d6-aaad-4ab9-9109-756fb3c76556
- Updated: not yet

## Task Summary
- **What to build**: Next.js sitemap, robots, manifest, dynamic opengraph images, and Playwright E2E verification test.
- **Success criteria**: Valid sitemap with 135 entries (correct URL endings), valid robots.txt, valid manifest, dynamic OG images rendering on edge, passing Playwright tests, passing lint/typecheck/build.
- **Interface contracts**: Sitemap URLs trailing slash constraint.
- **Code layout**: Source in `app`, tests in `tests`.

## Key Decisions Made
- Used the TrueType font `fonts/outfit-bold.ttf` as provided by the user/system instead of `fonts/outfit-variable-latin.woff2` to resolve the `Unsupported OpenType signature wOF2` error thrown by Satori/`ImageResponse`.
- Cleared Next.js compilation cache (`rm -rf .next`) to solve stale ESLint and cache parsing errors, achieving a 100% clean production build.
- Used case-insensitive substring checks for `robots.txt` assertions to avoid rigid letter-case dependency failures in E2E tests.

## Change Tracker
- **Files modified**:
  - `app/sitemap.ts` (created) — return sitemap with 135 entries, alternates, and correct slash endings
  - `app/robots.ts` (created) — return robots.txt with sitemap and host rules
  - `app/manifest.ts` (created) — return manifest.webmanifest config
  - `app/[locale]/opengraph-image.tsx` (created) — general route dynamic OG image (using `fonts/outfit-bold.ttf`)
  - `app/[locale]/maerkte/[slug]/opengraph-image.tsx` (created) — market route dynamic OG image (using `fonts/outfit-bold.ttf`)
  - `tests/step20.spec.ts` (created) — E2E verification test file
- **Build status**: PASS
- **Pending issues**: None

## Quality Status
- **Build/test result**: PASS (E2E tests pass 167/167)
- **Lint status**: PASS (0 warnings or errors)
- **Tests added/modified**: `tests/step20.spec.ts` (covers sitemap, robots, manifest, and OG images)

## Loaded Skills
- None

## Artifact Index
- `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step20_gen4/progress.md` — Progress tracker
- `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step20_gen4/handoff.md` — Final handoff report
