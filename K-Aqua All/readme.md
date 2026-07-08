# K-Aqua Design Library

> **K-Aqua — Leading in Water Supply.** Wiederverwendbare Design-Bibliothek der Marke K-Aqua (KWT GmbH): Tokens, Typografie, Farben, Komponenten und Nutzungsregeln. Quelle ist der produktionsreife Website-Prototyp in diesem Projekt (`K-Aqua Redesign.html`).

## Kontext & Quellen

- **Marke:** K-Aqua, Hersteller von PP-R/PP-RCT-Rohrsystemen für Trinkwasser (d20–d630), KWT GmbH, Waldsolms. Partnermarke: KESSEL („Leading in drainage").
- **Quelle der Wahrheit:** der Prototyp-Code dieses Projekts — `kaqua-tokens.css` (Tokens), `kaqua-components.css` (Komponenten-CSS), `kaqua-fx.css` (Interaktions-/Effekt-CSS), `kaqua-ui.jsx` (Referenz-Implementierungen) sowie die Original-Website www.k-aqua.de (Inhalte).
- **Sprachen:** DE ist Quellsprache; EN und AR (RTL) vollständig gepflegt. Markenclaims bleiben immer englisch.
- **Einstieg für Konsumenten:** `styles.css` (lädt Tokens + Komponenten-CSS + Fonts). Komponenten unter `components/`, Spezimen-Karten unter `guidelines/`.

## Index

```
styles.css            ← globaler Einstieg (@imports, Fonts inklusive)
kaqua-tokens.css      ← Farb-/Typo-/Spacing-/Radius-/Schatten-/Motion-Tokens (Light + OLED-Dark)
kaqua-components.css  ← .k-btn, .k-card, .k-chip, .k-table, Nav, Footer …
kaqua-fx.css          ← Mega-Menü, Marquee, Filter-Chips, Slider, Quiz, RTL, Glove-Mode
fonts/                ← Outfit + Inter (variable, woff2)
components/
  core/               ← Button, IconButton, Card, Chip, FilterChip, SectionHead, Stat, Logo
  forms/              ← CheckItem, Slider
  data/               ← DataTable
guidelines/           ← Spezimen-Karten (Farben, Typo, Spacing, Brand)
SKILL.md              ← Agent-Skill-Einstieg (portabel)
```

## Content Fundamentals

- **Stimme:** präzise, ingenieursgetrieben, selbstbewusst ohne Buzzwords. Kurze Aussagesätze, gern Zweitakter: „Keine Textwüste. Werkzeuge." / „Zwei Marken. Eine Haltung."
- **Anrede:** durchgehend **„Sie"**. Keine Du-Form.
- **Claims:** „Leading in Water Supply" bleibt in JEDER Sprache englisch; ebenso Produkt-/Bereichsnamen (Trust Center, Academy).
- **Zahlen schlagen Adjektive:** „d20–d630", „SDR 6/7,4/9/11/17", „ISO 9001 · 14001 · 50001" — konkrete Werte statt „hochwertig".
- **Casing:** Headlines im Satzbau (deutsche Substantiv-Großschreibung), Eyebrows VERSAL mit Letterspacing, Buttons Satzanfang groß.
- **Emoji:** niemals. Trenner: Mittelpunkt `·` in Metazeilen, Gedankenstrich `—` im Fließtext.
- **CTA-Labels:** imperativ + direkt: „Jetzt filtern", „Projekt anfragen", „Paket anfordern", „Produktsystem entdecken".

## Visual Foundations

- **Farben:** Markenviolett (Ramp `--brand-50…900`, Kern ≈ `#5B2D8C`) + Aqua-Akzent (`--aqua-300…600`). Alle Verwendung über **semantische Tokens**: `--background`, `--foreground`, `--card`, `--card-border`, `--primary`, `--primary-soft`, `--accent`, `--ring`, `--inverse-surface` … Nie Roh-Hex im Markup.
- **Dark Mode:** OLED-optimiert (`#0A0A0F`, nie reines Schwarz), umgeschaltet über `[data-theme="dark"]` am `<html>`.
- **Typografie:** `--font-heading` = **Outfit** (800 für H1/H2, 700 für H3, -0.02…-0.03em Tracking), `--font-body` = **Inter** (400/600, line-height 1.65). Fluid Scale via `clamp()` — H1 40→76px, H2 30→46px. Gradient-Highlight (`.k-grad-text`) für je EIN Schlüsselwort pro Headline.
- **Spacing:** 4pt/8pt-System (`--sp-1…--sp-24`), Sektionen `clamp(64px, 9vw, 120px)`, Container max 1200px.
- **Radii:** `--radius` 16px (Buttons, Inputs), `--radius-lg` 24px (Karten), `--radius-full` für Chips/Pills.
- **Schatten:** zwei diffuse Stufen — `--shadow-diffuse` (Ruhe) → `--shadow-lift` (Hover). Keine harten Schatten, kein Neumorphismus.
- **Hintergründe:** heller, fast weißer Grund; Heros mit `--hero-wash` (zwei weiche radiale Farbinseln); dunkle CTA-Bänder auf `--inverse-surface` mit einem violetten Glow-Orb. Keine Vollflächen-Gradients.
- **Glassmorphism:** nur für Navigation/Chips (`--nav-glass` + `backdrop-blur(16px) saturate(1.4)`), nie für Inhaltskarten.
- **Karten:** `--card` + 1px `--card-border` + `--radius-lg` + `--shadow-diffuse`; Hover: `translateY(-3px)` + `--shadow-lift`. Tint-Variante `--card-tint` für Hervorhebung. Keine farbigen Links-Border-Akzente.
- **Motion:** 150ms (Hover-Farben), 250ms (Standard), Reveals 600ms `cubic-bezier(0.16,1,0.3,1)` mit 22px-Y-Versatz, gestaffelt 60–80ms. Seiten-Wipe 820ms `cubic-bezier(0.76,0,0.24,1)`. Immer `prefers-reduced-motion` respektieren.
- **Interaktion:** Hover = Farbe dunkler/heller + Lift; Press = `active:scale(0.97)`; Fokus = 2px `--ring` Outline mit 2px Offset; Touch-Targets ≥ 44px (Glove-Mode: 64px via `[data-glove="on"]`).
- **Bilder:** keine Bild-Assets in der Bibliothek — Bildflächen sind beschriftete Slots (Seitenverhältnis + Label), Fotos kommen redaktionell. Bildsprache wenn vorhanden: technisch, hell, sauber (Rohrsysteme, Fertigung).

## Iconography

- **Icon-System:** [Lucide](https://lucide.dev) — Stroke 2, runde Kappen, 24er-Raster. Im Prototyp als 1:1-Inline-SVG-Kopien (`kaqua-ui.jsx` → `Icons`), in Produktion `lucide-react`.
- **Kerngrößen:** 16–20px inline/Buttons, 24px in Icon-Chips (48px-Chip mit `--primary-soft`-Fläche), 28px+ nur dekorativ.
- **Regel:** Icons begleiten Text, ersetzen ihn nie. Pro Button maximal EIN Icon (führend ODER folgend). In RTL werden Richtungs-Icons gespiegelt.
- **Logo:** Tropfen-Bildmarke (SVG, `--primary`-Füllung mit heller Binnenlinie) + Wortmarke „K-AQUA" in Outfit 800. React: `components/core/Logo.jsx`. Kein Emoji, keine Unicode-Zeichen als Icons.

## Komponenten (React, `components/`)

| Komponente | Datei | Kern-Props |
|---|---|---|
| Button | `core/Button.jsx` | `variant` primary·ghost·inverse, `size` sm·md·lg, `icon`, `href`, `disabled` |
| IconButton | `core/IconButton.jsx` | `label` (aria), `active` |
| Card | `core/Card.jsx` | `tint`, `hover` |
| Chip / FilterChip | `core/Chip.jsx`, `core/FilterChip.jsx` | `on` (FilterChip, aria-pressed) |
| SectionHead | `core/SectionHead.jsx` | `eyebrow`, `title`, `lead`, `align` |
| Stat | `core/Stat.jsx` | `value`, `unit`, `label` |
| Logo | `core/Logo.jsx` | `height` |
| CheckItem | `forms/CheckItem.jsx` | `checked`, `onChange`, `title`, `description` |
| Slider | `forms/Slider.jsx` | `min`, `max`, `step`, `value`, `onChange`, `label` |
| DataTable | `data/DataTable.jsx` | `head[]`, `rows[][]` |

Alle Komponenten sind stilistisch reine Wrapper über das dokumentierte CSS (`.k-*`-Klassen) — dieselben Klassen funktionieren auch ohne React.

## Caveats

- Text-Inputs/Selects existieren im Prototyp nicht (die Marke arbeitet mit Chips, Slidern, Checkboxen) — bei Bedarf nach dem Muster `--radius` 16px + `--card-border` + Fokus-Ring ergänzen.
- Echte Fotos/Referenzbilder fehlen bewusst; Bildsprache-Guides bitte mit echtem Material schärfen.
