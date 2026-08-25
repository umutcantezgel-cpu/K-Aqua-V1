# Prüfbericht — Reduzier-T-Stück (AQ130)

**Gebaut am 24.08.2026 · Phase 2 · 43 von 71**

Quelle: Druckkatalog `KA-Katalog_GB_06-2025_NEU.pdf`, Seiten 88 und 89.
**37 Größen in zwei Bauarten.** Damit ist `reducing-tee-large`
mitabgedeckt; die Zielzahl bleibt 71.

---

## 1 Eine Tabelle, zwei Bauarten, zwei Bedeutungen derselben Spalten

Die Tabelle „Reducing tee" ist durch die Zwischenzeile „SDR 11*"
geteilt, mit der Fußnote *„SDR 11 jointing techniques: butt-fusion or
electrofusion welding"*:

| | Größen | D / D1 | s / s1 |
|---|---|---|---|
| Schweißmuffe | 27 | belegt | leer |
| Spitzende | 10 | leer | belegt |

**Die Spalten `l` und `z` bedeuten in den beiden Blöcken
Verschiedenes.** Das steht nirgends geschrieben. Es ergibt sich aus den
beiden Zeichnungen auf S. 89 und ist an den Zahlen nachgerechnet:

| | `l` | `z` | `l1` | `z1` |
|---|---|---|---|---|
| Muffe | Achse → Stirnfläche | l − Muffentiefe | Achse → Stirnfläche Abzweig | l1 − Muffentiefe Abzweig |
| Spitzende | Länge des Spitzendes | Achse → Stirnfläche | Länge des Abzweig-Spitzendes | Achse → Stirnfläche Abzweig |

**Nachgerechnet, nicht angenommen.** Bei der Muffenbauart ergibt `l − z`
genau die Muffentiefe:

```
d25   32−16 = 16,0   Norm 16,0      d63   62−35 = 27,0   Norm 27,5
d32   38−20 = 18,0   Norm 18,0      d75   71−41 = 30,0   Norm 31,0
d40   44−24 = 20,0   Norm 20,5      d90   83−50 = 33,0   Norm 35,0
d50   52−28 = 24,0   Norm 23,5      d110  99−62 = 37,0   Norm 41,0
```

Bis d63 auf einen halben Millimeter. Darüber wächst die Abweichung —
denselben Drift zeigt der Kugelhahn auf S. 107 (Spalte C: 35,5 gegen
35,0 bei d90). Der Katalog rechnet oberhalb d75 mit etwas kürzeren
Muffen als DVS 2207-11.

Bei der Spitzendbauart wäre dieselbe Deutung **unmöglich**: `z = 206`
bei `l = 104` (AQ13016090). Eine Einbaulänge, die die Baulänge
übersteigt, gibt es nicht. Umgekehrt geht es auf.

**Gegenprobe der Spitzend-Wandstärke** gegen die Fußnote: `s` müsste
d/11 sein. Es trifft in acht von zehn Zeilen exakt und in zweien auf
0,1 mm. Das bestätigt zugleich, dass `s` wirklich eine Wandstärke ist.

## 2 Die Familie trägt jetzt ungleiche Abzweige

`buildTee` setzte Abzweig gleich Durchgang voraus. Die Abzweigfelder
(`dB`, `ODB`, `socketB`, `boreRB`) fallen ohne `d1` auf die Werte des
Durchgangs zurück — für das gleichschenklige T-Stück und die beiden
Gewinde-T-Stücke ändert sich damit nichts.

**Neutralität bewiesen, zweimal**: einmal direkt nach dem Umbau und noch
einmal nach dem vollständigen Neubau aller 43 Viewer.

| | Größen | Dreiecke | Netze | Abweichung |
|---|---|---|---|---|
| `fittings/tee` | 10 | 27.680 | 1 | 0,01 mm |
| `tee-90-female-thread` | 5 | 47.648 | 2 | 0,13 mm |
| `tee-90-male-thread` | 4 | 47.140 | 2 | 0,15 mm |

Zeichen für Zeichen dieselben Zeilen wie vorher.

## 3 Vier Auffälligkeiten im Katalog, dokumentiert statt aufgelöst

1. **AQ1307520** (d75 × 20) führt `D = 85`. Alle anderen d75-Zeilen und
   das gleichschenklige T-Stück d75 führen 100. `D` ist der
   Muffenaußendurchmesser des DURCHGANGS und kann vom Abzweig nicht
   abhängen.
2. **AQ1305032** (d50 × 32) führt `l1 = 62`, die Nachbarzeilen d50 × 20
   und d50 × 25 führen 46.
3. **`z` hängt in zwei Zeilen vom Abzweig ab**, was es nicht dürfte:
   AQ1305040 und AQ1306340 führen je `z = 39` statt 28 bzw. 35. Beides
   sind genau die Zeilen mit dem größten Abzweig ihrer Gruppe.
4. **AQ1307563** (d75 × 63) führt `D1 = 101` bei `D = 100` — die
   Abzweigmuffe wäre einen Millimeter dicker als die Durchgangsmuffe.
   Bei den übrigen 26 Muffenzeilen ist D1 ≤ D.

Alle vier: **nicht geändert**. Das Modell baut die Tabellenwerte; der
Wächter für D1 lässt bis D + 1,5 mm zu und meldet darüber.

## 4 Die Messung — drei Fehlversuche und was sie lehren

Der Bau kennt **kein CSG**. Die Mantelfläche des Durchgangs existiert
auch UNTER dem Abzweig, die des Abzweigs auch INNERHALB des Durchgangs.
Ein Strahl trifft die erste Fläche, nicht die gesuchte.

| Anlauf | Ergebnis | Ursache |
|---|---|---|
| Axiale Strahlen auf die Muffengründe | bis **11,3 mm** daneben, bei 8 von 37 Größen | Strahl lief in den Mantel der anderen Achse |
| Strahlenfächer, 96 Strahlen | teils besser, `D` bei d75×63 um 0,99 daneben | Box3 misst den dickeren Abzweigbund; Fächer trifft nur Facetten |
| Schmales Fenster am Netz | **Unendlich** bei allen 10 Spitzendgrößen | `buildProfile` unterteilt gerade Strecken nicht — das Fenster war leer |
| Weiter Halbraum am Netz | bis **113 mm** daneben | fing die Punkte der anderen Achse mit ein |

Gemessen wird jetzt **am gebauten Netz**, über einen Halbraum, der
hinter der Kreuzung beginnt: jenseits von Außenradius plus Kehlenradius
der anderen Achse kann nur noch eine Fläche liegen. Dass er nicht leer
ist, sichert der Mundlochbund.

Zwei Feinheiten, beide nachgemessen:

* Die Zugabe von **2 mm** ist kein Sicherheitsabstand. Mit 0 mm begann
  der Halbraum exakt auf dem Muffengrund und nahm den Punkt der
  Durchflussbohrung mit — 22,6 mm daneben. Mit 0,5 mm reichte noch der
  Verrundungsradius von 1,2 mm hinein und zog die Messung um 0,7 mm nach
  innen.
* Die Spitzendbauart bekam **vier Zwischenpunkte im Mantel** bei ±xSp
  und ±xBody. Sie ändern die zylindrische Fläche nicht, aber ohne sie
  hat das Netz zwischen den Stirnflächen überhaupt keine Punkte.

## 5 Maßtest, alle 37 Größen

```
Muffenbauart (27)      lauf  abzweig     D     D1      d     d1
                       0,00     0,00  −0,01  −0,01   0,00   0,00
                                      …−0,02

Spitzendbauart (10)    lauf  abzweig     d     d1      s     s1   Körperwand
                       0,00     0,00   0,00   0,00  +0,13  +0,13      −0,09
```

**Größte Abweichung 0,13 mm.** Sie ist über alle zehn Spitzendgrößen
KONSTANT — das ist die Handschrift eines festen Verrundungsradius am
Wandsprung (0,8 bzw. 1,2 mm), nicht die eines Skalierungsfehlers, der
mit der Größe wüchse.

**Gegenprobe (Fall 25):** `d1` gegen `d` — die Abzweigbohrung MUSS
kleiner sein als die des Durchgangs, sonst ist nichts reduziert. Bei
allen 37 Größen ist sie es. Und `Körperwand` gegen `s`: hinter dem
Spitzende ist die Wand dicker, sonst hätte die Spalte `l` keinen Sinn.

## 6 Ein Layoutfehler, den erst dieses Produkt aufgedeckt hat

Mit 37 Größenknöpfen wuchs das Dokument auf **1964 px** statt 1280, die
Seite scrollte waagerecht und das Modell stand außermittig.

Ursache: `.viewer` ist ein Grid, und Grid-Elemente haben
`min-width: auto`. Ein Kind, das breiter ist als der Rahmen, sprengt die
Spalte — `max-width: 1280px` am Container hilft dann nicht. Behoben mit
`grid-template-columns: minmax(0, 1fr)`; die Größenleiste scrollt jetzt
in sich.

**Bei bis zu 14 Größen war davon nichts zu sehen.** Der Fehler steckte
seit jeher in allen Viewern.

## 7 Vier Prüffragen

**Trägt die Deutung über alle Zeilen?** Ja — und sie ist für die beiden
Blöcke VERSCHIEDEN, was eigens nachgerechnet wurde.

**Gibt die Gegenprobe einen anderen Wert?** Ja, zweimal: Abzweig- gegen
Durchgangsbohrung, Körperwand gegen Spitzendwand.

**Ist eine Messung auf sich selbst zurückgeworfen (Fall 12)?** Nein.
Gemessen werden die Koordinaten, die `revolve` geschrieben hat.

**Wurde die Seite geöffnet (Fall 38)?** Ja, in beiden Bauarten — und
genau das hat den Layoutfehler gefunden, den kein Maß sah.

## 8 Ergebnis

`ok: true`, 37 Größen, 27.680 bzw. 21.536 Dreiecke, größte Abweichung
0,13 mm. Selbsttest **43 von 43**, keine Auffälligkeiten.

Zwei Ersatzzuordnungen entfallen, eine wird umgehängt:
`reducing-tee` zeigte die Reduzier**muffe** — ein Bauteil ohne Abzweig —
und `reducing-tee-large-sizes` ebenfalls. Letztere zeigt jetzt auf das
Reduzier-T-Stück, das die großen Nennweiten selbst trägt.
