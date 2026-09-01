import type { MailChannel } from './types';

/**
 * Welcher Versandweg gilt, und womit.
 *
 * Zwei Entwurfsentscheidungen, die den Rest tragen:
 *
 * 1. **`env` ist ein Parameter, kein globaler Zugriff.** Damit ist die
 *    Transportwahl eine reine Funktion: Der Test ruft sie mit einem
 *    Objektliteral auf statt mit `vi.stubEnv`, das prozessweit wirkt und
 *    zwischen Testdateien nachhallt.
 *
 * 2. **Der Client entsteht erst im Sendepfad.** Bisher stand in
 *    `app/actions/lead.ts:8` ein `new Resend(...)` auf Modulebene. Das läuft
 *    schon während `next build`, friert die Entscheidung „Resend ja/nein" beim
 *    Kaltstart ein und macht das Modul untestbar.
 */

export type MailConfig =
  | { readonly channel: 'resend'; readonly apiKey: string; readonly from: string }
  | {
      readonly channel: 'smtp';
      readonly host: string;
      readonly port: number;
      readonly secure: boolean;
      readonly user: string;
      readonly pass: string;
      readonly from: string;
    }
  | {
      readonly channel: 'console';
      readonly from: string;
      readonly grund: 'explizit' | 'entwicklung';
    }
  | { readonly channel: 'none' };

/**
 * Die Umgebung, wie diese Datei sie braucht.
 *
 * Bewusst NICHT `NodeJS.ProcessEnv`: Next.js erweitert diesen Typ um ein
 * verpflichtendes `NODE_ENV`, und dann liesse sich die Funktion im Test nicht
 * mehr mit einem knappen Objektliteral aufrufen — man muesste jedem Aufruf ein
 * `NODE_ENV` beilegen, auch dort, wo es nichts zur Sache tut. `process.env`
 * bleibt zuweisbar, weil es genau diese Indexsignatur hat.
 */
export type Umgebung = Record<string, string | undefined>;

/** Absender, wenn nichts gesetzt ist. */
const FROM_VORGABE = 'K-Aqua Website <noreply@k-aqua.de>';

/**
 * Empfänger-Vorgaben — bis hierher standen sie fest verdrahtet in zwei
 * Dateien (`lead.ts:82` und `apply/route.ts:110`).
 */
export const EMPFAENGER_VORGABE = {
  leads: 'info@k-aqua.de',
  jobs: 'jobs@k-aqua.de',
} as const;

export type Empfaengerart = keyof typeof EMPFAENGER_VORGABE;

function nichtLeer(wert: string | undefined): string | undefined {
  const w = wert?.trim();
  return w && w.length > 0 ? w : undefined;
}

/**
 * Bestimmt den Versandweg.
 *
 * Reihenfolge: ausdrücklicher Schalter, dann Resend, dann SMTP, dann — je nach
 * Umgebung — Konsole oder gar nichts.
 *
 * **Warum nicht `NODE_ENV === 'production'` als Hauptkriterium:** Vercel setzt
 * `NODE_ENV=production` auch für Vorschau-Bereitstellungen und für jeden
 * `next build`. Eine Regel, die daran hängt, würde auf jeder Vorschau-URL
 * Sendefehler zeigen, sobald dort keine Zugangsdaten liegen — und umgekehrt
 * echte Mails an den Vertrieb schicken, sobald doch welche da sind. Das
 * eigentliche Kriterium ist „sind Zugangsdaten vorhanden"; `NODE_ENV`
 * entscheidet nur noch, ob das Fehlen ein Fehler ist oder der Konsolen-Mock.
 *
 * `MAIL_TRANSPORT=console` erzwingt den Mock unabhängig davon — der Schalter
 * für Vorschauumgebungen und für den Selbsttest.
 */
export function resolveMailConfig(env: Umgebung = process.env): MailConfig {
  const from = nichtLeer(env.MAIL_FROM) ?? nichtLeer(env.RESEND_FROM) ?? nichtLeer(env.SMTP_FROM) ?? FROM_VORGABE;

  if (nichtLeer(env.MAIL_TRANSPORT) === 'console') {
    return { channel: 'console', from, grund: 'explizit' };
  }

  const apiKey = nichtLeer(env.RESEND_API_KEY);
  if (apiKey) return { channel: 'resend', apiKey, from };

  const host = nichtLeer(env.SMTP_HOST);
  const user = nichtLeer(env.SMTP_USER);
  const pass = nichtLeer(env.SMTP_PASS);
  if (host && user && pass) {
    const portRoh = Number(nichtLeer(env.SMTP_PORT) ?? '587');
    return {
      channel: 'smtp',
      host,
      user,
      pass,
      from,
      port: Number.isFinite(portRoh) && portRoh > 0 ? portRoh : 587,
      secure: nichtLeer(env.SMTP_SECURE) === 'true',
    };
  }

  // In der Entwicklung ist der Konsolen-Mock nützlich; in Produktion ist er
  // gefährlich, weil er Datenverlust unsichtbar macht.
  if (env.NODE_ENV === 'production') return { channel: 'none' };
  return { channel: 'console', from, grund: 'entwicklung' };
}

/** Sieht der Wert überhaupt wie eine Adresse aus? Bewusst grob. */
function istAdresse(wert: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(wert);
}

/**
 * Löst die Empfängerliste auf.
 *
 * Kommagetrennt mehrfach belegbar, weil „bitte zusätzlich an vertrieb@" die
 * absehbarste Nachfrage nach der Übergabe ist.
 *
 * **Der Grund für die Prüfung:** Eine Variable mehr ist eine Tippgelegenheit
 * mehr, und ein Tippfehler in `MAIL_TO_LEADS` würde jede Anfrage ins Leere
 * schicken, während der Anbieter brav „zugestellt" meldet — ein neuer stiller
 * Ausfall, während wir gerade den alten beseitigen. Was nicht wie eine Adresse
 * aussieht, fliegt raus; bleibt nichts übrig, gilt die Vorgabe, und es gibt
 * eine laute Logzeile. Der schlimmste Fall ist damit „wie bisher", nicht
 * „ins Nichts".
 */
export function resolveEmpfaenger(art: Empfaengerart, env: Umgebung = process.env): string[] {
  const variable = art === 'leads' ? 'MAIL_TO_LEADS' : 'MAIL_TO_JOBS';
  const roh = nichtLeer(env[variable]);
  const vorgabe = EMPFAENGER_VORGABE[art];
  if (!roh) return [vorgabe];

  const geprueft = roh
    .split(',')
    .map((a) => a.trim())
    .filter((a) => istAdresse(a));

  if (geprueft.length === 0) {
    console.error(
      `[mail] ${variable} enthaelt keine brauchbare Adresse (${JSON.stringify(roh)}). ` +
        `Es gilt die Vorgabe ${vorgabe}.`
    );
    return [vorgabe];
  }
  return geprueft;
}

/** Nur für Anzeige in Diagnose und Log. */
export function kanalName(kanal: MailChannel): string {
  switch (kanal) {
    case 'resend':
      return 'Resend';
    case 'smtp':
      return 'SMTP';
    case 'console':
      return 'Konsole (kein echter Versand)';
    case 'none':
      return 'kein Versandweg konfiguriert';
  }
}
