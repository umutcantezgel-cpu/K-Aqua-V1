/* K-Aqua Elektroschweißgerät — PROTOTYP.
   QUELLE: S. 117: nur Code AQ990, Pack 1. Gestalt nach dem
   Katalogrender (Kontaktbogen s117-02); alle Maße ASSUMPTION. */
export const DATA_STATUS = 'prototyp';
export const ARTICLES = [ { key: 'set', code: 'AQ990', pack: 1 } ];
export const SIZES = ['set'];
export const DIMENSION_KEY = {};
export function article() { return ARTICLES[0]; }
