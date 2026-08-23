import { ReactNode, Suspense } from 'react';
import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { routing, coreLocales } from '@/lib/i18n/routing';
import { outfit, inter, tajawal } from '../fonts';
import '../globals.css';
import '../../public/assets/kaqua-elemente.css';
import '../../public/assets/kaqua-signature.css';
import SkipLink from '@/components/layout/SkipLink';
import ScrollProgress from '@/components/layout/ScrollProgress';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OnPageHighlighter from '@/components/search/OnPageHighlighter';

import { CookieBanner } from '@/components/layout/CookieBanner';
import { ConsentInitializer } from '@/components/providers/ConsentInitializer';
import { ShapeDefs } from '@/components/ui/ShapeDefs';
import { LiquidEngine } from '@/components/ui/LiquidEngine';
import { getRootKnowledgeGraph } from '@/lib/seo/schema';
import JsonLd from '@/components/seo/JsonLd';
import { KAquaElementeInitializer } from '@/components/providers/KAquaElementeInitializer';
import SignatureInitializer from '@/components/signature/SignatureInitializer';

import { FluidTransitionProvider } from '@/components/ui/FluidTransition';

import '../kontakt.css';
import { KontaktBlock } from '@/components/kontakt/KontaktBlock';
import { KontaktFab } from '@/components/kontakt/KontaktFab';
import { KontaktModal } from '@/components/kontakt/KontaktModal';

export function generateStaticParams() {
  return coreLocales.map((locale) => ({ locale }));
}

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

import { setRequestLocale } from 'next-intl/server';
import pick from 'lodash/pick';
import { Metadata } from 'next';
import { getBaseUrl } from '@/lib/env';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isIndexed = ['de', 'en', 'ar'].includes(locale);
  return {
    metadataBase: new URL(getBaseUrl()),
    robots: isIndexed ? { index: true, follow: true } : { index: false, follow: false },
    other: {
      'darkreader-lock': 'true',
      'color-scheme': 'light dark',
    },
  };
}


export default async function LocaleLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Retrieve the localized messages for the provider
  const messages = await getMessages();

  // Nur die Namensräume, die der Rahmen dieses Layouts tatsächlich liest —
  // nicht der ganze Katalog. `messages={messages}` schickte zuvor alle 586 kB
  // an jeden Client; `de.html` wog dadurch 1.434.021 Bytes (370 kB gzip).
  //
  // Ein verschachtelter NextIntlClientProvider ERSETZT die Nachrichten seines
  // Teilbaums, er ergänzt sie nicht (use-intl `IntlProvider` baut den Kontext
  // aus den eigenen Props neu auf). Seiten mit eigenem Provider sind davon
  // also unberührt; Seiten ohne eigenen Provider sehen genau diese Auswahl.
  // Jeder Eintrag ist belegt:
  //   nav                 Header:23, MegaMenu:97, SkipLink:4
  //   groups              MegaMenu:98 (dynamisch: tGroups(sec.group))
  //   footer              Footer:13 (ohne Argument, liest footer.*),
  //                       FooterTrustBadges:14, CodayAttribution:8
  //   footerSitemap       FooterSitemap:69 (dynamisch: groups.*, links.*)
  //   cookieConsent       CookieBanner:41 (dynamisch: categories.*, entries.*)
  //   kontaktBlocks       KontaktBlock:55 (dynamisch nach Pfad: ${key}.kicker …)
  //   kontaktForm         KontaktBlock:29, KontaktFab:11, KontaktModal:9,
  //                       KontaktForm:20
  //   notFound            app/[locale]/not-found.tsx:11 — rendert in diesem Provider
  //   toggle_theme_*      ThemeToggle:30 — TOP-LEVEL-STRINGS, keine Namensräume;
  //                       `t(isDark ? 'toggle_theme_light' : 'toggle_theme_dark')`
  //                       greift sie direkt an der Wurzel ab.
  //
  // Wer hier etwas ergänzt, das nur eine einzelne Route braucht, verteilt es auf
  // alle 335 Seiten. Der richtige Ort dafür ist ein Provider in der Seite selbst.
  const layoutMessages = pick(messages, [
    'nav',
    'groups',
    'footer',
    'footerSitemap',
    'cookieConsent',
    'kontaktBlocks',
    'kontaktForm',
    'notFound',
    'toggle_theme_light',
    'toggle_theme_dark',
  ]);

  const rootKnowledgeGraph = getRootKnowledgeGraph(locale);

  const dir = ['ar', 'he', 'fa', 'ur'].includes(locale) ? 'rtl' : 'ltr';
  const isRTLFont = dir === 'rtl';

  const htmlLang = locale;

  return (
    <html lang={htmlLang} dir={dir} suppressHydrationWarning>
      <head>
        <meta name="darkreader-lock" content="true" />
        <meta name="color-scheme" content="light dark" />
        {/*
          Import Map für die 3D-Produktmodule.

          `Native3DCanvas` lädt die Produktgeometrie zur Laufzeit als natives
          ES-Modul (`import('/kaqua-3d/lib/index.mjs')`). Diese Module schreiben
          `import * as THREE from 'three'` — einen nackten Bezeichner, den der
          Browser ohne Import Map nicht auflösen kann. Ohne sie brach jeder
          Ladevorgang mit „Failed to resolve module specifier 'three'" ab, und
          der Viewer zeigte auf allen Produktseiten und im 3D-Studio den
          Fehlerzustand statt eines Modells.

          Die mitgelieferten Demo-Seiten unter `public/kaqua-3d/*.html` haben
          eine solche Map — sie zeigt allerdings auf unpkg.com. Für die Website
          kommt das nicht in Frage: Der Einwilligungsdialog sagt zu, dass keine
          Daten an Dritte übermittelt werden. Ein Abruf bei unpkg würde die
          IP-Adresse jedes Besuchers dorthin senden und diese Zusage zur
          Falschaussage machen. Deshalb liegt three.js unter
          `public/kaqua-3d/vendor/` im eigenen Haus.

          Die Map muss im `<head>` stehen und vor dem ersten Modulimport
          ausgeliefert werden — daher hier und nicht in der Seite.
        */}
        <script
          type="importmap"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              imports: { three: '/kaqua-3d/vendor/three.module.js' },
            }),
          }}
        />
      </head>
      <body className={`${isRTLFont ? tajawal.variable : `${outfit.variable} ${inter.variable}`} antialiased text-body bg-background min-h-screen flex flex-col`} suppressHydrationWarning>
        <ShapeDefs />
        <LiquidEngine />
        <JsonLd schema={rootKnowledgeGraph} />
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem={false}
        >
          <NextIntlClientProvider messages={layoutMessages}>
            <SignatureInitializer />
            <KAquaElementeInitializer />
            <SkipLink />
            <ScrollProgress />
            <Header />
            <Suspense fallback={null}>
              <OnPageHighlighter />
            </Suspense>
            <main id="main-content" className="pt-(--header-h) min-h-screen">
              <FluidTransitionProvider>{children}</FluidTransitionProvider>
            </main>
            {/* Invariant: this is the only full-size (variant="block") KontaktBlock per page.
                Page-level instances (home hero, news/academy sidebar) use slim variants only. */}
            <KontaktBlock variant="block" />
            <KontaktFab />
            <KontaktModal />
            <Footer />

            <ConsentInitializer />
            <CookieBanner />
          </NextIntlClientProvider>
        </ThemeProvider>
        <Script src="/assets/kaqua-elemente.js" strategy="afterInteractive" />
        <Script src="/assets/kaqua-signature.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
