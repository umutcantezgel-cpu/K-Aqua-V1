## 2026-06-14T13:01:30Z
You are Step 09 Worker. Your task is to implement Step 09: Page-Transitions and resolve two minor findings from Step 08 in the codebase at `/Users/umurey/Downloads/kaqua-antigravity 2`.

Please save your coordination metadata (progress.md, handoff.md) in your own folder: `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step09`.

### Tasks:
1. **Implement Page Wipe Transition in `app/[locale]/template.tsx`**:
   - This component must be a client component ('use client') so it runs client-side animations on page transitions.
   - It should wrap page content in a `motion.div` from `motion/react` with:
     - `initial={{ opacity: 0, y: 14 }}`
     - `animate={{ opacity: 1, y: 0 }}`
     - `transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}`
   - Provide a Wipe-Overlay (e.g. using `AnimatePresence` or conditional state management in React) that triggers when the template mounts (i.e. on route change):
     - The overlay uses background `var(--inverse-surface)`.
     - It wipes up from the bottom (translateY from '100%' to '0%') and wipes out to the top (translateY from '0%' to '-100%').
     - Top border radius starts rounded (e.g. `borderTopLeftRadius`/`borderTopRightRadius` is `"40% 8%"`) and flattens to `"0px"` as it covers the screen.
     - When exiting, the bottom border radius becomes rounded (e.g. `borderBottomLeftRadius`/`borderBottomRightRadius` transitions to `"40% 8%"`).
     - Centered droplet icon (`<Droplet size={56} strokeWidth={1.5} />` from `@/components/ui/icon.tsx`) flashes: scale goes from 0.6 (opacity 0) to 1.0 (opacity 1) at ~42%-58% when screen is covered, then to 1.25 (opacity 0) when exiting.
     - Transition ease: `--ease-wipe` which is `cubic-bezier(0.76, 0, 0.24, 1)`.
     - Total duration: ~820ms.
     - Use the `useReducedMotion()` hook from `motion/react`. If the user prefers reduced motion, only perform a fade-in animation for the content (opacity from 0 to 1, no y displacement), and do NOT render/show the wipe overlay.
     - Make sure the overlay is **completely removed/unmounted** from the DOM when the transition ends so it does not block pointer-events.
2. **Resolve Step 08 Reviewer Findings**:
   - **Focus Restoration**: In `components/layout/MegaMenu.tsx`, capture the `document.activeElement` (the triggering menu button) on mount, and restore focus to it when the menu unmounts/closes.
   - **Redundant Scroll Lock**: In `components/layout/MegaMenu.tsx`, remove `document.body.style.overflow = 'hidden'` scroll locking. Ensure all body scroll locking side-effects are consolidated and managed in the parent `components/layout/Header.tsx` (which controls mounting/unmounting of the menu).
3. **Verification**:
   - Run verification checks: `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm i18n:check`. All must pass successfully.
   - Write a detailed handoff report in `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step09/handoff.md`.

### MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Please report back when you are finished.
