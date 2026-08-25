# LOOP-STATUS

Fortgeschrieben nach **jedem** Produkt. Ein neuer Chat muss hier anknüpfen
können, ohne die ganze Pipeline zu lesen.

**Letzte Änderung:** 24.08.2026 — Phase 2 läuft, fünf Produkte gebaut,
zwei tote Produktseiten repariert, ein Core-Wächter und ein Layoutfehler.
**44 von 71.**

---

## 1 · Wo der Loop steht

| | |
|---|---|
| Fertig | **44 von 71** · Selbsttest 44/44, max. 0,20 mm, keine Auffälligkeiten |
| Laufendes Produkt | **keines** |
| Spur A | 1 von 34 nachgeschärft: `elbow-90-male-thread` ✓ |
| Spur B | 5 von 37 gebaut: 4.5 + 4.6 (Laschen), 3.1 + 3.2 (Muffe/Spitzende), Elektroschweißmuffe ✓ |
| Letzter Bauzustand | vollständig gebaut und ausgeliefert; `npm run build` grün |
| Branch | `wiederherstellung-kaqua-3d` |

### Was am 24.08.2026 geschah

Der Arbeitsbaum `kaqua-3d/` war gelöscht — 256 Dateien. Im Projekt lag nur
`kaqua-3d 3/` mit `dist/`, also das Bauergebnis ohne Quellen. Damit war auch
die Anwendung defekt (`Native3DShowroom.tsx` importiert
`@/kaqua-3d/dist/lib/registry.mjs`).

Wiederhergestellt aus git HEAD plus den `dist`-Bundles, die die Quelldateien
mit Abschnittsmarken wörtlich enthalten (Fall 41):

- `core/geometry.js` mit drei Korrekturen, die nur im Bundle standen:
  `bendPath(…, LB)`, `sweepPath`-Wicklung (Fall 39), `threadProfile`-`Rp`
- 6 Produkte und die Familien `_teethread/`, `_union/`
- zurückportiert: `adaptor-socket-male-thread`, `metal-union-female-thread`,
  `_tee/parts.js`

**Nachweis:** neu gebaut und gegen das überlebende `dist/` gedifft — alle 34
Einzelseiten byteweise gleich, 30 von 34 lib-Modulen ebenfalls; drei
unterscheiden sich nur um den ungenutzten Import `SEG_INT`,
`flat-gasket-for-unions` ist jetzt richtig statt unvollständig (Fall 42).

**Endgültig verloren:** `quellen/` (57 Zuschnitte), die Prüfberichte der
Wellen 3–5, der Originaltext von **Fall 36 und 37**. `UEBERGABE.md`,
`LOOP-STATUS.md` und die Fälle 34, 35, 38–40 sind neu gefasst.

---

## 2 · Als Nächstes

**Spur A — die 34 fertigen gegen die neuen Bilder prüfen.**
`elbow-90-male-thread` ist **fertig nachgeschärft** (Prüfbericht
`pruefung/w6a-elbow-90-male-gestalt.md`). Der Maßabgleich: die
Katalogtabelle S. 96 (`AQ092G`, 4 Größen) stimmt mit `data.js` in **jedem
Wert** überein — d, R, D, l, z, L₁, z₁, kg und Pack. über alle vier Zeilen.
Website-Tabelle und Druckkatalog sind damit zwei unabhängige Rang-1-Quellen,
die sich bestätigen; für dieses Produkt ist kein Quellwiderspruch offen.
**Offen bleibt allein die Gestalt** des Gewindeschenkels (§3.1).

Danach die Produkte mit ALH-Render, wo der Beweis am stärksten ist:
`elbow-45` (9) · `elbow-90` (9) · `tee` (23) · `reducing-bush` (20) ·
`socket` (9) · `cap` (9) · `adaptor-socket-male-thread` (10) ·
`union` (3) · `cross-over-pipe` (2).

**Spur B — die 35 noch offenen** nach `pipeline/70-ARBEITSAUFTRAEGE.md`.
Das Laschenpaar 4.5/4.6 ist **fertig** (Prüfbericht
`pruefung/w45-46-laschenpaar.md`): beide Tabellen vollständig aus zwei
unabhängigen Rang-1-Quellen, Maßtest über zehn Größen mit größter
Abweichung 0,03 mm.

**Welle 3.1/3.2 ist ebenfalls fertig** (Prüfbericht
`pruefung/w31-32-winkel-muffe-spitzende.md`): die Winkel 45° und 90°
Muffe/Spitzende tragen `_bendthread/parts.js` ohne jede Änderung am
Körper — Schenkel B ist einfach durchgehend Rohr. Maßtest 0,01 bzw.
**0,00 mm**.

Als Nächstes 4.7 `valves/tee-90-female-thread-internal-valve` (AQ599A,
Katalog S. 108) und 4.8 `transition-fittings/union-for-watermeters`
(AQ332, S. 100). Bei beiden ist eine Spalte noch ungedeutet — bei AQ599A
das `z` (46/43/39/58 gegen L/2 = 40/40/37,5/47), bei AQ332 sind es zwei
Schlüsselweiten SW und SW₁. Zuerst die Zeichnungen lesen.

**Die Elektroschweißmuffe ist ebenfalls fertig** (Prüfbericht
`pruefung/w2-electrofusion-socket.md`), 14 Größen, 0,01 mm.

### Erkundung der nächsten drei — gemacht, damit sie nicht doppelt läuft

**3.3 `cross-over` (AQ287, Katalog S. 91)** — 3 Größen, Tabelle aus
Katalog UND Website gelesen, Zeile für Zeile gleich:

| Code | d | L | z | H | t |
|---|---|---|---|---|---|
| AQ28720 | 20 | 90 | 63 | 45 | 14 |
| AQ28725 | 25 | 104 | 80 | 55 | 16 |
| AQ28732 | 32 | 126 | 98 | 70 | 23 |

Die Zeichnung zeigt einen symmetrischen Brückenbogen: Muffe, Anstieg,
Scheitel, Abstieg, Muffe. Sie setzt `t` an die Muffentiefe und `L` über
alles — daraus müsste `L = t + z + t` folgen. **Tut es nicht:**
L − z = 27 · 24 · 28, aber 2t = 28 · 32 · 46. Nur d20 stimmt annähernd.
**`z` ist damit nicht gedeutet** (Fall 29) und wird nicht angesetzt.

Modellierbar ist das Teil trotzdem aus d, L, H und t. Zwei Dinge fehlen
und wären ASSUMPTION: der **Außendurchmesser** (die Tabelle führt keine
Spalte D — die Muffentabelle gibt 29 · 35 · 44 her) und die
**Bogenradien** des Anstiegs.

Neu nötig: eine **Bahnfunktion für den Brückenbogen**. `bendPath` trägt
einen Knick, nicht vier. Entweder mehrere `arcPath`-Abschnitte
aneinandergesetzt oder eine eigene Funktion im Core.

**3.4 `cross-over-pipe` (AQ285, S. 91)** — 3 Größen, Spalten
`Code d L H s`. Kein `t`, kein `z`: das Teil ist aus **Rohr** gebogen
(daher die Wandstärke s = 3,4 · 4,2 · 5,4), die Enden sind Spitzenden.
L = 365 · 370 · 370 mm — es ist ein langes Rohrstück mit einem Bogen in
der Mitte. Dieselbe Bahnfunktion wie 3.3, aber ohne Muffen und mit
konstanter Wand. **Der einfachere der beiden**, wenn die Bahn steht.

**`reducing-tee` (AQ130 mit zwei Nennweiten, S. 88–89)** — Spalten
`Code d d1 d2 D l z l1 D1 z1 s s1`. `d2 = d` in allen gelesenen Zeilen:
der Durchgang ist beidseitig gleich, `d1` ist der reduzierte Abzweig.

Gegenprobe l − z gegen die Normreihe trifft gut (16 · 18 · 18 · 20 ·
21 · 21 · 24 · 24 …). **Aber `D1` folgt keiner erkennbaren Regel:**
29 · 34 · 34 · 43 · 43 · 43 · 43 · 43 · 43 · 65, während der Abzweig
d1 = 20 · 20 · 25 · 20 · 25 · 32 · 20 · 25 · 32 · 40 läuft. Weder der
Abzweigmuffen-Außendurchmesser noch der des Durchgangs passt darauf.
Auch `l1` springt bei AQ1305032 und AQ1305040 von 46 auf 62. **Vor dem
Bau zu klären** — vermutlich am besten an der Maßzeichnung, wie es bei
der Elektroschweißmuffe die Spalte `h` gelöst hat.

Das Familienmodul `_tee` kennt nur EINEN Durchmesser. Für die
Reduzier-T-Stücke muss der Abzweig eine eigene Nennweite bekommen —
eine echte Erweiterung, kein Durchreichen.

**Spur C — Farbvarianten**, gebündelt am Ende einer Produktgruppe.

---

## 3 · Offene Punkte für den Menschen

### 3.1 `elbow-90-male-thread` — Facettierung des Gewindeschenkels

**Erledigt:** Der Körper am Gewindeschenkel ist korrigiert. Er ist jetzt
1,05–1,31 · D statt künstlich unter D gehalten; Herleitung, Maßtest und die
vier Prüffragen in `pruefung/w6a-elbow-90-male-gestalt.md`. Der
Sechskant-Verdacht war eine Codeverwechslung (`AQ090G` ist der Anschlussbogen
IG, ein anderes Produkt) — das Modell hatte recht.

**Offen:** Beide Fotos zeigen den Körper **facettiert**, nicht rund. Wie viele
Flächen und über welche Länge, geben sie nicht her; modelliert ist der
Umkreis. Ein besseres Bild (oder Herstellerauskunft) würde das lösen. Kein
Maßfehler — der Umkreis ist das größte Maß.

### 3.2 `adaptor-socket-female-thread` — die Website zeigt eine fremde Tabelle

Die Website-Aufnahme führt `AQ27120 … AQ271315`, 14 Zeilen, Spalten
`Code d D L h L1`. Im Katalog ist **`AQ271` die Elektroschweißmuffe** (S. 92);
die Übergangsmuffe IG ist **`AQ270G`** (S. 94, 12 Größen, `Code d Rp D D1 l z`).
Die Zeichnung derselben Website-Seite ist `D Rp z d D1` beschriftet — sie passt
zum Katalog, nicht zur abgebildeten Tabelle.

**Folge:** Die Entscheidung aus Welle 4 („nur Zeichnungsgrößen d20–d63, Rest
weglassen, `status:'prototyp'`") beruhte auf einer Tabelle, die nicht zu
diesem Produkt gehört. Sie ist damit gegenstandslos. **Nicht selbst
umentschieden** — bitte bestätigen, dass nach Katalog `AQ270G` mit 12 Größen
gebaut wird.

### 3.3 Die Artikelpräfixe der Registry sind überwiegend falsch

22 von 71 `article_prefix_md_unverified` widersprechen dem Katalog, Tabelle in
`pipeline/25-BILDQUELLEN.md` §6. Besonders heikel: `AQ500` ist in der Registry
der Kugelhahn, im Katalog die **Rohrschelle**. Nachtragen ist ein eigener
Arbeitsschritt — Freigabe erbeten.

### 3.4 Sechskant-Messingeinsatz als Variantenachse

Die Produktfotos belegen zu acht Familien je eine **runde und eine
sechskantige** Ausführung des Messingeinsatzes (`AQ090GP` gegen `AQ0906GP`
usw.). Der Katalog führt dazu keine eigene Zeile. Gehört das in den Katalog —
als Variante, als eigenes Produkt, oder gar nicht?

### 3.5 Nicht zuordenbare Bilder

Ohne Katalogentsprechung, als unzugeordnet geführt: `AQ002P`, `AQ050GP`,
`AQ050P`, `AQ051GP`, `AQ286`, `AQ473G`, `AQ730_750` und zwei
`AQVerteiler`-Fotos (4-fach-Verteilerbalken). Gibt es diese Produkte noch?

### 3.6 Was bezeichnet die Spalte `h` bei den Laschen?

Die naheliegende Deutung „Achse bis Unterkante" ist am gebauten Modell
**widerlegt**: das Modell liegt in jeder Größe bei genau D₁/2 (14,5 · 17 ·
17 · 21,5 · 21,5), die Tabelle führt 13 · 15 · 20 · 18 · 20 — vier von fünf
Werten **unter** dem Radius des Muffenschenkels, wohin die Unterkante eines
Winkels nicht kommen kann.

Verwertbar ist die **Differenz**: h ist bei AQ472G in jeder vergleichbaren
Zeile genau 2 mm größer als bei AQ090G. Das ist die Lasche, und darauf ist
sie gesetzt. Der absolute Bezugspunkt bleibt offen. Betrifft
möglicherweise weitere Tabellen dieser Familie.

### 3.7 Ringhöhe 11 mm bei AQ090G2534

L − z ergibt bei AQ090G 14 · 14 · **11** · 15 · 17. Die 11 mm für ¾" liegen
unter den 14 mm für ½". Von **beiden** Rang-1-Quellen bestätigt, also kein
Lesefehler — aber gegen die eigene Reihe. Am Originalteil zu prüfen.

### 3.8 Aus Welle 4.2, weiter offen

Das Website-Katalogfoto von `elbow-90-male-thread` passt zu keiner
Tabellenzeile (freiliegendes Gewinde 47–80 % zu lang). Herstellerauskunft wäre
nötig; am Modell ändert sie nichts, weil das Modell der Tabelle folgt.

### 3.9 Kontaktdome der Elektroschweißmuffe schrumpfen

h − D fällt von 20 mm bei d25 auf 0,5 mm bei d315. Kontaktdome schrumpfen
in Wirklichkeit nicht. Entweder sind sie bei den großen Muffen versenkt,
oder h bedeutet dort etwas anderes. Beide Rang-1-Quellen tragen die
Zahlen; am Originalteil zu prüfen.

### 3.10 Vier Rohrschneider zeigen eine Rohrschelle

`app/api/3d-view/[slug]/route.ts` bildet `pipe-cutter-*` auf `pipe-clamps`
ab — ein fremdes Bauteil als Notbehelf, solange es kein eigenes Modell gibt.
`lib/3d/resolve.ts` hat genau diesen Notbehelf abgeschafft und begründet das
dort: für einen maßhaltigen Viewer ist **gar keine** Darstellung besser als
ein falsches Teil. In der API-Route steht er noch.

Ihn zu entfernen kostet vier Seiten ihre (falsche) 3D-Ansicht, bis die
Werkzeuge gebaut sind. **Entscheidung des Menschen.** Dasselbe gilt für
`pp-r-ball-valve-brass` → Kugelhahn PP und `reducing-tee-large` →
`reducing-tee` (letzteres hat selbst noch kein Modell).

### 3.11 `k-fiber-pipe-pp-r-sdr-6` hat keine Produktseite

Das Rohr steht nur im Druckkatalog (S. 79), nicht auf der Website — deshalb
fehlte es in der 71er-Liste. Aufgenommen in beide Registries; die Zielzahl
steht damit auf **72**.

Es gibt aber **keine** Seite unter `content/products/pipes/`. Der
Galerie-Eintrag verlinkt bis dahin auf die Kategorieseite, damit kein toter
Link entsteht. Die Produktseite muss geschrieben werden — das ist
Redaktionsarbeit, keine Modellarbeit.

Offen bleibt die Gegenfrage: `fittings/reducing-tee-large` ist eine
Aufteilung der Website; der Katalog führt das Reduzier-T-Stück als **ein**
Produkt über S. 88/89. Bleibt es ein eigenes Produkt, sind es 72 — sonst 71.

### 3.12 Zwei Kopien der Produktregistry

`kaqua-3d/produkt-registry.json` (gepflegt) und
`docs/3d-produktion/produkt-registry.json` (Kopie) sind auseinandergelaufen.
`check-3d-coverage.mjs` rechnet jetzt mit der ersten und **meldet** den
Unterschied, statt still die alte zu nehmen. Ob die Kopie unter `docs/`
mitgezogen oder gelöscht wird, entscheidet der Mensch.

### 3.13 Streifenfarben — AUFGELÖST am 24.08.2026, zugunsten des Katalogs

Beim Bau des K-Fiber Rohrs SDR 6 fielen vier Rohre auf, deren
Streifenfarbe im Modell dem Katalog widersprach. Die Zahl der Streifen
stimmte überall, nur die Farbe nicht — und zwar als sauberer Ringtausch,
die Handschrift einer um eine Zeile verrutschten Tabelle.

Aufgelöst durch **drei unabhängige Belege**, die alle in dieselbe
Richtung zeigen:

1. **Der Katalog stützt sich selbst.** Auf S. 80 stehen SDR 9 und SDR 11
   untereinander, und neben jeder Farbangabe steht das Produktfoto. Text
   und Bild derselben Seite sagen dasselbe: grauer Streifen oben, blauer
   unten.
2. **Die freigegebene Studiofotografie stimmt mit dem Katalog überein.**
   Das Foto zu AQ111P zeigt genau einen blauen Streifen, wie S. 77 sagt —
   geprüft an einer Zeile, die gar nicht strittig war. (Beitrag der
   Parallelsitzung.)
3. **Die alte Website widerspricht sich selbst.** Ihre Kategorie-
   aufnahme „PIPES" zeigt das violette Rohr ohne jeden Streifen, während
   ihre eigene Tabelle einen roten nennt. Eine Quelle, die sich selbst
   widerspricht, ist als Quelle erledigt — dieselbe Website ist im
   Übrigen auch bei Wandstärken (d÷10 statt Messwert) und
   Artikelnummern aufgefallen.

Geändert wurden vier Modelle:

| Rohr | vorher | jetzt | Katalog |
|---|---|---|---|
| `k-fiber-pipe-pp-r-sdr-7-4` | 4 grau | 4 rot | S. 79 |
| `k-fiber-pipe-pp-r-sdr-9` | 4 blau | 4 grau | S. 80 |
| `k-fiber-pipe-pp-r-sdr-11` | 4 rot | 4 blau | S. 80 |
| `k-pipe-purple-pp-r-sdr-11` | grün + roter Streifen | violette Außenlage, grüne Innenlage, kein Streifen | S. 77 |

Alle dreizehn Rohre decken sich jetzt mit dem Katalog, S. 76 bis 82.

**Ein Rest bleibt offen:** der Katalog nennt beim violetten Rohr zwei
Lagen, bemaßt aber keine. Angesetzt sind 0,35 violett / 0,65 grün, als
ASSUMPTION vermerkt. Aus dem Foto ist nur zu lesen, dass das Violett die
schmalere Lage ist; ein großer Teil des sichtbaren Grüns ist die
Bohrungsinnenseite, nicht der Wandquerschnitt. Am Rohrabschnitt in einer
Minute zu klären.

### 3.14 Die Spalte `z` der Übergangsmuffe IG ist nicht gedeutet

Katalog S. 94, Tabelle AQ270G. Geprüft und **verworfen** wurde die
Deutung *z = l − Gewindetiefe − Muffentiefe*: mit den echten
Muffentiefen aus der Muffentabelle ergäbe sie bei d20 × ½" 13,5 mm gegen
tabellierte 11 und bei d63 × 2" 13,5 gegen 19. Eine Deutung, die über die
Zeilen nicht trägt, ist keine (Fall 28).

Für die Geometrie wird `z` nicht gebraucht. Der Wert steht in `data.js`,
wird aber weder modelliert noch gemessen (Fall 29). Am Originalteil in
einer Minute zu klären.

### 3.15 `l = 165` bei AQ270G1104 fällt aus der Reihe

Drei voneinander unabhängige Anzeichen:

| Anzeichen | d20 … d90 | d110 |
|---|---|---|
| `l/d` | 2,05 → 1,02, monoton fallend | **1,50** |
| AG-Muffe gegen IG-Muffe | AG ist 12–51 mm länger | AG ist 4 mm **kürzer** |
| Steg zwischen Muffengrund und Ring | 7,5 → 23,5 mm, gleichmäßig | **85,5 mm** |

Der Katalog ist hier die einzige Quelle — die gleichnamige Website-Seite
zeigt ein anderes Produkt (§3.16). **Nicht geändert:** das Modell baut
165 und zeigt genau das, was im Katalog steht.

### 3.16 Die Website-Seite „Adaptor socket (Female thread)" zeigt die Elektroschweißmuffe

Keine Gewindespalte, Codes `AQ271xx` statt `AQ270G`, 14 Größen bis d315,
Spalten `d · D · L · h · L1`, Foto ohne Messing. Daraus stammen auch die
Codes `AQ24RP*` in `article_codes_md` der Registry, die zu keinem der
beiden Produkte gehören. In der Registry vermerkt, nicht stillschweigend
gelöscht — die Falschzuordnung ist selbst ein Befund.

### 3.17 GESCHLOSSEN — ein NaN leerte die Seite, ohne dass ein Maß es merkte

Beim Kugelhahn mit Messingkugel stand eine Parameterzeile vor der Zeile,
aus der sie rechnete. Die O-Ringe wurden NaN, ein einziges NaN machte die
Bounding-Box der ganzen Baugruppe ungültig, die Kamera bekam keinen
Rahmen — und die Ansicht blieb **weiß, während alle acht Maße 0,00 mm
meldeten**. Keines von ihnen fasst die O-Ringe an.

`createAssembly.part()` prüft jetzt bei jedem Teil die Positionen und
wirft mit Teilenamen. Nachgewiesen, indem der Fehler absichtlich noch
einmal hergestellt wurde: statt der weißen Fläche steht seither die
Meldung. Danach zurückgebaut, alle 42 Viewer neu (Fall 22), Selbsttest
unverändert 42/42.

### 3.18 GESCHLOSSEN — die Größenleiste sprengte das Seitenlayout

Mit 37 Größenknöpfen (Reduzier-T-Stück) wuchs das Dokument auf 1964 px
statt 1280, die Seite scrollte waagerecht und das Modell stand
außermittig. Ursache: `.viewer` ist ein Grid, und Grid-Elemente haben
`min-width: auto` — ein Kind, das breiter ist als der Rahmen, sprengt
die Spalte, und `max-width: 1280px` am Container hilft dann nicht.

Behoben mit `grid-template-columns: minmax(0, 1fr)`; die Größenleiste
scrollt jetzt in sich. Der Fehler steckte seit jeher in ALLEN Viewern,
war aber bis 14 Größen unsichtbar. Alle 43 neu gebaut.

### 3.19 Dem gleichschenkligen T-Stück fehlen vier Größen

Der Katalog führt auf S. 88 unter „Tee" nicht nur die zehn
Muffengrößen, sondern darunter vier SDR-11-Größen mit Spitzenden
(AQ130160 · AQ130200 · AQ130250 · AQ130315, d160 bis d315). Das gebaute
Produkt hat nur die zehn Muffengrößen.

Die Geometrie dafür steht seit dem 24.08.2026 im Reduzier-T-Stück
(`buildSpigotTee`). Sie gehört in die Familie, sobald das T-Stück
nachgezogen wird — dann ist es ein Datensatz und ein Umzug, kein neuer
Bau. Gehört zu Spur A.

### 3.20 Der Selbsttest prüft die Einzelseiten nicht

Aufgefallen bei den zwei toten T-Stück-Seiten (Commit 941554c9): ihnen
fehlte `sizeKey: 'key'`, die Modelle erschienen, aber Größenumschalter,
Schnitt und Explosion waren tot und `window.kaqua` fehlte. Auf der
Konsole stand eine einzige „Uncaught (in promise)".

Der Selbsttest lädt die **Bibliotheksmodule** und ruft `build()` direkt
auf — er kommt an `articleOf` gar nicht vorbei und konnte das nie sehen.
Die Dateiliste erst recht nicht (Fall 38). Aufgefallen ist es nur, weil
ich das T-Stück zufällig als Gegenprobe für ein anderes Produkt aufrufen
wollte.

**Was fehlt:** eine Prüfung, die jede erzeugte Einzelseite wirklich lädt
und `window.kaqua` abfragt. 41 Seiten, ein Skript. Noch nicht gebaut.

### 3.21 `Marketing/` ist nicht gesichert

Der Ordner steht in `.gitignore` (381 MB). Er liegt **nur** lokal. Nach dem
Verlust vom 24.08. ist das die zweite ungesicherte Stelle im Projekt.

---

## 4 · Eigene Arbeitsschritte, nicht nebenbei

- ~~ISO-7-1-Gewindetabelle in den Core~~ **erledigt 24.08.2026.** Sie stand
  nicht in vier, sondern in **fünf** Produktdateien (`_teethread`, `_union`,
  `elbow-90-male-thread`, `adaptor-socket-male-thread`, `plug`), alle mit
  identischen Werten. Jetzt `threadSpec()` in `core/geometry.js`, neben
  `fusionDepth`. Vollbau danach: Selbsttest unverändert 34/34, 0,20 mm,
  956 348 Dreiecke — der Umzug ist geometrisch neutral.
  Nicht mitgenommen: `NUT_THREAD_OD` in `_union/params.js`. Das ist die
  Tabelle des Kupplungsgewindes der Mutter, eine andere Größenreihe.
- ~~`produkt-registry.json` `build.status` nachziehen~~ **erledigt 24.08.2026.**
  Er führte 1 fertig / 70 offen, während 34 gebaut waren. Wird jetzt aus
  `gallery/registry.js` gespiegelt (dort ist der Modellstand die einzige
  Quelle) und steht auf 36 / 35. Die 22 Präfixkorrekturen aus §3.3 sind
  **noch offen**; für die beiden Laschen sind `article_codes_source` und
  `article_prefix_source` bereits eingetragen.
- **„Alle 70 Produkte im 3D Studio"** steht als feste Zahl im Seitentext
  (Produktseiten-Bausteine). Sie war schon vor dieser Sitzung falsch und ist
  jetzt 72. Die Zahl gehört aus der Registry gelesen, nicht getippt.
- **`buildBrassRing` in den Core.** Er steht jetzt zweimal:
  `_teethread/parts.js` und `_bracket/parts.js`, Zeichen für Zeichen
  gleich. Reine Kerngeometrie — ein Rotationskörper mit Innengewinde —
  und gehört neben `threadProfile` und `hexPrism`. Eigener Schritt mit
  Vollbau danach, wie bei der ISO-Tabelle.
- **Verwaiste Bau-Caches:** `build/core-stripped.js`, `prod-a.js`, `prod-b.js`,
  `tokens-inlined.css` liegen im Wurzelverzeichnis von `build/`;
  `incremental.mjs` schreibt nach `build/cache/`. Die vier sind toter Stand.
