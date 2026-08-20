# Prüfbericht — Verschraubung (Union)

Produkt-ID `transition-fittings/union` · Stand 19. August 2026

---

## Ergebnis

| Größen | Referenz | Dreiecke | Meshes | max. Abweichung |
|---|---|---|---|---|
| 6, d20–d63 | d32 | 31 408 | 3 | **0,00 mm** |

Selbsttest über alle 27 Produkte: **27/27 geladen, größte Abweichung
0,18 mm**, 587 720 Dreiecke, keine Auffälligkeiten.

---

## Phase 1 — die Tabelle bestätigt sich selbst

Quelle `quellen/w3-union.png`. Spalten
`Code · d · G · D · l · L · z · l1 · kg · Pack.` — sieben Maße je Zeile,
sechs Größen.

**Die entscheidende Gegenprobe:** die Spalte `D` lautet
46 · 56 · 66 · 79 · 87 · 107. Das sind **exakt** die `D`-Werte des
Kugelhahns bei denselben Nennweiten. Diese Verschraubung ist damit dasselbe
Bauteil, das der Kugelhahn beidseitig trägt — hier als Einzelartikel.

Das ist mehr als eine Kuriosität. Es bestätigt beide Tabellen gegenseitig und
legt die Überwurfmutter-Geometrie fest, ohne dass sie geschätzt werden muss.
Bisher war der Kugelhahn die einzige Quelle für dieses Maß.

Weitere Gegenproben:

| Prüfung | Ergebnis |
|---|---|
| `z < L` | in jeder Zeile ✓ |
| `D`, `G` monoton | ✓ |

## Eine falsche Deutung, vom Prüfer entlarvt

Die erste Fassung dieses Berichts nannte die Differenz zwischen `l + l1` und
`L` eine „Überlappung im Gewinde — beide Teile greifen ineinander". **Das war
falsch, und die Zahlen sagen es deutlich:**

| | l + l1 | L | Differenz |
|---|---|---|---|
| d20 | 44 | 44 | 0 |
| d25 | 47 | 48 | **1 mm fehlt** |
| d32 | 51 | 52 | 1 mm |
| d40 | 57 | 58 | 1 mm |
| d50 | 65 | 66 | 1 mm |
| d63 | 77 | 79 | 2 mm |

`l + l1` ist **nie größer** als `L`. Es überlappt nichts, es fehlt ein Stück.
Mein `Math.max(0, l + l1 − L)` ergab deshalb immer 0, und `buildTail` füllte
die Lücke mit Stutzenmaterial auf: **l1 wurde 31 statt 30 mm.**

Die Geometrie widersprach damit der eigenen Dokumentation — Mutter endete bei
x = −5, Stutzen begann bei x = −5, Überlappung 0,00 mm.

**Neue Deutung:** die Differenz ist der freiliegende Ring des Stutzenbundes
zwischen Mutterkante und Stutzenschulter. An einer angezogenen Verschraubung
ist er genau dort zu sehen. Er wird als `P.collarGap` modelliert **und
gemessen** (Prüfwert `ring`: 1 mm bei d32, 2 mm bei d63).

**Warum der Maßtest das nicht fand:** er prüfte `L`, `D`, `l`, den
O-Ring-Versatz und die Mutterwand — **`l1` prüfte er nicht.** Ein
tabelliertes Maß, das die Geometrie bestimmt, war ungemessen. Genau die Lücke,
die Gruppe C des Fehlerkatalogs beschreibt.

Nachgerüstet: `l1` und `ring`. Maßtest jetzt über sieben Größen je Zeile,
0,00 mm.

## Die Spalte z wird nicht modelliert

`z` lautet 15 · 15 · 15 · 17 · 19 · 23. Bei der Muffe ist `z` nachweislich
die Anschlagdicke; hier gibt es keinen Anschlag, und kein Verhältnis zu `L`,
`l` oder `l1` ist erkennbar:

    z/L   0,34 · 0,31 · 0,29 · 0,29 · 0,29 · 0,29
    z/d   0,75 · 0,60 · 0,47 · 0,43 · 0,38 · 0,37
    L−z   29 · 33 · 37 · 41 · 47 · 56
    l1−z  11 · 13 · 15 · 17 · 20 · 24

`L − z` wächst gleichmäßig, aber ohne erkennbaren Bezug zu einer
Baugruppenkante. Ohne technische Zeichnung ist `z` nicht auflösbar — es wird
deshalb nicht modelliert und erscheint nur in aria-label und
Fallback-Tabelle. Der Vermerk steht in `data.js`; ein geratener Bezugspunkt
wäre schlechter als eine benannte Lücke.

---

## Ein Messfehler, den die Größenreihe entlarvt hat

Der erste Maßtest meldete `D` um 0,35 bis 0,46 mm zu klein — bei d32 0,35, bei
d63 0,46.

**Die Abweichung wuchs mit dem Durchmesser.** Nach Fall 23 des
Fehlerkatalogs ist das das Ausschlusskriterium für eine Fase: eine Fase
verschiebt ein Maß um einen *konstanten* Betrag. Eine mit der Größe wachsende
Abweichung hat eine andere Ursache.

Hier war es die **Sekante der Riffelabtastung**. `thetaSamples` verteilt seine
Winkelschritte ungleichmäßig — dicht an den Nutflanken, weit auf den Rücken.
Liegt kein Schritt genau auf einem Rückenscheitel, misst eine `Box3` die
Sekante zwischen zwei Schritten. Relativ zum Radius war der Fehler konstant
(1,06 % bei d32, 0,86 % bei d63), absolut nicht.

Behoben durch einen Strahl auf einen Rückenscheitel: `grooveMod` legt die
Nuten auf `theta = i·2π/count`, die Rücken liegen genau dazwischen bei
`theta = π/count`.

Auf dem Weg dahin ein zweiter Fehler in derselben Messung: Startpunkt und
Richtung lagen in verschiedenen Ebenen (`V3(-cos, -sin, 0)` statt
`V3(0, -cos, -sin)`). Der Strahl traf nichts, die Messung gab `NaN` — der
Maßtest meldete `maxDiff: null`. **Ein `NaN` in einer Messung ist kein
Bestehen**, sondern ein Ausfall der Prüfung; der Prüfkatalog verlangt deshalb,
`isFinite` mitzuprüfen.

---

## Was nicht modelliert ist, und warum

**Das Gewinde zwischen Mutter und Stutzen.** Es liegt vollständig verdeckt
zwischen den beiden Teilen — auch im Halbschnitt sieht man dort nur die
Fügefläche, weil die Mutter darüber steht. Ein Gewinde, das niemand sehen
kann, kostet Dreiecke ohne Gegenwert.

Die Muffe im Stutzen ist dagegen sichtbar und trägt Konus, Einführfase und
Schweißtiefe wie jedes andere Muffenprodukt.

---

## Bekannte Durchdringung am O-Ring

Der O-Ring reicht mit r = 18,01 mm um 0,43 mm unter den Nutgrund (18,44 mm)
und links 0,2 mm über den Nutanfang hinaus.

**Das ist Absicht, kein Fehler.** Ein O-Ring wird beim Anziehen verpresst; ein
Ring, der spaltfrei in seiner Nut liegt, dichtet nicht. Die Durchdringung
zeigt die Verpressung — sie ist im Halbschnitt sichtbar und soll dort auch
sichtbar sein.

Vermerkt, damit sie nicht später als Modellfehler gelesen wird.

## Annahmen

| Annahme | Wert | Begründung | Zu verifizieren gegen |
|---|---|---|---|
| Muffentiefe | Normreihe DVS 2207-11 | ein Schweißwerkzeug je Nennweite für alle Fittings — Begründung in `products/tee/data.js` | Zeichnung |
| Stutzendurchmesser | 0,80 · D | dieses Verhältnis ergibt beim Kugelhahn die im Foto sichtbare Abstufung | Zeichnung |
| O-Ring-Schnurstärke | 0,055 · d | Größenordnung wie beim Kugelhahn | Originalteil |
| Riffelzahl 12 | — | im Katalogfoto des Kugelhahns abgezählt | Originalteil |

---

## Abgabe

| | |
|---|---|
| `products/union/` — data · params · parts · index | ✅ |
| `dist/kaqua-union.html` | ✅ |
| Registry 27/71, Bibliothek 27 Module | ✅ |
| Selbsttest 27/27, 0,18 mm | ✅ |
| Vergleichstest gegen Katalogfoto | offen |

**Vorlage für die Metallverschraubungen.** Vier weitere Produkte teilen diese
Baugruppe (`metal-union-*`), führen aber zusätzlich `SW` und `SW1` — zwei
Schlüsselweiten, also einen Sechskant an Mutter **und** Stutzen. Ihre
Tabellen sind gelesen und liegen in `quellen/w3-metal-union-fem.png`.
