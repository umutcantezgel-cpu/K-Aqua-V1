import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { MailMessage } from '@/lib/mail/types';

/*
 * Prueft den Versandpfad, ohne je eine Mail zu schicken.
 *
 * `vi.hoisted` ist hier keine Kosmetik: `vi.mock` wird ueber alle Importe
 * gehoben, eine oben deklarierte `const sendMock = vi.fn()` existiert zum
 * Zeitpunkt der Fabrik also noch nicht ("Cannot access before initialization").
 */
const { resendSend, smtpSend } = vi.hoisted(() => ({
  resendSend: vi.fn(),
  smtpSend: vi.fn(),
}));

vi.mock('resend', () => ({
  Resend: class {
    emails = { send: resendSend };
    constructor(public readonly apiKey: string) {}
  },
}));

vi.mock('nodemailer', () => {
  const createTransport = () => ({ sendMail: smtpSend, verify: vi.fn() });
  // Beide Importformen bedienen: send.ts nutzt `(await import(...)).default`.
  return { default: { createTransport }, createTransport };
});

import { sendMail } from '@/lib/mail/send';

const NACHRICHT: MailMessage = {
  to: ['info@k-aqua.de'],
  replyTo: 'kunde@beispiel.de',
  subject: 'Neue Anfrage: Rohrsysteme (home)',
  html: '<p>Inhalt</p>',
};

const PDF_BASE64 = 'JVBERi0xLjQK';

beforeEach(() => {
  vi.clearAllMocks();
  // Die Fehlerpfade protokollieren absichtlich nach stderr. Im Testlauf ist das
  // nur Laerm — die Zusicherungen pruefen den Rueckgabewert, nicht das Log.
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('sendMail über Resend', () => {
  it('setzt Absender, Empfaenger und Antwortadresse', async () => {
    resendSend.mockResolvedValue({ data: { id: 'e_1' }, error: null });

    const r = await sendMail(NACHRICHT, {
      channel: 'resend',
      apiKey: 're_test',
      from: 'K-Aqua <noreply@k-aqua.de>',
    });

    expect(r).toEqual({ ok: true, channel: 'resend', id: 'e_1' });
    expect(smtpSend).not.toHaveBeenCalled();
    expect(resendSend).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'K-Aqua <noreply@k-aqua.de>',
        to: ['info@k-aqua.de'],
        replyTo: 'kunde@beispiel.de',
        subject: 'Neue Anfrage: Rohrsysteme (home)',
      })
    );
  });

  /* Der wichtigste Test dieser Datei.
     Resend schickt die Nachricht als JSON (`JSON.stringify(entity)` in
     resend/dist/index.mjs). Ein Buffer wird dabei zu
     {"type":"Buffer","data":[…]} — je Byte bis zu vier Zeichen. Aus einem
     4-MB-PDF wuerden rund 14 MB Rumpf, und die Anfrage stirbt am
     Groessenlimit. Wer `contentBase64` spaeter zu `Buffer` "vereinfacht",
     faellt hier auf. */
  it('reicht Anhaenge als Base64-String durch — NIE als Buffer', async () => {
    resendSend.mockResolvedValue({ data: { id: 'e_2' }, error: null });

    await sendMail(
      {
        ...NACHRICHT,
        attachments: [
          { filename: 'Lebenslauf.pdf', contentBase64: PDF_BASE64, contentType: 'application/pdf' },
        ],
      },
      { channel: 'resend', apiKey: 're_test', from: 'x@k-aqua.de' }
    );

    const arg = resendSend.mock.calls[0]?.[0];
    const anhang = arg?.attachments?.[0];
    expect(anhang?.content).toBe(PDF_BASE64);
    expect(typeof anhang?.content).toBe('string');
    expect(Buffer.isBuffer(anhang?.content)).toBe(false);
    expect(anhang?.contentType).toBe('application/pdf');
  });

  it('uebersetzt eine Ablehnung in ok:false mit Ursache', async () => {
    resendSend.mockResolvedValue({
      data: null,
      error: { name: 'validation_error', message: 'The k-aqua.de domain is not verified' },
    });

    const r = await sendMail(NACHRICHT, { channel: 'resend', apiKey: 're_x', from: 'x@k-aqua.de' });

    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.reason).toBe('sender');
      expect(r.detail).toContain('DNS');
    }
  });

  it('faengt auch eine geworfene Ausnahme ab', async () => {
    resendSend.mockRejectedValue(new Error('network down'));
    const r = await sendMail(NACHRICHT, { channel: 'resend', apiKey: 're_x', from: 'x@k-aqua.de' });
    expect(r.ok).toBe(false);
  });
});

describe('sendMail über SMTP', () => {
  it('setzt zusaetzlich encoding:"base64"', async () => {
    smtpSend.mockResolvedValue({ messageId: '<1@k-aqua.de>' });

    await sendMail(
      {
        ...NACHRICHT,
        attachments: [
          { filename: 'cv.pdf', contentBase64: PDF_BASE64, contentType: 'application/pdf' },
        ],
      },
      {
        channel: 'smtp',
        host: 'mail.example.com',
        port: 587,
        secure: false,
        user: 'u',
        pass: 'p',
        from: 'x@k-aqua.de',
      }
    );

    const anhang = smtpSend.mock.calls[0]?.[0]?.attachments?.[0];
    // Ohne diese Zeile haengt nodemailer den Base64-Text als Klartext an und
    // der Empfaenger bekommt eine Buchstabensuppe statt eines PDF.
    expect(anhang?.encoding).toBe('base64');
    expect(anhang?.content).toBe(PDF_BASE64);
    expect(resendSend).not.toHaveBeenCalled();
  });

  it('meldet einen Verbindungsfehler als Netzproblem', async () => {
    smtpSend.mockRejectedValue(Object.assign(new Error('connect ECONNREFUSED'), { code: 'ECONNREFUSED' }));
    const r = await sendMail(NACHRICHT, {
      channel: 'smtp', host: 'h', port: 587, secure: false, user: 'u', pass: 'p', from: 'x@k-aqua.de',
    });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toBe('network');
  });
});

describe('sendMail ohne Zugangsdaten', () => {
  /* Der Kern der ganzen Aenderung: Frueher lief hier ein console.log und die
     Funktion gab trotzdem Erfolg zurueck. Auf Vercel ueberlebte die Anfrage
     damit nur im Function-Log, und der Besucher las "Vielen Dank". */
  it('meldet einen FEHLER statt Erfolg, wenn nichts konfiguriert ist', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    const r = await sendMail(NACHRICHT, { channel: 'none' });

    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toBe('not-configured');
    expect(resendSend).not.toHaveBeenCalled();
    expect(smtpSend).not.toHaveBeenCalled();
    log.mockRestore();
  });

  it('meldet im Konsolenweg Erfolg, versendet aber nichts', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const r = await sendMail(NACHRICHT, {
      channel: 'console', from: 'x@k-aqua.de', grund: 'entwicklung',
    });

    expect(r).toEqual({ ok: true, channel: 'console' });
    expect(resendSend).not.toHaveBeenCalled();
    expect(smtpSend).not.toHaveBeenCalled();
    // Der Mock muss deutlich sagen, dass nichts rausging.
    expect(log.mock.calls.flat().join(' ')).toContain('NICHTS versendet');
    log.mockRestore();
  });
});
