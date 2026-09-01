import type { Mailsprache } from '../sprache';
import type { Mailtexte, InterneTexte } from './typen';
import { TEXTE_DE, TEXTE_INTERN } from './de';
import { TEXTE_EN } from './en';
import { TEXTE_AR } from './ar';

/**
 * Zugriff auf die Mailtexte.
 *
 * `Record<Mailsprache, Mailtexte>` ist der eigentliche Wächter: Fehlt in
 * `ar.ts` ein Schlüssel, schlägt der Typecheck fehl. Es gibt hier bewusst
 * keinen Rückfall auf eine andere Sprache — ein Rückfall würde eine Lücke
 * verdecken, statt sie zu melden, und genau daran krankt die Sprachkette der
 * Website.
 */
const NACH_SPRACHE: Record<Mailsprache, Mailtexte> = {
  de: TEXTE_DE,
  en: TEXTE_EN,
  ar: TEXTE_AR,
};

export function texte(sprache: Mailsprache): Mailtexte {
  return NACH_SPRACHE[sprache];
}

/** Die internen Mails sind immer deutsch — sie gehen an das eigene Haus. */
export function interneTexte(): InterneTexte {
  return TEXTE_INTERN;
}

/**
 * Setzt `{name}` und ähnliche Platzhalter ein.
 *
 * Bewusst winzig gehalten und ohne Bibliothek: Es gibt genau zwei Platzhalter
 * im ganzen Textbestand. Der eingesetzte Wert wird hier NICHT maskiert — das
 * tut die Vorlage beim Einbau, denn nur dort ist bekannt, ob der Wert in
 * einem Textknoten oder in einem Attribut landet.
 */
export function fuelle(vorlage: string, werte: Record<string, string>): string {
  return vorlage.replace(/\{(\w+)\}/g, (treffer, schluessel: string) =>
    Object.prototype.hasOwnProperty.call(werte, schluessel) ? (werte[schluessel] ?? '') : treffer
  );
}

export type { Mailtexte, InterneTexte } from './typen';
