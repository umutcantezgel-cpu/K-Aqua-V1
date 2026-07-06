# Project: K-Aqua Next.js Corporate Website

## Architecture
- **Tech Stack:** Next.js 15, React 19, Tailwind CSS 4, next-intl, Framer Motion
- **Internationalization (i18n):** Root layout handles locales `de`, `en`, and `ar`. Middleware routes dynamic routes with locale prefixing. No raw text literals in JSX/TSX.
- **RTL Support:** Standard logical properties are used for margins, padding, spacing, and positioning to natively support Arabic formatting.
- **Globe Component:** Framework-free custom Canvas D3 Drap & Drag/ inertia/ flyTo globe encapsulated in standard React components.
- **Dynamic SEO Metadata:** Centralized metadata generator under `lib/seo/metadata.ts` dynamic schemas under `<JsonLd>`.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|---|---|---|---|
| 00 | Orientation | Project setup and architecture check | None | DONE |
| 01 | Scaffold & Toolchain | Folder structure, Next.js init, toolchain config | 00 | DONE |
| 02 | Design-Tokens | Verify globals.css and Tailwind 4 theme variables | 01 | DONE |
| 03 | UI-Primitives | Core components (Buttons, Cards, Badge, MediaSlot) | 02 | DONE |
| 04 | Icons & Motion-Primitives | Setup icon packages and transition animations | 03 | DONE |
| 05 | i18n-Infrastruktur | next-intl routes, middleware setup | 04 | DONE |
| 06 | i18n-Inhalte & Übersetzung | Localization dictionary verification | 05 | DONE |
| 07 | App-Shell | Navigation, footer, header wrapper layouts | 06 | DONE |
| 08 | Mega-Menü & Sprachwähler | MegaMenu and language picker interactivity | 07 | DONE |
| 09 | Page-Transitions | Droplet-wipe transition template | 08 | DONE |
| 10 | Globus-Engine | Kaqua-loader implementation and offline data setup | 09 | DONE |
| 11 | Home Page | Hero scrollytelling and main sections | 10 | DONE |
| 12 | Core Static Pages | Products, Solutions, Company, News, Contact | 11 | DONE |
| 13 | Finder & CO₂ | Product filter and CO2 calculator tools | 12 | DONE |
| 14 | Trust, Partner, Academy | Academy, Trust Center, and Partner views | 13 | DONE |
| 15 | Karriere & RFQ | Careers search, RFQ wizard flows | 14 | DONE |
| 16 | References Globe | Reference projects list integrated with Globe | 10, 15 | DONE |
| 17 | Geo Markets Hub | Country regions map and filtering | 10, 16 | DONE |
| 18 | Geo City Pages (pSEO) | Programmatic SEO pages for 27 cities | 17 | DONE |
| 19 | SEO Metadata & JSON-LD | Metadata dynamic generator and SEO schema markup | 18 | DONE |
| 20 | Sitemap, Robots, OG | Sitemap, Robots, dynamic Edge OG Image generators | 19 | DONE |
| 21 | Performance Optimization | Core Web Vitals, SSG checking, LCP improvements | 20 | IN_PROGRESS |
| 22 | Accessibility Audit | Keyboard, contrast, screen readers (WCAG AA) | 21 | PLANNED |
| 23 | Testing & CI | Test run scripts, verification pipeline config | 22 | PLANNED |
| 24 | Content Layer / CMS | Local content schema / loader | 23 | PLANNED |
| 25 | Vercel Deployment | Vercel config & adapters | 24 | PLANNED |
| 26 | Handover & Visual Regression | Visual regression testing & final cleanup | 25 | PLANNED |

## Code Layout
- `app/` - Next.js App Router root layout and pages.
  - `[locale]/` - Locale-prefixed pages for localization.
- `components/` - Shared UI elements and feature components.
  - `globe/` - Globe engine and interactive globe viewer.
  - `layout/` - Standard app shell (header, footer, nav, theme toggle).
  - `sections/` - Main page components (hero scrollytelling, buyers).
  - `seo/` - JSON-LD and SEO schema markup helper components.
  - `tools/` - Multi-step forms (calculator, finder, rfq wizard).
  - `ui/` - Primitives (Button, Card, MediaSlot, etc.).
- `lib/` - Shared utility files and data hooks.
- `messages/` - Localization JSON dictionaries.
- `public/` - Static assets and datasets (D3 geography topographies).
