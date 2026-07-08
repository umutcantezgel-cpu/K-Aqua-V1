# Agent 07 — App-Shell (Header, Footer, Layout-Chrome)

## Input
`prototype/kaqua-app.jsx` (Nav, Footer, ScrollProgress, Routing), `prototype/kaqua-fx.css`
(Glass-Nav, Footer-Glow), `docs/TOKENS.md`.

## Aufgabe — `components/layout/`
- **`Header.tsx`** (Client): `fixed top-0`, transparent; ab 8px Scroll Glassmorphism
  (`backdrop-blur-[16px] saturate-[1.4]` + `--nav-glass`/`--nav-border` + weicher Schatten).
  Inhalt: `Logo`, `NavLinks` (6 Hauptrouten aus `routing`/i18n `nav`), rechts `ThemeToggle`,
  `LangPicker`, Primär-CTA „Angebot anfragen" → `/projektanfrage`, Menü-Button (öffnet Mega-Menü, Agent 08).
- **`NavLinks.tsx`**: `next-intl`-`Link`, aktive Route via `usePathname` → `aria-current="page"`,
  Hover `bg-primary-soft`, 44px.
- **`Footer.tsx`**: `bg-inverse-surface text-inverse-foreground`, 4 Spalten (Marke + Tagline /
  Produkte & Tools / Unternehmen / Kontakt) aus i18n `footer`, radialer Brand-Glow-Orb, untere
  Leiste mit Impressum/Datenschutz. Alle Links über `next-intl`-`Link`.
- **`ScrollProgress.tsx`**: 2px Fortschrittsbalken oben (`bg-primary`), `aria-hidden`, rAF-gedrosselt.
- **`SkipLink.tsx`**: „Zum Inhalt springen" → `#main-content`.
- In `app/[locale]/layout.tsx` einsetzen: `SkipLink, ScrollProgress, Header, <main id="main-content">{children}</main>, Footer`.

## Regeln
- Alle Beschriftungen aus i18n (kein Literal). Logische Properties (RTL).
- Header-CTA und Menü-Button ≥44px, Focus-Ring, `active:scale-[0.97]`.

## Definition of Done
- Header wird nach 8px Scroll zu Glas; aktive Route ist markiert; Footer-Links navigieren.
- Tastatur: SkipLink zuerst fokussierbar; `pnpm lint`/`typecheck` grün; `/ar` spiegelt korrekt.
