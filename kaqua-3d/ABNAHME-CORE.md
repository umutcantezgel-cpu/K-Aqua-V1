# Abnahme Core-Refactor

Teil 2 abgeschlossen. Jeder Punkt aus §5 des Core-Refactor-Prompts, mit Belegen.

---

## Abnahmeliste §5

**1 · `dist/kaqua-pp-r-ball-valve-ball-in-pp.html` ist vom Original visuell nicht unterscheidbar** ✅

Der Nachweis ist stärker als ein Screenshot-Vergleich: die Geometrie ist
**dreieckidentisch**. `measureAll()` in beiden Fassungen, über alle sechs Größen:

| d | L | D | H | A | Muffentiefe | Restwand | Dreiecke Original | Dreiecke Port |
|---|---|---|---|---|---|---|---|---|
| 20 | 98 | 46,16 | 51 | 68 | 14,0 | 4,50 | 190 440 | 190 280 |
| 25 | 113 | 56,16 | 61 | 78 | 15,5 | 4,86 | 190 764 | 190 604 |
| 32 | 121 | 66,16 | 70 | 88 | 17,0 | 4,50 | 191 088 | 190 928 |
| 40 | 138 | 79,16 | 81 | 98 | 20,0 | 4,50 | 191 412 | 191 252 |
| 50 | 148 | 87,16 | 90 | 108 | 23,5 | 4,50 | 191 736 | 191 576 |
| 63 | 175 | 107,16 | 110 | 118 | 27,0 | 4,50 | 192 060 | 191 900 |

Alle Maße identisch. Die Differenz von exakt **160 Dreiecken** pro Größe ist
vollständig erklärt: der alte Zähler lief über die Gruppe `mm`, in der die vier
Maßlinien mit ihren acht Pfeilspitzen lagen — 8 × `ConeGeometry(r, h, 10)` =
8 × 20 = 160 Dreiecke. Der neue Zähler läuft über die Bauteile allein, weil die
Maßlinien jetzt der Core erzeugt. Kein Modellteil fehlt.

Materialseitig identisch, Rezept für Rezept:

| Teil | vorher | jetzt | Werte |
|---|---|---|---|
| Korpus, Mutter | `ppr` (Noise 17) | `pprGreen` (Noise 17) | roughness .44 · clearcoat .25/.50 · sheen .15/.8 · env .9 · wear .42 |
| Stutzen, Kugel | `pprB` (Noise 4211) | `pprGreenB` (Noise 4211) | dito |
| Hebel | `lever` (Noise 4211) | `anthraciteB` (Noise 4211) | #23262A · roughness .26 · clearcoat .70/.15 · env 1.1 · wear .50 |
| Sitze | `ptfe` | `ptfe` | #F2F0EA · roughness .55 · env .6 |
| O-Ringe | `epdm` | `epdm` | #121212 · roughness .88 · sheen .3 · env .5 |
| Spindel | `stem` | `steel` | #9AA0A6 · roughness .34 · metalness .85 · env 1.2 |

Der zweite Noise-Seed ist bewusst so gerechnet, dass Seed 17 wieder 4211
ergibt (`seed * 247 + 12`) — sonst hätte sich das Rauschmuster verschoben.

**2 · Alle Interaktionen funktionieren wie vorher** ✅
Größenwahl (6 Nennweiten), Auf/Zu inkl. Klick auf den Hebel und Taste `O`,
Explosionsregler, Halbschnitt mit Stencil-Caps, Bemaßungs-Overlay, vier
Kamera-Presets, Pfeiltasten, `+`/`−`, `R`. Im laufenden Viewer durchgeschaltet.

**3 · `core/` enthält keinen Bezeichner mit `valve`, `ball`, `lever`, `nut`, `korpus`, `stem`, `seat`, `oring`** ✅
Einzige Fundstelle bei einem reinen Textsuchlauf: das deutsche Wort **Nut**
(Rille) in den Kommentaren zu `ringGrooves` und der O-Ring-Nut. Das ist
Fachsprache, kein Bezeichner — die Prüfung gilt für Bezeichner.

**4 · `products/ball-valve-pp/` enthält keine Geometrie-Grundfunktion, die ein anderes Produkt auch bräuchte** ✅
`parts.js` importiert 15 Funktionen aus dem Core und definiert acht
Bauteilkonturen. `params.js` definiert nur Parametrik. Keine eigene
Profil-, Revolve-, Loft- oder Merge-Logik.

**5 · Die Muffe rendert, ohne dass eine Core-Datei angefasst wurde** ✅
`products/socket/` ist nach dem Core entstanden. Kein Core-Eingriff war nötig.
Der Core hat den Auf/Zu-Knopf, die Zustandszeile und die Taste `O` selbst
ausgeblendet, weil `states: null` ist, und die Metaleiste auf `d · L · Gewicht`
umgestellt. Belegbild: `pruefung/muffe.png`.

**6 · Die sechs neuen Geometrie-Helfer sind implementiert und je mit Minimalbeispiel dokumentiert** ✅

| Funktion | Erster Abnehmer | Beispiel im Kopfkommentar |
|---|---|---|
| `sweepPath(loop, path, opt)` | #5/#6 Winkel, #56 Überbogen | Bogen 90°, Ø32, Wand 4,3, R40 |
| `branchJoin({mainR, branchR, angle, filletR})` | #7 T-Stück, #39 Kreuz, #30 Sattel | T-Stück d32, Kehle R4 |
| `threadProfile(D, pitch, turns, kind)` | #9/#10 Übergangsmuffen | Rp½", 5 Gänge |
| `hexPrism(af, h, filletR)` | #25/#26 Metallverschraubungen | SW 32, 14 mm |
| `knurl(r, h, count, depth)` | Verschraubungen, Werkzeuge | Ø66, 12 Riffel, 1,45 mm |
| `tubeLayers(d, s, layers)` | alle 12 Rohre | K-Fiber d32 SDR 7,4, drei Lagen |

Dazu zwei Hilfsfunktionen, die `sweepPath` erst benutzbar machen: `arcPath()`
für Bogenbahnen und `circleLoop()` für kreisförmige Querschnitte.

**Vorbehalt, ausdrücklich:** die sechs sind implementiert und dokumentiert, aber
noch von keinem Produkt benutzt. Ihre Bewährungsprobe ist #5 (Winkel 45°) und
#7 (T-Stück). Erwartung: `branchJoin` braucht dort eine Nachjustierung an der
Kehlengeometrie.

**7 · Speicher stabil über 20 Größenwechsel** ✅
`dispose()` gibt in `createAssembly` alle über `part()` und `own()`
registrierten Geometrien sowie Materialien und Texturen frei; `rebuild()` ruft
es auf der Vorgängerinstanz auf. 20 Wechsel durchgefahren, keine Zunahme der
Meshzahl (konstant 12 Bauteil-Meshes), keine Konsolenausgabe.

**8 · Keine Konsolenfehler, keine Warnungen** ✅

**9 · Bundle-Größe pro Produkt-HTML < 400 kB ohne Fonts** ✅

| Datei | gesamt | ohne Fonts |
|---|---|---|
| `kaqua-pp-r-ball-valve-ball-in-pp.html` | 378 kB | **143 kB** |
| `kaqua-socket.html` | 358 kB | **124 kB** |

Die eingebetteten Fonts machen 235 kB aus (vier Variable-woff2 als base64).
Sie müssen inline sein, weil externe Assets zur Laufzeit verboten sind.

---

## Was am Kugelhahn geändert werden musste

Pflichtangabe nach §7.5. Sieben Stellen, keine davon berührt Geometrie oder
Material.

**1 · Skalierung raus aus dem Produkt.** `buildValve()` setzte
`root.scale = 0.001`. Der Vertrag verlangt Millimeter; die Umrechnung macht
jetzt `core/viewer.js` über eine Wrappergruppe. Folge: in `measure()` entfällt
der Faktor `1/root.scale.x`, und die Innenlicht-Positionen kommen als
mm-Vektoren aus `A.light()`.

**2 · Explosion als Vektor.** Vorher acht X-Skalare in einer `EXPL`-Tabelle plus
zwei Y-Sonderfälle für Spindel und Hebel. Jetzt trägt jeder `parts`-Eintrag
einen `THREE.Vector3`; `setExplode` im Core ist ein Dreizeiler ohne Sonderfall.

**3 · `parts` explizit.** Existierte nur implizit als `PART_IDS` plus
`groups`-Objekt. Jetzt Vertragsliste `{ id, label, obj, explode }`; die
`anchors` werden daraus abgeleitet, statt als zweite Liste geführt zu werden.

**4 · `variant` entfällt.** `createMaterials(variant)` entschied selbst über
Messing oder PP für die Kugel. Der Kugelhahn mit Messingkugel ist Produkt #11
mit eigenem Paket (so führt es die Registry), keine Variante von #1. Die
Materialzuordnung steht jetzt Teil für Teil in `index.js`.

**5 · Maßlinien deklarativ.** `buildValve()` baute Linien, Pfeilspitzen und
Maßhilfslinien selbst. Jetzt deklariert das Produkt `{ label, value, a, b, off }`;
die Geometrie erzeugt `core/overlay.js`. Ein T-Stück bemaßt damit ohne eine
Zeile Linienzeichen-Code.

**6 · `measure()` generisch.** Gab die kugelhahnbenannten Schlüssel
`L/D/H/A/socket` zurück. Jetzt liefert das Produkt `measures` als Liste von
`{ key, label, soll, ist() }`; der Core iteriert sie über alle Größen. Der
Muffentiefen-Raycast ist zum Core-Helfer `probeAxial()` geworden, weil ihn
jedes Muffenprodukt braucht.

**7 · `L1` sichtbar vorbehalten.** Stand als Kommentar in `valve-data.js`
(„in der Zeichnung nicht eindeutig auflösbar"). Steht jetzt in `DIMENSION_KEY`
als *Herstellermaß L1 (nicht eindeutig)* und ist über `ariaFields` von der
Bemaßung ausgenommen — der Vorbehalt lebt im Code weiter, statt in einer
Kommentarzeile zu verhungern.

---

## Abweichungen von der Zielstruktur §1

**Eine zusätzliche Core-Datei: `core/assembly.js`.** Der Auftrag nennt sieben
Core-Dateien. Die Teile-Factory, Explosion, Schnitt und die Prüfwerkzeuge
gehören weder in `geometry.js` (das kennt keine Materialien und keine Meshes)
noch in `viewer.js` (dann müsste jedes Produkt den Viewer importieren, nur um
ein Teil anzulegen). Als eigene Datei bleibt die Abhängigkeitsrichtung sauber:
Produkt → `assembly` → `geometry` + `materials`, und `viewer` hängt an keinem
Produkt.

**`MAT`-Rezeptwerte weichen von der Skizze im Auftrag ab.** Der Auftrag skizziert
`pprGreen` mit `roughness .38`, `anthracite` mit `.22`, `steel` als `#9BA1A6`.
Der gebaute Kugelhahn trägt `.44`, `.26`, `#9AA0A6`. Übernommen sind die
gebauten Werte — Abnahmepunkt 1 (Pixelgleichheit) schlägt eine
Rezeptskizze. Änderung jederzeit möglich, dann aber sichtbar für alle Produkte.

**Ergänzt gegenüber §2: `SEG_VIS` / `SEG_INT` / `SEG_FINE` im Core.** Standen als
lokale Konstanten in `valve-parts.js`. Segmentzahlen sind Qualitätsstandard
(Teil 7), keine Produktentscheidung — über 71 Produkte würde die Facettierung
sonst auseinanderdriften.

---

## Offene Punkte

| Punkt | Stand |
|---|---|
| Maße der Muffe | Prototyp aus der Markdown-Datei, **nicht verifiziert**. Zwei von sieben L-Werten fehlen in der Quelle und sind interpoliert. Phase 1 läuft mit Produkt #3. |
| `branchJoin` | implementiert, unbewährt. Erste echte Belastung: #7 T-Stück. |
| `PPR_GREEN` | `#17A46B`, gegen ein Originalbauteil zu verifizieren. |
| `build/bundle.mjs` | geschrieben und nach Vertrag; in dieser Umgebung nicht ausführbar. Die beiden `dist/`-Dateien sind mit identischer Logik erzeugt. Bitte einmal `node build/bundle.mjs --all` gegenprüfen. |
| Export nach Teil 6 | `core/export.js` implementiert GLB (Meter, Y-up), OBJ+MTL (mm), Standbildserie und `exportGLBAllSizes`. Noch nicht als Dateien abgelegt. |
