> ⚠️ **SUPERSEDED von `PIPELINE-3.0-MASTER.md`.** Diese Datei ist Phase-1-Historie
> (Next.js-Fundament, Stand vor der Echt-Katalog-Integration) und bleibt nur als Referenz
> stehen. Für einen frischen Build **immer** `./PIPELINE-3.0-MASTER.md` verwenden — sie
> fusioniert diesen Plan, `pipeline-2.0/` und die neue Phase 3.0 (79-Artikel-Realkatalog +
> Deep-Content DE/EN/AR) zu einer einzigen, aktuellen Pipeline.

# 🚀 KICKOFF — diesen Text der KI geben

> **So benutzt du diese Datei:** Lade den ganzen Ordner `kaqua-antigravity/` in Google
> Antigravity 2.0 (oder Cursor / Claude Code / eine andere Agenten-IDE) und gib der KI als
> allerersten Auftrag den **kompletten Inhalt zwischen den Linien unten** (oder einfach:
> „Lies und befolge `KICKOFF.md`"). Damit holt sich die KI selbstständig den gesamten Kontext
> und beginnt strukturiert mit dem Bau der Website.

---

```prompt
ROLLE
Du bist der Lead-Orchestrator-Agent für den Bau der K-Aqua-Firmenwebsite (Kunde: KWT GmbH).
Du arbeitest in diesem Repository. Ziel: aus dem fertigen HTML-Prototyp eine produktionsreife
Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4 · Framer Motion ·
next-intl Web-Applikation bauen — vollständig, deploybar, mehrsprachig (de/en/ar).

SCHRITT 0 — KONTEXT HOLEN (zwingend, bevor du Code schreibst)
Lies in dieser exakten Reihenfolge VOLLSTÄNDIG und fasse jede Datei in 2–3 Sätzen für dich zusammen:
1. START_HERE.md
2. agents/RULES.md            ← verbindliche Regeln; haben Vorrang vor allem anderen
3. docs/ROUTE_MAP.md
4. docs/DATA_CONTRACTS.md
5. docs/TOKENS.md
6. docs/DESIGN_SYSTEM_BRIDGE.md
7. app/globals.css            ← der fertige Design-Token-Layer (nicht neu erfinden)
8. Verschaffe dir einen Überblick über prototype/ — das ist die QUELLE DER WAHRHEIT für
   Verhalten, Layout und Inhalt. Öffne prototype/K-Aqua Redesign.html sowie die kaqua-*.jsx/css/js.
9. Lies alle Arbeitspakete agents/00_*.md bis agents/26_*.md, damit du den Gesamtplan kennst.

SCHRITT 1 — BESTÄTIGEN
Gib eine kurze Bestätigung aus: (a) welche 18 Routen + 27 Geo-Seiten entstehen, (b) welche
3 Locales freigeschaltet sind und warum die übrigen gesperrt bleiben, (c) die 6 goldenen Regeln
aus RULES.md in einem Satz je Regel. Erst danach mit dem Bau beginnen.

SCHRITT 2 — SEQUENZIELL BAUEN
Arbeite die Pakete agents/00 → agents/26 strikt der Reihe nach ab. Für jedes Paket:
  - Lies den Prompt + die dort genannten prototype/-Input-Dateien erneut gezielt.
  - Implementiere exakt nach dessen Aufgabe und Output-Pfaden.
  - Erfülle die Definition of Done des Pakets.
  - Quality-Gate, bevor du zum nächsten Paket gehst:
        pnpm lint && pnpm typecheck    (ab Paket 06 zusätzlich:  pnpm i18n:check)
    Müssen grün sein. Bei Rot: beheben, nicht weitergehen.
  - Hake das Paket in docs/AGENT_LOG.md ab (Datum + Kurznotiz).

UNVERHANDELBARE REGELN (Details in agents/RULES.md)
  1. Universelle i18n — KEIN sichtbarer Text hartkodiert; alles über next-intl. ESLint erzwingt es.
  2. Sprach-Reinheit — eine Sprache erst freischalten, wenn 100 % übersetzt; nie Mischsprache ausliefern.
  3. Keine Bilder im Code — nur <MediaSlot>-Platzhalter; echte Assets später aus CMS/public.
  4. Keine erfundenen Inhalte — markierte // TODO(content)-Platzhalter so belassen.
  5. Nur semantische Tokens aus docs/TOKENS.md — kein Hex im Markup; Dark Mode via [data-theme].
  6. A11y (WCAG AA) + Motion (useReducedMotion) + RTL (logische Properties) durchgängig.

ARBEITSSTIL
  - Der Prototyp ist Referenz: Logik/Inhalt aus den echten Dateien übernehmen, NICHT aus dem Gedächtnis.
  - Den framework-freien Globus (prototype/kaqua-loader.js) 1:1 kapseln, nicht neu schreiben.
  - Frag nicht nach Bestätigung zwischen den Paketen — arbeite autonom bis Paket 26, halte nur bei
    echten Blockern (fehlende Entscheidung, Konflikt in den Regeln) an und formuliere die Frage präzise.

FERTIG, WENN
  pnpm install && pnpm build && pnpm start aus einem frischen Clone sauber läuft, alle freigeschalteten
  Seiten statisch generiert sind, Lint/Typecheck/i18n:check/Tests grün sind und die globale
  Definition of Done aus agents/RULES.md §10 erfüllt ist.

Beginne jetzt mit SCHRITT 0.
```

---

### Kurzfassung für dich (Mensch)
- **Hochladen:** den **gesamten Ordner** `kaqua-antigravity/`.
- **Erster Auftrag an die KI:** „Lies und befolge `KICKOFF.md`." (oder den Block oben einfügen).
- Die KI liest dann selbstständig START_HERE → RULES → docs → Prototyp → alle Agenten-Prompts
  und baut die Website Paket für Paket (00 → 26) mit Quality-Gates dazwischen.
