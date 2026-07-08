import React from 'react';
import { useTranslations } from 'next-intl';
import { FileText, Download, FileArchive, ShieldCheck } from 'lucide-react';

export default function ProductDownloads() {
  const t = useTranslations('products');
  
  // Use a fallback for actual PDF paths for now, or just an anchor to #
  const downloads = [
    {
      title: t('labels.tds') || 'Technisches Datenblatt',
      desc: t('labels.tdsDesc') || 'Spezifikationen & Maße (PDF)',
      icon: FileText,
      size: '1.2 MB'
    },
    {
      title: t('labels.cert') || 'Zertifikate & Normen',
      desc: t('labels.certDesc') || 'DVGW, SKZ, KIWA (ZIP)',
      icon: ShieldCheck,
      size: '4.5 MB'
    },
    {
      title: t('labels.install') || 'Installations-Guide',
      desc: t('labels.installDesc') || 'Anleitung zum Schweißen (PDF)',
      icon: FileArchive,
      size: '2.8 MB'
    }
  ];

  return (
    <section className="w-full flex flex-col gap-6 mt-12">
      <h3 className="font-heading font-bold text-lg text-foreground border-b border-card-border pb-3">
        {t('labels.downloads') || 'Downloads'}
      </h3>
      
      <div className="flex flex-col gap-3">
        {downloads.map((item, idx) => {
          const Icon = item.icon;
          return (
            <a 
              key={idx}
              href="#"
              className="group relative flex items-center justify-between p-4 rounded-xl border border-card-border bg-card shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300"
            >
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
                  <Download className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground opacity-50 group-hover:opacity-100 transition-opacity">
                  {item.size}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
