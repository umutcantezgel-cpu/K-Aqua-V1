# BAUSTAND

Fortlaufender Stand der K-Aqua 3D-Produktion.

---

## STAND

```
Core ✓ · Produkte 28/71 (27 fertig, 1 prototyp) · Galerie ✓
Integrationsexport ✓ · Exportblatt ✓
alle 12 Rohre · Formteile: Kappe, Muffe, Winkel 45°/90°, T-Stück, Kreuz,
Reduzierbuchse · Armaturen: Kugelhahn
Selbsttest 20/20 · größte Abweichung 0,18 mm · 454 320 Dreiecke
```

## 5. September 2026 — Prägeschrift stillgelegt, und der Katalog steht wieder auf einem Stand

Mängel M31, Fehlerkatalog Fall 49.

**Der Befund kam von aussen:** über den Modellen liege ein Wasserzeichen
„MADE IN GERMANY", das katastrophal aussehe. Es stimmte, und die Ursache war
nicht die Textur, sondern ihre **Abbildung**.

`embossTexture()` rastert den Schriftzug in eine 1024 × 512-Normalmap,
zentriert auf (0,555 | 0,5), rund 600 × 46 px. In UV sind das
u ∈ [0,26 … 0,85] und v ∈ [0,455 … 0,545]. `revolve()` bildet aber u = θ/2π ab
und v als Bogenlänge des Profils. An der Muffe d32 wird die Zeile dadurch über
**212° Umfang** gezogen — rund 80 mm — und auf **9 % der Profillänge**
gestaucht, also 9 mm. Lesbar ist da nichts; sichtbar blieben Querstreifen, die
wie ein Renderfehler wirken. Am gebauten Modell gezählt: 37 der 70 Produkte
trugen sie aktiv, 14 hatten sie einzeln abgeschaltet, 19 haben gar keinen
PP-Körper.

Die Textur selbst war tadellos gebaut — Höhenfeld, Weichzeichnung,
Sobel-Normalmap, ClampToEdge, NoColorSpace. Geprüft wurde nur, ob sie
ENTSTEHT, nie, welche Strecke am Bauteil ein UV-Schritt bedeutet. Als
**Fall 49** aufgenommen, mit der Zweiteilung, die daraus folgt: isotrope
Schichten (Rauschen, Verschleiß) dürfen auf generischen UVs reiten; alles, was
FORM trägt, braucht eine eigene UV-Insel oder ein eigenes Mesh. Der Aufdruck
der Rohre macht es in derselben Datei richtig vor.

**Stillgelegt, nicht gelöscht.** Aus `opt.emboss !== false` wurde
`opt.emboss === true`: der Generator steht vollständig im Core, ruft sich aber
nicht mehr selbst auf. Der Kopfkommentar trägt jetzt die Bedingung für eine
Wiederbelebung, damit niemand die Marke blind wieder anschaltet. Die 14
`emboss: false`-Zeilen in den Produktpaketen sind entfallen — nach der
Umstellung waren sie wirkungslos und behaupteten das Gegenteil des Normalfalls.

Neue Prüfdatei `tests/unit/kaqua3d-oberflaeche.test.ts` mit vier Zusicherungen.
Die wichtigste ist der Wächter: kein Produkt trägt im Normalfall eine
`normalMap`. Die zweite deckt die stillgelegte Strecke ab — das war der Preis
dafür, sie zu behalten, und ohne Prüfung verrottet sie. Die dritte hält fest,
dass der Rohr-Aufdruck davon unberührt bleibt: eigenes Band, eigener Werkstoff,
und am realen PP-R-Rohr steht so eine Zeile tatsächlich.

**Nebenwirkung, erwünscht:** weil der Core in jede Einzelseite gebündelt ist,
brauchte die Änderung einen Vollbau. Damit ist der seit dem 26.08. offene
Rückstand abgeräumt — 69 Seiten standen noch auf dem alten PP-Grün `#17A46B`,
während Galerie und Rohrschellenseite bereits `#32A175` trugen. 86 Dateien
ausgeliefert, danach steht der ganze Katalog auf einem Stand.

461 Tests grün, Netz und Maße unverändert (3 658 426 Vertices).

---

## 2. September 2026 — Rohrschelle begutachtet: die Quelle lag im Repository

Prüfbericht: `pruefung/rohrschelle-instandsetzung.md`, Abschnitt 8. Mängel
M20–M30, Fehlerkatalog Fälle 46–48.

**Der Auslöser war kein Fehler, sondern eine Datei.**
`public/images/produkte/pipe-clamps/studio.jpg` ist dieselbe
Herstelleraufnahme wie das Marketing-PNG, nur mit 900 × 900 px statt einer
Briefmarke — und keine Sichtung hatte sie je angefasst. Drei Angaben, die
seit dem 25.08. im Modell, in `data.js` und im Mängelregister standen, sind
an ihr widerlegt: der Rücken ist **ballig**, nicht zylindrisch; er trägt
**zwei** Nuten, nicht drei; die schwarze Mutter ist ein **Sechskant**, kein
Vierkant. `25-BILDQUELLEN.md` trägt die Regel jetzt vorn: vor der Sichtung
nach ALLEN Kopien eines Bildes suchen, auch außerhalb von `Marketing/`.

Dazu kam aus derselben Aufnahme: Laschen mit rundem Paddelende, ein sichtbar
heraustretender Gewindeüberstand, Fasen an Bohrungskante und Schalenstirn —
und der Nachweis, dass das Foto **d75–d90** zeigt, nicht d32. Die Begründung
des Faktors `zScrew` in `params.js` war gegen die falsche Größe gerechnet
(Fall 35).

**Der Körper war offen.** `revolve` verbindet aufeinanderfolgende Winkel zu
Vierecken und schließt einen Teilbogen nicht: 136 Randkanten je Schale, 272
in der Baugruppe. Neben den Stegen sah man in die Schale hinein, und der
OBJ/GLB-Export lieferte eine Hülle statt eines Körpers.

Bemerkenswert ist, warum es keine der zehn Prüfungen fand. Die Stirnebenen
gehen durch die Rohrachse, also durch den Ursprung — für eine Fläche in einer
Ebene durch den Ursprung ist das Spatprodukt jedes Dreiecks null. Sie trägt
zum Volumenintegral **exakt 0** bei. Die Massenprobe stimmte weiter, auf zwei
Stellen genau, während der Körper offen war. **Fall 46**; das neue Maß
`dicht` zählt jetzt Randkanten, mit Gegenprobe.

**Das Netz war doppelt so teuer wie nötig.** `curveSegments: 20` gilt für
JEDE Kurve einer Shape, also auch für vier unsichtbare Eckenrundungen je
Blech: eine Lasche kostete 2364 Dreiecke gegen 252 mit Fasenecken. Dazu
Fillets auf den Stützstellen einer bereits glatten Kurve und ein Gewinde in
Sichtteil-Auflösung. Zusammen **22 340 statt 37 984 Dreiecke — bei mehr
Detail.** Das Teil war vorher das teuerste Zubehörteil des Katalogs; es liegt
jetzt zwischen `cap` und `socket`. **Fall 47.**

**Und eine Prüfung, die log.** Die erste Randkantenzählung baute ihren
Schlüssel aus `toFixed(3)` und meldete ausgerechnet bei d50 24 offene Kanten,
bei allen anderen null. Ursache: Stirnfläche und Bogenrand kamen über
verschiedene Rechenwege auf denselben Wert, dessen letzte Bits verschieden
lagen — und genau dort verlief eine Rundungsgrenze. Verlockend war die
Toleranz; richtig war, über den ABSTAND zu verschweißen. Ein fester Raster
hätte den Fehler nur zur nächsten Größe verschoben. **Fall 48.**

Die Schelle hat jetzt **sieben** Teile: die beiden Halbschalen sind getrennt
und fahren in der Explosionsansicht auseinander — die Bewegung, die das
Produkt ausmacht und die eine gemeinsame Gruppe nicht zeigen konnte.

Alle elf Maße 0,00 mm über alle neun Größen, Masse nach dem Nachfit maximal
14 %, Selbsttest 70/70 ohne Auffälligkeit. Der Katalog wiegt 2 024 718 statt
2 040 150 Dreiecke.

**Offen, nicht behoben:** `exportOBJ` in `core/export.js` nimmt die
unsichtbaren Schnittflächen mit — die Materialliste filtert `!o.visible`, der
Aufruf `OBJExporter().parse(root)` nicht. Betrifft alle 70 Produkte;
gemessen an der Schelle 11 012 Dreiecke und 0 offene Kanten ohne die Caps
gegen 11 118 und 110 mit ihnen. Der GLB-Weg ist sauber (`onlyVisible: true`).
M30, eigener Arbeitsschritt.

---

## 1. September 2026 — Rohrschelle instand gesetzt, und ein Loch im Maßsatz

Prüfbericht: `pruefung/rohrschelle-instandsetzung.md`. Mängel M13–M19,
Fehlerkatalog Fälle 43–45.

**Der Ausgangspunkt war ein Widerspruch:** das Modell war im Viewer
sichtbar kaputt — Schrauben schwebten neben der Schelle, der
Gewindestutzen hing 11,8 mm darunter in der Luft, der Halbschnitt löschte
eine ganze Halbschale — und der Maßsatz meldete über alle neun Größen
**0,00 mm**.

**Der Grund ist die interessante Hälfte.** Vier der fünf Prüfungen waren
Größenmaße: sie fragen, wie groß ein Teil ist, nie, wo es liegt. Die
fünfte verglich Box-Ränder auf Symmetrie — und zwei Schrauben, die vom
SELBEN Stoß nach entgegengesetzten Seiten ins Leere zeigen, erfüllen das
ebenso gut wie zwei richtig sitzende. Ein Maßsatz aus lauter Größenmaßen
prüft ein Teil gegen sich selbst; er kann nicht ausschließen, dass die
Baugruppe auseinanderfällt. Als **Fall 43** aufgenommen, mit vier
Bauformen für Lagemaße.

Dazu kam ein Instrumentenfehler derselben Art wie Fall 16: die Sonde für
die lichte Weite schoss nach +Z, wo keine Lasche steht. Sie meldete
32,60 — richtig gemessen, an der falschen Stelle, während die Laschen
6,4 mm tief im Rohrkanal standen. Das neue `freie-bohrung` nimmt den
kleinsten Abstand ALLER Schalenpunkte von der Achse; ein Strahl kann
diese Frage nicht beantworten.

**Die Stoßachse ist um 90° gedreht.** Zwei Fehler hatten dieselbe Wurzel:
die Teilungsebene lag auf ±Y, also genau dort, wo der Gewindestutzen
sitzt UND genau in der Ebene z = 0, die der Viewer schneidet. Mit
`off ∈ {90, 270}` liegen die Stöße bei ±Z, der Stutzen steht auf dem
geschlossenen Rücken, und der Halbschnitt schneidet beide Schalen durch
die Wand statt entlang der Fuge. Schnittflächen gibt es jetzt auch —
vorher gaben alle Teile `cap: null`.

**Die Waage hat wieder die Gestalt korrigiert.** `shellWall = 0,14·d` und
`width = 0,68·d` wachsen beide linear mit d, die Masse also mit d³; die
kg-Spalte wächst über das 5,5-fache des Durchmessers nur auf das
Vierfache. Ergebnis war +107 % bei d110. Beide Gesetze sind jetzt affin
und über alle neun Zeilen gefittet (max. 13 %). Der metallische Anteil
trägt bei d20 66 von 71 g — deshalb darf der Kunststoff nur flach
wachsen.

**Und ein Core-naher Fund:** die Vierkantmutter maß 1173 statt 713 mm³ —
mehr, als ihre eigene Außenkontur zulässt. `ExtrudeGeometry` richtet
Löcher nur aus, wenn es die Außenkontur umdreht, also nur bei einer
Kontur GEGEN den Uhrzeigersinn. Die Vorlage `roundedPad` läuft im
Uhrzeigersinn — und hat nie ein Loch, weshalb es dort nie auffiel.
**Fall 45**, gefunden von der Massenprobe, nicht vom Auge.

Die Gestalt folgt jetzt dem Herstellerfoto AQ500: zwei gleiche
Halbschalen, zwei gleichwertige Stöße mit Stahllaschen,
Linsenkopf-Kreuzschlitzschrauben mit U-Scheibe und schwarzen
Vierkantmuttern, Sechskantstutzen auf dem Rücken. Damit ist der offene
Rest von M11 abgearbeitet — der Eintrag stand seit dem 25.08. auf
„behoben", obwohl nur Gummieinlage und Rillen erledigt waren.

Selbsttest 70/70 ohne Auffälligkeit, alle neun Größen 0,00 mm.

---

## 17. August 2026 — Kreuz, Reduzierbuchse, zwei Nennweiten

**#39 Kreuz** — nur d25 und d32, die kleinste Tabelle des Katalogs. Zwei
Kehlen aus `branchJoin`, zwei Abzweigarme, ein Durchgang. Das Familienmodul
`_tee` trägt den Fall, ohne angefasst zu werden.

**#8 Reduzierbuchse** — 17 Kombinationen, d25→d20 bis d75→d63. **Erstes
Produkt mit zwei Nennweiten**, und damit die angekündigte Erweiterung des
Produktvertrags: `product.sizeKey` nennt das Feld, über das der Core Größen
adressiert. Bei 17 Zeilen mit nur 5 verschiedenen Werten für `d` wäre `d`
nicht eindeutig. Einstufige Produkte sind unberührt — fehlt `sizeKey`, bleibt
alles wie bisher.

### Der Maßtest hat meine Lesart der Bauform widerlegt

Ich hatte `D` als größten Außendurchmesser gelesen (Bund über dem Zapfen).
Dann müsste `D > d` gelten. Gilt nicht:

     d32 / d1=20 → D = 29   (D unter d)
     d63 / d1=20 → D = 34   (D weit unter d)

`D` korreliert nicht mit `d`, sondern mit `d1`: 20→29, 25→34, 32→43,
40→52, 50→65, 63→80. Das sind bis auf Rundung die Außendurchmesser der
**Muffen** derselben Nennweite (Muffe d20: D=29 · d40: 52 · d50: 65).

Die Buchse ist also ein dicker Zapfen Ø d, der in der d-Muffe versinkt, mit
einem dünneren d1-Muffenkragen Ø D davor — nicht umgekehrt. Die Kontur trägt
jetzt beide Richtungen, weil der Kragen bei kleinen d dicker und bei großen d
dünner als der Zapfen ist.

**Zwei Messfehler dabei**, beide dieselbe Art: ein Strahl von der Achse nach
außen trifft zuerst die Bohrungswand und gibt deren Radius zurück — er misst
die Bohrung, nicht das Außenmaß. Und beim Kreuz umfasste die Box3 die Kehlen
mit, die konstruktiv bei `rOut + filletR` sitzen und breiter sind als der
Rohrkörper. Beide messen jetzt von außen bzw. am Arm.

### Zwei Werkzeugbefunde

**Der Font-Cache.** Die vier Variable-Fonts bei jedem Bauaufruf neu zu base64
zu rechnen ließ den Galeriebau ab 20 Modellen ins Zeitbudget laufen. Einmal
erzeugt als `build/tokens-inlined.css`.

**Der Truncation-Guard hat zweimal richtig gegriffen:** `buildLib` mit einer
Teilliste aufzurufen hätte `registry.json`, `registry.mjs` und `index.mjs`
auf ein Produkt geschrumpft. Die Bibliothek muss immer über die volle Liste
gebaut werden — die drei Dateien sind Indizes, keine Einzelausgaben.

**Eine Falle, die mich erwischt hat.** `buildGallery` und `buildLib` im selben
Aufruf sprengen das Zeitbudget. Ein Timeout verwirft alle Schreibvorgänge —
aber die Erfolgsmeldung des ersten Schritts erscheint trotzdem
(„kaqua-3d-galerie.html · 644 kB · 20 Modelle"). Ich habe sie als gelungenen
Bau gelesen, danach nur `buildLib` wiederholt, und die Galerie blieb zwei
Produkte hinterher: Badge zeigte 18, Kreuz und Reduzierbuchse standen als
graue Platzhalter ohne Startknopf. Der Prüfer hat es gefunden.

Die Lehre steht jetzt als Warnung im Kopf von `build/browser-build.mjs`:
jeden Bauschritt einzeln aufrufen und danach die Dateiliste prüfen, nicht die
Logzeile.

---

Für die Übergabe an eine externe KI oder Entwicklerin:
**`dist/INTEGRATION.md`** — sie steht für sich und setzt kein Wissen über
dieses Projekt voraus.

---

## 17. August 2026 — Winkel, T-Stück, Farbkorrektur, Export

Prüfberichte: `pruefung/winkel-und-tee-pruefbericht.md`,
`pruefung/vergleichstest-rohre-muffe.md`.

**#5 Winkel 45°, #6 Winkel 90°, #7 T-Stück** — je 10 Größen, d20–d125.
Maßtest 0,01 mm. Zwei neue Familienmodule: `products/_bend/` und
`products/_tee/`.

Das war die Bewährungsprobe für `sweepPath` und `branchJoin`, und sie hat
**drei Fehler im Core gefunden**:

1. `sweepPath` konnte keinen veränderlichen Querschnitt. Ein Winkel braucht
   an den Stirnflächen die Muffenbohrung, in der Mitte die Rohrbohrung — ohne
   das ist eine Muffe ohne CSG nicht darstellbar. `loop` darf jetzt eine
   Funktion über die Bogenlänge sein.
2. `bendPath` fehlte ganz — `arcPath` liefert nur den Bogen, eine Winkelbahn
   ist Gerade–Bogen–Gerade.
3. **Ein Vorzeichenfehler, den der 90°-Fall arithmetisch verdeckt:** die
   Austrittsrichtung war `(−cos α, sin α)` statt `(cos α, sin α)`. Bei 90°
   unsichtbar, weil `cos 90° = 0`. Erst der 45°-Winkel hat ihn aufgedeckt —
   7,06 mm zu lang. Wäre nur der 90°-Winkel gebaut worden, hätte der Fehler
   still im Core gelegen und jeden künftigen Bogen falsch gemacht.

Dazu ein Fehler in meiner eigenen Prüfung: die Messung `tiefe` verglich Norm
gegen Tabellenwert statt Soll gegen gebaute Geometrie. Ein Maßtest prüft
Maßhaltigkeit, nicht Quellenkonsistenz.

### Die Muffentiefe kommt nicht aus der Spalte z

Bei der Muffe traf `(l−z)/2` die Normreihe DVS 2207-11 auf die Zehntelstelle.
Bei Winkel und T-Stück streut `leg−z` um bis zu 3 mm. Der physikalische
Einwand entscheidet: die Tiefe ist durch das Schweißwerkzeug festgelegt, ein
Werkzeug je Nennweite für alle Fittings — ein d32-Rohrende passt entweder in
alle drei oder in keines. Modelliert wird deshalb die Normreihe;
`leg−z` läuft als Gegenprobe mit. Beim Hersteller zu klären, was `z` bei
diesen Produkten bezeichnet.

### Streifenfarben: acht von zwölf waren falsch

Farbe und Streifenzahl hatte ich aus Produktname und Werkstoff **abgeleitet**
statt aus der Zeichnung gelesen. Beim Nachlesen aller zwölf Miniaturen:

| Produkt | Zeichnung | vorher |
|---|---|---|
| K-Rohr PP-R SDR 11 | 1 **blauer** Streifen | rot |
| K-Rohr Violett | 1 roter Streifen | ohne Streifen |
| K-Fiber PP-RCT SDR 7,4 | 4 **rote** | grau |
| K-Fiber PP-R SDR 9 | 4 **blaue** | grau |
| K-Fiber PP-R SDR 11 | 4 **rote** | grau |
| K-Fiber PP-R SDR 17 | 4 **rote** | grau |
| K-FiberClima SDR 11 | 4 **blaue** | grau |
| K-Fiber PP-R SDR 7,4 | 4 graue | Farbe ok, Material `steel` |

Der Materialfehler war der gröbere: für den grauen Streifen stand `steel` —
ein Metallmaterial mit `metalness 0.85` für einen coextrudierten
Kunststoffstreifen. Der Core hat jetzt `blueStripe` und `greyStripe` als
PP-Rezepte; `blueStripe` fehlte ganz.

Die Streifenfarbe kodiert im K-Aqua-System die Baureihe. Sie ist ein
Datenträger, keine Dekoration — ein falscher Streifen ist dieselbe Art Fehler
wie ein falsches Maß.

### PPR_GREEN ist bestätigt

Katalogfoto der Muffe und Modellrender pixelweise abgetastet:

| | Hex | Helligkeit |
|---|---|---|
| Foto | `#37ad7d` | 144,4 |
| Modell | `#39a977` | 141,6 |

**2 % Abweichung, maximal 6 von 255 pro Kanal.** Mein erster Eindruck war „das
Modell ist zu hell" — es ist 2 % dunkler. Ein Farbvergleich per Auge über zwei
verschieden beleuchtete Bilder ist nicht belastbar, die Abtastung ist es.

### Vergleichstest der Rohre: nicht durchführbar

Die Katalogbilder der Rohre sind **CG-Renders**, keine Fotos — keine
Formtrennnaht, keine Beschriftung, kein Kontaktschatten. Und sie widersprechen
der eigenen Zeichnung: das K-Fiber-Bild zeigt einen einfarbig grünen Zylinder,
die Zeichnung derselben Seite schreibt vier Streifen vor. Als Referenz wertlos.

### Exportblatt

`dist/export.html` — Standbilder, GLB und OBJ für jedes Produkt, gepackt als
ZIP. Läuft im Browser ohne Server; der ZIP-Schreiber ist 40 Zeilen im
store-Verfahren, weil PNG und GLB ohnehin komprimiert sind.

---

## 17. August 2026 — Rohrblock vollständig, Bibliotheksexport

**Alle zwölf Rohre gebaut.** Phase 1 aus den Screenshots, 105 Artikelzeilen,
maschinenlesbar in `build/pipe-specs.json`.

| Produkt | Reihe | Größen | Bereich | Lagen |
|---|---|---|---|---|
| K-Rohr PP-R SDR 6 | AQ200P | 10 | d20–d125 | 1 |
| K-Rohr PP-R SDR 11 | AQ111P | 9 | d20–d110 | 1 |
| K-Rohr Violett PP-R SDR 11 | AQ111PL | 9 | d20–d110 | 1 |
| K-Rohr PP-RCT SDR 7,4 | AQ200 | 10 | d20–d125 | 1 |
| K-Fiber PP-R SDR 7,4 | AQ207PF | **14** | d20–d315 | 3 |
| K-Fiber PP-RCT SDR 7,4 | AQ200F | 10 | d20–d125 | 3 |
| K-Fiber PP-R SDR 9 | AQ169PF | 8 | d32–d125 | 3 |
| K-Fiber PP-R SDR 11 | AQ111PF | 9 | d20–d110 | 3 |
| K-Fiber PP-R SDR 17 | AQ117PF | 8 | **d90–d355** | 3 |
| K-FiberClima PP-RCT SDR 11 | AQ160F | 9 | d20–d110 | 3 |
| K-Fiber UV PP-RCT SDR 7,4 | AQ200FUV | 9 | d20–d110 | **4** |
| K-Fiber UV PP-R SDR 7,4 | AQ200PFUV | 10 | d20–d125 | **4** |

**`products/_pipe/` als Familienmodul.** `params.js` und `parts.js` waren bei
allen zwölf wörtlich identisch — ab dem dritten Rohr ist die Duplizierung nicht
mehr zu rechtfertigen. Produktspezifisch bleibt nur `data.js`; die Hüllen im
Produkt sind vier Zeilen. Der Produktvertrag erlaubt geteilte Fachlogik
ausdrücklich.

**Bibliotheksexport** unter `dist/lib/`: echte ES-Module, die ein Bundler
auflöst. `index.mjs` bietet `mount()`, `loadProduct(id)` und `REGISTRY`;
`loadProduct` lädt lazy, damit fünfzehn Modelle nicht im initialen Bundle
liegen. `three` bleibt bare specifier — npm und Importmap funktionieren beide.

**Selbsttest** `dist/lib-selbsttest.html`: lädt jedes Modul, baut die
Referenzgröße, vermisst sie. **15/15 geladen, größte Abweichung 0,18 mm,
355 760 Dreiecke, keine Auffälligkeiten.** Der Test beweist, dass die Importe
auflösen — nicht bloß, dass Dateien auf der Platte liegen.

### Vier Funde beim Rohrblock

**1 · Mein eigener Faserrohr-Datensatz war unvollständig.** Ich hatte 9 Größen
erfasst; die Tabelle führt **14** und geht bis d315. Die fehlenden fünf standen
unterhalb meines ersten Zuschnitts. Korrigiert.

**2 · Das Sternchen ist geklärt.** Die Fußnote, die auf den früheren
Zuschnitten fehlte: *„Pipe can be delivered in 5.80 meter length on special
request with product code AQ258F+dimension"*. Zwei ASSUMPTION-Vermerke sind
damit entfallen.

**3 · Zwei Rohre mischen SDR-Reihen.** Bei K-FiberClima SDR 11 und K-Fiber PP-R
SDR 11 tragen d20 und d25 ein Sternchen an `S min.` und führen **SDR-7,4-Maße**
(2,8 / 3,5 mm). Ab d32 gilt SDR 11. Der Wandstärken-Wächter prüft deshalb
zeilenweise gegen `D/S`, nicht gegen den Reihennennwert — sonst hätte er diese
beiden Rohre zu Recht abgewiesen.

**4 · Die Transkriptionsprobe hat einen Ablesefehler gefunden.** `D − 2·S = Di`
läuft über alle 105 Zeilen und schlug bei K-Fiber SDR 7,4, d315 an: `Di` als
229,8 gelesen, die Identität verlangt 228,8. In den anderen 13 Zeilen stimmt
sie auf die Zehntelstelle, deshalb steht 228,8 in der Spezifikation, markiert
als abgeleitet. Am Original nachzulesen.

### Vier Fehler im Bauwerkzeug, alle behoben

| Fund | Ursache | Behebung |
|---|---|---|
| `dist/undefined.html` × 12 | Die Bundler-Metadaten lasen `index.js` an fester Position `prod[3]` — die Familiendateien haben sie verschoben | per Name greifen |
| `buildTube` doppelt vergeben | `k-pipe-pp-r-sdr-6` trug noch seine handgeschriebene Vollfassung neben dem Familienmodul | auf die Hülle umgestellt |
| Bibliothek exportierte nichts | `strip()` in `browser-build.mjs` nahm keinen Keep-Parameter; der Aufruf `strip(src, true)` wurde stillschweigend ignoriert | Parameter ergänzt |
| Drei Fittings fanden `DRAFT` und `fusionDepth` nicht | Die Importliste war eine handgepflegte Wortliste und scannte nur `index.js` | aus den echten Core-Exporten abgeleitet, über alle Produktdateien gesucht |

Der dritte ist der lehrreiche: eine Funktion, die einen Parameter annimmt, den
ihre Signatur nicht kennt, scheitert lautlos. Der Selbsttest hat es gefunden,
weil er die Module wirklich lädt.

---

## 16. August 2026 — Muffe, Rohr SDR 6, Galerie

**Galerie** `dist/kaqua-3d-galerie.html` — alle 71 Produkte, davon 15 mit
Modell. Kategoriefilter, Freitextsuche, Raster/Liste, Zustand in der URL.

**Ein WebGL-Kontext**: genau eine `<three-d-stage>`, die zwischen Kopfbereich
und Kacheln wandert. Jede Kachel ist ein geschlossenes `<article>` und lässt
sich unverändert auf ihre Produktseite heben — der Zweck der Segmentierung.

Zwei Fehler im Zustand der Galerie behoben, beide vom Prüfer gefunden:
die CSS-Regel für die Bühnengröße galt nur für den Kachel-Mount (im Hero griff
`height: 100vh`), und `activeId` wurde auch beim Hero-Mount gesetzt — dadurch
hängte jedes `render()` die Bühne hinter dem Rücken von `show()` in eine
Kachel um. Jetzt ist der tatsächliche Ort die einzige Wahrheit (`mountId`), und
eine einzige Funktion `place()` leitet alles Abhängige daraus ab.

**#3 Muffe** — Prototyp ersetzt. Phase 1 hat beide geschätzten Maße widerlegt
(Fittingwand −1,68 mm, Anschlag −3,40 mm bei d32) und dafür `D` und `z`
geliefert. Maßtest 0,01 mm über 9 Größen.

Ihre Spalte `z` lieferte den Beleg für eine dritte Annahme: `(l − z)/2` trifft
die Normreihe DVS 2207-11 bei d20 bis d63 **auf die Zehntelstelle** — also
genau die Reihe, die ich bei der Kappe ansetzen musste. Weil sie damit zum
zweiten Mal gebraucht wird, ist sie nach `core/geometry.js` gewandert:
`fusionDepth(dNom)`.

---

## 16. August 2026 — #2 Kappe

**14 Größen** statt 7 im Markdown, acht Spalten statt fünf, und die als `L`
geführten Werte sind die Spalte `l`. Zwei Bauformen unter einer Nummernreihe.
Maßtest 0,18 mm (Formtrenngrat).

Vergleichstest gegen das Katalogfoto: drei Abweichungen behoben — Schulterlinie
zur Kalotte, zu scharfe Mundlochkante, zu zylindrische Silhouette.
`pruefung/kappe-vergleich.png`.

---

## 16. August 2026 — Teil 2: Core-Refactor

Abnahmeliste `ABNAHME-CORE.md`, alle neun Punkte ✅.

```
kaqua-3d/
├── core/               geometry · materials · assembly · overlay · ui · viewer
│                       · export · stage · index + PRODUKT-VERTRAG.md
├── products/           _pipe/ (Familienlogik) + 15 Produktpakete
├── gallery/            registry.js · index.js
├── build/              bundle.mjs · browser-build.mjs · importmap.json
│                       · pipe-specs.json · products.json
├── assets/             coday-tokens.css · fonts/
├── dist/               INTEGRATION.md · lib/ · 15 Produkt-HTML
│                       · kaqua-3d-galerie.html · lib-selbsttest.html
├── produkt-markdown/   korrigierte Produktseiten
├── pruefung/           Prüfberichte und Belegbilder
└── quellen/            (Projektwurzel) Seitenbilder aus den Screenshot-PDFs
```

**#1 Kugelhahn** portiert, dreieckidentisch zum Original über alle sechs
Größen, Maßtest 0,16 mm.

**Noch unbewährt im Core:** `sweepPath` · `arcPath` · `circleLoop` ·
`branchJoin` · `threadProfile` · `hexPrism` · `knurl`. Erste Belastung: #5
Winkel 45° und #7 T-Stück. `tubeLayers` ist mit den Faserrohren bewährt,
einschließlich vierlagiger UV-Ausführung.

---

## 17. August 2026 — Design-System-Treue der Galerie

Der Prüfer hat zu Recht beanstandet, dass ich nur `coday-tokens.css` kopiert,
aber die kanonische Bauteilgeometrie in
`ui_kits/website/style.css` nie gelesen hatte. Die Bedienelemente waren
deshalb frei erfunden. Nachgeholt und angeglichen:

| Element | vorher | jetzt | Quelle |
|---|---|---|---|
| Knopf „3D starten" | 36 px, Radius 12 px | 48 px, `min-height: 44px`, Radius 16 px | `.btn` |
| Filter-Chips | 34 px, Radius 12 px | 44 px, Radius 16 px | `.btn` |
| Suchfeld | 36 px | 44 px, Radius 16 px | `.btn` |
| Link „Zur Produktseite" | 28 px | 44 px | Guide, 44×44-Regel |
| Kachelfläche | `--color-card-bg` = #fafafa | `#fff` | `.port-card` |
| Kachel-Hover | −2 px, `shadow-md` | −4 px, `shadow-lg` | `.port-card` |

Der Kachelbefund ist der interessante: `--color-card-bg` und
`--color-bg-primary` lösen im Tokenset **beide** zu `#fafafa` auf. Das
Kartentoken korrekt zu benutzen ergab eine Karte, die sich nur durch einen
1-px-Rahmen vom Seitengrund abhob. Das UI-Kit setzt an allen drei
Kartenvarianten literales `#fff` — dort steht die Antwort, nicht im Token.
In `INTEGRATION.md` §3.4 als Fallstrick dokumentiert.

Die 44-px-Grenze war zudem eine Behauptung in `INTEGRATION.md` §10, die zum
Zeitpunkt des Schreibens unwahr war. Jetzt stimmt sie und nennt ihre Quelle.

---

## 20. August 2026 — Metallverschraubung (Innengewinde)

**0,00 mm** über 6 Größen, Selbsttest 28/28. Vollständig bemaßte Tabelle:
`Code · d · Rp · DN · G · L · l · l1 · SW · SW1 · Pack.`

**Dritte Tabelle, die sich mit einer anderen deckt.** Die Spalte `G` ist
identisch mit der `G`-Spalte der PP-R-Verschraubung (1 · 1¼ · 1½ · 2 · 2¼ ·
2¾). Beide Produkte tragen dieselbe Überwurfmutter; die Metallvariante
ersetzt nur den Stutzen durch ein Messingteil mit Innengewinde.

Die Gegenprobe nach Fall 28 — Vorzeichen über alle Zeilen — ergab
`l + l1 − L` durchgehend **−3 mm**. Dasselbe Muster wie bei der
PP-R-Verschraubung, also derselbe freiliegende Bundring. Diesmal richtig
gedeutet, weil die Regel jetzt im Katalog steht.

**Erstes Produkt mit zwei Schlüsselweiten.** SW an der Mutter, SW1 am Körper;
beide Sechskante sitzen auf einem Rotationskörper, der auf dem Inkreis liegt
(Fall 11). Die Zuordnung der beiden Weiten ist ASSUMPTION nach dem Foto und
dem Größenvergleich — SW1 muss unter SW liegen, damit die Mutter greift.

### Der Fotovergleich hat die SW-Annahme widerlegt

Der erste Entwurf setzte `SW` als Schlüsselweite eines zweiten Sechskants.
Die Fotoauswertung schließt das aus: bei L = 48 begrenzt der Aspekt die
Breite auf etwa 45 mm, `SW` = 54 über Fläche ergäbe 62,3 mm über Ecke. Das
Modell war bei d63 doppelt so breit wie lang.

`SW1` = 37 ergibt 42,7 mm über Ecke — knapp unter dem Muffendurchmesser 44,
und im Foto sind Muffe und Metallteil ähnlich breit. `SW` ist nicht
auflösbar und wird nicht modelliert.

**Der Maßtest konnte das nicht finden:** er prüfte `SW` gegen `P.SW`, also
die Annahme gegen sich selbst (Fall 12), und blieb bei 0,00 mm. Ersetzt
durch zwei Prüfungen mit Sollwerten aus dem Foto — Breitenüberschreitung
und Grünanteil.

**Das Produkt trägt `status:'prototyp'`**, bis `SW` geklärt ist. Ich hatte
es als `fertig` exportiert, obwohl der eigene Prüfbericht „Vergleichstest
offen" führte — das ist jetzt **Fall 30** im Katalog.

Dazu **Fall 31**, eine Rangfolge für widersprüchliche Vorgaben: Tabellenmaß
über Werkzeugmaß über Fotoableitung über Fachwissen. Foto und Schweißtiefe
gaben verschiedene Grünanteile vor (30 % gegen 43 %); der Versuch, dem Foto
zu folgen, machte die Muffe kürzer als ihre eigene Schweißtiefe.

**Registry-ID korrigiert:** die Registry führt
`transition-fittings/metal-union-female-thread`, nicht
`…-with-pp-r-nut-female-thread`. Bei IDs ist die Registry kanonisch, beim
Anzeigenamen die Quelle — dieselbe Trennung wie beim Faserrohr (`sdr-7-4`).

---

## 19. August 2026 — Verschraubung

Prüfbericht: `pruefung/union-pruefbericht.md`. **0,00 mm** über 6 Größen,
Selbsttest 27/27.

**Die Tabelle bestätigt sich selbst.** Die Spalte `D` lautet
46 · 56 · 66 · 79 · 87 · 107 — **exakt** die `D`-Werte des Kugelhahns bei
denselben Nennweiten. Diese Verschraubung ist dasselbe Bauteil, das der
Kugelhahn beidseitig trägt, hier als Einzelartikel. Damit bestätigen sich
zwei unabhängig abgelesene Tabellen gegenseitig, und die
Überwurfmutter-Geometrie ist belegt statt geschätzt.

### Ein Messfehler, den erst die Größenreihe entlarvt hat

Der erste Maßtest meldete `D` um 0,35 bis 0,46 mm zu klein — **wachsend mit
dem Durchmesser.** Nach Fall 23 ist das das Ausschlusskriterium für eine
Fase: die verschiebt ein Maß um einen konstanten Betrag.

Hier war es die **Sekante der Riffelabtastung**. `thetaSamples` verteilt
seine Winkelschritte ungleichmäßig; liegt keiner auf einem Rückenscheitel,
misst eine Box3 die Sekante. Relativ zum Radius war der Fehler konstant
(1,06 % gegen 0,86 %), absolut nicht. Behoben durch einen Strahl auf den
Scheitel bei `theta = π/count`.

Zweiter Fehler in derselben Messung: Startpunkt und Richtung lagen in
verschiedenen Ebenen. Der Strahl traf nichts, die Messung gab `NaN`, und der
Maßtest meldete `maxDiff: null` — **ein NaN ist kein Bestehen, sondern ein
Ausfall der Prüfung.**

### Eine falsche Deutung, vom Prüfer entlarvt

Ich hatte die Differenz zwischen `l + l1` und `L` als „Überlappung im
Gewinde" beschrieben. Über alle sechs Zeilen gerechnet ist `l + l1` aber
**nie größer** als `L` — es fehlt ein Stück, es überlappt nichts. Mein
`max(0, l + l1 − L)` ergab deshalb immer 0, und der Stutzen füllte die Lücke
auf: **l1 wurde 31 statt 30 mm.**

Gefunden hat es der Prüfer, nicht mein Maßtest — denn der prüfte `l1`
überhaupt nicht. Ein tabelliertes Maß, das die Geometrie bestimmt, war
ungemessen.

Neue Deutung: der freiliegende Ring des Stutzenbundes zwischen Mutterkante und
Stutzenschulter, an einer angezogenen Verschraubung genau dort sichtbar. Jetzt
als `collarGap` modelliert und gemessen.

Dazu die Spalte `z`: sie lautet 15 · 15 · 15 · 17 · 19 · 23 und lässt keinen
Bezug zu `L`, `l` oder `l1` erkennen. Statt sie stillschweigend
weglassen zu lassen, steht sie jetzt mit allen geprüften Verhältnissen als
nicht auflösbar im Kopfkommentar — **Fall 29** im Katalog.

---

## 19. August 2026 — Welle 2: Bundflansch und Rohrschelle

Prüfbericht: `pruefung/welle2-pruefbericht.md`. Beide **0,00 mm**,
Selbsttest 26/26.

**Bundflansch** — 11 Größen, vollständig bemaßt. Was fehlt, ist die **Zahl**
der Schraubenlöcher: Lochkreis und Lochdurchmesser stehen da, die Anzahl
nicht.

Bewiesen statt geschätzt: `D`, `D1` und `D3` stimmen in **elf von elf**
Zeilen mit DIN 2501 / EN 1092-1 PN 10 überein, wenn man die Rohr-Nennweite auf
die Flansch-Nennweite abbildet (d63 → DN50, d110 → DN100 …). Drei Normmaße
gleichzeitig identifizieren die Reihe eindeutig; die vierte Größe folgt daraus.
Anderer Umgang mit einer Lücke als bei Stopfen und Flachdichtung, wo aus einem
Foto geschätzt werden musste — hier liefert die Quelle genug Redundanz.

**Rohrschelle** — das komplexeste Zubehörteil: vier Werkstoffe in einem
Produkt (PP-Schalen, Gummieinlage, Schrauben, Mutterblock). Die Tabelle führt
nur die Nennweite; alle Maße aus dem Foto, Gewichtsgegenprobe 62 g gerechnet
gegen 70 g tabelliert.

Ein Befund aus dem Gewichtsverlauf: der Sprung von d50 (0,08 kg) auf d63
(0,13 kg) ist überproportional — Masse +63 %, Umfang nur +26 %. Deutet auf
einen Wechsel der Schraubengröße M8 → M10 dort hin, als ASSUMPTION umgesetzt.

### Zwei neue Core-Funktionen, kein CSG

`plateWithHoles()` und `boltCircle()`. `THREE.Shape` nimmt die Löcher als
Innenkonturen auf, die Triangulierung setzt sie in einem Zug — dasselbe
Verfahren wie bei `hexPrism`. Weitere Abnehmer: Wandscheibe #48,
Flanschadapter.

Die Halbschalen der Schelle sind **Teilrotationskörper**: `revolve()` nimmt
eine `thetas`-Liste, ein Bogen von `gapDeg` bis `180 − gapDeg` ist ein
gewöhnlicher Revolve über einen Teilwinkel. Keine geschnittene Vollschale.

### Der dritte Core-Fehler derselben Ursache

`plateWithHoles` lieferte alle Durchmesser um **2 × bevel** falsch:
`ExtrudeGeometry` addiert `bevelSize` nach außen, die Außenkontur wächst,
jede Innenkontur schrumpft. D 166,6 statt 165 und D2 76,4 statt 78 — beides
genau 1,6 mm bei 0,8 mm Fase.

Damit ist es der dritte Fall nach `hexPrism` (Umkreis, 0,32 mm) und
`threadProfile` (Kuppe, 0,4 mm). **Alle drei entstehen dort, wo eine Rundung
oder Fase auf einem Katalogmaß sitzt.** Als Fall 23 im Fehlerkatalog mit der
Regel: Richtung prüfen und in der Konturberechnung kompensieren, nicht in der
Toleranz.

---

## 18. August 2026 — Welle 1 und zwei Core-Fehler

Prüfbericht: `pruefung/welle1-pruefbericht.md`.

**Stopfen, Flachdichtung, Flachdichtung für Verschraubungen.** Beide
Dichtungen 0,00 mm, der Stopfen 0,11 mm. Selbsttest 24/24.

Der Stopfen ist **kein Muffenstopfen**, wie der Name naheliegt, sondern ein
G½"-Gewindestopfen mit O-Ring und vier Werkzeugkerben. Das Produktfoto hat
das entschieden — die Tabelle führt nur `G`, `kg` und `Pack.` und kein
einziges Geometriemaß. Alle Maße sind aus dem Foto abgeleitet und über das
Gewicht gegengeprüft: 15 g gerechnet gegen 20 g tabelliert.

### Zwei Fehler im Core, beide systematisch

**`threadProfile` lieferte jedes Gewinde 0,4 mm zu dünn.** Der
Kuppenradius wurde nach innen angelegt und zog den Scheitel unter das
Nennmaß. Bei 55° Whitworth-Flanken sind das 1,17·rd. Am realen Gewinde liegt
der theoretisch spitze Punkt über dem Nennmaß, und die Rundung bringt ihn
darauf — jetzt gerechnet als `setback`.

**`hexPrism` lieferte jedes Eckenmaß 0,32 mm zu klein.** Die Eckenrundung
lief über `quadraticCurveTo` mit dem Eckpunkt als Kontrollpunkt. Eine
solche Kurve erreicht den Eckpunkt nicht — sie schießt nach innen über.
Jetzt ein echter Tangentenbogen; Scheitelrückstand 0,155·r statt 1,07·r.

Der Gewindeadaptor ist nach beiden Korrekturen von 0,27 auf **0,16 mm**
gesunken.

**Warum das erst jetzt auffiel:** die Gewindeprüfung des Adaptors verglich
`P.threadOD` gegen `P.threadOD` — einen Parameter gegen sich selbst. Erst
der Stopfen hat das Gewinde tatsächlich abgetastet. Fehlerkatalog Fall 12 in
der Praxis, und ein Argument dafür, jede neue Produktfamilie mit einer
Messung zu beginnen, die die Geometrie wirklich anfasst.

### Ein Fehler im Stopfenmodell

Das Profil war auf der Achse nicht geschlossen: die Außenkontur begann bei
`r = rThread·0,93` statt `r = 0`. Der Revolve baute daraus einen Kegel
statt einer Stirnfläche — der Stopfen war offen. Gefunden hat es die Messung
`dicht`, die zwei Achsenstrahlen von beiden Seiten vergleicht und 0 zurückgab.

Beim ersten Entwurf hatte dieselbe Messung noch `P.wall` zurückgegeben.
Erst die Umstellung auf zwei echte Strahlen hat sie in die Lage versetzt, den
Fehler zu sehen.

---

## 18. August 2026 — erstes Gewindeteil, erstes Verbundteil

**#9 Übergangsmuffe mit Außengewinde** — 12 Kombinationen, d20/R½" bis
d110/R4". Maßtest 0,16 mm.

Das ist zugleich der erste Einsatz von `threadProfile`, `hexPrism` und
`knurl` **und** das erste Verbundteil des Katalogs: PP-R-Körper plus
Messingzapfen, zwei Werkstoffe in einem Produkt. Die Explosionsansicht zeigt
erstmals seit dem Kugelhahn wieder etwas — die Fügestelle.

`threadProfile` und `knurl` haben ohne Änderung getragen. **`hexPrism`
nicht** — dazu unten.

### Der Sechskant war unsichtbar — und der Maßtest war dagegen blind

Der schwerwiegendste Fund dieser Runde, gefunden vom Prüfer, nicht von mir.

Ich hatte den Revolve-Bund auf `rOut` = D/2 gesetzt — genau den
**Umkreisradius** des Sechskants. Der Zylinder umhüllte ihn damit vollständig
und berührte ihn nur an sechs Tangentenlinien: die Schlüsselflächen lagen im
Materialinneren, die Silhouette war ein perfekter Kreis. Der Hotspot behauptete
„Sechskant SW 43,3 mm zum Gegenhalten" für ein Teil, das keinen sichtbaren
Sechskant hatte.

**Warum mein Maßtest das durchgelassen hat:** ich habe D als Z-Ausdehnung der
Box3 gemessen, und die ist für einen runden Bund mit R = D/2 und einen
Sechskant über Ecke **identisch**. Die Messung war gegenüber genau diesem
Fehler blind — dieselbe Klasse wie die `Di`-Messung, die ihren eigenen
Startradius zurückgab, und wie die `tiefe`-Messung, die zwei Quellen
verglich statt Soll gegen Geometrie.

Behoben: der Bund liegt jetzt auf dem **Inkreis** (af/2), der Sechskant trägt
die Silhouette. Neue Messung `af` prüft die Schlüsselweite quer zur Fläche —
bei einem umhüllenden Zylinder käme dort D heraus, nicht af. Erst diese
Messung beweist, dass die Flächen sichtbar sind.

Auf dem Weg dahin drei weitere Befunde:

| Fund | Ursache |
|---|---|
| Eckenmaß 9 % zu klein | `bevel` in `hexPrism` nimmt vom Umkreis. Für ein Teil, dessen Eckenmaß ein Katalogmaß ist: `bevel = 0` |
| D und af vertauscht | `hexPrism` legt nach seiner internen `rotateY(π/2)` die **Fläche** auf Z und die **Ecke** auf Y — nicht umgekehrt. Steht jetzt als Orientierungsvermerk in der Core-Funktion |
| af bei kleinen Größen 2 mm zu groß | Bei d20–d32 ist der Messing-Anschlussbund am PP-Körper breiter als der Sechskant; die Box3 misst dann ihn. Jetzt per Strahl auf die Sechskantmitte |

**Zwei weitere Messfehler**, beide bekannter Art: der Bund war zunächst auf
0,985·rOut gesetzt und unterschritt das tabellierte D um 1,5 % — ein Katalogmaß
darf nicht angenähert werden. Und die D1-Messung traf eine Riffelnut statt den
Rücken.

### Ein Produkt zurückgestellt

Die **Übergangsmuffe mit Innengewinde** (Female thread) ist gelesen, aber
nicht gebaut. Ihre Tabelle führt `d · D · L · h · L1` — kein Gewindemaß, und
bei d20 steht `L = 70` und `h = 52` bei einer Muffenlänge von 34. Diese
Spalten sind ohne die technische Zeichnung nicht deutbar, und die Miniatur
ließ sich in der Seite nicht auffinden. Raten wäre hier teurer als warten:
bei der Reduzierbuchse hat eine falsch gelesene Spalte einen ganzen
Modellversuch gekostet.

**Nötig:** die Zeichnung zu `transition-fittings/adaptor-socket-female-thread`
in lesbarer Auflösung, oder die Bedeutung von `h` und `L1`.

### Bau- und Bibliotheksbau sind jetzt gestuft

Ab 21 Modellen überschreiten beide das Zeitbudget. Zwischenstände liegen als
Cache in `build/`: `tokens-inlined.css` (Fonts als base64),
`core-stripped.js`, `prod-a.js`/`prod-b.js` (Produktpakete in zwei Hälften).
Ändert sich eine Quelle, muss der betroffene Cache neu erzeugt werden — sonst
baut die Galerie einen alten Stand. Steht als Warnung im Kopf von
`build/browser-build.mjs`.

Beim Bibliotheksbau war die Importliste der Engpass: sie wurde je Produkt über
30 einzelne RegExp-Tests gesucht. Schneller ist, die Bezeichner einmal je
Datei zu tokenisieren und mit der Core-Exportmenge zu schneiden. Der Vollbau
läuft damit noch nicht in einem Zug durch; die Bibliothek wird produktweise
nachgetragen und die drei Indexdateien in einem eigenen Schritt.

**Das ist die eigentliche Bremse für die restlichen 50 Produkte** — nicht die
Modellierung, sondern der Bau. Vor der nächsten größeren Runde lohnt es,
`browser-build.mjs` auf inkrementelles Bauen umzustellen: nur geänderte
Produkte neu strippen, den Rest aus dem Cache nehmen.

---

## Ein Anzeigestring, eine Quelle

Dreimal dieselbe Fehlerklasse — zwei Quellen für denselben angezeigten Text —
und jedes Mal hat sie der Prüfer gefunden, nicht mein Maßtest:

| # | Fund | Behebung |
|---|---|---|
| 1 | Suche lief über die zwei Randartikelnummern, fand keine aus der Tabellenmitte | vollständige Codeliste je Produkt in die Registry |
| 2 | Kachelname aus `registry.de`, Viewertitel aus `product.titleDe` — bei 6 Produkten verschieden, `Reduzierbuchse` fand null Treffer | `titleOf()`: existiert ein Produktmodul, gilt sein Titel |
| 3 | Größenbereich der Kachel baute `'d' + Schlüssel` selbst zusammen und ignorierte `sizeLabel` — `d110x4` liest sich wie 110 × 4 mm, obwohl die 4 Zoll sind | `rangeOf()`: Formatierung kommt aus dem Produktmodul |

Jetzt zeigen die Kacheln `d20 · R1/2" bis d110 · R4"` und
`d25 → d20 bis d75 → d63`. Das Trennzeichen wechselt auf „bis", wenn das
Label selbst schon eines trägt — sonst stünde ein zweiter Bindestrich mitten
im Ausdruck.

**Die Lehre, die über diese drei Funde hinausgeht:** ein Anzeigestring, der an
zwei Stellen entsteht, driftet. Nicht irgendwann, sondern beim nächsten
Produkt. Alle drei Fälle sind jetzt so gebaut, dass die Galerie die
Formatierung des Produktmoduls benutzt statt sie nachzubilden — dann kann die
Divergenz auch bei den 50 offenen Produkten nicht wiederkehren.

---

## Ein Titel, eine Quelle

Kachelname und Viewertitel wichen bei sechs Produkten ab: die Kachel kam aus
`gallery/registry.js` (`de:`), der Viewer aus `products/<slug>/index.js`
(`titleDe:`). Weil der Suchfilter über die Kachelquelle lief, fand
„Reduzierbuchse" — der Titel, den der Viewer anzeigt — **null Treffer**.

Dieselbe Fehlerklasse wie die Artikelnummernsuche vorher: der Nutzer sucht mit
dem, was er gesehen hat, und der Index kennt es nicht.

**Behoben an der Wurzel:** existiert ein Produktmodul, gilt sein Titel — für
die Kachel und für den Suchindex. Die Divergenz kann damit nicht wiederkehren,
auch nicht bei den 51 noch offenen Produkten.

**Warum nicht die Registry gewinnt**, obwohl sie bei der Produkt-ID kanonisch
ist: bei der ID stellt sie die Verknüpfung zur Website her, dort muss sie
gelten (deshalb `sdr-7-4`, nicht `sdr-74`). Beim Anzeigenamen entscheidet die
Quelle, und dort war die Registry fachlich falsch:

| Registry | Quelle | richtig |
|---|---|---|
| Reduziermuffe | Reducing bush | **Reduzierbuchse** — eine Reduziermuffe („reducing socket") ist ein anderes Teil |
| Kreuzstück | Cross | **Kreuz** |
| K-Fiberclima | K-FiberClima | Schreibweise der Quelle |

Die sechs Registry-Einträge sind mitgezogen, damit die Datenquelle selbst
konsistent bleibt.

---

## Offene Annahmen

| Annahme | Wo | Gegen was zu verifizieren |
|---|---|---|
| Bedeutung der Spalte `z` bei Winkel und T-Stück | `products/tee/data.js` | Hersteller |
| Körperfarbe Violettrohr: Zeichnung sagt grün, Name sagt violett | `products/k-pipe-purple-…/data.js` | Hersteller |
| Bogenradius Winkel `0,5·d`, Kehlradius T-Stück `0,18·d` | `_bend/params.js`, `_tee/params.js` | Zeichnung |
| Schichtdicken Faserrohre 30/40/30 % | `products/k-fiber-*/data.js` | aufgeschnittenes Rohr |
| K-Fiber SDR 7,4 d315: `Di = 228,8` abgeleitet | `build/pipe-specs.json` | Original |
| Kalottenhöhe Kappe 0,19·D | `products/cap/params.js` | Zeichnung |
| Muffe d110: `z = 12,0` abgeleitet | `products/socket/data.js` | Quelle führt die Zelle leer |
| Vollstrom `bore = 0,667·d` | `products/ball-valve-pp/params.js` | Schnittzeichnung |
| `L1` nicht auflösbar | `products/ball-valve-pp/data.js` | Zeichnung |

---

## Nächster Schritt

**53 Produkte offen.** Die tragfähigen Familienmodule stehen jetzt für die
vier größten Gruppen: `_pipe` (Rohre), `_bend` (Winkel und Bögen), `_tee`
(Abzweige), dazu die Einzelteile-Mechanik im Core.

1. **Übergangsstücke und Verschraubungen** — dort werden `threadProfile`,
   `hexPrism` und `knurl` erstmals belastet. Nach der Erfahrung mit
   `bendPath` ist damit zu rechnen, dass sie Lücken zeigen: die drei sind
   implementiert, aber von keinem Produkt benutzt.
2. **Kreuz #39 und Sattel #30** — `_tee` sollte beide mit anderem Winkel und
   zweitem Abzweig tragen. Wenn nicht, ist das der Test dafür.
3. **Vergleichstest für Winkel und T-Stück** gegen die Katalogfotos.
4. **Reduzierte Fittings** (#8 Reduziermuffe, T-Stück reduziert): die erste
   Gruppe, bei der ein Produkt zwei Nennweiten gleichzeitig führt. Der
   Produktvertrag geht bisher von einer aus — das ist die nächste echte
   Erweiterung.

## Zu prüfen bei euch

`node build/bundle.mjs --all` und `--lib` einmal laufen lassen. Beide Pfade
sind nach dem heutigen Stand nachgezogen (Familienmodul, dynamische
Importliste, `index.mjs`, `registry.mjs`), in dieser Umgebung aber nicht
ausführbar. `build/browser-build.mjs` enthält dieselbe Logik für den Browser;
alle `dist/`-Dateien sind damit erzeugt und per Selbsttest bestätigt.
