/**
 * Selbsttest fuer den Mailversand.
 *
 *   npm run mail:selftest            — meldet nur, welcher Weg griffe
 *   npm run mail:selftest -- --senden — schickt EINE echte Testmail
 *
 * Das ist ein DIAGNOSEWERKZEUG, kein Aenderungsskript: Es liest die Umgebung,
 * ruft dasselbe `lib/mail/send.ts` auf wie die Website und schreibt einen
 * Bericht ins Terminal. Es fasst keine Projektdatei an.
 *
 * WICHTIG ZU WISSEN: Dieser Befehl liest `.env.local` auf DIESEM Rechner. Die
 * Schluessel fuer die Live-Seite liegen dagegen in der Vercel-Umgebung, wo
 * dieser Befehl nicht hinsieht. Ein gruener Lauf hier beweist also, dass der
 * Schluessel funktioniert — nicht, dass er in Vercel eingetragen ist. Fuer die
 * Live-Umgebung gibt es `GET /api/mail/selftest` (siehe docs/UEBERGABE.md).
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolveMailConfig, resolveEmpfaenger, kanalName } from '../lib/mail/config';
import { sendMail } from '../lib/mail/send';

/**
 * Minimaler .env-Leser.
 *
 * Bewusst ohne Zusatzpaket: Wir brauchen `KEY=WERT`, Kommentare und
 * Anfuehrungszeichen — mehr nicht. `@next/env` waere der naheliegende Weg,
 * ist in diesem Projekt aber nicht als eigene Abhaengigkeit erreichbar.
 */
function ladeEnvDatei(pfad: string): void {
  if (!existsSync(pfad)) return;
  for (const zeile of readFileSync(pfad, 'utf8').split('\n')) {
    const t = zeile.trim();
    if (!t || t.startsWith('#')) continue;
    const gleich = t.indexOf('=');
    if (gleich === -1) continue;
    const schluessel = t.slice(0, gleich).trim();
    let wert = t.slice(gleich + 1).trim();
    if (
      (wert.startsWith('"') && wert.endsWith('"')) ||
      (wert.startsWith("'") && wert.endsWith("'"))
    ) {
      wert = wert.slice(1, -1);
    }
    // Bereits gesetzte Variablen der Sitzung haben Vorrang.
    if (process.env[schluessel] === undefined) process.env[schluessel] = wert;
  }
}

/** Zeigt, DASS ein Wert da ist, ohne ihn preiszugeben. */
function verdeckt(wert: string | undefined): string {
  if (!wert) return 'nicht gesetzt';
  if (wert.length <= 8) return `gesetzt (${wert.length} Zeichen)`;
  return `gesetzt (${wert.length} Zeichen, beginnt mit ${wert.slice(0, 3)}…)`;
}

const AUS = {
  titel: (s: string) => console.log(`\n\x1b[1m${s}\x1b[0m`),
  gut: (s: string) => console.log(`  \x1b[32m✓\x1b[0m ${s}`),
  schlecht: (s: string) => console.log(`  \x1b[31m✗\x1b[0m ${s}`),
  info: (s: string) => console.log(`    ${s}`),
};

async function main(): Promise<number> {
  ladeEnvDatei('.env.local');
  const senden = process.argv.includes('--senden');

  AUS.titel('K-Aqua — Selbsttest Mailversand');

  AUS.titel('1. Umgebung');
  for (const k of [
    'RESEND_API_KEY',
    'RESEND_FROM',
    'MAIL_FROM',
    'SMTP_HOST',
    'SMTP_USER',
    'SMTP_PASS',
    'MAIL_TO_LEADS',
    'MAIL_TO_JOBS',
    'MAIL_TRANSPORT',
  ]) {
    // Adressen und Hostnamen sind keine Geheimnisse und helfen beim Suchen.
    const zeigen = ['RESEND_FROM', 'MAIL_FROM', 'SMTP_HOST', 'MAIL_TO_LEADS', 'MAIL_TO_JOBS', 'MAIL_TRANSPORT'];
    const w = process.env[k];
    AUS.info(`${k.padEnd(16)} ${zeigen.includes(k) ? (w ?? 'nicht gesetzt') : verdeckt(w)}`);
  }

  AUS.titel('2. Gewaehlter Versandweg');
  const config = resolveMailConfig();
  AUS.info(`Kanal:     ${kanalName(config.channel)}`);
  if (config.channel !== 'none') AUS.info(`Absender:  ${config.from}`);
  if (config.channel === 'smtp') {
    AUS.info(`Server:    ${config.host}:${config.port} (secure=${config.secure})`);
  }
  AUS.info(`Anfragen:  ${resolveEmpfaenger('leads').join(', ')}`);
  AUS.info(`Bewerbung: ${resolveEmpfaenger('jobs').join(', ')}`);

  if (config.channel === 'none') {
    AUS.schlecht('Es ist KEIN Versandweg konfiguriert.');
    AUS.info('Setze RESEND_API_KEY (empfohlen) oder SMTP_HOST + SMTP_USER + SMTP_PASS.');
    AUS.info('In Produktion meldet jedes Formular damit einen Fehler — absichtlich:');
    AUS.info('ein sichtbarer Fehler ist besser als eine still verlorene Anfrage.');
    return 1;
  }

  if (config.channel === 'console') {
    AUS.gut('Konsolenweg aktiv — es wird absichtlich nichts versendet.');
    AUS.info('So verhaelt sich die Entwicklungsumgebung. Fuer einen echten Versand');
    AUS.info('muss RESEND_API_KEY gesetzt und MAIL_TRANSPORT NICHT auf "console" stehen.');
    return 0;
  }

  if (!senden) {
    AUS.gut(`Bereit. Es wuerde ueber ${kanalName(config.channel)} versendet.`);
    AUS.info('Fuer eine echte Testmail:  npm run mail:selftest -- --senden');
    return 0;
  }

  AUS.titel('3. Echter Versand');
  const empfaenger = resolveEmpfaenger('leads');
  AUS.info(`Sende eine Testmail an ${empfaenger.join(', ')} …`);

  const ergebnis = await sendMail({
    to: empfaenger,
    subject: 'K-Aqua Selbsttest — bitte ignorieren',
    html:
      '<h2>Selbsttest</h2>' +
      '<p>Diese Nachricht stammt aus <code>npm run mail:selftest</code>. ' +
      'Wenn du sie liest, funktioniert der Mailversand der Website.</p>',
  });

  if (ergebnis.ok) {
    AUS.gut(`Zugestellt ueber ${kanalName(ergebnis.channel)}${ergebnis.id ? ` (ID ${ergebnis.id})` : ''}.`);
    AUS.info('Sieh im Posteingang nach — auch im Spam-Ordner.');
    return 0;
  }

  AUS.schlecht(`Versand fehlgeschlagen (${ergebnis.reason}).`);
  AUS.info(ergebnis.detail);
  return 1;
}

main()
  .then((code) => process.exit(code))
  .catch((fehler) => {
    console.error('\nSelbsttest abgebrochen:', fehler);
    process.exit(1);
  });
