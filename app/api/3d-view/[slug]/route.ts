import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Mapping table for slug variations between catalog, URLs, and 3D files
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
  'pp-r-ball-valve-brass': 'pp-r-ball-valve-ball-in-pp',
  'pp-r-ball-valve-ball-in-brass-chromium-plated': 'pp-r-ball-valve-ball-in-pp',
  'backing-flange-pp-steel-sfbf': 'backing-flange',
  'flat-gasket-for-unions-pp-r': 'flat-gasket-for-unions',
  'elbow-45-femalemale': 'elbow-45',
  'elbow-90-femalemale': 'elbow-90',
  'elbow-90-large-sizes': 'elbow-90',
  'metal-union-female-thread-brass': 'metal-union-female-thread',
  'metal-union-male-thread': 'metal-union-female-thread',
  'metal-union-male-thread-brass': 'metal-union-female-thread',
  'reducing-tee-large-sizes': 'reducing-tee',
  'reducing-tee-large': 'reducing-tee',
  'pipe-cutter-2040': 'pipe-clamps',
  'pipe-cutter-50125': 'pipe-clamps',
  'pipe-cutter-50125-1': 'pipe-clamps',
  'pipe-cutter-50-125-114': 'pipe-clamps',
  'pipe-cutter-50-125': 'pipe-clamps',
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const cleanSlug = slug.replace(/\.html$/, '').toLowerCase();
  const targetSlug = SLUG_ALIASES[cleanSlug] || cleanSlug;

  const baseDirs = [
    path.join(process.cwd(), 'kaqua-3d', 'dist'),
    path.join(process.cwd(), 'public', 'kaqua-3d'),
    path.join(process.cwd(), 'public', '3d'),
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
