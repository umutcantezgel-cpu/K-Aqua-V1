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
}

export default function ProductDownloads({ translations }: ProductDownloadsProps) {
  const locale = useLocale();
  const certIsGerman = locale === 'de';

  const downloads = [
    {
      title: 'BIM / CAD Modelle (Revit & IFC)',
      desc: '3D-Geometrie mit Dimensionen & SDR für Kollisionsprüfung',
      icon: FileArchive,
      href: '/ressourcen/ausschreibungstexte',
      size: 'RFA / IFC',
      lang: '3D',
      isInternalLink: true,
    },
    {
      title: 'Ausschreibungstexte (GAEB)',
      desc: 'Standardisierte Leistungsverzeichnisse & Spezifikationen',
      icon: FileText,
      href: '/ressourcen/ausschreibungstexte',
      size: 'GAEB / XML',
      lang: 'DE/EN',
      isInternalLink: true,
    },
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
