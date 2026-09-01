/**
 * Der Textbestand aller K-Aqua-Mails.
 *
 * Der Typ erzwingt Vollständigkeit: Fehlt ein Schlüssel in `ar.ts`, meldet es
 * der Typecheck — nicht der Kunde, der eine Mail mit einer Lücke bekommt.
 *
 * Warum die Texte hier stehen und nicht in `messages/`: Mails entstehen
 * serverseitig, außerhalb von next-intl. Vor allem aber liefe der dortige Weg
 * durch die Merge-Kette de → en → Zielsprache, und von den 65 Sprachdateien
 * gelten nur drei als redaktionell gepflegt. Für eine Website ist dieser
 * Rückfall tragbar; für eine Eingangsbestätigung mit Pflichtangaben nicht.
 */

export interface VerweisText {
  readonly titel: string;
  readonly beschreibung: string;
}

/** Was in jeder Mail gleich ist — vor allem der Rechtsfuß. */
export interface GemeinsameTexte {
  /** Zeile über dem Logo, z. B. „Eingangsbestätigung". */
  readonly kopfEingang: string;
  readonly kopfIntern: string;
  readonly datenschutzText: string;
  readonly datenschutzLink: string;
  readonly linkedIn: string;
  /** Die Vertrauenszeile über dem Fuß. */
  readonly vertrauen: readonly string[];
}

export interface KundenTexte {
  readonly betreff: string;
  readonly vorschau: string;
  /** `{name}` wird ersetzt. */
  readonly anredeMitName: string;
  readonly anredeOhneName: string;
  readonly dank: string;
  readonly weiterTitel: string;
  /** Zusage für den Normalfall. */
  readonly zusageArbeitstag: string;
  /** Strengere Zusage für Anfragen über die Projektanfrage-Strecke. */
  readonly zusage24h: string;
  readonly eilig: string;
  readonly angabenTitel: string;
  readonly angabenHinweis: string;
  readonly labelAnliegen: string;
  readonly labelName: string;
  readonly labelFirma: string;
  readonly labelTelefon: string;
  readonly labelEmail: string;
  readonly labelNachricht: string;
  readonly verweiseTitel: string;
  readonly verweiseHinweis: string;
  readonly verweisKatalog: VerweisText;
  readonly verweisZertifikate: VerweisText;
  readonly verweisDownloads: VerweisText;
  readonly gruss: string;
  readonly signatur: string;
  /** Erklärt, dass die Mail automatisch kam — ohne unfreundlich zu klingen. */
  readonly automatik: string;
}

export interface BewerberTexte {
  readonly betreff: string;
  readonly vorschau: string;
  readonly anredeMitName: string;
  readonly dank: string;
  readonly weiterTitel: string;
  readonly weiterText: string;
  readonly angabenTitel: string;
  readonly labelStelle: string;
  readonly labelName: string;
  readonly labelEmail: string;
  readonly labelTelefon: string;
  readonly labelEintritt: string;
  readonly labelUnterlagen: string;
  readonly unterlagenBaukasten: string;
  readonly fragenTitel: string;
  readonly fragenText: string;
  readonly gruss: string;
  readonly signatur: string;
  readonly automatik: string;
}

/** Die internen Mails. Immer Deutsch — sie gehen an den eigenen Vertrieb. */
export interface InterneTexte {
  readonly anfrageTitel: string;
  readonly anfrageEilig: string;
  readonly bewerbungTitel: string;
  readonly labelAnliegen: string;
  readonly labelName: string;
  readonly labelFirma: string;
  readonly labelTelefon: string;
  readonly labelEmail: string;
  readonly labelNachricht: string;
  readonly labelStelle: string;
  readonly labelEintritt: string;
  readonly labelUnterlagen: string;
  readonly herkunftTitel: string;
  readonly labelQuellseite: string;
  readonly labelSprache: string;
  readonly labelZeit: string;
  readonly labelPfad: string;
  readonly warnhinweis: string;
}

export interface Mailtexte {
  readonly gemeinsam: GemeinsameTexte;
  readonly kunde: KundenTexte;
  readonly bewerber: BewerberTexte;
}
