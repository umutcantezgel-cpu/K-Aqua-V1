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

  const subtitle = locale === 'ar' ? 'صنع في ألمانيا' : 'Made in Germany';
  const titleText = titles[locale] || titles.en;
  const brandName = 'K-AQUA';

  const isRtl = locale === 'ar';

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
          <svg
            width="64"
            height="64"
            viewBox="0 0 32 32"
            fill="none"
            style={{ display: 'block' }}
          >
            <path
              d="M16 2.5C16 2.5 26 13 26 20a10 10 0 1 1-20 0C6 13 16 2.5 16 2.5Z"
              fill="#ffffff"
            />
            <path
              d="M11.5 21.5a5 5 0 0 0 4 4.5"
              stroke="#5B2D8C"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
            />
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
