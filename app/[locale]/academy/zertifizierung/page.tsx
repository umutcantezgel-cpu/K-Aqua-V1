import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { getTranslations } from 'next-intl/server';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { SectionHead } from '@/components/ui/SectionHead';
import { CTABand } from '@/components/ui/CTABand';
import { Button } from '@/components/ui/Button';
import { setRequestLocale } from 'next-intl/server';
import { 
  Shield, 
  Award,
  Layers,
  Thermometer,
  Droplet,
  Flame,
  Check
} from '@/components/ui/icon';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'academy.zertifizierung.meta' });
  return constructMetadata({
    title: t('title'),
    description: t('desc'),
    path: "/academy/zertifizierung",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'academy.zertifizierung' });  return (
    <div className="flex flex-col w-full min-h-screen bg-background selection:bg-primary/30">

      {/* 6) Timeline */}

      {/* 7) CTA Band */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-h2 font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('cta.title')}
            </h2>
            <p className="text-lead text-inverse-foreground/80 leading-relaxed max-w-[560px]">
              {t('cta.desc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Button variant="inverse" size="lg" href="/ressourcen/downloads">
                {t('cta.button1')}
              </Button>
              <Button variant="ghost" size="lg" href="/projektanfrage">
                {t('cta.button2')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
