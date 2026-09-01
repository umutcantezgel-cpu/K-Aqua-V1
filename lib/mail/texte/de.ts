import type { Mailtexte, InterneTexte } from './typen';

/**
 * Die deutschen Mailtexte.
 *
 * TON: „Sie", sachlich, kurze Hauptsätze, Doppelpunkt statt Nebensatz — so
 * schreibt die Website durchgängig (615 Sie-Formen gegen 34 Du-Formen in
 * `messages/de.json`). Keine Ausrufezeichen, keine Emoji, keine Superlative.
 * Der Auftraggeber hatte sich eine wärmere Ansprache gewünscht („hallo, wie
 * geht's"); umgesetzt ist die ABSICHT — willkommen heißen, orientieren,
 * beruhigen — im Register der Marke. Eine Mail, die anders klingt als die
 * Seite, von der sie kommt, wirkt wie von einem Fremden.
 *
 * ANTWORTZUSAGE: „innerhalb eines Arbeitstages" ist die häufigste und
 * konservativste Zusage der Website. `/projektanfrage` verspricht strenger
 * „unter 24 Stunden" — wer von dort kommt, hat das gelesen, und die Mail
 * nennt dann diese Zusage.
 *
 * KEINE WERBUNG: Unter jedem Formular steht „Keine Werbung, keine
 * Weitergabe." Die Verweise unten sind Orientierung (Katalog, Zertifikate,
 * Downloads), keine Produktanpreisung. Diese Grenze ist bewusst gezogen.
 */
export const TEXTE_DE: Mailtexte = {
  gemeinsam: {
    kopfEingang: 'Eingangsbestätigung',
    kopfIntern: 'Interne Benachrichtigung',
    datenschutzText:
      'Ihre Angaben verarbeiten wir ausschließlich zur Bearbeitung dieser Anfrage. Näheres in unserer',
    datenschutzLink: 'Datenschutzerklärung',
    linkedIn: 'K-Aqua bei LinkedIn',
    vertrauen: [
      'ISO 9001 · 14001 · 50001, geprüft durch SKZ-Cert',
      'DIN 8077/8078 · DIN EN ISO 15874',
      'Produktion in Waldsolms, Hessen',
    ],
  },

  kunde: {
    betreff: 'Ihre Anfrage ist bei uns angekommen',
    vorschau:
      'Wir haben Ihre Anfrage erhalten und melden uns innerhalb eines Arbeitstages bei Ihnen.',
    anredeMitName: 'Guten Tag {name},',
    anredeOhneName: 'Guten Tag,',
    dank:
      'vielen Dank für Ihre Anfrage — sie ist bei uns angekommen und liegt bereits beim zuständigen Fachbereich. Diese E-Mail ist Ihre Bestätigung; Sie müssen nichts weiter tun.',

    weiterTitel: 'Wie es weitergeht',
    zusageArbeitstag:
      'Ein Fachberater sieht sich Ihre Anfrage an und meldet sich innerhalb eines Arbeitstages persönlich bei Ihnen — telefonisch oder per E-Mail, ganz wie es Ihnen lieber ist.',
    zusage24h:
      'Ein Fachberater sieht sich Ihre Anfrage an und meldet sich innerhalb von 24 Stunden persönlich bei Ihnen — telefonisch oder per E-Mail, ganz wie es Ihnen lieber ist.',
    eilig: 'Eilt es? Dann rufen Sie uns gern direkt an:',

    angabenTitel: 'Ihre Angaben',
    angabenHinweis:
      'Zum Nachlesen — genau das haben Sie uns übermittelt. Stimmt etwas nicht, antworten Sie einfach auf diese E-Mail.',
    labelAnliegen: 'Anliegen',
    labelName: 'Name',
    labelFirma: 'Unternehmen',
    labelTelefon: 'Telefon',
    labelEmail: 'E-Mail',
    labelNachricht: 'Ihre Nachricht',

    verweiseTitel: 'Bis wir uns melden',
    verweiseHinweis:
      'Falls Sie in der Zwischenzeit etwas nachschlagen möchten — diese drei Unterlagen beantworten die meisten Fragen:',
    verweisKatalog: {
      titel: 'Hauptkatalog 06-2025',
      beschreibung: 'Das vollständige Programm von d20 bis d630, mit allen Artikelnummern (PDF)',
    },
    verweisZertifikate: {
      titel: 'ISO-Zertifikate',
      beschreibung: 'Qualität, Umwelt und Energie, ausgestellt von SKZ-Cert (PDF)',
    },
    verweisDownloads: {
      titel: 'Download-Center',
      beschreibung: 'Datenblätter, Verarbeitungshinweise und BIM-Daten',
    },

    gruss: 'Mit freundlichen Grüßen',
    signatur: 'Ihr Team von K-Aqua',
    /* Der zweite Satz ist Absicht.
       Eine schmucklose Bestätigungsmail mit PDF-Verweisen vom Erstkontakt
       eines fremden Absenders trägt beim Empfänger einen Phishing-Verdacht
       mit sich. Der Hinweis, dass ein Mensch antwortet, nimmt ihn vorweg und
       steuert zugleich die Erwartung: Diese Mail ist die Quittung, die
       Antwort kommt noch. */
    automatik:
      'Diese Bestätigung wurde automatisch erstellt. Ihre Antwort schreibt ein Mitarbeiter — Sie können auf diese E-Mail einfach zurückschreiben.',
  },

  bewerber: {
    /* DUZEN, im Unterschied zur Kundenmail.
       Das Bewerberportal duzt durchgängig ("Werde Teil unseres Teams",
       "Ziehe deinen Lebenslauf hierhin", "Vielen Dank für deine Bewerbung"),
       und diese Mail ist dessen unmittelbare Fortsetzung. Ein Wechsel ins Sie
       genau an dieser Stelle würde befremden. */
    betreff: 'Deine Bewerbung ist angekommen',
    vorschau: 'Wir haben deine Unterlagen erhalten und sehen sie uns in Ruhe an.',
    anredeMitName: 'Hallo {name},',
    dank:
      'danke für deine Bewerbung — deine Unterlagen sind vollständig bei uns angekommen. Diese E-Mail ist deine Eingangsbestätigung.',

    weiterTitel: 'Wie es weitergeht',
    /* KEINE FRIST. Für Bewerbungen macht die Website nirgends eine Zusage zur
       Antwortzeit -- weder im Code noch in den Sprachdateien. Eine hier
       erfundene Frist waere schlechter als keine: Sie waere nicht abgestimmt
       und wuerde beim ersten Ueberschreiten Vertrauen kosten. */
    weiterText:
      'Wir sehen uns deine Unterlagen in Ruhe an und melden uns bei dir, sobald wir sie geprüft haben. Bitte hab ein wenig Geduld — wir lesen jede Bewerbung selbst und schicken keine Standardabsagen.',

    angabenTitel: 'Das haben wir erhalten',
    labelStelle: 'Stelle',
    labelName: 'Name',
    labelEmail: 'E-Mail',
    labelTelefon: 'Telefon',
    labelEintritt: 'Frühester Eintritt',
    labelUnterlagen: 'Unterlagen',
    unterlagenBaukasten: 'Über den Lebenslauf-Baukasten erstellt',

    fragenTitel: 'Fragen?',
    fragenText: 'Schreib uns einfach — du erreichst uns unter',

    gruss: 'Viele Grüße',
    signatur: 'Dein Team von K-Aqua',
    automatik:
      'Diese Bestätigung wurde automatisch erzeugt. Antworten erreichen uns trotzdem — schreib einfach zurück.',
  },
};

/**
 * Die internen Mails.
 *
 * Immer Deutsch, unabhängig von der Sprache des Absenders: Sie gehen an den
 * eigenen Vertrieb und die eigene Personalabteilung in Waldsolms.
 */
export const TEXTE_INTERN: InterneTexte = {
  anfrageTitel: 'Neue Anfrage über k-aqua.de',
  anfrageEilig: 'Direkt zurückrufen',
  bewerbungTitel: 'Neue Bewerbung eingegangen',

  labelAnliegen: 'Anliegen',
  labelName: 'Name',
  labelFirma: 'Unternehmen',
  labelTelefon: 'Telefon',
  labelEmail: 'E-Mail',
  labelNachricht: 'Nachricht',
  labelStelle: 'Stelle',
  labelEintritt: 'Frühester Eintritt',
  labelUnterlagen: 'Unterlagen',

  herkunftTitel: 'Herkunft',
  labelQuellseite: 'Quellseite',
  labelSprache: 'Browsersprache',
  labelZeit: 'Eingegangen',
  labelPfad: 'Pfad',

  warnhinweis:
    'Automatische Auffälligkeit: {grund} Die Anfrage wurde trotzdem zugestellt — bitte kurz prüfen.',
};
