# K-Aqua Design Library — Skill

Wiederverwendbare Design-Bibliothek der Marke **K-Aqua** (KWT GmbH — „Leading in Water Supply"): PP-R/PP-RCT-Rohrsysteme für Trinkwasser. Nutze diese Bibliothek für ALLE K-Aqua-Oberflächen (Websites, Tools, Landingpages, interne Apps).

## Quick Start

1. **CSS einbinden:** `<link rel="stylesheet" href="styles.css" />` — lädt Tokens (Light + OLED-Dark), Komponenten-CSS und die Fonts Outfit/Inter aus `fonts/`.
2. **Theme:** `data-theme="light"` oder `"dark"` am `<html>`. Dark ist OLED (#0A0A0F).
3. **React-Komponenten:** aus `components/{core,forms,data}/` kopieren — reine Wrapper über `.k-*`-Klassen, funktionieren ohne Build-Step.
4. **Regeln & Stimme:** `readme.md` lesen (Content Fundamentals + Visual Foundations).

## Eiserne Regeln

- Nur **semantische Tokens** (`--background`, `--card`, `--primary`, `--primary-soft`, `--accent`, `--ring`, `--inverse-surface`…) — nie Roh-Hex.
- Headings **Outfit 800** (fluid clamp), Body **Inter** 16px/1.65. Genau EIN `.k-grad-text`-Wort pro Headline.
- Karten: `--radius-lg` 24px, 1px `--card-border`, `--shadow-diffuse` → Hover `--shadow-lift` + -3px Y.
- Jede Interaktion: Hover-State, Press `scale(0.97)`, Fokus-Ring 2px `--ring`, Touch ≥ 44px.
- Icons: Lucide, Stroke 2 (Inline-Kopien in `kaqua-ui.jsx` → `Icons`). Keine Emoji.
- Motion 150/250/600ms, `prefers-reduced-motion` respektieren.
- Sprache: DE „Sie"-Form; Claims englisch; Zahlen schlagen Adjektive.

## Inventar

- `guidelines/` — Spezimen: Farben, Typografie, Spacing/Radien/Schatten, Buttons/Chips, Karten/Tabellen, Formulare, Marke
- `components/core/` — Button, IconButton, Card, Chip, FilterChip, SectionHead, Stat, Logo
- `components/forms/` — CheckItem, Slider · `components/data/` — DataTable
- Größere Muster (Mega-Menü, Hero mit `--hero-wash`, CTA-Band, Bento-Raster `.k-bento`, Globus) direkt aus dem Prototyp forken: `K-Aqua Redesign.html` + `kaqua-views-*.jsx`.
