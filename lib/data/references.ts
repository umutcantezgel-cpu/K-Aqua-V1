/**
 * Belegte Referenzprojekte aus dem Herstellerkatalog 06-2025, Seite 7.
 *
 * Warum diese Liste hier steht und nicht in messages/:
 * Projektnamen und Orte sind Eigennamen — „Al Kout Mall" heißt in jeder Sprache
 * so. Nur die eine erläuternde Zeile ist übersetzbar, und die steht deshalb
 * direkt hier. Vier neue Schlüssel in 65 Sprachdateien einzutragen wäre für
 * diesen Zweck das größere Risiko: `npm run i18n:check` prüft Schlüsselparität,
 * ein Eintrag in nur de/en/ar würde sie brechen.
 *
 * Abgrenzung zu `refs.projects` in messages/: Dort stehen sieben Kacheln, die
 * nach Städten benannt sind (Dubai, Warschau, Istanbul, Singapur, Kapstadt,
 * London) und konkrete Projektbehauptungen aufstellen. Für keine davon liegt im
 * freigegebenen Material ein Beleg vor; belegt ist allein Waldsolms, der
 * Firmensitz. Die vier hier sind die einzigen, die der Hersteller selbst im
 * Katalog nennt — mitsamt den Aufnahmen, die diese Datei referenziert.
 *
 * Die Bilder sind die im Katalog eingebetteten Originale (Seite 7, 576×304),
 * nicht nachgestellte Motive.
 */

export type ReferenceLocale = 'de' | 'en' | 'ar';

export interface CatalogReference {
  id: string;
  /** Eigenname des Projekts — wird nicht übersetzt. */
  name: string;
  /** Ort, wie ihn der Katalog schreibt. */
  location: Record<ReferenceLocale, string>;
  /** Eine Zeile Einordnung. Bewusst knapp: Mehr gibt der Katalog nicht her. */
  note: Record<ReferenceLocale, string>;
  image: string;
}

export const CATALOG_REFERENCES: CatalogReference[] = [
  {
    id: 'diyar-al-muharaq',
    name: 'Diyar Al Muharaq',
    location: { de: 'Bahrain', en: 'Bahrain', ar: 'البحرين' },
    note: {
      de: 'Stadtentwicklung mit Marina und Wohnquartieren.',
      en: 'Urban development with marina and residential districts.',
      ar: 'تطوير عمراني يضم مرسى وأحياء سكنية.',
    },
    image: '/images/referenzen/diyar-al-muharaq.jpg',
  },
  {
    id: 'al-kout-mall',
    name: 'Al Kout Mall',
    location: { de: 'Kuwait', en: 'Kuwait', ar: 'الكويت' },
    note: {
      de: 'Einkaufszentrum am Wasser, Fahaheel.',
      en: 'Waterfront shopping centre, Fahaheel.',
      ar: 'مركز تسوق على الواجهة البحرية، الفحيحيل.',
    },
    image: '/images/referenzen/al-kout-mall.jpg',
  },
  {
    id: 'jahra-hospital',
    name: 'Jahra Hospital',
    location: { de: 'Kuwait', en: 'Kuwait', ar: 'الكويت' },
    note: {
      de: 'Krankenhaus — Trinkwasser unter Hygieneanforderungen.',
      en: 'Hospital — potable water under hygiene requirements.',
      ar: 'مستشفى — مياه شرب وفق متطلبات النظافة.',
    },
    image: '/images/referenzen/jahra-hospital.jpg',
  },
  {
    id: 'blue-lagoon',
    name: 'Blue Lagoon Resort',
    location: { de: 'Island', en: 'Iceland', ar: 'آيسلندا' },
    note: {
      de: 'Geothermalbad — Warmwasser unter Dauerbetrieb.',
      en: 'Geothermal spa — hot water in continuous operation.',
      ar: 'منتجع حراري أرضي — ماء ساخن في تشغيل مستمر.',
    },
    image: '/images/referenzen/blue-lagoon.jpg',
  },
];

/** Fundstelle, damit die Angaben rückverfolgbar bleiben. */
export const CATALOG_REFERENCES_SOURCE = 'KA-Katalog_GB_06-2025, S. 7';

export function referenceLocale(locale: string): ReferenceLocale {
  if (locale.startsWith('de')) return 'de';
  if (locale.startsWith('ar')) return 'ar';
  return 'en';
}
