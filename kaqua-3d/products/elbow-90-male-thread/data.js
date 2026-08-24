/* K-Aqua Winkel 90° mit Außengewinde — Artikeltabelle.

   PHASE 1, verifiziert am 23.08.2026 gegen
   Transition Fittings K-Aqua/screencapture-…-elbow-90-male-thread-….png
   (quellen/w4-elbow-male.png, 3004 × 8724 px). Ausschnitte:
   Tabelle quellen/w4-tabelle-elbow-male.png, Zeichnung
   quellen/w4-zeichnung-elbow-male.png. Vollständiger Befund in
   pruefung/w4-elbow-90-male-phase1.md.

   Spaltenköpfe wie abgebildet: Code · d · R · D · l · z · L₁ · z₁ · kg · Pack.
   Nach der letzten Zeile folgt der ORDER-Knopf — die Tabelle ist zu Ende
   gelesen (Fall 2). Es sind 4 Größen, wie im Arbeitsauftrag.

   MASSSCHLÜSSEL:
     d   Rohr-Außendurchmesser = Muffenbohrung
     R   Rohrgewinde in Zoll (kegelig, ISO 7-1 / DIN 2999)
     D   Außendurchmesser des Muffenschenkels
     l   Achse des Gewindeschenkels bis Stirnfläche der Muffe
     z   Achse des Gewindeschenkels bis Muffengrund
     L1  Achse des Muffenschenkels bis Ende des PP-R-Körpers
         (die Zeichnung schreibt sie `L`, die Tabelle `L₁` — dieselbe
          Kante, zwei Schreibweisen. Im Modell heißt sie durchgehend L1,
          Fall 19.)
     z1  Achse des Muffenschenkels bis Gewindespitze

   GEGENPROBE 1 — l − z trifft die Normreihe DVS 2207-11 (Fall 4):
     d20  14 gegen 14,5   ·  d25  16 gegen 16  ·  d32  18 gegen 18
   Die Muffentiefe kommt trotzdem aus fusionDepth(d); der Tabellenwert
   wandert als P.socketFromTable in den Prüfbericht.

   GEGENPROBE 2 — z1 − L1 ist die Gewindelänge, über ALLE Zeilen
   durchgerechnet und im Vorzeichen geprüft (Fall 28):
     15 · 15 · 16 · 18
   Die Differenz folgt R, nicht d: Zeile 2 und 3 haben dasselbe d25 und
   verschiedene Werte (15 gegen 16), Zeile 1 und 2 verschiedene d bei
   gleichem Wert. Die Reihe entspricht den Gewindelängen nach ISO 7-1
   (R ½" ≈ 15, R ¾" ≈ 16, R 1" ≈ 18). Damit ist getragen: das PP-R endet
   bei L1, das Gewinde beginnt dort und läuft bis z1.

   GEGENPROBE 3 — Plausibilität (Fall 3): D > d und D > Gewinde-Ø in
   jeder Zeile, l > z in jeder Zeile, L1 > D/2 in jeder Zeile.

   KEIN SECHSKANT. Die Zeichnung führt keine Spalte SW und zeigt keinen
   Sechskant; das Foto bestätigt einen runden Messingzapfen. Anders als
   adaptor-socket-male-thread und tee-90-male-thread braucht dieses Teil
   weder hexPrism noch knurl.

   ── DAS KATALOGFOTO GEHÖRT ZU KEINER ZEILE ──
   Die Größenbestimmung nach Fall 35 wurde durchgeführt und ist negativ
   ausgegangen. An der Silhouette gemessen: Gewinde-Ø/D = 0,746 (Tabelle
   0,616…0,778, passt), aber Gewindelänge/D = 0,758 gegen 0,419…0,517
   und z1/D = 1,98 gegen 1,535…1,690. Das freiliegende Gewinde ist
   47–80 % länger, als jede Zeile zulässt; auch unentzerrt bleibt der
   Abstand. Gegenprobe über die Steigung: 0,107 gemessen gegen 0,069…0,087.
   Nach Fall 31 gewinnt das Tabellenmaß (Rang 1) gegen die Fotoableitung
   (Rang 3); der Widerspruch wird dokumentiert, nicht aufgelöst. Aus dem
   Foto kommt deshalb KEIN Längenmaß, nur die Gestalt: zwei Werkstoffe,
   kein Sechskant, glatter PP-Körper mit Absatz.

   Auch die ZEICHNUNG ist nicht maßstäblich — geprüft: d/D 0,645,
   l/D 0,727, z1/D 1,364 gegen die Tabellenwerte. Sie legt fest, welches
   Maß wo liegt, nicht wie groß es ist.

   ASSUMPTION Gewindemaße: die Tabelle nennt nur die Zollgröße. Kern- und
   Steigungsmaße kommen aus ISO 7-1. Das ist Norm, keine Schätzung — die
   Zollangabe bestimmt sie eindeutig.

   Anmerkung zur Wiederholung: dieselbe ISO-7-1-Tabelle steht auch in
   adaptor-socket-male-thread/data.js, _teethread/params.js und
   _union/params.js. Vier Produkte, eine Norm — ein Kandidat für den
   Core (Fall 19). Nicht in dieser Runde, weil die Migration alle vier
   Gewindeprodukte anfasst; als Nachtrag im Prüfbericht vermerkt. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 4;
export const ANGLE = 90;
export const SDR = 6;

/* Die Gewindetabelle steht seit dem 24.08.2026 im Core
   (core/geometry.js, threadSpec) — sie stand fünfmal im Produktcode
   und gehört dorthin, wo FUSION_DEPTH steht (Fall 19). */

export const ARTICLES = [
  { key: '20x1/2', code: 'AQ092G2012', d: 20, R: '1/2', D: 29, l: 28, z: 14, L1: 34, z1: 49, kg: 0.09, pack: 180 },
  { key: '25x1/2', code: 'AQ092G2512', d: 25, R: '1/2', D: 34, l: 32, z: 16, L1: 38, z1: 53, kg: 0.10, pack: 150 },
  { key: '25x3/4', code: 'AQ092G2534', d: 25, R: '3/4', D: 34, l: 32, z: 16, L1: 40, z1: 56, kg: 0.15, pack: 100 },
  { key: '32x1', code: 'AQ092G321', d: 32, R: '1', D: 43, l: 38, z: 20, L1: 48, z1: 66, kg: 0.21, pack: 60 },
];

export const SIZES = ARTICLES.map((a) => a.key);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  R: 'Rohrgewinde',
  D: 'Außendurchmesser Muffenschenkel',
  l: 'Schenkelmaß Muffe l',
  z: 'Einbaulänge z',
  L1: 'Schenkelmaß PP-R-Körper L₁',
  z1: 'Achse bis Gewindespitze z₁',
};

export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}
