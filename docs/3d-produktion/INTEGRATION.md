# INTEGRATION

Anleitung zum Einbau der K-Aqua 3D-Modelle in die bestehende Website.
Geschrieben für eine externe KI oder Entwicklerin, die dieses Verzeichnis
bekommt und sonst nichts über das Projekt weiß.

**Stand 20. August 2026 — 28 von 71 Produkten als Modell** (27 fertig, 1 Prototyp).
Selbsttest: `dist/lib-selbsttest.html`. Er lädt jedes Modul, baut die
Referenzgröße und vermisst sie. Zuletzt: **28/28 geladen, größte Abweichung
0,18 mm**, 618 124 Dreiecke, keine Auffälligkeiten. Der Test ist nicht Zierde — er hat bei den
Winkeln zwei Vorzeichenfehler in der Bahnberechnung gefunden.

Zusätzlich: `dist/export.html` erzeugt Standbilder, GLB und OBJ für jedes
Produkt und packt sie als ZIP. Läuft im Browser, ohne Server.

---

## 0 · Der kürzeste Weg

**`EINBAU.md`** im selben Ordner ist die Kurzfassung: die Liste der 27
Modelle, drei Schritte zum Einbau, die eine nicht verhandelbare Regel.
Für den reinen Einbau genügt sie.

Dieses Dokument hier ist die vollständige Anleitung — lies es, sobald du
über das Kopieren hinausgehst.

**Kopierfertige React-Komponente:** `lib/KaquaViewer.jsx`. Sie kapselt
die drei Dinge, die beim Einbau schiefgehen: den einen WebGL-Kontext, das
Nachziehen der Bühnengröße und das Freigeben der Geometrie beim Wechsel.

---

## 1 · Was hier liegt

```
dist/
├── EINBAU.md                         ← Kurzfassung, drei Schritte
├── lib/                              ← DAS ist der Integrationspfad
│   ├── KaquaViewer.jsx               kopierfertige React-Komponente
│   ├── index.mjs                     Sammeleinstieg: mount, loadProduct, REGISTRY
│   ├── kaqua-3d-core.mjs             Core (Geometrie, Material, Viewer, Export)
│   ├── stage.js                      Web-Component <three-d-stage>, klassisches Skript
│   ├── registry.mjs / .json          Produktliste
│   └── products/<slug>.mjs           15 Produktmodule, je ein default-Export
│
├── kaqua-<modul>.html                28 fertige Einzelseiten, offline lauffähig
├── kaqua-3d-galerie.html             alle 71 Produkte auf einer Seite
├── export.html                       Standbilder · GLB · OBJ als ZIP
└── lib-selbsttest.html               Prüfblatt, siehe oben
```

Drei Wege, je nach Ziel:

| Ziel | Nimm |
|---|---|
| Viewer in eine bestehende Produktseite einbauen | `lib/` — Abschnitt 3 |
| Schnell etwas zeigen, ohne Build | `kaqua-<modul>.html` per `<iframe>` — Abschnitt 6 |
| Übersichtsseite über alle Produkte | `kaqua-3d-galerie.html` als Vorlage — Abschnitt 7 |

---

## 2 · Voraussetzungen

**three.js r184 oder neuer**, als bare specifier `three` auflösbar.
Der Core importiert `three` und `three/addons/…`; beides muss dein Bundler
oder deine Importmap kennen.

npm:
```bash
npm install three@^0.184.0
```

ohne Bundler — Importmap in den `<head>`, **vor** allen Modulskripten:
```html
<script type="importmap">
{
  "imports": {
    "three": "https://unpkg.com/three@0.184.0/build/three.module.js",
    "three/addons/": "https://unpkg.com/three@0.184.0/examples/jsm/"
  }
}
</script>
```

Die genaue Fassung, mit der gebaut wurde, steht in `build/importmap.json`.

**Kein weiteres Paket.** Keine React-Abhängigkeit, kein CSS-Framework, keine
Laufzeit-Assets. Die Modelle sind prozedural — es gibt keine `.glb`-Datei zu
laden und keine Textur zu hosten.

---

## 3 · Einbau in eine Produktseite

### 3.1 Der kurze Weg

`mount()` erzeugt den kompletten Bedienrahmen: Größenwahl, Explosionsansicht,
Halbschnitt, Bemaßung, Kamera-Presets, Tastatursteuerung, WebGL-Fallback.

```html
<div id="viewer"></div>

<script src="/kaqua-3d/lib/stage.js"></script>
<script type="module">
  import { mount, loadProduct } from '/kaqua-3d/lib/index.mjs';

  const product = await loadProduct('fittings/cap');
  mount(product, { host: document.querySelector('#viewer') });
</script>
```

**`stage.js` muss als klassisches `<script>` geladen werden, nicht als Modul** —
es registriert die Custom Element `<three-d-stage>` global. Ohne sie wirft
`mount()` eine erklärende Fehlermeldung statt stumm zu scheitern.

### 3.2 Optionen von `mount()`

```js
mount(product, {
  host: element,          // wohin der Rahmen kommt. Default: document.body
  size: 32,               // Startgröße. Default: product.defaultSize
  features: ['size', 'explode', 'section', 'dims', 'presets'],
  injectCss: true,        // false, wenn du das CSS selbst einbindest (3.4)
  injectHtml: true,       // false, wenn du das Markup selbst stellst (3.5)
});
```

`features` weglassen heißt: alles an. Reduzierte Fassung für eine Kachel:

```js
mount(product, { host: el, features: ['size'] });
```

Der Auf/Zu-Knopf erscheint automatisch nur bei Produkten mit beweglichen
Teilen (aktuell nur der Kugelhahn). Du musst nichts abfragen.

### 3.3 Rückgabewert

```js
const app = mount(product, { host: el });

app.ok            // false, wenn kein WebGL2 — dann steht die Maßtabelle als Fallback
app.stage         // die <three-d-stage>
app.built         // die laufende Baugruppe
app.size()        // aktuelle Nennweite
app.setSize(40)   // Größe wechseln
app.measure()     // Soll/Ist der aktuellen Größe
app.measureAll()  // Soll/Ist über alle Größen — der Maßtest
app.testMode('silhouette' | 'gray' | null)
```

`app.measureAll()` ist auch nach der Integration nützlich: es ist der
schnellste Weg zu prüfen, ob der Einbau die Geometrie angetastet hat.

### 3.4 Eigenes Styling

Der Rahmen benutzt CSS-Variablen des Coday Design Systems
(`--color-primary-700`, `--font-display`, `--radius-2xl`, …). Sie kommen aus
`assets/coday-tokens.css`. Wenn dein Projekt diese Variablen schon global
definiert, setze `injectCss: false` und binde nur dein eigenes Blatt ein — der
Rahmen übernimmt deine Werte.

Definiert dein Projekt sie **nicht**, lass `injectCss: true`, sonst fallen die
Farben auf Browser-Defaults zurück.

**Ein Fallstrick bei Kartenflächen:** `--color-card-bg` und
`--color-bg-primary` lösen im Coday-Tokenset beide zu `#fafafa` auf. Eine
Karte, die `--color-card-bg` benutzt, ist damit unsichtbar gegen den
Seitengrund. Das UI-Kit setzt an seinen drei Kartenvarianten
(`.port-card`, `.ind-card`, `.compare-col`) deshalb literales `#fff`.
Die Galerie tut dasselbe.

### 3.5 Nur das Modell, ohne Rahmen

Wenn du deine eigene Bedienung bauen willst:

```js
import { loadProduct } from '/kaqua-3d/lib/index.mjs';
import * as THREE from 'three';

const stage = document.querySelector('three-d-stage');
await stage.ready;

const product = await loadProduct('pipes/k-fiber-pipe-pp-r-sdr-7-4');
const built = product.build(product.defaultSize, null, null);

// Das Modell ist in MILLIMETERN. Die Szene rechnet in Metern.
const holder = new THREE.Group();
holder.scale.setScalar(0.001);
holder.add(built.root);
stage.setObject(holder);

built.setExplode(0.6);              // 0…1
built.setSection(true, clipPlane);  // THREE.Plane
built.dispose();                    // beim Wechsel IMMER aufrufen
```

Drei Dinge, die dabei schiefgehen:

1. **Millimeter vergessen.** Ohne `scale 0.001` steht ein 121 mm langes Ventil
   als 121 m großes Objekt in der Szene und die Kamera rahmt ins Leere.
2. **`dispose()` vergessen.** Jeder Größenwechsel erzeugt neue Geometrien und
   Materialien. Ohne Freigabe wächst der GPU-Speicher bis zum Kontextverlust.
3. **Bühne umhängen, ohne `resize()` zu rufen.** Siehe Abschnitt 5.

---

## 4 · Nur ein WebGL-Kontext pro Seite

**Die wichtigste Regel.** Browser erlauben 8 bis 16 gleichzeitige
WebGL-Kontexte; darüber verwirft der Treiber die ältesten und die Seite bricht
ab. Zehn Produktkacheln mit je einem eigenen Viewer sind deshalb kein
Skalierungsproblem, sondern ein Absturz.

Lösung: **eine** `<three-d-stage>` erzeugen und sie zwischen den Kacheln
umhängen. So macht es `kaqua-3d-galerie.html`, und das ist die Vorlage:

```js
const stage = document.createElement('three-d-stage');
stage.setAttribute('background', 'transparent');
container.appendChild(stage);

async function show(id, slot) {
  await stage.ready;
  if (active) { active.dispose(); active = null; }   // erst abbauen
  const product = await loadProduct(id);
  const built = product.build(product.defaultSize, null, null);
  const holder = new THREE.Group();
  holder.scale.setScalar(0.001);
  holder.add(built.root);
  stage.setObject(holder);
  active = built;
  slot.appendChild(stage);        // umhängen
  stage.resize();                 // Pflicht, siehe Abschnitt 5
  requestAnimationFrame(() => stage.resize());
}
```

Für viele Kacheln auf einer Übersichtsseite: Standbild in der Kachel, Viewer
erst auf Klick. Die Standbilder erzeugt `stills()` aus dem Core (Abschnitt 8).

---

## 5 · `stage.resize()` — der Stolperstein

Die Komponente bringt im Shadow DOM `:host { height: 100vh }` mit. Zwei Folgen:

**Erstens** braucht jeder Mount eine CSS-Regel, die die Größe setzt:

```css
.mein-viewer three-d-stage,
.meine-kachel three-d-stage { position: absolute; inset: 0; width: 100%; height: 100%; }
```

Fehlt sie, wächst die Bühne auf Viewport-Höhe und wird vom Container
abgeschnitten.

**Zweitens** löst ein `appendChild` in einen anders großen Container den
internen ResizeObserver nicht zuverlässig aus. Nach jedem Umhängen:

```js
stage.resize();
requestAnimationFrame(() => stage.resize());
```

Zweimal, weil der Slot im Moment des `appendChild` noch keine Layoutgröße hat.
Ohne das rendert die Kachel einen Ausschnitt der vorherigen Größe — der Nutzer
sieht eine fast leere Ecke statt des Produkts.

---

## 6 · Der Weg ohne Build: iframe

Wenn kein Bundler im Spiel ist oder es schnell gehen muss:

```html
<iframe src="/kaqua-3d/kaqua-cap.html" title="Kappe — 3D-Ansicht"
        loading="lazy" style="width:100%;aspect-ratio:16/10;border:0"></iframe>
```

Jede dieser Dateien ist vollständig eigenständig: three.js aus der Importmap,
Schriften als base64 eingebettet, keine externen Assets. Rund 362 kB, davon
235 kB Schriften.

`loading="lazy"` ist hier nicht Feinschliff, sondern die Umsetzung von
Abschnitt 4: jedes geladene iframe ist ein eigener WebGL-Kontext.

---

## 7 · Übersichtsseite

`kaqua-3d-galerie.html` zeigt alle 71 Produkte, davon 15 mit Modell.
Kategoriefilter, Freitextsuche über Titel und Artikelnummer, Raster- und
Listenansicht, Zustand in der URL (`?kategorie=pipes&q=fiber&produkt=…`).

**Jede Kachel ist ein geschlossenes `<article>`** mit eigener Überschrift,
Artikel- und Größenbereich. Sie lässt sich unverändert auf eine Produktseite
heben — genau dafür ist sie so gebaut. Das Muster steht in `gallery/index.js`.

Produkte ohne Modell bleiben als flache Kachel stehen. Der Katalog ist damit
vollständig und der Fortschritt sichtbar; ob ein Modell existiert, steht in
`registry.mjs` als `status: 'fertig'`.

---

## 8 · Standbilder, GLB, OBJ

**Der bequeme Weg:** `dist/export.html` öffnen, Produkt wählen, exportieren.
Erzeugt die fünf Standbilder, GLB und OBJ+MTL und lädt alles als ZIP herunter;
„Alle Produkte" fährt die ganze Liste durch.

Programmatisch, aus dem Core:

```js
import { stills, STILL_VIEWS, exportGLB, exportOBJ, download } from '/kaqua-3d/lib/index.mjs';

// Fünf Ansichten: hero, front, top, section, explosion
const bilder = await stills(app, STILL_VIEWS);
bilder.forEach((b) => download(b.blob, b.name + '.png'));

// GLB: Meter, Y-up — was glTF-Viewer und AR-Werkzeuge erwarten
download(await exportGLB(product, { size: 32 }), 'kappe-d32.glb');

// OBJ + MTL: Millimeter — was CAD-Werkzeuge erwarten
const { obj, mtl, basename } = await exportOBJ(product, { size: 32 });
```

Die Einheitenwahl ist Absicht und keine Inkonsistenz: GLB und OBJ bedienen
verschiedene Werkzeugketten mit verschiedenen Konventionen.

Materialnamen im Export sind die Schlüssel der Materialregistry
(`pprGreen`, `fiberLayer`, `steel`, …) und beim Reimport wiedererkennbar.

---

## 9 · Produktliste

`registry.mjs` liefert für jedes Modell `{ id, slug, module, titleDe, titleEn,
category }`. Die vollständige Liste mit Familie, Artikelnummern und Baustatus
über alle 71 Produkte steht in `gallery/registry.js`.

Die 28 vorhandenen Modelle:

| Produkt-ID | Titel | Größen |
|---|---|---|
| `valves/pp-r-ball-valve-ball-in-pp` | Kugelhahn PP-R (Kugel in PP) | 6 |
| `fittings/cap` | Kappe | 14 |
| `fittings/socket` | Muffe | 9 |
| `fittings/elbow-45` | Winkel 45° | 10 |
| `fittings/elbow-90` | Winkel 90° | 10 |
| `fittings/tee` | T-Stück | 10 |
| `fittings/cross` | Kreuz | 2 |
| `fittings/reducing-bush` | Reduzierbuchse | 17 |
| `transition-fittings/adaptor-socket-male-thread` | Übergangsmuffe mit Außengewinde | 12 |
| `accessories/plug` | Stopfen | 1 |
| `accessories/flat-gasket` | Flachdichtung | 11 |
| `accessories/flat-gasket-for-unions` | Flachdichtung für Verschraubungen | 3 |
| `accessories/backing-flange` | Bundflansch PP-Stahl | 11 |
| `accessories/pipe-clamps` | Rohrschelle | 9 |
| `transition-fittings/union` | Verschraubung | 6 |
| `transition-fittings/metal-union-female-thread` | Metallverschraubung mit PP-R-Mutter (Innengewinde) | 6 — **Prototyp** |
| `pipes/k-pipe-pp-r-sdr-6` | K-Rohr PP-R SDR 6 | 10 |
| `pipes/k-pipe-pp-r-sdr-11` | K-Rohr PP-R SDR 11 | 9 |
| `pipes/k-pipe-purple-pp-r-sdr-11` | K-Rohr Violett PP-R SDR 11 | 9 |
| `pipes/k-pipe-pp-rct-sdr-7-4` | K-Rohr PP-RCT SDR 7,4 | 10 |
| `pipes/k-fiber-pipe-pp-r-sdr-7-4` | K-Fiber Rohr PP-R SDR 7,4 | 14 |
| `pipes/k-fiber-pipe-pp-rct-sdr-7-4` | K-Fiber Rohr PP-RCT SDR 7,4 | 10 |
| `pipes/k-fiber-pipe-pp-r-sdr-9` | K-Fiber Rohr PP-R SDR 9 | 8 |
| `pipes/k-fiber-pipe-pp-r-sdr-11` | K-Fiber Rohr PP-R SDR 11 | 9 |
| `pipes/k-fiber-pipe-pp-r-sdr-17` | K-Fiber Rohr PP-R SDR 17 | 8 |
| `pipes/k-fiberclima-pipe-pp-rct-sdr-11` | K-FiberClima Rohr PP-RCT SDR 11 | 9 |
| `pipes/k-fiber-uv-pipe-pp-rct-sdr-7-4` | K-Fiber UV Rohr PP-RCT SDR 7,4 | 9 |
| `pipes/k-fiber-uv-pipe-pp-r-sdr-7-4` | K-Fiber UV Rohr PP-R SDR 7,4 | 10 |

Beachte die Schreibweise `sdr-7-4`, nicht `sdr-74` — sie folgt
`produkt-registry.json`, der kanonischen Quelle.

**Ein Produkt trägt `status: 'prototyp'`.** Bei der Metallverschraubung ist
die Tabellenspalte `SW` nicht auflösbar, und sie bestimmt die Breite des
Metallteils. Maße und Gewinde stimmen; die Gestalt des Metallteils ist eine
Fotoableitung. Die Galerie zeigt an solchen Kacheln „Maße vorläufig",
`registry.mjs` führt den Status mit. Begründung und die geprüften
Verhältnisse stehen in `products/metal-union-female-thread/data.js`.

---

## 10 · Barrierefreiheit

Ist eingebaut, aber nicht selbsttätig — du musst es nicht nachrüsten, aber auch
nicht kaputt machen:

- `<three-d-stage>` trägt `role="img"` und ein `aria-label`, das Artikelnummer
  und alle Maße in Worten nennt. Es wird bei jedem Größenwechsel aktualisiert.
- Die Bühne ist tastaturbedienbar: Pfeiltasten drehen, `+`/`−` zoomen, `R`
  setzt zurück, `O` schaltet Auf/Zu.
- Ohne WebGL2 erscheint die vollständige Maßtabelle als HTML. Sie ist keine
  Notlösung, sondern trägt dieselben Zahlen.
- `prefers-reduced-motion` verkürzt Animationen auf 120 ms und stoppt die
  automatische Drehung.
- Alle Schaltflächen der Galerie sind ≥ 44 px hoch, Fokusring 2 px in
  Primärfarbe. Die Maße stammen aus `.btn` des Website-UI-Kits (48 px hoch,
  `min-height: 44px`, Radius `--radius-xl`) — wenn du eigene Bedienelemente
  ergänzt, übernimm sie von dort und erfinde sie nicht neu.
- Der Bedienrahmen von `mount()` selbst hält dieselbe Grenze.

**Setze kein `aria-hidden` auf den Viewer** und überschreibe das `aria-label`
nicht — es ist der einzige Zugang zu den Maßen für Screenreader-Nutzer.

---

## 11 · Was du NICHT tun solltest

| | Warum |
|---|---|
| Die Dateien in `lib/` von Hand bearbeiten | Sie sind erzeugt. Quelle ist `core/` und `products/`; der nächste Bau überschreibt deine Änderung. |
| Mehrere `<three-d-stage>` gleichzeitig | Abschnitt 4. |
| Eine Farbe direkt in ein Produktmodul schreiben | Farben stehen ausschließlich in der Materialregistry (`MAT` in `core/materials.js`). `PPR_GREEN` ist **eine** Konstante — eine CI-Korrektur ist damit eine Zeile für alle Produkte. |
| Maße aus den Markdown-Produktseiten übernehmen | Die Markdown-Dateien im Repo sind unvollständig und teils falsch. Verbindlich sind die `data.js` der Produktpakete, jede gegen den Herstellerscreenshot verifiziert. Korrigierte Markdowns liegen in `produkt-markdown/`. |
| `three` als relativen Pfad einbinden | Der Core importiert den bare specifier `three`. Ein relativer Pfad lädt eine zweite Kopie, und zwei three.js-Instanzen in einer Szene führen zu stillen Fehlern. |

---

## 12 · Offene Punkte

Ehrlich benannt, weil sie die Integration nicht blockieren, aber vor der
Veröffentlichung geklärt sein sollten:

| Punkt | Wo |
|---|---|
| **Bedeutung der Spalte `z`** bei Winkel und T-Stück. Bei der Muffe ist es nachweislich die Anschlagdicke, und dort bestätigt `(l−z)/2` die Normreihe der Schweißtiefen exakt. Bei Winkel und T-Stück streut `leg−z` um bis zu 3 mm — modelliert ist deshalb die Normreihe, weil das Schweißwerkzeug je Nennweite dasselbe ist. Beim Hersteller zu klären. | `products/tee/data.js` |
| **Körperfarbe des Violettrohrs.** Die Zeichnungsminiatur nennt „green with 1 red stripe" — wörtlich dasselbe wie beim grünen SDR-11-Rohr. Produktname und Titel sagen „Purple". Entschieden für Violett; ist die Miniatur maßgeblich, genügt eine Zeile in `LAYERS`. | `products/k-pipe-purple-…/data.js` |
| **Innenflächen am T-Stück-Abzweig überlappen** an der Durchdringung. Von außen unsichtbar, im Halbschnitt an der Kehle sichtbar. Ohne CSG nicht anders lösbar; alle Maße unberührt. | `products/_tee/parts.js` |
| **`PPR_GREEN = #17A46B`** — gegen das Katalogfoto der Muffe abgetastet: 2 % Abweichung in der Helligkeit, maximal 6 von 255 pro Kanal. Gilt als bestätigt; ein Spektrometer am Bauteil wäre die letzte Stufe. | `core/materials.js` |
| **Schichtdicken der Faserrohre** 30/40/30 % der Wandstärke. Die Zeichnung nennt den Faserkern, aber keine Lagenmaße. | `products/k-fiber-*/data.js` |
| **K-Fiber SDR 7,4, d315:** `Di` am Screenshot als 229,8 gelesen, was `D − 2·S = Di` verletzt. Übernommen ist 228,8, markiert als abgeleitet. | `build/pipe-specs.json` |
| **Muffe d110:** `z`, `kg` und `Pack.` sind in der Quelle leer. `z = 12,0` ist aus d90 gerechnet. | `products/socket/data.js` |
| **Vergleichstest gegen Katalogfotos** ist für Kappe und Muffe gelaufen. Für die Rohre ist er nicht durchführbar: ihre Katalogbilder sind CG-Renders, die der eigenen technischen Zeichnung widersprechen (einfarbig grün, obwohl vier Streifen gezeichnet sind). Für Winkel und T-Stück steht er aus. | `pruefung/` |

Die Maße selbst sind geprüft: `app.measureAll()` über alle 15 Produkte ergibt
maximal 0,18 mm Abweichung, und dieser Wert ist der beabsichtigte
Formtrenngrat.

---

## 13 · Ein neues Produkt hinzufügen

Vier Dateien, kein Viewer-Code, kein CSS:

```
products/<slug>/
├── data.js     ARTICLES · SIZES · DIMENSION_KEY · article(d)
├── params.js   params(dNom) — jedes abgeleitete Maß gerechnet, nie hartkodiert
├── parts.js    die Konturen, ausschließlich mit Core-Funktionen
└── index.js    das Produktobjekt
```

Vollständige Schnittstelle: `core/PRODUKT-VERTRAG.md`.
Kürzestes Beispiel: `products/socket/`. Reichstes: `products/ball-valve-pp/`.

Danach in `gallery/registry.js` den `status` auf `'fertig'` setzen und
neu bauen:

```bash
node build/bundle.mjs --all      # Standalone-HTML
node build/bundle.mjs --lib      # ES-Module
```

`build/browser-build.mjs` enthält dieselbe Logik für eine Browserumgebung
ohne Node, einschließlich Galerie- und Bibliotheksbau.
