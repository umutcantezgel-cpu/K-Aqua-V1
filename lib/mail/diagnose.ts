import type { MailChannel, MailFailure } from './types';

/**
 * Übersetzt einen Anbieterfehler in eine Ursache im Klartext.
 *
 * Das ist der Teil, der den Selbsttest wertvoll macht — und er ist rein, also
 * ohne echte Zugangsdaten prüfbar. Damit wird die Frage „was sieht der Kunde
 * bei falschem Schlüssel" testbar, ohne je einen falschen Schlüssel zu
 * besitzen.
 *
 * Dieselbe Funktion beschriftet die Laufzeit-Fehlerlogs. Kunde und Log
 * sprechen damit dieselbe Sprache.
 */

export interface Diagnose {
  readonly reason: MailFailure;
  readonly detail: string;
}

/** Holt eine Meldung aus einem beliebig geformten Fehlerobjekt. */
function meldungAus(fehler: unknown): string {
  if (typeof fehler === 'string') return fehler;
  if (fehler instanceof Error) return fehler.message;
  if (fehler && typeof fehler === 'object') {
    const o = fehler as Record<string, unknown>;
    const teile = [o.name, o.message, o.code, o.responseCode]
      .filter((t): t is string | number => typeof t === 'string' || typeof t === 'number')
      .map(String);
    if (teile.length > 0) return teile.join(' ');
    try {
      return JSON.stringify(fehler).slice(0, 300);
    } catch {
      return 'Unbekannter Fehler';
    }
  }
  return 'Unbekannter Fehler';
}

export function diagnoseMailFehler(fehler: unknown, kanal: MailChannel): Diagnose {
  if (kanal === 'none') {
    return {
      reason: 'not-configured',
      detail:
        'Kein Versandweg konfiguriert. Setze RESEND_API_KEY, oder SMTP_HOST + SMTP_USER + SMTP_PASS.',
    };
  }

  const roh = meldungAus(fehler);
  const m = roh.toLowerCase();

  // --- Absender / Domain -------------------------------------------------
  if (m.includes('not verified') || m.includes('domain is not verified')) {
    return {
      reason: 'sender',
      detail:
        'Die Absenderdomain ist bei Resend nicht verifiziert. Im Resend-Dashboard die DNS-Eintraege fuer k-aqua.de hinterlegen und die Verifizierung abwarten.',
    };
  }
  if (m.includes('invalid `from`') || m.includes('invalid from') || m.includes('from address')) {
    return {
      reason: 'sender',
      detail:
        'MAIL_FROM ist keine gueltige Absenderadresse. Erwartetes Format: "K-Aqua <noreply@k-aqua.de>".',
    };
  }

  // --- Zugangsdaten ------------------------------------------------------
  if (
    m.includes('eauth') ||
    m.includes('invalid api key') ||
    m.includes('api key is invalid') ||
    m.includes('unauthorized') ||
    m.includes('401') ||
    m.includes('403')
  ) {
    return {
      reason: 'auth',
      detail:
        kanal === 'resend'
          ? 'RESEND_API_KEY wird von Resend abgelehnt. Schluessel in der Vercel-Umgebung pruefen.'
          : 'SMTP_USER oder SMTP_PASS werden vom Mailserver abgelehnt.',
    };
  }

  // --- Netz --------------------------------------------------------------
  if (m.includes('econnrefused') || m.includes('etimedout') || m.includes('enotfound')) {
    return {
      reason: 'network',
      detail:
        'SMTP_HOST oder SMTP_PORT sind nicht erreichbar. Hinweis: Vercel blockiert Port 25 — nutze 587 oder 465.',
    };
  }
  if (m.includes('wrong version number') || m.includes('esocket')) {
    return {
      reason: 'network',
      detail:
        'SMTP_SECURE passt nicht zum Port: bei Port 587 muss es "false" sein, bei Port 465 "true".',
    };
  }

  // --- Empfaenger --------------------------------------------------------
  if (m.includes('invalid `to`') || m.includes('recipient') || m.includes('550')) {
    return {
      reason: 'recipient',
      detail:
        'Die Empfaengeradresse wurde abgelehnt. MAIL_TO_LEADS bzw. MAIL_TO_JOBS pruefen.',
    };
  }

  return {
    reason: 'provider',
    detail: `Der Versanddienst meldet: ${roh.slice(0, 300)}`,
  };
}
