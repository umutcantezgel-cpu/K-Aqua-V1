## 2026-06-14T12:54:28Z
You are a worker with role: Mega-Menu and LangPicker Developer.
Your working directory is /Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step08.
The project root directory is /Users/umurey/Downloads/kaqua-antigravity 2.

Objective:
Execute the task defined in /Users/umurey/Downloads/kaqua-antigravity 2/agents/08_mega_menu_and_lang.md.
Specifically:

1. Implement `/Users/umurey/Downloads/kaqua-antigravity 2/components/layout/MegaMenu.tsx` as an accessible client component:
   - Renders a fullscreen navigation overlay styled like the prototype `.k-mega` layout.
   - It must display 3 column groups:
     - Group 1: "tools" group (Produkte & Tools) -> items: `products` (url `/produkte`), `finder` (url `/produkte/finder`), `co2` (url `/co2-rechner`), `rfq` (url `/projektanfrage`), `solutions` (url `/loesungen`).
     - Group 2: "knowledge" group (Wissen & Vertrauen) -> items: `academy` (url `/academy`), `trust` (url `/trust-center`), `service` (url `/service`), `partner` (url `/partnerschaft`).
     - Group 3: "company" group (Unternehmen) -> items: `markets` (url `/maerkte`), `references` (url `/referenzen`), `about` (url `/unternehmen`), `career` (url `/karriere`), `news` (url `/news`), `contact` (url `/kontakt`).
   - Retrieves group headers from i18n key `groups.<id>` and item metadata (`[title, subtitle]`) from i18n key `pages.<id>` using next-intl translations.
   - Opens with a staggered fade/slide entrance animation using Framer Motion (import from `'motion/react'` or `'motion'`). Respects `useReducedMotion()` (fading only with no y movement if true).
   - Behavior:
     - Closes on clicking the background/backdrop, pressing `Escape`, or when the route changes.
     - Locks the background page scroll while active (e.g. settings `document.body.style.overflow = 'hidden'` and restoring it on cleanup).
     - Accessibility: Keyboard focus trap inside the dialog overlay using a `keydown` handler on Tab/Shift+Tab to keep focus within modal limits, has `role="dialog"`, and `aria-label` or `aria-labelledby`. Sets focus to the first active element upon opening.

2. Integrate `MegaMenu` in `components/layout/Header.tsx` so that clicking the Menu button displays the dropdown, toggles `aria-expanded` and scrolls lock, and matches header visual styles.

3. Verify that `/components/layout/LangPicker.tsx` displays checkmarks next to the active language and maps correctly inside the Header layout.

4. Verify that `pnpm build`, `pnpm lint`, `pnpm typecheck`, and `pnpm i18n:check` all pass successfully with zero warnings/errors.

Write a handoff report at `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step08/handoff.md`.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
