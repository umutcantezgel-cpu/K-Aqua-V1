# K-Aqua 3D — Produktions-Pipeline

Alles, was nötig ist, um die **50 fehlenden 3D-Produktmodelle** zu bauen.
21 sind fertig und dienen als Vorlage.

Geschrieben nach dem Bau dieser 21. Jede Regel hier ist aus einem echten
Fehler entstanden — die Dokumente nennen ihn jeweils, damit die Regel
nachvollziehbar bleibt und nicht als Willkür gelesen wird.

---

## Sofort loslegen

1. **`KICKOFF-PROMPT.md`** öffnen, den Block kopieren, als Systemprompt setzen.
2. Der Agent liest dann selbst `00-START-HIER.md`.

---

## Die Dokumente

| # | Datei | Inhalt | Umfang |
|---|---|---|---|
| — | `KICKOFF-PROMPT.md` | Systemprompt für Haupt- und Prüfagent | 5 kB |
| 00 | `00-START-HIER.md` | Die zehn Regeln, Ablauf, Erfolgskriterien | 7 kB |
| 10 | `10-SYSTEM-ARCHITEKTUR.md` | Core, Produkte, Galerie, Bau, Einheiten | 10 kB |
| 20 | `20-VISUELLE-REFERENZ.md` | **Wie die Teile aussehen** — verschriftlicht | 16 kB |
| 30 | `30-PHASENPLAN.md` | Die fünf Phasen je Produkt, mit Code | 10 kB |
| 40 | `40-FEHLERKATALOG.md` | **19 echte Fehler** mit Ursache und Behebung | 12 kB |
| 50 | `50-PRODUKT-VERTRAG.md` | Die Schnittstelle, formal | 9 kB |
| 60 | `60-GEOMETRIE-HANDBUCH.md` | Alle 26 Core-Funktionen mit Beispielen | 14 kB |
| 70 | `70-ARBEITSAUFTRAEGE.md` | **Alle 50 offenen Produkte**, in Baureihenfolge | 14 kB |
| 80 | `80-AGENTEN.md` | Rollen, Übergabeformate, Paarungsregel | 6 kB |
| 90 | `90-PRUEFKATALOG.md` | Abnahmeliste, Prüfungen, Bau, Fehlermeldungen | 8 kB |

**Zusammen 111 kB.** Ein Agent kann sie vollständig im Kontext halten.

---

## Die drei wichtigsten Dokumente

### `20-VISUELLE-REFERENZ.md`

Das Dokument, das die Bildwahrnehmung ersetzt. Es beschreibt in Worten:

- wie PP-R aussieht (halbmatt, leicht durchscheinend, Formtrennnaht sichtbar)
- den **verifizierten Farbwert** — Katalogfoto und Modell wurden pixelweise
  abgetastet, Abweichung 2 %
- die Formensprache jedes Muffenendes, in fünf Schritten von außen nach innen
- **Beschreibungen aller 50 offenen Produkte** — was man im Katalogfoto sieht
- zehn Symptome, an denen man ein falsches Modell erkennt
- messbare Ersatzprüfungen für den Fall, dass das Sehen nicht reicht

### `40-FEHLERKATALOG.md`

19 Fehler aus dem Bau der ersten 21 Produkte, nach Gruppen:

| Gruppe | Fälle | Beispiel |
|---|---|---|
| A — Datenermittlung | 4 | Tabelle nicht bis zum Ende gelesen: 9 statt 14 Größen |
| B — Geometrie | 7 | Vorzeichenfehler, den der 90°-Fall arithmetisch verdeckte |
| C — **Prüfung** | 5 | Messung gab ihre eigene Annahme zurück |
| D — Bau | 3 | Timeout verwarf alle Schreibvorgänge, meldete Erfolg |

**Gruppe C ist die gefährlichste.** Eine kaputte Messung lässt einen
Geometriefehler durch und behauptet, alles sei in Ordnung. Vier von fünf
dieser Fälle wurden vom Prüfer gefunden, nicht vom Bauer.

### `70-ARBEITSAUFTRAEGE.md`

Alle 50 Produkte in acht Wellen, sortiert nach Risiko — was auf Bewährtem
aufbaut zuerst, neue Geometrie später:

| Welle | Produkte | Neue Geometrie? |
|---|---|---|
| 1 | 6 einfache Rotationskörper | nein |
| 2 | 4 Reduzier- und Bundteile | Lochkreis |
| 3 | 4 Winkel und Bögen | nein |
| 4 | 8 Gewindeteile | nein |
| 5 | 6 Verschraubungen und Schellen | dreiteilig |
| 6 | 3 Sättel | gekrümmte Auflagefläche |
| 7 | 5 Armaturen | Kinematik |
| 8 | 14 Werkzeuge | **ja — eigene Formensprache** |

Je Produkt: Screenshot-Pfad, Vorlage, Größenzahl, Aussehen, Besonderheiten,
Paarung.

---

## Was im Projekt liegt

```
kaqua-3d/
├── pipeline/              DIESE DOKUMENTE
├── core/                  FERTIG — 8 Module, gegen 21 Produkte erprobt
├── products/              21 Produkte + 3 Familienmodule
├── gallery/               Übersichtsseite über alle 71
├── build/
│   ├── incremental.mjs    inkrementeller Bau mit Caches
│   ├── bundle.mjs         Vollbau
│   └── browser-build.mjs  für Umgebungen ohne Node
├── dist/
│   ├── INTEGRATION.md     Anleitung für die Website-Integration
│   ├── lib/               21 ES-Module, per Selbsttest bestätigt
│   ├── kaqua-3d-galerie.html
│   ├── lib-selbsttest.html
│   ├── export.html        Standbilder, GLB, OBJ als ZIP
│   └── kaqua-<modul>.html 21 Einzelseiten, offline lauffähig
├── produkt-markdown/      korrigierte Produktseiten
├── pruefung/              Prüfberichte
└── BAUSTAND.md            Fortschritt, Befunde, offene Annahmen

quellen/                   Seitenbilder aus den Screenshots
K-Aqua Unterseitem Kopie/  Originalscreenshots
```

---

## Stand

```
Core ✓ · Produkte 21/71 · Galerie ✓ · Integrationsexport ✓
Selbsttest 21/21 · größte Abweichung 0,27 mm · 506 624 Dreiecke
```

**Fertig:** Kugelhahn · Kappe · Muffe · Winkel 45° · Winkel 90° · T-Stück ·
Kreuz · Reduzierbuchse · Übergangsmuffe AG · 12 Rohre

Was diese 21 bereits bewiesen haben:

- Der Core trägt Rotationskörper, Bögen, Abzweige, Gewinde, Mehrschichtrohre
  und Verbundteile aus zwei Werkstoffen.
- Die Familienmodule funktionieren: ein neues Rohr ist eine `data.js`.
- Die Maßtests sind belastbar — sie haben sieben Geometriefehler gefunden.
- Die Galerie hält 71 Kacheln mit **einem** WebGL-Kontext.

---

## Offene Blocker

Diese brauchen eine Antwort, bevor die betroffenen Produkte gebaut werden
können:

| Produkt | Blocker | Gebraucht |
|---|---|---|
| `adaptor-socket-female-thread` | Spalten `h` und `L1` nicht deutbar. Bei d20 steht `L = 70`, `h = 52`, bei einer Muffenlänge von 34 | Zeichnung in lesbarer Auflösung |
| Welle 8, sechs Geräte | Die Katalogtabellen führen keine Geometriemaße, nur Artikelnummer und Leistungsdaten | Entscheidung: 3D-Modell oder genügt das Katalogfoto? |
| `k-pipe-purple-…` (fertig) | Zeichnungsminiatur sagt „green with 1 red stripe", Produktname sagt „Purple" | Herstellerauskunft. Änderung wäre eine Zeile |
| Winkel und T-Stück (fertig) | Bedeutung der Spalte `z` — bei der Muffe die Anschlagdicke, hier ein anderes Maß | Herstellerauskunft |

---

## Was diese Pipeline nicht leisten kann

Ehrlich benannt:

**Die Katalogbilder der Rohre sind CG-Renders, keine Fotos.** Sie zeigen keine
Formtrennnaht, keine Beschriftung, keinen Kontaktschatten — und widersprechen
der eigenen technischen Zeichnung (einfarbig grün, obwohl vier Streifen
gezeichnet sind). Ein Vergleichstest gegen sie ist wertlos.

**Die Schichtdicken der Faserrohre** (30/40/30 %) sind die einzige Angabe der
Rohrmodelle, die nicht aus der Quelle stammt. Nur ein aufgeschnittenes Rohr
klärt sie.

**Am T-Stück-Abzweig überlappen die Innenflächen.** Von außen unsichtbar, im
Halbschnitt an der Kehle sichtbar. Ohne CSG nicht anders lösbar; alle Maße
sind unberührt.
