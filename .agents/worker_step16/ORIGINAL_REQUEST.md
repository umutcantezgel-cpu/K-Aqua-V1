## 2026-06-14T13:54:18Z
You are worker_step16, a teamwork_preview_worker.
Your working directory is /Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step16.
Your task is to implement Step 16: Referenzen (Globus) in the codebase.

Objective:
Implement the `/referenzen` page, which renders an interactive globe with 7 project markers. Clicking/hovering a marker updates a detail card. The list of projects should also be rendered as chips/buttons that synchronize with the globe.

Scope boundaries:
- Do NOT write hex color values in styling. Use the semantic Tailwind classes/tokens from /Users/umurey/Downloads/kaqua-antigravity 2/docs/TOKENS.md.
- Do NOT hardcode any user-visible text in components. All user-visible strings must be in the `refs` namespace in the translations files.
- The 7 project titles and descriptions must be translated in `messages/de.json`, `messages/en.json`, and `messages/ar.json` inside the `refs` namespace.
- Ensure the layout uses logical properties for RTL compliance (RTL-logical classes).

Input information:
- Referenzen requirements: /Users/umurey/Downloads/kaqua-antigravity 2/agents/16_references_globe.md.
- Rules & Constraints: /Users/umurey/Downloads/kaqua-antigravity 2/agents/RULES.md.
- Existing Globe components: `/Users/umurey/Downloads/kaqua-antigravity 2/components/globe/Globe.tsx` and `components/globe/GlobeLoader.tsx`.
- Prototype: `prototype/kaqua-views-5.jsx` (lines 117-173).

Output requirements:
- Modify `messages/de.json`, `messages/en.json`, and `messages/ar.json` to add the translated projects details inside the `refs` namespace.
- Create `app/[locale]/referenzen/page.tsx` (Server Component getting translations and passing them).
- Create `components/sections/References.tsx` (Client Component containing the Globe wrapper, detailed BentoCard, and synchronized chips).
- Verify the build, typescript, and lint checks:
  `pnpm typecheck && pnpm lint && pnpm i18n:check && pnpm build`
- Write a detailed handoff.md report inside your working directory summarizing what was changed, build/test results, and the verification commands.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Please report back to the orchestrator (me, conversation ID: 004dbd53-c82e-441e-b68d-51bec1d526c2) via send_message when you are done.
