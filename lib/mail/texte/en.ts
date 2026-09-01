import type { Mailtexte } from './typen';

/**
 * The English mail copy.
 *
 * This is not a word-for-word rendering of the German. German business
 * correspondence carries a formality that reads stiff in English — „Mit
 * freundlichen Grüßen" is not „With friendly greetings". The register here is
 * the English equivalent of the site's voice: plain, factual, courteous,
 * without the American sales warmth the brand never uses.
 *
 * English also serves every visitor outside German- and Arabic-speaking
 * regions (see `lib/mail/sprache.ts`), so it carries more weight than a
 * secondary translation usually would.
 */
export const TEXTE_EN: Mailtexte = {
  gemeinsam: {
    kopfEingang: 'Confirmation of receipt',
    kopfIntern: 'Internal notification',
    datenschutzText:
      'We process your details solely to handle this enquiry. Further information in our',
    datenschutzLink: 'privacy policy',
    linkedIn: 'K-Aqua on LinkedIn',
    vertrauen: [
      'ISO 9001 · 14001 · 50001, certified by SKZ-Cert',
      'DIN 8077/8078 · DIN EN ISO 15874',
      'Manufactured in Waldsolms, Germany',
    ],
  },

  kunde: {
    betreff: 'We have received your enquiry',
    vorschau: 'Your enquiry has reached us. We will come back to you within one working day.',
    anredeMitName: 'Dear {name},',
    anredeOhneName: 'Hello,',
    dank:
      'thank you for your enquiry — it has reached us and is already with the responsible department. This email is your confirmation; there is nothing further you need to do.',

    weiterTitel: 'What happens next',
    zusageArbeitstag:
      'A specialist will review your enquiry and get back to you personally within one working day — by phone or email, whichever suits you better.',
    zusage24h:
      'A specialist will review your enquiry and get back to you personally within 24 hours — by phone or email, whichever suits you better.',
    eilig: 'In a hurry? Call us directly:',

    angabenTitel: 'Your details',
    angabenHinweis:
      'For your records — this is exactly what you sent us. If something is wrong, simply reply to this email.',
    labelAnliegen: 'Subject',
    labelName: 'Name',
    labelFirma: 'Company',
    labelTelefon: 'Phone',
    labelEmail: 'Email',
    labelNachricht: 'Your message',

    verweiseTitel: 'Until we get back to you',
    verweiseHinweis:
      'Should you wish to look something up in the meantime, these three documents answer most questions:',
    verweisKatalog: {
      titel: 'Main catalogue 06-2025',
      beschreibung: 'The full range from d20 to d630, with every article number (PDF)',
    },
    verweisZertifikate: {
      titel: 'ISO certificates',
      beschreibung: 'Quality, environment and energy, issued by SKZ-Cert (PDF)',
    },
    verweisDownloads: {
      titel: 'Download centre',
      beschreibung: 'Data sheets, installation guidance and BIM data',
    },

    gruss: 'Kind regards',
    signatur: 'Your K-Aqua team',
    automatik:
      'This confirmation was generated automatically. Your reply will be written by a member of staff — you can simply write back to this email.',
  },

  bewerber: {
    betreff: 'Your application has arrived',
    vorschau: 'We have received your documents and will look at them carefully.',
    anredeMitName: 'Hello {name},',
    dank:
      'thank you for your application — your documents have arrived complete. This email is your confirmation of receipt.',

    weiterTitel: 'What happens next',
    weiterText:
      'We will look at your documents carefully and come back to you once we have reviewed them. Please bear with us — we read every application ourselves and do not send standard rejections.',

    angabenTitel: 'What we received',
    labelStelle: 'Position',
    labelName: 'Name',
    labelEmail: 'Email',
    labelTelefon: 'Phone',
    labelEintritt: 'Earliest start',
    labelUnterlagen: 'Documents',
    unterlagenBaukasten: 'Created with the CV builder',

    fragenTitel: 'Questions?',
    fragenText: 'Just write to us — you can reach us at',

    gruss: 'Best regards',
    signatur: 'Your K-Aqua team',
    automatik:
      'This confirmation was generated automatically. Replies still reach us — simply write back.',
  },
};
