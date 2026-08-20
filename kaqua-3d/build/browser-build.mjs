const CORE_ORDER = ['geometry.js','materials.js','assembly.js','overlay.js','ui.js','viewer.js','export.js'];
const PRODUCT_ORDER = ['data.js','params.js','parts.js','index.js'];
/* Die Rohrfamilie teilt params/parts über products/_pipe/. Beim
   Verketten kommen die vor den Produktdateien; die dünnen Hüllen im
   Produkt (export { buildTube } from '../_pipe/parts.js') fallen durch
   den Import-Stripper weg und lösen sich damit auf die Familienfunktion
   auf. Reine Fachlogik, kein Produktcode — deshalb einmal pro Bundle. */
const FAMILY = {
  pipe: ['_pipe/params.js', '_pipe/parts.js'],
  bend: ['_bend/params.js', '_bend/parts.js'],
  tee: ['_tee/params.js', '_tee/parts.js'],
};
function familyFor(slug) {
  if (/^elbow-/.test(slug)) return FAMILY.bend;
  if (slug === 'tee') return FAMILY.tee;
  if (slug === 'cross') return [];
  // Die Dichtung für Verschraubungen teilt die Kontur der einfachen.
  if (slug === 'flat-gasket-for-unions') return ['flat-gasket/parts.js'];
  if (/pipe/.test(slug)) return FAMILY.pipe;
  return [];
}
const IMPORT_RE = /^import\s+(?:\*\s+as\s+[\w$]+|[\w$]+|\{[\s\S]*?\})\s+from\s+'[^']+';[ \t]*\r?\n/gm;
const inlineSafe = (s) => s.replace(/<\/script/gi, '<\\/script');
/* keep = true: Exporte stehen lassen (Bibliotheksbau, echte ES-Module).
   keep = false: alles zu einem flachen Skript verketten (Standalone-HTML). */
function strip(src, keep) {
  let s = src.replace(IMPORT_RE, '');
  s = s.replace(/^export\s+\*\s+from\s+'[^']+';[ \t]*\r?\n/gm, '');
  s = s.replace(/^export\s+default\s+([\w$]+);[ \t]*\r?\n/gm,
    keep ? 'export { $1 as default };\n' : '');
  if (keep) return s.replace(/^export\s*\{[^}]*\}\s*from\s*'[^']+'\s*;[ \t]*\r?\n/gm, '').trim() + '\n';
  s = s.replace(/^export\s*\{[^}]*\}\s*(?:from\s*'[^']+')?\s*;[ \t]*\r?\n/gm, '');
  return s.replace(/^export\s+(?=(const|let|var|function|class|async)\b)/gm, '').trim() + '\n';
}
function checkCollisions(files) {
  const seen = new Map(); const clash = [];
  const DECL = /^(?:export\s+)?(?:const|let|var|function|class|async function)\s+([\w$]+)/gm;
  for (const f of files) for (const m of f.src.matchAll(DECL)) {
    const id = m[1];
    if (seen.has(id)) clash.push(id + ': ' + seen.get(id) + ' + ' + f.name); else seen.set(id, f.name);
  }
  if (clash.length) throw new Error('Bezeichner doppelt:\n  ' + clash.join('\n  '));
}
const banner = (t) => '\n/* == ' + t + ' ' + '='.repeat(Math.max(2, 66 - t.length)) + ' */\n';

/* Galerie: mehrere Produkte in einer Datei. Jedes Produktpaket kommt in
   eine eigene IIFE — sonst kollidieren `product`, `params`, `article`
   und `ARTICLES` zwischen den Paketen. Der Core bleibt geteilt. */
function productIIFE(files, i) {
  const body = files.map((f) => banner(f.name) + strip(f.src)).join('\n');
  return 'const __p' + i + ' = (() => {\n' + body + '\nreturn product;\n})();\n';
}

/* ⚠ ZWEISTUFIGER GALERIEBAU ab etwa 20 Modellen.

   Das Strippen von 21 Produktpaketen (84 Dateien) plus Core plus
   Font-base64 überschreitet das Zeitbudget der Bauumgebung. Drei
   Zwischenstände liegen deshalb als Cache im build/-Ordner:

     tokens-inlined.css     CSS mit den vier Fonts als base64
     core-stripped.js       Core, verkettet und von Importen befreit
     prod-a.js / prod-b.js  die Produktpakete, in zwei Hälften

   Ändert sich eine Core- oder Produktquelle, muss der betroffene Cache
   neu erzeugt werden — sonst baut die Galerie einen alten Stand. Die
   Erzeugung steht im Transkript und läuft je Hälfte unter 30 s.

   ⚠ buildGallery, buildLib und build NIE im selben Aufruf ausführen.
   Zusammen überschreiten sie das Zeitbudget der Bauumgebung, und ein
   Timeout verwirft ALLE Schreibvorgänge — die Erfolgsmeldung des
   ersten Schritts erscheint aber trotzdem. Genau so ist die Galerie
   einmal zwei Produkte hinterhergeblieben, während das Log einen
   gelungenen Bau meldete. Jeden Schritt einzeln aufrufen und danach
   die Dateiliste prüfen.

   Und: buildLib immer über die VOLLE Produktliste. Die drei Dateien
   index.mjs, registry.mjs und registry.json sind Indizes — mit einer
   Teilliste schrumpfen sie auf dieses eine Produkt. */

/* ── Bibliotheksexport für die Integration in eine bestehende Seite ──

   Erzeugt echte ES-Module unter dist/lib/, die ein Bundler auflösen kann:

     lib/kaqua-3d-core.mjs        Core, einmal
     lib/products/<slug>.mjs      je Produkt, importiert den Core
     lib/stage.js                 die Web-Component
     lib/registry.json            Produktliste als Daten
     lib/index.mjs                Sammeleinstieg mit lazy-Ladefunktion

   Anders als die Standalone-HTML behalten diese Dateien ihre Exporte und
   Importe. Der Aufrufer bringt three.js selbst mit — als bare specifier
   'three', damit npm-Auflösung und Importmap beide funktionieren. */
export async function buildLib(slugs, io) {
  const { readFile, saveFile, log } = io;
  const core = [];
  for (const f of CORE_ORDER) core.push({ name: 'core/' + f, src: await readFile('kaqua-3d/core/' + f) });
  checkCollisions(core);

  await saveFile('kaqua-3d/dist/lib/kaqua-3d-core.mjs',
    `/* K-Aqua 3D · Core — gebündeltes ES-Modul. Erzeugt, nicht handgepflegt.\n` +
    `   Quelle: kaqua-3d/core/. Alle Maße in Millimetern. */\n\n` +
    "import * as THREE from 'three';\n" +
    core.map((f) => banner(f.name) + strip(f.src, true)).join('\n'));

  /* Die Exportnamen des Core-Bündels — die einzige verlässliche Quelle
     dafür, was ein Produkt importieren darf. */
  const coreExports = [...new Set(core.flatMap((f) =>
    [...f.src.matchAll(/^export\s+(?:function|const|let|class)\s+([\w$]+)/gm)].map((m) => m[1])))];

  const entries = [];
  for (const slug of slugs) {
    const files = [];
    for (const f of familyFor(slug)) files.push({ name: f, src: await readFile('kaqua-3d/products/' + f) });
    for (const f of PRODUCT_ORDER) files.push({ name: slug + '/' + f, src: await readFile('kaqua-3d/products/' + slug + '/' + f) });
    checkCollisions(files);
    const idx = files.find((f) => f.name.endsWith('/index.js')).src;
    const pick = (k) => (idx.match(new RegExp('^\\s*' + k + ":\\s*'([^']*)'", 'm')) || [])[1];
    const id = pick('id');
    entries.push({ id, slug, module: pick('module'), titleDe: pick('titleDe'),
      titleEn: pick('titleEn'), category: pick('category') });

    /* Der Core wird importiert, nicht mitkopiert — sonst hätte jedes
       Produkt seine eigene Materialregistry und die Farbkorrektur wäre
       nicht mehr eine Zeile.

       Welche Namen importiert werden, wird aus den TATSÄCHLICHEN
       Core-Exporten abgeleitet und über ALLE Produktdateien gesucht.
       Eine handgepflegte Wortliste hat hier zuerst gestanden und drei
       Fittings zerlegt, weil sie DRAFT und fusionDepth in params.js
       benutzen, nicht in index.js. */
    const need = coreExports.filter((name) =>
      files.some((f) => new RegExp('\\b' + name + '\\b').test(f.src)));
    const imports = need.sort();

    await saveFile('kaqua-3d/dist/lib/products/' + slug + '.mjs',
      `/* K-Aqua 3D · ${pick('titleDe')} — gebündeltes ES-Modul.\n` +
      `   Erzeugt, nicht handgepflegt. Produkt-ID ${id}.\n` +
      `   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */\n\n` +
      "import * as THREE from 'three';\n" +
      'import {\n  ' + imports.join(', ') + ",\n} from '../kaqua-3d-core.mjs';\n" +
      files.map((f) => banner(f.name) + strip(f.src, true)).join('\n'));
  }

  await saveFile('kaqua-3d/dist/lib/stage.js', await readFile('kaqua-3d/core/stage.js'));
  await saveFile('kaqua-3d/dist/lib/registry.json', JSON.stringify(entries, null, 1));
  /* Die Registry zusätzlich als ES-Modul. Ein `import … from './x.json'`
     verlangt im Browser das Attribut `with { type: 'json' }`, und das
     versteht nicht jeder Bundler — ein JS-Modul lädt überall. Die JSON
     bleibt daneben für Aufrufer, die reine Daten wollen. */
  await saveFile('kaqua-3d/dist/lib/registry.mjs',
    '/* K-Aqua 3D — Produktliste. Erzeugt, nicht handgepflegt. */\n\n' +
    'export const REGISTRY = ' + JSON.stringify(entries, null, 1) + ';\n' +
    'export default REGISTRY;\n');

  await saveFile('kaqua-3d/dist/lib/index.mjs',
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
${entries.map((e) => `  '${e.id}': () => import('./products/${e.slug}.mjs'),`).join('\n')}
};

export const PRODUCT_IDS = Object.keys(LOADERS);

export async function loadProduct(id) {
  const load = LOADERS[id];
  if (!load) throw new Error('K-Aqua 3D: kein Modell für "' + id + '"');
  return (await load()).default;
}
`);
  log('lib/: Core + ' + entries.length + ' Produkte + index.mjs + registry.json');
  return entries;
}

export async function buildGallery(slugs, io) {
  const { readFile, readFileBinary, saveFile, replaceText, log } = io;
  const shell = await makeShell(io);
  const core = [];
  for (const f of CORE_ORDER) core.push({ name: 'core/' + f, src: await readFile('kaqua-3d/core/' + f) });
  checkCollisions(core);

  /* Der gestrippte Core wird gecacht. Er ist bei jedem Galeriebau
     identisch, und ab etwa 20 Modellen reicht das Zeitbudget nicht mehr
     für Core-Strippen UND alle Produktpakete. Der Cache wird verworfen,
     sobald sich die Core-Quellen ändern — geprüft über die Gesamtlänge. */
  const coreRaw = core.map((f) => f.src).join('');
  const stamp = 'core-len:' + coreRaw.length;
  let coreOut = null;
  try {
    const cached = await readFile('kaqua-3d/build/core-stripped.js');
    if (cached.startsWith('/* ' + stamp + ' */')) coreOut = cached;
  } catch (e) { /* kein Cache vorhanden */ }
  if (!coreOut) {
    coreOut = '/* ' + stamp + ' */\n' +
      core.map((f) => banner(f.name) + strip(f.src)).join('\n');
    await saveFile('kaqua-3d/build/core-stripped.js', coreOut);
  }

  const parts = [coreOut];
  const ids = [];
  for (let i = 0; i < slugs.length; i++) {
    const files = [];
    for (const f of familyFor(slugs[i])) files.push({ name: f, src: await readFile('kaqua-3d/products/' + f) });
    for (const f of PRODUCT_ORDER) files.push({ name: slugs[i] + '/' + f, src: await readFile('kaqua-3d/products/' + slugs[i] + '/' + f) });
    checkCollisions(files);
    parts.push(productIIFE(files, i));
    ids.push('__p' + i);
  }
  parts.push('const PRODUCTS = Object.fromEntries([' + ids.join(', ') + '].map((p) => [p.id, p]));\n');
  for (const f of ['registry.js', 'index.js']) {
    parts.push(banner('gallery/' + f) + strip(await readFile('kaqua-3d/gallery/' + f)));
  }
  parts.push(`
document.head.insertAdjacentHTML('beforeend', '<style>' + GALLERY_CSS + '</style>');
mountGallery(document.body);
`);

  const out = shell({
    title: 'K-Aqua 3D — alle Produkte',
    description: 'Alle 71 Produkte des K-Aqua PP-R Rohrsystems, die fertigen als interaktives 3D-Modell.',
    bundle: inlineSafe(parts.join('\n')),
  });
  await saveFile('kaqua-3d/dist/kaqua-3d-galerie.html', out);
  log('kaqua-3d-galerie.html · ' + (out.length / 1024).toFixed(0) + ' kB · ' + slugs.length + ' Modelle');
}

async function makeShell(io) {
  const { readFile, readFileBinary, replaceText } = io;
  const b64 = async (p) => {
    const a = new Uint8Array(await (await readFileBinary(p)).arrayBuffer());
    let s = '';
    for (let i = 0; i < a.length; i += 0x8000) s += String.fromCharCode.apply(null, a.subarray(i, i + 0x8000));
    return btoa(s);
  };
  /* Gecachte Fassung mit eingebetteten Fonts. Sie bei jedem Aufruf neu
     zu base64 zu rechnen kostete mehrere Sekunden und ließ den
     Galeriebau ins Zeitbudget laufen. Neu erzeugen: siehe
     build/tokens-inlined.css im Kopfkommentar. */
  const css = await readFile('kaqua-3d/build/tokens-inlined.css');
  const importmap = (await readFile('kaqua-3d/build/importmap.json')).trim();
  let stage = await readFile('kaqua-3d/core/stage.js');
  const a0 = stage.indexOf('/* BEGIN USAGE */'), b0 = stage.indexOf('/* END USAGE */');
  stage = inlineSafe(a0 >= 0 && b0 > a0 ? stage.slice(0, a0) + stage.slice(b0 + 15) : stage);
  return ({ title, description, bundle }) => `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<script type="importmap">
${importmap}
</script>
<style>
${css}
</style>
</head>
<body>
<script>
${stage}
</script>
<script type="module">
import * as THREE from 'three';
${bundle}
</script>
</body>
</html>
`;
}

export async function build(slugs, io) {
  const { readFile, readFileBinary, saveFile, replaceText, log } = io;
  const b64 = async (p) => {
    const a = new Uint8Array(await (await readFileBinary(p)).arrayBuffer());
    let s = '';
    for (let i = 0; i < a.length; i += 0x8000) s += String.fromCharCode.apply(null, a.subarray(i, i + 0x8000));
    return btoa(s);
  };
  /* Gecachte Fassung mit eingebetteten Fonts. Sie bei jedem Aufruf neu
     zu base64 zu rechnen kostete mehrere Sekunden und ließ den
     Galeriebau ins Zeitbudget laufen. Neu erzeugen: siehe
     build/tokens-inlined.css im Kopfkommentar. */
  const css = await readFile('kaqua-3d/build/tokens-inlined.css');
  const importmap = (await readFile('kaqua-3d/build/importmap.json')).trim();
  let stage = await readFile('kaqua-3d/core/stage.js');
  const a0 = stage.indexOf('/* BEGIN USAGE */'), b0 = stage.indexOf('/* END USAGE */');
  stage = inlineSafe(a0 >= 0 && b0 > a0 ? stage.slice(0, a0) + stage.slice(b0 + 15) : stage);
  const core = [];
  for (const f of CORE_ORDER) core.push({ name: 'core/' + f, src: await readFile('kaqua-3d/core/' + f) });

  for (const slug of slugs) {
    const prod = [];
    for (const f of familyFor(slug)) prod.push({ name: f, src: await readFile('kaqua-3d/products/' + f) });
    for (const f of PRODUCT_ORDER) prod.push({ name: slug + '/' + f, src: await readFile('kaqua-3d/products/' + slug + '/' + f) });
    checkCollisions([...core, ...prod]);
    const src = prod.find((f) => f.name.endsWith('/index.js')).src;
    const pick = (k) => (src.match(new RegExp('^\\s*' + k + ":\\s*'([^']*)'", 'm')) || [])[1];
    const m = { module: pick('module'), titleDe: pick('titleDe'), titleEn: pick('titleEn') };
    const bundle = inlineSafe([...core, ...prod].map((f) => banner(f.name) + strip(f.src)).join('\n'));
    const out = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${m.titleDe} (${m.titleEn}) — K-Aqua 3D-Ansicht</title>
<meta name="description" content="Interaktive 3D-Ansicht: ${m.titleDe}. Nennweiten, Explosionsansicht, Halbschnitt, Bemaßung.">
<script type="importmap">
${importmap}
</script>
<style>
${css}
</style>
</head>
<body>
<script>
${stage}
</script>
<script type="module">
import * as THREE from 'three';
${bundle}
mount(product);
</script>
</body>
</html>
`;
    await saveFile('kaqua-3d/dist/' + m.module + '.html', out);
    log(m.module + '.html · ' + (out.length / 1024).toFixed(0) + ' kB');
  }
}
