# Next.js 15 Web App Manifest Investigation Report

## 1. Observation
The following file patterns and tokens were observed during directory inspection and code analysis:

*   **Next.js Version**: In `package.json` line 20:
    ```json
    "next": "15.3.0",
    ```
*   **Theme and Background Color Tokens**:
    *   In `app/globals.css` lines 206–207:
        ```css
        [data-theme="dark"] {
          color-scheme: dark;
          --background: #0A0A0F;
        ```
    *   In `app/globals.css` lines 174–175:
        ```css
        [data-theme="light"] {
          color-scheme: light;
          --background: oklch(0.985 0.004 300);
        ```
    *   In `app/globals.css` line 111:
        ```css
        /* brand hue ramp — K-Aqua purple, base #5B2D8C ≈ --brand-600 */
        ```
    *   In `docs/DESIGN_SYSTEM_BRIDGE.md` line 29:
        ```markdown
        | Primärfarbe | Teal `#147a7a` | **Violett `#5B2D8C`** + Aqua-Akzent | K-Aqua-Markenidentität (Wasser/Vertrauen) |
        ```
    *   In `docs/DESIGN_SYSTEM_BRIDGE.md` line 31:
        ```markdown
        | Dark Mode | Slate `#020617` | **OLED `#0A0A0F`** | Vorgabe aus dem K-Aqua-Briefing |
        ```
*   **Existing Assets**:
    *   In `public/`, no image or favicon files exist (only `data/countries-110m.json`).
    *   In `next.config.ts` lines 9–10:
        ```typescript
        // The prototype ships ZERO bitmap assets — every image surface is a <MediaSlot>.
        ```
    *   In `components/ui/Logo.tsx`, the logo is rendered via inline SVG paths.
*   **Site Metadata Description**:
    *   In `messages/en.json` line 108:
        ```json
        "lead": "K-Aqua develops and manufactures PP-R/PP-RCT piping systems for drinking water — from 20 to 630 mm, in partnership with premium manufacturer KESSEL.",
        ```
    *   In `messages/de.json` line 108:
        ```json
        "lead": "K-Aqua entwickelt und fertigt PP-R/PP-RCT-Rohrsysteme für Trinkwasser — von 20 bis 630 mm, in Partnerschaft mit dem Premiumhersteller KESSEL.",
        ```

---

## 2. Logic Chain
1.  **Metadata Routing**: In Next.js 15, the Web App Manifest is generated dynamically or statically by exporting a default function in `app/manifest.ts` that returns a `MetadataRoute.Manifest` object. Placed in `app/manifest.ts`, Next.js will automatically route it to `/manifest.json` (or `/manifest.webmanifest`) and set the `Content-Type` header to `application/manifest+json`.
2.  **Color Token Alignment**:
    *   `theme_color`: The primary K-Aqua brand purple is `#5B2D8C` (representing `--brand-600` / light `--primary`). Using Hex instead of `oklch` ensures full compatibility with the Web App Manifest specification across all PWA-capable browsers.
    *   `background_color`: The light mode background `oklch(0.985 0.004 300)` is a very light pinkish-gray. Converted to a standard CSS hex format, it approximates `#FAFAFA` (or `#FCFCFC`). Since `light` is the default theme, `#FAFAFA` should be used for the splash screen's background color.
3.  **Missing Assets Strategy**: Since the prototype contains zero bitmap assets, we must define paths like `/favicon.ico`, `/icon-192.png`, and `/icon-512.png` in the manifest and instruct the implementer to create these assets in `public/` (or in the `app` folder using Next.js 15 special static metadata files like `app/icon.png` and `app/apple-icon.png`).
4.  **Language and Localization**: While dynamic request-locale resolution can be done, a standard fallback version serving the primary German/English meta description is the recommended default for a static-served manifest.

---

## 3. Caveats
*   The actual PNG icon files (`icon-192.png`, `icon-512.png`) and `favicon.ico` do not yet exist in `public/` or `app/` and need to be designed and exported by the frontend or design engineering team.
*   Media queries for theme switching (light/dark mode background color) are not supported in standard Web App Manifest JSON files. Therefore, static colors (`#5B2D8C` theme color and `#FAFAFA` background color) are used as standard fallbacks.

---

## 4. Conclusion
We propose creating the `app/manifest.ts` file in the root of the `app/` directory (`/Users/umurey/Downloads/kaqua-antigravity 2/app/manifest.ts`).

### Proposed File Implementation (`app/manifest.ts`)
```typescript
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'K-Aqua',
    short_name: 'K-Aqua',
    description: 'K-Aqua develops and manufactures PP-R/PP-RCT piping systems for drinking water — from 20 to 630 mm, in partnership with premium manufacturer KESSEL.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAFA',
    theme_color: '#5B2D8C',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
```

---

## 5. Verification Method
1.  **Compile & Run Build**:
    *   Run `pnpm run build` or `npm run build` to verify the TypeScript compilation of `app/manifest.ts` does not throw any type errors.
2.  **Verify Route Resolution**:
    *   Start the local development server with `pnpm run dev`.
    *   Navigate to `http://localhost:3000/manifest.json` and ensure it serves the correct JSON layout with a `200 OK` status and the header `Content-Type: application/manifest+json`.
3.  **Validate HTML Link Header**:
    *   Verify that `<link rel="manifest" href="/manifest.json" />` is correctly injected in the HTML head when inspecting the page source.
