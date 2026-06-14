# Handoff Report — Explorer 1 (Step 21)

This report summarizes the performance investigation of the Globe component and its loading mechanism.

## 1. Observation

### Globe References and Dynamic Importing
Across the project codebase, the Globe component is dynamically imported using Next.js `dynamic(..., { ssr: false })` in four components under `components/sections/`:

1.  **`components/sections/HeroScrolly.tsx` (Lines 14–17):**
    ```tsx
    const Globe = dynamic(
      () => import('@/components/globe/Globe').then((mod) => mod.Globe),
      { ssr: false }
    );
    ```
2.  **`components/sections/MarketsHub.tsx` (Lines 15–18):**
    ```tsx
    const Globe = dynamic(
      () => import("@/components/globe/Globe").then((mod) => mod.Globe),
      { ssr: false }
    );
    ```
3.  **`components/sections/GeoCity.tsx` (Lines 26–29):**
    ```tsx
    const Globe = dynamic(
      () => import("@/components/globe/Globe").then((mod) => mod.Globe),
      { ssr: false }
    );
    ```
4.  **`components/sections/References.tsx` (Lines 13–16):**
    ```tsx
    const Globe = dynamic(
      () => import("@/components/globe/Globe").then((mod) => mod.Globe),
      { ssr: false }
    );
    ```

### World Map Topography JSON Source
In `components/globe/Globe.tsx` (Lines 111–129), the topography data is loaded relative to the host domain:
```tsx
function fetchWorldLines(): Promise<[number, number][][]> {
  if (globalWorldLines) return Promise.resolve(globalWorldLines);
  if (globalFetchPromise) return globalFetchPromise;
  globalFetchPromise = fetch('/data/countries-110m.json')
```
The static file is cached in the workspace under the path `public/data/countries-110m.json` (size: 433,239 bytes).
The vendor caching script `scripts/vendor-topojson.mjs` retrieves this resource at build time:
```javascript
const url = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';
const destDir = path.resolve('public/data');
const destFile = path.join(destDir, 'countries-110m.json');
```

### Layout Shift Sizing Logic (CLS)
In `components/sections/MarketsHub.tsx`, the `globeSize` is handled via component state:
```tsx
  // States
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [globeSize, setGlobeSize] = useState(460);

  // Handle resizing of the globe canvas
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setGlobeSize(320);
      } else if (window.innerWidth < 1024) {
        setGlobeSize(380);
      } else {
        setGlobeSize(460);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
```
And mapped to the container element with inline style rules (Line 203):
```tsx
style={{ width: globeSize + 48, height: globeSize + 48 }}
```
Identical logic patterns exist in `components/sections/GeoCity.tsx` (starting size `280` updating to `220` on mobile, line 180) and `components/sections/References.tsx` (starting size `460` updating to `320` on mobile, line 123).

---

## 2. Logic Chain

1.  **Intersection Observer Lazy Load:**
    *   **Observation:** The Globe is dynamically imported with `ssr: false`, which stops execution on the server. However, it still loads eagerly as soon as the client bundle renders the parent sections (even if they are far down the viewport, e.g., on `/maerkte` or `/referenzen`).
    *   **Reasoning:** To avoid executing canvas drawing loops and fetching JSON immediately during initial load, we must only mount the Globe when it enters the viewport.
    *   **Deduction:** Implementing a ref-forwarding `LazyGlobe` wrapper around the dynamic `Globe` component using an `IntersectionObserver` solves this problem. It allows parents to call methods like `flyTo` or `setActive` through the ref only after mounting.

2.  **Topography Caching & Isolation:**
    *   **Observation:** The topography fetch targets `/data/countries-110m.json`.
    *   **Reasoning:** Since `public/data/countries-110m.json` is checked in, and the Next.js static server serves the `public/` directory relative to `/`, all fetches at runtime are resolved internally from the local host.
    *   **Deduction:** Runtime operation is fully isolated; no external CDNs like `unpkg.com` are hit during execution. If the local JSON load fails, the grid-line generation fallback prevents visual breakage.

3.  **LCP Mitigation:**
    *   **Observation:** `<canvas>` elements are excluded from Chrome's LCP candidate list.
    *   **Reasoning:** The Globe cannot directly trigger an LCP record. However, its initialization blocks the main thread during hydration, which can delay the paint of the true LCP candidate (the main `<h1>` title).
    *   **Deduction:** Preloading hero fonts, utilizing `font-display: swap`, using pure CSS/div placeholders, and slightly deferring the canvas render loop execution ensures the `<h1>` is painted immediately, optimizing LCP.

4.  **CLS Cause and Solution:**
    *   **Observation:** Viewport sizing state `globeSize` is initialized to desktop defaults (`460` or `280`) and updated in a `useEffect` layout listener on mount.
    *   **Reasoning:** On mobile and tablet devices, the initial render uses the desktop dimensions. Once hydration completes, the layout listener runs and updates the state to the mobile sizes. This triggers a visual resizing that shifts surrounding elements, causing CLS.
    *   **Deduction:** Sizing must be fully offloaded to Tailwind responsive media query classes on the parent wrapper (e.g. `w-[368px] h-[368px] sm:w-[428px] sm:h-[428px] lg:w-[508px] lg:h-[508px]`). The canvas must be styled with `w-full h-full`, and its internal drawing resolution (`canvas.width` / `canvas.height`) determined on mount/resize inside the canvas component itself.

---

## 3. Caveats

*   **Initial Viewport above-the-fold:** On the Home page, the Globe in `HeroScrolly.tsx` is above-the-fold. An Intersection Observer will immediately trigger. Therefore, lazy loading alone will not optimize initial bundle parsing for the home page. Deferring the canvas drawing loop slightly after mount is the required approach there.
*   **Reduced Motion:** If a user has enabled "Reduced Motion" in their operating system, the Globe component correctly disables rotation and momentum. Ensure this behavior remains intact in any optimizations.

---

## 4. Conclusion

1.  **SSR & Lazy Mount:** The Globe is correctly isolated from SSR. An Intersection Observer-based `LazyGlobe` wrapper should be introduced to delay rendering until the element enters the viewport.
2.  **Topography Fetching:** Verified. All topography queries target local host files under `public/data/` with a fallback grid mechanism.
3.  **LCP Safety:** The canvas itself is not an LCP candidate. Preloading fonts and deferring canvas drawing will prevent indirect LCP delays.
4.  **CLS Elimination:** The layout shifts are caused by post-hydration state resizing. Migrating container sizes to pure responsive CSS/Tailwind classes and styling the canvas responsively will resolve this completely.

---

## 5. Verification Method

To verify these findings:
1.  **Topography Isolation:** Run `pnpm build && pnpm start`. Open the browser DevTools Network tab, filter by "fetch", reload the pages (Home, `/maerkte`, `/referenzen`), and verify that **no** request goes to `unpkg.com` or other external domains. Confirm `/data/countries-110m.json` is served with `200 OK` from the local origin.
2.  **LCP Candidate:** Open Chrome DevTools Performance panel, record a load profile, and verify that the LCP element is identified as the `<h1>` heading element, not the Globe canvas.
3.  **CLS Verification:** Run Lighthouse or check the Layout Shift indicators in Chrome DevTools on a simulated Mobile screen. Verify that the Globe container size is stable and does not shift size post-hydration.
