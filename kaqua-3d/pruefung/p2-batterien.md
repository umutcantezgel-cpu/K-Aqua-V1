# Prüfbericht — Batterieanschlüsse IG, fest und verstellbar (AQ490G · AQ492G)

**Gebaut am 25.08.2026 · Spur B · 51 und 52 von 71**

Quelle: Druckkatalog S. 108 (Textebene ausgelesen), Produktfotos
`AQ490G`/`AQ492G`. Je zwei Größen (d20, d25), beide Rp ½".

---

## 1 Die Gegenprobe, die die Blockdicke festlegt

Beide Zeilen des festen Anschlusses tragen **L1 − L = 185 − 150 = 35**
— exakt das `D` der ½"-Gewindereihe (AQ270G/AQ243G: ½" → 35). Die
Endblöcke sind die bekannten ½"-Griffzonenkörper; ihre Dicke ist damit
**belegt, keine Annahme**. L = 150 ist das Standard-Armaturenmaß.

## 2 Was die Fotos beisteuern

**AQ490G:** ein EINTEILIGES H-Teil — zwei Winkelblöcke (Schweißmuffe
oben, Rp vorn), verbunden durch einen flachen Steg mit X-Fachwerk und
zwei Montagelöchern. **AQ492G:** zwei antiparallele Rohrschienen, auf
jeder ein Bock mit SECHSKANT-Griffzone (die Sechskant-Ausführung der
Gewindefamilie, hier fotografisch belegt), Muffen an den Außenenden,
Füße mit Löchern. Verstellung = Verschieben der Schienen.

## 3 Die Massenprobe als Schiedsrichterin

Messing (8,4 g/cm³) trägt hier fast die Hälfte des Gewichts — die
kg-Spalte ist scharf. Sie hat drei Annahmen **geschärft**:

* Ringlänge des festen Anschlusses: 0,62·Block wog +16/+20 % →
  **0,50·Block** (+5/+8 %).
* Schienenlänge des verstellbaren: „halbe Länge plus Reserve" wog
  −29 % → **durchlaufende Schienen** bis kurz vor die
  gegenüberliegende Muffe, wie das Foto sie zeigt (−5/+9 %).
* Schienenwand d/4 statt Druckrohr-d/6 (Führungsteil, dickwandige
  Enden im Foto).

## 4 Die Verstellung ist ein Zustand

Der verstellbare Anschluss nutzt als erstes Produkt nach dem Kugelhahn
die states-Mechanik: `setOpen(t)` fährt die Schlitten kontinuierlich
zwischen L = 150 (Tabellenstellung, in der gemessen wird) und L = 100.
Direkt geprüft: `setOpen(0)` → L liest 100, `setOpen(1)` → 150.

**L1 = 230 hat nur bei L = 150 einen Tabellenanker.** Beim
Zusammenschieben ragt die versetzte Schiene an der gegenüberliegenden
Muffe vorbei — die Gesamtlänge schrumpft NICHT voll mit dem
Verstellweg. Die erste Fassung nahm das an; der Maßtest der
100er-Stellung hat sie widerlegt.

## 5 Maßtest

Fest (je Größe): L1 0,00 · L 0,00 · Block 0,00 · Rp-Kern −0,13
(threadRing-Klasse) · Masse +0,01/+0,02 kg.
Verstellbar: L 0,00 · L1 0,00 · SW 0,00 · Ecke −0,13 (Eckenradius-
Rücknahme von hexPrism, dokumentierte Klasse) · Kern −0,13 · Masse
−0,01/+0,02 kg.

## 6 Drei Werkzeuglehren dieses Baus

1. `threadRing` kennt nur X und Y — bei allem anderen fällt `revolve`
   STILL auf Y zurück; der erste Ring stand quer im Block (kern las
   NaN). Um Y bauen, dann drehen.
2. `hexPrism`-Mantelflächen sind punktlose Quads — Schlüsselweite misst
   man per STRAHL, nicht per Punktabtastung (so kam erst 1,0 heraus).
3. Der Extrusions-bevel von `hexPrism` bläht den Querschnitt (+2·bevel
   auf beide Maße); die Doku sagt selbst: bevel = 0, wenn das Eckenmaß
   ein Katalogmaß ist.

## 7 Vier Prüffragen

**Misst alles?** Ja — L über die Ringmitten, Block als Netz-Identität,
Kern und SW am Netz bzw. per Strahl, Masse über den Satz von Gauß.
**Was sieht keine Messung?** Fachwerkmuster und Fußform — Sichtprüfung
auf den geöffneten Seiten gemacht, Screenshots im Verlauf.
**Gegenprobe mit anderem Wert?** SW 30,3 gegen Ecke 34,86 (Verhältnis
2/√3) und L gegen L1.
**Trägt die Deutung alle Zeilen?** Beide Tabellen je zwei Zeilen,
L1 − L konstant, Massenreihe getroffen.

## 8 Ergebnis

Beide `ok: true`. Selbsttest **52/52**, größte Abweichung 0,20 mm,
1.768.756 Dreiecke, keine Auffälligkeiten. Seitenprüfung: beide Seiten
geöffnet, `kaqua.ok`, Größenwechsel lebt, Teleskop fährt.
