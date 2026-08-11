import { describe, it, expect } from 'vitest';
import { KONTAKT_SLUGS, INTERESSEN } from '@/content/kontakt-bloecke';
import de from '@/messages/de.json';
import en from '@/messages/en.json';
import ar from '@/messages/ar.json';

const FIELDS = ['kicker', 'head', 'short', 'text', 'interest', 'done'] as const;
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

    it(`${name}.json interest values are canonical CRM values`, () => {
      const canonical = new Set(INTERESSEN.map((i) => i.value));
      for (const slug of KONTAKT_SLUGS) {
        const interest = messages.kontaktBlocks?.[slug]?.interest;
        expect(canonical.has(interest as (typeof INTERESSEN)[number]['value']), `${name}: kontaktBlocks.${slug}.interest = "${interest}"`).toBe(true);
      }
    });

    it(`${name}.json kontaktForm has labels for every interest chip`, () => {
      for (const { key } of INTERESSEN) {
        expect(typeof messages.kontaktForm?.interests?.[key], `${name}: kontaktForm.interests.${key}`).toBe('string');
      }
    });
  }
});
