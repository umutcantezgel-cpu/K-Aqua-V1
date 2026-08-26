/* K-Aqua Verlängerungsstück — PROTOTYP mit EINEM Tabellenmaß.

   QUELLE: Druckkatalog S. 106, unterste Tabelle: Code AQ599E, L 30,
   kg 0,05, Pack 1. Die Maßskizze bemaßt GENAU L — sonst nichts
   (LOOP-STATUS §3.22, Präzisierung). Das Foto zeigt ZWEI Messingteile:
   eine Gewindehülse (außen G-AG, innen IG — sie verlängert das
   UP-Ventiloberteil um L) und einen kleinen Stufenzapfen
   (Spindelverlängerung). Durchmesser sind ASSUMPTION am G-¾"-Anker;
   die kg-Spalte hält die Summe fest. */

export const DATA_STATUS = 'prototyp';
export const SIZES_SOURCE_VERIFIED = 1;
export const ARTICLES = [ { code: 'AQ599E', L: 30, kg: 0.05, pack: 1 } ];
export const SIZES = ['30'];
export const DIMENSION_KEY = { L: 'Verlängerung', kg: 'Gewicht' };
export function article() { return ARTICLES[0]; }
