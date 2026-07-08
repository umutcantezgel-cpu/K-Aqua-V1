# Agent 11 — Home (Hero-Scrollytelling)

## Input
`prototype/kaqua-views-1.jsx` (`HomeView`), `prototype/kaqua-scrolly.jsx` (`HeroScrolly`),
`prototype/kaqua-views-6.jsx` (`HomeBuyers`), `prototype/kaqua-fx.css` (Scrolly-/Marquee-Styles),
`docs/TOKENS.md`. Texte aus i18n-Namespaces `home`, `homex`, `buyers`.

## Aufgabe — `app/[locale]/page.tsx` + `components/sections/`
Reihenfolge der Home-Sektionen exakt wie im Prototyp:
1. **Hero-Scrollytelling** (`components/sections/HeroScrolly.tsx`, Client): rechts der auto-rotierende
   Globus (Agent 10). Beim Scrollen wandert er auf **Kreisbahn** zur Mitte, wächst (~×1.5), Glow steigt;
   Hero-Copy faded nach oben weg; 4 Glas-Karten („Made in Germany / d20–d630 / Triple certified /
   27 markets") ploppen gestaffelt auf. rAF-gedrosselte Scroll-Choreografie mit direkten DOM-Transforms
   (kein React-Re-Render pro Frame). **Fallback** (`prefers-reduced-motion` ODER `< 900px`): statisches
   Layout — Globus rechts, Karten als Grid darunter.
2. **Marquee-Band** (i18n `home.marquee`).
3. **4 Stat-Cards** (Bento).
4. **HomeBuyers** — Persona-Sektion (Planer/Einkauf/Installateure) + „Sechs Gründe" + Vertrauens-Chips → CTA `/projektanfrage`.
5. **Tools-Bento** (6 Karten → finder/co2/academy/references/trust/career).
6. **„Branche vs. K-Aqua"-Vergleich** (zwei Spalten).
7. **Unternehmens-Bento** (KESSEL-Partnerschaft etc.).
8. **CTA-Band** (`bg-inverse-surface`).

## Regeln
- Globus als `dynamic(ssr:false)`. Alle Texte aus i18n. `MediaSlot` statt Bildern. `Reveal`/`Stagger` für Einblendungen.

## Definition of Done
- `/de`, `/en`, `/ar` rendern die Home vollständig; Scrollytelling läuft flüssig, Fallback greift mobil/reduced-motion.
- LCP-Element ist Text (nicht der Globus); CLS < 0.1; `pnpm lint`/`typecheck` grün.
