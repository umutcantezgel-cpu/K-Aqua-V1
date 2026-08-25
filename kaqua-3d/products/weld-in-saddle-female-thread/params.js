/* K-Aqua Anbohrsattel mit Innengewinde — Parametrik.

   Die Rechnung steht in ../_saddle/params.js: drei Produkte teilen den
   Sattelschnitt, die Schürzenbreite und die Krümmungsannahme. Dreimal
   dieselbe Rechnung würde driften (Fall 32).

   Was dieses Produkt daran festlegt, steht in index.js im cfg-Objekt —
   die Bauart und, bei den Gewindesätteln, die Gewindeart. */

export { sattelParams } from '../_saddle/params.js';
