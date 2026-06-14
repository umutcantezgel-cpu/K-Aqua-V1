# Agent 00 — Orientierung & Architektur

> **Du baust nichts.** Dein Job: das Projekt verstehen und einen kurzen Architektur-Check
> als `docs/AGENT_LOG.md` anlegen, damit alle folgenden Agenten denselben Kontext haben.

## Lies in dieser Reihenfolge
1. `START_HERE.md`
2. `agents/RULES.md` (verbindlich)
3. `docs/ROUTE_MAP.md`, `docs/DATA_CONTRACTS.md`, `docs/TOKENS.md`, `docs/DESIGN_SYSTEM_BRIDGE.md`
4. `prototype/K-Aqua Redesign.html` (Einstieg) und die Struktur der `prototype/kaqua-*.jsx`-Dateien

## Verstehe das Mentale Modell
- Der Prototyp ist eine **React-SPA mit Hash-Routing** (`kaqua-app.jsx` → `VIEWS`/`resolveView`). Jede View wird in Next.js zu einer eigenen Route (`docs/ROUTE_MAP.md`).
- Texte kommen aus **3 i18n-Ebenen**: Kern-UI (`kaqua-i18n.jsx`), Seiten-Dictionaries (`kaqua-i18n-pages.jsx`, `…-ar.jsx`). Hook im Prototyp: `useT()` / `usePageL(viewKey)`.
- Der **Globus** (`kaqua-loader.js`) ist framework-frei und wird 1:1 als Client Component gekapselt.
- Es gibt **keine** Bild-Assets — alle Flächen sind Slots.

## Aufgabe
Lege `docs/AGENT_LOG.md` an mit:
- einer Tabelle „Prototyp-Datei → Ziel-Artefakt(e)" (aus ROUTE_MAP + DATA_CONTRACTS verdichtet),
- der Liste freigeschalteter Locales (`de`, `en`, `ar`) + Sperrgrund der übrigen,
- einem „Risiken/Platzhalter"-Abschnitt (die `// TODO(content)`-Datensätze aus DATA_CONTRACTS),
- einer leeren Checkliste „Agent 01 … 26 erledigt am / von".

## Definition of Done
- `docs/AGENT_LOG.md` existiert und benennt für jede der 18 Routen die Quell-View.
- Keine Code-Änderung außer dieser Datei.
