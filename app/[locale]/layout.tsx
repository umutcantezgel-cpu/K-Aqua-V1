import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, coreLocales } from '@/lib/i18n/routing';
import { outfit, inter, tajawal } from '../fonts';
import '../globals.css';
import SkipLink from '@/components/layout/SkipLink';
import ScrollProgress from '@/components/layout/ScrollProgress';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CookieBanner } from '@/components/layout/CookieBanner';
import { ShapeDefs } from '@/components/ui/ShapeDefs';
import { LiquidEngine } from '@/components/ui/LiquidEngine';
import WaterCursor from '@/components/ui/WaterCursor';
import { getOrganizationJsonLd } from '@/lib/seo/metadata';
import JsonLd from '@/components/seo/JsonLd';

export function generateStaticParams() {
  return coreLocales.map((locale) => ({ locale }));
}

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

import { headers } from 'next/headers';

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Retrieve the localized messages for the provider
  const messages = await getMessages();
  const orgJsonLd = await getOrganizationJsonLd(locale);

  const headersList = await headers();
  const dir = headersList.get('x-direction') || (['ar', 'he', 'fa', 'ur'].includes(locale) ? 'rtl' : 'ltr');
  const isRTLFont = dir === 'rtl';

  const nonce = headersList.get('x-nonce') || undefined;

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${isRTLFont ? tajawal.variable : `${outfit.variable} ${inter.variable}`}`}>
        <ShapeDefs />
        <LiquidEngine />
        <WaterCursor />
        <JsonLd schema={orgJsonLd} />
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem={false}
          nonce={nonce}
        >
          <NextIntlClientProvider messages={messages}>
            <SkipLink />
            <ScrollProgress />
            <Header />
            <main id="main-content" className="pt-[72px] min-h-screen">
              {children}
            </main>
            <Footer />
            <CookieBanner />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
