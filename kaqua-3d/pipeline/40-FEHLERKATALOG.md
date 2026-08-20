# 40 — FEHLERKATALOG

**33 echte Fehler** aus dem Bau der ersten 28 Produkte. Jeder wurde gemacht,
gefunden und behoben. Sie sind der wertvollste Teil dieser Pipeline: wer sie
kennt, spart die Runden, die sie gekostet haben.

Nach jedem Maßtest gehst du diese Liste durch.

---

## Gruppe A — Fehler in der Datenermittlung

### Fall 1 · Die Markdown-Datei als Maßquelle

**Was passierte:** Die Muffe wurde aus `docs Unterseiten/fittings/socket.md`
gebaut. Ergebnis: 7 von 9 Größen, Spalten `D` und `z` fehlten ganz, und die als
`L` geführten Werte waren die Spalte `l` **und falsch** — 6 von 7 Werten
stimmten nicht.

**Regel:** Maße kommen ausschließlich aus dem Screenshot der Produktseite. Die
Markdown-Dateien sind unvollständig. Sie dürfen als Hinweis auf Artikelnummern
dienen, nie als Maßquelle.

**Erkennungszeichen:** Wenn die Größenzahl in der Markdown-Datei kleiner ist
als im Screenshot, fehlt der Rest unterhalb eines Seitenumbruchs.

---

### Fall 2 · Tabelle nicht bis zum Ende gelesen

**Was passierte:** Das K-Fiber-Rohr wurde mit 9 Größen erfasst. Die Tabelle
führt **14** und geht bis d315. Die fehlenden fünf standen unterhalb des
ersten Bildzuschnitts. Gefunden erst beim zweiten Blick auf dieselbe Quelle.

**Regel:** Nach der letzten gelesenen Zeile **immer** prüfen, ob darunter noch
Zeilen stehen. Die Tabelle endet erst, wenn der ORDER-Knopf oder eine neue
Überschrift kommt.

**Vorgehen:** Seite 1 unten *und* Seite 2 oben in einem Zuschnitt zusammen
ansehen — der Seitenumbruch verdeckt sonst Zeilen.

---

### Fall 3 · Eine Spalte falsch gedeutet

**Was passierte:** Bei der Reduzierbuchse wurde `D` als größter
Außendurchmesser gelesen. Dann müsste `D > d` gelten. Gilt nicht: bei
d63/d1=20 ist `D = 34`. `D` korreliert mit `d1`, nicht mit `d` — es ist der
Außendurchmesser des Muffenkragens. Kostete einen kompletten Modellversuch.

**Regel:** Vor dem Modellieren jede Spalte gegen eine **Plausibilitätsregel**
prüfen:

```
Ist D wirklich das größte Maß?      → D > d für alle Zeilen?
Ist l wirklich die Gesamtlänge?     → l > jede Teillänge?
Passt D − 2·s zu Di?                → in jeder Zeile?
Korreliert die Spalte mit d oder d1? → beide durchrechnen
```

Wenn eine Regel bricht, ist die Deutung falsch — nicht die Tabelle.

---

### Fall 4 · Die Spalte `z` bedeutet nicht überall dasselbe

**Was passierte:** Bei der Muffe ergibt `(l − z)/2` die Muffentiefe und trifft
die Normreihe DVS 2207-11 **auf die Zehntelstelle**. Bei Winkel und T-Stück
streut `leg − z` um bis zu 3 mm.

**Der entscheidende Einwand ist physikalisch:** die Muffentiefe ist durch das
Schweißwerkzeug festgelegt — ein Werkzeug je Nennweite, für alle Fittings. Ein
d32-Rohrende passt entweder in alle oder in keines. Sie *kann* nicht abweichen.

**Regel:** Muffentiefe **immer** aus `fusionDepth(d)` (Core). Den
Tabellenwert als `P.socketFromTable` mitführen und die Differenz als
`P.depthDeltaToNorm` in den Prüfbericht schreiben.

---

## Gruppe B — Fehler in der Geometrie

### Fall 5 · Radius auf eine tangentiale Fuge

**Was passierte:** Bei der Kappe saß auf dem Übergang Zylinder → Kalotte ein
Fillet von 2,15 mm. Die Kalotte verlässt den Zylinder aber ohnehin tangential.
Der Fillet riss die Tangente auf und erzeugte eine sichtbare Schulterlinie,
die das Original nicht hat.

Nebenbefund: 2 496 Dreiecke gespart, als der Fillet entfiel.

**Regel:** Ein Radius nur auf eine echte Kante. Wenn zwei Flächen tangential
zusammenlaufen, `fillet: 0`.

**Weitere Funde derselben Prüfung:** Mundlochkante war eine 1,4-mm-Fase statt
3,5 mm Radius; Mantellinie war schnurgerade statt leicht tonnig.

---

### Fall 6 · Ein Bund über dem Nennmaß

**Was passierte:** Der Bund am Mundloch der Muffe saß **über** dem tabellierten
`D`. Ergebnis: 0,69 mm zu dick über alle Größen.

**Regel:** `D` ist ein Katalogmaß. Der Bund liegt **auf** `D`, der Zylinder
dahinter tiefer. Nicht umgekehrt.

**Gleicher Fall beim Gewindeadaptor:** der Bund war auf `0,985 · rOut` gesetzt
und unterschritt `D` um 1,5 %. Ein Katalogmaß darf nicht angenähert werden.

---

### Fall 7 · Anspritznabe quer gelegt

**Was passierte:** Bei der Kappe wurde die Anspritznabe mit `rotateZ`
gedreht, obwohl `revolve(axis: 'y')` sie bereits radial baut. Sie ragte mit
vollem Radius über die Silhouette — bis 6,53 mm bei d315.

**Regel:** `revolve` mit `axis: 'y'` liefert einen um Y rotierten Körper. Eine
zusätzliche Drehung legt ihn quer. Vor dem Drehen prüfen, wie die Funktion
baut.

---

### Fall 8 · Die 3-mm-Restwandregel auf ein Rohr angewandt

**Was passierte:** Das Faserrohr brach bei d20 mit „Wand 2,8 mm < 3 mm" ab.
Die Regel gilt für **Fittings** (Wand über einer Bohrung), nicht für Rohre —
dort bestimmt die SDR-Reihe die Wand, und 2,8 mm bei d20/SDR 7,4 ist korrekt.

**Regel:**

| Bauteilart | Prüfung |
|---|---|
| Fitting | Restwand ≥ 3 mm |
| Rohr | `d/s` darf die SDR-Reihe nicht unterschreiten; `s` ist ein **Mindest**maß |

**Sonderfall:** K-FiberClima SDR 11 und K-Fiber PP-R SDR 11 führen bei d20 und
d25 SDR-7,4-Maße (in der Quelle mit Sternchen). Zeilenweise gegen `D/S`
prüfen, nicht gegen den Reihennennwert.

---

### Fall 9 · Metallmaterial für Kunststoff

**Was passierte:** Der graue Kennstreifen der Faserrohre nutzte `steel` —
`metalness: 0.85` für einen coextrudierten PP-Streifen. Im Schnitt sichtbar
falsch.

Größerer Zusammenhang: **8 von 12 Streifenfarben waren falsch**, weil sie aus
Produktname und Werkstoff abgeleitet statt aus der Zeichnung gelesen wurden.
Die Streifenfarbe kodiert im K-Aqua-System die Baureihe — sie ist ein
Datenträger, kein Zierrat.

**Regel:** Farbe und Streifenzahl **wörtlich** aus der Zeichnungsminiatur
lesen. Abgeleitete Werte mit `colourRead: false` markieren.

---

### Fall 10 · Vorzeichenfehler, den ein Sonderfall verdeckt

**Was passierte:** In `bendPath` war die Austrittsrichtung als
`(−cos α, sin α)` gerechnet statt `(cos α, sin α)`. Bei 90° ist der Fehler
**unsichtbar, weil cos 90° = 0**. Erst der 45°-Winkel deckte ihn auf — 7,06 mm
zu lang.

Zweiter Fehler in derselben Funktion: der Bogenmittelpunkt trug ein falsches
Vorzeichen und lag auf der Außenseite der Ecke.

**Regel:** Eine neue Geometriefunktion **immer an zwei verschiedenen
Parametern** testen. Ein einzelner Testfall kann einen Vorzeichenfehler
arithmetisch verdecken.

**Konsequenz für dich:** Baue Winkel 45° und 90° zusammen, Innen- und
Außengewinde zusammen, T-Stück und Kreuz zusammen.

---

### Fall 11 · Der unsichtbare Sechskant

**Was passierte:** Beim Gewindeadaptor lag der Revolve-Bund auf `rOut = D/2` —
genau dem **Umkreisradius** des Sechskants. Der Zylinder umhüllte ihn und
berührte ihn nur an sechs Tangentenlinien. Die Schlüsselflächen lagen im
Material, die Silhouette war ein perfekter Kreis. Der Hotspot behauptete eine
Schlüsselweite, die die Geometrie nicht hatte.

**Regel:** Wenn ein Sechskant die Silhouette bilden soll, liegt der
Rotationskörper darunter auf dem **Inkreis** (`af/2`), nicht auf dem Umkreis
(`D/2`).

**Drei Folgefunde:**

| Fund | Ursache |
|---|---|
| Eckenmaß 9 % zu klein | `bevel` in `hexPrism` nimmt vom Umkreis. Bei einem Eckenmaß als Katalogmaß: `bevel = 0` |
| `D` und `af` vertauscht | `hexPrism` legt nach seiner internen `rotateY(π/2)` die **Fläche** auf Z und die **Ecke** auf Y |
| `af` bei kleinen Größen 2 mm zu groß | Der Anschlussbund am PP-Körper ist dort breiter als der Sechskant; eine Box3 misst ihn |

---

## Gruppe C — Fehler in der Prüfung

**Die gefährlichste Gruppe.** Eine kaputte Messung lässt einen Geometriefehler
durch und behauptet, alles sei in Ordnung.

### Fall 12 · Die Messung gibt ihre eigene Annahme zurück

**Was passierte:** Die `Di`-Messung des Rohrs schoss axial von
`(−xEnd − 10, rIn − 0,4, 0)` und gab `P.di` zurück, wenn sie irgendetwas traf.
Sie hat also **nicht gemessen**, sondern die Annahme bestätigt, die sie prüfen
sollte. Ergebnis: überall +0,6 mm, unerkannt.

**Regel:** Eine Messung muss die **gebaute Geometrie** auswerten, nie einen
Parameter zurückgeben. Prüfe jede `ist()`-Funktion: kommt der Rückgabewert aus
`hit.x/y/z` oder aus einer Box3? Wenn er aus `P.` kommt, ist es keine Messung.

Zulässige Ausnahme: Größen, die per Definition Parameter sind (`P.wall`,
`P.restwand`). Die dann auch so benennen.

---

### Fall 13 · Die Messung ist gegenüber dem Fehler blind

**Was passierte:** Der unsichtbare Sechskant (Fall 11) kam durch den Maßtest,
weil `D` als Z-Ausdehnung der Box3 gemessen wurde — und die ist für einen
runden Bund mit `R = D/2` und einen Sechskant über Ecke **identisch**.

**Regel:** Frage bei jeder Messung: *„Welchen Fehler kann diese Messung
nicht finden?"* Wenn die Antwort einen realistischen Fehler enthält, brauchst
du eine zweite Messung.

Bei Schlüsselflächen: `D` (Eckenmaß) **und** `af` (Schlüsselweite) messen. Nur
das Paar beweist, dass der Sechskant die Silhouette bildet.

---

### Fall 14 · Die Messung vergleicht zwei Quellen

**Was passierte:** Die `tiefe`-Messung von Winkel und T-Stück verglich die
Normreihe gegen den Tabellenwert `leg − z` — zwei Datenquellen, nicht Soll
gegen Geometrie. Der Selbsttest meldete 3 mm Abweichung, obwohl die Geometrie
korrekt war.

**Regel:** Ein Maßtest prüft **Maßhaltigkeit**. Quellenkonsistenz gehört in
den Prüfbericht, nicht in `measures`.

---

### Fall 15 · Der Messpunkt liegt in der Entformungsschräge

**Was passierte:** Der Zapfen der Reduzierbuchse wurde bei 55 % seiner Länge
gemessen — dort hatte die 1°-Entformung ihn planmäßig um 0,57 mm verjüngt.

**Regel:** Am **Nennmaßort** messen, nicht irgendwo. Bei einem Zapfen ist das
der Anfang, bei einer Muffe das Mundloch.

---

### Fall 16 · Der Strahl trifft die falsche Fläche

Drei Varianten desselben Fehlers:

| Variante | Was passierte | Lösung |
|---|---|---|
| Strahl von der Achse nach außen | trifft die **Bohrungswand**, gibt deren Radius | von außen nach innen schießen |
| Strahl trifft eine Riffelnut | Riffelung liegt planmäßig unter dem Nennmaß | Box3 nehmen oder Rücken anpeilen |
| Box3 über das ganze Teil | erfasst die **Kehlen**, die bei `rOut + filletR` sitzen | am Arm messen, nicht über die Box |

---

## Gruppe D — Fehler im Bau

### Fall 17 · Timeout meldet Erfolg

**Was passierte:** `buildGallery` und `buildLib` liefen in einem Aufruf in den
30-Sekunden-Timeout. Ein Timeout **verwirft alle Schreibvorgänge**, aber die
Erfolgsmeldung des ersten Schritts erscheint trotzdem:
„kaqua-3d-galerie.html · 644 kB · 20 Modelle". Gelesen als gelungener Bau. Die
Galerie blieb zwei Produkte hinterher, Badge zeigte 18.

**Regel:** Jeden Bauschritt **einzeln** aufrufen. Danach die **Dateiliste**
prüfen, nicht die Logzeile.

---

### Fall 18 · Bibliothek mit Teilliste gebaut

**Was passierte:** `buildLib(['cross'])` hätte `registry.json`,
`registry.mjs` und `index.mjs` auf ein Produkt geschrumpft. Der
Truncation-Guard hat es abgefangen.

**Regel:** `buildLib` **immer** über die volle Produktliste. Die drei
Indexdateien sind Indizes, keine Einzelausgaben.

---

### Fall 19 · Zwei Quellen für einen Anzeigestring

**Dreimal aufgetreten**, jedes Mal vom Prüfer gefunden:

| # | Fund |
|---|---|
| 1 | Suche lief über die zwei Randartikelnummern, fand keine aus der Tabellenmitte |
| 2 | Kachelname aus `registry.de`, Viewertitel aus `product.titleDe` — bei 6 Produkten verschieden. „Reduzierbuchse" fand null Treffer |
| 3 | Größenbereich baute `'d' + Schlüssel` selbst zusammen und ignorierte `sizeLabel` — `d110x4` liest sich wie 110 × 4 mm, obwohl die 4 Zoll sind |

**Regel:** Ein Anzeigestring, der an zwei Stellen entsteht, driftet — nicht
irgendwann, sondern beim nächsten Produkt. Die Galerie **benutzt** die
Formatierung des Produktmoduls (`titleOf`, `rangeOf`), statt sie nachzubilden.

---

### Fall 20 · Eine Kernfunktion hält ihren Vertrag nicht

**Zweimal aufgetreten, beide Male systematisch über alle Produkte:**

| Funktion | Versprechen | Geliefert | Ursache |
|---|---|---|---|
| `threadProfile` | „D = Nenn-Außendurchmesser" | 0,4 mm zu dünn | Kuppenradius nach innen angelegt; bei 55°-Flanken zieht er den Scheitel um 1,17·rd zurück |
| `hexPrism` | „af = Schlüsselweite" (und D über Ecke) | Eckenmaß 0,32 mm zu klein | `quadraticCurveTo` mit dem Eckpunkt als Kontrollpunkt erreicht den Eckpunkt nicht |

**Regel:** Wenn ein Katalogmaß über eine Core-Funktion entsteht, muss
mindestens ein Produkt es **abtasten** — nicht den Parameter zurückgeben.

**Warum beide so lange unentdeckt blieben:** das erste Gewindeprodukt prüfte
`P.threadOD` gegen `P.threadOD`. Erst ein zweites Produkt, das den
Gewindescheitel mit einem Strahl anfuhr, hat den Fehler gezeigt.

### Fall 21 · Profil auf der Achse nicht geschlossen

**Was passierte:** Beim Stopfen begann die Außenkontur bei
`r = rThread·0,93` statt `r = 0`. Der Revolve verband den Bohrungsgrund
(18, 0) direkt mit (0, 9,75) — ein Kegel statt einer Stirnfläche. Das Teil
war offen; ein Stopfen, der nicht dichtet.

**Regel:** Ein geschlossener Körper braucht Konturpunkte **auf der Achse**
(r = 0) an beiden Enden, wo keine Bohrung durchgeht. Sonst schließt der
Revolve die Kontur über eine Kegelfläche.

**Erkennungsprüfung:** zwei Achsenstrahlen von beiden Stirnseiten. Ihre
Differenz ist die massive Länge. Ist sie 0, trafen beide denselben Punkt und
das Teil ist durchgängig offen.

---

### Fall 22 · Core geändert, Einzelviewer nicht neu gebaut

**Was passierte:** Nach zwei Korrekturen in `core/geometry.js` wurden nur
die betroffenen Produkte neu gebaut — Galerie und Bibliothek ebenfalls, aber
**23 von 24 Einzelviewern nicht.** Sie tragen den Core eingebettet, also
enthielt `dist/` zwei verschiedene Core-Fassungen.

Dimensional folgenlos, weil keines der 23 Produkte die geänderten Funktionen
benutzt. Aber `dist/` ist das Auslieferungspaket: wer die Dateien diffed,
findet zwei Wahrheiten, und ein künftiges Produkt könnte aus dem alten Stand
abgeleitet werden.

**Regel:** Nach **jeder** Core-Änderung alle Einzelviewer neu bauen. In
Gruppen von etwa 10, damit kein Aufruf ins Zeitlimit läuft.

**Nebenfund:** ein verwaister Stand aus einer früheren Umbenennung
(`sdr-74` statt `sdr-7-4`) war die einzige Datei, die auch der Neubau nicht
erfasste — kein Produkt zeigt mehr darauf. Prüfung in
`90-PRUEFKATALOG §5.2b`.

---

### Fall 23 · Fase oder Rundung verschiebt ein Katalogmaß

**Dreimal aufgetreten, drei verschiedene Funktionen, dieselbe Ursache:**

| Funktion | Verschiebung | Ursache |
|---|---|---|
| `hexPrush` → `hexPrism` | Eckenmaß −0,32 mm | `bevelSize` nimmt vom Umkreis; zusätzlich ein Bézier statt Tangentenbogen |
| `threadProfile` | Gewinde-Ø −0,41 mm | Kuppenradius nach innen angelegt, zieht den Scheitel unter das Nennmaß |
| `plateWithHoles` | Außen-Ø +1,6 mm, Bohrung −1,6 mm | `ExtrudeGeometry` addiert `bevelSize` nach außen: Außenkontur wächst, Innenkonturen schrumpfen |

**Regel:** Sitzt eine Fase, Rundung oder ein Bevel auf einem Katalogmaß, prüfe
die **Richtung**, in die sie das Maß verschiebt — und kompensiere sie in der
**Konturberechnung**, nicht in der Toleranz.

Faustregeln:
- `ExtrudeGeometry.bevelSize` wirkt **nach außen**, senkrecht zur Kontur.
  Außenkontur um bevel kleiner anlegen, Innenkonturen um bevel größer.
- Ein Fillet auf einem Profilpunkt zieht den Punkt **nach innen**, um
  `r·(1/sin(α/2) − 1)` bei Flankenhalbwinkel α/2.
- Ist das Maß nur Zierde (kein Katalogmaß), genügt ein kleiner Wert ohne
  Kompensation.

**Erkennungsmerkmal:** die Abweichung ist ein **exaktes Vielfaches** des
Fasenmaßes und über alle Größen konstant. Eine Abweichung, die mit der Größe
wächst, hat eine andere Ursache.

---

### Fall 24 · Reihenfolge von Drehung und Verschiebung

**Was passierte:** In `buildBolts` der Rohrschelle stand

    g.translate(0, y, side * (len / 2 + P.boltHeadH));
    if (side < 0) g.rotateY(Math.PI);

Das `rotateY(π)` läuft **nach** dem Translate und dreht um die
**Welt**-Y-Achse. Für `side = −1` wurde die Schraube erst nach −z
gesetzt und dann nach +z zurückgespiegelt. **Beide Schrauben lagen
übereinander bei +z, eine Lasche blieb ohne Schraube.**

Nachweis: Box der Gruppe lief von −1,9 bis +26,9 statt symmetrisch;
5448 Vertices bei z > 1, nur 1296 bei z < −1.

**Regel:** Transformationen sind nicht vertauschbar. Soll ein Teil auf
zwei Seiten liegen, baue es **je Seite in seiner eigenen Richtung** —
oder drehe **vor** dem Verschieben. Nach dem Verschieben zu drehen bewegt
das Teil auf einer Kreisbahn um den Ursprung.

**Prüfung:** `boxOf([...])` auf `|min.z| ≈ max.z`, Soll 0 für die
Differenz. Zusätzlich die Vertexverteilung zählen — sie zeigt auch eine
Überlappung, die die Box nicht sieht.

### Fall 25 · Eine Prüfung, die überall dasselbe liefert, prüft nichts

**Drei Fassungen brauchte die Bohrungsprüfung am Mutterblock:**

| Fassung | Warum untauglich |
|---|---|
| `hit.y < nut.top − 0.5 ? 1 : 0` | verglich die Trefferhöhe gegen einen Parameter, der im alten Stand `undefined` war → immer 0 |
| `hit ? 1 : 0` | eine **Gegenprobe seitlich der Bohrung** ergab ebenfalls „kein Treffer" — der Strahl traf den Block generell nicht |
| kleinster Abstand aller Blockpunkte von der Bohrungsachse | misst den Bohrungsradius: 4,0 bei M8, 5,0 bei M10, nahe 0 bei massivem Block |

**Regel:** Prüfe jede neue Messung mit einer **Gegenprobe an einer
Stelle, wo sie einen anderen Wert liefern muss.** Liefert sie dort
dasselbe, ist sie wertlos — unabhängig davon, ob sie beim korrekten Teil
das Richtige anzeigt.

Eine Messung, die einen **Wert** liefert (Radius, Länge, Durchmesser),
ist einer Ja/Nein-Prüfung überlegen: sie zeigt auch, *wie weit* etwas
daneben liegt, und sie kann nicht stillschweigend zu „immer ja"
degenerieren.

---

### Fall 26 · NaN in einer Messung ist kein Bestehen

**Was passierte:** Die `D`-Messung der Verschraubung schoss einen Strahl,
dessen Startpunkt und Richtung in verschiedenen Ebenen lagen
(`V3(-cos, -sin, 0)` statt `V3(0, -cos, -sin)`). Er traf nichts, die
Messung gab `NaN` zurück — und `Math.max(...)` über eine Liste mit `NaN`
ergibt `NaN`, das der Bericht als `maxDiff: null` ausgab.

Das liest sich wie „keine Abweichung". Es heißt: **die Prüfung ist
ausgefallen.**

**Regel:** Jede `ist()`-Funktion, die einen Strahl benutzt, muss
`Number.isFinite` prüfen. Der Maßtest muss `NaN` als **Fehler** melden,
nicht als 0.

    const diff = rows.map((m) => m.ist() - m.soll);
    if (diff.some((d) => !Number.isFinite(d))) throw new Error('Messung ausgefallen');

**Nebenregel für Strahlen:** Startpunkt und Richtung müssen in derselben
Ebene liegen. Bei einer Achse X spannt der Umfang Y-Z auf — ein
Richtungsvektor mit X-Komponente verlässt die Messebene.

### Fall 27 · Wächst die Abweichung mit der Größe, ist es keine Fase

**Was passierte:** `D` der Verschraubung war 0,35 mm zu klein bei d32 und
0,46 mm bei d63. Der erste Verdacht war Fall 23 (Fase auf einem Katalogmaß) —
falsch, denn eine Fase verschiebt um einen **konstanten** Betrag.

Tatsächliche Ursache: die **Sekante der Umfangsabtastung**.
`thetaSamples` verteilt Winkelschritte ungleichmäßig (dicht an Nutflanken,
weit auf Rücken). Liegt kein Schritt auf dem Scheitel, misst eine `Box3` die
Sekante zwischen zwei Schritten. Relativ zum Radius ist dieser Fehler
konstant, absolut wächst er.

**Unterscheidungsregel:**

| Abweichung | Ursache | Prüfung |
|---|---|---|
| konstant über alle Größen | Fase, Rundung, Formtrenngrat | Fall 23 |
| proportional zum Radius | Sekante der Segmentierung | Strahl auf den Scheitel statt Box3 |
| proportional zu einer Länge | Entformungsschräge | Messpunkt an den Nennmaßort legen |
| nur bei einzelnen Größen | Tabellenwert oder Parameterfall | Quelle nachlesen |

Diese Tabelle ist das schnellste Diagnosewerkzeug im Katalog: sie ordnet eine
Abweichung ihrer Ursache zu, bevor man den Code liest.

---

### Fall 28 · Eine Deutung, die die Zahlen nicht tragen

**Was passierte:** Bei der Verschraubung deutete ich die Differenz zwischen
`l + l1` und `L` als „Überlappung im Gewinde". Die Zahlen sagen das
Gegenteil: `l + l1` ist in **keiner** Zeile größer als `L` — es fehlt ein
Stück, es überlappt nichts.

Die Folge war doppelt: `Math.max(0, l + l1 − L)` ergab immer 0, und die
Geometrie füllte die Lücke mit Material auf. **`l1` wurde 1 mm zu lang**, und
die Geometrie widersprach der eigenen Dokumentation.

**Regel:** Wenn du eine Spaltenbeziehung deutest, rechne sie über **alle**
Zeilen durch und schreibe das Ergebnis in den Kommentar. Eine Deutung, die
nur bei einer Größe aufgeht, ist keine Deutung.

Konkret: bei `a + b ≈ c` prüfe das **Vorzeichen** der Differenz über alle
Zeilen. Ist es durchgehend negativ, fehlt Material (Spalt, Bund, Absatz). Ist
es positiv, überlappt etwas. Wechselt es, ist mindestens eine Zahl falsch
abgelesen.

**Und:** jedes tabellierte Maß, das die Geometrie bestimmt, braucht seine
eigene Messung. `l1` war modelliert, aber ungemessen — deshalb meldete der
Test 0,00 mm, während ein Katalogmaß um 1 mm daneben lag.

### Fall 29 · Eine Spalte, die nicht deutbar ist, gehört benannt

**Was passierte:** `z` der Verschraubung lautet 15 · 15 · 15 · 17 · 19 · 23.
Kein Verhältnis zu `L`, `l` oder `l1` ist erkennbar. Ich habe sie zunächst
stillschweigend weggelassen.

**Regel:** Eine Spalte, die du nicht deuten kannst, wird **im Kopfkommentar
der data.js benannt** — mit den Verhältnissen, die du geprüft hast, und dem
Satz, dass sie nicht modelliert wird. Stilles Weglassen sieht für den nächsten
Leser wie ein Versehen aus.

Format:

    ── DIE SPALTE <x> WIRD NICHT MODELLIERT ──
    <Werte>
    Geprüfte Verhältnisse: <Quotienten und Differenzen>
    Kein erkennbarer Bezug zu <...>. Ohne Zeichnung nicht auflösbar.
    Erscheint nur in aria-label und Fallback-Tabelle.

Ein geratener Bezugspunkt ist schlechter als eine benannte Lücke — bei der
Reduzierbuchse hat eine falsch gedeutete Spalte einen ganzen Modellversuch
gekostet (Fall 9).

---

### Fall 30 · Export freigegeben, während der Prüfbericht „offen" führt

**Was passierte:** Die Metallverschraubung wurde als `status:'fertig'`
exportiert, obwohl ihr eigener Prüfbericht „Vergleichstest gegen Katalogfoto:
offen" führte. Der Fotovergleich hat danach die zentrale Annahme widerlegt —
das Teil war bei d63 doppelt so breit wie lang.

**Regel:** Ein Produkt darf **nicht** `status:'fertig'` tragen, solange sein
Prüfbericht eine Pflichtprüfung als offen führt. Zwei zulässige Wege:

1. Prüfung nachholen, dann `fertig`.
2. `status:'prototyp'` setzen — der Export liefert es sichtbar als vorläufig
   aus.

**Warum das zählt:** der Maßtest kann eine falsche Gestalt nicht sehen, wenn
das bestimmende Maß nur gegen sich selbst geprüft wird (Fall 12). Bei der
Kappe hat der Fotovergleich drei Fehler gefunden, die der Maßtest nicht sehen
konnte. Er ist keine Zugabe, sondern die einzige Prüfung der Gestalt.

### Fall 31 · Zwei Vorgaben widersprechen sich — welche gewinnt

**Was passierte:** Foto und Norm gaben verschiedene Grünanteile vor: 30 %
gegen 43 %. Der erste Versuch, den Fotowert zu treffen, machte die
PP-R-Muffe kürzer als ihre eigene Schweißtiefe. Die Innenkontur reichte über
das Profilende hinaus, und der gemessene Bundring wurde negativ.

**Rangfolge bei Widersprüchen:**

| Rang | Quelle | Warum |
|---|---|---|
| 1 | Tabellenmaß | verbindlich, direkt abgelesen |
| 2 | Werkzeug- oder Normmaß | physikalisch bindend (Schweißtiefe, Gewindesteigung) |
| 3 | Fotoableitung | perspektivisch verzerrt, Teile können sich überdecken |
| 4 | Fachwissen | letzte Instanz |

**Und:** eine Fotoableitung, die einem Maß aus Rang 1 oder 2 widerspricht,
gehört als Widerspruch dokumentiert — nicht durch Nachgeben aufgelöst. Ein
Bauteil, dessen Maß kleiner ist als die Bohrung, die es aufnehmen muss, ist
kein Bauteil.

**Merkmal für diesen Fehler:** eine Längenprüfung wird **negativ**. Ein
negativer Abstand zwischen zwei Teilen heißt, dass sie sich durchdringen,
wo sie es nicht sollen.

---

### Fall 32 · Zwei Definitionen desselben Begriffs in einer Datei

**Was passierte:** In `gallery/index.js` zählte der Badge
`status === 'fertig'`, während `tileHTML` mit `status !== 'offen'` prüfte
und dem Prototyp einen Startknopf gab. Der Badge sagte 27, die Seite hatte 28
Startknöpfe — und die Zahl ist das Erste, was ein Besucher liest.

**Regel:** Ein Begriff, der an mehreren Stellen geprüft wird, gehört in **ein**
Prädikat, das alle benutzen:

    const hasModel = (p) => p.status !== 'offen';

Dieselbe Fehlerklasse wie Fall 28 (Deutung, die die Zahlen nicht tragen) und
wie die drei Anzeigestring-Funde — Titel, Artikelnummernsuche, Größenbereich.
**Vier von 32 Fällen** in diesem Katalog sind derselbe Mechanismus: dieselbe
Aussage entsteht an zwei Stellen und driftet.

**Prüfung:** Zähle im Browser, was die Seite behauptet, und vergleiche es mit
dem, was sie zeigt. Bei Statusanzeigen: Badge gegen
`document.querySelectorAll('button[data-start]').length`.

### Fall 33 · Ein langer Text streckt die ganze Rasterreihe

**Was passierte:** Die Prototyp-Kachel war 511 px hoch gegen 440 px bei allen
anderen — ihre Fußzeile stapelte Knopf, Kennzeichen und Link auf drei Zeilen.
Danach streuten die Höhen weiter (459 / 476), weil lange Titel und lange
Artikelnummernbereiche unterschiedlich umbrechen.

**Zwei Regeln:**

1. Ein Statuskennzeichen gehört **nicht** in eine Fußzeile, die die Kachelhöhe
   bestimmt. Als Überlagerung auf dem Bild beeinflusst es das Raster nicht.
2. `grid-auto-rows: 1fr` gleicht **alle** Kacheln auf dieselbe Höhe an. Ohne
   das streckt der längste Inhalt seine Reihe, und bei vielen Kacheln mit
   verschieden langen Titeln wird das Raster unruhig.

Dazu `-webkit-line-clamp: 2` mit `min-height: 2.5em` auf dem Titel: zwei
Zeilen Platz, danach Ellipse. Damit ist die Höhe vom Titeltext unabhängig.

**Prüfung:** `[...new Set(tiles.map(t => Math.round(t.getBoundingClientRect().height)))]`
muss **genau einen** Wert enthalten.

---

## Die Prüfliste in Kurzform

Nach jedem Maßtest:

- [ ] Gibt eine `ist()`-Funktion einen `P.`-Wert zurück? → Fall 12
- [ ] Welchen Fehler kann jede Messung nicht finden? → Fall 13
- [ ] Vergleicht eine Messung zwei Quellen? → Fall 14
- [ ] Liegt ein Messpunkt in der Entformungsschräge? → Fall 15
- [ ] Trifft ein Strahl die gemeinte Fläche? → Fall 16
- [ ] Ist jede Abweichung über 0,1 mm erklärt? → nicht „ungefähr"
- [ ] Bei Schlüsselflächen: Silhouette abgetastet? → Fall 11
- [ ] Wird ein Katalogmaß, das aus einer Core-Funktion kommt, wirklich abgetastet? → Fall 20
- [ ] Bei geschlossenen Körpern: zwei Achsenstrahlen, Differenz > 0? → Fall 21
- [ ] Ist die Abweichung ein exaktes Vielfaches eines Fasenmaßes? → Fall 23
- [ ] Bei Durchgangslöchern: Bohrungsradius gemessen, nicht Ja/Nein? → Fall 25
- [ ] Bei symmetrisch angeordneten Teilen: Box symmetrisch UND Vertexverteilung gleich? → Fall 24
- [ ] Jede neue Messung mit einer Gegenprobe geprüft, die einen anderen Wert liefern muss? → Fall 25
- [ ] Liefert eine Messung NaN? Dann ist sie ausgefallen, nicht bestanden → Fall 26
- [ ] Wächst die Abweichung mit der Größe? Dann keine Fase, sondern Segmentierung → Fall 27
- [ ] Jede gedeutete Spaltenbeziehung über ALLE Zeilen durchgerechnet, Vorzeichen geprüft? → Fall 28
- [ ] Hat jedes modellbestimmende Tabellenmaß seine eigene Messung? → Fall 28
- [ ] Nicht deutbare Spalten im Kommentar benannt statt weggelassen? → Fall 29
- [ ] Führt der Prüfbericht eine Pflichtprüfung als offen? Dann NICHT `fertig` → Fall 30
- [ ] Bei widersprüchlichen Vorgaben: Rangfolge angewandt und Widerspruch dokumentiert? → Fall 31
- [ ] Wird eine Längenprüfung negativ? Dann durchdringen sich zwei Teile → Fall 31
- [ ] Wird ein Begriff an zwei Stellen verschieden geprüft? Ein Prädikat für alle → Fall 32
- [ ] Haben alle Kacheln genau eine Höhe? → Fall 33
