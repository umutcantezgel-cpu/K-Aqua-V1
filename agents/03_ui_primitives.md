# Agent 03 — UI-Primitives

## Input
`prototype/kaqua-ui.jsx`, `prototype/kaqua-components.css`, `docs/TOKENS.md`.

## Aufgabe — `components/ui/` als typisierte, dokumentierte Komponenten
Verhalten und Styles 1:1 aus dem Prototyp, aber als Tailwind-Utilities (keine eigene CSS-Datei mehr,
wo vermeidbar) + `class-variance-authority` für Varianten:

- **`Button.tsx`** — CVA: `variant` (primary/ghost/inverse), `size` (sm/md/lg). Immer `min-h-[44px]`
  (sm 44, md 48, lg 56), `inline-flex items-center gap-2 font-heading font-semibold rounded-lg`,
  `active:scale-[0.97] focus-visible:ring-2 ring-ring`, Hover: primary → `-translate-y-0.5 shadow-lift`.
  Optional `icon`-Slot (führend ODER nachgestellt, nie beides). Rendert `<a>` bei `href`, sonst `<button>`.
- **`Card.tsx`** (BentoCard) — `bg-card border border-card-border rounded-xl shadow-diffuse p-8`,
  Hover `-translate-y-[3px] shadow-lift`, `tint`-Prop → `bg-card-tint`.
- **`SectionHead.tsx`**, **`Eyebrow.tsx`** (Overline: `text-tiny font-bold tracking-wider uppercase text-primary` + Strich-Element).
- **`IconChip.tsx`**, **`Chip.tsx`**, **`FilterChip.tsx`** (`aria-pressed`), **`StatNumber.tsx`**, **`CTABand.tsx`** (`bg-inverse-surface` + radialer Glow), **`DataTable.tsx`**.
- **`Logo.tsx`** — der SVG-Tropfen + „K-AQUA"-Wortmarke aus `kaqua-ui.jsx` (`KAquaLogo`).
- **`MediaSlot.tsx`** — Platzhalter mit Label + `aspectRatio`-Prop (ersetzt `Photo`); KEINE echten Bilder.
- **`Reveal.tsx`** — siehe Agent 04 (Motion). Hier nur Re-Export, falls schon vorhanden.

## Regeln
- Texte als `children`/Props — diese Komponenten enthalten **keine** eigenen sichtbaren Literale.
- Alle Farben/Maße über Tokens (`docs/TOKENS.md`). Kein Hex.

## Definition of Done
- `app/[locale]/dev/ui/page.tsx` zeigt jede Primitive in beiden Themes; axe-clean.
- Button erfüllt 44px/Focus-Ring/Scale; `pnpm lint` + `pnpm typecheck` grün.
