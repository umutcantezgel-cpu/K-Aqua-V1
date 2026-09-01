import { describe, it, expect, vi, afterEach } from 'vitest';
import { resolveMailConfig, resolveEmpfaenger, EMPFAENGER_VORGABE } from '@/lib/mail/config';
import { esc, escMehrzeilig, bereinigeDateiname } from '@/lib/mail/html';
import { bewerteLead, leseDauer, TEMPO_SCHWELLE_MS } from '@/lib/mail/spam';
import { diagnoseMailFehler } from '@/lib/mail/diagnose';

/*
 * Diese Datei prueft den REINEN Teil des Mailversands: Transportwahl,
 * Empfaengeraufloesung, Maskierung, Spam-Urteil und Fehlerdeutung.
 *
 * Kein einziger Mock, keine Umgebungsvariable wird angefasst — weil
 * `resolveMailConfig` und `resolveEmpfaenger` die Umgebung als PARAMETER
 * nehmen. Genau dafuer ist der Parameter da: `vi.stubEnv` wirkt prozessweit
 * und haelt zwischen Testdateien nach.
 */

describe('resolveMailConfig — welcher Versandweg gilt', () => {
  it('meldet "none", wenn in Produktion nichts gesetzt ist', () => {
    expect(resolveMailConfig({ NODE_ENV: 'production' })).toEqual({ channel: 'none' });
  });

  it('mockt in der Entwicklung weiter auf die Konsole', () => {
    const c = resolveMailConfig({ NODE_ENV: 'development' });
    expect(c.channel).toBe('console');
    if (c.channel === 'console') expect(c.grund).toBe('entwicklung');
  });

  it('nimmt Resend vor SMTP', () => {
    const c = resolveMailConfig({
      NODE_ENV: 'production',
      RESEND_API_KEY: 're_test',
      SMTP_HOST: 'h',
      SMTP_USER: 'u',
      SMTP_PASS: 'p',
    });
    expect(c.channel).toBe('resend');
  });

  it('nimmt SMTP nur, wenn Host, Benutzer UND Passwort da sind', () => {
    expect(resolveMailConfig({ NODE_ENV: 'production', SMTP_HOST: 'h', SMTP_USER: 'u' }).channel).toBe('none');
    const c = resolveMailConfig({ NODE_ENV: 'production', SMTP_HOST: 'h', SMTP_USER: 'u', SMTP_PASS: 'p' });
    expect(c.channel).toBe('smtp');
    if (c.channel === 'smtp') {
      expect(c.port).toBe(587);
      expect(c.secure).toBe(false);
    }
  });

  it('liest Port und TLS-Schalter, faellt bei Unsinn auf 587 zurueck', () => {
    const gut = resolveMailConfig({
      NODE_ENV: 'production', SMTP_HOST: 'h', SMTP_USER: 'u', SMTP_PASS: 'p',
      SMTP_PORT: '465', SMTP_SECURE: 'true',
    });
    expect(gut.channel === 'smtp' && gut.port).toBe(465);
    expect(gut.channel === 'smtp' && gut.secure).toBe(true);

    const kaputt = resolveMailConfig({
      NODE_ENV: 'production', SMTP_HOST: 'h', SMTP_USER: 'u', SMTP_PASS: 'p', SMTP_PORT: 'dreiundzwanzig',
    });
    expect(kaputt.channel === 'smtp' && kaputt.port).toBe(587);
  });

  /* Der Schalter, der Vorschau-Bereitstellungen rettet: Auf Vercel ist
     NODE_ENV auch in der Preview "production". Ohne diesen Schalter wuerde
     dort entweder ein Fehler erscheinen oder — schlimmer — jeder Testklick
     eine echte Mail an den Vertrieb schicken. */
  it('erzwingt den Konsolenweg trotz gesetzter Zugangsdaten', () => {
    const c = resolveMailConfig({
      NODE_ENV: 'production',
      RESEND_API_KEY: 're_test',
      MAIL_TRANSPORT: 'console',
    });
    expect(c.channel).toBe('console');
    if (c.channel === 'console') expect(c.grund).toBe('explizit');
  });

  it('behandelt leere Zeichenketten wie fehlende Werte', () => {
    // Vercel liefert eine angelegte, aber leere Variable als "" — nicht als undefined.
    expect(resolveMailConfig({ NODE_ENV: 'production', RESEND_API_KEY: '   ' }).channel).toBe('none');
  });

  it('bevorzugt MAIL_FROM vor den alten transportspezifischen Namen', () => {
    const c = resolveMailConfig({
      NODE_ENV: 'production', RESEND_API_KEY: 're_x',
      MAIL_FROM: 'A <a@k-aqua.de>', RESEND_FROM: 'B <b@k-aqua.de>',
    });
    expect(c.channel === 'resend' && c.from).toBe('A <a@k-aqua.de>');
  });
});

describe('resolveEmpfaenger', () => {
  it('nutzt ohne Variable die bisherigen fest verdrahteten Adressen', () => {
    expect(resolveEmpfaenger('leads', {})).toEqual([EMPFAENGER_VORGABE.leads]);
    expect(resolveEmpfaenger('jobs', {})).toEqual([EMPFAENGER_VORGABE.jobs]);
  });

  it('nimmt mehrere Adressen kommagetrennt', () => {
    expect(resolveEmpfaenger('leads', { MAIL_TO_LEADS: 'a@k-aqua.de, b@k-aqua.de' })).toEqual([
      'a@k-aqua.de',
      'b@k-aqua.de',
    ]);
  });

  /* Der eigentliche Zweck der Pruefung: Ein Tippfehler darf keinen NEUEN
     stillen Ausfall erzeugen, waehrend wir gerade den alten beseitigen. */
  it('faellt bei unbrauchbarem Wert laut auf die Vorgabe zurueck', () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(resolveEmpfaenger('leads', { MAIL_TO_LEADS: 'kein-komma-getrenntes-nichts' })).toEqual([
      EMPFAENGER_VORGABE.leads,
    ]);
    expect(log).toHaveBeenCalled();
    log.mockRestore();
  });

  it('wirft einzelne unbrauchbare Adressen raus, behaelt die guten', () => {
    expect(resolveEmpfaenger('jobs', { MAIL_TO_JOBS: 'gut@k-aqua.de, kaputt, auch@k-aqua.de' })).toEqual([
      'gut@k-aqua.de',
      'auch@k-aqua.de',
    ]);
  });
});

describe('esc und Dateinamen', () => {
  it('maskiert alle fuenf HTML-Sonderzeichen', () => {
    expect(esc(`<a href="x">&'`)).toBe('&lt;a href=&quot;x&quot;&gt;&amp;&#39;');
  });

  it('macht aus Nicht-Strings eine leere Zeichenkette', () => {
    expect(esc(null)).toBe('');
    expect(esc(undefined)).toBe('');
    expect(esc(42)).toBe('');
  });

  it('wandelt Zeilenumbrueche nur in der mehrzeiligen Fassung', () => {
    expect(escMehrzeilig('a\nb')).toBe('a<br />b');
    expect(esc('a\nb')).toBe('a\nb');
  });

  /* Der Fehler, den `esc(cv.name)` in apply/route.ts:57 erzeugt hat: Aus
     "Lebenslauf & CV.pdf" wurde "Lebenslauf &amp; CV.pdf" im Postfach. */
  it('laesst kaufmaennisches Und im Dateinamen unangetastet', () => {
    expect(bereinigeDateiname('Lebenslauf & CV.pdf')).toBe('Lebenslauf & CV.pdf');
  });

  it('behaelt Leerzeichen und Bindestriche', () => {
    expect(bereinigeDateiname('Bewerbung Mueller-Schmidt 2026.pdf')).toBe(
      'Bewerbung Mueller-Schmidt 2026.pdf'
    );
  });

  /* Wogegen die Maskierung an dieser Stelle vermutlich schuetzen sollte —
     was sie aber nicht tat, weil esc() kein CR/LF entfernt. */
  it('entfernt Zeilenumbrueche, damit kein Mail-Header eingeschleust wird', () => {
    const boese = 'cv.pdf' + String.fromCharCode(13) + String.fromCharCode(10) + 'Bcc: fremd@example.com';
    const sauber = bereinigeDateiname(boese);
    expect(sauber).not.toContain(String.fromCharCode(13));
    expect(sauber).not.toContain(String.fromCharCode(10));
  });

  it('entfernt Pfadtrenner und Anfuehrungszeichen', () => {
    expect(bereinigeDateiname('../../etc/passwd')).toBe('.._.._etc_passwd');
    expect(bereinigeDateiname('a"b\'c.pdf')).toBe('abc.pdf');
  });

  it('faellt auf den Vorgabenamen zurueck, wenn nichts uebrig bleibt', () => {
    expect(bereinigeDateiname('"""')).toBe('Lebenslauf.pdf');
    expect(bereinigeDateiname(null)).toBe('Lebenslauf.pdf');
  });

  it('kappt sehr lange Namen', () => {
    expect(bereinigeDateiname('x'.repeat(500)).length).toBe(120);
  });
});

describe('bewerteLead — Spam wird markiert, nicht verschluckt', () => {
  it('verwirft eine ausgefuellte Honigfalle', () => {
    expect(bewerteLead({ honeypot: 'ACME GmbH', elapsedMs: 9000 }).art).toBe('bot');
  });

  /* Das Herzstueck dieser Aenderung: Bisher gab eine schnelle Eingabe
     `{ ok: true }` zurueck und die Anfrage war weg. Jetzt geht sie raus. */
  it('stellt eine auffaellig schnelle Eingabe ZU und markiert sie nur', () => {
    const u = bewerteLead({ honeypot: '', elapsedMs: 340 });
    expect(u.art).toBe('verdaechtig');
    if (u.art === 'verdaechtig') expect(u.hinweis).toContain('340');
  });

  it('urteilt bei fehlender Zeitmessung nie gegen den Nutzer', () => {
    expect(bewerteLead({ honeypot: '', elapsedMs: null }).art).toBe('ok');
    expect(bewerteLead({ honeypot: '', elapsedMs: Number.NaN }).art).toBe('ok');
    expect(bewerteLead({ honeypot: '', elapsedMs: -5 }).art).toBe('ok');
  });

  it('laesst normale Eingaben durch', () => {
    expect(bewerteLead({ honeypot: '', elapsedMs: TEMPO_SCHWELLE_MS + 1 }).art).toBe('ok');
  });

  it('leseDauer macht aus allem Unbrauchbaren null', () => {
    expect(leseDauer('1200')).toBe(1200);
    expect(leseDauer('')).toBeNull();
    expect(leseDauer(null)).toBeNull();
    expect(leseDauer('viel')).toBeNull();
  });
});

describe('diagnoseMailFehler — Klartext ohne echten Schluessel', () => {
  it('erkennt eine nicht verifizierte Absenderdomain', () => {
    const d = diagnoseMailFehler(
      { name: 'validation_error', message: 'The k-aqua.de domain is not verified' },
      'resend'
    );
    expect(d.reason).toBe('sender');
    expect(d.detail).toContain('DNS');
  });

  it('erkennt einen abgelehnten Schluessel', () => {
    expect(diagnoseMailFehler({ message: 'API key is invalid' }, 'resend').reason).toBe('auth');
    expect(diagnoseMailFehler({ code: 'EAUTH' }, 'smtp').reason).toBe('auth');
  });

  it('erkennt einen unerreichbaren Mailserver und nennt die Portfalle', () => {
    const d = diagnoseMailFehler({ code: 'ECONNREFUSED' }, 'smtp');
    expect(d.reason).toBe('network');
    expect(d.detail).toContain('587');
  });

  it('erkennt den TLS-Schalter-Fehler', () => {
    expect(diagnoseMailFehler({ code: 'ESOCKET', message: 'wrong version number' }, 'smtp').reason).toBe(
      'network'
    );
  });

  it('nennt bei fehlender Konfiguration beide Wege', () => {
    const d = diagnoseMailFehler(null, 'none');
    expect(d.reason).toBe('not-configured');
    expect(d.detail).toContain('RESEND_API_KEY');
    expect(d.detail).toContain('SMTP_HOST');
  });

  it('reicht Unbekanntes als Anbietermeldung durch, ohne zu raten', () => {
    const d = diagnoseMailFehler({ message: 'irgendwas ganz anderes' }, 'resend');
    expect(d.reason).toBe('provider');
    expect(d.detail).toContain('irgendwas ganz anderes');
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});
