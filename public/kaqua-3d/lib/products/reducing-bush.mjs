/* K-Aqua 3D · Reduzierbuchse — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID fittings/reducing-bush.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, DRAFT, SEG_FINE, SEG_VIS, buildProfile, capFromProfile, createAssembly, fusionDepth, materials, mergeGeometries, revolve,
} from '../kaqua-3d-core.mjs';

/* == reducing-bush/data.js ============================================= */
/* K-Aqua Reduzierbuchse — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Fittings K-Aqua/screencapture-…-fittings-reducing-bush-….pdf
   (quellen/x-reducing-bush-p1.jpg, -p2.jpg).

   Spaltenköpfe: Code · d · d1 · D · l · z · l1 · s · s1 · kg · Pack.
   Die Spalten l1, s und s1 sind in JEDER Zeile ein Gedankenstrich —
   sie gelten für Stumpfschweißvarianten. Nicht übernommen.

   ERSTES PRODUKT MIT ZWEI NENNWEITEN. 17 Zeilen, aber nur 5
   verschiedene Werte für d — die Zeile wird erst durch das Paar
   (d, d1) eindeutig. Deshalb trägt jede Zeile einen zusammengesetzten
   Schlüssel `key`, und das Produkt nennt ihn über sizeKey. Der Core
   adressiert Größen seitdem über dieses Feld statt über d.

   MASSSCHLÜSSEL:
     d   Außendurchmesser des Zapfens — versinkt in einer d-Muffe.
         Das ist der GRÖSSTE Durchmesser des Teils.
     d1  Nennmaß der Innenmuffe — nimmt ein d1-Rohr auf
     D   Außendurchmesser des vorstehenden Muffenkragens
     l   Gesamtlänge
     z   Einbaulänge

   ── WIE D GELESEN WERDEN MUSS ──
   Der erste Modellversuch nahm D als größten Außendurchmesser (Bund).
   Der Maßtest hat das widerlegt: dann müsste D immer über d liegen.

     d32 / d1=20 → D = 29   (D unter d)
     d63 / d1=20 → D = 34   (D weit unter d)

   D korreliert nicht mit d, sondern mit d1:
     d1=20 → 29 · 25 → 34 · 32 → 43 · 40 → 52 · 50 → 65 · 63 → 80
   Das sind bis auf Rundung die Außendurchmesser der Muffen derselben
   Nennweite (Muffe d20: D = 29 · d40: 52 · d50: 65).

   Die Buchse ist also ein dicker Zapfen Ø d, der in der d-Muffe
   versinkt, mit einem dünneren d1-Muffenkragen Ø D davor. Der Kragen
   kann dicker oder dünner als der Zapfen sein — die Kontur trägt
   beide Richtungen. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 17;
export const SDR = 6;

export const ARTICLES = [
  { key: '25x20', code: 'A02432520', d: 25, d1: 20, D: 29, l: 36, z: 22, kg: 0.01, pack: 400 },
  { key: '32x20', code: 'A02433220', d: 32, d1: 20, D: 29, l: 37, z: 23, kg: 0.02, pack: 325 },
  { key: '32x25', code: 'A02433225', d: 32, d1: 25, D: 34, l: 39, z: 23, kg: 0.02, pack: 325 },
  { key: '40x20', code: 'A02434020', d: 40, d1: 20, D: 34, l: 43, z: 28, kg: 0.02, pack: 210 },
  { key: '40x25', code: 'A02434025', d: 40, d1: 25, D: 34, l: 43, z: 27, kg: 0.02, pack: 195 },
  { key: '40x32', code: 'A02434032', d: 40, d1: 32, D: 43, l: 45, z: 27, kg: 0.03, pack: 180 },
  { key: '50x20', code: 'A02435020', d: 50, d1: 20, D: 43, l: 51, z: 36, kg: 0.04, pack: 160 },
  { key: '50x25', code: 'A02435025', d: 50, d1: 25, D: 43, l: 51, z: 35, kg: 0.05, pack: 120 },
  { key: '50x32', code: 'A02435032', d: 50, d1: 32, D: 43, l: 51, z: 33, kg: 0.05, pack: 120 },
  { key: '50x40', code: 'A02435040', d: 50, d1: 40, D: 52, l: 53, z: 35, kg: 0.05, pack: 80 },
  { key: '63x20', code: 'A02436320', d: 63, d1: 20, D: 34, l: 56, z: 42, kg: 0.08, pack: 75 },
  { key: '63x25', code: 'A02436325', d: 63, d1: 25, D: 34, l: 56, z: 40, kg: 0.08, pack: 60 },
  { key: '63x32', code: 'A02436332', d: 63, d1: 32, D: 43, l: 58, z: 40, kg: 0.08, pack: 50 },
  { key: '63x40', code: 'A02436340', d: 63, d1: 40, D: 52, l: 60, z: 40, kg: 0.08, pack: 50 },
  { key: '63x50', code: 'A02436350', d: 63, d1: 50, D: 65, l: 63, z: 40, kg: 0.09, pack: 60 },
  { key: '75x50', code: 'A02437550', d: 75, d1: 50, D: 65, l: 67, z: 44, kg: 0.12, pack: 36 },
  { key: '75x63', code: 'A02437563', d: 75, d1: 63, D: 80, l: 71, z: 44, kg: 0.15, pack: 24 },
];

export const SIZES = ARTICLES.map((a) => a.key);

export const DIMENSION_KEY = {
  d: 'Zapfen-Nennmaß',
  d1: 'Muffen-Nennmaß',
  D: 'Außendurchmesser',
  l: 'Gesamtlänge',
  z: 'Einbaulänge',
};

export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}


/* == reducing-bush/params.js =========================================== */
/* K-Aqua Reduzierbuchse — Parametrik.

   Zwei Nennweiten: d außen (Zapfen), d1 innen (Muffe). Alles Weitere
   aus D, l und z gerechnet. */


export function params(key) {
  const a = article(key);
  const P = Object.assign({}, a);

  P.len = a.l;
  P.xEnd = a.l / 2;
  /* d ist der GRÖSSTE Durchmesser (Zapfen), D der des vorstehenden
     Muffenkragens — nachgewiesen über die Korrelation von D mit d1
     und den Muffen-Außendurchmessern, siehe data.js. */
  P.rSpigot = a.d / 2;              // Zapfen, versinkt in der d-Muffe
  P.rCollar = a.D / 2;              // vorstehender d1-Muffenkragen
  P.OD = Math.max(a.d, a.D);        // Silhouettenmaß
  P.rOut = P.OD / 2;
  P.rSockIn = a.d1 / 2;             // Innenmuffe für das d1-Rohr

  /* Muffentiefen aus der Normreihe — dieselbe Begründung wie bei
     Winkel und T-Stück: ein Schweißwerkzeug je Nennweite. Die Buchse
     hat zwei, eine je Seite. */
  P.socketIn = fusionDepth(a.d1) ?? Math.max(8, a.d1 * 0.55);
  P.spigotLen = fusionDepth(a.d) ?? Math.max(8, a.d * 0.55);

  P.wallPipe = a.d1 / (6);
  P.bore = a.d1 - 2 * P.wallPipe;
  P.boreR = P.bore / 2;

  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);
  P.restwand = (a.D - a.d1) / 2;    // Wand des Muffenkragens
  P.spigotWall = (a.d - a.d1) / 2;  // Wand am Zapfen über der d1-Bohrung
  P.emR = Math.min(1.6, 0.045 * a.d);

  /* Zapfenlänge = Schweißtiefe der d-Muffe, in der die Buchse sitzt.
     Der Rest der Länge ist der vorstehende Kragen. */
  P.spigotLenUsed = Math.min(P.spigotLen, a.l - Math.max(3, P.socketIn * 0.35));
  P.collarLen = a.l - P.spigotLenUsed;

  if (P.restwand < 1.2 || P.spigotWall < 1.2) {
    throw new Error('K-Aqua Reduzierbuchse ' + a.key + ': Wand ' +
      Math.min(P.restwand, P.spigotWall).toFixed(2) + ' mm zu dünn');
  }
  if (P.socketIn >= a.l - 2) {
    throw new Error('K-Aqua Reduzierbuchse ' + a.key + ': Muffentiefe ' +
      P.socketIn + ' mm passt nicht in die Länge ' + a.l + ' mm');
  }
  return P;
}


/* == reducing-bush/parts.js ============================================ */
/* K-Aqua Reduzierbuchse — Kontur.

   Ein Rotationskörper: außen Zapfen Ø d mit Bund Ø D, innen eine
   konische Schweißmuffe für d1 mit Einführfase, dahinter der
   Durchgang. Kein CSG.

   Die Bohrung ist die engste Stelle des ganzen Systems — deshalb
   trägt sie hier die Sichtsegmentzahl, nicht die Innensegmentzahl:
   im Halbschnitt ist sie das, worauf man schaut. */


export function buildBush(P) {
  const xA = -P.xEnd;               // Zapfenstirn, versinkt in der d-Muffe
  const xB = P.xEnd;                // Mundloch des d1-Kragens
  const xStep = xA + P.spigotLenUsed;   // Übergang Zapfen → Kragen

  const rSock = (x) => P.rSockIn - P.sockTaper * (xB - x);
  /* Der Kragen kann dicker ODER dünner als der Zapfen sein: bei
     d25/d20 ist D = 29 > d = 25, bei d63/d20 ist D = 34 < d = 63.
     Die Kontur muss beide Richtungen tragen. */
  const stepUp = P.rCollar > P.rSpigot;

  const outer = [
    { a: xA, r: P.rSpigot - 0.5, chamfer: 0.9 },        // Einführfase am Zapfen
    { a: xA + 1.4, r: P.rSpigot, fillet: 0.4 },
    { a: xStep - 0.8, r: P.rSpigot - DRAFT * (xStep - 0.8 - xA), fillet: 0.5 },
    { a: xStep, r: P.rCollar, fillet: stepUp ? 1.0 : Math.min(1.4, P.restwand * 0.4) },
    { a: xB, r: P.rCollar - DRAFT * P.collarLen, chamfer: Math.min(1.2, P.restwand * 0.35) },
  ];
  const inner = [
    { a: xB, r: P.rSockIn + P.lead, fillet: 0 },
    { a: xB - 2, r: rSock(xB - 2), fillet: 0.4 },
    { a: xB - P.socketIn, r: rSock(xB - P.socketIn), fillet: 1.0 },
    { a: xB - P.socketIn, r: P.boreR, fillet: 0.8 },
    { a: xA + 1.2, r: P.boreR, chamfer: 0.6 },
    { a: xA, r: P.boreR + 0.6, fillet: 0 },
  ];

  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  /* Zwei Auswerfermarken auf dem Bund. */
  for (const th of [0, Math.PI]) {
    const disc = revolve(buildProfile([
      { a: 0, r: 0, fillet: 0 },
      { a: 0, r: P.emR, chamfer: 0.2 },
      { a: 0.08, r: P.emR, fillet: 0.08 },
      { a: 0.08, r: 0, fillet: 0 },
    ], { segs: 3 }), { axis: 'y', segments: SEG_FINE });
    disc.rotateX(Math.PI);
    const rr = P.rCollar - 0.04;
    disc.translate(xStep + P.collarLen * 0.5, rr * Math.cos(th), rr * Math.sin(th));
    geos.push(disc);
  }

  return { geo: mergeGeometries(geos), cap: capFromProfile(profile, 'x'), profile };
}


/* == reducing-bush/index.js ============================================ */
/* K-Aqua Reduzierbuchse — Produktpaket nach PRODUKT-VERTRAG.md.

   Erstes Produkt mit zwei Nennweiten. sizeKey nennt das Feld, über das
   der Core Größen adressiert — bei 17 Zeilen mit nur 5 verschiedenen
   Werten für d wäre d nicht eindeutig. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'fittings/reducing-bush',
  module: 'kaqua-reducing-bush',
  titleDe: 'Reduzierbuchse',
  titleEn: 'Reducing bush',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'key',
  sizeLabel: (k) => 'd' + String(k).replace('x', ' → d'),
  sizeTitle: 'Übergang',
  defaultSize: '40x25',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'd1', 'D', 'l', 'kg'],
  dimensions: ['l', 'D'],
  ariaFields: ['d', 'd1', 'D', 'l', 'z'],

  variants: [],
  states: null,

  tile: 'Übergang auf die nächstkleinere Nennweite — Zapfen außen, ' +
        'Schweißmuffe innen. 17 Kombinationen von d25 bis d75.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Reduzierbuchse_' + P.key,
      materials: ['pprGreen'],
      seed: 109,
      clipPlane,
    });

    const body = buildBush(P);
    A.part('body', {
      name: 'Reduzierbuchse', label: 'Reduzierbuchse (PP-R)', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      anchor: V3(0, P.rOut + 0.30 * P.len, 0),
    });

    A.light(V3(0, 0, 0));

    A.hotspot({
      v: V3(P.xEnd - Math.max(3, 0.10 * P.len), P.rOut * 0.5, P.rOut * 0.83),
      n: V3(0, 0.5, 0.86),
      text: 'Innenmuffe für d' + P.d1 + ', Schweißtiefe ' +
        P.socketIn.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(-P.xEnd + Math.max(3, 0.14 * P.len), P.rSpigot * 0.5, P.rSpigot * 0.84),
      n: V3(0, 0.5, 0.86),
      text: 'Zapfen d' + P.d + ' — steckt in jede d' + P.d + '-Muffe des Systems',
    });

    const zf = P.rOut + 0.14 * P.len;
    const yL = -(P.rOut + 0.34 * P.len);
    A.dim({ label: 'l', value: P.len,
      a: V3(-P.xEnd, yL, zf), b: V3(P.xEnd, yL, zf), off: V3(0, 0.13 * P.len, 0) });
    const xD = P.xEnd + 0.18 * P.len;
    A.dim({ label: 'D', value: P.OD,
      a: V3(xD, -P.rOut, zf), b: V3(xD, P.rOut, zf), off: V3(-0.14 * P.len, 0, 0) });

    A.measures = [
      { key: 'l', label: DIMENSION_KEY.l, soll: P.len,
        ist: () => { const b = A.boxOf(['body']); return b.max.x - b.min.x; } },
      /* Silhouette: der größere von Zapfen und Kragen. */
      { key: 'OD', label: 'größter Außendurchmesser', soll: P.OD,
        ist: () => { const b = A.boxOf(['body']); return b.max.z - b.min.z; } },
      /* Zapfen und Kragen einzeln, jeweils von AUSSEN nach innen
         gemessen. Ein Strahl von der Achse trifft zuerst die
         Bohrungswand und gäbe deren Radius zurück — er hätte die
         Bohrung gemessen, nicht das Außenmaß. */
      { key: 'd', label: DIMENSION_KEY.d + ' (Zapfen)', soll: P.d,
        /* Gemessen am Zapfenanfang, wo der Nenndurchmesser liegt —
           weiter hinten hat die 1°-Entformung ihn planmäßig verjüngt. */
        ist: () => {
          const hit = A.probeAxial('body', V3(-P.xEnd + 1.5, P.OD, 0), V3(0, -1, 0));
          return hit ? Math.round(2 * hit.y * 100) / 100 : NaN;
        } },
      /* Die Sonde stand 0,6 mm hinter dem Zapfenende und traf dort die
         KEHLRUNDUNG zum dicken Körper — die Ablesung wuchs mit der
         Mutter-Nennweite auf bis zu +0,41 mm (M1, am Radiusprofil
         bewiesen; der Kragenzylinder selbst stimmt). Jetzt zielt sie
         auf die Mitte der Kragenzone, wo die Rundung sicher zu Ende
         ist. */
      { key: 'D', label: DIMENSION_KEY.D + ' (Kragen)', soll: P.D,
        ist: () => {
          const x = -P.xEnd + P.spigotLenUsed + Math.max(1.5, P.collarLen * 0.5);
          const hit = A.probeAxial('body', V3(x, P.OD, 0), V3(0, -1, 0));
          return hit ? Math.round(2 * hit.y * 100) / 100 : NaN;
        } },
      { key: 'restwand', label: 'Wand des Kragens', soll: P.restwand, ist: () => P.restwand },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export { product as default };
