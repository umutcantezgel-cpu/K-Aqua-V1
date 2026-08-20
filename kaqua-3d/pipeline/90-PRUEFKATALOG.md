# 90 — PRÜFKATALOG UND BAU

Was erfüllt sein muss, bevor ein Produkt abgegeben ist. Und wie gebaut wird,
ohne in die bekannten Fallen zu laufen.

---

## 1 · Abnahmeliste je Produkt

Alle Punkte müssen erfüllt sein. Kein „im Wesentlichen".

### Daten
- [ ] Maße **ausschließlich** aus dem Screenshot der Produktseite
- [ ] Tabelle vollständig, über alle Seitenumbrüche hinweg
- [ ] Spaltenköpfe wörtlich in `data.js` dokumentiert
- [ ] Kopfzeile (SDR, Druckstufe, Lieferlänge) übernommen
- [ ] Fußnoten übernommen oder als „nicht abgebildet" vermerkt
- [ ] Gegenproben gerechnet und im Kommentar belegt
- [ ] Zeichnung ausgelesen: Maßschlüssel, Werkstoff, Farbe **wörtlich**
- [ ] Abweichungsliste gegen `docs Unterseiten/<slug>.md`
- [ ] korrigierte Fassung in `produkt-markdown/`
- [ ] `DATA_STATUS` und `SIZES_SOURCE_VERIFIED` gesetzt

### Parametrik
- [ ] jedes abgeleitete Maß **gerechnet**, nichts hartkodiert
- [ ] Muffentiefe aus `fusionDepth()`, Tabellenwert als Gegenprobe
- [ ] jede Annahme trägt `ASSUMPTION` mit Begründung und Verifikationsquelle
- [ ] Wächter, die bei unmöglichen Werten abbrechen

### Geometrie
- [ ] ausschließlich Core-Funktionen
- [ ] kein CSG, keine boolesche Operation
- [ ] kein Farbwert im Produktcode
- [ ] Formtrennnaht (0,09 mm Grat auf der Mittelebene)
- [ ] Auswerfermarken (2–3, 0,1 mm vertieft, Unterseite)
- [ ] 1° Entformung zu jeder Stirnfläche
- [ ] Bund **auf** dem tabellierten `D`, nicht darüber
- [ ] kein Radius auf eine tangentiale Fuge
- [ ] jede echte Kante ≥ 0,3 mm Radius oder Fase

### Messung
- [ ] Maßtest über **alle** Nennweiten
- [ ] größte Abweichung ≤ 0,3 mm
- [ ] jede Abweichung über 0,1 mm **erklärt** (Formtrenngrat, Eckenradius,
      Segmentierung — nicht „ungefähr")
- [ ] keine `ist()`-Funktion gibt einen `P.`-Wert zurück (außer bei Größen,
      die per Definition Parameter sind — dann so benannt)
- [ ] zu jeder Messung beantwortet: *welchen Fehler kann sie nicht finden?*
- [ ] keine Messung vergleicht zwei Quellen
- [ ] Messpunkte am Nennmaßort, nicht in der Entformungsschräge
- [ ] Silhouettenabtastung bei Schlüsselflächen, Riffelung, Rippen
- [ ] Restwand ≥ 3 mm (Fittings) bzw. SDR-Reihe eingehalten (Rohre)

### Technik
- [ ] keine Konsolenausgabe
- [ ] Dreieckszahl im Prüfbericht genannt
- [ ] `dispose()` gibt alle Geometrien frei (über `part()`/`own()` registriert)
- [ ] 20 Größenwechsel ohne Zunahme der Meshzahl

### Abgabe
- [ ] Prüfbericht in `pruefung/<slug>-pruefbericht.md`
- [ ] Registry: `status: 'fertig'`, `codes`, `alle`, `n`
- [ ] Galerie und Bibliothek neu gebaut
- [ ] Selbsttest ohne Auffälligkeit
- [ ] `BAUSTAND.md` fortgeschrieben

---

## 2 · Der Selbsttest

`dist/lib-selbsttest.html` lädt **jedes** Modul, baut die Referenzgröße und
vermisst sie. Er beweist, dass die Importe auflösen — nicht bloß, dass Dateien
auf der Platte liegen.

```
Öffnen → warten (bei 21 Produkten ~12 s) → auslesen:
window.__test  →  { count, worst, fails }
```

**`fails` muss 0 sein. `worst` ≤ 0,3 mm.**

Er hat gefunden: die Bibliothek, die nichts exportierte (ein ignorierter
Funktionsparameter), und drei Fittings, deren Importliste unvollständig war.

---

## 3 · Die Silhouettenprüfung

Bei jedem Teil mit Schlüsselflächen, Riffelung oder Rippen. Sie hat den
unsichtbaren Sechskant gefunden, den der Maßtest durchließ.

```js
const buckets = new Array(72).fill(0);
gruppe.updateMatrixWorld(true);
gruppe.traverse((o) => {
  if (!o.isMesh) return;
  const pos = o.geometry.attributes.position;
  for (let n = 0; n < pos.count; n++) {
    const v = new THREE.Vector3().fromBufferAttribute(pos, n);
    if (Math.abs(v.x - x0) > bereich) continue;
    const rad = Math.hypot(v.y, v.z);
    let a = Math.atan2(v.z, v.y) * 180 / Math.PI;
    if (a < 0) a += 360;
    const b = Math.floor(a / 5) % 72;
    if (rad > buckets[b]) buckets[b] = rad;
  }
});
const spanne = Math.max(...buckets) - Math.min(...buckets);
```

| Ergebnis | Bedeutung |
|---|---|
| Spanne 0,000 | perfekter Kreis — **Kanten fehlen oder sind begraben** |
| Spanne ≈ Umkreis − Inkreis | Kanten bilden die Außenform ✓ |
| Beim Sechskant | erwartet: `D/2 − af/2`, also ~3,2 mm bei D=50 |

---

## 4 · Speichertest

```js
for (let i = 0; i < 20; i++) {
  window.kaqua.setSize(sizes[i % sizes.length]);
}
// Meshzahl muss konstant bleiben
let n = 0; window.kaqua.stage.scene.traverse(o => { if (o.isMesh) n++; });
```

Ohne `dispose()` wächst der GPU-Speicher bis zum Kontextverlust.

---

## 5 · Bauen

### 5.1 Die drei Regeln

**Regel 1 — Jeden Schritt einzeln.** `buildGallery`, `buildLib` und `build`
nie im selben Aufruf. Zusammen überschreiten sie das Zeitbudget, und ein
Timeout **verwirft alle Schreibvorgänge** — die Erfolgsmeldung des ersten
Schritts erscheint aber trotzdem. Genau so ist die Galerie einmal zwei
Produkte hinterhergeblieben.

**Regel 2 — Nach jedem Bau die Dateiliste prüfen, nicht die Logzeile.**

**Regel 3 — `buildLib` immer über die volle Produktliste.** Die drei
Indexdateien (`index.mjs`, `registry.mjs`, `registry.json`) sind Indizes. Mit
einer Teilliste schrumpfen sie auf dieses eine Produkt.

### 5.2 Die Caches

Ab etwa 20 Modellen überschreiten Galerie- und Bibliotheksbau das
Zeitbudget. Zwischenstände liegen in `build/`:

| Datei | Inhalt | Neu erzeugen wenn |
|---|---|---|
| `tokens-inlined.css` | CSS mit den vier Fonts als base64 | `assets/coday-tokens.css` ändert sich |
| `core-stripped.js` | Core verkettet, ohne Importe | eine Core-Datei ändert sich |
| `prod-a.js` | Produkte 0–10, gestrippt | eines davon ändert sich |
| `prod-b.js` | Produkte 11–n + `PRODUCTS`-Objekt | eines davon ändert sich, **oder ein Produkt kommt hinzu** |

**Ändert sich eine Quelle und der Cache nicht, baut die Galerie einen alten
Stand.** Das ist die gefährlichste Falle dieses Aufbaus.

### 5.2b Verwaiste Ausgaben

`build()` schreibt nach dem `module`-Namen des Produkts. Wird eine
Produkt-ID oder ein Modulname geändert, **bleibt die alte Datei in
`dist/` liegen** — und veraltet still mit, weil kein Produkt mehr auf sie
zeigt. Ein Diff über `dist/` findet dann zwei Core-Fassungen.

Das ist einmal passiert: `kaqua-k-fiber-pipe-pp-r-sdr-74.html` blieb nach
der Umbenennung auf `sdr-7-4` zurück und war nach zwei Core-Korrekturen der
einzige veraltete Stand im Paket.

**Prüfung nach jedem Vollbau** — sie findet Altstände und vergessene Viewer
in einem Durchgang:

```js
const files = (await ls('kaqua-3d/dist')).filter((f) => /^kaqua-.*\.html$/.test(f));
// Zahl muss sein: Produkte + 1 (Galerie)
for (const f of files) {
  const s = await readFile('kaqua-3d/dist/' + f);
  // je ein Merkmal der letzten Core-Änderung prüfen
}
```

Ist die Dateizahl höher als erwartet, liegt ein Altstand da. Löschen.

### 5.3 Reihenfolge

```
1. Cache erneuern            nur die betroffenen
2. Einzelviewer bauen        build([slug])
3. Bibliothek: Produktmodul  einzeln nachtragen
4. Bibliothek: Indexdateien  volle Liste
5. Galerie bauen             aus den Caches
6. Selbsttest fahren         window.__test prüfen
7. Galerie prüfen            Badge, Knopfzahl, Titel, Größenbereich
```

### 5.4 Galerieprüfung nach dem Bau

```js
({ badge: document.querySelector('.gal-count').textContent,
   mitKnopf: document.querySelectorAll('button[data-start]').length,
   kacheln: document.querySelectorAll('.tile').length,
   neu: (() => { const t = document.querySelector('.tile[data-id="<neue-id>"]');
     return { titel: t.querySelector('h2').textContent,
              knopf: !!t.querySelector('button[data-start]') }; })() })
```

**Erwartet:** Badge nennt die neue Zahl, `mitKnopf` = Zahl der fertigen
Produkte, `kacheln` = 71, die neue Kachel hat einen Startknopf.

Zeigt der Badge die alte Zahl, ist die Galerie stale — Cache nicht erneuert
oder Bau in den Timeout gelaufen.

---

## 6 · Die Prüferfragen

Bei jedem Produkt, bevor es abgegeben wird:

1. **Gibt eine `ist()`-Funktion einen `P.`-Wert zurück?**
   → Dann misst sie nicht, sie bestätigt eine Annahme. Fall 12.

2. **Welchen Fehler kann jede Messung nicht finden?**
   → Wenn die Antwort einen realistischen Fehler enthält, fehlt eine zweite
   Messung. Fall 13.

3. **Vergleicht eine Messung zwei Datenquellen?**
   → Gehört in den Prüfbericht, nicht in `measures`. Fall 14.

4. **Liegt ein Messpunkt in der Entformungsschräge?**
   → Am Nennmaßort messen. Fall 15.

5. **Trifft jeder Strahl die gemeinte Fläche?**
   → Von der Achse nach außen trifft die Bohrung. Fall 16.

6. **Ist jede Abweichung über 0,1 mm erklärt?**
   → „Ungefähr richtig" ist keine Erklärung.

7. **Bei Schlüsselflächen: Silhouette abgetastet?**
   → Fall 11.

---

## 7 · Häufige Fehlermeldungen

| Meldung | Ursache |
|---|---|
| `Bezeichner doppelt vergeben` | Ein Produkt hat noch eine eigene Fassung einer Funktion, die inzwischen im Familienmodul liegt |
| `dist/undefined.html` | Metadaten wurden per Position gelesen, Familiendateien haben sie verschoben |
| `refusing to commit: would shrink` | `buildLib` mit Teilliste — Truncation-Guard hat richtig gegriffen |
| `Script timed out` + Erfolgsmeldung | Alle Schreibvorgänge verworfen. Schritt einzeln wiederholen |
| `kein Normmaß für Gewinde R…` | Gewindegröße fehlt in der `THREAD`-Tabelle des Produkts |
| `Restwand … < 3 mm` | Bei Rohren: falscher Wächter, siehe Fall 8 |
| Badge zeigt alte Zahl | Cache nicht erneuert oder Bau im Timeout |
