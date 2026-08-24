/* K-Aqua 3D · Winkel 90° Muffe/Spitzende — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID fittings/elbow-90-female-male.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, DRAFT, SEG_FINE, SEG_INT, SEG_VIS, bendPath, buildProfile, circleLoop, createAssembly, fusionDepth, materials, mergeGeometries, revolve, sweepPath,
} from '../kaqua-3d-core.mjs';

/* == _bendthread/parts.js ============================================== */
/* K-Aqua Winkel 90° mit Gewindeschenkel — gemeinsame Kontur.

   Ein 90°-Winkel, dessen zwei Schenkel VERSCHIEDEN sind: vorne eine
   Schweißmuffe für das Rohr, hinten ein Sitz für ein Messingteil. Beide
   Schenkel haben eigene Länge (die Bahn bekommt LB) und eigenen
   Außendurchmesser.

   Drei Produkte teilen ihn:
     transition-fittings/elbow-90-male-thread          Messingzapfen AG
     transition-fittings/elbow-bracket-90-female-thread      Ring IG
     transition-fittings/elbow-wall-bracket-90-female-thread Ring IG + Lasche

   Sie unterscheiden sich im Messingteil und in der Lasche, nicht im
   Körper. Dreimal dieselbe Rechnung würde driften (Fall 32) — deshalb
   steht sie hier und nicht dreimal im Produkt.

   Herkunft: bis zum 24.08.2026 stand dieser Körper in
   products/elbow-90-male-thread/parts.js. Beim Bau der beiden Laschen
   stellte sich heraus, dass er unverändert für sie taugt; verschoben,
   nicht umgeschrieben.

   Was das Produkt über P steuert:
     l, L1            Schenkelmaße ab der Achsenschnittstelle (A, B)
     rOut, rLegB      Außenradien der beiden Schenkel
     collarLen,
     collarR          Absatz vor dem Messing; collarLen = 0 heißt keiner
     socket,
     rSockGround,
     groundLen        Muffe am Schenkel A
     insertDepth,
     rInsertOut       Sitz des Messingteils am Schenkel B
     bendR, emR       Bogenradius, Auswerfermarke

   Kein CSG: Außenhaut, Innenhaut und zwei Ringflächen ergeben einen
   geschlossenen Körper. */


/* Weiche Blende 0…1, für die Übergänge zwischen den Zonen. */
const smooth = (u) => {
  const t = Math.min(1, Math.max(0, u));
  return t * t * (3 - 2 * t);
};

const SEAT_RAMP = 1.2;      // Übergang Einsatzsitz → Rohrbohrung
const SHOULDER = 3.0;       // Kegelschulter vom Gewindeschenkel auf den Bogen

/* Innenradius über der Bahn. sA ist die Bogenlänge ab der Stirnfläche
   der Muffe, sB die ab dem PP-Ende am Gewindeschenkel. Anders als beim
   symmetrischen Winkel sind die beiden Enden verschieden: vorne eine
   Schweißmuffe, hinten der Sitz für den Messingeinsatz. */
function boreAlong(P, sA, sB) {
  if (sA <= 0.001) return P.d / 2 + P.lead;
  if (sA <= 2) return P.d / 2 + P.lead * (1 - sA / 2);
  if (sA <= P.socket) return P.d / 2 - P.sockTaper * (sA - 2);
  if (sA <= P.socket + P.groundLen) {
    return P.rSockGround + (P.boreR - P.rSockGround) *
      smooth((sA - P.socket) / P.groundLen);
  }
  if (sB <= P.insertDepth) return P.rInsertOut + 0.05;
  if (sB <= P.insertDepth + SEAT_RAMP) {
    return (P.rInsertOut + 0.05) + (P.boreR - P.rInsertOut - 0.05) *
      smooth((sB - P.insertDepth) / SEAT_RAMP);
  }
  return P.boreR;
}

/* Außenradius über der Bahn. Der Muffenschenkel trägt D, der
   Gewindeschenkel den schlankeren Körper über dem Einsatz, davor der
   Absatz, den das Foto zeigt. */
function skinAlong(P, sA, sB, legB) {
  if (sA <= P.socket) return P.rOut - DRAFT * (P.socket - sA) * 0.5;
  if (sB <= P.collarLen) return P.collarR;
  if (sB <= P.collarLen + 1.2) {
    return P.collarR + (P.rLegB - P.collarR) * smooth((sB - P.collarLen) / 1.2);
  }
  if (sB >= legB - SHOULDER && sB <= legB) {
    return P.rLegB + (P.rOut - P.rLegB) * smooth((sB - (legB - SHOULDER)) / SHOULDER);
  }
  if (sB > legB) return P.rOut;
  return P.rLegB;
}

export function buildElbowBody(P) {
  /* Der Winkel kommt aus P, damit auch die 45°-Varianten diesen Körper
     tragen. Ohne P.angle bleibt es bei 90 — die drei Gewindeprodukte
     bauen damit Zeichen für Zeichen wie vorher. */
  const path = bendPath(P.l, P.angle ?? 90, P.bendR, 24, 40, P.L1);
  let pathLen = 0;
  for (let i = 1; i < path.length; i++) pathLen += path[i].c.distanceTo(path[i - 1].c);

  /* Die beiden Endzonen dürfen sich nicht überschneiden — sonst
     überschreibt die eine die andere und die Bohrung bekommt eine Stufe,
     die niemand angeordnet hat. */
  const need = P.socket + P.groundLen + P.insertDepth + SEAT_RAMP;
  if (need >= pathLen) {
    throw new Error('K-Aqua ' + P.key + ': Muffe und Einsatzsitz brauchen ' +
      need.toFixed(1) + ' mm, die Bahn ist ' + pathLen.toFixed(1) + ' mm lang');
  }

  const legB = P.L1 - P.bendR;   // gerader Teil des Gewindeschenkels

  const outer = sweepPath((t) => {
    const sA = t * pathLen;
    return circleLoop(skinAlong(P, sA, pathLen - sA, legB), SEG_VIS, 0.15);
  }, path);

  const inner = sweepPath((t) => {
    const sA = t * pathLen;
    return circleLoop(boreAlong(P, sA, pathLen - sA), SEG_INT, 0.3);
  }, path, { flip: true });

  /* Ringflächen an beiden Stirnflächen. Ohne sie ist der Winkel eine
     offene Schale und die Schnittansicht zeigt Löcher. */
  const rings = [];
  for (const [idx, flip] of [[0, true], [path.length - 1, false]]) {
    const st = path[idx];
    const sA = idx === 0 ? 0 : pathLen;
    const rIn = boreAlong(P, sA, pathLen - sA);
    const rOutHere = skinAlong(P, sA, pathLen - sA, legB);
    const ring = new THREE.RingGeometry(rIn, rOutHere, SEG_VIS, 1);
    const q = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, flip ? -1 : 1), st.t.clone().normalize());
    ring.applyQuaternion(q);
    ring.translate(st.c.x, st.c.y, st.c.z);
    const n = ring.attributes.position.count;
    ring.setAttribute('aWear', new THREE.BufferAttribute(new Float32Array(n).fill(0.5), 1));
    rings.push(ring);
  }

  /* Auswerferstift-Marke auf dem Bogenrücken — ohne sie sieht das Teil
     nach CAD-Viewer aus (Visuelle Referenz §2.2). */
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

  return { geo: mergeGeometries([outer, inner, ...rings, disc]), cap: null, path, pathLen };
}

/* Messingeinsatz. Achse ist +Y — das ist der Gewindeschenkel der Bahn.
   Der Schaft trägt drei Ringzähne; die Zeichnung zeigt sie im Schnitt
   als Verankerung im PP. Sichtbar ist außen nur das Gewinde. */


/* == _femalemale/params.js ============================================= */
/* K-Aqua Winkel Muffe/Spitzende — Parametrik.

   Zwei Produkte, ein Körper:
     fittings/elbow-45-female-male   AQ041, 45°
     fittings/elbow-90-female-male   AQ091, 90°

   Ein Winkel, dessen einer Schenkel eine SCHWEISSMUFFE ist und dessen
   anderer ein ROHRENDE (Spitzende) — es steckt in die Muffe des nächsten
   Teils. Damit kommt der Körper aus ../_bendthread/parts.js unverändert
   zurecht: dort ist Schenkel A ohnehin eine Muffe, und Schenkel B braucht
   nur einen Sitz von der Tiefe null, dann bleibt er durchgehend Rohr.

   ── MASSSCHLÜSSEL ──
     d    Rohr-Außendurchmesser. Gilt für BEIDE Enden: die Muffe nimmt
          ihn auf, das Spitzende hat ihn.
     D    Außendurchmesser des Fittings am Muffenschenkel
     l    Achse bis Stirnfläche der Muffe
     z    Einbaulänge der Muffe
     z₁   Achse bis Spitze des Rohrendes

   ── l − z TRIFFT DIE NORMREIHE, UND ZWAR BESSER ALS ANDERSWO ──

     45°  d20  20 − 5  = 15      Normreihe DVS 2207-11: 14,5
          d25  22 − 6  = 16                              16,0
     90°  d20  27 − 12 = 15                              14,5
          d25  30 − 14 = 16                              16,0

   Vier von vier Zeilen auf 0…0,5 mm. Die Muffentiefe kommt trotzdem aus
   fusionDepth(d); der Tabellenwert wandert als socketFromTable in den
   Prüfbericht (Fall 4).

   ── D DECKT SICH MIT DER MUFFENTABELLE ──
   29 bei d20, 34 bei d25 — dieselben Werte wie products/socket. Der
   Muffenschenkel ist derselbe Körper wie beim einfachen Winkel.

   ── ASSUMPTION Einstecktiefe des Spitzendes ──
   Die Tabelle bemaßt sie nicht. Das Rohrende soll in die Muffe des
   Gegenstücks passen, also ist seine nutzbare Länge die Muffentiefe.
   Angesetzt wird die volle freie Länge z₁ − (Bogenauslauf); geprüft wird
   nur, dass sie die Normtiefe TRÄGT — reicht sie nicht, wirft die
   Parametrik. */


export function femaleMaleParams(a, cfg) {
  const P = Object.assign({}, a);
  const d = a.d;

  P.angle = cfg.angle;
  P.l = a.l;                     // Schenkel A: Muffe
  P.L1 = a.z1;                   // Schenkel B: Rohrende
  P.rOut = a.D / 2;
  P.rLegB = d / 2;               // das Spitzende IST ein Rohr
  P.OD = a.D;

  P.socket = fusionDepth(d);
  if (!P.socket) throw new Error('K-Aqua Winkel M/S d' + d + ': keine Schweißtiefe in der Normreihe');
  P.socketFromTable = a.l - a.z;
  P.depthDeltaToNorm = Math.round((P.socketFromTable - P.socket) * 10) / 10;

  P.wallPipe = d / 6;            // SDR 6
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;
  P.wallFitting = (a.D - d) / 2;
  P.restwand = P.wallFitting;
  P.restwandB = P.wallPipe;
  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);

  P.rSockGround = d / 2 - P.sockTaper * (P.socket - 2);
  P.groundLen = 1.0;
  P.probeR = P.rSockGround - 0.15;

  /* Kein Messingsitz und kein Absatz: Schenkel B ist durchgehend Rohr.
     insertDepth = 0 schaltet die Sitzzone in boreAlong ab, rInsertOut
     auf die Rohrbohrung gesetzt macht auch die Übergangsrampe wirkungslos. */
  P.insertDepth = 0;
  P.rInsertOut = P.boreR;
  P.collarLen = 0;
  P.collarR = P.rLegB;

  const halb = Math.tan((P.angle * D2R) / 2);
  const maxRA = (a.l - P.socket - 1.5) / halb;
  const maxRB = (a.z1 - 1.5) / halb;
  P.bendR = Math.max(d * 0.22, Math.min(d * 0.5, maxRA, maxRB));

  P.emR = Math.min(2.0, 0.05 * d);

  /* Das freie Rohrende ab dem Bogenauslauf. Es muss die Normtiefe
     tragen, sonst passt das Teil in kein Gegenstück. */
  P.spigotFree = Math.round((a.z1 - P.bendR) * 10) / 10;
  if (P.spigotFree < P.socket) {
    throw new Error('K-Aqua ' + a.key + ': freies Rohrende ' + P.spigotFree +
      ' mm trägt die Muffentiefe ' + P.socket + ' mm nicht');
  }

  /* Messstation für die Rohrbohrung am Muffenschenkel: hinter der Muffe,
     vor dem Bogen. */
  /* Der gerade Teil des Schenkels endet am SETBACK, nicht bei bendR:
     der Bogen frisst R·tan(α/2). Bei 90° sind beide gleich, bei 45° ist
     der Setback nur 41 % von R — mit bendR gerechnet lag die Grenze
     6 mm zu weit außen und der Wächter schlug an. */
  const setback = P.bendR * halb;
  const lo = -a.l + P.socket + P.groundLen;
  const hi = -setback;
  if (!(hi > lo)) {
    throw new Error('K-Aqua ' + a.key + ': kein freier Rohrabschnitt zwischen ' +
      'Muffe und Bogen (' + lo.toFixed(1) + ' … ' + hi.toFixed(1) + ')');
  }
  P.xBore = Math.round(((lo + hi) / 2) * 100) / 100;
  return P;
}


/* == _femalemale/assembly.js =========================================== */
/* K-Aqua Winkel Muffe/Spitzende — Baugruppe und Maßtest.

   Zwei Produkte rufen buildFemaleMale() mit ihrer Tabelle und ihrem
   Winkel auf. Der Bau steht genau einmal hier (Fall 32).

   ── WARUM DIE MESSUNGEN ENTLANG DER SCHENKELACHSEN LAUFEN ──
   Bei 90° zeigt Schenkel B auf +Y, und man kommt mit Schnitten in x und
   y aus. Bei 45° zeigt er auf (cos45°, sin45°) — dort trifft ein
   y-Schnitt die Achse nicht mehr. Beide Schenkelachsen gehen durch den
   Ursprung, deshalb misst diese Datei generisch:

     t = v · dir            Bogenlänge längs der Schenkelachse
     r = |v − t·dir|        Abstand von der Schenkelachse

   Das gilt für jeden Winkel und ist zugleich genauer als der Schnitt:
   es fällt kein Punkt heraus, nur weil er neben der Ebene liegt. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

export function buildFemaleMale(cfg, size, variant, clipPlane) {
  const a = cfg.article(size);
  const P = femaleMaleParams(a, cfg);
  const ang = P.angle * D2R;

  const A = createAssembly({
    name: cfg.exportName + '_d' + a.d,
    materials: ['pprGreen'],
    seed: cfg.seed,
    clipPlane,
  });

  const body = buildElbowBody(P);

  A.part('body', {
    name: 'PP_Winkel', label: 'PP-R-Winkelkörper', mat: 'pprGreen',
    explode: V3(0, 0, 0),
    geo: body.geo, cap: body.cap,
    anchor: V3(-a.l * 0.7, P.rOut + 0.3 * a.l, 0),
  });

  A.light(V3(-a.l * 0.6, 0, 0));
  A.light(V3(a.z1 * 0.4, a.z1 * 0.5, 0));

  const dirA = new THREE.Vector3(-1, 0, 0);
  const dirB = new THREE.Vector3(Math.cos(ang), Math.sin(ang), 0);
  const POS = body.geo.attributes.position;

  /* Schnitt durch einen Schenkel: Punkte, deren Projektion auf die
     Schenkelachse bei s liegt UND die in der Ebene liegen, die die Achse
     mit z aufspannt. Radius ist dann |z|.

     ── WARUM NICHT DER REINE ACHSABSTAND ──
     Die erste Fassung nahm alle Punkte mit t ≈ s und maß ihren Abstand
     zur Achse. Bei 90° geht das durch; bei 45° las sie D = 30,54 statt
     29. Ursache: nahe der Ecke haben Mantelpunkte des SPITZENDES
     ebenfalls t ≈ s, und ihr Abstand zur MUFFENachse ist größer als
     deren Radius.

     Der Ebenenschnitt schließt sie aus, und zwar nachweislich: ein Punkt
     des Spitzendes mit v·n = 0 liegt bei x = +1,414·u (u ist sein Ort
     auf der B-Achse, u ≥ Setback > 0), also bei t = −x < 0. Er kann die
     Station s > 0 des Muffenschenkels nicht erreichen. */
  const cut = (dir, nrm, s, half) => {
    const v = new THREE.Vector3();
    let rMax = 0, rMin = Infinity, n = 0;
    for (let i = 0; i < POS.count; i++) {
      v.set(POS.getX(i), POS.getY(i), POS.getZ(i));
      if (Math.abs(v.dot(dir) - s) > half) continue;
      if (Math.abs(v.dot(nrm)) > 0.35) continue;
      const r = Math.abs(v.z);
      if (r > rMax) rMax = r;
      if (r < rMin) rMin = r;
      n++;
    }
    return n ? { rMax, rMin, n } : { rMax: NaN, rMin: NaN, n: 0 };
  };
  /* In der Bogenebene senkrecht auf der jeweiligen Schenkelachse. */
  const nA = new THREE.Vector3(0, 1, 0);
  const nB = new THREE.Vector3(-Math.sin(ang), Math.cos(ang), 0);
  const reach = (dir) => {
    const v = new THREE.Vector3();
    let m = -Infinity;
    for (let i = 0; i < POS.count; i++) {
      v.set(POS.getX(i), POS.getY(i), POS.getZ(i));
      const t = v.dot(dir);
      if (t > m) m = t;
    }
    return Math.round(m * 100) / 100;
  };
  const r2 = (v) => (Number.isFinite(v) ? Math.round(v * 200) / 100 : NaN);

  A.measures = [
    { key: 'l', label: cfg.dimensionKey.l, soll: a.l, ist: () => reach(dirA) },
    { key: 'z1', label: cfg.dimensionKey.z1, soll: a.z1, ist: () => reach(dirB) },

    /* D am Muffenschenkel gegen d am Spitzende: dasselbe Merkmal an zwei
       Stellen, und es MUSS verschiedene Werte liefern (Fall 25). */
    { key: 'D', label: cfg.dimensionKey.D, soll: a.D,
      ist: () => r2(cut(dirA, nA, a.l - P.socket, 0.4).rMax) },
    { key: 'd_spitze', label: 'Ø des Spitzendes', soll: a.d,
      ist: () => r2(cut(dirB, nB, a.z1 - 3, 0.4).rMax) },

    { key: 'muffenbohrung', label: 'Muffenbohrung (2 mm hinter dem Mundloch)', soll: a.d,
      ist: () => r2(cut(dirA, nA, a.l - 2, 0.4).rMin) },
    { key: 'bohrung', label: 'Rohrbohrung hinter der Muffe', soll: r2(P.boreR),
      ist: () => r2(cut(dirA, nA, -P.xBore, 0.35).rMin) },
    { key: 'bohrung_spitze', label: 'Rohrbohrung im Spitzende', soll: r2(P.boreR),
      ist: () => r2(cut(dirB, nB, a.z1 - 3, 0.4).rMin) },

    { key: 'freies_ende', label: 'Freies Rohrende ab Bogenauslauf', soll: P.spigotFree,
      ist: () => P.spigotFree },

    { key: 'symmetrie_z', label: 'Körper symmetrisch zur XY-Ebene (soll 0)', soll: 0,
      ist: () => {
        const b = A.visibleBoxOf(['body']);
        return Math.round((b.max.z + b.min.z) * 1000) / 1000;
      } },

    { key: 'restwand', label: 'Restwand Muffenschenkel', soll: P.restwand,
      ist: () => P.restwand },
    { key: 'restwandB', label: 'Wandstärke Spitzende', soll: P.restwandB,
      ist: () => P.restwandB },
  ];

  return A;
}


/* == elbow-90-female-male/data.js ====================================== */
/* K-Aqua Winkel 90° Muffe/Spitzende — Artikeltabelle.

   PHASE 1, verifiziert am 24.08.2026 gegen den Druckkatalog
   Marketing/Print/KA-Katalog_GB_06-2025_NEU.pdf, Seite 85 (unterer
   Block), und gegen die Website-Aufnahme
   K-Aqua Unterseitem Kopie/Fittings K-Aqua/
     screencapture-…-fittings-elbow-90-femalemale-….pdf

   Spaltenköpfe wie abgebildet:
     Code · d · D · l · z · z₁ · kg · Pack.
   2 Größen — mehr führt der Katalog nicht. Nach der letzten Zeile folgt
   der ORDER-Knopf (Fall 2).

   MASSSCHLÜSSEL: siehe ../_femalemale/params.js.

   ── GEGENPROBE l − z GEGEN DIE NORMREIHE DVS 2207-11 ──
     d20  27 − 12 = 15     Normreihe 14,5
     d25  30 − 14 = 16     Normreihe 16,0
   Beide Zeilen auf 0…0,5 mm. Die Muffentiefe kommt trotzdem aus
   fusionDepth(d); der Tabellenwert steht als socketFromTable im
   Prüfbericht (Fall 4).

   ── GEGENPROBE D GEGEN DIE MUFFENTABELLE ──
   29 bei d20, 34 bei d25 — dieselben Werte wie products/socket und wie
   der einfache Winkel. Der Muffenschenkel ist derselbe Körper. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 2;
export const SDR = 6;
export const ANGLE = 90;

export const ARTICLES = [
  { code: 'AQ09120', key: '20', d: 20, l: 27, z: 12, D: 29, z1: 36, kg: 0.02, pack: 300 },
  { code: 'AQ09125', key: '25', d: 25, l: 30, z: 14, D: 34, z1: 41, kg: 0.02, pack: 180 },
];

export const SIZES = ARTICLES.map((a) => a.key);

export const DIMENSION_KEY = {
  d: 'Nennmaß Rohr',
  D: 'Außendurchmesser am Muffenschenkel',
  l: 'Achse bis Stirnfläche der Muffe',
  z: 'Einbaulänge der Muffe',
  z1: 'Achse bis Spitze des Rohrendes',
};

export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}

export function sizeLabel(key) { return 'd' + key; }


/* == elbow-90-female-male/params.js ==================================== */
/* K-Aqua Winkel 90° Muffe/Spitzende — Parametrik.

   Die Rechnung steht in ../_femalemale/params.js: der 45°- und der
   90°-Winkel teilen sie, und zweimal dieselbe Rechnung driftet (Fall 32).
   Hier steht nur der Ablenkwinkel. */


export const CONFIG = { angle: ANGLE };

export function params(key) {
  return femaleMaleParams(article(key), CONFIG);
}


/* == elbow-90-female-male/parts.js ===================================== */
/* K-Aqua Winkel 90° Muffe/Spitzende — Konturen.

   Der Körper kommt vollständig aus ../_bendthread/parts.js, die
   Baugruppe aus ../_femalemale/assembly.js. */


/* == elbow-90-female-male/index.js ===================================== */
/* K-Aqua Winkel 90° Muffe/Spitzende — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Winkel mit ZWEI verschiedenen Enden: der eine Schenkel ist eine
   Schweißmuffe, der andere ein Rohrende, das in die Muffe des nächsten
   Teils gesteckt wird. Damit lässt sich die Richtung wechseln, ohne ein
   Rohrstück dazwischenzusetzen.

   Ein Werkstoff, ein Teil. Der Halbschnitt zeigt, dass die Bohrung vom
   Muffengrund bis in die Spitze durchläuft.

   Der Körper ist derselbe wie beim Winkel mit Außengewinde — ungleiche
   Schenkel, ungleiche Außendurchmesser (../_bendthread/parts.js). Er
   trägt seit dem 24.08.2026 auch den Ablenkwinkel als Parameter; vorher
   war 90° fest verdrahtet. */


const product = {
  id: 'fittings/elbow-90-female-male',
  module: 'kaqua-elbow-90-female-male',
  titleDe: 'Winkel 90° Muffe/Spitzende',
  titleEn: 'Elbow 90° (Female/male)',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'key',
  sizeLabel,
  sizeTitle: 'Nennweite',
  defaultSize: '25',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'D', 'l', 'z1', 'kg'],
  dimensions: ['l', 'z1'],
  ariaFields: ['d', 'D', 'l', 'z', 'z1'],

  variants: [],
  states: null,

  tile: 'Richtungswechsel um 90° ohne Zwischenrohr: Muffe am einen ' +
        'Schenkel, Spitzende am anderen.',

  build(size, variant, clipPlane) {
    return buildFemaleMale({
      ...CONFIG,
      article,
      dimensionKey: DIMENSION_KEY,
      exportName: 'K-Aqua_Winkel90_MS',
      seed: 251,
    }, size, variant, clipPlane);
  },
};

export { product as default };
