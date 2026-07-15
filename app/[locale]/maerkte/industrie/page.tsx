import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { CTABand } from '@/components/ui/CTABand';

import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'markets.industrie' });
  return constructMetadata({
    title: t('metaTitle'),
    description: t('metaDesc'),
    path: "/maerkte/industrie",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'markets.industrie' });

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">

      {/* 5) Additional Technical Proof Section */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.05)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="mx-auto max-w-[1400px] px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
               <span className="font-heading font-bold text-sm tracking-wider uppercase text-primary">
                {t('section3Eyebrow')}
              </span>
              <h2 className="text-4xl lg:text-5xl font-heading font-extrabold tracking-tight leading-tight">
                {t('section3Title')}
              </h2>
              <div className="flex flex-col gap-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  {t('section3P1')}
                </p>
                <p dangerouslySetInnerHTML={{ __html: t.raw('section3P2') }} />
              </div>
              
              <div className="grid grid-cols-2 gap-6 mt-4">
                 <div className="flex flex-col gap-2 p-6 bg-card border border-card-border rounded-xl shadow-sm">
                   <div className="text-3xl font-heading font-bold text-primary">{t('stat1Value')}</div>
                   <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{t('stat1Label')}</div>
                 </div>
                 <div className="flex flex-col gap-2 p-6 bg-card border border-card-border rounded-xl shadow-sm">
                   <div className="text-3xl font-heading font-bold text-primary">{t('stat2Value')}</div>
                   <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{t('stat2Label')}</div>
                 </div>
                 <div className="flex flex-col gap-2 p-6 bg-card border border-card-border rounded-xl shadow-sm">
                   <div className="text-3xl font-heading font-bold text-primary">{t('stat3Value')}</div>
                   <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{t('stat3Label')}</div>
                 </div>
                 <div className="flex flex-col gap-2 p-6 bg-card border border-card-border rounded-xl shadow-sm">
                   <div className="text-3xl font-heading font-bold text-primary">{t('stat4Value')}</div>
                   <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{t('stat4Label')}</div>
                 </div>
              </div>
            </div>
            
            <div className="h-[600px]">
              <PremiumAssetPlaceholder label="Testlabor Simulation" />
            </div>
          </div>
        </div>
      </section>

      {/* 6) CTA Band */}
      <section className="py-24 bg-background border-t border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-h2 font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('ctaTitle')}
            </h2>
            <p className="text-lead text-inverse-foreground/80 leading-relaxed max-w-[600px] mt-4 mb-8">
              {t('ctaDesc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Button variant="inverse" href="/projektanfrage">
                {t('ctaBtn')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
