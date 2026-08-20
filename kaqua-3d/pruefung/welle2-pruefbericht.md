# Prüfbericht — Welle 2: Bundflansch und Rohrschelle

Produkt-IDs `accessories/backing-flange` · `accessories/pipe-clamps`
Stand 19. August 2026

---

## Ergebnis

| Produkt | Größen | Referenz | Dreiecke | Meshes | max. Abweichung |
|---|---|---|---|---|---|
| Bundflansch PP-Stahl | 11, d40–d315 | d63 | 6 928 | 1 | **0,00 mm** |
| Rohrschelle | 9, d20–d110 | d32 | 14 588 | 4 | **0,00 mm** (nach zwei Korrekturen) |

Selbsttest über alle 26 Produkte: **26/26 geladen, größte Abweichung
0,18 mm**, 556 020 Dreiecke, keine Auffälligkeiten.

---

## Bundflansch — die Lochzahl steht nicht in der Tabelle

Quelle `quellen/w2-backing-flange.png`. Spalten
`Code · d · D · D1 · D2 · D3 · H · System · kg · Pack.` — **elf Größen,
vollständig bemaßt.** Das ist ungewöhnlich für dieses Zubehör; Stopfen und
Flachdichtung führten kein einziges Geometriemaß.

Was fehlt: die **Zahl** der Schraubenlöcher. Lochkreis und Lochdurchmesser
sind da, die Anzahl nicht. Das Foto zeigt vier — aber nur für eine Größe, und
bei d315 wären vier Löcher konstruktiv unmöglich.

**Die Herleitung geht über die Norm.** `D`, `D1` und `D3` stimmen in **jeder**
Zeile mit DIN 2501 / EN 1092-1 PN 10 überein, wenn man die Rohr-Nennweite auf
die Flansch-Nennweite abbildet:

| Zeile | zugeordnet | D | D1 | D3 | Löcher (Norm) |
|---|---|---|---|---|---|
| d40 | DN32 | 140 | 100 | 18 | 4 |
| d50 | DN40 | 150 | 110 | 18 | 4 |
| d63 | DN50 | 165 | 125 | 18 | 4 |
| d75 | DN65 | 185 | 145 | 18 | 4 |
| d90 | DN80 | 200 | 160 | 18 | **8** |
| d110 | DN100 | 220 | 180 | 18 | 8 |
| d125 | DN125 | 250 | 210 | 18 | 8 |
| d160 | DN150 | 285 | 240 | 22 | 8 |
| d200 | DN200 | 340 | 295 | 22 | 8 |
| d250 | DN250 | 395 | 350 | 22 | **12** |
| d315 | DN300 | 445 | 400 | 22 | 12 |

Elf von elf Zeilen treffen **drei** Normmaße gleichzeitig. Damit ist die Reihe
eindeutig identifiziert, und die vierte Größe folgt daraus. In `data.js` steht
sie als `abgeleitet: ['holes', 'dn']` — nicht als gelesen.

Das ist ein anderer Umgang mit einer Lücke als bei Stopfen und Flachdichtung:
dort musste ich aus einem Foto schätzen. Hier liefert die Quelle selbst genug
Redundanz, um den fehlenden Wert zu **beweisen**.

### Neue Core-Funktionen

`plateWithHoles(rOut, rIn, h, holes, opt)` und `boltCircle(count, r, dCircle,
startDeg)`.

**Kein CSG.** `THREE.Shape` nimmt die Löcher als Innenkonturen auf, die
Triangulierung setzt sie in einem Zug — dasselbe Verfahren, mit dem `hexPrism`
seinen Sechskant baut. Eine boolesche Operation ist das nicht.

Weitere Abnehmer: Wandscheibe #48, Flanschadapter, Befestigungsplatten.

### Der Maßtest prüft, ob die Löcher durchgehen

```
{ key: 'loch', label: 'Löcher durchgehend (0 = ja)', soll: 0, ist: () => {
    const h = f.holes[0];
    const durch = A.probeAxial('flange', V3(-P.thick * 4, h.y, h.x), V3(1, 0, 0));
    return durch ? 1 : 0;
  } }
```

Ein Strahl längs der Achse durch ein Lochzentrum darf **nichts** treffen.
Trifft er, ist das Loch zugewachsen — der Fehler, den `plateWithHoles` machen
würde, wenn eine Innenkontur falsch orientiert ist. Diese Messung ist gegen
den Fehler nicht blind, um den es geht (Fehlerkatalog Gruppe C).

---

## Rohrschelle — vier Werkstoffe, keine Maße

Quelle `quellen/w2-pipe-clamp.png`. Spalten `Code · d · kg · Pack.`, neun
Größen. **Nur die Nennweite.**

Das Foto zeigt das komplexeste Zubehörteil des Katalogs:

1. zwei grüne PP-Halbschalen, an einer Seite scharnierartig zusammenlaufend
2. eine **dunkelgrüne Gummieinlage** in beiden Schalen — dämmt Körperschall
3. zwei Sechskantschrauben durch die Laschen, mit Beilagscheibe
4. ein **Mutterblock** am unteren Bogen für die Gewindestange

Alle vier sind modelliert. Die Explosionsansicht zieht die Gummieinlage aus
der Schale und den Mutterblock nach unten — die beiden Stellen, an denen ein
Monteur ansetzt.

### Gewichtsgegenprobe bei d32

| Teil | gerechnet |
|---|---|
| PP-Schalen (Ring Ø32 innen, 4,5 mm Wand, 22 mm breit) | 9,2 g |
| Gummieinlage (2 mm) | 5,5 g |
| Zwei M8-Schrauben mit Mutter | 22 g |
| Mutterblock M8 | 25 g |
| **Summe** | **≈ 62 g** |
| **Tabelle** | **70 g** |

Die 8 g Differenz gehen auf Beilagscheiben und Laschenmaterial. Brauchbar für
eine aus Pixeln abgeleitete Geometrie.

### Ein Befund aus dem Gewichtsverlauf

`0,06 · 0,06 · 0,07 · 0,08 · 0,08 · 0,13 · 0,20 · 0,21 · 0,24 kg`

Der Sprung von d50 (0,08) auf d63 (0,13) ist überproportional — die Masse
steigt um 63 %, der Umfang nur um 26 %. Das deutet auf einen Wechsel der
Schraubengröße von M8 auf M10 dort hin. Als ASSUMPTION umgesetzt und im Code
begründet.

### Teilringe ohne CSG

Die Halbschalen sind **Teilrotationskörper**: `revolve()` nimmt eine
`thetas`-Liste, ein Bogen von `gapDeg` bis `180 − gapDeg` ist also ein
gewöhnlicher Revolve über einen Teilwinkel. Keine geschnittene Vollschale,
keine boolesche Operation.

---

## Zwei Fehler in der Rohrschelle, gefunden vom Prüfer

Beide waren dem Maßtest unsichtbar, weil **keine Messung sie anfasste** —
Gruppe C des Fehlerkatalogs. Sie sind als Fall 24 und 25 aufgenommen.

**1 · Beide Schrauben lagen auf derselben Seite.** `rotateY(π)` lief nach
dem `translate` und drehte um die Welt-Y-Achse; die zweite Schraube wurde
nach +z zurückgeworfen. Box lief von −1,9 bis +26,9 statt symmetrisch, 5448
Vertices bei z > 1 gegen 1296 bei z < −1. Eine Lasche hatte keine Schraube.

Jetzt wird jede Seite in ihrer eigenen Richtung aufgebaut, ohne Nachdrehung.
Nachgemessen: 3372 Vertices je Seite, Symmetriedifferenz 0,00.

**2 · Der Mutterblock hatte keine Bohrung — der Hotspot behauptete sie.**
`buildNutBlock` erzeugte die Bohrung und gab sie neben der Geometrie
zurück, aber `index.js` verbaute nur die Geometrie. Der Block war massiv,
während der Hotspot „Innengewinde M8 für die Gewindestange" sagte. Derselbe
Fall wie der unsichtbare Sechskant (Fall 11).

Jetzt ist die Bohrung Teil der Kontur: ein `THREE.Shape` mit
Sechskant-Außen- und Kreis-Innenkontur, in einem Zug trianguliert — kein CSG.
Die Funktion liefert nur **eine** Geometrie; es gibt nichts, was der Aufrufer
vergessen könnte.

**Die Bohrungsprüfung brauchte drei Fassungen**, und das ist der lehrreichere
Teil. Die zweite Fassung prüfte auf „kein Treffer" — eine Gegenprobe seitlich
der Bohrung ergab ebenfalls keinen Treffer, der Strahl traf den Block
generell nicht. Sie hätte einen massiven Block durchgelassen.

Die dritte Fassung misst den **kleinsten Abstand aller Blockpunkte von der
Bohrungsachse**: 4,0 mm bei M8, 5,0 mm bei M10, nahe 0 bei massivem Block.
Eine Messung, die einen Wert liefert, kann nicht stillschweigend zu „immer
ja" degenerieren.

---

## Ein dritter Core-Fehler derselben Ursache

**`plateWithHoles` lieferte alle Durchmesser um 2 × bevel falsch.**

`ExtrudeGeometry` addiert `bevelSize` **nach außen**, senkrecht zur Kontur:
die Außenkontur wächst um bevel, jede Innenkontur schrumpft um bevel.
Gemessen am d63-Flansch:

| | Vorher | Nachher | Soll |
|---|---|---|---|
| D | 166,6 | 165,0 | 165 |
| D2 | 76,4 | 78,0 | 78 |

Beides genau 2 × 0,8 mm. Die Funktion legt ihre Konturen jetzt um bevel
versetzt an — außen kleiner, innen größer —, damit die Fasenkante auf dem
Nennmaß landet. So ist eine Fase auch fertigungstechnisch definiert: sie nimmt
vom Nennmaß, sie addiert nicht dazu.

**Das ist der dritte Fall derselben Ursache** nach `hexPrism` (Umkreis, 0,32 mm)
und `threadProfile` (Kuppenscheitel, 0,4 mm). Alle drei entstehen dort, wo eine
Rundung oder Fase auf einem Katalogmaß sitzt. Die Regel steht als **Fall 23**
im Fehlerkatalog:

> Wenn eine Fase, Rundung oder ein Bevel auf einem Katalogmaß sitzt, prüfe die
> Richtung, in die sie das Maß verschiebt — und kompensiere sie in der
> Konturberechnung, nicht in der Toleranz.

---

## Annahmen

| Annahme | Wert | Begründung | Zu verifizieren gegen |
|---|---|---|---|
| Flansch: Lochzahl 4/8/12 | nach DN | DIN 2501 PN 10, über D/D1/D3 in 11 von 11 Zeilen bestätigt | Zeichnung |
| Flansch: Fase 0,8 mm | — | Foto zeigt schmale gleichmäßige Kantenfase | Originalteil |
| Flansch: ein Teil in Stahl | — | Bezeichnung nennt „PP-Steel", die Mantelstärke steht nicht in der Quelle | Zeichnung |
| Schelle: Gummi 2 mm bis d50, 2,5 mm darüber | — | im Foto etwa 6 % des Nenndurchmessers | Originalteil |
| Schelle: Schalenwand 0,14·d, min. 4 mm | — | Verhältnis Außen- zu Innenkontur im Foto | Originalteil |
| Schelle: Bandbreite 0,68·d, min. 18 mm | — | etwa zwei Drittel des Rohrdurchmessers im Foto | Originalteil |
| Schelle: M8 bis d50, M10 darüber | — | Gewichtssprung 0,08 → 0,13 kg zwischen d50 und d63 | Originalteil |
| Schelle: Anschluss M8 bis d63, M10 darüber | — | übliche Deckenbefestigung | Originalteil |

Der Flansch trägt `DATA_STATUS = 'verifiziert'` — alle sechs Maße stehen in der
Quelle, nur die Lochzahl ist hergeleitet. Die Schelle trägt
`'verifiziert-ohne-masse'`.

---

## Abgabe

| | |
|---|---|
| `products/backing-flange/`, `products/pipe-clamps/` | ✅ |
| `core/geometry.js` — `plateWithHoles`, `boltCircle`, Bevel-Kompensation | ✅ |
| `dist/kaqua-backing-flange.html`, `-pipe-clamps.html` | ✅ |
| Alle 26 Einzelviewer nach der Core-Änderung neu gebaut (Fall 22) | ✅ |
| Prüfung §5.2b: 27 Dateien in `dist/` = 26 + Galerie, keine veraltet | ✅ |
| Registry 26/71, Bibliothek 26 Module | ✅ |
| Selbsttest 26/26, 0,18 mm | ✅ |
| Vergleichstest gegen Katalogfoto | offen |
