import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'K-Aqua',
    short_name: 'K-Aqua',
    description: 'K-Aqua (KWT GmbH) - High-end PP-R & PP-RCT Piping Systems',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAFA',
    theme_color: '#5B2D8C',
    // Vektor statt Bitmap: skaliert verlustfrei über alle Größen und
    // vermeidet, dass das Manifest wie zuvor auf 404er zeigt.
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icon-maskable.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  };
}
