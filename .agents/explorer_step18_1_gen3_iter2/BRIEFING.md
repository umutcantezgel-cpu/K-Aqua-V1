# BRIEFING — 2026-06-14T07:35:59-07:00

## Mission
Analyze how to resolve the hardcoded `PROD_NOTES` translation bypass in `GeoCity.tsx` by adding a `"prodNote"` key in the `"geo"` namespace across 12 translation files.

## 🔒 My Identity
- Archetype: Explorer
- Roles: Teamwork explorer (Explorer 1)
- Working directory: /Users/umurey/Downloads/kaqua-antigravity 2/.agents/explorer_step18_1_gen3_iter2
- Original parent: ab7867bc-ae1b-4117-a2cb-1cfa6cc0718a
- Milestone: Step 18 Iteration 2

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- Examine all 12 localization dictionary files under `/Users/umurey/Downloads/kaqua-antigravity 2/messages/`
- Propose adding a new translation key `"prodNote"` inside the `"geo"` namespace for all of them
- Provide the exact JSON segments to be inserted
- Write findings to `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/explorer_step18_1_gen3_iter2/handoff.md`

## Current Parent
- Conversation ID: ab7867bc-ae1b-4117-a2cb-1cfa6cc0718a
- Updated: 2026-06-14T07:38:00-07:00

## Investigation State
- **Explored paths**:
  - `components/sections/GeoCity.tsx` (lines 1-360)
  - `app/[locale]/maerkte/[slug]/page.tsx` (lines 1-133)
  - `package.json` (lines 1-43)
  - `scripts/check-locale-parity.mjs` (lines 1-82)
  - `messages/en.json` (lines 120-150)
  - `messages/de.json` (lines 120-141)
  - `messages/ar.json` (lines 120-141)
  - `messages/es.json` (lines 130-142)
  - `messages/zh.json` (lines 130-142)
- **Key findings**:
  - `PROD_NOTES` is currently hardcoded in `GeoCity.tsx` (lines 63-67) for locales `de`, `en`, and `ar`.
  - The `"geo"` namespace inside all 12 translation JSON files (`messages/*.json`) starts at line 120, with the final key `"nearby"` on line 139 and namespace close `  },` on line 140.
  - Parity check script `scripts/check-locale-parity.mjs` is run via `npm run i18n:check` to ensure all key paths are synchronized.
- **Unexplored areas**: None. The investigation is complete.

## Key Decisions Made
- Confirmed placement of `"prodNote"` at the end of the `"geo"` namespace in all 12 files.
- Provided exact replacement JSON blocks using the original `de`, `en`, and `ar` translations, with all other 9 languages falling back to the `en` translation.

## Artifact Index
- ORIGINAL_REQUEST.md — original request log
- BRIEFING.md — current briefing state
- handoff.md — Explorer 1 findings and proposed changes
