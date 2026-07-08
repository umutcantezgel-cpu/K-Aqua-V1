# 🌊 K-Aqua → Produktions-Website · Antigravity-Startpunkt

> ## ⚠️ NEUER STARTPUNKT: [`PIPELINE-3.0-MASTER.md`](./PIPELINE-3.0-MASTER.md)
> Dieser Ordner enthält drei Planungsgenerationen (`agents/00–26`, `pipeline-2.0/`,
> jetzt **Phase 3.0**). Sie sind zu **einer** Pipeline fusioniert. Gib der KI:
> „Lies und befolge `PIPELINE-3.0-MASTER.md`." — mehr nicht. Alles unten ist historisches
> Nachschlagewerk der Phase 1 und bleibt nur wegen der Arbeitspaket-Feinheiten erhalten.

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
