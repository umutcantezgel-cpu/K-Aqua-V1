import { describe, it, expect } from 'vitest';
import {
  KONTAKT_SLUGS,
  INTERESSEN,
  KONTAKT_INTERESSE,
} from '@/content/kontakt-bloecke';
import de from '@/messages/de.json';
import en from '@/messages/en.json';
import ar from '@/messages/ar.json';

/* `interest` steht hier bewusst NICHT mehr: der Wert kommt seit dem
   30.08.2026 aus KONTAKT_INTERESSE im Code, nicht aus den Sprachdateien.
   Er wird unveraendert ans CRM gesendet und darf deshalb nicht uebersetzbar
   sein — in 49 der 65 Sprachen war er es. Der Schluessel steht in den
   Sprachdateien noch, wird aber von nichts mehr gelesen. */
const FIELDS = ['kicker', 'head', 'short', 'text', 'done'] as const;
type MessageBundle = { kontaktBlocks?: Record<string, Record<string, string>>; kontaktForm?: { interests?: Record<string, string> } };
const LOCALES: Record<string, MessageBundle> = { de, en, ar };

describe('kontaktBlocks message coverage', () => {
  for (const [name, messages] of Object.entries(LOCALES)) {
    it(`${name}.json has every slug with all fields`, () => {
      for (const slug of KONTAKT_SLUGS) {
        const entry = messages.kontaktBlocks?.[slug];
        expect(entry, `${name}: kontaktBlocks.${slug}`).toBeTruthy();
        for (const f of FIELDS) {
          const value = entry?.[f];
          expect(typeof value, `${name}: kontaktBlocks.${slug}.${f}`).toBe('string');
          expect((value ?? '').length, `${name}: kontaktBlocks.${slug}.${f} empty`).toBeGreaterThan(0);
        }
      }
    });

    it(`${name}.json kontaktForm has labels for every interest chip`, () => {
      for (const { key } of INTERESSEN) {
        expect(typeof messages.kontaktForm?.interests?.[key], `${name}: kontaktForm.interests.${key}`).toBe('string');
      }
    });
  }
});

describe('Vorausgewaehltes Interesse je Kontaktblock', () => {
  /* Diese Zuordnung lag bis zum 30.08.2026 in messages/*.json und wurde
     dort folgerichtig uebersetzt — sie sieht in einer Sprachdatei wie Text
     aus. Sie ist aber keiner: KontaktForm sendet den Wert unveraendert,
     app/actions/lead.ts schreibt ihn in Betreff und CRM-Feld, und die
     Auswahlknoepfe vergleichen mit `sel === n.value`. Eine bulgarische
     Anfrage erreichte den Vertrieb deshalb als „Neue Anfrage: Материал",
     und die Knopfreihe blieb unmarkiert, weil kein Knopf zum uebersetzten
     Vorgabewert passte.

     Jetzt steht die Zuordnung im Code. Diese Pruefungen halten sie dort
     vollstaendig und kanonisch. */

  it('deckt jeden Kontaktblock ab', () => {
    for (const slug of KONTAKT_SLUGS) {
      expect(KONTAKT_INTERESSE[slug], `KONTAKT_INTERESSE.${slug}`).toBeTruthy();
    }
  });

  it('fuehrt keinen Slug, den es nicht gibt', () => {
    const bekannt = new Set<string>(KONTAKT_SLUGS);
    for (const slug of Object.keys(KONTAKT_INTERESSE)) {
      expect(bekannt.has(slug), `KONTAKT_INTERESSE.${slug} ist kein Kontaktblock`).toBe(true);
    }
  });

  it('vergibt nur kanonische CRM-Werte', () => {
    const kanonisch = new Set<string>(INTERESSEN.map((i) => i.value));
    for (const [slug, wert] of Object.entries(KONTAKT_INTERESSE)) {
      expect(kanonisch.has(wert), `KONTAKT_INTERESSE.${slug} = "${wert}"`).toBe(true);
    }
  });

  it('gibt die deutsche Fassung unveraendert wieder', () => {
    /* Die Zuordnung wurde aus messages/de.json uebernommen — der einzigen
       Sprachfassung, in der die Werte durchweg kanonisch geblieben sind.
       Diese Pruefung haelt fest, dass beim Uebertragen der 36 Zeilen kein
       Wert verrutscht ist, und wuerde ein spaeteres Auseinanderlaufen
       melden, solange der Schluessel in de.json noch steht. */
    const deBloecke = (de as unknown as MessageBundle).kontaktBlocks ?? {};
    for (const slug of KONTAKT_SLUGS) {
      const ausDe = deBloecke[slug]?.interest;
      if (!ausDe) continue; // Schluessel entfernt — dann gibt es nichts zu vergleichen
      expect(KONTAKT_INTERESSE[slug], `KONTAKT_INTERESSE.${slug}`).toBe(ausDe);
    }
  });
});
