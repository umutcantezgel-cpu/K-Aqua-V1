/* K-Aqua 3D · Core — Geometrie.
   Produktneutral: kein Bezeichner, der an ein bestimmtes Bauteil gebunden ist.

   Grundtechnik: 2D-Punktprofil -> Rotationskörper (eigener Lathe mit
   radialer Modulation für Riffel/Rippen), Loft für Querschnittsfolgen,
   Sweep für Bahnen. Kein CSG: jede Bohrung ist Teil der geschlossenen
   Profilkontur.

   Alle Maße in Millimetern. Die Skalierung auf Meter macht der Viewer.

   Kernzusage dieses Moduls (Teil 7): jede Ecke bekommt Radius ODER Fase,
   Minimum 0,3 mm, und achsparallele Außenflächen tragen 1°
   Entformungsschräge. Das ist Core-Verhalten, keine Produktentscheidung. */

import * as THREE from 'three';

export const D2R = Math.PI / 180;
export const DRAFT = Math.tan(1 * D2R); // 1° Entformungsschräge

/* Segmentzahlen nach Teil 7. Standen bisher als lokale Konstanten im
   Produktcode — gehören in den Core, sonst driftet die Facettierung
   über 71 Produkte auseinander. */
export const SEG_VIS = 96;  // Sichtteile
export const SEG_INT = 40;  // Innenteile
export const SEG_FINE = 28; // Kleinteile (Auswerfermarken, Bohrungsfasen)

/* ─────────────────── 2D-Profil-Helper ───────────────────
   Punkt: { a, r, fillet?, chamfer?, w?, wear? }
     a       Koordinate entlang der Rotationsachse
     r       Radius
     fillet  Kantenradius an diesem Eckpunkt (Default aus opt)
     chamfer Fase (wird zu zwei Punkten expandiert)
     w       Gewicht für die radiale Modulation (Riffel/Rippen)
     wear    1 = Kante (Politur durch Handhabung, Shader-Maske)
   Jeder Eckpunkt bekommt Radius ODER Fase — es gibt an einem
   Spritzgussteil keine mathematisch scharfe Kante.               */

const sub = (p, q) => ({ a: p.a - q.a, r: p.r - q.r });
const nrm = (v) => {
  const l = Math.hypot(v.a, v.r) || 1;
  return { a: v.a / l, r: v.r / l };
};
const dist = (p, q) => Math.hypot(p.a - q.a, p.r - q.r);

export function dedupe(pts) {
  const out = [];
  for (const p of pts) {
    const q = out[out.length - 1];
    if (!q || dist(p, q) > 1e-4) out.push(Object.assign({}, p));
    else Object.assign(q, { fillet: p.fillet ?? q.fillet, chamfer: p.chamfer ?? q.chamfer });
  }
  return out;
}

export function expandChamfers(pts, closed) {
  const n = pts.length;
  const out = [];
  for (let i = 0; i < n; i++) {
    const p = pts[i];
    const prev = pts[(i - 1 + n) % n];
    const next = pts[(i + 1) % n];
    const c = p.chamfer;
    if (!c || c <= 0 || (!closed && (i === 0 || i === n - 1))) {
      out.push(p);
      continue;
    }
    const v1 = nrm(sub(prev, p));
    const v2 = nrm(sub(next, p));
    const c1 = Math.min(c, dist(prev, p) * 0.45);
    const c2 = Math.min(c, dist(next, p) * 0.45);
    const mk = (v, cc) => ({
      a: p.a + v.a * cc,
      r: p.r + v.r * cc,
      fillet: Math.min(0.22, c * 0.3),
      w: p.w,
      wear: 1,
    });
    out.push(mk(v1, c1), mk(v2, c2));
  }
  return out;
}

/* Verrundet jede Ecke; emittiert IMMER segs+1 Punkte pro verrundeter
   Ecke, damit Loft-Sektionen konstante Punktzahl behalten. */
export function applyFillets(pts, closed, def, segs) {
  const n = pts.length;
  const out = [];
  const push = (p) => out.push(p);
  for (let i = 0; i < n; i++) {
    const P1 = pts[i];
    if (!closed && (i === 0 || i === n - 1)) {
      push(P1);
      continue;
    }
    const P0 = pts[(i - 1 + n) % n];
    const P2 = pts[(i + 1) % n];
    let R = P1.fillet ?? def;
    const l1 = dist(P0, P1);
    const l2 = dist(P1, P2);
    const v1 = nrm(sub(P0, P1));
    const v2 = nrm(sub(P2, P1));
    const dot = Math.max(-1, Math.min(1, v1.a * v2.a + v1.r * v2.r));
    const phi = Math.acos(dot);
    const wcarry = { w: P1.w, wear: 1 };
    const sg = P1.segs ?? segs;
    if (R <= 0 || phi < 0.02 || phi > Math.PI - 0.02 || l1 < 1e-4 || l2 < 1e-4) {
      // keine sinnvolle Verrundung möglich -> Punktzahl konstant halten
      const k = R <= 0 ? 1 : sg + 1;
      for (let s = 0; s < k; s++) push(Object.assign({}, P1, s ? wcarry : null));
      continue;
    }
    const half = phi / 2;
    let t = R / Math.tan(half);
    const tmax = Math.min(l1, l2) * 0.45;
    if (t > tmax) {
      t = tmax;
      R = t * Math.tan(half);
    }
    const T1 = { a: P1.a + v1.a * t, r: P1.r + v1.r * t };
    const T2 = { a: P1.a + v2.a * t, r: P1.r + v2.r * t };
    const bis = nrm({ a: v1.a + v2.a, r: v1.r + v2.r });
    const cd = R / Math.sin(half);
    const C = { a: P1.a + bis.a * cd, r: P1.r + bis.r * cd };
    let a0 = Math.atan2(T1.r - C.r, T1.a - C.a);
    let a1 = Math.atan2(T2.r - C.r, T2.a - C.a);
    let da = a1 - a0;
    while (da > Math.PI) da -= 2 * Math.PI;
    while (da < -Math.PI) da += 2 * Math.PI;
    for (let s = 0; s <= sg; s++) {
      const t2 = a0 + (da * s) / sg;
      push({
        a: C.a + R * Math.cos(t2),
        r: C.r + R * Math.sin(t2),
        w: P1.w,
        wear: 1,
      });
    }
  }
  return out;
}

export function buildProfile(pts, opt = {}) {
  const closed = opt.closed !== false;
  const segs = opt.segs ?? 4;
  const def = opt.fillet ?? 0.35;
  // keep = nicht deduplizieren: Loft-Sektionen brauchen konstante Punktzahl
  let p = (opt.keep ? pts.slice() : dedupe(pts)).map((q) => Object.assign({ w: 0, wear: 0 }, q));
  p = expandChamfers(p, closed);
  p = applyFillets(p, closed, def, segs);
  if (closed) p.push(Object.assign({}, p[0]));
  return p;
}

/* Symmetrisches Teil: Außen- und Innenkontur je für a >= 0 angeben
   (beginnend bei a = 0), Rest wird gespiegelt. Ergebnis ist eine
   geschlossene Schleife, Außenfläche in +a-Richtung durchlaufen. */
export function mirrorProfile(outerHalf, innerHalf) {
  const neg = (p) => Object.assign({}, p, { a: -p.a });
  const mo = outerHalf.slice(1).reverse().map(neg);
  const mi = innerHalf.slice(1).reverse().map(neg);
  return [...mo, ...outerHalf, ...innerHalf.slice().reverse(), ...mi];
}

export function arcPts(out, ca, cr, R, t0, t1, n, extra) {
  for (let i = 0; i <= n; i++) {
    const t = t0 + ((t1 - t0) * i) / n;
    out.push(
      Object.assign({ a: ca + R * Math.cos(t), r: cr + R * Math.sin(t), fillet: 0 }, extra)
    );
  }
  return out;
}

export function ringGrooves(out, a0, a1, r, n, depth, width) {
  const pitch = (a1 - a0) / n;
  for (let i = 0; i < n; i++) {
    const c = a0 + pitch * (i + 0.5);
    const wall = Math.min(0.32, width * 0.3);
    out.push(
      { a: c - width / 2, r, fillet: 0.25, segs: 2 },
      { a: c - width / 2 + wall, r: r - depth, fillet: 0.22, segs: 2 },
      { a: c + width / 2 - wall, r: r - depth, fillet: 0.22, segs: 2 },
      { a: c + width / 2, r, fillet: 0.25, segs: 2 }
    );
  }
  return out;
}

/* ───────────── Rotationskörper mit radialer Modulation ───────────── */

export function thetaSamples(count, halfAng, nIn, nOut) {
  const pitch = (2 * Math.PI) / count;
  const out = [];
  for (let k = 0; k < count; k++) {
    const c = k * pitch;
    for (let i = 0; i < nIn; i++) out.push(c - halfAng + (2 * halfAng * i) / nIn);
    for (let i = 0; i < nOut; i++) out.push(c + halfAng + ((pitch - 2 * halfAng) * i) / nOut);
  }
  out.push(out[0] + 2 * Math.PI);
  return out;
}

/* Halbrunde Längsnut (Riffelung): liefert die radiale Abweichung in mm. */
export function grooveMod(count, grooveR, depth, surfR) {
  const pitch = (2 * Math.PI) / count;
  const chord = Math.sqrt(Math.max(1e-6, grooveR * grooveR - (grooveR - depth) ** 2));
  const fn = (th) => {
    let x = ((th % pitch) + pitch) % pitch;
    if (x > pitch / 2) x -= pitch;
    const s = x * surfR;
    if (Math.abs(s) >= chord) return 0;
    return -(Math.sqrt(grooveR * grooveR - s * s) - (grooveR - depth));
  };
  fn.halfAng = chord / surfR;
  return fn;
}

/* Gerundete Längsrippe: additive Modulation (Naben, Griffe). */
export function ribMod(count, halfAng, height) {
  const pitch = (2 * Math.PI) / count;
  const fn = (th) => {
    let x = ((th % pitch) + pitch) % pitch;
    if (x > pitch / 2) x -= pitch;
    const u = x / halfAng;
    if (Math.abs(u) >= 1) return 0;
    return height * Math.pow(1 - u * u, 0.7);
  };
  fn.halfAng = halfAng;
  return fn;
}

export function revolve(profile, opt = {}) {
  const axis = opt.axis || 'x';
  const thetas =
    opt.thetas ||
    (() => {
      const s = opt.segments ?? 96;
      const t = [];
      for (let j = 0; j <= s; j++) t.push((j / s) * Math.PI * 2);
      return t;
    })();
  const mod = opt.mod || null;
  const N = profile.length;
  const S = thetas.length; // inkl. Wrap
  const pos = new Float32Array(N * S * 3);
  const uv = new Float32Array(N * S * 2);
  const wear = new Float32Array(N * S);

  const vArr = new Float32Array(N);
  let total = 0;
  for (let i = 1; i < N; i++) {
    total += dist(profile[i - 1], profile[i]);
    vArr[i] = total;
  }
  if (total > 0) for (let i = 0; i < N; i++) vArr[i] /= total;

  for (let j = 0; j < S; j++) {
    const th = thetas[j];
    const m = mod ? mod(th) : 0;
    const c = Math.cos(th);
    const s = Math.sin(th);
    for (let i = 0; i < N; i++) {
      const p = profile[i];
      const r = Math.max(0, p.r + m * (p.w || 0));
      const k = j * N + i;
      if (axis === 'x') {
        pos[k * 3] = p.a;
        pos[k * 3 + 1] = r * c;
        pos[k * 3 + 2] = r * s;
      } else {
        pos[k * 3] = r * s;
        pos[k * 3 + 1] = p.a;
        pos[k * 3 + 2] = r * c;
      }
      uv[k * 2] = th / (Math.PI * 2);
      uv[k * 2 + 1] = vArr[i];
      wear[k] = p.wear || 0;
    }
  }

  const idx = [];
  for (let j = 0; j < S - 1; j++) {
    for (let i = 0; i < N - 1; i++) {
      const A = j * N + i;
      const B = j * N + i + 1;
      const C = (j + 1) * N + i + 1;
      const Dd = (j + 1) * N + i;
      idx.push(A, C, B, A, Dd, C);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setAttribute('aWear', new THREE.BufferAttribute(wear, 1));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/* Schnittfläche (Halbschnitt bei z = 0) eines Rotationskörpers:
   die Profilkontur selbst, einmal bei +r und einmal bei -r. */
export function capFromProfile(profile, axis = 'x') {
  const mk = (sign) => {
    const shape = new THREE.Shape();
    profile.forEach((p, i) => {
      const x = axis === 'x' ? p.a : sign * p.r;
      const y = axis === 'x' ? sign * p.r : p.a;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });
    shape.closePath();
    return new THREE.ShapeGeometry(shape, 1);
  };
  return mergeGeometries([mk(1), mk(-1)]);
}

export function polygonCap(pts) {
  const shape = new THREE.Shape();
  pts.forEach((p, i) => (i ? shape.lineTo(p[0], p[1]) : shape.moveTo(p[0], p[1])));
  shape.closePath();
  return new THREE.ShapeGeometry(shape, 1);
}

/* ─────────────────── Loft (Querschnittsfolge) ─────────────────── */

export function loft(sections, opt = {}) {
  const M = sections.length;
  const N = sections[0].pts.length;
  const pos = new Float32Array(M * N * 3);
  const uv = new Float32Array(M * N * 2);
  const wear = new Float32Array(M * N);
  for (let i = 0; i < M; i++) {
    const s = sections[i];
    for (let k = 0; k < N; k++) {
      const p = s.pts[k];
      const q = (i * N + k) * 3;
      pos[q] = s.x;
      pos[q + 1] = p.r;
      pos[q + 2] = p.a;
      uv[(i * N + k) * 2] = i / (M - 1);
      uv[(i * N + k) * 2 + 1] = k / (N - 1);
      wear[i * N + k] = p.wear || 0;
    }
  }
  const idx = [];
  for (let i = 0; i < M - 1; i++) {
    for (let k = 0; k < N; k++) {
      const k2 = (k + 1) % N;
      const A = i * N + k;
      const B = i * N + k2;
      const C = (i + 1) * N + k2;
      const Dd = (i + 1) * N + k;
      idx.push(A, C, B, A, Dd, C);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setAttribute('aWear', new THREE.BufferAttribute(wear, 1));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/* ─────────────────────────── Merge ─────────────────────────── */

export function mergeGeometries(list) {
  const geos = list.filter(Boolean).map((g) => (g.index ? g.toNonIndexed() : g));
  let vc = 0;
  for (const g of geos) vc += g.attributes.position.count;
  const pos = new Float32Array(vc * 3);
  const nor = new Float32Array(vc * 3);
  const uv = new Float32Array(vc * 2);
  const wear = new Float32Array(vc);
  let o = 0;
  for (const g of geos) {
    if (!g.attributes.normal) g.computeVertexNormals();
    const n = g.attributes.position.count;
    pos.set(g.attributes.position.array.subarray(0, n * 3), o * 3);
    nor.set(g.attributes.normal.array.subarray(0, n * 3), o * 3);
    if (g.attributes.uv) uv.set(g.attributes.uv.array.subarray(0, n * 2), o * 2);
    if (g.attributes.aWear) wear.set(g.attributes.aWear.array.subarray(0, n), o);
    o += n;
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  out.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  out.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  out.setAttribute('aWear', new THREE.BufferAttribute(wear, 1));
  for (const g of geos) g.dispose();
  return out;
}

/* Gerundeter Klotz über ExtrudeGeometry (Laschen, Mitnehmer, Augen).
   Extrusion in +Y, Grundfläche in der XZ-Ebene. */
export function roundedPad(sx, sz, h, r, bevel = 1) {
  const s = new THREE.Shape();
  const x = sx / 2 - r;
  const z = sz / 2 - r;
  s.moveTo(-x - r, -z);
  s.lineTo(-x - r, z);
  s.absarc(-x, z, r, Math.PI, Math.PI / 2, true);
  s.lineTo(x, z + r);
  s.absarc(x, z, r, Math.PI / 2, 0, true);
  s.lineTo(x + r, -z);
  s.absarc(x, -z, r, 0, -Math.PI / 2, true);
  s.lineTo(-x, -z - r);
  s.absarc(-x, -z, r, -Math.PI / 2, Math.PI, true);
  const g = new THREE.ExtrudeGeometry(s, {
    depth: h - bevel * 2,
    bevelEnabled: bevel > 0,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 4,
    curveSegments: 8,
  });
  g.rotateX(-Math.PI / 2);
  g.translate(0, bevel, 0);
  const n = g.attributes.position.count;
  g.setAttribute('aWear', new THREE.BufferAttribute(new Float32Array(n).fill(0.35), 1));
  if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n * 2), 2));
  return g;
}


/* ═══════════════════════════════════════════════════════════════════
   Familien-Helfer

   Sechs Funktionen, die der Kugelhahn nicht braucht, die kommenden
   Familien aber sehr wohl. Gleiche Fasen- und Entformungslogik wie
   oben: alles läuft durch buildProfile bzw. trägt eigene Fasen.
   Jede mit Minimalbeispiel.
   ═══════════════════════════════════════════════════════════════════ */

/* ── Kreisförmige Querschnittskontur für sweepPath ── */
export function circleLoop(r, segs = SEG_VIS, wear = 0) {
  const pts = [];
  for (let i = 0; i < segs; i++) {
    const t = (i / segs) * Math.PI * 2;
    pts.push({ x: r * Math.cos(t), y: r * Math.sin(t), wear });
  }
  return pts;
}

/* ── Bahn auf einem Kreisbogen ──
   axis = Drehachse ('x'|'y'|'z'), center = Bogenmittelpunkt.
   Liefert [{ c: Vector3, t: Vector3 }] — Punkt und normierte Tangente. */
export function arcPath(center, R, axis, t0, t1, segs) {
  const out = [];
  for (let i = 0; i <= segs; i++) {
    const t = t0 + ((t1 - t0) * i) / segs;
    const co = Math.cos(t), si = Math.sin(t);
    let c, tg;
    if (axis === 'z') { c = new THREE.Vector3(R * co, R * si, 0); tg = new THREE.Vector3(-si, co, 0); }
    else if (axis === 'y') { c = new THREE.Vector3(R * si, 0, R * co); tg = new THREE.Vector3(co, 0, -si); }
    else { c = new THREE.Vector3(0, R * co, R * si); tg = new THREE.Vector3(0, -si, co); }
    if (t1 < t0) tg.negate();
    out.push({ c: c.add(center), t: tg.normalize() });
  }
  return out;
}

/* ── sweepPath: geschlossene Querschnittskontur entlang einer Bahn ──
   loop  [{ x, y, wear? }] in der Schnittebene (x = Binormale, y = Normale)
         ODER eine Funktion (t, i, station) => Punktliste, wenn sich der
         Querschnitt entlang der Bahn ändert. t läuft 0…1 über die
         Bogenlänge. Der Winkel braucht das: an den Stirnflächen die
         Muffenbohrung, in der Mitte die Rohrbohrung. Alle Rückgaben
         müssen gleich viele Punkte haben.
   path  [{ c, t }] aus arcPath() oder selbst gebaut
   opt   { up, flip, closedLoop = true }

   Ein Rohrbogen besteht aus zwei Sweeps (Außen- und Innenfläche) plus
   zwei Ringflächen an den Enden — genau wie ein Rotationskörper aus
   Außen- und Innenkontur besteht. Kein CSG.

   Beispiel — Bogen 90°, Außen-Ø 32, Wand 4,3, Krümmungsradius 40:
     const p = arcPath(new THREE.Vector3(0, 40, 0), 40, 'z', -Math.PI / 2, 0, 24);
     const aussen = sweepPath(circleLoop(16, SEG_VIS), p);
     const innen  = sweepPath(circleLoop(11.7, SEG_INT), p, { flip: true });   */
export function sweepPath(loop, path, opt = {}) {
  const closedLoop = opt.closedLoop !== false;
  const ref = (opt.up ? opt.up.clone() : new THREE.Vector3(0, 0, 1)).normalize();
  const varying = typeof loop === 'function';
  const M = path.length;

  /* Bogenlänge zuerst: der veränderliche Querschnitt wird über t
     angesprochen, und t muss die Länge meinen, nicht den Index —
     sonst wandert die Muffentiefe mit der Segmentdichte. */
  const arc = new Float32Array(M);
  let aLen = 0;
  for (let i = 1; i < M; i++) { aLen += path[i].c.distanceTo(path[i - 1].c); arc[i] = aLen; }
  const tOf = (i) => (aLen > 0 ? arc[i] / aLen : 0);

  const loops = varying
    ? path.map((st, i) => loop(tOf(i), i, st))
    : null;
  const N = varying ? loops[0].length : loop.length;
  if (varying) {
    for (let i = 1; i < M; i++) {
      if (loops[i].length !== N) {
        throw new Error('K-Aqua sweepPath: Querschnitt ' + i + ' hat ' + loops[i].length +
          ' Punkte, erwartet ' + N + ' — eine Loft-Fläche braucht konstante Punktzahl');
      }
    }
  }
  const pos = new Float32Array(N * M * 3);
  const uv = new Float32Array(N * M * 2);
  const wear = new Float32Array(N * M);
  const bin = new THREE.Vector3();
  const nor = new THREE.Vector3();

  for (let i = 0; i < M; i++) {
    const c = path[i].c, t = path[i].t;
    bin.crossVectors(ref, t);
    if (bin.lengthSq() < 1e-8) bin.set(1, 0, 0);
    bin.normalize();
    nor.crossVectors(t, bin).normalize();
    const L = varying ? loops[i] : loop;
    for (let k = 0; k < N; k++) {
      const p = L[k];
      const q = (i * N + k) * 3;
      pos[q]     = c.x + bin.x * p.x + nor.x * p.y;
      pos[q + 1] = c.y + bin.y * p.x + nor.y * p.y;
      pos[q + 2] = c.z + bin.z * p.x + nor.z * p.y;
      uv[(i * N + k) * 2]     = tOf(i);
      uv[(i * N + k) * 2 + 1] = k / N;
      wear[i * N + k] = p.wear || 0;
    }
  }

  /* ── Wicklung ──
     Bis zum 23.08.2026 stand die Zuordnung hier umgekehrt, und damit
     zeigte die Außenhaut JEDES gelofteten Körpers nach innen. Ein
     FrontSide-Material verwirft rückseitige Dreiecke: der ausgelieferte
     Winkel 90° wurde ohne Mantelfläche gezeichnet, man sah durch ihn
     hindurch auf die gegenüberliegende Bohrungswand. Nur im Schnitt sah
     er richtig aus — setSection(true) schaltet auf DoubleSide.

     Gefunden über einen Maßtest, nicht über das Auge: ein Strahl von
     außen lief durch die Außenhaut hindurch und traf erst die Bohrung.
     Nachweis und Sichtprobe in pruefung/w4-wicklung-check.html und
     pruefung/w4-sichtprobe-haut.html.

     Merksatz: revolve und sweepPath laufen über verschiedene
     Parameterordnungen (θ×Profil gegen Bahn×Umfang). Dieselbe
     Indexreihenfolge ergibt dort entgegengesetzte Normalen. */
  const idx = [];
  const kMax = closedLoop ? N : N - 1;
  for (let i = 0; i < M - 1; i++) {
    for (let k = 0; k < kMax; k++) {
      const k2 = (k + 1) % N;
      const A = i * N + k, B = i * N + k2;
      const C = (i + 1) * N + k2, Dd = (i + 1) * N + k;
      if (opt.flip) idx.push(A, C, B, A, Dd, C);
      else idx.push(A, B, C, A, C, Dd);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setAttribute('aWear', new THREE.BufferAttribute(wear, 1));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/* ── branchJoin: Abzweig mit verrundeter Kehle ──
   Erzeugt das Kehlband zwischen einem Hauptzylinder (Achse X, Radius
   mainR) und einem Abzweigzylinder (Radius branchR), der um angle Grad
   zur Hauptachse steht — 90° = senkrechter Abzweig.

   Das Band wird als Loft von Ringen gebaut: an u = 0 tangential an den
   Abzweig, an u = 1 tangential an den Hauptkörper. Der Abzweigstutzen
   selbst wird nicht beschnitten (kein CSG); er taucht in den
   Hauptkörper ein. insertDepth sagt, wie weit.

   Rückgabe { geo, cap, startAt(theta), insertDepth, axis, u1, u2 }
   axis/u1/u2 sind das Achsensystem des Abzweigs, damit der Aufrufer
   seinen Stutzen identisch ausrichtet.

   Beispiel — T-Stück d32: Hauptrohr Ø44 außen, Abzweig Ø44:
     const kehle = branchJoin({ mainR: 22, branchR: 22, filletR: 4 });
     group.add(new THREE.Mesh(kehle.geo, M.pprGreen));                     */
export function branchJoin(opt) {
  const mainR = opt.mainR;
  const branchR = opt.branchR;
  const fR = opt.filletR ?? Math.max(0.3, branchR * 0.18);
  const ang = (opt.angle ?? 90) * D2R;
  const segments = opt.segments ?? SEG_VIS;
  const uSegs = opt.uSegs ?? 6;

  // Abzweig-Achsensystem: Achse in der XY-Ebene, um ang von +X gedreht
  const axis = new THREE.Vector3(Math.cos(ang), Math.sin(ang), 0).normalize();
  const u2 = new THREE.Vector3(0, 0, 1);
  const u1 = new THREE.Vector3().crossVectors(u2, axis).normalize();

  /* Schnitt der Abzweigmantellinie (Winkel th, Radius rr) mit dem
     Hauptzylinder y² + z² = mainR². Quadratisch in s, größere Wurzel. */
  const solve = (th, rr) => {
    const b0 = new THREE.Vector3()
      .addScaledVector(u1, rr * Math.cos(th))
      .addScaledVector(u2, rr * Math.sin(th));
    const A = axis.y * axis.y + axis.z * axis.z;
    const B = 2 * (b0.y * axis.y + b0.z * axis.z);
    const C = b0.y * b0.y + b0.z * b0.z - mainR * mainR;
    if (A < 1e-9) return null;
    const disc = B * B - 4 * A * C;
    if (disc < 0) return null;
    const s = (-B + Math.sqrt(disc)) / (2 * A);
    return b0.addScaledVector(axis, s);
  };

  const rings = [];
  let insertDepth = 0;
  const startAt = new Float32Array(segments + 1);

  for (let u = 0; u <= uSegs; u++) {
    rings.push([]);
  }
  for (let j = 0; j <= segments; j++) {
    const th = (j / segments) * Math.PI * 2;
    const I = solve(th, branchR);
    const O = solve(th, branchR + fR);
    if (!I || !O) { // Kehle läuft aus dem Hauptzylinder heraus
      for (let u = 0; u <= uSegs; u++) rings[u].push(rings[u][j - 1] || new THREE.Vector3());
      startAt[j] = startAt[j - 1] || 0;
      continue;
    }
    const A = I.clone().addScaledVector(axis, fR);   // tangential am Abzweig
    const C = new THREE.Vector3(O.x, O.y, O.z).addScaledVector(axis, A.dot(axis) - O.dot(axis));
    // Viertelbogen A -> O, tangential an beiden Enden
    for (let u = 0; u <= uSegs; u++) {
      const t = ((u / uSegs) * Math.PI) / 2;
      rings[u].push(new THREE.Vector3()
        .addScaledVector(C, 1)
        .addScaledVector(A.clone().sub(C), Math.cos(t))
        .addScaledVector(O.clone().sub(C), Math.sin(t)));
    }
    startAt[j] = A.dot(axis);
    insertDepth = Math.max(insertDepth, -Math.min(0, I.dot(axis)) + branchR * 0.25);
  }

  const N = segments + 1;
  const pos = new Float32Array(N * (uSegs + 1) * 3);
  const uvA = new Float32Array(N * (uSegs + 1) * 2);
  const wear = new Float32Array(N * (uSegs + 1)).fill(0.25);
  for (let u = 0; u <= uSegs; u++) {
    for (let j = 0; j < N; j++) {
      const p = rings[u][j];
      const q = (u * N + j) * 3;
      pos[q] = p.x; pos[q + 1] = p.y; pos[q + 2] = p.z;
      uvA[(u * N + j) * 2] = j / segments;
      uvA[(u * N + j) * 2 + 1] = u / uSegs;
    }
  }
  const idx = [];
  for (let u = 0; u < uSegs; u++) {
    for (let j = 0; j < N - 1; j++) {
      const a = u * N + j, b = u * N + j + 1;
      const c = (u + 1) * N + j + 1, d = (u + 1) * N + j;
      idx.push(a, c, b, a, d, c);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.BufferAttribute(uvA, 2));
  geo.setAttribute('aWear', new THREE.BufferAttribute(wear, 1));
  geo.setIndex(idx);
  geo.computeVertexNormals();

  // Schnittfläche bei z = 0: die beiden Bogenlinien bei th = 90° / 270°
  const capPts = [];
  for (const th of [Math.PI / 2, -Math.PI / 2]) {
    const I = solve(th, branchR), O = solve(th, branchR + fR);
    if (!I || !O) continue;
    const A = I.clone().addScaledVector(axis, fR);
    const C = new THREE.Vector3(O.x, O.y, O.z).addScaledVector(axis, A.dot(axis) - O.dot(axis));
    const side = [];
    for (let u = 0; u <= uSegs; u++) {
      const t = ((u / uSegs) * Math.PI) / 2;
      const p = new THREE.Vector3()
        .addScaledVector(C, 1)
        .addScaledVector(A.clone().sub(C), Math.cos(t))
        .addScaledVector(O.clone().sub(C), Math.sin(t));
      side.push([p.x, p.y]);
    }
    side.push([side[side.length - 1][0], side[0][1]]);
    capPts.push(polygonCap(side));
  }

  return { geo, cap: capPts.length ? mergeGeometries(capPts) : null,
           startAt: (th) => startAt[Math.round((th / (Math.PI * 2)) * segments) % segments],
           insertDepth, axis, u1, u2 };
}

/* ── threadProfile: R-/Rp-Gewinde als Profilkontur, keine Helix ──
   Ein echtes Helixgewinde kostet zehntausende Dreiecke und ist bei
   Katalogmaßstab nicht zu sehen. Die Kontur reicht: Whitworth-55°-
   Flankenwinkel, gerundete Kuppen und Gründe.

   D     Nenn-Außendurchmesser des Gewindes (mm)
   pitch Gewindesteigung (mm) — R½" = 1,814
   turns Anzahl Gänge
   kind  'R'  kegeliges Außengewinde (1:16), verjüngt in +a
         'G'  zylindrisches Außengewinde
         'Rp' zylindrisches Innengewinde

   D ist in JEDEM Fall der NENN-AUSSENDURCHMESSER (der Flankenberg des
   Außengewindes). Beim Innengewinde liegt der Nennmaßort damit im
   GRUND der Kontur — die Kuppe des Innengewindes, also der engste
   Punkt der Bohrung, liegt eine Gewindetiefe darunter bei D − 2h.
   Nur so paaren Innen- und Außengewinde: die Kuppe des einen läuft in
   den Grund des anderen.

   ── KORREKTUR 23.08.2026, Fall 20 ──
   Der 'Rp'-Zweig legte die Kuppe auf rMaj und den Grund auf rMaj + h.
   Das verschob das ganze Innengewinde um eine volle Gewindetiefe nach
   außen: der engste Punkt der Bohrung lag bei Rp 1" auf Ø33,25 statt
   auf Ø30,29 — 2,96 mm zu weit, und ein so gebautes Innengewinde nimmt
   das zugehörige Außengewinde nicht auf.

   Unentdeckt blieb das, weil genau ein Produkt 'Rp' benutzte und dort
   kein Maßtest das Gewinde abgetastet hat. Fall 20 in Worten: kommt ein
   Katalogmaß aus einer Core-Funktion, muss mindestens ein Produkt es
   ABTASTEN. Die Metallverschraubungen tun das jetzt über 'kern'.

   Rückgabe: Punktliste [{ a, r, fillet }] ab a = 0 in +a-Richtung, zum
   Einsetzen in eine größere Profilkontur.

   Beispiel — Rp½" Innengewinde, 5 Gänge, ab a = 12. Die umgebende
   Bohrung liegt auf dem Kerndurchmesser 20,955 − 2·1,162 = 18,63:
     const inner = [{ a: 0, r: 9.32, fillet: 0.4 },
       ...threadProfile(20.955, 1.814, 5, 'Rp').map(p => ({ ...p, a: p.a + 12 })),
       { a: 24, r: 9.32, fillet: 0.4 }];                                    */
export function threadProfile(D, pitch, turns, kind = 'R') {
  const h = 0.640327 * pitch;            // Whitworth-Gewindetiefe
  const rd = Math.max(0.3, 0.137 * pitch); // Kuppen-/Grundradius

  /* Scheitelausgleich. Ein Fillet wird nach innen angelegt und zieht den
     Kuppenscheitel um rd·(1/sin(α/2) − 1) zurück, bei Whitworth-55°
     also um etwa 1,17·rd. Der theoretisch spitze Punkt muss deshalb um
     diesen Betrag über dem Nennmaß liegen, damit die gerundete Kuppe
     genau darauf landet — so ist ein Gewinde auch normgerecht
     definiert. Ohne den Ausgleich liegt jedes Gewinde systematisch
     0,4 mm unter Maß. */
  const setback = rd * (1 / Math.sin(27.5 * D2R) - 1);
  const female = kind === 'Rp';
  const taper = kind === 'R' ? 1 / 32 : 0;  // 1:16 auf den Durchmesser
  const out = [];
  const rMaj = D / 2;
  for (let i = 0; i <= turns; i++) {
    const a0 = i * pitch;
    const shrink = taper * a0;
    /* Kuppe: der Fillet zieht sie um setback vom Kontrollpunkt WEG vom
       Material, deshalb liegt der Kontrollpunkt um setback davor. Beim
       Innengewinde zeigt die Kuppe zur Achse und sitzt auf dem KERN
       (rMaj − h), der Grund auf dem Nennmaß rMaj. */
    const crest = (female ? rMaj - h - setback : rMaj - shrink + setback);
    const root = (female ? rMaj : rMaj - shrink - h);
    out.push({ a: a0, r: crest, fillet: rd });
    if (i < turns) out.push({ a: a0 + pitch * 0.5, r: root, fillet: rd });
  }
  return out;
}

/* ── hexPrism: Sechskant mit verrundeten Kanten ──
   af = Schlüsselweite (Abstand der Schlüsselflächen), h = Länge in +X,
   filletR = Kantenradius an den sechs Ecken. Beginnt bei a = 0.

   ORIENTIERUNG, weil sie beim Messen zählt: nach der internen
   rotateY(π/2) liegt eine SCHLÜSSELFLÄCHE auf der Z-Achse und eine
   ECKE auf der Y-Achse. Ein Strahl in −Y misst also das Eckenmaß
   (= af/cos 30°), ein Strahl in −Z die Schlüsselweite.

   bevel nimmt vom Umkreis: für ein Teil, dessen Eckenmaß ein
   Katalogmaß ist, bevel = 0 setzen und filletR klein halten.

   Beispiel — SW 32, 14 mm lang:
     const geo = hexPrism(32, 14, 1.6);                                     */
export function hexPrism(af, h, filletR = Math.max(0.3, af * 0.05), bevel = 0.5) {
  const R = af / Math.sqrt(3);          // Umkreisradius
  const s = new THREE.Shape();
  const c = [];
  for (let i = 0; i < 6; i++) {
    const t = (i / 6) * Math.PI * 2 + Math.PI / 6;
    c.push(new THREE.Vector2(R * Math.cos(t), R * Math.sin(t)));
  }
  /* Echter Tangentenbogen je Ecke, kein quadratischer Bézier.

     Der Innenwinkel eines Sechsecks ist 120°, die Halbierende schließt
     also 60° mit jeder Flanke ein. Tangentenabstand vom Eckpunkt:
     t = r/tan(60°); Bogenmittelpunkt auf der Halbierenden im Abstand
     r/sin(60°). Der Scheitel liegt dann um 0,155·r innerhalb des
     Eckpunkts — das ist die Rundung eines realen Sechskants.

     Ein quadratischer Bézier mit dem Eckpunkt als Kontrollpunkt stand
     hier zuerst. Er schießt nach innen über und zog das Eckenmaß um
     0,32 mm unter das Nennmaß. */
  const halfAng = Math.PI / 3;                 // 60°
  for (let i = 0; i < 6; i++) {
    const p0 = c[(i + 5) % 6], p1 = c[i], p2 = c[(i + 1) % 6];
    const v1 = p0.clone().sub(p1).normalize();
    const v2 = p2.clone().sub(p1).normalize();
    const t = Math.min(filletR / Math.tan(halfAng), p1.distanceTo(p2) * 0.45);
    const T1 = p1.clone().addScaledVector(v1, t);
    const T2 = p1.clone().addScaledVector(v2, t);
    const bis = v1.clone().add(v2).normalize();
    const ctr = p1.clone().addScaledVector(bis, filletR / Math.sin(halfAng));
    const a1 = Math.atan2(T1.y - ctr.y, T1.x - ctr.x);
    const a2 = Math.atan2(T2.y - ctr.y, T2.x - ctr.x);
    let d = a2 - a1;
    while (d > Math.PI) d -= Math.PI * 2;
    while (d < -Math.PI) d += Math.PI * 2;
    if (i === 0) s.moveTo(T1.x, T1.y); else s.lineTo(T1.x, T1.y);
    s.absarc(ctr.x, ctr.y, filletR, a1, a2, d < 0);
  }
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, {
    depth: Math.max(0.1, h - bevel * 2), bevelEnabled: bevel > 0,
    bevelThickness: bevel, bevelSize: bevel, bevelSegments: 3, curveSegments: 5,
  });
  g.rotateY(Math.PI / 2);
  g.translate(bevel, 0, 0);
  const n = g.attributes.position.count;
  g.setAttribute('aWear', new THREE.BufferAttribute(new Float32Array(n).fill(0.4), 1));
  if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n * 2), 2));
  return g;
}

/* ── knurl: Rändelung als radiale Modulation ──
   Dünne Hülle um grooveMod/thetaSamples: liefert das fertige Paar
   { thetas, mod } für revolve(). h ist die gerändelte Länge — der
   Aufrufer setzt damit die w-Gewichte seiner Profilpunkte.

   Beispiel — Überwurfmutter Ø66, 12 Riffel, 1,45 mm tief, 25 mm lang:
     const kn = knurl(33, 25, 12, 1.45);
     revolve(profile, { axis: 'x', thetas: kn.thetas, mod: kn.mod });        */
export function knurl(r, h, count, depth, opt = {}) {
  const grooveR = opt.grooveR ?? Math.max(depth * 1.35, ((Math.PI * r) / count) * 0.55);
  const mod = grooveMod(count, grooveR, depth, r);
  return {
    mod, halfAng: mod.halfAng,
    thetas: thetaSamples(count, mod.halfAng, opt.nIn ?? 5, opt.nOut ?? 6),
    axial: h, pitchDeg: 360 / count, depth, grooveR,
  };
}

/* ── tubeLayers: Mehrschichtrohr mit farbigen Lagen ──
   d = Außendurchmesser, s = Wandstärke (= d / SDR), layers = Lagen von
   außen nach innen, jede mit Materialschlüssel und Anteil an s.
   Die Anteile werden normiert; die innerste Lage endet exakt bei
   d/2 − s, damit bohrung = d − 2·s stimmt.

   Die Schnittkante ist das Verkaufsargument, das 2D nicht kann:
   jede Lage bringt ihre eigene Schnittfläche mit (cap).

   Beispiel — K-Fiber Rohr d32 SDR 7,4, Faserverbund-Kern:
     tubeLayers(32, 32 / 7.4, [
       { key: 'pprGreen',   frac: 0.34 },
       { key: 'fiberLayer', frac: 0.32 },
       { key: 'pprGreen',   frac: 0.34 },
     ], { length: 190 });                                                    */
export function tubeLayers(d, s, layers, opt = {}) {
  const L = opt.length ?? d * 6;
  const x0 = opt.x0 ?? -L / 2, x1 = x0 + L;
  const rOut = d / 2;
  const total = layers.reduce((a, l) => a + (l.frac ?? 1), 0);
  const out = [];
  let r = rOut;
  layers.forEach((layer, i) => {
    const t = (s * (layer.frac ?? 1)) / total;
    const ri = i === layers.length - 1 ? rOut - s : r - t;
    const outerMost = i === 0;
    const ch = Math.min(outerMost ? 0.6 : 0.3, t * 0.45);
    const profile = buildProfile([
      { a: x0, r: ri, chamfer: ch },
      { a: x0, r, chamfer: ch },
      { a: x1, r, chamfer: ch },
      { a: x1, r: ri, chamfer: ch },
    ], { segs: 3 });
    out.push({
      key: layer.key, label: layer.label || layer.key,
      rOuter: r, rInner: ri, thickness: t,
      geo: revolve(profile, { axis: 'x', segments: outerMost ? SEG_VIS : SEG_INT }),
      cap: capFromProfile(profile, 'x'),
    });
    r = ri;
  });
  return out;
}

/* ── Muffenschweißtiefen nach EN ISO 15874-3 / DVS 2207-11 ──
   Steht im Core, weil sie jedes Muffenprodukt betrifft und weil das
   Schweißwerkzeug je Nennweite für alle Fittings dasselbe ist.

   Belegt durch die Muffentabelle (Spalte z): (l − z)/2 trifft die
   Reihe bei d20 bis d63 auf die Zehntelstelle. Ab d75 baut K-Aqua
   flacher — dort ist die tabellierte Tiefe maßgeblich, nicht die Norm.

   Rückgabe null für Nennweiten außerhalb der Reihe (Stumpf- und
   Elektroschweißung ab d160 hat keine Muffe).

   Beispiel:
     const t = fusionDepth(32);   // 18.0                              */
const FUSION_DEPTH = {
  20: 14.5, 25: 16.0, 32: 18.0, 40: 20.5, 50: 23.5,
  63: 27.5, 75: 31.0, 90: 35.0, 110: 41.0, 125: 46.0,
};
export function fusionDepth(dNom) {
  return FUSION_DEPTH[dNom] ?? null;
}

/* ── Rohrgewinde nach ISO 7-1 / ISO 228-1 ──
   Außendurchmesser (Flankenberg) und Steigung je Zollgröße. Kegeliges
   Außengewinde R, zylindrisches Innengewinde Rp und zylindrisches
   Außengewinde G teilen dieselben Werte — sie unterscheiden sich in der
   Verjüngung, nicht im Nennmaß. Welche Art gemeint ist, entscheidet das
   Produkt über den Parameter `kind` von threadProfile.

   STEHT IM CORE, WEIL SIE ES MUSS (Fall 19). Vor dem 24.08.2026 stand
   diese Tabelle FÜNFMAL im Produktcode — in _teethread/params.js,
   _union/params.js, elbow-90-male-thread/data.js,
   adaptor-socket-male-thread/data.js und plug/data.js. Alle fünf trugen
   für jede gemeinsame Größe denselben Wert; eine einzige Abweichung
   hätte zwei Produkte still auseinanderlaufen lassen.

   Die Werte sind Norm, keine Schätzung: die Zollangabe bestimmt sie
   eindeutig. Deshalb gehören sie neben FUSION_DEPTH und nicht in ein
   Produkt.

   Rückgabe null für Größen außerhalb der Reihe — der Aufrufer wirft mit
   seiner eigenen, sprechenden Meldung.

   Beispiel:
     const th = threadSpec('1/2');   // { od: 20.955, pitch: 1.814 }   */
const THREAD_ISO = {
  '1/2': { od: 20.955, pitch: 1.814 },
  '3/4': { od: 26.441, pitch: 1.814 },
  '1': { od: 33.249, pitch: 2.309 },
  '1 1/4': { od: 41.910, pitch: 2.309 },
  '1 1/2': { od: 47.803, pitch: 2.309 },
  '2': { od: 59.614, pitch: 2.309 },
  '2 1/2': { od: 75.184, pitch: 2.309 },
  '3': { od: 87.884, pitch: 2.309 },
  '4': { od: 113.030, pitch: 2.309 },
};
export function threadSpec(size) {
  return THREAD_ISO[size] ?? null;
}
export function threadSizes() {
  return Object.keys(THREAD_ISO);
}

/* ── bendPath: Gerade – Bogen – Gerade ──
   Die Bahn eines Rohrbogens oder Winkels. Schenkel A misst L von der
   Achsenschnittstelle bis zur Stirnfläche, Schenkel B misst LB; der
   Bogen hat Radius R.

   LB ist neu (23.08.2026, Welle 4.2). Bis dahin nahm die Funktion EIN
   Schenkelmaß für beide Seiten — das trägt jeden Winkel, dessen Enden
   gleich sind, aber nicht den Gewindewinkel: dort ist der Muffenschenkel
   `l` und der Gewindeschenkel `L1` verschieden lang (28 gegen 34 bei
   d20). Ohne LB weggelassen bleibt das Verhalten Zeichen für Zeichen das
   alte, damit die zehn bestehenden Winkel- und Bogenprodukte unverändert
   bauen.

   Der Bogen frisst von JEDEM Schenkel R·tan(angle/2) — bei 90° also R.
   Ist einer der beiden kleiner als das, passt kein Bogen dieses Radius
   hinein und die Funktion bricht ab, statt eine Bahn mit negativer
   Gerade zu liefern. Geprüft werden beide, nicht nur der erste: sonst
   käme der kürzere Schenkel unbemerkt durch.

   Rückgabe [{ c, t }] wie arcPath, verwendbar in sweepPath.

   Beispiel — Winkel 90° d32, Schenkel 37 mm, Bogenradius 16:
     const p = bendPath(37, 90, 16, 20);
     const aussen = sweepPath(circleLoop(22, SEG_VIS), p);

   Beispiel — ungleiche Schenkel, Muffe 28 mm, Gewindeseite 34 mm:
     const p = bendPath(28, 90, 10, 24, 5, 34);                             */
export function bendPath(L, angleDeg, R, arcSegs = 20, legSegs = 4, LB = L) {
  const ang = angleDeg * D2R;
  const setback = R * Math.tan(ang / 2);
  for (const [name, len] of [['A', L], ['B', LB]]) {
    if (setback >= len - 0.5) {
      throw new Error('K-Aqua bendPath: Bogenradius ' + R + ' braucht ' +
        setback.toFixed(1) + ' mm, Schenkel ' + name + ' hat ' + len + ' mm');
    }
  }

  /* Achsensystem. angleDeg ist der ABLENKWINKEL: die Fließrichtung tritt
     als +X ein und um angleDeg gedreht aus.

       dirA  Ecke → Stirnfläche A, also −X (entgegen der Eintrittsrichtung)
       dirB  Ecke → Stirnfläche B, also die Austrittsrichtung selbst

     Der Winkel zwischen dirA und dirB ist 180° − angleDeg. Bei 90° ist
     dirB = +Y; das verdeckt einen Vorzeichenfehler, weil cos 90° = 0 —
     erst der 45°-Winkel hat ihn sichtbar gemacht. */
  const dirA = new THREE.Vector3(-1, 0, 0);
  const dirB = new THREE.Vector3(Math.cos(ang), Math.sin(ang), 0);

  const faceA = dirA.clone().multiplyScalar(L);
  const startArc = dirA.clone().multiplyScalar(setback);
  const endArc = dirB.clone().multiplyScalar(setback);
  const faceB = dirB.clone().multiplyScalar(LB);

  /* Bogenmittelpunkt: auf der Winkelhalbierenden von dirA und dirB, im
     Abstand R/cos(angleDeg/2). Die Halbierende zeigt bereits zur
     richtigen Seite — ein Minuszeichen hier spiegelt den Bogen auf die
     Außenseite der Ecke, und das Teil verlässt seinen Bauraum. */
  const bis = dirA.clone().add(dirB).normalize();
  const center = bis.multiplyScalar(R / Math.cos(ang / 2));

  const vA = startArc.clone().sub(center);
  const vB = endArc.clone().sub(center);
  /* Drehrichtung aus dem Kreuzprodukt, EINMAL bestimmt. Sie über das
     Skalarprodukt mit einer festen Referenz pro Punkt zu bestimmen
     versagt, sobald der Bogen 90° erreicht — dort ist es null. */
  const sign = Math.sign(vA.x * vB.y - vA.y * vB.x) || 1;

  const out = [];
  const tA = dirA.clone().negate();
  for (let i = 0; i <= legSegs; i++) {
    const s = i / legSegs;
    out.push({ c: faceA.clone().lerp(startArc, s), t: tA.clone() });
  }
  for (let i = 1; i < arcSegs; i++) {
    const th = sign * ang * (i / arcSegs);
    const co = Math.cos(th), si = Math.sin(th);
    const v = new THREE.Vector3(vA.x * co - vA.y * si, vA.x * si + vA.y * co, 0);
    // Tangente = v um +90° gedreht, in Laufrichtung
    const t = sign > 0
      ? new THREE.Vector3(-v.y, v.x, 0).normalize()
      : new THREE.Vector3(v.y, -v.x, 0).normalize();
    out.push({ c: center.clone().add(v), t });
  }
  const tB = dirB.clone();
  for (let i = 0; i <= legSegs; i++) {
    const s = i / legSegs;
    out.push({ c: endArc.clone().lerp(faceB, s), t: tB.clone() });
  }
  return out;
}

/* ── plateWithHoles: Scheibe mit Durchgangslöchern ──
   rOut     Außenradius
   rIn      Innenradius (0 = Vollscheibe)
   h        Dicke, extrudiert in +X
   holes    [{ r, x, y }] Lochradius und Mittelpunkt in der Scheibenebene
   opt      { bevel, segments, x0 }

   Kein CSG: THREE.Shape nimmt die Löcher als Innenkonturen auf, die
   Triangulierung setzt sie in einem Zug. Die Fase an den Stirnflächen
   kommt aus ExtrudeGeometry und erfasst auch die Lochränder — genau wie
   ein gefrästes Bauteil sie trägt.

   BEVEL-KOMPENSATION: ExtrudeGeometry addiert bevelSize nach AUSSEN,
   senkrecht zur Kontur — die Außenkontur wächst um bevel, jede
   Innenkontur (Bohrung, Loch) schrumpft um bevel. Diese Funktion legt
   ihre Konturen deshalb um bevel versetzt an, damit die Fasenkante auf
   dem Nennmaß landet. rOut, rIn und die Lochradien sind also echte
   Fertigmaße, keine Rohkonturmaße.

   Dieselbe Ursache hat schon hexPrism (Umkreis) und threadProfile
   (Kuppenscheitel) je 0,3–0,4 mm verschoben.

   Beispiel — Bundflansch d63: Außen Ø165, Bohrung Ø78, 4 Löcher Ø18
   auf Lochkreis Ø125, 18 mm dick:
     const holes = [];
     for (let i = 0; i < 4; i++) {
       const t = (i / 4) * Math.PI * 2 + Math.PI / 4;
       holes.push({ r: 9, x: 62.5 * Math.cos(t), y: 62.5 * Math.sin(t) });
     }
     const geo = plateWithHoles(82.5, 39, 18, holes);                     */
export function plateWithHoles(rOut, rIn, h, holes = [], opt = {}) {
  const segs = opt.segments ?? SEG_VIS;
  const bevel = opt.bevel ?? Math.min(0.6, h * 0.06);
  /* Konturen um bevel versetzt: außen kleiner, innen größer. Nach dem
     Bevel liegen sie auf dem Nennmaß. */
  const shape = new THREE.Shape();
  shape.absarc(0, 0, Math.max(0.1, rOut - bevel), 0, Math.PI * 2, false);
  if (rIn > 0) {
    const inner = new THREE.Path();
    inner.absarc(0, 0, rIn + bevel, 0, Math.PI * 2, true);
    shape.holes.push(inner);
  }
  for (const hole of holes) {
    const p = new THREE.Path();
    p.absarc(hole.x, hole.y, hole.r + bevel, 0, Math.PI * 2, true);
    shape.holes.push(p);
  }
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: Math.max(0.1, h - bevel * 2),
    bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel,
    bevelSegments: 2, curveSegments: Math.max(24, Math.round(segs / 2)),
  });
  geo.rotateY(Math.PI / 2);
  geo.translate((opt.x0 ?? -h / 2) + bevel, 0, 0);
  const n = geo.attributes.position.count;
  geo.setAttribute('aWear', new THREE.BufferAttribute(new Float32Array(n).fill(0.35), 1));
  if (!geo.attributes.uv) geo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n * 2), 2));
  return geo;
}

/* ── boltCircle: Lochkreis-Positionen ──
   count Löcher mit Radius r auf einem Kreis mit Durchmesser dCircle.
   startDeg dreht das Muster — bei geraden Lochzahlen liegt sonst ein
   Loch auf der Achse, was im Halbschnitt schlecht aussieht.

   Beispiel: boltCircle(4, 9, 125, 45)                                   */
export function boltCircle(count, r, dCircle, startDeg = 0) {
  const out = [];
  const rc = dCircle / 2;
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2 + startDeg * D2R;
    out.push({ r, x: rc * Math.cos(t), y: rc * Math.sin(t) });
  }
  return out;
}
