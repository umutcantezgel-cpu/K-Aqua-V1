# Prüfbericht — Übergangsmuffe mit Innengewinde (AQ270G)

**Gebaut am 24.08.2026 · Phase 2, erstes Produkt der Gruppe 2a · 41 von 71**

Quelle: Druckkatalog `KA-Katalog_GB_06-2025_NEU.pdf`, Seite 94, obere
Tabelle. Zwölf Größen, d20 × ½" bis d110 × 4".

---

## 1 Welche Quelle gilt — und welche nicht

Für dieses Produkt gibt es zwei Kandidaten, und sie widersprechen sich
nicht etwa: **sie beschreiben verschiedene Teile.**

Die Website-Aufnahme trägt den Titel „Adaptor socket (Female thread)",
zeigt aber:

| Befund | Was er bedeutet |
|---|---|
| **keine Gewindespalte** | bei einem Gewindefitting unmöglich |
| Codes `AQ271xx` statt `AQ270G` | anderer Artikelstamm |
| 14 Größen bis **d315** | das größte Gewinde des Katalogs ist 4" bei d110 |
| Spalten `d · D · L · h · L1` | Muffenschema, kein Übergangsschema |
| Foto ohne Messing | das Teil hat gar kein Metall |

Das ist die **Elektroschweißmuffe**. Die Welle-4-Festlegung „nur d20–d63,
`status:'prototyp'`" stützte sich auf diese Tabelle und ist damit
hinfällig — der Katalog bemaßt alle zwölf Größen vollständig, das Produkt
wird als `fertig` gebaut.

Nebenwirkung, vom Wächter gefunden: in `lib/3d/aliases.ts` stand eine
Ersatzzuordnung, die diese Seite auf die **AG**-Muffe zeigen ließ. Sie
verdeckte ab dem Augenblick ein echtes Modell und ist entfernt.
`scripts/check-3d-coverage.mjs` hat das gemeldet, bevor ich danach
gesucht hatte.

## 2 Ist die Tabelle richtig gelesen?

Die PDF-Textextraktion dieser Seite gibt Spalten, nicht Zeilen, und
vertauscht die Reihenfolge — dieselbe Falle wie auf S. 97. Gelesen wurde
deshalb am **gerenderten Seitenbild**. Drei unabhängige Gegenproben:

**a) Der Zwilling auf derselben Seite.** Unter der IG-Tabelle steht die
AG-Muffe (AQ243G), und die ist seit Phase 1 gebaut — damals aus einer
Website-Aufnahme. Katalog und gebautes Produkt stimmen in **allen zwölf
Zeilen und allen acht Spalten** überein, Wert für Wert. Beide Tabellen
wurden gleich gelesen; die eine bürgt für die andere.

**b) Der Artikelcode.** `AQ270G2034` verschlüsselt d20 und ¾". Über alle
zwölf Zeilen deckt sich der Code mit der `d`-Spalte **und** der
`Rp`-Spalte. Das ist eine dritte Quelle, unabhängig von den Zahlenspalten.

**c) D gegen die Gewindenorm.** `D` ist in allen zwölf Zeilen eine reine
Funktion der Gewindegröße (½"→35, ¾"→43, 1"→50 …), und in allen zwölf
Zeilen bleibt zwischen `D` und dem ISO-7-1-Gewindeaußendurchmesser eine
Wand von 7,0 bis 23,5 mm. Nie negativ, nie unplausibel klein.

## 3 Was NICHT gedeutet wurde

**Die Spalte `z`.** Geprüft und verworfen wurde die Deutung
*z = l − Gewindetiefe − Muffentiefe*. Mit den echten Muffentiefen aus der
Muffentabelle des Katalogs ergäbe sie bei d20 × ½" 13,5 mm gegen
tabellierte 11 und bei d63 × 2" 13,5 gegen 19. Eine Deutung, die über die
Zeilen nicht trägt, ist keine (Fall 28). Für die Geometrie wird `z` nicht
gebraucht; der Wert steht in `data.js`, wird aber weder modelliert noch
gemessen (Fall 29).

**`l = 165` bei d110 × 4".** Drei voneinander unabhängige Anzeichen
sprechen dagegen:

| Anzeichen | d20 … d90 | d110 |
|---|---|---|
| `l/d` | 2,05 → 1,02, monoton fallend | **1,50** |
| AG-Muffe gegen IG-Muffe | AG ist 12–51 mm länger | AG ist 4 mm **kürzer** |
| Steg zwischen Muffengrund und Ring | 7,5 → 23,5 mm, gleichmäßig | **85,5 mm** |

Der Katalog ist hier die einzige Quelle — die Website zeigt ein anderes
Produkt. Also **nicht geändert**: das Modell baut 165 und zeigt genau das,
was im Katalog steht. Wird die Zahl korrigiert, ist es eine Zahl.

## 4 Woher die Längenaufteilung kommt

Die Tabelle nennt `l`, aber nicht, wo Muffe, Steg und Messingring
anfangen. Alle drei Abschnitte kommen aus belegten Zahlen:

| Abschnitt | Wert | Herkunft |
|---|---|---|
| Schweißmuffe | `fusionDepth(d)` | Muffentabelle des Katalogs, `(l − z)/2` |
| Messingring | `threadEngage(Rp) + 1,5 mm` | AG-Tabelle S. 94, `l − z` |
| Steg | der Rest | ergibt sich |

`threadEngage` ist **nicht geschätzt**: bei der AG-Muffe ist `l − z` genau
der Teil, der im Gegenstück verschwindet, also die Einschraubtiefe. Über
alle zwölf AG-Zeilen hängt sie ausschließlich von der Gewindegröße ab,
nie von d. Gegenprobe gegen ISO 7-1 (nutzbare Gewindelänge L2): die
Katalogwerte liegen durchweg 0–4 mm darüber, mit der Größe wachsend —
genau der Betrag, den die Dichtfläche vor dem Gewinde zusätzlich braucht.
Zwei unabhängige Quellen, systematischer und erklärter Versatz (Fall 23).

Als ASSUMPTION bleibt: die IG-Muffe muss den Gegenzapfen so tief
aufnehmen, wie er einschraubt. Untere Schranke, scharf ausgenutzt.

## 5 Bauart

Am Katalogfoto S. 94 abgelesen und **anders als beim Zwilling**: der
Körper ist durchgehend grün, das Messing ein eingebetteter Ring, von dem
nur Stirnfläche und Gewinde frei liegen. Bei der AG-Muffe steht der
Messingzapfen mit Sechskant heraus.

PP-Überdeckung über dem Ring: 3,72 bis 8,38 mm in allen zwölf Größen. Der
Ring liegt überall im Grünen, wie das Foto zeigt.

## 6 Maßtest, alle zwölf Größen

```
Größe      l     D     D1     d     tiefe   kern    nenn
20x1/2   0,00  0,00  −0,01  +0,01   0,00   −0,13   +0,13
20x3/4   0,00  0,00  −0,01  +0,01   0,00   −0,14   +0,14
25x1/2   0,00  0,00  −0,01  +0,01   0,00   −0,13   +0,13
25x3/4   0,00  0,00  −0,01  +0,01   0,00   −0,14   +0,14
32x3/4   0,00  0,00  −0,01  +0,01   0,00   −0,14   +0,14
32x1     0,00  0,00   0,00  +0,01   0,00   −0,17   +0,18
40x1¼    0,00  0,00   0,00  +0,01   0,00   −0,17   +0,18
50x1½    0,00  0,00   0,00  +0,01   0,00   −0,18   +0,17
63x2     0,00  0,00   0,00  +0,01   0,00   −0,18   +0,17
75x2½    0,00  0,00   0,00  +0,01   0,00   −0,18   +0,17
90x3     0,00  0,00   0,00  +0,01   0,00   −0,18   +0,17
110x4    0,00  0,00   0,00  +0,01   0,00   −0,17   +0,18
```

Alle vier Tabellenmaße treffen. `d` liegt um 0,01 mm über Maß — das ist
das Fillet an der Nennebene.

**Gegenprobe (Fall 25):** `kern` und `nenn` tasten dieselbe Bohrung an
zwei um eine halbe Steigung versetzten Stellen an und MÜSSEN verschieden
ausfallen — sonst wäre das Gewinde eine glatte Bohrung. Sie tun es, in
allen zwölf Größen, mit dem richtigen Vorzeichen.

**Die ±0,18 mm am Gewinde sind keine Eigenschaft dieses Produkts.** Das
unabhängig gebaute T-Stück mit Innengewinde meldet dieselben Zahlen: ½"
−0,13/+0,13, ¾" −0,14/+0,14, 1" −0,17/+0,18. Gleiche Core-Funktion,
gleicher Betrag — das ist die bekannte Eigenschaft von `threadProfile`,
die den Selbsttest seit jeher bei 0,20 mm deckelt.

## 7 Der Umweg bei D1 — vier Anläufe

`D1` lässt sich nicht über eine Box3 messen: der Bund ist in zehn von
zwölf Zeilen größer und schlägt stattdessen an. Es braucht einen Strahl
auf den Facettenrücken des Muffenmantels. Das ging dreimal schief, und
die Fehlschläge sind der lehrreiche Teil.

| Anlauf | Ergebnis | Was er zeigte |
|---|---|---|
| Raster, 72 Strahlen | −0,02 (d20) bis −0,09 (d110) | Fehler wächst **linear mit r** — Handschrift eines Abtastfehlers, nicht eines Formfehlers |
| Raster, 720 Strahlen | bestätigt | zu teuer für 41 Module |
| genau auf die Nutkante | bis −3,52 | Fehlbetrag = **exakt die doppelte Nuttiefe** |
| genau auf die Rückenmitte | 8 Zeilen gut, 4 falsch | dieselbe Signatur |

Die Signatur war jedes Mal dieselbe und ich habe sie dreimal falsch
gelesen: **ein Maß, das um genau ein Bauteilmerkmal danebenliegt, misst
dieses Merkmal.** Der Strahl landete im Nutgrund.

Die Ursache lag nicht im Zielwinkel, sondern in der Winkelkonvention:
`revolve` legt bei Achse x `y = r·cos θ, z = r·sin θ` ab, der Strahl
rechnete `y = R·sin t, z = R·cos t`. Das spiegelt den Winkel und
verschiebt ihn um π/2. Ob das noch auf dem Rücken landet, hängt allein
davon ab, ob π/2 ein ganzes Vielfaches der Riffelteilung ist:

| Größe | Teilung | 90° / Teilung | Versatz | gemessen |
|---|---|---|---|---|
| 32×1" | 15,00° | 6,00 | 0 | −0,03 ✓ |
| 40×1¼" | 12,00° | 7,50 | ½ Teilung | −1,46 ✗ |
| 90×3" | 5,81° | 15,50 | ½ Teilung | −3,08 ✗ |
| 110×4" | 4,67° | 19,25 | ¼ Teilung | −2,25 ✗ |

Acht Zeilen sahen zufällig richtig aus. **Das ist die eigentliche
Gefahr: ein Fehler, der bei zwei Dritteln der Größen kein Symptom zeigt.**
Wäre das Produkt nur in einer Größe geprüft worden, wäre er
durchgerutscht (Fall 28).

Nach der Berichtigung blieb ein gleichmäßiger Rest von −0,01 bis −0,05,
wieder linear mit r. Das war **kein** Messfehler, sondern die 1°-Entform-
ungsschräge: der Mantel läuft vom Mundlochwulst leicht ein und erst am
Absatz wieder auf volles Maß. Eine Spritzgussmuffe ohne Schräge ließe
sich nicht entformen. Die Station liegt jetzt dort, wo `D1` gilt.

## 8 Vier Prüffragen

**Trägt die Deutung über alle Zeilen?** Ja für `d`, `Rp`, `D`, `D1`, `l`.
Nein für `z` — deshalb ungedeutet und ungemessen.

**Gibt die Gegenprobe einen anderen Wert?** Ja: `kern` und `nenn` liegen
in allen zwölf Größen auseinander, mit dem Vorzeichen der Gewindetiefe.

**Ist eine Messung auf sich selbst zurückgeworfen (Fall 12)?** Nein. Alle
fünf Sollwerte kommen aus der Katalogtabelle bzw. der Normtabelle, keiner
aus `params.js`.

**Wurde die Seite geöffnet (Fall 38)?** Ja. Schnittansicht bei d32 × 1"
geprüft: der Messingring sitzt versenkt, das Gewinde ist geschnitten
sichtbar, der Absatz D1 → D steht.

## 9 Ergebnis

`ok: true`, zwölf Größen, 45.804 bis 150.204 Dreiecke, größte Abweichung
0,18 mm. Selbsttest **41 von 41**, keine Auffälligkeiten.

Zwei offene Punkte gehen nach `LOOP-STATUS.md` §3: die ungedeutete
Spalte `z` und `l = 165` bei d110.
