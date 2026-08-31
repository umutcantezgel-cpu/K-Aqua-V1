import { ImageResponse } from 'next/og';
import { ogFrame, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og-frame';

/**
 * Das globale Vorschaubild — greift überall dort, wo keine speziellere
 * Fassung existiert.
 *
 * Der Bildrahmen liegt seit dem Hinzukommen der Produkt- und Städtebilder in
 * `lib/seo/og-frame.tsx`. Die Begründung zur arabischen Fassung (lateinischer
 * Text bei arabischer Leserichtung, weil Satori ohne mitgegebene Schriftdatei
 * keine arabischen Glyphen formen kann und sonst GAR KEIN Bild entsteht)
 * steht dort ausführlich.
 */

export const alt = 'K-Aqua';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const TITEL: Record<string, string> = {
  de: 'Premium PP-R & PP-RCT Rohrleitungssysteme',
  en: 'Premium PP-R & PP-RCT Piping Systems',
  // Arabisch bekommt den englischen Titel — siehe lib/seo/og-frame.tsx.
  ar: 'Premium PP-R & PP-RCT Piping Systems',
};

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return new ImageResponse(
    ogFrame({
      eyebrow: 'Made in Germany',
      title: TITEL[locale] ?? TITEL.en!,
      isRtl: locale === 'ar',
    }),
    { ...size }
  );
}
