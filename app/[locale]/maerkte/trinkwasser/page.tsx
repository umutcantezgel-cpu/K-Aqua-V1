import React from 'react';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { constructMetadata } from '@/lib/seo/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { CTABand } from '@/components/ui/CTABand';

// Premium Components
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';

// Icons
import { Droplet, Shield, Layers, Thermometer, Globe, Award, Ruler } from '@/components/ui/icon';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'markets.trinkwasser' });
  return constructMetadata({
    title: t('metaTitle'),
    description: t('metaDesc'),
    path: "/maerkte/trinkwasser",
    locale,
  });
}

export default function Page() {
  const t = useTranslations('markets.trinkwasser');  return (
    <div className="flex flex-col w-full min-h-screen bg-background">

      {/* 6) Technical Specifications Summary */}
      <section className="py-24 bg-card border-t border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold tracking-tight">
                {t('section4Title')}
              </h2>
              <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
                <p>{t('section4P1')}</p>
                <p>{t('section4P2')}</p>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-4">
                <div className="flex flex-col gap-2">
                  <span className="text-4xl font-heading font-black text-primary">{t('stat1Value')}<span className="text-2xl text-muted-foreground">{t('stat1Unit')}</span></span>
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{t('stat1Label')}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-4xl font-heading font-black text-primary">{t('stat2Value')}<span className="text-2xl text-muted-foreground">{t('stat2Unit')}</span></span>
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{t('stat2Label')}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-4xl font-heading font-black text-primary">{t('stat3Value')}<span className="text-2xl text-muted-foreground">{t('stat3Unit')}</span></span>
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{t('stat3Label')}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-4xl font-heading font-black text-primary">{t('stat4Value')}<span className="text-2xl text-muted-foreground">{t('stat4Unit')}</span></span>
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{t('stat4Label')}</span>
                </div>
              </div>
            </div>
            <div className="h-[600px] w-full">
               <PremiumAssetPlaceholder label="Systemschnittstelle & Fitting-Geometrie" />
            </div>
          </div>
        </div>
      </section>

      {/* 7) CTA Band */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('ctaTitle')}
            </h2>
            <p className="text-xl text-inverse-foreground/80 leading-relaxed max-w-[600px] mt-6">
              {t('ctaDesc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button variant="inverse" size="lg" href="/projektanfrage">
                {t('ctaBtn')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
