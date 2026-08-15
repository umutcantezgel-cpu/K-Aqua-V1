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
import { ShapeDefs } from '@/components/ui/ShapeDefs';
import { LiquidEngine } from '@/components/ui/LiquidEngine';
import { getOrganizationJsonLd } from '@/lib/seo/metadata';
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isIndexed = ['de', 'en', 'ar'].includes(locale);
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://k-aqua-v1.vercel.app'),
    robots: isIndexed ? { index: true, follow: true } : { index: false, follow: false },
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
  
  const clientMessages = pick(messages, [
    'nav',
    'menu',
    'header',
    'quote',
    'toggle_theme_light',
    'toggle_theme_dark',
    'cookieConsent',
    'footer',
    'footerSitemap',
    'kontaktBlocks',
    'kontaktForm',
    'enterprise',
    'seoExpansion',
    'multiStepForm'
  ]);

  // Hinweis: 'products' wird bewusst NICHT an den Client gegeben (nicht in der
  // pick-Liste oben) — die Namespace-Inhalte werden ausschließlich in Server
  // Components gerendert und würden die HTML-Payload unnötig vergrößern.

  const orgJsonLd = await getOrganizationJsonLd(locale);

  const dir = ['ar', 'he', 'fa', 'ur'].includes(locale) ? 'rtl' : 'ltr';
  const isRTLFont = dir === 'rtl';

  const htmlLang = locale;

  return (
    <html lang={htmlLang} dir={dir} suppressHydrationWarning>
      <body className={`${isRTLFont ? tajawal.variable : `${outfit.variable} ${inter.variable}`} antialiased text-body bg-background min-h-screen flex flex-col`} suppressHydrationWarning>
        <ShapeDefs />
        <LiquidEngine />
        <JsonLd schema={orgJsonLd} />
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem={false}
        >
          <NextIntlClientProvider messages={clientMessages}>
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

            <CookieBanner />
          </NextIntlClientProvider>
        </ThemeProvider>
        <Script src="/assets/kaqua-elemente.js" strategy="afterInteractive" />
        <Script src="/assets/kaqua-signature.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
