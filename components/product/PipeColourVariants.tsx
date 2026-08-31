import React from 'react';
import Image from 'next/image';

/**
 * Sonderfarben der Rohrserien.
 *
 * Bis hierher lebten diese Bilder in `PipeColourCoding` und damit auf genau
 * einer Seite: der Kategorieübersicht `/produkte/pipes`. Auf den einzelnen
 * Rohrseiten — dort, wo jemand eine Serie tatsächlich auswählt — war nirgends
 * zu sehen, dass es sie außer in Grün auch in Blau, Curry und Mocca gibt.
 *
 * Die RAL-Nummern sind keine Schätzung: Das Marketing-Archiv des Herstellers
 * legt die Aufnahmen in Ordnern ab, die die Nummer im Namen tragen
 * (`Marketing/Produktbilder/blau (RAL 5005)` und so fort). Dieselben Werte
 * stehen als Materialrezepte in `kaqua-3d/core/materials.js`, damit Foto und
 * 3D-Modell dieselbe Farbe zeigen.
 *
 * Server-Komponente: reine Darstellung, kein Client-JavaScript.
 */

type Lang = 'de' | 'en' | 'ar';

/** Serienkürzel im Dateinamen — dasselbe Kürzel steckt in der Artikelnummer. */
interface Farbbild {
  serie: string[];
  img: string;
}

interface Farbe {
  id: string;
  ral: string;
  name: Record<Lang, string>;
  bilder: Farbbild[];
}

const FARBEN: Farbe[] = [
  {
    id: 'blue',
    ral: 'RAL 5005',
    name: { de: 'Blau', en: 'Blue', ar: 'أزرق' },
    bilder: [
      { serie: ['111P'], img: '/images/produkte/farbvarianten/BL111P.jpg' },
      { serie: ['160F'], img: '/images/produkte/farbvarianten/BL160F.jpg' },
      { serie: ['200F'], img: '/images/produkte/farbvarianten/BL200F.jpg' },
      { serie: ['200P'], img: '/images/produkte/farbvarianten/BL200P.jpg' },
    ],
  },
  {
    id: 'curry',
    ral: 'RAL 1002',
    name: { de: 'Curry', en: 'Curry', ar: 'أصفر كاري' },
    bilder: [
      { serie: ['160F'], img: '/images/produkte/farbvarianten/CU160F.jpg' },
      { serie: ['200F'], img: '/images/produkte/farbvarianten/CU200F.jpg' },
      { serie: ['200P'], img: '/images/produkte/farbvarianten/CU200P.jpg' },
    ],
  },
  {
    id: 'mocca',
    ral: 'RAL 7032',
    name: { de: 'Mocca', en: 'Mocca', ar: 'رمادي موكا' },
    bilder: [
      { serie: ['200P'], img: '/images/produkte/farbvarianten/MO200P.jpg' },
      { serie: ['200F', '207PF'], img: '/images/produkte/farbvarianten/MO200F_MO207PF.jpg' },
    ],
  },
  {
    id: 'uv',
    ral: 'UV',
    name: { de: 'Schwarz (UV-stabilisiert)', en: 'Black (UV-stabilised)', ar: 'أسود (مقاوم للأشعة فوق البنفسجية)' },
    bilder: [
      { serie: ['111P', '200P'], img: '/images/produkte/farbvarianten/UV111P_UV200P.jpg' },
      { serie: ['200F'], img: '/images/produkte/farbvarianten/UV200F.jpg' },
    ],
  },
];

const HEADING: Record<Lang, string> = {
  de: 'Sonderfarben auf Anfrage',
  en: 'Special colours on request',
  ar: 'ألوان خاصة عند الطلب',
};

const LEAD: Record<Lang, string> = {
  de: 'Neben dem Standardgrün sind die Rohrserien auch in weiteren Farben lieferbar — etwa zur Kennzeichnung getrennter Leitungssysteme oder als UV-stabilisierte Ausführung für die Verlegung im Freien. Im 3D-Modell oben lassen sich die Farben direkt umschalten.',
  en: 'Besides the standard green, the pipe series are also available in further colours — for instance to distinguish separate piping systems, or as a UV-stabilised version for outdoor installation. The 3D model above can be switched between colours directly.',
  ar: 'إلى جانب اللون الأخضر القياسي، تتوفر سلاسل الأنابيب بألوان إضافية — مثلاً لتمييز أنظمة الأنابيب المنفصلة، أو بنسخة مقاومة للأشعة فوق البنفسجية للتمديد الخارجي. يمكن تبديل الألوان مباشرة في النموذج ثلاثي الأبعاد أعلاه.',
};

function sprache(locale: string): Lang {
  return locale.startsWith('de') ? 'de' : locale.startsWith('ar') ? 'ar' : 'en';
}

/**
 * Wählt je Farbe die Aufnahme, die zur Serie des Produkts passt.
 *
 * Die Serienkürzel stecken in den Artikelnummern (AQ**111P**20, AQ**200F**32).
 * Passt keine, wird die erste Aufnahme der Farbe gezeigt — sie zeigt denselben
 * Werkstoff in derselben Farbe, nur an einer anderen Serie. Eine fehlende
 * Kachel wäre die schlechtere Auskunft als eine stellvertretende.
 */
function bildFuerSerie(farbe: Farbe, codes: string[]): string {
  const treffer = farbe.bilder.find((b) =>
    b.serie.some((s) => codes.some((c) => c.toUpperCase().includes(s)))
  );
  return (treffer ?? farbe.bilder[0]!).img;
}

export default function PipeColourVariants({
  locale,
  articleCodes = [],
  className = '',
}: {
  locale: string;
  /** Artikelnummern des Produkts, für die Serienzuordnung. Leer = alle Serien. */
  articleCodes?: string[];
  className?: string;
}) {
  const l = sprache(locale);

  return (
    <section className={`py-16 border-t border-card-border ${className}`}>
      <div className="flex flex-col gap-3 mb-8">
        <h2 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-foreground uppercase">
          {HEADING[l]}
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-[70ch]">{LEAD[l]}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {FARBEN.map((farbe) => (
          <figure
            key={farbe.id}
            className="rounded-2xl border border-card-border bg-card overflow-hidden flex flex-col"
          >
            <div className="bg-white flex items-center justify-center p-4">
              <Image
                src={bildFuerSerie(farbe, articleCodes)}
                alt={farbe.name[l]}
                width={720}
                height={1080}
                className="w-auto h-40 sm:h-52 object-contain"
                sizes="(max-width: 1024px) 45vw, 260px"
              />
            </div>
            <figcaption className="px-4 py-3 border-t border-card-border">
              <div className="font-heading font-bold text-foreground text-sm">{farbe.name[l]}</div>
              <div className="text-tiny font-mono text-muted-foreground">{farbe.ral}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
