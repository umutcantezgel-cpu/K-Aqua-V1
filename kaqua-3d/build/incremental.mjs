#!/usr/bin/env node
/* K-Aqua 3D — inkrementeller Bau.
   ══════════════════════════════════════════════════════════════════════

   Ersetzt build/bundle.mjs für den täglichen Gebrauch. Der Unterschied:
   dieses Skript strippt nur, was sich geändert hat, und legt die
   Zwischenstände als Cache ab. Bei 71 Produkten ist das der Unterschied
   zwischen Sekunden und Minuten.

   AUFRUF
     node build/incremental.mjs cache          Caches erneuern (nach Quelländerung)
     node build/incremental.mjs product <slug> ein Einzelviewer
     node build/incremental.mjs products      alle Einzelviewer
     node build/incremental.mjs gallery        Galerieseite
     node build/incremental.mjs lib            ES-Module für die Integration
     node build/incremental.mjs all            alles, in richtiger Reihenfolge
     node build/incremental.mjs check          prüft, ob Caches veraltet sind

   WARUM CACHES
     Das Verketten und Entkernen von 71 Produktpaketen (284 Dateien) plus
     Core plus Font-base64 dauert länger als das Zeitbudget mancher
     Umgebungen. Drei Zwischenstände nehmen die Arbeit vorweg:

       cache/tokens-inlined.css   Fonts als base64 im Stylesheet
       cache/core-stripped.js     Core, verkettet und importfrei
       cache/prod-<slug>.js       je Produkt eine IIFE

     Jeder Cache trägt einen Stempel aus der Quelllänge. `check` vergleicht
     ihn und nennt, was neu erzeugt werden muss.

   DIE FALLE, DIE DIESES SKRIPT VERMEIDET
     Läuft ein Bauschritt in ein Zeitlimit, verwirft die Umgebung alle
     Schreibvorgänge — die Erfolgsmeldung des ersten Teilschritts
     erscheint aber trotzdem. Deshalb macht dieses Skript pro Aufruf
     GENAU EINEN Schritt und schreibt am Ende, welche Dateien entstanden
     sind. Prüfe die Dateiliste, nicht die Logzeile.
   ══════════════════════════════════════════════════════════════════════ */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = join(ROOT, 'build', 'cache');

const CORE_ORDER = ['geometry.js', 'materials.js', 'assembly.js', 'overlay.js',
  'ui.js', 'viewer.js', 'export.js'];
const PRODUCT_ORDER = ['data.js', 'params.js', 'parts.js', 'index.js'];

/* Familienmodule: geteilte Fachlogik mehrerer Produkte. Sie werden VOR den
   Produktdateien verkettet; die dünnen Re-Export-Hüllen im Produkt fallen
   durch den Stripper weg und lösen sich damit auf die Familienfunktion auf. */
const FAMILY = {
  pipe: ['_pipe/params.js', '_pipe/parts.js'],
  bend: ['_bend/params.js', '_bend/parts.js'],
  tee:  ['_tee/params.js', '_tee/parts.js'],
  /* Die Gewinde-T-Stücke tragen den Durchgang des einfachen T-Stücks —
     deshalb _tee/parts.js, aber NICHT _tee/params.js: ihre Parametrik
     rechnet den Gewindeabzweig und steht in _teethread/params.js. */
  teethread: ['_tee/parts.js', '_teethread/params.js', '_teethread/parts.js',
    '_teethread/assembly.js'],
  union: ['_union/params.js', '_union/parts.js', '_union/assembly.js'],
  /* Kugelhähne teilen die INNEREIEN, nicht die Gehäuse: Kugel, zwei
     PTFE-Sitze, Spindel, O-Ringe. Der PP-Hahn ist eine Verschraubung
     mit zwei Überwurfmuttern, der Messinghahn ein einteiliger Korpus
     mit Stahlhebel — außen nichts gemeinsam, innen dasselbe Gerät. */
  ballvalve: ['_ballvalve/parts.js'],
  /* Anbohrsättel: der Sattelschnitt, die gemeinsame Quellendeutung,
     die Parametrik und die Baugruppe. Die Reihenfolge ist zwingend —
     params.js rechnet mit satteltiefe aus parts.js und liest die
     Rohrgruppen aus data-gemeinsam.js. */
  saddle: ['_saddle/parts.js', '_saddle/data-gemeinsam.js',
    '_saddle/params.js', '_saddle/assembly.js'],
  /* Überbögen: Parametrik, Sweep, Baugruppe. Die Bahn selbst steht als
     bridgePath im Core — sie ist reine Geometrie und gehört dorthin,
     wo bendPath steht. */
  crossover: ['_crossover/params.js', '_crossover/parts.js',
    '_crossover/assembly.js'],
  /* Winkel mit Gewindeschenkel: ungleiche Schenkel, ungleiche
     Außendurchmesser. _bend/params.js liefert die Grundrechnung,
     _bendthread/parts.js den Körper. _bend/parts.js gehört NICHT dazu —
     sein buildBend setzt gleiche Schenkel voraus und lag in diesen
     Bundles bis zum 24.08.2026 als toter Code. */
  bendthread: ['_bend/params.js', '_bendthread/parts.js'],
  /* Anschlussbogen und Wandscheibe: derselbe Körper wie bendthread,
     aber eigene Parametrik (die Tabelle heißt anders) und ein
     Messingring statt eines Zapfens. _bend/params.js gehört NICHT
     dazu — bendParams rechnet mit den Spalten des Winkels. */
  bracket: ['_bendthread/parts.js', '_bracket/params.js',
    '_bracket/parts.js', '_bracket/assembly.js'],
  /* Winkel Muffe/Spitzende, 45° und 90°. Derselbe Körper, aber ohne
     Messingteil — Schenkel B ist durchgehend Rohr. */
  femalemale: ['_bendthread/parts.js', '_femalemale/params.js',
    '_femalemale/assembly.js'],
};
function familyFor(slug) {
  if (/^elbow-90-male-thread$/.test(slug)) return FAMILY.bendthread;
  if (/^elbow-(?:wall-)?bracket-90-female-thread$/.test(slug)) return FAMILY.bracket;
  if (/^elbow-\d+-female-male$/.test(slug)) return FAMILY.femalemale;
  if (/^elbow-\d/.test(slug)) return FAMILY.bend;
  if (/^tee-\d+-(?:fe)?male-thread$/.test(slug)) return FAMILY.teethread;
  if (/^metal-union-/.test(slug)) return FAMILY.union;
  if (/ball-valve/.test(slug)) return FAMILY.ballvalve;
  if (/^weld-in-saddle/.test(slug)) return FAMILY.saddle;
  if (/^cross-over/.test(slug)) return FAMILY.crossover;
  if (slug === 'tee' || /reducing-tee/.test(slug)) return FAMILY.tee;
  if (slug === 'cross') return [];            // baut eigene Arme
  /* Die einzige Anleihe QUER durch den Katalog, keine Familie: die
     Dichtung für Verschraubungen teilt die Kontur der einfachen
     Flachdichtung. Ihre parts.js ist nur eine Re-Export-Hülle, und
     Hüllen strippt der Bau weg — ohne diese Zeile fehlt buildGasket
     im Bundle. build/browser-build.mjs führt die Regel seit jeher;
     hier fehlte sie, und das fiel erst beim Nachbau 24.08.2026 auf. */
  if (slug === 'flat-gasket-for-unions') return ['flat-gasket/parts.js'];
  if (/pipe/.test(slug)) return FAMILY.pipe;
  return [];
}

const rd = (...p) => readFileSync(join(ROOT, ...p), 'utf8');
const written = [];
function write(rel, content) {
  const p = join(ROOT, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, content);
  written.push(rel + '  (' + (Buffer.byteLength(content) / 1024).toFixed(0) + ' kB)');
}

/* ── Stripper ──────────────────────────────────────────────────────────
   keep = false: alles zu einem flachen Skript verketten (HTML, Galerie)
   keep = true:  Exporte stehen lassen (echte ES-Module für die Bibliothek)

   Die Re-Export-Hüllen (export { a } from './x.js') verschwinden IMMER:
   beim Verketten ist das Ziel schon im Bundle, beim Bibliotheksbau stünde
   sonst ein Import auf eine Datei, die es dort nicht gibt. */
const IMPORT_RE = /^import\s+(?:\*\s+as\s+[\w$]+|[\w$]+|\{[\s\S]*?\})\s+from\s+'[^']+';[ \t]*\r?\n/gm;
function strip(src, keep) {
  let s = src.replace(IMPORT_RE, '');
  s = s.replace(/^export\s+\*\s+from\s+'[^']+';[ \t]*\r?\n/gm, '');
  s = s.replace(/^export\s+default\s+([\w$]+);[ \t]*\r?\n/gm,
    keep ? 'export { $1 as default };\n' : '');
  s = s.replace(/^export\s*\{[^}]*\}\s*from\s*'[^']+'\s*;[ \t]*\r?\n/gm, '');
  if (!keep) s = s.replace(/^export\s+(?=(const|let|var|function|class|async)\b)/gm, '');
  return s.trim() + '\n';
}
const banner = (t) => '\n/* == ' + t + ' ' + '='.repeat(Math.max(2, 66 - t.length)) + ' */\n';
const inlineSafe = (s) => s.replace(/<\/script/gi, '<\\/script');

/* Ein wörtliches </script> im Usage-Kommentar der Stage würde den inline
   Block vorzeitig schließen. Der Block ist Dokumentation, im Bundle Ballast. */
function stageSource() {
  const src = rd('core', 'stage.js');
  const a = src.indexOf('/* BEGIN USAGE */');
  const b = src.indexOf('/* END USAGE */');
  return inlineSafe(a >= 0 && b > a ? src.slice(0, a) + src.slice(b + 15) : src);
}

/* ── Kollisionsprüfung ────────────────────────────────────────────────
   Zwei gleichnamige Deklarationen in einem verketteten Bundle laden nicht.
   Hat einmal aufgedeckt, dass ein Produkt noch eine eigene Fassung einer
   Funktion trug, die inzwischen im Familienmodul lag. */
function checkCollisions(files) {
  const seen = new Map(); const clash = [];
  const DECL = /^(?:export\s+)?(?:const|let|var|function|class|async function)\s+([\w$]+)/gm;
  for (const f of files)
    for (const m of f.src.matchAll(DECL)) {
      if (seen.has(m[1])) clash.push(m[1] + ': ' + seen.get(m[1]) + ' + ' + f.name);
      else seen.set(m[1], f.name);
    }
  if (clash.length) throw new Error('Bezeichner doppelt vergeben:\n  ' + clash.join('\n  '));
}

/* ── Produktliste ─────────────────────────────────────────────────────
   Aus dem Dateisystem, nicht aus einer Liste — dann kann sie nicht
   veralten. Ordner mit führendem _ sind Familienmodule. */
function allSlugs() {
  const base = join(ROOT, 'products');
  return readdirSync(base)
    .filter((f) => !f.startsWith('_') && statSync(join(base, f)).isDirectory()
      && existsSync(join(base, f, 'index.js')))
    .sort();
}

function productFiles(slug) {
  return [
    ...familyFor(slug).map((f) => ({ name: f, src: rd('products', f) })),
    ...PRODUCT_ORDER.map((f) => ({ name: slug + '/' + f, src: rd('products', slug, f) })),
  ];
}

/* Metadaten per NAME greifen, nicht per Position: die Familiendateien
   verschieben index.js im Array. Hat einmal 12 Dateien namens
   "undefined.html" erzeugt. */
function meta(slug) {
  const src = rd('products', slug, 'index.js');
  const pick = (k) => (src.match(new RegExp('^\\s*' + k + ":\\s*'([^']*)'", 'm')) || [])[1];
  return { slug, id: pick('id'), module: pick('module'), titleDe: pick('titleDe'),
    titleEn: pick('titleEn'), category: pick('category') };
}

const stampOf = (s) => 'len:' + s.length;
function cached(name, stamp) {
  const p = join(CACHE, name);
  if (!existsSync(p)) return null;
  const s = readFileSync(p, 'utf8');
  return s.startsWith('/* ' + stamp + ' */') ? s : null;
}

/* ── Schritt: Caches ──────────────────────────────────────────────────── */
function buildCache() {
  // Stylesheet mit eingebetteten Fonts
  let css = rd('assets', 'coday-tokens.css');
  const raw = css;
  css = css.replace(/url\('fonts\/([^']+)'\)/g, (_, f) =>
    "url('data:font/woff2;base64," +
    readFileSync(join(ROOT, 'assets', 'fonts', f)).toString('base64') + "')");
  write('build/cache/tokens-inlined.css', '/* ' + stampOf(raw) + ' */\n' + css);

  // Core
  const core = CORE_ORDER.map((f) => ({ name: 'core/' + f, src: rd('core', f) }));
  checkCollisions(core);
  write('build/cache/core-stripped.js',
    '/* ' + stampOf(core.map((f) => f.src).join('')) + ' */\n' +
    core.map((f) => banner(f.name) + strip(f.src, false)).join('\n'));

  // Produkte, je eine IIFE. Die Nummerierung entsteht erst beim
  // Galeriebau — deshalb hier ein Platzhalter __SELF__.
  for (const slug of allSlugs()) {
    const files = productFiles(slug);
    checkCollisions(files);
    write('build/cache/prod-' + slug + '.js',
      '/* ' + stampOf(files.map((f) => f.src).join('')) + ' */\n' +
      'const __SELF__ = (() => {\n' +
      files.map((f) => banner(f.name) + strip(f.src, false)).join('\n') +
      '\nreturn product;\n})();\n');
  }
}

/* ── Schritt: check ───────────────────────────────────────────────────── */
function checkCache() {
  const stale = [];
  if (!cached('tokens-inlined.css', stampOf(rd('assets', 'coday-tokens.css'))))
    stale.push('tokens-inlined.css');
  if (!cached('core-stripped.js',
      stampOf(CORE_ORDER.map((f) => rd('core', f)).join(''))))
    stale.push('core-stripped.js');
  for (const slug of allSlugs())
    if (!cached('prod-' + slug + '.js',
        stampOf(productFiles(slug).map((f) => f.src).join(''))))
      stale.push('prod-' + slug + '.js');

  if (!stale.length) { console.log('Alle Caches aktuell.'); return true; }
  console.log('VERALTET (' + stale.length + '):');
  stale.forEach((s) => console.log('  ' + s));
  console.log('\n→ node build/incremental.mjs cache');
  return false;
}

function shell({ title, description, body }) {
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<script type="importmap">
${rd('build', 'importmap.json').trim()}
</script>
<style>
${cached('tokens-inlined.css', stampOf(rd('assets', 'coday-tokens.css'))).replace(/^\/\*[^*]*\*\/\n/, '')}
</style>
</head>
<body>
<script>
${stageSource()}
</script>
<script type="module">
import * as THREE from 'three';
${body}
</script>
</body>
</html>
`;
}

function readCache(name, stamp, was) {
  const s = cached(name, stamp);
  if (!s) throw new Error('Cache veraltet oder fehlt: ' + name +
    ' (' + was + ')\n→ node build/incremental.mjs cache');
  return s.replace(/^\/\*[^*]*\*\/\n/, '');
}

/* ── Schritt: Einzelviewer ────────────────────────────────────────────── */
function buildProduct(slug) {
  const m = meta(slug);
  const core = readCache('core-stripped.js',
    stampOf(CORE_ORDER.map((f) => rd('core', f)).join('')), 'Core');
  const prod = readCache('prod-' + slug + '.js',
    stampOf(productFiles(slug).map((f) => f.src).join('')), slug)
    .replace('const __SELF__ = (() => {', '').replace(/\nreturn product;\n\}\)\(\);\n$/, '');
  write('dist/' + m.module + '.html', shell({
    title: m.titleDe + ' (' + m.titleEn + ') — K-Aqua 3D-Ansicht',
    description: 'Interaktive 3D-Ansicht: ' + m.titleDe +
      '. Nennweiten, Explosionsansicht, Halbschnitt, Bemaßung.',
    body: inlineSafe(core + '\n' + prod + '\nmount(product);\n'),
  }));
}

/* ── Schritt: Galerie ─────────────────────────────────────────────────── */
function buildGallery() {
  const slugs = allSlugs();
  const core = readCache('core-stripped.js',
    stampOf(CORE_ORDER.map((f) => rd('core', f)).join('')), 'Core');
  const parts = [core];
  const ids = [];
  slugs.forEach((slug, n) => {
    const body = readCache('prod-' + slug + '.js',
      stampOf(productFiles(slug).map((f) => f.src).join('')), slug);
    parts.push(body.replace('__SELF__', '__p' + n));
    ids.push('__p' + n);
  });
  parts.push('const PRODUCTS = Object.fromEntries([' + ids.join(', ') +
    '].map((p) => [p.id, p]));\n');
  for (const f of ['registry.js', 'index.js'])
    parts.push(banner('gallery/' + f) + strip(rd('gallery', f), false));
  parts.push("\ndocument.head.insertAdjacentHTML('beforeend', '<style>' + GALLERY_CSS + '</style>');\n" +
    'mountGallery(document.body);\n');

  write('dist/kaqua-3d-galerie.html', shell({
    title: 'K-Aqua 3D — alle Produkte',
    description: 'Alle 71 Produkte des K-Aqua PP-R Rohrsystems, die fertigen als interaktives 3D-Modell.',
    body: inlineSafe(parts.join('\n')),
  }));
  console.log('  ' + slugs.length + ' Modelle');
}

/* ── Schritt: Bibliothek ──────────────────────────────────────────────── */
function buildLib() {
  const core = CORE_ORDER.map((f) => ({ name: 'core/' + f, src: rd('core', f) }));
  checkCollisions(core);
  write('dist/lib/kaqua-3d-core.mjs',
    '/* K-Aqua 3D · Core — gebündeltes ES-Modul. Erzeugt, nicht handgepflegt.\n' +
    '   Quelle: core/. Alle Maße in Millimetern. */\n\n' +
    "import * as THREE from 'three';\n" +
    core.map((f) => banner(f.name) + strip(f.src, true)).join('\n'));

  /* Welche Namen ein Produkt importiert, wird aus den TATSÄCHLICHEN
     Core-Exporten abgeleitet und über ALLE Produktdateien gesucht — nicht
     nur index.js. Eine handgepflegte Wortliste hat hier zuerst gestanden
     und drei Fittings zerlegt, weil sie DRAFT und fusionDepth in params.js
     benutzen. Tokenisieren statt RegExp-Tests: 30-mal schneller. */
  const coreEx = new Set();
  for (const f of core)
    for (const m of f.src.matchAll(/^export\s+(?:function|const|let|class)\s+([\w$]+)/gm))
      coreEx.add(m[1]);

  const entries = [];
  for (const slug of allSlugs()) {
    const m = meta(slug);
    const files = productFiles(slug);
    checkCollisions(files);
    entries.push(m);
    const used = new Set();
    for (const f of files)
      for (const t of f.src.match(/[A-Za-z_$][\w$]*/g) || [])
        if (coreEx.has(t)) used.add(t);
    write('dist/lib/products/' + slug + '.mjs',
      '/* K-Aqua 3D · ' + m.titleDe + ' — gebündeltes ES-Modul.\n' +
      '   Erzeugt, nicht handgepflegt. Produkt-ID ' + m.id + '.\n' +
      '   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */\n\n' +
      "import * as THREE from 'three';\nimport {\n  " +
      [...used].sort().join(', ') + ",\n} from '../kaqua-3d-core.mjs';\n" +
      files.map((f) => banner(f.name) + strip(f.src, true)).join('\n'));
  }

  write('dist/lib/stage.js', rd('core', 'stage.js'));
  write('dist/lib/registry.json', JSON.stringify(entries, null, 1));
  /* Auch als ES-Modul: ein Import aus einer .json verlangt im Browser
     `with { type: 'json' }`, und das versteht nicht jeder Bundler. */
  write('dist/lib/registry.mjs',
    '/* K-Aqua 3D — Produktliste. Erzeugt, nicht handgepflegt. */\n\n' +
    'export const REGISTRY = ' + JSON.stringify(entries, null, 1) + ';\n' +
    'export default REGISTRY;\n');
  write('dist/lib/index.mjs',
`/* K-Aqua 3D — Sammeleinstieg.

   loadProduct(id) lädt ein Produktmodul erst, wenn es gebraucht wird.
   Bei siebzig Modellen macht das den Unterschied zwischen 40 kB und
   1,5 MB im initialen Bundle.

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
`);
  console.log('  ' + entries.length + ' Produkte');
}

/* ── Einstieg ─────────────────────────────────────────────────────────── */
const [cmd, arg] = process.argv.slice(2);
console.log('K-Aqua 3D · inkrementeller Bau · ' + (cmd || '—') + '\n');

try {
  switch (cmd) {
    case 'cache':   buildCache(); break;
    case 'check':   process.exit(checkCache() ? 0 : 1); break;
    case 'product':
      if (!arg) throw new Error('Slug fehlt: node build/incremental.mjs product <slug>');
      buildProduct(arg); break;
    /* Alle Einzelseiten in einem Aufruf. dist/INTEGRATION.md nennt dieses
       Kommando seit jeher, es fehlte hier — ergänzt 24.08.2026. */
    case 'products': allSlugs().forEach(buildProduct); break;
    case 'gallery': buildGallery(); break;
    case 'lib':     buildLib(); break;
    case 'all':
      /* Reihenfolge zählt: Caches zuerst, Galerie zuletzt. */
      buildCache();
      allSlugs().forEach(buildProduct);
      buildLib();
      buildGallery();
      break;
    default:
      console.log('cache | check | product <slug> | products | gallery | lib | all');
      process.exit(1);
  }
} catch (e) {
  console.error('\nFEHLER: ' + e.message);
  process.exit(1);
}

console.log('\nGeschrieben (' + written.length + '):');
written.forEach((w) => console.log('  ' + w));
console.log('\n→ Prüfe DIESE Liste, nicht die Meldung darüber.');
