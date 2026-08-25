# Prüfbericht — Überbogen und Überbogen-Rohr (AQ287 · AQ285)

**Gebaut am 25.08.2026 · Phase 2 · 49 von 71**

Quelle: Druckkatalog `KA-Katalog_GB_06-2025_NEU.pdf`, Seite 91. Sechs
Größen in zwei Produkten. **Neue Geometrie:** die Brückenbahn.

---

## 1 Die Masse hat entschieden, was die Zeichnung nicht konnte

Für die Spalte `H` kamen drei Lesarten in Frage, und die Maßskizze taugte
nicht zur Entscheidung — auf derselben Seite sind die Pfeile für `s` und
`d` fast gleich lang gezeichnet, obwohl `d` rund das Sechsfache von `s`
ist. Eine maßstabslose Schablone, wie schon bei den Anbohrsätteln.

Entschieden hat es die **tabellierte Masse**. Aus der Bahnlänge und den
Querschnitten lässt sich das Gewicht rechnen; PP-R hat 0,9 g/cm³.

| Deutung von `H` | d20 | d25 | d32 |
|---|---|---|---|
| **Bauhöhe** (Unterkante Muffe → Oberkante Scheitel) | **−7,5 %** | **+8,3 %** | **+0,8 %** |
| Achse → Scheitelspitze | +15 % | +38 % | +32 % |
| Achsanhebung | +43 % | +75 % | +70 % |

Die erste liegt in allen drei Zeilen innerhalb der Rundung einer auf zwei
Nachkommastellen angegebenen Kilogrammzahl. Die beiden anderen sind
systematisch zu schwer, und zwar **zunehmend mit der Größe** — das ist
die Handschrift eines zu langen Bogens, nicht die einer Rundung.

**Die Probe steht als Messung im Modell.** Der Rauminhalt des gebauten
Netzes wird über den Satz von Gauß berechnet (Summe der
vorzeichenbehafteten Tetraeder; die umgekehrt gewickelte Innenfläche
zieht ihren Hohlraum von selbst ab) und mit 0,9 g/cm³ gegen die
Katalogzahl gestellt. Sie prüft Bahn, Wandstärken, Muffentiefen und die
Deutung von `H` **auf einmal** — und ihr Sollwert steht gedruckt im
Katalog.

Ergebnis: **0,00 kg Abweichung in allen drei Größen des Fittings**, und
0,01 kg beim Rohr.

## 2 Die Bahn ist geschlossen lösbar

`bridgePath` steht im Core neben `bendPath`. Ein Überbogen führt die
beiden Enden **in einer Flucht** — anders als der Winkel, der die Bahn
ablenkt. Das erzwingt vier Bögen: hoch, wieder waagerecht, hinunter,
wieder waagerecht; die Summe der Ablenkungen ist null.

Für die linke Hälfte gilt mit Bogenradius R und Bogenwinkel α:

```
waagerecht   2·R·sin α        = L/2 − t
senkrecht    2·R·(1 − cos α)  = H_Achse
```

Der Quotient ist `(1−cos α)/sin α = tan(α/2)`, also

```
α = 2·arctan( H_Achse / (L/2 − t) )
R = H_Achse / (2·(1 − cos α))
```

Nichts daran ist geschätzt. Die rechte Hälfte wird **gespiegelt, nicht
gerechnet** — damit ist die Symmetrie exakt, und ein Vorzeichenfehler
fiele auf beiden Seiten gleich aus, statt sich zu verstecken.

`bridgePath` prüft sich selbst: Enden auf ∓L/2 und y = 0, Scheitel auf H.
Verfehlt die Bahn das um mehr als 0,02 mm, bricht sie ab.

## 3 Maßtest, alle sechs Größen

```
Überbogen (3)        L 0,00 · H 0,00…−0,01 · flucht 0,00 · scheitel 0,00
                     masse 0,00 · d 0,00
Überbogen-Rohr (3)   L 0,00 · H 0,00 · flucht 0,00 · scheitel 0,00
                     masse 0,00…0,01 · d 0,00
```

Größte Abweichung **0,01 mm**.

Der Messsatz führt eigens `flucht` — den Höhenversatz der beiden
Stirnflächen. Er ist das Maß, das den Überbogen vom Winkel unterscheidet,
und er muss null sein. Ein Vorzeichenfehler in einer der vier Krümmungen
fiele sonst nur als „sieht schief aus" auf.

## 4 Zwei offene Punkte

### `z` beim Überbogen ist nicht deutbar

Geprüft und verworfen:

| Deutung | d20 | d25 | d32 | tabelliert |
|---|---|---|---|---|
| `L − 2t` | 62 | 72 | 80 | **63 · 80 · 98** |
| `L − t` | 76 | 88 | 103 | |
| `L − 2·Muffentiefe` | 61 | 72 | 90 | |

Keine trifft. `L − z` beträgt 27 · 24 · 28 und wächst **nicht** mit der
Nennweite — bei einer Einbaulänge müsste es das. Eine Deutung, die über
die Zeilen nicht trägt, ist keine (Fall 28).

Für die Geometrie wird `z` nicht gebraucht: `L`, `H` und `t` bestimmen
die Bahn vollständig. Der Wert steht in `data.js`, wird aber weder
modelliert noch gemessen (Fall 29).

*Unabhängig bestätigt:* ein Gegenleser kam auf dieselben beiden
Rechnungen und dasselbe Ergebnis.

### Unter dem Scheitel bleibt wenig Luft

Mit der belegten Deutung von `H` bleibt unter dem Scheitel nur
3,8 mm (d20) bis 5,3 mm (d32) lichte Höhe — rund ein Fünftel der
Nennweite. Ein kreuzendes Rohr **gleicher** Nennweite passt da nicht
hindurch.

Naheliegend wäre gewesen, daraus auf eine andere Lesart von `H` zu
schließen. **Die Masse verbietet das.** Der Überbogen überquert also
entweder etwas Dünneres, oder die beiden Rohre liegen ohnehin versetzt
und er überbrückt nur den Rest. Nicht aufgelöst; die Zahl steht als
`P.durchlass` im Modell, damit sie im Bericht steht statt in einer
Vermutung.

## 5 Was am Rohr nicht herzuleiten war

Die gerade Endstrecke des Überbogen-Rohrs ist nicht bemaßt. Der Versuch,
sie aus der Masse herzuleiten, war richtig gedacht und scheitert an der
**Empfindlichkeit**: die Bahnlänge wächst bei d20 von 371 mm (t = 0) auf
nur 382 mm (t = 100), also um drei Prozent über den ganzen plausiblen
Bereich. Eine auf zwei Nachkommastellen gerundete Kilogrammzahl kann
daraus nichts festlegen.

Angesetzt sind 0,27·L aus der Maßskizze; der Biegeradius kommt damit auf
das 1,9- bis 3,1-fache des Rohrdurchmessers und ist damit fertigbar. Die
Masse bestätigt den Gesamtmaßstab — mehr nicht, und das steht so im Code,
damit niemand die Rechnung für schärfer hält als sie ist.

## 6 Vier Prüffragen

**Trägt die Deutung über alle Zeilen?** Ja für `d`, `L`, `H`, `t`, `s`.
Nein für `z` — deshalb ungedeutet und ungemessen.

**Gibt die Gegenprobe einen anderen Wert?** Die Massenprobe ist mehr als
das: ihr Sollwert kommt aus einer anderen Spalte als alle übrigen Maße
und prüft sie gemeinsam.

**Ist eine Messung auf sich selbst zurückgeworfen (Fall 12)?** Nein.

**Wurde die Seite geöffnet (Fall 38)?** Ja, beide. Die Gestalt deckt sich
mit den Katalogfotos S. 91.

## 7 Ergebnis

`ok: true`, sechs Größen, 22.144 bzw. 28.672 Dreiecke, größte Abweichung
0,01 mm. Selbsttest **49 von 49**, keine Auffälligkeiten.

Zwei Ersatzzuordnungen entfallen: beide Überbögen zeigten den Winkel 90°,
also ein Teil mit **einem** Knick.
