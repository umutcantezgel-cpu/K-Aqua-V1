# K-Aqua Fonts and Images Performance Optimization Analysis (Step 21)

## Executive Summary
This report presents a thorough analysis of the K-Aqua codebase's font configurations, preloading mechanisms, and layout shift prevention (`MediaSlot`). It also outlines optimal guidelines for integrating responsive `next/image` assets once real image resources are introduced. 

A critical performance issue was identified and verified: the primary heading font (`fonts/outfit-variable-latin.woff2`) was replaced by a previous agent with a massive 773KB Arial Regular TrueType Font (.ttf) to bypass Satori/Edge compatibility issues in dynamic OpenGraph generators. This results in severe asset bloat, client-side performance degradation, and fallback Arial rendering on the website. A complete separation of web fonts (WOFF2) and Edge graphics fonts (static TTF) is proposed.

---

## 1. Local Font Configuration (`app/fonts.ts`)

### Current Configuration
The current configuration in `app/fonts.ts` is:
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

### Analysis & Recommendations
1. **Display Property**: Both fonts correctly utilize `display: 'swap'`. This tells the browser to immediately render text using a fallback system font while the custom font is downloading, preventing Flash of Invisible Text (FOIT) and improving First Contentful Paint (FCP).
2. **Weights & Axes**: The local font definitions do not declare the variable font `weight` range. Since these are variable fonts, it is highly recommended to declare the supported weight range explicitly (e.g., `weight: '100 900'`) in the options to ensure Next.js outputs the proper `@font-face` range in CSS, avoiding artificial synthetic weights.
3. **Critical Font Swap (Arial replacing Outfit)**:
   - File inspection shows `fonts/outfit-variable-latin.woff2` has a size of **773,236 bytes (~773KB)**.
   - Using the `file` command, we confirmed this file contains **TrueType Font data for Arial Regular** (Monotype).
   - This was done by a previous agent because Next.js's default OG image generator library (Satori) does not support WOFF2 files and requires TTF/OTF. Instead of referencing a separate TTF file in the OG generators, the agent replaced the main website font file.
   - **Impact**: The client downloads a 773KB Arial font file renamed as `.woff2`, leading to slower font load times, increased LCP, and rendering display headings in Arial Regular instead of the premium Outfit typeface.
   - **Fix**: Revert `fonts/outfit-variable-latin.woff2` to the true, compressed Outfit variable font file (~48KB). Introduce a separate static TrueType font `fonts/outfit-bold.ttf` (~75KB) to be used exclusively by the OG image generator endpoints.

---

## 2. Hero Text Font Preloading

### Verification of Current Preload
* **Usage**: In `app/[locale]/layout.tsx`, both `outfit` and `inter` variables are loaded and applied directly to the HTML `<body>`:
  ```typescript
  <body className={`${outfit.variable} ${inter.variable}`}>
  ```
* **Binding**: In `app/globals.css`, these variables are mapped to semantic tailwind theme utilities:
  ```css
  --font-heading: var(--font-outfit), ui-sans-serif, system-ui, sans-serif;
  --font-body: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  ```
* **Application**: The Hero title in `components/sections/HeroScrolly.tsx` uses the display font:
  ```tsx
  <h1 className="text-display font-heading font-extrabold tracking-tight leading-tight">
  ```
* **Next.js Preload Behavior**: Because the fonts are referenced in the root layout, Next.js automatically injects `<link rel="preload" href="..." as="font" type="font/woff2" crossorigin>` into the page HTML. This works correctly out-of-the-box and guarantees that the browser starts downloading the fonts immediately before parsing styling and JS.
* **Preload Bottleneck**: Because the preloaded Outfit file is 773KB, the preloading queue is congested, defeating the optimization purpose. Restoring the ~40-50KB Outfit WOFF2 file will resolve this bottleneck.

---

## 3. MediaSlot CLS Prevention

### Component Analysis
The `MediaSlot` component in `components/ui/MediaSlot.tsx` uses inline styles to set a responsive, fixed aspect ratio:
```typescript
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

### Cumulative Layout Shift (CLS) Safety
* **Aspect Ratio Reservation**: By setting `aspectRatio` as an inline CSS property on the block-level wrapper, the browser calculates and reserves the element's height relative to its viewport-bound width before rendering children. This ensures that the layout remains stable, avoiding CLS.
* **Overflow Handling**: The container has `overflow-hidden` configured, which ensures that long localization text labels do not expand the card boundaries and cause layout jumps.
* **Framer Motion Reveals**: The parent wrappers (e.g., grids in `loesungen/page.tsx` and `produkte/page.tsx`) use `Reveal` components for scrollytelling. Since these animations only transform `opacity` and composite `translateY` (`y`), they run on the GPU compositor thread without triggering browser reflows, ensuring **CLS remains 0**.

---

## 4. next/image Implementation Guidelines

When real image assets are integrated into the application (via local public assets or a CMS), `next/image` should be used to replace the current placeholders inside `MediaSlot`. The following guidelines should be implemented:

### A. Nested MediaSlot Image Component
Extend `MediaSlot` to support `src`, `alt`, `sizes`, and `priority` props, nesting the Next.js `Image` component:
```typescript
import Image from 'next/image';

export interface MediaSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  aspectRatio?: string;
  src?: string;       // Image URL or import
  alt?: string;       // Accessibility description
  sizes?: string;     // Responsive width hints
  priority?: boolean; // Preload option for LCP images
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
          alt={alt || label || "Media description"}
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

### B. Responsive `sizes` Mappings
To prevent downloading desktop-sized images on mobile devices, responsive `sizes` must be explicitly configured based on the component's surrounding layout:
* **Full-Width Hero / Banner**: `sizes="100vw"`
* **2-Column Layouts** (e.g. Products detail columns): `sizes="(max-width: 768px) 100vw, 50vw"`
* **3-Column Bento Grids** (e.g. Solutions benefits grid): `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`
* **4-Column / Small Grids** (e.g. News grid, Partner logos): `sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"`

### C. AVIF / WebP Priority
Next.js supports optimized formats automatically. In `next.config.ts`, the formats are already preconfigured:
```typescript
images: {
  formats: ['image/avif', 'image/webp'],
  remotePatterns: [],
}
```
* **AVIF** yields up to 20% better compression than WebP. By placing it first in the `formats` array, Next.js will automatically negotiate and serve AVIF to compatible modern browsers, falling back to WebP or the original format if unsupported.

### D. LCP Priority Loading
* For any image situated "above the fold" (visible immediately upon load in desktop/mobile viewports, such as a hero banner or primary logo), set `priority={true}` (or simply the `priority` attribute).
* This adds high-priority preloading tags to the document head and disables lazy loading for that resource, accelerating LCP (Largest Contentful Paint) by up to several hundred milliseconds.

---

## 5. Corrective Action Proposals

### Separation of Web Font and Satori OG Font
To restore Outfit font rendering for site visitors and reduce page size from 773KB back to ~40KB, while preserving dynamic OpenGraph image rendering:

1. Re-vendor the actual variable Outfit font at `fonts/outfit-variable-latin.woff2`.
2. Place a static TrueType version of Outfit Bold at `fonts/outfit-bold.ttf` (~75KB).
3. Modify the font imports in `app/[locale]/opengraph-image.tsx` and `app/[locale]/maerkte/[slug]/opengraph-image.tsx` to fetch `fonts/outfit-bold.ttf` instead:
   ```typescript
   // Fetch font data (Outfit Bold TTF)
   const fontData = await fetch(
     new URL('../../fonts/outfit-bold.ttf', import.meta.url)
   ).then((res) => res.arrayBuffer());
   ```
4. Update `app/fonts.ts` to explicitly define the variable font weight ranges:
   ```typescript
   export const outfit = localFont({
     src: '../fonts/outfit-variable-latin.woff2',
     variable: '--font-outfit',
     display: 'swap',
     weight: '100 900',
     style: 'normal',
   });
   ```
