/* K-Aqua 3D · Core — Overlay.

   Zwei Dinge:
     1. buildDimLines() — echte Maßlinien als Liniengeometrie im Modell,
        mit Pfeilspitzen und Maßhilfslinien. Das Produkt deklariert nur
        { label, value, a, b, off }.
     2. createOverlay() — die DOM-Ebene darüber: Teilebezeichnungen,
        Maßzahlen, Hotspots. Mit Kollisionsvermeidung: ein Label sucht
        sich eine freie Höhe, statt sich über ein anderes zu legen.

   Alle Koordinaten in Millimetern, im Raum des Modell-Roots. */

import * as THREE from 'three';

export function buildDimLines(dimSpecs, opt = {}) {
  const scale = opt.scale || 100;          // Bezugslänge für Pfeilgröße
  const color = opt.color ?? 0x0f172a;
  const group = new THREE.Group();
  group.name = 'Bemassung';
  group.visible = false;

  const lineMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.7 });
  const arrowMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.7 });
  const geos = [];
  const entries = [];

  const line = (a, b) => {
    const g = new THREE.BufferGeometry().setFromPoints([a, b]);
    geos.push(g);
    group.add(new THREE.Line(g, lineMat));
  };
  const arrow = (at, dir) => {
    const h = Math.max(1.6, 0.016 * scale);
    const g = new THREE.ConeGeometry(h * 0.34, h, 10);
    geos.push(g);
    const m = new THREE.Mesh(g, arrowMat);
    m.castShadow = false;
    m.receiveShadow = false;
    m.position.copy(at);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), dir.clone().normalize());
    m.position.add(dir.clone().normalize().multiplyScalar(-h / 2));
    group.add(m);
  };

  for (const spec of dimSpecs) {
    const A = spec.a.clone(), B = spec.b.clone();
    line(A, B);
    const dir = B.clone().sub(A).normalize();
    arrow(A, dir.clone().negate());
    arrow(B, dir);
    if (spec.off) {
      line(A, A.clone().add(spec.off));
      line(B, B.clone().add(spec.off));
    }
    entries.push({
      label: spec.label,
      value: spec.value,
      unit: spec.unit ?? 'mm',
      v: A.clone().add(B).multiplyScalar(0.5),
    });
  }

  return { group, entries, geos, materials: [lineMat, arrowMat] };
}

/* ── DOM-Ebene ── */
export function createOverlay({ box, ov, stage }) {
  const els = { parts: [], dims: [], hots: [] };
  const v3 = new THREE.Vector3();
  const camDir = new THREE.Vector3();

  function project(vec) {
    v3.copy(vec).project(stage.camera);
    return {
      x: (v3.x * 0.5 + 0.5) * box.clientWidth,
      y: (-v3.y * 0.5 + 0.5) * box.clientHeight,
      front: v3.z < 1,
    };
  }

  function build({ anchors, dimEntries, hotspots }) {
    ov.textContent = '';
    els.parts = (anchors || []).map((a) => {
      const el = document.createElement('div');
      el.className = 'lbl';
      el.textContent = a.label;
      ov.appendChild(el);
      return { el, a };
    });
    els.dims = (dimEntries || []).map((d) => {
      const el = document.createElement('div');
      el.className = 'dimlbl';
      el.textContent = d.label + ' = ' + String(d.value).replace('.', ',') +
        (d.unit ? ' ' + d.unit : '');
      ov.appendChild(el);
      return { el, d };
    });
    els.hots = (hotspots || []).map((h) => {
      const wrap = document.createElement('div');
      wrap.className = 'hot';
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', h.text);
      const tip = document.createElement('span');
      tip.className = 'tip';
      tip.textContent = h.text;
      wrap.append(b, tip);
      ov.appendChild(wrap);
      return { el: wrap, h };
    });
  }

  /* state: { modelRoot, explode, section, showDims, dimGroup, avoid[],
             isoAzimuth } */
  function update(state) {
    const showParts = state.explode >= 0.15;
    const taken = [];
    const br = box.getBoundingClientRect();
    for (const el of state.avoid || []) {
      if (!el || !el.offsetParent) continue;
      const pr = el.getBoundingClientRect();
      taken.push({ l: pr.left - br.left - 8, t: pr.top - br.top - 8,
        r: pr.right - br.left + 8, b: pr.bottom - br.top + 8 });
    }

    for (const { el, a } of els.parts) {
      if (!showParts) { el.classList.remove('on'); continue; }
      const p = project(a.obj.localToWorld(a.v.clone()));
      const w = el.offsetWidth, h = el.offsetHeight;
      const H = box.clientHeight;
      let y = Math.max(h / 2 + 6, Math.min(H - h / 2 - 6, p.y));
      let fits = false;
      const hits = (yy) => {
        const b = { l: p.x - w / 2 - 5, t: yy - h / 2 - 4, r: p.x + w / 2 + 5, b: yy + h / 2 + 4 };
        return taken.some((q) => b.l < q.r && b.r > q.l && b.t < q.b && b.b > q.t) ? null : b;
      };
      let rect = null;
      // freie Höhe suchen statt Label wegzulassen
      for (const dy of [0, -(h + 8), h + 8, -2 * (h + 8), 2 * (h + 8), -3 * (h + 8), 3 * (h + 8)]) {
        const yy = Math.max(h / 2 + 6, Math.min(H - h / 2 - 6, y + dy));
        rect = hits(yy);
        if (rect) { y = yy; fits = true; break; }
      }
      el.style.transform = 'translate(-50%,-50%) translate(' +
        p.x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
      const on = p.front && fits;
      el.classList.toggle('on', on);
      if (on) taken.push(rect);
    }

    // Maßlinien beziehen sich auf den montierten Zustand und die
    // Bemaßungsansicht — schräg von hinten stimmen sie nicht.
    const az = stage.azimuthDeg;
    let dAz = Math.abs(az - (state.isoAzimuth ?? -32)) % 360;
    if (dAz > 180) dAz = 360 - dAz;
    const showDims = state.showDims && dAz <= 40 && state.explode < 0.05;
    if (state.dimGroup) state.dimGroup.visible = showDims;
    for (const { el, d } of els.dims) {
      if (!showDims) { el.classList.remove('on'); continue; }
      const p = project(state.modelRoot.localToWorld(d.v.clone()));
      el.style.transform = 'translate(-50%,-50%) translate(' +
        p.x.toFixed(1) + 'px,' + p.y.toFixed(1) + 'px)';
      el.classList.add('on');
    }

    stage.camera.getWorldDirection(camDir);
    const showHot = state.explode < 0.05 && !state.section;
    for (const { el, h } of els.hots) {
      const facing = !h.n || h.n.dot(camDir) < -0.12;
      if (!showHot || !facing) { el.style.display = 'none'; continue; }
      const p = project(state.modelRoot.localToWorld((h.v || h.pos).clone()));
      el.style.display = p.front ? 'block' : 'none';
      el.style.transform = 'translate(-50%,-50%) translate(' +
        p.x.toFixed(1) + 'px,' + p.y.toFixed(1) + 'px)';
    }
  }

  return { build, update, project };
}
