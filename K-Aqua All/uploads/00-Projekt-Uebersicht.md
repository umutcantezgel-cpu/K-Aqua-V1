# Projekt-Übersicht & Anforderungen


## KICKOFF.md
```markdown
# 🚀 KICKOFF — diesen Text der KI geben

> **So benutzt du diese Datei:** Lade den ganzen Ordner `kaqua-antigravity/` in Google
> Antigravity 2.0 (oder Cursor / Claude Code / eine andere Agenten-IDE) und gib der KI als
> allerersten Auftrag den **kompletten Inhalt zwischen den Linien unten** (oder einfach:
> „Lies und befolge `KICKOFF.md`"). Damit holt sich die KI selbstständig den gesamten Kontext
> und beginnt strukturiert mit dem Bau der Website.

---

```prompt
ROLLE
Du bist der Lead-Orchestrator-Agent für den Bau der K-Aqua-Firmenwebsite (Kunde: KWT GmbH).
Du arbeitest in diesem Repository. Ziel: aus dem fertigen HTML-Prototyp eine produktionsreife
Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4 · Framer Motion ·
next-intl Web-Applikation bauen — vollständig, deploybar, mehrsprachig (de/en/ar).

SCHRITT 0 — KONTEXT HOLEN (zwingend, bevor du Code schreibst)
Lies in dieser exakten Reihenfolge VOLLSTÄNDIG und fasse jede Datei in 2–3 Sätzen für dich zusammen:
1. START_HERE.md
2. agents/RULES.md            ← verbindliche Regeln; haben Vorrang vor allem anderen
3. docs/ROUTE_MAP.md
4. docs/DATA_CONTRACTS.md
5. docs/TOKENS.md
6. docs/DESIGN_SYSTEM_BRIDGE.md
7. app/globals.css            ← der fertige Design-Token-Layer (nicht neu erfinden)
8. Verschaffe dir einen Überblick über prototype/ — das ist die QUELLE DER WAHRHEIT für
   Verhalten, Layout und Inhalt. Öffne prototype/K-Aqua Redesign.html sowie die kaqua-*.jsx/css/js.
9. Lies alle Arbeitspakete agents/00_*.md bis agents/26_*.md, damit du den Gesamtplan kennst.

SCHRITT 1 — BESTÄTIGEN
Gib eine kurze Bestätigung aus: (a) welche 18 Routen + 27 Geo-Seiten entstehen, (b) welche
3 Locales freigeschaltet sind und warum die übrigen gesperrt bleiben, (c) die 6 goldenen Regeln
aus RULES.md in einem Satz je Regel. Erst danach mit dem Bau beginnen.

SCHRITT 2 — SEQUENZIELL BAUEN
Arbeite die Pakete agents/00 → agents/26 strikt der Reihe nach ab. Für jedes Paket:
  - Lies den Prompt + die dort genannten prototype/-Input-Dateien erneut gezielt.
  - Implementiere exakt nach dessen Aufgabe und Output-Pfaden.
  - Erfülle die Definition of Done des Pakets.
  - Quality-Gate, bevor du zum nächsten Paket gehst:
        pnpm lint && pnpm typecheck    (ab Paket 06 zusätzlich:  pnpm i18n:check)
    Müssen grün sein. Bei Rot: beheben, nicht weitergehen.
  - Hake das Paket in docs/AGENT_LOG.md ab (Datum + Kurznotiz).

UNVERHANDELBARE REGELN (Details in agents/RULES.md)
  1. Universelle i18n — KEIN sichtbarer Text hartkodiert; alles über next-intl. ESLint erzwingt es.
  2. Sprach-Reinheit — eine Sprache erst freischalten, wenn 100 % übersetzt; nie Mischsprache ausliefern.
  3. Keine Bilder im Code — nur <MediaSlot>-Platzhalter; echte Assets später aus CMS/public.
  4. Keine erfundenen Inhalte — markierte // TODO(content)-Platzhalter so belassen.
  5. Nur semantische Tokens aus docs/TOKENS.md — kein Hex im Markup; Dark Mode via [data-theme].
  6. A11y (WCAG AA) + Motion (useReducedMotion) + RTL (logische Properties) durchgängig.

ARBEITSSTIL
  - Der Prototyp ist Referenz: Logik/Inhalt aus den echten Dateien übernehmen, NICHT aus dem Gedächtnis.
  - Den framework-freien Globus (prototype/kaqua-loader.js) 1:1 kapseln, nicht neu schreiben.
  - Frag nicht nach Bestätigung zwischen den Paketen — arbeite autonom bis Paket 26, halte nur bei
    echten Blockern (fehlende Entscheidung, Konflikt in den Regeln) an und formuliere die Frage präzise.

FERTIG, WENN
  pnpm install && pnpm build && pnpm start aus einem frischen Clone sauber läuft, alle freigeschalteten
  Seiten statisch generiert sind, Lint/Typecheck/i18n:check/Tests grün sind und die globale
  Definition of Done aus agents/RULES.md §10 erfüllt ist.

Beginne jetzt mit SCHRITT 0.
```

---

### Kurzfassung für dich (Mensch)
- **Hochladen:** den **gesamten Ordner** `kaqua-antigravity/`.
- **Erster Auftrag an die KI:** „Lies und befolge `KICKOFF.md`." (oder den Block oben einfügen).
- Die KI liest dann selbstständig START_HERE → RULES → docs → Prototyp → alle Agenten-Prompts
  und baut die Website Paket für Paket (00 → 26) mit Quality-Gates dazwischen.

```

## START_HERE.md
```markdown
# 🌊 K-Aqua → Produktions-Website · Antigravity-Startpunkt

> **Du willst nur loslegen?** → Gib der KI den Inhalt von [`KICKOFF.md`](./KICKOFF.md)
> (oder sag „Lies und befolge `KICKOFF.md`"). Sie holt sich dann selbstständig den ganzen
> Kontext und baut die Website Paket für Paket. Der Rest dieser Datei ist Nachschlagewerk.

Willkommen, Agent. Dieser Ordner ist **direkt in eine IDE / Google Antigravity 2.0 importierbar**
und enthält alles, um aus dem fertigen HTML-Prototyp eine produktionsreife
**Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · next-intl**
Firmenwebsite für die **KWT GmbH (Marke K-Aqua)** zu bauen.

---

## Was hier liegt

```
kaqua-antigravity/
├─ START_HERE.md            ← dies hier
├─ package.json             ← Abhängigkeiten + Scripts (fertig)
├─ tsconfig.json            ← TypeScript strict (fertig)
├─ next.config.ts           ← next-intl-Plugin verdrahtet (fertig)
├─ tailwind.config.ts       ← content globs + darkMode (fertig)
├─ postcss.config.mjs       ← Tailwind 4 (fertig)
├─ eslint.config.mjs        ← inkl. i18n-Guard jsx-no-literals (fertig)
├─ middleware.ts            ← next-intl Locale-Routing (fertig)
├─ .env.example  .gitignore
├─ app/
│  └─ globals.css           ← KOMPLETTER Design-Token-Layer (fertig) ★
├─ fonts/                   ← Outfit + Inter (variable woff2, fertig)
├─ docs/
│  ├─ ROUTE_MAP.md          ← jede Route + Quell-View + Render-Strategie
│  ├─ DATA_CONTRACTS.md     ← TS-Interfaces für lib/data/ + Platzhalter-Liste
│  ├─ TOKENS.md             ← erlaubte Klassen/Variablen (Spickzettel)
│  ├─ RULES.md-Verweis      → liegt unter agents/RULES.md
│  └─ DESIGN_SYSTEM_BRIDGE.md ← K-Aqua ↔ Coday-Konventionen
├─ agents/
│  ├─ RULES.md              ← ⚠️ VERBINDLICH — zuerst lesen
│  ├─ 00_orientation.md … 26_handover.md  ← die Arbeitspakete (sequenziell)
└─ prototype/              ← der HTML-Prototyp = QUELLE DER WAHRHEIT
   ├─ K-Aqua Redesign.html
   ├─ kaqua-*.jsx / *.css / *.js
```

★ `app/globals.css` ist bereits vollständig — Farben (light + OLED-dark), φ-Typo-Skala,
Spacing, Radii, Schatten, Motion, als Tailwind-4 `@theme`. Agent 02 verifiziert nur noch.

---

## Goldene Regeln (Kurzfassung — Details in `agents/RULES.md`)

1. **Universelle i18n** — kein hartkodierter sichtbarer Text. ESLint erzwingt es.
2. **Sprach-Reinheit** — eine Sprache erst freischalten, wenn 100 % übersetzt. Kein Mischmasch.
3. **Keine Bilder im Code** — nur `<MediaSlot>`-Platzhalter.
4. **Keine erfundenen Inhalte** — Platzhalter als `// TODO(content)` belassen.
5. **Nur semantische Tokens** — kein Hex im Markup.
6. **A11y + Motion + RTL** — 44px-Targets, focus-ring, `useReducedMotion`, logische Properties.

Der **Prototyp ist Referenz für Verhalten und Inhalt** — nicht aus dem Gedächtnis nachbauen,
sondern die echten Quelldateien in `prototype/` lesen.

---

## Arbeitsweise (Multi-Agenten)

Die Prompts in `agents/` sind **sequenziell nummeriert (00 → 26)** und in sich abgeschlossen:
jeder nennt **Input-Dateien**, **Aufgabe**, **Output-Pfade** und eine prüfbare **Definition of Done (DoD)**.

- **Ein Agent pro Prompt.** Reihenfolge einhalten — spätere bauen auf früheren auf.
- Jeder Agent liest zuerst `agents/RULES.md`, dann seinen Prompt, dann die genannten Prototyp-Dateien.
- Nach jedem Paket: `pnpm lint && pnpm typecheck` (+ ab Agent 04 `pnpm i18n:check`) müssen grün sein, bevor der nächste Agent startet.

### Sequenz auf einen Blick
| # | Paket | # | Paket |
|--|--|--|--|
| 00 | Orientierung & Architektur | 14 | Trust / Partner / Academy |
| 01 | Scaffold & Toolchain | 15 | Karriere & RFQ (Käufer-Strecke) |
| 02 | Design-Tokens verifizieren | 16 | Referenzen (Globus) |
| 03 | UI-Primitives | 17 | Geo — Märkte-Hub (360°-Welt) |
| 04 | Icons & Motion-Primitives | 18 | Geo — Stadt-Seiten (pSEO) |
| 05 | i18n-Infrastruktur | 19 | SEO: Metadata & JSON-LD |
| 06 | i18n-Inhalte & Übersetzung | 20 | Sitemap / robots / OG |
| 07 | App-Shell (Nav/Footer) | 21 | Performance |
| 08 | Mega-Menü & Sprachwähler | 22 | Accessibility-Audit |
| 09 | Page-Transitions | 23 | Testing & CI |
| 10 | Globus-Engine | 24 | Content-Layer / CMS (Phase 2) |
| 11 | Home (Hero-Scrollytelling) | 25 | Deployment (Vercel) |
| 12 | Statische Kernseiten | 26 | Visuelle Regression + Übergabe |
| 13 | Produktfinder & CO₂ | | |

Wenn du Agent 00 bist: lies `agents/RULES.md` und `agents/00_orientation.md` und leg los.

```

## ORIGINAL_REQUEST.md
```markdown
# Original User Request

## Initial Request — 2026-06-14T12:19:53Z

# Teamwork Project Prompt — Draft

> Status: Step 1 — Eliciting project idea
> Goal: Craft prompt → get user approval → delegate to teamwork_preview

Implement the complete frontend for the K-Aqua corporate website, porting a provided HTML/JS prototype into a production-ready Next.js 15 app following a rigid 26-step sequential plan.

Working directory: /Users/umurey/Downloads/kaqua-antigravity 2

## Requirements

### R1. Complete the 26 sequential work packages
Execute the tasks defined in `agents/01_*.md` through `agents/26_handover.md` strictly in order, fully adhering to `agents/RULES.md`. Ensure each step's Definition of Done is met.

### R2. Strict i18n & Pure Languages
No hardcoded user-visible text. All text must use `next-intl`. `de`, `en`, and `ar` are enabled. Do not invent translations or mix languages.

### R3. Media & Content placeholders
Do not insert images or make up data. Use `<MediaSlot>` for images and retain `// TODO(content)` for placeholders like CO2 factors and certificates.

### R4. Design & A11y Fidelity
Only use semantic Tailwind tokens (no hex colors in markup). Enforce accessibility (WCAG AA, focus states, min 44px targets) and strict RTL logical properties.

## Acceptance Criteria

### Execution & Build
- [ ] `pnpm build` completes with zero errors or warnings.
- [ ] All 135 pages (18 routes + 27 geo pages across 3 locales) are statically generated (SSG) where specified.

### Code Quality & i18n
- [ ] `pnpm lint` and `pnpm typecheck` pass successfully.
- [ ] `pnpm i18n:check` passes, confirming identical key sets for all locales.
- [ ] No hardcoded text is present in the UI (enforced via `react/jsx-no-literals`).

### Validation
- [ ] All 26 steps in `docs/AGENT_LOG.md` are checked off.

## Follow-up — 2026-06-27T12:32:00Z

# Teamwork Project Prompt — Draft

> Status: Ready for launch — awaiting user approval
> Goal: Craft prompt → get user approval → delegate to teamwork_preview

Build over 100 new, hardcoded product subpages for K-Aqua based on the content provided in the "docs Unterseiten" directory. Develop an ultra-premium, reusable component system (e.g., Bento-Grids, Scroll-Animations) to assemble these pages, ensuring the design quality outshines all award-winning sites.

Working directory: /Users/umurey/Downloads/kaqua-antigravity 2
Integrity mode: development

## Requirements

### R1. Ultra-Premium Component System
Design and implement a highly flexible, premium React component system tailored for product presentations. This should include modern layout patterns like Bento Grids, sophisticated typography, and smooth scroll-driven animations. The visual execution must feel expensive and state-of-the-art.

### R2. 100+ Hardcoded Product Pages
Parse the documentation provided in the "docs Unterseiten" directory and generate individual, hardcoded Next.js page components (`page.tsx`) for every single product or accessory listed. Use the component system from R1 to build these pages uniformly but as distinct files.

### R3. Internationalization (i18n)
All new pages must integrate seamlessly with the existing `next-intl` setup. Do not hardcode raw strings into the UI; instead, extract all product content into the appropriate locale message dictionaries (e.g., `de.json`, `en.json`, `ar.json`) and reference them in the page components.

## Acceptance Criteria

### Project Completion & Quality
- [ ] At least 100 new individual `page.tsx` files have been created for the products defined in `docs Unterseiten`.
- [ ] A new suite of premium UI components (for layouts, animations, product showcases) is implemented and actively used by the generated pages.
- [ ] All textual content is properly abstracted using `next-intl` dictionaries, with no hardcoded display text in the components.
- [ ] Running `npx -y pnpm build` completes successfully without any compilation or routing errors across the new pages.
- [ ] A sample review confirms the pages correctly display the technical specifications, descriptions, and structural data from the original source documents.

## Follow-up — 2026-07-02T18:43:38Z

Orchestrate a 12-subagent pipeline (Antigravity 2.0) to redesign the K-Aqua website. The team must strictly follow a loop protocol (SELECT → BRIEF → EXECUTE → VALIDATE → FIX → ACCEPT → LOG) and adhere to a light, professional design with no regressions, matching a prototype reference.

Working directory: /Users/umurey/Downloads/kaqua-antigravity 2
Integrity mode: development

## Requirements

### R1. Pipeline Execution
Execute the 12-subagent pipeline logic as specified in the pipeline definitions (located in the "K-Aqua Parts" folder or provided in context). If files are missing or incomplete, infer the pipeline steps to match a 12-agent loop protocol.

### R2. Design Constraints
The output must use a light, professional design with no dark areas. Use existing design tokens only, without introducing new hex colors. Implement accessible touch targets (≥ 44px) and support `prefers-reduced-motion`. Do not use transitions on token-bound properties or entrance keyframes on overlays.

### R3. Regression & Feature Parity
Bestehende Funktionen dürfen nicht regressieren. The final build must retain all current functionalities and support three languages (DE, EN, AR) for new strings.

## Acceptance Criteria

### Verification Method
Verification will be performed using an **agent-as-judge** rubric. An independent agent must evaluate the codebase against the following criteria before certifying completion:

### Checkable Criteria
- [ ] The build (`npm run build`) must succeed without errors.
- [ ] `ledger.md` must contain a log for all 12 segments, ending with "RELEASE-OK" by Agent 12.
- [ ] All new strings must be present in DE, EN, and AR translation files.
- [ ] CSS files and inline styles must not contain any new hardcoded hex colors (only variable usage is permitted).
- [ ] No dark mode or dark-themed areas exist in the newly implemented UI.

```

## README.md
```markdown
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

```

