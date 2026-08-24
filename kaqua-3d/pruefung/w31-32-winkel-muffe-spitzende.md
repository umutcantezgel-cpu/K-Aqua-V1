# Prüfbericht — Welle 3.1/3.2, Winkel 45° und 90° Muffe/Spitzende

**Produkte** `fittings/elbow-45-female-male` (AQ041) und
`fittings/elbow-90-female-male` (AQ091)
**Datum** 24.08.2026 · **Ergebnis** beide gebaut, Maßtest 0,01 bzw. 0,00 mm

---

## 1 · Quellen und Deutung

Katalog S. 84 (unten) und S. 85 (unten), gegengeprüft an den
Website-Aufnahmen `…-fittings-elbow-45-femalemale-….pdf` und
`…-elbow-90-femalemale-….pdf`. Je **2 Größen** — mehr führt der Katalog
nicht. Spalten `Code d D l z z₁ kg Pack.`

Deutung: ein Schenkel ist Schweißmuffe (Außendurchmesser **D**, Achse bis
Stirnfläche **l**, Einbaulänge **z**), der andere ein **Rohrende**, das in
die Muffe des nächsten Teils gesteckt wird (Achse bis Spitze **z₁**,
Außendurchmesser = **d**).

**Zwei Gegenproben, beide über alle vier Zeilen:**

| | l − z | Normreihe DVS 2207-11 |
|---|---|---|
| 45° d20 | 20 − 5 = 15 | 14,5 |
| 45° d25 | 22 − 6 = 16 | 16,0 |
| 90° d20 | 27 − 12 = 15 | 14,5 |
| 90° d25 | 30 − 14 = 16 | 16,0 |

Vier von vier auf 0…0,5 mm — enger als bei jeder anderen Familie. Und
**D deckt sich mit der Muffentabelle**: 29 bei d20, 34 bei d25, dieselben
Werte wie `products/socket` und wie der einfache Winkel. Der
Muffenschenkel ist derselbe Körper.

## 2 · Gestalt: kein neuer Körper

Beide Produkte tragen `products/_bendthread/parts.js` — denselben Körper
wie der Winkel mit Außengewinde und die beiden Laschen. Er kann ungleiche
Schenkel und ungleiche Außendurchmesser; hier ist Schenkel B einfach
durchgehend Rohr:

```
insertDepth = 0        schaltet die Sitzzone in boreAlong ab
rInsertOut  = boreR    macht auch die Übergangsrampe wirkungslos
collarLen   = 0        kein Absatz
rLegB       = d / 2    das Spitzende IST ein Rohr
```

Eine Änderung war nötig: der Ablenkwinkel war mit **90 fest verdrahtet**.
Jetzt `P.angle ?? 90` — ohne Angabe bleibt das Verhalten Zeichen für
Zeichen das alte, die drei Gewindeprodukte bauen unverändert.

## 3 · Zwei Fehler, die der 45°-Winkel gefunden hat

Beide waren in der 90°-Welt unsichtbar, weil dort zwei Größen
zusammenfallen. Dasselbe Muster, das schon `bendPath` bei den ungleichen
Schenkeln hatte: **cos 90° = 0 verdeckt Vorzeichen, tan 45° ≠ 1 deckt sie
auf.**

**3.1 Der gerade Schenkel endet am SETBACK, nicht bei bendR.**
Der Bogen frisst von jedem Schenkel R·tan(α/2). Bei 90° ist das genau R —
deshalb ging `hi = −bendR` bisher durch. Bei 45° sind es nur 41 % von R,
die Grenze lag 6 mm zu weit außen, und die Prüfung auf einen freien
Rohrabschnitt schlug fälschlich an: „kein freier Rohrabschnitt zwischen
Muffe und Bogen (−5,0 … −10,9)". Der Wächter hatte recht zu melden — die
Rechnung dahinter war falsch. Korrigiert, auch in `_bracket/params.js`,
wo bei 90° derselbe Wert herauskommt, aber der Begriff falsch war.

**3.2 Der Achsabstand misst bei 45° den falschen Schenkel.**
Die erste Fassung nahm alle Punkte mit Projektion t ≈ s auf die
Muffenachse und maß ihren Abstand zu dieser Achse. Ergebnis: **D = 30,54
statt 29** (d20) und **36,73 statt 34** (d25). Ursache: nahe der Ecke
haben Mantelpunkte des SPITZENDES ebenfalls t ≈ s, und ihr Abstand zur
Muffenachse ist größer als deren Radius. Bei 90° stehen die Achsen so,
dass das nicht passiert.

Ersetzt durch einen **Ebenenschnitt**: Punkte in der Ebene, die die
Schenkelachse mit z aufspannt, Radius = |z|. Dass er den anderen Schenkel
ausschließt, ist nicht gehofft, sondern nachgerechnet: ein Punkt des
Spitzendes mit v·n = 0 liegt bei x = +1,414·u mit u ≥ Setback > 0, also
bei t = −x < 0 — er kann eine Station s > 0 des Muffenschenkels nicht
erreichen.

Danach liest D exakt 29 bzw. 34.

## 4 · Maßtest, alle vier Größen

**45°: größte Abweichung 0,01 mm. 90°: 0,00 mm.**

Beispiel AQ09125 (d25, 90°):

| Maß | soll | ist |
|---|---|---|
| l | 30 | 30 |
| z₁ | 41 | 41 |
| D | 34 | 34 |
| Ø Spitzende | 25 | 25 |
| Muffenbohrung | 25 | 25 |
| Rohrbohrung hinter der Muffe | 16,67 | 16,67 |
| Rohrbohrung im Spitzende | 16,67 | 16,67 |
| Freies Rohrende | 28,5 | 28,5 |
| Symmetrie z | 0 | 0 |

**Gegenprobe nach Fall 25:** `D` (34) gegen `Ø Spitzende` (25) — dasselbe
Merkmal an zwei Stellen, zwei verschiedene Werte. Ebenso drei Bohrungen
mit drei Werten.

## 5 · Die vier Prüffragen

1. **Misst die Messung?** Alles aus der Punktwolke, ausser `restwand` und
   `restwandB` — Wandstärken, nach Fall 12 zulässig.
2. **Welchen Fehler findet keine Messung?** Ob das freie Rohrende in eine
   Muffe der Normreihe **passt**. Deshalb prüft die Parametrik es
   ausdrücklich und wirft, wenn `spigotFree < fusionDepth(d)` — bei d20
   18,3 gegen 14,5, bei d25 23,1 gegen 16,0.
3. **Liefert die Gegenprobe einen anderen Wert?** Ja, §4.
4. **Trägt die Tabelle die Deutung über alle Zeilen?** Ja — l − z trifft
   in vier von vier Zeilen die Normreihe, D in vier von vier die
   Muffentabelle.

## 6 · Nach dem Bau

`kaqua.ok = true` bei beiden, je 29 456 Dreiecke, ein Teil.
Selbsttest: **38 Module geladen, 38 in der Registry, größte Abweichung
0,20 mm, 1 114 876 Dreiecke, keine Auffälligkeiten.**

Nachgebessert: die Größenschlüssel hießen zuerst `d20`/`d25`, und der
Selbsttest setzt selbst ein `d` davor — die Referenzspalte las „dd25".
Jetzt `20`/`25`.
