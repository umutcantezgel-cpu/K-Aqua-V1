import { Metadata } from 'next';
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

export default function LanguagePage() {
  return <LanguagePageClient />;
}
