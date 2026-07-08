# LOOP-PROTOKOLL (Antigravity 2.0)

Jedes Segment durchläuft diesen Zyklus. Kein Schritt darf übersprungen werden.

## Zyklus
1. **SELECT** — Orchestrator wählt das nächste Segment gemäß Wellenplan
   (Blocker zuerst, keine Dateikonflikte mit laufenden Agenten).
2. **BRIEF** — Orchestrator erstellt das Arbeitspaket:
   - Ziel (1 Satz) + Referenzdateien aus `prototype/`
   - Zieldateien in der Live-Codebasis
   - Akzeptanzkriterien (aus Agentenprompt + segments.md)
   - Verbote (Leitplanken aus 00-orchestrator.md, Abschnitt „Nicht verhandelbar")
3. **EXECUTE** — Subagent setzt um. Regeln:
   - Kleine, nachvollziehbare Commits/Änderungen; eine Datei = ein Eigentümer pro Welle.
   - Verhalten 1:1 aus `prototype/` übernehmen, Technologie an die Live-Codebasis anpassen
     (z. B. React-Komponente statt Babel-Script) — Design-Ergebnis muss pixel-äquivalent sein.
4. **VALIDATE** — Agent 12 prüft gegen die Akzeptanzkriterien:
   - Konsole fehlerfrei auf allen betroffenen Seiten (Desktop + 390 px mobil)
   - Sichtprüfung gegen `prototype/` (gleiches Layout, helle Flächen, Animation läuft)
   - reduced-motion-Prüfung, Tastatur-Fokus-Prüfung
5. **FIX-LOOP** — Bei Befund: zurück an den Subagenten mit präziser Fehlerliste.
   Maximal **3** Fix-Runden pro Segment.
6. **ACCEPT + LOG** — Agent 12 setzt `ACCEPTED`; Orchestrator schreibt Ledger-Zeile.

## Eskalation
Nach 3 erfolglosen Fix-Runden: Orchestrator entscheidet dokumentiert —
(a) Scope minimal kürzen (Kern behalten, Politur als Folgesegment) oder
(b) EINE präzise Frage an den Menschen stellen. Niemals still scheitern.

## Parallelität & Locks
- Max. 3 Subagenten gleichzeitig.
- Dateilock: Wer eine Datei im Ledger als `LOCK` einträgt, ist alleiniger Schreiber,
  bis seine Zeile `ACCEPTED`/`REJECTED` trägt.
- Geteilte Dateien (Tokens, i18n) ändert in Welle 2–3 nur Agent 01 bzw. 10 auf Zuruf.

## Ledger-Zeilenformat (in ledger.md anhängen)
`| <Datum> | <Welle> | <Agent#> | <Segment> | <Status: LOCK/IN-ARBEIT/FIX-n/ACCEPTED> | <geänderte Dateien> | <Prüfnotiz Agent 12> |`
