# Prüfbericht — Die drei Anbohrsättel (AQ130S · AQ270S · AQ243S)

**Gebaut am 24.08.2026 · Phase 2 · 47 von 71**

Quelle: Druckkatalog `KA-Katalog_GB_06-2025_NEU.pdf`, Seiten 102 und 103.
19 Größen in drei Produkten. **Neue Geometrie:** der Sattelschnitt.

Dieser Bericht führt auch, was ein Gegenlese-Durchgang mit vierzehn
unabhängigen Prüfern ergeben hat — sechs Transkriptionen und vier
Spaltendeutungen, jede davon anschließend von einem eigenen Prüfer
angegriffen.

---

## 1 Die Transkription ist sechsfach bestätigt

Je Tabelle haben zwei Prüfer unabhängig voneinander gelesen, ohne
Kenntnis der jeweils anderen Lesung. **Alle sechs Transkriptionen decken
sich mit meiner, Zeile für Zeile und Zelle für Zelle**, über alle drei
Tabellen. Keine einzige abweichende Zahl.

Zusätzlich prüft `weld-in-saddle/data.js` beim Laden selbst, dass `h` der
Reihe aus `_saddle/data-gemeinsam.js` folgt — ein Transkriptionsfehler in
dieser Spalte schlüge sofort zu, nicht erst im Bau.

## 2 Was die Zeichnung nicht hergibt

**Die Sattelzeichnung ist eine maßstabslose Schablone und dreimal
dieselbe Datei.** Auf Vektorebene nachgemessen:

| | S. 102 oben | S. 102 unten | S. 103 |
|---|---|---|---|
| `d₂`-Hilfslinien | 295,99 / 337,83 | 573,70 / 615,54 | 241,80 / 283,64 |
| Spannweite | **41,84 pt** | **41,84 pt** | **41,84 pt** |
| `d`-Spannweite | **26,51 pt** | **26,51 pt** | **26,51 pt** |

Nur das rechte Maß wechselt. Zwei Folgerungen: aus den Proportionen darf
nichts abgeleitet werden, und **eine der drei Zeichnungen kann die andere
nicht bestätigen** — sie ist dieselbe Datei.

Dazu kommt ein drittes Maß in der Zeichnung, schlicht `d`, dessen
Hilfslinie auf der Durchgangsbohrung liegt (Ø rund 26 pt). In der Tabelle
ist `d` aber 40–63 bis 160–250. **In der Zeichnung das kleinste, in der
Tabelle das größte Maß.** Die Pfeilansätze kodieren also nachweislich
nicht, was das Symbol bezeichnet.

## 3 Vier Spalten, vier Deutungen, zwei überstandene Widerlegungen

### `d₂` ist kein Außenmaß — die Tabelle entscheidet, nicht die Zeichnung

Ein Prüfer las an der Zeichnung ab, `d₂` sei der Außendurchmesser des
Sattelfußes. Die Beobachtung stimmt (die Hilfslinien setzen an den
Bogenenden an), die Deutung hält nicht:

* In **neun der elf Zeilen ist `d₂` zahlengleich mit `d₁`**. Zwischen
  einem Außendurchmesser und der von ihm umschlossenen Bohrung desselben
  Teils liegt immer eine Wand.
* `AQ130S406332` führt `d₂ = 25` bei `d₁ = 32` — **kleiner als die
  Bohrung, die es umschließen müsste.**

`d₂` trägt dieselbe Nennweiten-Semantik wie `d₁`: beide aus der
PP-R-Reihe 20 · 25 · 32 · 40 · 50 · 63. Es ist die Größe des Stutzens am
**Hauptrohr**, `d₁` die des Abzweigs.

### `h` endet am Kunststoff, nicht am Messing

`AQ270S` (Innengewinde) und `AQ243S` (Außengewinde) führen durchweg
**dieselben `h`** — 43 bei `d₂ = 25`, 50 bei `d₂ = 32` — obwohl der
Außengewindezapfen rund 15 mm weiter aufbaut. Auf S. 103 endet die
`h`-Hilfslinie an der Schulter, an der das Messing beginnt.

**Diese Aussage ist als Messung im Modell verankert.** Der Messsatz führt
`ueberstand`, den Überstand des Messings über den Kunststoff:

| | Soll | Ist |
|---|---|---|
| IG-Sattel (Rp) | 0 | **0,00** |
| AG-Sattel (R) | 14,4 | **14,40** |

Bei identischem `h`. Ein Modell, bei dem beide dasselbe meldeten, hätte
den Befund nicht verstanden.

Nebenbei berichtigt: Seite 99 führt **keine** Spalte `h` — der Buchstabe
dort ist ein kleines `l` (Muffenlänge). Genau die Verwechslung, die eine
Textextraktion erzeugt.

### `h` ist innerhalb einer Familie eine Funktion von `d₂`, über Familien hinweg nicht

```
AQ130S:   d₂ 25 → h 29    32 → 35    40 → 38    50 → 39    63 → 45
AQ270S/AQ243S:  25 → 43    32 → 50
```

Innerhalb der elf AQ130S-Zeilen hängt `h` **ausschließlich** von `d₂` ab
— `h = 29` tritt in allen drei Rohrgruppen auf. Das schließt jede
Deutung ab Rohrachse oder Rohrinnenfläche aus, denn die müsste sich mit
`d` ändern. Es schließt auch „`h` = Muffentiefe" aus: die Zeilen 1–3
haben `d₁` = 20, 25, 32 bei unverändertem `h = 29`.

### `d` ist ein Anwendungsfeld, kein Bauteilmaß

Der Bereich steckt in der Artikelnummer (`AQ130S**4063**20`), ist also
Teil der Artikelidentität. Ein Artikel = ein physisches Teil = **eine**
feste Sitzgeometrie. Die drei Bereiche kacheln das Rohrprogramm ab 40
lückenlos ab; die scheinbare Lücke 125 → 160 ist keine, weil es kein
140er Rohr gibt.

## 4 Die einzige wirkliche Annahme: welches Rohr?

Der Katalog bemaßt den Sitzradius nirgends. Die Richtung der Annahme ist
aber zwingend, und ich habe sie zweimal unabhängig hergeleitet
bekommen — über dieselbe Formel.

Der Spalt zwischen Sattel und Rohr beträgt im Abstand `z` von der
Scheitellinie

```
(z² / 2) · (1/R_Rohr − 1/R_Sitz)
```

Ist der Sattel **enger** als das Rohr, wird das negativ: er liegt auf
seinen Rändern auf und **hebt in der Mitte ab** — genau dort, wo die
Bohrung sitzt und die Naht dicht sein muss. `R_Sitz` muss also für jedes
Rohr der Gruppe mindestens so groß sein wie das Rohr. Angesetzt ist
deshalb das **größte** Rohr der Gruppe.

**Dritter, unabhängiger Beleg aus der Fotografie:** der Bogen auf dem
Produktfoto ist flach — Sehne rund 160 px bei einer Stichhöhe von rund
18 px, also ein Sitzdurchmesser vom Zwei- bis Dreifachen der
Schürzenbreite. Ein Sitz für d40 wäre bei dieser Schürzenbreite ein
nahezu halbkreisförmiger Trog. Das zeigt kein Foto.

Was von der Annahme abhängt, in Zahlen:

| Gruppe | Satteltiefe bei d₂ = 25 | Gegenannahme (kleinstes Rohr) |
|---|---|---|
| 40–63 | 2,59 mm | 4,39 mm |
| 75–125 | 1,26 mm | 2,14 mm |
| 160–250 | 0,63 mm | 0,98 mm |

Rund das 1,6-fache. Die Größenordnung der Fehlanpassung auf dem
kleinsten Rohr der Gruppe liegt bei etwa 3 mm Kantenspalt — Millimeter,
nicht Zehntel. Das bestätigt, dass die Schürze nicht dichtet, sondern
stützt, und dass der Bereich deshalb überhaupt zulässig ist.

## 5 Der Sattelschnitt

Neue Geometrie, in `_saddle/parts.js`. Hauptrohrachse auf X, Radius R,
Abzweigachse auf Y. Ein Punkt im Abstand `r` von der Abzweigachse unter
dem Winkel θ trifft den Rohrmantel bei

```
y = √(R² − r²·sin²θ)
```

Bei θ = 0 (längs des Rohrs) ist das der Scheitel `y = R`, bei θ = 90°
(quer) liegt es tiefer. Der Unterschied **ist** die Satteltiefe.
`sattelRevolve` hebt jeden Profilpunkt auf diese Kurve — kein CSG.

Zwei Messungen halten das fest, beide am gebauten Netz:

* **`satteltiefe`** — die Unterseite muss längs des Rohrs höher liegen
  als quer dazu. Bei einer ebenen Unterseite wäre sie null.
* **`scheitel`** — längs des Rohrs muss die Unterseite genau auf `R`
  liegen. Ein Teil, das hier danebenliegt, sitzt nicht auf dem Rohr.

Beide in allen 19 Größen auf **0,00 mm**.

## 6 Vier Messfenster lagen auf geraden Strecken

Zum vierten Mal an diesem Tag: `buildProfile` unterteilt gerade Strecken
nicht, und wo kein Profilpunkt liegt, liegt auch kein Netzpunkt. Der
Durchgang zwischen Muffengrund und Bohrungsstufe hatte **überhaupt
keinen** Punkt; die Messung fand nur die Außenkontur und las bis zu
41 mm zu viel.

Die Regel, die sich daraus ergibt und die jetzt im Code steht: **wo
gemessen werden soll, muss ein Profilpunkt liegen.**

## 7 Maßtest, alle 19 Größen

```
AQ130S (11)   h 0,00 · d₂ 0,00 · satteltiefe 0,00 · scheitel 0,00
              bossOD 0,00 · d₁ 0,00 · durchgang 0,00
AQ270S (4)    h 0,00 · d₂ 0,00 · satteltiefe 0,00 · scheitel 0,00
              ueberstand 0,00 · kern −0,13 … −0,14
AQ243S (4)    h 0,00 · d₂ 0,00 · satteltiefe 0,00 · scheitel 0,00
              ueberstand 0,00 · gewinde +0,03 … +0,04
```

Größte Abweichung **0,14 mm**, und das ist die bekannte Eigenschaft von
`threadProfile` im Core — dieselben Zahlen wie beim T-Stück mit
Innengewinde und bei der Übergangsmuffe IG.

## 8 Der Umzug von `SOCKET_OD` in den Core

Die Muffenaußendurchmesser standen in `_union/params.js`. Die dritte
Familie brauchte dieselbe Reihe (Fall 19). Umgezogen nach
`core/geometry.js` neben `fusionDepth`; `_union/params.js` reicht sie
durch.

**Neutralität bewiesen** — alle acht betroffenen Module Zahl für Zahl
unverändert:

| Modul | Dreiecke | Abweichung |
|---|---|---|
| `pp-r-ball-valve-ball-in-pp` | 190.928 | 0,16 mm |
| `metal-union-female-thread` | 48.328 | 0,18 mm |
| `metal-union-male-thread` | 57.928 | 0,20 mm |
| `union` | 31.408 | 0,00 mm |
| `pp-r-ball-valve-brass` | 52.316 | 0,01 mm |
| … | | |

## 9 Ein offener Punkt: ein Schweißwerkzeug fehlt

Seite 115 führt neun Schweißwerkzeuge für Anbohrsättel. Über die
AQ130S-Tabelle allein passen sie **lückenlos** auf die neun
(d, d₂)-Paare. Nimmt man die Gewindesättel hinzu, entsteht ein zehntes:
`AQ270S406334` und `AQ243S406334` führen (40–63, `d₂` = 32). Für den
Bereich 40–63 gibt es auf S. 115 aber nur `AQ98504006325`, also
40–63 × 25.

**Und die Geometrie zeigt dieselbe Auffälligkeit unabhängig:** genau
diese beiden Artikel fallen mit einem Sitzverhältnis von 1,49 aus der
Reihe, während alle übrigen 17 zwischen 1,91 und 7,58 liegen. Ein
32-mm-Loch in einem 40er Rohr braucht eine Schürze, die im Verhältnis zum
Sitz auffällig breit ist.

Zwei voneinander unabhängige Wege, dieselbe Zeile. **Nicht aufgelöst** —
entweder ist die Werkzeugliste unvollständig, oder diese Größe wird
anders gefügt.

## 10 Vier Prüffragen

**Trägt die Deutung über alle Zeilen?** Ja, und sie ist für `h` innerhalb
und über die Familien hinweg getrennt geprüft.

**Gibt die Gegenprobe einen anderen Wert?** Ja: `ueberstand` 0,00 gegen
14,40 bei gleichem `h`; `satteltiefe` gegen `scheitel`; `d₁` gegen
`durchgang`.

**Ist eine Messung auf sich selbst zurückgeworfen (Fall 12)?** Nein.

**Wurde die Seite geöffnet (Fall 38)?** Ja, alle drei, in Front- und
Schnittansicht.

## 11 Ergebnis

`ok: true`, 19 Größen, 10.944 bis 37.632 Dreiecke, größte Abweichung
0,14 mm. Selbsttest **47 von 47**, keine Auffälligkeiten.

Drei Ersatzzuordnungen entfallen: die Sättel zeigten die Muffe bzw. die
Übergangsmuffe AG, also Teile ohne Sattelfläche.
