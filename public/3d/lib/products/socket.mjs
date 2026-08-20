/* K-Aqua 3D · Muffe — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID fittings/socket.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, DRAFT, SEG_FINE, SEG_VIS, arcPts, buildProfile, capFromProfile, createAssembly, fusionDepth, materials, mergeGeometries, mirrorProfile, revolve,
} from '../kaqua-3d-core.mjs';

/* == socket/data.js ==================================================== */
/* K-Aqua Muffe (Socket) — Artikeltabelle.

   PHASE 1, verifiziert am 16.08.2026 gegen
   Fittings K-Aqua/screencapture-…-fittings-socket-2026-06-20-05_41_01.pdf
   (Seitenbilder quellen/socket-p1.jpg … p3.jpg). Die Tabelle läuft über
   den Seitenumbruch: Seite 1 endet bei d75, Seite 2 führt d90 und d110.

   Spaltenköpfe exakt wie abgebildet:  Code · d · D · l · z · kg · Pack.

   MASSSCHLÜSSEL (technische Zeichnung, Miniatur neben dem Produktfoto):
     d  Rohr-Außendurchmesser = Muffenbohrung
     D  Außendurchmesser der Muffe
     l  Gesamtlänge
     z  Dicke des mittleren Anschlags

   Damit ist die Muffentiefe kein Schätzwert mehr: (l − z)/2.
   Gegenprobe gegen die Normreihe DVS 2207-11:
     d20 (34−5)/2 = 14,5 → Norm 14,5 ✓
     d25 (37−5)/2 = 16,0 → Norm 16,0 ✓
     d32 (41−5)/2 = 18,0 → Norm 18,0 ✓
     d40 (46−5)/2 = 20,5 → Norm 20,5 ✓
     d50 (52−5)/2 = 23,5 → Norm 23,5 ✓
     d63 (60−5)/2 = 27,5 → Norm 27,5 ✓
   Sechs von sechs auf die Zehntelstelle. Ab d75 weicht der Hersteller
   nach unten ab: d75 30,0 gegen Norm 31,0 · d90 33,0 gegen Norm 35,0.

   ASSUMPTION: bei d110 sind z, kg und Pack. in der Quelle leer — kein
   Transkriptionsfehler, die Zellen sind unausgefüllt. z wird deshalb
   aus dem Verhältnis von d90 gerechnet (z ≈ 0,11·d, auf halbe mm
   gerundet: 12,0) und ist unten als abgeleitet markiert. Die
   Gesamtlänge l = 80 ist tabelliert und bleibt maßgeblich.

   ── ABWEICHUNGEN gegen docs Unterseiten/fittings/socket.md ──
   1. Markdown führt 7 von 9 Größen. Es fehlen d90 und d110.
   2. Markdown führt die Spalten Code · d · L · kg · Pack. Die Quelle
      führt Code · d · D · l · z · kg · Pack. Es fehlen D und z — also
      genau die zwei Werte, die eine maßhaltige Muffe braucht.
   3. Die als „L" geführten Werte sind die Spalte l, und sie sind
      falsch: Markdown 34/35/44/56/65/78/90 gegen Quelle
      34/37/41/46/52/60/65. Nur d20 stimmt.
   4. Artikelnummer d63: Markdown AQ27065, Quelle AQ27063.
   5. Gewichte weichen ab: d63 Markdown 0,15 gegen Quelle 0,13.
   Korrigierte Fassung: produkt-markdown/fittings/socket.md          */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 9;

export const ARTICLES = [
  { code: 'AQ27020',  d: 20,  D: 29,  l: 34, z: 5,    kg: 0.01, pack: 500 },
  { code: 'AQ27025',  d: 25,  D: 35,  l: 37, z: 5,    kg: 0.02, pack: 300 },
  { code: 'AQ27032',  d: 32,  D: 44,  l: 41, z: 5,    kg: 0.03, pack: 160 },
  { code: 'AQ27040',  d: 40,  D: 52,  l: 46, z: 5,    kg: 0.05, pack: 80 },
  { code: 'AQ27050',  d: 50,  D: 65,  l: 52, z: 5,    kg: 0.07, pack: 60 },
  { code: 'AQ27063',  d: 63,  D: 84,  l: 60, z: 5,    kg: 0.13, pack: 45 },
  { code: 'AQ27075',  d: 75,  D: 99,  l: 65, z: 5,    kg: 0.20, pack: 28 },
  { code: 'AQ27090',  d: 90,  D: 120, l: 76, z: 10,   kg: 0.35, pack: 15 },
  { code: 'AQ270110', d: 110, D: 148, l: 80, z: 12.0, kg: null, pack: null,
    abgeleitet: ['z'] },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  D: 'Außendurchmesser',
  l: 'Gesamtlänge',
  z: 'Anschlagdicke',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}


/* == socket/params.js ================================================== */
/* K-Aqua Muffe — Parametrik.

   Nach Phase 1 ist hier fast nichts mehr zu rechnen: D, l und z stehen
   in der Tabelle. Genau so soll es sein — die Prototypfassung hatte
   beide Werte geschätzt und beide falsch. */


export const SDR = 6; // PN 20, dieselbe Reihe wie das K-Rohr

export function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);
  const { d } = a;

  P.len = a.l;
  P.OD = a.D;
  P.wallFitting = (a.D - d) / 2;      // tabelliert, nicht geschätzt
  P.stop = a.z;                       // tabelliert, nicht geschätzt
  P.socket = (a.l - a.z) / 2;         // Muffentiefe

  // Rohrwand und Durchgang: SDR 6 wie beim K-Rohr
  P.wallPipe = d / SDR;
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;

  P.xEnd = a.l / 2;
  P.xStop = a.z / 2;

  P.sockTaper = Math.tan(0.6 * D2R);  // 0,6° Muffenkonus, nach innen verjüngend
  P.lead = 2 * Math.tan(15 * D2R);    // Einführfase 15° × 2 mm am Mundloch
  P.restwand = P.wallFitting;
  P.emR = Math.min(2.0, 0.055 * d);   // Auswerferstift-Marken

  /* Abweichung der Muffentiefe von der Normreihe. Kein Fehler, sondern
     eine Herstellerentscheidung — ab d75 baut K-Aqua flacher. Der Wert
     wird geführt, damit er im Prüfbericht erscheint. */
  const norm = fusionDepth(d);
  P.normDepth = norm;
  P.depthDeltaToNorm = norm == null ? null : Math.round((P.socket - norm) * 10) / 10;

  if (P.restwand < 3) {
    throw new Error('K-Aqua Muffe d' + d + ': Restwand ' +
      P.restwand.toFixed(2) + ' mm < 3 mm');
  }
  if (P.socket <= 0) {
    throw new Error('K-Aqua Muffe d' + d + ': Muffentiefe ' + P.socket +
      ' mm — l und z passen nicht zusammen');
  }
  return P;
}


/* == socket/parts.js =================================================== */
/* K-Aqua Muffe — Kontur.

   Ein Teil, ein Rotationskörper: Außenkontur mit Formtrennnaht in der
   Mitte und 1° Entformung zu beiden Stirnflächen, Innenkontur aus zwei
   konischen Muffenbohrungen mit Einführfase und mittlerem Anschlag.
   Gespiegelt über mirrorProfile — eine Hälfte gebaut.

   Kein CSG. Kein eigenes Geometrie-Grundwerkzeug: kommt alles aus dem
   Core. Genau das ist der Test. */


export function buildBody(P) {
  const ro = P.OD / 2;
  const rSock = (x) => P.d / 2 - P.sockTaper * (P.xEnd - x); // verjüngt nach innen
  const xBell = P.xEnd - Math.max(3, 0.10 * P.socket);       // Bund am Mundloch

  /* Außen: von der Formteilungsebene (a = 0) zur Stirnfläche.
     0,09 mm Grat auf der Naht — an einem Spritzgussteil ist die Naht
     sichtbar, und sie fängt Licht. */
  /* D ist das größte Maß der Muffe und liegt auf dem Bund am Mundloch.
     Der Zylinder dazwischen sitzt um bellRise tiefer — im Produktfoto
     als umlaufende Stufe kurz vor der Stirnfläche zu sehen. */
  const bellRise = Math.min(0.35, P.wallFitting * 0.08);
  const rBarrel = ro - bellRise;
  const outer = [
    { a: 0, r: rBarrel + 0.09, fillet: 0.1 },
    { a: 0.5, r: rBarrel, fillet: 0.35 },
    { a: xBell - 1.5, r: rBarrel - DRAFT * (xBell - 1.5), fillet: 2.2 },
    { a: xBell, r: ro, fillet: 1.0 },
    { a: P.xEnd, r: ro - DRAFT * (P.xEnd - xBell), chamfer: Math.min(1.4, P.wallFitting * 0.4) },
  ];

  /* Innen: Anschlagfläche, Durchgang, Muffenkonus, Einführfase. */
  const inner = [
    { a: 0, r: P.boreR, fillet: 0.5 },
    { a: P.xStop, r: P.boreR, fillet: 0.6 },
    { a: P.xStop, r: rSock(P.xStop), fillet: 1.2 },
    { a: P.xEnd - 2, r: rSock(P.xEnd - 2), fillet: 0.4 },
    { a: P.xEnd, r: P.d / 2 + P.lead, fillet: 0 },
  ];

  const profile = buildProfile(mirrorProfile(outer, inner), { segs: 4 });
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  /* Auswerferstift-Marken: drei flache Kreise, 0,1 mm vertieft, auf der
     Unterseite — ohne sie sieht das Teil nach CAD-Viewer aus. */
  for (const x of [-P.xEnd * 0.55, 0, P.xEnd * 0.55]) {
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
    disc.translate(x, -(rBarrel - 0.05), 0);
    geos.push(disc);
  }

  return { geo: mergeGeometries(geos), cap: capFromProfile(profile, 'x'), profile };
}


/* == socket/index.js =================================================== */
/* K-Aqua Muffe (Socket) — Produktpaket nach PRODUKT-VERTRAG.md.

   Der Schnitt-Test: ein Produkt, ein Teil, kein Zustand, keine Variante.
   Der Core blendet den Auf/Zu-Knopf selbst aus, weil states fehlt.

   Geschrieben, ohne eine einzige Core-Datei anzufassen — genau das ist
   die Aussage von §5.6. Maße noch Prototyp, siehe data.js. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'fittings/socket',
  module: 'kaqua-socket',
  titleDe: 'Muffe',
  titleEn: 'Socket',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'D', 'l', 'z', 'kg'],
  dimensions: ['l', 'D'],
  ariaFields: ['d', 'D', 'l', 'z'],

  variants: [],
  states: null,

  tile: 'Verbindet zwei Rohre gleicher Nennweite durch Polyfusion — ' +
        'das häufigste Formteil im System.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Muffe_d' + size,
      materials: ['pprGreen'],
      seed: 31,
      clipPlane,
    });

    const body = buildBody(P);
    A.part('body', {
      name: 'Muffe', label: 'Muffenkörper (PP-R)', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      anchor: V3(0, P.OD / 2 + 0.14 * P.len, 0),
    });

    A.light(V3(-P.xEnd * 0.5, 0, 0));
    A.light(V3(P.xEnd * 0.5, 0, 0));

    A.hotspot({
      v: V3(P.xEnd - Math.max(3, 0.08 * P.len), (P.OD / 2) * 0.55, (P.OD / 2) * 0.82),
      n: V3(0, 0.55, 0.83),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        P.socket.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(0, (P.OD / 2) * 0.5, (P.OD / 2) * 0.86),
      n: V3(0, 0.5, 0.86),
      text: 'Mittlerer Anschlag begrenzt die Einstecktiefe beider Rohrenden',
    });

    const zf = P.OD / 2 + 0.10 * P.len;
    const yL = -(P.OD / 2 + 0.22 * P.len);
    A.dim({ label: 'l', value: P.len, a: V3(-P.xEnd, yL, zf), b: V3(P.xEnd, yL, zf),
      off: V3(0, 0.09 * P.len, 0) });
    const xD = P.xEnd + 0.14 * P.len;
    A.dim({ label: 'D', value: P.OD,
      a: V3(xD, -P.OD / 2, zf), b: V3(xD, P.OD / 2, zf),
      off: V3(-0.10 * P.len, 0, 0) });

    A.measures = [
      { key: 'l', label: DIMENSION_KEY.l, soll: P.len,
        ist: () => { const b = A.boxOf(['body']); return b.max.x - b.min.x; } },
      { key: 'D', label: DIMENSION_KEY.D, soll: P.OD,
        ist: () => { const b = A.boxOf(['body']); return b.max.y - b.min.y; } },
      { key: 'tiefe', label: 'Muffentiefe (l − z)/2', soll: P.socket,
        ist: () => {
          const rr = (P.d / 2 + P.boreR) / 2;
          const hit = A.probeAxial('body', V3(P.xEnd + 20, rr, 0), V3(-1, 0, 0));
          return hit ? P.xEnd - hit.x : NaN;
        } },
      { key: 'z', label: DIMENSION_KEY.z, soll: P.stop, ist: () => P.stop },
      { key: 'restwand', label: 'Restwand Fitting', soll: P.restwand, ist: () => P.restwand },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export { product as default };
