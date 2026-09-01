import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

/*
 * Durchstich durch die Server Action `submitLead`.
 *
 * Die reinen Bausteine sind in mail-kern.test.ts geprueft; hier geht es um die
 * VERDRAHTUNG — genau das, was bei einem Umbau bricht.
 *
 * `next/headers` muss gemockt werden: `headers()` wirft ausserhalb eines
 * echten Requests. Die `"use server"`-Direktive stoert Vitest nicht, esbuild
 * behandelt sie als gewoehnliches String-Literal.
 */

const { sendMailMock } = vi.hoisted(() => ({ sendMailMock: vi.fn() }));

vi.mock('@/lib/mail/send', () => ({ sendMail: sendMailMock }));

vi.mock('next/headers', () => ({
  headers: async () =>
    new Headers({
      referer: 'https://k-aqua.de/de/kontakt',
      'accept-language': 'de-DE,de;q=0.9',
    }),
}));

import { submitLead } from '@/app/actions/lead';

function formular(werte: Record<string, string> = {}): FormData {
  const fd = new FormData();
  fd.set('phone', '171 1234567');
  fd.set('cc', '+49');
  fd.set('email', 'kunde@beispiel.de');
  fd.set('interest', 'Rohrsysteme');
  fd.set('page', 'kontakt');
  fd.set('elapsed', '9000');
  for (const [k, v] of Object.entries(werte)) fd.set(k, v);
  return fd;
}

beforeEach(() => {
  vi.clearAllMocks();
  sendMailMock.mockResolvedValue({ ok: true, channel: 'resend', id: 'e_1' });
  delete process.env.CRM_WEBHOOK_URL;
  delete process.env.LEAD_NOTFALL_LOG;
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('submitLead — Validierung', () => {
  it('verlangt eine Telefonnummer', async () => {
    expect(await submitLead(formular({ phone: '' }))).toEqual({ ok: false, error: 'phone' });
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it('verlangt eine plausible E-Mail', async () => {
    expect(await submitLead(formular({ email: 'keine-mail' }))).toEqual({ ok: false, error: 'email' });
    expect(sendMailMock).not.toHaveBeenCalled();
  });
});

describe('submitLead — Zustellung', () => {
  it('baut Betreff, Antwortadresse und Empfaenger korrekt', async () => {
    const r = await submitLead(formular());

    expect(r).toEqual({ ok: true });
    const n = sendMailMock.mock.calls[0]?.[0];
    expect(n?.to).toEqual(['info@k-aqua.de']);
    expect(n?.replyTo).toBe('kunde@beispiel.de');
    expect(n?.subject).toBe('Neue Anfrage: Rohrsysteme (kontakt)');
    // Landesvorwahl und Nummer werden zusammengefuehrt.
    expect(n?.html).toContain('+49 171 1234567');
    // Kopfzeilen landen im Rumpf, damit der Vertrieb die Herkunft sieht.
    expect(n?.html).toContain('k-aqua.de/de/kontakt');
    expect(n?.html).toContain('de-DE');
  });

  /* DER KERN DIESER AENDERUNG.
     Frueher gab diese Funktion `{ ok: true }` zurueck, auch wenn nur ein
     console.log gelaufen war. Auf Vercel ueberlebte die Anfrage damit nur im
     Function-Log, waehrend der Besucher „Vielen Dank" las. */
  it('meldet einen FEHLER, wenn der Versand scheitert', async () => {
    sendMailMock.mockResolvedValue({
      ok: false, channel: 'none', reason: 'not-configured', detail: 'Kein Versandweg konfiguriert.',
    });

    expect(await submitLead(formular())).toEqual({ ok: false, error: 'send' });
  });

  it('protokolliert die Lead-Daten NICHT, solange der Schalter aus ist', async () => {
    sendMailMock.mockResolvedValue({
      ok: false, channel: 'none', reason: 'not-configured', detail: 'nichts konfiguriert',
    });
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});

    await submitLead(formular());

    const ausgabe = log.mock.calls.flat().join(' ');
    expect(ausgabe).toContain('LEAD-VERLOREN');
    // Datenschutz: ohne LEAD_NOTFALL_LOG darf keine Adresse ins Log.
    expect(ausgabe).not.toContain('kunde@beispiel.de');
    expect(ausgabe).not.toContain('1234567');
  });

  it('protokolliert die Daten nur mit ausdruecklichem Schalter', async () => {
    process.env.LEAD_NOTFALL_LOG = 'true';
    sendMailMock.mockResolvedValue({
      ok: false, channel: 'none', reason: 'not-configured', detail: 'nichts konfiguriert',
    });
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});

    await submitLead(formular());

    expect(log.mock.calls.flat().join(' ')).toContain('kunde@beispiel.de');
  });
});

describe('submitLead — Spamschutz markiert statt zu verwerfen', () => {
  it('schluckt einen Bot mit ausgefuellter Honigfalle still', async () => {
    expect(await submitLead(formular({ firma2: 'ACME GmbH' }))).toEqual({ ok: true });
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  /* Frueher: `{ ok: true }` ohne Versand — die Anfrage war weg, und niemand
     erfuhr davon. Bei Klappe und Dialog traf das echte Menschen, weil die Uhr
     mit der Einblendanimation lief. */
  it('stellt eine auffaellig schnelle Anfrage ZU und markiert sie', async () => {
    const r = await submitLead(formular({ elapsed: '300' }));

    expect(r).toEqual({ ok: true });
    /* Zwei Mails: die interne an den Vertrieb UND die Eingangsbestaetigung
       an den Kunden. Auch bei Verdacht -- "verdaechtig" heisst ausdruecklich
       zustellen und markieren, und ein faelschlich Verdaechtigter soll seine
       Quittung bekommen. */
    expect(sendMailMock).toHaveBeenCalledTimes(2);
    const n = sendMailMock.mock.calls[0]?.[0];
    expect(n?.subject).toContain('[PRUEFEN]');
    expect(n?.html).toContain('Auffaelligkeit');
    expect(n?.html).toContain('300 ms');
  });

  it('behandelt eine fehlende Zeitmessung als unauffaellig', async () => {
    // Aeltere, im Browser zwischengespeicherte Seiten senden `elapsed` nicht.
    const r = await submitLead(formular({ elapsed: '' }));
    expect(r).toEqual({ ok: true });
    expect(sendMailMock.mock.calls[0]?.[0]?.subject).not.toContain('[PRUEFEN]');
  });
});

describe('submitLead — die Eingangsbestaetigung an den Kunden', () => {
  it('geht an den Kunden, mit der Vertriebsadresse als Antwortadresse', async () => {
    await submitLead(formular());

    const [intern, quittung] = sendMailMock.mock.calls.map((c) => c[0]);
    // Reihenfolge zaehlt: erst der Vertrieb, dann die Quittung.
    expect(intern?.to).toEqual(['info@k-aqua.de']);
    expect(quittung?.to).toEqual(['kunde@beispiel.de']);
    /* Absender ist noreply@ -- ohne diese Antwortadresse liefe die Antwort
       des Kunden ins Leere. */
    expect(quittung?.replyTo).toBe('info@k-aqua.de');
  });

  it('bringt eine Klartextfassung mit', async () => {
    await submitLead(formular());
    const quittung = sendMailMock.mock.calls[1]?.[0];
    expect(typeof quittung?.text).toBe('string');
    expect((quittung?.text ?? '').length).toBeGreaterThan(200);
  });

  it('schreibt sie in der Sprache, in der die Seite gelesen wurde', async () => {
    await submitLead(formular({ locale: 'ar' }));
    const quittung = sendMailMock.mock.calls[1]?.[0];
    expect(quittung?.html).toContain('dir="rtl"');
    expect(quittung?.html).toContain('lang="ar"');
  });

  it('nimmt den referer, wenn das Formular die Sprache nicht mitsendet', async () => {
    // Aeltere, im Browser zwischengespeicherte Seiten kennen das Feld nicht.
    // Der gemockte referer in dieser Datei zeigt auf /de/kontakt.
    await submitLead(formular());
    expect(sendMailMock.mock.calls[1]?.[0]?.html).toContain('lang="de"');
  });

  /* DER WICHTIGSTE FALL.
     Die Anfrage ist wichtiger als die Quittung: Scheitert die Bestaetigung --
     weil die angegebene Adresse gar nicht existiert, weil der Anbieter zickt
     --, darf das die Zustellung an den Vertrieb nicht mitreissen. Der Kunde
     bekaeme sonst eine Fehlermeldung, obwohl seine Anfrage angekommen ist. */
  it('meldet dem Nutzer Erfolg, auch wenn nur die Quittung scheitert', async () => {
    sendMailMock
      .mockResolvedValueOnce({ ok: true, channel: 'resend', id: 'e_intern' })
      .mockResolvedValueOnce({
        ok: false, channel: 'resend', reason: 'recipient', detail: 'Adresse existiert nicht',
      });

    expect(await submitLead(formular())).toEqual({ ok: true });
  });

  it('ueberlebt es, wenn der Bestaetigungsversand wirft', async () => {
    sendMailMock
      .mockResolvedValueOnce({ ok: true, channel: 'resend', id: 'e_intern' })
      .mockRejectedValueOnce(new Error('unerwartet'));

    expect(await submitLead(formular())).toEqual({ ok: true });
  });

  it('schickt einem Bot keine Bestaetigung', async () => {
    await submitLead(formular({ firma2: 'ACME GmbH' }));
    expect(sendMailMock).not.toHaveBeenCalled();
  });
});

describe('submitLead — der CRM-Webhook als zweiter Zustellweg', () => {
  it('rettet die Anfrage, wenn die Mail scheitert, das CRM aber annimmt', async () => {
    process.env.CRM_WEBHOOK_URL = 'https://crm.example/hook';
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal('fetch', fetchMock);
    sendMailMock.mockResolvedValue({
      ok: false, channel: 'resend', reason: 'provider', detail: 'Anbieter streikt',
    });

    // Der Lead ist erfasst — auch ohne Mail. Deshalb sieht der Nutzer Erfolg.
    expect(await submitLead(formular())).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    vi.unstubAllGlobals();
  });

  it('blockiert den Versand nicht, wenn das CRM ausfaellt', async () => {
    process.env.CRM_WEBHOOK_URL = 'https://crm.example/hook';
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('down')));

    expect(await submitLead(formular())).toEqual({ ok: true });
    // Interne Mail plus Eingangsbestaetigung.
    expect(sendMailMock).toHaveBeenCalledTimes(2);
    vi.unstubAllGlobals();
  });
});
