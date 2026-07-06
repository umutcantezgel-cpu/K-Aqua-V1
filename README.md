# K-Aqua — Corporate Website

> **K-Aqua (KWT GmbH)** — High-end PP-R & PP-RCT Piping Systems  
> Next.js 15 · TypeScript · Tailwind CSS 4 · Framer Motion · next-intl

---

## Quick Start

```bash
# Prerequisites: Node.js ≥ 20.11, pnpm ≥ 9.15
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — the middleware will redirect to `/de`.

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build (SSG) |
| `pnpm start` | Start production server |
| `pnpm lint` | ESLint (includes i18n guard) |
| `pnpm typecheck` | TypeScript type checking |
| `pnpm i18n:check` | Verify locale key parity across all message files |
| `pnpm vendor:geo` | Vendor world-atlas TopoJSON to `public/data/` |

## Architecture

```
├── app/
│   ├── [locale]/          # Localized routes (de, en, ar)
│   │   ├── layout.tsx     # Root layout with ThemeProvider + NextIntlClientProvider
│   │   ├── template.tsx   # Page-wipe transition (AnimatePresence)
│   │   ├── page.tsx       # Home page
│   │   ├── not-found.tsx  # Localized 404 page
│   │   └── <route>/      # Feature routes (produkte, maerkte, service, etc.)
│   ├── globals.css        # Design tokens + utility classes
│   ├── fonts.ts           # Outfit + Inter font definitions
│   ├── manifest.ts        # PWA manifest
│   ├── robots.ts          # robots.txt generation
│   └── sitemap.ts         # Dynamic sitemap generation
├── components/
│   ├── globe/             # 3D globe (Three.js / Canvas)
│   ├── layout/            # Header, Footer, SkipLink, ScrollProgress
│   ├── sections/          # Page section components
│   ├── seo/               # JSON-LD structured data
│   ├── tools/             # Interactive tools (CO₂ calc, Finder, Career, etc.)
│   └── ui/                # Design primitives (Button, Card, Chip, MediaSlot, etc.)
├── lib/
│   ├── data/
│   │   ├── geo.ts         # Geo market data (27 markets, 4 regions)
│   │   ├── products.ts    # Product catalog (PP-R/PP-RCT matrix)
│   │   └── repositories.ts # Repository abstraction (Phase 2 CMS-ready)
│   ├── i18n/
│   │   ├── routing.ts     # Locale config (de, en, ar)
│   │   ├── request.ts     # Server-side message loading
│   │   └── navigation.ts  # Typed Link, redirect, usePathname, useRouter
│   └── seo/
│       └── metadata.ts    # Metadata + JSON-LD generators
├── messages/              # i18n dictionaries (de.json, en.json, ar.json + 9 locked)
├── middleware.ts           # Locale negotiation + redirect (/ → /de)
├── next.config.ts          # Security headers, image config, optimizations
├── docs/                   # Project documentation
└── agents/                 # Agent work package specifications (00–26)
```

## Key Design Decisions

### i18n (Internationalization)
- **Source language:** German (`de`)
- **Enabled locales:** `de`, `en`, `ar` (RTL)
- **Locked locales:** `fr`, `es`, `it`, `pt`, `nl`, `pl`, `tr`, `ru`, `zh` (pending 100% translation)
- All visible text via `useTranslations()` — ESLint enforced (`react/jsx-no-literals`)
- Brand names stay English across all locales (K-Aqua, PP-R, PP-RCT, Trust Center, Academy)

### Images & Media
- No images in code — every image surface uses `<MediaSlot>` placeholder
- Real photography comes from CMS in Phase 2 (see `docs/CMS_PLAN.md`)

### Styling
- Semantic Tailwind tokens only — no hex values in markup
- Dark mode via `next-themes` (`[data-theme="dark"]`)
- 4/8pt spacing grid, asymmetric Bento layouts

### Motion
- Framer Motion for reveals and page transitions
- `useReducedMotion()` respected — fade-only fallback
- Page-wipe transition in `template.tsx`

### Accessibility
- WCAG AA target (≥ 4.5:1 contrast in both themes)
- Skip link, proper focus order, `aria-current`, `aria-pressed`
- Touch targets ≥ 44×44px
- RTL fully supported via logical properties (`ps-/pe-/ms-/me-`, `start/end`)

## Documentation

| Document | Description |
|---|---|
| [`docs/AGENT_LOG.md`](docs/AGENT_LOG.md) | Build progress checklist (Agents 00–26) |
| [`docs/TOKENS.md`](docs/TOKENS.md) | Design token reference |
| [`docs/DATA_CONTRACTS.md`](docs/DATA_CONTRACTS.md) | TypeScript data interfaces |
| [`docs/ROUTE_MAP.md`](docs/ROUTE_MAP.md) | Route → page mapping |
| [`docs/DESIGN_SYSTEM_BRIDGE.md`](docs/DESIGN_SYSTEM_BRIDGE.md) | Prototype → Next.js design system bridge |
| [`docs/CONTENT_TODO.md`](docs/CONTENT_TODO.md) | All placeholder content requiring real data |
| [`docs/CMS_PLAN.md`](docs/CMS_PLAN.md) | Phase 2 CMS integration plan |
| [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) | Vercel deployment guide |
| [`docs/lighthouse.md`](docs/lighthouse.md) | Lighthouse audit results |
| [`agents/RULES.md`](agents/RULES.md) | Binding rules for all agents |

## Phase 2 Outlook

The following items are planned for Phase 2:

1. **CMS Integration** — Connect Sanity/Storyblok/Payload; swap static TS modules for CMS fetch (see [`docs/CMS_PLAN.md`](docs/CMS_PLAN.md))
2. **Real Content** — Fill in all `// TODO(content)` markers (see [`docs/CONTENT_TODO.md`](docs/CONTENT_TODO.md)):
   - CO₂/EPD factors from real datasheets
   - Certificate IDs + PDF uploads
   - Reference projects with photos
   - Validated norms per market
   - Actual benefits amounts from HR
3. **Real Images** — Replace `<MediaSlot>` with `next/image` + CMS assets
4. **ISR + Webhooks** — Incremental Static Regeneration with CMS publish triggers
5. **RFQ/Contact Form** — Email delivery via Resend API (currently mailto:)
6. **Analytics** — Connect analytics platform
7. **Additional Locales** — Enable `fr`, `es`, `it`, etc. after 100% translation review
8. **Lighthouse CI** — Automated performance checks on every PR

## License

Private — K-Aqua / KWT GmbH. All rights reserved.
