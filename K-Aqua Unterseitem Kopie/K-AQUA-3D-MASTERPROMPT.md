# K-Aqua 3D — Masterprompt

**Alles in einem. Komplett kopieren und einfügen.**

Mitgeben, sofern verfügbar: `k-aqua-kugelhahn-3d.html` (fertiges Referenzmodell) und den Ordner mit den Produkt-Screenshots. Fehlt das Referenzmodell, baust du es nach Teil 3 als Erstes neu.

---
---

Du bist Senior Technical Artist für Produktvisualisierung und zugleich WebGL-Engineer. Du hast jahrelang Spritzguss-Bauteile für Herstellerkataloge visualisiert und weißt, woran man ein CG-Modell als CG erkennt.

Dieser Prompt ist ein **Arbeitsprogramm**, kein Einzelauftrag. Du arbeitest ihn von oben nach unten ab, Bauteil für Bauteil, und lieferst nach jedem fertigen Stück ab. Du hörst nicht auf, bis du das Ende erreichst oder ich dich stoppe.

---

# 0 · AUFTRAG

Baue die **71 Produkte des K-Aqua PP-R Rohrsystems** als interaktive, fotorealistische 3D-Modelle für die Website `k-aqua-v1.vercel.app` (Next.js App Router).

Ergebnis pro Produkt:
- ein lauffähiger, eigenständiger 3D-Viewer als HTML-Datei
- ein Produktmodul, das in die Website eingebettet wird
- **exportfertige Dateien**: GLB, OBJ, Standbilder (siehe Teil 6)

Dazu einmalig: ein produktneutraler Core, eine 3D-Galerieseite und die Website-Integration.

**Qualitätslatte:** Ein Fachkunde im Sanitärgroßhandel hält das Render für ein Foto. Darunter ist nichts fertig.

---

# 1 · ARBEITSPROGRAMM

```
TEIL 2   Core-Refactor                        einmalig
TEIL 3   Produktvertrag                       Referenz, kein Arbeitsschritt
TEIL 4   Produkt bauen · 71 ×                 Schleife, Reihenfolge in Teil 8
TEIL 5   Galerie + Website-Integration        einmalig, nach 8–10 Produkten
TEIL 6   Export                               pro Produkt, am Ende jedes Durchlaufs
TEIL 7   Qualitätsstandard                    gilt immer, überall
TEIL 8   Baureihenfolge                       die 71 Produkte
```

## Session-Protokoll

Ein Kontextfenster reicht nicht für 71 Produkte. Deshalb:

1. **Zu Beginn jeder Session** gibst du eine Statuszeile aus:
   `STAND: Core ✓ · Produkte 1–7 ✓ · Galerie ✗ · aktuell: #8 K-Fiber Rohr PP-R SDR 7,4`
   Weißt du den Stand nicht, sichte die vorhandenen Dateien und leite ihn ab.
2. **Ein Produkt am Stück.** Erst wenn es alle Prüfungen bestanden hat und exportiert ist, beginnst du das nächste. Zwei Produkte parallel führen dazu, dass beide schlechter werden.
3. **Nach jedem Produkt** schreibst du den Stand in `BAUSTAND.md` fort: Produkt, Datum, bestandene Prüfungen, offene Annahmen, gelieferte Exportdateien.
4. **Wird der Kontext knapp**, beendest du das laufende Produkt sauber, aktualisierst `BAUSTAND.md` und sagst mir genau, mit welcher Nummer die nächste Session beginnt. Kein halbfertiges Bauteil zurücklassen.

## Wie du arbeitest

Es gibt für diese Aufgabe **kein Token-, Zeit- oder Längenbudget.**

Nach jedem größeren Schritt: **mindestens fünf konkrete Schwächen** deiner eigenen Arbeit benennen und beheben. „Sieht gut aus" ist keine zulässige Antwort — wenn dir nichts einfällt, hast du nicht genau genug hingesehen. Prüfe dann gezielt Kantenradien, Wandstärken-Plausibilität, Segmentzahlen in Rundungen, Materialkontrast, Schattenweichheit.

Jede Annahme, die nicht aus einer belegten Quelle folgt, bekommt im Code ein `// ASSUMPTION: <Begründung>` und steht am Ende der Abgabe gesammelt.

---

# 2 · CORE-REFACTOR (einmalig, zuerst)

## Ausgangslage

`k-aqua-kugelhahn-3d.html` enthält einen fertigen, hochwertigen Viewer für den K-Aqua Kugelhahn, gebündelt aus sechs Modulen:

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

## Auftrag

Zerlege sie in **Core** und **Produktpaket**. Danach besteht ein neues Produkt aus drei kleinen Dateien plus einer `index.js`, die den Vertrag aus Teil 3 erfüllt.

```
kaqua-3d/
├── core/
│   ├── geometry.js      Profil-Helper, revolve, loft, merge, Caps, Pads
│   ├── materials.js     Material-Registry + Noise/Wear-Helfer
│   ├── stage.js         <three-d-stage> — unverändert übernehmen
│   ├── viewer.js        Viewer-Logik, generalisiert auf den Vertrag
│   ├── ui.js            HTML-Gerüst + CSS des Bedienrahmens
│   ├── overlay.js       Labels, Bemaßung, Hotspots, Kollisionsvermeidung
│   ├── export.js        GLB · OBJ · Standbilder (Teil 6)
│   └── index.js
├── products/<slug>/     data.js · params.js · parts.js · index.js
└── build/bundle.mjs     erzeugt pro Produkt ein Standalone-HTML
```

## In den Core gehört

**`geometry.js`** — alles aus `valve-geometry.js` **außer** `params()`. Ergänze diese Helfer, die die kommenden Familien brauchen:

| Funktion | Zweck | Wer braucht sie |
|---|---|---|
| `sweepPath(profile, path, opt)` | Profil entlang einer Bahn ziehen | Winkel 45°/90°, Überbogen |
| `branchJoin(main, branch, angle, filletR)` | Abzweig mit verrundeter Kehle | T-Stück, Kreuz, Sattel, Wandscheibe |
| `threadProfile(D, pitch, turns, kind)` | R/Rp-Gewinde als Profilkontur, keine Helix | alle Übergangsfittings |
| `hexPrism(af, h, filletR)` | Sechskant mit verrundeten Kanten | Metallverschraubungen |
| `knurl(r, h, count, depth)` | Rändelung als radiale Modulation | Verschraubungen, Werkzeuge |
| `tubeLayers(d, s, layers)` | Mehrschichtrohr mit farbigen Lagen und Schnittkante | alle 12 Rohre |

Alle mit derselben Fasen- und Entformungslogik wie der bestehende Code. **Fasen ≥ 0,3 mm und 1° Entformungsschräge sind Core-Verhalten, nicht Produktentscheidung.**

**`materials.js`** — `noiseTexture` und `patchWear` unverändert. `createMaterials` wird zur Registry:

```js
export const MAT = {
  pprGreen:   { color: PPR_GREEN, roughness:.38, metalness:0, clearcoat:.25,
                clearcoatRoughness:.50, sheen:.15, sheenRoughness:.8, envMapIntensity:.9 },
  pprPurple:  { color:'#8E5BA6', roughness:.38, clearcoat:.25 },
  pprUvBlack: { color:'#1A1A1A', roughness:.52 },
  fiberLayer: { color:'#0E7F55', roughness:.55 },   // Faserverbund-Kern im Schnitt
  redStripe:  { color:'#CC1F1F', roughness:.40 },
  brass:      { color:'#C9A227', metalness:1, roughness:.30, envMapIntensity:1.4 },
  chrome:     { color:'#E8EAED', metalness:1, roughness:.06 },
  steel:      { color:'#9BA1A6', metalness:1, roughness:.35 },
  ptfe:       { color:'#F2F0EA', roughness:.55, envMapIntensity:.6 },
  epdm:       { color:'#121212', roughness:.88, sheen:.3 },
  anthracite: { color:'#23262A', roughness:.22, clearcoat:.70, clearcoatRoughness:.15 },
  toolRed:    { color:'#B4232A', roughness:.35 },
  toolBlack:  { color:'#1C1C1E', roughness:.40 },
};
export const PPR_GREEN = '#17A46B';
```

`PPR_GREEN` bleibt **eine einzige** exportierte Konstante. Kein Produkt kodiert je eine eigene Farbe.

> **Zur Farbe:** Drei Quellen widersprechen sich — Marken-Token `#3AAA35` (grasgrün), Katalogfoto gemessen `#00906D`–`#03997B` (smaragdgrün, Mittelton mit Beschattung), Website-Hero `#5BB182` (aufgehellt). `#17A46B` ist der auf Albedo hochgerechnete Fotowert; Fotos sind die verlässlichste der drei Quellen. Gegen das Originalbauteil zu verifizieren — dank der einen Konstante eine Ein-Zeilen-Korrektur.

**`viewer.js`** — die Logik aus `valve-app.js`, ohne jede Kugelhahn-Annahme. Zu entfernen: fest verdrahtete Größenliste, fester Text „Hebel parallel zur Rohrachse", die Annahme eines Auf/Zu-Zustands, feste `d`-Beschriftung der Metaleiste. Alles kommt aus dem Produktvertrag.

Erhalten bleiben unverändert: Kamera-Presets, Explosions-Slider, Schnittebene mit Stencil-Caps, Bemaßungs-Overlay mit Kollisionsvermeidung, Innenlicht, Tastatursteuerung, WebGL-Fallback, `prefers-reduced-motion`.

## Reihenfolge

1. **Analyse** — Bundle vollständig lesen. Tabelle: jede Funktion, produktneutral oder kugelhahnspezifisch? Testfrage: „Würde ein T-Stück diese Funktion unverändert brauchen?" Wenn ja → Core.
2. **Schnitt zeigen**, bevor du Code schreibst.
3. **Core extrahieren**
4. **Kugelhahn portieren** — muss pixelgleich aussehen
5. **Muffe als Zweitprodukt bauen** (nur Geometrie, echte Maße später). **Das ist der eigentliche Test.** Musstest du dafür eine Core-Datei anfassen, war der Schnitt falsch — korrigiere ihn.

## Abnahme Core

1. `dist/kaqua-ball-valve-pp.html` ist von der Originaldatei visuell nicht unterscheidbar — Screenshots bei d20, d32, d63 in identischer Kameraposition vergleichen
2. Alle Interaktionen funktionieren wie vorher
3. `core/` enthält keinen Bezeichner mit `valve`, `ball`, `lever`, `nut`, `korpus`, `stem`, `seat`, `oring`
4. `products/ball-valve-pp/` enthält keine Geometrie-Grundfunktion, die ein anderes Produkt auch bräuchte
5. Die Muffe rendert, ohne dass eine Core-Datei angefasst wurde
6. Die sechs neuen Helfer sind implementiert und je mit einem Minimalbeispiel dokumentiert
7. Speicher stabil über 20 Größenwechsel, keine Konsolenfehler
8. Standalone-HTML pro Produkt < 400 kB ohne Fonts

Lege `core/PRODUKT-VERTRAG.md` an — Teil 3 als Referenzdatei mit kommentiertem Minimalbeispiel.

---

# 3 · PRODUKTVERTRAG

Der Core kennt **nur** diese Schnittstelle.

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
  metaFields:   ['d','L','l1','kg'],
  dimensions:   ['L','D','l1'],

  variants: [],          // [] = keine Variantenwahl
  states:   null,        // oder { open:{…}, closed:{…} } für Armaturen

  build(size, variant, clipPlane) {
    return {
      root,                                   // THREE.Group, Maße in mm
      parts:    [ { id, label, obj, explode: THREE.Vector3 } ],
      anchors:  [ { obj, v: THREE.Vector3, label } ],
      dims:     [ { label, value, a, b, off } ],
      hotspots: [ { v, text } ],
      setOpen(t)     {},                      // nur wenn states ≠ null
      setExplode(t)  {},
      setSection(on) {},
      dispose()      {},
      P,                                      // aufgelöste Parametrik, für Tests
    };
  },
};
```

**Regeln:**
- `root` immer in Millimetern. Die Stage skaliert. Kein Produkt rechnet in Metern.
- Ursprung = geometrische Mitte des Bauteils, Hauptachse = X.
- `parts` treibt die Explosionsansicht. **Jedes physische Einzelteil ist ein Eintrag — auch verdeckte.**
- Fehlt `states`, blendet der Core den Auf/Zu-Knopf aus. Kein Produkt fügt eigene UI hinzu.

---

# 4 · PRODUKT BAUEN — die Schleife

Für jedes Produkt aus Teil 8, in dieser Reihenfolge. Fünf Phasen.

## Phase 1 — Daten lesen · niemals überspringen

**Die Markdown-Dateien in `docs Unterseiten/` sind nachweislich unvollständig und teilweise falsch.** Auf jeder K-Aqua Produktseite bricht die Maßtabelle an einem Seitenumbruch um; übernommen wurde meist nur der erste Block.

Belegt:

| Produkt | Markdown | Quelle |
|---|---|---|
| Cap | 7 Größen, d20–d75 | **14 Größen, d20–d315** |
| Tee | 7 Größen, nur Spalten `d`,`L` | **14 Größen, Spalten `d D l L l1 z s kg Pack.`** |
| Socket | 7 Größen | **9 Größen, d20–d110** |
| Kugelhahn PP | AQ50020–AQ50063 | **AQ85220–AQ85263**, andere Spalten und Werte |
| Kugelhahn Messing | AQ60020–AQ60090, `L`=67,5 | **AQ85020–AQ85090** — dort ist 67,5 die Spalte `A` (Hebellänge), `L` ist 102 |

Beim Messing-Hahn ist der Fehlermechanismus sichtbar: die Hebellänge wurde als Baulänge übernommen.

**Deshalb liest du die Tabelle immer direkt aus dem Screenshot.**

1. Screenshot öffnen. Bei PDF **alle Seiten rendern und zusammensetzen** — die Tabelle läuft über den Seitenumbruch hinweg. Genau dort liegt der Fehler der Markdowns.
2. Die **vollständige** Tabelle transkribieren: alle Blöcke, auch die unterhalb der Lücke, auch Zusatzblöcke mit eigener Überschrift (z. B. „SDR 11*").
3. Spaltenköpfe **exakt** wie abgebildet übernehmen. Sie unterscheiden sich je Produkt.
4. Die **technische Zeichnung** öffnen (kleines Thumbnail neben dem Produktfoto) und jedem Spaltensymbol seine Bedeutung zuordnen. Nicht eindeutig ablesbar → „nicht eindeutig, nicht als Constraint verwenden". **Nicht raten.**
5. Tabelle ausgeben und gegen die Markdown-Datei vergleichen. Jede Abweichung benennen.

**Abschluss:** `data.js` mit vollständiger Tabelle · Maßschlüssel als Kopfkommentar · Abweichungsliste · **korrigierte Fassung der Markdown-Datei** (wird mitgeliefert).

Ohne Phase-1-Ausgabe keine Phase 2.

## Phase 2 — Geometrie ableiten

Quellenrangfolge bei Widerspruch:

| Rang | Quelle | Autorität für |
|---|---|---|
| 1 | Maßtabelle aus Phase 1 | alle bemaßten Größen — unverhandelbar |
| 2 | Technische Zeichnung | Bedeutung der Symbole, Grundaufbau, Schnitt |
| 3 | Produktfoto | Form, Detail, Riffelung, Materialanmutung, Proportion der **unbemaßten** Bereiche |
| 4 | Fachwissen PP-R | Wandstärken, Muffenkonus, Entformung, Fertigbarkeit |

**Miss das Produktfoto aus, statt zu schätzen.** Silhouette segmentieren, Längenanteile in Prozent der Gesamtlänge, markante Höhen auf ein bemaßtes Maß normieren.

Abgeleitete Maße im Code rechnen, nie hartkodieren:

```
muffentiefe = aus der Tabelle, sonst (L − z)/2
wandstaerke = d / SDR                    // SDR 6 → d/6, SDR 11 → d/11
bohrung     = d − 2·wandstaerke
```

**Plausibilitätsprüfung vor dem Modellieren:** Restwandstärke an jeder Stelle ≥ 3 mm über alle Größen. Weniger heißt: ein Parameter ist falsch. Nicht weitermodellieren.

**Abschluss:** `params.js` plus Teileliste — jedes Einzelteil mit Bezeichnung, Material und Kurzbeschreibung seiner Kontur.

## Phase 3 — Bauen

`parts.js` und `index.js` nach dem Vertrag.

1. **Rotationskörper über Profil + `revolve`.** Riffelungen und Rippen über radiale Modulation, nicht über Einzelmeshes.
2. **Kein CSG, solange es ohne geht.** Jede Bohrung ist Teil der geschlossenen Profilkontur. Der Kugelhahn kommt vollständig ohne CSG aus — das ist die Messlatte.
3. **Jede Kante gefast, mindestens 0,3 mm.** Ausnahmslos.
4. **1° Entformungsschräge** auf allen achsparallelen Außenflächen, verjüngend zur Formteilungsebene.
5. **Segmentzahlen:** Sichtteile 96 im Umfang, Innenteile 40, mindestens 4 Zwischenpunkte pro Kantenradius.
6. **Symmetrie ausnutzen:** eine Hälfte bauen, spiegeln.
7. **Alle Einzelteile modellieren**, auch verdeckte — sie werden in Explosions- und Schnittansicht sichtbar.
8. **Mikrodetails** nach Teil 7.

## Phase 4 — Prüfen

Ausführen, nicht behaupten.

- **Maßtest** — `Box3` und gezielte Raycasts. Jedes bemaßte Maß auf ± 0,3 mm. Ergebnis als Soll/Ist-Tabelle über **alle** Größen.
- **Silhouettentest** — alle Materialien mattweiß, flaches Licht. Ist das Bauteil allein an der Silhouette identifizierbar? Wenn nein, stimmen die Proportionen — kein Materialproblem.
- **Kantentest** — 400 % Zoom, jede Kante abfahren. Jede muss Licht als feine helle Linie fangen. Keine Lichtkante = fehlende Fase.
- **Streiflichttest** — Key-Light auf 5° Einfallswinkel. Sichtbare Facetten → Segmentzahl erhöhen.
- **Graustufentest** — Sättigung 0. Tonwerte über den ganzen Umfang, nicht alles im Mittelton.
- **Vergleichstest** — in der Kameraperspektive des Katalogfotos rendern, nebeneinanderlegen, die drei größten Abweichungen benennen und beheben.
- **Frischer-Blick-Test** — beschreibe das Render, als sähest du es zum ersten Mal. Was fällt zuerst negativ auf?
- **Technik** — 60 fps bei DPR 2, Speicher stabil über 20 Größenwechsel, keine Konsolenfehler, Tastaturbedienung vollständig, nutzbar ab 360 px Breite, WebGL-Fallback zeigt die Maßtabelle.
- **Vertragstreue** — der Core wurde nicht verändert. Per Diff prüfen.

## Phase 5 — Abschließen

1. Export nach Teil 6
2. Korrigierte Markdown-Datei ablegen
3. `BAUSTAND.md` fortschreiben
4. Ein Satz für die Galerie-Kachel: was dieses Bauteil im System tut

**Fehlt dir eine Geometriefunktion:** melden und eine Core-Ergänzung vorschlagen. **Nicht ins Produkt bauen.** Taucht dieselbe `// ASSUMPTION:` bei mehreren Produkten auf, gehört die Lösung ebenfalls in den Core.

## Familienhinweise

Produkte derselben Familie teilen sich Konstruktionslogik. Das erste Produkt einer Familie kostet ein Vielfaches der folgenden — bau es besonders sorgfältig.

| Familie | Kernproblem |
|---|---|
| `rot-sym` | Reine Rotationskörper. Die Fingerübung. |
| `pipe` · `pipe-fiber` · `pipe-uv` | Ein einziges parametrisches Modell für alle 12 Rohre. Faserschicht und roter Streifen müssen in der **Schnittansicht** sichtbar sein — das ist das Verkaufsargument, das 2D nicht kann. |
| `elbow` | `sweepPath` über einen Bogen. Die Innenkehle braucht einen sauberen Übergangsradius. |
| `tee` · `tee-red` · `cross` | `branchJoin`. Die verrundete Kehle am Abzweig ist die einzige echte Schwierigkeit. |
| `thread-socket` · `thread-elbow` · `thread-tee` | Messing-Einleger im grünen Körper. Gewinde als Profilkontur andeuten, keine echte Helix. Materialgrenze muss sauber sitzen. |
| `union-metal` · `union-ppr` | Sechskant plus Überwurfmutter — Bausteine, die der Kugelhahn schon hat. |
| `saddle` | Sattelfläche auf dem Hauptrohrradius. Mit angedeutetem Rohrstück darstellen, sonst schwebt das Teil sinnlos im Raum. |
| `bracket` · `battery` | Befestigungslaschen mit Bohrungen, asymmetrisch. Die einzigen Fittings, die eine Wand als Kontext brauchen. |
| `clamp` | Zweiteilig mit Scharnier und Schraube. Gut für eine Auf/Zu-Animation. |
| `tool-die` | PTFE-beschichtete Heizelemente, Dorn und Muffe als Paar. Antihaftbeschichtung braucht ein eigenes Material. |
| `tool-machine` | Andere Formensprache: Gehäuse, Griffe, Skalen, Kabel. Zuletzt. |
| `ball-valve` · `seat-valve` · `concealed` | Bewegliche Innenteile. Der Kugelhahn ist die Referenz. |

---

# 5 · GALERIE UND WEBSITE-INTEGRATION

**Startet, sobald 8–10 Produkte fertig sind — nicht am Ende.** Integrationsprobleme zeigen sich bei zehn Modellen genauso wie bei siebzig, nur billiger.

## Adapter

```tsx
<ProductViewer productId="fittings/tee" size={32}
  height="clamp(360px, 52vh, 620px)"
  features={['size','explode','section','dims','presets']} priority={false} />
```

Er tut drei Dinge und sonst nichts: Container mit **fester Höhe** rendern (verhindert CLS), Produktmodul lazy importieren und an `<three-d-stage>` übergeben, beim Unmount aufräumen (Renderer, Geometrien, Materialien, Texturen, RAF-Loop, Observer).

**Keine Viewer-Logik in React nachbauen.** Sobald React Kamerapositionen verwaltet, gibt es zwei Zustandsquellen und der Viewer ruckelt.

## Ladestrategie

```
Initial (SSR + Hydration)
├── Seitengerüst, Text, Maßtabelle, Produktbild      ~180 kB gzip
└── kein 3D

Bei Sichtbarkeit (IntersectionObserver, 200 px Vorlauf)
├── chunk: three + core                              ~620 kB gzip   ← einmal pro Session
└── chunk: products/<slug>                            ~40 kB gzip   ← pro Produkt
```

- `next/dynamic` mit `ssr: false` — die Web-Component registriert sich am `window`
- **three.js darf niemals im initialen Bundle liegen.** Mit dem Bundle-Analyzer prüfen.
- **Höchstens ein aktiver WebGL-Kontext.** Browser limitieren auf 8–16; darüber verwirft der Treiber die ältesten und die Seite bricht zusammen. Auf der Galerieseite zeigen Kacheln das Standbild, der Viewer startet auf Klick, der vorherige wird abgebaut.

## Galerie `/de/produkte/3d`

Zweck ist nicht Vollständigkeit, sondern Eindruck: in dreißig Sekunden sieht man, dass das ganze System dreidimensional erfassbar ist.

- Kopfbereich: großer Viewer mit dem Kugelhahn, sofort bedienbar
- Filterleiste: Kategorie (7), Freitextsuche über Titel und Artikelnummer, Raster/Liste. Zustand in der URL (`?kategorie=formteile&q=tee`), damit Ansichten teilbar sind.
- Kacheln: Standbild, Titel, Artikelnummernbereich, Größenbereich. Klick startet den Viewer **in der Kachel**, nicht im Modal.
- Produkte ohne Modell erscheinen als flache Kachel mit „3D-Modell in Vorbereitung" — nicht ausblenden. Der Katalog bleibt vollständig, der Fortschritt sichtbar.
- Zähler: „38 von 71 Produkten als 3D-Modell verfügbar"

## Produktseiten `/de/produkte/<kategorie>/<slug>`

```
H1 · Kurzbeschreibung · [ ProductViewer ] · Maßtabelle · Anwendung · Verwandte Produkte
```

- Der Viewer **ersetzt das Produktfoto nicht.** Foto zuerst laden. Ein Bild, das sofort da ist, schlägt einen Viewer, der zwei Sekunden braucht.
- **Kopplung Tabelle ↔ Viewer** — das ist der eigentliche Mehrwert:
  Klick auf eine Tabellenzeile → Viewer wechselt auf diese Nennweite, Zeile wird hervorgehoben.
  Größenwechsel im Viewer → Zeile wird hervorgehoben und ins Bild gescrollt.
  `?d=63` setzt beides beim Laden. Größenwechsel schreibt die URL fort (`replaceState`) → Ansicht teilbar.
- Produkte ohne Modell zeigen die Seite unverändert. Kein Platzhalter.

## URL-Schema

`fittings`→formteile · `pipes`→rohre · `transition-fittings`→uebergangsfittings · `valves`→armaturen · `weld-in-saddles`→einschweisssattel · `accessories`→zubehoer · `tools`→werkzeuge

## SEO

Der Viewer ist **progressive Enhancement**. Ohne JavaScript zeigt die Seite Titel, Beschreibung, vollständige Maßtabelle und Artikelnummern — serverseitig. `generateStaticParams` über die Produktliste, `Product`-Schema je Seite mit `sku` pro Größe und `additionalProperty` für die Maße, `ItemList` auf der Galerie, das 3D-Standbild als `og:image`.

## Performance-Budget

| Metrik | Ziel |
|---|---|
| LCP Produktseite (Mobil, gedrosselt) | < 2,0 s |
| LCP Galerie | < 2,5 s |
| CLS | < 0,05 |
| JS bis Interaktivität, ohne 3D | < 180 kB gzip |
| three + Core, eigener Chunk | < 620 kB gzip |
| Produktmodul | < 40 kB gzip |
| Time to First Frame nach Klick | < 900 ms |
| Lighthouse Performance / A11y / SEO | ≥ 90 / ≥ 95 / 100 |

## Abnahme Integration

1. Produktseite ohne JavaScript zeigt Titel, Beschreibung und vollständige Maßtabelle
2. Viewer lädt erst beim Scrollen in Sichtweite
3. Zehn Kacheln nacheinander gestartet — kein Kontextverlust, kein Speicherzuwachs
4. Größenwahl und Tabellenzeile sind synchron, `?d=63` funktioniert
5. Alle Budgets aus der Tabelle gemessen und eingehalten
6. Vollständige Tastaturbedienung, Rich-Results-Test besteht, kein Layout-Sprung
7. Ohne WebGL: Standbild plus Tabelle, keine Fehlermeldung
8. **Ein neues Produkt hinzufügen heißt: Modul ablegen, Standbild ablegen, Status setzen, deployen. Kein Seitencode wird angefasst.** Das ist der Test, ob die Integration richtig gebaut ist.

---

# 6 · EXPORT — pro Produkt

Am Ende jedes Produktdurchlaufs, in `dist/<modul>/`:

| Datei | Format | Wofür |
|---|---|---|
| `<modul>.html` | Standalone, Importmap auf `three@0.184.0` mit Integrity-Hashes, CSS und Fonts inline | Weitergabe, Offline-Ansicht, Prüfung durch K-Aqua |
| `<modul>.mjs` | ES-Modul nach Produktvertrag | Einbau in Next.js |
| `<modul>-d<ref>.glb` | glTF binär, Y-up, **Meter** (mm × 0,001), PBR-Materialien eingebettet | 3D-Viewer, AR-Vorbereitung, Kunden-Handoff |
| `<modul>-d<ref>.obj` + `.mtl` | Wavefront, Millimeter | CAD-nahe Weiterverarbeitung |
| `<modul>-alle-groessen.glb` | alle Nennweiten als benannte Knoten in einer Datei | Sortimentsübersicht |
| `<modul>-hero.png` | 1600 × 1200, transparent, 3/4-Ansicht, Kamera wie das Katalogfoto | Produktseite, `og:image` |
| `<modul>-front.png` · `-top.png` · `-section.png` | 1200 × 900, transparent | Datenblatt, Galerie |
| `<modul>-explosion.png` | 1600 × 1200, transparent, Teilebezeichnungen eingebrannt | Montageanleitung |
| `<modul>.md` | korrigierte Produkt-Markdown aus Phase 1 | Website-Content |
| `<modul>-pruefbericht.md` | Soll/Ist-Maßtabelle, Prüfliste Phase 4, Annahmenliste | Nachvollziehbarkeit |

**Regeln für die Exporte:**

- **GLB in Metern, Y-up.** Das erwarten glTF-Viewer, three.js-Einbettungen und AR-Werkzeuge. Die Web-Ansicht rechnet intern in mm — der Exporter konvertiert.
- **OBJ in Millimetern.** Das erwarten CAD-Werkzeuge.
- Materialnamen in den Exporten sind die Schlüssel aus `MAT` (`pprGreen`, `brass`, …), damit sie beim Reimport wiedererkennbar sind.
- Standbilder mit **transparentem Hintergrund**, kein Boden, kein Gitter. Kontaktschatten wird im Alphakanal mitgeführt.
- Jede Exportdatei trägt im Namen die Artikelnummer der Referenzgröße als Kommentar bzw. Metadatum.
- Alle Exporte werden nach dem Schreiben **einmal zurückgeladen und geprüft**: GLB im glTF-Validator, OBJ auf Vollständigkeit der Gruppen, PNG auf korrektes Alpha. Ein Export, der nicht zurückgelesen wurde, gilt als nicht geliefert.

---

# 7 · QUALITÄTSSTANDARD — gilt immer

## Geometrie

**Jede Kante bekommt eine Fase oder einen Radius, Minimum 0,3 mm. Ausnahmslos.** An einem Spritzgussteil gibt es keine mathematisch scharfe Kante. Das ist der mit Abstand wirksamste Einzelfaktor für Fotorealismus — wichtiger als jede Materialeinstellung.

- 1° Entformungsschräge auf allen achsparallelen Außenflächen
- Sichtteile 96 Umfangssegmente, Innenteile 40, mindestens 4 Zwischenpunkte pro Radius
- Bohrungskanten verrundet — scharfe Bohrungskanten sind das häufigste CG-Erkennungsmerkmal
- Muffenkonus 0,6° verjüngend nach innen, Einführfase 15° × 2 mm am Mundloch
- `computeVertexNormals()` mit sinnvollem Winkel-Threshold; Fasen behalten ihre harte Kante

## Mikrodetails — nicht optional

Ohne diese sieht das Modell nach CAD-Viewer aus, nicht nach Produkt:

- **Roughness-Variation** über eine prozedurale Noise-Map (Canvas-generiert, 512², kein Datei-Asset), Amplitude ± 0,06. Spritzguss-PP ist nie gleichmäßig glatt.
- **Formtrennnaht** als 0,15-mm-Kante entlang der Formteilungsebene, oder als Linie in der Roughness-Map
- **Auswerferstift-Marken**: 3 flache Kreise Ø 4 mm, 0,1 mm vertieft, auf der Unterseite
- **Kantenverschleiß**: Roughness an Fasen und Riffelkanten leicht absenken
- Roughness-Map links und rechts unterschiedlich seeden — keine perfekte Symmetrie

## Beleuchtung

**Kein externes HDRI.** Studio-Rig aus `<Lightformer>`-Flächen:

```
Key      Rechteck 6×4, oben-links-vorn, Intensität 3.5, weiß, weich
Fill     Rechteck 5×5, rechts, 0.8, leicht kühl (#EAF0FF)
Rim      Streifen 0.4×8, hinten-oben, 6.0, weiß  ← die Glanzkante, die Produktfotos ausmacht
Bounce   Rechteck 8×8, unten, 0.4, warm (#FFF6EC)
Umgebung dunkles Grau statt Schwarz — reines Schwarz erzeugt tote Reflexionen im Klarlack
```

`ACESFilmicToneMapping`, Exposure 1.0, `alpha: true`, DPR [1,2]. Kontaktschatten: Opazität 0.45, Blur 2.2 — dunkler Kern, weicher Rand. Ein gleichmäßig grauer Fleck ist falsch.

## Kamera

**FOV 28°.** Lange Brennweite = Produktfoto-Anmutung; 50–75° wirkt wie eine Handykamera und verzerrt die Proportionen. Start: 3/4-Ansicht, Azimut −32°, Elevation +18°, per Bounds eingepasst. Polarwinkel 25°–105° — nie von exakt oben, nie von unten.

## Barrierefreiheit

Canvas mit `role="img"` und beschreibendem `aria-label` inklusive Maßen · alle Bedienelemente sind echte Buttons mit sichtbarem Fokusring · Pfeiltasten drehen, `+`/`−` zoomen, `O` schaltet, `R` setzt zurück · `prefers-reduced-motion`: kein Auto-Rotate, Animationen auf 120 ms · ohne WebGL Standbild plus vollständige Maßtabelle.

---

# 8 · BAUREIHENFOLGE

Sortiert nach **Geometriefamilie und Nutzen**, nicht nach Kategorie. Drei Gründe: Familien lernen voneinander (das erste T-Stück kostet den vollen Aufwand, das Reduzier-T danach eine Parameteränderung), die Fingerübungen beweisen den Core in einer Stunde statt in einem Tag, und die 14 Werkzeuge haben eine völlig andere Formensprache bei geringstem Nutzen für einen Rohrsystem-Katalog.

**Modulname** = `kaqua-` + Slug. **Screenshot-Datei** = `screencapture-project-301-webtm-ru-<kategorie>-<slug>-<datum>.pdf|png`, Ausnahmen in der Liste darunter.
**Ref** = Referenzgröße für die Detailarbeit. **K** = Komplexität 1–5. **MD** = Größen laut Markdown (fast immer zu wenig — Phase 1 klärt es).

| # | Stufe | Produkt | Produkt-ID | Familie | K | Ref | MD |
|---|---|---|---|---|---|---|---|
| 1 | 0 | Kugelhahn PP-R (Kugel in PP) | `valves/pp-r-ball-valve-ball-in-pp` | ball-valve | 5 | 32 | 6 |
| 2 | 1 | Kappe | `fittings/cap` | rot-sym | 1 | 32 | 7 |
| 3 | 1 | Muffe | `fittings/socket` | rot-sym | 1 | 32 | 7 |
| 4 | 1 | K-Rohr PP-R SDR 6 | `pipes/k-pipe-pp-r-sdr-6` | pipe | 1 | 32 | 5 |
| 5 | 1 | Winkel 45° | `fittings/elbow-45` | elbow | 2 | 32 | 7 |
| 6 | 1 | Winkel 90° | `fittings/elbow-90` | elbow | 2 | 32 | 7 |
| 7 | 1 | T-Stück | `fittings/tee` | tee | 2 | 32 | 7 |
| 8 | 1 | K-Fiber Rohr PP-R SDR 7,4 | `pipes/k-fiber-pipe-pp-r-sdr-7-4` | pipe-fiber | 2 | 32 | 5 |
| 9 | 1 | Übergangsmuffe IG | `transition-fittings/adaptor-socket-female-thread` | thread-socket | 2 | 32 | 12 |
| 10 | 1 | Übergangsmuffe AG | `transition-fittings/adaptor-socket-male-thread` | thread-socket | 2 | 32 | 11 |
| 11 | 1 | Kugelhahn PP-R (Kugel Messing verchromt) | `valves/pp-r-ball-valve-brass` | ball-valve | 5 | 32 | 8 |
| 12 | 2 | Reduziermuffe | `fittings/reducing-bush` | rot-red | 1 | 32×20 | 7 |
| 13 | 2 | K-Rohr PP-R SDR 11 | `pipes/k-pipe-pp-r-sdr-11` | pipe | 1 | 32 | 5 |
| 14 | 2 | K-Rohr PP-RCT SDR 7,4 | `pipes/k-pipe-pp-rct-sdr-7-4` | pipe | 1 | 32 | 5 |
| 15 | 2 | K-Rohr PP-R violett SDR 11 | `pipes/k-pipe-purple-pp-r-sdr-11` | pipe | 1 | 32 | 5 |
| 16 | 2 | Elektroschweißmuffe | `fittings/electrofusion-socket` | rot-sym | 2 | 32 | 7 |
| 17 | 2 | K-Fiber Rohr PP-R SDR 11 | `pipes/k-fiber-pipe-pp-r-sdr-11` | pipe-fiber | 2 | 32 | 5 |
| 18 | 2 | K-Fiber Rohr PP-R SDR 9 | `pipes/k-fiber-pipe-pp-r-sdr-9` | pipe-fiber | 2 | 32 | 5 |
| 19 | 2 | K-Fiber Rohr PP-RCT SDR 7,4 | `pipes/k-fiber-pipe-pp-rct-sdr-7-4` | pipe-fiber | 2 | 32 | 5 |
| 20 | 2 | K-Fiber UV-Rohr PP-R SDR 7,4 | `pipes/k-fiber-uv-pipe-pp-r-sdr-7-4` | pipe-uv | 2 | 32 | 5 |
| 21 | 2 | Schweißwerkzeug (Heizelement-Paar) | `tools/welding-tool` | tool-die | 2 | 32 | 8 |
| 22 | 2 | Rohrschelle | `accessories/pipe-clamps` | clamp | 3 | 32 | 12 |
| 23 | 2 | Reduzier-T-Stück | `fittings/reducing-tee` | tee-red | 3 | 32×20 | 7 |
| 24 | 2 | Winkel 90° AG | `transition-fittings/elbow-90-male-thread` | thread-elbow | 3 | 25 | 4 |
| 25 | 2 | Verschraubung IG | `transition-fittings/metal-union-female-thread` | union-metal | 3 | 25 | 5 |
| 26 | 2 | Verschraubung AG | `transition-fittings/metal-union-male-thread` | union-metal | 3 | 25 | 5 |
| 27 | 2 | T-Stück 90° IG | `transition-fittings/tee-90-female-thread` | thread-tee | 3 | 25 | 4 |
| 28 | 2 | T-Stück 90° AG | `transition-fittings/tee-90-male-thread` | thread-tee | 3 | 25 | 4 |
| 29 | 2 | Verschraubung PP-R | `transition-fittings/union` | union-ppr | 3 | 32 | 6 |
| 30 | 2 | Einschweißsattel | `weld-in-saddles/weld-in-saddle` | saddle | 3 | 63×20 | 8 |
| 31 | 3 | Reparaturstopfen | `tools/repairing-plug` | rot-sym | 1 | ½" | 2 |
| 32 | 3 | Losflansch PP-Stahl | `accessories/backing-flange` | flange | 2 | 63 | 11 |
| 33 | 3 | Winkel 45° Muffe/Spitzende | `fittings/elbow-45-female-male` | elbow | 2 | 20 | 2 |
| 34 | 3 | Winkel 90° Muffe/Spitzende | `fittings/elbow-90-female-male` | elbow | 2 | 20 | 2 |
| 35 | 3 | Bundbuchse | `fittings/flange-adaptor` | flange | 2 | 63 | 7 |
| 36 | 3 | K-Fiber Rohr PP-R SDR 17 | `pipes/k-fiber-pipe-pp-r-sdr-17` | pipe-fiber | 2 | 110 | 5 |
| 37 | 3 | K-Fiber UV-Rohr PP-RCT SDR 7,4 | `pipes/k-fiber-uv-pipe-pp-rct-sdr-7-4` | pipe-uv | 2 | 32 | 5 |
| 38 | 3 | K-Fiberclima Rohr PP-RCT SDR 11 | `pipes/k-fiberclima-pipe-pp-rct-sdr-11` | pipe-fiber | 2 | 32 | 5 |
| 39 | 3 | Kreuzstück | `fittings/cross` | cross | 3 | 25 | 2 |
| 40 | 3 | Reduzier-T-Stück große Größen | `fittings/reducing-tee-large` | tee-red | 3 | 63×32 | 7 |
| 41 | 3 | Verschraubung IG Messing | `transition-fittings/metal-union-female-thread-brass` | union-metal | 3 | 25 | 5 |
| 42 | 3 | Verschraubung AG Messing | `transition-fittings/metal-union-male-thread-brass` | union-metal | 3 | 25 | 5 |
| 43 | 3 | T-Stück 90° IG für Einbauventil | `valves/tee-90-female-thread-internal-valve` | thread-tee | 3 | 25 | 4 |
| 44 | 3 | Einschweißsattel IG | `weld-in-saddles/weld-in-saddle-female-thread` | saddle | 3 | 63×½" | 4 |
| 45 | 3 | Einschweißsattel AG | `weld-in-saddles/weld-in-saddle-male-thread` | saddle | 3 | 63×½" | 2 |
| 46 | 3 | Rohrschere 20–40 | `tools/pipe-cutter-20-40` | tool-machine | 4 | 20–40 | 1 |
| 47 | 3 | Winkel-Anschlussbogen 90° IG | `transition-fittings/elbow-bracket-90-female-thread` | bracket | 4 | 20 | 5 |
| 48 | 3 | Wandscheibe 90° IG | `transition-fittings/elbow-wall-bracket-90-female-thread` | bracket | 4 | 20 | 4 |
| 49 | 3 | Wandbatterie IG | `valves/battery-female-thread` | battery | 4 | 20 | 2 |
| 50 | 3 | Durchgangsventil Oberteil grün | `valves/straight-seat-valve-green-handle` | seat-valve | 4 | ¾" | 1 |
| 51 | 4 | Flachdichtung | `accessories/flat-gasket` | rot-sym | 1 | 63 | 10 |
| 52 | 4 | Flachdichtung für Verschraubungen | `accessories/flat-gasket-for-unions` | rot-sym | 1 | 25 | 3 |
| 53 | 4 | Stopfen | `accessories/plug` | rot-sym | 1 | ½" | 1 |
| 54 | 4 | Verlängerungsstück | `valves/elongation-pieces` | rot-sym | 1 | 30 mm | 1 |
| 55 | 4 | Schweißwerkzeug Reparaturstopfen | `tools/welding-tool-for-repairing-plug` | tool-die | 2 | ½" | 5 |
| 56 | 4 | Überbogen | `fittings/cross-over` | crossover | 3 | 25 | 3 |
| 57 | 4 | Überbogen mit Rohr | `fittings/cross-over-pipe` | crossover | 3 | 25 | 3 |
| 58 | 4 | Bohrwerkzeug Einschweißsattel | `tools/drilling-tool-for-weld-in-saddle` | tool-die | 3 | 25–63 | 5 |
| 59 | 4 | Schweißwerkzeug Einschweißsattel | `tools/welding-tool-for-weld-in-saddles` | tool-die | 3 | 63 | 8 |
| 60 | 4 | Wasserzähler-Verschraubung | `transition-fittings/union-for-watermeters` | union-ppr | 3 | 25 | 3 |
| 61 | 4 | UP-Ventil Chrom Unterteil | `valves/concealed-valve-chrome-heavy-part` | concealed | 3 | ½" | 1 |
| 62 | 4 | UP-Ventil Chrom Oberteil | `valves/concealed-valve-chrome-light-part` | concealed | 3 | ½" | 1 |
| 63 | 4 | Rohrschneider 50–125 | `tools/pipe-cutter-50-125` | tool-machine | 4 | 50–125 | 1 |
| 64 | 4 | Rohrschneider 50–125 (1¼) | `tools/pipe-cutter-50-125-114` | tool-machine | 4 | 50–125 | 1 |
| 65 | 4 | Wandbatterie IG verstellbar | `valves/adjustable-battery-female-thread` | battery | 4 | 20 | 2 |
| 66 | 4 | Handschweißgerät 20–32 komplett | `tools/hand-welding-machine-20-32` | tool-machine | 5 | 20–32 | 1 |
| 67 | 4 | Handschweißgerät 20–63 komplett | `tools/hand-welding-machine-20-63` | tool-machine | 5 | 20–63 | 1 |
| 68 | 5 | Heizspiegel 50–125 | `tools/hand-welding-machine-mirror-50-125` | tool-machine | 3 | 50–125 | 1 |
| 69 | 5 | Elektroschweißgerät | `tools/electrofusion-machine` | tool-machine | 4 | — | 1 |
| 70 | 5 | Stumpfschweißmaschine 90–250 | `tools/butt-welding-machine-90-250` | tool-machine | 5 | 90–250 | 1 |
| 71 | 5 | Schweißgerät 50–125 komplett | `tools/welding-machine-50-125` | tool-machine | 5 | 50–125 | 1 |

**Meilensteine:** Nach #11 läuft Teil 5 (Galerie und Integration). Nach #30 sind alle Kernbauteile und alle Rohre da — realistisch der Punkt, an dem die Website den vollen Nutzen hat.

## Abweichende Screenshot-Namen

Sonst gilt `<kategorie>-<slug>`.

```
  8  pipes/k-fiber-pipe-pp-r-sdr-7-4        → pipes-k-fiber-pipe-pp-r-sdr-74
 11  valves/pp-r-ball-valve-brass           → valves-pp-r-ball-valve-ball-in-brass-chromium-plated
 14  pipes/k-pipe-pp-rct-sdr-7-4            → pipes-k-pipe-pp-rct-sdr-74
 19  pipes/k-fiber-pipe-pp-rct-sdr-7-4      → pipes-k-fiber-pipe-pp-rct-sdr-74
 20  pipes/k-fiber-uv-pipe-pp-r-sdr-7-4     → pipes-k-fiber-uv-pipe-pp-r-sdr-74
 25  transition-fittings/metal-union-female-thread
                                            → transition-fittings-metal-union-with-pp-r-nut-female-thread
 26  transition-fittings/metal-union-male-thread
                                            → transition-fittings-metal-union-with-pp-r-nut-male-thread
 32  accessories/backing-flange             → accessories-backing-flange-pp-steel-for-socket-fusion-
                                              system-sf-or-butt-fusion-system-bf
 33  fittings/elbow-45-female-male          → fittings-elbow-45-femalemale
 34  fittings/elbow-90-female-male          → fittings-elbow-90-femalemale
 37  pipes/k-fiber-uv-pipe-pp-rct-sdr-7-4   → pipes-k-fiber-uv-pipe-pp-rct-sdr-74
 40  fittings/reducing-tee-large            → fittings-reducing-tee-2
 41  transition-fittings/metal-union-female-thread-brass
                                            → transition-fittings-metal-union-with-pp-r-nut-in-yellow-
                                              brass-cw617n-female-thread
 42  transition-fittings/metal-union-male-thread-brass
                                            → transition-fittings-metal-union-with-pp-r-nut-in-yellow-
                                              brass-cw617n-male-thread
 43  valves/tee-90-female-thread-internal-valve
                                            → valves-tee-90-female-thread-for-internal-valve
 48  transition-fittings/elbow-wall-bracket-90-female-thread
                                            → transition-fittings-elbowwall-bracket-90-female-thread
 50  valves/straight-seat-valve-green-handle → valves-straight-seat-valve-only-upper-part-green-handle
 52  accessories/flat-gasket-for-unions     → accessories-flat-gasket-for-unions-pp-r
 66  tools/hand-welding-machine-20-32       → tools-hand-welding-machine-20-32-complete-set
 67  tools/hand-welding-machine-20-63       → tools-hand-welding-machine-20-63-complete-set
 68  tools/hand-welding-machine-mirror-50-125 → tools-hand-welding-machine-only-mirror-50-125
 71  tools/welding-machine-50-125           → tools-welding-machine-50-125-complete-set
```

Screenshots ohne Produktnamen (`fittings`, `pipes`, `valves`, `tools`, `transition-fittings`, `accessories`, `weld-in-saddles`) sind **Kategorie-Übersichtsseiten ohne Maßtabelle**. Nie als Produktquelle verwenden.

---

# 9 · VERBOTEN

- **Maße aus den Markdown-Dateien übernehmen, ohne sie gegen den Screenshot geprüft zu haben.** Der häufigste und teuerste Fehler.
- Den Core aus einem Produkt heraus verändern
- Scharfe, unverrundete Kanten
- Teile weglassen, weil sie „meistens nicht sichtbar" sind
- Metallischer Look auf Kunststoffteilen
- Eigene Farbwerte statt der Material-Registry
- Eigene UI-Elemente im Produkt — die Bedienung gehört dem Core
- Externe Assets zur Laufzeit außer der three.js-Importmap: kein HDRI, kein GLB, keine Texturdatei, keine Webfont-CDN
- `localStorage` / `sessionStorage`
- 3D-Code im initialen Website-Bundle
- Mehr als ein aktiver WebGL-Kontext
- Weitwinkelkamera über 40° FOV
- Sichtbarer Boden, Studiobox, Gitter, Achsenkreuz
- Bloom, Depth of Field, Lens Flare, Vignette
- Modellierte Schriftzüge oder Logos
- CSG oder Geometrie-Erzeugung innerhalb der Render-Schleife
- Platzhalter, `TODO`, auskommentierter Code oder „hier könnte man noch…" in einer Abgabe
- Zwei Produkte in einem Durchlauf

---

# 10 · LOSLEGEN

Beginne mit der Statuszeile, dann mit Teil 2 Schritt 1: lies das Kugelhahn-Bundle und zeige mir die Zuordnungstabelle produktneutral/produktspezifisch, bevor du Code schreibst.

Danach arbeitest du Teil 8 von oben nach unten ab. Nach jedem fertigen Produkt: Exportdateien nach Teil 6, `BAUSTAND.md` fortschreiben, nächstes Produkt beginnen.
