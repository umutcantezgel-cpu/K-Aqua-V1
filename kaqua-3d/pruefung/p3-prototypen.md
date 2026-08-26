# Prüfbericht — die 18 Prototypen (S. 106 und 114–117)

**Gebaut am 25.08.2026 · Spur B · 53 bis 70 von 71**

Vier Ventilteile, vierzehn Werkzeuge. Alle tragen
`DATA_STATUS 'prototyp'` und in beiden Registries `status 'prototyp'` —
die Galerie zeigt dafür das Band „Maße vorläufig".

---

## 1 Was die Quellen hergeben — und was nicht

Die Textebene der fünf Seiten ist vollständig ausgelesen. Ergebnis:
**kein einziges Formmaß.** S. 106 führt G, einmal L = 30 und kg;
S. 114–117 nur Code, Nennweite, Pack. Die eingebetteten Katalogbilder
sind als Gestaltquelle extrahiert (pypdf, JP2→PNG, Kontaktbogen).

Daraus folgt die Prototypen-Disziplin: jede Zahl ist ASSUMPTION mit
Herleitung im data.js-Kopf; gemessen wird die Geometrie gegen die
dokumentierte Erwartung plus die wenigen echten Anker.

## 2 Die Anker

| Anker | Produkte | Ergebnis |
|---|---|---|
| **G-¾"-Normgewinde** (26,44) | die vier Ventilteile | Mehrstationen-Strahl +0,09 |
| **L = 30** (einziges Tabellenmaß der fünf Seiten) | Verlängerungsstück | 0,00 |
| **kg-Spalte** (Massenprobe, meshVolume × Dichte) | die vier Ventilteile | −17 · −10 · −6 · +20 % |
| **d der Tabelle** | Stopfen (d7/11), Dorn/Buchse-Reihen (10+9+5+2 Größen) | Bohrung d ± Spiel exakt, Reihen wachsen konsistent |
| **Schneidbereich** | Schere (Maul ≥ 40), Rollenschneider (Bügel ≥ 125) | erfüllt |

Die Waage hat dabei zweimal die GESTALT korrigiert: die Chromknäufe
sind hohl (massiv wog +86 %; Wand 2,8 mm kalibriert), und die
Batterie-Lehre aus Spur B galt fort.

## 3 Berichtigungen an der Visuellen Referenz

Der Reparaturstopfen ist nach dem Katalogbild ein **langer grüner
Kegelstab** — nicht der „Pilz mit Innensechskant", den §4.1 beschrieb.
Das Sattel-Schweißwerkzeug existiert (AQ985, neun Kombinationen) —
damit ist **LOOP-STATUS §3.24 geschlossen**; ebenso **§3.10**: die vier
Rohrschneider-Seiten zeigen jetzt ihre eigenen Modelle, die
Rohrschellen-Ersatzzuordnung in `route.ts` ist entfallen (die
Website-Schreibvarianten leiten auf die kanonischen Slugs um).

## 4 Instrumentenlehren dieses Laufs

1. Eine **konstante** Abweichung über 19 Zeilen (−0,73) benannte die
   Spitzenfase im Strahlweg.
2. Eine Box liest die **Nutrandsekante**, wenn die Rücken auf der
   anderen Achse liegen.
3. Ein Messband auf gerader Mantelstrecke ist **leer** — Profilpunkt
   setzen (der wievielte Fall dieser Regel, ist nicht mehr zu zählen).
4. `loft` will `{x, pts:[{a,r}]}` — der NaN-Wächter aus Welle 1 hat
   den falschen Aufruf SOFORT benannt statt still eine leere Ansicht
   zu zeigen. Genau dafür wurde er gebaut.

## 5 Ergebnis

Selbsttest **70/70** (siehe Sitzungsprotokoll), Seitenprüfstand 70/70,
`check-3d-coverage` grün, `tsc` grün. Zielbild erreicht: **71 Produkte
= 52 fertig + 18 prototyp + 1 blockiert** (AQ332, §3.25 — der Grund
steht dort, nicht hier).
