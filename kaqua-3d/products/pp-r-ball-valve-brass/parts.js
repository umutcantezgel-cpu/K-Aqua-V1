/* K-Aqua Kugelhahn PP-R (Kugel Messing verchromt) — die Gehäuseteile.

   Kugel, Sitze, Spindel und O-Ringe kommen aus der Familie
   (_ballvalve/parts.js) — innen ist dieser Hahn dasselbe Gerät wie der
   PP-Kugelhahn. Hier steht nur, was IHN ausmacht:

     · ein EINTEILIGER Korpus mit zwei Schweißmuffen, statt der
       Verschraubung mit zwei Überwurfmuttern,
     · ein flacher, gekröpfter Stahlbügel statt des Kunststoffhebels.

   Kein CSG: jede Bohrung ist Teil der geschlossenen Profilkontur. */

import * as THREE from 'three';
import {
  buildProfile, revolve, loft, arcPts, mergeGeometries, capFromProfile,
  polygonCap, hexPrism, D2R, SEG_VIS, SEG_INT,
} from '../../core/index.js';

/* Der Korpus re-exportiert die Familie, damit index.js wie bei jedem
   anderen Produkt nur aus './parts.js' importiert. */
export { buildBall, buildSeat, buildStem, buildORing } from '../_ballvalve/parts.js';

/* ── Korpus: Muffe – Kegel – Bauch – Kegel – Muffe, dazu der Spindeldom ── */
export function buildBody(P) {
  const xE = P.xEnd;
  const taper = Math.tan(0.6 * D2R);
  const lead = 2 * Math.tan(15 * D2R);
  const rSockBottom = P.d / 2 - taper * (P.socket - 1.5);

  const outer = [
    { a: -xE, r: P.rSocket, chamfer: 0.8 },
    { a: -P.xCone, r: P.rBody, fillet: 1.4 },
    { a: P.xCone, r: P.rBody, fillet: 1.4 },
    { a: xE, r: P.rSocket, chamfer: 0.8 },
  ];

  /* Kugelkammer: ein Kreisbogen um den Ursprung mit dem Kammerradius.
     Er trifft die Sitzaufnahme dort, wo r = seatRingR ist — der Winkel
     folgt daraus und wird nicht gesetzt. */
  const t0 = Math.atan2(P.seatRingR, P.chamberX);
  const kammer = [];
  arcPts(kammer, 0, 0, P.chamberR, t0, Math.PI - t0, 18);

  /* Drei Stufen nach innen: Muffe → Schulter → Kanal → Sitzaufnahme →
     Kammer. Die Schulter bei xShoulder ist der Rohranschlag; ohne sie
     verschwände das Rohr im Ventil. */
  const inner = [
    { a: xE, r: P.d / 2 + lead, fillet: 0 },
    { a: xE - 1.5, r: P.d / 2, fillet: 0.4 },
    { a: P.xShoulder, r: rSockBottom, fillet: 0.6 },
    { a: P.xShoulder, r: P.kanalR, fillet: 0.6 },
    { a: P.xSeatBack, r: P.kanalR, fillet: 0.5 },
    { a: P.xSeatBack, r: P.seatRingR, fillet: 0.5 },
    { a: P.chamberX, r: P.seatRingR, fillet: 0.4 },
    ...kammer,
    { a: -P.chamberX, r: P.seatRingR, fillet: 0.4 },
    { a: -P.xSeatBack, r: P.seatRingR, fillet: 0.5 },
    { a: -P.xSeatBack, r: P.kanalR, fillet: 0.5 },
    { a: -P.xShoulder, r: P.kanalR, fillet: 0.6 },
    { a: -P.xShoulder, r: rSockBottom, fillet: 0.6 },
    { a: -(xE - 1.5), r: P.d / 2, fillet: 0.4 },
    { a: -xE, r: P.d / 2 + lead, fillet: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geo = revolve(profile, { axis: 'x', segments: SEG_VIS });

  /* Spindeldom, abgesetzt wie in der Zeichnung: breiter Sockel, darüber
     der schlankere Stopfbuchsenhals. Der Fuß liegt auf y = 0 und damit
     im Korpus — es wird verschmolzen, nicht verschnitten. */
  const rD = P.domeOD / 2, rH = P.domeOD * 0.38;
  const yStep = P.domeTop * 0.62;
  const rBohr = P.stemOD / 2 + 0.3;
  const domProfile = buildProfile([
    { a: 0, r: rD, fillet: 0 },
    { a: yStep, r: rD, chamfer: 0.8 },
    { a: yStep + 0.9, r: rH, fillet: 0.5 },
    { a: P.domeTop, r: rH, chamfer: 0.6 },
    { a: P.domeTop, r: rBohr, chamfer: 0.5 },
    { a: 0, r: rBohr, fillet: 0 },
  ], { segs: 4 });
  const dom = revolve(domProfile, { axis: 'y', segments: SEG_VIS });

  return {
    geo: mergeGeometries([geo, dom]),
    cap: mergeGeometries([capFromProfile(profile, 'x'), capFromProfile(domProfile, 'y')]),
    profile,
  };
}

/* ── Hebel: Nabe (Rotationskörper) + gekröpfter Bügel (Loft) ──
   Tabelliert sind nur L (Länge ab Spindel) und H (Oberkante über der
   Achse). Der Bügel steigt von der Nabe bis xBend an und läuft dann
   waagerecht — genau diese waagerechte Oberkante IST H. */
export function buildLever(P) {
  const Lv = P.lever;
  const rHub = Lv.hubOD / 2, rBohr = P.stemOD / 2 + 0.2;

  /* Die Nabe endet dicht über der WURZEL des Bügels, nicht über seinem
     waagerechten Teil. Der erste Anlauf zog sie bis H − Dicke hoch und
     machte daraus einen 23 mm hohen Stahlzylinder, der den grünen Dom
     vollständig verdeckte. Der Bügel steigt aber von der Nabe aus an —
     die Nabe muss nur seine Wurzel fassen. */
  const yHubTop = Lv.yBend + Lv.thick + 0.6;

  const hubProfile = buildProfile([
    { a: Lv.hubBot, r: rHub, chamfer: 0.7 },
    { a: yHubTop, r: rHub * 0.88, fillet: 0.5 },
    { a: yHubTop, r: rBohr, chamfer: 0.4 },
    { a: Lv.hubBot, r: rBohr, chamfer: 0.4 },
  ], { segs: 4 });
  const hub = revolve(hubProfile, { axis: 'y', segments: SEG_INT });

  const yTopAt = (x) => (x <= Lv.xBend
    ? Lv.yBend + Lv.thick + ((P.H - Lv.yBend - Lv.thick) * x) / Lv.xBend
    : P.H);
  const hwAt = (x) => (Lv.wRoot + ((Lv.wTip - Lv.wRoot) * x) / Lv.len) / 2;

  const N = 34;
  const rTip = Lv.thick * 0.5;
  const sections = [];
  for (let i = 0; i <= N; i++) {
    const x = (i / N) * Lv.len;
    let yTop = yTopAt(x), yBot = yTop - Lv.thick, hw = hwAt(x);
    /* Spitze verrunden: die letzten rTip Millimeter kugelig einziehen.
       Die Station x = L bleibt bestehen — L muss messbar sein. */
    const edge = Lv.len - x;
    if (edge < rTip) {
      const s = Math.sqrt(Math.max(0.0016, 1 - ((rTip - edge) / rTip) ** 2));
      const mid = (yTop + yBot) / 2;
      hw = Math.max(0.08, hw * s);
      yTop = mid + (yTop - mid) * s;
      yBot = mid - (mid - yBot) * s;
    }
    const c = Math.min(1.1, (yTop - yBot) * 0.28, hw * 0.28);
    sections.push({
      x,
      pts: [
        { r: yBot, a: -hw + c }, { r: yBot, a: hw - c },
        { r: yBot + c, a: hw }, { r: yTop - c, a: hw },
        { r: yTop, a: hw - c }, { r: yTop, a: -hw + c },
        { r: yTop - c, a: -hw }, { r: yBot + c, a: -hw },
      ],
    });
  }
  const arm = loft(sections);

  /* Schnittkappe des Bügels: sein Umriss in der Ebene z = 0. */
  const oben = [], unten = [];
  for (let i = 0; i <= N; i++) {
    const x = (i / N) * Lv.len;
    oben.push([x, yTopAt(x)]);
    unten.push([x, yTopAt(x) - Lv.thick]);
  }
  const armCap = polygonCap([...oben, ...unten.reverse()]);

  return {
    geo: mergeGeometries([hub, arm]),
    cap: mergeGeometries([capFromProfile(hubProfile, 'y'), armCap]),
  };
}

/* ── O-Ring auf der SPINDEL ──
   Der Familien-O-Ring liegt in der Durchflussachse; dieser Hahn hat
   keine Anschlussstutzen zu dichten, seine Ringe sitzen im Dom um die
   Spindel. Gleicher Torus, andere Achse — deshalb hier und nicht in
   der Familie. */
export function buildStemORing(P, y, r) {
  const c = P.oringCord / 2;
  const g = new THREE.TorusGeometry(r, c, 20, SEG_INT);
  g.rotateX(Math.PI / 2);
  g.translate(0, y, 0);
  const n = g.attributes.position.count;
  g.setAttribute('aWear', new THREE.BufferAttribute(new Float32Array(n), 1));
  return {
    geo: g,
    cap: mergeGeometries([
      polygonCap([[r - c, y - c], [r + c, y - c], [r + c, y + c], [r - c, y + c]]),
      polygonCap([[-r - c, y - c], [-r + c, y - c], [-r + c, y + c], [-r - c, y + c]]),
    ]),
  };
}


/* Befestigungsschraube des Hebels — im Foto AQ850 als
   Edelstahl-Sechskantkopf auf der Nabe deutlich sichtbar. Kopf als
   flacher Sechskant, Schaft verschwindet in der Spindel. */
export function buildLeverBolt(P) {
  const Lv = P.lever;
  const yBase = Lv.yBend + Lv.thick + 0.6;   // Nabenoberkante
  const kopfH = Math.max(2.2, 0.035 * P.H);
  const af = Math.max(5.5, P.stemOD * 0.75);
  const kopf = hexPrism(af, kopfH, Math.max(0.25, af * 0.03), 0.5);
  kopf.rotateZ(Math.PI / 2);                 // Achse nach +Y (wie beim Gewinde-T)
  kopf.translate(0, yBase, 0);
  const halsProfile = buildProfile([
    { a: yBase - 1.2, r: 0.02, fillet: 0 },
    { a: yBase - 1.2, r: af * 0.32, fillet: 0.2 },
    { a: yBase + 0.2, r: af * 0.32, fillet: 0.2 },
    { a: yBase + 0.2, r: 0.02, fillet: 0 },
  ], { segs: 3 });
  const hals = revolve(halsProfile, { axis: 'y', segments: SEG_INT });
  return { geo: mergeGeometries([kopf, hals]), cap: capFromProfile(halsProfile, 'y') };
}
