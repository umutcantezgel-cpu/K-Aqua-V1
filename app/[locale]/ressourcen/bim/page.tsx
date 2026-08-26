import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { wrapGraph, getWebPageGraphNode, getBreadcrumbGraphNode } from '@/lib/seo/schema';
import { getBaseUrl } from '@/lib/env';
import { getTranslations, setRequestLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import pick from 'lodash/pick';
import JsonLd from '@/components/seo/JsonLd';
import { Button } from '@/components/ui/Button';
import { Layers, Download, Ruler, FileText } from '@/components/ui/icon';
import { CTABand } from '@/components/ui/CTABand';
import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { HorizontalTimeline } from '@/components/ui/HorizontalTimeline';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import Native3DCanvas from '@/components/3d/Native3DCanvasLazy';
import BimDownloadTable from '@/components/bim/BimDownloadTable';

/* Das BIM-Portal.
 *
 * Der gesamte Seitentext liegt seit jeher unter `resources.bim` in allen 65
 * Sprachdateien — vollstaendig uebersetzt und von keiner Route gelesen. Diese
 * Seite haengt ihn endlich an eine Adresse.
 *
 * Der Text wurde dafuer neu geschrieben: die alte Fassung sagte native
 * Revit-Familien, VDI 3805 und COBie zu, und nichts davon gibt es. Jetzt
 * nennt er, was die Downloads weiter unten wirklich liefern.
 *
 * KEINE NEUEN NACHRICHTENSCHLUESSEL: Die Seite kommt mit den vorhandenen
 * Schluesseln aus. Neue muessten in alle 65 Dateien, sonst schlaegt
 * `npm run i18n:check` fehl. Was die Downloadtabelle an eigenen Woertern
 * braucht, fuehrt sie selbst.
 */

const PATH = '/ressourcen/bim';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'resources.bim' });
  return constructMetadata({
    title: t('title'),
    description: t('metaDesc'),
    path: PATH,
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'resources.bim' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  // Die Bento-Kachel unten bettet den Viewer ein; Native3DCanvas liest
  // `viewer3d` ueber den Client-Provider.
  const viewer3dMessages = pick(await getMessages(), ['viewer3d']);

  const siteUrl = getBaseUrl().replace(/\/+$/, '');
  const jsonLd = wrapGraph([
    getWebPageGraphNode({
      locale,
      path: PATH,
      type: 'WebPage',
      name: t('title'),
      description: t('metaDesc'),
      breadcrumbId: `${siteUrl}/${locale}${PATH}#breadcrumb`,
      mainEntityId: `${siteUrl}/#organization`,
    }),
    getBreadcrumbGraphNode(locale, [
      {
        name:
          tNav('home') ||
          (locale === 'de' ? 'Startseite' : locale === 'ar' ? 'الرئيسية' : 'Home'),
        path: '/',
      },
      // Wie auf den Schwesterseiten ohne die Zwischenstufe „Ressourcen": eine
      // Seite `/ressourcen` gibt es nicht.
      { name: t('title'), path: PATH },
    ]),
  ]);

  const deepDive = [0, 1, 2, 3].map((i) => ({
    title: t(`sticky.items.${i}.title`),
    description: t(`sticky.items.${i}.desc`),
    content: <PremiumAssetPlaceholder label={t(`sticky.items.${i}.title`)} />,
  }));

  const timeline = [0, 1, 2, 3, 4].map((i) => ({
    year: t(`timeline.items.${i}.year`),
    title: t(`timeline.items.${i}.title`),
    text: t(`timeline.items.${i}.text`),
  }));

  const bentoIcons = [
    <Layers key="0" className="w-8 h-8 text-primary" />,
    <Ruler key="1" className="w-8 h-8 text-primary" />,
    <FileText key="2" className="w-8 h-8 text-primary" />,
    <Download key="3" className="w-8 h-8 text-primary" />,
  ];

  return (
    <>
      <JsonLd schema={jsonLd} />
      <div className="sr-only">{t('title')}</div>
      <div className="flex flex-col w-full min-h-screen bg-background">
        {/* 1) Hero */}
        <ParallaxHero
          eyebrow={t('title')}
          title={
            <>
              {t('intro.title1')}
              <br />
              <span className="text-muted-foreground">{t('intro.title2')}</span>
            </>
          }
          description={t('hero.desc')}
        >
          <div className="flex flex-wrap gap-4 mt-12 justify-center lg:justify-start">
            <Button variant="primary" size="lg" href="#downloads">
              {t('hero.btnPrimary')}
            </Button>
            <Button variant="ghost" size="lg" href="/kontakt">
              {t('hero.btnGhost')}
            </Button>
          </div>
        </ParallaxHero>

        {/* 2) Manifest */}
        <section className="py-32 md:py-48 bg-background border-b border-card-border overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="max-w-4xl mx-auto text-xl md:text-2xl text-muted-foreground leading-relaxed space-y-10 font-light">
              <p>{t('intro.p1')}</p>
              <p>{t('intro.p2')}</p>
            </div>
          </div>
        </section>

        {/* 3) Downloads — der eigentliche Zweck dieser Seite */}
        <section
          id="downloads"
          className="py-32 md:py-40 bg-card border-b border-card-border scroll-mt-24"
        >
          <div className="mx-auto max-w-[1400px] px-6">
            <BimDownloadTable locale={locale} />
          </div>
        </section>

        {/* 4) Was in den Dateien steht */}
        <section className="bg-background">
          <StickyScrollReveal content={deepDive} />
        </section>

        {/* 5) Formate im Überblick, mit Live-Vorschau */}
        <section className="py-32 md:py-48 bg-card kq-band kq-band--slant-b relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--primary-soft)_0%,transparent_70%)] opacity-20 pointer-events-none" />
          <div className="mx-auto max-w-[1400px] px-6 relative z-10">
            <BentoGrid>
              {[0, 1, 2, 3].map((i) => (
                <BentoGridItem
                  key={i}
                  title={t(`bento.items.${i}.title`)}
                  description={t(`bento.items.${i}.desc`)}
                  icon={bentoIcons[i]}
                  colSpan={i === 0 || i === 3 ? 2 : 1}
                  className="bg-background/50 backdrop-blur-sm"
                />
              ))}
              <BentoGridItem
                title={t('sticky.title')}
                description={t('sticky.lead')}
                icon={<Layers className="w-8 h-8 text-primary" />}
                colSpan={3}
                className="bg-background/50 backdrop-blur-sm"
                header={
                  <div className="h-64 w-full bg-card rounded-t-2xl overflow-hidden border-b border-card-border relative">
                    <NextIntlClientProvider messages={viewer3dMessages}>
                      <Native3DCanvas
                        slug="socket"
                        heightClass="h-64"
                        showControls={false}
                        showSizeSelector={false}
                        autoRotateDefault={true}
                      />
                    </NextIntlClientProvider>
                    <div className="absolute bottom-2 end-2 px-2.5 py-1 rounded-md bg-background/80 backdrop-blur-sm border border-card-border text-[10px] font-mono text-muted-foreground pointer-events-none z-10">
                      IFC 4 · CSV · JSON · Revit
                    </div>
                  </div>
                }
              />
            </BentoGrid>
          </div>
        </section>

        {/* 6) Wo die Daten im Projekt greifen */}
        <section className="py-32 md:py-48 bg-background border-y border-card-border overflow-hidden">
          <div className="mx-auto max-w-[1400px] px-6">
            <HorizontalTimeline
              title={t('timeline.title')}
              description={t('timeline.desc')}
              items={timeline}
            />
          </div>
        </section>

        {/* 7) Abschluss */}
        <section className="py-32 bg-background">
          <div className="mx-auto max-w-[1400px] px-6">
            <CTABand>
              <h2 className="text-h2 font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
                {t('cta.title')}
              </h2>
              <p className="text-lead text-inverse-foreground/80 leading-relaxed max-w-[700px] mt-6 mb-10">
                {t('cta.desc')}
              </p>
              <div className="flex flex-wrap gap-4 mt-2">
                <Button variant="inverse" size="lg" href="#downloads">
                  {t('cta.btnPrimary')}
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  href="/kontakt"
                  className="text-inverse-foreground border-inverse-foreground/20 hover:bg-inverse-foreground hover:text-foreground"
                >
                  {t('cta.btnOutline')}
                </Button>
              </div>
            </CTABand>
          </div>
        </section>
      </div>
    </>
  );
}
