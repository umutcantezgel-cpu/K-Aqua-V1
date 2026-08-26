# SPUR-A-PLAN — Behebung der Bildmängel M1–M12

Aus `pruefung/MAENGELREGISTER.md`, 25.08.2026. Nach Schwere geordnet,
Eingriffe in gemeinsame Dateien gebündelt. Je Posten gilt der
13-Schritte-Loop; zusätzlich: **der Maßtest über alle Größen muss nach
jeder Formänderung dieselben Zahlen liefern wie vorher** — ein Bild
schlägt nie ein Tabellenmaß. Dreieckszahlen dürfen sich ändern (die
Änderung ist gewollt), Katalogmaße nie.

| Posten | Mängel | Eingriff | Dateien | Produkte | Status |
|---|---|---|---|---|---|
| **P1** | M2 (A) | Verschraubung: Mutter in die Mitte, zweite Körperhälfte (geriffelter Stutzen) ergänzen; Explosion/Hotspots nachziehen | `products/union/parts.js`, `index.js`, `params.js` | 1 | **erledigt 25.08.** |
| **P2** | M3 · M4 · M7 (B) | Gewindefamilie: PP-Körper trägt die Griffzone (Riffelung, runde Grundausführung nach Foto), Messing sichtbar nur als Gewinde + Bundring. Messinglängen-Aufteilung als ASSUMPTION aus den Fotos (~72–74 % PP). Die Sechskant-Ausführung (`…6GP`-Fotos) bleibt die offene Variantenachse §3.4 — nicht gebaut, nicht geraten | `products/adaptor-socket-male-thread/parts.js`, `products/_teethread/parts.js` | 3 | **erledigt 25.08.** (M4 verworfen — Riffelung war vorhanden, das Prüfinstrument war nutenblind) |
| **P3** | M9 (B) | Kugelhahn PP: Knebelgriff nach Foto `AQ852` statt 88-mm-Hebel | `products/ball-valve-pp/parts.js` | 1 | **erledigt 25.08.** (Länge war tabellentreu — nur Einlage ergänzt) |
| **P4** | M8 (B) | Kugelhahn Messing: Hebel rot (`#df2e1f` abgetastet) + Befestigungsschraube | `products/pp-r-ball-valve-brass/` (toolRed existierte im Core) | 1 | **erledigt 25.08.** |
| **P5** | M10 (B) | Sättel: vier Griffrippenpaare am Boss nach Fotos | `products/_saddle/parts.js` | 3 | **erledigt 25.08.** |
| **P6** | M11 (B/C) | Rohrschelle: Gummieinlage entfernen (Foto zeigt grüne Innenflächen; einziger Beleg), Sechskant-Stahlbuchse statt Mutterblock | `products/pipe-clamps/parts.js` | 1 | **erledigt 25.08.** |
| **P7** | M12 (C) | E-Muffe: flache Wickelfeld-Panels auf dem Mantel | `products/electrofusion-socket/parts.js` | 1 | offen |
| **P8** | M6, M5 (C) | Überbögen: `tEnde` 0,27→0,35·L nach Bildmessung (Masse unempfindlich). M5 (Scheitel-OD) nur, wenn die Massenprobe es zulässt — sie steht bei d20 auf −7,5 %; sonst dokumentiert lassen | `products/cross-over-pipe/data.js`, `_crossover/params.js` | 2 | offen |
| **P9** | M1 (Messfehler) | Reduzierbuchse: D-Sonde von der Kehlrundung auf die Kragenmitte | `products/reducing-bush/index.js` | 1 | offen |
| **P10** | B1/B2, Doku | `25-BILDQUELLEN.md` §1 Regel 3 einschränken; `20-VISUELLE-REFERENZ.md` §4.1 E-Muffen-Kontakte, §4.2 Brass-Muttern, §4.3 Sattelgestalt berichtigen; LOOP-STATUS-Punkte | Doku | — | offen |

**Nicht in den Plan** (Verdacht ohne tragende Messung): Flanschadapter-
Wulst und -Körperlänge, Prägungen, Überbogen-Bahnform über M5 hinaus.
