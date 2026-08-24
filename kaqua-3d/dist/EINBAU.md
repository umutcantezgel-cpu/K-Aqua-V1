# EINBAU — was jetzt in die Website kann

Stand 24. August 2026 · **34 von 71 Produkten als 3D-Modell fertig**

Dieses Dokument ist die Kurzfassung für den Einbau. Die vollständige
Anleitung mit allen Fallstricken steht in **`INTEGRATION.md`** — lies sie,
bevor du etwas anfasst, das über das Kopieren hinausgeht.

---

## Geprüfter Stand

| | |
|---|---|
| Produkte fertig | **34**, davon 0 Prototypen |
| Größen (Artikelvarianten) | **283** |
| Selbsttest | **34/34 geladen, größte Abweichung 0,20 mm** |
| Konsistenzprüfung | Registry 34 = `lib/products/` 34 = `dist/` 34 Einzelseiten ✓ |
| Dokumentierte Fehlerquellen | 40 (`pipeline/40-FEHLERKATALOG.md`) |

Die 0,20 mm sind der Scheitelausgleich am Gewindeprofil — beabsichtigte
Geometrie, kein Maßfehler. Er ist über alle Größen konstant.

---

## Die 34 Modelle

**Rohre (12)** — d20 bis d355

| Produkt-ID | Größen |
|---|---|
| `pipes/k-pipe-pp-r-sdr-6` | 10 |
| `pipes/k-pipe-pp-r-sdr-11` | 9 |
| `pipes/k-pipe-purple-pp-r-sdr-11` | 9 |
| `pipes/k-pipe-pp-rct-sdr-7-4` | 10 |
| `pipes/k-fiber-pipe-pp-r-sdr-7-4` | 14 |
| `pipes/k-fiber-pipe-pp-rct-sdr-7-4` | 10 |
| `pipes/k-fiber-pipe-pp-r-sdr-9` | 8 |
| `pipes/k-fiber-pipe-pp-r-sdr-11` | 9 |
| `pipes/k-fiber-pipe-pp-r-sdr-17` | 8 |
| `pipes/k-fiberclima-pipe-pp-rct-sdr-11` | 9 |
| `pipes/k-fiber-uv-pipe-pp-rct-sdr-7-4` | 9 |
| `pipes/k-fiber-uv-pipe-pp-r-sdr-7-4` | 10 |

**Formteile (7)**

| Produkt-ID | Größen |
|---|---|
| `fittings/cap` | 14 |
| `fittings/socket` | 9 |
| `fittings/elbow-45` | 10 |
| `fittings/elbow-90` | 10 |
| `fittings/tee` | 10 |
| `fittings/cross` | 2 |
| `fittings/reducing-bush` | 17 |

**Übergangsstücke (9)** — die Gruppe, die seit dem letzten Stand gewachsen ist

| Produkt-ID | Größen |
|---|---|
| `transition-fittings/adaptor-socket-male-thread` | 12 |
| `transition-fittings/elbow-90-male-thread` | 4 |
| `transition-fittings/tee-90-female-thread` | 5 |
| `transition-fittings/tee-90-male-thread` | 4 |
| `transition-fittings/union` | 6 |
| `transition-fittings/metal-union-male-thread` | 6 |
| `transition-fittings/metal-union-male-thread-brass` | 6 |
| `transition-fittings/metal-union-female-thread` | 6 |
| `transition-fittings/metal-union-female-thread-brass` | 6 |

**Zubehör (5)**

| Produkt-ID | Größen |
|---|---|
| `accessories/plug` | 1 |
| `accessories/flat-gasket` | 11 |
| `accessories/flat-gasket-for-unions` | 3 |
| `accessories/backing-flange` | 11 |
| `accessories/pipe-clamps` | 9 |

**Armaturen (1)**

| Produkt-ID | Größen |
|---|---|
| `valves/pp-r-ball-valve-ball-in-pp` | 6 |

---

## Einbau in drei Schritten

### 1 · Dateien kopieren

```
dist/lib/  →  public/kaqua-3d/lib/
```

Das ist alles. Keine Bilder, keine Texturen, keine `.glb`-Dateien — die
Modelle sind prozedural.

### 2 · three.js installieren

```bash
npm install three@^0.184.0
```

### 3 · Komponente einbinden

`dist/lib/KaquaViewer.jsx` nach `components/` kopieren, dann:

```jsx
import KaquaViewer from '@/components/KaquaViewer';

export default function ProduktSeite() {
  return <KaquaViewer productId="fittings/cap" />;
}
```

Fertig. Der Viewer bringt Größenwahl, Explosionsansicht, Halbschnitt,
Bemaßung, Kamera-Presets, Tastatursteuerung und den WebGL-Fallback mit.

---

## Die eine Regel, die nicht verhandelbar ist

**Höchstens ein WebGL-Kontext pro Seite.** Browser erlauben 8 bis 16;
darüber verwirft der Treiber die ältesten und die Seite bricht ab.

Auf einer Übersichtsseite mit zwanzig Kacheln also **nicht** zwanzig
`KaquaViewer` montieren, sondern einen, dessen `productId` der Klick
setzt. Das Muster steht als Kommentar am Ende von `KaquaViewer.jsx`, und
`dist/kaqua-3d-galerie.html` führt es vor.

---

## Ohne Build: iframe

Wenn kein Bundler im Spiel ist:

```html
<iframe src="/kaqua-3d/kaqua-cap.html" title="Kappe — 3D-Ansicht"
        loading="lazy" style="width:100%;aspect-ratio:16/10;border:0"></iframe>
```

Jede der 34 HTML-Dateien ist vollständig eigenständig — three.js aus der
Importmap, Schriften als base64 eingebettet, keine externen Assets. Rund
375 kB, davon 235 kB Schriften.

`loading="lazy"` ist hier nicht Feinschliff, sondern die Umsetzung der
Ein-Kontext-Regel: jedes geladene iframe ist ein eigener Kontext.

---

## Prüfen, ob der Einbau die Geometrie angetastet hat

```js
const app = mount(product, { host: el });
app.measureAll();   // Soll/Ist über alle Größen
```

Der schnellste Weg zur Gewissheit. Erwartung: keine Abweichung über
0,3 mm, kein `NaN`.

`dist/lib-selbsttest.html` tut dasselbe für alle 34 Produkte auf einmal —
im Zweifel diese Datei öffnen.

Bei einer eingebauten Einzelseite geht es auch direkt in der Konsole:

```js
kaqua.ok                        // WebGL2 vorhanden und Modell gebaut
kaqua.built.triangleCount()     // Dreiecke und Meshes
kaqua.measureAll()              // derselbe Maßtest
```

---

## Was noch fehlt, und was das für den Einbau heißt

**37 Produkte sind noch nicht modelliert.** Sie stehen in
`gallery/registry.js` mit `status: 'offen'` und erscheinen in der Galerie
als flache Kachel ohne Startknopf. Der Katalog ist damit vollständig
sichtbar, der Fortschritt nachvollziehbar.

Für den Einbau heißt das: `useKaquaRegistry()` liefert **nur** die
vorhandenen Modelle. Eine Produktseite, deren Modell fehlt, ruft
`KaquaViewer` einfach nicht auf — es gibt nichts abzufangen.

Die Pipeline zum Weiterbauen liegt in `pipeline/` (12 Dokumente).

---

## Offene Punkte, die vor der Veröffentlichung geklärt sein sollten

Keiner blockiert den Einbau. Alle sind im Code als `ASSUMPTION` markiert.

| Punkt | Wo |
|---|---|
| **Katalogfoto des Winkels 90° AG passt zu keiner Tabellenzeile.** Das freiliegende Gewinde ist im Foto 47–80 % länger, als jede Zeile zulässt. Modelliert ist die Tabelle; der Widerspruch ist dokumentiert, nicht aufgelöst. Herstellerauskunft offen. | `pruefung/w4-elbow-90-male-phase1.md` |
| **Neues Bildmaterial widerspricht teils den fertigen Modellen.** Die Marketing-Fotos zeigen am Winkel 90° AG einen breiteren Körper am Gewindeschenkel, die Werksrender einen Sechskant, den die Maßzeichnung nicht bemaßt. Zu prüfen, bevor die betroffenen Seiten live gehen. | `quellen/marketing/` |
| **Körperfarbe des Violettrohrs.** Die Zeichnungsminiatur nennt „green with 1 red stripe" — wörtlich dasselbe wie beim grünen SDR-11-Rohr. Produktname und Titel sagen „Purple". Entschieden für Violett; ist die Miniatur maßgeblich, genügt eine Zeile in `LAYERS`. | `products/k-pipe-purple-…/data.js` |
| **Bedeutung der Spalte `z`** bei Winkel, T-Stück und Verschraubung. Bei der Muffe ist es nachweislich die Anschlagdicke; dort bestätigt `(l−z)/2` die Normreihe der Schweißtiefen exakt. Bei den anderen streut es um bis zu 3 mm — modelliert ist deshalb die Normreihe. | `products/tee/data.js` |
| **Schichtdicken der Faserrohre** 30/40/30 % der Wandstärke. Die Zeichnung nennt den Faserkern, aber keine Lagenmaße. | `products/k-fiber-*/data.js` |
| **Maße von Stopfen, Flachdichtung und Rohrschelle** sind aus dem Produktfoto abgeleitet — ihre Tabellen führen kein Geometriemaß. Über das Gewicht gegengeprüft. | drei `data.js`, `DATA_STATUS: 'verifiziert-ohne-masse'` |
| **Lochzahl des Losflansches** über DIN 2501 PN 10 hergeleitet — `D`, `D1` und `D3` treffen die Norm in 11 von 11 Zeilen. | `products/backing-flange/data.js` |
| **`PPR_GREEN = #17A46B`** — gegen das Katalogfoto der Muffe abgetastet: 2 % Abweichung in der Helligkeit. Gilt als bestätigt. Die Farbordner im Marketing-Material nennen jetzt RAL 6024; ein Abgleich steht aus. | `core/materials.js` |
| **Innenflächen am T-Stück-Abzweig überlappen** an der Durchdringung. Von außen unsichtbar, im Halbschnitt an der Kehle sichtbar. Ohne CSG nicht lösbar; Maße unberührt. | `products/_tee/parts.js` |

---

## Was du NICHT tun solltest

| | Warum |
|---|---|
| Dateien in `lib/` von Hand bearbeiten | Sie sind erzeugt. Quelle ist `core/` und `products/`; der nächste Bau überschreibt deine Änderung. |
| Mehrere `<three-d-stage>` gleichzeitig | Siehe oben. |
| Eine Farbe direkt in ein Produktmodul schreiben | Farben stehen ausschließlich in der Materialregistry (`MAT` in `core/materials.js`). `PPR_GREEN` ist **eine** Konstante — eine CI-Korrektur ist eine Zeile für alle Produkte. |
| Maße aus den Markdown-Produktseiten übernehmen | Die Markdown-Dateien im Repo sind unvollständig und teils falsch. Verbindlich sind die `data.js` der Produktpakete, jede gegen den Herstellerscreenshot verifiziert. |
| `three` als relativen Pfad einbinden | Der Core importiert den bare specifier `three`. Ein relativer Pfad lädt eine zweite Kopie, und zwei three.js-Instanzen in einer Szene führen zu stillen Fehlern. |
| `aria-hidden` auf den Viewer setzen | Das `aria-label` der Bühne nennt Artikelnummer und alle Maße in Worten. Es ist der einzige Zugang zu den Maßen für Screenreader-Nutzer. |
