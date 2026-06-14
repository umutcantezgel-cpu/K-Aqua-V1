# BRIEFING — 2026-06-14T06:55:00-07:00

## Mission
Implement the /referenzen page with an interactive globe, 7 project markers, a detail card, and synchronized filter/selection chips, using translations in refs namespace and following strict token constraints and RTL compliance.

## 🔒 My Identity
- Archetype: teamwork_preview_worker
- Roles: implementer, qa, specialist
- Working directory: /Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step16
- Original parent: 004dbd53-c82e-441e-b68d-51bec1d526c2
- Milestone: Referenzen (Globus)

## 🔒 Key Constraints
- Do NOT write hex color values in styling. Use Tailwind classes/tokens from docs/TOKENS.md.
- Do NOT hardcode user-visible text. Use `refs` namespace in messages/de.json, messages/en.json, and messages/ar.json.
- Maintain RTL compliance using logical properties (RTL-logical classes).
- Verify with `pnpm typecheck && pnpm lint && pnpm i18n:check && pnpm build`.
- Must not cheat or hardcode values.

## Current Parent
- Conversation ID: 004dbd53-c82e-441e-b68d-51bec1d526c2
- Updated: 2026-06-14T06:55:00-07:00

## Task Summary
- **What to build**: /referenzen route, References client component with Globe, details BentoCard, and synchronized chips.
- **Success criteria**: Functional interactive globe with 7 project markers, sync with chips, full responsiveness, dynamic detail card updating on click/hover, passing typecheck/lint/build, RTL support.
- **Interface contracts**: /Users/umurey/Downloads/kaqua-antigravity 2/agents/16_references_globe.md and /Users/umurey/Downloads/kaqua-antigravity 2/agents/RULES.md.
- **Code layout**: App router layout, page in `app/[locale]/referenzen/page.tsx`, components in `components/sections/References.tsx`.

## Key Decisions Made
- Added the 7 reference projects data inside the `refs` namespace of all JSON files in `/messages` using a script. This keeps locales synchronized and avoids hardcoded content.
- Loaded the Globe component dynamically with `{ ssr: false }` to avoid Next.js hydration mismatch on `<canvas>`.
- Mapped references to `GlobeMarker` elements, using the city name as the `label` parameter to render hover tooltip on the globe canvas.
- Integrated a split logic in `getCityName` for LTR `,` and RTL `،` commas to support English and Arabic translations perfectly.
- Utilized standard layout styling tokens (`bg-background-subtle`, `text-foreground`, `shadow-diffuse`, etc.) and RTL-logical flex patterns (`justify-start`, `text-start`) for a premium look & RTL support.

## Artifact Index
- `.agents/worker_step16/ORIGINAL_REQUEST.md` — Original request copy
- `.agents/worker_step16/BRIEFING.md` — Current state & briefing
- `.agents/worker_step16/progress.md` — Progress tracker
- `messages/de.json`, `en.json`, `ar.json` (and all other 9 language files) — Translated project details added in `refs.projects`
- `app/[locale]/referenzen/page.tsx` — Server Page component for the references view
- `components/sections/References.tsx` — References Client Component wrapping dynamic Globe, detail Card, and FilterChips
- `tests/step16.spec.ts` — Playwright E2E integration tests for step 16

## Change Tracker
- **Files modified**:
  - `messages/de.json` — German project details
  - `messages/en.json` — English project details
  - `messages/ar.json` — Arabic project details
  - `messages/{es,fr,it,nl,pl,pt,ru,tr,zh}.json` — Key parity synced
- **Files created**:
  - `app/[locale]/referenzen/page.tsx` — Page route
  - `components/sections/References.tsx` — Client interface
  - `tests/step16.spec.ts` — Integration tests
- **Build status**: Pass (Typecheck, Lint, i18n parity check, Next build are clean)

## Quality Status
- **Build/test result**: Pass
- **Lint status**: 0 errors/warnings
- **Tests added/modified**: Created E2E Playwright tests checking German details, Dubai chip click update, English translations, and Arabic RTL translations.
