# AUFTRAG — die Modelle gegen die Bilder, dann bis 71

Geschrieben 25.08.2026 für den nächsten Bearbeiter. Er setzt auf dem Stand
**50 von 71** auf (Selbsttest 50/50, größte Abweichung 0,20 mm, 1.500.440
Dreiecke, keine Auffälligkeiten) und hat zwei Spuren:

- **Spur A:** alle 50 gebauten Modelle gegen das Bildmaterial prüfen, jeden
  belegten Mangel in ein Register schreiben, daraus einen Plan machen und ihn
  ausführen.
- **Spur B:** die 21 offenen Produkte fertigbauen — 2 regulär, 18 als
  Prototyp, 1 bleibt blockiert.

Am Ende liegt **alles auf GitHub** (`origin/main`), mit einem sauberen
Selbsttest, grünen Prüfskripten und einem Register, das sagt, was geprüft
wurde und was nicht geprüft werden konnte.

**Warum Spur A nicht Formalie ist:** der eine Vergleich, den es schon gibt
(`pruefung/vergleichstest-rohre-muffe.md`, 17.08.), fand an der Kappe drei
Fehler, die der Maßtest nicht sehen konnte — Schulterlinie zur Kalotte, zu
scharfe Mundlochkante, zu zylindrische Silhouette — während die Maße auf
0,18 mm stimmten. Maßtest und Bildvergleich messen Verschiedenes, und bisher
lief nur einer davon über den ganzen Katalog.

---

## 0 · Lies zuerst

| Datei | Wofür |
|---|---|
| `UEBERGABE.md` | die harten Regeln, die vier Prüffragen, der 13-Schritte-Loop (§6) |
| `pipeline/40-FEHLERKATALOG.md` | 42 Fälle. Der wertvollste Teil des Projekts. |
| `pipeline/25-BILDQUELLEN.md` | Rangfolge der Quellen, Codesysteme, belegte Widersprüche |
| `pipeline/20-VISUELLE-REFERENZ.md` | ersetzt das Sehen; §5 Symptomliste, §6 Ersatzprüfungen |
| `LOOP-STATUS.md` | Stand und offene Punkte; §3.26 ist dein Vorlauf |
| `pruefung/vergleichstest-rohre-muffe.md` | das Vergleichsverfahren, einmal vorgemacht |

**Arbeitsgebiet** (mit dem Kollegen vereinbart, der parallel am selben
Repository arbeitet): `kaqua-3d/**`, `public/kaqua-3d/`, `lib/3d/`,
`docs/3d-produktion/`, `app/api/3d-view/`, `scripts/`.
**Nicht anfassen:** `content/`, `lib/data/`, `lib/search-data.ts`,
`next.config.ts`, `messages/`.

**Server:** ein statischer Server auf **Port 8731** aus `public/`:

```
cd public && python3 -m http.server 8731
```

Der Port ist mit dem Kollegen abgestimmt. Die Seiten liegen auf
`http://localhost:8731/kaqua-3d/kaqua-<slug>.html`, die Galerie auf
`…/kaqua-3d-galerie.html`, der Selbsttest auf `…/lib-selbsttest.html`.

**Bauen** (jeder Schritt ein eigener Aufruf, Dateiliste prüfen, nicht die
Logzeile — Fall 17/38; nach Core-Änderung ALLE Einzelviewer neu — Fall 22):

```
node build/incremental.mjs cache
node build/incremental.mjs products
node build/incremental.mjs lib
node build/incremental.mjs gallery
```

Ausliefern: `dist/` → `public/kaqua-3d/` (Viewer-HTML und `lib/`), dann
`node scripts/sync-3d-registry.mjs` und `node scripts/check-3d-coverage.mjs`.

**WebGL-Screenshots:** `canvas.toDataURL()` der laufenden Seite liefert
Schwarz. Der Weg, der funktioniert: eigener Renderer mit
`preserveDrawingBuffer: true`, Szene hineinrendern, `toDataURL` in ein
`<img>` — steht so in `UEBERGABE.md` §4 und ist in den `pruefung/*.png`
mehrfach angewandt.

---

## 1 · Vorlauf: das Seitenprüfskript (§3.26)

Es gibt keine Prüfung, die die erzeugten Einzelseiten wirklich **lädt**. Der
Selbsttest ruft `build()` direkt auf und kommt an `articleOf` nie vorbei —
deshalb blieben zwei tote T-Stück-Seiten unbemerkt, denen nur `sizeKey`
fehlte: Modell sichtbar, alles andere tot, eine einzige „Uncaught (in
promise)" auf der Konsole.

Spur A öffnet 50 Seiten; dieses Skript ist dafür das Werkzeug. **Baue es
zuerst:** `scripts/check-3d-seiten.mjs`. Es nimmt die Seitenliste aus
`kaqua-3d/gallery/registry.js`, lädt jede Seite gegen den Server auf 8731 und
prüft:

- `window.kaqua` existiert und `kaqua.ok === true`
- `kaqua.built.triangleCount()` liefert eine Zahl > 0
- die Konsole ist frei von Fehlern und unbehandelten Rejections
- ein Klick auf einen anderen Größenknopf ändert die Dreieckszahl oder die
  Maße (das hätte die beiden toten Seiten gefunden)

Ausgabe: eine Zeile je Seite, am Ende eine Summenzeile. Jeder Befund ein
Fehler-Exitcode. Danach gehört das Skript in Schritt 7 neben
`check-3d-coverage.mjs` — der Mangel aus §3.26 wird damit geschlossen; trage
das in `LOOP-STATUS.md` nach.

---

## 2 · Schritt 1: die Bildzuordnung — EINMAL, dann eingefroren

`pipeline/25-BILDQUELLEN.md` ist die Grundlage. Die Zuordnung unten ist
**vorgerechnet und stichprobenhaft geprüft** — prüfe sie nach, statt sie neu
zu erfinden, und friere sie dann als Abschnitt im Mängelregister ein. Kein
Produktschritt leitet seine Bilder selbst her: 50-mal herleiten heißt 50-mal
driften (Fall 32).

**Die Rangfolge** (Kurzform von §1 dort): Tabellenmaß schlägt jedes Bild.
ALH-Render (`Marketing/diverse Fotos alt/ALH Produktbilder/<CODE>/`) beweist
**Gestalt bei bekannter Größe** — der Ordnername ist der Artikelcode.
Produktfotos (`Marketing/Produktbilder/grün (RAL 6024)/`) beweisen Werkstoff,
Oberfläche, Farbe, Gestalt — Größe **unbekannt** (Fall 35). Gruppenbilder
beweisen keine Maße.

**Drei Fallen, alle in dieser Vorbereitung selbst ausgelöst oder belegt:**

1. **`AQ270` ist ein Präfix von `AQ270G`.** Ein `startsWith`-Abgleich schiebt
   der Muffe die neun Render der Übergangsmuffe IG unter. Regel: nach dem
   Präfix dürfen **nur noch Ziffern** stehen. Damit gehen 109 der 112 Ordner
   restlos auf; die drei übrigen sind die in §3.1 belegten Tippfehler
   `AQ090G32` · `AQ270H903` · `AQ33025` — sie werden **nicht** zugeordnet.
2. **`AQ130` deckt zwei Produkte.** Eine Nennweite im Code = T-Stück (8
   Ordner), zwei Nennweiten = Reduzier-T-Stück (15 Ordner).
3. **`AQ243GP` ist NICHT die Reduzierbuchse.** Es ist `AQ243G` + Fotomarke
   `P` — die Übergangsmuffe AG. Beim Vorrechnen dieser Tabelle war es zuerst
   falsch gelegt. *Ein falsch zugeordnetes Bild verdirbt ein fertiges Modell*
   (§6 dort).

### 2.1 ALH-Render → Produkt (14 Produkte, 109 Ordner)

| Produkt | Familie | Ordner |
|---|---|---|
| `fittings/cap` | AQ301 | 9 |
| `fittings/socket` | AQ270 | 9 |
| `fittings/elbow-45` | AQ045 | 9 |
| `fittings/elbow-90` | AQ090 | 9 |
| `fittings/tee` | AQ130, eine Nennweite | 8 |
| `fittings/reducing-tee` | AQ130, zwei Nennweiten | 15 |
| `fittings/reducing-bush` | AQ243 | 20 |
| `transition-fittings/adaptor-socket-female-thread` | AQ270G | 9 |
| `transition-fittings/adaptor-socket-male-thread` | AQ243G | 10 |
| `transition-fittings/tee-90-female-thread` | AQ130G | 2 |
| `transition-fittings/union` | AQ330A | 3 |
| `transition-fittings/elbow-bracket-90-female-thread` | AQ090G | 3 |
| `fittings/cross-over` | AQ287 | 1 |
| `fittings/cross-over-pipe` | AQ285 | 2 |

Bei `G`-Codes nennt der Ordnername Nennweite **und** Gewinde mit stillem
Bruch: `2012` = 20 × ½", `2534` = 25 × ¾", `321` = 32 × 1", `1104` = 110 × 4"
(volle Liste in §3.1).

### 2.2 Produktfoto → Produkt (34 der 50)

Dateinamen sind **Foto-IDs der Familie**, keine Artikelcodes: `P` am Ende ist
die Fotomarke, `6` vor `GP` heißt Sechskant-Messingeinsatz — dasselbe Teil in
zweiter Ausführung, eine Variantenachse, die in keinem Modell steht (§3.2,
offener Punkt für den Menschen).

| Produkt | Bilddateien (`…/grün (RAL 6024)/`) |
|---|---|
| `fittings/cap` · `socket` · `elbow-45` · `elbow-90` · `elbow-45-female-male` · `elbow-90-female-male` · `tee` · `cross` · `flange-adaptor` | `AQ301P` · `AQ270P` · `AQ045P` · `AQ090P` · `AQ041P` · `AQ091P` · `AQ130P` · `AQ180P` · `AQ790P` |
| `fittings/reducing-tee` | `AQ130P` (Familienfoto, zeigt auch das gleichschenklige) |
| `fittings/electrofusion-socket` | `AQ271` |
| `fittings/cross-over` · `cross-over-pipe` | `AQ287` · `AQ285` |
| `transition-fittings/adaptor-socket-female-thread` | `AQ270GP` + `AQ2706GP` (Sechskant) |
| `transition-fittings/adaptor-socket-male-thread` | `AQ243GP` + `AQ2436GP` |
| `transition-fittings/elbow-90-male-thread` | `AQ092GP` + `AQ0926GP` |
| `transition-fittings/tee-90-female-thread` | `AQ130GP` + `AQ1306GP` |
| `transition-fittings/tee-90-male-thread` | `AQ133GP` + `AQ1336GP` |
| `transition-fittings/elbow-bracket-90-female-thread` | `AQ090GP` + `AQ0906GP` |
| `transition-fittings/elbow-wall-bracket-90-female-thread` | `AQ472G` |
| `transition-fittings/union` | `AQ330A` |
| `transition-fittings/metal-union-…-brass` (beide) | `AQ532` · `AQ537` |
| `valves/pp-r-ball-valve-brass` · `-ball-in-pp` | `AQ850` · `AQ852` |
| `valves/tee-90-female-thread-internal-valve` | `AQ599A` |
| `accessories/pipe-clamps` | `AQ500` |
| `weld-in-saddles/weld-in-saddle` | `AQ130SP` + `AQ1306GSP`/`AQ130GSP` |
| `pipes/k-pipe-pp-r-sdr-6` · `-sdr-11` | `AQ200P` · `AQ111P` |
| `pipes/k-fiberclima-pipe-pp-rct-sdr-11` | `AQ160F_111PF` |
| `pipes/k-pipe-pp-rct-sdr-7-4` · `k-fiber-pipe-pp-rct-sdr-7-4` | `AQ200F_207PF` |
| `pipes/k-fiber-uv-pipe-pp-rct-sdr-7-4` | `AQ200FUV_AQ207PFUV` |

Dazu die Farblinien für die Rohre: `blau (RAL 5005)`, `curry (RAL 1002)`,
`Mocca (RAL 7032)`, `uv (schwarz)` — nur Werkstoff- und Farbbeweis.

**Für Spur B bereits vorhanden:** `AQ490G` und `AQ492G` (die beiden
Batterieanschlüsse) und `AQ593P711` (Reparaturstopfen).

**Nicht entschieden — im Register unter „Bild kann nicht entscheiden"
führen, nicht raten:** `AQ2431GP`/`AQ24316GP` (Deutung des `1` unklar),
`AQ271GP`/`AQ2716GP` (§3.2 führt sie als Sechskantpaar, aber `AQ271` ist die
Elektroschweißmuffe ohne Gewinde — vermutlich hängt das mit dem belegten
Website-Widerspruch §5.1 zusammen), `AQ730_750` (§3.2 führt es unzugeordnet,
aber `AQ750` ist der Losflansch S. 110 — prüfen, dokumentieren, ggf. §3.2
berichtigen). Ohne Katalogentsprechung bleiben `AQ002P` · `AQ050GP` ·
`AQ050P` · `AQ051GP` · `AQ091GP` · `AQ286` · `AQ473G` · `AQ853` · die beiden
`AQVerteiler`.

### 2.3 Ohne jedes Bild (15 der 50)

Sechs Faser-/UV-Rohrvarianten (`k-fiber-pp-r` SDR 6/7,4/9/11/17,
`k-fiber-uv-pp-r`), `k-pipe-purple`, die beiden Metallverschraubungen
`AQ542`/`AQ547`, die beiden Gewinde-Anbohrsättel `AQ270S`/`AQ243S`, beide
Flachdichtungen, `plug`, `backing-flange`.

Diese 15 werden im Register **benannt** — „kein Bildbeweis möglich, geprüft
bleibt der Maßtest" — und nicht als „geprüft" verbucht (Fall 29, auf Bilder
angewandt). Bei den Faserrohren trägt das Katalogfoto der Familie
(Druckkatalog S. 78–82) zumindest den Schichtaufbau; nutze ihn, wo er reicht.

---

## 3 · Schritt 2: der Vergleich

Das Verfahren ist vorgemacht (`pruefung/vergleichstest-rohre-muffe.md`) und
in `20-VISUELLE-REFERENZ.md` §5/§6 festgehalten. Je Produkt:

1. Seite öffnen, `kaqua.ok` abfragen (Fall 38).
2. **Bei ALH-Vorlage die Größe einstellen, die der Ordnername nennt.** Ein
   Vergleich über zwei verschiedene Größen vergleicht nichts (Fall 35).
3. Screenshot in der Perspektive des Fotos (Renderer mit
   `preserveDrawingBuffer`, siehe §0), Vergleichsbild nach
   `pruefung/` wie `muffe-vergleich.png`.
4. **Entschieden wird mit Messungen, nicht mit dem Auge:**
   - **Silhouette in 5°-Kübeln** über die Netzpunkte im fraglichen Band:
     Spanne 0 = Kreis, Spanne > 0 = Kanten. Diese Abtastung hat den
     unsichtbaren Sechskant gefunden, den der Maßtest durchließ (Fall 11).
   - **Verhältnisse** `l/D`, `L/d`, `h/D` — im Foto in Pixeln messbar, im
     Modell in Millimetern; die Verhältnisse müssen gleich sein.
   - **Werkstoffzahl:** `built.parts.length` gegen die Zahl der im Foto
     sichtbaren Werkstoffe.
   - **Farbe wird abgetastet, nie beurteilt:** Fleck auf der Mantelfläche,
     Glanzlicht und Schatten ausschließen, Median. Der Präzedenzfall: der
     Eindruck sagte „zu hell", die Messung ergab 2 % dunkler.
5. Die zehn Symptome aus `20-VISUELLE-REFERENZ.md` §5 als Checkliste
   durchgehen — jedes nennt Ursache und Fallnummer.

**Reihenfolge:** erst die 14 mit Render (stärkster Beweis), dann die 21 nur
mit Foto, dann die 15 ohne Bild als Benennungsdurchgang. Vier fertige sind
schon bildgeprüft und brauchen nur den Registervermerk mit Verweis:
`socket` und `cap` (`vergleichstest-rohre-muffe.md`), `elbow-90-male-thread`
(`w6a-elbow-90-male-gestalt.md`), Rohre
(`rohre-und-muffe-pruefbericht.md` mit `01-rohr.png`/`02-rohr.png`).

---

## 4 · Schritt 3: das Mängelregister

`kaqua-3d/pruefung/MAENGELREGISTER.md`. Ein Eintrag je Mangel:

> Produkt · Größe · **welches Bild** (Pfad + Rang) · **welche Messung** es
> bestätigt (Zahl gegen Zahl) · Schwere **A** (falsche Gestalt, falscher
> Werkstoff, fehlendes Teil) / **B** (fehlendes Merkmal: Auswerfermarke,
> Trennnaht, Riffelung, Prägung) / **C** (kosmetisch) · betroffene Datei ·
> ob die Behebung eine **Familien- oder Core-Datei** trifft.

Daneben, gleichrangig: die Liste **„Bild kann nicht entscheiden"** (die 15
ohne Bild, die unentschiedenen Foto-IDs aus §2.2, und jeder Fall, in dem das
Foto die Frage nicht hergibt) und die Liste **„Verdacht ohne Messung"** —
ein Eindruck ohne Messung ist kein Mangel und wandert nicht in den Plan.

**Commit nach dem Register**, bevor irgendetwas behoben wird: der Befund ist
für sich wertvoll und darf nicht mit der ersten Korrektur vermischt werden.

---

## 5 · Schritt 4 und 5: Plan und Behebung

`kaqua-3d/SPUR-A-PLAN.md` aus dem Register: nach Schwere geordnet (A vor B
vor C), **Eingriffe in gemeinsame Dateien gebündelt** — eine Änderung an
`_tee/parts.js` betrifft fünf Produkte und wird einmal gemacht, nicht
fünfmal. Je Posten: Mangel-Nummern, Datei, geplanter Eingriff, betroffene
Produkte.

Dann ausführen, je Produkt der 13-Schritte-Loop aus `UEBERGABE.md` §6.
Zusätzlich, weil dies eine Formkampagne ist:

- **Nach jeder Formänderung der volle Maßtest über alle Größen erneut.**
  Eine Gestaltkorrektur, die ein Katalogmaß verschiebt, ist ein Rückschritt —
  ein Bild schlägt nie ein Tabellenmaß.
- **Bei jeder Änderung an Core oder Familie ein Neutralitätsnachweis:** der
  Selbsttest muss vorher und nachher **Zahl für Zahl** dasselbe liefern,
  außer dort, wo die Änderung gewollt ist — und was gewollt ist, steht vorher
  im Plan. Viermal in diesem Projekt angewandt, viermal hat es getragen.
- Ein Merkmal, das ein Bild belegt, aber keine Tabelle bemaßt, bekommt sein
  Maß als **ASSUMPTION mit Herleitung** (z. B. „aus AQ092GP: Klotzbreite ≈
  1,35 · D, abgemessen am Foto bei bekanntem D").

---

## 6 · Schritt 6: Spur B — die 21 offenen

Stand aus `produkt-registry.json` (`build.status`), Bauhinweise je Produkt
in `pipeline/70-ARBEITSAUFTRAEGE.md` (Wellen 7 und 8). **Eine Stelle dort ist
überholt:** die Einordnung der Batterieanschlüsse stammt von vor dem Befund,
dass Seite 108 voll bemaßt ist — maßgeblich ist `LOOP-STATUS.md` §3.23, das
sie zu regulär baubaren Produkten macht:

**Regulär baubar (2)** — Katalog S. 108, voll bemaßt, Fotos `AQ490G`/`AQ492G`
vorhanden:
`valves/battery-female-thread` (AQ490G, 2 Größen, L 150/L1 185) und
`valves/adjustable-battery-female-thread` (AQ492G, „L adjustable"
100-135-150, L1 230). Voller 13-Schritte-Loop, wie bei den 50 davor.

**Prototypen (18)** — Maße aus Foto und, wo die Tabelle Kilogramm führt, aus
der **Massenprobe** (Netzvolumen × 0,9 g/cm³ gegen die kg-Spalte — das
Verfahren steht in `products/_crossover/params.js` und `assembly.js`, wo die
Masse eine Dreifach-Mehrdeutigkeit entschieden hat). Jede Zahl ASSUMPTION
mit Herleitung, jedes Produkt `status:'prototyp'` (Fall 30):

- die **4 Ventilteile von S. 106** (`straight-seat-valve-green-handle`,
  `concealed-valve-chrome-heavy-part`, `-light-part`, `elongation-pieces`) —
  belegt unbemaßt: drei ohne Maßskizze, die vierte bemaßt nur `L`
  (LOOP-STATUS §3.22). Gestaltbeschreibungen in
  `20-VISUELLE-REFERENZ.md` §4.4.
- die **14 Werkzeuge** (`tools/*`, S. 114–117) — Gestalt nach §4.5 dort.
  Prüfe je Seite zuerst, was der Katalog doch bemaßt, bevor du schätzt.
  Die Kastengeräte sind nicht rotationssymmetrisch: `roundedPad`/`loft`
  statt `revolve`. Sobald die Rohrschneider stehen, entfallen die vier
  Ersatzzuordnungen `pipe-cutter-*` → `pipe-clamps` in
  `app/api/3d-view/[slug]/route.ts`.

**Blockiert (1)** — `transition-fittings/union-for-watermeters` (AQ332):
bleibt blockiert, Grund steht in `LOOP-STATUS.md` §3.25. Nicht raten.

Ziel: **71 von 71** in Registry und Galerie, davon 18 `prototyp`,
1 `blockiert` mit Grund.

---

## 7 · Schritt 7: Abschluss und Push

In dieser Reihenfolge, jede Stufe grün, bevor die nächste läuft:

1. Selbsttest `lib-selbsttest.html` — ohne Auffälligkeit.
2. `node scripts/check-3d-seiten.mjs` — alle Seiten, dein Skript aus §1.
3. `node scripts/check-3d-coverage.mjs` — beide Aliastabellen.
4. `npx tsc --noEmit`.
5. `npm run build` — **vorher den Dev-Server beenden**, beide teilen sich
   `.next`, und die Kollision sieht aus wie ein Codefehler.
6. `git fetch` und auf `origin/main` **rebasen** — der Kollege pusht dorthin
   ebenfalls; beim Start dieses Auftrags war HEAD `origin/main` + 1.
7. **Ein Push** auf `origin/main`. Wird er wegen fremder Commits abgelehnt:
   fetch, rebase, Prüfstufen 1–5 erneut, dann wieder pushen.

Der Push ist nach der Entscheidung des Menschen **gesammelt am Ende** — nicht
je Produkt. Lokal gilt trotzdem: **Commit je Produkt** (Fall 41: ein
Arbeitsstand außerhalb von git ist nicht gesichert).

---

## 8 · Die Regeln, die über allem stehen

1. **Ein Bild schlägt nie ein Tabellenmaß.** Widersprechen sich Bild und
   Rang-1-Quelle: Tabelle gewinnt fürs Modell, der Widerspruch wird
   dokumentiert — nicht durch Nachgeben aufgelöst.
2. **Ein Bild darf eine Gestalt bestimmen, die keine Tabelle bemaßt** —
   Sechskant, Riffelung, Absatz, Prägung, Farbe. Das ist der ganze Zweck von
   Spur A, und mehr darf sie nicht.
3. **Ein Mangel braucht eine Messung.** „Sieht anders aus" ist ein Verdacht
   und steht auf der Verdachtsliste.
4. **Wo kein Bild ist, wird das benannt**, nicht als „in Ordnung" verbucht.
5. **Nie stehenbleiben:** undeutbare Spalte → benennen, Rest bauen (Fall 29);
   modellbestimmend undeutbar → `blockiert` mit genauem Grund, weiter; zwei
   Quellen im Widerspruch → beide festhalten, keine gewinnt; Produkt
   scheitert im Bau → `git checkout` seiner Dateien, `blockiert`, weiter.
   **Der Baum bleibt immer grün.**
6. Die vier Prüffragen aus `UEBERGABE.md` §5 vor jeder Abgabe — sie haben
   mehr Fehler gefunden als jede Sichtprüfung.

## 9 · Wiederaufnahme

Ein Durchgang trägt 50 Vergleiche und 21 Bauten nicht in einem Kontext.
Versuche es nicht; der Auftrag ist auf Wiederaufnahme gebaut:

- **Commit je Produkt** und je abgeschlossenem Dokument.
- `LOOP-STATUS.md` führt den Stand fort (Zählerzeile, §3-Punkte).
- `MAENGELREGISTER.md` und `SPUR-A-PLAN.md` tragen je Posten eine
  Statusspalte (offen / behoben / verworfen mit Grund).

Ein Neustart liest diese drei Dateien und macht beim ersten offenen Posten
weiter — ohne die Pipeline neu zu lesen.
