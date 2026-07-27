'use client';
import { useTranslations } from 'next-intl';

export default function SeoTextExpansion() {
  const t = useTranslations('seoExpansion');
  
  return (
    <div className="w-full bg-background border-t border-card-border/50 py-16 text-foreground/50 text-xs md:text-sm" data-nosnippet="true">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h4 className="font-heading font-semibold text-foreground/80 mb-3">{t('t1')}</h4>
          <p className="leading-relaxed">{t('p1')}</p>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-foreground/80 mb-3">{t('t2')}</h4>
          <p className="leading-relaxed">{t('p2')}</p>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-foreground/80 mb-3">{t('t3')}</h4>
          <p className="leading-relaxed">{t('p3')}</p>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-foreground/80 mb-3">{t('t4')}</h4>
          <p className="leading-relaxed">{t('p4')}</p>
        </div>
      </div>
    </div>
  );
}
