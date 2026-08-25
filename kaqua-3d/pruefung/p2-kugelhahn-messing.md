# Prüfbericht — Kugelhahn PP-R, Kugel Messing verchromt (AQ850)

**Gebaut am 24.08.2026 · Phase 2 · 42 von 71**

Quelle: Druckkatalog `KA-Katalog_GB_06-2025_NEU.pdf`, Seite 107, obere
Tabelle. Acht Größen, d20 bis d90.

---

## 1 Die Tabelle bemaßt mehr als beim Zwilling

`d · A · C · H · L · P` — sechs Spalten, und zwei davon nehmen dem Modell
Annahmen ab, die der PP-Kugelhahn noch schätzen musste:

**`C` ist die Muffentiefe**, und das ist keine Deutung, sondern gemessen:
die Spalte deckt sich in sieben von acht Zeilen auf den Zehntel mit der
`FUSION_DEPTH`-Tabelle im Core, die aus ganz anderer Quelle stammt
(DVS 2207-11).

| d | 20 | 25 | 32 | 40 | 50 | 63 | 75 | 90 |
|---|---|---|---|---|---|---|---|---|
| C (Katalog) | 14,5 | 16,0 | 18,0 | 20,5 | 23,5 | 27,5 | 31,0 | **35,5** |
| Core | 14,5 | 16,0 | 18,0 | 20,5 | 23,5 | 27,5 | 31,0 | **35,0** |

Zwei unabhängige Quellen, die über acht Zeilen so zusammenfallen,
bestätigen sich gegenseitig. Das Modell nimmt trotzdem den
Tabellenwert — für dieses Produkt ist die Tabelle Rang 1.

**`P` ist der Durchgang** und steht in der Tabelle. Beim PP-Kugelhahn
musste er mit 0,667·d angenommen werden.

**Gegenprobe der Lesart:** auf derselben Seite steht darunter der
Kugelhahn mit PP-Kugel (AQ852), seit Phase 1 gebaut — damals aus einem
Website-Screenshot. Katalog und gebautes Produkt stimmen in allen sechs
Zeilen und allen acht Spalten überein. Nebenbei bestätigt das den alten
Befund, dass die Markdown-Datei mit AQ50020–AQ50063 falsch war.

## 2 Was die Tabelle nicht nennt — und wie es trotzdem belegt ist

Der Außendurchmesser des Korpus fehlt. Er kommt aus der
Schnittzeichnung — aber erst, **nachdem feststand, welche Größe dort
gezeichnet ist** (Fall 35):

> Zeichnung: A/H = 235 px / 215 px = 1,09.
> Tabelle: d20 → 1,125 · d25 → 1,175 · d32 → 1,26 · … · d90 → 1,30.

Gezeichnet ist d20, und nur dort dürfen Verhältnisse abgegriffen werden.
Daraus:

| Größe | aus der Zeichnung | angesetzt |
|---|---|---|
| Korpus-Ø | 158 px = 0,672·A | **0,67·A** |
| Stirnfläche | 102 px = 1,465·d | siehe unten |
| Kugel-Ø | 78 px = 1,49·P | **1,49·P** |
| Domoberkante | 34,5 mm bei H = 60 | **0,575·H** |

**Über welche Größe skaliert wird, ist die eigentliche Entscheidung.**
Der Hahn ist nicht selbstähnlich: A/d fällt von 3,38 bei d20 auf 1,92 bei
d90. Deshalb skaliert der Korpus über A und die Kugel über den
DURCHGANG — über A gerechnet käme bei d90 eine Kugel von 57 mm heraus,
die ihren eigenen Durchgang von 65 mm nicht fassen kann.

Der Muffenstutzen ist nicht mit 1,465·d hochgezogen, sondern gegen die
**Muffentabelle des Katalogs** (AQ270xx, Spalte D) gefittet:
`d + 2·max(4,5; 0,165·d)` trifft deren 29/35/44/52/65/84/99/120 über alle
acht Zeilen auf 1,5 mm.

## 3 Drei Fehler, die das Modell hatte

### 3.1 Der Innenverlauf hatte eine Stufe zu wenig

Der erste Entwurf führte die Korpusbohrung durchgehend auf Sitzmaß. Bei
d20 wurde sie damit **weiter als die Muffenbohrung** — 10,2 gegen 10,0 —
und dem Rohr fehlte der Anschlag. Die Muffentiefe las sich als 1,22 statt
14,5 mm, weil der Strahl gar keine Schulter mehr fand.

Richtig sind drei Stufen: Muffe Ø d → Kanal auf Durchgangsmaß →
Sitzaufnahme → Kammer. Vier Wächter halten das jetzt fest, darunter
einer, der prüft, dass der Kanal der Muffe überhaupt eine Schulter lässt.

### 3.2 Ein NaN hat die Seite geleert, während alle Maße grün blieben

`P.oringY` wurde aus `P.domeTop` gerechnet — in einer Zeile, die **vor**
der Zuweisung von `domeTop` stand. Ergebnis: zwei O-Ringe aus lauter NaN.

Ein einziges NaN macht die Bounding-Box der ganzen Baugruppe ungültig,
die Kamera bekommt keinen Rahmen, und die Ansicht bleibt **weiß**. Dabei
meldeten alle acht Maße weiter 0,00 mm — keines von ihnen fasst die
O-Ringe an.

Aufgefallen ist das ausschließlich am Blick auf die Seite (Fall 38).

**Daraus ist eine Core-Prüfung geworden.** `createAssembly.part()` läuft
jetzt bei jedem Teil einmal über die Positionen und wirft mit Namen:

```
K-Aqua: Teil "oringU" hat einen ungültigen Punkt an Stelle 3
(NaN). Ein einziges NaN leert die ganze Ansicht, ohne dass ein
Maß es merkt.
```

**Nachgewiesen, nicht behauptet:** der Fehler wurde absichtlich noch
einmal hergestellt, das Produkt neu gebaut und die Seite geladen. Statt
einer weißen Fläche steht seither die Meldung oben. Danach zurückgebaut.

### 3.3 Die Hebelnabe verdeckte den Dom

Sie war bis zur Unterkante des **waagerechten** Bügelteils hochgezogen —
ein 23 mm hoher Stahlzylinder. Der Bügel steigt aber von der Nabe aus
erst an; sie muss nur seine Wurzel fassen. Jetzt endet sie dort.

Nebenbei: die dünne graue Linie rechts unten im Bild ist kein Bauteil,
sondern der **Schlagschatten des Hebels**. Geprüft, indem der Hebel
ausgeblendet wurde — die Linie verschwand mit ihm.

## 4 Der Umzug in die Familie

Kugel, Sitze, Spindel und O-Ring standen in `ball-valve-pp/parts.js`.
Innen ist dieser Hahn dasselbe Gerät, außen ein völlig anderes. Die vier
Funktionen sind unverändert nach `_ballvalve/parts.js` gezogen; Korpus,
Überwurfmuttern, Anschlussstutzen und Kunststoffhebel bleiben beim
PP-Hahn, denn sie beschreiben SEINE Bauart.

**Neutralität bewiesen**, nicht angenommen: die Zahlen des PP-Kugelhahns
vor und nach dem Umzug, aus der ausgelieferten Seite abgelesen.

| d | 20 | 25 | 32 | 40 | 50 | 63 |
|---|---|---|---|---|---|---|
| Dreiecke vorher | 190.280 | 190.604 | 190.928 | 191.252 | 191.576 | 191.900 |
| Dreiecke nachher | 190.280 | 190.604 | 190.928 | 191.252 | 191.576 | 191.900 |

Netzzahl 12 wie vorher, Abweichungen identisch (0,16 mm bei D, sonst
0,00). Dasselbe gilt nach dem Einbau des Core-Wächters.

## 5 Maßtest, alle acht Größen

```
 d     A     H     L     C     d     P    Kugel
20   0,00  0,00  0,00  0,00  +0,01  0,00  0,00
25   0,00  0,00  0,00  0,00  +0,01  0,00  0,00
32   0,00  0,00  0,00  0,00  +0,01  0,00  0,00
40   0,00  0,00  0,00  0,00  +0,01  0,00  0,00
50   0,00  0,00  0,00  0,00  +0,01  0,00  0,00
63   0,00  0,00  0,00  0,00  +0,01  0,00  0,00
75   0,00  0,00  0,00  0,00  +0,01  0,00  0,00
90   0,00  0,00  0,00  0,00  +0,01  0,00  0,00
```

Alle sechs Tabellenmaße treffen. `d` liegt um 0,01 mm über Maß — das
Fillet an der Nennebene, wie bei der Übergangsmuffe.

**Der Durchgang wird eingeschachtelt gemessen**, nicht abgelesen: der
größte Radius, bei dem ein achsparalleler Strahl die Kugel noch nicht
trifft, ist ihr Bohrungsradius. Sechzehn Halbierungsschritte.
Abgesichert dagegen, dass ein fehlender Prüfling stumm den Kugelradius
liefert — ein Messmittel, das ohne Prüfling eine Zahl ausgibt, ist
schlimmer als keins.

**Gegenprobe (Fall 25):** derselbe Prüfling, andere Größe — der
Kugeldurchmesser. Er MUSS deutlich über dem Durchgang liegen, sonst gäbe
es keine Kugel, sondern ein Rohr. Bei d20 stehen 22,4 gegen 15,0.

## 6 Vier Prüffragen

**Trägt die Deutung über alle Zeilen?** Ja, alle sechs Spalten. `C`
zusätzlich gegen eine fremde Quelle geprüft.

**Gibt die Gegenprobe einen anderen Wert?** Ja — Kugel gegen Durchgang,
in allen acht Größen verschieden.

**Ist eine Messung auf sich selbst zurückgeworfen (Fall 12)?** Nein.
Alle sieben Sollwerte kommen aus der Katalogtabelle.

**Wurde die Seite geöffnet (Fall 38)?** Ja — und genau das hat den
NaN-Fehler gefunden, den kein Maß sah. Schnittansicht bei d32 geprüft:
Kugel mit Bohrung zwischen zwei PTFE-Sitzen, Spindel im Dom, Kanal und
Muffenschulter sichtbar.

## 7 Ergebnis

`ok: true`, acht Größen, 52.316 Dreiecke, größte Abweichung **0,01 mm** —
der niedrigste Wert im ganzen Katalog. Selbsttest **42 von 42**, keine
Auffälligkeiten.

Zwei Ersatzzuordnungen entfallen: `lib/3d/aliases.ts` und die API-Route
zeigten beide auf den Kugelhahn mit PP-Kugel, also auf ein anderes Gerät.
