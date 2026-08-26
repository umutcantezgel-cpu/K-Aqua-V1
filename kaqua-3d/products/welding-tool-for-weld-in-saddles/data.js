/* K-Aqua Schweißwerkzeug für Anbohrsättel — PROTOTYP.

   QUELLE: Druckkatalog S. 115 (Textebene 25.08.2026): nur Code,
   Nennweite, Pack — kein Maß, kein Gewicht. Neun Kombinationen Rohrgruppe × Abzweig; d ist die Abzweig-Nennweite. Damit schließt sich auch LOOP-STATUS §3.24 (das Werkzeug existiert, gebaut als Prototyp).
   Alle Formmaße sind ASSUMPTION (toolParams in _tooldie/parts.js);
   der einzige Anker ist die Nennweite selbst. */

export const DATA_STATUS = 'prototyp';
export const ARTICLES = [
  { key: '40-63x25', code: 'AQ98504006325', d: 25, pack: 1 },
  { key: '75-125x25', code: 'AQ98507512525', d: 25, pack: 1 },
  { key: '75-125x32', code: 'AQ98507512532', d: 32, pack: 1 },
  { key: '75-125x40', code: 'AQ98507512540', d: 40, pack: 1 },
  { key: '160-250x25', code: 'AQ98516025025', d: 25, pack: 1 },
  { key: '160-250x32', code: 'AQ98516025032', d: 32, pack: 1 },
  { key: '160-250x40', code: 'AQ98516025040', d: 40, pack: 1 },
  { key: '160-250x50', code: 'AQ98516025050', d: 50, pack: 1 },
  { key: '160-250x63', code: 'AQ98516025063', d: 63, pack: 1 },
];
export const SIZES = ARTICLES.map((a) => a.key);
export const DIMENSION_KEY = { d: 'Nennweite' };
export function article(key) {
  const a = ARTICLES.find((x) => String(x.key) === String(key));
  if (!a) throw new Error('K-Aqua Werkzeug: unbekannte Größe ' + key);
  return a;
}
