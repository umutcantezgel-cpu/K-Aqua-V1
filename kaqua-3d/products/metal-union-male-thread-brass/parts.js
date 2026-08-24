/* K-Aqua Metallverschraubung (Außengewinde, Messing) — Konturen.

   Alle vier Teile kommen aus ../_union/parts.js. Der Unterschied
   zwischen Innen- und Außengewindevariante ist ein einziger: buildBody
   setzt bei threadKind 'R' die kegelige Außengewindekontur nach ISO 7-1,
   bei 'Rp' die zylindrische Innengewindekontur nach ISO 228-1.

   Die Paarungsregel verlangt, beide zusammen zu prüfen (Fall 10) —
   deshalb liegt der Maßtest aller vier Varianten in einer Datei:
   pruefung/w5-masstest.html. */

export { buildUnion } from '../_union/assembly.js';

