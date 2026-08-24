/* K-Aqua T-Stück 90° mit Außengewinde im Abzweig — Artikeltabelle.

   PHASE 1, verifiziert am 23.08.2026 gegen
   Transition Fittings K-Aqua/screencapture-…-tee-90-male-thread-….png (quellen/w4-tee-male.png)
   Ausschnitte: Zeichnung quellen/w4-zeichnung-tee-male.png,
   Tabelle quellen/w4-tabelle-tee-male-a.png und -b.png.
   Vollständige Quellenlesung: pruefung/w4-tee-gewinde-phase1.md.

   Spaltenköpfe wie abgebildet:
     Code · d · R · D · l · z · l1 · z1 · kg · Pack.
   4 Größen. Nach der letzten Zeile folgt der ORDER-Knopf —
   die Tabelle ist vollständig gelesen (Fall 2).

   MASSSCHLÜSSEL:
     d    Nennweite des Durchgangs
     R    kegeliges Außengewinde des Abzweigs, in Zoll (ISO 7-1)
     D    Außendurchmesser des Durchgangs
     l    Achse Abzweig bis Stirnfläche Durchgang (HALBE Baulänge)
     z    Achse bis Muffengrund des Durchgangs
     l1   Achse Durchgang bis Ende des PP-R-Körpers
     z1   Achse Durchgang bis GEWINDESPITZE

   z1 − l1 ist der freistehende Messingzapfen:
     15 · 15 · 15 · 15 mm — über beide Nennweiten und beide Gewinde
     KONSTANT. Derselbe Zapfen wird in allen vier Artikeln verbaut.
     Über alle Zeilen positiv (Fall 28).

   SIZEKEY NÖTIG. Dieselbe Nennweite kommt mit verschiedenen Gewinden
   vor, d allein ist kein Schlüssel. Aufbau wie bei
   products/adaptor-socket-male-thread: '<d>x<gewinde>'.

   ── DREI GEGENPROBEN ──

   1 · l − z gegen die Normreihe DVS 2207-11:
         d20  28 − 14 = 14      Normreihe 14,5
         d25  32 − 16 = 16      Normreihe 16,0
       Die Muffentiefe kommt aus fusionDepth(d); der Tabellenwert
       wandert als socketFromTable in den Prüfbericht (Fall 4).

   2 · D deckt sich mit der Muffentabelle (products/socket/data.js):
       d20 → 29 ✓ · d25 → 35 · d32 → 44 gegen 43 hier.
       Bei d25 steht hier durchgehend 34, die Muffentabelle sagt 35.
       Die Innengewindeseite druckt bei d25 beides (35 und 34) — der
       Widerspruch ist dort im Kopfkommentar ausgeführt.

   3 · d, D, l und z decken sich zeilenweise mit der
       Innengewindevariante, soweit dieselben Nennweiten vorkommen.

   ── DIE SPALTE SW WIRD NICHT TABELLIERT, ABER GEZEICHNET ──
   Die Maßzeichnung zeigt einen Sechskant am Messingzapfen und
   beschriftet ihn SW. Die Tabelle führt keine solche Spalte.

   Der Sechskant WIRD gebaut — er ist in Zeichnung und Foto da. Seine
   Schlüsselweite ist eine ASSUMPTION (1,32·Gewinde-Ø, der Faktor des
   Gewindeadaptors bei denselben Gewinden) und in params.js als solche
   benannt. Der Maßtest misst Schlüsselweite UND Eckenmaß als Paar,
   damit wenigstens bewiesen ist, dass der Sechskant die Silhouette
   bildet (Fälle 11 und 13). Am Originalteil zu prüfen.

   ── DIE KANTE HEISST HIER l1 UND AUF DER ANDEREN SEITE h ──
   Siehe Kopfkommentar von tee-90-female-thread/data.js. */

export const DATA_STATUS = 'tabelle-verifiziert-zeichnung-gelesen';
export const SIZES_SOURCE_VERIFIED = 4;

export const ARTICLES = [
  { code: 'AQ133G2012', key: '20x1_2', d: 20, R: '1/2', D: 29, l: 28, z: 14, l1: 34, z1: 49, kg: 0.11, pack: 100 },
  { code: 'AQ133G2034', key: '20x3_4', d: 20, R: '3/4', D: 29, l: 28, z: 14, l1: 35, z1: 50, kg: 0.15, pack: 100 },
  { code: 'AQ133G2512', key: '25x1_2', d: 25, R: '1/2', D: 34, l: 32, z: 16, l1: 38, z1: 53, kg: 0.11, pack: 80 },
  { code: 'AQ133G2534', key: '25x3_4', d: 25, R: '3/4', D: 34, l: 32, z: 16, l1: 40, z1: 55, kg: 0.15, pack: 80 },
];

export const SIZES = ARTICLES.map((a) => a.key);

export const DIMENSION_KEY = {
  d: 'Nennmaß Durchgang',
  R: 'Außengewinde',
  D: 'Außendurchmesser',
  l: 'Achse bis Stirnfläche',
  z: 'Einbaulänge',
  l1: 'Höhe PP-R-Körper',
  z1: 'Gesamthöhe Abzweig',
};

export function sizeLabel(key) {
  const a = article(key);
  return 'd' + a.d + ' · R' + a.R + '"';
}

export function article(key) {
  const a = ARTICLES.find((x) => x.key === key);
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}
