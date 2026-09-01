import { NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { resolveMailConfig, resolveEmpfaenger, kanalName } from '@/lib/mail/config';
import { sendMail } from '@/lib/mail/send';

/**
 * Selbsttest fuer den Mailversand — gegen die ECHTE Umgebung.
 *
 * `npm run mail:selftest` liest `.env.local` auf dem Rechner des Entwicklers.
 * Die Schluessel der Live-Seite liegen aber in der Vercel-Umgebung, wo dieser
 * Befehl nicht hinsieht. Ein Selbsttest, der lokal gruen meldet, waehrend die
 * Produktion stumm bleibt, waere schlimmer als keiner. Deshalb gibt es diesen
 * Endpunkt.
 *
 *   curl -H "x-mail-selftest-token: <TOKEN>" https://k-aqua.de/api/mail/selftest
 *   curl -H "x-mail-selftest-token: <TOKEN>" "https://k-aqua.de/api/mail/selftest?senden=1"
 *
 * SICHERHEIT, in dieser Reihenfolge:
 *
 *  - **Es gibt ihn nur, wenn MAIL_SELFTEST_TOKEN gesetzt ist.** Ohne die
 *    Variable antwortet die Route mit 404, als gaebe es sie nicht. Wer den
 *    Selbsttest nicht braucht, hat ihn auch nicht.
 *  - **Das Merkmal kommt als Kopfzeile, nicht als Abfrageparameter.** Ein
 *    Geheimnis in der URL landet in Zugriffsprotokollen, im Browserverlauf und
 *    im Referrer.
 *  - **Der Empfaenger kommt ausschliesslich aus der Umgebung.** Waere er ein
 *    Parameter, waere das ein offenes Mailrelais mit gueltiger Signatur auf
 *    k-aqua.de.
 *  - **Ohne `senden=1` wird nichts verschickt.** Der Bericht allein ist
 *    beliebig oft abrufbar und die eigentliche Deploy-Kontrolle.
 *  - **Eine Sendung je 60 Sekunden.**
 *  - **Kein Schluessel steht je in der Antwort**, auch nicht gekuerzt.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/* Modulweite Sperre. Bewusst NICHT verteilt: Auf Vercel zaehlt jede Instanz
   fuer sich. Als Bremse gegen versehentliche Mehrfachaufrufe reicht das; als
   Schutz gegen Absicht taugt es nicht — dafuer ist das Merkmal da. */
let letzterVersand = 0;
const SPERRE_MS = 60_000;

function merkmalStimmt(gesendet: string | null, erwartet: string): boolean {
  if (!gesendet) return false;
  const a = Buffer.from(gesendet);
  const b = Buffer.from(erwartet);
  // timingSafeEqual verlangt gleiche Laenge; die Laenge selbst ist kein Geheimnis.
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function GET(req: Request) {
  const erwartet = process.env.MAIL_SELFTEST_TOKEN;
  if (!erwartet || erwartet.trim().length === 0) {
    return new NextResponse(null, { status: 404 });
  }

  if (!merkmalStimmt(req.headers.get('x-mail-selftest-token'), erwartet)) {
    return new NextResponse(null, { status: 404 });
  }

  const config = resolveMailConfig();
  const bericht = {
    kanal: config.channel,
    kanalKlartext: kanalName(config.channel),
    absender: config.channel === 'none' ? null : config.from,
    empfaengerAnfragen: resolveEmpfaenger('leads'),
    empfaengerBewerbungen: resolveEmpfaenger('jobs'),
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? null,
    crmWebhook: Boolean(process.env.CRM_WEBHOOK_URL),
  };

  if (config.channel === 'none') {
    return NextResponse.json(
      {
        ...bericht,
        ok: false,
        hinweis:
          'Kein Versandweg konfiguriert. Setze RESEND_API_KEY (empfohlen) oder ' +
          'SMTP_HOST + SMTP_USER + SMTP_PASS in der Vercel-Umgebung, fuer Production UND Preview, ' +
          'und stosse danach einen Redeploy an.',
      },
      { status: 503 }
    );
  }

  const url = new URL(req.url);
  if (url.searchParams.get('senden') !== '1') {
    return NextResponse.json({
      ...bericht,
      ok: true,
      versendet: false,
      hinweis:
        'Bereit. Fuer eine echte Testmail dieselbe Adresse mit ?senden=1 aufrufen. ' +
        'Ohne diesen Parameter wird nichts verschickt.',
    });
  }

  const jetzt = Date.now();
  if (jetzt - letzterVersand < SPERRE_MS) {
    const rest = Math.ceil((SPERRE_MS - (jetzt - letzterVersand)) / 1000);
    return NextResponse.json(
      { ...bericht, ok: false, versendet: false, hinweis: `Bitte ${rest} s warten.` },
      { status: 429 }
    );
  }
  letzterVersand = jetzt;

  const ergebnis = await sendMail({
    to: bericht.empfaengerAnfragen,
    subject: 'K-Aqua Selbsttest — bitte ignorieren',
    html:
      '<h2>Selbsttest</h2><p>Diese Nachricht stammt aus <code>/api/mail/selftest</code>. ' +
      'Wenn du sie liest, funktioniert der Mailversand der Live-Seite.</p>',
  });

  if (ergebnis.ok) {
    return NextResponse.json({
      ...bericht,
      ok: true,
      versendet: true,
      id: ergebnis.id ?? null,
      hinweis: 'Zugestellt. Im Posteingang nachsehen, auch im Spam-Ordner.',
    });
  }

  return NextResponse.json(
    { ...bericht, ok: false, versendet: false, grund: ergebnis.reason, hinweis: ergebnis.detail },
    { status: 502 }
  );
}
