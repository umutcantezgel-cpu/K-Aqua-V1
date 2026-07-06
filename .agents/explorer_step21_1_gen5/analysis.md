# Globe Performance Investigation Analysis - Step 21

This analysis details findings on the Globe component implementation, loading mechanisms, local data vendoring, Largest Contentful Paint (LCP) prevention, and Cumulative Layout Shift (CLS) analysis in the K-Aqua application.

---

## 1. Dynamic SSR Wrapping & Intersection Observer-Based Lazy Mount

### Current State
The Globe component is dynamically imported using `next/dynamic` with `ssr: false` in three key places:
1. **HeroScrolly.tsx** (Lines 14–17):
   ```typescript
   const Globe = dynamic(
     () => import('@/components/globe/Globe').then((mod) => mod.Globe),
     { ssr: false }
   );
   ```
2. **MarketsHub.tsx** (Lines 15–18)
3. **References.tsx** (Lines 14–17)
4. **dev/globe/page.tsx** (Lines 13–16)

This ensures the Canvas rendering does not run during Server-Side Rendering (SSR), which would throw errors due to missing browser APIs (`window`, `HTMLCanvasElement`, `devicePixelRatio`, etc.).

However, the Globe is **not** wrapped with an Intersection Observer. It loads and runs its `requestAnimationFrame` render loop immediately upon page load, even if it is positioned below the fold (as on the Markets Hub and References pages).

### Proposed Lazy Mounting Solution
We can create a wrapper component named `LazyGlobe` in `components/globe/LazyGlobe.tsx` (or modify `components/globe/Globe.tsx` to include this logic) which defers mounting the canvas Globe until the element enters the viewport:

```tsx
import React, { useState, useEffect, useRef } from 'react';

interface LazyGlobeProps {
  children: React.ReactNode;
  placeholderSize: number;
}

export function LazyGlobe({ children, placeholderSize }: LazyGlobeProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Pre-load 200px before entering viewport
      }
    );

    const currentEl = containerRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const totalSize = placeholderSize + 48; // Account for the padding (p-6 = 48px total padding)

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center border border-card-border/30 rounded-full p-6 bg-background/50 shadow-diffuse select-none w-[368px] h-[368px] sm:w-[428px] sm:h-[428px] lg:w-[508px] lg:h-[508px]"
      style={{ width: totalSize, height: totalSize }}
    >
      {shouldLoad ? (
        children
      ) : (
        // Render a visual skeleton matching the Globe's layout to prevent CLS
        <div
          className="rounded-full border border-[var(--primary)]/10 bg-[rgba(91,45,140,0.05)] animate-pulse"
          style={{ width: placeholderSize, height: placeholderSize }}
        />
      )}
    </div>
  );
}
```

---

## 2. World Map Topography Data (countries-110m.json)

### Fetch Path
In `components/globe/Globe.tsx` (Lines 114–127), the topography data is fetched inside the client-side module scope:
```typescript
function fetchWorldLines(): Promise<[number, number][][]> {
  if (globalWorldLines) return Promise.resolve(globalWorldLines);
  if (globalFetchPromise) return globalFetchPromise;
  globalFetchPromise = fetch('/data/countries-110m.json')
    .then((r) => {
      if (!r.ok) throw new Error('Failed to load map data');
      return r.json();
    })
    ...
```

### Local Caching & CDN Guard
* The fetch URL is `/data/countries-110m.json`.
* This file is stored locally at `public/data/countries-110m.json` in the codebase.
* The script `scripts/vendor-topojson.mjs` was executed during the build setup (in Step 10) to download this topography data from `https://unpkg.com/world-atlas@2.0.2/countries-110m.json` and cache it under the `public/data/` folder.
* **No external fetches** to `unpkg.com` or other CDNs are made at runtime. The app functions entirely offline/in network isolation.

---

## 3. LCP (Largest Contentful Paint) Prevention

### Canvas LCP Specifications
By default, the HTML `<canvas>` element itself is **not** eligible to be considered the Largest Contentful Paint (LCP) element under browser specifications (Chrome's LCP candidate list is limited to `<img>`, `<image>` in `<svg>`, `<video>`, CSS background images with `url()`, and block-level text elements).

### Risks & Safeguards
1. **Fallback/Loading Text:** If a placeholder renders large text nodes (e.g. "Loading World Map...") or a large image during hydration, that fallback element could become the LCP candidate.
   * **Solution:** Placeholders must remain text-free and image-free (use styled `div` elements with background colors, borders, and CSS loading indicators/pulses).
2. **Hero Font Preloading:** The actual LCP element on the Home page is the `h1` inside the above-the-fold `HeroScrolly` section.
   * **Solution:** Ensure the Hero font is loaded with `next/font/local` using `display: 'swap'` and the font files are preloaded in the root layout to avoid font load blockages and eliminate layout shift/FCP latency.
3. **Lazy Mount fold isolation:** By implementing the Intersection Observer lazy mount on `/maerkte` and `/referenzen`, the Globe is not even rendered initially, guaranteeing it plays no role in above-the-fold LCP calculations.

---

## 4. Cumulative Layout Shift (CLS) Analysis

Three major CLS issues were identified during investigation of the pages rendering the Globe:

### Issue 1: State-Based `globeSize` Post-Hydration Resizing
In both `MarketsHub.tsx` and `References.tsx`, the parent container's width/height are controlled via inline styles using the `globeSize` state variable:
`style={{ width: globeSize + 48, height: globeSize + 48 }}`

* **Timeline of shift:**
  1. The server renders the page (or the client does a first paint with the default state value `globeSize = 460`).
  2. The browser lays out a box of `508px` (460 + 48) on all devices.
  3. Hydration occurs, and `useEffect` runs on the client:
     ```typescript
     useEffect(() => {
       const handleResize = () => {
         if (window.innerWidth < 640) {
           setGlobeSize(320);
         } ...
       };
       handleResize();
       ...
     }, []);
     ```
  4. On mobile screens, the state changes to `320`, updating the container style to `368px`. The container suddenly shrinks, shifting all content below it upwards. This triggers a layout shift on mobile.
  5. Furthermore, during SSR, the dynamic Globe component returns `null`. Without strict responsive CSS height/width classes on the parent wrapper, it has `0` size initially and snaps to `508px` on load, causing CLS on desktop.

* **Fix:** Add responsive sizing utility classes in Tailwind to the container to reserve the exact layout space before JavaScript executes:
  * For **MarketsHub.tsx**: `w-[368px] h-[368px] sm:w-[428px] sm:h-[428px] lg:w-[508px] lg:h-[508px]`
  * For **References.tsx**: `w-[368px] h-[368px] sm:w-[508px] sm:h-[508px]`

### Issue 2: Hydration Layout Swap in `HeroScrolly.tsx`
In `HeroScrolly.tsx`, the page renders based on `staticMode`:
```typescript
const [mounted, setMounted] = useState(false);
const staticMode = !mounted || !!prefersReduced || isMobile;
```
* **Timeline of shift:**
  1. During SSR and initial client render, `mounted` is `false`, so `staticMode` is `true`. The browser paints a standard grid layout containing static sections.
  2. Upon hydration, `useEffect` sets `mounted = true`.
  3. On desktop, `staticMode` flips to `false`, causing the component to render the scrollytelling structure:
     `<div ref={wrapRef} className="k-scrolly">` (which has a stylesheet height of `380vh`!).
  4. The page structure changes completely, pushing all subsequent content down by `380vh` instantly. This is a severe CLS violation.
* **Fix:** The component should not dynamically switch root DOM elements upon mount. Instead, render a unified DOM container whose visibility and layout are controlled via CSS responsive classes (e.g. `hidden lg:block` for scrolly elements, and `block lg:hidden` for static fallback elements) or keep the layout wrapper stable under a single container type.

### Issue 3: Hardcoded Fallback Sizing in `HeroScrolly.tsx`
In static mode (mobile screens), `HeroScrolly.tsx` renders the Globe in a container with a fixed size:
```tsx
<div className="w-[480px] h-[480px] relative">
```
* **Timeline of shift/overflow:**
  On mobile devices with screen widths `< 480px` (e.g. standard iPhones at `390px` or `320px`), this hardcoded width overflows the layout viewport, resulting in horizontal scrolling and document layout shifts.
* **Fix:** Replace with fluid, responsive constraints:
  `<div className="w-full max-w-[480px] aspect-square relative">`

---

## 5. Verification Command & Checklists

To verify performance improvements and layout stability, execute:
```bash
# Verify typecheck and lint run cleanly
pnpm typecheck
pnpm lint

# Build production build locally
pnpm build

# Start local server to measure Core Web Vitals (LCP & CLS)
pnpm start
```

### Invalidation Conditions
* A warning or layout shift is registered in Chrome DevTools' rendering panel (Layout Shifts regions highlighting).
* The topography JSON fetch is pointing to an external CDN domain like `https://unpkg.com`.
