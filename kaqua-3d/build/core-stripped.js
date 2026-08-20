/* core-len:96857 */

/* == core/geometry.js ================================================== */
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


const D2R = Math.PI / 180;
const DRAFT = Math.tan(1 * D2R); // 1° Entformungsschräge

/* Segmentzahlen nach Teil 7. Standen bisher als lokale Konstanten im
   Produktcode — gehören in den Core, sonst driftet die Facettierung
   über 71 Produkte auseinander. */
const SEG_VIS = 96;  // Sichtteile
const SEG_INT = 40;  // Innenteile
const SEG_FINE = 28; // Kleinteile (Auswerfermarken, Bohrungsfasen)

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

function dedupe(pts) {
  const out = [];
  for (const p of pts) {
    const q = out[out.length - 1];
    if (!q || dist(p, q) > 1e-4) out.push(Object.assign({}, p));
    else Object.assign(q, { fillet: p.fillet ?? q.fillet, chamfer: p.chamfer ?? q.chamfer });
  }
  return out;
}

function expandChamfers(pts, closed) {
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
function applyFillets(pts, closed, def, segs) {
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

function buildProfile(pts, opt = {}) {
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
function mirrorProfile(outerHalf, innerHalf) {
  const neg = (p) => Object.assign({}, p, { a: -p.a });
  const mo = outerHalf.slice(1).reverse().map(neg);
  const mi = innerHalf.slice(1).reverse().map(neg);
  return [...mo, ...outerHalf, ...innerHalf.slice().reverse(), ...mi];
}

function arcPts(out, ca, cr, R, t0, t1, n, extra) {
  for (let i = 0; i <= n; i++) {
    const t = t0 + ((t1 - t0) * i) / n;
    out.push(
      Object.assign({ a: ca + R * Math.cos(t), r: cr + R * Math.sin(t), fillet: 0 }, extra)
    );
  }
  return out;
}

function ringGrooves(out, a0, a1, r, n, depth, width) {
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

function thetaSamples(count, halfAng, nIn, nOut) {
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
function grooveMod(count, grooveR, depth, surfR) {
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
function ribMod(count, halfAng, height) {
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

function revolve(profile, opt = {}) {
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
function capFromProfile(profile, axis = 'x') {
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

function polygonCap(pts) {
  const shape = new THREE.Shape();
  pts.forEach((p, i) => (i ? shape.lineTo(p[0], p[1]) : shape.moveTo(p[0], p[1])));
  shape.closePath();
  return new THREE.ShapeGeometry(shape, 1);
}

/* ─────────────────── Loft (Querschnittsfolge) ─────────────────── */

function loft(sections, opt = {}) {
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

function mergeGeometries(list) {
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
function roundedPad(sx, sz, h, r, bevel = 1) {
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
function circleLoop(r, segs = SEG_VIS, wear = 0) {
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
function arcPath(center, R, axis, t0, t1, segs) {
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
function sweepPath(loop, path, opt = {}) {
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

  const idx = [];
  const kMax = closedLoop ? N : N - 1;
  for (let i = 0; i < M - 1; i++) {
    for (let k = 0; k < kMax; k++) {
      const k2 = (k + 1) % N;
      const A = i * N + k, B = i * N + k2;
      const C = (i + 1) * N + k2, Dd = (i + 1) * N + k;
      if (opt.flip) idx.push(A, B, C, A, C, Dd);
      else idx.push(A, C, B, A, Dd, C);
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
function branchJoin(opt) {
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
         'Rp' zylindrisches Innengewinde (Kontur nach innen versetzt)

   Rückgabe: Punktliste [{ a, r, fillet }] ab a = 0 in +a-Richtung, zum
   Einsetzen in eine größere Profilkontur.

   Beispiel — Rp½" Innengewinde, 5 Gänge, ab a = 12:
     const inner = [{ a: 0, r: 9.7, fillet: 0.4 },
       ...threadProfile(20.96, 1.814, 5, 'Rp').map(p => ({ ...p, a: p.a + 12 })),
       { a: 24, r: 9.7, fillet: 0.4 }];                                     */
function threadProfile(D, pitch, turns, kind = 'R') {
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
    const crest = (female ? rMaj - setback : rMaj - shrink + setback);
    const root = (female ? rMaj + h : rMaj - shrink - h);
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
function hexPrism(af, h, filletR = Math.max(0.3, af * 0.05), bevel = 0.5) {
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
function knurl(r, h, count, depth, opt = {}) {
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
function tubeLayers(d, s, layers, opt = {}) {
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
function fusionDepth(dNom) {
  return FUSION_DEPTH[dNom] ?? null;
}

/* ── bendPath: Gerade – Bogen – Gerade ──
   Die Bahn eines Rohrbogens oder Winkels. Beide Schenkel messen L von
   der Achsenschnittstelle bis zur Stirnfläche; der Bogen hat Radius R.

   Der Bogen frisst von jedem Schenkel R·tan(angle/2) — bei 90° also R.
   Ist L kleiner als das, passt kein Bogen dieses Radius hinein und die
   Funktion bricht ab, statt eine Bahn mit negativer Gerade zu liefern.

   Rückgabe [{ c, t }] wie arcPath, verwendbar in sweepPath.

   Beispiel — Winkel 90° d32, Schenkel 37 mm, Bogenradius 16:
     const p = bendPath(37, 90, 16, 20);
     const aussen = sweepPath(circleLoop(22, SEG_VIS), p);                  */
function bendPath(L, angleDeg, R, arcSegs = 20, legSegs = 4) {
  const ang = angleDeg * D2R;
  const setback = R * Math.tan(ang / 2);
  if (setback >= L - 0.5) {
    throw new Error('K-Aqua bendPath: Bogenradius ' + R + ' braucht ' +
      setback.toFixed(1) + ' mm Schenkel, vorhanden ' + L + ' mm');
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
  const faceB = dirB.clone().multiplyScalar(L);

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
function plateWithHoles(rOut, rIn, h, holes = [], opt = {}) {
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
function boltCircle(count, r, dCircle, startDeg = 0) {
  const out = [];
  const rc = dCircle / 2;
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2 + startDeg * D2R;
    out.push({ r, x: rc * Math.cos(t), y: rc * Math.sin(t) });
  }
  return out;
}


/* == core/materials.js ================================================= */
/* K-Aqua 3D · Core — Materialien.

   Eine Registry, 13 Rezepte. Kein Produkt kodiert je eine eigene Farbe:
   es nennt Schlüssel, materials() liefert die THREE-Materialien.

   Alle Werte als Verhältnisse gedacht — beim Tuning die Relation
   matt (Körper) : glänzend (Bedienteil) beibehalten.

   Zu jedem Rezept mit noise:true erzeugt materials() automatisch eine
   zweite Fassung <key>B mit anderem Noise-Seed. Perfekte Symmetrie in
   der Roughness ist ein CG-Erkennungsmerkmal (Teil 7). */


/* Eine einzige Konstante für das PP-R-Grün, damit eine CI-Korrektur
   eine Ein-Zeilen-Änderung bleibt.
   ASSUMPTION: #17A46B ist der auf Albedo hochgerechnete Wert der
   Fotomessung (#00906D…#03997B im Mittelton). Marken-Token (#3AAA35)
   und Website-Hero (#5BB182) widersprechen sich; Foto ist die
   verlässlichste Quelle. Gegen das Originalbauteil zu verifizieren. */
const PPR_GREEN = '#17A46B';

/* ── Registry ──
   noise  Roughness-Map aus prozeduralem Rauschen (Spritzguss)
   wear   Absenkung der Roughness an Fasen (aWear-Attribut), 0 = aus
   sheenFrom  Glanzfarbe wird aus der Grundfarbe gegen Weiß gemischt */
const MAT = {
  pprGreen: {
    color: PPR_GREEN, roughness: 0.44, metalness: 0,
    clearcoat: 0.25, clearcoatRoughness: 0.5,
    sheen: 0.15, sheenFrom: 0.25, sheenRoughness: 0.8,
    envMapIntensity: 0.9, noise: true, wear: 0.42,
  },
  pprPurple: {
    color: '#8E5BA6', roughness: 0.44, metalness: 0,
    clearcoat: 0.25, clearcoatRoughness: 0.5,
    sheen: 0.15, sheenFrom: 0.25, sheenRoughness: 0.8,
    envMapIntensity: 0.9, noise: true, wear: 0.42,
  },
  pprUvBlack: {
    color: '#1A1A1A', roughness: 0.52, metalness: 0,
    clearcoat: 0.18, clearcoatRoughness: 0.55,
    envMapIntensity: 0.8, noise: true, wear: 0.4,
  },
  /* Faserverbund-Kern. Nur im Schnitt und an der Rohrstirn sichtbar —
     dort trägt er das ganze Argument, das 2D nicht leisten kann. */
  fiberLayer: {
    color: '#0E7F55', roughness: 0.55, metalness: 0,
    clearcoat: 0, envMapIntensity: 0.7, noise: true, wear: 0.2,
  },
  /* Kennstreifen. Alle drei sind coextrudiertes PP, kein Metall und
     kein Lack: gleiches Rezept wie der Rohrkörper, nur andere Farbe.
     Die Streifenfarbe kodiert im K-Aqua-System die Baureihe — sie ist
     ein Datenträger, keine Dekoration, und muss deshalb stimmen. */
  redStripe: {
    color: '#CC1F1F', roughness: 0.4, metalness: 0,
    clearcoat: 0.2, clearcoatRoughness: 0.5,
    envMapIntensity: 0.85, noise: true, wear: 0.35,
  },
  blueStripe: {
    color: '#1D4FA3', roughness: 0.4, metalness: 0,
    clearcoat: 0.2, clearcoatRoughness: 0.5,
    envMapIntensity: 0.85, noise: true, wear: 0.35,
  },
  greyStripe: {
    color: '#8A9099', roughness: 0.45, metalness: 0,
    clearcoat: 0.18, clearcoatRoughness: 0.55,
    envMapIntensity: 0.8, noise: true, wear: 0.35,
  },
  brass:  { color: '#C9A227', roughness: 0.3,  metalness: 1, envMapIntensity: 1.4 },
  chrome: { color: '#E8EAED', roughness: 0.06, metalness: 1, envMapIntensity: 1.6 },
  steel:  { color: '#9AA0A6', roughness: 0.34, metalness: 0.85, envMapIntensity: 1.2 },
  ptfe:   { color: '#F2F0EA', roughness: 0.55, metalness: 0, clearcoat: 0, envMapIntensity: 0.6 },
  epdm:   { color: '#121212', roughness: 0.88, metalness: 0,
            sheen: 0.3, sheenColor: '#4a4a4a', envMapIntensity: 0.5 },
  anthracite: {
    color: '#23262A', roughness: 0.26, metalness: 0,
    clearcoat: 0.7, clearcoatRoughness: 0.15,
    envMapIntensity: 1.1, noise: true, wear: 0.5,
  },
  toolRed:   { color: '#B4232A', roughness: 0.35, metalness: 0,
               clearcoat: 0.3, clearcoatRoughness: 0.3, envMapIntensity: 1.0,
               noise: true, wear: 0.4 },
  toolBlack: { color: '#1C1C1E', roughness: 0.4, metalness: 0,
               clearcoat: 0.25, clearcoatRoughness: 0.35, envMapIntensity: 0.95,
               noise: true, wear: 0.4 },
};

/* Prozedurale Roughness-Variation (Canvas, kein Datei-Asset).
   Spritzguss-PP ist nie gleichmäßig glatt; Amplitude ca. ±0,06. */
function noiseTexture(seed, size = 512) {
  let s = seed * 9301 + 49297;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const grids = [8, 24, 96].map((n) => {
    const g = new Float32Array((n + 1) * (n + 1));
    for (let i = 0; i < g.length; i++) g[i] = rnd();
    return { n, g };
  });
  const smp = ({ n, g }, u, v) => {
    const x = u * n, y = v * n;
    const x0 = Math.floor(x), y0 = Math.floor(y);
    const fx = x - x0, fy = y - y0;
    const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
    const i = (xx, yy) => g[Math.min(n, yy) * (n + 1) + Math.min(n, xx)];
    return (
      i(x0, y0) * (1 - sx) * (1 - sy) + i(x0 + 1, y0) * sx * (1 - sy) +
      i(x0, y0 + 1) * (1 - sx) * sy + i(x0 + 1, y0 + 1) * sx * sy
    );
  };
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size, v = y / size;
      const n = smp(grids[0], u, v) * 0.55 + smp(grids[1], u, v) * 0.3 + smp(grids[2], u, v) * 0.15;
      const val = Math.round(255 * (0.86 + 0.14 * n));
      const o = (y * size + x) * 4;
      img.data[o] = img.data[o + 1] = img.data[o + 2] = val;
      img.data[o + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(3, 2);
  t.anisotropy = 4;
  return t;
}

/* Kantenverschleiß: an Fasen und Riffelkanten Roughness absenken
   (Politur durch Handhabung) — Maske kommt als aWear-Attribut aus
   der Geometrie. Meshes ohne das Attribut lesen 0. */
function patchWear(mat, amount = 0.42) {
  mat.onBeforeCompile = (shader) => {
    shader.vertexShader =
      'attribute float aWear;\nvarying float vWear;\n' +
      shader.vertexShader.replace(
        '#include <begin_vertex>',
        '#include <begin_vertex>\n  vWear = aWear;'
      );
    shader.fragmentShader =
      'varying float vWear;\n' +
      shader.fragmentShader.replace(
        '#include <roughnessmap_fragment>',
        '#include <roughnessmap_fragment>\n  roughnessFactor *= (1.0 - ' +
          amount.toFixed(2) + ' * clamp(vWear, 0.0, 1.0));'
      );
  };
  mat.customProgramCacheKey = () => 'wear' + amount;
  return mat;
}

function build(key, recipe, tex) {
  const p = {
    name: key,
    color: new THREE.Color(recipe.color),
    roughness: recipe.roughness,
    metalness: recipe.metalness ?? 0,
    envMapIntensity: recipe.envMapIntensity ?? 1,
  };
  if (recipe.clearcoat !== undefined) {
    p.clearcoat = recipe.clearcoat;
    p.clearcoatRoughness = recipe.clearcoatRoughness ?? 0.4;
  }
  if (recipe.sheen !== undefined) {
    p.sheen = recipe.sheen;
    p.sheenColor = recipe.sheenColor
      ? new THREE.Color(recipe.sheenColor)
      : new THREE.Color(recipe.color).lerp(new THREE.Color('#ffffff'), recipe.sheenFrom ?? 0.25);
    if (recipe.sheenRoughness !== undefined) p.sheenRoughness = recipe.sheenRoughness;
  }
  if (tex) p.roughnessMap = tex;
  const m = new THREE.MeshPhysicalMaterial(p);
  return recipe.wear ? patchWear(m, recipe.wear) : m;
}

/* materials(['pprGreen','ptfe','epdm']) → { pprGreen, pprGreenB, ptfe,
   epdm, caps: {…}, _all, _tex }.

   caps sind die Schnittflächen: dieselbe Farbe abgedunkelt, matt,
   DoubleSide — die Schnittfläche muss massiv wirken, nicht wie eine
   Lücke im Bauteil. */
function materials(keys, seed = 17) {
  const need = keys.some((k) => MAT[k] && MAT[k].noise);
  const tA = need ? noiseTexture(seed) : null;
  const tB = need ? noiseTexture(seed * 247 + 12) /* 17 -> 4211, wie bisher */ : null;
  const M = { _all: [], _tex: [tA, tB].filter(Boolean), caps: {} };

  for (const key of keys) {
    const recipe = MAT[key];
    if (!recipe) throw new Error('K-Aqua: unbekannter Materialschlüssel "' + key + '"');
    M[key] = build(key, recipe, recipe.noise ? tA : null);
    M._all.push(M[key]);
    if (recipe.noise) {
      M[key + 'B'] = build(key + 'B', recipe, tB);
      M._all.push(M[key + 'B']);
    }
  }

  for (const key of Object.keys(M)) {
    if (key.startsWith('_') || key === 'caps') continue;
    const src = M[key];
    const c = new THREE.MeshStandardMaterial({
      name: 'section_' + key,
      color: src.color.clone().multiplyScalar(0.46),
      roughness: 0.95,
      metalness: 0,
      side: THREE.DoubleSide,
    });
    M.caps[key] = c;
    M._all.push(c);
  }
  return M;
}

function disposeMaterials(M) {
  if (!M) return;
  M._all.forEach((m) => m.dispose());
  M._tex.forEach((t) => t.dispose());
}


/* == core/assembly.js ================================================== */
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


const CAP_Z = 0.16; // mm — Schnittfläche minimal vor der Clipping-Ebene

function createAssembly(opt = {}) {
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


/* == core/overlay.js =================================================== */
/* K-Aqua 3D · Core — Overlay.

   Zwei Dinge:
     1. buildDimLines() — echte Maßlinien als Liniengeometrie im Modell,
        mit Pfeilspitzen und Maßhilfslinien. Das Produkt deklariert nur
        { label, value, a, b, off }.
     2. createOverlay() — die DOM-Ebene darüber: Teilebezeichnungen,
        Maßzahlen, Hotspots. Mit Kollisionsvermeidung: ein Label sucht
        sich eine freie Höhe, statt sich über ein anderes zu legen.

   Alle Koordinaten in Millimetern, im Raum des Modell-Roots. */


function buildDimLines(dimSpecs, opt = {}) {
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
function createOverlay({ box, ov, stage }) {
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


/* == core/ui.js ======================================================== */
/* K-Aqua 3D · Core — Bedienrahmen.

   HTML-Gerüst und CSS des Viewers. Produktneutral: Größenknöpfe,
   Metaleiste, Zustandstext und Fallback-Maßtabelle werden aus dem
   Produktvertrag erzeugt. Kein Produkt fügt eigene UI hinzu.

   features steuert, was erscheint:
     'size' 'explode' 'section' 'dims' 'presets'
   Der Auf/Zu-Knopf erscheint nur, wenn product.states gesetzt ist. */

const FRAME_CSS = String.raw`
*, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; height: 100%; }
  body {
    background: var(--color-bg-primary);
    color: var(--color-text-primary);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
  }
  a { color: var(--color-text-link); text-decoration: none; }
  a:hover { color: var(--color-primary-800); }
  three-d-stage:not(:defined) { visibility: hidden; }

  .viewer {
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr auto;
    height: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: var(--space-4) var(--space-4) var(--space-5);
    gap: var(--space-3);
  }

  /* Datenblatt-Kopf */
  .meta { display: flex; align-items: baseline; gap: var(--space-3); flex-wrap: wrap; }
  .overline {
    font: var(--font-weight-bold) 10px/1.2 var(--font-sans);
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: var(--color-text-tertiary);
  }
  .art { font: var(--font-weight-semibold) 15px/1 var(--font-display); letter-spacing: -0.01em; }
  .meta dl { display: flex; gap: var(--space-3); margin: 0; flex-wrap: wrap; }
  .meta dl div { display: flex; gap: 5px; align-items: baseline; }
  .meta dl div[hidden] { display: none; }
  .meta dt { font: 10px/1.2 var(--font-sans); letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-text-tertiary); }
  .meta dd { margin: 0; font: var(--font-weight-medium) 12px/1.2 var(--font-sans); font-variant-numeric: tabular-nums; }

  /* Bühne */
  .stagebox {
    position: relative;
    min-height: 0;
    border-radius: var(--radius-2xl);
    background:
      radial-gradient(120% 90% at 50% 12%, #ffffff 0%, var(--color-neutral-100) 78%);
    border: 1px solid var(--color-border-default);
    overflow: hidden;
    outline: none;
  }
  .stagebox:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 2px; }
  three-d-stage { position: absolute; inset: 0; width: 100%; height: 100%; }

  .skeleton {
    position: absolute; inset: 0;
    display: grid; place-items: center;
    background: var(--color-neutral-100);
    animation: pulse 1.6s var(--ease-in-out) infinite;
  }
  .skeleton span { width: 46%; height: 26%; border-radius: var(--radius-full); background: var(--color-neutral-200); }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }

  .overlay { position: absolute; inset: 0; pointer-events: none; }
  .lbl {
    position: absolute;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    font: var(--font-weight-medium) 11px/1 var(--font-sans);
    color: var(--color-text-secondary);
    background: rgba(255, 255, 255, 0.86);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: var(--radius-full);
    padding: 4px 9px;
    opacity: 0; transition: opacity var(--duration-fast) var(--ease-default);
  }
  .lbl.on { opacity: 1; }
  .dimlbl {
    position: absolute; transform: translate(-50%, -50%);
    font: var(--font-weight-semibold) 11px/1 var(--font-sans);
    font-variant-numeric: tabular-nums;
    color: var(--color-secondary-900);
    background: rgba(255, 255, 255, 0.92);
    border-radius: var(--radius-sm);
    padding: 2px 5px;
    opacity: 0; transition: opacity var(--duration-fast) var(--ease-default);
  }
  .dimlbl.on { opacity: 1; }
  .hot { position: absolute; transform: translate(-50%, -50%); pointer-events: auto; }
  .hot button {
    all: unset;
    display: block; width: 14px; height: 14px; border-radius: var(--radius-full);
    background: var(--color-primary-700);
    box-shadow: 0 0 0 4px rgba(20, 122, 122, 0.18);
    cursor: pointer;
  }
  .hot button:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 3px; }
  .hot .tip {
    position: absolute; left: 50%; bottom: 22px; transform: translateX(-50%) translateY(4px);
    width: max-content; max-width: 210px;
    font: 11px/1.45 var(--font-sans); color: var(--color-text-inverse);
    background: var(--color-secondary-900);
    border-radius: var(--radius-md); padding: 7px 10px;
    opacity: 0; pointer-events: none;
    transition: opacity var(--duration-fast) var(--ease-default), transform var(--duration-fast) var(--ease-default);
  }
  .hot:hover .tip, .hot button:focus-visible + .tip { opacity: 1; transform: translateX(-50%) translateY(0); }

  .state {
    position: absolute; left: var(--space-4); bottom: var(--space-4);
    font: var(--font-weight-medium) 11.5px/1.4 var(--font-sans);
    color: var(--color-text-secondary);
  }
  .state b { font-weight: var(--font-weight-bold); color: var(--color-text-primary); }
  .hint { margin: 3px 0 0; font: 10.5px/1.4 var(--font-sans); color: var(--color-text-tertiary); }

  /* rechte Kante: Darstellungs-Toggles */
  .edge {
    position: absolute; right: var(--space-4); top: 50%; transform: translateY(-50%);
    display: flex; flex-direction: column; gap: 4px;
    padding: 5px;
    background: rgba(255, 255, 255, 0.86);
    backdrop-filter: blur(8px);
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-xs);
  }
  .edge button {
    all: unset;
    display: grid; place-items: center;
    width: 38px; height: 38px; border-radius: var(--radius-lg);
    color: var(--color-text-secondary); cursor: pointer;
    transition: background var(--duration-fast), color var(--duration-fast);
  }
  .edge button:hover { background: var(--color-neutral-100); color: var(--color-text-primary); }
  .edge button[aria-pressed="true"] { background: var(--color-primary-700); color: #fff; }
  .edge button:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 2px; }
  .edge svg { width: 19px; height: 19px; }

  .slider {
    position: absolute; right: calc(var(--space-4) + 52px); top: 50%;
    transform: translateY(-50%);
    display: none; align-items: center; gap: var(--space-2);
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid var(--color-border-default);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-xs);
  }
  .slider.on { display: flex; }
  .slider label { font: var(--font-weight-medium) 10px/1 var(--font-sans); letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-text-tertiary); }
  .slider input { width: 110px; accent-color: var(--color-primary-700); }

  /* untere Leiste */
  .bar {
    display: flex; align-items: center; gap: var(--space-3); flex-wrap: wrap;
    padding: var(--space-2);
    background: var(--color-card-bg);
    border: 1px solid var(--color-card-border);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-sm);
  }
  .seg { display: flex; gap: 2px; padding: 2px; background: var(--color-neutral-100); border-radius: var(--radius-lg); }
  .seg button {
    all: unset;
    min-height: 34px; padding: 0 11px;
    display: grid; place-items: center;
    font: var(--font-weight-semibold) 12px/1 var(--font-sans);
    font-variant-numeric: tabular-nums;
    color: var(--color-text-secondary);
    border-radius: var(--radius-md); cursor: pointer;
    transition: background var(--duration-fast), color var(--duration-fast);
  }
  .seg button:hover { color: var(--color-text-primary); }
  .seg button[aria-pressed="true"] { background: #fff; color: var(--color-primary-700); box-shadow: var(--shadow-xs); }
  .seg button:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 1px; }

  .grp { display: flex; align-items: center; gap: var(--space-2); }
  .grp > .overline { margin-right: 2px; }
  .btn {
    all: unset;
    min-height: 40px; padding: 0 var(--space-4);
    display: inline-flex; align-items: center; gap: 8px;
    font: var(--font-weight-semibold) 13px/1 var(--font-display);
    color: #fff; background: var(--color-button-primary-bg);
    border-radius: var(--radius-xl); cursor: pointer;
    transition: transform var(--duration-normal) var(--ease-default),
                background var(--duration-fast), box-shadow var(--duration-normal);
  }
  .btn:hover { background: var(--color-button-primary-hover); transform: translateY(-1px); box-shadow: var(--shadow-glow); }
  .btn:active { transform: scale(0.97); }
  .btn:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 2px; }
  .btn svg { width: 16px; height: 16px; }
  .ghost {
    all: unset;
    min-height: 34px; padding: 0 11px;
    display: inline-flex; align-items: center;
    font: var(--font-weight-medium) 12px/1 var(--font-sans);
    color: var(--color-text-secondary); border-radius: var(--radius-lg); cursor: pointer;
    transition: background var(--duration-fast), color var(--duration-fast);
  }
  .ghost:hover { background: var(--color-neutral-100); color: var(--color-text-primary); }
  .ghost:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 1px; }
  .spacer { flex: 1 1 auto; }

  .fallback { display: none; padding: var(--space-5); }
  .fallback table { border-collapse: collapse; font: 12px/1.5 var(--font-sans); font-variant-numeric: tabular-nums; }
  .fallback th, .fallback td { border-bottom: 1px solid var(--color-border-default); padding: 5px 12px 5px 0; text-align: left; }
  .nogl .fallback { display: block; }
  .nogl three-d-stage, .nogl .edge, .nogl .slider, .nogl .state { display: none; }

  .sr {
    position: absolute; width: 1px; height: 1px; overflow: hidden;
    clip-path: inset(50%); white-space: nowrap;
  }

  @media (max-width: 720px) {
    .viewer { padding: var(--space-3) var(--space-3) var(--space-4); gap: var(--space-2); }
    .edge { flex-direction: row; top: auto; bottom: var(--space-3); left: 50%; right: auto; transform: translateX(-50%); }
    .slider { top: auto; bottom: calc(var(--space-3) + 52px); left: 50%; right: auto; transform: translateX(-50%); }
    .state { bottom: calc(var(--space-3) + 52px); font-size: 11px; }
    .meta dl { display: none; }
  }
`;

const ICONS = {
  explode: '<path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/>',
  section: '<rect x="3.5" y="3.5" width="17" height="17" rx="3"/>' +
    '<path d="M12 3.5H6.5A3 3 0 0 0 3.5 6.5v11a3 3 0 0 0 3 3H12z" fill="currentColor" opacity=".28" stroke="none"/>' +
    '<path d="M12 3.5v17"/>',
  dims: '<path d="M3 14h18M5 14v-3.5M9.66 14v-2M14.33 14v-2M19 14v-3.5M3 18.5h18"/>',
  toggle: '<path d="M4 12h16M14 6l6 6-6 6"/>',
};
const svg = (d, w) => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' +
  (w || 1.7) + '" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');
const de = (v) =>
  typeof v === 'number' || typeof v === 'string' ? String(v).replace('.', ',') : v;

/* Die Spalten der Fallback-Tabelle: alles, was dimensionKey benennt und
   in den Artikeln tatsächlich vorkommt, plus Gewicht. */
function tableColumns(product) {
  const keys = Object.keys(product.dimensionKey || {});
  const has = (k) => product.articles.some((a) => a[k] !== undefined && a[k] !== null);
  const cols = keys.filter(has);
  if (has('kg')) cols.push('kg');
  return cols;
}

function fallbackTable(product) {
  const cols = tableColumns(product);
  const head = cols.map((k) => '<th>' + esc(k === 'kg' ? 'kg' : k) + '</th>').join('');
  const rows = product.articles.map((a) =>
    '<tr><td>' + esc(a.code) + '</td>' +
    cols.map((k) => '<td>' + esc(de(a[k] ?? '—')) + '</td>').join('') + '</tr>').join('\n        ');
  return '<table>\n        <caption class="sr">Maßtabelle ' + esc(product.titleDe) + '</caption>\n' +
    '        <tr><th>Code</th>' + head + '</tr>\n        ' + rows + '\n      </table>';
}

function frameHTML(product, opt = {}) {
  const f = new Set(opt.features || ['size', 'explode', 'section', 'dims', 'presets']);
  const size = opt.size ?? product.defaultSize;
  const key = product.sizeKey || 'd';
  const first = product.articles.find((a) => String(a[key]) === String(size)) || product.articles[0];
  const meta = (product.metaFields || ['d']).map((k) =>
    '<div id="mw_' + esc(k) + '"' + (first[k] == null ? ' hidden' : '') +
    '><dt>' + esc(k === 'kg' ? 'Gewicht' : k) + '</dt><dd id="m_' + esc(k) + '">' +
    esc(k === 'kg' ? de(Number(first.kg).toFixed(2)) + ' kg' : de(first[k] ?? '—')) +
    '</dd></div>').join('');

  const edge = [];
  if (f.has('explode')) edge.push(['tExplode', 'Explosionsansicht', ICONS.explode]);
  if (f.has('section')) edge.push(['tSection', 'Schnittansicht', ICONS.section]);
  if (f.has('dims')) edge.push(['tDims', 'Bemaßung', ICONS.dims]);

  const st = product.states;
  const stateLine = st
    ? '<b>' + esc(st.open.short) + '</b> — ' + esc(st.open.note)
    : '<b>' + esc(product.titleDe) + '</b>';
  const hint = 'Ziehen zum Drehen · Scrollen zum Zoomen' +
    (st && st.pickHint ? ' · ' + esc(st.pickHint) : '');

  return `<main class="viewer" id="viewer">
  <header class="meta">
    <span class="overline">${esc(product.brandLine || 'K-Aqua')}</span>
    <span class="art" id="artNo">${esc(first.code)}</span>
    <dl id="metaList">${meta}</dl>
  </header>

  <div class="stagebox" id="stagebox" tabindex="0"
       aria-label="Interaktive 3D-Ansicht. Pfeiltasten drehen, Plus und Minus zoomen${st ? ', O schaltet auf und zu' : ''}, R setzt zurück.">
    <three-d-stage id="stage" name="${esc(product.module || 'kaqua')}-d${esc(size)}"
                   background="transparent" autorotate role="img"
                   aria-label="${esc(product.titleDe)} ${esc(first.code)}, dreidimensionale Produktansicht"></three-d-stage>
    <div class="overlay" id="ov"></div>
    <div class="skeleton" id="skel" aria-hidden="true"><span></span></div>
${edge.length ? `
    <div class="edge" role="group" aria-label="Darstellung">
${edge.map(([id, label, d]) => `      <button type="button" id="${id}" aria-pressed="false" title="${label}" aria-label="${label}">
        ${svg(d)}
      </button>`).join('\n')}
    </div>` : ''}
${f.has('explode') ? `
    <div class="slider" id="explodeWrap">
      <label for="explodeRange">Explosion</label>
      <input type="range" id="explodeRange" min="0" max="100" value="0" step="1" aria-label="Explosionsgrad">
    </div>` : ''}

    <div class="state">
      <span id="stateLbl">${stateLine}</span>
      <p class="hint">${hint}</p>
    </div>

    <div class="fallback" id="fallback">
      <p class="overline">3D-Ansicht nicht verfügbar (kein WebGL)</p>
      ${fallbackTable(product)}
    </div>
  </div>

  <footer class="bar">
${f.has('size') && product.sizes.length > 1 ? `    <div class="grp">
      <span class="overline">${esc(product.sizeTitle || 'Nennweite')}</span>
      <div class="seg" id="sizes" role="group" aria-label="Nennweite wählen">
${product.sizes.map((s) => `        <button type="button" data-d="${s}" aria-pressed="${String(s) === String(size)}">${esc(product.sizeLabel ? product.sizeLabel(s) : 'd' + s)}</button>`).join('\n')}
      </div>
    </div>` : ''}
${st ? `    <button type="button" class="btn" id="btnState" aria-pressed="true">
      ${svg(ICONS.toggle, 1.9)}
      <span id="btnStateLbl">${esc(st.closed.action)}</span>
    </button>` : ''}
    <div class="spacer"></div>
${f.has('presets') ? `    <div class="grp" id="presets" role="group" aria-label="Ansicht">
      <span class="overline">Ansicht</span>
      <button type="button" class="ghost" data-v="iso">3/4</button>
      <button type="button" class="ghost" data-v="front">Front</button>
      <button type="button" class="ghost" data-v="top">Draufsicht</button>
${f.has('section') ? '      <button type="button" class="ghost" data-v="section">Schnitt</button>' : ''}
    </div>` : ''}
  </footer>
</main>`;
}


/* == core/viewer.js ==================================================== */
/* K-Aqua 3D · Core — Viewer.

   Die Bedienlogik. Kennt nur den Produktvertrag: keine Größenliste,
   kein Bauteilname, kein Zustandstext ist hier verdrahtet.

   mount(product, opt) übernimmt den Rest:
     · WebGL-Prüfung, Fallback auf Standbild plus Maßtabelle
     · Größenwahl, Explosion, Schnitt mit Stencil-Caps, Bemaßung
     · Kamera-Presets, Tastatur, prefers-reduced-motion
     · Innenlicht, Overlay, Metaleiste, aria-label
     · window.kaqua — Prüfhaken für Phase 4 */


const ISO = { az: -32, el: 18, dist: 1 };

/* Findet die Artikelzeile zu einem Größenschlüssel. product.sizeKey
   nennt das Feld, das eine Zeile eindeutig macht — bei einstufigen
   Produkten 'd', bei reduzierten ein zusammengesetzter Schlüssel wie
   '40x25'. Ohne das kann ein Produkt mit zwei Nennweiten nicht
   adressiert werden. */
function articleOf(product, key) {
  const field = product.sizeKey || 'd';
  const a = product.articles.find((x) => String(x[field]) === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key + ' in ' + product.id);
  return a;
}

const dez = (v) =>
  typeof v === 'number' || typeof v === 'string' ? String(v).replace('.', ',') : v;

function mount(product, opt = {}) {
  const host = opt.host || document.body;
  const features = opt.features || ['size', 'explode', 'section', 'dims', 'presets'];

  if (opt.injectCss !== false) {
    const st = document.createElement('style');
    st.textContent = FRAME_CSS;
    document.head.appendChild(st);
  }
  if (opt.injectHtml !== false) {
    host.insertAdjacentHTML('afterbegin', frameHTML(product, { features, size: opt.size }));
  }

  const $ = (id) => document.getElementById(id);
  const viewer = $('viewer');
  const stage = $('stage');
  const ov = $('ov');
  const box = $('stagebox');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!document.createElement('canvas').getContext('webgl2')) {
    viewer.classList.add('nogl');
    const skel = $('skel');
    if (skel) skel.remove();
    return { product, ok: false };
  }

  const app = { product, stage, ok: true };
  boot();
  return app;

  async function boot() {
    if (!stage || !stage.ready) {
      throw new Error('K-Aqua: <three-d-stage> ist nicht registriert — stage.js fehlt oder ' +
        'wurde nicht geladen, bevor mount() lief.');
    }
    await stage.ready;
    const clip = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0); // verwirft z > 0

    let V = null;
    let size = opt.size ?? product.defaultSize;
    let variant = opt.variant ?? (product.variants && product.variants[0]) ?? null;
    const hasStates = !!product.states;
    let stateT = 1, stateTarget = 1, animFrom = 1, animT0 = 0;
    let explode = 0, section = false, dims = false;
    let dimLines = null;

    const overlay = createOverlay({ box, ov, stage });
    const ANIM = reduced ? 120 : 550;
    const ease = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);

    /* Innenlicht: macht Innenteile durch die Bohrung sichtbar. decay 0,
       damit nur Flächen erhellt werden, die dem Inneren zugewandt sind. */
    const innerLights = [];

    app.clip = clip;

    /* Das Produkt liefert Millimeter, die Szene rechnet in Metern.
       Die Umrechnung passiert genau hier — nicht im Produkt. */
    function rebuild() {
      const prev = V;
      const holder = new THREE.Group();
      holder.name = 'mm_to_m';
      holder.scale.setScalar(0.001);

      V = product.build(size, variant, clip);
      holder.add(V.root);

      if (V.dims && V.dims.length) {
        dimLines = buildDimLines(V.dims, { scale: V.P && V.P.L ? V.P.L : 100 });
        V.root.add(dimLines.group);
      } else {
        dimLines = null;
      }

      if (hasStates && V.setOpen) V.setOpen(stateT);
      V.setExplode(explode);
      V.setSection(section);

      stage.setAttribute('name', (product.module || 'kaqua') + '-d' + size);
      stage.setObject(holder);
      if (prev) prev.dispose();

      // Innenlicht neu setzen
      innerLights.forEach((l) => stage.scene.remove(l));
      innerLights.length = 0;
      for (const v of V.lights || []) {
        const l = new THREE.PointLight(0xfff3e2, 0.32, 0, 0);
        l.position.copy(v).multiplyScalar(0.001);
        stage.scene.add(l);
        innerLights.push(l);
      }

      overlay.build({
        anchors: V.anchors,
        dimEntries: dimLines ? dimLines.entries : [],
        hotspots: V.hotspots,
      });
      updateMeta();
    }

    function updateMeta() {
      const a = articleOf(product, size);
      const art = $('artNo');
      if (art) art.textContent = a.code;
      for (const k of product.metaFields || []) {
        const el = $('m_' + k);
        if (!el) continue;
        const wrap = $('mw_' + k);
        // Spalten, die es für diese Größe nicht gibt, verschwinden ganz —
        // ein „—" in der Metaleiste liest sich wie ein fehlender Wert.
        if (wrap) wrap.hidden = a[k] == null;
        el.textContent = k === 'kg'
          ? dez(Number(a.kg).toFixed(2)) + ' kg'
          : dez(a[k] ?? '—');
      }
      const K = product.dimensionKey || {};
      const fields = (product.ariaFields || Object.keys(K)).filter((k) => a[k] != null);
      const parts = fields.map((k) => (K[k] || k) + ' ' + dez(a[k]) + ' mm');
      if (a.kg != null) parts.push('Gewicht ' + dez(Number(a.kg).toFixed(2)) + ' kg');
      stage.setAttribute('aria-label',
        product.titleDe + ' ' + a.code + ', ' + parts.join(', ') +
        '. Dreidimensionale Produktansicht.');
    }

    /* ── Zustände ── */
    function setState(next) {
      stateTarget = next;
      animFrom = stateT;
      animT0 = performance.now();
      const on = next > 0.5;
      const s = product.states;
      const b = $('btnState');
      if (b) {
        b.setAttribute('aria-pressed', String(on));
        $('btnStateLbl').textContent = on ? s.closed.action : s.open.action;
      }
      const lbl = $('stateLbl');
      if (lbl) {
        const side = on ? s.open : s.closed;
        lbl.innerHTML = '<b>' + side.short + '</b> — ' + side.note;
      }
    }

    function setSection(on) {
      section = on;
      V.setSection(on, clip);
      const t = $('tSection');
      if (t) t.setAttribute('aria-pressed', String(on));
      if (on) {
        if (hasStates && stateTarget < 0.5) setState(1);
        // Halbschnitt bei z = 0: nur schräg sichtbar, frontal deckungsgleich
        stage.flyTo(-36, 16, 0.94, 700);
      }
    }

    function setExplodeUI(on) {
      const t = $('tExplode');
      if (t) t.setAttribute('aria-pressed', String(on));
      const wrapEl = $('explodeWrap');
      if (wrapEl) wrapEl.classList.toggle('on', on);
      if (!on) {
        const r = $('explodeRange');
        if (r) r.value = 0;
        explode = 0;
        V.setExplode(0);
      }
    }

    const sizes = $('sizes');
    if (sizes) sizes.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-d]');
      if (!b) return;
      // Bei zusammengesetzten Schlüsseln ('40x25') darf nicht in eine
      // Zahl gewandelt werden — das ergäbe NaN.
      size = product.sizeKey ? b.dataset.d : Number(b.dataset.d);
      [...b.parentNode.children].forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      rebuild();
    });

    const btnState = $('btnState');
    if (btnState) btnState.addEventListener('click', () => setState(stateTarget > 0.5 ? 0 : 1));

    const tExplode = $('tExplode');
    if (tExplode) tExplode.addEventListener('click', (e) => {
      const on = e.currentTarget.getAttribute('aria-pressed') !== 'true';
      setExplodeUI(on);
      if (on) {
        $('explodeRange').value = 100;
        explode = 1;
        V.setExplode(1);
      }
    });
    const range = $('explodeRange');
    if (range) range.addEventListener('input', (e) => {
      explode = Number(e.target.value) / 100;
      V.setExplode(explode);
    });
    const tSection = $('tSection');
    if (tSection) tSection.addEventListener('click', (e) =>
      setSection(e.currentTarget.getAttribute('aria-pressed') !== 'true'));
    const tDims = $('tDims');
    if (tDims) tDims.addEventListener('click', (e) => {
      dims = e.currentTarget.getAttribute('aria-pressed') !== 'true';
      e.currentTarget.setAttribute('aria-pressed', String(dims));
      if (dims) stage.flyTo(-14, 10, 1.05, 700);
    });

    const presets = $('presets');
    if (presets) presets.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-v]');
      if (!b) return;
      const v = b.dataset.v;
      if (v === 'iso') stage.flyTo(ISO.az, ISO.el, ISO.dist, 700);
      if (v === 'front') stage.flyTo(0, 4, 1, 700);
      if (v === 'top') stage.flyTo(-8, 62, 1, 700);
      if (v === 'section') { if (!section) setSection(true); else stage.flyTo(-36, 16, 0.94, 700); }
    });

    /* Klick auf das Bedienteil schaltet den Zustand; Cursor wird pointer. */
    const pickId = hasStates && product.states.pickPart;
    if (pickId) {
      const ray = new THREE.Raycaster();
      const ptr = new THREE.Vector2();
      const pick = (ev) => {
        const g = V.groups && V.groups[pickId];
        if (!g) return false;
        const r = box.getBoundingClientRect();
        ptr.set(((ev.clientX - r.left) / r.width) * 2 - 1,
          -((ev.clientY - r.top) / r.height) * 2 + 1);
        ray.setFromCamera(ptr, stage.camera);
        return ray.intersectObject(g, true).length > 0;
      };
      stage.addEventListener('pointermove', (e) => { box.style.cursor = pick(e) ? 'pointer' : ''; });
      stage.addEventListener('click', (e) => { if (pick(e)) setState(stateTarget > 0.5 ? 0 : 1); });
    }

    box.addEventListener('keydown', (e) => {
      const k = e.key;
      if (k === 'ArrowLeft') stage.orbitBy(-6, 0);
      else if (k === 'ArrowRight') stage.orbitBy(6, 0);
      else if (k === 'ArrowUp') stage.orbitBy(0, 5);
      else if (k === 'ArrowDown') stage.orbitBy(0, -5);
      else if (k === '+' || k === '=') stage.zoomBy(0.88);
      else if (k === '-') stage.zoomBy(1.14);
      else if ((k === 'o' || k === 'O') && hasStates) setState(stateTarget > 0.5 ? 0 : 1);
      else if (k === 'r' || k === 'R') stage.flyTo(ISO.az, ISO.el, ISO.dist, 500);
      else return;
      e.preventDefault();
    });

    const avoid = [$('explodeWrap')];
    stage.onFrame(() => {
      if (hasStates && stateT !== stateTarget) {
        const k = Math.min(1, (performance.now() - animT0) / ANIM);
        stateT = animFrom + (stateTarget - animFrom) * ease(k);
        if (k >= 1) stateT = stateTarget;
        V.setOpen(stateT);
      }
      overlay.update({
        modelRoot: V.root,
        explode, section,
        showDims: dims,
        dimGroup: dimLines ? dimLines.group : null,
        avoid: explode >= 0.15 ? avoid.filter((el) => el && el.classList.contains('on')) : [],
        isoAzimuth: ISO.az,
      });
    });

    rebuild();
    const skel = $('skel');
    if (skel) skel.remove();

    Object.assign(app, {
      get built() { return V; },
      size: () => size,
      setSize(d) { size = d; rebuild(); },
      measure: () => (V.measures || []).map((m) => ({ ...m, ist: m.ist() })),
      measureAll: () => product.sizes.map((d) => {
        const t = product.build(d, variant, clip);
        const rows = (t.measures || []).map((m) => {
          const ist = m.ist();
          return { key: m.key, soll: m.soll, ist: Math.round(ist * 100) / 100,
            diff: Math.round((ist - m.soll) * 100) / 100 };
        });
        const tri = t.triangleCount ? t.triangleCount() : null;
        t.dispose();
        return { d, rows, ...(tri || {}) };
      }),
      testMode: (m) => V.setTestMode(m),
    });
    window.kaqua = app;
  }
}


/* == core/export.js ==================================================== */
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
async function exportGLB(product, opt = {}) {
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
async function exportGLBAllSizes(product, opt = {}) {
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
async function exportOBJ(product, opt = {}) {
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
async function stills(app, views, opt = {}) {
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
const STILL_VIEWS = [
  { name: 'hero',      az: -32, el: 18, dist: 1,    w: 1600, h: 1200, explode: 0, section: false },
  { name: 'front',     az: 0,   el: 4,  dist: 1,    w: 1200, h: 900,  explode: 0, section: false },
  { name: 'top',       az: -8,  el: 62, dist: 1,    w: 1200, h: 900,  explode: 0, section: false },
  { name: 'section',   az: -36, el: 16, dist: 0.94, w: 1200, h: 900,  explode: 0, section: true },
  { name: 'explosion', az: -32, el: 18, dist: 1.18, w: 1600, h: 1200, explode: 1, section: false },
];

function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
