# K-Aqua Fonts and Images Performance Optimization Analysis

## Executive Summary
This report analyzes the K-Aqua codebase font configurations, preloading mechanisms, layout shift prevention (`MediaSlot`), and defines guidelines for the future integration of responsive `next/image` assets. We identified a critical performance issue: the primary heading font (`fonts/outfit-variable-latin.woff2`) was overwritten with a 773KB Arial Regular TrueType Font (.ttf) to resolve Satori/Edge compatibility, causing large font downloads and fallback font rendering for the client. A clean separation of web fonts (WOFF2) and Edge graphics fonts (static TTF) is proposed.

---

## 1. next/font/local Configuration (app/fonts.ts)

### Current Implementation
In `app/fonts.ts`, the fonts are configured as follows:

```typescript
import localFont from 'next/font/local';

export const outfit = localFont({
  src: '../fonts/outfit-variable-latin.woff2',
  variable: '--font-outfit',
  display: 'swap',
});

export const inter = localFont({
  src: '../fonts/inter-variable-latin.woff2',
  variable: '--font-inter',
  display: 'swap',
});
```

### Analysis & Critical Finding
* **Display Property**: Both fonts correctly utilize `display: 'swap'`, which ensures text remains visible during font download by falling back to system fonts, preventing Flash of Invisible Text (FOIT).
* **Axes & Weights**: The configuration relies on variable fonts without explicitly declaring weight ranges. While modern browsers parse the variable axes, it is best practice to define the weight range (e.g., `weight: '100 900'`) in the `localFont` options.
* **Font File Integrity Failure**: The file `fonts/outfit-variable-latin.woff2` (773KB) is actually **not a WOFF2 file** and is **not the Outfit font**. 
  * In Step 20, the agent replaced the font contents with a TrueType copy of **Arial Regular** to bypass Satori/Edge's lack of support for WOFF2 (used to render OpenGraph images).
  * This has severe consequences:
    1. **Asset Size Bloat**: The client downloads a massive 773KB uncompressed font file instead of a compressed ~30-50KB WOFF2 variable font, which degrades LCP and FCP.
    2. **Design Degradation**: The website renders all display headers using Arial Regular instead of Outfit. Since the file is static Arial Regular, bold and extrabold styles (`font-bold`, `font-extrabold` used in the Hero text) are artificially synthesized by the browser.

### Proposed Corrective Action
1. Restore the true, optimized Outfit variable font file in `.woff2` format at `fonts/outfit-variable-latin.woff2` (~40KB).
2. Configure `app/fonts.ts` to explicitly declare variable weight and style axes:
   ```typescript
   export const outfit = localFont({
     src: '../fonts/outfit-variable-latin.woff2',
     variable: '--font-outfit',
     display: 'swap',
     weight: '100 900',
     style: 'normal',
   });
   ```
3. For Satori/Edge OpenGraph image generation (`app/[locale]/opengraph-image.tsx` and `app/[locale]/maerkte/[slug]/opengraph-image.tsx`), load a separate static TrueType font (e.g., `fonts/outfit-bold.ttf`, ~60-80KB) specifically for Satori instead of reusing the main web font path.

---

## 2. Hero Text Font Preloading

### Verification of Preload Mechanism
* In `app/[locale]/layout.tsx`, the font variables are imported and applied to the `<body>` element:
  ```typescript
  import { outfit, inter } from '../fonts';
  // ...
  <body className={`${outfit.variable} ${inter.variable}`}>
  ```
* In `app/globals.css`, these variables are bound to utility classes:
  ```css
  --font-heading: var(--font-outfit), ui-sans-serif, system-ui, sans-serif;
  --font-body: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  ```
* In `components/sections/HeroScrolly.tsx` (the Home page Hero), the main heading uses `font-heading`:
  ```typescript
  <h1 className="text-display font-heading font-extrabold tracking-tight leading-tight">
  ```
* **Correctness**: Next.js automatically injects `<link rel="preload" as="font" type="font/woff2" crossorigin="anonymous">` in the server-rendered HTML for fonts imported in root layouts and active on the page. No manual preloading in `<head>` is required or present.
* **Preload Optimization Defeat**: Because the preloaded file `outfit-variable-latin.woff2` was replaced with a 773KB Arial TTF file, the browser preloads a giant resource, delaying the rendering cycle and LCP. Restoring the optimized WOFF2 Outfit font will fully restore the benefits of Next.js automatic preloading.

---

## 3. MediaSlot CLS Prevention

### Component Design
The `MediaSlot` component (`components/ui/MediaSlot.tsx`) is implemented as follows:

```typescript
export interface MediaSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  aspectRatio?: string;
}

export function MediaSlot({
  label,
  aspectRatio = "4/3",
  className,
  style,
  ...props
}: MediaSlotProps) {
  const displayLabel = label || fallbackLabel;
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-xl border border-card-border bg-[linear-gradient(135deg,var(--primary-soft),var(--background-subtle))] flex items-center justify-center p-4",
        className
      )}
      style={{
        aspectRatio,
        ...style,
      }}
      {...props}
    >
      <span className="text-small text-muted-foreground font-medium text-center break-words max-w-full">
        {displayLabel}
      </span>
    </div>
  );
}
```

### Layout Shift (CLS) Analysis
* **CSS aspect-ratio**: Applying `aspect-ratio` as an inline CSS property on a block-level container tells the browser the element's proportions before its internal elements load. The browser reserves this space during the initial reflow.
* **CLS-Safety**: 
  1. The container uses `overflow-hidden` which guarantees that long text labels will be clipped rather than forcing the container to expand vertically and causing a layout shift.
  2. The parent containers (like bento grids and grids in `produkte/page.tsx` or `loesungen/page.tsx`) wrap `MediaSlot` in `Reveal` motion-divs. Since the `Reveal` animation is bound only to `opacity` and composite `translateY` (`y`), it does not trigger browser reflows, ensuring **CLS remains 0**.
  3. The aspect ratios passed across the site (e.g. `4/3`, `16/9`, `1/1`, `4/3.4`) are valid CSS values and resolved correctly.

---

## 4. next/image Implementation Guidelines

Once actual image assets are introduced (CMS or local public directory), `next/image` must replace the placeholders. We suggest the following integration rules to maintain a Performance score of >= 95.

### A. MediaSlot Integration
Maintain `MediaSlot` as the styled container, but nest the Next.js `Image` component within it:

```typescript
import Image from 'next/image';

export interface MediaSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  aspectRatio?: string;
  src?: string;       // Path to image
  alt?: string;       // Image description
  sizes?: string;     // Responsive sizes query
  priority?: boolean; // Preload for LCP candidates
}

export function MediaSlot({
  label,
  aspectRatio = "4/3",
  src,
  alt,
  sizes,
  priority = false,
  className,
  style,
  ...props
}: MediaSlotProps) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-xl border border-card-border bg-[linear-gradient(135deg,var(--primary-soft),var(--background-subtle))] flex items-center justify-center",
        className
      )}
      style={{
        aspectRatio,
        ...style,
      }}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          alt={alt || label || "Media Slot Image"}
          fill
          sizes={sizes || "(max-width: 768px) 100vw, 50vw"}
          className="object-cover transition-transform duration-500 hover:scale-105"
          priority={priority}
        />
      ) : (
        <span className="p-4 text-small text-muted-foreground font-medium text-center break-words max-w-full">
          {label || "Media Placeholder"}
        </span>
      )}
    </div>
  );
}
```

### B. Responsive `sizes` Configuration
The `sizes` attribute is required for responsive image loading in Next.js to prevent loading desktop-sized images on mobile browsers. Use these rules based on the element's layout container:

| Layout Context | Recommended `sizes` Attribute Value |
|---|---|
| **Full-width Hero Banner** | `sizes="100vw"` |
| **2-Column Layout** (e.g. Products detail page) | `sizes="(max-width: 768px) 100vw, 50vw"` |
| **3-Column Grid / Bento Box** (e.g. Solutions benefits grid) | `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"` |
| **4-Column Grid / Small Cards** (e.g. news grid, trust center) | `sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"` |

### C. AVIF / WebP Priority
* **Configuration**: `next.config.ts` is already perfectly configured to serve AVIF and WebP formats:
  ```typescript
  images: {
    formats: ['image/avif', 'image/webp'],
  }
  ```
* **How it works**: Next.js automatically processes and compresses source images dynamically on-the-fly, serving them as `.avif` if the browser supports it (providing ~20% size savings over WebP) or `.webp` as a fallback. No developer intervention is needed other than utilizing `<Image>`.

### D. LCP Priority Loading
* The Largest Contentful Paint (LCP) element on the K-Aqua home page is the **Hero Heading Text** (as the canvas Globe is loaded on the client-side via `ssr: false`).
* However, on pages like Products, Solutions, Company, or dynamic markets pages, a large hero image might become the LCP candidate.
* **Optimization**: For any image asset that appears "above the fold" (visible immediately on load in a typical mobile/desktop viewport), always add:
  ```typescript
  priority={true}
  ```
  This disables lazy loading for that image and instructs the browser to download it immediately.

---

## 5. Corrective Proposals (Code Snippets)

### A. Separation of Website Font & Satori OG Font (Proposal)

#### Step 1: Font File Cleanup
1. Put the real, optimized `outfit-variable-latin.woff2` (40KB) back into `fonts/outfit-variable-latin.woff2`.
2. Add a new static TrueType font `fonts/outfit-bold.ttf` (~75KB) specifically for Satori rendering.

#### Step 2: Update `app/[locale]/opengraph-image.tsx`
Change the font loading from `woff2` to `ttf`:

```typescript
// app/[locale]/opengraph-image.tsx

// Fetch font data (Outfit Bold TTF)
const fontData = await fetch(
  new URL('../../fonts/outfit-bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

// ... inside the export default return:
    {
      ...size,
      fonts: [
        {
          name: 'Outfit',
          data: fontData,
          style: 'normal',
          weight: 700,
        },
      ],
    }
```

*Note: The same change should be applied to `app/[locale]/maerkte/[slug]/opengraph-image.tsx` targeting `../../../../fonts/outfit-bold.ttf`.*
