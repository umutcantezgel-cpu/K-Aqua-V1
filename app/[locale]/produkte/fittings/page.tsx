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
  const t = await getTranslations({ locale, namespace: 'products.fittings.meta' });
  return constructMetadata({
    title: t('title'),
    description: t('desc'),
    path: "/produkte/fittings",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products.fittings' });
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">

      {/* Hero */}
      <section className="pt-24 pb-16 bg-background border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            as="h1"
            eyebrow={t('hero.eyebrow')}
            title={t('hero.title')}
            lead={t('hero.lead')}
            align="center"
            className="mb-0"
          />
        </div>
      </section>

      {/* Text Section for Depth */}
      <section className="py-32 bg-card border-b border-card-border relative overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight mb-8">
              {t('depth.title')}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed font-light mb-12">
              {t('depth.text')}
            </p>
            <div className="inline-flex items-center justify-center gap-3 bg-background border border-card-border px-8 py-4 rounded-full shadow-lg">
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <span className="font-heading font-bold text-sm tracking-widest uppercase">{t('depth.badge')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5) CTA Band */}
      <section className="py-32 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-h2 font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('cta.title')}
            </h2>
            <p className="text-lead text-inverse-foreground/80 leading-relaxed max-w-[560px]">
              {t('cta.desc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button variant="inverse" size="lg" href="/projektanfrage">
                {t('cta.primary')}
              </Button>
              <Button variant="secondary" size="lg" href="/produkte" className="text-inverse-foreground border-inverse-foreground/20 hover:bg-inverse-foreground hover:text-foreground">
                {t('cta.secondary')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
