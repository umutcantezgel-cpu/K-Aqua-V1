# LIESMICH — K-Aqua 3D-Produktmodelle

Dieses Paket enthält **28 maßhaltige 3D-Produktmodelle** des K-Aqua
PP-R-Rohrsystems, den Kern, mit dem sie gebaut sind, und die Anleitung, um
die restlichen 43 zu bauen.

**Stand 20. August 2026.** Selbsttest: 28/28 Module laden, größte Abweichung
**0,18 mm**, 618 124 Dreiecke, keine Auffälligkeiten.

27 Produkte sind fertig, **eines trägt `status: 'prototyp'`** — bei der
Metallverschraubung ist eine Tabellenspalte nicht auflösbar, die die Gestalt
bestimmt. Maße und Gewinde stimmen; die Kachel zeigt „Maße vorläufig".

---

## Wo anfangen

| Ich will … | Datei |
|---|---|
| die Modelle in die Website einbauen | **`dist/INTEGRATION.md`** |
| sehen, was da ist | `dist/kaqua-3d-galerie.html` im Browser öffnen |
| prüfen, ob alles lädt | `dist/lib-selbsttest.html` im Browser öffnen |
| Standbilder, GLB oder OBJ erzeugen | `dist/export.html` im Browser öffnen |
| die restlichen 43 Produkte bauen | **`pipeline/00-START-HIER.md`** |
| wissen, was zuletzt passiert ist | `BAUSTAND.md` |

`dist/INTEGRATION.md` und `pipeline/00-START-HIER.md` stehen jeweils für
sich und setzen kein Wissen über dieses Projekt voraus.

---

## Ordnerübersicht

```
kaqua-3d/
├── LIESMICH.md              diese Datei
├── BAUSTAND.md              Chronik: was gebaut ist, was gefunden wurde
│
├── dist/                    ► DAS AUSLIEFERUNGSPAKET
│   ├── INTEGRATION.md       Einbauanleitung, 13 Abschnitte
│   ├── lib/                 28 ES-Module + Core + Registry
│   ├── kaqua-<modul>.html   28 Einzelseiten, offline lauffähig
│   ├── kaqua-3d-galerie.html  alle 71 Produkte auf einer Seite
│   ├── export.html          Standbilder · GLB · OBJ als ZIP
│   └── lib-selbsttest.html  Prüfblatt über alle Module
│
├── core/                    der Kern, gegen 28 Produkte getestet
│   ├── geometry.js          Profile, Rotationskörper, Loft, Sweep, Gewinde
│   ├── materials.js         16 Materialrezepte, eine Farbkonstante
│   ├── assembly.js          Teile, Explosion, Schnitt, Messwerkzeuge
│   ├── overlay.js           Maßlinien und Beschriftung
│   ├── ui.js · viewer.js    Bedienrahmen
│   ├── export.js            GLB, OBJ, Standbilder
│   ├── stage.js             die 3D-Bühne
│   └── PRODUKT-VERTRAG.md   die Schnittstelle, die ein Produkt erfüllt
│
├── products/                28 Produktpakete, je vier Dateien
│   ├── _pipe/ _bend/ _tee/  Familienlogik, von mehreren geteilt
│   └── <slug>/              data.js · params.js · parts.js · index.js
│
├── gallery/                 Galerieseite und Produktregister
├── build/                   Bauskripte und Zwischenstände
├── pipeline/                ► ANLEITUNG FÜR DIE RESTLICHEN 43
├── pruefung/                Prüfberichte je Produkt
└── produkt-markdown/        korrigierte Produktseiten
```

---

## Was „maßhaltig" hier bedeutet

Jedes Produkt bringt einen **Maßtest** mit, der die gebaute Geometrie
vermisst und gegen die Herstellertabelle vergleicht. Nicht die Parameter —
die Geometrie. Grenze 0,3 mm.

```js
import { loadProduct } from './dist/lib/index.mjs';
const p = await loadProduct('fittings/cap');
const A = p.build(32, null, null);
A.measures.forEach((m) => console.log(m.key, m.soll, m.ist()));
```

Die verbleibenden 0,18 mm sind der beabsichtigte Formtrenngrat an der
Überwurfmutter des Kugelhahns — 0,09 mm beidseitig auf dem Durchmesser.

**Alle Maße stammen aus den Screenshots der Produktseiten.** Die
Markdown-Dateien im Repo sind nachweislich unvollständig und teils falsch:
bei der Kappe fehlten 7 von 14 Größen, bei der Muffe waren sechs von sieben
Längen falsch. Korrigierte Fassungen liegen in `produkt-markdown/`.

---

## Die 28 Modelle

**Rohre (12)** — alle. K-Rohr PP-R SDR 6 und SDR 11, Violett SDR 11,
PP-RCT SDR 7,4, K-Fiber in SDR 7,4 / 9 / 11 / 17, K-FiberClima,
zwei UV-Ausführungen. Ein- bis vierlagig; im Schnitt ist der Faserkern
sichtbar.

**Formteile (8)** — Kappe, Muffe, Winkel 45°, Winkel 90°, T-Stück, Kreuz,
Reduzierbuchse.

**Übergangsfittings (3)** — Übergangsmuffe mit Außengewinde, Verschraubung,
Metallverschraubung mit Innengewinde (Prototyp).

**Armaturen (1)** — Kugelhahn PP-R, zwölf Einzelteile, Auf/Zu-Kinematik.

**Zubehör (5)** — Stopfen, zwei Flachdichtungen, Bundflansch, Rohrschelle.

Vollständige Liste mit Produkt-IDs: `dist/INTEGRATION.md` §9.

---

## Drei Regeln, die das Paket zusammenhalten

**1 · Ein Produkt sind vier Dateien.** `data.js` (Artikeltabelle),
`params.js` (abgeleitete Maße), `parts.js` (Konturen), `index.js` (Vertrag).
Kein Viewer-Code, kein CSS, keine UI im Produkt.

**2 · Kein CSG.** Jede Bohrung ist Teil einer geschlossenen Profilkontur,
jedes Loch eine Innenkontur eines `THREE.Shape`. Keine boolesche Operation
im ganzen Paket.

**3 · Farben nur über Materialschlüssel.** `PPR_GREEN` ist **eine**
Konstante in `core/materials.js` — eine CI-Korrektur ist eine Zeile für alle
Produkte. Ein Hex-Wert im Produktcode ist ein Fehler.

---

## Für die Weiterarbeit

`pipeline/` enthält zwölf Dokumente, die nach dem Bau dieser 28 Produkte
geschrieben sind. Die wichtigsten drei:

| Datei | Inhalt |
|---|---|
| `00-START-HIER.md` | Einstieg, Regeln, Meldeformat |
| `20-VISUELLE-REFERENZ.md` | wie die Teile aussehen müssen, in Worten — inklusive Beschreibung aller offenen Produkte |
| `40-FEHLERKATALOG.md` | **33 echte Fehler** mit Ursache und Erkennungsprüfung |

Der Fehlerkatalog ist der wertvollste Teil. Jeder Eintrag ist ein Fehler,
der beim Bau dieser 28 Produkte wirklich gemacht wurde — mit der Prüfung,
die ihn gefunden hat. Vier Beispiele:

- Eine Messung, die einen Parameter zurückgibt statt zu messen, bestätigt
  die Annahme, die sie prüfen soll (Fall 12)
- Wächst eine Abweichung mit der Größe, ist es keine Fase, sondern
  Segmentierung (Fall 27)
- Eine gedeutete Spaltenbeziehung über **alle** Zeilen durchrechnen und das
  Vorzeichen prüfen (Fall 28)
- Eine nicht deutbare Spalte gehört benannt, nicht weggelassen (Fall 29)
- Ein Produkt, dessen Prüfbericht eine Pflichtprüfung offen führt, darf nicht
  als fertig ausgeliefert werden (Fall 30)
- Bei widersprüchlichen Vorgaben gilt: Tabellenmaß über Werkzeugmaß über
  Fotoableitung über Fachwissen (Fall 31)
- Ein Begriff, der an zwei Stellen geprüft wird, gehört in ein Prädikat —
  vier der 33 Fälle sind dieser Mechanismus (Fall 32)

Der Bau ist inzwischen die Bremse, nicht die Modellierung: Galerie- und
Bibliotheksbau überschreiten das Zeitbudget und laufen über Caches in
`build/`. Vor der nächsten größeren Runde lohnt es, `build/incremental.mjs`
auf echtes inkrementelles Bauen umzustellen.

---

## Vier bekannte Blocker

Produkte, die nicht gebaut werden können, bis eine Angabe geklärt ist. Sie
stehen mit Begründung in `pipeline/README.md`; hier die Kurzform:

| Produkt | Was fehlt |
|---|---|
| Metallverschraubung IG | Spalte `SW` nicht auflösbar — gebaut, aber als Prototyp |
| Übergangsmuffe Innengewinde | Spalten `h` und `L1` sind ohne Zeichnung nicht deutbar |
| Rohrschellen-Werkzeuge (9) | keine Rohrgeometrie, eigene Formensprache — braucht eine Gestaltungsentscheidung |
| Reduzier-T-Stück | zwei Nennweiten plus Abzweiglänge, Tabelle nur teilweise lesbar |
| K-Rohr Violett | Zeichnung sagt „green", Produktname sagt „Purple" |

**Melden statt raten** ist die wichtigste Regel des Katalogs. Bei der
Reduzierbuchse hat eine falsch gelesene Spalte einen ganzen Modellversuch
gekostet — das Muster steht als Fall 9 im Fehlerkatalog.

---

## Voraussetzungen

**three.js r184 oder neuer**, als bare specifier `three` auflösbar. Sonst
nichts: keine React-Abhängigkeit, kein CSS-Framework, keine
Laufzeit-Assets. Die Modelle sind prozedural — es gibt keine `.glb`-Datei zu
laden und keine Textur zu hosten.

Einzelheiten und Importmap: `dist/INTEGRATION.md` §2.
