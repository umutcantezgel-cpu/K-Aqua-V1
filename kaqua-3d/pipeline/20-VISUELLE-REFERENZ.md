# 20 — VISUELLE REFERENZ

**Das wichtigste Dokument dieser Pipeline.**

Du kannst Bilder möglicherweise nicht so genau lesen wie nötig. Dieses
Dokument ersetzt das Sehen: es beschreibt in Worten, **wie die K-Aqua-Teile
aussehen** und woran man ein falsches Modell erkennt.

Alles hier steht, ist an echten Katalogfotos gemessen — nicht geschätzt.

---

## 1 · Der Werkstoffeindruck

### 1.1 PP-R grün — der Grundwerkstoff

Der Farbwert ist **verifiziert**, nicht angenommen. Katalogfoto der Muffe und
Modellrender wurden pixelweise abgetastet:

| | Hex | R | G | B | Helligkeit |
|---|---|---|---|---|---|
| Katalogfoto (Mittelton) | `#37ad7d` | 55 | 173 | 125 | 144,4 |
| Modell (Mittelton) | `#39a977` | 57 | 169 | 119 | 141,6 |

Abweichung 2 %, maximal 6 von 255 pro Kanal. **Der Materialschlüssel
`pprGreen` ist damit richtig eingestellt. Nicht daran drehen.**

Wichtig für das Verständnis: `PPR_GREEN = #17A46B` in `core/materials.js` ist
der **Albedo**-Wert, nicht der Bildschirmwert. Unter der Studiobeleuchtung der
Bühne ergibt er die oben gemessenen `#39a977`. Wer den Albedo auf `#37ad7d`
setzt, macht das Teil zu hell.

**Wie PP-R im Foto aussieht:**

- **Nicht glänzend, nicht matt** — ein weicher, halbmatter Kunststoffglanz.
  Ein breites, diffuses Glanzband auf der Oberseite, keine scharfe Spiegelung.
- **Leicht durchscheinend an dünnen Kanten.** An der Mundlochkante wird das
  Grün heller, weil Licht durch das Material tritt.
- **Nie gleichmäßig glatt.** Spritzguss-PP hat eine feine, unregelmäßige
  Oberflächenstruktur. Der Core setzt sie als prozedurale Roughness-Variation
  um (`noiseTexture`), Amplitude etwa ±6 %.
- **Die Formtrennnaht ist sichtbar.** Eine feine umlaufende Linie in der Mitte
  des Teils, wo die beiden Werkzeughälften zusammenkommen. Im Modell 0,09 mm
  Grat — das reicht, damit sie Licht fängt.

### 1.2 Messing — bei allen Übergangsteilen

Warmes Goldgelb, `#C9A227`, deutlich metallisch (`metalness: 1`,
`roughness: 0.3`). Im Foto:

- **Scharfe, helle Glanzlichter** an den Sechskantkanten — anders als der
  weiche PP-Glanz.
- **Gedrehte Oberfläche:** feine, regelmäßige Ringe quer zur Achse. Nicht
  poliert, nicht gebürstet.
- **Gewindegänge werfen harte Schatten.** Das Gewinde ist im Foto als
  Reihe feiner dunkler Linien erkennbar, nicht als glatter Kegel.

### 1.3 Weitere Werkstoffe

| Schlüssel | Aussehen im Foto |
|---|---|
| `chrome` | Spiegelnd, kühl, fast weiß. Bei Unterputzventilen. |
| `steel` | Mattgrau, leicht metallisch. Spindeln, Einlegeteile. |
| `ptfe` | Elfenbein-weiß, matt, kein Glanz. Kugelsitze. |
| `epdm` | Tiefschwarz, matt, ein Hauch Seidenglanz an Kanten. Dichtungen. |
| `anthracite` | Dunkelgrau mit deutlichem Klarlackglanz. Hebel, Handräder. |
| `pprPurple` | Violett wie `pprGreen` in Struktur. Betriebswasserrohr. |
| `pprUvBlack` | Tiefschwarz, halbmatt. UV-Außenschicht der Rohre. |
| `fiberLayer` | Dunkleres, stumpferes Grün. Nur im Schnitt sichtbar. |
| `redStripe` / `blueStripe` / `greyStripe` | Kennstreifen. Gleiches PP-Rezept, andere Farbe. **Kein Metall.** |

**Warnung aus einem echten Fehler:** für den grauen Kennstreifen war zunächst
`steel` verwendet worden — ein Metallmaterial mit `metalness: 0.85` für einen
coextrudierten Kunststoffstreifen. Im Schnitt sichtbar falsch. Kennstreifen
sind **immer** PP.

---

## 2 · Die Formensprache der Fittings

Alle K-Aqua-Formteile folgen demselben Gestaltungskanon. Wer davon abweicht,
baut ein Teil, das nicht zur Familie gehört.

### 2.1 Was jedes Muffenende hat

Von außen nach innen, in dieser Reihenfolge:

1. **Ein Bund am Mundloch.** Der Außendurchmesser steigt kurz vor der
   Stirnfläche um etwa 0,3 mm an. Im Foto als feine umlaufende Stufe
   sichtbar, etwa 3–5 mm vor dem Ende.
   → **`D` liegt auf diesem Bund, nicht auf dem Zylinder dahinter.** Das war
   ein echter Fehler: der Bund saß über `D` und das Teil war 0,69 mm zu dick.
2. **Eine Kantenrundung am Mundloch**, Radius etwa 0,08 · D. Keine Fase — ein
   Radius. Eine Fase liest sich zu scharf.
3. **Eine Einführfase innen**, 15° über etwa 2 mm. Sie führt das Rohr ein.
4. **Ein Muffenkonus**, 0,6° nach innen verjüngend. Die Muffe ist am Mundloch
   weiter als am Grund — dadurch klemmt das Rohr beim Einschieben.
5. **Ein Muffengrund** mit weichem Übergang auf die Bohrung, Radius etwa 1 mm.

### 2.2 Die Mantelfläche

- **Leicht tonnig, nicht zylindrisch.** Das Maximum liegt auf der
  Formteilungsebene (Mitte). Der Unterschied ist klein — etwa 2 % der
  Wandstärke — aber im Foto als weiche Wölbung erkennbar.
- **1° Entformungsschräge** zu jeder Stirnfläche hin. Das Teil ist in der
  Mitte am dicksten.
- **Auswerferstift-Marken** auf der Unterseite: flache Kreise, 0,1 mm
  vertieft, Durchmesser etwa 0,05 · d. Zwei bis drei pro Teil. Ohne sie sieht
  das Modell nach CAD-Viewer aus statt nach Spritzgussteil.

### 2.3 Übergänge zwischen Flächen

**Keine harten Kanten.** Jede Ecke trägt einen Radius oder eine Fase,
Minimum 0,3 mm. Der Core setzt das in `buildProfile` durch.

**Aber: kein Radius auf eine Kante, die keine ist.** Ein echter Fehler bei der
Kappe: auf dem Übergang Zylinder → Kalotte saß ein Fillet von 2,15 mm.
Die Kalotte verlässt den Zylinder aber ohnehin tangential — der Fillet hat die
Tangente aufgerissen und eine sichtbare Schulterlinie erzeugt, die das
Original nicht hat. Im Foto geht der Zylinder **stufenlos** in die Kalotte
über.

---

## 3 · Die 21 fertigen Produkte als visuelle Vorlage

Wenn du ein Produkt baust, das einem fertigen ähnelt: **lies dessen
`parts.js`.** Das ist die verlässlichste Referenz, die es gibt.

| Neues Produkt | Vorlage | Was übernehmen |
|---|---|---|
| Muffenartige (Plug, E-Muffe, Verlängerung) | `products/socket/parts.js` | Bund, Konus, Einführfase, Auswerfermarken |
| Kappenartige (Stopfen) | `products/cap/parts.js` | Kalotte tangential, Anspritzpunkt |
| Winkel, Bögen | `products/_bend/parts.js` | veränderlicher Querschnitt über `sweepPath` |
| Abzweige (T, Kreuz, Sattel) | `products/_tee/parts.js` | `branchJoin`, Kehle, Eintauchtiefe |
| Gewindeteile | `products/adaptor-socket-male-thread/parts.js` | Sechskant, `threadProfile`, Verbundaufbau |
| Rohre | `products/_pipe/parts.js` | `tubeLayers`, Kennstreifen |
| Reduzierteile | `products/reducing-bush/parts.js` | zwei Nennweiten, Zapfen + Kragen |

---

## 4 · Produktbeschreibungen für die 50 offenen

Hier steht, **wie jedes Teil aussieht**. Gelesen aus den Katalogfotos.

### 4.1 Formteile

**Stopfen (`plug`)** — Kurzer Zapfen mit Bund, verschließt eine Muffe von
innen. Sieht aus wie eine Reduzierbuchse ohne Innenbohrung: dicker Zapfen Ø d,
davor ein flacher Bund. Die Stirnseite ist **geschlossen und leicht gewölbt**,
nicht flach. Am Bund zwei bis vier Griffrippen, damit man ihn von Hand
eindrücken kann.

**Elektroschweißmuffe (`electrofusion-socket`)** — Eine Muffe, aus deren
Mantelfläche **zwei Kontaktstifte** senkrecht herausstehen: Zylinder von etwa
4 mm Durchmesser, 10–14 mm hoch, achsparallel nebeneinander. Sie sitzen mittig
auf der Oberseite. Im Foto sind sie orange oder schwarz — es sind
Kontakthülsen, kein PP. Innen liegt ein Heizdraht, im Schnitt als feine
Wendel sichtbar. Die Mantelfläche ist **glatt**, nicht geriffelt.

**Reparaturstopfen (`repairing-plug`)** — Kegeliger Zapfen, der in eine
gebohrte Leckstelle geschweißt wird. Sieht aus wie ein Pilz: konischer Schaft
(etwa 6° Kegel), darauf ein flacher runder Kopf mit etwa 2 mm Höhe. Der Kopf
hat einen Innensechskant oder Schlitz zum Ansetzen des Schweißwerkzeugs.

**Verlängerungsstück (`elongation-pieces`)** — Ein Rohrstück mit **Muffe an
einem Ende und Zapfen am anderen**. Asymmetrisch — das unterscheidet es von der
Muffe. Länge deutlich größer als der Durchmesser.

**Flachdichtung (`flat-gasket`, `flat-gasket-for-unions`)** — Ein flacher
Ring aus EPDM. Schwarz, matt, Dicke 2–3 mm. Die Kanten sind **nicht
verrundet** — es ist ein Stanzteil. Innen- und Außendurchmesser scharf.

**Übergangsstück mit Flansch (`flange-adaptor`)** — Ein Muffenstück, dessen
eines Ende in eine **breite flache Scheibe** übergeht: die Dichtfläche des
Flanschs. Die Scheibe hat einen Durchmesser von etwa 2 · d und eine Dicke von
etwa 0,25 · d. Auf der Dichtfläche liegt ein umlaufender **Wulst** von etwa
1,5 mm Höhe (die Dichtlippe). **Keine Schraubenlöcher** — die sitzen im
Losflansch.

**Losflansch (`backing-flange`)** — Eine Stahl- oder PP-Scheibe mit
**Schraubenlöchern auf einem Lochkreis**. Im Foto grau (Stahl) oder grün (PP).
Vier bis acht Löcher, gleichmäßig verteilt. Die Scheibe hat eine zentrale
Bohrung, durch die das Rohr läuft, und einen Innenabsatz, auf dem der
Flanschbund des Adaptors aufliegt.

**Rohrschelle (`pipe-clamps`)** — Zweiteilig: ein Halbring mit Fußplatte und
ein Halbring als Deckel, verbunden durch eine Schraube. Der Fuß hat ein
Gewindeloch (M8 oder M10) zur Wandmontage. Innen liegt oft ein Gummiband.

### 4.2 Übergangsteile mit Gewinde

**Grundregel für alle:** PP-R-Körper grün, Gewindeteil Messing. Die Fügestelle
ist im Schnitt sichtbar. Der Messingteil hat **immer** einen Sechskant zum
Gegenhalten.

**Übergangsmuffe Innengewinde (`adaptor-socket-female-thread`)** —
Wie die Außengewinde-Variante, aber der Messingteil ist eine **Hülse mit
Innengewinde** statt eines Zapfens. Im Foto sieht man in die Öffnung hinein
und erkennt die Gewindegänge auf der Innenwand. Der Messingring ist an der
Stirnseite als **schmaler goldener Kreis** sichtbar, der Rest steckt im PP.
Der PP-Körper ist außen geriffelt.

**Metallverschraubung (`metal-union-female-thread`, `-male-thread`, und die
beiden Messing-Varianten)** — **Dreiteilig**, das ist das Kennzeichen: ein
PP-R-Zapfenstück, eine PP-R-Überwurfmutter mit Riffelung, und ein
Messing-Gewindeteil. Die Mutter ist **lösbar** — deshalb hat sie eine
deutliche, tiefe Riffelung (12 Riffel typisch, 1,5 mm tief) zum Greifen.
Zwischen Messingteil und Zapfen liegt eine **Flachdichtung**.
In der Explosionsansicht müssen alle vier Teile getrennt sichtbar sein.

**Winkel 90° mit Außengewinde (`elbow-90-male-thread`)** — Ein Winkel, dessen
einer Schenkel in einem Messing-Gewindezapfen endet. Der andere ist eine
normale Schweißmuffe.

**T-Stück mit Innen-/Außengewinde (`tee-90-female-thread`, `-male-thread`)** —
T-Stück, dessen **Abzweig** das Gewinde trägt. Durchgang bleibt PP-Muffe.

**Winkel mit Befestigungslasche (`elbow-bracket-90-female-thread`,
`elbow-wall-bracket-90-…`)** — Ein Gewindewinkel mit einer **flachen
rechteckigen Lasche** am Rücken, in der zwei Schraubenlöcher sitzen. Die
Lasche liegt in der Ebene des Winkels und ist etwa 3–4 mm dick. Bei der
Wandvariante steht sie senkrecht ab, bei der anderen liegt sie parallel.

**Übergangsmuffe/Winkel Messing gelb (`…-brass`)** — Baugleich zu den
PP-Varianten, aber das Metallteil ist **CW617N Messing** statt vernickelt:
wärmeres Gold, sichtbare Drehriefen.

### 4.3 Abzweige und Sättel

**Anbohrsattel (`weld-in-saddle`, `-female-thread`, `-male-thread`)** — Ein
**Sattel**, kein Rohrstück: eine gekrümmte Platte, die sich an die Außenseite
eines Rohres anlegt, mit einem senkrechten Abzweigstutzen. Die Unterseite ist
**zylindrisch hohl** mit dem Radius des Trägerrohres. Die Platte ist oval,
etwa 2 · d lang und 1,5 · d breit, Dicke 4–6 mm. Der Übergang Platte → Stutzen
hat eine große Kehle.

**Reduzier-T-Stück (`reducing-tee`, `reducing-tee-large`)** — T-Stück, dessen
Abzweig eine **kleinere Nennweite** hat als der Durchgang. Zwei Nennweiten,
`sizeKey` nötig. Der Abzweig ist sichtbar dünner, die Kehle asymmetrisch.

**Kreuzung (`cross-over`, `cross-over-pipe`)** — Ein **U-förmiger Bogen**, der
über ein anderes Rohr hinwegführt. Zwei 90°-Bögen und ein gerades Stück
dazwischen. Beide Enden liegen auf derselben Achse und zeigen in dieselbe
Richtung. Bei der `-pipe`-Variante ist das Mittelstück länger.

### 4.4 Armaturen

**Kugelhahn Messing (`pp-r-ball-valve-brass`)** — Wie der fertige
`ball-valve-pp`, aber die Kugel ist **verchromtes Messing** statt PP: spiegelnd
statt grün. Sonst maßgleich. **Vorlage:** `products/ball-valve-pp/` kopieren,
Materialzuordnung der Kugel auf `chrome` ändern.

**Geradsitzventil (`straight-seat-valve-green-handle`)** — Ein Ventil mit
**Handrad** statt Hebel. Das Handrad ist grün, flach, mit sechs bis acht
Speichen oder als Vollscheibe mit Griffrippen. Die Spindel steht senkrecht.
Anders als beim Kugelhahn dreht das Handrad **mehrere Umdrehungen** — die
Kinematik ist eine Hubbewegung, nicht eine Vierteldrehung.

**Unterputzventil (`concealed-valve-chrome-heavy-part`, `-light-part`)** — Ein
Ventilkörper mit **verchromter Rosette und Griff**. Das „schwere Teil" ist der
Einbaukörper, das „leichte Teil" die sichtbare Abdeckung mit Griff. Chrom
spiegelnd, PP-Körper grün.

**Batterie (`battery-female-thread`, `adjustable-battery-female-thread`)** —
Ein **Doppelanschluss** für Armaturen: zwei parallele Gewindeanschlüsse in
festem Abstand (meist 150 mm), verbunden durch einen Steg. Bei der
verstellbaren Variante ist der Abstand über Exzenter veränderlich.

**T-Stück mit Innenventil (`tee-90-female-thread-internal-valve`)** — T-Stück,
in dessen Abzweig ein kleines Absperrventil sitzt. Der Abzweig trägt oben
einen Schlitz oder Innensechskant zum Betätigen.

### 4.5 Werkzeuge und Maschinen

**Diese Gruppe hat keine Rohrgeometrie.** Sie folgt einer eigenen
Formensprache und ist die schwierigste Gruppe. Lies `70-ARBEITSAUFTRAEGE §5`
vor dem Start.

**Schweißwerkzeug (`welding-tool`)** — Ein Paar: ein **Dorn** (male) und eine
**Buchse** (female), beide mit PTFE-Beschichtung (mattschwarz oder
bronzefarben). Der Dorn ist konisch, die Buchse hat eine konische Bohrung.
Beide haben ein M-Gewinde zum Einschrauben in die Schweißmaschine.

**Rohrschere (`pipe-cutter-20-40`, `-50-125`)** — Zwei Griffe, eine Klinge,
ein Gegenhalter. Griffe rot oder schwarz, Klinge Stahl. Die 50-125-Variante
hat einen Ratschenmechanismus.

**Handschweißmaschine (`hand-welding-machine-…`)** — Ein Heizschwert oder
-spiegel (rund, verchromt oder PTFE-beschichtet) mit Griff und Kabel. Auf dem
Spiegel sitzen die Werkzeugpaare.

**Elektroschweißgerät, Stumpfschweißmaschine** — Kastenförmige Geräte mit
Bedienfeld. **Nicht rotationssymmetrisch.** Hier ist `roundedPad` und
`loft` die Grundlage, nicht `revolve`.

---

## 5 · Woran man ein falsches Modell erkennt

Diese Liste ist aus echten Fehlern entstanden. Prüfe jeden Punkt am Render.

| Symptom | Ursache | Fall im Fehlerkatalog |
|---|---|---|
| Silhouette ist ein perfekter Kreis, wo ein Sechskant sein soll | Rotationskörper hat den Umkreisradius und umhüllt den Sechskant | 11 |
| Sichtbare Schulterlinie zwischen Zylinder und Kalotte | Fillet auf einer tangentialen Fuge | 5 |
| Teil wirkt wie aus dem CAD-Viewer | Auswerfermarken, Formtrennnaht, Riffelung fehlen | — |
| Mundlochkante wirkt scharf | Fase statt Radius | 5 |
| Mantellinie schnurgerade | Tonnigkeit fehlt | 5 |
| Kennstreifen glänzt metallisch | `steel` statt `greyStripe` | 9 |
| Bohrung wirkt zu weit | `bore = d` statt `d − 2·s` | — |
| Teil ist 0,7 mm zu dick | Bund über statt auf dem Nennmaß | 6 |
| Winkel ist zu lang | Vorzeichenfehler in der Bahn | 10 |
| Nur ein Werkstoff, obwohl das Foto zwei zeigt | Verbundteil als Einzelteil gebaut | — |

---

## 6 · Wie du die Sichtprüfung machst

Ohne verlässliche Bildwahrnehmung ist der Vergleich mit dem Foto schwierig.
Nutze deshalb die **messbaren Ersatzprüfungen**:

```js
// 1. Silhouette abtasten — beweist, ob Flächen die Außenform bilden
const buckets = new Array(72).fill(0);
mesh.geometry.attributes.position; // über alle Vertices im Bereich x0±dx
// Radius je 5°-Bucket maximieren, dann:
// Spanne 0 = perfekter Kreis · Spanne > 0 = Kanten vorhanden

// 2. Verhältnisprüfung gegen die Tabelle
// l/D, L/d, h/D — diese Verhältnisse sind im Katalogfoto messbar
// und müssen im Modell gleich sein

// 3. Werkstoffzahl
built.parts.length  // muss der Zahl der Werkstoffe im Foto entsprechen
```

Die Silhouetten-Abtastung hat den unsichtbaren Sechskant gefunden, den der
Maßtest durchgelassen hatte. **Nutze sie bei jedem Teil mit Schlüsselflächen,
Riffelung oder Rippen.**
