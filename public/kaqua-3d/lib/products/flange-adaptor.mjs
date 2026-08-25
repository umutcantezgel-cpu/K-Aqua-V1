/* K-Aqua 3D · Flanschadapter (Bundbuchse) — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID fittings/flange-adaptor.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, DRAFT, SEG_VIS, buildProfile, capFromProfile, createAssembly, fusionDepth, materials, revolve,
} from '../kaqua-3d-core.mjs';

/* == flange-adaptor/data.js ============================================ */
/* K-Aqua Flanschadapter (Bundbuchse) — Artikeltabelle.

   QUELLE: Druckkatalog KA-Katalog_GB_06-2025_NEU.pdf, Seite 90, untere
   Tabelle „Flange adaptor". 11 Größen.

   ZWEI BAUARTEN wie beim Reduzier-T-Stück, getrennt durch die
   Zwischenzeile „SDR 11*":
     · oben  7 Größen mit SCHWEISSMUFFE (d40–d125), Spalten D und l
       belegt, s leer,
     · unten 4 Größen mit SPITZENDE (d160–d315) für Heizelement-
       stumpf- oder Elektroschweißung, D und l leer, dafür s.

   D UND D1 BEDEUTEN IN DEN BEIDEN BLÖCKEN VERSCHIEDENES, und das ist
   nicht geraten, sondern an einer DRITTEN Tabelle belegt. Der
   Gegenflansch auf S. 110 (AQ750) führt die Spalte D2 — die Bohrung,
   mit der er über den Adapter geschoben wird. Sie muss größer sein als
   der Schaft und kleiner als der Bund:

       d      Adapter D1   Flansch D2   Adapter D
       40         50           51           60
       50         60           62           70
       63         76           78           89
       75         89           92          105
       90        109          110          125
       110       132          133          158
       125       146          150          162

   In allen sieben Zeilen gilt D1 < D2 < D. Damit steht fest:
   **D ist der Bund, D1 der Schaft.**

   Bei der Spitzendbauart ist es umgekehrt. Dort führt der Adapter kein
   D, und seine D1-Werte (212 · 269 · 320 · 370) liegen ÜBER den
   Flanschbohrungen (178 · 235 · 288 · 338). D1 ist dort also der Bund,
   und der Schaft ist schlicht das Rohr mit dem Maß d. Genau so zeigt es
   auch die untere Zeichnung auf S. 90.

   MASSSCHLÜSSEL:
     Muffenbauart     d  Muffenbohrung · D Bund-Ø · D1 Schaft-Ø
                      l  Schaftlänge · z l − Muffentiefe · h Bunddicke
     Spitzendbauart   d  Rohr-Außen-Ø · D1 Bund-Ø
                      z  Gesamtlänge · h Bunddicke · s Wandstärke

   GEGENPROBE der Muffenbauart: z = l − Muffentiefe.
       d50   33−23,5 = 9,5   Tabelle 9,7
       d63   40−27,5 = 12,5  Tabelle 12,9
   Bei d40, d75, d90, d110 und d125 weicht es um 1 bis 3 mm ab —
   derselbe Drift wie beim Reduzier-T-Stück und beim Kugelhahn: der
   Katalog rechnet mit etwas anderen Muffentiefen als DVS 2207-11.
   Gebaut wird nach l und der Normreihe, z steht als Gegenprobe daneben.

   ZWEI AUFFÄLLIGKEITEN, dokumentiert statt aufgelöst:

   1. AQ79075 (d75) FÄLLT IN DREI SPALTEN GLEICHZEITIG AUS DER REIHE.
      l sinkt von 40 (d63) auf 37, obwohl es mit der Nennweite wachsen
      müsste; h sinkt von 15,5 auf 15; z stürzt von 12,9 auf 7,5. Drei
      Spalten zugleich, und alle nach unten. Die Nachbarzeilen d63 und
      d90 sind untereinander stimmig. NICHT geändert.

   2. AQ790200 (d200) führt z = 201 gegen 207 bei d160 — die
      Gesamtlänge sinkt bei wachsender Nennweite. d250 und d315 steigen
      dann wieder auf 220 und 239. NICHT geändert. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 11;

const MUFFE = [
  { code: 'AQ79040',  d: 40,  D: 60,  D1: 50,  l: 29, z: 7.4,  h: 7.8,  kg: 0.03, pack: 80 },
  { code: 'AQ79050',  d: 50,  D: 70,  D1: 60,  l: 33, z: 9.7,  h: 9.5,  kg: 0.05, pack: 60 },
  { code: 'AQ79063',  d: 63,  D: 89,  D1: 76,  l: 40, z: 12.9, h: 15.5, kg: 0.08, pack: 48 },
  { code: 'AQ79075',  d: 75,  D: 105, D1: 89,  l: 37, z: 7.5,  h: 15,   kg: 0.13, pack: 40,
    anmerkung: 'l, z und h fallen zugleich aus der Reihe — siehe AUFFÄLLIGKEIT 1' },
  { code: 'AQ79090',  d: 90,  D: 125, D1: 109, l: 46, z: 9.5,  h: 19.5, kg: 0.25, pack: 26 },
  { code: 'AQ790110', d: 110, D: 158, D1: 132, l: 57, z: 13,   h: 18,   kg: 0.38, pack: 12 },
  { code: 'AQ790125', d: 125, D: 162, D1: 146, l: 62, z: 13,   h: 21,   kg: 0.48, pack: 10 },
];

const SPITZENDE = [
  { code: 'AQ790160', d: 160, D1: 212, z: 207, h: 25, s: 14.6, kg: 1.8, pack: 1 },
  { code: 'AQ790200', d: 200, D1: 269, z: 201, h: 32, s: 18.2, kg: 3.0, pack: 1,
    anmerkung: 'z sinkt gegenüber d160 — siehe AUFFÄLLIGKEIT 2' },
  { code: 'AQ790250', d: 250, D1: 320, z: 220, h: 35, s: 22.7, kg: 4.9, pack: 1 },
  { code: 'AQ790315', d: 315, D1: 370, z: 239, h: 35, s: 28.6, kg: 7.5, pack: 1 },
];

export const ARTICLES = [
  ...MUFFE.map((a) => ({ ...a, bauart: 'muffe' })),
  ...SPITZENDE.map((a) => ({ ...a, bauart: 'spitzende' })),
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  D: 'Außendurchmesser Bund',
  D1: 'Außendurchmesser Schaft (Muffe) bzw. Bund (Spitzende)',
  l: 'Schaftlänge',
  z: 'Einbaulänge (Muffe) bzw. Gesamtlänge (Spitzende)',
  h: 'Bunddicke',
  s: 'Wandstärke',
};

/* Der Gegenflansch, für die Gegenprobe im Prüfbericht — S. 110, AQ750,
   Spalte D2. Er wird NICHT modelliert; er belegt nur die Deutung von
   D und D1. */
export const FLANSCHBOHRUNG = {
  40: 51, 50: 62, 63: 78, 75: 92, 90: 110, 110: 133, 125: 150,
  160: 178, 200: 235, 250: 288, 315: 338,
};

export function article(dNom) {
  const a = ARTICLES.find((x) => x.d === dNom);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + dNom);
  return a;
}


/* == flange-adaptor/params.js ========================================== */
/* K-Aqua Flanschadapter — Parametrik.

   Zwei Bauarten, ein Produkt; welche gilt, steht in der Zeile. Die
   Muffenbauart baut aus l und der Muffentiefe, die Spitzendbauart aus
   z und der tabellierten Wandstärke s.

   Achse x, Nullpunkt in der Mitte. Links das Anschlussende (Muffe bzw.
   Spitzende), rechts der Bund mit der Dichtfläche. */


export function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);
  const spitz = a.bauart === 'spitzende';

  P.bund = spitz ? a.D1 : a.D;          // Bund-Außendurchmesser
  P.schaft = spitz ? a.d : a.D1;        // Schaft-Außendurchmesser
  P.rBund = P.bund / 2;
  P.rSchaft = P.schaft / 2;
  P.bundDicke = a.h;

  P.schaftLen = spitz ? a.z - a.h : a.l;
  P.len = P.schaftLen + a.h;
  P.xEnd = P.len / 2;                   // Bundstirnfläche
  P.xStart = -P.len / 2;                // Anschlussende
  P.xBund = P.xEnd - a.h;               // Bundunterkante

  if (spitz) {
    P.wall = a.s;                       // TABELLIERT
    P.bore = a.d - 2 * a.s;
    P.socket = 0;
    /* GEGENPROBE gegen die Fußnote SDR 11: s müsste d/11 sein. */
    P.wallFromSdr = Math.round((a.d / 11) * 10) / 10;
    P.wallDeltaToSdr = Math.round((a.s - P.wallFromSdr) * 10) / 10;
  } else {
    P.socket = fusionDepth(a.d) ?? (a.l - a.z);
    P.socketFromTable = Math.round((a.l - a.z) * 10) / 10;
    P.depthDeltaToNorm = Math.round((P.socketFromTable - P.socket) * 10) / 10;
    P.wall = (a.D1 - a.d) / 2;
    P.bore = a.d - 2 * (a.d / 6);       // SDR 6 wie bei allen Fittings
  }
  P.boreR = P.bore / 2;
  P.sockTaper = spitz ? 0 : Math.tan(0.6 * D2R);
  P.lead = spitz ? 0 : 2 * Math.tan(15 * D2R);

  /* Die Dichtfläche trägt zwei flache Rillen — Stand der Technik bei
     Bundbuchsen, damit die Dichtung nicht wandert. Nicht bemaßt,
     deshalb als Gestalt und nicht als Maß behandelt. */
  P.rilleTiefe = Math.min(0.6, 0.03 * a.h);
  P.rilleR1 = P.boreR + (P.rBund - P.boreR) * 0.42;
  P.rilleR2 = P.boreR + (P.rBund - P.boreR) * 0.62;

  /* Die Bohrung des Gegenflansches, nur zur Prüfung mitgeführt. */
  P.flanschBohrung = FLANSCHBOHRUNG[a.d] ?? null;

  if (P.rBund <= P.rSchaft + 1.5) {
    throw new Error('K-Aqua Flanschadapter d' + a.d + ': Bund ' + P.bund +
      ' steht über dem Schaft ' + P.schaft + ' kaum vor');
  }
  if (P.boreR >= P.rSchaft - 1.5) {
    throw new Error('K-Aqua Flanschadapter d' + a.d + ': Schaftwand ' +
      (P.rSchaft - P.boreR).toFixed(2) + ' mm zu dünn');
  }
  if (!spitz && P.socket >= P.schaftLen - 2) {
    throw new Error('K-Aqua Flanschadapter d' + a.d + ': Muffentiefe ' +
      P.socket + ' passt nicht in den Schaft ' + P.schaftLen);
  }
  if (P.flanschBohrung != null &&
      !(P.schaft < P.flanschBohrung && P.flanschBohrung < P.bund)) {
    throw new Error('K-Aqua Flanschadapter d' + a.d +
      ': der Gegenflansch (Bohrung ' + P.flanschBohrung +
      ') passt nicht über den Schaft ' + P.schaft + ' unter den Bund ' + P.bund);
  }
  return P;
}


/* == flange-adaptor/parts.js =========================================== */
/* K-Aqua Flanschadapter — Kontur.

   Ein Rotationskörper, zwei Bauarten. Der Bund sitzt bei beiden rechts,
   das Anschlussende links: bei der Muffenbauart eine Schweißmuffe, bei
   der Spitzendbauart ein glattes Rohrende mit tabellierter Wandstärke.

   Kein CSG: die Rillen der Dichtfläche stehen in derselben Kontur. */


export function buildAdaptor(P) {
  const x0 = P.xStart, x1 = P.xEnd, xB = P.xBund;
  const spitz = P.bauart === 'spitzende';

  /* Außenkontur: Schaft, Bundunterkante, Bund, Dichtfläche.
     Der Zwischenpunkt bei xB − 1 setzt einen Netzpunkt am Schaftende;
     ohne ihn hat der zylindrische Schaft zwischen seinen Enden keinen. */
  const outer = [
    { a: x0, r: P.rSchaft, chamfer: Math.min(1.2, P.wall * 0.25) },
    { a: x0 + 1.5, r: P.rSchaft - DRAFT * 1.5, fillet: 0.5 },
    { a: xB - 1, r: P.rSchaft, fillet: 0.4 },
    /* Der Fuß des Bundes ist die SITZFLÄCHE des losen Gegenflansches.
       Sie muss senkrecht stehen — der erste Entwurf hatte dort einen
       Radius von bis zu 1,5 mm, und damit war die Bunddicke h um bis zu
       0,24 mm zu groß gemessen, weil der Radius schon vor dem Bund
       anstieg. Ein Sitz, der nicht eben ist, trägt auch nicht. */
    { a: xB, r: P.rSchaft, fillet: 0.4 },
    /* Die Außenkante des Bundfußes bleibt SCHARF. Eine Fase von 0,4 mm
       stand hier zuerst und lag damit genau auf dem Maßort: der volle
       Bunddurchmesser wurde erst 0,36 mm später erreicht, und h las sich
       in allen elf Zeilen um genau diesen Betrag zu klein. Eine
       Konstante über alle Größen ist nie eine Rundung. Am Sitz einer
       Bundbuchse ist eine Fase auch sachlich falsch — dort läuft die
       Dichtkante des Gegenflansches auf. */
    { a: xB, r: P.rBund, fillet: 0 },
    { a: x1, r: P.rBund, chamfer: Math.min(1.2, P.bundDicke * 0.14) },
  ];

  /* Dichtfläche mit zwei flachen Rillen, dann nach innen zur Bohrung. */
  const inner = [
    { a: x1, r: P.rilleR2 + 0.9, fillet: 0.3 },
    { a: x1 - P.rilleTiefe, r: P.rilleR2, fillet: 0.25 },
    { a: x1 - P.rilleTiefe, r: P.rilleR2 - 0.9, fillet: 0.25 },
    { a: x1, r: P.rilleR2 - 1.8, fillet: 0.3 },
    { a: x1, r: P.rilleR1 + 0.9, fillet: 0.3 },
    { a: x1 - P.rilleTiefe, r: P.rilleR1, fillet: 0.25 },
    { a: x1 - P.rilleTiefe, r: P.rilleR1 - 0.9, fillet: 0.25 },
    { a: x1, r: P.rilleR1 - 1.8, fillet: 0.3 },
    { a: x1, r: P.boreR, chamfer: Math.min(1.0, P.wall * 0.2) },
  ];

  if (spitz) {
    /* Spitzende: durchgehende Bohrung, Wandstärke s. */
    inner.push({ a: x0, r: P.boreR, chamfer: Math.min(1.2, P.wall * 0.2) });
  } else {
    /* Muffenbauart: Bohrung bis zum Muffengrund, dann die Muffe. */
    const rSock = (x) => P.d / 2 - P.sockTaper * (x - x0);
    inner.push(
      { a: x0 + P.socket, r: P.boreR, fillet: 1.0 },
      { a: x0 + P.socket, r: rSock(x0 + P.socket), fillet: 1.0 },
      { a: x0 + 2, r: rSock(x0 + 2), fillet: 0.4 },
      { a: x0, r: P.d / 2 + P.lead, fillet: 0 },
    );
  }

  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  return {
    geo: revolve(profile, { axis: 'x', segments: SEG_VIS }),
    cap: capFromProfile(profile, 'x'),
    profile,
  };
}


/* == flange-adaptor/index.js =========================================== */
/* K-Aqua Flanschadapter (Bundbuchse) — Produktpaket.

   Das Teil wird nicht allein verbaut: der lose Gegenflansch (S. 110)
   schiebt sich über den Schaft und drückt gegen den Bund. Genau diese
   Passung ist es, die D und D1 eindeutig macht — und das Modell prüft
   sie mit, obwohl der Flansch selbst nicht dazugehört. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'fittings/flange-adaptor',
  module: 'kaqua-flange-adaptor',
  titleDe: 'Flanschadapter (Bundbuchse)',
  titleEn: 'Flange adaptor',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'd',
  sizeLabel: (k) => 'd' + k,
  sizeTitle: 'Nennweite',
  defaultSize: 63,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'D', 'D1', 'h', 'kg'],
  dimensions: ['D', 'h'],
  ariaFields: ['d', 'D', 'D1', 'h'],

  variants: [],
  states: null,

  tile: 'Bundbuchse für den losen Gegenflansch — sieben Größen mit ' +
        'Schweißmuffe, vier mit Spitzende.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const spitz = P.bauart === 'spitzende';
    const A = createAssembly({
      name: 'K-Aqua_Flanschadapter_d' + P.d,
      materials: ['pprGreen'],
      seed: 149,
      clipPlane,
    });

    const body = buildAdaptor(P);

    A.part('koerper', {
      name: 'Bundbuchse', label: 'Flanschadapter (PP-R)', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      anchor: V3(P.xStart + P.schaftLen * 0.4, P.rBund + 0.20 * P.len, 0),
    });

    A.light(V3(P.xStart * 0.7, 0, 0));
    A.light(V3(P.xEnd * 0.7, 0, 0));

    A.hotspot({
      v: V3(P.xEnd - P.bundDicke * 0.5, P.rBund * 0.45, P.rBund * 0.86),
      n: V3(0.2, 0.45, 0.87),
      text: 'Bund Ø ' + P.bund + ' mm — der lose Gegenflansch (Bohrung ' +
        P.flanschBohrung + ' mm) schiebt sich über den Schaft Ø ' +
        P.schaft + ' mm und drückt dagegen',
    });
    A.hotspot(spitz ? {
      v: V3(P.xStart + P.schaftLen * 0.3, P.rSchaft * 0.45, P.rSchaft * 0.86),
      n: V3(0, 0.45, 0.89),
      text: 'Spitzende für Heizelementstumpf- oder Elektroschweißung, ' +
        'Wandstärke ' + String(P.s).replace('.', ',') + ' mm (SDR 11)',
    } : {
      v: V3(P.xStart + Math.max(2, 0.08 * P.len), P.rSchaft * 0.45, P.rSchaft * 0.86),
      n: V3(0, 0.45, 0.89),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        String(P.socket).replace('.', ',') + ' mm nach DVS 2207-11',
    });

    const zf = P.rBund + 0.16 * P.len;
    const yL = -(P.rBund + 0.34 * P.len);
    A.dim({ label: 'D', value: P.bund,
      a: V3(P.xEnd + 0.22 * P.len, -P.rBund, zf), b: V3(P.xEnd + 0.22 * P.len, P.rBund, zf),
      off: V3(-0.10 * P.len, 0, 0) });
    A.dim({ label: 'h', value: P.bundDicke,
      a: V3(P.xBund, yL, zf), b: V3(P.xEnd, yL, zf), off: V3(0, 0.10 * P.len, 0) });

    /* Gemessen am gebauten Netz. Über Halbräume in x, die je genau ein
       Merkmal enthalten — der Adapter ist rotationssymmetrisch, es gibt
       keine zweite Achse, die hineinragen könnte.

       Die Grenzen sind nachgemessen: mit [xStart+2, xBund−2] war das
       Fenster bei allen vier Spitzendgrößen LEER — der zylindrische
       Schaft trägt nur an seinen Enden Netzpunkte, und die lagen beide
       außerhalb. Bei den Muffengrößen traf es stattdessen die Bohrung
       und las 10 bis 22 mm zu wenig. */
    const pos = body.geo.attributes.position.array;
    const radien = (von, bis) => {
      let max = 0, min = Infinity;
      for (let i = 0; i < pos.length; i += 3) {
        const x = pos[i];
        if (x < von || x > bis) continue;
        const r = Math.hypot(pos[i + 1], pos[i + 2]);
        if (r > max) max = r;
        if (r < min) min = r;
      }
      return { max, min };
    };

    A.measures = [
      { key: 'laenge', label: spitz ? 'Gesamtlänge (z)' : 'Gesamtlänge (l + h)',
        soll: P.len,
        ist: () => { const b = A.boxOf(['koerper']); return r2(b.max.x - b.min.x); } },
      /* Bund: größter Durchmesser überhaupt. */
      { key: 'bund', label: spitz ? DIMENSION_KEY.D1 : DIMENSION_KEY.D, soll: P.bund,
        ist: () => { const b = A.boxOf(['koerper']); return r2(b.max.y - b.min.y); } },
      { key: 'h', label: DIMENSION_KEY.h, soll: P.bundDicke,
        ist: () => {
          /* Der Bund beginnt dort, wo der Radius von rSchaft auf rBund
             springt. Gesucht ist der kleinste x mit einem Punkt über
             dem Schaftradius plus einem Millimeter. */
          /* Gesucht ist der kleinste x mit VOLLEM Bundradius. Eine
             Schwelle knapp über dem Schaft wäre untauglich: sie träfe
             die Fase am Fuß, und die liegt vor dem Bund. */
          const schwelle = P.rBund - 0.05;
          let xMin = Infinity;
          for (let i = 0; i < pos.length; i += 3) {
            if (Math.hypot(pos[i + 1], pos[i + 2]) >= schwelle && pos[i] < xMin) xMin = pos[i];
          }
          return isFinite(xMin) ? r2(P.xEnd - xMin) : NaN;
        } },
      /* Schaft: das Maß, über das der Gegenflansch geschoben wird.
         Gemessen im Halbraum vor dem Bund, wo nur der Schaft liegt. */
      { key: 'schaft', label: spitz ? DIMENSION_KEY.d : DIMENSION_KEY.D1,
        soll: P.schaft,
        ist: () => r2(2 * radien(P.xStart + 1.0, P.xBund - 0.5).max) },
      /* GEGENPROBE aus einer FREMDEN Tabelle: die Bohrung des
         Gegenflansches (S. 110, Spalte D2) muss über den gemessenen
         Schaft passen und unter dem gemessenen Bund bleiben. Ein
         Modell, das diese Probe besteht, hat D und D1 richtig gedeutet —
         und das lässt sich an der eigenen Tabelle allein nicht zeigen. */
      { key: 'passung', label: 'Gegenflansch passt (Schaft < D2 < Bund)',
        soll: 1,
        ist: () => {
          const schaft = 2 * radien(P.xStart + 1.0, P.xBund - 0.5).max;
          const b = A.boxOf(['koerper']);
          const bund = b.max.y - b.min.y;
          return (schaft < P.flanschBohrung && P.flanschBohrung < bund) ? 1 : 0;
        } },
      spitz
        ? { key: 's', label: DIMENSION_KEY.s, soll: P.s,
            ist: () => { const g = radien(P.xStart + 1.0, P.xBund - 0.5);
              return r2(g.max - g.min); } }
        : { key: 'd', label: DIMENSION_KEY.d,
            soll: r2(P.d - 4 * P.sockTaper),
            ist: () => r2(2 * radien(P.xStart + 2, P.xStart + P.socket - 2).min) },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export { product as default };
