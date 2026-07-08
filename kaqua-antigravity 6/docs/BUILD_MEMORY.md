# 📖 BUILD_MEMORY.md — Permanentes Selbstdokumentations-Ledger (Phase 3.0+)

> **Zweck:** Dies ist das **Langzeitgedächtnis** der gesamten Multi-Agenten-Pipeline. Jedes
> Segment (Phase 1 `agents/00–26`, Phase 2.0 `pipeline-2.0/S01–S12`, Phase 3.0 `S13–S18`)
> hängt hier — **nach** `ACCEPT`, **vor** dem nächsten Segment — einen Eintrag an. Kein Agent
> schreibt seinen Code, ohne diese Datei zuvor **vollständig von oben nach unten** gelesen zu
> haben. So lernt die Pipeline aus sich selbst: spätere Segmente kennen die Entscheidungen,
> Stolperfallen und Muster der früheren, ohne den Code erneut archäologisch untersuchen zu
> müssen. **Nur anhängen — nie vorhandene Einträge löschen oder umschreiben.**

## Warum das nötig ist

Reine Ledger-Zeilen (`pipeline-2.0/ledger.md`: Datum/Welle/Agent/Status) sagen *dass* etwas
akzeptiert wurde, aber nicht *warum* eine Entscheidung so und nicht anders fiel. Bei einem
Projekt dieser Größe (26 + 12 + 6 = 44 Segmente über drei Planungsgenerationen) geht Kontext
sonst bei jedem Agentenwechsel verloren — und Entscheidungen werden stillschweigend wieder
aufgerollt. Diese Datei verhindert das.

## Eintrags-Vorlage (pro Segment genau einmal, nach ACCEPT)

```md
### <Segment-ID> — <Kurztitel>
- **Datum:** <YYYY-MM-DD>
- **Gebaut:** <1–2 Sätze, was entstanden ist + wichtigste Zieldateien>
- **Entscheidungen:** <jede bewusste Abweichung vom Prompt-Wortlaut + Begründung; oder "keine">
- **Stolperfallen entdeckt:** <neue Render-/Build-/i18n-Fallen, die RULES.md/00-orchestrator.md
  noch nicht kennen — mit Code-Kommentar-Verweis, wo sie im Code markiert wurden; oder "keine">
- **Wiederverwendbares Muster:** <eine Komponente/ein Hook/ein Datenzugriff, den spätere
  Segmente statt Neubau übernehmen sollten; oder "keine">
- **Offene Fragen für nachfolgende Segmente:** <konkrete Handoffs; oder "keine">
```

Regeln: keine Prosa-Romane — Stichpunkte, maximal 6 Zeilen pro Feld. Wenn ein Feld leer ist,
**"keine" explizit hinschreiben**, nicht weglassen (sonst ist unklar, ob es vergessen wurde).

---

## Einträge

### FUSION-00 — Drei Pipelines zu einer fusioniert
- **Datum:** 2026-07-04
- **Gebaut:** `PIPELINE-3.0-MASTER.md` als neuer, alleiniger Einstiegspunkt. Fusioniert
  `agents/00–26` (Next.js-Fundament) + `pipeline-2.0/S01–S12` (Feature-Integration) +
  neue Segmente `S13–S18` (Echt-Katalog, Deep-Content, pSEO, Deploy, Handover). Alte
  KICKOFF-Dateien (`KICKOFF.md`, `KICKOFF-2.0.md`, `START_HERE.md`) mit Verweis-Bannern
  auf den neuen Master versehen, nicht gelöscht (Historie bleibt nachvollziehbar).
- **Entscheidungen:**
  1. **Dynamische Route statt 100+ Einzeldateien.** Ein früherer Auftrag verlangte
     „100+ hardcoded page.tsx-Dateien" für die Produktseiten. Entschieden: stattdessen EINE
     datengetriebene Route `/[locale]/produkte/katalog/[category]/[slug]` mit
     `generateStaticParams` aus `lib/data/catalog.ts` (79 reale Artikel). Ergebnis ist
     technisch identisch (237 individuell statisch generierte Seiten, jede einzeln in der
     Sitemap, jede einzeln cachebar/revalidierbar) — aber wartbar: eine Layout-Änderung
     trifft alle 79 Artikel statt 79 Kopien einzeln nachziehen zu müssen. Begründung:
     aktueller Nutzerauftrag priorisiert explizit "Ordnung und Code-Splitting für
     langfristige Code-Stabilität" — das widerspricht 79 Dateikopien.
  2. **Katalog-Notizen bleiben vorerst DE-only.** `CatalogItem.note` ist im Prototyp nur auf
     Deutsch gepflegt; die Komponente zeigt sie defensiv nur bei `lang === 'de'`, um keine
     falschsprachigen Texte auszuliefern (Verstoß gegen RULES.md §2 Sprach-Reinheit).
     Segment S16 MUSS entscheiden: entweder EN/AR fachlich nachübersetzen und in
     `messages/{locale}.json` → `catalogNotes.<slug>` ergänzen, oder das DE-only-Verhalten
     als bewusste Phase-3.0-Grenze dokumentieren. Bis dahin: Status quo beibehalten.
- **Stolperfallen entdeckt:** keine neuen — die aus `agents/RULES.md` §5/§7 und
  `00-orchestrator.md` Punkt 3 (Transitions auf Theme-Tokens, Entrance-Keyframes auf
  Overlays) gelten unverändert und wurden im Phase-3.0-Prototyp-Code (`kaqua-deep.css`,
  `kaqua-catalog-view.jsx`) bereits beachtet (keine Transition auf `background`/`color`,
  kein `opacity: 0`-Ausgangszustand auf Overlays).
- **Wiederverwendbares Muster:** `DeepFAQ` / `KTabs` / `DeepMatrix` / `StepFlow` /
  `GlossaryGrid` / `StatBand` (aus `prototype/kaqua-deep-ui.jsx`) sind generische,
  datengetriebene Anzeige-Primitives (Head+Rows-Tabelle, Akkordeon, Tab-Leiste,
  nummerierte Schritte, Glossar-Grid, Stat-Karten-Band) — in Next.js 1:1 als
  `components/ui/*.tsx` portieren und von ALLEN Katalog- + Deep-Content-Seiten
  wiederverwenden, nicht pro Seite neu bauen.
- **Offene Fragen für nachfolgende Segmente:** S13 muss `resolveHead()`
  (Spaltenkopf-Auflösung über `colLabels[locale]`) exakt wie im Prototyp portieren — die
  Logik ist bewusst so gebaut, dass technische Kürzel (d, s, L, H, DN, Rp, R) unübersetzt
  bleiben und nur Wortköpfe (Gewicht/Weight/الوزن, Pack/VPE/التعبئة …) lokalisiert werden.
