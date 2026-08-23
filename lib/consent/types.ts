// Einwilligungskategorien.
//
// Die Website setzt derzeit keine Cookies und bindet keine Drittanbieter ein.
// Gespeichert wird ausschließlich im localStorage des Besuchers. Die Kategorien
// bilden deshalb ab, was tatsächlich passiert — nicht, was ein Standardbanner
// üblicherweise abfragt.

export type ConsentCategory = 'necessary' | 'comfort' | 'analytics';

/** Reihenfolge, in der die Kategorien im Dialog erscheinen. */
export const CONSENT_CATEGORIES: ConsentCategory[] = ['necessary', 'comfort', 'analytics'];

/**
 * Fassung der Datenschutzerklärung, auf die sich eine Einwilligung bezieht.
 *
 * Wird dieser Wert erhöht, gilt eine ältere Einwilligung als überholt und der
 * Dialog erscheint erneut. Ohne diesen Mechanismus bliebe eine Einwilligung
 * unbemerkt gültig, obwohl sich die Grundlage geändert hat.
 */
export const CONSENT_POLICY_VERSION = 2;

export const CONSENT_STORAGE_KEY = 'k-aqua-consent-v2';

/** Schlüssel der abgelösten Fassung — werden bei der Migration gelesen und entfernt. */
export const LEGACY_KEYS = [
  'k-aqua-cookie-consent',
  'cookie_essential',
  'cookie_analytics',
  'cookie_marketing',
] as const;

export interface ConsentDecisions {
  /** Immer erteilt: ohne diese Speicherung ist die Seite nicht bedienbar. */
  necessary: true;
  /** Eingaben in den Werkzeugen, Darstellungswahl, zuletzt gesuchte Begriffe. */
  comfort: boolean;
  /** Reichweitenmessung. Derzeit ist kein solcher Dienst eingebunden. */
  analytics: boolean;
}

/**
 * Nachweis der Einwilligung nach Art. 7 Abs. 1 DSGVO: Der Verantwortliche muss
 * belegen können, dass, wann und wozu eingewilligt wurde.
 */
export interface ConsentRecord {
  /** Format-Version des Datensatzes selbst. */
  v: 2;
  /** Zeitpunkt der Entscheidung, ISO 8601. */
  ts: string;
  /** Fassung der Datenschutzerklärung zum Zeitpunkt der Entscheidung. */
  policyVersion: number;
  decisions: ConsentDecisions;
  /** Über welchen Weg die Entscheidung getroffen wurde. */
  via: 'banner' | 'settings';
}

export const DEFAULT_DECISIONS: ConsentDecisions = {
  necessary: true,
  // Keine Vorauswahl: eine vorangekreuzte Zustimmung ist keine Einwilligung
  // (EuGH, Planet49, C-673/17).
  comfort: false,
  analytics: false,
};
