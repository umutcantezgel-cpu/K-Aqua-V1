# Handoff Report — OG Image Generation Investigation

## 1. Observation
We observed the following configurations, files, and patterns in the K-Aqua Next.js codebase:
* **Font Files**: The codebase contains variable woff2 font files at `/fonts/outfit-variable-latin.woff2` and `/fonts/inter-variable-latin.woff2` (verified in `fonts/` directory).
* **Next.js & React Version**: The project runs Next.js `15.3.0` and React `19.1.0` (observed in `package.json`).
* **Metadata Param Typing**: In Next.js 15, route parameters are asynchronous. E.g., in `app/[locale]/maerkte/[slug]/page.tsx` (lines 11-13, 25-26):
  ```typescript
  interface Props {
    params: Promise<{ locale: string; slug: string }>;
  }
  ...
  export async function generateMetadata({ params }: Props): Promise<Metadata>
  ```
* **Color Tokens & Brand Identity**:
  * In `app/globals.css` (line 12): `"K-Aqua brand hue stays purple #5B2D8C + aqua accent"`.
  * Brand theme colors are defined using OKLCH values (lines 118, 127):
    * Primary (`--brand-600`): `oklch(0.44 0.17 302)`
    * Accent Strong (`--aqua-600`): `oklch(0.56 0.11 225)`
  * Using our conversion utility, the exact RGB and Hex values for these tokens are:
    * `--primary` / `--brand-600` -> `rgb(102, 48, 158)` -> `#66309E` (or K-Aqua corporate purple `#5B2D8C`).
    * `--accent-strong` / `--aqua-600` -> `rgb(0, 129, 165)` -> `#0081A5`.
* **K-AQUA Logo Wordmark**: Defined in `components/ui/Logo.tsx` (lines 14-41) as an inline SVG (water drop with paths and inner outline) alongside the heading text "K-AQUA".

---

## 2. Logic Chain
To implement a robust dynamic OG image generator under Edge Runtime in Next.js 15, we reason as follows:
1. **Edge Runtime Environment & Font Loading**: In Edge runtime, Node.js filesystem modules (like `fs`) are unavailable. To load local font binaries dynamically, we must fetch the assets using a relative path resolved via `import.meta.url`:
   ```typescript
   const fontData = await fetch(new URL('relative_path', import.meta.url)).then(res => res.arrayBuffer());
   ```
   * From `app/[locale]/opengraph-image.tsx`: relative path is `../../fonts/outfit-variable-latin.woff2`.
   * From `app/[locale]/maerkte/[slug]/opengraph-image.tsx`: relative path is `../../../../fonts/outfit-variable-latin.woff2`.
2. **Satori Stylesheet Limitations**: Satori (which executes `ImageResponse`) does not resolve modern CSS custom variables (such as `var(--primary)`) or OKLCH colors because it compiles JSX in isolation from DOM styles. To preserve K-Aqua branding, we must hardcode converted Hex colors (`#5B2D8C` and `#0081A5`) inside JSX inline styles or custom Tailwind values.
3. **Logo Adjustments for Contrast**: The K-AQUA logo drops use `fill-primary` and `stroke-primary-foreground`. On a dark purple-to-aqua gradient background, a white drop fill (`#ffffff`) with a brand purple inner stroke (`#5B2D8C`) guarantees the best contrast and premium appearance.
4. **Next.js 15 Async Params**: Since parameters in Next.js 15 are async, our `Image` default export function must accept `params: Promise<{ locale: string; ... }>` and resolve it using `await params` before fetching market lists or translation data.

---

## 3. Caveats
* **Translation Support on Edge**: We assume that `getTranslations` from `next-intl/server` works out-of-the-box in the Edge runtime. If Vercel Edge Runtime experiences issues resolving next-intl configs asynchronously during build/rendering, translations can be manually imported via dynamic JSON import: `import(`../../../../messages/${locale}.json`)`.
* **Satori CSS Engine Quirks**: Satori supports only a subset of CSS: flexbox layout is default (grid is not supported), absolute positioning works, and box-shadow is not supported. All UI styling should be kept simple and clean.

---

## 4. Conclusion
We propose the following implementation code structures for the two opengraph files:

### File 1: `app/[locale]/opengraph-image.tsx` (General Routes)
```typescript
import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

export const alt = 'K-Aqua Piping Systems';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';
export const runtime = 'edge';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Image({ params }: Props) {
  const { locale } = await params;
  
  // Load localized messages
  const t = await getTranslations({ locale, namespace: 'home' });
  const title = `${t('h1a')} ${t('h1b')}`; // E.g., "Führend in der Wasserversorgung."
  
  // Load Outfit Bold font from the repository
  const outfitBold = await fetch(
    new URL('../../fonts/outfit-variable-latin.woff2', import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundImage: 'linear-gradient(135deg, #5B2D8C 0%, #0081A5 100%)',
          padding: '80px',
          color: '#ffffff',
          fontFamily: 'Outfit, sans-serif',
        }}
      >
        {/* Top: K-AQUA Logo Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Water drop SVG */}
          <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 2.5C16 2.5 26 13 26 20a10 10 0 1 1-20 0C6 13 16 2.5 16 2.5Z"
              fill="#ffffff"
            />
            <path
              d="M11.5 21.5a5 5 0 0 0 4 4.5"
              stroke="#5B2D8C"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <span style={{ fontSize: '36px', fontWeight: 900, letterSpacing: '-0.03em' }}>
            K-AQUA
          </span>
        </div>

        {/* Center: Dynamic page title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <span
            style={{
              fontSize: '64px',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              maxWidth: '850px',
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontSize: '24px',
              color: '#83DEEE',
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Made in Germany · PP-R / PP-RCT
          </span>
        </div>

        {/* Bottom footer/brand note */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.7)',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            paddingTop: '24px',
          }}
        >
          <span>k-aqua.de</span>
          <span>KWT GmbH</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Outfit',
          data: outfitBold,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
```

### File 2: `app/[locale]/maerkte/[slug]/opengraph-image.tsx` (Dynamic Geo City Routes)
```typescript
import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { GEO_MARKETS } from '@/lib/data/geo';

export const alt = 'K-Aqua Local Markets';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';
export const runtime = 'edge';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function Image({ params }: Props) {
  const { locale, slug } = await params;
  
  const market = GEO_MARKETS.find((m) => m.slug === slug);
  if (!market) {
    return new Response('Not Found', { status: 404 });
  }

  // Load translations
  const tGeo = await getTranslations({ locale, namespace: 'geo' });
  const tRoot = await getTranslations({ locale });
  
  // Resolve localized regulator
  const geoContentTrans = tRoot.raw('geoContent') as Record<string, { regulator: string }> | undefined;
  const localizedRegulator = geoContentTrans?.[slug]?.regulator || market.regulator;

  // Load Outfit Bold font from the repository
  const outfitBold = await fetch(
    new URL('../../../../fonts/outfit-variable-latin.woff2', import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundImage: 'linear-gradient(135deg, #5B2D8C 0%, #0081A5 100%)',
          padding: '80px',
          color: '#ffffff',
          fontFamily: 'Outfit, sans-serif',
        }}
      >
        {/* Top Header: Logo + Eyebrow */}
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
              <path
                d="M16 2.5C16 2.5 26 13 26 20a10 10 0 1 1-20 0C6 13 16 2.5 16 2.5Z"
                fill="#ffffff"
              />
              <path
                d="M11.5 21.5a5 5 0 0 0 4 4.5"
                stroke="#5B2D8C"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <span style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.03em' }}>
              K-AQUA
            </span>
          </div>
          
          {/* Section Eyebrow */}
          <span
            style={{
              fontSize: '18px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#83DEEE',
            }}
          >
            {tGeo('eyebrow')}
          </span>
        </div>

        {/* Center: City & Market details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Country Label */}
          <span
            style={{
              fontSize: '20px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#83DEEE',
            }}
          >
            {market.country}
          </span>
          
          {/* City Title */}
          <span
            style={{
              fontSize: '80px',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            {market.city}
          </span>
          
          {/* Subtitle / Description */}
          <span
            style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 400,
              maxWidth: '850px',
              lineHeight: 1.3,
              marginTop: '8px',
            }}
          >
            {tGeo('cityTitle', { city: market.city })}
          </span>
        </div>

        {/* Bottom Panel: Regulatory Framework */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            paddingTop: '28px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span
              style={{
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'rgba(255, 255, 255, 0.5)',
                fontWeight: 600,
              }}
            >
              {tGeo('regFrame')}
            </span>
            <span style={{ fontSize: '18px', color: '#ffffff', fontWeight: 500 }}>
              {localizedRegulator}
            </span>
          </div>
          
          <span style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', fontWeight: 500 }}>
            d20–d630 · Made in Germany
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Outfit',
          data: outfitBold,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
```

---

## 5. Verification Method
To independently verify the implementation after writing the files:
1. **Compilation Check**: Run the command:
   ```bash
   pnpm typecheck && pnpm build
   ```
   Verify that the build compiles successfully without type mismatches or unresolved import errors in the Open Graph segments.
2. **Runtime Verification**:
   * Spin up the dev server: `pnpm dev`
   * Direct your browser or an API tool (like `curl`) to test the OpenGraph route segment outputs:
     * General segment: `http://localhost:3000/de/opengraph-image`
     * City segment: `http://localhost:3000/de/maerkte/frankfurt/opengraph-image`
   * Confirm that the output content type headers match `image/png` and render the K-AQUA logo, Outfit text, and the gradient background.
