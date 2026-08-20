/* K-Aqua 3D · Core — Baugruppe.

   Die Mechanik, die jedes Produkt beim Zusammenbau braucht, damit im
   Produktpaket nur Konturen übrig bleiben:

     · Teil anlegen: Gruppe + Mesh + Schnittfläche + Spiegelung
     · Explosion: Versatzvektor je Teil, ein Regler
     · Schnitt: Clipping-Ebene auf alle Basismaterialien, Stencil-Caps ein
     · Prüfwerkzeuge: Silhouetten-/Graustufenmodus, Box3, axialer Raycast
     · dispose(): alles freigeben

   Maße in Millimetern. Die Skalierung auf Meter macht der Viewer —
   deshalb rechnet hier nichts mit 0.001. */

import * as THREE from 'three';
import { materials, disposeMaterials } from './materials.js';

const CAP_Z = 0.16; // mm — Schnittfläche minimal vor der Clipping-Ebene

export function createAssembly(opt = {}) {
  const M = materials(opt.materials || ['pprGreen'], opt.seed ?? 17);
  let plane = opt.clipPlane || null;
  const root = new THREE.Group();
  root.name = opt.name || 'kaqua_part';

  const geos = [];
  const caps = [];
  const groups = {};
  const parts = [];
  const anchors = [];
  const dims = [];
  const hotspots = [];
  const lights = [];
  const baseKeys = new Set();

  /* part(id, spec)
       label    Anzeigename (Explosionsansicht)
       mat      Materialschlüssel aus der Registry
       geo/cap  aus dem Produkt-parts.js
       parent   Elterngruppe (z. B. ein Rotor), Default root
       mirror   um Y drehen statt spiegeln — Normalen bleiben korrekt
       explode  Vector3 oder Zahl (= X), Versatz bei t = 1
       anchor   Vector3 für das Beschriftungslabel
       noExplodeEntry  aus parts weglassen (rein geometrische Hilfsteile) */
  function part(id, spec) {
    const g = new THREE.Group();
    g.name = spec.name || id;
    const mat = M[spec.mat];
    if (!mat) throw new Error('K-Aqua: Material "' + spec.mat + '" nicht angefordert (' + id + ')');
    baseKeys.add(spec.mat);
    const mesh = new THREE.Mesh(spec.geo, mat);
    mesh.name = g.name;
    g.add(mesh);
    geos.push(spec.geo);
    if (spec.cap) {
      const cap = new THREE.Mesh(spec.cap, M.caps[spec.mat]);
      cap.name = g.name + '_Schnitt';
      cap.position.z = spec.mirror ? CAP_Z : -CAP_Z;
      cap.visible = false;
      cap.castShadow = false;
      cap.receiveShadow = false;
      g.add(cap);
      caps.push(cap);
      geos.push(spec.cap);
    }
    if (spec.mirror) g.rotation.y = Math.PI;
    (spec.parent || root).add(g);
    groups[id] = g;

    const ex = spec.explode === undefined ? new THREE.Vector3()
      : typeof spec.explode === 'number' ? new THREE.Vector3(spec.explode, 0, 0)
      : spec.explode;
    if (!spec.noExplodeEntry) {
      parts.push({ id, label: spec.label || g.name, obj: g, explode: ex });
    }
    if (spec.anchor) anchors.push({ id, label: spec.label || g.name, obj: g, v: spec.anchor });
    return g;
  }

  function subgroup(name, parent) {
    const g = new THREE.Group();
    g.name = name;
    (parent || root).add(g);
    return g;
  }

  /* ── Prüfwerkzeuge ── */
  function baseMaterials() {
    return [...baseKeys].map((k) => M[k]).filter(Boolean);
  }

  /* Box3 nur über die SICHTBAREN Meshes eines Teils. Die normale
     boxOf() erfasst auch die Schnittflächen-Stencils: die sind
     visible = false, aber Box3.setFromObject traversiert die ganze
     Gruppe, und ein Stencil deckt die volle Profilausdehnung ab.

     Für Maße am Bauteil ist boxOf() richtig — der Stencil liegt in der
     Profilebene und ändert die Ausdehnung dort nicht. Für Prüfungen der
     LÄNGSaufteilung (welches Teil endet wo) verfälscht er das Ergebnis.
     Dann diese Fassung nehmen. */
  function visibleBoxOf(ids) {
    root.updateMatrixWorld(true);
    const box = new THREE.Box3();
    (ids || Object.keys(groups)).forEach((id) => {
      const g = groups[id];
      if (!g) return;
      g.traverse((o) => {
        if (o.isMesh && o.visible && !/_Schnitt$/.test(o.name)) {
          box.expandByObject(o);
        }
      });
    });
    return box;
  }

  function boxOf(ids) {
    root.updateMatrixWorld(true);
    const box = new THREE.Box3();
    (ids || Object.keys(groups)).forEach((id) => {
      if (groups[id]) box.union(new THREE.Box3().setFromObject(groups[id]));
    });
    return box;
  }

  /* Axialer Raycast: von außen auf ein Teil schießen und die erste
     Trefferkoordinate liefern. Für Muffentiefen, Bohrungsgründe,
     Gewindeanfänge — jedes Muffenprodukt braucht das. */
  function probeAxial(id, from, dir) {
    root.updateMatrixWorld(true);
    const g = groups[id];
    if (!g) return NaN;
    const rc = new THREE.Raycaster();
    rc.set(from.clone(), dir.clone().normalize());
    const hit = rc.intersectObject(g, true)[0];
    return hit ? hit.point : null;
  }

  function triangleCount() {
    let tris = 0, meshes = 0;
    root.traverse((o) => {
      if (o.isMesh && o.visible) {
        meshes++;
        const g = o.geometry;
        tris += (g.index ? g.index.count : g.attributes.position.count) / 3;
      }
    });
    return { tris: Math.round(tris), meshes };
  }

  function setTestMode(mode) {
    baseMaterials().forEach((m) => {
      if (m.userData.orig === undefined) {
        m.userData.orig = {
          color: m.color.getHex(), rough: m.roughness,
          cc: m.clearcoat ?? 0, mt: m.metalness,
        };
      }
      const o = m.userData.orig;
      if (mode === 'silhouette') {
        m.color.setHex(0xffffff); m.roughness = 1; m.metalness = 0;
        if ('clearcoat' in m) m.clearcoat = 0;
      } else if (mode === 'gray') {
        const c = new THREE.Color(o.color);
        const l = 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
        m.color.setRGB(l, l, l); m.roughness = o.rough; m.metalness = o.mt;
        if ('clearcoat' in m) m.clearcoat = o.cc;
      } else {
        m.color.setHex(o.color); m.roughness = o.rough; m.metalness = o.mt;
        if ('clearcoat' in m) m.clearcoat = o.cc;
      }
    });
  }

  const api = {
    root, M, part, subgroup, groups, parts, anchors, dims, hotspots, lights,
    geos, boxOf, visibleBoxOf, probeAxial, triangleCount, setTestMode,

    dim(spec)     { dims.push(spec); return api; },
    hotspot(spec) { hotspots.push(spec); return api; },
    light(v)      { lights.push(v); return api; },
    /* Geometrien, die nicht über part() laufen (Maßlinien, Hilfsnetze) */
    own(...g)     { geos.push(...g); return api; },

    explode: 0,
    section: false,

    setExplode(t) {
      api.explode = t;
      for (const p of parts) {
        p.obj.position.set(p.explode.x * t, p.explode.y * t, p.explode.z * t);
      }
      if (api.onExplode) api.onExplode(t);
    },

    setSection(on, clipPlane) {
      api.section = on;
      if (clipPlane !== undefined) plane = clipPlane;
      const planes = on && plane ? [plane] : [];
      baseMaterials().forEach((m) => {
        m.clippingPlanes = planes;
        m.clipShadows = true;
        m.side = on ? THREE.DoubleSide : THREE.FrontSide;
        m.needsUpdate = true; // NUM_CLIPPING_PLANES ändert sich → Shader neu bauen
      });
      caps.forEach((c) => (c.visible = on));
    },

    dispose() {
      geos.forEach((g) => g && g.dispose());
      disposeMaterials(M);
    },
  };
  return api;
}
