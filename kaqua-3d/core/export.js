/* K-Aqua 3D · Core — Export (Teil 6).

   Regeln, die hier durchgesetzt werden:
     · GLB in Metern, Y-up — das erwarten glTF-Viewer und AR-Werkzeuge
     · OBJ in Millimetern — das erwarten CAD-Werkzeuge
     · Materialnamen = Schlüssel aus MAT, damit sie beim Reimport
       wiedererkennbar sind (macht materials() automatisch)
     · Standbilder mit transparentem Hintergrund, kein Boden, kein
       Gitter; der Kontaktschatten läuft im Alphakanal mit

   Die Web-Ansicht rechnet in Millimetern. Die Umrechnung passiert
   ausschließlich hier und im Viewer-Wrapper. */

import * as THREE from 'three';

const MM_TO_M = 0.001;

function wrapForExport(root, scale, name) {
  const g = new THREE.Group();
  g.name = name;
  g.scale.setScalar(scale);
  g.add(root);
  return g;
}

/* Baut eine Größe frisch auf, unabhängig von der Ansicht. */
function buildOne(product, size, variant) {
  const built = product.build(size, variant ?? (product.variants || [])[0] ?? null, null);
  built.setExplode(0);
  if (built.setOpen) built.setOpen(1);
  built.setSection(false);
  return built;
}

/* ── GLB: binäres glTF, Meter, Y-up ── */
export async function exportGLB(product, opt = {}) {
  const { GLTFExporter } = await import('three/addons/exporters/GLTFExporter.js');
  const size = opt.size ?? product.defaultSize;
  const built = buildOne(product, size, opt.variant);
  const a = product.articles.find((x) => x.d === size);
  const scene = wrapForExport(built.root, MM_TO_M,
    (product.module || 'kaqua') + '_d' + size + (a ? '_' + a.code : ''));
  scene.userData = {
    kaqua: {
      id: product.id, article: a ? a.code : null, size,
      unit: 'm', source: 'kaqua-3d core', title: product.titleDe,
    },
  };
  const buf = await new Promise((res, rej) =>
    new GLTFExporter().parse(scene, res, rej, { binary: true, onlyVisible: true }));
  built.dispose();
  return new Blob([buf], { type: 'model/gltf-binary' });
}

/* ── Alle Nennweiten als benannte Knoten in einer Datei ── */
export async function exportGLBAllSizes(product, opt = {}) {
  const { GLTFExporter } = await import('three/addons/exporters/GLTFExporter.js');
  const scene = new THREE.Group();
  scene.name = (product.module || 'kaqua') + '_alle_groessen';
  const builts = [];
  let x = 0;
  for (const d of product.sizes) {
    const built = buildOne(product, d, opt.variant);
    const a = product.articles.find((s) => s.d === d);
    const node = wrapForExport(built.root, MM_TO_M, 'd' + d + (a ? '_' + a.code : ''));
    const box = new THREE.Box3().setFromObject(node);
    node.position.x = x - box.min.x;
    x += (box.max.x - box.min.x) * 1.25;
    scene.add(node);
    builts.push(built);
  }
  const buf = await new Promise((res, rej) =>
    new GLTFExporter().parse(scene, res, rej, { binary: true, onlyVisible: true }));
  builts.forEach((b) => b.dispose());
  return new Blob([buf], { type: 'model/gltf-binary' });
}

/* ── OBJ + MTL: Wavefront, Millimeter ── */
export async function exportOBJ(product, opt = {}) {
  const { OBJExporter } = await import('three/addons/exporters/OBJExporter.js');
  const size = opt.size ?? product.defaultSize;
  const built = buildOne(product, size, opt.variant);
  const a = product.articles.find((x) => x.d === size);
  const base = (product.module || 'kaqua') + '-d' + size;
  const root = wrapForExport(built.root, 1, base); // Millimeter, keine Skalierung

  const mats = [];
  root.traverse((o) => {
    if (!o.isMesh || !o.visible) return;
    const list = Array.isArray(o.material) ? o.material : [o.material];
    for (const m of list) if (m && !mats.includes(m)) mats.push(m);
  });

  const header = '# K-Aqua 3D — ' + product.titleDe + '\n' +
    '# Produkt-ID: ' + product.id + '\n' +
    '# Artikel: ' + (a ? a.code : '—') + '   Nennmaß: d' + size + '\n' +
    '# Einheit: Millimeter\n' +
    'mtllib ' + base + '.mtl\n';
  const obj = header + new OBJExporter().parse(root);

  let mtl = '# K-Aqua 3D — Materialnamen sind die Schlüssel der Material-Registry\n';
  for (const m of mats) {
    const c = m.color || { r: 0.8, g: 0.8, b: 0.8 };
    const rough = typeof m.roughness === 'number' ? m.roughness : 0.5;
    mtl += '\nnewmtl ' + m.name +
      '\nKd ' + c.r.toFixed(4) + ' ' + c.g.toFixed(4) + ' ' + c.b.toFixed(4) +
      '\nKa 0 0 0' +
      '\nKs ' + (1 - rough).toFixed(3) + ' ' + (1 - rough).toFixed(3) + ' ' + (1 - rough).toFixed(3) +
      '\nNs ' + Math.round((1 - rough) * 900 + 8) +
      '\nd 1\nillum 2\n';
  }
  built.dispose();
  return { obj, mtl, basename: base };
}

/* ── Standbilder ──
   views: [{ name, az, el, dist, explode, section, w, h }]
   Rendert in die vorhandene Stage, stellt Größe und Zustand danach
   wieder her. Transparenter Hintergrund; der Bodenschatten bleibt im
   Alphakanal, weil das Ground-Mesh ein ShadowMaterial ist. */
export async function stills(app, views, opt = {}) {
  const stage = app.stage;
  const renderer = stage.renderer;
  const camera = stage.camera;
  const before = { w: renderer.domElement.width, h: renderer.domElement.height,
    dpr: renderer.getPixelRatio(), aspect: camera.aspect };
  const out = [];

  for (const v of views) {
    const w = v.w ?? opt.w ?? 1600;
    const h = v.h ?? opt.h ?? 1200;
    renderer.setPixelRatio(1);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    if (v.explode !== undefined) app.built.setExplode(v.explode);
    if (v.section !== undefined) app.built.setSection(v.section, v.section ? app.clip : null);
    stage.flyTo(v.az ?? -32, v.el ?? 18, v.dist ?? 1, 0);
    await new Promise((r) => requestAnimationFrame(r));
    renderer.render(stage.scene, camera);
    const blob = await new Promise((r) => renderer.domElement.toBlob(r, 'image/png'));
    out.push({ name: v.name, blob, w, h });
  }

  renderer.setPixelRatio(before.dpr);
  renderer.setSize(before.w / before.dpr, before.h / before.dpr, false);
  camera.aspect = before.aspect;
  camera.updateProjectionMatrix();
  return out;
}

/* Die Standardserie nach Teil 6. */
export const STILL_VIEWS = [
  { name: 'hero',      az: -32, el: 18, dist: 1,    w: 1600, h: 1200, explode: 0, section: false },
  { name: 'front',     az: 0,   el: 4,  dist: 1,    w: 1200, h: 900,  explode: 0, section: false },
  { name: 'top',       az: -8,  el: 62, dist: 1,    w: 1200, h: 900,  explode: 0, section: false },
  { name: 'section',   az: -36, el: 16, dist: 0.94, w: 1200, h: 900,  explode: 0, section: true },
  { name: 'explosion', az: -32, el: 18, dist: 1.18, w: 1600, h: 1200, explode: 1, section: false },
];

export function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
