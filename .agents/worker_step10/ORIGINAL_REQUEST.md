## 2026-06-14T13:05:56Z

You are Step 10 Worker. Your task is to implement Step 10: Globus-Engine in the codebase `/Users/umurey/Downloads/kaqua-antigravity 2`.

Please save your coordination metadata (progress.md, handoff.md) in your own folder: `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step10`.

### Tasks:
1. **Check off Step 09**:
   - Update `docs/AGENT_LOG.md` to check off `Agent 09`.
2. **Implement TopoJSON Vendoring Script**:
   - Create `scripts/vendor-topojson.mjs` (referenced in `package.json` under script `"vendor:geo": "node scripts/vendor-topojson.mjs"`).
   - This script must fetch the world-atlas `countries-110m.json` file from `https://unpkg.com/world-atlas@2.0.2/countries-110m.json` and save it locally to `public/data/countries-110m.json`. Create the directory if it does not exist.
   - Run this script so that `public/data/countries-110m.json` is generated locally and available for use during building and runtime.
3. **Implement Canvas Globe Component in `components/globe/Globe.tsx`**:
   - Port the framework-free canvas loading and rendering logic verbatim from `prototype/kaqua-loader.js` (lines 8-289) to a React client component (`'use client'`). Do NOT invent a new globe library or use heavy dependencies like Three.js; make sure to adapt the prototype's lightweight, high-performance canvas orthographic rendering.
   - Fetch the TopoJSON data at runtime from `/data/countries-110m.json` (local only, no external queries). Decode the arcs using the decoded TopoJSON mesh logic from the prototype.
   - Implement free 360-degree drag-to-rotate interaction (unlimited yaw, ±83 degrees pitch limit) with smooth inertia decay on release (decay ~0.95 per frame).
   - Implement `flyTo(lon, lat)` centering shortest-path longitude and latitude using `easeInOutCubic` easing over a duration of ~900ms.
   - Render interactive markers (dot + pulsing ring). On hover/active state, show a clean Canvas-drawn label matching the prototype styles. Support callbacks `onMarkerClick` and `onDrag`.
   - Ensure the canvas is `devicePixelRatio`-aware, uses a proper `requestAnimationFrame` render loop, and implements a full cleanup phase (stopping the loop, removing listeners) on unmount.
   - Support accessibility: check `useReducedMotion()` from `motion/react`. If the user prefers reduced motion, disable auto-rotation and momentum, displaying a static canvas globe.
   - Props to support: `size`, `markers` (array of objects with `lon`, `lat`, `title`, `label`), `interactive` (boolean), `speed` (auto-rotation factor), `whirl` (boolean for Loader comet trails).
4. **Implement Fullscreen Splash Loader in `components/globe/GlobeLoader.tsx`**:
   - Create a fullscreen loading screen using a 200px monochrome brand purple (OKLCH color or token) globe on an off-white background with three orbiting comet trails (`whirl={true}` option).
   - Set a minimum display time of 1.4s and a hard timeout of 8s (to automatically hide the overlay and prevent trapping the user).
   - Ensure it can be used cleanly as a React Suspense fallback.
   - Dynamic Loading: ensure that in normal pages, the main `Globe` component is loaded using `next/dynamic` with `ssr: false` to avoid server-rendering the canvas and improve LCP.
5. **Create a Development/Verification Page**:
   - Implement `app/[locale]/dev/globe/page.tsx` (accessible at `/de/dev/globe`, `/en/dev/globe`, `/ar/dev/globe`).
   - Render a 520px-size interactive globe.
   - Add a trigger (e.g. button) to demonstrate `flyTo` transitions between distant locations (e.g., London and Sydney).
   - Include test markers to verify hover labels, clicking callbacks, dragging, and reduced motion functionality.
6. **Build and Verification**:
   - Run: `pnpm typecheck`, `pnpm lint`, `pnpm build`, `pnpm i18n:check`. Ensure all pass.
   - Document all changes and outputs in `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step10/handoff.md`.
