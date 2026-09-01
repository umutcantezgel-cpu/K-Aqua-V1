import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

/*
 * Die Bewerbungsroute.
 *
 * Der wichtigste Test hier ist der auf die MIME-Luecke: `File.type` stammt aus
 * dem Browser und ist vom Absender frei waehlbar. Die alte Pruefung lautete
 *
 *     if (cv.type && !ALLOWED_MIME_TYPES.has(cv.type))
 *
 * und uebersprang sich bei leerem Typ selbst. Wer den MIME-Teil seiner Anfrage
 * leer liess, konnte damit eine beliebige Datei an ein Postfach schicken, das
 * Anhaenge von Fremden erwartet und oeffnet.
 */

const { sendMailMock } = vi.hoisted(() => ({ sendMailMock: vi.fn() }));
vi.mock('@/lib/mail/send', () => ({ sendMail: sendMailMock }));

import { POST } from '@/app/api/apply/route';

function anfrage(felder: Record<string, string>, datei?: File): Request {
  const fd = new FormData();
  fd.set('jobId', 'AZUBI-2026');
  fd.set('firstName', 'Erika');
  fd.set('lastName', 'Mustermann');
  fd.set('email', 'erika@beispiel.de');
  for (const [k, v] of Object.entries(felder)) fd.set(k, v);
  if (datei) fd.set('cv', datei);
  return new Request('https://k-aqua.de/api/apply', { method: 'POST', body: fd });
}

/** Erzeugt eine Datei mit frei waehlbarem MIME-Typ — so wie ein Angreifer es kann. */
function datei(name: string, typ: string, groesse = 1024): File {
  return new File([new Uint8Array(groesse)], name, { type: typ });
}

beforeEach(() => {
  vi.clearAllMocks();
  sendMailMock.mockResolvedValue({ ok: true, channel: 'resend', id: 'e_1' });
  vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Pflichtfelder', () => {
  it('lehnt eine Bewerbung ohne Namen ab', async () => {
    const a = await POST(anfrage({ firstName: '' }));
    expect(a.status).toBe(400);
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it('lehnt eine unplausible E-Mail ab', async () => {
    const a = await POST(anfrage({ email: 'keine-mail' }));
    expect(a.status).toBe(400);
  });
});

describe('Anhangspruefung', () => {
  it('nimmt ein PDF an', async () => {
    const a = await POST(anfrage({}, datei('Lebenslauf.pdf', 'application/pdf')));
    expect(a.status).toBe(200);
    const anhang = sendMailMock.mock.calls[0]?.[0]?.attachments?.[0];
    expect(anhang?.filename).toBe('Lebenslauf.pdf');
    expect(anhang?.contentType).toBe('application/pdf');
  });

  /* DIE LUECKE. Leerer `cv.type` sprang frueher ueber die gesamte Pruefung. */
  it('laesst eine ausfuehrbare Datei mit LEEREM MIME-Typ NICHT durch', async () => {
    const a = await POST(anfrage({}, datei('schadsoftware.exe', '')));
    expect(a.status).toBe(400);
    expect(await a.json()).toMatchObject({ error: 'invalid-file-type' });
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it('laesst auch eine .exe mit GELOGENEM PDF-Typ nicht durch', async () => {
    // Der Absender bestimmt den MIME-Typ; wir richten uns nach der Endung und
    // leiten den contentType selbst ab.
    const a = await POST(anfrage({}, datei('schadsoftware.exe', 'application/pdf')));
    expect(a.status).toBe(400);
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it('uebernimmt NIE den vom Absender gemeldeten Typ', async () => {
    await POST(anfrage({}, datei('Lebenslauf.pdf', 'text/html')));
    const anhang = sendMailMock.mock.calls[0]?.[0]?.attachments?.[0];
    // Aus der Endung abgeleitet, nicht aus File.type uebernommen.
    expect(anhang?.contentType).toBe('application/pdf');
  });

  it('haengt den Anhang als Base64 an, nicht als Buffer', async () => {
    await POST(anfrage({}, datei('Lebenslauf.pdf', 'application/pdf')));
    const anhang = sendMailMock.mock.calls[0]?.[0]?.attachments?.[0];
    expect(typeof anhang?.contentBase64).toBe('string');
    expect(Buffer.isBuffer(anhang?.contentBase64)).toBe(false);
  });

  it('weist Dateien ueber 4 MB ab, bevor Vercel bei 4,5 MB abriegelt', async () => {
    const a = await POST(anfrage({}, datei('gross.pdf', 'application/pdf', 4 * 1024 * 1024 + 1)));
    expect(a.status).toBe(400);
    expect(await a.json()).toMatchObject({ error: 'file-too-large' });
  });

  it('bereinigt den Dateinamen, statt ihn HTML-zu-maskieren', async () => {
    await POST(anfrage({}, datei('Lebenslauf & CV.pdf', 'application/pdf')));
    const anhang = sendMailMock.mock.calls[0]?.[0]?.attachments?.[0];
    // Frueher stand hier "Lebenslauf &amp; CV.pdf" im Postfach.
    expect(anhang?.filename).toBe('Lebenslauf & CV.pdf');
  });
});

describe('Zustellung', () => {
  it('setzt eine Antwortadresse, damit man antworten kann', async () => {
    await POST(anfrage({}, datei('cv.pdf', 'application/pdf')));
    // Fehlte bisher vollstaendig.
    expect(sendMailMock.mock.calls[0]?.[0]?.replyTo).toBe('erika@beispiel.de');
  });

  it('geht an die Bewerbungsadresse', async () => {
    await POST(anfrage({}, datei('cv.pdf', 'application/pdf')));
    expect(sendMailMock.mock.calls[0]?.[0]?.to).toEqual(['jobs@k-aqua.de']);
  });

  /* Frueher: 200 mit { success: true }, obwohl nur ein console.log lief. Ein
     Bewerber lud seinen Lebenslauf hoch, las „gesendet", und niemand erfuhr
     davon. */
  it('meldet 502 statt Erfolg, wenn nichts zugestellt werden konnte', async () => {
    sendMailMock.mockResolvedValue({
      ok: false, channel: 'none', reason: 'not-configured', detail: 'nichts konfiguriert',
    });
    const a = await POST(anfrage({}, datei('cv.pdf', 'application/pdf')));
    expect(a.status).toBe(502);
    expect(await a.json()).toMatchObject({ success: false });
  });
});

describe('Lebenslauf-Baukasten', () => {
  it('nimmt Berufserfahrung und Ausbildung ohne Datei an', async () => {
    const a = await POST(
      anfrage({
        experience: JSON.stringify([{ role: 'Monteur', company: 'ACME', from: '2020', to: '2024' }]),
        education: JSON.stringify([{ degree: 'Gesell', school: 'BBS', from: '2017', to: '2020' }]),
        skills: 'PP-R, Schweissen',
      })
    );
    expect(a.status).toBe(200);
    const html = sendMailMock.mock.calls[0]?.[0]?.html ?? '';
    expect(html).toContain('Monteur');
    expect(html).toContain('PP-R, Schweissen');
  });

  it('maskiert HTML aus den Baukasten-Feldern', async () => {
    await POST(
      anfrage({
        experience: JSON.stringify([
          { role: '<script>alert(1)</script>', company: 'A', from: '1', to: '2' },
        ]),
        education: JSON.stringify([{ degree: 'D', school: 'S', from: '1', to: '2' }]),
      })
    );
    const html = sendMailMock.mock.calls[0]?.[0]?.html ?? '';
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('ueberlebt kaputtes JSON, ohne die Bewerbung zu verlieren', async () => {
    const a = await POST(anfrage({ experience: '{kaputt', education: '[]' }));
    expect(a.status).toBe(200);
  });
});
