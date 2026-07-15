/* eslint-disable react/jsx-no-literals */
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
  const t = await getTranslations({ locale, namespace: 'solutions.hochhaus' });
  return constructMetadata({
    title: t('meta.title'),
    description: t('meta.desc'),
    path: "/loesungen/hochhaus",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'solutions.hochhaus' });

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">

      {/* 6) Technical Data & Deep Engineering Manifesto */}
      <section className="py-32 bg-background border-b border-card-border">
        <div className="mx-auto max-w-[1200px] px-6">
          <SectionHead
            eyebrow={t('data.eyebrow')}
            title={t('data.title')}
            lead={t('data.lead')}
            align="left"
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="prose prose-invert">
              <h3 className="text-3xl font-heading font-bold mb-4 tracking-tight">{t('data.h3_1')}</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {t('data.p1')}
              </p>
              <h3 className="text-3xl font-heading font-bold mb-4 tracking-tight">{t('data.h3_2')}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('data.p2')}
              </p>
            </div>
            <div className="space-y-4">
              {[
                { label: t('data.stats.0.label'), val: t('data.stats.0.val'), standard: t('data.stats.0.standard') },
                { label: t('data.stats.1.label'), val: t('data.stats.1.val'), standard: t('data.stats.1.standard') },
                { label: t('data.stats.2.label'), val: t('data.stats.2.val'), standard: t('data.stats.2.standard') },
                { label: t('data.stats.3.label'), val: t('data.stats.3.val'), standard: t('data.stats.3.standard') },
                { label: t('data.stats.4.label'), val: t('data.stats.4.val'), standard: t('data.stats.4.standard') },
                { label: t('data.stats.5.label'), val: t('data.stats.5.val'), standard: t('data.stats.5.standard') },
                { label: t('data.stats.6.label'), val: t('data.stats.6.val'), standard: t('data.stats.6.standard') },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-card border border-card-border rounded-2xl hover:border-primary/30 transition-colors">
                  <div>
                    <div className="font-bold font-heading text-lg">{stat.label}</div>
                    <div className="text-sm text-muted-foreground mt-1">Prüfnorm: {stat.standard}</div>
                  </div>
                  <div className="mt-4 sm:mt-0 text-xl md:text-2xl font-mono text-primary font-bold">
                    {stat.val}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7) CTA Band */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(var(--primary),0.15)_0%,transparent_60%)] pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6 relative z-10">
          <CTABand className="py-24 px-10 md:px-16 border border-primary/20 bg-card/80 backdrop-blur-2xl rounded-[3rem] shadow-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight mb-8 max-w-3xl">
              {t('cta.title')}
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mb-12">
              {t('cta.desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Button variant="primary" size="lg" href="/projektanfrage" className="h-16 px-10 text-lg rounded-2xl">
                {t('cta.button1')} <ArrowRight className="ms-3 w-6 h-6" />
              </Button>
              <Button variant="ghost" size="lg" href="/kontakt" className="h-16 px-10 text-lg rounded-2xl bg-primary/5 hover:bg-primary/10">
                {t('cta.button2')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
