import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from '@/components/ui/icon';
import { CTABand } from '@/components/ui/CTABand';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'products.transitionFittings.meta' });
  return constructMetadata({
    title: t('title'),
    description: t('desc'),
    path: "/produkte/transition-fittings",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products.transitionFittings' });  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground selection:bg-primary/30">

      {/* 6) Deep Specification Matrix */}
      <section className="py-32 bg-card border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={t('stats.eyebrow')}
            title={t('stats.title')}
            lead={t('stats.lead')}
            align="left"
          />
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: t('stats.items.0.label'), value: t('stats.items.0.value'), sub: t('stats.items.0.sub') },
              { label: t('stats.items.1.label'), value: t('stats.items.1.value'), sub: t('stats.items.1.sub') },
              { label: t('stats.items.2.label'), value: t('stats.items.2.value'), sub: t('stats.items.2.sub') },
              { label: t('stats.items.3.label'), value: t('stats.items.3.value'), sub: t('stats.items.3.sub') },
              { label: t('stats.items.4.label'), value: t('stats.items.4.value'), sub: t('stats.items.4.sub') },
              { label: t('stats.items.5.label'), value: t('stats.items.5.value'), sub: t('stats.items.5.sub') },
              { label: t('stats.items.6.label'), value: t('stats.items.6.value'), sub: t('stats.items.6.sub') },
              { label: t('stats.items.7.label'), value: t('stats.items.7.value'), sub: t('stats.items.7.sub') },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-2 p-8 border border-card-border rounded-2xl bg-background shadow-sm hover:shadow-md transition-shadow">
                <span className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">{stat.label}</span>
                <span className="text-3xl font-heading font-black text-foreground">{stat.value}</span>
                <span className="text-xs text-muted-foreground/70">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7) CTA Band */}
      <section className="py-32 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('cta.title')}
            </h2>
            <p className="text-lg md:text-xl text-inverse-foreground/80 leading-relaxed max-w-[600px] mt-4 mb-8">
              {t('cta.desc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Button variant="inverse" size="lg" href="/projektanfrage">
                {t('cta.primary')}
              </Button>
              <Button variant="secondary" size="lg" href="/ressourcen/ausschreibungstexte">
                {t('cta.secondary')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}

