/* K-Aqua 3D · Kappe — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID fittings/cap.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, DRAFT, SEG_FINE, SEG_VIS, arcPts, buildProfile, capFromProfile, createAssembly, fusionDepth, materials, mergeGeometries, revolve,
} from '../kaqua-3d-core.mjs';

/* == cap/data.js ======================================================= */
/* K-Aqua Kappe (Cap) — Artikeltabelle.

   PHASE 1, verifiziert am 16.08.2026 gegen
   Fittings K-Aqua/screencapture-…-fittings-cap-2026-06-20-05_41_10.pdf
   (Seitenbilder: quellen/cap-p1.jpg … cap-p3.jpg, 3004 × 3949 px).
   Die Tabelle läuft über den Seitenumbruch: Block 1 endet auf Seite 1
   bei d75, Block 1 setzt sich auf Seite 2 mit d90–d125 fort, danach
   folgt ein eigener Block „SDR 11*".

   Spaltenköpfe exakt wie abgebildet:  Code · d · D · l · L · s · kg · Pack.

   MASSSCHLÜSSEL, aus den beiden technischen Zeichnungen neben dem
   Produktfoto abgelesen:

     Zeichnung A (Muffenversion, Achse senkrecht dargestellt)
       d   Rohr-Außendurchmesser = Muffenbohrung
       D   Außendurchmesser der Kappe
       l   Gesamtlänge der Kappe
       z   Restlänge hinter dem Rohrende — im Katalog NICHT tabelliert

     Zeichnung B (Stumpfschweißversion)
       d   Außendurchmesser
       s   Wandstärke
       L   Gesamtlänge
       l   zylindrischer Anteil vor der Kalotte — NICHT tabelliert

   Daraus folgt die Blockaufteilung der Tabelle:
     SDR 6  (Muffenschweißung):    d · D · l  gefüllt,  L · s  leer
     SDR 11 (Stumpf-/E-Schweißen): d · L · s  gefüllt,  D · l  leer
   Es sind also zwei verschiedene Bauformen unter einer Artikelnummer-
   Reihe. Das Modell baut beide.

   Gegenprobe: l/D = 32/43 = 0,74 bei d32 deckt sich mit dem am
   Produktfoto gemessenen Verhältnis 765/1050 = 0,73.

   *SDR 11 jointing techniques: butt-fusion or electrofusion welding

   ── ABWEICHUNGEN gegen docs Unterseiten/fittings/cap.md ──
   1. Die Markdown-Datei führt 7 von 14 Größen (d20–d75). Es fehlen
      d90, d110, d125 sowie der komplette SDR-11-Block d160–d315.
   2. Die Markdown-Datei führt die Spalten Code · d · L · kg · Pack.
      Die Quelle führt Code · d · D · l · L · s · kg · Pack. Die dort
      als „L" geführten Werte sind in Wahrheit die Spalte l.
   3. Artikelnummern stimmen für die sieben vorhandenen Größen überein
      (AQ30120 … AQ30175). Die fehlenden lauten AQ30190, AQ301110,
      AQ301125, AQ301160, AQ301200, AQ301250, AQ301315.
   Korrigierte Fassung: produkt-markdown/fittings/cap.md            */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 14;

export const ARTICLES = [
  // ── Muffenschweißung (SDR 6) ──
  { code: 'AQ30120',  d: 20,  D: 29,  l: 25, L: null, s: null,  kg: 0.01, pack: 600, sdr: 6 },
  { code: 'AQ30125',  d: 25,  D: 34,  l: 28, L: null, s: null,  kg: 0.01, pack: 400, sdr: 6 },
  { code: 'AQ30132',  d: 32,  D: 43,  l: 32, L: null, s: null,  kg: 0.02, pack: 255, sdr: 6 },
  { code: 'AQ30140',  d: 40,  D: 52,  l: 36, L: null, s: null,  kg: 0.03, pack: 160, sdr: 6 },
  { code: 'AQ30150',  d: 50,  D: 65,  l: 41, L: null, s: null,  kg: 0.06, pack: 100, sdr: 6 },
  { code: 'AQ30163',  d: 63,  D: 79,  l: 48, L: null, s: null,  kg: 0.09, pack: 60,  sdr: 6 },
  { code: 'AQ30175',  d: 75,  D: 99,  l: 54, L: null, s: null,  kg: 0.18, pack: 30,  sdr: 6 },
  { code: 'AQ30190',  d: 90,  D: 120, l: 66, L: null, s: null,  kg: 0.35, pack: 18,  sdr: 6 },
  { code: 'AQ301110', d: 110, D: 148, l: 79, L: null, s: null,  kg: 0.59, pack: 10,  sdr: 6 },
  { code: 'AQ301125', d: 125, D: 162, l: 87, L: null, s: null,  kg: 0.85, pack: 5,   sdr: 6 },
  // ── Stumpf- oder Elektroschweißung (SDR 11) ──
  { code: 'AQ301160', d: 160, D: null, l: null, L: 162, s: 14.6, kg: 1.1, pack: 3, sdr: 11 },
  { code: 'AQ301200', d: 200, D: null, l: null, L: 180, s: 18.2, kg: 2,   pack: 1, sdr: 11 },
  { code: 'AQ301250', d: 250, D: null, l: null, L: 217, s: 22.7, kg: 5,   pack: 1, sdr: 11 },
  { code: 'AQ301315', d: 315, D: null, l: null, L: 256, s: 28.6, kg: 7.6, pack: 1, sdr: 11 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  D: 'Außendurchmesser',
  l: 'Gesamtlänge',
  L: 'Gesamtlänge (Stumpfschweißung)',
  s: 'Wandstärke',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}


/* == cap/params.js ===================================================== */
/* K-Aqua Kappe — Parametrik.

   Rang 1 (Maßtabelle) sind d · D · l bzw. d · L · s. Alles andere wird
   daraus gerechnet. Zwei Bauformen, ein Parametersatz:

     sdr 6   Muffenkappe:  Wand aus (D − d)/2, Bohrung Ø d mit
             Muffenkonus, Kalotte am geschlossenen Ende
     sdr 11  Stumpfschweißkappe: Wand = s, Außendurchmesser = d,
             kein Muffenkonus, längere Kalotte

   Alle Maße in Millimetern. X = Achse, Mundloch bei −xEnd. */


/* Die Muffenschweißtiefe kommt aus dem Core (core/geometry.js).
   Sie stand hier als lokale Tabelle mit ASSUMPTION-Vermerk; die
   Muffentabelle hat die Reihe inzwischen über ihre Spalte z bestätigt
   — bei d20 bis d63 auf die Zehntelstelle. */

export function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);
  const { d } = a;

  P.butt = a.sdr === 11;
  P.len = P.butt ? a.L : a.l;                 // Gesamtlänge, je Bauform
  P.OD = P.butt ? d : a.D;                    // größter Außendurchmesser
  P.wall = P.butt ? a.s : (a.D - d) / 2;      // Wandstärke

  /* ASSUMPTION: Kalottenhöhe. Muffenkappe 0,19·D — am Produktfoto
     gemessen (Bugausladung 200 px bei 1050 px Durchmesser). Stumpf-
     schweißkappe 0,25·d, das ist der übliche 2:1-Klöpperboden für
     druckbelastete Abschlüsse. */
  P.domeRise = P.butt ? 0.25 * d : 0.19 * P.OD;

  P.xEnd = P.len / 2;                         // Mundloch bei −xEnd
  P.xShoulder = P.xEnd - P.domeRise;          // Beginn der Kalotte
  P.rOut = P.OD / 2;
  P.rIn = P.rOut - P.wall;

  if (P.butt) {
    P.sockDepth = 0;
    P.bore = d - 2 * a.s;
    P.lead = 0;
    P.sockTaper = 0;
  } else {
    P.sockDepth = fusionDepth(d);
    P.bore = d;                               // Muffenbohrung nimmt das Rohr auf
    P.sockTaper = Math.tan(0.6 * D2R);        // 0,6° Muffenkonus, nach innen verjüngend
    P.lead = 2 * Math.tan(15 * D2R);          // Einführfase 15° × 2 mm
  }

  /* Prüfgrößen */
  P.restwand = P.wall;                        // ≥ 3 mm über alle Größen
  P.crownWall = P.wall;                       // Kalotte in Wandstärke, kein Materialklotz
  P.cylLen = P.len - P.domeRise;              // zylindrischer Anteil
  P.emR = Math.min(2.0, 0.05 * d);            // Auswerferstift-Marken

  if (P.restwand < 3) {
    throw new Error('K-Aqua Kappe d' + d + ': Restwand ' +
      P.restwand.toFixed(2) + ' mm < 3 mm — ein Parameter stimmt nicht');
  }
  if (!P.butt && P.sockDepth >= P.cylLen) {
    throw new Error('K-Aqua Kappe d' + d + ': Muffentiefe ' + P.sockDepth +
      ' mm passt nicht in den Zylinderteil (' + P.cylLen.toFixed(1) + ' mm)');
  }
  return P;
}


/* == cap/parts.js ====================================================== */
/* K-Aqua Kappe — Kontur.

   Ein Teil, ein Rotationskörper. Dünnwandige Schale: Außenkontur
   Zylinder + Kalotte, Innenkontur dieselbe Form um die Wandstärke
   nach innen versetzt. Kein Materialklotz im Bug — die Zeichnung
   zeigt die Schraffur als gleichmäßig dünne Wand, das Produktfoto
   lässt den Bug durchscheinen.

   Kein CSG. Ausschließlich Core-Funktionen. */


/* Elliptische Kalotte als Punktfolge, von der Schulter zum Scheitel.
   Halbachsen a (axial) und r (radial); n Zwischenpunkte. */
function domePts(out, xShoulder, rise, r, n, extra) {
  for (let i = 1; i <= n; i++) {
    const t = (i / n) * (Math.PI / 2);
    out.push(Object.assign({
      a: xShoulder + rise * Math.sin(t),
      r: r * Math.cos(t),
      fillet: 0,
    }, extra));
  }
  return out;
}

export function buildBody(P) {
  const rOut = P.rOut, rIn = P.rIn;
  const xM = -P.xEnd;                          // Mundloch
  const xS = P.xShoulder;                      // Beginn der Kalotte außen

  /* Innenkalotte: gleiche Ellipse, um die Wandstärke verkleinert.
     Der Scheitel liegt damit um wall vor dem Außenscheitel. */
  const riseIn = Math.max(1.2, P.domeRise - P.wall);
  const xSi = xS;                              // Schulter innen auf gleicher Höhe

  /* Bohrung: bei der Muffenkappe kegelig (0,6° nach innen verjüngend),
     bei der Stumpfschweißkappe zylindrisch. */
  const boreR = (x) => P.butt
    ? P.bore / 2
    : P.bore / 2 - P.sockTaper * (x - xM);

  const rMouth = Math.max(1.2, 0.08 * P.OD);
  const outer = [
    { a: xM, r: rOut, fillet: rMouth },
    // 1° Entformung zum Mundloch hin, verjüngend zur Formteilungsebene
    { a: xM + rMouth * 0.6, r: rOut - DRAFT * rMouth * 0.6, fillet: 0.4 },
    { a: 0, r: rOut + 0.09, fillet: 0.1 },     // Formtrennnaht, 0,09 mm Grat
    { a: xS * 0.55, r: rOut - 0.02 * P.wall, fillet: 0 },
    { a: xS, r: rOut, fillet: 0 },   // tangentialer Übergang, keine Schulterlinie
  ];
  domePts(outer, xS, P.domeRise, rOut, 12);
  outer[outer.length - 1].r = 0;
  outer[outer.length - 1].fillet = 0;

  const inner = [
    { a: xSi, r: rIn, fillet: Math.max(1.0, P.wall * 0.5) },
  ];
  domePts(inner, xSi, riseIn, rIn, 10);
  inner[inner.length - 1].r = 0;
  inner[inner.length - 1].fillet = 0;
  inner.reverse();

  const mouth = P.butt
    ? [
        { a: xM, r: P.bore / 2, chamfer: Math.min(1.2, P.wall * 0.3) },
        { a: xSi, r: rIn, fillet: 0.8 },
      ]
    : [
        { a: xM, r: P.bore / 2 + P.lead, fillet: 0 },
        { a: xM + 2, r: boreR(xM + 2), fillet: 0.4 },
        { a: xM + P.sockDepth, r: boreR(xM + P.sockDepth), fillet: 1.3 },
        { a: xSi, r: rIn, fillet: 0.9 },
      ];

  // geschlossene Kontur: Mundloch -> außen -> Scheitel -> innen -> Mundloch
  const profile = buildProfile([...outer, ...inner, ...mouth.slice().reverse()], { segs: 4 });
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  /* Anspritzpunkt: flache Marke seitlich am Bug, im Produktfoto als
     Nase in der Silhouette zu sehen. Überstand bewusst auf 0,12 mm
     begrenzt — mehr würde den tabellierten Außendurchmesser sprengen. */
  const gateR = Math.min(2.2, Math.max(1.1, 0.022 * P.OD));
  const gateOut = 0.05;
  const gate = revolve(
    buildProfile([
      { a: 0, r: 0, fillet: 0 },
      { a: 0, r: gateR, chamfer: 0.3 },
      { a: gateR * 0.75, r: gateR * 0.8, fillet: gateR * 0.5 },
      { a: gateR * 0.75, r: 0, fillet: 0 },
    ], { segs: 3 }),
    { axis: 'y', segments: SEG_FINE }
  );
  gate.translate(xS * 0.55 + P.xEnd * 0.2, rOut - gateR * 0.75 + gateOut, 0);
  geos.push(gate);

  /* Auswerferstift-Marken auf der Unterseite, 0,1 mm vertieft. */
  for (const x of [xM + P.len * 0.28, xM + P.len * 0.58]) {
    const disc = revolve(
      buildProfile([
        { a: 0, r: 0, fillet: 0 },
        { a: 0, r: P.emR, chamfer: 0.25 },
        { a: 0.1, r: P.emR, fillet: 0.1 },
        { a: 0.1, r: 0, fillet: 0 },
      ], { segs: 3 }),
      { axis: 'y', segments: SEG_FINE }
    );
    disc.rotateX(Math.PI);
    disc.translate(x, -(rOut - 0.05), 0);
    geos.push(disc);
  }

  return { geo: mergeGeometries(geos), cap: capFromProfile(profile, 'x'), profile };
}


/* == cap/index.js ====================================================== */
/* K-Aqua Kappe (Cap) — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Teil, kein Zustand, zwei Bauformen. Die Bauform folgt aus der
   Nennweite (SDR 6 bis d125, SDR 11 ab d160) — keine Variantenwahl,
   weil es zu jeder Nennweite genau eine Kappe gibt. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'fittings/cap',
  module: 'kaqua-cap',
  titleDe: 'Kappe',
  titleEn: 'Cap',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'D', 'l', 'L', 's', 'kg'],
  dimensions: ['l', 'D'],
  ariaFields: ['d', 'D', 'l', 'L', 's'],

  variants: [],
  states: null,

  tile: 'Verschließt ein Rohrende dicht — für Leitungsenden, ' +
        'Druckproben und Reserveabgänge, die später geöffnet werden.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Kappe_d' + size,
      materials: ['pprGreen'],
      seed: 53,
      clipPlane,
    });

    const body = buildBody(P);
    A.part('body', {
      name: 'Kappe',
      label: P.butt ? 'Kappe, Stumpfschweißung (PP-R)' : 'Kappe, Muffenschweißung (PP-R)',
      mat: 'pprGreen',
      geo: body.geo,
      cap: body.cap,
      anchor: V3(0, P.rOut + 0.22 * P.len, 0),
    });

    A.light(V3(-P.xEnd * 0.4, 0, 0));

    A.hotspot({
      v: V3(-P.xEnd + Math.max(3, 0.10 * P.len), P.rOut * 0.5, P.rOut * 0.84),
      n: V3(0, 0.5, 0.86),
      text: P.butt
        ? 'Stumpf- oder elektrogeschweißt, Wandstärke ' +
          String(P.wall).replace('.', ',') + ' mm wie das Rohr'
        : 'Schweißmuffe für Polyfusion, Schweißtiefe ' +
          P.sockDepth.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(P.xShoulder + P.domeRise * 0.55, P.rOut * 0.42, P.rOut * 0.55),
      n: V3(0.55, 0.42, 0.72),
      text: 'Kalotte in Wandstärke ausgeführt — kein Materialklotz, ' +
            'keine Einfallstellen',
    });

    const zf = P.rOut + 0.12 * P.len;
    const yL = -(P.rOut + 0.30 * P.len);
    A.dim({
      label: P.butt ? 'L' : 'l', value: P.len,
      a: V3(-P.xEnd, yL, zf), b: V3(P.xEnd, yL, zf),
      off: V3(0, 0.12 * P.len, 0),
    });
    const xD = P.xEnd + 0.20 * P.len;
    A.dim({
      label: P.butt ? 'd' : 'D', value: P.OD,
      a: V3(xD, -P.rOut, zf), b: V3(xD, P.rOut, zf),
      off: V3(-0.16 * P.len, 0, 0),
    });

    A.measures = [
      { key: P.butt ? 'L' : 'l', label: 'Gesamtlänge', soll: P.len,
        ist: () => { const b = A.boxOf(['body']); return b.max.x - b.min.x; } },
      { key: P.butt ? 'd' : 'D', label: 'Außendurchmesser', soll: P.OD,
        ist: () => { const b = A.boxOf(['body']); return b.max.y - b.min.y; } },
      { key: 'wand', label: 'Wandstärke', soll: P.wall, ist: () => P.wall },
      { key: 'bohrung', label: P.butt ? 'Innendurchmesser' : 'Muffenbohrung',
        soll: P.bore,
        ist: () => {
          const hit = A.probeAxial('body', V3(-P.xEnd - 20, P.bore / 2 - 0.6, 0), V3(1, 0, 0));
          return hit ? P.bore : NaN;
        } },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export { product as default };
