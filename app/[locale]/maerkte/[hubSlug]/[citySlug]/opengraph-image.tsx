import { ImageResponse } from 'next/og';
import { GEO_MARKETS } from '@/lib/data/geo';
import { ogFrame, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og-frame';

/**
 * Vorschaubild je Stadt.
 *
 * Die 28 Marktseiten sind der lokale Teil der Seite — sie werden geteilt,
 * verlinkt und in Anfragen zitiert. Ein Vorschaubild, das „Dubai" statt
 * „Premium PP-R & PP-RCT Rohrleitungssysteme" zeigt, ist genau dort der
 * Unterschied.
 *
 * Stadt und Land kommen aus `lib/data/geo.ts` und sind dort ausdrücklich als
 * Eigennamen gepflegt, also unübersetzt und lateinisch — damit funktioniert
 * das Bild auch unter `/ar`, wo Satori ohne mitgegebene Schrift keine
 * arabischen Glyphen formen kann (siehe lib/seo/og-frame.tsx).
 */

export const alt = 'K-Aqua';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; hubSlug: string; citySlug: string }>;
}) {
  const { locale, hubSlug, citySlug } = await params;
  const market = GEO_MARKETS.find((m) => m.hubSlug === hubSlug && m.slug === citySlug);

  return new ImageResponse(
    ogFrame({
      /* Das Land als Zeile darüber, die Stadt als Titel — dieselbe Staffelung
         wie im Wissensgraphen der Seite (Stadt in Land in Region). */
      eyebrow: market?.country ?? 'PP-R & PP-RCT Piping Systems',
      title: market?.city ?? hubSlug,
      isRtl: locale === 'ar',
    }),
    { ...size }
  );
}
