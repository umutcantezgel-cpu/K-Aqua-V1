# Vergleichstest — Muffe und Rohre

Modell gegen Katalogbild, gerendert in derselben Kameraperspektive und
danebengelegt. Stand 17. August 2026.

Belegbilder: `muffe-vergleich.png`, `kappe-vergleich.png`.

---

## Warum dieser Test

Bei der Kappe hat er drei Fehler gefunden, die der Maßtest nicht sehen konnte:
eine Schulterlinie zur Kalotte, eine zu scharfe Mundlochkante, eine zu
zylindrische Silhouette. Maße können auf 0,18 mm stimmen, während die Form
falsch aussieht — die beiden Prüfungen messen Verschiedenes.

---

## Muffe (`fittings/socket`, d32)

Das Katalogbild ist ein **echtes Produktfoto**: sichtbare Formtrennnaht,
Werkzeugbeschriftung auf der Mantelfläche, weiche Lichtkanten.

### Grün — die Annahme ist bestätigt

`PPR_GREEN = #17A46B` stand seit dem Core-Refactor als offene Annahme im Code,
zu verifizieren „gegen ein Originalbauteil". Dieser Test ist die beste
Annäherung daran, die das Material zulässt: beide Bilder pixelweise abgetastet,
Mittelton der Grünflächen verglichen.

| | R | G | B | Hex | Helligkeit |
|---|---|---|---|---|---|
| Katalogfoto | 55 | 173 | 125 | `#37ad7d` | 144,4 |
| Modell | 57 | 169 | 119 | `#39a977` | 141,6 |
| Differenz | +2 | −4 | −6 | | **Faktor 0,980** |

**2 % Abweichung in der Helligkeit, maximal 6 von 255 pro Kanal.** Das liegt
innerhalb dessen, was Beleuchtung und JPEG-Kompression des Katalogbildes selbst
verursachen.

Bemerkenswert am Vorgehen: mein erster Eindruck beim Betrachten war „das Modell
ist zu hell". Die Messung sagt das Gegenteil — es ist 2 % **dunkler**. Ein
Farbvergleich per Auge über zwei verschieden beleuchtete Bilder ist nicht
belastbar; die Abtastung ist es.

**Konsequenz:** die Annahme zu `PPR_GREEN` gilt als bestätigt. Sie bleibt als
Kommentar im Code stehen, weil eine Messung gegen ein Katalogbild kein
Spektrometer am Bauteil ist — aber sie ist kein offener Punkt mehr.

### Form

Silhouette, Proportion, Mundlochöffnung und Bohrungsverlauf deckungsgleich. Der
Bund am Mundloch sitzt nach der Korrektur vom 16. August auf dem tabellierten
Durchmesser und ist in beiden Bildern an derselben Stelle sichtbar.

**Rest-Abweichung, nicht nachgeschärft:** das Foto zeigt auf der Mantelfläche
eine eingeprägte Werkzeugbeschriftung (Hersteller, Nennweite, Charge). Das
Modell hat sie nicht. Sie nachzubilden erfordert die Schriftzüge als Geometrie
oder Textur — dafür fehlt die Vorlage in lesbarer Auflösung, und geraten wäre
sie schlechter als weggelassen.

---

## Rohre — der Test greift hier nicht

Wichtiger Befund: die Katalogbilder der Rohre sind **keine Fotos, sondern
CG-Renders**. Ein glatter Zylinder mit einem Glanzband, gegen Weiß freigestellt.

Nachprüfbar am Bild selbst: keine Formtrennnaht, keine Beschriftung, kein
Kontaktschatten, perfekt gleichmäßige Mantelfläche.

Zwei Folgen:

**1 · Als Referenz für Form und Material ist es wertlos.** Es zeigt keine
Eigenschaft des realen Rohres, die mein Modell nicht auch hat — es zeigt
weniger.

**2 · Es widerspricht der technischen Zeichnung.** Das Bild des K-Fiber Rohres
PP-R SDR 7,4 zeigt einen **einfarbig grünen** Zylinder. Die Zeichnung derselben
Seite schreibt „green with 4 grey stripes" vor. Maßgeblich ist die Zeichnung;
das Render ist offenbar ein generischer Platzhalter, der für mehrere
Produktseiten dient.

Damit ist der Vergleichstest für die zwölf Rohre **nicht durchführbar** — nicht
weil er übersprungen wurde, sondern weil keine belastbare Referenz existiert.

**Was stattdessen prüfbar war und geprüft ist:**

| Prüfung | Ergebnis |
|---|---|
| Maßtest über alle 105 Artikelzeilen | 0,00 mm |
| Transkriptionsprobe `D − 2·S = Di` | 105/105, ein Ablesefehler gefunden |
| Summe der Lagendicken = Gesamtwandstärke | stimmt bei allen mehrschichtigen |
| Streifenfarbe gegen die Zeichnung | 12/12 wörtlich abgelesen — **8 waren falsch** |

Die letzte Zeile ist der eigentliche Ertrag dieses Durchlaufs. Siehe unten.

---

## Streifenfarben — acht von zwölf waren falsch

Ich hatte Farbe und Streifenzahl aus Produktname und Werkstoff **abgeleitet**
statt aus der Zeichnung gelesen, und das im Code als `colourRead: false`
markiert. Beim Nachlesen der zwölf Zeichnungsminiaturen:

| Produkt | Zeichnung, wörtlich | vorher im Modell |
|---|---|---|
| K-Rohr PP-R SDR 6 | green with 1 red stripe | ✅ stimmte |
| K-Rohr PP-R SDR 11 | green with 1 **blue** stripe | ❌ rot |
| K-Rohr Violett PP-R SDR 11 | green with 1 red stripe | ❌ ohne Streifen |
| K-Rohr PP-RCT SDR 7,4 | green with 1 red stripe | ✅ stimmte |
| K-Fiber PP-R SDR 7,4 | green with 4 **grey** stripes | ⚠ Farbe ja, Material `steel` |
| K-Fiber PP-RCT SDR 7,4 | green with 4 **red** stripes | ❌ grau |
| K-Fiber PP-R SDR 9 | green with 4 **blue** stripes | ❌ grau |
| K-Fiber PP-R SDR 11 | green with 4 **red** stripes | ❌ grau |
| K-Fiber PP-R SDR 17 | green with 4 **red** stripes | ❌ grau |
| K-FiberClima PP-RCT SDR 11 | green with 4 **blue** stripes | ❌ grau |
| K-Fiber UV PP-RCT SDR 7,4 | outside layer black, inside green | ✅ stimmte |
| K-Fiber UV PP-R SDR 7,4 | outside layer black, inside green | ✅ stimmte |

**Acht Korrekturen.** Alle zwölf Angaben stehen jetzt wörtlich in der jeweiligen
`data.js`, mit dem Vermerk, was vorher dort stand.

Dazu ein Materialfehler, der keine Farbfrage war: für den grauen Streifen hatte
ich `steel` benutzt — ein Metallmaterial mit `metalness: 0.85` für einen
coextrudierten Kunststoffstreifen. Im Schnitt sichtbar falsch. Der Core hat
jetzt `blueStripe` und `greyStripe` als PP-Rezepte; `blueStripe` fehlte in der
Registry ganz.

Die Streifenfarbe ist im K-Aqua-System ein **Datenträger**, keine Dekoration:
sie kodiert die Baureihe. Ein falscher Streifen ist deshalb dieselbe Art Fehler
wie ein falsches Maß.

### Ein Widerspruch in der Quelle, nicht auflösbar

Beim **K-Rohr Violett** nennt die Zeichnungsminiatur „PP-R, green with 1 red
stripe" — wörtlich dasselbe wie beim grünen SDR-11-Rohr, dazu dieselben Normen
und dieselbe Maßtabelle. Produktname, Titel und Slug sagen „Purple".

Die Miniatur ist offenbar eine nicht angepasste Vorlage. Entschieden für
Violett als Körperfarbe, weil Name und Titel spezifisch sind und eine violette
Kennfarbe im Rohrleitungsbau für Betriebs- und Regenwasser steht — eine
Kodierung, die ein Hersteller nicht ohne Grund in den Produktnamen schreibt.
Der rote Kennstreifen ist wie gezeichnet übernommen.

**Beim Hersteller zu klären.** Ist die Miniatur maßgeblich, genügt in `LAYERS`
ein Wechsel von `pprPurple` auf `pprGreen` — eine Zeile.

---

## Was offen bleibt

| Punkt | Warum nicht abgeschlossen |
|---|---|
| Vergleichstest Rohre | Keine belastbare Referenz — die Katalogbilder sind CG-Renders, die der eigenen Zeichnung widersprechen. Ein Foto eines realen Rohres würde ihn ermöglichen. |
| Werkzeugbeschriftung auf der Muffe | Vorlage nicht in lesbarer Auflösung vorhanden. |
| Körperfarbe des Violettrohrs | Widerspruch in der Quelle, siehe oben. |
| Schichtdicken der Faserrohre 30/40/30 % | Zeichnung nennt den Faserkern, aber keine Lagenmaße. Nur ein aufgeschnittenes Rohr klärt das. |
