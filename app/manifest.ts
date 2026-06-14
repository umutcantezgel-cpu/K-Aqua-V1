import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'K-Aqua',
    short_name: 'K-Aqua',
    description: 'K-Aqua (KWT GmbH) — High-end PP-R & PP-RCT Piping Systems',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAFA',
    theme_color: '#5B2D8C',
    icons: [
      {
        src: '/icon-192.png', // TODO(content): actual bitmap files are missing
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png', // TODO(content): actual bitmap files are missing
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
