# Prüfbericht — Winkel 45°, Winkel 90°, T-Stück

Die Bewährungsprobe für `sweepPath` und `branchJoin`. Beide waren seit dem
Core-Refactor implementiert, aber von keinem Produkt benutzt.

Stand 17. August 2026.

---

## Ergebnis

| Produkt | Größen | Referenz | Dreiecke | max. Abweichung |
|---|---|---|---|---|
| Winkel 45° (`fittings/elbow-45`) | 10, d20–d125 | d32 | 10 416 | 0,00 mm |
| Winkel 90° (`fittings/elbow-90`) | 10, d20–d125 | d32 | 10 416 | 0,00 mm |
| T-Stück (`fittings/tee`) | 10, d20–d125 | d32 | 27 680 | 0,01 mm |

Die 0,01 mm beim T-Stück sind die Segmentierung des Außendurchmessers
(43,99 gegen 44,00 bei 96 Umfangssegmenten) — die Sekante einer 96-Ecks
liegt geringfügig innerhalb des Kreises.

---

## Phase 1 — Daten

Quellen: `quellen/fg-elbow-45-p*.jpg`, `fg-elbow-90-p*.jpg`, `fg-tee-p*.jpg`.
Alle drei Tabellen laufen über den Seitenumbruch, Seite 1 endet bei d75.

**Je 10 Größen, d20 bis d125.**

| Produkt | Spalten |
|---|---|
| Winkel 45° | Code · d · D · **l** · z · s · kg · Pack. |
| Winkel 90° | Code · d · D · **L** · z · s · kg · Pack. |
| T-Stück | Code · d · D · l · L · l1 · z · s · kg · Pack. |

Die Spalte `s` ist bei allen drei in **jeder** Zeile ein Gedankenstrich. Sie
gilt für die Stumpfschweißvarianten und ist hier durchgehend leer — nicht
übernommen, nicht interpretiert.

Winkel 45° und 90° benennen dasselbe Maß verschieden (`l` gegen `L`):
Achsenschnittstelle bis Stirnfläche. In `data.js` heißt es einheitlich `leg`,
damit beide dieselbe Parametrik benutzen; die Tabellenbezeichnung steht in
`DIMENSION_KEY`.

### Transkriptionsprobe T-Stück

`L` muss `2·l` ergeben. Trifft bei d125 exakt (250 = 2·125), weicht bei d20 um
1 mm ab (55 gegen 54). Herstellerrundung, kein Ablesefehler. Maßgeblich ist
`L`; die Hälfte wird daraus gerechnet, damit das Modell symmetrisch bleibt.

---

## Der wichtigste Befund: die Muffentiefe kommt nicht aus `z`

Bei der Muffe hatte ich die Tiefe aus `(l − z)/2` gerechnet, und das traf die
Normreihe DVS 2207-11 bei d20 bis d63 **auf die Zehntelstelle**. Naheliegend
war, bei Winkel und T-Stück dasselbe zu tun — `leg − z`.

Das ergibt aber Streuung:

| | Tabelle | Norm | Δ |
|---|---|---|---|
| T-Stück d25 | 19,0 | 16,0 | **+3,0** |
| T-Stück d32 | 21,0 | 18,0 | **+3,0** |
| T-Stück d110 | 38,0 | 41,0 | **−3,0** |
| Winkel 90° d20 | 13,0 | 14,5 | −1,5 |
| Winkel 45° d32 | 19,0 | 18,0 | +1,0 |

**Der physikalische Einwand entscheidet:** die Muffentiefe ist durch das
Schweißwerkzeug festgelegt — ein Werkzeug je Nennweite, für alle Fittings
dieser Nennweite. Sie *kann* bei Muffe, Winkel und T-Stück derselben Größe
nicht abweichen. Ein d32-Rohrende passt entweder in alle drei oder in keines.

Bei Winkel und T-Stück bezeichnet `z` also nicht dasselbe wie bei der Muffe.
Dort ist es nachweislich die Dicke des mittleren Anschlags; hier ein Einbaumaß
mit anderem Bezugspunkt.

**Modelliert wird deshalb die Normreihe** (`fusionDepth()` aus dem Core).
`leg − z` läuft als `P.socketFromTable` mit, die Differenz als
`P.depthDeltaToNorm`. Beim Hersteller zu klären, was `z` bei diesen drei
Produkten genau bezeichnet.

---

## Was die Bewährungsprobe im Core gefunden hat

### `sweepPath` konnte keinen veränderlichen Querschnitt

Ein Winkel braucht an den Stirnflächen die Muffenbohrung und in der Mitte die
engere Rohrbohrung. `sweepPath` nahm einen festen Querschnitt für die ganze
Bahn — damit ist eine Muffe ohne CSG nicht darstellbar.

**Erweitert:** `loop` darf jetzt eine Funktion `(t, i, station) => Punktliste`
sein; `t` läuft über die **Bogenlänge**, nicht über den Index, sonst wandert die
Muffentiefe mit der Segmentdichte. Rückwärtskompatibel — eine Punktliste
funktioniert weiter. Die Funktion prüft, dass alle Querschnitte gleich viele
Punkte haben, und bricht sonst mit Klartext ab.

Damit ist der Winkel **ein** Loft: Außenhaut konstant, Innenhaut veränderlich,
plus zwei Ringflächen. Kein CSG.

### `bendPath` fehlte ganz

`arcPath` liefert nur den Bogen. Eine Winkelbahn ist Gerade–Bogen–Gerade.
Ergänzt, mit dem Wächter, der abbricht, wenn der Bogenradius mehr Schenkel
verbraucht (`R·tan(α/2)`) als vorhanden ist.

### Zwei Fehler in `bendPath`, beide vom Maßtest gefunden

| Fund | Ursache | Wirkung |
|---|---|---|
| 45°-Winkel 7,06 mm zu lang | Die Austrittsrichtung war als `(−cos α, sin α)` gerechnet statt `(cos α, sin α)` | Bei 90° unsichtbar, weil `cos 90° = 0`. **Erst der 45°-Winkel hat den Fehler aufgedeckt.** |
| 90°-Winkel 4,78 mm zu lang, Bauraum um 44 mm nach unten verschoben | Der Bogenmittelpunkt trug ein falsches Vorzeichen und lag auf der Außenseite der Ecke | Der Bogen krümmte sich verkehrt herum |
| Tangentenrichtung grenzwertig | Das Vorzeichen der Drehrichtung wurde je Punkt aus dem Skalarprodukt mit einer festen Referenz bestimmt — bei genau 90° ist das null | Jetzt einmal aus dem Kreuzprodukt bestimmt und konsistent angewandt |

Der erste ist der lehrreiche: ein Vorzeichenfehler, den der 90°-Fall
arithmetisch verdeckt. Wäre nur der 90°-Winkel gebaut worden, hätte er
unentdeckt im Core gelegen und jeden künftigen Bogen (#56 Überbogen, #6) still
falsch gemacht.

### Ein Fehler in meiner eigenen Prüfung

Die Messung `tiefe` verglich Norm gegen Tabellenwert — zwei Quellen, nicht Soll
gegen gebaute Geometrie. Der Selbsttest hat sie zu Recht als 3-mm-Abweichung
gemeldet. Ein Maßtest prüft Maßhaltigkeit; Quellenkonsistenz gehört in den
Bericht. Umgebaut.

### `branchJoin` hat gehalten

Ohne Änderung. Die Kehle sitzt tangential an Abzweig und Durchgang, und
`insertDepth` liefert brauchbar, wie weit der Abzweigstutzen eintauchen muss.

---

## Bekannte Grenze des T-Stücks

An der Durchdringung von Durchgang und Abzweig **überlappen die Innenflächen**.
Von außen unsichtbar; im Halbschnitt sieht man an der Kehle zwei Flächen statt
einer.

Das ist der Preis dafür, ohne CSG zu arbeiten: eine boolesche Vereinigung wäre
die einzige saubere Lösung und ist im Auftrag ausgeschlossen. **Alle Maße sind
davon unberührt** — die Überlappung liegt im Materialinneren.

Steht als Kommentar im Kopf von `products/_tee/parts.js`, damit sie nicht als
Versehen gelesen wird.

---

## Annahmen

| Annahme | Wert | Begründung | Zu verifizieren |
|---|---|---|---|
| Bogenradius Winkel | `0,5·d`, begrenzt durch den Schenkel | Die Tabelle führt keinen. 0,5·d ist der Wert, bei dem die Außenkontur im Katalogfoto sichtbar rund über die Ecke läuft, ohne dass der Bogen in die Muffe reicht | Zeichnung |
| Kehlradius T-Stück | `0,18·d`, min. 1,5 mm | Kehle läuft rund aus, ohne die Abzweigmuffe zu verkürzen | Zeichnung |
| Bedeutung von `z` | Einbaumaß, nicht Anschlagdicke | Siehe oben — der Werkzeugeinwand | Hersteller |

---

## Abgabe

| | |
|---|---|
| `products/_bend/`, `products/_tee/` — Familienmodule | ✅ |
| `products/elbow-45/`, `elbow-90/`, `tee/` | ✅ |
| `dist/kaqua-elbow-45.html`, `-90`, `kaqua-tee.html` | ✅ |
| `core/geometry.js` — `sweepPath` erweitert, `bendPath` neu | ✅ |
| Maßtest über alle 30 Artikelzeilen | ✅ 0,01 mm |
| Vergleichstest gegen Katalogfoto | offen |
| Korrigierte Produkt-Markdowns | offen — die Quelldateien fehlen im angebundenen Ordner |
