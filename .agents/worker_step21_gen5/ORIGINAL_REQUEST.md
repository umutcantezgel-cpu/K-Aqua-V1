## 2026-06-14T15:21:53Z

You are the Step 21 Performance Optimization Worker (conversational subagent).
Your working directory is `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step21_gen5`.
The project files are located at `/Users/umurey/Downloads/kaqua-antigravity 2`.

Please implement Step 21: Performance Optimization based on the explorers' findings:

### 1. Font Optimization
- Revert `fonts/outfit-variable-latin.woff2` to the true variable Outfit font (size ~32KB) by copying it from `/Users/umurey/Downloads/kaqua-antigravity/fonts/outfit-variable-latin.woff2`.
- Copy the system font `/System/Library/Fonts/Supplemental/Arial.ttf` (or `Arial Bold.ttf`) to `fonts/outfit-bold.ttf` in the project.
- Update `app/[locale]/opengraph-image.tsx` and `app/[locale]/maerkte/[slug]/opengraph-image.tsx` to fetch/load `fonts/outfit-bold.ttf` instead of `fonts/outfit-variable-latin.woff2`.
- In `next.config.ts`, add `'motion/react'` to the `experimental.optimizePackageImports` array (so it includes `'lucide-react'`, `'motion'`, and `'motion/react'`).

### 2. Globe Optimization (CLS & Intersection Observer)
- Update `components/globe/Globe.tsx` to:
  - Wrap the dynamic rendering loop and fetching inside an `IntersectionObserver`. Only fetch `/data/countries-110m.json` and start the requestAnimationFrame rendering loop when the canvas enters the viewport (intersecting). If it exits the viewport, stop the requestAnimationFrame loop to save CPU/GPU cycles.
  - Sizing: Remove the inline style rules `width: size` and `height: size` on the canvas, and use class name `w-full h-full` on the canvas. Use `ResizeObserver` inside `Globe.tsx` on mount/resize to measure the actual bounding rect width of the canvas, store it in a React Ref (e.g. `currentSizeRef`), and use it to update the drawing buffer (`canvas.width` and `canvas.height` scaled by DPR) and re-scale the context. Read the size from `currentSizeRef.current` inside the draw loop to avoid layout thrashing.
- Update `components/sections/MarketsHub.tsx`, `components/sections/GeoCity.tsx`, and `components/sections/References.tsx` to:
  - Remove the `globeSize` component state and the window resize useEffect logic.
  - Style the canvas parent wrapper divs with responsive Tailwind classes to enforce a stable layout height/width before hydration:
    - `MarketsHub.tsx`: `w-[368px] h-[368px] sm:w-[428px] sm:h-[428px] lg:w-[508px] lg:h-[508px]`
    - `GeoCity.tsx`: `w-[252px] h-[252px] sm:w-[312px] sm:h-[312px]`
    - `References.tsx`: `w-[368px] h-[368px] md:w-[508px] md:h-[508px]`
  - Pass the responsive container to `<Globe>` (it will dynamically adapt to its parent size).

### 3. Unused File Cleanup
- Delete the unused file `components/globe/GlobeLoader.tsx`.

### 4. Verification & Reporting
- Ensure the application builds and passes checks:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm i18n:check`
  - `pnpm build`
  - Run all playwright E2E tests (`npx playwright test`) to confirm zero regressions.
- Generate a Lighthouse audit report for Mobile profile on Home, `/maerkte`, and one Geo-page. Confirm that Performance >= 95, LCP < 2.0s, and CLS < 0.1. Save this audit report as `docs/lighthouse.md`.
- Save your implementation findings and output results in `handoff.md` in your working directory. Send a message to the orchestrator (daf166fc-d932-4fd7-af4d-5ce1d4dc192c) reporting completion.
