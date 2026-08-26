# 25 — BILDQUELLEN UND CODESYSTEME

Angelegt 24.08.2026, als der Ordner `Marketing/` dazukam.

Ohne dieses Dokument rätst du in jedem Loop-Durchgang neu, welches Bild was
beweisen darf und welcher Artikelcode zu welchem Produkt gehört. Eine Regel,
die du dir selbst gibst und nirgends aufschreibst, gilt im nächsten Durchgang
nicht mehr.

> **`Marketing/` ist nicht versioniert** (`.gitignore`, mit Begründung: 381 MB
> in ein bereits 690 MB großes `.git`). Der Ordner muss außerhalb des
> Repositories gesichert werden, sonst ist er beim nächsten Rechnerwechsel
> weg — so wie am 24.08.2026 der Arbeitsbaum weg war (Fall 41).

---

## 1 · Die Rangfolge

Fall 31 kennt: Tabellenmaß (Rang 1) > Zeichnung (Rang 2) > Fotoableitung
(Rang 3). Die neuen Quellen ordnen sich so ein:

| Rang | Quelle | Was sie beweist |
|---|---|---|
| **1** | **Druckkatalog** `Marketing/Print/KA-Katalog_GB_06-2025_NEU.pdf`, S. 76–117 | Maßtabelle **und** Vektor-Maßzeichnung, Textebene auslesbar |
| **1** | Website-Aufnahmen `K-Aqua Unterseitem Kopie/` | Maßtabelle, als Rasterbild |
| **2** | ALH-Render `Marketing/diverse Fotos alt/ALH Produktbilder/<CODE>/` | Gestalt bei **bekannter Größe** — der Ordnername ist der Artikelcode |
| **3** | Produktfotos `Marketing/Produktbilder/<farbe>/` | Werkstoff, Oberfläche, Farbe, Gestalt — Größe **unbekannt** |
| **4** | Gruppenbilder, `K-Aqua colors.jpg`, Videos | Formensprache, Farbfamilie. **Keine Maße.** |

**Die fünf Regeln, die daraus folgen:**

1. Ein Bild schlägt **nie** ein Tabellenmaß.
2. Ein Bild **darf** eine Gestalt bestimmen, die keine Tabelle bemaßt —
   Sechskant ja/nein, Riffelung, Absatz, Prägung, Farbe.
3. Ein Render mit bekanntem Artikelcode ist stärker als ein Katalogfoto
   unbekannter Größe — ABER: **der Ordnername belegt das PRODUKT, die
   GRÖSSE nur unverbindlich.** Beleg vom 25.08.2026: der Ordner
   `AQ28520` (d20) enthält einen Seitenriss in bewiesener Parallellage
   (Rohrdicke links = rechts aufs Pixel), dessen L/H exakt der
   d32-Zeile entspricht. Proportionsschlüsse aus Rendern brauchen die
   Gegenprobe über alle Katalogzeilen; erst wenn genau eine Zeile
   passt, ist die dargestellte Größe bestimmt (Fall 35 bleibt in
   Kraft).
4. Widersprechen sich **zwei Bilder** derselben Familie, gewinnt keines. Der
   Widerspruch wird dokumentiert und dem Menschen vorgelegt.
5. **Neu:** Widersprechen sich **Katalogtabelle und Website-Tabelle**, gewinnt
   ebenfalls keine — beide sind Rang 1. Dokumentieren, vorlegen, nicht
   nachgeben. Der Katalog ist die *bessere Handhabung* (Vektorzeichnung,
   Textebene), nicht die höhere Instanz.

---

## 2 · Der Druckkatalog — die beste Quelle des Projekts

121 Seiten A4, Adobe InDesign 20.1, Ausgabe **KWT 06/25**. Die Textebene ist
auf allen Seiten außer 2, 119, 120 auslesbar; die Maßzeichnungen sind
**Vektorgrafik**, also verlustfrei skalierbar. Damit entfallen Zuschnitt,
4×-Vergrößerung und Ablesen vom Raster.

**Die Produktseiten:**

| S. | Familien | S. | Familien |
|---|---|---|---|
| 76 | `AQ200` `AQ200P` `AQ258P` | 96 | `AQ092G` `AQ330A` |
| 77 | `AQ111P` `AQ111PL` | 97 | `AQ542` `AQ547` |
| 78 | `AQ160F` `AQ200F` `AQ258F` | 98 | `AQ532` `AQ537` |
| 79 | `AQ206PF` `AQ207PF` `AQ258PF` | 99 | `AQ130G` `AQ133G` |
| 80 | `AQ111PF` `AQ169PF` | 100 | `AQ332` |
| 81 | `AQ117PF` | 102 | `AQ130S` `AQ270S` |
| 82 | `AQ200FUV` `AQ200PFUV` | 103 | `AQ243S` |
| 84 | `AQ041` `AQ045` | 106 | `AQ599` |
| 85 | `AQ090` `AQ091` | 107 | `AQ850` `AQ852` |
| 86 | `AQ270` `AQ301` | 108 | `AQ490G` `AQ492G` `AQ599A` |
| 87 | `AQ243` | 110 | `AQ714` `AQ750` |
| 88–89 | `AQ130` | 111 | `AQ490F` `AQ500` |
| 90 | `AQ180` `AQ790` | 112 | `AQ909` |
| 91 | `AQ285` `AQ287` | 114 | `AQ970` `AQ974` `AQ975` `AQ980` |
| 92 | `AQ271` | 115 | `AQ982` `AQ985` |
| 94 | `AQ243G` `AQ270G` | 116 | `AQ593` `AQ983` `AQ986` `AQ988` |
| 95 | `AQ090G` `AQ472G` | 117 | `AQ989` `AQ990` |

**526 Artikelcodes in 68 Familien.** Technische Tabellen (Druckstufen,
chemische Beständigkeit, Schweißparameter) stehen auf S. 16–64.

**Falle: die Textebene ist nicht in Leserichtung.** InDesign gibt Rahmen in
Anlagereihenfolge aus. Auf einer Seite mit **zwei** Produkten stehen erst
beide Überschriften, dann beide Codeblöcke ineinandergeschoben — wer der
Reihenfolge folgt, ordnet die Tabellen **vertauscht** zu. Auf S. 97 führt das
zu „AQ547 = Innengewinde", und das ist falsch.

Gegenprobe wie in Fall 28: eine Deutung über die **Zahlen** prüfen, nicht über
die Reihenfolge. `AQ54763` trägt L 85 / l1 50, `AQ54263` trägt L 63 / l1 28 —
das längere Teil ist das mit dem herausstehenden Außengewinde. Also
`AQ547` = AG, `AQ542` = IG. Ebenso `AQ537` = AG, `AQ532` = IG.

`Print/Flyer_GB_2025.pdf` führt 472 Codes, aber nur `Code | Dimension` —
keine Maßbuchstaben, keine Zeichnung. Er nennt Familien, die der Katalog
nicht führt (`AQ100`, `AQ160`, `AQ853`) und Größen bis d315. Als Maßquelle
untauglich, als Sortimentsnachweis brauchbar.

---

## 3 · Drei Codesysteme, nicht zwei

| System | Umfang | Deckung mit dem Katalog |
|---|---|---|
| **Katalog / Flyer** | 526 bzw. 472 Codes | maßgeblich |
| **ALH-Ordnernamen** | 112 Ordner | **109 wörtlich** — die stärkste Bildquelle |
| **Produktbild-Dateinamen** | 70 Dateien | **0 wörtlich** — Familien-Foto-IDs |
| `article_prefix_md_unverified` in `produkt-registry.json` | 71 Einträge | **überwiegend falsch**, siehe §6 |

### 3.1 ALH-Ordner → Produkt

Aufbau: `AQ` + 3 Familienziffern + optional ein Buchstabe + Größenziffern.
Bei `G` folgt Nennweite + Gewindegröße mit stillem Bruch:
`2012` = 20 × ½", `2534` = 25 × ¾", `321` = 32 × 1", `40114` = 40 × 1¼",
`50112` = 50 × 1½", `632` = 63 × 2", `75212` = 75 × 2½", `903` = 90 × 3",
`1104` = 110 × 4".

| Familie | S. | Produkt | `id` | Ordner |
|---|---|---|---|---|
| `AQ045` | 84 | Winkel 45° | `fittings/elbow-45` | 9 |
| `AQ090` | 85 | Winkel 90° | `fittings/elbow-90` | 9 |
| `AQ090G` | 95 | Anschlussbogen 90° IG | `transition-fittings/elbow-bracket-90-female-thread` | 3 |
| `AQ130` | 88–89 | T-Stück **und** Reduzier-T-Stück | `fittings/tee`, `fittings/reducing-tee` | 23 |
| `AQ130G` | 99 | T-Stück 90° IG | `transition-fittings/tee-90-female-thread` | 2 |
| `AQ243` | 87 | Reduzierbuchse | `fittings/reducing-bush` | 20 |
| `AQ243G` | 94 | Übergangsmuffe AG | `transition-fittings/adaptor-socket-male-thread` | 10 |
| `AQ270` | 86 | Muffe | `fittings/socket` | 9 |
| `AQ270G` | 94 | Übergangsmuffe IG | `transition-fittings/adaptor-socket-female-thread` | 9 |
| `AQ285` | 91 | Überbogen mit Rohr | `fittings/cross-over-pipe` | 2 |
| `AQ287` | 91 | Überbogen | `fittings/cross-over` | 1 |
| `AQ301` | 86 | Kappe | `fittings/cap` | 9 |
| `AQ330A` | 96 | Verschraubung PP-R | `transition-fittings/union` | 3 |

`AQ130` deckt **zwei** Produkte: Codes mit einer Nennweite sind T-Stücke,
Codes mit zwei (z. B. `AQ1306320` = 63/20/63) sind Reduzier-T-Stücke.

**Drei Ordnernamen sind Schreibfehler und werden NICHT zugeordnet:**

| Ordner | Was fehlt |
|---|---|
| `AQ090G32` | unvollständig — der Katalog kennt `AQ090G3212` (32×½") und `AQ090G321` (32×1"). Welche gemeint ist, steht nicht fest. |
| `AQ270H903` | Buchstabe `H`; der Katalog führt `AQ270G903`. Vermutlich Tippfehler, **nicht** angenommen. |
| `AQ33025` | fehlendes `A`; der Katalog führt `AQ330A25`. |

### 3.2 Produktbilder → Familie

Die Dateinamen sind **keine Artikelcodes**, sondern Foto-IDs der Familie.
Abgeleitete Marken, an Bildpaaren geprüft:

- **`P` am Ende** = Fotomarke bei Formteilen. **Aber** bei Rohren ist `P` ein
  echter Codebuchstabe (`AQ111P`, `AQ200P`, `AQ207PF`). Nicht verwechseln.
- **`G`** = Gewinde.
- **`6` vor `GP`** = **Sechskant**-Messingeinsatz statt rundem.
  Beleg: `AQ090GP` (rund) gegen `AQ0906GP` (sechskantig), gleiches Teil.
  Ebenso die Paare `AQ092GP`/`AQ0926GP`, `AQ130GP`/`AQ1306GP`,
  `AQ133GP`/`AQ1336GP`, `AQ243GP`/`AQ2436GP`, `AQ270GP`/`AQ2706GP`,
  `AQ271GP`/`AQ2716GP`, `AQ130GSP`/`AQ1306GSP`.
  → **Eine Variantenachse, die in keinem Modell steht.** Offen für den
  Menschen: gehört sie in den Katalog?

**Ohne Katalogentsprechung — als unzugeordnet geführt, nicht zugeschlagen:**
`AQ002P` · `AQ050GP` · `AQ050P` · `AQ051GP` · `AQ286` · `AQ473G` ·
`AQ730_750` · `AQVerteiler 40x20` · `AQVerteiler 40x1_2 IG`
(die beiden Verteiler sind 4-fach-Verteilerbalken, im Katalog nicht geführt).

### 3.3 Farben

Fünf belegte Linien, RAL aus den Ordnernamen: grün **RAL 6024** ·
blau **RAL 5005** · curry **RAL 1002** · Mocca **RAL 7032** · uv schwarz.

Die Farbordner enthalten fast nur Rohre und Rohrformteile (`111P`, `160F`,
`200F`, `200P`, `207PF`). **Es gibt nicht jedes Fitting in jeder Farbe** —
welche Produkte in welcher Farbe existieren, wird ausschließlich aus den
Dateinamen abgeleitet.

`K-Aqua colors.jpg` (1024×882) zeigt eine **Messewand** mit Mustern in etwa
elf Farben, darunter rot, violett, cyan, gold. Das ist eine Ausstellung,
keine Farbliste. **Daraus wird keine Produktfarbe abgeleitet.** Beide PDFs
sagen „Other colors available on request".

Farbwerte werden **aus den PNGs gemessen**, nicht aus RAL-Tabellen im Kopf:
Fleck auf der Mantelfläche abtasten, Glanzlicht und Schatten ausschließen,
Median nehmen. Gemessener Wert **und** RAL-Name gehören in den Kommentar.

---

## 4 · Website-Aufnahmen

78 Aufnahmen: **71 Produktseiten + 7 Kategorieseiten**. Jedes der 71
Registry-Produkte hat seine Aufnahme, keine fehlt, keine ist doppelt vergeben.
Das Feld `source_screenshot` trägt den Pfad wörtlich — 49 stimmen mit dem
Slug überein, **22 sind Aliase** (`sdr-7-4` → `sdr-74`, weggelassene
Marketingzusätze, `femalemale` ohne Bindestrich). Eine Ableitung aus dem Slug
scheitert an allen 22; immer `source_screenshot` lesen.

Zuschnitt der Maßzeichnung → Fall 34.

Der Duplikatordner `/Users/umurey/Downloads/K-Aqua Unterseitem Kopie/` ist
byteweise identisch und ohne Zusatznutzen.

---

## 5 · Zwei belegte Widersprüche

### 5.1 Die Seite „adaptor socket (female thread)" zeigt eine fremde Tabelle

Die Website-Aufnahme dieses Produkts führt Codes **`AQ27120 … AQ271315`** in
14 Zeilen mit den Spalten `Code d D L h L1`. Im Druckkatalog ist **`AQ271`
die Elektroschweißmuffe** (S. 92) — die Übergangsmuffe IG ist **`AQ270G`**
(S. 94, 12 Größen, Spalten `Code d Rp D D1 l z`).

Dazu passt, dass die **Zeichnung** auf derselben Seite `D Rp z d D1` beschriftet
ist — also zu `AQ270G`, nicht zur abgebildeten Tabelle.

**Deutung:** Die Website mischt auf dieser Seite zwei Produkte. Für die
Modellierung gilt der Katalog: `AQ270G`, 12 Größen. Die Entscheidung des
Menschen von Welle 4 („nur Zeichnungsgrößen d20–d63, Rest weglassen,
`status:'prototyp'`") ist damit **gegenstandslos geworden** — sie beruhte auf
einer Tabelle, die nicht zu diesem Produkt gehört. **Dem Menschen vorlegen,
nicht selbst umentscheiden.**

### 5.2 Winkel 90° AG — der Klotz am Gewindeschenkel

Katalog S. 96, `AQ092G`, 4 Größen:

```
Code        d   R     D   l   z   L1  z1
AQ092G2012  20  1/2"  29  28  14  34  49
AQ092G2512  25  1/2"  34  32  16  38  53
AQ092G2534  25  3/4"  34  32  16  40  56
AQ092G321   32  1"    43  38  20  48  66
```

Zeichnungsmarken: `d D z l R L z1`. **Keine Spalte SW**, und **keine Spalte,
die den PP-Körper am Gewindeschenkel bemaßt.**

Auf dem Foto `AQ092GP` ist dieser Körper ein breiter, flankierter Klotz,
deutlich weiter als der Muffenschenkel. `products/elbow-90-male-thread/params.js`
wirft dagegen eine Ausnahme, sobald der Gewindeschenkel über `D` hinausgeht.

Nach Regel 2 (§1) gewinnt hier das Bild: Es bestimmt eine **Gestalt, die
keine Tabelle bemaßt**. Wächter entfernen, Klotz nach Foto, Maß als
ASSUMPTION mit Herleitung.

**Kein Widerspruch ist dagegen der Sechskant.** `AQ090G2012` zeigt einen
Sechskantkragen — das ist aber der **Anschlussbogen IG** (S. 95), ein anderes
Produkt. `AQ092G` hat in der ALH-Sammlung überhaupt keinen Render. Das Modell
begründet die runde Ausführung bereits selbst und hat recht.

---

## 6 · Befund: die Artikelpräfixe der Registry sind unzuverlässig

`produkt-registry.json` führt `article_prefix_md_unverified` — aus den
Markdown-Dateien, ausdrücklich als unverifiziert gekennzeichnet. Der Abgleich
gegen den Katalog zeigt: **die Mehrzahl ist falsch.**

| Produkt | Registry | Katalog |
|---|---|---|
| `elbow-90-male-thread` | `AQ09R` | **`AQ092G`** |
| `elbow-bracket-90-female-thread` | `AQ09BRP` | **`AQ090G`** |
| `elbow-wall-bracket-90-female-thread` | `AQ09WBRP` | **`AQ472G`** |
| `tee-90-male-thread` | `AQ13R` | **`AQ133G`** |
| `tee-90-female-thread` | `AQ13RP` | **`AQ130G`** |
| `adaptor-socket-male-thread` | `AQ24R` | **`AQ243G`** |
| `adaptor-socket-female-thread` | `AQ24RP` | **`AQ270G`** |
| `metal-union-male-thread` | `AQ71R` | **`AQ547`** |
| `metal-union-female-thread` | `AQ71RP` | **`AQ542`** |
| `metal-union-male-thread-brass` | `AQ70R` | **`AQ537`** |
| `metal-union-female-thread-brass` | `AQ70RP` | **`AQ532`** |
| `flat-gasket-for-unions` | `AQ9ANRP` | **`AQ490F`** |
| `union` | `AQ69E` | **`AQ330A`** |
| `electrofusion-socket` | `AQ27E` | **`AQ271`** |
| `pp-r-ball-valve-ball-in-pp` | `AQ500` | **`AQ852`** |
| `pp-r-ball-valve-brass` | `AQ600` | **`AQ850`** |
| `pipe-clamps` | `AQ95` | **`AQ500`** |
| `flat-gasket` | `AQ97` | **`AQ714`** |
| `backing-flange` | `AQ575` | **`AQ750`** |
| `plug` | `AQ98P57` | **`AQ90912`** |
| `repairing-plug` | `AQ965` | **`AQ593`** |
| `cross-over` | `AQ267` | **`AQ287`** |
| `weld-in-saddle` | `AQ1505` | **`AQ130S`** |

Besonders heikel: `AQ500` ist in der Registry der Kugelhahn, im Katalog die
**Rohrschelle**. Wer den Präfix ungeprüft benutzt, ordnet Bilder falsch zu —
und ein falsch zugeordnetes Bild verdirbt ein fertiges Modell.

**Regel:** `article_prefix_md_unverified` und `article_codes_md` sind
Hinweise, nie Zuordnungsgrundlage. Verbindlich sind der Katalog und — für die
34 gebauten Produkte — das Feld `alle` in `gallery/registry.js`, das aus
verifizierten Quellen stammt.

Die 22 Korrekturen gehören in `produkt-registry.json` nachgetragen; das ist
ein eigener Arbeitsschritt, kein Nebenher.
