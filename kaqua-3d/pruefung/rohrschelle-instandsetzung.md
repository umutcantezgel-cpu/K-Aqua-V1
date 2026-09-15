# Prüfbericht — Rohrschelle AQ500 instand gesetzt

**01.09.2026 · `accessories/pipe-clamps` · Mängel M13–M19, Fälle 43–45**

Das Modell war im Viewer sichtbar defekt: Schrauben schwebten über der
Schelle, der Gewindestutzen hing darunter in der Luft, der Halbschnitt
löschte eine komplette Halbschale. Der Maßsatz meldete dabei über alle
neun Größen **0,00 mm**.

---

## 1 Der Befund — und warum keine Prüfung ihn fand

Sieben Fehler, alle am gebauten Netz gemessen (Beispielgröße d32,
rOut 20,8 · rShellIn 16,3):

| | Befund | Messung | Ursache |
|---|---|---|---|
| M13 | beide Schrauben am **oberen** Stoß, der untere leer | `bolts` y 13,59…28,51 | `const y = rMid + lugLen*0.12` konstant; die Schleife variierte die Z-Seite statt der Stoßseite |
| M14 | Schrauben **neben** den Laschen im Leeren | Schaft z 5,30…19,53 gegen Laschenpaar z −3,11…7,11 | `translate(0, y, side*(len + boltHeadH))` schob die ganze Schraube nach außen |
| M15 | Gewindestutzen **schwebt** 11,8 mm unter der Schale | Netz y −44,60…−32,60, Schale endet −20,80; die Funktion gab selbst `top = −21,40` zurück | `translate(0, top − h + bevel, 0)` auf einer Kontur, die nach `rotateX(π/2)` schon bei y ∈ [−h+bevel, +bevel] lag. Fehler konstant h − 2·bevel |
| M16 | Laschen **nicht spiegelbildlich** | z 3,11…7,11 gegen z −3,11…**+0,89** | `roundedPad` liefert 0…h, nicht −h/2…+h/2 |
| M17 | Laschen **6,4 mm im Rohrkanal** | Innenkante \|y\| 9,65 bei Rohrradius 16,0 | Steglänge ohne Bezug auf `rShellIn` |
| M18 | Halbschnitt löscht eine Halbschale | Teilungsebene = Schnittebene z = 0; alle Teile `cap: null` | Schalenbögen mit `off ∈ {0, 180}`, Stöße bei ±Y |
| M19 | Masse läuft davon | d20 −33 % · d32 −35 % · d63 +14 % · **d110 +107 %** | `shellWall = 0,14·d`, `width = 0,68·d` → Masse ~ d³ |

**Warum fünf grüne Prüfungen daneben lagen.** Vier von ihnen (`D`, `d`,
`breite`, `bohrung`) sind Größenmaße: sie fragen, wie groß ein Teil ist,
nie, wo es liegt. Die fünfte, `sym`, verglich `|min.z|` gegen `max.z` der
Schraubengruppe — zwei Schrauben, die vom selben Stoß nach
entgegengesetzten Seiten ins Leere zeigen, erfüllen das ebenso gut wie
zwei richtig sitzende.

Dazu ein Instrumentenfehler: die `d`-Sonde schoss nach +Z, wo keine
Lasche steht, und meldete 32,60 — richtig gemessen, an der falschen
Stelle. M17 lag außerhalb ihres Blickfelds.

Als **Fall 43** im Fehlerkatalog: ein Maßsatz aus lauter Größenmaßen
prüft ein Teil gegen sich selbst und kann nicht ausschließen, dass die
Baugruppe auseinanderfällt.

---

## 2 Die Stoßachse ist gedreht

M18 und M15 hatten dieselbe Wurzel. Die Schalenbögen laufen jetzt mit
`off ∈ {90, 270}` statt `{0, 180}`:

* die beiden Stöße liegen bei **±Z** — im Foto sitzen die Schrauben in
  seitlichen Taschen, genau so;
* der Gewindestutzen steht bei −Y auf dem **geschlossenen Rücken**, nicht
  mehr im unteren Stoß;
* die Clipping-Ebene z = 0 schneidet beide Schalen **durch die Wand**;
  der Stoß bei +Z fällt weg, der bei −Z bleibt ganz stehen. Das ist die
  übliche Halbschnittdarstellung.

Alle Achsenbezüge sind mitgezogen: `D` misst über Y, die Bohrungssonde
schießt nach +Y, die Schrauben laufen in Y durch ihr Laschenpaar.
Schnittflächen kommen aus `capFromProfile` (Schalen, beide Vorzeichen —
genau die zwei Flächen, die z = 0 hinterlässt) und `polygonCap`
(Stutzen, zwei Rechtecke links und rechts der Bohrung).

---

## 3 Die Gestalt nach dem Foto — der offene Rest von M11

M11 stand seit dem 25.08. auf „behoben", obwohl nur Gummieinlage und
Rückenrillen abgearbeitet waren. Die Verbindung ist jetzt nachgebaut,
nach `Marketing/Produktbilder/grün (RAL 6024)/AQ500 grauer
Hintergrund.png`:

| Teil | Werkstoff | Verfahren, kein CSG |
|---|---|---|
| zwei Halbschalen mit Rückenrillen und grünen Stegen | `pprGreen` | Teilrotationskörper + `flachteil` |
| vier flache Stahllaschen | `steel` | Rechteck mit Kreisloch in EINEM `THREE.Shape` |
| zwei Linsenkopfschrauben mit Kreuzschlitz und U-Scheibe | `steel` | Kopf und Schaft als `revolve` um Y; der Schlitz ist ein **kreuzförmiger Durchbruch in einer Deckscheibe** über dem massiven Kopf — ein Schlitz wäre ein Abzug, ein Loch braucht keinen |
| zwei schwarze Vierkantmuttern | `toolBlack` | quadratische Kontur mit Kreisloch |
| Sechskantstutzen | `steel` | Sechskant mit durchgehender Bohrung |

Beide Schrauben zeigen in dieselbe Richtung — im Foto liegen beide Köpfe
auf derselben Schale. Damit entfällt jede Seitenlogik: **eine** Geometrie,
zweimal gesetzt. Die Vorfassung baute je Seite eine eigene Drehung und
setzte trotzdem beide Schrauben auf denselben Stoß.

`materials` fordert nur noch, was verbaut ist (`epdm` entfällt);
`buildRubber()` ist gelöscht.

---

## 4 Die Waage hat die Gestalt korrigiert (M19)

Die Massenprobe zeigte, dass die alten Wandgesetze nicht skalieren. Der
metallische Anteil ist innerhalb einer Schraubenklasse nahezu konstant
und trägt bei d20 **66 von 71 g** — der Kunststoff darf deshalb nur flach
wachsen. Beide Gesetze sind jetzt affin und über alle neun Zeilen
gefittet:

    d20  −3 %   d25  +2 %   d32  −3 %   d40  −7 %   d50  +6 %
    d63  +8 %   d75 −13 %   d90  −3 %   d110 +6 %

Kein Vorzeichenlauf, größte Abweichung 13 % — dieselbe Güte wie bei den
Ventilteilen (−17 · −10 · −6 · +20 %). Der Rest ist die Tabelle selbst:
sie führt d20 und d25 mit demselben Gewicht und d40 und d50 ebenso.

Folge: der ausgewiesene Außendurchmesser ändert sich, bei d110 von
141,4 auf 127,8 mm. Zulässig — `D` steht in keiner Quelle, die kg-Spalte
schon.

Ein zweiter Fund derselben Probe: die Vierkantmutter maß 1173 statt
713 mm³, mehr als ihre eigene Außenkontur zulässt. `ExtrudeGeometry`
richtet Löcher nur aus, wenn es die Außenkontur umdreht — also nur bei
einer Kontur gegen den Uhrzeigersinn. Die Vorlage `roundedPad` läuft im
Uhrzeigersinn und hat nie ein Loch. **Fall 45.**

---

## 5 Der neue Maßsatz

Sechs Prüfungen sind dazugekommen; jede hätte einen der Fehler benannt.

| Schlüssel | misst | vorher | jetzt |
|---|---|---|---|
| `freie-bohrung` | kleinster Abstand ALLER Schalenpunkte von der Rohrachse | 10,14 (Soll 16,30) | 0,00 |
| `stege-spiegel` | Lagesymmetrie der Stege zur Teilungsebene | 2,22 | 0,00 |
| `stoss-besetzt` | Schraubenschwerpunkt je Vorzeichen von z; 999 bei leerem Stoß | leer | 0,00 |
| `schraubenfassung` | Überdeckung Schaft ↔ Laschenpaar | 0 (Soll 13,73) | 0,00 |
| `stutzen-sitzt` | Eintauchtiefe Stutzen in die Schale | −11,80 (Soll 1,20) | 0,00 |
| `masse` | `meshVolume` × Dichte gegen die kg-Spalte | bis +107 % | ≤ 13 % |

`sym` ist ersetzt — es prüfte Box-Ränder und war gegen M13 blind.

---

## 6 Ergebnis

* **Alle neun Größen × neun Lage- und Größenmaße: Abweichung 0,00 mm**,
  keine nicht-endlichen Werte.
* **Selbsttest im Browser: 70 Module, 0 Auffälligkeiten**, größte
  Abweichung im Katalog 0,27 mm (fremdes Produkt, unberührt).
  `accessories/pipe-clamps`: 9 Größen, d32, 37 984 Dreiecke, 6 Meshes,
  0,00 mm, OK.
* `sync-3d-registry --check` grün, `check-3d-coverage` 70/71 unverändert,
  `tsc --noEmit` grün.
* Sichtprüfung 3/4 · Front · Draufsicht · Halbschnitt an d32 und d110
  gegen das Herstellerfoto: keine schwebenden Teile, je eine Schraube
  pro Stoß, Stutzen auf dem Rücken, Halbschnitt zeigt Wandstärke mit
  Schnittfläche.
* Eingebauter Viewer auf `/de/produkte/accessories/pipe-clamps`:
  Modul lädt (200), Modell rendert, Konsole ohne Fehler.

## 7 Nebenbefund, NICHT behoben — gehört nicht zu diesem Teil

`app/[locale]/dev/3d-test/page.tsx` lädt den Selbsttest in einem iframe
über `/api/3d-view/test`. Die Seite importiert ihr Modul relativ
(`./lib/index.mjs`); unter dieser Adresse löst das auf
`/api/3d-view/lib/index.mjs` auf — **404**. Die QA-Seite steht deshalb
dauerhaft auf „läuft…" und hat noch nie ein Ergebnis gezeigt. Unter der
statischen Adresse `/kaqua-3d/lib-selbsttest.html` läuft derselbe Test
durch (so ist er hier ausgewertet). Ein Basis-Tag oder eine absolute
Adresse in `lib-selbsttest.html` würde es lösen — eigener Arbeitsschritt,
Entscheidung des Menschen.

---

# 8 Nachtrag 02.09.2026 — Begutachtung und optimierte Neumodellierung

Die Instandsetzung oben hatte das Modell **richtig** gemacht. Diese
Begutachtung prüft, ob es auch **gut** ist — gegen die Quellen und gegen den
Rest des Katalogs. Elf Punkte, Mängel M20–M30, Fälle 46–48.

## 8.1 Die Quelle lag ungenutzt im Repository

`public/images/produkte/pipe-clamps/studio.jpg` (900 × 900 px) ist dieselbe
Herstelleraufnahme wie das Marketing-PNG, nur brauchbar aufgelöst. Keine
Sichtung hatte sie angefasst. Sie widerlegt drei Angaben, die seit dem 25.08.
in Modell, `data.js` und Mängelregister standen:

| Angabe | bis 01.09. | nach `studio.jpg` |
|---|---|---|
| Rücken | zylindrisch | **ballig**, Scheitel in Bandmitte |
| Nuten | drei | **zwei**, drei Bänder |
| schwarze Mutter | Vierkant | **Sechskant** (drei Facetten im 9-fach-Ausschnitt) |

Dazu neu: Laschen mit **rundem Paddelende**, ein **sichtbar heraustretender
Gewindeüberstand**, **Fasen** an Bohrungskante und Schalenstirn.

Und eine Größenbestimmung: der Sechskantstutzen misst 95 px gegen 574 px
Ringbreite; sein Verhältnis AF/D trifft **d75–d90**, nicht d32. Die
Begründung des Faktors `zScrew` in `params.js` war damit gegen die falsche
Größe gerechnet (Fall 35) und ist berichtigt — der Faktor selbst bleibt, er
hält den Schraubenkopf frei über der Schalenaußenfläche.

## 8.2 Der Körper war offen (M26, Fall 46)

`revolve` verbindet aufeinanderfolgende Winkel zu Vierecken; die erste und
letzte Winkelstellung bleiben unverbunden. **136 offene Randkanten je Bogen,
272 in der Baugruppe.** Die Stege decken nur 62 % der Bandbreite — daneben
sah man in den Stößen in die Schale hinein, und der OBJ/GLB-Export lieferte
eine Hülle statt eines Körpers.

Warum keine der zehn Prüfungen es fand: die Stirnebenen gehen durch die
Rohrachse und damit durch den Ursprung. Für eine Fläche in einer Ebene durch
den Ursprung ist das Spatprodukt jedes Dreiecks null — sie trägt zum
Volumenintegral **exakt 0** bei. Die Massenprobe stimmte weiter, auf zwei
Stellen genau, während der Körper offen war.

Behoben über `stirnflaeche()` je Bogenende. `capFromProfile` im Core hat dazu
einen optionalen dritten Parameter `sign` bekommen (eine EINZELNE Seite statt
beider) — rein additiv, alle bestehenden Aufrufer bleiben unberührt. Die
Umlaufrichtung der Stirnfläche wird **gemessen**, nicht geraten: zeigt die
Flächennormale in den Bogen hinein, wird sie gedreht.

## 8.3 Das Netz war doppelt so teuer wie nötig (M27, Fall 47)

`curveSegments: 20` gilt für JEDE Kurve einer Shape, also auch für die vier
gerundeten Ecken jeder Platte, die niemand sieht. Dazu Fillets auf den
Stützstellen einer bereits glatten Kurve und ein Gewinde in
Sichtteil-Auflösung.

| Posten | vorher | nachher |
|---|---|---|
| eine Lasche | 2364 | 252 |
| beide Halbschalen | 16 560 | 11 012 |
| Gewinde beider Schrauben | 13 900 | rund 2 700 |
| **Gesamt d32** | **37 984** | **22 340** |

Das Teil war das teuerste Zubehörteil des Katalogs (`socket` 20 016, `cap`
12 912) und liegt jetzt dazwischen — bei mehr Detail. Der Katalog wiegt
2 024 718 statt 2 040 150 Dreiecke.

## 8.4 Sieben Teile statt sechs (M28)

Die beiden Halbschalen waren EIN Teil; die Explosionsansicht konnte nicht
zeigen, dass die Schelle sich öffnet — obwohl das ihr Zweck ist. Jetzt
`schaleOben` und `schaleUnten` mit eigenen Schnittflächen und gegenläufigen
Wegen. Gemessen bei Explosion 1: Schalen ±17,1 · Laschen ±19,5 · Schrauben
+26,7 · Muttern −25,3 · Stutzen −68,7.

## 8.5 Zwei Messstationen lagen zwischen den Stützstellen (M29)

Der Scheitel der Wölbung fiel bei ungerader Bandunterteilung zwischen zwei
Punkte (D −0,01), und die Bohrungssonde traf eine Sehne statt der Bogenmitte
(d −0,02). Beide Unterteilungen sind jetzt auf gerade Zahlen gezwungen; die
Messstation ist damit immer eine Stützstelle.

## 8.6 Eine Prüfung, die log (Fall 48)

Die erste Randkantenzählung baute ihren Punktschlüssel aus `toFixed(3)` und
meldete bei d50 24 offene Kanten, bei den anderen acht Größen null.
Nachgerechnet: Stirnfläche und Bogenrand kamen beide auf z = −25,2515…, über
verschiedene Rechenwege, und genau dort verlief eine Rundungsgrenze.

Die Geometrie war dicht, die Prüfung nicht. Verlockend war eine Toleranz —
aber ein fester Raster hat diese Grenze immer, nur an anderer Koordinate.
Jetzt wird über den ABSTAND verschweißt: Raster 0,1 µm plus Suche über die 26
Nachbarzellen, vier Zehnerpotenzen unter der kleinsten echten Kante
(Nutwand 0,35 mm) und zehn über dem Gleitkommarauschen.

**Gegenprobe** (Fall 25): ein künstlich eingebrachtes Loch hebt die Zahl auf
20 und die Rücknahme wieder auf 0 — an d40, d50 und d110 geprüft. Die
Zählung sagt also nicht überall dasselbe.

## 8.7 Masse nachgefittet (M19 fortgeschrieben)

Der ballige Rücken und die zwei statt drei Nuten haben Volumen verschoben.
Nachfit über alle neun Zeilen:

    d20 −1 % · d25 +4 % · d32 −2 % · d40 −6 % · d50 +6 %
    d63 +8 % · d75 −14 % · d90 −4 % · d110 +4 %

d75 trägt dauerhaft den größten Rest: dort springt die Tabelle um 54 % bei
nur 19 % Umfangszuwachs.

## 8.8 Ergebnis

* **Elf Maße × neun Größen: 0,00 mm.** `dicht` = 0 überall, mit Gegenprobe.
* **Selbsttest 70/70**, keine Auffälligkeit, größte Abweichung im Katalog
  0,27 mm (fremdes Produkt, unberührt).
* **OBJ-Exportprobe:** die beiden Halbschalen kommen mit 11 012 Dreiecken und
  **0 offenen Randkanten** an — ein geschlossener Körper.
* `sync-3d-registry --check` grün, `check-3d-coverage` 70/71 unverändert,
  `tsc --noEmit` grün.
* Sichtprüfung 3/4, Front, Draufsicht, Halbschnitt und Explosion an d32 und
  d110 gegen `studio.jpg`.

## 8.9 Nebenbefund, NICHT behoben — M30

`exportOBJ` in `core/export.js` nimmt die unsichtbaren Schnittflächen mit.
Die Materialliste filtert `!o.visible`, der Aufruf
`new OBJExporter().parse(root)` tut es nicht — OBJExporter kennt keine
Sichtbarkeitsoption. Der GLB-Weg ist sauber (`onlyVisible: true`).

Gemessen an der Rohrschelle: 11 012 Dreiecke und 0 offene Kanten ohne die
Caps, 11 118 und 110 mit ihnen. Jeder exportierte OBJ des Katalogs trägt
damit Flächen, die im Viewer verborgen sind.

Betrifft alle 70 Produkte und ist ein Eingriff in gemeinsamen Code —
außerhalb dieser Arbeit, als eigener Schritt vorgemerkt.
