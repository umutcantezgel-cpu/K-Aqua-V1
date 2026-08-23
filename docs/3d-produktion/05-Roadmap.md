# Roadmap — 71 Produkte in fünf Stufen

Reihenfolge und Stufen stehen maschinenlesbar in `produkt-registry.json` unter `build.tier` und `build.order`. Dieses Dokument erklärt die Logik dahinter.

---

## Sortierprinzip

Nicht nach Kategorie, sondern nach **Geometriefamilie und Nutzen**. Drei Gründe:

1. **Familien lernen voneinander.** Das erste T-Stück kostet den vollen Aufwand — Abzweigkehle, Verrundung, Profilverschnitt. Das Reduzier-T danach ist eine Parameteränderung. Wer erst alle Formteile, dann alle Rohre baut, zahlt jeden Familienaufschlag doppelt.
2. **Die Fingerübungen zuerst.** Kappe und Muffe sind reine Rotationskörper. Sie beweisen, dass der Core trägt, in einer Stunde statt in einem Tag.
3. **Die Werkzeuge zuletzt.** 14 Produkte mit völlig anderer Formensprache — Gehäuse, Griffe, Kabel, Skalen. Höchster Aufwand, geringster Nutzen für einen Rohrsystem-Katalog. Wer die vorzieht, verbrennt Zeit.

---

## Stufe 0 — Referenz (fertig)

| # | Produkt | Familie | Status |
|---|---|---|---|
| 1 | Kugelhahn PP-R (Kugel in PP) | `ball-valve` | ✅ gebaut |

Nach dem Core-Refactor wird er portiert und ist die Qualitätsreferenz für alles Weitere. Sieht ein neues Modell schlechter aus als er, ist es nicht fertig.

---

## Stufe 1 — Tragfähigkeit beweisen (10 Produkte)

| # | Produkt | Familie | K |
|---|---|---|---|
| 2 | Kappe | `rot-sym` | 1 |
| 3 | Muffe | `rot-sym` | 1 |
| 4 | K-Rohr PP-R SDR 6 | `pipe` | 1 |
| 5 | Winkel 45° | `elbow` | 2 |
| 6 | Winkel 90° | `elbow` | 2 |
| 7 | T-Stück | `tee` | 2 |
| 8 | K-Fiber Rohr PP-R SDR 7,4 | `pipe-fiber` | 2 |
| 9 | Übergangsmuffe IG | `thread-socket` | 2 |
| 10 | Übergangsmuffe AG | `thread-socket` | 2 |
| 11 | Kugelhahn Messing verchromt | `ball-valve` | 5 |

**Warum diese zehn:** Sie eröffnen sechs Familien und decken die vier Kernbauteile ab, die auf jeder Baustelle liegen. Nach Stufe 1 sind ~40 % des Sortiments über Familienzugehörigkeit erschlossen.

**Meilenstein:** Sobald acht davon stehen, läuft Prompt 2 (Galerie und Integration). Integrationsprobleme zeigen sich bei zehn Modellen genauso wie bei siebzig — nur billiger.

**Aufwand:** die drei `rot-sym`/`pipe`-Teile deutlich schneller als die Familienerstlinge. Der zweite Kugelhahn ist eine Variante des ersten, überwiegend Materialarbeit.

---

## Stufe 2 — Familien ausschöpfen (19 Produkte)

Alles, was auf Stufe 1 aufsetzt: acht weitere Rohre (identisches Modell, andere Parameter und Materialien), Reduziermuffe, Elektroschweißmuffe, Reduzier-T, die Gewinde-Übergangsfittings, die Metallverschraubungen, Rohrschelle, Einschweißsattel, das erste Schweißwerkzeug.

**Hier liegt der größte Ertrag pro Stunde.** Die acht Rohre sind streng genommen ein Modell mit acht Datensätzen — plus die Faserschicht, die in der Schnittansicht sichtbar wird. Das ist genau das Argument, das sich in 2D nicht zeigen lässt.

Neu in dieser Stufe: `branchJoin` (Abzweigkehle), Gewinde als Profilkontur, Messing-Einleger im grünen Körper, Sattelfläche auf Rohrradius.

**Nach Stufe 2: 30 von 71 Produkten, und alle Kernbauteile des Systems.** Realistisch ist das der Punkt, an dem die Website den vollen Nutzen hat.

---

## Stufe 3 — Breite (20 Produkte)

Varianten und Randfälle: Winkel in Muffe/Spitzende, Kreuzstück, Bundbuchse und Losflansch, Messing-Varianten der Verschraubungen, die restlichen Sättel, die ersten Wandscheiben und Wandbatterien, das Durchgangsventil, die erste Rohrschere.

Neu: Befestigungslaschen mit Bohrungen, asymmetrische Bauteile, Wandkontext.

---

## Stufe 4 — Vollständigkeit (17 Produkte)

Dichtungen, Stopfen, Überbogen, die restlichen Werkzeugeinsätze, UP-Ventile, Handschweißgeräte. Wenig genutzt, aber der Katalog wird vollständig.

---

## Stufe 5 — Maschinen (4 Produkte)

Heizspiegel, Elektroschweißgerät, Stumpfschweißmaschine, Schweißgerät komplett. Gehäuse, Bedienelemente, Kabel — eine eigene Disziplin.

**Ehrlicher Rat:** hier vorher fragen, ob 3D überhaupt der richtige Weg ist. Für eine Stumpfschweißmaschine leistet ein gutes Produktfoto mehr als ein Modell, das man drehen kann. Der Nutzen von 3D liegt bei Bauteilen, deren Innenleben und Anschlussmaße zählen — nicht bei Maschinen.

---

## Übersicht

| Stufe | Produkte | Kumuliert | Was danach geht |
|---|---|---|---|
| 0 | 1 | 1 | Referenzmodell steht |
| 1 | 10 | 11 | Core bewiesen, Galerie live, Kernbauteile da |
| 2 | 19 | 30 | Alle Kernbauteile + alle Rohre — der eigentliche Nutzen |
| 3 | 20 | 50 | Katalog weitgehend abgedeckt |
| 4 | 17 | 67 | Vollständig bis auf Maschinen |
| 5 | 4 | 71 | Komplett |

**Kein Zeitplan.** Die Dauer pro Produkt hängt an Faktoren, die ich nicht kenne: wie viel ihr selbst prüft, wie oft Maße nachgeschlagen werden müssen, wie viele Korrekturrunden ihr wollt. Was ich sagen kann: das erste Produkt einer Familie kostet ein Vielfaches der folgenden, und der Datenschritt (Phase 1) kostet bei jedem Produkt etwa gleich viel.

---

## Nebenprodukt: der Katalog wird nebenbei korrekt

Jeder Produkt-Prompt liefert in Phase 1 eine **korrigierte Markdown-Datei** — vollständige Tabelle, richtige Artikelnummern, richtige Spalten. Nach 71 Produkten sind die Produktseiten der Website vollständig und stimmen.

Gemessen daran, dass beim Cap aktuell 7 von 14 Größen fehlen und bei den Kugelhähnen die Bestellnummern falsch sind, ist das möglicherweise der größere Ertrag des ganzen Projekts. Siehe `01-Datenbefund.md`.

---

## Nach jeder Stufe

1. Registry aktualisieren (`build.status`, `data_status`, `sizes_source_verified`)
2. Galerieseite prüfen: neue Modelle da, Zähler stimmt, ein WebGL-Kontext
3. Bundle-Analyse: three.js weiterhin ein gemeinsamer Chunk, Produktmodule getrennt
4. Zwei zufällige fertige Modelle gegen ihr Katalogfoto vergleichen — Qualitätsdrift fällt sonst erst am Ende auf
5. Prüfen, ob eine Core-Ergänzung fällig ist. Häufen sich bei mehreren Produkten dieselben `// ASSUMPTION:`-Einträge, gehört die Lösung in den Core.
