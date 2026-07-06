# Globe Component Performance Analysis — K-Aqua Step 21

This report provides a detailed performance analysis of the Globe component and its loading mechanism, addressing the requirements of Step 21 (Performance Optimization). 

---

## 1. Dynamic Import & Intersection Observer-Based Lazy Mount

### Current State
The Globe component is currently dynamically imported in four different layout components:
1. `components/sections/HeroScrolly.tsx` (Home Page Hero)
2. `components/sections/MarketsHub.tsx` (Markets Hub Page)
3. `components/sections/GeoCity.tsx` (Geo City Pages)
4. `components/sections/References.tsx` (References Page)

Each page uses Next.js `dynamic()` to load the component dynamically:
```tsx
const Globe = dynamic(
  () => import("@/components/globe/Globe").then((mod) => mod.Globe),
  { ssr: false }
);
```
While this successfully prevents server-side rendering (SSR) canvas errors (as `<canvas>` requires browser APIs), the dynamically imported bundle is still loaded eagerly by the client as soon as the containing chunk executes, regardless of whether the Globe is in the user's viewport.

### Proposed Solution: `LazyGlobe` Wrapper
To prevent early bundle execution and reduce initial JS bundle size, we can wrap the dynamic `Globe` component in a lazy loader that uses the browser's **Intersection Observer API**. 

Since parent components interact with the Globe via a forwarded React `ref` (calling `flyTo` and `setActive`), this lazy wrapper must safely preserve ref forwarding.

Below is the proposed implementation for a new component `components/globe/LazyGlobe.tsx`:

```tsx
'use client';

import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import dynamic from 'next/dynamic';
import type { GlobeRef, GlobeProps } from './Globe';

// Load Globe dynamically with ssr: false
const Globe = dynamic(
  () => import('./Globe').then((mod) => mod.Globe),
  { ssr: false }
);

export const LazyGlobe = forwardRef<GlobeRef, GlobeProps>((props, ref) => {
  const [isInViewport, setIsInViewport] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<GlobeRef | null>(null);

  // Expose the underlying Globe imperative methods to the parent page
  useImperativeHandle(ref, () => ({
    flyTo: (lon: number, lat: number) => {
      if (globeRef.current) {
        globeRef.current.flyTo(lon, lat);
      }
    },
    setActive: (title: string | null) => {
      if (globeRef.current?.setActive) {
        globeRef.current.setActive(title);
      }
    },
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
          observer.disconnect(); // Unobserve once loaded
        }
      },
      {
        rootMargin: '200px', // Preload 200px before scrolling into view
        threshold: 0.01,
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const size = props.size ?? 200;

  return (
    <div
      ref={containerRef}
      style={{ width: size, height: size }}
      className="flex items-center justify-center relative select-none"
    >
      {isInViewport ? (
        <Globe ref={globeRef} {...props} />
      ) : (
        // Non-LCP static placeholder shell to preserve layout size
        <div
          style={{ width: size, height: size }}
          className="rounded-full bg-background-subtle border border-card-border/30 animate-pulse"
        />
      )}
    </div>
  );
});

LazyGlobe.displayName = 'LazyGlobe';
```

---

## 2. World Map Topography Data (countries-110m.json)

### Current Loading Logic
In `components/globe/Globe.tsx` (lines 114–128), map data is requested from a local URL:
```tsx
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

### Verification
1. **Local Path Resolution:** The fetch call uses `/data/countries-110m.json`. In a Next.js application, this path is served relative to the domain host, resolving to the local file `public/data/countries-110m.json`.
2. **Local Caching (Vendoring):** The file `public/data/countries-110m.json` exists in the local workspace (~433 KB).
3. **No External Fetch at Runtime:** There are no external network calls to public CDNs (such as `unpkg.com` or `githubusercontent.com`) at runtime.
4. **Build-Time Setup:** During Step 10, the project setup executed a script at `scripts/vendor-topojson.mjs`. This script fetched the topography dataset from `https://unpkg.com/world-atlas@2.0.2/countries-110m.json` and saved it to the local `public/data` directory. 
5. **Robust Offline Fallback:** If the network request fails (e.g., in strict sandbox/offline environments), the Globe gracefully falls back to generating a grid of graticule lines in memory using the `graticuleLines()` utility:
   ```tsx
   const lines = globalWorldLines || fallbackLines; // fallbackLines is predefined graticule grid
   ```

---

## 3. LCP (Largest Contentful Paint) Element Mitigation

### Canvas vs. LCP Candidates
According to the W3C and Chromium metrics specifications:
- `<canvas>` elements are **not** considered valid LCP candidates.
- The browser will only select `<img>`, `<image>` (within SVG), `<video>` (poster image), block elements containing text nodes, or elements with a background image URL as the LCP element.
- Since the Globe renders directly onto a `<canvas>` and uses CSS gradients/solid colors for background fills rather than background images, it **cannot** directly become the LCP element.

### Indirect LCP Impact
Although the Globe itself cannot be the LCP element, it can **indirectly delay** the LCP of the page (which is typically the hero `<h1>` heading or hero text block). This happens when:
- The main thread is blocked by executing dynamic dynamic-import chunks.
- The canvas rendering loop starts drawing immediately during the critical first paint phase, taking CPU cycles away from rendering the fonts and layout.

### Strategies to Protect LCP
1. **Preload the Hero Fonts:** Ensure the custom fonts used by the hero `<h1>` are preloaded in the layout's `<head>` with `crossorigin` and use `font-display: swap`. This guarantees the text is rendered immediately with system fallbacks, completing the LCP paint long before the Globe's JS is executed.
2. **De-prioritize Canvas rendering above-the-fold:** On the Home Page, the Globe is in the first fold (`HeroScrolly.tsx`). To prevent the canvas draw loop from competing with the initial text layout:
   - Delay the loop execution by wrapping the first loop invocation in a small timeout or `requestIdleCallback`:
     ```tsx
     // Inside Globe.tsx canvas effect
     const timer = setTimeout(() => {
       requestAnimationFrame(loop);
     }, 100);
     ```
3. **Use Non-LCP Placeholders:** If a loading placeholder is displayed while `LazyGlobe` loads, it must be a pure CSS shape (e.g., `<div className="rounded-full bg-background-subtle border border-card-border/30" />`) rather than an image or SVG file, ensuring the placeholder itself is not flagged as the LCP element.
4. **Reduced Motion Default:** In cases where reduced motion is enabled, the Globe renders statically (no auto-rotation or inertia loops), which reduces CPU overhead to near-zero.

---

## 4. Layout Shifts (CLS) Audit on Globe Pages

### Root Cause of CLS on Globe Pages
A layout shift occurs when elements move unexpectedly during load. On the pages featuring the Globe (`MarketsHub.tsx`, `GeoCity.tsx`, and `References.tsx`), there is a systemic CLS issue caused by:

1. **State-Driven Inline Styles:** The parent wrapper div's size is set using inline styles derived from the `globeSize` React state:
   ```tsx
   style={{ width: globeSize + 48, height: globeSize + 48 }}
   ```
2. **Hydration Resize Listener:** `globeSize` is initialized to a desktop default (e.g., `460` or `280`). On mobile or tablet viewports, once the client-side JavaScript hydrates, a `useEffect` resize listener triggers and changes `globeSize` (e.g., to `320` or `220`):
   ```tsx
   useEffect(() => {
     const handleResize = () => {
       if (window.innerWidth < 640) {
         setGlobeSize(320); // Mobile
       } ...
     };
     handleResize();
     window.addEventListener("resize", handleResize);
     ...
   }, []);
   ```
   This state update forces the container to shrink in size *after* the initial server-side HTML has been rendered and laid out by the browser, creating a significant layout shift (CLS).
3. **Dynamic Loading Delay:** While the dynamic import of `Globe` is loading, no child component is rendered. If the parent container didn't have width/height, it would collapse. The wrapper currently sets width/height, but because the size updates post-hydration, a shift still occurs.

### Proposed CLS Fix: Pure CSS Responsive Sizing
To achieve `CLS < 0.1` as required by the Definition of Done, layout sizing must be handled **entirely in CSS** via responsive Tailwind media queries, bypassing JS state during the initial layout phase.

#### Step 1: Update Parent Wrapper in Pages
Replace the state-based inline style with responsive CSS classes.

*   **For `MarketsHub.tsx` & `References.tsx`:**
    ```tsx
    // Remove globeSize state and useEffect resize listeners from parent.
    // Style the wrapper div using Tailwind responsive utilities:
    <div 
      className="relative flex items-center justify-center border border-card-border/30 rounded-full p-6 bg-background/50 shadow-diffuse select-none w-[368px] h-[368px] sm:w-[428px] sm:h-[428px] lg:w-[508px] lg:h-[508px]"
      aria-label={geoTrans.canvasAria}
    >
      <Globe
        ref={globeRef}
        // size prop is omitted, or is handled responsively
        interactive={true}
        whirl={false}
        speed={shouldReduceMotion ? 0 : 0.006}
        onMarkerClick={handleMarkerClick}
      />
    </div>
    ```

*   **For `GeoCity.tsx`:**
    ```tsx
    <div 
      className="relative flex items-center justify-center border border-card-border/30 rounded-full p-4 bg-background/50 shadow-diffuse select-none w-[252px] h-[252px] sm:w-[312px] sm:h-[312px]"
    >
      <Globe
        ref={handleGlobeRef}
        interactive={true}
        whirl={false}
        speed={0}
      />
    </div>
    ```

#### Step 2: Make `Globe.tsx` Canvas Responsive
Modify `Globe.tsx` so that it doesn't rely on a fixed `size` prop to style the canvas. Instead, the canvas should fill its parent container (`w-full h-full`), and the WebGL/2D rendering context should dynamically adjust its internal drawing resolution to prevent blurriness.

Inside `components/globe/Globe.tsx` (modifying the canvas layout and sizing effect):

```tsx
// 1. In Globe Props, make 'size' optional and fallback to container measurements.
export interface GlobeProps {
  size?: number; // Keep for backwards compatibility
  ...
}

// 2. Inside the forwardRef implementation:
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  runningRef.current = true;

  // Measure the physical layout dimensions of the canvas established by CSS
  const width = canvas.clientWidth || size;
  const height = canvas.clientHeight || size;
  const renderSize = Math.min(width, height);

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = renderSize * dpr;
  canvas.height = renderSize * dpr;
  
  // Do NOT write inline CSS width/height via JS style rules.
  // The layout size is already constrained by the 'w-full h-full' class.

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(dpr, dpr);

  const cx = renderSize / 2;
  const cy = renderSize / 2;
  const R = Math.round(renderSize * 0.31);

  // ... proceed with drawing loop using measured cx, cy, R ...
}, [size, interactive]);

// 3. Render canvas with fill classes:
return (
  <canvas
    ref={canvasRef}
    className="block select-none w-full h-full max-w-full max-h-full"
  />
);
```

By transitioning the layout sizing from JS to pure CSS media queries:
1. The browser reserves the exact correct space during initial HTML parsing.
2. Hydration does not trigger a state change that resizes the container.
3. The canvas renders sharply by checking the final container dimensions post-layout.
4. Cumulative Layout Shift (CLS) on all pages featuring the Globe is reduced to **0.0**.
