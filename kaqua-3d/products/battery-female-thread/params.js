/* K-Aqua Batterieanschluss IG — Parametrik.

   Aus der Tabelle kommen d, Rp, L und L1; der Blockdurchmesser ist
   über L1 − L = 35 = D(½") der Gewindereihe belegt (data.js). Was das
   Foto beisteuert, ist als ASSUMPTION mit Herleitung markiert. */

import { D2R, fusionDepth, socketOD, threadSpec } from '../../core/index.js';
import { article } from './data.js';

export function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);
  const { d } = a;

  const th = threadSpec(a.Rp);
  if (!th) throw new Error('K-Aqua Batterie: kein Normmaß für Rp' + a.Rp);
  P.threadOD = th.od;
  P.threadPitch = th.pitch;
  P.threadCore = Math.round((th.od - 2 * 0.640327 * th.pitch) * 100) / 100;

  P.len = a.L1;
  P.xEnd = a.L1 / 2;
  P.xAchse = a.L / 2;                    // Rp-Achsen bei ±L/2

  /* Der Block: Ø 35 = D(½") — belegt, keine Annahme. Er liegt
     waagerecht, Rp-Öffnung nach vorn (+Z). */
  P.blockOD = a.L1 - a.L;
  P.rBlock = P.blockOD / 2;

  /* Muffenkörper oben: Außen-Ø aus der Normreihe. */
  P.socket = fusionDepth(d) ?? Math.max(10, d * 0.55);
  P.sockOD = socketOD(d) ?? Math.round(d * 1.45);
  P.rSock = P.sockOD / 2;
  P.wallPipe = d / 6;
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;
  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);

  /* ASSUMPTION Bauhöhen, aus dem Produktfoto (Kasten B/H ≈ 2,09 bei
     L1 = 185 → Gesamthöhe ≈ 88 mm):
       Muffenmund bis Muffenachse? — der Muffenkörper steht senkrecht,
       seine Höhe = Schweißtiefe + Grund + Fuge. Rp-Achse liegt
       DARUNTER; Achsversatz v ≈ 45 mm. Die Massenprobe hält die
       Annahme fest. */
  P.vAchse = 45;                          // Muffenachse (oben) → Rp-Achse
  P.muffH = P.socket + 6;                 // Muffenkörper über der Fuge
  P.blockLen = Math.round(P.blockOD * 1.05);   // Blocktiefe in Z, aus dem Foto
  /* Ringlänge: erste Annahme 0,62·Block wog +16/+20 % gegen die
     kg-Spalte — die Massenprobe hat sie auf 0,50·Block geschärft. */
  P.ringLen = Math.round(P.blockLen * 0.50);

  /* Messingring: Sitz wie bei der IG-Muffe (threadRing bringt die
     0,15-mm-Senkung mit). */
  P.rRing = Math.min(P.threadOD / 2 + Math.max(2.0, 0.14 * P.threadOD), P.rBlock - 2.5);
  P.turns = Math.max(4, Math.floor((P.ringLen - 2) / P.threadPitch));

  /* Steg: Flachbalken mit Fachwerkrippen und zwei Montagelöchern —
     alles ASSUMPTION aus dem Foto. */
  P.stegH = 26;
  P.stegT = 7;
  P.stegLochR = 3.2;
  P.stegLochX = 37;                       // Lochabstand von der Mitte

  if (P.rRing <= P.threadOD / 2 + 1.2) {
    throw new Error('K-Aqua Batterie d' + d + ': Ringwand zu dünn');
  }
  if (P.vAchse < P.rSock + P.rBlock * 0.4) {
    throw new Error('K-Aqua Batterie d' + d + ': Achsversatz trägt die Körper nicht');
  }
  return P;
}
