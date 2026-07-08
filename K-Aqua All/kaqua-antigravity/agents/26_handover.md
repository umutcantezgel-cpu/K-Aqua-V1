# Agent 26 — Visuelle Regression & Übergabe

## Aufgabe
1. **Visueller Abgleich gegen den Prototyp** (`prototype/K-Aqua Redesign.html`): Screenshots von
   Home (Hero + Scrollytelling-Endzustand), Bento-Grids, Mega-Menü, `/maerkte` (Globus), einer
   Geo-Seite, Dark Mode, `/ar` (RTL). Abweichungen dokumentieren und beheben oder begründen.
2. **Funktions-Smoke-Test**: Sprachwechsel (inkl. dir-Wechsel), Theme-Toggle ohne Flash, Globus-Drag
   mit Trägheit + flyTo, RFQ-Wizard bis Mail, Finder/CO₂/Quiz, Page-Wipe ohne hängendes Overlay.
3. **Doku finalisieren**: `docs/AGENT_LOG.md` (alle Pakete abgehakt), `docs/lighthouse.md`,
   `docs/a11y.md`, Liste offener `// TODO(content)` als `docs/CONTENT_TODO.md`.
4. **README.md** im Projekt-Root schreiben: Setup (`pnpm install && pnpm dev`), Scripts, Architektur-
   Kurzfassung, Verweis auf `docs/` + `agents/`, Phase-2-Ausblick.

## Definition of Done
- `pnpm install && pnpm build && pnpm start` läuft sauber aus einem frischen Clone.
- Alle globalen DoD aus `agents/RULES.md §10` erfüllt; Abweichungsliste zum Prototyp dokumentiert.
- Projekt ist übergabe-/deploybereit.
