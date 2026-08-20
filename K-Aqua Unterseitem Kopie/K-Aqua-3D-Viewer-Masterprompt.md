# Master-Prompt: Interaktives 3D-Modell — K-Aqua PP-R Kugelhahn (Ball in PP)

**Zweck:** Ein einziger, maximal ausgearbeiteter Prompt, der einen produktionsreifen, fotorealistischen 3D-Produktviewer für die K-Aqua Website erzeugt.
**Zielprodukt:** PP-R Ball valve (Ball in PP), Artikel AQ85220 – AQ85263
**Datenbasis:** Maßtabelle + technische Zeichnung + Katalogfoto von `project-301.webtm.ru/valves/pp-r-ball-valve-ball-in-pp`, Farb-/Stil-Tokens aus `docs Unterseiten/image-generation-prompts.json`

---

## Wie du diesen Prompt benutzt

1. Kopiere **alles zwischen den beiden Trennlinien** (Abschnitt „PROMPT BEGINN" bis „PROMPT ENDE") in Claude.
2. Nichts anpassen nötig — der Prompt enthält alle Maße, Farben und Abnahmekriterien.
3. Claude arbeitet den Prompt in 5 Iterationsstufen ab und prüft sich selbst. Das dauert bewusst lange. Nicht unterbrechen.
4. Am Ende liefert Claude die Komponenten-Dateien **plus** eine Liste aller getroffenen Annahmen — die ist die Grundlage für deine Korrekturrunde.

**Bekannte Datenlücke (bewusst so gelöst):** Die Maßtabelle liefert `d, D, L, z, H, A`. Die Aufteilung in Einzelteil-Längen (Mutter, Stutzen, Körper) steht nirgends. Der Prompt löst das über prozentuale Regeln, die aus dem Katalogfoto abgemessen wurden — und zwingt Claude, jede solche Ableitung als `// ASSUMPTION:` zu markieren. Nach dem ersten Durchlauf kannst du gezielt nachjustieren, statt zu raten.

---

---

## PROMPT BEGINN

Du bist Senior Technical Artist mit Schwerpunkt Produktvisualisierung und zugleich erfahrener Three.js/React-Three-Fiber-Engineer. Du hast jahrelang Spritzguss-Bauteile für Hersteller-Kataloge visualisiert und weißt, woran man ein CG-Modell als CG erkennt.

## AUFTRAG

Baue eine produktionsreife, interaktive 3D-Produktansicht des **K-Aqua PP-R Kugelhahns (Ball in PP)** als React-Komponente für eine Next.js-Website (App Router).

**Die gesamte Geometrie wird prozedural aus den Katalogmaßen erzeugt.** Kein GLB, kein OBJ, keine externe HDRI, keine Textur-Dateien. Die Komponente muss vollständig offline und ohne CDN funktionieren.

Das Ergebnis muss die Qualitätsschwelle überschreiten, ab der ein Fachkunde im Sanitärgroßhandel es für ein Foto hält.

## ARBEITSWEISE — verbindlich

Es gibt für diese Aufgabe **kein Token-, Zeit- oder Längenbudget.** Du hörst erst auf, wenn jedes Kriterium in §9 erfüllt ist. Arbeite in fünf Stufen und schließe jede mit einer schriftlichen Selbstkritik ab:

| Stufe | Inhalt | Abschluss |
|---|---|---|
| **V0 Blockout** | Alle 12 Einzelteile als Primitive an korrekter Position, korrekte Gesamtmaße | Box3 messen, gegen §1 prüfen |
| **V1 Geometrie** | Echte Profile, Fasen, Riffelungen, Entformungsschrägen, Bohrungen | Silhouetten- und Kantentest (§10) |
| **V2 Material & Licht** | PBR-Setup, Studio-Rig, Tonemapping, Kontaktschatten | Streiflicht- und Graustufentest (§10) |
| **V3 Interaktion** | Orbit, Auf/Zu, Explosion, Schnitt, Größenwahl, Bemaßung | Alle Interaktionen auf Desktop + Touch |
| **V4 Politur** | Mikrodetails, Performance, A11y, Responsive | Vollständige Checkliste §9 |

**Nach jeder Stufe:**
1. Beschreibe in 3–5 Sätzen, was du gerade siehst, wenn du das Modell renderst.
2. Liste **mindestens 5 konkrete Schwächen** auf. „Sieht gut aus" ist keine zulässige Antwort — wenn dir nichts einfällt, hast du nicht genau genug hingesehen. Prüfe dann gezielt: Kantenradien, Wandstärken-Plausibilität, Segmentzahlen in Rundungen, Materialkontrast, Schattenweichheit.
3. Behebe alle 5, bevor du weitergehst.

Mindestens **drei vollständige Kritikrunden** über das Gesamtmodell, nicht nur pro Stufe.

Jede Annahme, die nicht aus §1 ableitbar ist, markierst du im Code mit `// ASSUMPTION: <Begründung>` und listest sie am Ende gesammelt auf.

---

## §1 PRODUKTDATEN — verbindlich

### 1.1 Maßschlüssel (aus der technischen Zeichnung)

| Symbol | Bedeutung |
|---|---|
| `d` | Nennmaß = Rohr-Außendurchmesser (mm), zugleich Muffenbohrung |
| `D` | Größter Außendurchmesser = Außendurchmesser der Überwurfmutter |
| `L` | Baulänge gesamt, Stirnfläche bis Stirnfläche |
| `z` | Einbaulänge (Rohrende bis Rohrende bei eingestecktem Rohr) |
| `H` | Höhe von der Rohrachse bis Oberkante Hebel |
| `A` | Gesamtlänge des Hebels, horizontal gemessen |
| `L1` | Herstellerangabe, Bedeutung in der Zeichnung nicht eindeutig auflösbar. **Nicht als Constraint verwenden.** Nur informativ mitführen. |

### 1.2 Artikeltabelle (Quelle: K-Aqua Produktseite)

| Code | d | D | L | z | H | A | L1 | Gewicht |
|---|---|---|---|---|---|---|---|---|
| AQ85220 | 20 | 46 | 98 | 70 | 51 | 68 | 63 | 0,11 kg |
| AQ85225 | 25 | 56 | 113 | 82 | 61 | 78 | 75 | 0,19 kg |
| **AQ85232** | **32** | **66** | **121** | **87** | **70** | **88** | **79** | **0,28 kg** |
| AQ85240 | 40 | 79 | 138 | 98 | 81 | 98 | 91 | 0,44 kg |
| AQ85250 | 50 | 87 | 148 | 101 | 90 | 108 | 95 | 0,54 kg |
| AQ85263 | 63 | 107 | 175 | 121 | 110 | 118 | 115 | 0,93 kg |

**Referenzgröße für alle Detailarbeit: d = 32 (AQ85232).** Alle anderen Größen entstehen aus derselben Parametrik.

### 1.3 Abgeleitete Maße (rechne diese im Code aus, nicht hartkodieren)

```
muffentiefe       = (L - z) / 2         // d32: 17,0 mm
bohrung_durchgang = 0.667 * d           // ASSUMPTION: Vollstrom = Rohr-ID bei SDR 6 / PN 20
kugel_durchmesser = 1.00 * d            // ASSUMPTION: ergibt ~4,5 mm Restwand im Gehäuse
korpus_od_mitte   = max(0.62 * D, d + 9)
stutzen_od        = max(0.62 * D, d + 9)
korpus_bund_od    = 0.82 * D            // Anschlagbund für die Überwurfmutter
```

Die Muffentiefen-Reihe ergibt 14,0 / 15,5 / 17,0 / 20,0 / 23,5 / 27,0 mm für d20…d63 — das sind die branchenüblichen Muffentiefen für PP-R-Polyfusion. Starke Bestätigung, dass `z` die Einbaulänge ist.

**Kontrollrechnung d32:** Muffentiefe 17,0 · Bohrung 21,3 · Kugel 32,0 · Korpus-OD max(40,9; 41) = 41,0 → Restwand (41−32)/2 = 4,5 mm. Plausibel für Spritzguss-PP. Die Formel liefert für alle sechs Größen exakt 4,5–4,9 mm. **Wenn deine Rechnung eine Restwand < 3 mm ergibt, ist ein Parameter falsch.**

### 1.4 Längenaufteilung entlang der Achse

Aus dem Katalogfoto abgemessen, in % von `L`. **Weiche Vorgabe** — anpassbar, solange die Summe exakt `L` ergibt und §1.2 eingehalten wird:

```
Stutzen links        10,5 %        (davon Muffentiefe innen: (L-z)/2)
Überwurfmutter links 19,0 %
Korpus (mit Bunden)  41,0 %
Überwurfmutter rechts19,0 %
Stutzen rechts       10,5 %
```

**Konfliktregel:** Wenn Foto-Proportion und Tabellenmaß sich widersprechen, gewinnt **immer die Tabelle** (§1.2). Das Foto ist ein Marketing-Render und maßstäblich nicht verbindlich — es ist ausschließlich die Autorität für *Form, Detail und Materialanmutung*.

---

## §2 BAUGRUPPE — 11 Positionen, 12 Einzelteile

Der Hahn ist **spiegelsymmetrisch zur Quermittelebene**. Baue jede Seite einmal und spiegle.

Achsenkonvention: **X = Durchflussachse, Y = oben (Hebel), Z = Tiefe.** Modell zentriert im Ursprung, Rohrachse auf Y = 0.

### 1 — Korpus (grün, PP-R)
Rotationskörper um X, plus zwei Laschen.
- Mittelzylinder: `korpus_od_mitte`, Länge ≈ 55 % der Korpuslänge
- Beidseitig ein **Anschlagbund** `korpus_bund_od`, Breite ≈ 0,08 · D, Übergang mit R1,5 verrundet
- Außen der Bunde je ein **Gewindezylinder** (Sitz der Überwurfmutter), OD ≈ 0,78 · D. **Kein echtes Gewinde modellieren** — verdeckt und Geometrie-Verschwendung. Nur in Explosions-/Schnittansicht als 4 flache Ringnuten andeuten.
- Oben: **Spindeldom**, Zylinder OD ≈ 0,36 · D, Oberkante bei Y = 0,42 · H, mit umlaufender Nut (Sicherungsring-Sitz) 2 mm unter der Oberkante
- Oben und unten je eine **flache rechteckige Lasche** (Verdrehsicherung) an der axialen Mitte: Breite 0,30 · D, Höhe über Zylinder 0,05 · D, Dicke in X 0,22 · D, alle Kanten R1
- Innen: kugelförmige Kammer Ø `kugel_durchmesser + 0,4`, Durchgangsbohrung `bohrung_durchgang`

### 2+3 — Überwurfmuttern links/rechts (grün, PP)
- Außendurchmesser exakt `D` — das ist das Maß, an dem die Größe visuell ablesbar ist
- Länge 0,19 · L
- **12 halbrunde Längsriffel** über 360°: Nutradius 0,030 · D, Nuttiefe 0,022 · D, oben und unten mit R0,8 in die Mantelfläche auslaufend, **nicht scharfkantig**
- Beide Stirnkanten 45°-Fase 1,2 mm
- Innen: Gewinde (nur angedeutet), zur Körperseite offen, zur Stutzenseite ein Innenbund, der den Stutzenkragen hält

### 4+5 — Anschlussstutzen links/rechts (grün, PP-R)
- Außen `stutzen_od`, Sichtlänge = 10,5 % · L
- **Schweißmuffe innen:** Bohrung `d`, Tiefe = `(L-z)/2`, Konizität **0,6° verjüngend nach innen** (echte PP-R-Muffengeometrie), Einführfase 15° × 2 mm am Mundloch
- Am inneren Ende ein **Kragen** (wird von der Überwurfmutter hintergriffen), OD ≈ 0,76 · D, Dicke 0,07 · D
- Stirnfläche zur Kugelkammer: **O-Ring-Nut**, Ø ≈ `bohrung_durchgang + 6`, Tiefe 1,8 mm

### 6 — Kugel (grün, PP)
- Ø `kugel_durchmesser`, Durchgangsbohrung `bohrung_durchgang`
- Bohrungskanten mit R1,5 verrundet (bei einer echten Kugel sind sie das immer — scharfe Bohrungskanten sind das häufigste CG-Erkennungsmerkmal)
- Oben ein **rechteckiger Mitnehmerschlitz** für die Spindel: 0,30 · d breit, 0,45 · d lang, 0,18 · d tief
- Dreht um Y. Offen = Bohrungsachse ∥ X. Geschlossen = 90° gedreht.
- **Immer modellieren**, auch wenn im geschlossenen Zustand kaum sichtbar — sie ist durch die Muffenbohrung sichtbar und trägt die Glaubwürdigkeit.

### 7+8 — Kugelsitze (PTFE, gebrochen weiß)
Ringe mit sphärisch gehöhlter Innenfläche, Außen-Ø ≈ `bohrung_durchgang + 8`, Dicke 3 mm. Nur in Schnitt- und Explosionsansicht sichtbar — trotzdem bauen.

### 9 — Spindel (dunkel)
Zylinder Ø 0,20 · D durch den Spindeldom, unten rechteckiger Mitnehmer passend zum Kugelschlitz, oben Vierkant/Riffelkopf für den Hebel. Über dem Dom nur 3–4 mm sichtbar.

### 10 — Hebel (anthrazit, glänzend)
Das Teil, an dem das ganze Modell steht oder fällt. Dreht mit der Kugel um Y.

**Alle Y-Werte unten sind aus dem Katalogfoto abgemessen und auf `H` normiert. Halte diese Reihe ein — sie ist die Signatur des Teils.**

```
Y = 0,00 · H   Rohrachse
Y = 0,41 · H   Oberkante grüner Spindeldom
Y = 0,70 · H   Unterkante Arm am Nabenansatz
Y = 0,85 · H   Oberkante Nabenkuppel  (liegt UNTER der Armoberkante,
                                       der Arm läuft über die Kuppel hinweg)
Y = 1,00 · H   Oberkante Arm  ← Definition von H
```

- **Nabe:** kegelstumpfförmige Kuppel von Y = 0,41 · H bis 0,85 · H (Höhe 0,44 · H). Unten OD 0,46 · D, oben OD 0,34 · D. Oberkante gewölbt (Kugelkalottenabschnitt, **kein flacher Kegeldeckel**). **12 vertikale Rippen** auf der Mantelfläche, Rippenbreite ≈ 40 % der Teilung, Kanten R0,6, oben in die Wölbung auslaufend.
- **Arm:** Gesamtlänge in X = `A`, aufgeteilt **73 % lange Seite / 27 % kurze Seite** bezogen auf die Spindelachse.
  - Oberkante konstant bei Y = `H` über die gesamte Länge, leicht ballig (Zylinderabschnitt, Radius ≈ 3 · A)
  - Dicke in Y: **0,15 · H an der Spitze**, zum Nabenansatz auf 0,30 · H anwachsend. Die Unterseite ist dabei ein **konkaver Schwung**, keine Gerade — das ist die charakteristische Keilform des Hebels.
  - Breite in Z: 0,26 · A am Nabenansatz → 0,11 · A an der Spitze, ebenfalls konkav verlaufend
  - Unterseite **hohl mit Längs- und Querrippe** (Spritzgussteil, nie massiv). In der Untersicht sichtbar — das ist ein echtes Qualitätsmerkmal.
  - Spitze mit R2 verrundet, umlaufende Fase 0,5 mm
- Arm und Nabe sind **ein Teil**, keine zwei sich durchdringenden Körper. Der Arm läuft über die Kuppel hinweg, die Kuppelschultern bleiben links und rechts sichtbar. Übergang mit R2 verblendet.

### 11 — O-Ringe (2 ×, EPDM schwarz)
Torus, Schnurstärke 2,4 mm, in den Nuten der Stutzen-Stirnflächen. Nur in Explosionsansicht sichtbar.

---

## §3 GEOMETRIE-KONSTRUKTION

**Grundtechnik:** Alle Rotationskörper über `THREE.LatheGeometry` aus einem 2D-Punktprofil. Das ist der einzige Weg zu sauberen Fasen ohne CSG-Artefakte.

**Regeln:**

1. **Profil-Helper schreiben.** Eine Funktion, die aus einer Liste von Segmenten `{type:'line'|'arc'|'chamfer', ...}` ein Punkt-Array erzeugt. Fasen und Radien werden dadurch zu einem Parameter, nicht zu Handarbeit. Ohne diesen Helper wirst du Fasen weglassen — und genau daran scheitert das Modell.

2. **Segmentzahlen:**
   - Lathe-Umfang: 96 Segmente bei Sichtteilen, 48 bei Innenteilen
   - Kantenradien: mindestens 4 Zwischenpunkte pro Radius. 2 sind zu wenig und sichtbar.
   - Kugel: 64 × 48

3. **JEDE Kante bekommt eine Fase oder einen Radius, Minimum 0,3 mm.** Ausnahmslos. Es gibt an einem Spritzgussteil keine mathematisch scharfe Kante. Dies ist der mit Abstand wirksamste Einzelfaktor für Fotorealismus — wichtiger als jede Materialeinstellung.

4. **Entformungsschräge 1°** auf allen achsparallelen Außenflächen, verjüngend zur Formteilungsebene (Quermittelebene der Muttern, Stirnflächen der Stutzen).

5. **Riffelungen** über `InstancedMesh` oder ein einziges gemergtes `BufferGeometry` erzeugen — nicht 12 einzelne Meshes.

6. **Boolesche Operationen** nur dort, wo unvermeidbar (Kugelbohrung, Mitnehmerschlitz, Hebel-Hohlraum). `three-bvh-csg` oder `@react-three/csg`. **CSG-Ergebnisse einmalig zur Build-/Mount-Zeit berechnen und in `useMemo` cachen**, niemals pro Frame. Nach jeder CSG-Operation `computeVertexNormals()` mit sinnvollem Winkel-Threshold, sonst facettieren die Rundungen.

7. **Normalen:** grundsätzlich `computeVertexNormals()`. Bei Lathe-Geometrien mit Fasen zusätzlich prüfen, dass die Fase eine eigene harte Kante behält und nicht über den Radius weichgeschmiert wird.

8. **Kein Geometrie-Leak.** Bei Größenwechsel alte Geometrien und Materialien explizit `dispose()`n.

---

## §4 MATERIALIEN

Alle über `MeshPhysicalMaterial`. Werte sind Startwerte — beim Tuning behältst du die Verhältnisse bei.

### PP-R Grün — Korpus, Muttern, Stutzen, Kugel

```js
color:              PPR_GREEN            // eine einzige exportierte Konstante
roughness:          0.38
metalness:          0.0
clearcoat:          0.25
clearcoatRoughness: 0.50
sheen:              0.15
sheenColor:         PPR_GREEN aufgehellt um 25 %
sheenRoughness:     0.8
envMapIntensity:    0.9
```

**Zur Farbe — lies das, bevor du einen Wert einsetzt:**

| Quelle | Wert | Einordnung |
|---|---|---|
| Marken-Token in `image-generation-prompts.json` | `#3AAA35` | grasgrün |
| Katalogfoto, Korpus gemessen | `#00906D` – `#03997B` | smaragdgrün, Mittelton **mit** Beschattung |
| Website-Hero, Rohre gemessen | `#5BB182` | aufgehellt/entsättigt durch Compositing |

Die drei widersprechen sich. Setze `PPR_GREEN = '#17A46B'` — das ist der auf Albedo hochgerechnete Wert der Fotomessung, und Fotos sind die verlässlichste der drei Quellen. **Definiere ihn als eine einzige exportierte Konstante**, damit eine spätere CI-Korrektur eine Ein-Zeilen-Änderung ist. Notiere in der Annahmenliste, dass dieser Wert gegen das Original-Produkt zu verifizieren ist.

### Hebel — Anthrazit

```js
color:              '#23262A'    // Fotomessung Nabe: #262322, Arm im Licht: #525956
roughness:          0.22
metalness:          0.0
clearcoat:          0.70
clearcoatRoughness: 0.15
envMapIntensity:    1.1
```
Der Hebel ist deutlich glänzender als der Korpus. Dieser Kontrast ist am Original das auffälligste Materialmerkmal — wenn beide Teile gleich glänzen, wirkt das Modell sofort wie ein Spielzeug.

### PTFE-Sitze
`color '#F2F0EA'`, `roughness 0.55`, `clearcoat 0`, `envMapIntensity 0.6`

### O-Ringe
`color '#121212'`, `roughness 0.88`, `sheen 0.3` (Gummi-Sheen)

### Messing-Variante (für die Schwesterartikel AQ850xx)
`color '#C9A227'`, `metalness 1.0`, `roughness 0.30`, `envMapIntensity 1.4`
Verchromt: `color '#E8EAED'`, `metalness 1.0`, `roughness 0.06`

### Mikrodetails — nicht optional

Ohne diese sieht das Modell nach CAD-Viewer aus, nicht nach Produkt:

- **Roughness-Variation:** eine prozedurale Noise-Roughness-Map (Canvas-generiert, 512², kein Datei-Asset), Amplitude ±0,06. Spritzguss-PP ist nie gleichmäßig glatt.
- **Formtrennnaht:** hauchfeiner Grat entlang der Formteilungsebene der Muttern und des Korpus. Als 0,15-mm-Geometriekante oder als Linie in der Roughness-Map.
- **Auswerferstift-Marken:** 3 flache Kreise Ø 4 mm, 0,1 mm vertieft, auf der Korpusunterseite. Reines Roughness-Detail genügt.
- **Kantenverschleiß:** an Fasen und Riffelkanten die Roughness leicht absenken (Politur durch Handhabung). Über eine curvature-basierte Vertex-Color-Maske oder eine per-Vertex-Roughness.
- **Keine perfekte Symmetrie** in der Roughness-Map — links und rechts unterschiedlich seeden.

---

## §5 BELEUCHTUNG & RENDERING

**Kein externes HDRI.** Baue das Studio-Rig aus `<Lightformer>`-Flächen in `<Environment resolution={512}>`.

```
Key      Rechteck 6×4, oben-links-vorn, Intensität 3.5, weiß, weich
Fill     Rechteck 5×5, rechts, Intensität 0.8, leicht kühl (#EAF0FF)
Rim      Streifen 0.4×8, hinten-oben, Intensität 6.0, weiß — erzeugt die
         Glanzkante auf Mutter und Hebel. Das ist der Lichteffekt, der
         Produktfotos ausmacht. Ohne ihn wirkt alles flach.
Bounce   Rechteck 8×8, unten, Intensität 0.4, warm (#FFF6EC)
Umgebung dunkles Grau statt Schwarz — reines Schwarz erzeugt tote Reflexionen
         im Klarlack des Hebels
```

**Renderer:**
```js
toneMapping:      THREE.ACESFilmicToneMapping
toneMappingExposure: 1.0
antialias:        true
alpha:            true          // Seitenhintergrund bleibt sichtbar
dpr:              [1, 2]
shadows:          'soft'
```

**Schatten:** `<ContactShadows>` (nicht `AccumulativeShadows` — der ist mit `frameloop="demand"` unzuverlässig).
`opacity 0.45`, `blur 2.2`, `far 4`, `resolution 1024`, minimal unterhalb der Laschen-Unterkante positioniert. Der Schattenkern direkt unter dem Korpus muss deutlich dunkler sein als der Rand — ein gleichmäßig grauer Fleck ist falsch.

**Postprocessing** über `@react-three/postprocessing`:
- `SMAA` — Pflicht, die Riffelkanten aliasen sonst hässlich
- `N8AO`, `intensity 1.0`, `aoRadius 0.35` — bringt die Riffelnuten und den Nabenübergang heraus. **Vorher prüfen, ob der Export in der installierten Version vorhanden ist** — falls nicht, weglassen und dokumentieren, statt zu raten.
- Kein Bloom, kein DOF, keine Vignette, keine chromatische Aberration. Das ist ein Produktbild, kein Videospiel.

**Hintergrund:** transparent. Kein Boden, kein Gitter, keine sichtbare Studiobox.

---

## §6 KAMERA & INTERAKTION

**Kamera:** perspektivisch, **FOV 28°** (lange Brennweite = Produktfoto-Anmutung; 50–75° wirkt wie eine Handykamera und verzerrt die Proportionen).
Startposition: 3/4-Ansicht, Azimut −32°, Elevation +18°, per `<Bounds fit clip observe margin={1.25}>` eingepasst.

**OrbitControls:**
```
enablePan       false
minPolarAngle   25°     // nie von exakt oben
maxPolarAngle   105°    // nie von unten — Unteransichten sind bei Produkten immer unattraktiv
minDistance / maxDistance: Bounds-Distanz × 0.55 … × 2.5
enableDamping   true, dampingFactor 0.06
autoRotate      nach 6 s Inaktivität, Geschwindigkeit 0.6, stoppt bei jeder Eingabe
```

**Funktionen:**

1. **Auf/Zu** — Klick auf den Hebel oder auf einen Button. Hebel und Kugel drehen **gemeinsam** 90° um Y, 550 ms, `easeInOutCubic`. Zustand als Label anzeigen („Offen — Hebel parallel zur Rohrachse" / „Geschlossen — Hebel quer"). Cursor über dem Hebel wird `pointer`.

2. **Explosionsansicht** — Slider 0 → 1. Teile fahren entlang X auseinander, außer Hebel und Spindel (nach +Y) und Kugel/Sitze (bleiben mittig, Sitze nach ±X). Versatz proportional zu `L`. Bei ≥ 0,15 werden Teilebezeichnungen als `<Html>`-Labels eingeblendet.

3. **Schnittansicht** — Halbschnitt über eine Clipping-Plane auf Z = 0.
   - `gl.localClippingEnabled = true`
   - **Stencil-basierte Deckflächen**, damit die Schnittfläche massiv wirkt und man nicht in einen hohlen Körper blickt. Ein aufgeschnittenes Modell ohne Cap-Fläche ist der klassische Anfängerfehler.
   - Schnittflächen in einem eigenen, matten Material mit leicht abgedunkelter Materialfarbe
   - Beim Umschalten die Kamera sanft auf die Frontansicht fahren

4. **Größenwahl** d20 … d63 — Segmented Control. Bei Wechsel wird die Geometrie neu erzeugt und die Kamera per `<Bounds>` neu eingepasst, 400 ms weich. Die Größenänderung muss **sichtbar** sein: der d63 ist fast doppelt so lang wie der d20.

5. **Bemaßungs-Overlay** — Toggle. Zeigt `L`, `D`, `H`, `A` als technische Maßlinien (Pfeile, Maßhilfslinien, Zahlenwert in mm) im 3D-Raum, Labels über `<Html occlude>`. Bei Rotation über 40° vom Startazimut ausblenden — Maßlinien sind nur in Frontalansicht lesbar.

6. **Ansichts-Presets** — 3/4 · Front · Draufsicht · Schnitt, je 700 ms interpoliert.

7. **Hotspots** — 3 dezente Punkte mit Text bei Hover:
   - Überwurfmutter → „Lösbare Verschraubung — Ventil ohne Rohrtrennung demontierbar"
   - Muffe → „Schweißmuffe für Polyfusion, Muffentiefe {muffentiefe} mm"
   - Hebel → „90°-Betätigung, Stellung zeigt Durchfluss an"

---

## §7 UI

Reduziert und außerhalb des 3D-Bilds. Der Viewer ist das Produkt, nicht die Bedienleiste.

- Untere Leiste: Größenwahl · Auf/Zu · Ansichts-Presets
- Rechte Kante: drei Icon-Toggles (Explosion · Schnitt · Bemaßung), auf Mobil in ein Overflow-Menü
- Oben links: Artikelnummer und Nennweite der aktuellen Auswahl, klein und gesetzt wie in einem Datenblatt
- Ladezustand: dezenter Skeleton, kein Spinner
- Typografie und Farben aus dem bestehenden Design-System der Seite übernehmen — **keine eigene Farbpalette erfinden**

---

## §8 TECHNIK

**Stack:** React 18+, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `three`, TypeScript, Tailwind.

**Props:**
```ts
type KAquaBallValve3DProps = {
  size?: 20 | 25 | 32 | 40 | 50 | 63      // default 32
  variant?: 'ball-in-pp' | 'ball-in-brass' // default 'ball-in-pp'
  initialState?: 'open' | 'closed'         // default 'open'
  showDimensions?: boolean
  enableSection?: boolean
  enableExploded?: boolean
  autoRotate?: boolean
  className?: string
  onSizeChange?: (size: number) => void
}
```

**Performance-Budget:**
| Metrik | Ziel |
|---|---|
| Dreiecke gesamt | < 120 k, davon Sichtteile < 80 k |
| Draw Calls | < 25 |
| Frame-Zeit (M1, DPR 2, 1200 px) | < 12 ms |
| JS-Bundle der Komponente (gzip, ohne three) | < 45 kB |
| Time to First Frame | < 1,2 s |

- `frameloop="demand"`, `invalidate()` bei Interaktion und während Animationen
- Einbindung über `next/dynamic` mit `ssr: false`
- Geometrien in `useMemo`, abhängig ausschließlich von `size`
- `IntersectionObserver`: außerhalb des Viewports wird nicht gerendert

**Barrierefreiheit:**
- Canvas mit `role="img"` und beschreibendem `aria-label`
- Alle Bedienelemente sind echte Buttons, per Tastatur erreichbar, mit sichtbarem Fokusring
- Pfeiltasten rotieren, `+`/`−` zoomen, `O` schaltet auf/zu, `R` setzt zurück
- `prefers-reduced-motion`: kein Auto-Rotate, Animationen auf 120 ms
- Textliche Fallback-Beschreibung mit den Maßen für Screenreader
- WebGL nicht verfügbar → statisches Fallback mit Produktdaten, kein Absturz

**Responsive:** ab 360 px Breite nutzbar, Seitenverhältnis 4:3 mobil / 16:10 Desktop, Touch: 1 Finger rotiert, 2 Finger zoomen.

---

## §9 ABNAHMEKRITERIEN

Jeden Punkt einzeln prüfen und mit ✅/❌ beantworten. Bei ❌ nachbessern und erneut prüfen. Nicht abliefern, solange ein ❌ offen ist.

**Maße**
1. `Box3` über das Gesamtmodell: X-Ausdehnung = `L` ± 0,3 mm
2. Größter Durchmesser = `D` ± 0,3 mm
3. Rohrachse bis Hebeloberkante = `H` ± 0,3 mm
4. Hebel-Gesamtlänge = `A` ± 0,3 mm
5. Muffentiefe messbar = `(L−z)/2` ± 0,2 mm
6. Alle sechs Größen erfüllen 1–5

**Geometrie**
7. Keine einzige unverrundete 90°-Kante am Sichtteil
8. Streiflicht bei 5° Einfallswinkel erzeugt keine sichtbare Facettierung in Rundungen
9. Riffelnuten sind halbrund und laufen weich aus, nicht als scharfe Einschnitte
10. Kugel und Sitze existieren und sind durch die Muffenbohrung sichtbar
11. Hebel-Unterseite ist gerippt hohl, nicht flach massiv
12. Restwand im Korpus ≥ 3 mm bei allen Größen
13. Entformungsschräge in der Seitenansicht erkennbar
13a. Hebel-Höhenreihe eingehalten: Dom 0,41 · H · Armunterkante 0,70 · H · Kuppel 0,85 · H · Armoberkante 1,00 · H — im Seitenriss nachmessen
13b. Nabenkuppel ist von vorn links und rechts neben dem Arm sichtbar

**Material & Licht**
14. Hebel ist sichtbar glänzender als der Korpus
15. Auf Mutter und Hebel liegt eine durchgehende Rim-Glanzkante
16. Kontaktschatten hat einen dunklen Kern und einen weichen Rand
17. Graustufen-Render zeigt Werte über den gesamten Tonwertumfang, nicht nur Mitteltöne
18. Kein Teil wirkt metallisch, das aus Kunststoff ist
19. Oberfläche zeigt Roughness-Variation, ist nicht spiegelglatt gleichmäßig

**Interaktion**
20. Auf/Zu-Animation dreht Hebel und Kugel synchron
21. Explosion trennt alle 12 Einzelteile sichtbar und überschneidungsfrei
22. Schnittansicht zeigt geschlossene Deckflächen, keine hohlen Wände
23. Größenwechsel ohne Flackern, ohne Speicherzuwachs über 3 Wechsel
24. Bemaßungslinien treffen exakt die Geometriepunkte

**Technik**
25. 60 fps auf einem Mittelklasse-Laptop bei DPR 2
26. Kein `console.error`, keine React-Warnings
27. Speicher stabil nach 20 Größenwechseln (Heap-Snapshot vergleichen)
28. Vollständig per Tastatur bedienbar
29. Nutzbar bei 360 px Viewport-Breite
30. Kein externes Asset, keine Netzwerkanfrage zur Laufzeit

**Vergleich**
31. Seite-an-Seite-Render in der Perspektive des Katalogfotos: Ein Fachkunde würde beide für dasselbe Bauteil halten
32. Silhouettentest bestanden (§10.1)

---

## §10 SELBSTPRÜFUNGS-TESTS

Führe diese aus, statt nur „sieht gut aus" zu urteilen.

**10.1 Silhouettentest** — alle Materialien auf mattes Weiß, Umgebungslicht flach. Ist das Teil allein an der Silhouette als Kugelhahn erkennbar, und welche Größe? Wenn nein: die Proportionen stimmen nicht, kein Materialproblem.

**10.2 Kantentest** — auf 400 % zoomen und jede Kante einzeln abfahren. Jede muss das Licht als feine helle Linie fangen. Kante ohne Lichtkante = fehlende Fase.

**10.3 Maßtest** — `Box3` und gezielte Raycasts, Ist-Werte gegen §1.2 tabellieren. Nicht schätzen, messen.

**10.4 Streiflichttest** — Key-Light auf 5° Einfallswinkel. Werden Polygonfacetten sichtbar, Segmentzahl erhöhen.

**10.5 Graustufentest** — Sättigung auf 0. Ist die Tonwertverteilung ausgewogen? Klebt alles bei Mitteltönen, fehlt Lichtführung, nicht Farbe.

**10.6 Vergleichstest** — in der Kameraperspektive des Katalogfotos rendern und nebeneinanderlegen. Die drei größten Abweichungen benennen und beheben.

**10.7 Frischer-Blick-Test** — beschreibe das Render, als sähest du es zum ersten Mal, ohne zu wissen, dass du es gebaut hast. Was fällt zuerst negativ auf?

---

## §11 VERBOTEN

- Externe Assets: HDRI, GLB, Texturdateien, Google Fonts, CDN-Requests zur Laufzeit
- Scharfe, unverrundete Kanten
- Metallischer Look auf Kunststoffteilen
- Sichtbarer Boden, Studiobox, Gitter, Achsenkreuz
- Bloom, Depth of Field, Lens Flare, Vignette
- Emissive Materialien
- Modellierte Schriftzüge oder Logos
- Weitwinkel-Kamera über 40° FOV
- CSG oder Geometrie-Erzeugung innerhalb von `useFrame`
- `useFrame` ohne `invalidate()` bei `frameloop="demand"`
- `localStorage` / `sessionStorage`
- Platzhalter, `TODO`, auskommentierter Code oder „hier könnte man noch…" in der Abgabe
- Teile weglassen, weil sie „meistens nicht sichtbar" sind

---

## §12 WENN DIE ZIELUMGEBUNG EINE EINZELDATEI-VORSCHAU IST

Falls du in einer Umgebung ohne npm-Installation arbeitest (Einzeldatei-Artefakt), gilt der gesamte Prompt unverändert, mit diesen Abweichungen:

- Vanilla `three` statt R3F; `OrbitControls` selbst implementieren
- Environment über `PMREMGenerator.fromScene()` mit einer selbst gebauten Szene aus emissiven Ebenen — das ersetzt `<Lightformer>` funktional gleichwertig
- Kein Postprocessing-Paket: `antialias: true` genügt, AO entfällt (dokumentieren)
- CSG entfällt: Bohrungen über Lathe-Profile mit Innenkontur lösen, Kugelbohrung über zwei gegenläufige Halbkugelschalen plus Zylinder
- Alles in einer Datei, kein `localStorage`
- Alle Abnahmekriterien außer 25–27 bleiben gültig

---

## §13 ABGABE

1. `KAquaBallValve3D.tsx` — Hauptkomponente
2. `valve-geometry.ts` — Parametrik und Profil-Helper
3. `valve-materials.ts` — Materialien und `PPR_GREEN`
4. `valve-data.ts` — Artikeltabelle als typisierte Konstante
5. Kurze Einbindungsanleitung für den Next.js App Router (`next/dynamic`, `ssr: false`)
6. **Annahmenliste** — jede `// ASSUMPTION:` gesammelt, mit Begründung und dem Hinweis, wogegen sie zu verifizieren ist
7. **Ausgefüllte Abnahmeliste** aus §9, 32 Zeilen, jede mit ✅ oder ❌ und bei ❌ mit Begründung

Beginne mit V0. Zeige nach jeder Stufe deine Selbstkritik, bevor du weitermachst.

## PROMPT ENDE

---
---

## Anhang — Woher die Daten kommen und was noch offen ist

### Belegte Werte
- **Maßtabelle §1.2** — 1:1 aus der K-Aqua Produktseite (`Valves K-Aqua/screencapture-…ball-in-pp….png`), Spalten d/D/L/z/H/A/L1.
- **Maßschlüssel §1.1** — aus der technischen Zeichnung auf derselben Seite: `A` ist die horizontale Hebellänge, `H` reicht von der Rohrachse bis Oberkante Hebel, `D` ist der Außendurchmesser der Überwurfmutter.
- **Muffentiefe** — aus `(L−z)/2` berechnet: 14,0 / 15,5 / 17,0 / 20,0 / 23,5 / 27,0 mm für d20…d63. Diese Reihe entspricht den branchenüblichen Muffentiefen für PP-R-Polyfusion — starke Bestätigung, dass `z` die Einbaulänge ist.
- **Längenaufteilung §1.4** — pixelgenau aus dem Katalogfoto segmentiert (Silhouettenprofil über die grüne Maske): Stutzen 48 px · Mutter 89 px · Korpus 193 px · Mutter 85 px · Stutzen 49 px bei 464 px Gesamtlänge.
- **Hebel-Höhenreihe §2/10** — aus demselben Foto: Rohrachse bei y ≈ 271, Domoberkante 173, Armunterkante 130, Kuppeloberkante 67, Armoberkante 32. Normiert auf H ergibt das 0,41 / 0,70 / 0,85 / 1,00.
- **Farbwerte** — Pixelmessung: Korpus `#00906D`–`#03997B`, Hebelnabe `#262322`, Hebelarm im Licht `#525956`, Website-Hero-Rohre `#5BB182`.
- **Zwei unabhängige Plausibilitätsprüfungen bestanden:**
  - `A/L` aus dem Foto = 0,737 · aus der Tabelle = 0,727 (d32). Das Foto ist in der Hebelgeometrie also maßstäblich brauchbar.
  - `D/L` aus dem Foto = 0,571 · aus der Tabelle = 0,545. Ebenfalls im Rahmen.
  Beide Werte stützen die Foto-Proportionen als Startpunkt — nicht aber als Ersatz für die Tabelle.

### Offene Punkte
1. **`L1` ist nicht eindeutig.** Aus der Zeichnung ist nicht sicher ablesbar, welche Strecke gemeint ist. `(L−L1)/2` ergibt konstant 17–18 % von L, was weder zur Muffentiefe noch zur Foto-Proportion passt. Deshalb im Prompt bewusst als „nicht verbindlich" geführt.
2. **Grünton.** Drei Quellen, drei Werte — siehe §4. Der Prompt setzt `#17A46B` und zwingt zur Ein-Konstanten-Lösung. Wenn ihr das CI-Grün habt, ist das eine Ein-Zeilen-Korrektur.
3. **Riffelanzahl der Überwurfmutter.** 12 ist aus dem Foto geschätzt (Auflösung reicht nicht zum Zählen). Am Realteil nachzählen.
4. **Sub-Längen der Einzelteile.** Nur proportional belegt, nicht bemaßt. Ein Foto eines echten Teils mit Maßstab würde das in fünf Minuten klären.

### Nebenbefund: Datenfehler in den Produkt-Markdowns

Beim Abgleich ist mir aufgefallen, dass `docs Unterseiten/` bei den Armaturen nicht mit der Originalquelle übereinstimmt. Zwei belegte Fälle:

**PP-R Ball Valve (Ball in PP)**

| | Artikelnummern | Spalten | d20 |
|---|---|---|---|
| `valves/pp-r-ball-valve-ball-in-pp.md` | AQ50020–AQ50063 | d, L, H | L = 90, H = 63 |
| K-Aqua Produktseite | AQ85220–AQ85263 | d, D, L, z, H, A, L1 | L = 98, H = 51 |

**PP-R Ball Valve (Ball in Brass)**

| | Artikelnummern | d20 |
|---|---|---|
| `valves/pp-r-ball-valve-brass.md` | AQ60020–AQ60090 | L = 67,5 · H = 64,5 |
| K-Aqua Produktseite | AQ85020–AQ85090 | A = 67,5 · H = 60 · L = 102 |

Beim Messing-Hahn ist der Mechanismus erkennbar: **die Spalte `A` (Hebellänge) der Originaltabelle wurde als `L` (Baulänge) übernommen.** Aus 67,5 mm Hebellänge wurde eine 67,5 mm lange Armatur — die tatsächlich 102 mm lang ist.

Was das bedeutet:

- Die Artikelnummern der beiden Kugelhähne sind falsch. Bestellungen darüber laufen ins Leere.
- Die Maße sind teilweise falsch zugeordnet.
- Ich konnte nur die Armaturen prüfen — die Fittings liegen als Bild-PDFs ohne Textebene vor, dort ist ein Abgleich ohne OCR nicht möglich.

**Empfehlung:** Vor dem Livegang der 71 Produktseiten die Artikelnummern und Maßspalten stichprobenartig gegen die Screenshots prüfen, mindestens je zwei Produkte pro Kategorie. Wenn du willst, mache ich das per OCR über alle 79 Markdown-Dateien und liefere eine Abweichungsliste.
