# Prüfbericht — T-Stück 90° mit Innengewinde für Innenventil (AQ599A)

**Gebaut am 25.08.2026 · Phase 2 · 50 von 71**

Quelle: Druckkatalog `KA-Katalog_GB_06-2025_NEU.pdf`, Seite 108, obere
Tabelle. Vier Größen.

---

## 1 Zwei konstante Spalten sagen, was das Teil ist

| Code | d | G | D | L | D1 | z | h |
|---|---|---|---|---|---|---|---|
| AQ599A2034 | 20 | ¾" | 33 | 80 | **45** | 46 | **33** |
| AQ599A2534 | 25 | ¾" | 36 | 80 | **45** | 43 | **33** |
| AQ599A3234 | 32 | ¾" | 43 | 75 | **45** | 39 | **33** |
| AQ599A321 | 32 | 1" | 44 | 94 | **45** | 58 | **33** |

`D1` und `h` sind über alle vier Zeilen **konstant**, während `d` von 20
auf 32 und `G` von ¾" auf 1" wächst. Ein Abzweig, dessen
Außendurchmesser und Höhe sich über die Baureihe nicht ändern, ist keine
Muffe und kein gewöhnlicher Gewindeanschluss — er ist die Aufnahme für
ein **genormtes Ventiloberteil**, das auf jede Nennweite passen muss.

Der Katalog führt das Teil folgerichtig unter „K-Aqua-Valves", nicht bei
den Übergangsfittings.

**Die Selbstprüfung steht in `data.js`:** weicht eine Zeile von 45/33 ab,
bricht das Produkt schon beim Laden ab. Die Deutung ruht auf dieser
Konstanz; wird sie falsch transkribiert, fällt sie mit.

## 2 `G` statt `Rp` ist kein Schreibfehler

Das gewöhnliche T-Stück mit Innengewinde (S. 99) führt `Rp`, dieses hier
`G`. Beide bezeichnen zylindrische Rohrgewinde mit denselben Nennmaßen,
aber:

* **Rp** (ISO 7-1) dichtet **im Gewinde**, gepaart mit einem kegeligen R.
* **G** (ISO 228-1) dichtet **nicht im Gewinde**, sondern an einer
  Planfläche.

Genau das braucht ein eingeschraubtes Ventiloberteil, das auf seiner
Schulter abdichtet. Der Katalog benutzt den Unterschied bewusst.

Für die Geometrie bleibt es dieselbe Kontur — deshalb baut das Modell
den Ring mit `threadRing` aus dem Core, wie jedes andere Innengewinde.

## 3 Was geliehen ist und was eigen

Der **Durchgang** kommt vollständig aus `_tee/parts.js` (`runProfile`) —
es ist derselbe Durchgang wie beim T-Stück und beim Gewinde-T-Stück, und
dreimal geschrieben würde er driften (Fall 32). Eingetragen als
Anleihe im Bau, nicht als ganze Familie: der Ventilkörper braucht nur
den Durchgang, nicht die Abzweiglogik der Gewinde-T-Stücke.

Der **Dom** ist eigen: ein Zylinder mit konstantem `D1`, in dem ein
Messingring sitzt.

## 4 Maßtest, alle vier Größen

```
Größe     L      h      D       D1     kern     bohrung
20x¾"   0,00   0,00   −0,03    0,00   −0,14     0,00
25x¾"   0,00   0,00   −0,03    0,00   −0,14     0,00
32x¾"   0,00   0,00   −0,03    0,00   −0,14     0,00
32x1"   0,00   0,00   −0,03    0,00   −0,17     0,00
```

Größte Abweichung **0,17 mm** — das ist die bekannte Eigenschaft von
`threadProfile` im Core, dieselben Zahlen wie bei der Übergangsmuffe IG
und beim Gewinde-T-Stück. `D` liegt um 0,03 mm unter Maß; das ist die
Verrundung am Mundlochbund.

**Die Konstanz braucht keine eigene Messung.** Der Selbsttest führt alle
vier Größen einzeln auf, und die Zeilen `D1` und `h` tragen in allen
vieren dieselbe Zahl — 45 und 33 — während `d` und `G` wechseln. Eine
zusätzliche „Konstanz-Messung" wäre nur die Summe zweier Maße, die schon
dastehen; sie sähe nach mehr Prüfung aus, als sie ist.

**Gegenprobe (Fall 25):** die Durchgangsbohrung gegen den Gewindekern.
Sie MUSS enger sein — sonst wäre der Dom keine Ventilaufnahme, sondern
ein zweiter Durchgang. Bei d20 stehen 13,33 gegen 23,98.

## 5 Zum sechsten Mal: ein leeres Messfenster

`D1` las zunächst `NaN`. Der Dom ist zwischen Kehle und Stirnfläche ein
glatter Zylinder, und `buildProfile` unterteilt gerade Strecken nicht —
also lag dort kein einziger Netzpunkt.

Behoben mit einem Profilpunkt auf der Messhöhe, die `params.js` als
`P.yMess` führt. Dass die Höhe dort steht und nicht im Messsatz, ist
Absicht: **`parts.js` setzt den Punkt, `index.js` zielt darauf** — läge
die Zahl zweimal da, würden sie auseinanderlaufen.

## 6 Offener Punkt: der Bezugspunkt von `z`

`L − z` beträgt 34 · 37 · 36 · 36 — nahezu, aber nicht ganz konstant.
Wäre `z` die übliche Einbaulänge (`L` minus zweimal Muffentiefe), müsste
die Differenz 29 · 32 · 36 · 36 lauten, also mit der Nennweite wachsen.
Bei d20 und d25 weicht sie um 5 mm ab.

Vier Zeilen reichen nicht, um den Bezugspunkt festzunageln. Für die
Geometrie wird `z` nicht gebraucht — `L`, `D`, `D1` und `h` bestimmen den
Körper vollständig. Der Wert steht in `data.js` und wird als
`P.socketFromTable` mitgeführt, aber nicht modelliert (Fall 29).

## 7 Vier Prüffragen

**Trägt die Deutung über alle Zeilen?** Ja — und die entscheidende
Aussage (D1 und h konstant) ist als Ladeprüfung verankert.

**Gibt die Gegenprobe einen anderen Wert?** Ja: Durchgangsbohrung gegen
Gewindekern, 13,33 gegen 23,98 bei d20.

**Ist eine Messung auf sich selbst zurückgeworfen (Fall 12)?** Nein.

**Wurde die Seite geöffnet (Fall 38)?** Ja. Die Gestalt deckt sich mit
dem Katalogfoto S. 108.

## 8 Ergebnis

`ok: true`, vier Größen, 53.792 Dreiecke, größte Abweichung 0,17 mm.
Selbsttest **50 von 50**, keine Auffälligkeiten.

Eine Ersatzzuordnung wird umgehängt: die Seite heißt
`tee-90-female-thread-**for**-internal-valve`, das Modell
`…-internal-valve`. Ein „for" Unterschied, den die erzeugte Zuordnung
nicht überbrückt — vorher zeigte die Seite den Kugelhahn.
