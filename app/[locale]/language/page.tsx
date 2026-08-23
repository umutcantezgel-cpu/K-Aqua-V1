import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import pick from 'lodash/pick';
import { LanguagePageClient } from './LanguagePageClient';

import { constructMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> | { locale: string } }): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: 'Sprache wählen | Choose Language',
    description: 'Wählen Sie Ihre bevorzugte Sprache für die K-Aqua Website.',
    path: '/language',
    locale,
    noIndex: true
  });
}

export default async function LanguagePage() {
  // `languagePage` versorgt LanguageGlobeHub:59, LanguageConfirmPanel:37,
  // LanguageSearch:83 und LanguageCarousel:26 — alle unterhalb dieser Seite.
  return (
    <NextIntlClientProvider messages={pick(await getMessages(), ['languagePage'])}>
      <LanguagePageClient />
    </NextIntlClientProvider>
  );
}
