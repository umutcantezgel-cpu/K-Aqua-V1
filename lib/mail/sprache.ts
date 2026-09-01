/**
 * In welcher Sprache eine Mail an den Absender geschrieben wird.
 *
 * WARUM EIN EIGENES MODUL, statt next-intl zu benutzen:
 *
 * Mails entstehen serverseitig, ausserhalb des Anfrage-Kontexts von next-intl.
 * Vor allem aber wuerde der dortige Weg sie durch die Merge-Kette
 * de → en → Zielsprache schicken (`lib/i18n/request.ts`), und die ist fuer
 * eine rechtlich relevante Mail der falsche Mechanismus: Von den 65
 * Sprachdateien gelten nur drei als redaktionell gepflegt, mehrere enthalten
 * Fuellstrings, und zehn liegen derzeit als unlesbares JSON im Baum — deren
 * Sprachen fallen still auf Englisch zurueck, ohne dass es jemand merkt.
 *
 * Eine Website darf so etwas ueberstehen. Eine Eingangsbestaetigung mit
 * Pflichtangaben nicht.
 */

/** Die Sprachen, in denen Mails geschrieben werden. */
export const MAILSPRACHEN = ['de', 'en', 'ar'] as const;

export type Mailsprache = (typeof MAILSPRACHEN)[number];

function istMailsprache(wert: string): wert is Mailsprache {
  return (MAILSPRACHEN as readonly string[]).includes(wert);
}

/**
 * Bildet eine beliebige Website-Locale auf eine Mailsprache ab.
 *
 * Die Website kennt 65 Locales, die Mail drei. Alles, was nicht Deutsch oder
 * Arabisch ist, bekommt **Englisch** — nicht Deutsch. Ein Besucher aus Lyon
 * oder Jakarta kommt mit Englisch weiter als mit einer deutschen Mail, und der
 * deutsche Standard der Website ist hier kein gutes Argument.
 *
 * Regionalformen fallen auf ihre Basissprache: `en-US`, `en-ZA` und `en-AU`
 * werden zu `en`, `ar` bleibt `ar`.
 */
export function aufMailsprache(locale: string | undefined | null): Mailsprache {
  const roh = (locale ?? '').trim().toLowerCase();
  if (roh.length === 0) return 'de';
  const basis = roh.split('-')[0] ?? '';
  if (basis === 'de') return 'de';
  if (basis === 'ar') return 'ar';
  return 'en';
}

/**
 * Liest die Locale aus dem `referer`-Header.
 *
 * Das ist der Rueckfall fuer aeltere, im Browser zwischengespeicherte Seiten,
 * die das Feld `locale` noch nicht mitsenden. Er funktioniert, weil
 * `lib/i18n/routing.ts` `localePrefix: 'always'` setzt — JEDE Seitenadresse
 * traegt ihre Sprache als erstes Pfadsegment.
 *
 * Ausdruecklich NICHT benutzt wird `accept-language`: Das ist die
 * Browsersprache, und wegen `localeDetection: false` gerade nicht die Sprache,
 * die der Besucher tatsaechlich gelesen hat. Ein deutscher Browser auf
 * `/ar/kontakt` meldet `de-DE`, obwohl die Seite arabisch war.
 */
export function spracheAusReferer(referer: string | undefined | null): Mailsprache | null {
  if (!referer) return null;
  try {
    const pfad = new URL(referer).pathname;
    const erstes = pfad.split('/').filter(Boolean)[0];
    return erstes ? aufMailsprache(erstes) : null;
  } catch {
    // Kein gueltiger Verweis — dann eben nicht.
    return null;
  }
}

/**
 * Die Sprache einer eingehenden Anfrage.
 *
 * Reihenfolge: das ausdrueckliche Feld aus dem Formular, dann der Verweis,
 * dann Deutsch. Reine Funktion, damit sie ohne Mocks pruefbar ist.
 */
export function spracheDerAnfrage(
  ausFormular: FormDataEntryValue | string | null | undefined,
  referer?: string | null
): Mailsprache {
  if (typeof ausFormular === 'string' && ausFormular.trim().length > 0) {
    return aufMailsprache(ausFormular);
  }
  return spracheAusReferer(referer) ?? 'de';
}

/** Schreibrichtung — Arabisch laeuft von rechts nach links. */
export function richtung(sprache: Mailsprache): 'ltr' | 'rtl' {
  return sprache === 'ar' ? 'rtl' : 'ltr';
}

/** Der Wert fuer `lang` im Mail-Dokument. */
export function sprachkennung(sprache: Mailsprache): string {
  return sprache;
}

export { istMailsprache };
