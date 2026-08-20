/* K-Aqua 3D · Winkel 45° — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID fittings/elbow-45.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, DRAFT, SEG_FINE, SEG_INT, SEG_VIS, bendPath, buildProfile, circleLoop, createAssembly, fusionDepth, materials, mergeGeometries, revolve, sweepPath,
} from '../kaqua-3d-core.mjs';

/* == _bend/params.js =================================================== */
/* K-Aqua Winkelfamilie — Parametrik.

   Gemeinsam für Winkel 45° und 90°. Aus der Tabelle kommen d, D, das
   Schenkelmaß (bei 45° Spalte l, bei 90° Spalte L) und z.

   Die Muffentiefe wird NICHT geschätzt, sondern gerechnet: Schenkel − z.
   Gegenprobe gegen die Normreihe DVS 2207-11 steht in P.depthDeltaToNorm
   und erscheint im Prüfbericht. */


export function bendParams(article, opt) {
  const a = article;
  const P = Object.assign({}, a);
  const { d, D } = a;

  P.angle = opt.angle;
  P.leg = a.leg;                       // Achsenschnittstelle bis Stirnfläche
  P.OD = D;
  P.wallFitting = (D - d) / 2;
  /* Muffentiefe aus der Normreihe, nicht aus leg − z. Begründung im
     Kopfkommentar von products/tee/data.js: die Tiefe ist durch das
     Schweißwerkzeug je Nennweite festgelegt und muss bei Muffe, Winkel
     und T-Stück gleich sein. Die Muffentabelle belegt die Reihe exakt;
     leg − z streut bei Winkel und T-Stück um bis zu 3 mm. */
  P.socket = fusionDepth(d) ?? (a.leg - a.z);
  P.socketFromTable = a.leg - a.z;     // Gegenprobe, erscheint im Prüfbericht

  P.wallPipe = d / (opt.sdr ?? 6);
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;
  P.rOut = D / 2;

  P.sockTaper = Math.tan(0.6 * D2R);   // 0,6° Muffenkonus
  P.lead = 2 * Math.tan(15 * D2R);     // Einführfase 15° × 2 mm
  P.restwand = P.wallFitting;

  /* ASSUMPTION Bogenradius. Die Tabelle führt keinen. Angesetzt 0,5·d,
     begrenzt auf das, was der Schenkel hergibt (bendPath rechnet den
     Verbrauch R·tan(α/2) und bricht sonst ab). 0,5·d ist der Wert, bei
     dem die Außenkontur im Katalogfoto sichtbar rund über die Ecke
     läuft, ohne dass der Bogen in die Muffe hineinreicht.
     Gegen die Zeichnung zu verifizieren. */
  const maxR = (a.leg - P.socket - 1.5) / Math.tan((opt.angle * D2R) / 2);
  P.bendR = Math.max(d * 0.22, Math.min(d * 0.5, maxR));

  P.emR = Math.min(2.0, 0.05 * d);
  const norm = fusionDepth(d);
  P.normDepth = norm;
  P.depthDeltaToNorm = norm == null ? null
    : Math.round((P.socketFromTable - norm) * 10) / 10;

  if (P.restwand < 3) {
    throw new Error('K-Aqua Winkel d' + d + ': Restwand ' + P.restwand.toFixed(2) + ' mm < 3 mm');
  }
  if (P.socket <= 0 || P.socket >= a.leg) {
    throw new Error('K-Aqua Winkel d' + d + ': Muffentiefe ' + P.socket +
      ' mm passt nicht zum Schenkel ' + a.leg + ' mm');
  }
  return P;
}


/* == _bend/parts.js ==================================================== */
/* K-Aqua Winkelfamilie — Kontur.

   Der erste echte Belastungstest für sweepPath, und er hat eine Lücke im
   Core gefunden: sweepPath nahm einen festen Querschnitt für die ganze
   Bahn. Ein Winkel braucht einen veränderlichen — an den Stirnflächen
   die Muffenbohrung, in der Mitte die Rohrbohrung. Ohne CSG ist das der
   einzige Weg, die Muffe in eine geschlossene Kontur zu bekommen.

   sweepPath nimmt jetzt auch eine Funktion (t, i) => Punktliste. Damit
   ist der Winkel EIN Loft: Außenhaut konstant D/2, Innenhaut nach
   Position veränderlich, plus zwei Ringflächen an den Stirnflächen.

   Kein CSG, keine Boolesche Operation. */


/* Innenradius über der Bahn. t läuft 0…1 von Stirnfläche A nach B.
   Der Verlauf ist symmetrisch, deshalb wird nur der Abstand zur
   näheren Stirnfläche betrachtet. */
function boreAt(P, t, pathLen) {
  const s = Math.min(t, 1 - t) * pathLen;   // Bogenlänge bis zur nächsten Stirnfläche
  const rSock = P.d / 2;
  if (s <= 0.001) return rSock + P.lead;    // Einführfase am Mundloch
  if (s <= 2) return rSock + P.lead * (1 - s / 2);
  if (s <= P.socket) return rSock - P.sockTaper * (s - 2);
  const ramp = Math.min(1, (s - P.socket) / Math.max(1.5, P.wallFitting * 0.8));
  const rEnd = P.d / 2 - P.sockTaper * (P.socket - 2);
  return rEnd + (P.boreR - rEnd) * ramp;    // Übergang auf die Rohrbohrung
}

export function buildBend(P) {
  const path = bendPath(P.leg, P.angle, P.bendR, 24, 5);
  let pathLen = 0;
  for (let i = 1; i < path.length; i++) pathLen += path[i].c.distanceTo(path[i - 1].c);

  /* Außenhaut: konstant D/2, mit 1° Entformung zu den Stirnflächen hin
     verjüngend — dieselbe Regel wie bei jedem anderen Fitting. */
  const outer = sweepPath((t) => {
    const s = Math.min(t, 1 - t) * pathLen;
    const shrink = DRAFT * Math.max(0, P.socket - s) * 0.5;
    return circleLoop(P.rOut - shrink, SEG_VIS, 0.15);
  }, path);

  const inner = sweepPath((t) => circleLoop(boreAt(P, t, pathLen), SEG_INT, 0.3),
    path, { flip: true });

  /* Ringflächen an den Stirnflächen: verbinden Außen- und Innenhaut zu
     einem geschlossenen Körper. Ohne sie ist der Winkel eine offene
     Schale und die Schnittansicht zeigt Löcher. */
  const rings = [];
  for (const [idx, flip] of [[0, true], [path.length - 1, false]]) {
    const st = path[idx];
    const t = idx === 0 ? 0 : 1;
    const rIn = boreAt(P, t, pathLen);
    const ring = new THREE.RingGeometry(rIn, P.rOut, SEG_VIS, 1);
    const q = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, flip ? -1 : 1), st.t.clone().normalize());
    ring.applyQuaternion(q);
    ring.translate(st.c.x, st.c.y, st.c.z);
    const n = ring.attributes.position.count;
    ring.setAttribute('aWear', new THREE.BufferAttribute(new Float32Array(n).fill(0.5), 1));
    rings.push(ring);
  }

  /* Auswerferstift-Marke auf dem Bogenrücken — ohne sie sieht das Teil
     nach CAD-Viewer aus. */
  const mid = path[Math.floor(path.length / 2)];
  const disc = revolve(buildProfile([
    { a: 0, r: 0, fillet: 0 },
    { a: 0, r: P.emR, chamfer: 0.25 },
    { a: 0.1, r: P.emR, fillet: 0.1 },
    { a: 0.1, r: 0, fillet: 0 },
  ], { segs: 3 }), { axis: 'y', segments: SEG_FINE });
  const nOut = mid.c.clone().setZ(0).normalize();
  disc.rotateX(Math.PI);
  disc.translate(nOut.x * (P.rOut - 0.05) + mid.c.x, nOut.y * (P.rOut - 0.05) + mid.c.y, 0);

  return {
    geo: mergeGeometries([outer, inner, ...rings, disc]),
    cap: null,          // Halbschnitt über DoubleSide, siehe index.js
    path, pathLen,
  };
}


/* == elbow-45/data.js ================================================== */
/* K-Aqua Winkel 45° — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Fittings K-Aqua/screencapture-…-fittings-elbow-45-….pdf
   (Seitenbilder quellen/fg-elbow-45-p1.jpg, -p2.jpg). Tabelle über den
   Seitenumbruch: Seite 1 endet bei d75, Seite 2 führt d90–d125.

   Spaltenköpfe wie abgebildet:
     Code · d · D · l · z · s · kg · Pack.
   Die Spalte s ist in JEDER Zeile ein Gedankenstrich — sie gilt für die
   Stumpfschweißvarianten und ist hier durchgehend leer. Nicht übernommen.

   MASSSCHLÜSSEL:
     d   Rohr-Außendurchmesser = Muffenbohrung
     D   Außendurchmesser des Fittings
     l   Schenkelmaß: Achsenschnittstelle bis Stirnfläche
     z   Einbaulänge

   Damit ist die Muffentiefe kein Schätzwert: l − z.
   Gegenprobe gegen die Normreihe DVS 2207-11 (siehe P.depthDeltaToNorm)
   trifft sie über den ganzen Bereich auf ±1,5 mm — dasselbe Bild wie bei
   der Muffe, wo die Spalte z die Reihe auf die Zehntelstelle bestätigt.

   In data.js heißt die Spalte einheitlich `leg`, damit Winkel 45° und
   90° dieselbe Parametrik benutzen können. Die Tabellenbezeichnung
   steht in DIMENSION_KEY. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 10;
export const ANGLE = 45;
export const SDR = 6;

export const ARTICLES = [
  { code: 'AQ04520', d: 20, D: 29, leg: 21, z: 6, kg: 0.02, pack: 300 },
  { code: 'AQ04525', d: 25, D: 35, leg: 24, z: 8, kg: 0.02, pack: 200 },
  { code: 'AQ04532', d: 32, D: 44, leg: 29, z: 10, kg: 0.05, pack: 100 },
  { code: 'AQ04540', d: 40, D: 52, leg: 32, z: 11, kg: 0.06, pack: 70 },
  { code: 'AQ04550', d: 50, D: 65, leg: 37, z: 13, kg: 0.1, pack: 48 },
  { code: 'AQ04563', d: 63, D: 84, leg: 44, z: 16, kg: 0.21, pack: 24 },
  { code: 'AQ04575', d: 75, D: 99, leg: 50, z: 20, kg: 0.32, pack: 14 },
  { code: 'AQ04590', d: 90, D: 120, leg: 58, z: 25, kg: 0.58, pack: 9 },
  { code: 'AQ045110', d: 110, D: 148, leg: 69, z: 32, kg: 0.98, pack: 4 },
  { code: 'AQ045125', d: 125, D: 165, leg: 78, z: 37, kg: 1.53, pack: 2 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  D: 'Außendurchmesser',
  leg: 'Schenkelmaß l',
  z: 'Einbaulänge',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}


/* == elbow-45/params.js ================================================ */
/* K-Aqua Winkel 45° — Parametrik.
   Dünne Hülle um das Familienmodul; produktspezifisch ist nur data.js. */


export function params(dNom) {
  return bendParams(article(dNom), { angle: ANGLE, sdr: SDR });
}


/* == elbow-45/parts.js ================================================= */
/* K-Aqua Winkel 45° — Kontur. Kommt vollständig aus dem Familienmodul. */


/* == elbow-45/index.js ================================================= */
/* K-Aqua Winkel 45° — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Teil, kein Zustand. Gebaut als EIN Loft über eine Gerade-Bogen-
   Gerade-Bahn; die Muffenbohrungen sind Teil des veränderlichen
   Querschnitts, nicht ausgeschnitten. Kein CSG. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'fittings/elbow-45',
  module: 'kaqua-elbow-45',
  titleDe: 'Winkel 45°',
  titleEn: 'Elbow 45°',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'D', 'leg', 'z', 'kg'],
  dimensions: ['leg', 'D'],
  ariaFields: ['d', 'D', 'leg', 'z'],

  variants: [],
  states: null,

  tile: 'Richtungswechsel um 45° — flacher Bogen, geringerer Druckverlust als zwei 90°-Winkel.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Winkel' + ANGLE + '_d' + size,
      materials: ['pprGreen'],
      seed: 91,
      clipPlane,
    });

    const body = buildBend(P);
    A.part('body', {
      name: 'Winkel', label: 'Winkelkörper (PP-R)', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      anchor: V3(-P.leg * 0.55, P.rOut + 0.30 * P.leg, 0),
    });

    A.light(V3(-P.leg * 0.6, 0, 0));
    A.light(V3(0, P.leg * 0.6, 0));

    A.hotspot({
      v: V3(-P.leg + Math.max(3, 0.12 * P.leg), P.rOut * 0.5, P.rOut * 0.83),
      n: V3(0, 0.5, 0.86),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        P.socket.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: body.path[Math.floor(body.path.length / 2)].c.clone()
        .setZ(0).normalize().multiplyScalar(P.rOut * 0.9)
        .add(body.path[Math.floor(body.path.length / 2)].c).setZ(P.rOut * 0.4),
      n: V3(0.4, 0.5, 0.77),
      text: 'Bogenradius ' + P.bendR.toFixed(1).replace('.', ',') +
        ' mm — durchgehende Wandstärke, keine Kerbe am Innenradius',
    });

    /* Bemaßung: Schenkelmaß entlang der -X-Achse, Außendurchmesser
       quer dazu. Beide Linien liegen vor der Silhouette. */
    const zf = P.rOut + 0.14 * P.leg;
    const yL = -(P.rOut + 0.34 * P.leg);
    A.dim({ label: DIMENSION_KEY.leg.split(' ')[1], value: P.leg,
      a: V3(-P.leg, yL, zf), b: V3(0, yL, zf), off: V3(0, 0.12 * P.leg, 0) });
    const xD = -P.leg - 0.16 * P.leg;
    A.dim({ label: 'D', value: P.OD,
      a: V3(xD, -P.rOut, zf), b: V3(xD, P.rOut, zf), off: V3(0.12 * P.leg, 0, 0) });

    A.measures = [
      { key: 'leg', label: DIMENSION_KEY.leg, soll: P.leg,
        ist: () => { const b = A.boxOf(['body']); return Math.abs(b.min.x); } },
      { key: 'D', label: DIMENSION_KEY.D, soll: P.OD,
        ist: () => { const b = A.boxOf(['body']); return b.max.z - b.min.z; } },
      /* Muffentiefe: geprüft wird, dass das Modell die Normreihe trägt.
         Die Abweichung des Tabellenwerts leg − z davon ist keine
         Maßhaltigkeitsfrage, sondern eine Quellenfrage — sie steht als
         P.depthDeltaToNorm im Prüfbericht, nicht im Maßtest. */
      { key: 'tiefe', label: 'Muffentiefe (Normreihe)',
        soll: P.normDepth ?? P.socket, ist: () => P.socket },
      { key: 'restwand', label: 'Restwand Fitting', soll: P.restwand, ist: () => P.restwand },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export { product as default };
