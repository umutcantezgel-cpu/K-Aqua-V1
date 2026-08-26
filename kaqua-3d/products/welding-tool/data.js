/* K-Aqua Schweißwerkzeug (Heizelement-Paar) — PROTOTYP.

   QUELLE: Druckkatalog S. 115 (Textebene 25.08.2026): nur Code,
   Nennweite, Pack — kein Maß, kein Gewicht. Zehn Größen d20 bis d125.
   Alle Formmaße sind ASSUMPTION (toolParams in _tooldie/parts.js);
   der einzige Anker ist die Nennweite selbst. */

export const DATA_STATUS = 'prototyp';
export const ARTICLES = [
  { key: '20', code: 'AQ98220', d: 20, pack: 1 },
  { key: '25', code: 'AQ98225', d: 25, pack: 1 },
  { key: '32', code: 'AQ98232', d: 32, pack: 1 },
  { key: '40', code: 'AQ98240', d: 40, pack: 1 },
  { key: '50', code: 'AQ98250', d: 50, pack: 1 },
  { key: '63', code: 'AQ98263', d: 63, pack: 1 },
  { key: '75', code: 'AQ98275', d: 75, pack: 1 },
  { key: '90', code: 'AQ98290', d: 90, pack: 1 },
  { key: '110', code: 'AQ982110', d: 110, pack: 1 },
  { key: '125', code: 'AQ982125', d: 125, pack: 1 },
];
export const SIZES = ARTICLES.map((a) => a.key);
export const DIMENSION_KEY = { d: 'Nennweite' };
export function article(key) {
  const a = ARTICLES.find((x) => String(x.key) === String(key));
  if (!a) throw new Error('K-Aqua Werkzeug: unbekannte Größe ' + key);
  return a;
}
