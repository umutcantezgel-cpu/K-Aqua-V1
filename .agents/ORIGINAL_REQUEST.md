# Original User Request

## Initial Request — 2026-06-14T12:19:53Z

# Teamwork Project Prompt — Draft

> Status: Step 1 — Eliciting project idea
> Goal: Craft prompt → get user approval → delegate to teamwork_preview

Implement the complete frontend for the K-Aqua corporate website, porting a provided HTML/JS prototype into a production-ready Next.js 15 app following a rigid 26-step sequential plan.

Working directory: /Users/umurey/Downloads/kaqua-antigravity 2

## Requirements

### R1. Complete the 26 sequential work packages
Execute the tasks defined in `agents/01_*.md` through `agents/26_handover.md` strictly in order, fully adhering to `agents/RULES.md`. Ensure each step's Definition of Done is met.

### R2. Strict i18n & Pure Languages
No hardcoded user-visible text. All text must use `next-intl`. `de`, `en`, and `ar` are enabled. Do not invent translations or mix languages.

### R3. Media & Content placeholders
Do not insert images or make up data. Use `<MediaSlot>` for images and retain `// TODO(content)` for placeholders like CO2 factors and certificates.

### R4. Design & A11y Fidelity
Only use semantic Tailwind tokens (no hex colors in markup). Enforce accessibility (WCAG AA, focus states, min 44px targets) and strict RTL logical properties.

## Acceptance Criteria

### Execution & Build
- [ ] `pnpm build` completes with zero errors or warnings.
- [ ] All 135 pages (18 routes + 27 geo pages across 3 locales) are statically generated (SSG) where specified.

### Code Quality & i18n
- [ ] `pnpm lint` and `pnpm typecheck` pass successfully.
- [ ] `pnpm i18n:check` passes, confirming identical key sets for all locales.
- [ ] No hardcoded text is present in the UI (enforced via `react/jsx-no-literals`).

### Validation
- [ ] All 26 steps in `docs/AGENT_LOG.md` are checked off.
