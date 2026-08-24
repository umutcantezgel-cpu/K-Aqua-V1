# LOOP-STATUS

Fortgeschrieben nach **jedem** Produkt. Ein neuer Chat muss hier anknüpfen
können, ohne die ganze Pipeline zu lesen.

**Letzte Änderung:** 24.08.2026 — Wiederherstellung abgeschlossen.

---

## 1 · Wo der Loop steht

| | |
|---|---|
| Fertig | **34 von 71** · Selbsttest 34/34, max. 0,20 mm, keine Auffälligkeiten |
| Laufendes Produkt | **keines** — der Loop steht am Anfang von Spur A |
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
Beginn mit `elbow-90-male-thread`. **Erledigt: der Maßabgleich.** Die
Katalogtabelle S. 96 (`AQ092G`, 4 Größen) stimmt mit `data.js` in **jedem
Wert** überein — d, R, D, l, z, L₁, z₁, kg und Pack. über alle vier Zeilen.
Website-Tabelle und Druckkatalog sind damit zwei unabhängige Rang-1-Quellen,
die sich bestätigen; für dieses Produkt ist kein Quellwiderspruch offen.
**Offen bleibt allein die Gestalt** des Gewindeschenkels (§3.1).

Danach die Produkte mit ALH-Render, wo der Beweis am stärksten ist:
`elbow-45` (9) · `elbow-90` (9) · `tee` (23) · `reducing-bush` (20) ·
`socket` (9) · `cap` (9) · `adaptor-socket-male-thread` (10) ·
`union` (3) · `cross-over-pipe` (2).

**Spur B — die 37 offenen** nach `pipeline/70-ARBEITSAUFTRAEGE.md`.
Als Nächstes das Laschenpaar 4.5/4.6 (`elbow-bracket-90-female-thread`
`AQ090G`, `elbow-wall-bracket-90-female-thread` `AQ472G`) — beide Tabellen
liegen vollständig vor, Katalog S. 95, Spalten `d Rp D L z h D1 L1 z1`.
Neu ist die Lasche; `roundedPad`, `boltCircle` und `plateWithHoles` stehen
bereits im Core.

**Spur C — Farbvarianten**, gebündelt am Ende einer Produktgruppe.

---

## 3 · Offene Punkte für den Menschen

### 3.1 `elbow-90-male-thread` — Klotz am Gewindeschenkel *(entscheidungsreif)*

Das Foto `AQ092GP` zeigt am Gewindeschenkel einen breiten, flankierten
PP-Klotz, deutlich weiter als der Muffenschenkel. `params.js` wirft eine
Ausnahme, sobald der Gewindeschenkel über `D` hinausgeht — das Modell
erzwingt das Gegenteil.

Die Katalogtabelle S. 96 bemaßt diesen Körper **nicht** (`Code d R D l z L1
z1`, Zeichnung `d D z l R L z1`). Nach der Rangregel darf ein Bild eine
Gestalt bestimmen, die keine Tabelle bemaßt. **Vorschlag:** Wächter entfernen,
Klotz nach Foto, als ASSUMPTION mit Herleitung.

*Der Sechskant-Verdacht hat sich erledigt:* `AQ090G2012` ist der
Anschlussbogen IG (S. 95), ein anderes Produkt. `AQ092G` hat keinen Render.
Das Modell hat recht.

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

### 3.6 Aus Welle 4.2, weiter offen

Das Website-Katalogfoto von `elbow-90-male-thread` passt zu keiner
Tabellenzeile (freiliegendes Gewinde 47–80 % zu lang). Herstellerauskunft wäre
nötig; am Modell ändert sie nichts, weil das Modell der Tabelle folgt.

### 3.7 `Marketing/` ist nicht gesichert

Der Ordner steht in `.gitignore` (381 MB). Er liegt **nur** lokal. Nach dem
Verlust vom 24.08. ist das die zweite ungesicherte Stelle im Projekt.

---

## 4 · Eigene Arbeitsschritte, nicht nebenbei

- **ISO-7-1-Gewindetabelle in den Core.** Sie steht in vier Produktdateien mit
  identischen Werten (Fall 19). Vollbau danach.
- **`produkt-registry.json` nachziehen:** `build.status` führt 1 fertig / 70
  offen, tatsächlich sind es 34 / 37. Dazu die 22 Präfixkorrekturen aus §3.3.
- **Verwaiste Bau-Caches:** `build/core-stripped.js`, `prod-a.js`, `prod-b.js`,
  `tokens-inlined.css` liegen im Wurzelverzeichnis von `build/`;
  `incremental.mjs` schreibt nach `build/cache/`. Die vier sind toter Stand.
