/* K-Aqua 3D — Gestaltmessung in Node (Spur A des AUFTRAG.md).

   Lädt ein Produktmodul aus dist/lib/products/, baut das Modell OHNE
   Browser (three rechnet Geometrie ohne WebGL; das einzige DOM-Stück,
   die Canvas-Rauschtextur, wird gestubbt) und rechnet die drei
   messbaren Ersatzprüfungen aus 20-VISUELLE-REFERENZ.md §6:

     1. Silhouette in 5°-Kübeln über ein Achsband — Spanne 0 heißt
        Kreis, Spanne > 0 heißt Kanten (fand den unsichtbaren Sechskant,
        Fall 11).
     2. Kennzahlen des Modells (Boxmaße, Maßsatz) für die
        Verhältnisprüfung gegen das Foto.
     3. Teile- und Werkstoffliste gegen das, was das Foto zeigt.

   Sehen liefert Verdachte; DIESE Zahlen entscheiden.

   Aufruf:
     node scripts/messe-gestalt.mjs <slug> [groesse] [achse:von:bis ...]
     node scripts/messe-gestalt.mjs socket 32 x:36:41 x:2:6

   Achsband „x:36:41" heißt: alle Netzpunkte mit 36 <= x <= 41, Radius
   um die X-Achse. Ohne Bandangabe werden Silhouetten je Teil über das
   mittlere Drittel jeder Achse gerechnet. */

globalThis.document = { createElement: () => ({ width: 0, height: 0,
  getContext: () => ({
    createImageData: (w, h) => ({ data: new Uint8ClampedArray(w * h * 4), width: w, height: h }),
    putImageData: () => {},
  }) }) };
globalThis.window = globalThis;

const THREE = await import('three');
const [slug, groesseArg, ...baender] = process.argv.slice(2);
if (!slug) { console.error('Aufruf: node scripts/messe-gestalt.mjs <slug> [groesse] [achse:von:bis ...]'); process.exit(2); }

const mod = await import(new URL('../kaqua-3d/dist/lib/products/' + slug + '.mjs', import.meta.url));
const produkt = mod.default;
const groesse = groesseArg ?? String(produkt.defaultSize ?? produkt.sizes[0]);
const size = produkt.sizes.find((s) => String(s) === String(groesse));
if (size === undefined) { console.error('Größe ' + groesse + ' nicht in [' + produkt.sizes.join(', ') + ']'); process.exit(2); }

const A = produkt.build(size, produkt.variants && produkt.variants[0] ? produkt.variants[0].key : null, null);
A.root.updateMatrixWorld(true);

/* Alle Netzpunkte eines Objekts in Weltkoordinaten einsammeln. */
function punkteVon(obj) {
  const out = [];
  const v = new THREE.Vector3();
  obj.traverse((o) => {
    if (!o.isMesh || !o.visible) return;
    const pos = o.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).applyMatrix4(o.matrixWorld);
      out.push(v.x, v.y, v.z);
    }
  });
  return out;
}

/* Silhouette: 72 Kübel à 5° um die Achse, Maximalradius je Kübel. */
function silhouette(pts, achse, von, bis) {
  const K = 72, kub = new Array(K).fill(0);
  let n = 0;
  for (let i = 0; i < pts.length; i += 3) {
    const [x, y, z] = [pts[i], pts[i + 1], pts[i + 2]];
    const a = achse === 'x' ? x : achse === 'y' ? y : z;
    if (a < von || a > bis) continue;
    const [u, w] = achse === 'x' ? [y, z] : achse === 'y' ? [x, z] : [x, y];
    const r = Math.hypot(u, w);
    const k = Math.floor(((Math.atan2(w, u) + Math.PI) / (2 * Math.PI)) * K) % K;
    if (r > kub[k]) kub[k] = r;
    n++;
  }
  const voll = kub.filter((r) => r > 0);
  if (!voll.length) return { n: 0 };
  const max = Math.max(...voll), min = Math.min(...voll);
  return { n, kuebel: voll.length, rMax: r3(max), rMin: r3(min),
           spanne: r3(max - min), spannePct: r3((max / min - 1) * 100) };
}

const r3 = (v) => Math.round(v * 1000) / 1000;
const r2 = (v) => Math.round(v * 100) / 100;

console.log('# ' + produkt.id + ' · Größe ' + groesse);

/* Teile und Werkstoffe */
console.log('\n## Teile (' + A.parts.length + ')');
for (const p of A.parts) {
  const box = new THREE.Box3().setFromObject(p.obj);
  const d = box.getSize(new THREE.Vector3());
  console.log('  ' + p.id.padEnd(14) + (p.label || '').padEnd(44) +
    ' Box ' + r2(d.x) + ' × ' + r2(d.y) + ' × ' + r2(d.z));
}

/* Maßsatz */
console.log('\n## Maßsatz');
for (const m of A.measures || []) {
  const ist = m.ist();
  console.log('  ' + String(m.key).padEnd(10) + 'soll ' + String(m.soll).padEnd(9) +
    'ist ' + String(r2(ist)).padEnd(9) + 'Δ ' + r2(ist - m.soll));
}

/* Gesamtbox — für Verhältnisse gegen das Foto */
const gesamt = new THREE.Box3().setFromObject(A.root);
const g = gesamt.getSize(new THREE.Vector3());
console.log('\n## Gesamtbox  ' + r2(g.x) + ' × ' + r2(g.y) + ' × ' + r2(g.z) +
  '   (Verhältnisse x/y ' + r2(g.x / g.y) + ' · x/z ' + r2(g.x / g.z) + ' · y/z ' + r2(g.y / g.z) + ')');

/* Silhouetten */
console.log('\n## Silhouette (5°-Kübel; Spanne 0 = Kreis, > 0 = Kanten)');
const alle = punkteVon(A.root);
const wunsch = baender.length
  ? baender.map((b) => { const [a, v, w] = b.split(':'); return { achse: a, von: +v, bis: +w, name: b }; })
  : ['x', 'y'].map((a) => {
      const lo = gesamt.min[a], hi = gesamt.max[a], drittel = (hi - lo) / 3;
      return { achse: a, von: lo + drittel, bis: hi - drittel, name: a + ':mittleres Drittel' };
    });
for (const b of wunsch) {
  const s = silhouette(alle, b.achse, b.von, b.bis);
  console.log('  ' + b.name.padEnd(24) + (s.n
    ? 'Punkte ' + String(s.n).padEnd(8) + 'rMax ' + s.rMax + '  rMin ' + s.rMin +
      '  Spanne ' + s.spanne + ' mm (' + s.spannePct + ' %)'
    : 'LEER — kein Netzpunkt im Band (dort liegt kein Profilpunkt)'));
}

const tc = A.triangleCount();
console.log('\n' + tc.tris.toLocaleString('de-DE') + ' Dreiecke · ' + tc.meshes + ' Meshes');
A.dispose && A.dispose();
