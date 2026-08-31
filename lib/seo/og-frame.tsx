import React from 'react';

/**
 * Der gemeinsame Bildrahmen aller Vorschaubilder (OpenGraph / Twitter).
 *
 * Warum hier und nicht dreimal kopiert: Es gibt inzwischen drei Stellen, die
 * ein Vorschaubild erzeugen — global, je Produkt und je Stadt. Der Rahmen ist
 * überall derselbe: Verlauf, Marke, Logo, Zeile darüber, Titel darunter.
 * Dreimal dieselben 90 Zeilen wären drei Gelegenheiten, dass die Marke
 * auseinanderläuft.
 *
 * ZUR ARABISCHEN FASSUNG (übernommen aus app/[locale]/opengraph-image.tsx):
 * `ImageResponse` rendert mit Satori. Ohne mitgegebene Schriftdatei greift die
 * eingebaute Standardschrift, und die kann arabische Glyphen nicht formen —
 * der Aufruf bricht ab mit „lookupType: 5 - substFormat: 3 is not yet
 * supported", und es entsteht GAR KEIN Bild. Deshalb bekommt `ar` lateinischen
 * Text bei arabischer Leserichtung. Ein Vorschaubild mit korrekter Marke ist
 * besser als keines.
 *
 * Richtig behoben wäre das erst mit einer arabischen TTF/OTF im Repo, die über
 * die `fonts`-Option hineingereicht wird — Satori nimmt kein WOFF2, und die
 * Schrift aus `next/font/google` liegt nur gehasht als WOFF2 im Build. Das ist
 * eine Lizenzentscheidung des Auftraggebers, keine Nebenbei-Änderung.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

export function ogFrame({
  eyebrow,
  title,
  isRtl,
}: {
  /** Kleine Zeile über dem Titel — Kategorie, Land, oder „Made in Germany". */
  eyebrow: string;
  title: string;
  isRtl: boolean;
}) {
  return (
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {/* Pfad und Matrix identisch mit app/icon.svg, app/apple-icon.tsx und
            components/ui/Logo.tsx — eine Marke, eine Form. */}
        <svg width="64" height="64" viewBox="0 0 512 512" fill="none" style={{ display: 'block' }}>
          <g transform="matrix(0.44,0,0,-0.44,-9.4,493.28)">
            <path
              d="M 295.344,880.215 H 910.77 L 569.793,539.234 910.77,198.258 H 295.344 v 681.957"
              fill="#ffffff"
            />
          </g>
        </svg>
        <span style={{ fontSize: '44px', fontWeight: 800, letterSpacing: '-0.03em' }}>
          {'K-AQUA'}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '900px' }}>
        <span
          style={{
            fontSize: '24px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'rgba(255, 255, 255, 0.75)',
          }}
        >
          {eyebrow}
        </span>
        <span
          style={{
            /* Produkt- und Städtenamen werden länger als der globale
               Untertitel. Ab 44 Zeichen kleiner setzen, sonst läuft die Zeile
               aus dem Bild. */
            fontSize: title.length > 44 ? '44px' : '56px',
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}
