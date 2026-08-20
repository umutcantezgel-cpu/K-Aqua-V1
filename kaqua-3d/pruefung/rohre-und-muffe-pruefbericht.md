# Prüfbericht — Rohre und Muffe

Stand 16. August 2026. Drei Produkte in einem Bericht, weil sie sich einen
Befund teilen: die Markdown-Dateien lassen bei allen drei genau die Spalten
weg, die ein maßhaltiges Modell braucht.

---

## #3 Muffe (`fittings/socket`)

Vorher als Prototyp mit geschätzten Maßen gebaut. Phase 1 hat **beide
Schätzungen widerlegt** — und dabei eine dritte Annahme bestätigt.

### Phase 1

Quelle `quellen/socket-p1.jpg … p3.jpg`. **9 Größen**, Spalten
`Code · d · D · l · z · kg · Pack.`

| # | Abweichung gegen `docs Unterseiten/fittings/socket.md` |
|---|---|
| 1 | 7 von 9 Größen. Es fehlen d90 und d110. |
| 2 | Spalten `D` und `z` fehlen ganz — genau die zwei Werte, die eine maßhaltige Muffe braucht. |
| 3 | Die als `L` geführten Werte sind die Spalte `l` **und falsch**: 34/35/44/56/65/78/90 gegen tatsächlich 34/37/41/46/52/60/65. Nur d20 stimmte. |
| 4 | Artikelnummer d63: AQ27065 statt AQ27063. |
| 5 | Gewicht d63: 0,15 statt 0,13. |

### Was die Prototypfassung falsch hatte

| Annahme | Geschätzt | Tatsächlich (d32) | Fehler |
|---|---|---|---|
| Fittingwand `max(3; 0,135·d)` | 4,32 mm | 6,00 mm | **−1,68 mm** |
| Mittlerer Anschlag `max(1,6; 0,05·d)` | 1,60 mm | 5,00 mm | **−3,40 mm** |

Beide Annahmen waren im Code als `ASSUMPTION` markiert und als „gegen die
Quelltabelle zu verifizieren" ausgewiesen. Genau dafür ist die Markierung da.

### Was die Prototypfassung richtig hatte

Die **Struktur** `Muffentiefe = (l − z)/2`. Und damit fällt der Beleg für
eine ganz andere Annahme ab — die Normreihe der Muffenschweißtiefen, die ich
bei der Kappe ansetzen musste, weil die Kappentabelle keine Tiefe führt:

| d | (l − z)/2 | DVS 2207-11 | |
|---|---|---|---|
| 20 | 14,5 | 14,5 | ✅ |
| 25 | 16,0 | 16,0 | ✅ |
| 32 | 18,0 | 18,0 | ✅ |
| 40 | 20,5 | 20,5 | ✅ |
| 50 | 23,5 | 23,5 | ✅ |
| 63 | 27,5 | 27,5 | ✅ |
| 75 | 30,0 | 31,0 | −1,0 |
| 90 | 33,0 | 35,0 | −2,0 |

Sechs von sechs auf die Zehntelstelle. Ab d75 baut K-Aqua flacher als die
Norm — das ist eine Herstellerentscheidung, kein Fehler, und wird als
`P.depthDeltaToNorm` geführt.

**Konsequenz im Core:** die Reihe wird jetzt zum zweiten Mal gebraucht (Kappe +
Muffe). Nach der Regel „dieselbe Annahme bei mehreren Produkten gehört in den
Core" ist sie nach `core/geometry.js` gewandert — `fusionDepth(dNom)`. Die
lokale Tabelle in `products/cap/params.js` ist entfallen.

### Phase 4 — Maßtest

Alle 9 Größen, **größte Abweichung 0,01 mm**.

| d | l | D | Tiefe (l−z)/2 | z | Restwand |
|---|---|---|---|---|---|
| 20 | 34 ✓ | 29,0 | 14,5 | 5 | 4,5 |
| 32 | 41 ✓ | 44,0 | 18,0 | 5 | 6,0 |
| 63 | 60 ✓ | 84,0 | 27,5 | 5 | 10,5 |
| 110 | 80 ✓ | 148,0 | 34,0 | 12 | 19,0 |

20 016 Dreiecke, ein Mesh.

**Ein Fehler dabei gefunden:** `D` lag über alle Größen 0,69 mm zu hoch. Der
Bund am Mundloch saß **über** dem tabellierten Durchmesser statt darauf. `D`
ist das größte Maß der Muffe — der Zylinder sitzt jetzt 0,35 mm tiefer, der
Bund erreicht genau `D/2`. Im Produktfoto ist diese Stufe kurz vor der
Stirnfläche sichtbar.

### Offene Annahme

Bei **d110** sind `z`, `kg` und `Pack.` in der Quelle leer — keine
Transkriptionslücke, die Zellen sind unausgefüllt. `z = 12,0` ist aus dem
Verhältnis von d90 gerechnet (≈ 0,11·d) und in `data.js` als `abgeleitet`
markiert. `l = 80` ist tabelliert und bleibt maßgeblich.

---

## #4 K-Rohr PP-R SDR 6 (`pipes/k-pipe-pp-r-sdr-6`)

### Phase 1

`quellen/pipe6-p1.jpg … p3.jpg`. **10 Größen**, Spalten
`Code · D · DN · Di · S min. · Pack. · Weight (kg/m) · Water capacity (l/m)`.

| # | Abweichung gegen die Markdown-Datei |
|---|---|
| 1 | 5 von 10 Größen. Es fehlen d63, d75, d90, d110, d125. |
| 2 | Spalten `Di` und `S min.` fehlen — also genau die Werte, aus denen die Rohrwand entsteht. |

Gegenprobe der Transkription: `D − 2·S = Di` stimmt in jeder Zeile.
`params.js` prüft das zur Laufzeit und bricht ab, statt ein falsches Rohr zu
modellieren.

Zeichnungsangabe wörtlich: PP-R, „green with 1 red stripe", DIN EN ISO 15874 /
DIN 8077 / 8078.

### Phase 4 — Maßtest

**0,00 mm** über alle 10 Größen. 5 424 Dreiecke.

---

## #12 K-Fiber Rohr PP-R SDR 7,4 (`pipes/k-fiber-pipe-pp-r-sdr-7-4`)

Das Produkt, an dem sich 3D gegenüber einem Katalogfoto rechtfertigt: der
Wandaufbau ist das Verkaufsargument und in 2D nicht zu zeigen.

### Phase 1

`quellen/fiber74-p1.jpg … p3.jpg`. **9 Größen**, gleiche Spalten wie das
K-Rohr. Zeichnungsangabe wörtlich: Material **PP-R GF**, „green with 4 grey
stripes", DIN EN ISO 15874.

### Phase 4 — Maßtest

**0,00 mm** über alle 9 Größen, einschließlich der Prüfung *Summe der
Lagendicken = Gesamtwandstärke*.

| d | D | Di | S | Lagensumme |
|---|---|---|---|---|
| 20 | 20 ✓ | 14,4 ✓ | 2,8 | 2,8 ✓ |
| 32 | 32 ✓ | 23,2 ✓ | 4,4 | 4,4 ✓ |
| 110 | 110 ✓ | 79,8 ✓ | 15,1 | 15,1 ✓ |

13 056 Dreiecke, 7 Meshes (3 Lagen + 4 Kennstreifen).

**Zwei Fehler dabei gefunden:**

| Fund | Ursache | Behebung |
|---|---|---|
| Modell brach bei d20 mit „Wand 2,8 mm < 3 mm" ab | Die 3-mm-Restwandregel gilt für Fittings (Wand über einer Bohrung), nicht für Rohre — dort bestimmt die SDR-Reihe die Wand, und 2,8 mm bei d20/SDR 7,4 ist korrekt | Wächter ersetzt: geprüft wird jetzt, ob die Wand zur SDR-Reihe passt. `S min.` darf über dem Nennwert liegen, nie darunter |
| `Di` überall +0,6 mm | Der Sondierstrahl lief axial und traf die Anschnittfase — er gab seinen eigenen Startradius zurück. Beim Mehrschichtrohr traf er außerdem die falsche Lage | Strahl läuft jetzt von der Achse radial nach außen gegen die innerste Lage |

Der zweite Fehler ist der lehrreichere: die Messung hatte vorher *nicht
gemessen*, sondern die Annahme zurückgegeben, die sie prüfen sollte.

### Offene Annahme

**Schichtdicken 30 / 40 / 30 %** der Wandstärke. Die Zeichnung nennt den
Faserkern, aber keine Lagenmaße. Gegen ein aufgeschnittenes Rohr zu
verifizieren — es ist die einzige Angabe des Modells, die nicht aus der
Quelle stammt.

---

## Galerie

`dist/kaqua-3d-galerie.html` — alle 71 Produkte, davon 5 als Modell.
Ein WebGL-Kontext, der zwischen Kopfbereich und Kacheln wandert.

## Abgabe

| | |
|---|---|
| `products/socket/` · `k-pipe-pp-r-sdr-6/` · `k-fiber-pipe-pp-r-sdr-74/` | ✅ |
| `dist/` — 5 Produkt-HTML + Galerie | ✅ |
| `produkt-markdown/` — socket · k-pipe-pp-r-sdr-6 · k-fiber-pipe-pp-r-sdr-74 | ✅ |
| Standbilder, GLB, OBJ | offen |
| Vergleichstest Rohre gegen Katalogfoto | offen |
