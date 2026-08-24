import React from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import {
  CATALOG_REFERENCES,
  CATALOG_REFERENCES_SOURCE,
  referenceLocale,
} from '@/lib/data/references';

/**
 * Die vier Referenzprojekte, die der Hersteller im Katalog 06-2025 (S. 7)
 * selbst benennt — mit den dort eingebetteten Aufnahmen.
 *
 * Bewusst als eigener Block neben `HoverPreviewList`: Dort stehen sieben nach
 * Städten benannte Kacheln, für die im freigegebenen Material kein Beleg
 * vorliegt. Diese vier sind belegt, und die Quellenangabe steht sichtbar
 * darunter — eine benannte Referenz mit Fundstelle wiegt mehr als eine
 * Verlaufskachel.
 *
 * Server-Komponente: keine Interaktion, damit auch kein Client-JavaScript.
 */
const HEADING: Record<string, string> = {
  de: 'Belegte Referenzprojekte',
  en: 'Documented reference projects',
  ar: 'مشاريع مرجعية موثقة',
};

const LEAD: Record<string, string> = {
  de: 'Vom Hersteller im Katalog benannt — mit Ort und Fundstelle.',
  en: 'Named by the manufacturer in the catalogue — with location and source.',
  ar: 'مذكورة من الشركة المصنّعة في الكتالوج — مع الموقع والمصدر.',
};

export default function CatalogReferences({ locale }: { locale: string }) {
  const l = referenceLocale(locale);

  return (
    <section className="py-24 bg-background-subtle border-b border-card-border">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="mb-12 flex flex-col gap-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-foreground uppercase">
            {HEADING[l] ?? HEADING.en}
          </h2>
          <p className="text-lead text-muted-foreground max-w-[620px]">
            {LEAD[l] ?? LEAD.en}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATALOG_REFERENCES.map((ref) => (
            <article
              key={ref.id}
              id={ref.id}
              className="scroll-mt-28 flex flex-col rounded-2xl overflow-hidden border border-card-border bg-card shadow-sm"
            >
              <div className="relative aspect-[16/9] w-full bg-background-subtle">
                <Image
                  src={ref.image}
                  alt={ref.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                  className="object-cover"
                />
              </div>
              <div className="p-5 flex flex-col gap-2 flex-1">
                <h3 className="font-heading font-bold text-lg text-foreground leading-snug">
                  {ref.name}
                </h3>
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                  {ref.location[l]}
                </span>
                <p className="text-tiny text-muted-foreground mt-1">{ref.note[l]}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-tiny font-mono text-muted-foreground">
          {CATALOG_REFERENCES_SOURCE}
        </p>
      </div>
    </section>
  );
}
