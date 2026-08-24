# Prüfbericht — Winkel 90° AG, Gestalt des Gewindeschenkels

**Produkt** `transition-fittings/elbow-90-male-thread`
**Anlass** Spur A, erstes Produkt: die 34 fertigen Modelle gegen das neue
Bildmaterial aus `Marketing/` nachschärfen.
**Datum** 24.08.2026 · **Ergebnis** Modell geändert, Maßtest grün

---

## 1 · Der Vorwurf aus der Übergabe

Zwei Bilder sollten dem fertigen Modell widersprechen:

1. `AQ090G2012_1.jpg` zeigt einen **Sechskant**, das Modell hat keinen.
2. `AQ092GP …png` zeigt am Gewindeschenkel einen **breiten, flankierten
   Klotz**, deutlich weiter als der Muffenschenkel. Das Modell setzt das
   Gegenteil an und erzwingt es mit einer Ausnahme.

## 2 · Vorwurf 1 ist gegenstandslos — Codeverwechslung

Reihenfolge nach der Übergabe: **erst** die Code-Zuordnung, dann die Größe,
dann entscheiden.

`AQ090G` und `AQ092G` sind **nicht dieselbe Familie**:

| Code | Katalog | Produkt |
|---|---|---|
| `AQ090G` | S. 95 | Elbow bracket 90° (Female thread) — **Anschlussbogen IG** |
| `AQ092G` | S. 96 | Elbow 90° (Male thread) — **dieses Produkt** |

`AQ090G2012` zeigt also ein anderes Produkt. Dessen Sechskantkragen ist die
Schlüsselfläche eines **Innengewindes** und sagt über das Außengewindeteil
nichts.

Gegenprobe: In `Marketing/diverse Fotos alt/ALH Produktbilder/` gibt es **zu
`AQ092G` überhaupt keinen Ordner** — das Außengewindeteil hat keinen Render.
Alle vier `AQ090G…`-Ordner gehören zum Anschlussbogen.

Das Modell begründet die runde Ausführung bereits selbst
(`parts.js`: „KEIN SECHSKANT. Die Zeichnung führt keine Spalte SW…"), und der
Druckkatalog bestätigt das: S. 96 führt **keine Spalte SW**. **Ein Sechskant
wäre eine Verschlechterung gewesen.**

## 3 · Vorwurf 2 trifft zu

### 3.1 Bemaßt die Tabelle diesen Körper?

Nein. Katalog S. 96 führt `Code d R D l z L1 z1`, die Maßzeichnung die Marken
`d D z l R L z1`. **D liegt in beiden am Muffenschenkel** — die Zeichnung
setzt die Maßhilfslinien unten an das runde Rohrende.

Damit greift die Rangregel (`25-BILDQUELLEN.md` §1.2): *Ein Bild darf eine
Gestalt bestimmen, die keine Tabelle bemaßt.*

### 3.2 Taugt die Maßzeichnung als Gegenquelle? Nein.

Die Vektorzeichnung ist **schematisch, nicht maßstäblich**. Gegenprobe über
ein Maß, das die Tabelle nennt: In der Zeichnung ist `d/D = 0,54`; die
Tabelle fordert 0,69 (d20) bis 0,74 (d32). Die Zeichnung ordnet Buchstaben
Kanten zu, sie liefert **keine Proportionen** — dasselbe Bild wie bei der
Metallverschraubung, wo das schon dokumentiert war.

### 3.3 Größenbestimmung nach Fall 35 — **misslungen**, und das genügt

Beide Fotos sind Drei-Viertel-Ansichten mit Perspektive; die abgebildete
Tabellenzeile ließ sich **nicht sicher bestimmen**. Das wird hier ausdrücklich
festgehalten statt überspielt.

Es genügt trotzdem, weil das Ergebnis **nicht von der Zeile abhängt**. Maßstab
ist der Gewindeaußendurchmesser, den der Katalog je Zeile nennt (R = ½", ¾",
1" → 20,955 · 26,441 · 33,249 mm):

| Bild | Körper-Ø / Gewinde-Ø |
|---|---|
| `Produktbilder/grün (RAL 6024)/AQ092GP …png` (1254×1254) | 470 px / 290 px = **1,62** |
| Katalog S. 96, Produktfoto | 547 px / 308 px = **1,78** |
| | **ø 1,70 ± 0,08** |

Daraus der Körper in mm und gegen D:

| Zeile | Gewinde-Ø | Körper-Ø | D | Körper/D |
|---|---|---|---|---|
| d20×½" | 20,955 | 35,6 | 29 | **1,23** |
| d25×½" | 20,955 | 35,6 | 34 | **1,05** |
| d25×¾" | 26,441 | 45,0 | 34 | **1,31** |
| d32×1" | 33,249 | 56,5 | 43 | **1,30** |

**In jeder Zeile über D.** Welche Zeile die Fotos zeigen, ist damit für diese
Frage gleichgültig.

### 3.4 Die Regel dahinter

Löst man den gemessenen Durchmesser nach der Wand über dem Messingeinsatz
auf, ergibt sich in **allen vier Zeilen derselbe Beiwert**:

```
Wand = 0,32 · Gewinde-Ø     →  6,7 · 6,7 · 8,7 · 11,0 mm
```

Das ist kein Zufall, sondern die Ursache: Der Körper umschließt den
**Messingeinsatz** und wird von dessen Durchmesser bestimmt — nicht von `d`.
Die alte Formel `max(3; 0,11·d)` rechnete über `d` und lag deshalb falsch.

## 4 · Änderung

`products/elbow-90-male-thread/params.js`

| | vorher | nachher |
|---|---|---|
| `wallB` | `max(3, 0.11·d)` | `0.32 · threadOD` |
| Wächter | Ausnahme, wenn Schenkel > D | Ausnahme, wenn Restwand < 3 mm |
| `collarR` | `min(rLegB + 0.3, rOut)` | `rLegB + 0.3` |

Der Deckel auf `collarR` stammte aus derselben Fehlannahme: Er hätte den
Absatz **unter** den Schenkel gedrückt, den er umgibt.

**Nicht geändert, weil nicht bestimmbar:** Die Fotos zeigen den Körper
**facettiert**. Wie viele Flächen und über welche Länge, geben sie nicht her.
Modelliert ist der **Umkreis**, also das größte Maß. Offen in `LOOP-STATUS.md`.

## 5 · Maßtest, alle vier Größen

| Größe | D | Ø Schenkel B | Verhältnis | Restwand B | größte Abweichung |
|---|---|---|---|---|---|
| d20×½" | 29,00 | 35,57 | 1,227 | 6,71 | 0,15 (`gewinde`) |
| d25×½" | 34,00 | 35,57 | 1,046 | 6,71 | 0,15 (`gewinde`) |
| d25×¾" | 34,00 | 44,56 | 1,311 | 8,46 | 0,15 (`gewinde`) |
| d32×1" | 43,00 | 55,73 | 1,296 | 10,64 | 0,20 (`gewinde`, `gewindegrund`) |

`l`, `L1`, `z1`, `Überstand`, `D`, `D_quer`, `Muffenbohrung`, `Rohrbohrung`
und `Muffentiefe` treffen in **allen vier Größen auf 0,00–0,03 mm**.

Die 0,15/0,20 mm an `gewinde` und `gewindegrund` sind der bekannte
Scheitelausgleich am Gewindeprofil, über alle Größen konstant — der Wert, den
auch der Selbsttest als Maximum des ganzen Pakets ausweist.

**Gegenprobe nach Fall 25:** `D_schenkelB` und `D` tasten dasselbe Merkmal an
zwei Stellen ab und liefern **verschiedene** Werte (35,57 gegen 29,00 usw.).
Eine Prüfung, die überall dasselbe liefert, prüft nichts — diese tut es nicht.

## 6 · Die vier Prüffragen

1. **Misst die Messung?** `D_schenkelB` tastet mit `slab('y', …)` die
   Mantelfläche ab, es ist kein `P.`-Wert. Ausnahmen sind nur `restwand` und
   `restwandB` — Wandstärken, nach Fall 12 zulässig und so benannt.
2. **Welchen Fehler findet keine Messung?** Die **Facettierung**. Ein
   Umkreis-Radialstrahl trifft eine Facette und einen Zylinder gleich. Sie ist
   deshalb ausdrücklich als offen benannt, nicht als geprüft ausgegeben.
3. **Liefert die Gegenprobe einen anderen Wert?** Ja, siehe §5.
4. **Trägt die Tabelle die Deutung über alle Zeilen?** Ja — der Beiwert 0,32
   fällt in allen vier Zeilen gleich aus, und das Verhältnis Körper/D bleibt
   in allen vier über 1.

## 7 · Nach dem Bau

`kaqua.ok = true` · 4 Größen · Selbsttest **34/34 geladen, größte Abweichung
0,20 mm, keine Auffälligkeiten**, 956 348 Dreiecke.
Sichtprobe: der Körper am Gewindeschenkel steht sichtbar über dem
Muffenschenkel — wie auf beiden Fotos.

## 8 · Weiter offen

Das **Website**-Katalogfoto passt nach wie vor zu keiner Tabellenzeile
(freiliegendes Gewinde 47–80 % zu lang). Das ist ein Befund über das Foto,
nicht über die Tabelle; das Modell folgt der Tabelle und ist davon unberührt.
Herstellerauskunft wäre nötig.
