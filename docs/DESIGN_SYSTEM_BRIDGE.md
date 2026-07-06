# Design-System-Brücke — K-Aqua ↔ Coday

> Wie die K-Aqua-Marke auf die **Coday-Design-System-Konventionen** abgebildet ist.
> Coday ist die Agentur, die diese Website baut; das Coday-System liefert die
> **Engineering-Konventionen** (Token-Architektur, Typo, Spacing, Icon-Strategie).
> Die **Marke** bleibt K-Aqua (eigenes Violett + Aqua-Akzent).

---

## Was von Coday übernommen wird (verbindlich)

| Coday-Konvention | Umsetzung im K-Aqua-Build |
|---|---|
| Schriftpaar **Outfit (Display) + Inter (Body)** | `--font-heading` / `--font-body` via `next/font/local` |
| **φ-basierte Typo-Skala** (`--text-h1 … --text-tiny`, fluid clamp) | 1:1 in `app/globals.css` als `--fs-*` → `--text-*` |
| **Semantische-Token-Disziplin** — kein Hex im Markup | erzwungen; nur `var(--*)`/Tailwind-Semantik-Utilities |
| Tier-1 Primitive → Tier-2 Semantik → Komponenten-Aliase | gleiche Schichtung (`--brand-*` → `--primary` → Button) |
| **Fibonacci-Spacing**, Radii (`button=lg/16`, `card=xl/24`, `pill=full`) | gespiegelt |
| **Shadow-Elevationen** + Brand-`glow` für Primary-Hover | `--shadow-diffuse / lift / glow` |
| **Phosphor-Icons** als Hausset | siehe Icon-Hinweis unten |
| Voice: „Sie", deutsch-first, imperative CTAs, **keine Emoji** | i18n-Dictionaries folgen dem |
| `prefers-reduced-motion` global gekürzt | in `globals.css` + jeder Motion-Komponente |
| Sticky-Glass-Nav, Dark-Section mit Glow-Orb | App-Shell (Agent 07/08) |

## Wo K-Aqua bewusst abweicht (Marke schlägt Default)

| Thema | Coday-Default | K-Aqua | Grund |
|---|---|---|---|
| Primärfarbe | Teal `#147a7a` | **Violett `#5B2D8C`** + Aqua-Akzent | K-Aqua-Markenidentität (Wasser/Vertrauen) |
| Farbraum | Hex-Ramps | **oklch**-Ramps | gleichmäßige Helligkeit über Light/Dark, saubere Tweak-Berechnung |
| Dark Mode | Slate `#020617` | **OLED `#0A0A0F`** | Vorgabe aus dem K-Aqua-Briefing |
| H1-Casing | UPPERCASE | sentence-case + Gradient-Highlight | längere DE/AR-Headlines bleiben lesbar |

> **Migrationsschalter (optional):** Soll K-Aqua doch im Coday-Teal erscheinen, nur
> die `--brand-*`-Rampe in `globals.css` auf die Coday-`--color-primary-*`-Werte
> setzen — die gesamte semantische Schicht zieht automatisch nach. Kein Komponenten-Code ändert sich.

## Icons — Phosphor vs. lucide

Der Prototyp nutzt **inline lucide-kompatible** SVGs (`kaqua-ui.jsx → Icons`). Coday-Hausset ist **Phosphor**.
Für die Produktion: **`lucide-react`** ist im Scaffold gesetzt (kleineres Tree-Shaking, exakte Namensgleichheit zum Prototyp).
Wer strikt Coday-konform sein will, tauscht das Icon-Modul gegen `@phosphor-icons/react` — das Mapping liegt in
`agents/04_icons_and_motion_primitives.md`. **Eine** Bibliothek wählen, nicht mischen.

## Token-Namensbrücke (Cheat-Sheet)

```
K-Aqua semantic         Coday äquivalent              Tailwind-Utility (K-Aqua)
─────────────────────   ───────────────────────────   ─────────────────────────
--background            --color-bg-primary            bg-background
--background-subtle     --color-bg-secondary          bg-background-subtle
--foreground            --color-text-primary          text-foreground
--muted-foreground      --color-text-secondary        text-muted-foreground
--faint-foreground      --color-text-tertiary         text-faint-foreground
--card                  --color-card-bg               bg-card
--card-border           --color-card-border           border-card-border
--primary               --color-primary-700           bg-primary / text-primary
--primary-hover         --color-primary-800           hover:bg-primary-hover
--primary-foreground    --color-button-primary-text   text-primary-foreground
--primary-soft          --color-bg-accent             bg-primary-soft
--accent                --color-accent-*              text-accent
--ring                  (focus outline)               ring-ring
--inverse-surface       --color-bg-inverse            bg-inverse-surface
--text-h1 … --text-tiny --text-h1 … --text-tiny       text-h1 … text-tiny
--shadow-diffuse/lift   --shadow-sm/md/lg             shadow-diffuse / shadow-lift
```

Die exakten Coday-Werte liegen in `/projects/<design-system>/colors_and_type.css`
(148 Tokens). Wer Coday-Komponenten 1:1 forken will, kann diese Datei zusätzlich
einbinden — Namenskollisionen gibt es keine (Coday nutzt `--color-*`-Präfix,
K-Aqua die kürzeren semantischen Namen).
