> ⚠️ **SUPERSEDED von `PIPELINE-3.0-MASTER.md`.** Diese Datei ist Phase-2.0-Historie und
> bleibt nur als Referenz für den 12-Agenten-Loop stehen. Für einen frischen Build **immer**
> `./PIPELINE-3.0-MASTER.md` verwenden.

# KICKOFF — Antigravity 2.0 (Feature-Integration per Loop-Engineering)

**Paketstand: 2026-07-02 — inkl. REPAIR-RUNDE.** Wenn die Live-Seite beschädigt ist
(kaputter Build, Produktfinder leer), gilt: ZUERST `pipeline-2.0/REPAIR-RUNDE.md`
vollständig ausführen, erst danach normale Wellen.

Phase 1 (`agents/00–26`) hat das Next.js-Fundament aufgebaut.
**Phase 2.0 (`pipeline-2.0/`) integriert alle neuen Konzepte aus `prototype/` (Stand: heute) in die bestehende Live-Webseite** — als Langzeitaufgabe mit 12 Subagenten in gesteuerten Loops.

## So startest du
1. Diesen Ordner (`kaqua-antigravity/`) in den Workspace der bestehenden Webseite legen.
2. Dem Hauptagenten GENAU diesen Prompt geben:
   > Lies `kaqua-antigravity/pipeline-2.0/REPAIR-RUNDE.md` und führe sie zuerst aus (falls die Seite beschädigt ist). Danach: Lies `kaqua-antigravity/pipeline-2.0/00-orchestrator.md` und führe ihn aus. Arbeite streng nach `loop-protocol.md`, bis `ledger.md` für alle 12 Segmente ACCEPTED zeigt.
3. Nicht eingreifen, solange der Ledger Fortschritt zeigt. Eskalationen stellt der Orchestrator als Frage.

## Inhalt
- `pipeline-2.0/REPAIR-RUNDE.md` — Notfall-Wiederherstellung (hat Vorrang): Build grün → Finder neu (114 sichtbar) → Hero-Video raus + Globus RECHTS (animiert auf allen Endgeräten) → neuer Dropdown-Header → Gesamtabnahme
- `pipeline-2.0/00-orchestrator.md` — Steuerprompt (Wellenplan, Leitplanken)
- `pipeline-2.0/loop-protocol.md` — der Loop: SELECT→BRIEF→EXECUTE→VALIDATE→FIX/ACCEPT→LOG
- `pipeline-2.0/segments.md` — Segment-Map: Feature ↔ Referenzdateien ↔ Agent
- `pipeline-2.0/agent-01…12.md` — die 12 Subagenten-Prompts
- `pipeline-2.0/ledger.md` — Laufprotokoll (wird von den Agenten gepflegt)
- `prototype/` — lauffähige Referenz-Implementierung (öffne `K-Aqua Redesign.html`)
