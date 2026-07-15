/* eslint-disable react/jsx-no-literals */
import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { CTABand } from '@/components/ui/CTABand';
import { Card } from '@/components/ui/Card';
import { getTranslations } from 'next-intl/server';


// Premium Components
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'resources.bim' });
  
  return constructMetadata({
    title: `${t('title')} | K-Aqua`,
    description: t('metaDesc'),
    path: "/ressourcen/bim-daten",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'resources' });

  // Content for Sticky Scroll Reveal
  // Content for Horizontal Timeline
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">

      {/* 5) Full Width Deep Technical Banner */}
      <section className="py-32 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="mx-auto max-w-[1200px] px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold tracking-tight">
                {t('common.authTitle', { module: t('bim.title') })}
              </h2>
              <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
                <p>{t('common.authP1')}</p>
                <p>{t('common.authP2')}</p>
              </div>
              <ul className="flex flex-col gap-3 mt-4">
                {[t('common.list1'), t('common.list2'), t('common.list3')].map((li, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium">
                    <span className="text-primary">+</span> {li}
                  </li>
                ))}
              </ul>
            </div>
            <div className="aspect-square bg-background border border-card-border rounded-xl shadow-diffuse relative overflow-hidden flex items-center justify-center">
               <span className="text-muted-foreground/50 font-heading tracking-widest uppercase">{t('common.placeholder')}</span>
            </div> 
        </div>
      </section>

      {/* 6) Horizontal Timeline */}

      {/* 7) CTA Band */}
      <section className="py-24 bg-background border-t border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-h2 font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('bim.cta.title')}
            </h2>
            <p className="text-lead text-inverse-foreground/80 leading-relaxed max-w-[560px]">
              {t('bim.cta.desc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Button variant="inverse" size="lg" href="/ressourcen/downloads">{t('bim.cta.btnPrimary')}</Button>
              <Button variant="secondary" className="text-inverse-foreground border-inverse-foreground/30 hover:bg-inverse-foreground/10" size="lg" href="/projektanfrage">{t('bim.cta.btnOutline')}</Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
