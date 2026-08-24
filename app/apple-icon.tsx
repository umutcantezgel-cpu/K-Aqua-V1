import { ImageResponse } from 'next/og';

/**
 * Touch-Icon für iOS.
 *
 * Fehlte bisher vollständig. Ohne diese Route legt iOS beim „Zum Home-Bildschirm
 * hinzufügen" einen Screenshot der Seite ab — der Nutzer bekommt ein
 * unleserliches Miniaturbild statt der Marke.
 *
 * Bewusst ohne abgerundete Ecken und ohne Transparenz: iOS legt seine eigene
 * Maske und den Glanz darüber. Ein hier eingebautes `rx` erschiene doppelt
 * gerundet, ein transparenter Hintergrund liefe schwarz auf. Deshalb
 * vollflächiges Violett — anders als app/icon.svg, das als Favicon sehr wohl
 * eine eigene Rundung braucht.
 *
 * Die Marke steckt als data-URI in einem <img>, nicht als inline-SVG-Baum:
 * ImageResponse rendert mit Satori, und dessen SVG-Unterstützung deckt
 * `transform="matrix(…)"` auf einer Gruppe nicht verlässlich ab. Als Bildquelle
 * rasterisiert dieselbe Datei dagegen unverändert. Die Pfadkoordinaten sind
 * identisch mit app/icon.svg und components/ui/Logo.tsx.
 */
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';
export const alt = 'K-Aqua';

const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512"><g transform="matrix(0.44,0,0,-0.44,-9.4,493.28)"><path d="M 295.344,880.215 H 910.77 L 569.793,539.234 910.77,198.258 H 295.344 v 681.957" fill="#ffffff"/></g></svg>`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#5B2D8C',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          width={132}
          height={132}
          alt=""
          src={`data:image/svg+xml;base64,${Buffer.from(MARK_SVG).toString('base64')}`}
        />
      </div>
    ),
    { ...size }
  );
}
