/* K-Aqua Anbohrsattel mit Außengewinde — Konturen.

   Alles kommt aus ../_saddle/. Der Sattelschnitt selbst steht in
   parts.js, die Baugruppe in assembly.js.

   Der Unterschied zwischen den drei Sätteln ist genau einer: was oben
   auf dem Sattelkörper sitzt — eine Schweißmuffe, ein Messingring mit
   Innengewinde oder ein Messingzapfen mit Außengewinde. Der Körper
   darunter ist bei allen dreien derselbe. */

export { buildSattel } from '../_saddle/assembly.js';
export { sattelY, satteltiefe, sattelRevolve } from '../_saddle/parts.js';
