import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { getTranslations } from 'next-intl/server';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { Button } from '@/components/ui/Button';
import { CTABand } from '@/components/ui/CTABand';
import { SectionHead } from '@/components/ui/SectionHead';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'academy.schulungen.meta' });
  return constructMetadata({
    title: t('title'),
    description: t('desc'),
    path: "/academy/schulungen",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'academy.schulungen' });
  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">

      {/* 7) Deep Tech Spec Section */}
      <section className="py-32 bg-card border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <PremiumAssetPlaceholder label="ZERTIFIZIERUNGS-HOLOGRAMM" className="min-h-[600px]" />
            </div>
            <div className="order-1 md:order-2 flex flex-col gap-8">
              <span className="font-heading font-bold text-sm tracking-widest uppercase text-primary">
                {t('spec.eyebrow')}
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-[1.1]">
                {t('spec.title')}
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t('spec.desc')}
              </p>
              <ul className="flex flex-col gap-6 mt-4">
                {[
                  { title: t('spec.items.0.title'), text: t('spec.items.0.text') },
                  { title: t('spec.items.1.title'), text: t('spec.items.1.text') },
                  { title: t('spec.items.2.title'), text: t('spec.items.2.text') }
                ].map((li, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-lg">{li.title}</h4>
                      <p className="text-muted-foreground leading-relaxed mt-1">{li.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8) Final CTA Band */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(var(--primary),0.1)_0%,transparent_60%)] pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6 relative z-10">
          <CTABand>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-inverse-foreground tracking-tighter leading-tight uppercase">
              {t('cta.title1')} <br /> {t('cta.title2')}
            </h2>
            <p className="text-xl text-inverse-foreground/80 leading-relaxed max-w-2xl mt-6">
              {t('cta.desc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Button variant="inverse" size="lg" href="/projektanfrage">
                {t('cta.button')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
