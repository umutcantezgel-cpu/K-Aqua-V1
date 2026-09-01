import { describe, it, expect } from 'vitest';
import { baueKundenbestaetigung, type KundenLead } from '@/lib/mail/vorlage/kunde';
import { MAILSPRACHEN, aufMailsprache, spracheDerAnfrage, richtung } from '@/lib/mail/sprache';
import { texte, fuelle } from '@/lib/mail/texte';

/*
 * Waechter fuer die gestalteten Mails.
 *
 * Der wichtigste Test hier ist der auf Maskierung: In eine Eingangsbestaetigung
 * fliessen ausschliesslich Daten, die ein Fremder ueber ein oeffentliches
 * Formular eingegeben hat. Rutscht dort etwas ungefiltert durch, steht es im
 * Postfach des Kunden — und in dem des Vertriebs gleich mit.
 */

const BASIS = 'https://k-aqua.de';

const LEAD: KundenLead = {
  phone: '+49 171 1234567',
  email: 'einkauf@musterbau.de',
  interest: 'Rohrsysteme',
  page: 'produkte_rohre',
  name: 'Andrea Kowalski',
  company: 'Musterbau Haustechnik GmbH',
  message: 'Wir planen ein Wohnquartier.\nBenoetigt werden d32 bis d110.',
};

describe('Kundenbestaetigung — Grundgeruest', () => {
  for (const sprache of MAILSPRACHEN) {
    it(`${sprache}: erzeugt ein vollstaendiges Dokument`, () => {
      const m = baueKundenbestaetigung(LEAD, sprache, BASIS);
      expect(m.html.startsWith('<!DOCTYPE')).toBe(true);
      expect(m.html).toContain('</html>');
      expect(m.subject.length).toBeGreaterThan(5);
      expect(m.text.length).toBeGreaterThan(200);
    });

    it(`${sprache}: setzt lang und dir passend`, () => {
      const m = baueKundenbestaetigung(LEAD, sprache, BASIS);
      expect(m.html).toContain(`lang="${sprache}"`);
      expect(m.html).toContain(`dir="${richtung(sprache)}"`);
    });

    /* Outlook Desktop rendert mit der Word-Engine. Diese drei Eigenschaften
       tun dort nichts — wer sie benutzt, baut ein Layout, das bei einem
       grossen Teil der B2B-Empfaenger auseinanderfaellt. */
    it(`${sprache}: benutzt keine Layouttechnik, die Outlook nicht kann`, () => {
      const m = baueKundenbestaetigung(LEAD, sprache, BASIS);
      expect(m.html).not.toMatch(/display:\s*flex/);
      expect(m.html).not.toMatch(/display:\s*grid/);
      expect(m.html).not.toMatch(/position:\s*(absolute|fixed)/);
    });

    it(`${sprache}: zeichnet jede Layouttabelle als presentation aus`, () => {
      const m = baueKundenbestaetigung(LEAD, sprache, BASIS);
      const tabellen = m.html.match(/<table/g)?.length ?? 0;
      const ausgezeichnet = m.html.match(/role="presentation"/g)?.length ?? 0;
      expect(tabellen).toBeGreaterThan(0);
      // Sonst sagt ein Vorlesegeraet "Tabelle mit 3 Zeilen" an, bevor der Text kommt.
      expect(ausgezeichnet).toBe(tabellen);
    });

    it(`${sprache}: gibt jedem Bild einen alt-Text`, () => {
      const m = baueKundenbestaetigung(LEAD, sprache, BASIS);
      const bilder = m.html.match(/<img[^>]*>/g) ?? [];
      for (const b of bilder) expect(b, b).toMatch(/alt="/);
    });

    it(`${sprache}: bleibt deutlich unter Gmails Kappungsgrenze`, () => {
      const m = baueKundenbestaetigung(LEAD, sprache, BASIS);
      // Gmail kappt bei 102 400 Byte KODIERT; Quoted-Printable blaeht
      // deutschen UTF-8-Text um 20-40 % auf. 60 KB Quelltext sind die Grenze,
      // ab der es eng wird.
      expect(Buffer.byteLength(m.html, 'utf8')).toBeLessThan(60_000);
    });
  }
});

describe('Kundenbestaetigung — Maskierung', () => {
  const BOESE = '<script>alert(1)</script>';

  const felder: ReadonlyArray<keyof KundenLead> = [
    'name',
    'company',
    'message',
    'interest',
    'email',
    'phone',
  ];

  for (const feld of felder) {
    it(`maskiert ${feld}`, () => {
      const m = baueKundenbestaetigung({ ...LEAD, [feld]: BOESE }, 'de', BASIS);
      expect(m.html).not.toContain('<script>');
      expect(m.html).toContain('&lt;script&gt;');
    });
  }

  it('maskiert auch in der arabischen Fassung', () => {
    const m = baueKundenbestaetigung({ ...LEAD, name: BOESE }, 'ar', BASIS);
    expect(m.html).not.toContain('<script>');
  });

  it('laesst Zeilenumbrueche in der Nachricht als <br /> durch, nicht als Rohtext', () => {
    const m = baueKundenbestaetigung(LEAD, 'de', BASIS);
    expect(m.html).toContain('<br />');
  });
});

describe('Kundenbestaetigung — Pflichtangaben nach § 35a GmbHG', () => {
  /* Rechtsform und Sitz, Registergericht und -nummer sowie ALLE
     Geschaeftsfuehrer gehoeren auf jeden Geschaeftsbrief, und dazu zaehlt jede
     geschaeftliche E-Mail. Fehlt eine Angabe, ist die Mail formell
     fehlerhaft. */
  const pflicht = [
    'KWT GmbH',
    'Auweg 3',
    '35647',
    'Amtsgericht Wetzlar',
    'HRB 6732',
    'Philipp Nickel',
    'Marcello Gallio',
    'DE 296238486',
  ];

  for (const sprache of MAILSPRACHEN) {
    it(`${sprache}: HTML enthaelt alle Pflichtangaben`, () => {
      const m = baueKundenbestaetigung(LEAD, sprache, BASIS);
      for (const p of pflicht) expect(m.html, `${sprache}: ${p}`).toContain(p);
    });

    it(`${sprache}: Klartextfassung enthaelt sie ebenfalls`, () => {
      const m = baueKundenbestaetigung(LEAD, sprache, BASIS);
      for (const p of pflicht) expect(m.text, `${sprache}: ${p}`).toContain(p);
    });
  }

  it('nennt NICHT die frueher im Code stehende falsche Registernummer', () => {
    const m = baueKundenbestaetigung(LEAD, 'de', BASIS);
    expect(m.html).not.toContain('HRB 5421');
  });

  it('enthaelt keinen Abmeldelink', () => {
    /* Eine Eingangsbestaetigung ist die transaktionale Antwort auf eine
       Anfrage (Art. 6 Abs. 1 lit. b DSGVO), kein Werbe-Mailing. Ein
       Abmeldelink wuerde sie faelschlich als solches kennzeichnen. */
    const m = baueKundenbestaetigung(LEAD, 'de', BASIS);
    expect(m.html.toLowerCase()).not.toContain('abmelden');
    expect(m.html.toLowerCase()).not.toContain('unsubscribe');
  });

  it('verlinkt die Datenschutzerklaerung in der eigenen Sprache', () => {
    for (const sprache of MAILSPRACHEN) {
      const m = baueKundenbestaetigung(LEAD, sprache, BASIS);
      expect(m.html).toContain(`${BASIS}/${sprache}/datenschutz`);
    }
  });
});

describe('Kundenbestaetigung — Inhalt', () => {
  it('spricht den Kunden mit Namen an, wenn er ihn genannt hat', () => {
    const m = baueKundenbestaetigung(LEAD, 'de', BASIS);
    expect(m.html).toContain('Andrea Kowalski');
    expect(m.text).toContain('Guten Tag Andrea Kowalski');
  });

  it('kommt ohne Namen aus, ohne eine Luecke zu zeigen', () => {
    const ohne: KundenLead = { ...LEAD, name: undefined, company: undefined, message: undefined };
    const m = baueKundenbestaetigung(ohne, 'de', BASIS);
    expect(m.html).toContain('Guten Tag,');
    expect(m.html).not.toContain('{name}');
    expect(m.html).not.toContain('undefined');
  });

  it('gibt die Angaben des Kunden zum Nachlesen zurueck', () => {
    const m = baueKundenbestaetigung(LEAD, 'de', BASIS);
    expect(m.html).toContain('einkauf@musterbau.de');
    expect(m.html).toContain('Musterbau Haustechnik GmbH');
    expect(m.html).toContain('Rohrsysteme');
  });

  /* Die Website nennt zwei verschiedene Fristen: "innerhalb eines
     Arbeitstages" an den meisten Stellen, "< 24 Stunden" auf
     /projektanfrage. Wer von dort kommt, hat die STRENGERE gelesen -- dann
     muss die Bestaetigung sie auch nennen, nicht die bequemere. */
  it('nennt die strengere Zusage, wenn die Anfrage von /projektanfrage kam', () => {
    const m = baueKundenbestaetigung({ ...LEAD, page: 'projektanfrage' }, 'de', BASIS);
    expect(m.html).toContain('24 Stunden');
  });

  it('nennt sonst die uebliche Zusage', () => {
    const m = baueKundenbestaetigung({ ...LEAD, page: 'home' }, 'de', BASIS);
    expect(m.html).toContain('eines Arbeitstages');
    expect(m.html).not.toContain('24 Stunden');
  });

  it('verweist auf die deutschen Zertifikate nur in der deutschen Fassung', () => {
    expect(baueKundenbestaetigung(LEAD, 'de', BASIS).html).toContain('kwt-iso-zertifikat-de.pdf');
    expect(baueKundenbestaetigung(LEAD, 'en', BASIS).html).toContain('kwt-iso-certificates-en.pdf');
  });

  it('enthaelt keine Produktwerbung', () => {
    /* Unter jedem Formular der Website steht "Keine Werbung, keine
       Weitergabe." Die Verweise sind Orientierung -- Katalog, Zertifikate,
       Downloads -- und diese Grenze ist bewusst gezogen. */
    const m = baueKundenbestaetigung(LEAD, 'de', BASIS).html.toLowerCase();
    for (const wort of ['jetzt kaufen', 'angebot sichern', 'rabatt', 'aktion']) {
      expect(m, wort).not.toContain(wort);
    }
  });
});

describe('Sprachaufloesung', () => {
  it('bildet unbekannte Sprachen auf Englisch ab, nicht auf Deutsch', () => {
    expect(aufMailsprache('fr')).toBe('en');
    expect(aufMailsprache('pl')).toBe('en');
    expect(aufMailsprache('zh-Hans')).toBe('en');
  });

  it('erkennt Deutsch und Arabisch samt Regionalformen', () => {
    expect(aufMailsprache('de')).toBe('de');
    expect(aufMailsprache('ar')).toBe('ar');
    expect(aufMailsprache('en-AU')).toBe('en');
  });

  it('nimmt das Formularfeld vor dem Verweis', () => {
    expect(spracheDerAnfrage('ar', 'https://k-aqua.de/de/kontakt')).toBe('ar');
  });

  it('faellt auf den Verweis zurueck, wenn das Feld fehlt', () => {
    // Aeltere, im Browser zwischengespeicherte Seiten senden `locale` nicht.
    expect(spracheDerAnfrage('', 'https://k-aqua.de/ar/kontakt')).toBe('ar');
    expect(spracheDerAnfrage(null, 'https://k-aqua.de/fr/kontakt')).toBe('en');
  });

  it('faellt zuletzt auf Deutsch zurueck', () => {
    expect(spracheDerAnfrage(null, null)).toBe('de');
    expect(spracheDerAnfrage(null, 'kein-gueltiger-verweis')).toBe('de');
  });
});

describe('Textbestand', () => {
  it('ist in allen drei Sprachen vollstaendig belegt', () => {
    for (const sprache of MAILSPRACHEN) {
      const t = texte(sprache);
      const pruefe = (o: unknown, pfad: string): void => {
        if (typeof o === 'string') {
          expect(o.trim().length, `${sprache}: ${pfad} ist leer`).toBeGreaterThan(0);
          return;
        }
        if (Array.isArray(o)) {
          o.forEach((v, i) => pruefe(v, `${pfad}[${i}]`));
          return;
        }
        if (o && typeof o === 'object') {
          for (const [k, v] of Object.entries(o)) pruefe(v, `${pfad}.${k}`);
        }
      };
      pruefe(t, 'texte');
    }
  });

  it('setzt Platzhalter ein und laesst unbekannte stehen', () => {
    expect(fuelle('Guten Tag {name},', { name: 'Kowalski' })).toBe('Guten Tag Kowalski,');
    expect(fuelle('Hallo {unbekannt}', {})).toBe('Hallo {unbekannt}');
  });
});
