# MÄNGELREGISTER — Spur A: die 50 gebauten Modelle gegen die Bilder

Begonnen 25.08.2026 nach `../AUFTRAG.md`. Dieses Register ist der Befund;
behoben wird erst, wenn es steht (`../SPUR-A-PLAN.md`).

**Die Regeln, unverkürzt aus dem Auftrag:** Ein Bild schlägt nie ein
Tabellenmaß. Ein Bild darf eine Gestalt bestimmen, die keine Tabelle
bemaßt. Ein Mangel braucht eine Messung — ein Eindruck ohne Messung steht
in §5, nicht hier. Wo kein Bild ist, wird das benannt (§4).

---

## 1 · Die Bildzuordnung — eingefroren, kein Produktschritt leitet selbst her

Rangfolge nach `../pipeline/25-BILDQUELLEN.md` §1: Tabellenmaß (Rang 1) >
ALH-Render mit bekannter Größe (Rang 2) > Produktfoto unbekannter Größe
(Rang 3) > Gruppenbild (Rang 4, keine Maße).

**Zuordnungsregeln, an denen die erste Rechnung selbst gescheitert ist:**
nach dem Familienpräfix dürfen im ALH-Ordnernamen **nur noch Ziffern**
stehen (`AQ270` ist ein Präfix von `AQ270G`); `AQ130` mit **einer**
Nennweite ist das T-Stück, mit **zweien** das Reduzier-T-Stück; die drei
belegten Tippfehler `AQ090G32` · `AQ270H903` · `AQ33025` bleiben
unzugeordnet. Damit gehen 109 der 112 Ordner restlos auf.

### 1.1 ALH-Render (14 Produkte, 109 Ordner)

| Produkt | Familie | Ordner | Prüfgröße (Ordnername) |
|---|---|---|---|
| `fittings/cap` | AQ301 | 9 | AQ30132 → d32 |
| `fittings/socket` | AQ270 | 9 | AQ27032 → d32 |
| `fittings/elbow-45` | AQ045 | 9 | AQ04532 → d32 |
| `fittings/elbow-90` | AQ090 | 9 | AQ09032 → d32 |
| `fittings/tee` | AQ130 (eine Nennweite) | 8 | AQ13032 → d32 |
| `fittings/reducing-tee` | AQ130 (zwei Nennweiten) | 15 | AQ1303220 → 32x20 |
| `fittings/reducing-bush` | AQ243 | 20 | AQ2433220 → 32x20 |
| `transition-fittings/adaptor-socket-female-thread` | AQ270G | 9 | AQ270G2512 → d25x½" |
| `transition-fittings/adaptor-socket-male-thread` | AQ243G | 10 | AQ243G2512 → d25x½" |
| `transition-fittings/tee-90-female-thread` | AQ130G | 2 | AQ130G2012 → d20x½" |
| `transition-fittings/union` | AQ330A | 3 | AQ330A32 → d32 |
| `transition-fittings/elbow-bracket-90-female-thread` | AQ090G | 3 | AQ090G2012 → d20x½" |
| `fittings/cross-over` | AQ287 | 1 | AQ28720 → d20 |
| `fittings/cross-over-pipe` | AQ285 | 2 | AQ28520 → d20 |

### 1.2 Produktfotos (34 Produkte)

Wie in `../AUFTRAG.md` §2.2, dort mit vollständiger Tabelle. Merkzeichen:
`P` am Ende ist Fotomarke, `6` vor `GP` der Sechskant-Messingeinsatz.
`AQ243GP` gehört zur Übergangsmuffe AG, **nicht** zur Reduzierbuchse.

### 1.3 Ohne jedes Bild (15 Produkte) → §4

Sechs Faser-/UV-Rohre der PP-R-Linie, `k-pipe-purple`, die
Metallverschraubungen `AQ542`/`AQ547`, die Gewinde-Anbohrsättel
`AQ270S`/`AQ243S`, beide Flachdichtungen, `plug`, `backing-flange`.

### 1.4 Nicht entschiedene Foto-IDs → §4

`AQ2431GP`/`AQ24316GP` · `AQ271GP`/`AQ2716GP` · `AQ730_750` — Gründe im
Auftrag §2.2. Ohne Katalogentsprechung: `AQ002P` · `AQ050GP` · `AQ050P` ·
`AQ051GP` · `AQ091GP` · `AQ286` · `AQ473G` · `AQ853` · zwei `AQVerteiler`.

---

## 2 · Mängel (belegt: Bild + Messung)

Schwere **A** falsche Gestalt / falscher Werkstoff / fehlendes Teil ·
**B** fehlendes Merkmal (Auswerfermarke, Trennnaht, Riffelung, Prägung) ·
**C** kosmetisch.

| Nr | Produkt | Beleg (Bild) | Messung | Schwere | Datei | Familie/Core? | Status |
|---|---|---|---|---|---|---|---|
| M1 | `fittings/reducing-bush` | — (Fund des Messwerks, kein Bild nötig) | `D`-Messung liest +0,11 … +0,41 mm, wachsend mit der Mutter-Nennweite. **Wurzel bewiesen** am Radiusprofil: die Sonde steht 0,6 mm hinter dem Zapfenende und trifft die Kehlrundung zum Körper — bei 63x20 liegt 1,2 mm daneben schon r = 31 (d63). Der Kragenzylinder selbst liest 16,98 ≈ 17,00: **die Form stimmt, die Station nicht.** LOOP-STATUS §3.28 | Messfehler | `products/reducing-bush/index.js` (Sondenstation) | nein | offen |
| M2 | `transition-fittings/union` | ALH `AQ330A32_3` (Rang 2) **und** Foto `AQ330A` (Rang 3), unabhängig einig | Mutter liegt im Modell bei x −26…−5 — am **Ende**, links von ihr kein Netzpunkt. Beide Bilder zeigen die Mutter in der **Mitte** mit geriffelten Stutzen auf BEIDEN Seiten | **A** (zweite Körperhälfte fehlt bzw. Anordnung falsch) | `products/union/` | fam `union-ppr` (nur dieses Produkt) | **behoben 25.08.** — dritte Deutung der Teilung (l1 = Gewindeteil links; alle sechs Zeilen gehen restlos auf, (L−l1)−Schweißtiefe ≈ konstant 4 mm), vier Teile, Zonen und Nuttiefen gemessen, Maßtest 6×0,00 |
| M3 | `transition-fittings/adaptor-socket-male-thread` | ALH `AQ243G2512_2` **und** Foto `AQ243GP`, unabhängig einig | Modell: Messing x −4,2…26,5 = **58 %** der Länge, freiliegender Messing-Sechskant (Spanne 8–15 % bei x −4…8). Bilder: Messing nur als Gewindezapfen ≈ 26–28 %, **kein freier Sechskant**, die Griffzone trägt der PP-Körper | **B** (Gestalt der Fuge PP/Messing; Bild darf sie bestimmen — die Tabelle bemaßt sie nicht) | `products/adaptor-socket-male-thread/parts.js` | **ja** — Vorlage der Gewindeteile; gleiches Muster wie §3.1 (Winkel AG) | offen |
| M4 | `transition-fittings/adaptor-socket-female-thread` | Foto `AQ270GP` (Riffelung) und ALH `AQ270G2512_3` (Sechskant-Ausführung) | PP-Griffzone fehlt im Modell ganz: Silhouetten-Spanne im Mittelband **1,6 %** = glatt-rund. Beide Bildquellen zeigen eine Griffstruktur (geriffelt bzw. sechskantig — das ist die Variantenachse §3.4, kein Widerspruch) | **B** | `products/adaptor-socket-female-thread/parts.js` | **ja** — gleiche Familie wie M3 | offen |
| M5 | `fittings/cross-over` | ALH `AQ28720_4` (einziger Seitenriss) | Lichte Öffnung unterm Scheitel: Bild **0,485·H**, Modell **0,407·H** (alle drei Größen 0,39–0,41); Scheitelrohrdicke im Bild ≈ **0,87×** Modell. Die Scheitelwand ist ASSUMPTION (d + 2·d/6). VORBEHALT: Einzelansicht, leichte Kameraneigung nicht ausschließbar. WÄCHTER für jede Behebung: die Massenprobe steht bei d20 schon auf **−7,5 %** — dünner machen allein verbietet sie | **C** (Proportion einer unbemaßten Annahme) | `products/_crossover/params.js` | **ja** — `_crossover` trägt beide Überbögen | offen |
| M6 | `fittings/cross-over-pipe` | ALH `AQ28520_2` (Parallellage **bewiesen**: Rohrdicke links = rechts = 91 px) | ASSUMPTION `tEnde = 0,27·L`: Bild zeigt Hügelbreite **30,5 %** der Länge ⇒ t ≈ 0,35·L (Modell: 46 % Hügel). Die Massenprobe ist gegen t unempfindlich (±3 % Bahnlänge) und lässt das Nachschärfen zu | **C** (ASSUMPTION bildseitig nachschärfbar) | `products/cross-over-pipe/data.js` (ANNAHME-Kommentar) + `_crossover` | ja | offen |
| M7 | `transition-fittings/tee-90-male-thread` | Foto `AQ133GP` (Rang 3) | Modellteil heißt „Messingzapfen R½" **mit Sechskant**"; das Foto zeigt **nur das Gewinde** frei — der Sechskant liegt unter dem glatten PP-Abzweig. Gleiches Muster wie M3 | **B** | `products/_teethread/parts.js` | **ja** — `_teethread` trägt beide Gewinde-T-Stücke | offen |
| M8 | `valves/pp-r-ball-valve-brass` | Foto `AQ850` (Rang 3) | Hebel im Foto **rot**, abgetastet `#df2e1f` (Median aus 3 779 Pixeln), mit sichtbarer Edelstahl-Sechskantschraube; Modell führt den Hebel als „Stahl" und hat keine Schraube | **B** (Werkstoff-/Farbdarstellung eines sichtbaren Teils) | `products/pp-r-ball-valve-brass/index.js` (+ ggf. `core/materials.js` neuer Schlüssel `leverRed`) | Material ggf. Core | offen |
| M9 | `valves/pp-r-ball-valve-ball-in-pp` | Foto `AQ852` (Rang 3) | Griff im Foto: kurzer schwarzer **Knebelgriff** mit grüner Einlage, etwa körperbreit; Modell trägt einen 88-mm-Hebel (Box 88 × 41 × 32). Die Doppel-Union-Bauart (nutL/nutR, Sechskant-Mittelkörper) deckt sich | **B** | `products/ball-valve-pp/parts.js` (buildLever) | fam `ball-valve` — prüfen, ob AQ850 den langen Hebel behält (Foto: ja) | offen |
| M10 | `weld-in-saddles/weld-in-saddle` (+ beide Gewindesättel) | Fotos `AQ130SP`, `AQ130GSP` (Rang 3) | Fotos zeigen **vier Griffrippenpaare** außen am Boss; Modell-Silhouette am Stutzenband: Spanne **0 %** = völlig rund. Grundform (kompakter Boss, Sattelfuß) deckt sich | **B** | `products/_saddle/parts.js` | **ja** — `_saddle`, drei Produkte | offen |
| M11 | `accessories/pipe-clamps` | Foto `AQ500` (Rang 3) | Modell führt eine **EPDM-Gummieinlage**, das Foto zeigt grüne Schalen-Innenflächen ohne Einlage (VORBEHALT: könnte demontiert fotografiert sein); die Wandanschluss-Buchse ist im Foto ein markanter **Sechskant-Stahlstutzen**, im Modell ein kleiner „Mutterblock"; Schrauben im Foto Kreuzschlitz mit U-Scheiben und schwarzen Vierkantmuttern in seitlichen Taschen | **B/C** | `products/pipe-clamps/parts.js` | nein | offen |
| M12 | `fittings/electrofusion-socket` | Foto `AQ271` (Rang 3) | Mantel trägt im Foto flache erhabene **Rechteckfelder** (Wickelfeld-Panels) und Segmentlinien; Modellmantel ist glatt. Die Kontaktdome decken sich (grüne PP-Kragen mit versenkter Hülse) | **C** | `products/electrofusion-socket/parts.js` | nein | offen |


## 2a · Befund an der Bildquelle selbst — dem Menschen vorlegen

**B1 — Der ALH-Ordnername belegt die GRÖSSE nicht.** Der Ordner
`AQ28520` (d20) enthält einen Seitenriss in **bewiesener Parallellage**
(Rohrdicke links = rechts auf das Pixel), dessen L/H = 5,30 exakt der
Katalogzeile **d32** entspricht (5,44; d20 wäre 6,89 — 30 % daneben).
Mindestens dieser Render ist ein größenunspezifisches Familienbild.
**Regel 3 aus `25-BILDQUELLEN.md` §1 ist damit eingeschränkt:** der
Ordnername benennt das Produkt sicher, die Größe nur unverbindlich —
Proportionsschlüsse aus Rendern brauchen ab jetzt die Gegenprobe über
alle Katalogzeilen (wie hier). Die sieben Deckungsbefunde aus §3a unten
bleiben gültig: sie wurden gegen die jeweils **besitzende** Zeile
geprüft und trafen auf 1–6 %.

**B2 — Render und Foto zeigen zwei Ausführungen.** Bei den
Gewindeteilen zeigt das Foto die runde geriffelte, der Render die
Sechskant-Ausführung (`AQ270GP`/`AQ2706GP`-Achse, §3.4 LOOP-STATUS).
Bei der PP-Verschraubung zeigen Render (Pfeilrippen) und Foto (glatte
Mulden) verschiedene Mutteroberflächen. Kein Bild gewinnt; für Mängel
zählt nur, worin BEIDE einig sind.

## 3a · Deckt sich (Etappe 2a, die 14 mit Render)

`cap` · `socket` · `elbow-45` · `elbow-90` · `tee` · `reducing-tee` ·
`reducing-bush` · `tee-90-female-thread` · `elbow-bracket-90-female-thread`
— Proportionen in den belastbaren Ansichten 1–6 % neben dem Modell,
Werkstoffzahl und Silhouetten decken sich. Der Anschlussbogen hat in
KEINER Quelle eine Lasche (der Name „bracket" stammt von der Website;
der Katalog sagt Anschlussbogen); die Render zeigen seine
Sechskant-Ausführung.

## 3 · Bereits bildgeprüft — nur Verweis

| Produkt | Nachweis |
|---|---|
| `fittings/socket` | `vergleichstest-rohre-muffe.md` (Farbe 2 % dunkler als Foto, Form deckungsgleich) |
| `fittings/cap` | `vergleichstest-rohre-muffe.md` + `kappe-vergleich.png` (drei behobene Formfehler) |
| `transition-fittings/elbow-90-male-thread` | `w6a-elbow-90-male-gestalt.md` |
| Rohre (`k-pipe`-Linie) | `rohre-und-muffe-pruefbericht.md` + `01-rohr.png`/`02-rohr.png` |

## 3b · Deckt sich (Etappe 2b, nur Foto)

`metal-union-male-thread-brass` (Messing-Sechskantmutter SW 54 im Modell
wie im Foto — die §4.2-Beschreibung „PP-Mutter mit Riffelung" gilt nur
für AQ542/547) · `metal-union-female-thread-brass` (analog) ·
`elbow-wall-bracket-90-female-thread` (Lasche 60 × 4,3 im Modell, im
Foto vorhanden) · `tee-90-female-thread-internal-valve` (Dom/Durchgang
≈ 1,25 wie im Modell) · `elbow-45-female-male` · `elbow-90-female-male`
· `fittings/cross` (Foto zeigt sogar die Formtrennnaht, die der Core
baut) · `k-pipe-pp-r-sdr-11` (genau EIN blauer Streifen, wie `data.js`)
· `electrofusion-socket`-Dome und Werkstoffzahl.

**Aufklärungen nebenbei:** `AQ130GSP`/`AQ1306GSP` zeigen den
**Gewinde-Anbohrsattel** (IG, rund bzw. sechskant) — der IG-Sattel hat
also doch ein Bild und verlässt die Ohne-Bild-Liste. Die Beschreibung
der E-Muffen-Kontakte in `20-VISUELLE-REFERENZ.md` §4.1 („orange oder
schwarz") widerspricht dem Foto `AQ271` (grüne PP-Kragen, Hülse
versenkt) — Doku-Korrektur, kein Modellmangel.

## 4 · Bild kann nicht entscheiden

**14 Produkte ohne jedes Bild** (der IG-Sattel ist per `AQ130GSP`
herausgelöst, siehe §3b): die sechs Faser-/UV-Rohre der PP-R-Linie
(`k-fiber-pp-r` SDR 6 · 7,4 · 9 · 11 · 17, `k-fiber-uv-pp-r`),
`k-pipe-purple`, die Metallverschraubungen mit PP-Mutter
(`AQ542`/`AQ547`), der AG-Anbohrsattel (`AQ243S` — nur die IG-Variante
hat ein Foto), beide Flachdichtungen, `plug`, `backing-flange`.
**Kein Bildbeweis möglich — geprüft bleibt der Maßtest.** Bei den
Faserrohren trägt das Katalogfoto S. 78–82 den Schichtaufbau; der
AG-Sattel erbt die belegten Merkmale des IG-Sattels bis auf den
Gewindeteil (ASSUMPTION, so vermerkt). Dazu die Foto-IDs aus §1.4.

## 5 · Verdacht ohne Messung

*(Ein Eindruck, den keine Messung stützt, ist kein Mangel und wandert
nicht in den Plan.)*

| Produkt | Verdacht | Warum keine Messung |
|---|---|---|
| `fittings/flange-adaptor` | Dichtwulst auf der Flanschfläche: §4.1-Beschreibung fordert ihn, Foto `AQ790P` zeigt die sichtbare Fläche flach, das Modell hat keinen | Nur eine Frontalansicht; welche Seite die Dichtfläche ist, gibt das Foto nicht her |
| `fittings/flange-adaptor` | Länge des Muffenkörpers hinter der Scheibe | Frontalperspektive verdeckt den Körper vollständig |
| `fittings/cap` u. a. | Prägungen (PP-R, Nennweite, Kavität) auf Stirnflächen, sichtbar in ALH-Rendern | Kanon fordert keine Prägungen; Nachbildung bräuchte lesbare Vorlagen je Größe |
| `fittings/cross-over` | Bogenform: Flanken im Render steiler als die vier gleichen `bridgePath`-Bögen | Einzelansicht mit Neigungsvorbehalt; Öffnungsmessung steht als M5, die Bahnform selbst bleibt Verdacht |
