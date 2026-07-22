import { describe, it, expect } from 'vitest';
import { KONTAKT_SLUGS, INTERESSEN } from '@/content/kontakt-bloecke';
import de from '@/messages/de.json';
import en from '@/messages/en.json';
import ar from '@/messages/ar.json';

const FIELDS = ['kicker', 'head', 'short', 'text', 'interest', 'done'] as const;
const LOCALES = { de, en, ar } as Record<string, any>;

describe('kontaktBlocks message coverage', () => {
  for (const [name, messages] of Object.entries(LOCALES)) {
    it(`${name}.json has every slug with all fields`, () => {
      for (const slug of KONTAKT_SLUGS) {
        const entry = messages.kontaktBlocks?.[slug];
        expect(entry, `${name}: kontaktBlocks.${slug}`).toBeTruthy();
        for (const f of FIELDS) {
          expect(typeof entry[f], `${name}: kontaktBlocks.${slug}.${f}`).toBe('string');
          expect(entry[f].length, `${name}: kontaktBlocks.${slug}.${f} empty`).toBeGreaterThan(0);
        }
      }
    });

    it(`${name}.json interest values are canonical CRM values`, () => {
      const canonical = new Set(INTERESSEN.map((i) => i.value));
      for (const slug of KONTAKT_SLUGS) {
        const interest = messages.kontaktBlocks?.[slug]?.interest;
        expect(canonical.has(interest), `${name}: kontaktBlocks.${slug}.interest = "${interest}"`).toBe(true);
      }
    });

    it(`${name}.json kontaktForm has labels for every interest chip`, () => {
      for (const { key } of INTERESSEN) {
        expect(typeof messages.kontaktForm?.interests?.[key], `${name}: kontaktForm.interests.${key}`).toBe('string');
      }
    });
  }
});
