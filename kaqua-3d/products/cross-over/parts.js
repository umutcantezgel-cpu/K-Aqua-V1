/* K-Aqua Überbogen — Kontur.

   Der Sweep steht in ../_crossover/parts.js, die Bahn selbst als
   bridgePath im Core. Beide Überbögen bauen denselben Körper; sie
   unterscheiden sich nur darin, was an den Enden sitzt — Schweißmuffe
   oder Spitzende. */

export { buildCrossover } from '../_crossover/parts.js';
export { buildUeberbogen } from '../_crossover/assembly.js';
