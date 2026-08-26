import {
  buildProfile, revolve, capFromProfile, grooveMod, thetaSamples, SEG_VIS,
} from '../../core/index.js';

/* Fräskopf mit zwei Längsnuten (Spanraum, angedeutet) + Schaft. */
export function buildFraeser(P) {
  /* Flache angedeutete Spannuten — der erste Wurf (Tiefe 0,42·R) war
     ein halber Ausschnitt, und der Kopf-Strahl las die Nut. */
  const mod = grooveMod(P.nuten, P.fraeserR * 0.30, P.fraeserR * 0.16, P.fraeserR);
  /* Viele Samples zwischen den Nuten: mit 9 lag kein Punkt nahe dem
     Scheitel, und die Kopf-Box las die Sekante — wachsend mit der
     Größe, die Handschrift der Segmentierung (Fall 27). */
  const thetas = thetaSamples(P.nuten, mod.halfAng, 7, 48);
  const profile = buildProfile([
    { a: -P.schaftL, r: P.schaftR, chamfer: 0.6, w: 0 },
    { a: 0, r: P.schaftR, fillet: 0.5, w: 0 },
    { a: 0, r: P.fraeserR, chamfer: 0.6, w: 1 },
    /* Netzpunkt auf halber Kopfhöhe — ohne ihn ist das Messband auf
       der geraden Mantelstrecke leer (die Regel, zum wiederholten
       Mal). */
    { a: P.fraeserH * 0.5, r: P.fraeserR, fillet: 0, w: 1 },
    { a: P.fraeserH - 1.2, r: P.fraeserR, fillet: 0.4, w: 1 },
    { a: P.fraeserH, r: P.fraeserR - 1.2, chamfer: 0.8, w: 0 },
    { a: P.fraeserH, r: 0.02, fillet: 0, w: 0 },
    { a: -P.schaftL, r: 0.02, fillet: 0, w: 0 },
  ], { segs: 4 });
  const geo = revolve(profile, { axis: 'y', thetas, mod });
  return { geo, cap: capFromProfile(profile, 'y') };
}
