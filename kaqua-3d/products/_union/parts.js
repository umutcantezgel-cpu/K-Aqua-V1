/* K-Aqua Metallverschraubungen — gemeinsame Konturen.

   Vier Teile. Die Reihenfolge der Konturpunkte ist immer außen von
   links nach rechts, dann innen von rechts nach links — so schließt
   buildProfile die Kontur ohne Kegelfläche (Fall 21).

   Sechskant-Orientierung: hexPrism legt nach seiner internen
   rotateY(π/2) eine SCHLÜSSELFLÄCHE auf Z und eine ECKE auf Y. Ein
   Strahl in −Z misst die Schlüsselweite, ein Strahl in −Y das
   Eckenmaß. Beide Messungen zusammen beweisen, dass der Sechskant die
   Silhouette bildet und kein Zylinder ihn umhüllt (Fall 11 und 13).

   bevel = 0 an beiden Sechskanten: bevelSize nimmt vom Umkreis und
   zöge das Eckenmaß unter das Nennmaß (Fall 23). */

import {
  DRAFT, SEG_INT, SEG_VIS, buildProfile, capFromProfile, hexPrism,
  mergeGeometries, revolve, threadProfile
} from '../../core/index.js';

/* 1 · PP-R-Muffe: Schweißmuffe, Hals, Dichtbund. Länge l. */
export function buildSleeve(P) {
  const xA = P.xA;
  const xB = P.xSealA;
  const xNeck = xA + P.socket;
  const rMouth = Math.max(1.0, P.rSleeve * 0.06);
  const rSock = (x) => P.d / 2 - P.sockTaper * (x - xA);

  const outer = [
    /* Bund am Mundloch: D liegt AUF dem Bund, der Zylinder dahinter
       tiefer — nicht umgekehrt (Fall 6). */
    { a: xA, r: P.rSleeve, fillet: rMouth, w: 0 },
    { a: xA + rMouth * 0.7, r: P.rSleeve - DRAFT * rMouth * 0.7, fillet: 0.4, w: 0 },
    { a: xNeck - 1.0, r: P.rSleeve, fillet: 0.6, w: 0 },
    { a: xNeck, r: P.rNeck, fillet: 0.8, w: 0 },
    { a: xB - P.neckLen * 0.42, r: P.rNeck, fillet: 0.6, w: 0 },
    { a: xB - P.neckLen * 0.30, r: P.rFlange, fillet: 0.5, w: 0 },
    /* Die Dichtfläche bleibt plan: keine Fase am Profilende, sonst
       ragt sie über xB hinaus und macht den Dichtspalt negativ. */
    { a: xB, r: P.rFlange, fillet: 0, w: 0 },
  ];
  const inner = [
    { a: xB, r: P.boreR, fillet: 0.6 },
    { a: xA + P.socket, r: P.boreR, fillet: 1.0 },
    { a: xA + P.socket, r: rSock(xA + P.socket), fillet: 1.0 },
    { a: xA + 2, r: rSock(xA + 2), fillet: 0.4 },
    { a: xA, r: P.d / 2 + P.lead, fillet: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  return {
    geo: revolve(profile, { axis: 'x', segments: SEG_VIS }),
    cap: capFromProfile(profile, 'x'),
    profile,
  };
}

/* 2 · Flachdichtung: Stanzteil aus EPDM, Kanten nicht verrundet.
   Dicke = L − (l + l1), also 2 bis 4 mm — genau der Bereich, den
   20-VISUELLE-REFERENZ §4.1 für Flachdichtungen nennt. */
export function buildGasket(P) {
  const xA = P.xSealA;
  const xB = P.xSealB;
  const outer = [
    { a: xA, r: P.rFlange, chamfer: 0.2, w: 0 },
    { a: xB, r: P.rFlange, chamfer: 0.2, w: 0 },
  ];
  const inner = [
    { a: xB, r: P.boreR, chamfer: 0.2 },
    { a: xA, r: P.boreR, chamfer: 0.2 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 2 });
  return {
    geo: revolve(profile, { axis: 'x', segments: SEG_INT }),
    cap: capFromProfile(profile, 'x'),
    profile,
  };
}

/* 3 · Überwurfmutter: Sechskant SW, innen die Schulter, die hinter dem
   Dichtbund greift, und die Kupplungsbohrung.

   Der Rotationskörper liegt über der Sechskantlänge auf dem INKREIS
   (afNut/2). Läge er auf dem Umkreis, umhüllte er den Sechskant und
   die Silhouette wäre ein perfekter Kreis (Fall 11). */
export function buildNut(P) {
  const xA = P.xNutL;
  const xB = P.xNutR;
  const rIn = P.afNut / 2;
  const rRim = Math.min(rIn, P.rCoupling + Math.max(1.6, P.nutWall * 0.55));

  const outer = [
    { a: xA, r: P.rNutShoulder + Math.max(1.2, P.nutLen * 0.06), chamfer: 0.5, w: 0 },
    { a: xA + P.nutLen * 0.10, r: rIn, fillet: 0.6, w: 0 },
    { a: P.xNutHexA, r: rIn, fillet: 0.4, w: 0 },
    { a: P.xNutHexEnd, r: rIn, fillet: 0.4, w: 0 },
    { a: P.xNutHexEnd + P.nutLen * 0.04, r: rRim, fillet: 0.5, w: 0 },
    { a: xB, r: rRim, chamfer: 0.6, w: 0 },
  ];
  const inner = [
    { a: xB, r: P.rCoupling, chamfer: 0.8 },
    { a: P.xSealA - 0.6, r: P.rCoupling, fillet: 0.6 },
    { a: P.xSealA - 0.6, r: P.rFlange + 0.35, fillet: 0.5 },
    { a: xA + P.nutLen * 0.24, r: P.rFlange + 0.35, fillet: 0.5 },
    { a: xA + P.nutLen * 0.24, r: P.rNutShoulder, fillet: 0.5 },
    { a: xA, r: P.rNutShoulder, chamfer: 0.4 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  const hex = hexPrism(P.afNut, P.nutHexLen, P.hexFilletNut, 0);
  hex.translate(P.xNutHexA, 0, 0);
  geos.push(hex);

  return { geo: mergeGeometries(geos), cap: capFromProfile(profile, 'x'), profile };
}

/* 4 · Gewindekörper: Kupplungszone unter der Mutter, Sechskant SW1,
   dann das Gewinde.

   kind 'R'  — kegeliges Außengewinde 1:16, verjüngt zur freien Spitze.
   kind 'Rp' — zylindrisches Innengewinde in der Öffnung.

   ASSUMPTION Messebene beim Außengewinde: der Nennmaßort liegt am
   GEWINDEANFANG (Sechskantseite), von dort verjüngt sich das Gewinde
   zur Spitze. Die Tabelle führt keine Einschraublänge, und die
   Grundmaße nach ISO 7-1 stehen nicht in der Quelle — die Messebene
   ist deshalb gesetzt, nicht abgelesen. Die Messung 'gewinde' tastet
   genau diesen Ort ab. */
export function buildBody(P) {
  const xA = P.xSealB;
  const xHexA = P.xCouplingEnd;
  const xHexB = P.xBodyHexEnd;
  const xB = P.xEnd;
  const rHexIn = P.afBody / 2;
  const male = P.threadKind === 'R';

  const outer = [
    { a: xA, r: P.rFlange, fillet: 0, w: 0 },
    { a: xA + Math.min(1.2, P.couplingLen * 0.25), r: P.rCoupling - 0.4, chamfer: 0.5, w: 0 },
    { a: xHexA - 0.6, r: P.rCoupling - 0.4, fillet: 0.5, w: 0 },
    { a: xHexA, r: rHexIn, fillet: 0.5, w: 0 },
    { a: xHexB, r: rHexIn, fillet: 0.4, w: 0 },
  ];

  if (male) {
    const thread = threadProfile(P.threadOD, P.threadPitch, P.turns, 'R')
      .map((p) => ({ a: xHexB + 0.8 + p.a, r: p.r, fillet: p.fillet }))
      .filter((p) => p.a <= xB - 0.8);
    /* Gewindeauslauf auf dem Kerndurchmesser, dann die Kontur. Kein
       Punkt auf demselben a wie die erste Kuppe — zwei Punkte mit
       gleichem a machen aus dem Kuppenfillet eine senkrechte Stufe und
       verschieben den Scheitel. */
    outer.push({ a: xHexB + 0.35, r: P.threadOD / 2 - P.threadH, chamfer: 0.4, w: 0 });
    thread.forEach((p) => outer.push({ ...p, w: 0 }));
    outer.push({ a: xB, r: P.threadOD / 2 - P.threadH - 0.3, chamfer: 0.4, w: 0 });
  } else {
    outer.push({ a: xHexB + Math.max(1.0, P.threadLen * 0.14), r: rHexIn * 0.96, fillet: 0.5, w: 0 });
    outer.push({ a: xB, r: rHexIn * 0.96, chamfer: 0.7, w: 0 });
  }

  const inner = [];
  if (male) {
    inner.push({ a: xB, r: P.boreR, chamfer: 0.6 });
  } else {
    /* Innengewinde von rechts nach links. threadProfile liefert ab
       a = 0 in +a; die Kontur läuft hier rückwärts, deshalb gespiegelt
       eingesetzt. Der Kern liegt auf threadOD − 2h, der Grund auf dem
       Nennmaß — siehe Kopfkommentar von threadProfile. */
    const xThA = xB - 1.2 - P.turns * P.threadPitch;
    const thread = threadProfile(P.threadOD, P.threadPitch, P.turns, 'Rp')
      .map((p) => ({ a: xThA + p.a, r: p.r, fillet: p.fillet }))
      .filter((p) => p.a <= xB - 1.0);
    inner.push({ a: xB, r: P.threadOD / 2 + P.threadPitch * 0.2, chamfer: 0.9 });
    thread.slice().reverse().forEach((p) => inner.push(p));
    inner.push({ a: xThA - 0.8, r: P.threadCore / 2, fillet: 0.5 });
  }
  inner.push({ a: xHexA, r: P.boreR, fillet: 0.8 });
  inner.push({ a: xA + 1.0, r: P.boreR, chamfer: 0.5 });
  inner.push({ a: xA, r: P.boreR + 0.5, fillet: 0 });

  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  const hex = hexPrism(P.afBody, xHexB - xHexA, P.hexFilletBody, 0);
  hex.translate(xHexA, 0, 0);
  geos.push(hex);

  return { geo: mergeGeometries(geos), cap: capFromProfile(profile, 'x'), profile };
}
