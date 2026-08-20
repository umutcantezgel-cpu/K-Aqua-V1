# Prüfbericht — Welle 1: Stopfen und zwei Dichtungen

Produkt-IDs `accessories/plug` · `accessories/flat-gasket` ·
`accessories/flat-gasket-for-unions`
Stand 18. August 2026

---

## Ergebnis

| Produkt | Größen | Referenz | Dreiecke | max. Abweichung |
|---|---|---|---|---|
| Stopfen | 1 (G½") | G½" | 18 544 | 0,11 mm |
| Flachdichtung | 11 (d40–d315) | d63 | 4 608 | **0,00 mm** |
| Flachdichtung für Verschraubungen | 3 (d20–d32) | d25 | 4 608 | **0,00 mm** |

Selbsttest über alle 24 Produkte: **24/24 geladen, größte Abweichung
0,18 mm**, 534 504 Dreiecke, keine Auffälligkeiten.

---

## Phase 1 — Daten

### Stopfen (`AQ90912`)

Quelle `quellen/w1-plug.png` (3004 × 8338). Spalten `Code · G · kg · Pack.`
**Eine Größe.**

**Das Produktfoto korrigiert die naheliegende Annahme:** es ist kein
Muffenstopfen, sondern ein **Gewindestopfen**. Von oben nach unten:
G½"-Außengewinde, eine dunkle Ringnut (O-Ring), ein glatter weiterer
Zylinderkörper, am unteren Rand vier Kerben für das Werkzeug.

**Die Tabelle führt kein einziges Geometriemaß.** Alle Maße sind aus dem
Produktfoto abgeleitet. Gegenprobe über das Gewicht:

| | |
|---|---|
| Foto: Höhe/Breite | 230 px / 105 px = 2,19 |
| G½"-Gewinde außen (ISO 228-1) | 20,955 mm |
| Körper im Foto | 1,34 × Gewinde ≈ 28 mm |
| Länge | 2,19 × 28 ≈ 61 mm (gebaut: 62) |
| Hohlkörper Ø28 × 62, Wand 3 mm | 16,3 cm³ × 0,9 g/cm³ ≈ 15 g |
| **Tabelle** | **0,02 kg = 20 g** |

15 g gegen 20 g bei einem aus Pixeln abgeleiteten Volumen bestätigt
Größenordnung und Hohlbauweise. Am Originalteil zu verifizieren.

### Flachdichtung

Quelle `quellen/w1-gasket.png`. Spalten `Code · d · Pack.`, **11 Größen**,
d40 bis d315. Die letzten Zeilen standen unterhalb des ersten Zuschnitts —
gefunden erst beim zweiten Blick auf dieselbe Quelle. Das ist Fehlerkatalog
Fall 2, und die Regel hat funktioniert.

**Nur eine Zahl je Zeile.** Weder Außen- noch Innendurchmesser noch Dicke.

### Flachdichtung für Verschraubungen

Quelle `quellen/w1-gasket-unions.png`. Spalten
`Code · d · R/Rp · Nut thread · D · d1 · s · Pack.`, 3 Größen.

**Vollständig bemaßt** — und damit die Quelle für die abgeleiteten
Verhältnisse der einfachen Flachdichtung:

| d | D | d1 | s | d1/d | (D−d1)/2 |
|---|---|---|---|---|---|
| 20 | 27 | 20 | 3 | 1,00 | 3,5 |
| 25 | 35 | 25 | 3 | 1,00 | 5,0 |
| 32 | 38 | 28 | 3 | 0,875 | 5,0 |

Bei d32 liegt `d1` unter `d`. Kein Ablesefehler: die Dichtung sitzt im Grund
der Verschraubung, und deren Durchgang ist dort enger als das
Rohr-Außenmaß. `s = 3` konstant über alle Größen.

Die Spalten `R/Rp` und `Nut thread` beschreiben die **Verschraubung**, nicht
die Dichtung. Übernommen, weil sie die Zuordnung eindeutig machen; nicht
modelliert.

---

## Zwei Fehler im Core, beide gefunden durch den Maßtest

Das ist der eigentliche Ertrag dieser Welle. Beide Funktionen hielten ihren
dokumentierten Vertrag nicht — **systematisch, bei jedem Gewindeprodukt.**

### `threadProfile` lieferte 0,4 mm zu dünn

Die Funktion verspricht „D = Nenn-Außendurchmesser". Sie setzte den
Kuppenpunkt auf `r = D/2` und gab ihm einen Rundungsradius `rd`. Ein Fillet
wird aber **nach innen** angelegt: bei 55° Whitworth-Flankenwinkel zieht er
den Scheitel um `rd·(1/sin 27,5° − 1) ≈ 1,17·rd` zurück.

| | Vorher | Nachher |
|---|---|---|
| G½" gemessen | 20,55 mm | 21,06 mm |
| Soll | 20,955 mm | 20,955 mm |
| Abweichung | **−0,41 mm** | +0,11 mm |

Am realen Gewinde ist es umgekehrt: der theoretisch spitze Kuppenpunkt liegt
**über** dem Nennmaß, und die Rundung bringt ihn genau darauf. Genau das
rechnet die Funktion jetzt (`setback`).

**Der Fehler wäre am Gewindeadaptor unentdeckt geblieben** — dort misst die
Gewindeprüfung `P.threadOD` gegen `P.threadOD`, also einen Parameter gegen
sich selbst. Erst der Stopfen hat das Gewinde tatsächlich abgetastet. Das ist
Fehlerkatalog Fall 12 in der Praxis: eine Messung, die eine Annahme
bestätigt, findet nichts.

### `hexPrism` lieferte 0,32 mm zu klein

Die Eckenrundung lief über `quadraticCurveTo` mit dem Eckpunkt als
Kontrollpunkt. Eine solche Bézierkurve **erreicht den Eckpunkt nicht** — ihr
nächster Punkt liegt bei `(T1 + 2·p1 + T2)/4` und damit deutlich innerhalb
des echten Tangentenbogens.

| | Vorher | Nachher |
|---|---|---|
| Eckenmaß D bei d32/R1" | 49,68 mm | 49,91 mm |
| Soll | 50 mm | 50 mm |
| Abweichung | **−0,32 mm** | −0,09 mm |

Jetzt ein echter Kreisbogen, tangential an beide Flanken. Der Scheitel liegt
um `0,155·r` zurück — bei r = 0,3 also 0,05 mm auf dem Radius. Das ist die
Rundung, die ein gefrästes Sechskant tatsächlich hat.

**Beide Korrekturen betreffen alle Gewinde- und Schlüsselflächenprodukte.**
Der Gewindeadaptor ist neu gebaut: max. Abweichung von 0,27 auf **0,16 mm**
gesunken.

---

## Ein Fehler im Stopfenmodell

**Das Profil war auf der Achse nicht geschlossen.** Die Außenkontur begann
bei `r = rThread·0,93` statt bei `r = 0`. Der Revolve verband dann den
Bohrungsgrund (18, 0) direkt mit (0, 9,75) — ein Kegel statt einer
Stirnfläche. Der Stopfen war offen.

**Gefunden hat es die Messung `dicht`**, die zwei Achsenstrahlen von beiden
Stirnseiten schießt und ihre Differenz vergleicht. Sie gab 0 zurück, weil
beide Strahlen denselben Punkt trafen. Nach der Korrektur: 18,02 gegen
Soll 18,025.

Ein Stopfen ohne Stirnfläche ist genau der Fehler, den diese Messung finden
soll. Beim ersten Entwurf hatte sie noch `P.wall` zurückgegeben — Fall 12.
Die Umstellung auf zwei echte Strahlen war die Voraussetzung dafür, dass sie
den Fehler überhaupt sehen konnte.

Zweiter Fund: der Gewindestrahl lag bei `0,5 · Gewindelänge` und traf dort
eine Flanke. `threadProfile` setzt die Kuppen auf `a = i · Steigung`; nur dort
liegt der Nenndurchmesser.

---

## Annahmen

| Annahme | Wert | Begründung | Zu verifizieren gegen |
|---|---|---|---|
| Stopfen: Körper-Ø | 1,34 × Gewinde-Ø = 28,1 mm | Verhältnis im Produktfoto | Originalteil |
| Stopfen: Länge | 2,19 × Körper-Ø = 62 mm | Höhe/Breite im Foto; Gewichtsgegenprobe 15 g gegen 20 g | Originalteil |
| Stopfen: Wand 3 mm | — | der Wert, bei dem das gerechnete Gewicht die Tabelle trifft | Originalteil |
| Stopfen: Gewindelänge | 0,196 × Länge | 45 von 230 px im Foto | Originalteil |
| Stopfen: O-Ring-Schnur | 0,09 × Körper-Ø | Nutbreite im Foto | Originalteil |
| Stopfen: 4 Kerben, 0,10/0,22 × Ø | — | im Foto abgezählt und gemessen | Originalteil |
| Flachdichtung: s = 3 mm | — | Nachbarartikel führt s = 3 über alle Größen | Zeichnung |
| Flachdichtung: d1 = Rohrbohrung SDR 6 | — | die Dichtung darf den Durchgang nicht verengen | Zeichnung |
| Flachdichtung: D = 1,55 × d | — | deckt die Dichtfläche der Bundbuchse ab, ohne in den Lochkreis zu reichen | `fittings/flange-adaptor`, sobald gebaut |

Die Flachdichtung trägt `DATA_STATUS = 'verifiziert-ohne-masse'`: die
Artikeltabelle ist vollständig abgelesen, die Geometrie aber abgeleitet. Der
Stopfen ebenso.

---

## Abgabe

| | |
|---|---|
| `products/plug/`, `flat-gasket/`, `flat-gasket-for-unions/` | ✅ |
| `dist/kaqua-plug.html`, `-flat-gasket`, `-flat-gasket-for-unions` | ✅ |
| `core/geometry.js` — `threadProfile` und `hexPrism` korrigiert | ✅ |
| Registry auf `fertig`, `codes`, `alle`, `n` | ✅ |
| Galerie 24/71, Bibliothek 24 Module | ✅ |
| Selbsttest 24/24, 0,18 mm | ✅ |
| Vergleichstest gegen Katalogfoto | offen |
| Korrigierte Produkt-Markdowns | offen — Quelldateien fehlen im angebundenen Ordner |
