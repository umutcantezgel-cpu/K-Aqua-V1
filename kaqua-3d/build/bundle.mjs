#!/usr/bin/env node
/* K-Aqua 3D — Build.

   Erzeugt aus Core + einem Produktpaket
     · ein lauffähiges Standalone-HTML   (Weitergabe, Offline-Prüfung)
     · ein ES-Modul-Paar für Next.js     (Core-Chunk + Produkt-Chunk)

   Aufruf:
     node build/bundle.mjs products/ball-valve-pp   -> dist/kaqua-<modul>.html
     node build/bundle.mjs --all                    -> alle Produkte
     node build/bundle.mjs --lib                    -> dist/lib/*.mjs

   Warum kein Bundler: der Core ist reines ESM ohne Abhängigkeiten außer
   three, und three kommt zur Laufzeit aus der Importmap. Ein Bundler
   würde hier nur eine Konfigurationsdatei hinzufügen.

   Die Verkettung ist bewusst simpel: relative Importzeilen fallen weg,
   die Reihenfolge ist unten festgeschrieben. Voraussetzung dafür ist,
   dass kein Modul einen Bezeichner doppelt vergibt — checkCollisions()
   prüft das und bricht ab, statt einen kaputten Bundle zu schreiben. */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, statSync } from 'node:fs';
import { dirname, join, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CORE_ORDER = ['geometry.js', 'materials.js', 'assembly.js', 'overlay.js',
  'ui.js', 'viewer.js', 'export.js'];
const PRODUCT_ORDER = ['data.js', 'params.js', 'parts.js', 'index.js'];

/* Die Rohrfamilie teilt params/parts über products/_pipe/. Beim Verketten
   kommen die vor den Produktdateien; die dünnen Re-Export-Hüllen im Produkt
   fallen durch den Stripper weg und lösen sich auf die Familienfunktion auf. */
const FAMILY_PIPE = ['_pipe/params.js', '_pipe/parts.js'];
const familyFor = (dir) => (/pipe/.test(dir) ? FAMILY_PIPE : []);

const THREE_VERSION = '0.184.0';
const IMPORTMAP = readFileSync(join(ROOT, 'build', 'importmap.json'), 'utf8').trim();

const rd = (...p) => readFileSync(join(ROOT, ...p), 'utf8');

/* Importzeilen entfernen — auch die mehrzeiligen mit Klammerliste. */
const IMPORT_RE = /^import\s+(?:\*\s+as\s+[\w$]+|[\w$]+|\{[\s\S]*?\})\s+from\s+'[^']+';[ \t]*\r?\n/gm;

function strip(src, { keepExports }) {
  let s = src.replace(IMPORT_RE, '');
  s = s.replace(/^export\s+\*\s+from\s+'[^']+';[ \t]*\r?\n/gm, '');
  s = s.replace(/^export\s+default\s+([\w$]+);[ \t]*\r?\n/gm,
    keepExports ? 'export { $1 as default };\n' : '');
  // Re-Export-Hüllen (export { a, b } from './x.js') verschwinden immer:
  // beim Verketten ist das Ziel schon im Bundle, beim Bibliotheksbau
  // stünde sonst ein Import auf eine Datei, die es dort nicht gibt.
  s = s.replace(/^export\s*\{[^}]*\}\s*from\s*'[^']+'\s*;[ \t]*\r?\n/gm, '');
  if (!keepExports) s = s.replace(/^export\s+(?=(const|let|var|function|class|async)\b)/gm, '');
  return s.trim() + '\n';
}

function checkCollisions(files) {
  const seen = new Map();
  const clash = [];
  const DECL = /^(?:export\s+)?(?:const|let|var|function|class|async function)\s+([\w$]+)/gm;
  for (const { name, src } of files) {
    for (const m of src.matchAll(DECL)) {
      const id = m[1];
      if (seen.has(id)) clash.push(`${id}: ${seen.get(id)} + ${name}`);
      else seen.set(id, name);
    }
  }
  if (clash.length) {
    throw new Error('Bezeichner doppelt vergeben — Bundle würde nicht laden:\n  ' +
      clash.join('\n  '));
  }
}

function coreFiles() {
  return CORE_ORDER.map((f) => ({ name: 'core/' + f, src: rd('core', f) }));
}
function productFiles(dir) {
  return [
    ...familyFor(dir).map((f) => ({ name: 'products/' + f, src: rd('products', f) })),
    ...PRODUCT_ORDER.map((f) => ({ name: dir + '/' + f, src: rd(dir, f) })),
  ];
}

function banner(title) {
  return '\n/* ══ ' + title + ' ' + '═'.repeat(Math.max(2, 66 - title.length)) + ' */\n';
}

function concat(files, opt) {
  return files.map((f) => banner(f.name) + strip(f.src, opt)).join('\n');
}

/* Produkt-Metadaten ohne Ausführung lesen: id/module/titleDe stehen als
   Literale in index.js. */
function meta(dir) {
  const src = rd(dir, 'index.js');
  const pick = (k) => (src.match(new RegExp("^\\s*" + k + ":\\s*'([^']*)'", 'm')) || [])[1];
  return { id: pick('id'), module: pick('module'), titleDe: pick('titleDe'),
    titleEn: pick('titleEn'), category: pick('category'), dir };
}

function inlineCss() {
  let css = rd('assets', 'coday-tokens.css');
  css = css.replace(/url\('fonts\/([^']+)'\)/g, (_, f) => {
    const b64 = readFileSync(join(ROOT, 'assets', 'fonts', f)).toString('base64');
    return "url('data:font/woff2;base64," + b64 + "')";
  });
  return css;
}

/* Inline-Skripte: ein wörtliches </script> im Quelltext — die Stage hat
   eines in ihrem Usage-Kommentar — würde den Block vorzeitig schließen. */
function inlineSafe(src) {
  return src.replace(/<\/script/gi, '<\\/script');
}

/* Der Usage-Block der Stage ist Dokumentation; im Bundle ist er Ballast. */
function stageSource() {
  const src = rd('core', 'stage.js');
  const a = src.indexOf('/* BEGIN USAGE */');
  const b = src.indexOf('/* END USAGE */');
  const out = a >= 0 && b > a ? src.slice(0, a) + src.slice(b + 15) : src;
  return inlineSafe(out);
}

function html(dir) {
  const m = meta(dir);
  const files = [...coreFiles(), ...productFiles(dir)];
  checkCollisions(files);
  const bundle = concat(files, { keepExports: false });
  const stage = stageSource();

  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${m.titleDe} (${m.titleEn}) — K-Aqua 3D-Ansicht</title>
<meta name="description" content="Interaktive 3D-Ansicht: ${m.titleDe}. Nennweiten, Explosionsansicht, Halbschnitt, Bemaßung.">
<script type="importmap">
${IMPORTMAP}
</script>
<style>
${inlineCss()}
</style>
</head>
<body>
<script>
${stage}
</script>
<script type="module">
import * as THREE from 'three';
${inlineSafe(bundle)}
mount(product);
</script>
</body>
</html>
`;
}

function lib(dirs) {
  const core = coreFiles();
  checkCollisions(core);
  const out = [];
  out.push(['lib/kaqua-3d-core.mjs',
    '/* K-Aqua 3D · Core — gebündeltes ES-Modul. Erzeugt, nicht handgepflegt.\n' +
    '   Quelle: core/. Alle Maße in Millimetern. */\n\n' +
    "import * as THREE from 'three';\n" + concat(core, { keepExports: true })]);

  /* Welche Namen ein Produkt aus dem Core importiert, wird aus den
     TATSÄCHLICHEN Core-Exporten abgeleitet und über ALLE Produktdateien
     gesucht — nicht nur index.js. Eine handgepflegte Wortliste hat hier
     zuerst gestanden und drei Fittings zerlegt, weil sie DRAFT und
     fusionDepth in params.js benutzen. */
  const coreExports = [...new Set(core.flatMap((f) =>
    [...f.src.matchAll(/^export\s+(?:function|const|let|class)\s+([\w$]+)/gm)]
      .map((m) => m[1])))];

  const entries = [];
  for (const dir of dirs) {
    const m = meta(dir);
    const files = productFiles(dir);
    checkCollisions(files);
    entries.push({ id: m.id, slug: basename(dir), module: m.module,
      titleDe: m.titleDe, titleEn: m.titleEn, category: m.category });
    const need = coreExports
      .filter((n) => files.some((f) => new RegExp('\\b' + n + '\\b').test(f.src)))
      .sort();
    out.push(['lib/products/' + basename(dir) + '.mjs',
      '/* K-Aqua 3D · ' + m.titleDe + ' — gebündeltes ES-Modul.\n' +
      '   Erzeugt, nicht handgepflegt. Produkt-ID ' + m.id + '.\n' +
      '   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */\n\n' +
      "import * as THREE from 'three';\n" +
      'import {\n  ' + need.join(', ') + " ,\n} from '../kaqua-3d-core.mjs';\n" +
      concat(files, { keepExports: true })]);
  }

  out.push(['lib/stage.js', rd('core', 'stage.js')]);
  out.push(['lib/registry.json', JSON.stringify(entries, null, 1)]);
  /* Die Registry auch als ES-Modul: ein Import aus einer .json verlangt im
     Browser `with { type: 'json' }`, und das versteht nicht jeder Bundler. */
  out.push(['lib/registry.mjs',
    '/* K-Aqua 3D — Produktliste. Erzeugt, nicht handgepflegt. */\n\n' +
    'export const REGISTRY = ' + JSON.stringify(entries, null, 1) + ';\n' +
    'export default REGISTRY;\n']);
  out.push(['lib/index.mjs',
`/* K-Aqua 3D — Sammeleinstieg.

   loadProduct(id) lädt ein Produktmodul erst, wenn es gebraucht wird.
   Bei fünfzehn Modellen macht das den Unterschied zwischen 40 kB und
   400 kB im initialen Bundle.

   Beispiel:
     import { mount, loadProduct } from '@kaqua/3d';
     const product = await loadProduct('fittings/cap');
     mount(product, { host: document.querySelector('#viewer') }); */

export * from './kaqua-3d-core.mjs';
export { REGISTRY } from './registry.mjs';

const LOADERS = {
${entries.map((e) => "  '" + e.id + "': () => import('./products/" + e.slug + ".mjs'),").join('\n')}
};

export const PRODUCT_IDS = Object.keys(LOADERS);

export async function loadProduct(id) {
  const load = LOADERS[id];
  if (!load) throw new Error('K-Aqua 3D: kein Modell für "' + id + '"');
  return (await load()).default;
}
`]);
  return out;
}

function allProducts() {
  const base = join(ROOT, 'products');
  return readdirSync(base)
    .filter((f) => statSync(join(base, f)).isDirectory() && existsSync(join(base, f, 'index.js')))
    .map((f) => 'products/' + f);
}

function write(rel, content) {
  const p = join(ROOT, 'dist', rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
  const kb = (Buffer.byteLength(content) / 1024).toFixed(0);
  console.log('  dist/' + rel.padEnd(46) + kb.padStart(6) + ' kB');
}

const args = process.argv.slice(2);
console.log('K-Aqua 3D · Build · three@' + THREE_VERSION + '\n');

if (args.includes('--lib')) {
  for (const [rel, src] of lib(allProducts())) write(rel, src);
} else {
  const dirs = args.includes('--all') ? allProducts() : args.filter((a) => !a.startsWith('--'));
  if (!dirs.length) {
    console.error('Kein Produkt angegeben. node build/bundle.mjs products/<slug> | --all | --lib');
    process.exit(1);
  }
  for (const dir of dirs) write(meta(dir).module + '.html', html(dir));
}
console.log('\nfertig.');
