# Prüfbericht — Flanschadapter / Bundbuchse (AQ790)

**Gebaut am 24.08.2026 · Phase 2 · 44 von 71**

Quelle: Druckkatalog `KA-Katalog_GB_06-2025_NEU.pdf`, Seite 90, untere
Tabelle. **11 Größen in zwei Bauarten** — sieben mit Schweißmuffe
(d40–d125), vier mit Spitzende (d160–d315).

---

## 1 Was `D` und `D1` bedeuten — belegt an einer dritten Tabelle

Die Spalten sind in den beiden Blöcken vertauscht, und die eigene
Tabelle sagt nicht, welche was ist. Bei d40 steht `D = 60` und
`D1 = 50` — welcher ist der Bund?

Die Antwort steht **auf Seite 110**. Der lose Gegenflansch (AQ750) führt
die Spalte `D2`: die Bohrung, mit der er über den Adapter geschoben
wird. Sie muss **größer als der Schaft und kleiner als der Bund** sein,
sonst funktioniert das Teil nicht.

| d | Adapter `D1` | Flansch `D2` | Adapter `D` | passt |
|---|---|---|---|---|
| 40 | 50 | 51 | 60 | ✓ |
| 50 | 60 | 62 | 70 | ✓ |
| 63 | 76 | 78 | 89 | ✓ |
| 75 | 89 | 92 | 105 | ✓ |
| 90 | 109 | 110 | 125 | ✓ |
| 110 | 132 | 133 | 158 | ✓ |
| 125 | 146 | 150 | 162 | ✓ |

`D1 < D2 < D` in allen sieben Zeilen. Damit steht fest: **`D` ist der
Bund, `D1` der Schaft.**

Bei der Spitzendbauart ist es umgekehrt. Dort gibt es kein `D`, und die
`D1`-Werte (212 · 269 · 320 · 370) liegen ÜBER den Flanschbohrungen
(178 · 235 · 288 · 338). `D1` ist dort der Bund, der Schaft ist das
Rohr mit dem Maß `d`. Auch diese vier Zeilen bestehen die Passprobe.

**Diese Probe ist als Messung ins Modell eingebaut.** Sie vergleicht
nicht zwei Tabellenwerte miteinander, sondern den GEMESSENEN Schaft und
den GEMESSENEN Bund gegen eine Zahl aus einer fremden Tabelle. Ein
Modell, das sie besteht, hat die Spalten richtig gedeutet — und das
lässt sich an der eigenen Tabelle allein nicht zeigen.

## 2 Gegenprobe der Muffentiefe

`z = l − Muffentiefe`, wie überall im Katalog:

```
d50   33 − 23,5 =  9,5   Tabelle  9,7
d63   40 − 27,5 = 12,5   Tabelle 12,9
```

Bei d40, d75, d90, d110 und d125 weicht es um 1 bis 3 mm ab —
**derselbe Drift wie beim Reduzier-T-Stück und beim Kugelhahn**: der
Katalog rechnet oberhalb d63 mit anderen Muffentiefen als DVS 2207-11.
Gebaut wird nach `l` und der Normreihe; `z` steht als Gegenprobe daneben.

## 3 Zwei Auffälligkeiten, dokumentiert statt aufgelöst

1. **AQ79075 (d75) fällt in DREI Spalten zugleich aus der Reihe.** `l`
   sinkt von 40 (d63) auf 37, obwohl es mit der Nennweite wachsen
   müsste; `h` sinkt von 15,5 auf 15; `z` stürzt von 12,9 auf 7,5. Drei
   Spalten, alle nach unten, während d63 und d90 untereinander stimmig
   sind.
2. **AQ790200 (d200) führt `z = 201` gegen 207 bei d160** — die
   Gesamtlänge sinkt bei wachsender Nennweite; d250 und d315 steigen
   dann wieder.

Beide **nicht geändert**. Das Modell baut die Tabellenwerte.

## 4 Zwei eigene Fehler

### 4.1 Das Messfenster für den Schaft war leer

`[xStart + 2, xBund − 2]` enthielt bei allen vier Spitzendgrößen
**keinen einzigen Netzpunkt**: der zylindrische Schaft trägt nur an
seinen Enden Punkte, und beide lagen außerhalb. Bei den Muffengrößen
traf das Fenster stattdessen die Bohrung und las 10 bis 22 mm zu wenig.
Dieselbe Falle wie beim Reduzier-T-Stück, eine Stunde später wieder.

### 4.2 Eine Fase saß genau auf dem Maßort

Der Fuß des Bundes hatte zuerst eine Fase von 0,4 mm. Der volle
Bunddurchmesser wurde dadurch 0,36 mm später erreicht, und `h` las sich
in **allen elf Zeilen um genau diesen Betrag** zu klein. Eine Konstante
über alle Größen ist nie eine Rundung.

Behoben nicht durch Anpassen des Sollwerts, sondern am Bauteil: der Fuß
des Bundes ist die **Sitzfläche des losen Gegenflansches**. Dort läuft
seine Dichtkante auf; eine Fase ist an dieser Stelle sachlich falsch.
Die Kante bleibt scharf.

## 5 Maßtest, alle elf Größen

```
 d     Länge   Bund     h    Schaft  Passung   d bzw. s
alle    0,00   0,00   0,00    0,00    0,00      0,00
```

**Jedes Maß in jeder Größe auf 0,00 mm.** Die Passprobe gegen den
Gegenflansch besteht in allen elf Zeilen.

## 6 Vier Prüffragen

**Trägt die Deutung über alle Zeilen?** Ja — und sie ist für die beiden
Blöcke verschieden, belegt an der Flanschbohrung.

**Gibt die Gegenprobe einen anderen Wert?** Ja, und sie stammt aus einer
FREMDEN Tabelle: Schaft < D2 < Bund.

**Ist eine Messung auf sich selbst zurückgeworfen (Fall 12)?** Nein.
Gemessen werden die Koordinaten, die `revolve` geschrieben hat; die
Sollwerte kommen aus der Katalogtabelle.

**Wurde die Seite geöffnet (Fall 38)?** Ja. Die Gestalt deckt sich mit
dem Katalogfoto S. 90.

## 7 Ergebnis

`ok: true`, elf Größen, 19.584 bzw. 18.432 Dreiecke, **größte Abweichung
0,00 mm**. Selbsttest **44 von 44**, keine Auffälligkeiten.

Eine Ersatzzuordnung entfällt: `flange-adaptor` zeigte den losen
GEGENFLANSCH. Der gehört dazu, ist aber ein anderes Teil — Stahl statt
PP-R, und er wird über den Adapter geschoben. Beide stehen jetzt
nebeneinander in der Bibliothek, mit je elf Größen.
