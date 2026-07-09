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

## Follow-up — 2026-07-09T10:36:26Z

# Teamwork Project Prompt — Draft

> Status: Launched
> Goal: Teamwork Multi-Agent System is currently executing.

K-Aqua V2 Multi-Agent Execution: Target a high-impact core slice (Frontend Architecture & 3D WebGL Pipeline) of the V2 vision using a massive swarm of >20 subagents. The goal is to build an award-winning foundation that validates the multi-agent approach before expanding to the rest of the documents.

Working directory: ~/Downloads/K-Aqua-V1-main
Integrity mode: development

## Requirements

### R1. Frontend Architecture Implementation
Implement the ultra-performance Next.js 15 architecture outlined in `02_Frontend_Architecture_Nextjs15.md` (React Server Components, Suspense boundaries, caching layers).

### R2. 3D WebGL Pipeline Implementation
Integrate the interactive 3D WebGL product catalog as defined in `05_Advanced_3D_WebGL_Pipeline.md` using React Three Fiber, optimized shaders, and efficient asset loading.

## Acceptance Criteria

### Programmatic Verification
- [ ] Running `npm run build` completes successfully with exit code 0.
- [ ] No React hydration errors or console errors appear on the initial render of the homepage.

### Qualitative Verification (Agent-as-Judge)
- [ ] An independent Auditor Agent reviews the final codebase and confirms that the implementation strictly adheres to the world-class standards defined in `02_Frontend_Architecture_Nextjs15.md` and `05_Advanced_3D_WebGL_Pipeline.md`.
