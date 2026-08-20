# Prompt 0 — Core-Refactor

**Einmalig auszuführen. Läuft vor allen anderen Prompts.**

Ziel: Aus dem fertigen Kugelhahn-Bundle einen produktneutralen Core herauslösen, damit jedes weitere der 70 Produkte nur noch drei kleine Dateien braucht statt eines kompletten Viewers.

**Mitgeben:** `k-aqua-kugelhahn-3d.html` (das bestehende Artefakt)

---

## PROMPT BEGINN

Du bist Senior Frontend-Architekt mit Schwerpunkt WebGL und Bibliotheks-Design.

## AUSGANGSLAGE

Die beigefügte Datei `k-aqua-kugelhahn-3d.html` enthält einen fertigen, hochwertigen 3D-Produktviewer für den K-Aqua PP-R Kugelhahn. Sie ist ein Bundle aus sechs Quellmodulen:

| Modul | Inhalt |
|---|---|
| `valve-data.js` | `ARTICLES`, `SIZES`, `PPR_GREEN`, `article(d)` |
| `valve-geometry.js` | `params()`, Profil-Helper (`buildProfile`, `expandChamfers`, `applyFillets`, `arcPts`, `ringGrooves`, `mirrorProfile`, `dedupe`), Rotationskörper mit radialer Modulation (`revolve`, `thetaSamples`, `grooveMod`, `ribMod`), `loft`, `capFromProfile`, `polygonCap`, `mergeGeometries`, `roundedPad` |
| `valve-parts.js` | `buildKorpus`, `buildNut`, `buildTail`, `buildBall`, `buildSeat`, `buildStem`, `buildLever`, `buildORing` |
| `valve-materials.js` | `noiseTexture`, `patchWear`, `createMaterials`, `disposeMaterials` |
| `valve-build.js` | `buildValve(d, variant, clipPlane)` |
| `valve-app.js` | Viewer-Logik: Zustände, Kamera-Presets, Overlay, Bemaßung, Hotspots, Tastatur |

Dazu die Web-Component `<three-d-stage>`: Renderer, Studio-Licht, Bodenschatten, OrbitControls, Auto-Framing, Resize, OBJ/GLTF-Export.

**Diese Codebasis ist gut. Sie wird nicht neu geschrieben, sondern aufgeteilt.**

## AUFTRAG

Zerlege sie in einen **produktneutralen Core** und ein **Produktpaket**. Nach dem Refactor muss ein neues Produkt aus genau drei Dateien bestehen: `data.js`, `params.js`, `parts.js` — plus einer `index.js`, die den Vertrag aus §3 erfüllt.

Als Beweis, dass der Schnitt sauber ist, wird der Kugelhahn selbst auf die neue Struktur portiert und muss **pixelgleich** aussehen und sich identisch verhalten wie vorher.

## ARBEITSWEISE

Kein Zeit- oder Tokenbudget. Reihenfolge:

1. **Analyse** — lies das Bundle vollständig. Erstelle eine Tabelle: jede Funktion, ist sie produktneutral oder kugelhahnspezifisch? Bei Unklarheit: „Würde ein T-Stück diese Funktion unverändert brauchen?" Wenn ja, gehört sie in den Core.
2. **Schnitt festlegen** — zeige mir die Zuordnung, bevor du Code schreibst.
3. **Core extrahieren**
4. **Kugelhahn portieren**
5. **Verifizieren** gegen §5
6. **Zweiten Prototyp bauen** — eine Muffe (`fittings/socket`) als Minimalprodukt, um zu beweisen, dass der Core trägt. Nur Geometrie, echte Maße kommen später.

Nach Schritt 3 und Schritt 5 jeweils: fünf konkrete Schwachstellen des eigenen Entwurfs benennen und beheben.

---

## §1 ZIELSTRUKTUR

```
kaqua-3d/
├── core/
│   ├── geometry.js      Profil-Helper, revolve, loft, merge, Caps, Pads
│   ├── materials.js     Material-Registry + Noise/Wear-Helfer
│   ├── stage.js         <three-d-stage> Web-Component (unverändert übernehmen)
│   ├── viewer.js        Viewer-Logik, generalisiert auf den Vertrag aus §3
│   ├── ui.js            HTML-Gerüst + CSS des Bedienrahmens
│   ├── overlay.js       Labels, Bemaßung, Hotspots, Kollisionsvermeidung
│   └── index.js         Sammelexport
├── products/
│   ├── ball-valve-pp/   data.js · params.js · parts.js · index.js
│   └── socket/          data.js · params.js · parts.js · index.js
└── build/
    └── bundle.mjs       erzeugt pro Produkt ein Standalone-HTML
```

## §2 WAS IN DEN CORE GEHÖRT

**`geometry.js`** — alles aus `valve-geometry.js` **außer** `params()`:
`dedupe`, `expandChamfers`, `applyFillets`, `buildProfile`, `mirrorProfile`, `arcPts`, `ringGrooves`, `thetaSamples`, `grooveMod`, `ribMod`, `revolve`, `capFromProfile`, `polygonCap`, `loft`, `mergeGeometries`, `roundedPad`, die Konstanten `D2R` und `DRAFT`.

Ergänze diese Helfer, die für die kommenden Produktfamilien gebraucht werden und im Kugelhahn nicht vorkommen:

| Funktion | Zweck | Wer braucht sie |
|---|---|---|
| `sweepPath(profile, path, opt)` | Profil entlang einer Bahn ziehen | Winkel 45°/90°, Überbogen |
| `branchJoin(mainProfile, branchProfile, angle, filletR)` | Abzweig mit verrundeter Kehle ansetzen | T-Stück, Kreuz, Sattel, Wandscheibe |
| `threadProfile(D, pitch, turns, kind)` | R/Rp-Gewinde als Profilkontur (kein echtes Helixgewinde) | alle Übergangsfittings |
| `hexPrism(af, h, filletR)` | Sechskant mit verrundeten Kanten | Metallverschraubungen |
| `knurl(r, h, count, depth)` | Rändelung als radiale Modulation | Verschraubungen, Werkzeuge |
| `tubeLayers(d, s, layers)` | Mehrschichtrohr mit farbigen Lagen und Schnittkante | alle 12 Rohre |

Schreibe für jede dieser Funktionen dieselbe Fasen- und Entformungslogik, die der bestehende Code schon anwendet. **Alle Kanten ≥ 0,3 mm gefast, 1° Entformungsschräge** — das ist Core-Verhalten, nicht Produktentscheidung.

**`materials.js`** — `noiseTexture` und `patchWear` unverändert. `createMaterials` wird zu einer **Registry**:

```js
export const MAT = {
  pprGreen:     { color: PPR_GREEN, roughness:.38, clearcoat:.25, … },
  pprPurple:    { color:'#8E5BA6', … },
  pprUvBlack:   { color:'#1A1A1A', roughness:.52, … },
  fiberLayer:   { color:'#0E7F55', roughness:.55, … },   // Faserverbund-Kern im Schnitt
  redStripe:    { color:'#CC1F1F', … },
  brass:        { color:'#C9A227', metalness:1, roughness:.30 },
  chrome:       { color:'#E8EAED', metalness:1, roughness:.06 },
  steel:        { color:'#9BA1A6', metalness:1, roughness:.35 },
  ptfe:         { color:'#F2F0EA', roughness:.55 },
  epdm:         { color:'#121212', roughness:.88, sheen:.3 },
  anthracite:   { color:'#23262A', roughness:.22, clearcoat:.70 },
  toolRed:      { color:'#B4232A', roughness:.35 },      // Werkzeuggriffe
  toolBlack:    { color:'#1C1C1E', roughness:.40 },
};
export function materials(keys, seed) → { key: THREE.MeshPhysicalMaterial }
export function disposeMaterials(m)
```

`PPR_GREEN` bleibt genau **eine** exportierte Konstante. Ein Produkt darf nie eine eigene Farbe hartkodieren.

**`viewer.js`** — die Logik aus `valve-app.js`, aber ohne jede Kugelhahn-Annahme. Konkret zu entfernen:
- fest verdrahtete Größenliste → kommt aus `product.sizes`
- fester Text „Hebel parallel zur Rohrachse" → kommt aus `product.states`
- die Annahme, dass es überhaupt einen Auf/Zu-Zustand gibt → optionales Feature
- feste `d`-Beschriftung der Metaleiste → kommt aus `product.dimensionKey`

Erhalten bleiben unverändert: Kamera-Presets, Explosions-Slider, Schnittebene mit Stencil-Caps, Bemaßungs-Overlay mit Kollisionsvermeidung, Innenlicht, Tastatursteuerung, WebGL-Fallback, `prefers-reduced-motion`.

## §3 DER PRODUKTVERTRAG

Jedes Produkt exportiert ein Objekt dieser Form. Der Core kennt **nur** diesen Vertrag.

```js
export default {
  id:        'fittings/tee',
  titleDe:   'T-Stück',
  titleEn:   'Tee',
  category:  'fittings',
  articles:  [ { code:'AQ13032', d:32, D:44, l:37, L:74, l1:37, z:16, kg:0.06 }, … ],
  sizes:     [20,25,32,40,50,63,75,90,110,125,160,200,250,315],
  defaultSize: 32,

  // Welche Spalte bedeutet was — treibt Metaleiste, Bemaßung und aria-label
  dimensionKey: { d:'Nennmaß', D:'Außendurchmesser', l:'Muffentiefe',
                  L:'Baulänge', l1:'Abzweiglänge', z:'Einbaulänge' },
  metaFields:   ['d','L','l1','kg'],       // was oben links steht
  dimensions:   ['L','D','l1'],            // was das Bemaßungs-Overlay zeigt

  variants: [],                            // [] = keine Variantenwahl
  states:   null,                          // oder { open:{…}, closed:{…} } für Armaturen

  build(size, variant, clipPlane) {
    return {
      root,                                // THREE.Group, Maße in mm, Ursprung = Bauteilmitte
      parts:    [ { id, label, obj, explode: THREE.Vector3 } ],
      anchors:  [ { obj, v: THREE.Vector3, label } ],
      dims:     [ { label, value, a, b, off } ],
      hotspots: [ { v, text } ],
      setOpen(t)     {},                   // nur wenn states ≠ null
      setExplode(t)  {},
      setSection(on) {},
      dispose()      {},
      P,                                   // aufgelöste Parametrik, für Debug und Tests
    };
  },
};
```

**Regeln:**
- `root` ist immer in Millimetern. Die Stage skaliert. Kein Produkt rechnet in Metern.
- Ursprung ist die geometrische Mitte des Bauteils, Hauptachse ist X.
- `parts` bestimmt die Explosionsansicht. Jedes physische Einzelteil ist ein Eintrag — auch verdeckte.
- Fehlt `states`, blendet der Core den Auf/Zu-Knopf aus. Kein Produkt fügt eigene UI hinzu.

## §4 BUILD

`build/bundle.mjs` erzeugt aus Core + einem Produkt ein Standalone-HTML im Format der bestehenden Datei: Importmap auf `three@0.184.0` mit Integrity-Hashes, Design-System-CSS inline, Fonts eingebettet, ein ES-Modul.

```
node build/bundle.mjs products/ball-valve-pp  → dist/kaqua-ball-valve-pp.html
node build/bundle.mjs --all                   → dist/*.html
node build/bundle.mjs --lib                   → dist/kaqua-3d.mjs (alle Produkte, für Next.js)
```

## §5 ABNAHME

1. `dist/kaqua-ball-valve-pp.html` ist von der Originaldatei visuell nicht unterscheidbar. Vergleiche Screenshots in identischer Kameraposition bei d20, d32, d63.
2. Alle Interaktionen funktionieren wie vorher: Größenwahl, Auf/Zu, Explosion, Schnitt, Bemaßung, Presets, Tastatur, Hotspots.
3. `core/` enthält **keinen** Bezeichner mit `valve`, `ball`, `lever`, `nut`, `korpus`, `stem`, `seat` oder `oring`.
4. `products/ball-valve-pp/` enthält keine Geometrie-Grundfunktion, die ein anderes Produkt auch bräuchte.
5. Das Muffen-Prototypprodukt rendert korrekt, ohne dass eine Core-Datei angefasst wurde. **Das ist der eigentliche Test.** Musstest du den Core doch anfassen, war der Schnitt falsch — korrigiere ihn.
6. Die sechs neuen Geometrie-Helfer aus §2 sind implementiert und jeweils mit einem Minimalbeispiel im Code dokumentiert.
7. Speicher bleibt stabil über 20 Größenwechsel.
8. Keine Konsolenfehler, keine Warnungen.
9. Bundle-Größe pro Produkt-HTML < 400 kB ohne Fonts.

## §6 VERBOTEN

- Den Viewer neu schreiben. Das bestehende Verhalten ist die Referenz.
- Framework einführen. Der Core bleibt Vanilla ES-Module.
- Externe Assets zur Laufzeit außer der three.js-Importmap.
- `localStorage` / `sessionStorage`.
- Produktspezifische Sonderfälle im Core (`if (product.id === …)`).
- Qualität senken, um zu vereinfachen: Fasen, Entformungsschrägen, Noise-Roughness, Innenlicht und Stencil-Caps bleiben.

## §7 ABGABE

1. Vollständiger Dateibaum nach §1
2. `dist/kaqua-ball-valve-pp.html` und `dist/kaqua-socket.html`
3. **`core/PRODUKT-VERTRAG.md`** — der Vertrag aus §3 als Referenz, mit einem kommentierten Minimalbeispiel. Das ist die Datei, auf die sich alle 70 folgenden Produkt-Prompts beziehen.
4. Ausgefüllte Abnahmeliste §5, jeder Punkt mit ✅ oder ❌
5. Liste der Stellen, an denen du beim Kugelhahn etwas ändern musstest, damit er in den Vertrag passt — mit Begründung

Beginne mit Schritt 1 und zeige mir die Zuordnungstabelle, bevor du Code schreibst.

## PROMPT ENDE
