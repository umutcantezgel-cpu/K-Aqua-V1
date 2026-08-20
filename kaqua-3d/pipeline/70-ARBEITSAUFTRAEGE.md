# 70 — ARBEITSAUFTRÄGE

Alle 50 offenen Produkte, in Baureihenfolge. Jeder Eintrag nennt: Screenshot,
Vorlage, Familie, erwartete Schwierigkeit und die Paarung.

`IG` = Innengewinde · `AG` = Außengewinde

---

## Reihenfolge — warum diese

**Nicht** nach Registry-Nummer. Sortiert nach Risiko: was auf Bewährtem
aufbaut, kommt zuerst; was neue Geometrie braucht, später. So sind die
Familienmodule erprobt, bevor die schwierigen Teile kommen.

| Welle | Produkte | Neue Geometrie? |
|---|---|---|
| 1 | 6 einfache Rotationskörper | nein |
| 2 | 4 Reduzier- und Bundteile | nein |
| 3 | 4 Winkel/Bögen | nein (`_bend` erprobt) |
| 4 | 8 Gewindeteile | nein (Adaptor erprobt) |
| 5 | 4 Verschraubungen | dreiteilig, Explosion |
| 6 | 5 Abzweige und Sättel | `branchJoin` schräg |
| 7 | 5 Armaturen | Kinematik |
| 8 | 14 Werkzeuge | **ja — eigene Formensprache** |

---

## Welle 1 — Einfache Rotationskörper (6)

Alle nach dem Muster von `products/socket/` oder `products/cap/`. Kein neues
Werkzeug. Ideal zum Einarbeiten.

### 1.1 `accessories/plug` — Stopfen
- **Screenshot:** `Accessories K-Aqua/…-accessories-plug-…png`
- **Vorlage:** `products/reducing-bush/parts.js` (Zapfen + Bund)
- **Größen:** 1 (nur `AQ98P57`)
- **Aussehen:** `20-VISUELLE-REFERENZ §4.1`. Zapfen mit Bund, Stirnseite
  geschlossen und leicht gewölbt, Griffrippen am Bund.
- **Achtung:** nur eine Größe — die Größenleiste verschwindet dann. Das ist
  richtig, der Core macht das selbst.

### 1.2 `accessories/flat-gasket` — Flachdichtung
- **Screenshot:** `Accessories K-Aqua/…-flat-gasket-…png`
- **Größen:** 10
- **Material:** `epdm`
- **Aussehen:** flacher Ring, 2–3 mm dick, **Kanten nicht verrundet** — es ist
  ein Stanzteil. Nur eine minimale Fase von 0,2 mm gegen Aliasing.
- **Einfachstes Teil des Katalogs.** Vier Konturpunkte.

### 1.3 `accessories/flat-gasket-for-unions` — Flachdichtung für Verschraubungen
- **Screenshot:** `Accessories K-Aqua/…-flat-gasket-for-unions-…png`
- **Größen:** 3
- Wie 1.2, andere Maße. **Paar mit 1.2.**

### 1.4 `valves/elongation-pieces` — Verlängerungsstück
- **Screenshot:** `Valves K-Aqua/…-elongation-pieces-…png`
- **Vorlage:** `products/socket/parts.js`
- **Größen:** 1
- **Aussehen:** Muffe an einem Ende, Zapfen am anderen. **Asymmetrisch** —
  `mirrorProfile` ist hier falsch.

### 1.5 `tools/repairing-plug` — Reparaturstopfen
- **Screenshot:** `Tools K-Aqua/` (suchen: `repairing-plug`)
- **Größen:** 2
- **Aussehen:** `20-VISUELLE-REFERENZ §4.1`. Pilzform: konischer Schaft (~6°),
  flacher Kopf, Innensechskant oder Schlitz im Kopf.

### 1.6 `fittings/electrofusion-socket` — Elektroschweißmuffe
- **Screenshot:** `Fittings K-Aqua/…-electrofusion-socket-…pdf`
- **Vorlage:** `products/socket/parts.js`
- **Größen:** 7
- **Aussehen:** Muffe mit **zwei Kontaktstiften** senkrecht auf der
  Mantelfläche (Ø ~4 mm, 10–14 mm hoch, achsparallel nebeneinander, mittig).
  Mantelfläche **glatt**, nicht geriffelt.
- **Zusatz:** Heizdraht als Wendel im Schnitt sichtbar. Ein `revolve` mit
  Spiralkontur, sehr dünn (0,8 mm), Material `brass`.
- **Materialien:** `pprGreen`, `brass`, `anthracite` (Kontakthülsen)

---

## Welle 2 — Reduzier- und Bundteile (4)

### 2.1 `fittings/reducing-tee` — Reduzier-T-Stück
- **Screenshot:** `Fittings K-Aqua/…-reducing-tee-2026-…pdf`
- **Vorlage:** `products/_tee/` + `products/reducing-bush/` (zwei Nennweiten)
- **Größen:** 10, `sizeKey` nötig (Paar `d`/`d1`)
- **Spalten:** `d · d1 · d2 · D · l · z · l1 · D1 · z1` — `d2` ist immer `= d`
- **Deutung:** `d` Durchgang, `d1` Abzweig (reduziert), `l` Achse Abzweig bis
  Stirnfläche Durchgang, `l1` Abzweiglänge, `D1` Außen-Ø Abzweig
- **Achtung:** Die Tabelle führt **kein** `L`. Gesamtlänge = 2·`l`. Als
  `ASSUMPTION` markieren.

### 2.2 `fittings/reducing-tee-large` — Reduzier-T-Stück große Größen
- **Screenshot:** `Fittings K-Aqua/…-reducing-tee-2-2026-…pdf`
- Wie 2.1. **Paar mit 2.1.**

### 2.3 `fittings/flange-adaptor` — Bundbuchse
- **Screenshot:** `Fittings K-Aqua/…-flange-adaptor-…pdf`
- **Größen:** 7
- **Aussehen:** `20-VISUELLE-REFERENZ §4.1`. Muffenstück, dessen Ende in eine
  breite flache Scheibe übergeht (Ø ~2·d, Dicke ~0,25·d). Auf der Dichtfläche
  ein umlaufender **Wulst** (~1,5 mm). **Keine Schraubenlöcher.**

### 2.4 `accessories/backing-flange` — Losflansch
- **Screenshot:** `Accessories K-Aqua/…-backing-flange-…png`
- **Größen:** 11
- **Aussehen:** Scheibe mit **Schraubenlöchern auf einem Lochkreis** (4–8,
  gleichmäßig). Zentrale Bohrung, Innenabsatz für den Flanschbund.
- **Neu:** Lochkreis. Kein CSG — die Löcher entstehen als eigene
  Rotationskörper mit umgekehrter Normale, oder über `roundedPad` mit Loch.
  **Lies `60-GEOMETRIE-HANDBUCH §Lochkreis`.**
- **Material:** `steel` (PP-Stahl-Variante) oder `pprGreen`
- **Paar mit 2.3** — sie gehören konstruktiv zusammen.

---

## Welle 3 — Winkel und Bögen (4)

`products/_bend/` ist erprobt. `bendPath` trägt beide Winkel.

### 3.1 `fittings/elbow-45-female-male` — Winkel 45° Muffe/Spitzende
- **Screenshot:** `Fittings K-Aqua/…-elbow-45-femalemale-…pdf`
- **Vorlage:** `products/_bend/`
- **Größen:** 2
- **Unterschied zum fertigen Winkel:** ein Ende ist eine Muffe, das andere ein
  **Spitzende** (Zapfen). Der veränderliche Querschnitt in `sweepPath` muss
  das tragen — an einem Ende Muffenbohrung, am anderen Rohraußenmaß.

### 3.2 `fittings/elbow-90-female-male` — Winkel 90° Muffe/Spitzende
- Wie 3.1. **Paar mit 3.1** — Fehlerkatalog Fall 10.

### 3.3 `fittings/cross-over` — Überbogen
- **Screenshot:** `Fittings K-Aqua/…-cross-over-2026-…pdf`
- **Größen:** 3
- **Aussehen:** `20-VISUELLE-REFERENZ §4.3`. U-förmig: zwei 90°-Bögen und ein
  gerades Stück. Beide Enden auf derselben Achse, gleiche Richtung.
- **Bahn:** zwei `bendPath` hintereinander, oder eine eigene Punktfolge.

### 3.4 `fittings/cross-over-pipe` — Überbogen mit Rohr
- Wie 3.3, längeres Mittelstück. **Paar mit 3.3.**

---

## Welle 4 — Gewindeteile (8)

`products/adaptor-socket-male-thread/` ist erprobt: `threadProfile`,
`hexPrism`, `knurl` tragen. **Lies dessen `parts.js` und Fehlerkatalog Fall 11
vor dem Start.**

### 4.1 `transition-fittings/adaptor-socket-female-thread` — Übergangsmuffe IG
- **Screenshot:** `Transition Fittings K-Aqua/…-adaptor-socket-female-thread-…png`
- **Größen:** 12
- ⚠ **BLOCKIERT.** Die Spalten `d · D · L · h · L1` sind ohne Zeichnung nicht
  deutbar: bei d20 steht `L = 70`, `h = 52`, bei einer Muffenlänge von 34.
  Die Zeichnungsminiatur war nicht auffindbar.
- **Zuerst tun:** Zeichnung in lesbarer Auflösung suchen. Zuschnittfenster
  systematisch durchgehen (y 1600…2800 in 200-px-Schritten). Wenn nicht
  auffindbar: **melden.**
- **Aussehen wenn geklärt:** `20-VISUELLE-REFERENZ §4.2`

### 4.2 `transition-fittings/elbow-90-male-thread` — Winkel 90° AG
- **Screenshot:** `Transition Fittings K-Aqua/…-elbow-90-male-thread-…png`
- **Vorlage:** `_bend/` + Gewindeadaptor
- **Größen:** 4

### 4.3 `transition-fittings/tee-90-female-thread` — T-Stück 90° IG
- **Screenshot:** `…-tee-90-female-thread-…png`
- **Vorlage:** `_tee/` + Gewindeadaptor
- **Größen:** 4
- **Aussehen:** Gewinde sitzt im **Abzweig**, Durchgang bleibt PP-Muffe.

### 4.4 `transition-fittings/tee-90-male-thread` — T-Stück 90° AG
- **Paar mit 4.3.**

### 4.5 `transition-fittings/elbow-bracket-90-female-thread` — Anschlussbogen
- **Screenshot:** `…-elbow-bracket-90-female-thread-…png`
- **Größen:** 5
- **Aussehen:** Gewindewinkel mit **flacher rechteckiger Lasche** am Rücken,
  zwei Schraubenlöcher, ~3–4 mm dick, **in der Ebene** des Winkels.
- **Neu:** Lasche über `roundedPad`, Löcher wie bei 2.4.

### 4.6 `transition-fittings/elbow-wall-bracket-90-female-thread` — Wandscheibe
- **Größen:** 4
- Wie 4.5, aber die Lasche steht **senkrecht** ab. **Paar mit 4.5.**

### 4.7 `valves/tee-90-female-thread-internal-valve` — T-Stück für Einbauventil
- **Screenshot:** `Valves K-Aqua/…-tee-90-female-thread-for-internal-valve-…png`
- **Größen:** 4
- Wie 4.3, mit Ventilsitz im Abzweig.

### 4.8 `transition-fittings/union-for-watermeters` — Wasserzähler-Verschraubung
- **Screenshot:** `…-union-for-watermeters-…png`
- **Größen:** 3

---

## Welle 5 — Verschraubungen (4 + 2)

**Dreiteilig** — das ist neu. Die Explosionsansicht muss alle Teile getrennt
zeigen. Vorlage für das Prinzip: `products/ball-valve-pp/index.js` (12 Teile).

### 5.1–5.4 `transition-fittings/metal-union-*`
- **Screenshots:** `Transition Fittings K-Aqua/…-metal-union-…png` (vier Stück)
- **Größen:** je 5
- **Aussehen:** `20-VISUELLE-REFERENZ §4.2`. PP-R-Zapfenstück +
  PP-R-Überwurfmutter mit **tiefer Riffelung** (12 Riffel, ~1,5 mm) +
  Messing-Gewindeteil + Flachdichtung.
- **Materialien:** `pprGreen`, `brass` (bzw. gelbes Messing bei `-brass`), `epdm`
- **Alle vier zusammen bauen** — zwei Gewinderichtungen × zwei Werkstoffe.
- **Mutter:** `knurl()` mit `count: 12`, `depth: 1.45`. Der Kugelhahn hat
  dieselbe Mutter — `products/ball-valve-pp/parts.js`, `buildNut`.

### 5.5 `transition-fittings/union` — Verschraubung PP-R
- **Größen:** 6
- Wie 5.1, aber **ohne** Messingteil: rein PP-R.

### 5.6 `accessories/pipe-clamps` — Rohrschelle
- **Screenshot:** `Accessories K-Aqua/…-pipe-clamps-…png`
- **Größen:** 12
- **Aussehen:** `20-VISUELLE-REFERENZ §4.1`. Zweiteilig: Halbring mit
  Fußplatte, Halbring als Deckel, Schraube. Gewindeloch M8/M10 im Fuß.
- **Nicht rotationssymmetrisch** — `roundedPad` und `loft`.

---

## Welle 6 — Abzweige und Sättel (3)

`branchJoin` ist erprobt, aber nur bei 90°. Hier kommt die **gekrümmte
Auflagefläche** hinzu.

### 6.1 `weld-in-saddles/weld-in-saddle` — Einschweißsattel
- **Screenshot:** `weld-in-saddles K-Aqua/…-weld-in-saddle-…pdf`
- **Größen:** 8, zwei Nennweiten (Trägerrohr × Abzweig) → `sizeKey`
- **Aussehen:** `20-VISUELLE-REFERENZ §4.3`. Gekrümmte ovale Platte
  (~2·d lang, 1,5·d breit, 4–6 mm dick), Unterseite **zylindrisch hohl** mit
  dem Radius des Trägerrohres, darauf senkrechter Abzweigstutzen mit großer
  Kehle.
- **Neu:** die zylindrisch gekrümmte Auflagefläche. Über `sweepPath` mit
  ovaler Kontur entlang eines Kreisbogens, oder `loft` über Querschnitte.

### 6.2 `weld-in-saddles/weld-in-saddle-female-thread` — Sattel IG
### 6.3 `weld-in-saddles/weld-in-saddle-male-thread` — Sattel AG
- **Alle drei zusammen bauen.**

---

## Welle 7 — Armaturen (5)

### 7.1 `valves/pp-r-ball-valve-brass` — Kugelhahn mit Messingkugel
- **Screenshot:** `Valves K-Aqua/…-ball-valve-ball-in-brass-chromium-plated-…png`
- **Größen:** 8
- **Der einfachste Auftrag der Welle:** `products/ball-valve-pp/` kopieren,
  Materialzuordnung der Kugel von `pprGreenB` auf `chrome` ändern, Maßtabelle
  aus dem Screenshot ersetzen.
- **Achtung:** eigene Artikelreihe `AQ600xx` und **8 Größen** statt 6.

### 7.2 `valves/straight-seat-valve-green-handle` — Durchgangsventil
- **Größen:** 1
- **Aussehen:** `20-VISUELLE-REFERENZ §4.4`. **Handrad** statt Hebel, grün,
  6–8 Speichen oder Vollscheibe mit Griffrippen.
- **Kinematik anders als beim Kugelhahn:** Hubbewegung über mehrere
  Umdrehungen, nicht Vierteldrehung. `states` mit `open`/`closed`, aber
  `setOpen(t)` verschiebt die Spindel axial **und** dreht das Handrad um
  mehrere Umdrehungen.

### 7.3 `valves/concealed-valve-chrome-heavy-part` — UP-Ventil Unterteil
### 7.4 `valves/concealed-valve-chrome-light-part` — UP-Ventil Oberteil
- **Materialien:** `chrome`, `pprGreen`
- **Paar** — sie sind zwei Hälften eines Systems.

### 7.5 `valves/battery-female-thread` + `valves/adjustable-battery-female-thread`
- **Größen:** je 2
- **Aussehen:** `20-VISUELLE-REFERENZ §4.4`. Zwei parallele
  Gewindeanschlüsse in festem Abstand (meist 150 mm), verbunden durch einen
  Steg. Bei der verstellbaren Variante Exzenter.
- **Paar.**

---

## Welle 8 — Werkzeuge und Maschinen (14)

⚠ **Diese Gruppe folgt einer eigenen Formensprache.** Keine Rohrgeometrie,
keine Muffen, keine Nennweiten im üblichen Sinn. Die schwierigste Gruppe.

**Vor dem Start entscheiden und beim Menschen rückfragen:**

> Die Maschinen (Elektroschweißgerät, Stumpfschweißmaschine, komplette
> Handschweißgeräte) sind Geräte mit Gehäuse, Bedienfeld und Kabel. Ein
> maßhaltiges Modell daraus ist eine andere Aufgabe als ein Fitting: die
> Katalogtabellen führen dort keine Geometriemaße, nur Artikelnummer und
> Leistungsdaten.
>
> **Frage:** Sollen diese Geräte überhaupt als 3D-Modell entstehen, oder
> genügt für sie das Katalogfoto?

Die Antwort ändert den Aufwand um mehrere Tage. **Nicht ohne Klärung
anfangen.**

### 8.1 Werkzeugpaare (Heizelemente) — 4 Produkte
`tools/welding-tool`, `-for-repairing-plug`, `drilling-tool-for-weld-in-saddle`,
`welding-tool-for-weld-in-saddles`

- **Aussehen:** `20-VISUELLE-REFERENZ §4.5`. Dorn (male) + Buchse (female),
  PTFE-beschichtet (mattschwarz/bronze), M-Gewinde zum Einschrauben.
- **Machbar mit Bestand:** `revolve` + `threadProfile`.
- **Material:** neu nötig — PTFE-Beschichtung. `ptfe` existiert, für die
  bronzefarbene Variante genügt `brass` mit erhöhter Roughness.

### 8.2 Rohrscheren und -schneider — 3 Produkte
`tools/pipe-cutter-20-40`, `-50-125`, `-50-125-114`

- **Aussehen:** zwei Griffe, Klinge, Gegenhalter. Griffe rot/schwarz
  (`toolRed`, `toolBlack`), Klinge `steel`.
- **Nicht rotationssymmetrisch.** `loft` und `roundedPad`.

### 8.3 Heizspiegel — 1 Produkt
`tools/hand-welding-machine-mirror-50-125`

- Runde Platte, verchromt oder PTFE, mit Gewindelöchern für die Werkzeuge.
- **Machbar mit Bestand.**

### 8.4 Geräte — 6 Produkte
`tools/hand-welding-machine-20-32`, `-20-63`, `electrofusion-machine`,
`butt-welding-machine-90-250`, `welding-machine-50-125`

- **Erst nach Klärung der Frage oben.**

---

## Blocker-Übersicht

| Produkt | Blocker | Gebraucht |
|---|---|---|
| `adaptor-socket-female-thread` | Spalten `h`, `L1` nicht deutbar | Zeichnung lesbar |
| Welle 8, Geräte (6) | Entscheidung: Modell oder Foto? | Antwort des Menschen |
| `k-pipe-purple-…` (fertig, aber) | Zeichnung sagt grün, Name sagt violett | Herstellerauskunft |
| Winkel/T-Stück (fertig, aber) | Bedeutung von `z` | Herstellerauskunft |
