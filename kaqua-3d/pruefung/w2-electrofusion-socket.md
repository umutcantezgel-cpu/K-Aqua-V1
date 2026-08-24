# Prüfbericht — Elektroschweißmuffe (AQ271)

**Produkt** `fittings/electrofusion-socket` · **Datum** 24.08.2026
**Ergebnis** 14 Größen gebaut, größte Abweichung 0,01 mm

---

## 1 · Quellen

Katalog S. 92 und die Website-Aufnahme
`…-fittings-electrofusion-socket-….pdf`. Die Aufnahme ist ein **reines
Bild** — Textextraktion liefert null Zeichen. Gelesen wurde das
eingebettete JPEG: Seite 1 trägt drei Streifen à 3004×3949 px, die
zusammengesetzt die Gesamtseite ergeben. Die Tabelle liegt über die
Streifengrenze hinweg und wurde entsprechend zusammengesetzt.

Beide Quellen tragen dieselben 14 Zeilen. Nach der letzten folgt der
ORDER-Knopf (Fall 2).

Spalten: `Code d D L h L₁ kg Pack.`

## 2 · Die Zeichnung löst h auf

`h` wäre aus der Tabelle allein nicht deutbar gewesen — es ist in jeder
Zeile größer als D, aber der Abstand schrumpft von 20 mm bei d25 auf
0,5 mm bei d315. Die Maßzeichnung (zweite Miniatur, Fall 34) zeigt
warum: sie greift von der Unterkante des Körpers bis zur **Oberkante der
beiden Kontaktdome**.

Damit sind **zwei Maße abgeleitet statt geschätzt**:

```
Stiftüberstand = h − D          19 · 20 · 20 · 20 · 19 · 18 · 16 · 17
                                 · 8 · 11 · 11 · 11 · 4 · 0,5 mm
Anschlagbreite = L − 2·L₁        2 · 2 · 2 · 3 · 4 · 4 · 3 · 2 · 1
                                 · 2 · 3 · 3 · 0 · 0 mm
```

Beide über alle 14 Zeilen durchgerechnet und **nie negativ** (Fall 28).
Ein negativer Wert hätte die Deutung widerlegt: die Einstecktiefen
dürfen sich nicht überschneiden, und die Gesamthöhe kann nicht unter dem
Außendurchmesser liegen. Bei d250 und d315 ist der Anschlag rechnerisch
null — dort läuft die Bohrung durch, und das Modell baut sie so.

Die Zeichnung zeigt außerdem eine **zylindrische** Bohrung ohne
Muffenkonus: beim Elektroschweißen wird das Rohr eingeschoben, nicht
eingepresst. `sockTaper = 0`.

## 3 · Nicht modelliert

Die **Heizwendel**. Sie liegt im Material, ist von außen unsichtbar, und
die Zeichnung deutet sie nur als schraffiertes Band an. Sie zu erfinden
hieße, eine Gestalt zu zeigen, die keine Quelle bemaßt.

ASSUMPTION bleiben nur Durchmesser und Lage der Kontaktdome, an der
Zeichnung abgegriffen (Ø 0,22·L, Mitte bei 0,36·L).

## 4 · Der Fehler, den erst die großen Größen zeigten

Die Dome waren zuerst am **Außendurchmesser** bemessen: Ø 0,22·D. Das
geht bei den kleinen Zeilen durch und bricht bei den großen, weil D dort
schneller wächst als L:

| | d20 | d160 | d200 | d250 | d315 |
|---|---|---|---|---|---|
| L soll | 70 | 175 | 185 | 212 | 240 |
| L ist (erste Fassung) | 70 | 176,16 | 192,99 | 226,37 | **261,78** |

Bei d315 ist D = 372,5 mm, L aber nur 240 — die Dome ragten 21,8 mm über
die Stirnflächen hinaus. Der Maßtest hat es in vier Zeilen gefunden, und
zwar **wachsend mit der Größe**: das ist nach Fall 27 das Kennzeichen
einer falsch skalierten Größe, nicht einer Fase.

Behoben: die Dome skalieren mit der LÄNGE (Ø 0,22·L, Mitte 0,36·L), und
ein Wächter wirft, falls ihr äußerer Rand die Stirnfläche erreicht.

Zweiter, systematischer Befund derselben Runde: **h war in ALLEN 14
Zeilen um genau 0,31 mm zu klein.** Ein über alle Größen konstanter
Betrag ist nie ein Rundungsfehler — hier waren es die 0,4 mm, mit denen
der Domfuß im Mantel steckt (sie gehörten nicht zum Überstand), abzüglich
des 0,09 mm Formtrenngrats. Der Grat steht jetzt im Sollwert statt in der
Abweichung (Fall 23).

## 5 · Maßtest, alle 14 Größen

**Größte Abweichung 0,01 mm.** Beispiel AQ27120 (d20):

| Maß | soll | ist |
|---|---|---|
| L | 70 | 70 |
| D | 33 | 33,01 |
| D fällt zur Stirnfläche (Vorzeichen) | 1 | 1 |
| h (mit 0,09 mm Grat) | 52,09 | 52,09 |
| Muffenbohrung | 20 | 20 |
| L₁ | 34 | 34 |
| Anschlag (L − 2·L₁) | 2 | 2 |
| Bohrung am Anschlag | 13,33 | 13,33 |
| Symmetrie x | 0 | 0 |
| Wandstärke | 6,5 | 6,5 |

**Gegenproben nach Fall 25:** `Muffenbohrung` (20) gegen `Bohrung am
Anschlag` (13,33) — zwei Bohrungen, zwei Werte. Und `D` gegen `D fällt
zur Stirnfläche`: die zweite prüft nur das **Vorzeichen** der
Entformungsschräge, nicht ihren Betrag. Ein Sollwert für den Betrag käme
aus derselben Formel, die die Kontur baut, und prüfte damit sich selbst
(Fall 12).

## 6 · Die vier Prüffragen

1. **Misst die Messung?** Alles aus Punktwolke oder Box, außer
   `restwand` und `anschlag` — beides Rechengrößen aus Tabellenwerten und
   als solche benannt.
2. **Welchen Fehler findet keine Messung?** Die Lage der Dome **quer**
   zur Achse. Der Schnitt in der XZ-Ebene blendet sie bewusst aus, sonst
   läse D ihre Höhe mit. Dass sie mittig auf dem Mantel sitzen, prüft
   nur die Sichtprobe.
3. **Liefert die Gegenprobe einen anderen Wert?** Ja, §5.
4. **Trägt die Tabelle die Deutung über alle Zeilen?** Ja — h − D und
   L − 2·L₁ sind in allen 14 Zeilen nicht negativ, und die Wandstärke
   wächst monoton bis auf eine Delle bei d160 (15 gegen 15,5 bei d125).

## 7 · Nach dem Bau

`kaqua.ok = true`, 25 760 Dreiecke, ein Teil.
Selbsttest: **39 Module geladen, 39 in der Registry, größte Abweichung
0,20 mm, 1 140 636 Dreiecke, keine Auffälligkeiten.**

## 8 · Offen

Der Stiftüberstand h − D schrumpft von 20 mm bei d25 auf 0,5 mm bei
d315. Kontaktdome schrumpfen in Wirklichkeit nicht. Entweder sind sie
bei den großen Muffen versenkt, oder h bedeutet dort etwas anderes.
Beide Quellen tragen die Zahlen; am Originalteil zu prüfen.
