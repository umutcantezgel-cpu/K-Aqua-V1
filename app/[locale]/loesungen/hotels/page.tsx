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
  const t = await getTranslations({ locale, namespace: 'solutions.hotels' });
  return constructMetadata({
    title: `${t('intro.title1')} ${t('intro.title2')} | K-Aqua`,
    description: t('hero.desc'),
    path: "/loesungen/hotels",
    locale,
  });
}

export default async function HotelsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'solutions.hotels' });

  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground">

      {/* 7) HORIZONTAL TIMELINE: A Legacy of Megaprojects */}

      {/* 8) ARCHITECTURAL DEEP DIVE: The Material Science */}
      <section className="py-32 bg-background border-t border-card-border relative">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_right,rgba(var(--primary),0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="font-heading font-bold tracking-widest text-sm text-primary uppercase">{t('research.eyebrow')}</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight" dangerouslySetInnerHTML={{ __html: t.raw('research.title') }} />
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('research.desc')}
              </p>
              <ul className="flex flex-col gap-4 mt-8">
                {[
                  t('research.items.0'),
                  t('research.items.1'),
                  t('research.items.2'),
                  t('research.items.3')
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-card-border hover:border-primary/50 transition-colors">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="font-medium text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <PremiumAssetPlaceholder label="Molekulare Struktur Analyse" className="h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 9) GLOBAL STANDARDS & CERTIFICATIONS */}
      <section className="py-24 bg-card border-y border-card-border">
        <div className="mx-auto max-w-[1400px] px-6 text-center">
          <SectionHead
            eyebrow={t('certs.eyebrow')}
            title={t('certs.title')}
            lead={t('certs.lead')}
            align="center"
          />
          <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-700">
            {/* We mock some trust badges */}
            {['SKZ Würzburg', 'DVGW', 'AENOR', 'WRAS', 'KIWA', 'TÜV SÜD'].map((cert) => (
              <div key={cert} className="px-8 py-4 rounded-2xl bg-background border border-card-border font-heading font-bold text-xl tracking-widest uppercase flex items-center justify-center min-w-[200px] shadow-sm">
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10) FINAL CTA BAND */}
      <section className="py-32 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand className="py-20 px-10 md:px-20 text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight max-w-4xl mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-inverse-foreground/80 leading-relaxed max-w-2xl mb-10">
              {t('cta.desc')}
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Button variant="inverse" size="lg" href="/projektanfrage" className="text-lg px-8 h-16">
                {t('cta.button1')}
              </Button>
              <Button variant="secondary" size="lg" href="/kontakt" className="text-lg px-8 h-16 bg-transparent text-inverse-foreground border-inverse-foreground/30 hover:bg-inverse-foreground/10">
                {t('cta.button2')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
