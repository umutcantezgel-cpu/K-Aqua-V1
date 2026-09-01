import { describe, it, expect } from 'vitest';
import de from '@/messages/de.json';
import en from '@/messages/en.json';
import ar from '@/messages/ar.json';

/*
 * Waechter fuer die Pflichttexte.
 *
 * Anlass waren drei Befunde in den Rechtsseiten, die alle drei nur durch
 * Lesen auffielen — kein Skript und kein Test hat sie gemeldet:
 *
 *  1. Das Impressum trug einen unausgefuellten Platzhalter fuer den nach
 *     § 18 Abs. 2 MStV Verantwortlichen und rendert ihn oeffentlich.
 *  2. Die Datenschutzerklaerung nannte in Ziffer 1 die "K-Aqua GmbH" und in
 *     Ziffer 2 die "KWT GmbH" — zwei verschiedene verantwortliche Stellen in
 *     einem Text, der genau das eindeutig festlegen muss.
 *  3. Sie sagte zu, es wuerden "keine Daten an Dritte oder in Drittlaender
 *     uebermittelt" — was mit dem Mailversand ueber Resend nicht mehr stimmt.
 */

type Abschnitt = { title: string; content: string };
type Buendel = {
  legal?: {
    impressum?: { sections?: Abschnitt[] };
    datenschutz?: { sections?: Abschnitt[] };
  };
};

const SPRACHEN: Record<string, Buendel> = { de, en, ar };

/**
 * Bekannte, bewusst offene Stelle.
 *
 * Der nach § 18 Abs. 2 MStV Verantwortliche ist eine natuerliche Person und
 * eine Haftungsfrage — der Name kommt vom Auftraggeber. Solange er fehlt,
 * blendet `app/[locale]/impressum/page.tsx` den Abschnitt aus, statt den
 * Platzhalter zu zeigen.
 *
 * SOBALD DER NAME EINGETRAGEN IST, gehoert diese Ausnahme hier geloescht —
 * dann faellt jeder kuenftige Platzhalter wieder auf.
 */
const OFFENE_STELLEN = ['§ 18 Abs. 2 MStV', 'Section 18 (2) MStV', '18 (2) MStV', 'MStV'];

function hatPlatzhalter(text: string): boolean {
  return /\[[^\]]{3,80}\]/.test(text);
}

describe('Datenschutzerklaerung', () => {
  for (const [sprache, buendel] of Object.entries(SPRACHEN)) {
    const abschnitte = buendel.legal?.datenschutz?.sections ?? [];

    it(`${sprache}: hat Abschnitte`, () => {
      expect(abschnitte.length).toBeGreaterThan(0);
    });

    /* Ein Platzhalter in der Datenschutzerklaerung wird NICHT ausgeblendet —
       diese Seite hat keinen Filter. Er stuende sofort oeffentlich. */
    it(`${sprache}: enthaelt keinen unausgefuellten Platzhalter`, () => {
      for (const a of abschnitte) {
        expect(hatPlatzhalter(a.content), `${sprache}: "${a.title}"`).toBe(false);
      }
    });

    it(`${sprache}: nennt nur EINE verantwortliche Stelle`, () => {
      const alles = abschnitte.map((a) => a.content).join(' ');
      // "K-Aqua GmbH" existiert nicht; die Gesellschaft heisst KWT GmbH.
      expect(alles).not.toContain('K-Aqua GmbH');
      expect(alles).toContain('KWT GmbH');
    });

    it(`${sprache}: nennt den Mailversand-Dienstleister`, () => {
      // Sobald RESEND_API_KEY gesetzt ist, verarbeitet Resend Kontaktdaten.
      // Fehlt der Hinweis, ist die Erklaerung unvollstaendig.
      expect(abschnitte.map((a) => a.content).join(' ')).toContain('Resend');
    });
  }

  it('behauptet nicht mehr, es gaebe keine Uebermittlung an Dritte', () => {
    const alles = (de.legal?.datenschutz?.sections ?? [])
      .map((a: Abschnitt) => a.content)
      .join(' ');
    // Die alte Zusage war mit dem Mailversand nicht mehr wahr.
    expect(alles).not.toContain('keine Daten an Dritte oder in Drittländer übermittelt');
  });
});

describe('Impressum', () => {
  for (const [sprache, buendel] of Object.entries(SPRACHEN)) {
    const abschnitte = buendel.legal?.impressum?.sections ?? [];

    it(`${sprache}: jeder Platzhalter steht in einem bekannten offenen Abschnitt`, () => {
      const mitPlatzhalter = abschnitte.filter((a) => hatPlatzhalter(a.content));
      for (const a of mitPlatzhalter) {
        const bekannt = OFFENE_STELLEN.some((s) => a.content.includes(s) || a.title.includes(s));
        expect(
          bekannt,
          `${sprache}: "${a.title}" hat einen Platzhalter, steht aber nicht auf der Liste der ` +
            `bekannten offenen Stellen. Entweder ausfuellen oder OFFENE_STELLEN ergaenzen.`
        ).toBe(true);
      }
    });

    it(`${sprache}: nennt Anschrift, Geschaeftsfuehrung und Registergericht`, () => {
      const alles = abschnitte.map((a) => a.content).join(' ');
      expect(alles).toContain('KWT GmbH');
      expect(alles).toContain('Auweg 3');
      expect(alles).toContain('Wetzlar');
    });
  }
});
