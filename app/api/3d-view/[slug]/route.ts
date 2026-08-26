import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Zuordnung von Katalog-Slugs auf Dateinamen in dist/.
//
// ZWEITE TABELLE, ACHTUNG: lib/3d/aliases.ts fuehrt dieselbe Art Ausnahme fuer
// den eingebetteten Viewer. Beide sind am 24.08.2026 auseinandergelaufen — dort
// wie hier standen Ersatzzuordnungen, die inzwischen gebaute Modelle verdeckten.
// `node scripts/check-3d-coverage.mjs` prueft jetzt BEIDE Tabellen.
const SLUG_ALIASES: Record<string, string> = {
  // Gallery & Showroom aliases
  'galerie': '3d-galerie',
  'gallery': '3d-galerie',
  'all': '3d-galerie',
  '3d-galerie': '3d-galerie',
  'test': 'lib-selbsttest',
  'selbsttest': 'lib-selbsttest',
  'qa': 'lib-selbsttest',
  'export': 'export',
  'cad-export': 'export',

  // Pipe SDR aliases
  'k-fiber-pipe-pp-r-sdr-74': 'k-fiber-pipe-pp-r-sdr-7-4',
  'k-fiber-pipe-pp-rct-sdr-74': 'k-fiber-pipe-pp-rct-sdr-7-4',
  'k-fiber-uv-pipe-pp-r-sdr-74': 'k-fiber-uv-pipe-pp-r-sdr-7-4',
  'k-fiber-uv-pipe-pp-rct-sdr-74': 'k-fiber-uv-pipe-pp-rct-sdr-7-4',
  'k-pipe-pp-rct-sdr-74': 'k-pipe-pp-rct-sdr-7-4',

  // Catalog to 3D slug aliases
  'ball-valve-pp': 'pp-r-ball-valve-ball-in-pp',
  'pp-r-ball-valve-ball-in-brass-chromium-plated': 'pp-r-ball-valve-ball-in-pp',
  'backing-flange-pp-steel-sfbf': 'backing-flange',
  'flat-gasket-for-unions-pp-r': 'flat-gasket-for-unions',
  // Muffe/Spitzende hat seit dem 24.08.2026 eigene Modelle. Die Seiten-Slugs
  // schreiben 'femalemale' ohne Bindestriche, die Module 'female-male' mit —
  // deshalb bleibt hier ein Eintrag noetig, aber er zeigt jetzt auf das
  // richtige Teil statt auf den einfachen Winkel.
  'elbow-45-femalemale': 'elbow-45-female-male',
  'elbow-90-femalemale': 'elbow-90-female-male',
  // Groessenvariante desselben Produkts — bleibt.
  'elbow-90-large-sizes': 'elbow-90',
  // Die drei Metallverschraubungen hatten hier Ersatzzuordnungen auf die
  // Innengewindevariante, solange es ihre Modelle nicht gab. Seit Welle 5
  // gibt es sie; die Eintraege sind entfallen, sonst verdecken sie sie.
  'reducing-tee-large-sizes': 'reducing-tee',
  // Der Rohrschellen-Notbehelf der Schneidwerkzeuge ist Geschichte:
  // seit dem 25.08.2026 existieren die echten Modelle (als Prototypen).
  // Es bleiben nur die Slug-Schreibvarianten der Website als Umleitung
  // auf die kanonischen Produkte (LOOP-STATUS §3.10, geschlossen).
  'pipe-cutter-2040': 'pipe-cutter-20-40',
  'pipe-cutter-50125': 'pipe-cutter-50-125',
  'pipe-cutter-50125-1': 'pipe-cutter-50-125-114',
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const cleanSlug = slug.replace(/\.html$/, '').toLowerCase();
  const targetSlug = SLUG_ALIASES[cleanSlug] || cleanSlug;

  // public/3d war eine byteidentische Kopie von public/kaqua-3d und wurde
  // entfernt; der Eintrag entfällt damit.
  const baseDirs = [
    path.join(process.cwd(), 'kaqua-3d', 'dist'),
    path.join(process.cwd(), 'public', 'kaqua-3d'),
  ];

  // Variations to check in order
  const nameVariations = [
    `${targetSlug}.html`,
    `kaqua-${targetSlug}.html`,
    `${cleanSlug}.html`,
    `kaqua-${cleanSlug}.html`,
    // Inverted hyphen/dash variations
    `kaqua-${targetSlug.replace(/-7-4/g, '-74')}.html`,
    `kaqua-${targetSlug.replace(/-74/g, '-7-4')}.html`,
    `kaqua-${cleanSlug.replace(/-7-4/g, '-74')}.html`,
    `kaqua-${cleanSlug.replace(/-74/g, '-7-4')}.html`,
    'kaqua-3d-galerie.html',
  ];

  let filePath = '';
  for (const baseDir of baseDirs) {
    if (!fs.existsSync(baseDir)) continue;
    for (const name of nameVariations) {
      const candidate = path.join(baseDir, name);
      if (fs.existsSync(candidate)) {
        filePath = candidate;
        break;
      }
    }
    if (filePath) break;
  }

  if (!filePath || !fs.existsSync(filePath)) {
    return new NextResponse('3D model not found', { status: 404 });
  }

  try {
    const htmlContent = fs.readFileSync(filePath, 'utf-8');
    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    });
  } catch (_error) {
    return new NextResponse('Error loading 3D model', { status: 500 });
  }
}
