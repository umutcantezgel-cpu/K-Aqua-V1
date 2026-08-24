# Prüfbericht — Welle 4.5/4.6, Anschlussbogen und Wandscheibe 90° IG

**Produkte** `transition-fittings/elbow-bracket-90-female-thread` (AQ090G)
und `transition-fittings/elbow-wall-bracket-90-female-thread` (AQ472G)
**Datum** 24.08.2026 · **Ergebnis** beide gebaut, Maßtest grün, ein Punkt offen

---

## 1 · Quellen

Erstmals lagen **zwei unabhängige Rang-1-Quellen** vor:

| Quelle | Inhalt |
|---|---|
| `Marketing/Print/KA-Katalog_GB_06-2025_NEU.pdf` S. 95 | beide Tabellen, Maßzeichnung |
| `K-Aqua Unterseitem Kopie/…-elbow-bracket-…png` und `…-elbowwall-bracket-…png` | dieselben Tabellen |

**Sie stimmen Zeile für Zeile und Spalte für Spalte überein** — alle fünf
Zeilen beider Produkte, alle zwölf Spalten. Kein Quellwiderspruch.

Das ist gleichzeitig die Gegenprobe auf ein Leseproblem: die Textebene des
Katalog-PDF läuft **nicht in Leserichtung**. Bei AQ472G stehen dort erst
beide Überschriften, dann die Codes, dann Spalte für Spalte die Werte. Die
Zusammensetzung nach Spaltenposition wurde gegen die Website-Aufnahme
geprüft und stimmt. Ohne diese Gegenprobe wäre die Zeilenzuordnung geraten
(Fall 28).

Die Markdown-Datei führt für AQ472G **4** Größen, beide Quellen **5**.
Wieder Fall 1: `sizes_md` ist eine untere Schranke.

## 2 · Was die Tabellen tragen — und was nicht

Spaltenköpfe beider Tabellen: `Code d Rp D L z h D₁ L₁ z₁ kg Pack.`

**Gedeutet und über alle Zeilen gegengerechnet:**

- **D₁ hängt allein an d** (20→29, 25→34, 32→43, ausnahmslos),
  **D wächst mit dem Gewinde** (d25×½"→35 gegen d25×¾"→43). Ein
  vertauschtes Paar zerrisse diese Abhängigkeit. Damit steht fest: D
  gehört zum Gewindeschenkel, D₁ zum Muffenschenkel — wie es die
  Maßzeichnung anordnet.
- **L − z ist die Höhe des Messingrings.** Dieselbe Rolle, die beim
  T-Stück IG `h − z₁` spielt. AQ090G: 14 · 14 · **11** · 15 · 17;
  AQ472G: 14 · 14 · 15 · 15 · 15.
  Die **11 mm bei AQ090G2534** fallen aus der Reihe — ½" bekommt dort 14.
  **Kein Lesefehler:** beide Rang-1-Quellen führen den Wert. Das Modell
  folgt der Tabelle (Fall 31). Am Originalteil zu prüfen.
- **L₁ − z₁** gegen DVS 2207-11: AQ472G trifft die Reihe in vier von fünf
  Zeilen auf 0…1,5 mm, AQ090G streut mehr (13 bis 22,5 gegen Norm 16/18).
  Modelliert wird die Norm; der Tabellenwert steht als `socketFromTable`.

**NICHT gedeutet — und das ist ein Befund, kein Versäumnis:**

**Die Spalte `h`.** Die naheliegende Deutung „Achse bis Unterkante" wurde am
gebauten Modell geprüft und ist **widerlegt**:

| | d20×½" | d25×½" | d25×¾" | d32×½" | d32×1" |
|---|---|---|---|---|---|
| Modell, Unterkante | 14,5 | 17,0 | 17,0 | 21,5 | 21,5 |
| Tabelle `h` | 13 | 15 | 20 | 18 | 20 |

Das Modell liegt in jeder Größe bei genau **D₁/2** — und tiefer als der
Radius des Muffenschenkels kann die Unterkante eines Winkels nicht
rutschen. Vier der fünf Tabellenwerte liegen darunter. `h` bezeichnet also
etwas anderes; was, ist offen und steht in `LOOP-STATUS.md`.

**Ein Teil von h ist trotzdem verwertbar, und zwar der entscheidende:**
`h` ist bei AQ472G in **jeder** vergleichbaren Zeile genau **2 mm** größer
als bei AQ090G (15/17/22/22 gegen 13/15/20/20). Der Körper ist derselbe —
also sind diese 2 mm, was die Lasche unter ihm hervorsteht. Eine
**Differenz** ist auch dann verwertbar, wenn der Bezugspunkt unbekannt
ist: sie hebt ihn heraus.

## 3 · Gestalt

Beide Produkte teilen den Körper: 90°-Winkel mit ungleichen Schenkeln,
Muffe auf −X, Gewinde auf +Y. Er kommt aus `products/_bendthread/parts.js`
— derselbe, den der Winkel mit Außengewinde trägt.

**Der Messingring** sitzt bündig, rund, ohne Sechskant. Beleg: die Tabelle
führt **keine Spalte SW**, und das Katalogfoto (S. 95) wie das
Produktfoto `AQ090GP` zeigen einen runden, bündigen Ring.

**Widerspruch, dokumentiert statt aufgelöst:** Der ALH-Render
`AQ090G2012` zeigt denselben Artikel mit **sechskantigem** Kragen — die
Prägung „Ø20x½"" belegt, dass es dieselbe Zeile ist. Dazu passt, dass die
Produktfotos eine zweite Ausführung mit vorstehender
Messing-Sechskantmutter belegen (`AQ0906GP` gegen `AQ090GP`), die der
Katalog nicht führt. Zwei Bilder derselben Familie, die sich
widersprechen: **keines gewinnt** (25-BILDQUELLEN.md §1.4). Gebaut ist die
Fassung, die die Tabelle trägt.

**Die Lasche** steht in keiner Spalte. Belegt ist an ihr genau ein Maß —
die 2 mm aus §2. Umriss, Radius, Lochgröße und Lochlage sind am Foto
`AQ472G …png` abgegriffen, in Anteilen von D, und tragen ASSUMPTION.
**Nicht modelliert**, weil aus einem einzigen Blickwinkel nicht auflösbar:
die Einbuchtung an ihrer Oberkante, die wie eine zweite, offene
Befestigung aussieht.

## 4 · Maßtest, alle zehn Größen

Beide Produkte, je fünf Größen, **größte Abweichung 0,03 mm**.
Kein einziger Wert über 0,1 mm.

Beispiel AQ090G2534 (d25×¾"):

| Maß | soll | ist | Δ |
|---|---|---|---|
| L₁ | 32 | 32 | 0 |
| L | 39 | 39 | 0 |
| D | 43 | 43 | 0 |
| D₁ | 34 | 34 | 0 |
| Symmetrie z | 0 | 0 | 0 |
| Muffenbohrung | 25 | 25,03 | 0,03 |
| Rohrbohrung | 16,67 | 16,67 | 0 |
| Ringsitz (mit 0,05 mm Spiel) | 31,3 | 31,3 | 0 |
| Ringhöhe (L − z) | 11 | 11 | 0 |
| Ringoberkante = Stirnfläche | 39 | 39 | 0 |
| Unterkante | 17 | 17 | 0 |
| Restwand Muffe | 4,5 | 4,5 | 0 |
| Restwand über dem Ring | 5,9 | 5,9 | 0 |

Unterkanten der Wandscheibe: 16,5 · 19 · 19 · 23,5 · 23,5 — in jeder Größe
**D₁/2 + 2,0**, also genau die Lasche.

## 5 · Drei Messfehler, die der Maßtest selbst gefunden hat

**5.1 Die 90°-Gegenmessung an D₁ war falsch.** Sie las 70 statt 29 mm. Die
Zahl war nicht zufällig — sie war 2·L: in der gedrehten Ebene liegt die
Außenhaut des **Bogens**, und der reicht bis zur Oberkante des
Gewindeschenkels. Beim Winkel mit Außengewinde geht dieselbe Messung
durch, weil dort der Gewindeschenkel schlanker ist als der Bogen hoch.
Ersetzt durch eine Symmetrieprüfung, die der Bogen nicht verfälschen kann.

**5.2 Die Bohrungsprobe lag in der Muffe.** Sie las 23,96 statt 16,67 mm.
Die Station `−(bendR + 1,6)` stammt vom Winkel; hier ist das freie Fenster
zwischen Muffenende und Bogenanfang **0,5 mm breit** (d25×½"). Jetzt die
Fenstermitte, mit einer Ausnahme, falls das Fenster verschwindet.

**5.3 Der Ringsitz zeigte 0,1 mm Abweichung.** Das war das
Sitzspiel — 0,05 mm je Seite, damit nicht zwei Flächen aufeinanderliegen.
Es gehört in den **Sollwert**, nicht in die Abweichung: eine Abweichung,
die man erklärt statt sie zu messen, ist keine Prüfung (Fall 23).

## 6 · Die vier Prüffragen

1. **Misst die Messung?** Alle Maße kommen aus der Punktwolke oder der
   Bounding-Box. Ausnahmen sind nur `restwand` und `restwandB` —
   Wandstärken, nach Fall 12 zulässig und so benannt.
2. **Welchen Fehler findet keine Messung?** Den **Umriss der Lasche**. Ein
   Radialstrahl trifft eine runde Platte wie eine gewaistete. Deshalb ist
   sie als ASSUMPTION benannt und nicht als geprüft ausgegeben. Ebenso:
   die Messungen prüfen nicht, ob die Lasche den Körper **berührt** —
   das hat erst die Sichtprobe gezeigt (§7).
3. **Liefert die Gegenprobe einen anderen Wert?** Ja. `D` (43) gegen `D₁`
   (34) — dasselbe Merkmal an zwei Stellen. `Muffenbohrung` (25) gegen
   `Rohrbohrung` (16,67) gegen `Ringsitz` (31,3) — drei Bohrungen, drei
   Werte.
4. **Trägt die Tabelle die Deutung über alle Zeilen?** Ja für D/D₁ und für
   L − z. **Nein für h** — und genau das steht als Befund da, statt
   überspielt zu werden.

## 7 · Sichtprobe — sie hat gefunden, was kein Maß fand

Die erste Fassung der Lasche saß maßlich richtig (Unterkante 19,00 gegen
19,00) und **schwebte trotzdem frei neben dem Winkel**. Der Maßtest war
grün, weil er nur die Unterkante prüft, nicht die Verbindung. Erst der
Blick auf die gebaute Seite hat es gezeigt — Fall 38 in Reinform.

Behoben: Plattenmitte und -radius so gewählt, dass die Platte den Körper in
**jeder** Größe erreicht; eine Ausnahme wirft, falls sie es nicht tut.

## 8 · Nach dem Bau

`kaqua.ok = true` bei beiden · Anschlussbogen 46 736 Dreiecke / 2 Teile ·
Wandscheibe 52 880 Dreiecke / 3 Teile.

Selbsttest: **36 Module geladen, 36 in der Registry, größte Abweichung
0,20 mm, 1 055 964 Dreiecke, keine Auffälligkeiten.**

Galerie: Badge „36 von 71", 71 Kacheln, 36 mit Knopf, **alle Kacheln genau
eine Höhe** (Fall 33).

## 9 · Offen

- **Was bezeichnet `h`?** Siehe §2. Betrifft beide Produkte und
  möglicherweise weitere Tabellen dieser Familie.
- **Die 11 mm Ringhöhe bei AQ090G2534.** Von beiden Quellen bestätigt,
  aber gegen die eigene Reihe. Am Originalteil zu prüfen.
- **Der Sechskant im ALH-Render.** Siehe §3.
- **Die Einbuchtung an der Laschenoberkante.** Ein zweiter Blickwinkel
  oder eine Herstellerzeichnung würde sie lösen.
