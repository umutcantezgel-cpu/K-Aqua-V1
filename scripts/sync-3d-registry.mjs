#!/usr/bin/env node
// Erzeugt die Slug-Zuordnung für den 3D-Viewer aus der Bibliotheks-Registry.
//
// Vorher standen 74 Zuordnungen von Hand in Native3DCanvas.tsx. 28 davon
// waren trivial — der Katalog-Slug entspricht dem Ende der Modul-ID — und
// mussten bei jedem neuen Produkt nachgetragen werden. Diese 28 entstehen
// jetzt automatisch. Übrig bleiben die echten redaktionellen Ausnahmen in
// lib/3d/aliases.ts: Varianten, die sich bewusst ein Modell teilen.
//
// Aufruf: node scripts/sync-3d-registry.mjs [--check]

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const LIB = pathToFileURL(path.join(ROOT, 'public', 'kaqua-3d', 'lib', 'index.mjs')).href;
const OUT = path.join(ROOT, 'lib', '3d', 'slug-map.generated.ts');

const { REGISTRY } = await import(LIB);

const entries = [...REGISTRY]
  .map((e) => [e.slug, e.id])
  .sort(([a], [b]) => a.localeCompare(b));

const body = entries.map(([slug, id]) => `  ${JSON.stringify(slug)}: ${JSON.stringify(id)},`).join('\n');

const file = `// ERZEUGT — nicht von Hand ändern.
// Quelle: public/kaqua-3d/lib/registry.mjs
// Neu erzeugen mit: node scripts/sync-3d-registry.mjs
//
// Redaktionelle Ausnahmen (Varianten, die sich ein Modell teilen) stehen in
// lib/3d/aliases.ts und werden dort gepflegt.

export const GENERATED_SLUG_MAP: Record<string, string> = {
${body}
};

export const GENERATED_COUNT = ${entries.length};
`;

if (process.argv.includes('--check')) {
  const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  if (current !== file) {
    console.error('✖ lib/3d/slug-map.generated.ts ist nicht auf dem Stand der Registry.');
    console.error('  Neu erzeugen mit: node scripts/sync-3d-registry.mjs');
    process.exit(1);
  }
  console.log(`✓ Zuordnung aktuell (${entries.length} Produkte).`);
  process.exit(0);
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, file);
console.log(`✓ ${entries.length} Zuordnungen nach lib/3d/slug-map.generated.ts geschrieben.`);
