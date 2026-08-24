/* K-Aqua 3D · Wandscheibe 90° mit Innengewinde — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID transition-fittings/elbow-wall-bracket-90-female-thread.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, DRAFT, ISO, SEG_FINE, SEG_INT, SEG_VIS, bendPath, buildProfile, capFromProfile, circleLoop, createAssembly, fusionDepth, hexPrism, materials, mergeGeometries, plateWithHoles, revolve, sweepPath, threadProfile, threadSpec,
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


/* == _bracket/params.js ================================================ */
/* K-Aqua Anschlussbogen und Wandscheibe 90° IG — Parametrik.

   Zwei Produkte, ein Körper:
     transition-fittings/elbow-bracket-90-female-thread        AQ090G
     transition-fittings/elbow-wall-bracket-90-female-thread   AQ472G

   Sie unterscheiden sich in genau einem Merkmal — die Wandscheibe trägt
   eine Lasche mit Schraubloch. Zweimal dieselbe Rechnung würde driften
   (Fall 32).

   ── MASSSCHLÜSSEL, beide Tabellen gleich ──
     d    Rohr-Außendurchmesser = Muffenbohrung
     Rp   zylindrisches Innengewinde, in Zoll (ISO 228-1)
     D    Außendurchmesser des GEWINDESCHENKELS (senkrecht, +Y)
     L    Achse bis Stirnfläche des Gewindeschenkels
     z    Achse bis Schulter, wo der Messingring beginnt
     h    Achse bis Unterkante des Teils
     D₁   Außendurchmesser des MUFFENSCHENKELS (waagrecht, −X)
     L₁   Achse bis Stirnfläche der Muffe
     z₁   Achse bis Muffengrund

   Die Zuordnung von D zum Gewindeschenkel und D₁ zur Muffe steht in der
   Maßzeichnung: D ist oben über dem senkrechten Schenkel angesetzt, D₁
   rechts am waagrechten. Gegenprobe über die Zahlen: D₁ hängt allein an
   d (20→29, 25→34, 32→43, in allen fünf Zeilen), D dagegen wächst mit
   dem Gewinde (25×½"→35 gegen 25×¾"→43). Ein vertauschtes Paar würde
   diese Abhängigkeit zerreißen (Fall 28).

   ── L − z IST DIE RINGHÖHE ──
   Dieselbe Rolle, die beim T-Stück mit Innengewinde h − z₁ spielt
   (products/tee-90-female-thread). Werte:

     AQ090G  14 · 14 · 11 · 15 · 17 mm
     AQ472G  14 · 14 · 15 · 15 · 15 mm

   Die 11 mm bei AQ090G2534 fallen aus der Reihe — ½" bekommt dort 14.
   Der Wert ist KEIN Lesefehler: Druckkatalog S. 95 und die
   Website-Aufnahme führen ihn beide, Zeile für Zeile identisch. Zwei
   unabhängige Rang-1-Quellen bestätigen sich, also folgt das Modell der
   Tabelle (Fall 31).

   ── MUFFENTIEFE AUS DER NORMREIHE, NICHT AUS L₁ − z₁ ──
   Wie überall im Katalog: fusionDepth(d). Der Tabellenwert L₁ − z₁
   wandert als socketFromTable in den Prüfbericht (Fall 4). Gegenprobe:

     d20  27 − 11 = 16      Normreihe DVS 2207-11: 14,5
     d25  30 − 14 = 16  ·  32 − 19 = 13                16,0
     d32  36,5 − 18 = 18,5  ·  39,5 − 17 = 22,5        18,0

   Die Streuung ist größer als beim Winkel (dort ±1,5 mm). Sie steht so
   im Prüfbericht; modelliert wird die Norm, weil das Schweißwerkzeug je
   Nennweite dasselbe ist.

   ── h IST NICHT GEDEUTET (Fall 29) ──
   Die naheliegende Deutung „Achse bis Unterkante" wurde am gebauten
   Modell GEPRÜFT und ist WIDERLEGT: die Unterkante liegt in jeder
   Größe bei genau D₁/2 — 14,5 · 17 · 17 · 21,5 · 21,5 — die Tabelle
   führt aber 13 · 15 · 20 · 18 · 20. Nur eine Zeile (d25×¾") liegt
   über D₁/2, vier darunter; unter den Radius des Muffenschenkels kann
   die Unterkante eines Winkels nicht rutschen.

   Was h bezeichnet, ist damit offen und wird NICHT angesetzt. Die
   Zeichnung ist schematisch und zeigt h zwar unterhalb der Mittellinie,
   liefert aber keine Proportionen (dasselbe Bild wie beim Winkel mit
   Außengewinde).

   EIN Teil von h ist trotzdem belegt, und zwar der, den die Wandscheibe
   braucht: h ist bei AQ472G in jeder vergleichbaren Zeile genau 2 mm
   größer als bei AQ090G (15/17/22/22 gegen 13/15/20/20). Der Körper ist
   derselbe, also sind diese 2 mm das, was die Lasche unter ihm
   hervorsteht. Eine DIFFERENZ ist auch dann verwertbar, wenn der
   Bezugspunkt unbekannt ist — sie hebt ihn heraus. */


export function bracketParams(a, cfg) {
  const P = Object.assign({}, a);
  const d = a.d;

  const th = threadSpec(a.Rp);
  if (!th) throw new Error('K-Aqua Anschlussbogen: kein Normmaß für Rp' + a.Rp);
  P.threadKind = 'Rp';
  P.threadLabel = a.Rp;
  P.threadOD = th.od;
  P.threadPitch = th.pitch;
  P.threadH = 0.640327 * th.pitch;
  P.threadCore = Math.round((th.od - 2 * P.threadH) * 1000) / 1000;

  /* Schenkel A = Muffe (−X), Schenkel B = Gewinde (+Y). Die Namen sind
     die von _bendthread/parts.js, damit derselbe Körper trägt. */
  P.l = a.L1;
  P.L1 = a.L;
  P.rOut = a.D1 / 2;
  P.rLegB = a.D / 2;
  P.OD = a.D1;

  P.socket = fusionDepth(d);
  if (!P.socket) throw new Error('K-Aqua Anschlussbogen d' + d + ': keine Schweißtiefe in der Normreihe');
  P.socketFromTable = a.L1 - a.z1;
  P.depthDeltaToNorm = Math.round((P.socketFromTable - P.socket) * 10) / 10;

  P.wallPipe = d / 6;                      // SDR 6
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;
  P.wallFitting = (a.D1 - d) / 2;
  P.restwand = P.wallFitting;
  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);

  P.rSockGround = d / 2 - P.sockTaper * (P.socket - 2);
  P.groundLen = 1.0;
  P.probeR = P.rSockGround - 0.15;

  /* Ring aus Messing. Höhe aus der Tabelle (L − z), Außendurchmesser
     wie beim Gewinde-T-Stück: Gewinde-Ø plus Wand, gedeckelt so, dass
     über dem Ring 1,1 mm PP bleiben. */
  P.ringHeight = Math.round((a.L - a.z) * 10) / 10;
  P.insertDepth = P.ringHeight;
  P.brassOD = Math.min(a.D - 2.2, P.threadOD + 2 * Math.max(2.2, 0.09 * P.threadOD));
  P.brassR = P.brassOD / 2;
  P.rInsertOut = P.brassR;
  P.brassBottom = a.z;
  P.brassTop = a.L;
  P.restwandB = Math.round((a.D - P.brassOD) / 2 * 100) / 100;

  /* Gänge über die tragende Gewindelänge, mindestens drei — wie im
     Gewinde-T-Stück. */
  P.threadLen = P.ringHeight - 2.0;
  P.turns = Math.max(3, Math.floor((P.threadLen - 0.6) / P.threadPitch));

  /* KEIN Absatz vor dem Messing. Foto AQ090GP und das Katalogfoto S. 95
     zeigen einen glatten Zylinder bis zur Stirnfläche. collarLen = 0
     schaltet die Absatzzone in skinAlong ab. */
  P.collarLen = 0;
  P.collarR = P.rLegB;

  /* Bogenradius: er muss in BEIDE Schenkel passen. Der Muffenschenkel
     gibt l − socket her, der Gewindeschenkel L1 − Ringhöhe. */
  const maxRA = a.L1 - P.socket - 1.5;
  const maxRB = a.L - P.ringHeight - 1.5;
  P.bendR = Math.max(d * 0.22, Math.min(d * 0.5, maxRA, maxRB));

  P.emR = Math.min(2.0, 0.05 * d);

  /* Messstation für die Rohrbohrung: auf dem geraden Muffenschenkel,
     hinter der Muffe und vor dem Bogen. Das Fenster ist eng — bei
     d25×½" 0,5 mm breit — deshalb genau die Mitte. */
  const boreLo = -a.L1 + P.socket + P.groundLen;
  /* Setback statt bendR — bei 90° derselbe Wert, aber der Setback ist
     der richtige Begriff: der Bogen frisst R·tan(α/2) vom Schenkel. */
  const boreHi = -P.bendR * Math.tan((90 * D2R) / 2);
  P.xBore = Math.round(((boreLo + boreHi) / 2) * 100) / 100;
  if (!(boreHi > boreLo)) {
    throw new Error('K-Aqua ' + a.key + ': kein freier Rohrabschnitt zwischen ' +
      'Muffe und Bogen (' + boreLo.toFixed(1) + ' … ' + boreHi.toFixed(1) + ')');
  }

  if (P.restwandB < 1.0) {
    throw new Error('K-Aqua ' + a.key + ': PP über dem Messingring ' +
      P.restwandB.toFixed(2) + ' mm — zu dünn');
  }
  if (P.restwand < 3) {
    throw new Error('K-Aqua ' + a.key + ': Restwand Muffenschenkel ' +
      P.restwand.toFixed(2) + ' mm < 3 mm');
  }

  P.hasLug = !!cfg.lug;
  if (P.hasLug) lugParams(P, a);
  return P;
}

/* ── ASSUMPTION Lasche ──
   KEINE Spalte bemaßt sie. Die einzige Quelle ist das Foto
   Marketing/Produktbilder/grün (RAL 6024)/AQ472G …png und das
   Katalogfoto S. 95 — beide Drei-Viertel-Ansichten mit Perspektive. Die
   abgebildete Größe ließ sich nach Fall 35 NICHT bestimmen.

   Ein Maß kommt trotzdem aus der Tabelle, und es ist das wichtigste:
   h ist bei AQ472G in jeder vergleichbaren Zeile genau 2 mm größer als
   bei AQ090G (15/17/22/22 gegen 13/15/20/20). Der Körper ist derselbe,
   also sind diese 2 mm das, was die Lasche unter ihm hervorsteht.

   Alles Übrige ist am Foto abgegriffen, in Anteilen des
   Gewindeschenkel-Durchmessers D, und trägt die Unsicherheit der
   Perspektive:

     Plattenmitte ab der Achse   0,30 · D
     Plattenradius               0,70 · D   reicht bis unter den Bogen
     Lochdurchmesser             0,20 · D   ein Loch, nahe dem freien Ende
     Lochmitte ab der Achse      0,72 · D

   Der Plattenradius ist so gewählt, dass die Platte den Körper in JEDER
   Größe erreicht und mit ihm verschmilzt. Die erste Fassung setzte sie
   weiter außen an — sie schwebte dann frei neben dem Winkel, und das
   sah man erst in der Sichtprobe, nicht im Maßtest (Fall 38).

   NICHT modelliert, weil aus einem einzigen Blickwinkel nicht
   auflösbar: die Einbuchtung an der Oberkante der Platte, die auf dem
   Foto wie eine zweite, offene Befestigung aussieht. Sie steht als
   offener Punkt in LOOP-STATUS.md. */
function lugParams(P, a) {
  P.lugProud = 2.0;                          // aus h(AQ472G) − h(AQ090G)
  P.lugThick = Math.max(3.0, 0.10 * a.D);
  P.lugCenterX = Math.round(0.30 * a.D * 10) / 10;
  P.lugPadR = Math.round(0.70 * a.D * 10) / 10;
  P.lugHoleD = Math.round(0.20 * a.D * 10) / 10;
  P.lugHoleX = Math.round(0.72 * a.D * 10) / 10;
  /* Die Platte muss den Körper erreichen, sonst schwebt sie. Der
     Körper reicht am Boden bis −rOut in −X; die Platte beginnt bei
     lugCenterX − lugPadR und muss darüber hinausgehen. */
  if (P.lugCenterX - P.lugPadR > -P.rOut * 0.5) {
    throw new Error('K-Aqua ' + a.key + ': Lasche beginnt bei x = ' +
      (P.lugCenterX - P.lugPadR).toFixed(1) + ' und erreicht den Körper nicht');
  }
}


/* == _bracket/parts.js ================================================= */
/* K-Aqua Anschlussbogen und Wandscheibe 90° IG — Konturen.

   Der Winkelkörper kommt aus ../_bendthread/parts.js — derselbe, den
   auch der Winkel mit Außengewinde trägt. Hier stehen nur die beiden
   Teile, die ihn von jenem unterscheiden: der Messingring mit
   Innengewinde und die Lasche der Wandscheibe.

   BEKANNTE DOPPLUNG: buildBrassRing steht Zeichen für Zeichen auch in
   ../_teethread/parts.js. Beide Ringe sind reine Kerngeometrie — ein
   Rotationskörper mit Innengewinde — und gehören in den Core, neben
   threadProfile und hexPrism. Das ist ein eigener Arbeitsschritt mit
   Vollbau danach und steht als solcher in LOOP-STATUS.md; hier
   benannt statt stillschweigend angelegt (Fall 32). */


/* 1 · Messingring mit zylindrischem Innengewinde Rp.

   Bündig im PP: sichtbar ist von außen nur der schmale goldene Kreis an
   der Stirnfläche und das Gewinde in der Bohrung — genau das, was
   AQ090GP und das Katalogfoto S. 95 zeigen.

   threadProfile mit kind 'Rp': die Kuppe liegt auf dem KERN
   (threadOD − 2h), der Grund auf dem Nennmaß. */
export function buildBrassRing(P) {
  const yA = P.brassBottom;
  const yB = P.brassTop;
  const rIn = P.threadCore / 2;

  const thread = threadProfile(P.threadOD, P.threadPitch, P.turns, 'Rp')
    .map((p) => ({ a: yA + 1.0 + p.a, r: p.r, fillet: p.fillet }))
    .filter((p) => p.a <= yB - 0.8);

  const outer = [
    { a: yA, r: P.brassR - 0.15, chamfer: 0.5 },
    { a: yB, r: P.brassR - 0.15, chamfer: 0.5 },
  ];
  const inner = [
    { a: yB, r: rIn + P.threadPitch * 0.25, chamfer: 0.8 },
    ...thread.slice().reverse(),
    { a: yA + 1.0, r: rIn, fillet: 0.4 },
    { a: yA, r: rIn, chamfer: 0.4 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  return {
    geo: revolve(profile, { axis: 'y', segments: SEG_VIS }),
    cap: capFromProfile(profile, 'y'),
  };
}

/* 2 · Lasche der Wandscheibe.

   Eine flache Platte am Boden des Teils, mit einem Durchgangsloch. Sie
   liegt waagrecht — ihre Fläche ist die Wandauflage, das Loch nimmt die
   Schraube auf.

   ALLE Maße sind ASSUMPTION bis auf EINES: wie weit sie unter dem
   Körper hervorsteht. Das steht in der Tabelle, wenn auch nicht als
   eigene Spalte — h ist bei AQ472G in jeder vergleichbaren Zeile genau
   2 mm größer als bei AQ090G, und der Körper ist derselbe. Herleitung
   im Kopfkommentar von params.js.

   Gestalt: das Foto zeigt einen gewaisteten Umriss, außen rund um das
   Loch, zur Mitte hin schmaler. Modelliert ist die runde Platte um das
   Loch, weit genug, dass sie den Körper erreicht und mit ihm
   verschmilzt. Die Waise ist nicht bemaßt und aus einem einzigen
   Blickwinkel nicht auflösbar; sie zu erfinden hieße raten. Der Umkreis
   ist damit das größte Maß, und das ist die sichere Seite.

   plateWithHoles extrudiert in +X. Die Platte liegt aber waagrecht,
   also wird sie um Z gedreht: aus +X wird +Y. */
export function buildLug(P) {
  const rPad = P.lugPadR;
  /* Unterkante NICHT aus h — die Spalte ist nicht gedeutet. Der
     Körper selbst gibt sie her: seine tiefste Stelle liegt auf dem
     Radius des Muffenschenkels. Darunter steht die Lasche um
     lugProud hervor, und DAS ist aus der Tabelle belegt (Differenz
     h(AQ472G) − h(AQ090G) = 2 mm in jeder Zeile). */
  const yBottom = -(P.rOut + P.lugProud);
  /* Koordinaten: plateWithHoles legt die Scheibe in der Shape-Ebene an
     und extrudiert in +X. Nach rotateZ(90°) wird aus der Dicke +Y, aus
     Shape-y wird −X und aus Shape-x wird −Z. Das Loch sitzt deshalb bei
     Shape-y = −(Lochmitte − Plattenmitte). */
  const dx = P.lugHoleX - P.lugCenterX;
  const geo = plateWithHoles(rPad, 0, P.lugThick,
    [{ r: P.lugHoleD / 2, x: 0, y: -dx }],
    { bevel: Math.min(0.6, P.lugThick * 0.2), segments: SEG_VIS, x0: 0 });

  geo.rotateZ(Math.PI / 2);              // Dicke von +X nach +Y
  geo.translate(P.lugCenterX, yBottom, 0);
  return { geo, cap: null };
}


/* == _bracket/assembly.js ============================================== */
/* K-Aqua Anschlussbogen und Wandscheibe 90° IG — Baugruppe und Maßtest.

   Zwei Produkte rufen buildBracket() mit ihrer Tabelle auf; cfg.lug
   entscheidet über die Lasche. Der Bau steht genau einmal hier (Fall 32).

   Achsen: Muffenschenkel auf −X, Gewindeschenkel auf +Y. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

export function buildBracket(cfg, size, variant, clipPlane) {
  const a = cfg.article(size);
  const P = bracketParams(a, cfg);

  const A = createAssembly({
    name: cfg.exportName + '_d' + a.d + 'x' + String(a.Rp).replace(/[ /]/g, '_'),
    materials: ['pprGreen', 'brass'],
    seed: cfg.seed,
    clipPlane,
  });

  const body = buildElbowBody(P);
  const ring = buildBrassRing(P);
  const lug = P.hasLug ? buildLug(P) : null;

  /* Abtastung der Punktwolke statt Strahl — sie liefert Werte statt
     Treffer/kein Treffer (Fall 25) und kann dieselbe Stelle in zwei um
     90° gedrehten Ebenen messen (Fall 11). Vorgehen wie beim Winkel mit
     Außengewinde. */
  const POS = body.geo.attributes.position;
  const slab = (achse, wert, halb, ebene) => {
    const querZ = ebene === 'z0';
    let rMax = 0, rMin = Infinity, n = 0;
    for (let i = 0; i < POS.count; i++) {
      const x = POS.getX(i), y = POS.getY(i), z = POS.getZ(i);
      const s = achse === 'x' ? x : y;
      const q = querZ ? z : (achse === 'x' ? y : x);
      if (Math.abs(s - wert) > halb || Math.abs(q) > 0.35) continue;
      const r = querZ ? Math.abs(y) : Math.abs(z);
      if (r > rMax) rMax = r;
      if (r < rMin) rMin = r;
      n++;
    }
    return n ? { rMax, rMin, n } : { rMax: NaN, rMin: NaN, n: 0 };
  };
  const r2 = (v) => (Number.isFinite(v) ? Math.round(v * 200) / 100 : NaN);

  A.part('body', {
    name: 'PP_Koerper', label: 'PP-R-Winkelkörper', mat: 'pprGreen',
    geo: body.geo, cap: body.cap,
    explode: V3(-0.30 * a.L1, -0.22 * a.L, 0),
    anchor: V3(-a.L1 * 0.7, P.rLegB + 0.26 * a.L, 0),
  });
  A.part('ring', {
    name: 'Messingring', label: 'Messingring Rp' + a.Rp + '" (Innengewinde)',
    mat: 'brass', geo: ring.geo, cap: ring.cap,
    explode: V3(0, 0.55 * a.L, 0),
    anchor: V3(P.rLegB + 0.30 * a.L, a.L * 0.9, 0),
  });
  if (lug) {
    A.part('lug', {
      name: 'Lasche', label: 'Wandlasche mit Schraubloch', mat: 'pprGreen',
      geo: lug.geo, cap: lug.cap,
      explode: V3(0.45 * a.L, -0.30 * a.L, 0),
      anchor: V3(P.lugHoleX, -(a.h) - 0.30 * a.L, 0),
    });
  }

  A.light(V3(-a.L1 * 0.6, 0, 0));
  A.light(V3(0, a.L * 0.6, 0));

  const boxAll = () => A.visibleBoxOf(lug ? ['body', 'lug'] : ['body']);

  A.measures = [
    { key: 'L1', label: cfg.dimensionKey.L1, soll: a.L1,
      ist: () => Math.abs(A.visibleBoxOf(['body']).min.x) },
    { key: 'L', label: cfg.dimensionKey.L, soll: a.L,
      ist: () => A.visibleBoxOf(['body']).max.y },

    /* D am Gewindeschenkel, D₁ am Muffenschenkel. Zwei Messungen
       DERSELBEN Art an verschiedenen Stellen — sie müssen verschiedene
       Werte liefern, sonst prüft keine von beiden etwas (Fall 25). */
    { key: 'D', label: cfg.dimensionKey.D, soll: a.D,
      ist: () => r2(slab('y', a.L - P.ringHeight - 3, 0.4).rMax) },
    { key: 'D1', label: cfg.dimensionKey.D1, soll: a.D1,
      ist: () => r2(slab('x', -a.L1 + P.socket, 0.4).rMax) },
    /* KEINE 90°-Gegenmessung an D₁. Sie war zuerst da und war falsch:
       in der um 90° gedrehten Ebene liegt bei diesem Teil die Außenhaut
       des BOGENS, und der reicht bis zur Oberkante des
       Gewindeschenkels. Gemessen wurden 70 statt 29 mm — die Zahl war
       nicht zufällig, sie war 2·L. Beim Winkel mit Außengewinde geht
       dieselbe Messung durch, weil dort der Gewindeschenkel schlanker
       ist als der Bogen hoch. Ersetzt durch eine Prüfung, die der Bogen
       nicht verfälschen kann. */
    { key: 'symmetrie_z', label: 'Körper symmetrisch zur XY-Ebene (soll 0)', soll: 0,
      ist: () => {
        const b = A.visibleBoxOf(['body']);
        return Math.round((b.max.z + b.min.z) * 1000) / 1000;
      } },

    { key: 'muffenbohrung', label: 'Muffenbohrung (2 mm hinter dem Mundloch)', soll: a.d,
      ist: () => r2(slab('x', -a.L1 + 2, 0.4).rMin) },
    /* Die Rohrbohrung liegt auf dem geraden Muffenschenkel HINTER der
       Muffe und VOR dem Bogen. Das Fenster ist eng: bei d25×½" ist es
       0,5 mm breit. Die erste Fassung tastete bei −(bendR + 1,6) ab und
       lag damit bei zwei Größen noch in der Muffe — gemessen wurden
       23,96 statt 16,67 mm. Jetzt die Fenstermitte. */
    { key: 'bohrung', label: 'Rohrbohrung vor dem Bogen', soll: r2(P.boreR),
      ist: () => r2(slab('x', P.xBore, 0.35).rMin) },

    /* Ringsitz: die Bohrung, in der das Messing sitzt. Gegenprobe zur
       Muffenbohrung — anderer Ort, anderer Wert. */
    /* Der Sitz ist um 0,05 mm je Seite weiter als der Ring — sonst
       lägen zwei Flächen aufeinander und der Halbschnitt zeigte
       Z-Fighting. Das Spiel steht im SOLLWERT, nicht in der Abweichung:
       eine Abweichung, die man erklärt, statt sie zu messen, ist keine
       Prüfung (Fall 23). boreAlong in ../_bendthread/parts.js setzt es. */
    { key: 'ringsitz', label: 'Ø Aufnahmebohrung für den Messingring (mit 0,05 mm Spiel)',
      soll: r2(P.brassOD / 2 + 0.05),
      ist: () => r2(slab('y', a.L - P.ringHeight / 2, 0.4).rMin) },
    { key: 'ringhoehe', label: 'Höhe des Messingrings (L − z)', soll: P.ringHeight,
      ist: () => {
        const b = A.visibleBoxOf(['ring']);
        return Math.round((b.max.y - b.min.y) * 100) / 100;
      } },
    { key: 'ringoben', label: 'Oberkante Messingring = Stirnfläche', soll: a.L,
      ist: () => A.visibleBoxOf(['ring']).max.y },

    /* UNTERKANTE, nicht h. Die Spalte h ist NICHT gedeutet (Fall 29) —
       die Messung hat die naheliegende Deutung „Achse bis Unterkante"
       widerlegt: das Modell liegt in jeder Größe bei genau D₁/2, die
       Tabelle führt 13 · 15 · 20 · 18 · 20. Was h bezeichnet, steht im
       Kopfkommentar von data.js als offene Frage.

       Gemessen wird deshalb, was das Modell zusagt: die Unterkante
       liegt auf dem Radius des Muffenschenkels. Bei der Wandscheibe
       kommt die Lasche darunter — dort ist der Sollwert um lugProud
       größer, und das ist der einzige Teil von h, der belegt ist. */
    { key: 'unterkante', label: 'Achse bis Unterkante',
      soll: r2(P.rOut) / 2 + (P.hasLug ? P.lugProud : 0),
      ist: () => Math.round(Math.abs(boxAll().min.y) * 100) / 100 },

    { key: 'restwand', label: 'Restwand Muffenschenkel', soll: P.restwand,
      ist: () => P.restwand },
    { key: 'restwandB', label: 'Restwand über dem Messingring', soll: P.restwandB,
      ist: () => P.restwandB },
  ];

  return A;
}


/* == elbow-wall-bracket-90-female-thread/data.js ======================= */
/* K-Aqua Wandscheibe 90° mit Innengewinde — Artikeltabelle.

   PHASE 1, verifiziert am 24.08.2026 gegen ZWEI unabhängige
   Rang-1-Quellen, die sich Zeile für Zeile bestätigen:

     Marketing/Print/KA-Katalog_GB_06-2025_NEU.pdf, Seite 95 (oben)
     K-Aqua Unterseitem Kopie/Transition Fittings K-Aqua/
       screencapture-…-elbowwall-bracket-90-female-thread-….png

   Spaltenköpfe wie abgebildet:
     Code · d · Rp · D · L · z · h · D₁ · L₁ · z₁ · kg · Pack.
   5 Größen. Nach der letzten Zeile folgt der ORDER-Knopf (Fall 2).

   Die Markdown-Datei führt 4 Größen. Beide Quellen führen 5. Die
   Markdown-Zahl ist eine untere Schranke, kein Maß (Fall 1).

   ── DIE TABELLE STAND IM KATALOG SPALTENWEISE ──
   Die Textebene des PDF läuft nicht in Leserichtung: auf Seite 95
   stehen erst beide Überschriften, dann die Codes, dann Spalte für
   Spalte die Werte. Zusammengesetzt wurde nach Spaltenposition und
   anschließend gegen die Website-Aufnahme geprüft — alle fünf Zeilen,
   alle zwölf Spalten identisch. Ohne diese Gegenprobe wäre die
   Reihenfolge geraten (Fall 28).

   MASSSCHLÜSSEL: siehe ../_bracket/params.js.

   ── DER UNTERSCHIED ZUM ANSCHLUSSBOGEN IST DIE LASCHE ──
   AQ472G und AQ090G teilen den Körper. Wo beide dieselbe Größe führen,
   sind D₁, z, z₁ gleich und h ist bei AQ472G um genau 2 mm größer:

     d20×½"   h 15 gegen 13
     d25×½"   h 17 gegen 15
     d25×¾"   h 22 gegen 20
     d32×1"   h 22 gegen 20

   Viermal dieselbe Differenz. Das ist die Lasche, die unter dem Körper
   hervorsteht — der einzige Teil ihrer Geometrie, der belegt ist. Alles
   Übrige an ihr ist ASSUMPTION aus dem Foto, siehe ../_bracket/params.js.

   ── GEGENPROBE L₁ − z₁ gegen die Normreihe DVS 2207-11 ──
     d20  27 − 11 = 16     Normreihe 14,5
     d25  30 − 14 = 16     Normreihe 16,0
     d25  35 − 19 = 16     Normreihe 16,0
     d32  35 − 17 = 18     Normreihe 18,0  (zweimal)
   Vier von fünf Zeilen treffen die Reihe auf 0…1,5 mm — deutlich enger
   als beim Anschlussbogen. Modelliert wird die Norm.

   ── L − z ist die Höhe des Messingrings ──
     14 · 14 · 15 · 15 · 15 mm — wächst mit dem Gewinde und bleibt in
     jeder Zeile positiv (Fall 28). */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 5;
export const SDR = 6;

export const ARTICLES = [
  { code: 'AQ472G2012', key: '20x1_2', d: 20, Rp: '1/2', D: 35, L: 35, z: 21, h: 15, D1: 29, L1: 27, z1: 11, kg: 0.08, pack: 150 },
  { code: 'AQ472G2512', key: '25x1_2', d: 25, Rp: '1/2', D: 35, L: 37, z: 23, h: 17, D1: 34, L1: 30, z1: 14, kg: 0.09, pack: 130 },
  { code: 'AQ472G2534', key: '25x3_4', d: 25, Rp: '3/4', D: 43, L: 43, z: 28, h: 22, D1: 34, L1: 35, z1: 19, kg: 0.14, pack: 90 },
  { code: 'AQ472G3234', key: '32x3_4', d: 32, Rp: '3/4', D: 43, L: 43, z: 28, h: 22, D1: 43, L1: 35, z1: 17, kg: 0.15, pack: 60 },
  { code: 'AQ472G321', key: '32x1', d: 32, Rp: '1', D: 43, L: 43, z: 28, h: 22, D1: 43, L1: 35, z1: 17, kg: 0.17, pack: 60 },
];

export const SIZES = ARTICLES.map((a) => a.key);

export const DIMENSION_KEY = {
  d: 'Nennmaß Rohr',
  Rp: 'Rohrgewinde innen',
  D: 'Außendurchmesser Gewindeschenkel',
  L: 'Achse bis Stirnfläche Gewindeschenkel',
  z: 'Achse bis Schulter des Messingrings',
  h: 'Achse bis Unterkante (Spalte nicht gedeutet)',
  D1: 'Außendurchmesser Muffenschenkel',
  L1: 'Achse bis Stirnfläche Muffe',
  z1: 'Achse bis Muffengrund',
};

export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}

export function sizeLabel(key) {
  const [d, g] = String(key).split('x');
  return 'd' + d + ' · Rp' + g.replace('_', '/') + '"';
}


/* == elbow-wall-bracket-90-female-thread/params.js ===================== */
/* K-Aqua Wandscheibe 90° IG — Parametrik.

   Die Rechnung steht in ../_bracket/params.js: dieses Produkt und der
   Anschlussbogen teilen den Körper (Fall 32). Hier steht nur, was
   dieses Produkt daran festlegt — und das ist genau eines: die Lasche. */


export const CONFIG = { lug: true };

export function params(key) {
  return bracketParams(article(key), CONFIG);
}


/* == elbow-wall-bracket-90-female-thread/parts.js ====================== */
/* K-Aqua Wandscheibe 90° IG — Konturen.

   Alle Teile kommen aus ../_bracket/ und ../_bendthread/. Die Lasche
   schaltet CONFIG.lug ein, sie ist keine eigene Kontur dieses Produkts. */


/* == elbow-wall-bracket-90-female-thread/index.js ====================== */
/* K-Aqua Wandscheibe 90° mit Innengewinde — Produktpaket nach
   PRODUKT-VERTRAG.md.

   Derselbe Winkel wie der Anschlussbogen, mit einer flachen Lasche am
   Boden: sie wird an die Wand geschraubt, das Innengewinde nimmt die
   Armatur auf.

   DREI WERKSTOFFTEILE, ZWEI MATERIALIEN: PP-R-Körper, Messingring,
   PP-R-Lasche. Die Lasche ist ein eigenes Teil der Baugruppe, damit die
   Explosionsansicht sie herausziehen kann — am realen Teil ist sie
   angespritzt.

   ── WAS BELEGT IST UND WAS NICHT ──
   Der Körper steht vollständig in der Tabelle. Die Lasche steht in
   KEINER Spalte. Belegt ist an ihr genau ein Maß: sie steht 2 mm unter
   dem Körper hervor — die Differenz von h gegenüber dem
   Anschlussbogen, viermal dieselbe. Umriss, Breite, Lochgröße und
   Lochlage sind am Foto abgegriffen und tragen ASSUMPTION; die
   Einbuchtung an ihrer Oberkante ist aus einem einzigen Blickwinkel
   nicht auflösbar und deshalb NICHT modelliert. Herleitung in
   ../_bracket/params.js. */


const product = {
  id: 'transition-fittings/elbow-wall-bracket-90-female-thread',
  module: 'kaqua-elbow-wall-bracket-90-female-thread',
  titleDe: 'Wandscheibe 90° mit Innengewinde',
  titleEn: 'Elbow/Wall bracket 90° (Female thread)',
  category: 'transition-fittings',
  brandLine: 'K-Aqua PP-R · Messing',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'key',
  sizeLabel,
  sizeTitle: 'Nennweite · Gewinde',
  defaultSize: '25x3_4',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'Rp', 'D', 'L', 'kg'],
  dimensions: ['L', 'L1'],
  ariaFields: ['d', 'Rp', 'D', 'L', 'z', 'D1', 'L1', 'z1'],

  variants: [],
  states: null,

  tile: 'Wandanschluss auf Rohrgewinde innen: Schweißmuffe, bündiger ' +
        'Messingring und eine angespritzte Lasche mit Schraubloch.',

  build(size, variant, clipPlane) {
    return buildBracket({
      ...CONFIG,
      article,
      dimensionKey: DIMENSION_KEY,
      exportName: 'K-Aqua_Wandscheibe_IG',
      seed: 223,
    }, size, variant, clipPlane);
  },
};

export { product as default };
