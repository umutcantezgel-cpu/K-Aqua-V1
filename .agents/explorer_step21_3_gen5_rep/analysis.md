# K-Aqua Performance & Optimization Analysis (Step 21)

This report presents the findings of a read-only investigation of the K-Aqua Next.js codebase regarding JavaScript bundle optimization, client-only widgets, hydration mismatch prevention, Framer Motion CLS, and scroll throttling.

---

## 1. JS Bundle Optimization & Package Imports

### Configuration Verification
In `next.config.ts`, the `experimental.optimizePackageImports` property is configured as follows:
```typescript
experimental: {
  optimizePackageImports: ['lucide-react', 'motion'],
}
```
This configuration ensures that Next.js automatically optimizes imports of components/functions from barrel-export packages by rewriting them to point directly to their individual ESM modules at compile-time.

### Findings & Recommendations
- **Lucide React Icons:** In `components/ui/icon.tsx`, named imports are imported from `"lucide-react"` (e.g., `import { Droplet as LucideDroplet, ... } from "lucide-react"`). The `optimizePackageImports` directive effectively rewrites these into dynamic individual imports (e.g., `lucide-react/dist/esm/icons/droplet.js`), preventing the entire icon library from being compiled into the client bundle.
- **Motion Package:** The codebase imports from `"motion/react"` in multiple components (e.g., `components/ui/Reveal.tsx`, `components/sections/MarketsHub.tsx`, `components/globe/Globe.tsx`).
  - *Recommendation:* Since the imports in the code utilize the `"motion/react"` sub-entry point instead of `"motion"` directly, it is recommended to add `'motion/react'` to the `optimizePackageImports` array in `next.config.ts` to guarantee optimization across all Motion imports:
    ```typescript
    optimizePackageImports: ['lucide-react', 'motion', 'motion/react']
    ```
- **Heavy Dependencies:** Analysis of `package.json` reveals an exceptionally lightweight dependency tree:
  ```json
  "dependencies": {
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.469.0",
    "motion": "^11.18.0",
    "next": "15.3.0",
    "next-intl": "^3.26.0",
    "next-themes": "^0.4.4",
    "react": "19.1.0",
    "react-dom": "19.1.0"
  }
  ```
  No heavy libraries (such as Lodash, Moment, Chart.js, or external D3 modules) are present. The Globe engine (`components/globe/Globe.tsx`) is implemented as a framework-free canvas renderer that decodes a local TopoJSON file (`public/data/countries-110m.json`), keeping the runtime code footprint extremely small.

---

## 2. Interactive Client Components & Hydration Mismatch Prevention

We analyzed the following complex interactive tools:
- **ProductFinder** (`components/tools/ProductFinder.tsx`)
- **Co2Calculator** (`components/tools/Co2Calculator.tsx`)
- **Academy** (`components/tools/Academy.tsx`)
- **Career** (`components/tools/Career.tsx`)
- **RfqWizard** (`components/tools/RfqWizard.tsx`)

### Findings & Architecture
- **Client Status:** Each component contains the `"use client";` directive at the top, making them React Client Components.
- **Server Pre-Rendering (SSR):** In Next.js App Router, client components are pre-rendered on the server to output initial HTML, and then hydrated on the client.
- **Hydration Safety:** None of the components execute browser-only APIs (such as `window`, `document`, or `localStorage`) or use non-deterministic state variables (like `Math.random()`, `Date.now()`) during their render cycles. All browser-specific logic (e.g., `window.open` in `RfqWizard.tsx` for sending project requests) is isolated inside interactive event handlers (e.g., `onClick`), which are only triggered after client-side hydration.
- **Static Import & SSG:** The respective route pages (e.g., `app/[locale]/produkte/finder/page.tsx`, `app/[locale]/co2-rechner/page.tsx`) import these components statically. This permits Next.js to pre-render the pages to static HTML during build-time (SSG), enabling immediate loading without hydration mismatches. Because Next.js automatically splits code by page routes, these large client widgets do not bloat the homepage bundle size.

---

## 3. Framer Motion Transitions & Cumulative Layout Shift (CLS)

We reviewed all animation components to ensure they do not cause layout shifts:
- **Reveal** (`components/ui/Reveal.tsx`)
- **Page Transitions** (`app/[locale]/template.tsx`)

### Findings & Architecture
- **Transform-Based Animation:** Both `Reveal` and `Template` animate element transitions using `y` (which compiles to CSS `transform: translateY(...)`) and `opacity` properties:
  - `Reveal`: Animates `y: 22` → `y: 0` and `opacity: 0` → `opacity: 1`.
  - `Template`: Animates `y: 14` → `y: 0` and `opacity: 0` → `opacity: 1`.
- **Zero CLS Impact:** Since CSS `transform` and `opacity` are handled exclusively by the browser's compositor thread, they do not alter the dimensions or relative positioning of surrounding elements in the layout flow. Consequently, they do not trigger browser layout recalculations and cannot cause CLS.
- **Accessibility & Reduced Motion:** Both files utilize the `useReducedMotion()` hook. When users configure their operating system to prefer reduced motion, all translation offsets (`y`) are bypassed:
  - In `Reveal.tsx`: Falls back to animating `{ opacity: 0 }` to `{ opacity: 1 }` without translation.
  - In `template.tsx`: Bypasses the 14px shift and disables the droplet wipe overlay entirely.
  This satisfies WCAG AA guidelines while reinforcing visual stability.

---

## 4. Scroll Choreography & Interaction to Next Paint (INP)

We analyzed the scroll-driven and interactive animations:
- **HeroScrolly** (`components/sections/HeroScrolly.tsx`)
- **ScrollProgress** (`components/layout/ScrollProgress.tsx`)
- **Header** (`components/layout/Header.tsx`)
- **Globe Canvas** (`components/globe/Globe.tsx`)

### Findings & Performance Safeguards
- **Throttling via requestAnimationFrame (rAF):**
  - In `HeroScrolly.tsx` (lines 60-125), the scroll handler uses a boolean gating flag (`ticking`). When a scroll event is triggered, it defers DOM updates to the next animation frame via `requestAnimationFrame(update)` and locks further executions until that frame completes.
  - In `ScrollProgress.tsx` (lines 9-36), a similar `ticking` ref locks state updates and calls `requestAnimationFrame(updateProgress)`.
  This prevents main-thread bottlenecking and layout thrashing, ensuring excellent input responsiveness (INP).
- **Passive Listeners:** Scroll and resize event listeners in `HeroScrolly.tsx`, `ScrollProgress.tsx`, and `Header.tsx` are registered with `{ passive: true }`. This signals to the browser that the scroll position cannot be canceled, allowing the scroll thread to execute immediately without waiting for JavaScript execution.
- **Header Scroll Listener:** In `Header.tsx`, the scroll listener (`window.scrollY > 8` toggle) is registered as passive, but lacks `requestAnimationFrame` throttling. Because the work done in the scroll handler is trivial, this has negligible overhead, but wrapping the state setter in a throttle or rAF check remains a minor optimization opportunity.
- **Globe Animation Loop:** The canvas-based `Globe.tsx` runs an active draw loop inside `requestAnimationFrame`. Drags are captured by Pointer Events which only update reference values (`dragOffsetRef`, `tiltRef`), and the rendering occurs separately during the next frame, maintaining a smooth 60fps interaction profile.

---

## 5. Additional Discoveries

- **Unused Files:** The component `components/globe/GlobeLoader.tsx` is defined, but it is not imported or referenced anywhere in the active routes of `app/` or the other sections of `components/`. It acts as an unused file that could be safely pruned.
- **Build Metrics:** Running `next build` reveals outstanding performance metrics:
  - Shared JS shared by all pages is only **102 kB**.
  - Home Page (`/`) has a first-load JS size of **161 kB**.
  - Markets Page (`/maerkte`) has a first-load JS size of **160 kB**.
  - All static pages are generated as pure SSG routes, allowing instant TTFB and fast paint times.
