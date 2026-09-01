/**
 * Die vier Lieferfarben der K-Aqua-Rohrserien.
 *
 * Grün ist die Standardausführung, Blau, Curry und Mocca sind die
 * Sonderfarben aus dem Marketing-Archiv (`Marketing/Produktbilder/`, die
 * Ordnernamen tragen die RAL-Nummern).
 *
 * Nur Rohre führen diese Varianten. Formstücke, Armaturen und Werkzeuge gibt
 * es laut Katalog ausschließlich in Grün — der Wähler erscheint dort deshalb
 * nicht, und das ist keine Lücke, sondern das Lieferprogramm.
 *
 * Die Liste stand bis hierher nur im Viewer. Sie liegt jetzt eigenständig,
 * damit der Test dieselbe Quelle prüfen kann wie die Anzeige, statt eine
 * `'use client'`-Komponente samt three.js laden zu müssen.
 */

/** Die Variantenschlüssel, in Anzeigereihenfolge. Deckungsgleich mit
 *  `ROHR_VARIANTEN` in kaqua-3d/products/_pipe/parts.js. */
export const VARIANT_IDS = ['gruen', 'blau', 'curry', 'mocca'] as const;

export type VariantId = (typeof VARIANT_IDS)[number];

/**
 * Der Farbfleck je Variante.
 *
 * Die Hex-Werte MÜSSEN mit den Materialrezepten in
 * `kaqua-3d/core/materials.js` übereinstimmen — sonst zeigt der Wähler eine
 * andere Farbe als das Modell daneben, und das fällt sofort auf.
 *
 * Grün trägt bewusst nicht die RAL-Nummer des Granulats: RAL 6024 ist die
 * Norm des Rohstoffs, der hier gezeigte Wert ist aus 14 Herstelleraufnahmen
 * gemessen und beschreibt das fertige Bauteil. Die drei Sonderfarben folgen
 * dagegen direkt der RAL-Angabe aus dem Archiv.
 */
export const VARIANT_HEX: Record<VariantId, string> = {
  gruen: '#32A175',
  blau: '#005387',
  curry: '#C6A664',
  mocca: '#B9B9A8',
};

/** Ist dieser Schlüssel eine bekannte Lieferfarbe? */
export function istVariante(v: string): v is VariantId {
  return (VARIANT_IDS as readonly string[]).includes(v);
}
