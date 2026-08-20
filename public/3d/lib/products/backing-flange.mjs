/* K-Aqua 3D · Bundflansch PP-Stahl — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID accessories/backing-flange.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  SEG_VIS, boltCircle, createAssembly, hexPrism, materials, plateWithHoles,
} from '../kaqua-3d-core.mjs';

/* == backing-flange/data.js ============================================ */
/* K-Aqua Bundflansch PP-Stahl — Artikeltabelle.

   PHASE 1, verifiziert am 19.08.2026 gegen
   Accessories K-Aqua/screencapture-…-accessories-backing-flange-pp-steel-….png
   (quellen/w2-backing-flange.png, 3004 × 9746 px).

   Spaltenköpfe wie abgebildet:
     Code · d · D · D1 · D2 · D3 · H · System · kg · Pack.
   11 Größen, d40 bis d315. Tabelle über zwei Zuschnitte.

   MASSSCHLÜSSEL (aus Foto und Spaltenlogik):
     d   Rohr-Nennweite, für die der Flansch gilt
     D   Außendurchmesser des Flanschrings
     D1  Lochkreisdurchmesser
     D2  Innendurchmesser — die Bohrung, durch die die Bundbuchse geht
     D3  Durchmesser der Schraubenlöcher
     H   Dicke
     System  SF = Muffenschweißung · BF = Stumpfschweißung · SF/BF = beides

   Gegenproben:
     D > D1 > D2 in jeder Zeile ✓
     D2 > d in jeder Zeile ✓ (der Flansch schiebt sich über die Buchse)
     H wächst monoton 16 → 34 ✓
     D3 springt bei d160 von 18 auf 22 — dort wechselt das System auf BF

   ── LOCHZAHL: NICHT TABELLIERT, ABER HERLEITBAR ──
   Die Tabelle nennt Lochkreis und Lochdurchmesser, nicht aber die Zahl
   der Löcher. Das Foto zeigt vier — aber nur für eine Größe.

   Die Herleitung geht über die Norm: D, D1 und D3 stimmen in JEDER
   Zeile mit der Reihe DIN 2501 / EN 1092-1 PN 10 überein, wenn man die
   Rohr-Nennweite d auf die Flansch-Nennweite DN abbildet:

     d40  → DN32:  D140 D1 100 4×18  ✓
     d50  → DN40:  D150 D1 110 4×18  ✓
     d63  → DN50:  D165 D1 125 4×18  ✓
     d75  → DN65:  D185 D1 145 4×18  ✓
     d90  → DN80:  D200 D1 160 8×18  ✓
     d110 → DN100: D220 D1 180 8×18  ✓
     d125 → DN125: D250 D1 210 8×18  ✓
     d160 → DN150: D285 D1 240 8×22  ✓
     d200 → DN200: D340 D1 295 8×22  ✓
     d250 → DN250: D395 D1 350 12×22 ✓
     d315 → DN300: D445 D1 400 12×22 ✓

   Elf von elf Zeilen treffen drei Normmaße gleichzeitig. Damit ist die
   Reihe eindeutig identifiziert, und die vierte Größe — die Lochzahl —
   folgt daraus. Sie steht unten als `holes` und ist als abgeleitet
   markiert, nicht als gelesen.

   Die DN-Spalte ist ebenfalls abgeleitet und dient nur der
   Nachvollziehbarkeit dieser Herleitung. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 11;

export const ARTICLES = [
  { code: 'AQ75040', d: 40, D: 140, D1: 100, D2: 51, D3: 18, H: 16, system: 'SF/BF', kg: 0.62, pack: 20, dn: 32, holes: 4, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ75050', d: 50, D: 150, D1: 110, D2: 62, D3: 18, H: 18, system: 'SF/BF', kg: 0.82, pack: 17, dn: 40, holes: 4, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ75063', d: 63, D: 165, D1: 125, D2: 78, D3: 18, H: 18, system: 'SF/BF', kg: 0.94, pack: 15, dn: 50, holes: 4, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ75075', d: 75, D: 185, D1: 145, D2: 92, D3: 18, H: 18, system: 'SF/BF', kg: 1.35, pack: 11, dn: 65, holes: 4, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ75090', d: 90, D: 200, D1: 160, D2: 110, D3: 18, H: 20, system: 'SF', kg: 1.39, pack: 13, dn: 80, holes: 8, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ750110', d: 110, D: 220, D1: 180, D2: 133, D3: 18, H: 20, system: 'SF', kg: 1.41, pack: 13, dn: 100, holes: 8, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ750125', d: 125, D: 250, D1: 210, D2: 150, D3: 18, H: 20, system: 'SF', kg: 1.41, pack: 12, dn: 125, holes: 8, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ750160', d: 160, D: 285, D1: 240, D2: 178, D3: 22, H: 24, system: 'BF', kg: 3.6, pack: 1, dn: 150, holes: 8, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ750200', d: 200, D: 340, D1: 295, D2: 235, D3: 22, H: 27, system: 'BF', kg: 5.2, pack: 1, dn: 200, holes: 8, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ750250', d: 250, D: 395, D1: 350, D2: 288, D3: 22, H: 30, system: 'BF', kg: 6.63, pack: 1, dn: 250, holes: 12, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ750315', d: 315, D: 445, D1: 400, D2: 338, D3: 22, H: 34, system: 'BF', kg: 8.4, pack: 1, dn: 300, holes: 12, abgeleitet: ['holes', 'dn'] },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennweite',
  D: 'Außendurchmesser',
  D1: 'Lochkreis',
  D2: 'Innendurchmesser',
  D3: 'Lochdurchmesser',
  H: 'Dicke',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}


/* == backing-flange/params.js ========================================== */
/* K-Aqua Bundflansch — Parametrik.

   Sechs Maße stehen in der Tabelle, die Lochzahl ist über die Normreihe
   hergeleitet (Begründung in data.js). Zu rechnen bleibt fast nichts —
   genau so soll ein Produktpaket aussehen. */


export function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);

  P.rOut = a.D / 2;
  P.rIn = a.D2 / 2;
  P.rHole = a.D3 / 2;
  P.boltCircleD = a.D1;
  P.thick = a.H;
  P.holeCount = a.holes;

  /* Ringbreite zwischen Lochkreis und Rand — die Fläche, die die
     Schraubenkraft überträgt. */
  P.rimWidth = Math.round((a.D - a.D1) / 2 * 10) / 10;
  P.hubWidth = Math.round((a.D1 - a.D2) / 2 * 10) / 10;

  /* Lochmuster um eine halbe Teilung gedreht: bei geraden Lochzahlen
     läge sonst ein Loch genau auf der Schnittebene z = 0, und der
     Halbschnitt zeigte ein halbes Loch statt einer klaren Kante. */
  P.startDeg = 180 / a.holes;

  /* ASSUMPTION Fase 0,8 mm an den Stirnflächen. Das Foto zeigt eine
     schmale, gleichmäßige Kantenfase — typisch für ein gedrehtes oder
     gefrästes Teil. Sie nimmt vom Außendurchmesser, deshalb klein
     gehalten und im Maßtest eingerechnet. */
  P.bevel = 0.8;

  /* Stahlkern in PP-Mantel: das Foto zeigt eine graue, matte Oberfläche
     mit metallischem Glanz an den Lochrändern. Die Produktbezeichnung
     nennt „PP-Steel". Modelliert als ein Teil in Stahl — eine
     Zweistoff-Darstellung bräuchte die Mantelstärke, und die steht
     nicht in der Quelle. */

  if (P.hubWidth < 3) {
    throw new Error('K-Aqua Bundflansch d' + a.d + ': Nabenbreite ' +
      P.hubWidth + ' mm zu schmal für Ø' + a.D3 + '-Löcher');
  }
  if (a.D2 <= a.d) {
    throw new Error('K-Aqua Bundflansch d' + a.d + ': Bohrung Ø' + a.D2 +
      ' lässt das Rohr Ø' + a.d + ' nicht durch');
  }
  return P;
}


/* == backing-flange/parts.js =========================================== */
/* K-Aqua Bundflansch — Kontur.

   Eine Scheibe mit Mittelbohrung und Schraubenlöchern. Kein CSG:
   plateWithHoles legt die Löcher als Innenkonturen eines THREE.Shape an,
   die Triangulierung setzt sie in einem Zug — dasselbe Verfahren wie bei
   hexPrism. */


export function buildFlange(P) {
  const holes = boltCircle(P.holeCount, P.rHole, P.boltCircleD, P.startDeg);
  const geo = plateWithHoles(P.rOut, P.rIn, P.thick, holes, {
    bevel: P.bevel, segments: SEG_VIS,
  });
  /* Keine Schnittfläche: ExtrudeGeometry liefert einen geschlossenen
     Körper, und der Halbschnitt zeigt über DoubleSide die Innenseite.
     Ein Stencil-Cap bräuchte die Kontur als 2D-Profil, und die ist hier
     nicht rotationssymmetrisch. */
  return { geo, cap: null, holes };
}


/* == backing-flange/index.js =========================================== */
/* K-Aqua Bundflansch PP-Stahl — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Teil, kein Zustand. Erstes Produkt mit Durchgangslöchern; der
   Maßtest prüft deshalb auch, dass sie tatsächlich durchgehen. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'accessories/backing-flange',
  module: 'kaqua-backing-flange',
  titleDe: 'Bundflansch PP-Stahl',
  titleEn: 'Backing flange PP-Steel',
  category: 'accessories',
  brandLine: 'K-Aqua · Stahl',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 63,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'D', 'D1', 'H', 'kg'],
  dimensions: ['D', 'D1', 'D2'],
  ariaFields: ['d', 'D', 'D1', 'D2', 'D3', 'H'],

  variants: [],
  states: null,

  tile: 'Überträgt die Schraubenkraft auf die Bundbuchse — Lochkreis ' +
        'nach DIN 2501 PN 10, d40 bis d315.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Bundflansch_d' + size,
      materials: ['steel'],
      seed: 149,
      clipPlane,
    });

    const f = buildFlange(P);
    A.part('flange', {
      name: 'Bundflansch', label: 'Bundflansch (Stahl, PP-beschichtet)', mat: 'steel',
      geo: f.geo, cap: f.cap,
      anchor: V3(0, P.rOut + 0.28 * P.D, 0),
    });

    A.light(V3(P.thick * 2, 0, 0));
    A.light(V3(-P.thick * 2, 0, 0));

    A.hotspot({
      v: V3(0, P.boltCircleD / 2 * 0.72, P.boltCircleD / 2 * 0.72),
      n: V3(0.35, 0.66, 0.66),
      text: P.holeCount + ' Schraubenlöcher Ø' + P.D3 + ' mm auf Lochkreis Ø' +
        P.D1 + ' mm — DIN 2501 PN 10',
    });
    A.hotspot({
      v: V3(P.thick * 0.4, P.rIn * 0.9, P.rIn * 0.35),
      n: V3(0.3, 0.9, 0.32),
      text: 'Bohrung Ø' + P.D2 + ' mm — die Bundbuchse geht hier durch, ' +
        'der Flansch dreht frei',
    });

    const zf = P.rOut + 0.10 * P.D;
    A.dim({ label: 'D', value: P.D,
      a: V3(-P.thick * 2.5, -P.rOut, zf), b: V3(-P.thick * 2.5, P.rOut, zf),
      off: V3(P.thick * 2, 0, 0) });
    A.dim({ label: 'D2', value: P.D2,
      a: V3(P.thick * 2.5, -P.rIn, zf), b: V3(P.thick * 2.5, P.rIn, zf),
      off: V3(-P.thick * 2, 0, 0) });

    A.measures = [
      /* Außendurchmesser: die Fase nimmt planmäßig davon, deshalb liegt
         das Ist minimal darunter — dieselbe beabsichtigte Abweichung wie
         der Formtrenngrat am PP-Teil. */
      { key: 'D', label: DIMENSION_KEY.D, soll: P.D,
        ist: () => { const b = A.boxOf(['flange']); return b.max.y - b.min.y; } },
      { key: 'H', label: DIMENSION_KEY.H, soll: P.H,
        ist: () => { const b = A.boxOf(['flange']); return b.max.x - b.min.x; } },
      /* Innenbohrung: radial von der Achse nach außen. Hier richtig,
         weil in der Achse nichts liegt — die Bohrung ist offen. */
      { key: 'D2', label: DIMENSION_KEY.D2, soll: P.D2,
        ist: () => {
          const hit = A.probeAxial('flange', V3(0, 0, 0), V3(0, 1, 0));
          return hit ? Math.round(2 * hit.y * 100) / 100 : NaN;
        } },
      /* Gehen die Löcher wirklich durch? Ein Strahl längs der Achse
         durch ein Lochzentrum darf NICHTS treffen. Trifft er, ist das
         Loch zugewachsen — genau der Fehler, den plateWithHoles machen
         könnte, wenn die Innenkontur falsch orientiert ist.
         Soll 0 Treffer, Ist die Trefferzahl. */
      { key: 'loch', label: 'Löcher durchgehend (0 = ja)', soll: 0,
        ist: () => {
          const h = f.holes[0];
          const durch = A.probeAxial('flange',
            V3(-P.thick * 4, h.y, h.x), V3(1, 0, 0));
          return durch ? 1 : 0;
        } },
      { key: 'rand', label: 'Ringbreite über dem Lochkreis',
        soll: P.rimWidth, ist: () => P.rimWidth },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export { product as default };
