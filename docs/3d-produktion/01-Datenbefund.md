# Datenbefund — Maßtabellen der 71 K-Aqua Produkte

Stand: 15. August 2026 · Grundlage: OCR-Durchlauf über alle 78 Screenshots (Fittings, Pipes, Tools, Transition Fittings, Valves, Accessories, Weld-in Saddles) plus visueller Abgleich gegen die 71 Markdown-Dateien in `docs Unterseiten/`.

---

## Kurzfassung

**Die Markdown-Produktdateien sind systematisch unvollständig.** Auf jeder K-Aqua Produktseite wird die Maßtabelle durch einen Seitenumbruch in zwei Blöcke geteilt. In die Markdowns ist offenbar nur der **erste Block** übernommen worden. Alles darunter fehlt — bei den Kernprodukten ist das ungefähr die Hälfte des Sortiments.

Zusätzlich sind bei beiden Kugelhähnen die Artikelnummern und teilweise die Spaltenzuordnung falsch (Befund aus der Vorsession, hier bestätigt).

**Konsequenz für die 3D-Produktion:** Kein Modell wird gebaut, bevor die Maßtabelle des jeweiligen Produkts direkt aus dem Screenshot gelesen wurde. Das ist als Pflichtschritt in den Produkt-Prompt eingebaut (`03-Prompt-Produkt.md`, Phase 1).

---

## Belegte Einzelfälle

Drei Produkte habe ich per Auge gegen den Original-Screenshot geprüft:

| Produkt | Markdown | Quelle | Fehlend |
|---|---|---|---|
| **Cap** (`fittings/cap.md`) | 7 Größen, d20–d75 | **14 Größen, d20–d315** | d90, d110, d125 + eigener SDR-11-Block d160–d315 |
| **Tee** (`fittings/tee.md`) | 7 Größen, d20–d75 | **14 Größen, d20–d315** | dito |
| **Socket** (`fittings/socket.md`) | 7 Größen, d20–d75 | **9 Größen, d20–d110** | d90, d110 |

Beim Tee kommt hinzu: die Quelle führt die Spalten `d · D · l · L · l1 · z · s · kg · Pack.` — die Markdown-Datei nur `d · L`. Für ein maßhaltiges 3D-Modell fehlen damit genau die Werte, die man braucht (`l` = Muffentiefe, `z` = Einbaulänge, `l1` = Abzweiglänge).

### Kugelhähne — Artikelnummern falsch

| | Markdown | Quelle |
|---|---|---|
| Ball in PP | AQ50020–AQ50063, Spalten d/L/H | **AQ85220–AQ85263**, Spalten d/D/L/z/H/A/L1 |
| Ball in Brass | AQ60020–AQ60090 | **AQ85020–AQ85090**, Spalten d/A/C/H/L/P |

Beim Messing-Hahn ist der Fehlermechanismus erkennbar: die Spalte `A` (Hebellänge, 67,5 mm) wurde als `L` (Baulänge) übernommen. Die Armatur ist tatsächlich 102 mm lang.

---

## OCR-Ergebnis und seine Grenzen

Ich habe alle 78 Screenshots mit Tesseract ausgelesen (PDFs bei 200 dpi gerendert und über die Seitenumbrüche hinweg zusammengesetzt, PNGs direkt). Ergebnis:

| | |
|---|---|
| Dateien verarbeitet | 78 / 78 |
| Produktseiten mit erkannter Tabelle | 50 |
| Erkannte Tabellenzeilen | 451 |
| Davon vollständig fehlerfrei geparst | 139 (30 %) |

**Was zuverlässig ist:** die Struktur. Welcher Screenshot zu welchem Produkt gehört, dass eine Tabelle existiert, dass sie mehr Zeilen hat als die Markdown-Datei. Diese Information steckt vollständig in `produkt-registry.json`.

**Was nicht zuverlässig ist:** die Zahlen und die Artikelnummern.

- Artikelnummern wie `AQ111P32` liest Tesseract als `AQII1P32`, `AQINP32`, `AQiIP4O`. Ein dichter alphanumerischer String ohne Wortkontext ist der Worst Case für OCR.
- Dezimalwerte kippen: `1.9` → `19`, `0.11` → `on`.
- Die Spaltenköpfe sind weiß auf blau und ließen sich auch invertiert nicht sauber lesen.
- Die Zeilenzahlen im Feld `sizes_source_ocr` sind **nach oben verfälscht** — Tabellenlinien werden als Zeilen mitgezählt. Beim Socket meldet OCR 14, tatsächlich sind es 9.

Deshalb steht in der Registry beides getrennt: `sizes_source_ocr` (maschinell, indikativ) und `sizes_source_verified` (per Auge, verbindlich — bisher 5 Produkte).

**Warum ich hier abgebrochen habe:** Weiteres OCR-Tuning hätte die Trefferquote vielleicht auf 50–60 % gehoben. Für Bestellnummern auf einer Herstellerseite ist auch das wertlos. Der Weg, der funktioniert, ist ein anderer: eine Tabelle **einzeln** aus dem Bild lesen gelingt zuverlässig — genau so ist die Kugelhahn-Tabelle in der Vorsession entstanden, fehlerfrei. Das skaliert nicht auf 78 Seiten am Stück, aber es passt perfekt in einen Ablauf, der ohnehin Produkt für Produkt vorgeht.

---

## Was daraus folgt

**1. Vor jedem Modell: Tabelle lesen.**
Phase 1 jedes Produkt-Prompts ist „öffne den Screenshot, transkribiere die vollständige Tabelle inklusive aller Blöcke unterhalb des Seitenumbruchs, lege sie als `data.js` ab". Kein Modell ohne diesen Schritt.

**2. Die Markdown-Dateien werden im selben Zug korrigiert.**
Wenn die Tabelle einmal sauber transkribiert ist, kostet es nichts, die zugehörige Markdown-Datei mitzuziehen. Nach 71 Produkten ist der Produktkatalog der Website nebenbei vollständig und korrekt. Das ist wahrscheinlich mehr wert als die 3D-Modelle selbst.

**3. Die Registry führt Buch.**
`data_status` pro Produkt: `pruefen` → `verifiziert`. Wer den Stand wissen will, schaut in eine Datei.

---

## Empfehlung, unabhängig vom 3D-Projekt

Auf den Produktseiten, die schon live sind oder live gehen sollen, stehen aktuell **unvollständige Sortimente und bei den Armaturen falsche Bestellnummern**. Ein Installateur, der d110 sucht, findet ihn nicht; wer AQ50032 bestellt, bestellt eine Nummer, die es nicht gibt.

Das lässt sich unabhängig vom 3D-Thema in einem Durchgang beheben — 71 Tabellen transkribieren ist Fleißarbeit, aber überschaubar, und der Ablauf steht mit dem Produkt-Prompt ohnehin bereit.
