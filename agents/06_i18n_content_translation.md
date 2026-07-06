# Agent 06 — i18n-Inhalte & Übersetzung (universell)

## Input
`prototype/kaqua-i18n.jsx` (Kern-UI), `prototype/kaqua-i18n-pages.jsx` + `…-ar.jsx` (Seitentexte),
`agents/RULES.md` (§1 universelle i18n, §2 Sprach-Reinheit).

## Aufgabe
1. **Vollständige Migration** aller Prototyp-Strings nach `messages/{de,en,ar}.json`, exakt nach der
   Namespace-Struktur aus `docs/DATA_CONTRACTS.md`. Pro View ein Namespace; Geo-Fließtexte unter
   `geoContent.<slug>`. Nichts auslassen — Marquee, Footer, Quiz, RFQ-Wizard, Tooltips, aria-Labels.
2. **i18n-Guard erfüllen:** sicherstellen, dass spätere Seiten-Agenten **jeden** Text aus diesen
   Dictionaries ziehen können — fehlende Schlüssel jetzt ergänzen, nicht später hartkodieren.
3. **Restsprachen vorbereiten** (`fr, es, it, pt, nl, pl, tr, ru, zh`): pro Sprache eine
   `messages/<locale>.json` mit **identischer Schlüsselmenge**, professionell aus `de` übersetzt.
   Unsichere Stellen `@review` markieren. **Erst** nach bestandenem `pnpm i18n:check` und Lektorat
   in `routing.locales` aufnehmen (RULES §2) — bis dahin NICHT freischalten.
4. Marken-Claims in allen Sprachen englisch lassen; Zahlen/Datumsangaben via `Intl.NumberFormat`/
   `Intl.DateTimeFormat(locale)` formatieren (keine Strings mit fixem Format).

## Definition of Done
- `pnpm i18n:check` grün über alle vorhandenen `messages/*.json` (identische Keys).
- `de/en/ar` zu 100 % befüllt; Restsprachen vollständig in Keys, Werte übersetzt + `@review`-Liste in `docs/AGENT_LOG.md`.
- Keine sichtbaren englischen Reste in `de`/`ar` (außer erlaubten Marken-Eigennamen).
