import React from 'react';
import { useLocale } from 'next-intl';
import { FileText, Download, FileArchive, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';

interface ProductDownloadsProps {
  translations: {
    downloads: string;
    range: string;
    rangeDesc: string;
    cert: string;
    certDesc: string;
    features: string;
    featuresDesc: string;
  };
  /** Produkt-Slug ohne Kategorie, z. B. `elbow-90`. */
  productSlug?: string;
  /** Zahl der Nennweiten dieses Produkts, fuer die Beschriftung. */
  sizeCount?: number;
  /** true bei Werkzeugen — sie bekommen kein BIM-Paket. */
  isTool?: boolean;
}

/* Beschriftungen der BIM-Zeilen.
 *
 * Sie standen hier bis heute als deutscher Text im Code und wurden so in
 * allen 65 Sprachfassungen ausgeliefert. Ein Nachrichtenschluessel waere die
 * saubere Loesung; er muesste aber in alle 65 Sprachdateien, und die werden
 * gerade an anderer Stelle bearbeitet. Bis dahin wenigstens die drei
 * gepflegten Sprachen statt einer. */
const BIM_LABELS: Record<'de' | 'en' | 'ar', { pkg: string; pkgDesc: string; data: string; dataDesc: string }> = {
  de: {
    pkg: 'BIM-Paket (IFC 4)',
    pkgDesc: 'Je Nennweite eine IFC-Datei, dazu Artikeltabelle und Revit-Typenkatalog',
    data: 'Artikeldaten (CSV)',
    dataDesc: 'Alle Nennweiten mit Maßen, Gewicht und Normen — für Massenermittlung',
  },
  en: {
    pkg: 'BIM package (IFC 4)',
    pkgDesc: 'One IFC file per size, plus article table and Revit type catalogue',
    data: 'Article data (CSV)',
    dataDesc: 'Every size with dimensions, weight and standards — for quantity take-off',
  },
  ar: {
    pkg: 'حزمة BIM (IFC 4)',
    pkgDesc: 'ملف IFC لكل مقاس، مع جدول الأصناف وكتالوج أنواع Revit',
    data: 'بيانات الأصناف (CSV)',
    dataDesc: 'جميع المقاسات مع الأبعاد والوزن والمعايير — لحساب الكميات',
  },
};

export default function ProductDownloads({
  translations,
  productSlug,
  sizeCount,
  isTool = false,
}: ProductDownloadsProps) {
  const locale = useLocale();
  const certIsGerman = locale === 'de';
  const lang = locale === 'de' ? 'de' : locale.startsWith('ar') ? 'ar' : 'en';
  const bim = BIM_LABELS[lang];

  /* Die beiden ersten Zeilen waren Attrappen: „BIM / CAD Modelle (Revit & IFC)"
   * und „Ausschreibungstexte (GAEB)", beide verlinkt auf eine Marketingseite,
   * auf der keine einzige Datei lag. Jetzt stehen dort die tatsaechlichen
   * Downloads fuer genau dieses Produkt.
   *
   * Werkzeuge bekommen keine: sie sind keine Bauteile im Sinne von IFC. Ihre
   * Artikeldaten gibt es weiterhin als Tabelle. */
  const bimDownloads = productSlug
    ? [
        ...(isTool
          ? []
          : [
              {
                title: bim.pkg,
                desc: bim.pkgDesc,
                icon: FileArchive,
                href: `/api/bim/produkt/${productSlug}`,
                size: 'ZIP',
                lang: 'IFC 4',
                isInternalLink: false,
              },
            ]),
        {
          title: bim.data,
          desc: bim.dataDesc,
          icon: FileText,
          href: `/api/bim/produkt/${productSlug}?format=csv`,
          size: 'CSV',
          lang: sizeCount ? `${sizeCount}×` : 'CSV',
          isInternalLink: false,
        },
      ]
    : [];

  const downloads = [
    ...bimDownloads,
    {
      title: translations.range,
      desc: translations.rangeDesc,
      icon: FileText,
      href: '/pdf/k-aqua-product-range-en.pdf',
      // 12,9 MB, 121 Seiten: der vollständige Herstellerkatalog 06-2025.
      // Vorher lag hier die 36-seitige Web-Fassung (KA-Katalog_GB_2025_WEB,
      // 1,2 MB) — angeboten als „Vollständiger Katalog mit Dimensionen &
      // Artikeln", obwohl ihr genau die Artikeltabellen fehlten. Seit die
      // Artikelnummern der Website gegen den 06-2025-Katalog korrigiert sind,
      // wäre die alte Datei zudem die falsche Quelle: Der Download muss
      // dieselben Nummern zeigen wie die Produktseiten.
      size: '12.9 MB',
      lang: 'EN',
      isInternalLink: false,
    },
    {
      title: translations.cert,
      desc: translations.certDesc,
      icon: ShieldCheck,
      href: certIsGerman ? '/pdf/kwt-iso-zertifikat-de.pdf' : '/pdf/kwt-iso-certificates-en.pdf',
      size: certIsGerman ? '0.3 MB' : '0.4 MB',
      lang: certIsGerman ? 'DE' : 'EN',
      isInternalLink: false,
    },
    {
      title: translations.features,
      desc: translations.featuresDesc,
      icon: FileArchive,
      href: '/pdf/k-aqua-product-features-en.pdf',
      size: '1.8 MB',
      lang: 'EN',
      isInternalLink: false,
    },
  ];

  return (
    <section className="w-full flex flex-col gap-6 mt-12" data-nosnippet="true">
      <h3 className="font-heading font-bold text-lg text-foreground border-b border-card-border pb-3">
        {translations.downloads}
      </h3>

      <div className="flex flex-col gap-3">
        {downloads.map((item, idx) => {
          const Icon = item.icon;
          const content = (
            <>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-background-subtle flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary-soft transition-colors shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col text-start">
                  <span className="font-heading font-semibold text-foreground text-sm">
                    {item.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.desc}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="w-8 h-8 rounded-full bg-background-subtle flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0">
                  {item.isInternalLink ? <ArrowRight className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                </div>
                <span className="text-[10px] font-mono text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity">
                  {item.lang} · {item.size}
                </span>
              </div>
            </>
          );

          if (item.isInternalLink) {
            return (
              <Link
                key={idx}
                href={item.href}
                className="group relative flex items-center justify-between p-4 rounded-xl border border-card-border bg-card shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300"
              >
                {content}
              </Link>
            );
          }

          return (
            <a
              key={idx}
              href={item.href}
              download
              target="_blank"
              rel="noopener"
              className="group relative flex items-center justify-between p-4 rounded-xl border border-card-border bg-card shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300"
            >
              {content}
            </a>
          );
        })}
      </div>
    </section>
  );
}
