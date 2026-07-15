import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { CTABand } from '@/components/ui/CTABand';
import { getTranslations } from 'next-intl/server';

import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'markets.landwirtschaft' });
  return constructMetadata({
    title: t('metaTitle'),
    description: t('metaDesc'),
    path: "/maerkte/landwirtschaft",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'markets.landwirtschaft' });  return (
    <div className="flex flex-col w-full min-h-screen bg-background">

      {/* 7) Final Deep Technical Details section */}
      <section className="py-32 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
           <div className="flex flex-col lg:flex-row gap-16 items-start">
             <div className="lg:w-1/3">
                <h3 className="text-3xl font-heading font-bold mb-4">{t('section5Title')}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                  {t('section5Desc')}
                </p>
                <ul className="flex flex-col gap-4">
                  {[
                    t('section5List1'), 
                    t('section5List2'), 
                    t('section5List3'),
                    t('section5List4'),
                    t('section5List5')
                  ].map((li, i) => (
                    <li key={i} className="flex items-center gap-4 text-lg font-medium">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {li}
                    </li>
                  ))}
                </ul>
             </div>
             <div className="lg:w-2/3 w-full min-h-[500px]">
                <PremiumAssetPlaceholder label="Zertifizierungs- & Testlabor" />
             </div>
           </div>
        </div>
      </section>

      {/* 8) CTA Band */}
      <section className="py-24 bg-card border-t border-card-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(var(--primary),0.1)_0%,transparent_50%)] pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6 relative z-10">
          <CTABand>
            <h2 className="text-h2 font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('ctaTitle')}
            </h2>
            <p className="text-lead text-inverse-foreground/80 leading-relaxed max-w-[600px] mt-4">
              {t('ctaDesc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button variant="inverse" size="lg" href="/projektanfrage">
                {t('ctaBtn1')}
              </Button>
              <Button variant="secondary" size="lg" href="/projektanfrage" className="text-inverse-foreground border-inverse-foreground/20 hover:bg-inverse-foreground hover:text-foreground">
                {t('ctaBtn2')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
