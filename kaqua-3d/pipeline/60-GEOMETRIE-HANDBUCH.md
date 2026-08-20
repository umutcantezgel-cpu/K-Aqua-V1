# 60 — GEOMETRIE-HANDBUCH

Alle 26 Core-Funktionen mit Signatur, Zweck und Beispiel. Ein Produkt darf
**ausschließlich** diese benutzen.

Import immer über `core/index.js`:

```js
import { buildProfile, revolve, mergeGeometries, DRAFT, SEG_VIS } from '../../core/index.js';
```

---

## 0 · Das Grundprinzip

**Kein CSG.** Jede Bohrung ist Teil einer **geschlossenen Profilkontur**: die
Kontur läuft außen von einer Stirnfläche zur anderen, dann innen zurück. Der
Rotationskörper daraus ist automatisch hohl.

```
    Außenkontur  →→→→→→→→→→→→→→→→→→→→→→→→
   ┌────────────────────────────────────┐
   │                                    │  ← Material
   └────────────────────────────────────┘
    ←←←←←←←←←←←←←←←←←←←←←←←←  Innenkontur
```

Ein Profilpunkt:

```js
{ a: 12.5,        // Position auf der Achse (mm)
  r: 22.0,        // Radius (mm)
  fillet: 1.2,    // Kantenradius — ODER
  chamfer: 0.6,   // Fase (nie beides)
  w: 1 }          // optional: Gewicht für radiale Modulation (0…1)
```

---

## 1 · Konstanten

| Name | Wert | Bedeutung |
|---|---|---|
| `D2R` | π/180 | Grad → Radiant |
| `DRAFT` | tan(1°) ≈ 0,01746 | Entformungsschräge. `r - DRAFT * länge` |
| `SEG_VIS` | 96 | Umfangssegmente für **Sichtflächen** |
| `SEG_INT` | 40 | für **Innenflächen** |
| `SEG_FINE` | 28 | für **Kleinteile** (Auswerfermarken, Fasen) |

Die Segmentzahlen sind **Qualitätsstandard, keine Produktentscheidung.** Wer
sie im Produkt überschreibt, lässt die Facettierung über die Produkte
auseinanderdriften.

---

## 2 · Profile bauen

### `buildProfile(pts, opt)`

Der zentrale Einstieg. Nimmt Rohpunkte, löst Fasen in Punktpaare auf, legt
Radien als Bogenpunkte ein und entfernt Duplikate.

```js
const profile = buildProfile([
  { a: 0,  r: 10, fillet: 0.5 },
  { a: 20, r: 10, chamfer: 1.0 },
  { a: 20, r: 6,  fillet: 0.4 },
  { a: 0,  r: 6,  fillet: 0 },
], { segs: 4 });     // segs = Bogenpunkte je Radius
```

**`segs`:** 3 für Kleinteile, 4 für Standardfittings, 5–6 für große
Sichtradien. Höher kostet Dreiecke ohne sichtbaren Gewinn.

### `mirrorProfile(outerHalf, innerHalf)`

Spiegelt eine Halbkontur um `a = 0` zu einer vollständigen. Für alle
symmetrischen Teile — Muffe, T-Stück-Durchgang, Kreuz-Arm.

```js
// Nur die rechte Hälfte beschreiben, von der Mitte zur Stirnfläche:
const outer = [{ a: 0, r: 22.09, fillet: 0.1 }, /* … */ { a: 20.5, r: 22, chamfer: 1.4 }];
const inner = [{ a: 0, r: 13.6, fillet: 0.5 },  /* … */ { a: 20.5, r: 16, fillet: 0 }];
const profile = buildProfile(mirrorProfile(outer, inner), { segs: 4 });
```

**Achtung:** Bei asymmetrischen Teilen (Verlängerungsstück, Winkel
Muffe/Spitzende) ist `mirrorProfile` falsch — dort beide Hälften ausschreiben.

### `arcPts(out, ca, cr, R, t0, t1, n, extra)`

Fügt Bogenpunkte an eine Liste an. Für Kalotten, Kugelsitze, Rundungen, die
nicht als `fillet` ausdrückbar sind.

### `ringGrooves(out, a0, a1, r, n, depth, width)`

Ringnuten in eine Kontur. Für Überwurfmuttern, Stutzen, Verschraubungen.

### `dedupe`, `expandChamfers`, `applyFillets`

Werden von `buildProfile` selbst benutzt. Direkt nur nötig, wenn du eine
Kontur mehrstufig zusammensetzt.

---

## 3 · Rotationskörper

### `revolve(profile, opt)`

Das Arbeitspferd. Dreht ein Profil um eine Achse.

```js
const geo = revolve(profile, {
  axis: 'x',            // 'x' (Standard, Rohrachse) | 'y' | 'z'
  segments: SEG_VIS,    // Umfangssegmente
  thetas: undefined,    // ODER: eigene Winkelliste für Modulation
  mod: undefined,       // ODER: Modulationsfunktion (theta) => Δr
});
```

**Mit radialer Modulation** — für Riffelung, Rippen, Kennstreifen:

```js
const kn = knurl(P.rSleeve, P.ppLen, 21, 0.4);
const geo = revolve(profile, { axis: 'x', thetas: kn.thetas, mod: kn.mod });
```

Die Modulation greift nur an Punkten mit `w > 0`. So bleibt der Bund glatt,
während die Mantelfläche geriffelt ist.

### `capFromProfile(profile, axis)`

Erzeugt die **Schnittfläche** aus dem Profil — die Fläche, die im Halbschnitt
sichtbar wird. **Bei jedem Teil mitgeben**, sonst zeigt der Schnitt Löcher.

```js
return { geo: revolve(profile, { axis: 'x' }), cap: capFromProfile(profile, 'x') };
```

### `polygonCap(pts)`

Schnittfläche für Nicht-Rotationskörper (Laschen, Kehlen).

---

## 4 · Loft und Sweep

### `loft(sections, opt)`

Querschnittsfolge. Für Hebel, Griffe, Sättel, alles mit veränderlicher Form.
Alle Querschnitte brauchen **gleich viele Punkte**.

### `sweepPath(loop, path, opt)`

Querschnitt entlang einer Bahn. Die Grundlage aller Bögen.

```js
const path = bendPath(37, 90, 16, 24, 5);
const aussen = sweepPath(circleLoop(22, SEG_VIS), path);
const innen  = sweepPath(circleLoop(16, SEG_INT), path, { flip: true });
```

**Veränderlicher Querschnitt** — `loop` darf eine Funktion sein. `t` läuft
0…1 über die **Bogenlänge**, nicht über den Index:

```js
const innen = sweepPath(
  (t) => circleLoop(boreAt(P, t, pathLen), SEG_INT, 0.3),
  path, { flip: true });
```

Ohne das ist eine Muffe an einem Bogenende ohne CSG nicht darstellbar. Alle
Rückgaben müssen gleich viele Punkte haben — die Funktion prüft es und bricht
sonst mit Klartext ab.

**`flip: true`** für Innenflächen (Normalen nach innen).

### `circleLoop(r, segs, wear)`

Kreisförmige Querschnittskontur für `sweepPath`.

### `arcPath(center, R, axis, t0, t1, segs)`

Bahn auf einem Kreisbogen. Liefert `[{ c: Vector3, t: Vector3 }]`.

### `bendPath(L, angleDeg, R, arcSegs, legSegs)`

**Gerade – Bogen – Gerade.** Die Bahn eines Winkels oder Rohrbogens.

```js
const path = bendPath(37, 90, 16, 24, 5);
// L = Schenkelmaß (Achsenschnittstelle bis Stirnfläche)
// angleDeg = ABLENKWINKEL: Eintritt +X, Austritt um angleDeg gedreht
// R = Bogenradius
```

Der Bogen verbraucht `R · tan(α/2)` von jedem Schenkel. Ist `L` kleiner,
bricht die Funktion ab statt eine Bahn mit negativer Gerade zu liefern.

⚠ **In dieser Funktion steckte ein Vorzeichenfehler, der bei 90° arithmetisch
unsichtbar war** (`cos 90° = 0`). Erst der 45°-Winkel deckte ihn auf. Teste
jede neue Bahn an **zwei** Winkeln.

---

## 5 · Abzweige

### `branchJoin(opt)`

Die verrundete Kehle zwischen Hauptkörper und Abzweig.

```js
const kehle = branchJoin({
  mainR: 22,        // Radius des Hauptzylinders (Achse X)
  branchR: 22,      // Radius des Abzweigs
  filletR: 5.8,     // Kehlradius
  angle: 90,        // Winkel zur Hauptachse
  segments: SEG_VIS,
  uSegs: 6,
});
// → { geo, cap, startAt(theta), insertDepth, axis, u1, u2 }
```

**`insertDepth`** sagt, wie weit der Abzweigstutzen in den Hauptkörper
eintauchen muss. `axis`, `u1`, `u2` sind das Achsensystem des Abzweigs —
damit richtest du deinen Stutzen identisch aus.

**Bekannte Grenze:** an der Durchdringung überlappen die Innenflächen. Von
außen unsichtbar, im Halbschnitt an der Kehle sichtbar. Ohne CSG nicht anders
lösbar; **alle Maße sind davon unberührt.** Schreib das als Kommentar ins
Produkt, damit es nicht als Versehen gelesen wird.

**Für ein Kreuz:** dieselbe Kehle zweimal, die zweite um 180° um X gedreht.

**Wichtig beim Messen:** die Kehle sitzt bei `rOut + filletR` und ist damit
**breiter als der Rohrkörper**. Eine `Box3` über das ganze Teil misst sie mit.
Am Arm messen. → Fehlerkatalog Fall 16.

---

## 6 · Gewinde und Schlüsselflächen

### `threadProfile(D, pitch, turns, kind)`

Gewindekontur als Profilpunkte — **keine Helix.** Eine echte Helix kostet
zehntausende Dreiecke und ist im Katalogmaßstab nicht zu sehen. Die Kontur
reicht: Whitworth-55°-Flankenwinkel, gerundete Kuppen und Gründe.

```js
const thread = threadProfile(33.249, 2.309, 10, 'R')
  .map((p) => ({ a: xStart + p.a, r: p.r, fillet: p.fillet }));
```

| `kind` | Bedeutung |
|---|---|
| `'R'` | kegeliges Außengewinde, 1:16 verjüngend |
| `'G'` | zylindrisches Außengewinde |
| `'Rp'` | zylindrisches Innengewinde |

**Normmaße** nach ISO 7-1 / DIN 2999 — die Zollangabe bestimmt sie eindeutig:

| R | Ø außen | Steigung |
|---|---|---|
| ½" | 20,955 | 1,814 |
| ¾" | 26,441 | 1,814 |
| 1" | 33,249 | 2,309 |
| 1¼" | 41,910 | 2,309 |
| 1½" | 47,803 | 2,309 |
| 2" | 59,614 | 2,309 |
| 2½" | 75,184 | 2,309 |
| 3" | 87,884 | 2,309 |
| 4" | 113,030 | 2,309 |

### `hexPrism(af, h, filletR, bevel)`

Sechskant mit verrundeten Kanten. `af` = **Schlüsselweite** (Abstand der
Flächen), `h` = Länge in +X.

```js
const hex = hexPrism(P.af, P.hexLen, 0.3, 0);
hex.translate(hexA, 0, 0);
```

⚠ **Drei Dinge, die je einen Fehler gekostet haben:**

**1 · Orientierung.** Nach der internen `rotateY(π/2)` liegt eine
**Schlüsselfläche auf der Z-Achse** und eine **Ecke auf der Y-Achse**. Ein
Strahl in −Y misst also das Eckenmaß, ein Strahl in −Z die Schlüsselweite.

**2 · `bevel` nimmt vom Umkreis.** Bei einem Teil, dessen Eckenmaß ein
Katalogmaß ist: `bevel = 0` und `filletR` klein halten (0,3 mm).

**3 · Der Rotationskörper darunter muss auf dem INKREIS liegen** (`af/2`),
nicht auf dem Umkreis (`D/2`). Sonst umhüllt er den Sechskant, und die
Schlüsselflächen verschwinden im Material — die Silhouette wird ein perfekter
Kreis. Das ist Fehlerkatalog Fall 11, der schwerwiegendste der ersten
21 Produkte.

Zusammenhang der Maße:

```
D  = Eckenmaß  = größter Außendurchmesser  (Katalogmaß)
af = D · cos(30°)                          (Schlüsselweite)
Umkreisradius = D/2
Inkreisradius = af/2
```

### `knurl(r, h, count, depth, opt)`

Rändelung als radiale Modulation. Liefert `{ thetas, mod }` für `revolve`.

```js
const kn = knurl(33, 25, 12, 1.45);
const geo = revolve(profile, { axis: 'x', thetas: kn.thetas, mod: kn.mod });
```

Typische Werte: Überwurfmutter 12 Riffel / 1,45 mm; PP-Körper eines
Gewindeadaptors `count = Umfang/6,5` / 0,012·D.

**Beim Messen:** die Riffelung liegt planmäßig **unter** dem Nennmaß. Ein
einzelner Strahl trifft je nach Winkel Nut oder Rücken — die `Box3` erfasst
immer den Rücken. → Fall 16.

### `grooveMod`, `ribMod`, `thetaSamples`

Die Bausteine hinter `knurl`. Direkt nötig für Sonderfälle: `ribMod` für
Längsrippen (Naben, Griffe), `thetaSamples` für ungleichmäßige
Umfangsabtastung.

---

## 7 · Rohre

### `tubeLayers(d, s, layers, opt)`

Mehrschichtrohr. Jede Lage ein eigener Ring mit eigener Schnittfläche — im
Schnitt wird der Wandaufbau sichtbar, und das ist das Verkaufsargument, das
2D nicht leisten kann.

```js
const layers = tubeLayers(32, 4.4, [
  { key: 'pprGreen',   frac: 0.30, label: 'PP-R außen' },
  { key: 'fiberLayer', frac: 0.40, label: 'PP-R GF' },
  { key: 'pprGreen',   frac: 0.30, label: 'PP-R innen' },
], { length: 192, x0: -96 });
// → [{ key, label, rOuter, rInner, thickness, geo, cap }]
```

Die Anteile werden normiert; die innerste Lage endet exakt bei `d/2 − s`,
damit `bohrung = d − 2·s` stimmt.

---

## 8 · Nicht-Rotationskörper

### `roundedPad(sx, sz, h, r, bevel)`

Verrundeter Klotz. Für Laschen, Mitnehmer, Befestigungsaugen, Fußplatten.

```js
const lasche = roundedPad(40, 24, 4, 3, 0.6);
```

### `mergeGeometries(list)`

Führt Geometrien zu einer zusammen. Am Ende jedes `parts.js`.

---

## 9 · Lochkreis ohne CSG

Für Losflansch, Laschen, Rohrschellen. **Es gibt keine boolesche Subtraktion**
— die Löcher entstehen als Teil der Kontur.

**Weg A — für einen Ring mit Lochkreis:** Der Flansch ist ein
Rotationskörper. Jedes Loch ist ein **eigener Rotationskörper mit
umgekehrter Normalenrichtung**, an die Lochposition versetzt. Die Innenwand
des Lochs zeigt nach innen; das Loch selbst ist nicht „weggenommen", sondern
als Röhre modelliert, die durch die Platte führt.

```js
const geos = [revolve(plattenProfil, { axis: 'y', segments: SEG_VIS })];
for (let i = 0; i < lochzahl; i++) {
  const t = (i / lochzahl) * Math.PI * 2;
  // Lochwand: Zylinder mit Normale nach innen
  const wand = revolve(buildProfile([
    { a: 0,     r: lochR, fillet: 0.3 },
    { a: dicke, r: lochR, fillet: 0.3 },
  ], { segs: 3 }), { axis: 'y', segments: SEG_INT });
  wand.translate(lochkreisR * Math.cos(t), 0, lochkreisR * Math.sin(t));
  geos.push(wand);
}
```

**Ehrliche Grenze:** die Plattenfläche wird dadurch nicht durchbrochen. Bei
Blickrichtung senkrecht auf die Platte sieht man die Lochwand, aber die
Platte dahinter bleibt geschlossen. Für Katalogansichten ist das tragbar; im
Halbschnitt durch ein Loch fällt es auf.

**Weg B — sauberer, aber mehr Arbeit:** Die Platte als `loft` über
Querschnitte bauen, in denen die Löcher als Aussparungen der Punktfolge
liegen. Nur nötig, wenn der Halbschnitt durch ein Loch geht.

**Weg C — `THREE.Shape` mit Löchern:** `roundedPad` benutzt intern
`ExtrudeGeometry`. Eine `THREE.Shape` nimmt `holes` als Array von `Path`. Das
ist der praktikabelste Weg für Laschen und Fußplatten:

```js
// In parts.js, ausnahmsweise mit THREE direkt:
const s = new THREE.Shape();
// … Außenkontur …
const loch = new THREE.Path();
loch.absarc(x, y, lochR, 0, Math.PI * 2, true);
s.holes.push(loch);
const geo = new THREE.ExtrudeGeometry(s, { depth: dicke, bevelEnabled: true,
  bevelThickness: 0.4, bevelSize: 0.4, bevelSegments: 2 });
```

Das ist **kein CSG** — `ExtrudeGeometry` trianguliert die Kontur mit Löchern
direkt. Zulässig und für Flansche der richtige Weg.

---

## 10 · Was fehlt und wann du es melden musst

Diese Formen haben im Core **noch keine** Funktion. Wenn ein Produkt sie
braucht, **melde es**, statt sie ins Produkt zu bauen:

| Form | Wofür | Vorschlag |
|---|---|---|
| Gekrümmte Auflagefläche | Anbohrsattel | `saddleShell(rTraeger, laenge, breite, dicke)` |
| Heizdrahtwendel | Elektroschweißmuffe | `helix(r, pitch, turns, wireR)` |
| Handrad mit Speichen | Durchgangsventil | `spokeWheel(rOut, rHub, speichen, dicke)` |
| Exzenter | verstellbare Batterie | über `loft` machbar |

Eine Funktion, die ein zweites Produkt auch braucht, gehört in den Core —
nicht ins erste Produkt. Das ist die Regel, die `fusionDepth()` dorthin
gebracht hat.
