# LOOP-STATUS

Fortgeschrieben nach **jedem** Produkt. Ein neuer Chat muss hier anknüpfen
können, ohne die ganze Pipeline zu lesen.

**Letzte Änderung:** 24.08.2026 — Welle 4.5/4.6 gebaut. **36 von 71.**

---

## 1 · Wo der Loop steht

| | |
|---|---|
| Fertig | **36 von 71** · Selbsttest 36/36, max. 0,20 mm, keine Auffälligkeiten |
| Laufendes Produkt | **keines** |
| Spur A | 1 von 34 nachgeschärft: `elbow-90-male-thread` ✓ |
| Spur B | 2 von 37 gebaut: Welle 4.5 + 4.6, das Laschenpaar ✓ |
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

Als Nächstes 4.7 `valves/tee-90-female-thread-internal-valve` und 4.8
`transition-fittings/union-for-watermeters`. Danach Welle 5 (Rest) und
Welle 3, wo die Winkel Muffe/Spitzende stehen — deren Körper trägt
`_bendthread/parts.js` vermutlich ebenfalls.

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

### 3.9 `Marketing/` ist nicht gesichert

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
- **`buildBrassRing` in den Core.** Er steht jetzt zweimal:
  `_teethread/parts.js` und `_bracket/parts.js`, Zeichen für Zeichen
  gleich. Reine Kerngeometrie — ein Rotationskörper mit Innengewinde —
  und gehört neben `threadProfile` und `hexPrism`. Eigener Schritt mit
  Vollbau danach, wie bei der ISO-Tabelle.
- **Verwaiste Bau-Caches:** `build/core-stripped.js`, `prod-a.js`, `prod-b.js`,
  `tokens-inlined.css` liegen im Wurzelverzeichnis von `build/`;
  `incremental.mjs` schreibt nach `build/cache/`. Die vier sind toter Stand.
