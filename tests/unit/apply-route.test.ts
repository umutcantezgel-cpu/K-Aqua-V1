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

describe('Eingangsbestaetigung an den Bewerber', () => {
  it('geht an den Bewerber, mit der Personaladresse als Antwortadresse', async () => {
    await POST(anfrage({}, datei('cv.pdf', 'application/pdf')));

    const [intern, quittung] = sendMailMock.mock.calls.map((c) => c[0]);
    expect(intern?.to).toEqual(['jobs@k-aqua.de']);
    expect(quittung?.to).toEqual(['erika@beispiel.de']);
    expect(quittung?.replyTo).toBe('jobs@k-aqua.de');
  });

  /* Der Lebenslauf geht an die Personalabteilung, nicht zurueck an den
     Absender -- der hat ihn ja. */
  it('haengt der Bestaetigung den Lebenslauf NICHT wieder an', async () => {
    await POST(anfrage({}, datei('cv.pdf', 'application/pdf')));
    const quittung = sendMailMock.mock.calls[1]?.[0];
    expect(quittung?.attachments).toBeUndefined();
  });

  /* Wer eine Bewerbung abschickt, hat genau eine Sorge: ob die Datei
     wirklich angekommen ist. "Unterlagen erhalten" beantwortet das nicht. */
  it('nennt Dateiname und Groesse des hochgeladenen Lebenslaufs', async () => {
    await POST(anfrage({}, datei('Lebenslauf_Mustermann.pdf', 'application/pdf', 348_000)));
    const html = sendMailMock.mock.calls[1]?.[0]?.html ?? '';
    expect(html).toContain('Lebenslauf_Mustermann.pdf');
    expect(html).toContain('340 kB');
  });

  it('nennt den Baukasten, wenn keine Datei kam', async () => {
    await POST(
      anfrage({
        experience: JSON.stringify([{ role: 'Monteur', company: 'A', from: '1', to: '2' }]),
        education: JSON.stringify([{ degree: 'D', school: 'S', from: '1', to: '2' }]),
      })
    );
    expect(sendMailMock.mock.calls[1]?.[0]?.html).toContain('Baukasten');
  });

  /* Das Bewerberportal duzt durchgaengig, und diese Mail kommt Sekunden nach
     dem Klick auf "Absenden". Ein Wechsel ins Sie wuerde befremden. */
  it('duzt den Bewerber', async () => {
    await POST(anfrage({}, datei('cv.pdf', 'application/pdf')));
    const html = sendMailMock.mock.calls[1]?.[0]?.html ?? '';
    expect(html).toContain('Hallo Erika');
    expect(html).toContain('deine Bewerbung');
  });

  /* Fuer Bewerbungen macht die Website nirgends eine Zusage zur Antwortzeit.
     Eine hier erfundene Frist waere nicht abgestimmt. */
  it('nennt keine erfundene Antwortfrist', async () => {
    await POST(anfrage({}, datei('cv.pdf', 'application/pdf')));
    const html = sendMailMock.mock.calls[1]?.[0]?.html ?? '';
    expect(html).not.toContain('24 Stunden');
    expect(html).not.toContain('Arbeitstag');
  });

  it('schreibt in der Sprache, in der das Portal gelesen wurde', async () => {
    await POST(anfrage({ locale: 'en' }, datei('cv.pdf', 'application/pdf')));
    expect(sendMailMock.mock.calls[1]?.[0]?.html).toContain('lang="en"');
  });

  it('traegt die Pflichtangaben nach § 35a GmbHG', async () => {
    await POST(anfrage({}, datei('cv.pdf', 'application/pdf')));
    const html = sendMailMock.mock.calls[1]?.[0]?.html ?? '';
    for (const p of ['KWT GmbH', 'HRB 6732', 'Philipp Nickel', 'Marcello Gallio']) {
      expect(html, p).toContain(p);
    }
  });

  /* Die Bewerbung ist wichtiger als die Quittung. */
  it('meldet Erfolg, auch wenn nur die Bestaetigung scheitert', async () => {
    sendMailMock
      .mockResolvedValueOnce({ ok: true, channel: 'resend', id: 'e_intern' })
      .mockResolvedValueOnce({
        ok: false, channel: 'resend', reason: 'recipient', detail: 'Adresse existiert nicht',
      });

    const a = await POST(anfrage({}, datei('cv.pdf', 'application/pdf')));
    expect(a.status).toBe(200);
  });

  it('ueberlebt es, wenn der Bestaetigungsversand wirft', async () => {
    sendMailMock
      .mockResolvedValueOnce({ ok: true, channel: 'resend', id: 'e_intern' })
      .mockRejectedValueOnce(new Error('unerwartet'));

    const a = await POST(anfrage({}, datei('cv.pdf', 'application/pdf')));
    expect(a.status).toBe(200);
  });

  it('schickt keine Bestaetigung, wenn schon die Bewerbung nicht ankam', async () => {
    sendMailMock.mockResolvedValue({
      ok: false, channel: 'none', reason: 'not-configured', detail: 'nichts konfiguriert',
    });
    await POST(anfrage({}, datei('cv.pdf', 'application/pdf')));
    // Nur der eine gescheiterte Versuch — keine Quittung fuer etwas, das
    // nicht angekommen ist.
    expect(sendMailMock).toHaveBeenCalledTimes(1);
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
