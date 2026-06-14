# Agent 08 — Mega-Menü & Sprachwähler (Feinschliff)

## Input
`prototype/kaqua-app.jsx` (`MegaMenu`, `MEGA_LAYOUT`, `MEGA_SECTIONS`), `prototype/kaqua-fx.css`
(`.k-mega*`-Styles), `docs/ROUTE_MAP.md`.

## Aufgabe
- **`components/layout/MegaMenu.tsx`** (Client): Fullscreen-Overlay mit 3 Spaltengruppen
  („Produkte & Tools", „Wissen & Vertrauen", „Unternehmen") — Items + Untertitel aus i18n
  `groups` + `pages.<route>` (`[title, subtitle]`). Jede Gruppe entspricht `MEGA_LAYOUT`.
  - Öffnen: gestaffelte Einblendung (Framer Motion, `useReducedMotion` → nur Fade).
  - Schließen: `Esc`, Klick außerhalb, Routenwechsel. **Body-Scroll-Lock** währenddessen.
  - Volle Tastaturbedienung, Fokus-Falle im Overlay, `role="dialog"` + `aria-label`.
- **`LangPicker`** (aus Agent 05) hier final einbinden: Dropdown, nur freigeschaltete Locales,
  Häkchen an aktiver Sprache, persistiert.

## Definition of Done
- Menü öffnet/schließt per Maus + Tastatur; Fokus bleibt gefangen; Esc schließt; Body scrollt nicht.
- Items navigieren korrekt; in `/ar` ist das Grid gespiegelt. `pnpm lint`/`typecheck` grün.
