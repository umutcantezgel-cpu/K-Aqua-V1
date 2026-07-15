import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { getTranslations } from 'next-intl/server';
import { SectionHead } from '@/components/ui/SectionHead';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CTABand } from '@/components/ui/CTABand';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { setRequestLocale } from 'next-intl/server';
import { 
  Download, 
  FileText, 
  Shield, 
  Layers, 
  Globe, 
  Ruler, 
  Award,
  ArrowRight
} from '@/components/ui/icon';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'resources.downloads.meta' });
  return constructMetadata({
    title: t('title'),
    description: t('desc'),
    path: "/ressourcen/downloads",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'resources.downloads' });  return (
    <div className="flex flex-col w-full min-h-screen bg-background">

      {/* 5) Deep Dive Content & Methodology */}
      <section className="py-32 bg-card border-y border-card-border relative overflow-hidden z-20">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,rgba(var(--primary),0.05)_0%,transparent_60%)] pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="flex flex-col gap-8">
              <span className="font-heading font-bold text-sm tracking-widest uppercase text-primary">{t('methodology.subtitle')}</span>
              <h2 className="text-4xl lg:text-5xl font-heading font-extrabold tracking-tight leading-tight">
                {t('methodology.title')}
              </h2>
              <div className="flex flex-col gap-6 text-lg text-muted-foreground leading-relaxed">
                <p>{t('methodology.p1')}</p>
                <p>{t('methodology.p2')}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <Card className="p-6 bg-background/50 backdrop-blur border-primary/20">
                  <h4 className="font-heading font-bold text-2xl text-foreground mb-2">{t('methodology.card1.title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('methodology.card1.desc')}</p>
                </Card>
                <Card className="p-6 bg-background/50 backdrop-blur border-primary/20">
                  <h4 className="font-heading font-bold text-2xl text-foreground mb-2">{t('methodology.card2.title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('methodology.card2.desc')}</p>
                </Card>
              </div>
            </div>
            
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-card-border">
              <PremiumAssetPlaceholder label="Testlabor & Qualitätssicherung" className="rounded-none border-none h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 6) Final File List Section */}
      <section className="py-32 bg-background relative z-20">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={t('files.eyebrow')}
            title={t('files.title')}
            lead={t('files.lead')}
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {[
              { title: t('files.items.0.title'), type: t('files.items.0.type'), icon: <Layers /> },
              { title: t('files.items.1.title'), type: t('files.items.1.type'), icon: <FileText /> },
              { title: t('files.items.2.title'), type: t('files.items.2.type'), icon: <Ruler /> },
              { title: t('files.items.3.title'), type: t('files.items.3.type'), icon: <Globe /> },
              { title: t('files.items.4.title'), type: t('files.items.4.type'), icon: <Award /> },
              { title: t('files.items.5.title'), type: t('files.items.5.type'), icon: <Shield /> },
            ].map((file, idx) => (
              <Card key={idx} className="flex items-center gap-6 p-6 group hover:border-primary transition-colors cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  {file.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-heading font-bold text-lg">{file.title}</h4>
                  <p className="text-sm text-muted-foreground">{file.type}</p>
                </div>
                <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7) CTA Band */}
      <section className="py-32 bg-background border-t border-card-border relative z-20">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('cta.title')}
            </h2>
            <p className="text-lg md:text-xl text-inverse-foreground/80 leading-relaxed max-w-2xl mt-4">
              {t('cta.desc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button variant="inverse" size="lg" href="/projektanfrage">
                {t('cta.btn')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
