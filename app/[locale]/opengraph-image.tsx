import { ImageResponse } from 'next/og';

export const alt = 'K-Aqua';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const titles: Record<string, string> = {
    de: 'Premium PP-R & PP-RCT Rohrleitungssysteme',
    en: 'Premium PP-R & PP-RCT Piping Systems',
    ar: 'أنظمة أنابيب PP-R و PP-RCT الفاخرة',
  };

  const subtitle = 'Made in Germany';
  const brandName = 'K-AQUA';

  // Arabisch bekommt hier den englischen Titel — nicht aus Nachlässigkeit,
  // sondern weil /ar/opengraph-image sonst GAR KEIN Bild liefert.
  //
  // `ImageResponse` rendert mit Satori, und diesem Aufruf wird keine Schrift
  // mitgegeben; es greift also die eingebaute Standardschrift. Die kann
  // arabische Glyphen nicht formen, und der Aufruf bricht ab mit
  //   Error: lookupType: 5 - substFormat: 3 is not yet supported
  // Gemessen am Produktionsserver: /de und /en liefern 200 und ~190 kB,
  // /ar lieferte nichts. Jede arabische Verlinkung — WhatsApp, LinkedIn,
  // X — stand damit ohne Vorschaubild da.
  //
  // Ein Vorschaubild mit korrekter Marke und englischem Untertitel ist besser
  // als keines. RICHTIG behoben wäre es erst mit einer arabischen TTF/OTF im
  // Repo, die `ImageResponse` über die `fonts`-Option bekommt — Satori nimmt
  // kein WOFF2, und die Tajawal-Datei aus `next/font/google` liegt nur als
  // gehashtes WOFF2 im Build. Dafür muss eine Schriftdatei beschafft und
  // lizenzrechtlich freigegeben werden; das ist eine Entscheidung des
  // Auftraggebers, keine Nebenbei-Änderung.
  const isRtl = locale === 'ar';
  const titleText = isRtl ? (titles.en as string) : (titles[locale] || titles.en) as string;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isRtl ? 'flex-end' : 'flex-start',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #5B2D8C 0%, #0081A5 100%)',
          padding: '80px',
          fontFamily: 'sans-serif',
          color: '#ffffff',
          textAlign: isRtl ? 'right' : 'left',
          direction: isRtl ? 'rtl' : 'ltr',
        }}
      >
        {/* Header Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
          }}
        >
          {/* Die K-Aqua-Marke, nicht ein generischer Wassertropfen.
              Hier stand zuvor eine gezeichnete Tropfenform mit Glanzbogen — ein
              Symbol, das mit der Marke nichts zu tun hat. Es ist ausgerechnet
              das Bild, das jede Social-Vorschau, jede WhatsApp-Verlinkung und
              jede LinkedIn-Karte zeigt.
              Pfad und Matrix sind identisch mit app/icon.svg, app/apple-icon.tsx
              und components/ui/Logo.tsx. */}
          <svg
            width="64"
            height="64"
            viewBox="0 0 512 512"
            fill="none"
            style={{ display: 'block' }}
          >
            <g transform="matrix(0.44,0,0,-0.44,-9.4,493.28)">
              <path
                d="M 295.344,880.215 H 910.77 L 569.793,539.234 910.77,198.258 H 295.344 v 681.957"
                fill="#ffffff"
              />
            </g>
          </svg>
          <span
            style={{
              fontSize: '44px',
              fontWeight: 800,
              letterSpacing: '-0.03em',
            }}
          >
            {brandName}
          </span>
        </div>

        {/* Content Body */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: '900px',
          }}
        >
          <span
            style={{
              fontSize: '24px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(255, 255, 255, 0.75)',
            }}
          >
            {subtitle}
          </span>
          <span
            style={{
              fontSize: '56px',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            {titleText}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
