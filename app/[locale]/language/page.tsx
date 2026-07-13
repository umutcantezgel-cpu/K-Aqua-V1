import { Metadata } from 'next';
import { LanguagePageClient } from './LanguagePageClient';

export const metadata: Metadata = {
  title: 'Select Language | K-Aqua',
  description: 'Select your preferred language and region.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function LanguagePage() {
  return <LanguagePageClient />;
}
