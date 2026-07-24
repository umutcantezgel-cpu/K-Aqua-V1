import { Metadata } from 'next';
import { LanguagePageClient } from './LanguagePageClient';

import { constructMetadata } from '@/lib/seo/metadata';

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return constructMetadata({
    title: 'Select Language | K-Aqua',
    description: 'Select your preferred language and region.',
    locale,
    noIndex: true,
  });
}

export default function LanguagePage() {
  return <LanguagePageClient />;
}
