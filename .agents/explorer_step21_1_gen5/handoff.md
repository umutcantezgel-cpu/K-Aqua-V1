# Handoff Report - Explorer 1 (Step 21)

This report details observations and recommendations for the Globe component performance optimizations, local data loading, Largest Contentful Paint (LCP) mitigation, and Cumulative Layout Shift (CLS) remediation.

---

## 1. Observation

### Globe Loading Mechanism
* **dynamic(ssr: false)**:
  * In `components/sections/References.tsx` (Lines 14-17):
    ```typescript
    const Globe = dynamic(
      () => import("@/components/globe/Globe").then((mod) => mod.Globe),
      { ssr: false }
    );
    ```
  * In `components/sections/MarketsHub.tsx` (Lines 15-18):
    ```typescript
    const Globe = dynamic(
      () => import("@/components/globe/Globe").then((mod) => mod.Globe),
      { ssr: false }
    );
    ```
  * In `components/sections/HeroScrolly.tsx` (Lines 14-17):
    ```typescript
    const Globe = dynamic(
      () => import('@/components/globe/Globe').then((mod) => mod.Globe),
      { ssr: false }
    );
    ```
* **Fetch Path**:
  * In `components/globe/Globe.tsx` (Line 114):
    ```typescript
    globalFetchPromise = fetch('/data/countries-110m.json')
    ```
  * Checked `public/data/countries-110m.json` file is present locally in the workspace.

### CLS Triggers
* **MarketsHub.tsx** (Lines 49, 54, 201-204) & **References.tsx** (Lines 49, 121-123):
  * Dynamic layout size sizing using inline styles:
    ```tsx
    style={{ width: globeSize + 48, height: globeSize + 48 }}
    ```
  * Sizing is recalculated inside `useEffect` post-mount (mobile screens shift from `508px` to `368px`).
* **HeroScrolly.tsx** (Lines 43, 57, 219, 235):
  * State variable `mounted` defaults to `false`. On desktop, `useEffect` toggles `staticMode` from `true` to `false`.
  * Layout shifts from static grid section to `380vh` sticky stage component, shifting subsequent content.
  * Static viewport size container uses hardcoded width:
    ```tsx
    <div className="w-[480px] h-[480px] relative">
    ```

---

## 2. Logic Chain

1. **SSR and Lazy Loading**: Because Next.js dynamically loads the Globe with `ssr: false`, the Canvas elements do not run on the server. However, since they run immediately on client mount, below-the-fold pages (like Markets and References) experience unnecessary CPU thread usage during page load. Applying an Intersection Observer (e.g. `LazyGlobe` wrapper) will defer execution until the element enters the viewport.
2. **Topography Data**: The Globe component fetches from `/data/countries-110m.json`, which points to a local static resource. Since `public/data/countries-110m.json` exists in the local directory and there are no runtime fetches to external CDNs like `unpkg.com` in the code, the typography data is fully vendored.
3. **LCP Prevention**: HTML `<canvas>` elements are not LCP candidates under Chromium criteria. Therefore, the Globe canvas itself cannot trigger LCP. However, LCP can still be impacted if:
   * Fallback states render text nodes or images.
   * Font loading is delayed (preventable via local preloading with `swap`).
   * By lazy mounting the Globe below the fold, it is completely removed from the initial paint sequence.
4. **CLS Remediation**:
   * For the Markets and References pages, the Globe container has no sizing rules in HTML/CSS before hydration, and updates its size post-hydration on mobile. Setting Tailwind classes like `w-[368px] h-[368px] sm:w-[428px] sm:h-[428px] lg:w-[508px] lg:h-[508px]` ensures the layout remains stable.
   * For the Home page (`HeroScrolly.tsx`), the post-hydration swap from static grid to `380vh` scrollytelling container shifts the entire document. Rendering a unified container and using CSS visibility classes (or standard CSS media queries) avoids this layout swap.
   * The `w-[480px]` hardcoded container size on mobile overflows narrow screens. Fluid layout classes like `w-full max-w-[480px] aspect-square` resolve the overflow.

---

## 3. Caveats

* Assumed that Chromium LCP specifications apply (where canvas elements are excluded from LCP calculations). On browsers that do include canvas in LCP calculations (if any), lazy-loading below the fold protects the page.
* Did not examine third-party tracking scripts (none present in the codebase currently, keeping compliance with RULES).

---

## 4. Conclusion

1. **SSR Wrapping & Lazy Mount**: The Globe is correctly wrapped in `dynamic(ssr: false)`. To optimize load performance, it should be wrapped in an Intersection Observer-based `LazyGlobe` wrapper.
2. **Local Topography Data**: The topography JSON is fetched strictly from local static path `/data/countries-110m.json`, matching project requirement RULE 9.
3. **LCP Prevention**: Canvas is not an LCP candidate. Preloading local fonts with `display: 'swap'` ensures above-the-fold headings remain the LCP element.
4. **CLS Issues**: Three major CLS issues exist (state-based post-hydration resizing, `HeroScrolly` DOM layout swap, and hardcoded `w-[480px]` container). Sizing classes and unified DOM containers must be implemented to resolve these.

---

## 5. Verification Method

* Run static verification commands:
  ```bash
  pnpm lint
  pnpm typecheck
  pnpm build
  ```
* Run local performance check:
  ```bash
  pnpm start
  ```
* Inspect elements in browser rendering tab to check for layout shifts.
* **Invalidation conditions**:
  * An external CDN fetch to `unpkg.com` for topography data is found at runtime.
  * Loading fallback states display visible text or images that trigger LCP.
