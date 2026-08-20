# Prüfbericht — Kappe (Cap)

Produkt-ID `fittings/cap` · Modul `kaqua-cap` · Familie `rot-sym` · Referenzgröße d32
Stand 16. August 2026

---

## Phase 1 — Daten

Quelle: `screencapture-project-301-webtm-ru-fittings-cap-2026-06-20-05_41_10.pdf`,
drei Seiten, als Bilder extrahiert (`quellen/cap-p1.jpg` … `p3.jpg`, je 3004 × 3949 px).
Die Tabelle läuft über den Seitenumbruch.

**14 Größen**, zwei Blöcke, Spaltenköpfe `Code · d · D · l · L · s · kg · Pack.`
Vollständige Transkription in `products/cap/data.js`.

### Abweichungen gegen `docs Unterseiten/fittings/cap.md`

| # | Befund |
|---|---|
| 1 | Markdown führt **7 von 14** Größen (d20–d75). Es fehlen d90, d110, d125 und der komplette SDR-11-Block d160–d315. |
| 2 | Markdown führt `Code · d · L · kg · Pack.` Die Quelle führt acht Spalten. Die dort als **L** geführten Werte sind in Wahrheit die Spalte **l**. |
| 3 | Artikelnummern der sieben vorhandenen Größen stimmen. Fehlend: AQ30190, AQ301110, AQ301125, AQ301160, AQ301200, AQ301250, AQ301315. |

Korrigierte Fassung: `produkt-markdown/fittings/cap.md`.

### Maßschlüssel

Aus den beiden technischen Zeichnungen neben dem Produktfoto:

| Symbol | Bedeutung | Zeichnung |
|---|---|---|
| `d` | Rohr-Außendurchmesser = Muffenbohrung (SDR 6) bzw. Außendurchmesser (SDR 11) | A und B |
| `D` | Außendurchmesser der Kappe | A |
| `l` | Gesamtlänge | A |
| `L` | Gesamtlänge, Stumpfschweißversion | B |
| `s` | Wandstärke | B |
| `z` | Restlänge hinter dem Rohrende — **nicht tabelliert**, nicht als Constraint verwendet | A |

Die Blockaufteilung folgt daraus zwingend: SDR 6 füllt `d · D · l`, SDR 11 füllt
`d · L · s`. Es sind zwei Bauformen unter einer Nummernreihe; das Modell baut beide.

---

## Phase 4 — Maßtest

`Box3` und Raycast über alle 14 Größen. Soll/Ist in mm.

| d | Länge Soll/Ist | Außen-Ø Soll/Ist | Wand | Bohrung |
|---|---|---|---|---|
| 20 | 25 / 25,00 | 29 / 29,18 | 4,5 | 20,0 |
| 25 | 28 / 28,00 | 34 / 34,18 | 4,5 | 25,0 |
| 32 | 32 / 32,00 | 43 / 43,18 | 5,5 | 32,0 |
| 40 | 36 / 36,00 | 52 / 52,18 | 6,0 | 40,0 |
| 50 | 41 / 41,00 | 65 / 65,18 | 7,5 | 50,0 |
| 63 | 48 / 48,00 | 79 / 79,18 | 8,0 | 63,0 |
| 75 | 54 / 54,00 | 99 / 99,18 | 12,0 | 75,0 |
| 90 | 66 / 66,00 | 120 / 120,18 | 15,0 | 90,0 |
| 110 | 79 / 79,00 | 148 / 148,18 | 19,0 | 110,0 |
| 125 | 87 / 87,00 | 162 / 162,18 | 18,5 | 125,0 |
| 160 | 162 / 162,00 | 160 / 160,18 | 14,6 | 130,8 |
| 200 | 180 / 180,00 | 200 / 200,18 | 18,2 | 163,6 |
| 250 | 217 / 217,00 | 250 / 250,18 | 22,7 | 204,6 |
| 315 | 256 / 256,00 | 315 / 315,18 | 28,6 | 257,8 |

**Größte Abweichung 0,18 mm**, Grenze ±0,3 mm. Sie ist über alle Größen konstant
und vollständig erklärt: der Formtrenngrat von 0,09 mm liegt beidseitig auf dem
Durchmesser. Beim Kugelhahn ist es derselbe Effekt (dort 0,16 mm).

**Plausibilität:** Restwand über alle Größen ≥ 4,5 mm, Grenze 3 mm. ✅
Muffentiefe passt bei jeder Größe in den Zylinderteil — `params.js` wirft
sonst, statt weiterzumodellieren.

**Technik:** 12 912 Dreiecke (SDR 6), ein Mesh,
keine Konsolenausgabe, Metaleiste blendet leere Spalten aus.

### Behobene Fehler dieses Durchlaufs

| Fund | Ursache | Behebung |
|---|---|---|
| Außen-Ø bis +6,53 mm zu groß (d315) | Anspritznabe mit `rotateZ` quergelegt, ragte mit vollem Radius über die Silhouette | Drehung entfernt — `revolve(axis:'y')` baut bereits radial |
| Rest +0,67 mm | Nabe stand 0,12 mm über | Überstand auf 0,05 mm reduziert; die Marke bleibt als Lichtkante sichtbar |
| Metaleiste zeigte `L —` und `s —` | `hidden` verlor gegen `display:flex` der Regel `.meta dl div` | Core: `.meta dl div[hidden] { display: none }` |

---

## Phase 4 — Vergleichstest

Modell in der Kameraperspektive des Katalogfotos gerendert und danebengelegt:
`pruefung/kappe-vergleich.png`.

**Drei größte Abweichungen, alle behoben:**

| Befund | Ursache | Behebung |
|---|---|---|
| Sichtbare Schulterlinie zwischen Zylinder und Kalotte; das Foto zeigt einen stufenlosen Übergang | Ein Fillet von 2,15 mm auf dem Schulterpunkt rundete eine Kante ab, die keine ist — die Ellipse verlässt den Zylinder bereits tangential. Der Fillet riss die Tangente auf. | Fillet auf 0 |
| Mundlochkante zu scharf | 1,4-mm-Fase. Am Foto gemessen: 85 px bei 24,4 px/mm = 3,5 mm Radius bei D = 43, also 0,08·D | Radius `max(1,2; 0,08·D)` statt Fase |
| Silhouette zu zylindrisch; das Foto zeigt eine leichte Tonnenform | Gerade Mantellinie zwischen Mundloch und Schulter | Zwischenpunkt auf eine flache Bauchung gelegt, Maximum auf der Formteilungsebene — der tabellierte Außendurchmesser bleibt das Maximum |

Nach der Korrektur deckt sich die Silhouette. **Rest-Abweichung:** die Kalotte des
Originals wirkt eine Spur voller. Die am Foto gemessene Ausladung (200 px = 8,2 mm
= 0,19·D) ist im Modell exakt umgesetzt; der Eindruck kommt vom stärkeren
Glanzband des Katalogfotos, nicht von der Kontur. Nicht nachgeschärft, weil
dafür ein Maß fehlt.

Dreieckszahl nach der Korrektur: 12 912 statt 15 408 — der entfallene
Schulter-Fillet spart 2 496 Dreiecke, ohne dass die Kontur ärmer wird.

---

## Annahmen

Jede trägt im Code ein `ASSUMPTION`.

| Annahme | Wert | Begründung | Zu verifizieren gegen |
|---|---|---|---|
| Muffenschweißtiefe | Normreihe EN ISO 15874-3 / DVS 2207-11, d20 14,5 … d125 46,0 | Die Tabelle führt keine Tiefe (Spalte `z` fehlt). Das Schweißwerkzeug ist je Nennweite für alle Fittings dasselbe. Gegenprobe d32: 18 + Wand 5,5 + Kalotte 8,2 = 31,7 ≈ l = 32 | Zeichnungsmaß `z`, sobald verfügbar |
| Kalottenhöhe SDR 6 | 0,19 · D | Am Produktfoto gemessen: Bugausladung 200 px bei 1050 px Durchmesser. Gegenprobe l/D = 765/1050 = 0,73 gegen tabellarisch 32/43 = 0,74 | Zeichnung A |
| Kalottenhöhe SDR 11 | 0,25 · d | 2:1-Klöpperboden, üblich für druckbelastete Abschlüsse | Zeichnung B |
| Wand gleichmäßig bis in die Kalotte | — | Zeichnung B zeigt die Schraffur als dünne Wand über den ganzen Bug; ein Materialklotz würde beim Spritzguss einfallen | Bauteil im Schnitt |
| Anspritzpunkt seitlich am Bug | Ø 2,2 mm, 0,05 mm Überstand | Im Produktfoto als Nase in der Silhouette sichtbar | Originalbauteil |

---

## Core

Nicht verändert, mit einer Ausnahme, die produktneutral ist und deshalb
ausdrücklich in den Core gehört:

**Metaleiste blendet leere Spalten aus** statt `—` zu zeigen. Nötig, weil die
Kappe blockweise unterschiedliche Spalten führt — das wiederholt sich bei jedem
Produkt mit SDR-Aufteilung. `core/ui.js` (`hidden` im Startmarkup + CSS-Regel)
und `core/viewer.js` (`updateMeta`).

Keine fehlende Geometriefunktion. Das Produkt kommt mit `buildProfile`,
`revolve`, `arcPts`, `mergeGeometries`, `capFromProfile` aus — reiner
Rotationskörper, kein CSG.

---

## Abgabe

| Datei | Stand |
|---|---|
| `products/cap/` — data · params · parts · index | ✅ |
| `dist/kaqua-cap.html` — 364 kB (129 kB ohne Fonts) | ✅ |
| `produkt-markdown/fittings/cap.md` — korrigiert | ✅ |
| Soll/Ist über alle 14 Größen | ✅ oben |
| Annahmenliste | ✅ oben |
| Standbilder, GLB, OBJ | offen |
| Registry `build.status → fertig`, `data_status → verifiziert`, `sizes_source_verified: 14` | einzutragen |

**Galerie-Kachel:** Verschließt ein Rohrende dicht — für Leitungsenden,
Druckproben und Reserveabgänge, die später geöffnet werden.
