<!-- Kopie von core/PRODUKT-VERTRAG.md. Bei Änderungen dort ändern und hierher kopieren. -->

# PRODUKT-VERTRAG

Die einzige Schnittstelle, die der Core kennt. Wer sie erfüllt, bekommt den
vollständigen Viewer — Größenwahl, Explosion, Halbschnitt mit Stencil-Caps,
Bemaßungs-Overlay, Kamera-Presets, Tastatur, WebGL-Fallback — ohne eine Zeile
UI-Code im Produkt.

**Referenzimplementierung:** `products/ball-valve-pp/` (voller Umfang, mit
Zustand) und `products/socket/` (Minimum: ein Teil, kein Zustand).

---

## 1 · Das Produktobjekt

```js
export default {
  id:          'fittings/tee',        // wie in produkt-registry.json
  module:      'kaqua-tee',           // Dateiname der Build-Ausgabe
  titleDe:     'T-Stück',
  titleEn:     'Tee',
  category:    'fittings',
  brandLine:   'K-Aqua PP-R',         // Überzeile der Metaleiste

  articles:    [ { code:'AQ13032', d:32, D:44, l:37, L:74, l1:37, z:16, kg:0.06 }, … ],
  sizes:       [20,25,32,40,50,63,75,90,110,125,160,200,250,315],
  defaultSize: 32,

  // Welche Spalte was bedeutet — treibt Metaleiste, Fallback-Tabelle, aria-label
  dimensionKey: { d:'Nennmaß', D:'Außendurchmesser', l:'Muffentiefe',
                  L:'Baulänge', l1:'Abzweiglänge', z:'Einbaulänge' },
  metaFields:  ['d','L','l1','kg'],   // was oben links steht
  dimensions:  ['L','D','l1'],        // Dokumentation: was bemaßt wird
  ariaFields:  ['d','L','D'],         // was im aria-label genannt wird

  variants:    [],                    // [] = keine Variantenwahl
  states:      null,                  // oder siehe §3
  tile:        'Ein Satz für die Galerie-Kachel.',

  build(size, variant, clipPlane) { … }   // §2
};
```

**Regeln**

| | |
|---|---|
| Einheit | **Millimeter, immer.** Die Umrechnung auf Meter macht `core/viewer.js`. Kein Produkt rechnet in Metern. |
| Ursprung | geometrische Mitte des Bauteils |
| Hauptachse | **X**. Y = oben, Z = Tiefe |
| Farben | ausschließlich Schlüssel aus `MAT`. Ein hartkodierter Farbwert im Produkt ist ein Fehler. |
| UI | gehört dem Core. Fehlt `states`, verschwindet der Auf/Zu-Knopf von selbst. |
| Geometrie | jede Grundfunktion kommt aus `core/index.js`. Brauchst du eine, die es nicht gibt: melden, nicht ins Produkt bauen. |

---

## 2 · `build(size, variant, clipPlane)`

Gibt eine Baugruppe zurück. In der Praxis ist das immer das Objekt von
`createAssembly()`, um ein paar Felder ergänzt:

```js
build(size, variant, clipPlane) {
  const P = params(size);
  const A = createAssembly({
    name: 'K-Aqua_Muffe_d' + size,
    materials: ['pprGreen'],   // Schlüssel aus MAT; jeder mit noise:true
    seed: 31,                  // bekommt automatisch eine <key>B-Variante
    clipPlane,
  });

  const body = buildBody(P);
  A.part('body', {
    name: 'Muffe',                    // Mesh- und Exportname
    label: 'Muffenkörper (PP-R)',     // Text in der Explosionsansicht
    mat: 'pprGreen',
    geo: body.geo,
    cap: body.cap,                    // Schnittfläche, aus capFromProfile()
    explode: 0,                       // Zahl = X, oder THREE.Vector3
    anchor: V3(0, P.OD / 2 + 12, 0),  // Ankerpunkt des Labels
    // mirror: true                   // um Y drehen statt spiegeln
    // parent: rotor                   // Elterngruppe, z. B. bewegliche Innenteile
    // noExplodeEntry: true            // aus parts weglassen
  });

  A.light(V3(-P.xEnd * 0.5, 0, 0));   // Innenlicht-Positionen in mm
  A.hotspot({ v: V3(…), n: V3(…), text: 'Ein fachlich korrekter Satz' });
  A.dim({ label: 'L', value: P.L, a: V3(…), b: V3(…), off: V3(…) });

  A.measures = [ { key:'L', label:'Baulänge', soll:P.L, ist:() => … } ];
  A.P = P;
  return A;
}
```

### Was `createAssembly()` mitbringt

| Feld / Methode | Wofür |
|---|---|
| `root` | `THREE.Group`, Millimeter, Ursprung = Bauteilmitte |
| `part(id, spec)` | Teil anlegen; registriert Gruppe, Schnittfläche, Explosionsvektor, Anker |
| `subgroup(name, parent)` | Zwischengruppe, z. B. ein Rotor für bewegliche Teile |
| `parts` | Vertragsliste `{ id, label, obj, explode }` — treibt die Explosionsansicht |
| `anchors` | `{ id, label, obj, v }` — aus den `anchor`-Angaben |
| `dims`, `hotspots`, `lights` | wie deklariert |
| `setExplode(t)` | verschiebt jedes Teil um `explode × t` |
| `setSection(on)` | Clipping-Ebene auf alle Basismaterialien, Stencil-Caps ein |
| `setTestMode(m)` | `'silhouette'` · `'gray'` · `null` — Prüfmodi aus Phase 4 |
| `boxOf(ids)` | `THREE.Box3` über die genannten Teile |
| `probeAxial(id, from, dir)` | Raycast; liefert den Trefferpunkt. Für Muffentiefen und Bohrungsgründe |
| `triangleCount()` | `{ tris, meshes }` |
| `own(...geo)` | Geometrien registrieren, die nicht über `part()` laufen |
| `dispose()` | gibt Geometrien, Materialien und Texturen frei |

### Was das Produkt ergänzt

| Feld | Pflicht | Wofür |
|---|---|---|
| `P` | ja | aufgelöste Parametrik, für Prüfung und Debug |
| `measures` | ja | Soll/Ist-Paare für den Maßtest über alle Größen |
| `setOpen(t)` | nur mit `states` | Kinematik. `t = 1` offen, `t = 0` geschlossen |
| `onExplode(t)` | nein | Haken, falls die Explosion mehr tun muss als verschieben |

---

## 3 · `states` — nur für Bewegliches

```js
states: {
  open:   { short: 'Offen',       note: 'Hebel parallel zur Rohrachse', action: 'Öffnen' },
  closed: { short: 'Geschlossen', note: 'Hebel quer',                   action: 'Schließen' },
  pickPart: 'lever',                          // Klick auf dieses Teil schaltet
  pickHint: 'Klick auf den Hebel schaltet',    // Zusatz in der Hinweiszeile
}
```

`action` ist die Handlung, die der Knopf auslöst — im offenen Zustand steht
`closed.action` darauf. `states: null` blendet Knopf, Zustandszeile und die
Tastenbelegung `O` aus.

---

## 4 · Minimalbeispiel

Vier Dateien. `products/socket/` ist genau das und kommt mit einem Teil aus.

```
products/<slug>/
├── data.js     ARTICLES · SIZES · DIMENSION_KEY · article(d)
├── params.js   params(dNom) — jedes abgeleitete Maß gerechnet, nie hartkodiert
├── parts.js    die Konturen, ausschließlich mit Core-Funktionen gebaut
└── index.js    das Produktobjekt
```

```js
// index.js, kürzeste lauffähige Form
import * as THREE from 'three';
import { createAssembly } from '../../core/index.js';
import { ARTICLES, SIZES, DIMENSION_KEY } from './data.js';
import { params } from './params.js';
import { buildBody } from './parts.js';

export default {
  id: 'fittings/socket', module: 'kaqua-socket',
  titleDe: 'Muffe', titleEn: 'Socket', category: 'fittings',
  articles: ARTICLES, sizes: SIZES, defaultSize: 32,
  dimensionKey: DIMENSION_KEY, metaFields: ['d', 'L', 'kg'],
  variants: [], states: null,

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({ materials: ['pprGreen'], clipPlane });
    const body = buildBody(P);
    A.part('body', { label: 'Muffenkörper (PP-R)', mat: 'pprGreen',
      geo: body.geo, cap: body.cap });
    A.measures = [{ key: 'L', label: 'Baulänge', soll: P.L,
      ist: () => { const b = A.boxOf(['body']); return b.max.x - b.min.x; } }];
    A.P = P;
    return A;
  },
};
```

Einbinden:

```js
import { mount } from '../../core/index.js';
import product from './index.js';
mount(product);                                   // voller Umfang
mount(product, { features: ['size', 'dims'] });    // reduziert
```

---

## 5 · Material-Registry

Nur diese Schlüssel, keine eigenen Farben:

```
pprGreen · pprPurple · pprUvBlack · fiberLayer · redStripe
brass · chrome · steel · ptfe · epdm · anthracite · toolRed · toolBlack
```

Zu jedem Rezept mit `noise: true` liefert `materials()` zusätzlich `<key>B`
mit zweitem Noise-Seed. Links und rechts unterschiedlich zu seeden ist
Qualitätsstandard, keine Produktentscheidung — der Kugelhahn nutzt `pprGreen`
für Korpus und Mutter, `pprGreenB` für Stutzen und Kugel.

`PPR_GREEN` ist **eine** Konstante in `core/materials.js`. Eine CI-Korrektur
ist damit eine Ein-Zeilen-Änderung über alle 71 Produkte.

---

## 6 · Geometrie-Grundfunktionen

Alles aus `core/geometry.js`, importiert über `core/index.js`.

**Profile:** `buildProfile` · `mirrorProfile` · `arcPts` · `ringGrooves` ·
`dedupe` · `expandChamfers` · `applyFillets`
**Körper:** `revolve` · `loft` · `sweepPath` · `arcPath` · `circleLoop` ·
`branchJoin` · `hexPrism` · `roundedPad` · `tubeLayers`
**Konturbausteine:** `threadProfile` · `knurl` · `grooveMod` · `ribMod` ·
`thetaSamples`
**Flächen und Merge:** `capFromProfile` · `polygonCap` · `mergeGeometries`
**Konstanten:** `D2R` · `DRAFT` (1°) · `SEG_VIS` (96) · `SEG_INT` (40) ·
`SEG_FINE` (28)

Fasen ≥ 0,3 mm und 1° Entformungsschräge sind in `buildProfile` und `DRAFT`
verankert — Core-Verhalten, nicht Produktentscheidung.
