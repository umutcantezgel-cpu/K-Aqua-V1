# Token-Referenz — was im Code benutzt wird

Alle Werte sind in `app/globals.css` definiert. **Nur die hier gelisteten Namen verwenden.**
Kein roher Hex-Wert im Markup — niemals. Dark Mode schaltet über `[data-theme="dark"]`.

## Farben (semantisch) — Tailwind-Utility ← CSS-Variable

| Utility | Variable | Verwendung |
|---|---|---|
| `bg-background` | `--background` | Seiten-Hintergrund |
| `bg-background-subtle` | `--background-subtle` | abwechselnde Sektionen |
| `text-foreground` | `--foreground` | Standardtext, Headlines |
| `text-muted-foreground` | `--muted-foreground` | Fließtext, Sekundär |
| `text-faint-foreground` | `--faint-foreground` | Meta, Captions |
| `bg-card` `border-card-border` | `--card` `--card-border` | Karten |
| `bg-card-tint` | `--card-tint` | getönte Karten |
| `bg-primary` `text-primary` | `--primary` | Marke (Buttons, Links, Akzente) |
| `hover:bg-primary-hover` | `--primary-hover` | Button-Hover |
| `text-primary-foreground` | `--primary-foreground` | Text auf Primary |
| `bg-primary-soft` | `--primary-soft` | Icon-Chips, Hover-Flächen |
| `text-accent` `text-accent-strong` | `--accent` `--accent-strong` | Aqua-Akzent (sparsam) |
| `ring-ring` | `--ring` | Focus-Ring |
| `bg-inverse-surface` `text-inverse-foreground` | `--inverse-surface` `--inverse-foreground` | dunkle CTA-Bänder, Footer |

Nicht-Utility-Variablen (direkt via `var()` in CSS/Inline-Style): `--nav-glass`, `--nav-border`, `--hero-wash`.
Brand-Rampe `--brand-50…900`, Aqua `--aqua-300…600` nur als Escape-Hatch.

## Typo — Tailwind-Utility ← Variable (φ-Skala)

| Utility | Variable | px (fluid) |
|---|---|---|
| `text-display` | `--text-display` | 46 → 110 |
| `text-h1` | `--text-h1` | 40 → 76 |
| `text-h2` | `--text-h2` | 30 → 46 |
| `text-h3` | `--text-h3` | 20 → 28 |
| `text-h4` | `--text-h4` | 18 → 22 |
| `text-lead` | `--text-lead` | 19 |
| `text-body` | `--text-body` | 16 (Web-Minimum) |
| `text-small` | `--text-small` | 14 |
| `text-tiny` | `--text-tiny` | 12.6 (Overlines) |

Familien: `font-heading` (Outfit) für Headlines/Nav/CTA, `font-body` (Inter) für alles andere.
Gewichte: Headlines 800, H3/H4 700, Body 400, Overline 700 + `tracking-wider` + uppercase.

## Radien · Schatten · Motion

| Utility | Variable | Wert |
|---|---|---|
| `rounded-lg` | `--radius-lg` | 16px — Buttons, Inputs |
| `rounded-xl` | `--radius-xl` | 24px — Karten |
| `rounded-full` | `--radius-full` | Pills, Badges |
| `shadow-diffuse` | `--shadow-diffuse` | Karten in Ruhe |
| `shadow-lift` | `--shadow-lift` | Karten-Hover, schwebende Elemente |
| `shadow-glow` | `--shadow-glow` | Primary-Button-Emphase |

Dauern: `--dur-fast 150ms` (Hover), `--dur 250ms` (UI), `--dur-slow 500ms`, Reveals 600ms.
Easings: `--ease-out` (Reveals), `--ease-wipe` (Page-Transition), `--ease-spring`.
Immer `useReducedMotion()` respektieren.

## Spacing

4/8pt-System. Tailwind-Standardskala (`p-4`=16, `p-6`=24, `p-8`=32, `gap-4`…) deckt alles ab.
Sektionen: `py-[clamp(64px,9vw,120px)]` (= `--space-section`). Container: `max-w-[1200px]` + `--space-container`.
