# 30 — PHASENPLAN

Fünf Phasen je Produkt. **In dieser Reihenfolge.** Wer bei Phase 3 anfängt,
baut ein Modell mit falschen Maßen.

---

## Phase 1 — Datenermittlung

Die teuerste Phase, wenn man sie überspringt. Zwölf Mal hat sich das bestätigt.

### 1.1 Screenshot finden

```
K-Aqua Unterseitem Kopie/
├── Fittings K-Aqua/              PDF, 3 Seiten je Produkt
├── Piepes K-Aqua/                PDF
├── weld-in-saddles K-Aqua/       PDF
├── Transition Fittings K-Aqua/   PNG, eine hohe Seite (3004 × ~9600)
├── Valves K-Aqua/                PNG
└── Accessories K-Aqua/           PNG
```

Der Dateiname enthält den Slug: `…-fittings-cap-2026-…pdf` → `fittings/cap`.

### 1.2 Seitenbilder erzeugen (nur PDF)

Die PDFs enthalten die Seiten als eingebettete JPEGs (3004 × 3949 px). Sie
lassen sich ohne PDF-Bibliothek herausschneiden — das ist schneller und
zuverlässiger als Rendern:

```js
const u8 = new Uint8Array(await (await readFileBinary(pfad)).arrayBuffer());
const starts = [];
for (let i = 0; i < u8.length - 3; i++)
  if (u8[i] === 0xFF && u8[i+1] === 0xD8 && u8[i+2] === 0xFF) starts.push(i);
let k = 0;
for (const from of starts) {
  let to = -1;
  for (let i = from + 2; i < u8.length - 1; i++)
    if (u8[i] === 0xFF && u8[i+1] === 0xD9) { to = i + 2; break; }
  if (to < 0 || to - from < 20000) continue;   // Logos aussortieren
  await saveFile('quellen/x-' + slug + '-p' + (++k) + '.jpg',
    new Blob([u8.subarray(from, to)], { type: 'image/jpeg' }));
}
```

PNG-Dateien direkt verwenden.

### 1.3 Composite bauen — das entscheidende Werkzeug

Mehrere Tabellenausschnitte in **ein** Bild montieren und in einem Durchgang
lesen. Zwei bis drei Tabellen pro Bild sind gut lesbar.

```js
const c = createCanvas(1460, 1600);
const x = c.getContext('2d');
x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height);
x.imageSmoothingQuality = 'high';
let y = 0;
for (const n of ['slug-a', 'slug-b', 'slug-c']) {
  x.fillStyle = '#0f172a'; x.font = 'bold 20px sans-serif';
  x.fillText(n, 8, y + 19);                        // Beschriftung ist Pflicht
  const p1 = await readImage('quellen/x-' + n + '-p1.jpg');
  x.drawImage(p1, 120, 2810, 1790, 1140, 8, y + 26, 1444, 500);
  y += 533;
}
await saveFile('quellen/composite.png', c);
```

**Bewährte Zuschnittfenster** (Quellbild 3004 × 3949):

| Inhalt | PDF-Seite 1 | PNG (hohe Seite) |
|---|---|---|
| Produktfoto | y 1960…2600 | y 1700…2600 |
| Zeichnungsminiatur | direkt unter dem Foto, ~270 × 130 px | dito |
| Tabellenkopf + erste Zeilen | y 2810…3950 | y 2680…4440 |
| Fortsetzung | Seite 2, y 0…700 | weiter unten auf derselben Seite |

### 1.4 Tabelle vollständig ablesen

**Pflicht:**

- [ ] alle Zeilen, über Seitenumbrüche hinweg (→ Fehlerkatalog Fall 2)
- [ ] alle Spalten, auch die durchgehend leeren (notieren, dass sie leer sind)
- [ ] Spaltenköpfe **wörtlich** — `S min.` ist nicht `s`
- [ ] Kopfzeile über der Tabelle (SDR, Druckstufe, Lieferlänge)
- [ ] Fußnoten unter der Tabelle
- [ ] Sternchen an Artikelnummern oder Werten

Eine Spalte, die in **jeder** Zeile einen Gedankenstrich trägt, gilt für eine
andere Bauform (meist Stumpfschweißen). Nicht übernehmen, aber im Kommentar
erwähnen.

### 1.5 Gegenproben rechnen

**Vor** dem Modellieren. Jede Regel, die bricht, bedeutet eine falsche Deutung.

| Prüfung | Gilt für |
|---|---|
| `D − 2·s = Di` | alle Rohre — hat einen echten Ablesefehler gefunden |
| `D > d` | nur wenn `D` wirklich das größte Maß ist (→ Fall 3) |
| `L = 2·l` | symmetrische Abzweige, kleine Rundungen normal |
| `(l − z)/2` gegen `fusionDepth(d)` | Muffen: trifft exakt. Winkel/T: streut (→ Fall 4) |
| Spalte gegen `d` **und** `d1` korrelieren | Reduzierteile |
| `l/D` gegen das Foto | Verhältnis am Bild messbar |

### 1.6 Zeichnung ablesen

Die Miniatur neben dem Produktfoto. Sie liefert:

- **Maßschlüssel** — was jede Spalte bedeutet
- **Werkstoff** wörtlich (`PP-R`, `PP-RCT`, `PP-R GF`)
- **Farbe** wörtlich (`green with 4 grey stripes`) → Fall 9
- **Normen**

Wenn die Miniatur nicht lesbar ist: **melden, nicht raten.** Format in
`00-START-HIER §Wenn du nicht weiterkommst`.

### 1.7 Abweichungen dokumentieren

Vergleich mit `docs Unterseiten/<slug>.md`. Alles notieren:

```
1. Markdown führt 7 von 14 Größen. Es fehlen d90, d110, d125, d160…
2. Markdown führt Code · d · L · kg. Quelle führt Code · d · D · l · L · s · kg.
3. Die als „L" geführten Werte sind die Spalte l.
4. Artikelnummer d63: Markdown AQ27065, Quelle AQ27063.
```

Danach eine korrigierte Fassung in `produkt-markdown/<kategorie>/<slug>.md`.

---

## Phase 2 — Parametrik

`params.js` schreiben. **Jedes abgeleitete Maß wird gerechnet, nie
hartkodiert.**

```js
import { D2R, fusionDepth } from '../../core/index.js';
import { article } from './data.js';

export function params(key) {
  const a = article(key);
  const P = Object.assign({}, a);

  // Rang 1: direkt aus der Tabelle
  P.len = a.l;
  P.OD = a.D;
  P.rOut = a.D / 2;

  // Rang 2: gerechnet
  P.wallFitting = (a.D - a.d) / 2;
  P.socket = fusionDepth(a.d) ?? Math.max(10, a.d * 0.55);

  // Rang 3: Fachwissen, als ASSUMPTION markiert
  /* ASSUMPTION Kehlradius: die Tabelle führt keinen. Angesetzt 0,18·d —
     der Wert, bei dem die Kehle im Katalogfoto rund ausläuft, ohne die
     Abzweigmuffe zu verkürzen. Gegen die Zeichnung zu verifizieren. */
  P.filletR = Math.max(1.5, 0.18 * a.d);

  // Konstanten des Systems
  P.sockTaper = Math.tan(0.6 * D2R);   // Muffenkonus
  P.lead = 2 * Math.tan(15 * D2R);     // Einführfase

  // Wächter: brich ab, statt Unsinn zu modellieren
  if (P.wallFitting < 3) {
    throw new Error('K-Aqua <Produkt> ' + key + ': Restwand ' +
      P.wallFitting.toFixed(2) + ' mm < 3 mm');
  }
  return P;
}
```

**Die Wächter sind kein Zierrat.** Sie haben mehrfach falsche Tabellenwerte
und falsche Deutungen aufgedeckt, bevor Zeit in die Geometrie ging.

---

## Phase 3 — Geometrie

`parts.js` schreiben. Ausschließlich Core-Funktionen — siehe
`60-GEOMETRIE-HANDBUCH.md`.

**Vorgehen:**

1. Das ähnlichste fertige Produkt finden (`20-VISUELLE-REFERENZ §3`)
2. Dessen `parts.js` **lesen**
3. Die Konturpunkte an die neue Tabelle anpassen
4. Nichts erfinden, was das Vorbild nicht hat

**Die Reihenfolge einer Muffenkontur** — außen von der Formteilungsebene zur
Stirnfläche, dann innen zurück:

```js
const outer = [
  { a: 0,          r: rBarrel + 0.09, fillet: 0.1 },   // Formtrennnaht
  { a: 0.5,        r: rBarrel,        fillet: 0.35 },
  { a: xBell - 1.5, r: rBarrel - DRAFT * (xBell - 1.5), fillet: 2.2 },
  { a: xBell,      r: ro,             fillet: 1.0 },   // Bund AUF D
  { a: P.xEnd,     r: ro - DRAFT * (P.xEnd - xBell),
    chamfer: Math.min(1.4, P.wallFitting * 0.4) },
];
const inner = [
  { a: 0,                 r: P.boreR,  fillet: 0.5 },
  { a: xEnd - P.socket,   r: P.boreR,  fillet: 1.2 },
  { a: xEnd - P.socket,   r: rSock(…), fillet: 1.2 },  // Muffengrund
  { a: xEnd - 2,          r: rSock(…), fillet: 0.4 },
  { a: xEnd,              r: P.d / 2 + P.lead, fillet: 0 },  // Einführfase
];
const profile = buildProfile(mirrorProfile(outer, inner), { segs: 4 });
```

**Nicht vergessen** (sonst sieht das Teil nach CAD-Viewer aus):

- Formtrennnaht: 0,09 mm Grat auf der Mittelebene
- Auswerfermarken: 2–3 flache Kreise, 0,1 mm vertieft, auf der Unterseite
- 1° Entformung zu jeder Stirnfläche
- leichte Tonnigkeit der Mantelfläche

---

## Phase 4 — Zusammenbau und Prüfung

`index.js` nach `50-PRODUKT-VERTRAG.md`.

### 4.1 Der Maßtest

```js
A.measures = [
  { key: 'l', label: DIMENSION_KEY.l, soll: P.len,
    ist: () => { const b = A.boxOf(['body']); return b.max.x - b.min.x; } },
  { key: 'D', label: DIMENSION_KEY.D, soll: P.OD,
    ist: () => { const b = A.boxOf(['body']); return b.max.z - b.min.z; } },
  { key: 'restwand', label: 'Restwand', soll: P.restwand, ist: () => P.restwand },
];
```

**Jede Messung muss die gebaute Geometrie auswerten.** Gib nie einen
`P.`-Wert zurück, außer bei Größen, die per Definition Parameter sind — und
benenne die dann so. → Fehlerkatalog Gruppe C.

### 4.2 Fahren

```js
// Im Browser, nach dem Laden:
const r = window.kaqua.measureAll();
Math.max(...r.flatMap(x => x.rows.map(m => Math.abs(m.diff))));   // ≤ 0,3
r.flatMap(x => x.rows.map(m => ({ g: x.d, k: m.key, s: m.soll, i: m.ist })))
 .filter(x => Math.abs(x.i - x.s) > 0.3);                          // muss []
```

### 4.3 Silhouettenprüfung

Bei jedem Teil mit Schlüsselflächen, Riffelung oder Rippen. Sie hat den
unsichtbaren Sechskant gefunden, den der Maßtest durchließ.

```js
const buckets = new Array(72).fill(0);
gruppe.traverse((o) => {
  if (!o.isMesh) return;
  const pos = o.geometry.attributes.position;
  for (let n = 0; n < pos.count; n++) {
    const v = new THREE.Vector3().fromBufferAttribute(pos, n);
    if (Math.abs(v.x - x0) > bereich) continue;
    const rad = Math.hypot(v.y, v.z);
    let a = Math.atan2(v.z, v.y) * 180 / Math.PI; if (a < 0) a += 360;
    const b = Math.floor(a / 5) % 72;
    if (rad > buckets[b]) buckets[b] = rad;
  }
});
// Spanne 0 = perfekter Kreis · Spanne > 0 = Kanten bilden die Außenform
```

### 4.4 Fehlerkatalog durchgehen

Die Prüfliste am Ende von `40-FEHLERKATALOG.md`. Sieben Fragen, jede
beantwortet einen echten Fehler.

---

## Phase 5 — Abgabe

### 5.1 Prüfbericht

`pruefung/<slug>-pruefbericht.md`, mit diesen Abschnitten:

```markdown
# Prüfbericht — <Titel>

Produkt-ID `<id>` · Modul `<module>` · Referenzgröße d32
Stand <Datum>

## Phase 1 — Daten
Quelle, Größenzahl, Spaltenköpfe wörtlich.

### Abweichungen gegen docs Unterseiten/<slug>.md
Nummerierte Liste.

### Maßschlüssel
Tabelle: Symbol | Bedeutung | woher gelesen

## Phase 4 — Maßtest
Tabelle über ALLE Größen: Soll/Ist je Maß.
Größte Abweichung mit Erklärung.

### Behobene Fehler dieses Durchlaufs
Tabelle: Fund | Ursache | Behebung

## Annahmen
Tabelle: Annahme | Wert | Begründung | zu verifizieren gegen

## Abgabe
Checkliste.
```

### 5.2 Registry

`gallery/registry.js`, die Zeile des Produkts:

```js
{ id:'…', …, codes:['<erste>','<letzte>'], alle:'<alle codes klein>', n:<zahl>, status:'fertig' },
```

`alle` ist der Suchindex — **jede** Artikelnummer, klein geschrieben,
leerzeichengetrennt. Ohne sie findet die Suche nur die Randnummern.

### 5.3 Bauen

Siehe `90-PRUEFKATALOG §5`. **Jeden Schritt einzeln**, danach die Dateiliste
prüfen.

### 5.4 BAUSTAND fortschreiben

`BAUSTAND.md`: Stand-Block aktualisieren, Eintrag mit Datum, Befunden und
offenen Annahmen.
