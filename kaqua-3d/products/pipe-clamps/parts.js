/* K-Aqua Rohrschelle — Kontur.

   Aufbau nach dem Produktfoto AQ500. Zwei gleichwertige Halbschalen, an
   BEIDEN Enden verschraubt — es gibt kein Scharnier. Je Stoß: zwei flache
   Stahllaschen über den grünen Stegen, eine Linsenkopfschraube mit
   Kreuzschlitz und U-Scheibe, eine schwarze Vierkantmutter in der Tasche.
   Auf dem geschlossenen Rücken der unteren Schale sitzt der
   Sechskantstutzen mit dem Anschlussgewinde.

   ── DIE ACHSEN (geändert am 01.09.2026) ──
   Rohrachse ist X. Die beiden Stöße liegen bei **±Z**, die geschlossenen
   Schalenrücken bei **±Y**; der Stutzen steht bei −Y.

   Vorher lagen die Stöße bei ±Y — also genau dort, wo der Stutzen sitzt
   (beide durchdrangen sich) und genau in der Ebene z = 0, die der Viewer
   als Schnittebene benutzt. Der Halbschnitt löschte damit eine komplette
   Halbschale, statt eine Wand zu zeigen. Mit der gedrehten Stoßachse
   schneidet z = 0 beide Schalen durch die Wand, der Stoß bei −Z bleibt
   ganz stehen, der bei +Z fällt weg. Das ist die übliche
   Halbschnittdarstellung.

   ── KEIN CSG ──
     1. Halbschalen als Teilrotationskörper: revolve() nimmt eine
        thetas-Liste, ein Bogen über einen Teilwinkel ist ein gewöhnlicher
        Revolve, keine geschnittene Vollschale.
     2. Jede Bohrung ist Teil ihrer Kontur: THREE.Shape mit Außen- und
        Lochkontur, in einem Zug trianguliert — dasselbe Verfahren wie
        plateWithHoles beim Bundflansch.
     3. Der Kreuzschlitz ist ein Durchbruch in einer dünnen Deckscheibe
        über dem massiven Kopf. Ein Schlitz ist ein Abzug; als Loch in
        einer aufgesetzten Scheibe braucht er keinen. */

import {
  buildProfile, revolve, mergeGeometries, capFromProfile,
  polygonCap, threadProfile, D2R, SEG_VIS, SEG_INT,
} from '../../core/index.js';
import * as THREE from 'three';

const FASE = 0.4;   // mm — Bevel aller Extrusionsteile

/* Teilwinkel-Abtastung: von a bis b Grad, n Schritte. */
function arcThetas(aDeg, bDeg, n) {
  const out = [];
  for (let i = 0; i <= n; i++) out.push((aDeg + (bDeg - aDeg) * (i / n)) * D2R);
  return out;
}

/* aWear und uv nachtragen — mergeGeometries erwartet beide. */
function attribute(g, wear) {
  const n = g.attributes.position.count;
  g.setAttribute('aWear', new THREE.BufferAttribute(new Float32Array(n).fill(wear), 1));
  if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n * 2), 2));
  return g;
}

/* Eine Shape aus der (u, v)-Ebene zu einem flachen Teil extrudieren:
   u wird X, v wird Z, die DICKE zeigt in Y — und das Ergebnis liegt
   MITTIG auf y = 0.

   Die Mittigkeit ist der Punkt. roundedPad und ExtrudeGeometry liefern
   eine Kontur, die von 0 bis h läuft; eine solche Kontur spiegelt sich
   beim Verschieben um ±off NICHT, sie verschiebt sich nur. Genau daran
   waren die vier Laschen der ersten Fassung asymmetrisch: die eine Seite
   lag bei z 3,11…7,11, die andere bei −3,11…0,89 und ragte über die
   Teilungsebene. Die Mittigkeit steckt jetzt in dieser Funktion, nicht in
   jeder Aufrufstelle.

   rotateX(+90°) bildet (u, v, w) auf (u, −w, v) ab: v wird Welt-Z OHNE
   Vorzeichenwechsel, die Extrusionsrichtung w wird −Y. */
function flachteil(shape, h, bevel, wear) {
  const g = new THREE.ExtrudeGeometry(shape, {
    depth: Math.max(0.05, h - bevel * 2),
    bevelEnabled: bevel > 0,
    /* bevelSegments 1 und curveSegments 16: die Fase eines 2-mm-Blechs
       braucht keine zwei Ringe, und 16 Segmente tragen jede Bohrung
       dieser Größenordnung. Siehe rechteck() — die Ecken sind Fasen,
       curveSegments wirkt deshalb nur noch auf Bohrung und Paddel. */
    bevelThickness: bevel, bevelSize: bevel, bevelSegments: 1, curveSegments: 16,
  });
  g.rotateX(Math.PI / 2);
  g.translate(0, h / 2 - bevel, 0);
  return attribute(g, wear);
}

/* Rechteck mit gefasten Ecken als Shape. Bevel-Kompensation wie in
   plateWithHoles: ExtrudeGeometry addiert nach außen, also Außenkontur
   um die Fase kleiner anlegen.

   ── WARUM FASEN UND KEINE BOGEN ──
   `curveSegments` gilt in ExtrudeGeometry für JEDE Kurve der Shape, nicht
   nur für die Bohrung. Vier gerundete Ecken kosten damit so viel wie vier
   weitere Bohrungen — an einem 10 mm breiten Stahlblech, wo sie niemand
   sieht. Gemessen an einer Lasche: 2364 Dreiecke mit Bogenecken gegen 252
   mit Fasenecken, bei gleichem Bild. Fall 47.

   ── DIE UMLAUFRICHTUNG IST NICHT BELIEBIG ──
   Die Kontur läuft GEGEN den Uhrzeigersinn. ExtrudeGeometry richtet Löcher
   nur aus, wenn es die Außenkontur umdreht — und das tut es nur bei einer
   Kontur gegen den Uhrzeigersinn:

       const reverse = !ShapeUtils.isClockWise(vertices);
       if (reverse) { … Löcher, die im Uhrzeigersinn laufen, umdrehen … }

   Läuft die Außenkontur schon im Uhrzeigersinn, behalten die Löcher ihre
   Richtung, die Lochwand kehrt sich um, und das Volumen ADDIERT das Loch
   statt es abzuziehen: die Mutter M8 maß so 1173 statt 713 mm³. Fall 45. */
function rechteck(sx, sz, fase, bevel) {
  const ax = Math.max(0.3, sx / 2 - bevel);
  const av = Math.max(0.3, sz / 2 - bevel);
  const f = Math.max(0.1, Math.min(fase, ax * 0.7, av * 0.7));
  const s = new THREE.Shape();
  s.moveTo(ax, -av + f);
  s.lineTo(ax, av - f);
  s.lineTo(ax - f, av);
  s.lineTo(-ax + f, av);
  s.lineTo(-ax, av - f);
  s.lineTo(-ax, -av + f);
  s.lineTo(-ax + f, -av);
  s.lineTo(ax - f, -av);
  s.closePath();
  return s;
}

/* Lasche nach dem Foto: Flachstab, der in einem runden Paddel um die
   Schraubenachse endet. Die Kontur läuft von der Schaleninnenseite (v0)
   nach außen bis zur Paddelmitte (vBohr) und schließt dort mit einem
   Halbkreis vom Radius sx/2.

   NICHT gebaut ist die Stufe, mit der die Lasche im Foto auf das
   Schalenende absetzt: ExtrudeGeometry trägt nur konstante Dicke, und der
   Versatz beträgt rund eine Laschendicke. Bewusst weggelassen, nicht
   übersehen. */
function paddel(sx, v0, vBohr, fase, bevel) {
  const ax = Math.max(0.3, sx / 2 - bevel);
  const r = ax;
  const f = Math.max(0.1, Math.min(fase, ax * 0.7));
  const s = new THREE.Shape();
  s.moveTo(ax, v0 + f);
  s.lineTo(ax, vBohr);
  s.absarc(0, vBohr, r, 0, Math.PI, false);   // rundes Paddelende
  s.lineTo(-ax, v0 + f);
  s.lineTo(-ax + f, v0);
  s.lineTo(ax - f, v0);
  s.closePath();
  return s;
}

/* Sechskantkontur, gegen den Uhrzeigersinn (siehe oben). */
function sechskant(af, bevel) {
  const R = af / Math.sqrt(3) - bevel;
  const s = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const t = (i / 6) * Math.PI * 2 + Math.PI / 6;
    const x = R * Math.cos(t), y = R * Math.sin(t);
    if (i === 0) s.moveTo(x, y); else s.lineTo(x, y);
  }
  s.closePath();
  return s;
}

/* Kreisloch in eine Shape. Innenkonturen SCHRUMPFEN durch den Bevel,
   deshalb um die Fase größer anlegen — die Gegenrichtung zur Außenkontur. */
function lochen(shape, rBore, u, v, bevel) {
  const p = new THREE.Path();
  p.absarc(u, v, rBore + bevel, 0, Math.PI * 2, true);
  shape.holes.push(p);
  return shape;
}

/* ─────────────────────── Schalen ─────────────────────── */

/* Die Wölbung des Rückens. Das Studiofoto zeigt keinen zylindrischen
   Rücken, sondern eine BALLIGE Kontur: der Scheitel liegt in Bandmitte,
   zu beiden Kanten fällt sie ab. rOut ist der Scheitelradius. */
function woelbung(P, a) {
  const u = (2 * a) / P.width;
  return P.rOut - P.crownDrop * u * u;
}

/* Außenkontur des Rückens: drei Bänder, zwei Nuten.

   BERICHTIGT 02.09.2026 nach `public/images/produkte/pipe-clamps/studio.jpg`
   (900 px). Die Vorfassung setzte DREI Nuten auf einen zylindrischen
   Rücken — beides falsch. Das Foto zeigt ein breites Mittelband, zwei
   schmalere Seitenbänder, dazwischen zwei Nuten, und die Kanten rollen ab.

   `ringGrooves` aus dem Core passt hier nicht mehr: es setzt Nuten auf
   KONSTANTEM Radius. Auf einer balligen Kontur muss der Nutgrund der
   Wölbung folgen, sonst wandert die Nuttiefe über das Band. */
function ruecken(P) {
  const B = P.width, x0 = -B / 2, x1 = B / 2;
  const gP = P.grooveOffset, gW = P.grooveW, gD = P.grooveDepth;
  const wand = Math.min(0.35, gW * 0.28);
  const out = [];
  /* Die Stützstellen der Wölbung tragen KEINEN Fillet: sie liegen bereits
     auf einer glatten Kurve, und jeder Fillet macht aus einem Punkt vier.
     Über die drei Bänder waren das 51 Punkte für nichts — bei 47
     Winkelschritten rund 4 800 Dreiecke je Schale. Fillets bekommen nur
     die vier Nutkanten, wo die Kontur wirklich knickt. */
  const band = (a0, a1, n) => {
    for (let k = 0; k <= n; k++) {
      const a = a0 + (a1 - a0) * (k / n);
      out.push({ a, r: woelbung(P, a), fillet: 0, w: 0.3 });
    }
  };
  const nut = (c) => {
    out.push({ a: c - gW / 2 + wand, r: woelbung(P, c) - gD, fillet: 0.22, segs: 2, w: 0.3 });
    out.push({ a: c + gW / 2 - wand, r: woelbung(P, c) - gD, fillet: 0.22, segs: 2, w: 0.3 });
  };
  band(x0 + P.stirnFase, -gP - gW / 2, 4);
  nut(-gP);
  /* GERADE Zahl von Abschnitten: nur so liegt eine Stützstelle exakt auf
     der Bandmitte a = 0, und nur dort liegt der Scheitel der Wölbung. Mit
     einer ungeraden lag D um 0,01 mm daneben — die Sehne statt des
     Scheitels, dieselbe Familie wie Fall 27. */
  band(-gP + gW / 2, gP - gW / 2, 8);
  nut(gP);
  band(gP + gW / 2, x1 - P.stirnFase, 4);
  return out;
}

/* Profil einer Halbschale in der Schnittebene (a = Rohrachse, r = Radius).
   Umlauf: Bohrungskante links → Stirn links → Rücken → Stirn rechts →
   Bohrungskante rechts, geschlossen über die Bohrungsfläche. */
export function shellProfile(P) {
  const B = P.width, x0 = -B / 2, x1 = B / 2;
  const f = P.stirnFase, bf = P.boreChamfer;
  const rKante = woelbung(P, x0);
  return buildProfile([
    { a: x0 + bf, r: P.rShellIn, w: 0.3 },
    { a: x0, r: P.rShellIn + bf, w: 0.3 },
    { a: x0, r: rKante - f, w: 0.3 },
    ...ruecken(P),
    { a: x1, r: rKante - f, w: 0.3 },
    { a: x1, r: P.rShellIn + bf, w: 0.3 },
    { a: x1 - bf, r: P.rShellIn, w: 0.3 },
  ], { segs: 3 });
}

/* Y-Lage der Schalenstirn am Stoß, an der Schaleninnenfläche gemessen.
   Die Stirn ist eine Radialebene im Winkel gapDeg zur Z-Achse; bei
   Radius rShellIn liegt sie am tiefsten. Der grüne Steg setzt dort an,
   damit zwischen Schale und Steg kein Spalt klafft. */
export function stossY(P) {
  return P.rShellIn * Math.tan(P.gapDeg * D2R);
}

/* Wicklung aller Dreiecke umkehren (nicht indizierte Geometrie). */
function wicklungDrehen(g) {
  const a = g.attributes.position.array;
  for (let i = 0; i < a.length; i += 9) {
    for (let k = 0; k < 3; k++) {
      const t = a[i + 3 + k]; a[i + 3 + k] = a[i + 6 + k]; a[i + 6 + k] = t;
    }
  }
  g.computeVertexNormals();
  return g;
}

/* Eine STIRNFLÄCHE des Teilwinkel-Revolves, um die Rohrachse auf ihren
   Winkel gedreht.

   Warum es sie gibt: `revolve` verbindet aufeinanderfolgende Winkel zu
   Vierecken und schließt einen Teilbogen NICHT — die Schale stand an
   allen vier Stoßenden offen, 136 Randkanten je Bogen. Sichtbar als
   Blick ins Schaleninnere neben den Stegen, und im OBJ/GLB-Export als
   Hülle statt Körper. Keine Prüfung konnte es finden: die Stirnebenen
   gehen durch die Rohrachse und tragen zum Volumenintegral exakt 0 bei,
   die Massenprobe stimmte also weiter. Fall 46; das Maß `dicht` zählt
   jetzt die Randkanten.

   Die Umlaufrichtung wird GEMESSEN, nicht geraten: zeigt die
   Flächennormale in den Bogen hinein, wird die Wicklung gedreht. */
function stirnflaeche(prof, theta, ausY, ausZ) {
  const g = capFromProfile(prof, 'x', 1);
  g.rotateX(theta);
  g.computeVertexNormals();
  const n = g.attributes.normal;
  let sy = 0, sz = 0;
  for (let i = 0; i < n.count; i++) { sy += n.getY(i); sz += n.getZ(i); }
  if (sy * ausY + sz * ausZ < 0) wicklungDrehen(g);
  return attribute(g, 0.3);
}

/* EINE Halbschale samt ihren beiden grünen Stegen und beiden
   Stirnflächen. schale = +1 obere (über θ = 0°/360°, +Y),
   −1 untere (über θ = 180°, −Y). Die Lücken liegen bei ±Z.

   Getrennt gebaut, weil die Schelle sich öffnet: als EIN Teil konnte die
   Explosionsansicht genau das nicht zeigen, was das Produkt ausmacht. */
export function buildSchale(P, schale) {
  const prof = shellProfile(P);
  /* Bogenauflösung nach dem Core-Standard SEG_VIS, aber auf eine GERADE
     Zahl gebracht: die Bogenmitte (θ = off + 90°, der Schalenrücken) ist
     dann immer eine Stützstelle. Dort misst die Bohrungssonde — auf einer
     Sehne läse sie systematisch zu klein. */
  const roh = Math.max(24, Math.ceil(((180 - 2 * P.gapDeg) / 360) * SEG_VIS));
  const n = roh + (roh % 2);
  const off = schale > 0 ? 270 : 90;
  const th = arcThetas(off + P.gapDeg, off + 180 - P.gapDeg, n);
  /* Die Winkel der Stirnflächen kommen aus DERSELBEN Liste wie der Bogen,
     nicht aus einer zweiten Rechnung. `arcThetas` bildet den letzten Wert
     als a + (b − a)·1, und das ist in Gleitkomma nicht bitgleich mit b.
     Der Unterschied liegt bei 1e-14 — genug, damit die Stirnfläche neben
     dem Bogenrand landet statt darauf: bei d50 waren 24 Kanten offen,
     bei allen anderen Größen zufällig keine. Ein Fehler, der von der
     Rundung einer Prüfung abhängt, ist keiner, den man tolerieren darf. */
  const t0 = th[0], t1 = th[th.length - 1];

  const geos = [
    revolve(prof, { axis: 'x', thetas: th }),
    /* Nach außen heißt: aus dem Bogen heraus. Der Tangentenvektor bei θ
       ist (0, −sin θ, cos θ); am Anfang zeigt außen dagegen, am Ende mit. */
    stirnflaeche(prof, t0, Math.sin(t0), -Math.cos(t0)),
    stirnflaeche(prof, t1, -Math.sin(t1), Math.cos(t1)),
  ];

  /* Zwei grüne Stege: an jedem Schalenende ein verdickter Klotz, auf dem
     die Stahllasche aufliegt. Er beginnt an der SCHALENINNENFLÄCHE
     (rShellIn) und läuft nach außen — nie in den Rohrkanal hinein.
     Geprüft von `freie-bohrung`. */
  const yIn = stossY(P);
  const stegL = P.stegOut - P.rShellIn;
  const zC = (P.rShellIn + P.stegOut) / 2;
  for (const stoss of [1, -1]) {
    const pad = flachteil(rechteck(P.stegB, stegL, Math.min(2.2, P.stegT * 0.32), FASE),
      P.stegT, FASE, 0.3);
    pad.translate(0, schale * (yIn + P.stegT / 2), stoss * zC);
    geos.push(pad);
  }
  return { geo: mergeGeometries(geos), cap: capFromProfile(prof, 'x', schale) };
}

/* ─────────────────────── Stahllaschen ─────────────────────── */

/* Die zwei Laschen EINER Schale (schale = +1 oben, −1 unten), je eine
   an jedem Stoß. Sie liegen auf dem grünen Steg und reichen über die
   Schale hinaus bis zur Schraubenachse.

   Getrennt nach oben und unten, weil sie in der Explosionsansicht in
   entgegengesetzte Richtungen abheben — ein gemeinsamer Versatzvektor
   könnte nur eine der beiden richtig führen. */
export function buildLaschen(P, schale) {
  const geos = [];
  const yC = schale * (stossY(P) + P.stegT + P.laschT / 2);
  for (const stoss of [1, -1]) {
    /* Die Kontur wird in Weltlage gebaut: v ist eins zu eins die
       Welt-Z-Achse (siehe flachteil). Der Stoß trägt sein Vorzeichen
       deshalb in v — eine gespiegelte Platte entsteht durch die
       gespiegelte KONTUR, nicht durch ein Vorzeichen im translate. */
    const v0 = stoss * P.laschIn, vB = stoss * P.zScrew;
    const s = paddel(P.laschB, v0, vB, P.laschB * 0.22, FASE);
    lochen(s, P.boltD / 2 + 0.2, 0, vB, FASE);
    const g = flachteil(s, P.laschT, FASE, 0.25);
    g.translate(0, yC, 0);
    geos.push(g);
  }
  return { geo: mergeGeometries(geos), cap: null };
}

/* ─────────────────────── Schrauben ─────────────────────── */

/* Zwei Linsenkopfschrauben mit U-Scheibe, Achse in Y, je eine Schraube
   auf jedem Stoß bei z = ±zScrew.

   Beide zeigen in DIESELBE Richtung — im Foto liegen beide Köpfe auf
   derselben Schale. Damit gibt es keine Seitenlogik und keine Spiegelung:
   eine Geometrie, zweimal gesetzt. (Die Vorfassung baute je Seite eine
   eigene Drehung, setzte aber beide Schrauben auf denselben Stoß und
   schob sie dabei aus den Laschen heraus ins Leere.) */
export function buildSchrauben(P) {
  const geos = [];
  const yLasche = stossY(P) + P.stegT + P.laschT;    // Oberkante obere Lasche
  const aTop = yLasche + P.washT + P.headH;          // Kuppe der Schraube
  const aSitz = yLasche;                             // Auflage der U-Scheibe
  const aGewinde = -yLasche;                         // Unterkante der unteren Lasche
  const aSpitze = aGewinde - P.gewindeUeberstand;    // Schaftende, frei sichtbar
  const fase = Math.min(0.7, P.boltD * 0.12);

  /* Kopf und Schaft in einem Rotationskörper um Y. Die ebene Kuppe endet
     eine Schlitztiefe unter aTop; darauf sitzt die Kreuzscheibe. */
  const kopfOben = aTop - P.slotT;
  const koerper = revolve(buildProfile([
    { a: kopfOben, r: 0 },
    { a: kopfOben, r: P.headFlat / 2, fillet: P.headH * 0.45, segs: 5 },
    { a: aTop - P.headH * 0.78, r: P.headD / 2, fillet: P.headH * 0.2, segs: 3 },
    { a: aTop - P.headH, r: P.headD / 2 },
    { a: aTop - P.headH, r: P.boltD / 2 },
    { a: aGewinde, r: P.boltD / 2 },
    { a: aGewinde, r: 0 },
  ], { segs: 3 }), { axis: 'y', segments: 26 });

  /* Der Gewindeüberstand. Im Foto tritt das Gewinde unter der unteren
     Lasche deutlich heraus; der eingebaute Teil des Schafts bleibt glatt,
     weil er verdeckt ist und jede Windung dort nur Dreiecke kostet.

     ASSUMPTION Profil: `threadProfile` erzeugt ein Whitworth-Gewinde
     (Flankenwinkel 55°, Tiefe 0,640·P). Metrisch wären 60° und 0,613·P —
     bei M8 rund 0,03 mm Unterschied an der Flanke. Für die Ansicht ohne
     Belang, hier benannt statt verschwiegen. Der Core bleibt unberührt. */
  const gaenge = Math.max(2, Math.floor((aGewinde - aSpitze) / P.threadPitch));
  const gewinde = threadProfile(P.boltD, P.threadPitch, gaenge, 'R')
    .map((q) => ({ a: aGewinde - q.a, r: q.r, fillet: q.fillet }));
  const schaft = revolve(buildProfile([
    { a: aGewinde, r: 0 },
    ...gewinde,
    { a: aGewinde - gaenge * P.threadPitch - fase, r: P.boltD / 2 - fase },
    { a: aGewinde - gaenge * P.threadPitch - fase, r: 0 },
    /* 20 Segmente und ein Fillet-Segment: der Überstand ist ein
       Ø8-mm-Zylinder, 18°-Schritte hinterlassen 0,10 mm Sehnenfehler, und
       eine Gewindekuppe von 0,17 mm Radius braucht keine zwei Stützpunkte.
       Mit SEG_INT und segs 2 kostete allein das Gewinde beider Schrauben
       13 900 Dreiecke — mehr als der gesamte Rest des Teils. */
  ], { segs: 1 }), { axis: 'y', segments: 20 });

  /* U-Scheibe: geschlossener Ring, eigenes Teilstück — so bleibt die
     Kante zwischen Kopf und Scheibe sichtbar. */
  const scheibe = revolve(buildProfile([
    { a: aSitz + P.washT, r: P.boltD / 2 + 0.25 },
    { a: aSitz + P.washT, r: P.washD / 2, chamfer: 0.3 },
    { a: aSitz, r: P.washD / 2, chamfer: 0.3 },
    { a: aSitz, r: P.boltD / 2 + 0.25 },
  ], { segs: 2 }), { axis: 'y', segments: 28 });

  /* Kreuzschlitz: dünne Deckscheibe mit kreuzförmigem Durchbruch. Der
     massive Kopf darunter bildet den Schlitzgrund. */
  const deck = new THREE.Shape();
  deck.absarc(0, 0, P.headFlat / 2 - 0.05, 0, Math.PI * 2, false);
  const a2 = P.slotW / 2, b2 = P.slotL / 2;
  const kreuz = new THREE.Path();
  kreuz.moveTo(-a2, -b2); kreuz.lineTo(a2, -b2); kreuz.lineTo(a2, -a2);
  kreuz.lineTo(b2, -a2);  kreuz.lineTo(b2, a2);  kreuz.lineTo(a2, a2);
  kreuz.lineTo(a2, b2);   kreuz.lineTo(-a2, b2); kreuz.lineTo(-a2, a2);
  kreuz.lineTo(-b2, a2);  kreuz.lineTo(-b2, -a2); kreuz.lineTo(-a2, -a2);
  kreuz.closePath();
  deck.holes.push(kreuz);

  for (const stoss of [1, -1]) {
    const kreuzScheibe = flachteil(deck, P.slotT, 0, 0.2);
    kreuzScheibe.translate(0, aTop - P.slotT / 2, 0);
    const g = mergeGeometries([koerper.clone(), scheibe.clone(), schaft.clone(), kreuzScheibe]);
    g.translate(0, 0, stoss * P.zScrew);
    geos.push(g);
  }
  koerper.dispose();
  scheibe.dispose();
  schaft.dispose();
  return { geo: mergeGeometries(geos), cap: null };
}

/* ─────────────────────── Vierkantmuttern ─────────────────────── */

/* Zwei schwarze Vierkantmuttern, im Foto in seitlichen Taschen unter der
   oberen Lasche. Quadratische Außenkontur mit Kreisloch in einem Shape. */
export function buildMuttern(P) {
  const geos = [];
  const yTop = stossY(P) + P.stegT;          // Unterkante der oberen Lasche
  for (const stoss of [1, -1]) {
    const s = sechskant(P.hexAF, FASE);
    lochen(s, P.boltD / 2, 0, 0, FASE);
    const g = flachteil(s, P.hexH, FASE, 0.2);
    g.translate(0, yTop - P.hexH / 2, stoss * P.zScrew);
    geos.push(g);
  }
  return { geo: mergeGeometries(geos), cap: null };
}

/* ─────────────────────── Gewindestutzen ─────────────────────── */

/* Sechskantstutzen mit DURCHGEHENDER Gewindebohrung, auf dem
   geschlossenen Rücken der unteren Schale.

   Zwei Fehler der Vorfassung sind hier behoben:

     1. Die Lage. `translate(0, top - h + bevel, 0)` rechnete mit einer
        Kontur, die bei y = 0 beginnt — nach rotateX(π/2) lag sie aber
        schon bei y ∈ [−h+bevel, +bevel]. Der Block hing dadurch um
        h − 2·bevel (bei M8: 11,2 mm) UNTER der Schale in der Luft,
        während die Funktion selbst `top` als Oberkante zurückgab. Kein
        Maß hat das gemerkt, weil keines die Lage prüfte.
     2. Der Ort. Der Stutzen stand am unteren Stoß und durchdrang das
        dortige Laschenpaar. Mit der gedrehten Stoßachse steht er auf
        geschlossenem Rücken.

   `top` und `bottom` beschreiben jetzt die tatsächliche Netzlage. */
export function buildStutzen(P) {
  const h = P.nutH;
  const R = P.nutAF / Math.sqrt(3);               // Umkreis des Sechskants
  const rBore = P.threadM / 2;

  const shape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const t = (i / 6) * Math.PI * 2 + Math.PI / 6;
    const rr = R - FASE;
    const x = rr * Math.cos(t), yy = rr * Math.sin(t);
    if (i === 0) shape.moveTo(x, yy); else shape.lineTo(x, yy);
  }
  shape.closePath();
  lochen(shape, rBore, 0, 0, FASE);

  const geo = flachteil(shape, h, FASE, 0.4);
  /* Der Stutzen taucht um bossOverlap in die Schale ein — er sitzt auf. */
  const top = -(P.rOut - P.bossOverlap);
  geo.translate(0, top - h / 2, 0);

  /* Schnittfläche für den Halbschnitt: die Ebene z = 0 legt den Stutzen
     der Länge nach frei. Übrig bleiben links und rechts der Bohrung zwei
     Rechtecke — die Sechskantflanke liegt bei z = 0 genau auf der
     Schlüsselweite/2. */
  const w = P.nutAF / 2, y0 = top - h, y1 = top;
  const cap = mergeGeometries([
    polygonCap([[rBore, y0], [w, y0], [w, y1], [rBore, y1]]),
    polygonCap([[-w, y0], [-rBore, y0], [-rBore, y1], [-w, y1]]),
  ]);
  return { geo, cap, rBore, top, bottom: top - h };
}
