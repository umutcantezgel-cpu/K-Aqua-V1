import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { FileText, Download, FileArchive, ShieldCheck } from 'lucide-react';

export default function ProductDownloads() {
  const t = useTranslations('products');
  const locale = useLocale();
  const certIsGerman = locale === 'de';

  const downloads = [
    {
      title: t('labels.range'),
      desc: t('labels.rangeDesc'),
      icon: FileText,
      href: '/pdf/k-aqua-product-range-en.pdf',
      size: '1.2 MB',
      lang: 'EN',
    },
    {
      title: t('labels.cert'),
      desc: t('labels.certDesc'),
      icon: ShieldCheck,
      href: certIsGerman ? '/pdf/kwt-iso-zertifikat-de.pdf' : '/pdf/kwt-iso-certificates-en.pdf',
      size: certIsGerman ? '0.3 MB' : '0.4 MB',
      lang: certIsGerman ? 'DE' : 'EN',
    },
    {
      title: t('labels.features'),
      desc: t('labels.featuresDesc'),
      icon: FileArchive,
      href: '/pdf/k-aqua-product-features-en.pdf',
      size: '1.8 MB',
      lang: 'EN',
    },
  ];

  return (
    <section className="w-full flex flex-col gap-6 mt-12">
      <h3 className="font-heading font-bold text-lg text-foreground border-b border-card-border pb-3">
        {t('labels.downloads')}
      </h3>

      <div className="flex flex-col gap-3">
        {downloads.map((item, idx) => {
          const Icon = item.icon;
          return (
            <a
              key={idx}
              href={item.href}
              download
              target="_blank"
              rel="noopener"
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
                  {item.lang} · {item.size}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
