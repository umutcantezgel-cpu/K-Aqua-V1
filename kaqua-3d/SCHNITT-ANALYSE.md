# Schnittanalyse — Core vs. Produktpaket

Teil 2, Schritt 1–2. Zuordnung vor dem ersten Code.
Grundlage: `valve-data.js`, `valve-geometry.js`, `valve-parts.js`, `valve-materials.js`, `valve-build.js`, `valve-app.js`, `three-d-stage.js`, `valve-viewer.html` (alle im Projekt vorhanden, nicht aus dem HTML rekonstruiert).

**Testfrage durchgängig:** „Würde ein T-Stück diese Funktion unverändert brauchen?"

---

## STAND

```
Core ✗ · Produkte 0/71 (Kugelhahn existiert, noch nicht portiert) · Galerie ✗
aktuell: Teil 2 — Core-Refactor, Schritt 2 (Schnitt zeigen)
```

---

## 1 · `valve-data.js` → Produktpaket + eine Core-Konstante

| Bezeichner | Ziel | Begründung |
|---|---|---|
| `ARTICLES` | **Produkt** `data.js` | Artikeltabelle ist per Definition produktspezifisch |
| `SIZES` | **Produkt** `data.js` | wird `product.sizes` |
| `article(d)` | **Core** `viewer.js` | reine Suche `articles.find(a => a.d === size)` — jedes Produkt braucht sie identisch |
| `PPR_GREEN` | **Core** `materials.js` | eine einzige Farbkonstante für alle 71 Produkte |

---

## 2 · `valve-geometry.js` → fast vollständig Core

| Funktion | Ziel | Begründung |
|---|---|---|
| `D2R`, `DRAFT` | Core | Entformungsschräge ist Core-Verhalten, keine Produktentscheidung |
| `sub`, `nrm`, `dist` (privat) | Core | Vektorhilfen |
| `dedupe` | Core | Profilhygiene |
| `expandChamfers` | Core | **Fasenlogik = Qualitätsstandard.** Muss überall gleich sein |
| `applyFillets` | Core | dito; konstante Punktzahl pro Ecke ist Loft-Voraussetzung |
| `buildProfile` | Core | zentraler Einstieg für jedes Profil |
| `mirrorProfile` | Core | Symmetrieausnutzung — Muffe, Kappe, T-Stück, alles |
| `arcPts` | Core | Bogenpunkte |
| `ringGrooves` | Core | Ringnuten: Mutter, Stutzen, E-Muffe, Verschraubungen |
| `thetaSamples` | Core | ungleichmäßige Umfangsabtastung für Modulation |
| `grooveMod` | Core | Riffelung — Mutter, Verschraubung, Kappe, Werkzeuggriff |
| `ribMod` | Core | Längsrippen — Hebel, Griffe, Handrad |
| `revolve` | Core | Rotationskörper mit radialer Modulation. Das Arbeitspferd |
| `capFromProfile` | Core | Stencil-Schnittfläche aus dem Profil |
| `polygonCap` | Core | Schnittfläche für Nicht-Rotationskörper |
| `loft` | Core | Querschnittsfolge — Hebel, Griffe, Sattel, Abzweig |
| `mergeGeometries` | Core | Teile-Merge |
| `roundedPad` | Core | verrundeter Klotz — Laschen, Mitnehmer, Befestigungsaugen |
| **`params(dNom)`** | **Produkt** `params.js` | vollständig kugelhahnspezifisch (`ballD`, `seatSphR`, `lever`, `domeTop`, …) |

Ein T-Stück braucht **jede** dieser Funktionen außer `params()` unverändert. Der Schnitt liegt hier exakt an der Modulgrenze minus einer Funktion.

### Ergänzungen im Core (§2 des Auftrags, im Kugelhahn nicht vorhanden)

| Neu | Signatur | Erster Abnehmer |
|---|---|---|
| `sweepPath` | `(profile, path, opt)` | #5 Winkel 45°, #6 Winkel 90°, #56 Überbogen |
| `branchJoin` | `(main, branch, angle, filletR)` | #7 T-Stück, #39 Kreuz, #30 Sattel, #48 Wandscheibe |
| `threadProfile` | `(D, pitch, turns, kind)` | #9/#10 Übergangsmuffen, alle Gewindefittings |
| `hexPrism` | `(af, h, filletR)` | #25/#26 Metallverschraubungen |
| `knurl` | `(r, h, count, depth)` | Verschraubungen, Werkzeuge — Wrapper um `grooveMod` |
| `tubeLayers` | `(d, s, layers)` | alle 12 Rohre, Faserschicht im Schnitt |

Alle mit derselben Fasen- (≥ 0,3 mm) und Entformungslogik (1°) wie der Bestand. Jede mit Minimalbeispiel im Kopfkommentar.

**Zusätzlich in den Core, weil sie heute als Magic Numbers in `valve-parts.js` stehen:**
`SEG_VIS = 96` und `SEG_INT = 40`. Segmentzahlen sind Qualitätsstandard (Teil 7), nicht Produktentscheidung.

---

## 3 · `valve-materials.js` → Core, mit einer produktseitigen Zuordnung

| Bezeichner | Ziel | Begründung |
|---|---|---|
| `noiseTexture(seed, size)` | Core | prozedurale Roughness-Variation, kein Datei-Asset |
| `patchWear(mat, amount)` | Core | Kantenverschleiß über `aWear`-Attribut |
| `disposeMaterials(M)` | Core | Freigabe |
| **Rezeptwerte** in `createMaterials` | Core → `MAT`-Registry | die 13 Rezepte aus Teil 2 als Konstanten |
| **Schnittflächen-Materialien** (`M.caps`) | Core | Ableitung „Farbe × 0,46, roughness 0,95, DoubleSide" ist generisch |
| **Zuordnung** `korpus→ppr`, `ball→brass|pprB` | **Produkt** | welches Teil aus welchem Material besteht, weiß nur das Produkt |

Neue Core-Signatur:

```js
export const MAT = { pprGreen, pprPurple, pprUvBlack, fiberLayer, redStripe,
                     brass, chrome, steel, ptfe, epdm, anthracite, toolRed, toolBlack };
export function materials(keys, seed)   // → { key: MeshPhysicalMaterial } + .caps + ._all + ._tex
export function disposeMaterials(m)
```

Das Produkt nennt nur Schlüssel: `materials: ['pprGreen','ptfe','epdm','steel','anthracite']`.
Damit gilt „kein Produkt kodiert je eine eigene Farbe" auch mechanisch.

**Erkannter Sonderfall:** heute existieren `ppr` und `pprB` — dasselbe Rezept mit zwei Noise-Seeds, damit links und rechts nicht exakt gleich aussehen. Das ist Qualitätsstandard (Teil 7, „Roughness-Map links und rechts unterschiedlich seeden"), gehört also in den Core: `materials()` liefert zu jedem Schlüssel automatisch eine `.b`-Variante mit zweitem Seed.

---

## 4 · `valve-build.js` → gespalten, hier liegt die eigentliche Arbeit

| Bestandteil | Ziel | Begründung |
|---|---|---|
| `CAP_Z = 0.16` | Core | Schnittflächen-Offset, geometrisch bedingt |
| `part(name, key, built, opts)` — Gruppe + Cap-Mesh + Spiegelung | **Core** `assembly.js` | jedes Produkt baut Teile genau so zusammen |
| `line()`, `arrow()`, `dim()` — 3D-Maßlinien | **Core** `overlay.js` | das Bemaßungs-Overlay ist Core-Feature. Produkt liefert nur `{label, value, a, b, off}` |
| `setSection(on)` | **Core** | Materialliste + Cap-Liste durchschalten, generisch |
| `setTestMode(mode)` | **Core** | Silhouetten-/Graustufentest ist Prüfwerkzeug, kein Produktcode |
| `measure()` | **gespalten** | Box3, Raycast, Dreieckszählung → Core. **Welche** Maße gemessen werden → Produkt (`dims`) |
| `dispose()` | Core-Muster | Geometrien + Materialien |
| `setExplode(t)` | **gespalten** | Core verschiebt `parts[i].obj.position` um `parts[i].explode × t`. Produkt liefert nur die Vektoren |
| `setOpen(t)` | **Produkt** | Rotorkinematik; Core ruft es nur auf, wenn `states ≠ null` |
| `buildValve()`, Explosionsversätze, `anchors`, `hotspots`, `dims`-Werte | **Produkt** `index.js` | |

---

## 5 · `valve-parts.js` → vollständig Produktpaket

`buildKorpus`, `buildNut`, `buildTail`, `buildBall`, `buildSeat`, `buildStem`, `buildLever`, `buildORing` — acht Bauteilkonturen, kein Bezeichner überlebt im Core. Ausgenommen die beiden Segmentkonstanten (siehe §2).

---

## 6 · `valve-app.js` → vollständig Core, an vier Stellen entkoppelt

| Bestandteil | Ziel | Anmerkung |
|---|---|---|
| WebGL-Prüfung + `nogl`-Fallback | Core | |
| `reduced` / `prefers-reduced-motion` | Core | |
| Innenlicht (2 × PointLight) | Core | Positionen kommen aus `built.lights` |
| `rebuild()`, `updateMeta()` | Core | |
| `buildOverlay()`, `project()`, `updateOverlay()` inkl. Kollisionsvermeidung | Core | unverändert übernehmen |
| Auf/Zu-Animation, Easing | Core | nur aktiv wenn `states` |
| Größenwahl, Explosion, Schnitt, Bemaßung, Presets | Core | |
| Klick auf Teil schaltet Zustand | Core-Mechanik | Produkt nennt die Teile-ID: `states.pickPart` |
| Tastatur, `window.kaqua`-Debughook | Core | |

**Die vier zu entfernenden Kugelhahn-Annahmen:**

| Heute | Künftig |
|---|---|
| feste Größenliste `[20,25,32,40,50,63]` in HTML **und** `measureAll()` | `product.sizes` |
| `'<b>Offen</b> — Hebel parallel zur Rohrachse'` | `product.states.open.label` |
| Annahme, dass es einen Auf/Zu-Zustand gibt | `states === null` blendet den Knopf aus |
| feste Metaleiste `d · L · H · Gewicht` | `product.metaFields` + `product.dimensionKey` |

Fünfte, im Auftrag nicht genannte Stelle: die **`aria-label`-Formulierung** in `updateMeta()` nennt Hebelhöhe und Hebellänge im Klartext. Wird aus `dimensionKey` generiert.

---

## 7 · `valve-viewer.html` → Core `ui.js`

Das gesamte Bedienrahmen-Markup und -CSS ist produktneutral. Produktabhängig sind nur: `<title>`, die Größenknöpfe (aus `sizes`), die Metaleiste (aus `metaFields`), die Fallback-Maßtabelle (aus `articles` + `dimensionKey`), der Zustandstext (aus `states`). Alle fünf werden generiert.

Der Kugelhahn hat drei Toggles rechts (Explosion, Schnitt, Bemaßung) plus Auf/Zu unten. Über `features` steuerbar, wie im Adapter aus Teil 5 vorgesehen.

---

## 8 · `three-d-stage.js` → Core, unverändert

Enthält keinen Kugelhahn-Bezug. FOV 28°, ACES, Exposure 1.0, PMREM-Softbox-Rig (Key/Fill/Rim/Bounce), Bodenschatten Opazität 0,42, Polarwinkel 25°–105°, `localClippingEnabled`, OBJ/GLB-Export — alles bereits nach Teil 7 eingestellt. Wird **eins zu eins** nach `core/stage.js` übernommen.

Einziger Eingriff: die Toolbar-Beschriftungen des Exports sind englisch. Kein Blocker, keine Änderung im Zuge des Refactors (Verbot: „Den Viewer neu schreiben").

---

## 9 · Der Schnitt in Zahlen

| | Core | Produkt |
|---|---|---|
| `valve-geometry.js` (20 Bezeichner) | 19 | 1 (`params`) |
| `valve-materials.js` (4) | 4, davon 1 als Registry umgebaut | Zuordnungstabelle |
| `valve-build.js` (≈ 12 Blöcke) | 7 | 5 |
| `valve-parts.js` (8 + 2 Konstanten) | 2 Konstanten | 8 |
| `valve-app.js` (≈ 20 Blöcke) | 20, davon 5 entkoppelt | 0 |
| `three-d-stage.js` | vollständig | 0 |
| `valve-viewer.html` | vollständig als Generator | 5 Textstellen |

**Ein neues Produkt besteht danach aus vier Dateien** — `data.js` (Tabelle), `params.js` (Parametrik), `parts.js` (Konturen), `index.js` (Vertrag). Keine Zeile Viewer, kein CSS, kein Material-Rezept.

---

## 10 · Was am Kugelhahn geändert werden muss, damit er in den Vertrag passt

Pflichtangabe nach §7.5 der Abnahme. Sieben Stellen:

1. **Skalierung.** `buildValve()` setzt heute `root.scale = 0.001`. Der Vertrag sagt: `root` immer in Millimetern, die Stage skaliert. Die Skalierung wandert nach `core/viewer.js`. → betrifft `measure()` (der Faktor `1/root.scale.x` entfällt) und die Innenlicht-Positionen.
2. **Explosion als Vektor.** Heute acht X-Skalare plus zwei Y-Sonderfälle (Spindel, Hebel). Wird zu `explode: THREE.Vector3` je Eintrag in `parts`.
3. **`parts`-Liste.** Existiert heute nur implizit als `PART_IDS` + `groups`. Wird zur expliziten Vertragsliste `{ id, label, obj, explode }` — deckungsgleich mit den heutigen `anchors`, die dann daraus abgeleitet werden.
4. **Materialzuordnung.** `createMaterials(variant)` entscheidet heute selbst über Messing vs. PP für die Kugel. Der `variant`-Parameter entfällt: Kugelhahn Messing ist Produkt #11 mit eigenem Paket (so steht es in der Registry), nicht eine Variante von #1.
5. **`dims`.** Heute baut `buildValve()` die Maßlinien-Geometrie selbst. Künftig deklariert das Produkt nur `{label, value, a, b, off}`; die Geometrie erzeugt `core/overlay.js`.
6. **`measure()`.** Gibt heute die kugelhahnbenannten Schlüssel `L/D/H/A/socket` zurück. Wird generisch über `dimensionKey`. Der Muffentiefen-Raycast bleibt — als Core-Helfer `probeAxial()`, weil ihn jedes Muffenprodukt braucht.
7. **`dimensionKey`.** `L1` steht heute nur als Kommentar in `valve-data.js` („in der Zeichnung nicht eindeutig auflösbar"). Wandert in `dimensionKey` als ausdrücklich nicht bemaßter Eintrag, damit der Vorbehalt im Code sichtbar bleibt und nicht in der Kommentarzeile verhungert.

Keine dieser sieben Änderungen berührt Geometrie oder Material. Der Pixelgleichheitstest (§5.1) muss bestehen.

---

## 11 · Blocker vor Teil 4

Was den Core betrifft: keiner. Der Refactor kann sofort laufen — die Kugelhahn-Tabelle ist verifiziert (`AQ85220–AQ85263`), die Muffe wird nach §5.6 ohnehin nur als Geometriebeweis gebaut.

Was Teil 4 betrifft, drei:

| Blocker | Wirkung |
|---|---|
| **Die Produkt-Screenshots liegen nicht im Projekt.** Die Registry verweist auf `Fittings K-Aqua/…pdf` usw. — keine dieser Dateien ist vorhanden. | Phase 1 kann nicht laufen. Maße aus den Markdowns zu übernehmen ist ausdrücklich verboten (Teil 9). **Produkte 2–71 sind bis zum Upload blockiert.** |
| **`docs Unterseiten/` fehlt ebenfalls.** | Die Abweichungsliste und die korrigierte Markdown-Datei aus Phase 1 lassen sich nicht erzeugen. |
| **Kein Node-Prozess in dieser Umgebung.** | `build/bundle.mjs` kann ich schreiben, aber nicht ausführen. Das Standalone-HTML erzeuge ich stattdessen direkt; das Skript bleibt für euer Repo lauffähig. |

Für Teil 5 zusätzlich: ohne Zugriff auf das Next.js-Repo kann ich die Komponenten schreiben, aber Bundle-Analyse und Lighthouse nicht messen.
