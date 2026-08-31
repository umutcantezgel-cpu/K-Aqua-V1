import { ImageResponse } from 'next/og';
import { getProductBySlug } from '@/lib/products';
import { ogFrame, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og-frame';

/**
 * Vorschaubild je Produkt.
 *
 * Bis hierher teilten sich alle 343 Seiten EIN Vorschaubild — jede geteilte
 * Produktseite sah in WhatsApp, LinkedIn und X gleich aus, egal ob es um ein
 * Rohr d500 oder um eine Rohrschere ging. Bei 74 Produkten × 3 Sprachen ist
 * das der Unterschied zwischen „irgendwas von K-Aqua" und dem Produktnamen.
 *
 * Der Produktname bleibt bewusst lateinisch, auch auf `/ar` — siehe die
 * Begründung in lib/seo/og-frame.tsx. Artikelnamen wie „K-Pipe PP-R SDR 11"
 * sind ohnehin Eigennamen und werden nicht übersetzt.
 */

export const alt = 'K-Aqua';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

const EYEBROW: Record<string, string> = {
  de: 'PP-R & PP-RCT Rohrleitungssysteme',
  en: 'PP-R & PP-RCT Piping Systems',
  ar: 'PP-R & PP-RCT Piping Systems',
};

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}) {
  const { locale, category, slug } = await params;
  const product = await getProductBySlug(category, slug);

  /* Ohne Produkt kein erfundener Titel — dann zeigt das Bild die Kategorie.
     Ein falscher Produktname im Vorschaubild wäre schlechter als ein
     allgemeiner. */
  const title = product?.title ?? category;

  return new ImageResponse(
    ogFrame({
      eyebrow: EYEBROW[locale] ?? EYEBROW.en!,
      title,
      isRtl: locale === 'ar',
    }),
    { ...size }
  );
}
