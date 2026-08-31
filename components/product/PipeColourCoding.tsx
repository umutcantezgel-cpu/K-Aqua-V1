import React from 'react';
import { getProductsByCategory } from '@/lib/products';

/**
 * Farbcodierung der Rohrtypen.
 *
 * K-Aqua unterscheidet seine Rohre im Rohrgraben über Grundfarbe und Streifen:
 * „grün mit 4 blauen Streifen" ist SDR 11 mit Faserverbund, „grün mit 1 roten
 * Streifen" das PP-RCT SDR 7,4. Genau das steht auf jeder Katalogseite unter
 * „Colour:" — auf der Website stand es bis hierher nirgends. Ausgerechnet das
 * Merkmal, an dem ein Installateur den Rohrtyp auf der Baustelle erkennt, war
 * nicht auffindbar; „RAL" kam auf der gesamten Seite genau einmal vor.
 *
 * Die Angaben kommen aus `colour:` in der Frontmatter der Produktdateien und
 * sind dort mit `source:` samt Katalogseite hinterlegt — nicht aus dieser Datei.
 * Wird ein Rohrtyp ergänzt, erscheint er hier von selbst.
 *
 * Server-Komponente: reine Darstellung, kein Client-JavaScript.
 */

const HEADING: Record<Lang, string> = {
  de: 'Farbcodierung der Rohrtypen',
  en: 'Pipe colour coding',
  ar: 'الترميز اللوني للأنابيب',
};

const LEAD: Record<Lang, string> = {
  de: 'Grundfarbe und Streifen unterscheiden die Rohrtypen im Graben. Angaben aus dem Herstellerkatalog 06-2025.',
  en: 'Base colour and stripes distinguish the pipe types on site. Taken from the manufacturer catalogue 06-2025.',
  ar: 'اللون الأساسي والخطوط تميّز أنواع الأنابيب في الموقع. وفق كتالوج الشركة المصنّعة 06-2025.',
};

type Lang = 'de' | 'en' | 'ar';

// Explizit als Record<Lang, …> getypt, nicht als Record<string, …>: Unter
// `noUncheckedIndexedAccess` liefert ein String-Index sonst `T | undefined`,
// und selbst der Fallback `COL.en` gilt dann als möglicherweise undefiniert.
const COL: Record<Lang, { type: string; colour: string; source: string }> = {
  de: { type: 'Rohrtyp', colour: 'Farbe und Streifen', source: 'Fundstelle' },
  en: { type: 'Pipe type', colour: 'Colour and stripes', source: 'Source' },
  ar: { type: 'نوع الأنبوب', colour: 'اللون والخطوط', source: 'المصدر' },
};

/**
 * Streifenfarbe für die Sichtmarke links.
 *
 * Bewusst nur die im Katalog vorkommenden Fälle. Ein unbekannter Text bekommt
 * keinen Farbpunkt statt eines geratenen — die Tabelle bleibt dann trotzdem
 * lesbar, weil die Farbe ohnehin ausgeschrieben danebensteht.
 */
function stripeSwatch(colour: string): { base: string; stripe: string | null } | null {
  const c = colour.toLowerCase();
  const base = c.includes('purple') ? '#7A3FA0' : c.includes('black') ? '#1B1B1B' : '#2E9E4F';
  if (c.includes('blue stripe')) return { base, stripe: '#1E77D3' };
  if (c.includes('red stripe')) return { base, stripe: '#D33A2E' };
  if (c.includes('grey stripe') || c.includes('gray stripe')) return { base, stripe: '#8A8F94' };
  if (c.includes('outside layer')) return { base, stripe: null };
  if (c.trim() === 'green') return { base, stripe: null };
  return null;
}

export default function PipeColourCoding({ locale }: { locale: string }) {
  const l: Lang = locale.startsWith('de') ? 'de' : locale.startsWith('ar') ? 'ar' : 'en';
  const cols = COL[l];

  /* Bewusst nur Rohre.
     Ein `colour`-Feld tragen 42 Produkte: 13 Rohre, 16 Fittings und 13
     Uebergangsstuecke. Naheliegend waere, alle zu zeigen — nachgesehen lohnt
     es nicht: Bei den Fittings steht sechzehnmal schlicht „green". Eine
     Tabelle mit sechzehn gleichen Zeilen ist Rauschen, keine Auskunft, und
     die Ueberschrift dieses Abschnitts spricht ausdruecklich von Rohrtypen.
     Bei den Rohren dagegen kodiert die Farbe die Baureihe — dort traegt sie
     Information. Die Uebergangsstuecke waeren der einzige lohnende Zusatz
     („green (PP-R) with brass threaded insert"); das gehoert dann aber auf
     deren eigene Kategorieseite, nicht hierher. */
  const pipes = getProductsByCategory('pipes')
    .filter((p) => typeof p.colour === 'string' && p.colour.trim().length > 0)
    .sort((a, b) => String(a.title).localeCompare(String(b.title)));

  if (pipes.length === 0) return null;

  return (
    <section className="py-20 bg-background-subtle border-b border-card-border">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="mb-8 flex flex-col gap-3">
          <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-foreground uppercase">
            {HEADING[l]}
          </h2>
          <p className="text-lead text-muted-foreground max-w-[680px]">
            {LEAD[l]}
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-card-border bg-card">
          <table className="w-full text-sm border-collapse min-w-[560px]">
            <thead>
              <tr className="bg-background-subtle text-start">
                <th scope="col" className="text-start font-heading font-bold px-5 py-3 text-foreground">{cols.type}</th>
                <th scope="col" className="text-start font-heading font-bold px-5 py-3 text-foreground">{cols.colour}</th>
                <th scope="col" className="text-start font-heading font-bold px-5 py-3 text-muted-foreground">{cols.source}</th>
              </tr>
            </thead>
            <tbody>
              {pipes.map((p) => {
                const sw = stripeSwatch(String(p.colour));
                return (
                  <tr key={p.slug} className="border-t border-card-border">
                    <td className="px-5 py-3 font-medium text-foreground">{String(p.title)}</td>
                    <td className="px-5 py-3 text-muted-foreground">
                      <span className="inline-flex items-center gap-2.5">
                        {sw && (
                          <span
                            aria-hidden="true"
                            className="relative inline-block w-7 h-4 rounded-sm border border-card-border shrink-0 overflow-hidden"
                            style={{ background: sw.base }}
                          >
                            {sw.stripe && (
                              <span
                                className="absolute inset-y-0 start-1/2 -translate-x-1/2 w-[3px]"
                                style={{ background: sw.stripe }}
                              />
                            )}
                          </span>
                        )}
                        {String(p.colour)}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-tiny font-mono text-muted-foreground whitespace-nowrap">
                      {typeof p.source === 'string' ? p.source : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
