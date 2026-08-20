# 10 — SYSTEM-ARCHITEKTUR

Wie Core, Produkte, Galerie und Bau zusammenhängen. Einmal lesen, dann als
Nachschlagewerk.

---

## 1 · Die Trennung

```
        ┌──────────────────────────────────────────┐
        │  core/          FERTIG, gegen 21 Produkte │
        │                 erprobt. Nicht ändern     │
        │                 außer nach §7.             │
        └────────────────┬─────────────────────────┘
                         │ importiert
        ┌────────────────▼─────────────────────────┐
        │  products/<slug>/   4 Dateien je Produkt │
        │  data · params · parts · index            │
        └────────────────┬─────────────────────────┘
                         │ liest
        ┌────────────────▼─────────────────────────┐
        │  gallery/ + build/   Darstellung und Bau  │
        └──────────────────────────────────────────┘
```

**Die Richtung ist einseitig.** Der Core kennt kein Produkt. Ein Produkt kennt
keine Galerie. Wer diese Richtung umkehrt, macht den Core produktabhängig —
dann lässt sich ein Produkt nicht mehr allein austauschen.

---

## 2 · Was der Core leistet

| Datei | Verantwortung |
|---|---|
| `geometry.js` | 26 Funktionen: Profile, Rotationskörper, Loft, Sweep, Gewinde, Sechskant, Rohrlagen. Fasen ≥ 0,3 mm und 1° Entformung sind hier verankert |
| `materials.js` | 13 Rezepte, **eine** Farbkonstante `PPR_GREEN`, prozedurale Roughness, Kantenverschleiß |
| `assembly.js` | Teile-Factory `part()`, Explosion, Halbschnitt mit Stencil-Caps, Messwerkzeuge `boxOf`/`probeAxial`/`triangleCount`, Prüfmodi |
| `overlay.js` | Maßlinien als Geometrie, DOM-Labels mit Kollisionsvermeidung |
| `ui.js` | Bedienrahmen: HTML-Gerüst und CSS. Größenknöpfe, Metaleiste, Fallback-Tabelle werden **erzeugt** |
| `viewer.js` | `mount()`: Größenwahl, Explosion, Schnitt, Bemaßung, Presets, Tastatur, WebGL-Fallback, `mm → m` |
| `export.js` | GLB (Meter, Y-up), OBJ+MTL (mm), Standbildserie |
| `stage.js` | WebGL-Bühne als Web-Component. Renderer, Licht, OrbitControls, Export-Toolbar |

**Kein Bezeichner im Core ist an ein Bauteil gebunden.** Wer `ball`, `lever`,
`socket` im Core findet, hat einen Schnittfehler gefunden.

---

## 3 · Was ein Produkt leistet

| Datei | Inhalt | Darf nicht |
|---|---|---|
| `data.js` | `ARTICLES`, `SIZES`, `DIMENSION_KEY`, `article()`, alle Befunde als Kommentar | rechnen |
| `params.js` | `params(key)` → aufgelöste Maße, Wächter | Geometrie erzeugen |
| `parts.js` | Konturen, nur Core-Funktionen | Maße festlegen |
| `index.js` | Produktobjekt nach `50-PRODUKT-VERTRAG` | UI, CSS, Farben |

**Die Rangordnung der Maße:**

| Rang | Quelle | Beispiel |
|---|---|---|
| 1 | Maßtabelle des Screenshots | `d`, `D`, `l`, `z` |
| 2 | daraus gerechnet | `wall = (D − d)/2` |
| 3 | Norm | `fusionDepth(d)` nach DVS 2207-11 |
| 4 | Fachwissen, **immer** mit `ASSUMPTION` | Kehlradius `0,18·d` |

Rang 4 ohne `ASSUMPTION` ist ein Fehler. Rang 1 hartkodieren statt aus
`data.js` zu lesen, ebenfalls.

---

## 4 · Familienmodule

Wenn `params.js` und `parts.js` bei mehreren Produkten **wörtlich identisch**
sind, wandern sie nach `products/_<familie>/`. Im Produkt bleibt eine Hülle:

```js
// products/k-pipe-pp-r-sdr-11/params.js — vier Zeilen
import { pipeParams } from '../_pipe/params.js';
import { article, SDR, STOCK_LENGTH_M } from './data.js';
export function params(dNom) {
  return pipeParams(article(dNom), { sdr: SDR, stockLength: STOCK_LENGTH_M });
}
```

```js
// products/k-pipe-pp-r-sdr-11/parts.js — eine Zeile
export { buildTube, buildStripe } from '../_pipe/parts.js';
```

**Vorhandene Familien:**

| Modul | Produkte | Was geteilt wird |
|---|---|---|
| `_pipe` | 12 Rohre | `pipeParams`, `buildTube`, `buildStripe` |
| `_bend` | Winkel 45°/90° | `bendParams`, `buildBend` |
| `_tee` | T-Stück, Reduzier-T | `teeParams`, `buildTee` |

**Schwelle:** ab dem **dritten** Produkt mit identischer Logik. Bei zwei ist
Duplizierung billiger als die Abstraktion.

**Wichtig für den Bau:** der Bundler muss die Familiendateien kennen
(`familyFor()` in `build/incremental.mjs`). Ein neues Familienmodul dort
eintragen, sonst fehlen die Funktionen im Bundle.

---

## 5 · Die Galerie

`dist/kaqua-3d-galerie.html` — alle 71 Produkte auf einer Seite.

**Die Regel, an der die Seite hängt: höchstens EIN WebGL-Kontext.** Browser
erlauben 8–16; darüber verwirft der Treiber die ältesten und die Seite bricht
ab. Es existiert genau eine `<three-d-stage>`, die zwischen Kopfbereich und
Kacheln **wandert**.

```js
// Der tatsächliche Ort der Bühne ist die einzige Wahrheit.
let mountId = null;   // null = Kopfbereich, sonst die Produkt-ID

function place(id) {
  const slot = id === null ? hero : grid.querySelector('[data-slot="…"]');
  if (!slot) return place(null);        // Kachel ausgefiltert → zurück
  mountId = id;
  if (stage.parentElement !== slot) slot.appendChild(stage);
  stage.resize();                      // Pflicht
  requestAnimationFrame(() => stage.resize());
  // … alles Abhängige aus mountId ableiten
}
```

**Zwei Fallen, die je einen Fehler gekostet haben:**

**`stage.resize()` nach jedem Umhängen, zweimal.** Ein `appendChild` in einen
anders großen Container löst den internen ResizeObserver nicht zuverlässig
aus, und beim `appendChild` hat der Slot noch keine Layoutgröße.

**CSS-Regel für jeden Mount.** Die Komponente bringt im Shadow DOM
`:host { height: 100vh }` mit:

```css
.hero three-d-stage,
.tile-stage three-d-stage { position: absolute; inset: 0; width: 100%; height: 100%; }
```

Fehlt sie, wächst die Bühne auf Viewport-Höhe und wird abgeschnitten.

**Jede Kachel ist ein geschlossenes `<article>`** mit eigener Überschrift,
Artikel- und Größenbereich. Sie lässt sich unverändert auf eine Produktseite
heben — das ist der Zweck.

---

## 6 · Ein Anzeigestring, eine Quelle

Dreimal aufgetreten, dreimal derselbe Mechanismus: ein Text, der an zwei
Stellen entsteht, driftet.

| Was | Falsch | Richtig |
|---|---|---|
| Titel | `registry.de` **und** `product.titleDe` | `titleOf(p)` — Produktmodul gewinnt |
| Größenbereich | `'d' + sizes[0]` selbst gebaut | `rangeOf(p)` nutzt `product.sizeLabel` |
| Suchindex | nur erste und letzte Artikelnummer | `registry.alle` — alle Nummern |

**Regel:** Die Galerie **benutzt** die Formatierung des Produktmoduls, statt
sie nachzubilden.

**Ausnahme, bewusst:** Bei der **Produkt-ID** ist die Registry kanonisch
(`sdr-7-4`, nicht `sdr-74`), weil sie die Verknüpfung zur Website herstellt.
Beim Anzeigenamen entscheidet die Quelle.

---

## 7 · Wann der Core geändert werden darf

Der Core ist gegen 21 Produkte erprobt. Änderungen sind riskant, aber
manchmal nötig.

### Erlaubt

**Eine neue Geometriefunktion**, wenn ein **zweites** Produkt sie braucht. Die
Regel hat `fusionDepth()` aus `products/cap/params.js` in den Core gebracht.
Anforderungen: Kopfkommentar mit Zweck, Signatur, Minimalbeispiel; gleiche
Fasen- und Entformungslogik; getestet an **zwei** verschiedenen Parametern.

**Eine Erweiterung einer bestehenden Funktion**, rückwärtskompatibel.
Beispiel: `sweepPath` nimmt jetzt auch eine Funktion als `loop`. Alte Aufrufe
funktionieren unverändert.

**Ein neuer Materialschlüssel** in `MAT`. `blueStripe` und `greyStripe` kamen
so hinzu.

**Ein neues Feld im Produktvertrag**, wenn es optional ist. `sizeKey` kam so
hinzu — fehlt es, adressiert der Core über `d` wie vorher.

### Nicht erlaubt

| | Warum |
|---|---|
| Ein Bauteilname im Core | Macht ihn produktabhängig |
| Rezeptwerte ändern | 21 Produkte sehen anders aus. `PPR_GREEN` ist gegen ein Katalogfoto verifiziert |
| Segmentzahlen im Produkt überschreiben | Facettierung driftet auseinander |
| Eine Änderung ohne Neubau **aller** Einzelviewer | Sie tragen den Core eingebettet |

**Nach jeder Core-Änderung:** `node build/incremental.mjs cache`, dann alle
Einzelviewer, dann Bibliothek, dann Galerie. Und der Selbsttest.

---

## 8 · Der Bau

```
build/
├── incremental.mjs      inkrementell, mit Caches — für den täglichen Gebrauch
├── bundle.mjs           Vollbau, ohne Caches
├── browser-build.mjs    dieselbe Logik für Umgebungen ohne Node
├── importmap.json       three.js-Fassung
└── cache/               Zwischenstände
```

```bash
node build/incremental.mjs check              # sind Caches aktuell?
node build/incremental.mjs cache              # erneuern
node build/incremental.mjs product <slug>     # ein Viewer
node build/incremental.mjs lib                # ES-Module
node build/incremental.mjs gallery            # Galerie
node build/incremental.mjs all                # alles
```

**Drei Regeln** (Begründung in `90-PRUEFKATALOG §5.1`):

1. Jeden Schritt einzeln. Ein Timeout verwirft alle Schreibvorgänge, meldet
   aber Erfolg.
2. Nach jedem Bau die **Dateiliste** prüfen, nicht die Logzeile.
3. `lib` immer über die volle Produktliste — die Indexdateien sind Indizes.

---

## 9 · Die Ausgaben

| Datei | Zweck | Größe |
|---|---|---|
| `dist/kaqua-<modul>.html` | eine Produktseite, offline lauffähig | ~370 kB |
| `dist/kaqua-3d-galerie.html` | alle 71 auf einer Seite | ~650 kB |
| `dist/lib/` | ES-Module für die Integration | ~40 kB + je Produkt |
| `dist/export.html` | Standbilder, GLB, OBJ als ZIP | — |
| `dist/lib-selbsttest.html` | Prüfblatt: lädt jedes Modul und vermisst es | — |
| `dist/INTEGRATION.md` | Anleitung für die Website-Integration | — |

Von den 370 kB einer Produktseite sind 235 kB eingebettete Schriften. Sie
müssen inline sein, weil externe Assets zur Laufzeit ausgeschlossen sind.

---

## 10 · Einheiten

| Kontext | Einheit | Warum |
|---|---|---|
| `data.js`, `params.js`, `parts.js` | **Millimeter** | Katalogmaße sind in mm |
| Szene | Meter | three.js-Konvention, Licht und Schatten rechnen damit |
| GLB-Export | Meter, Y-up | glTF-Viewer und AR-Werkzeuge erwarten das |
| OBJ-Export | Millimeter | CAD-Werkzeuge erwarten das |

Die Umrechnung passiert an **genau zwei Stellen**: der Wrappergruppe in
`viewer.js` und in `export.js`. Kein Produkt rechnet mit 0,001.

**Der häufigste Anfängerfehler:** die Skalierung vergessen. Ohne
`scale 0.001` steht ein 121 mm langes Ventil als 121 m großes Objekt in der
Szene, und die Kamera rahmt ins Leere.
