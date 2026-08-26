/* K-Aqua Anbohrsättel — die gemeinsame Geometrie.

   Ein Anbohrsattel ist ein Rotationskörper um die ABZWEIGACHSE, dessen
   Unterseite vom Mantel des Hauptrohrs beschnitten ist. Genau das macht
   ihn zum Sattel: die Schnittkurve ist keine Ebene, sondern sattelförmig
   — tief an den Flanken des Rohrs, hoch auf seinem Scheitel.

   DIE SCHNITTGLEICHUNG. Hauptrohrachse auf X, Radius R. Abzweigachse
   auf Y. Ein Punkt der Sattelkontur im Abstand r von der Abzweigachse,
   unter dem Winkel θ, liegt bei

       (r·cos θ,  y,  r·sin θ)

   und trifft den Rohrmantel y² + z² = R², wenn

       y = √(R² − r²·sin²θ)

   Bei θ = 0 (längs des Rohrs) ist das y = R, der Scheitel. Bei θ = 90°
   (quer) ist es √(R² − r²), also tiefer. Der Unterschied zwischen
   beiden IST die Satteltiefe.

   Kein CSG. Der Schnitt entsteht dadurch, dass jeder Profilpunkt beim
   Abwickeln nach oben geschoben wird, wo die Gleichung es verlangt —
   also durch dieselbe Rechnung, die branchJoin im Core für die
   T-Stück-Kehle führt (Fall 19: eine Aussage, eine Quelle; hier ist es
   dieselbe Geometrie in anderer Rolle, deshalb steht sie mit Verweis
   und nicht als Kopie).

   REICHWEITE. Die Gleichung hat nur eine Lösung, solange r·|sin θ| ≤ R.
   Ein Sattelteller, der breiter ist als das Rohr, hinge seitlich über —
   das prüft der Wächter in params.js und lässt es gar nicht erst zu. */

import * as THREE from 'three';
import { SEG_VIS } from '../../core/index.js';

/* Höhe der Schnittkurve über der Rohrachse, für Radius r und Winkel θ. */
export function sattelY(mainR, r, theta) {
  const q = r * Math.sin(theta);
  const w = mainR * mainR - q * q;
  return w <= 0 ? 0 : Math.sqrt(w);
}

/* Rotationskörper um Y, unten vom Rohrmantel beschnitten.

   `profile` ist eine geschlossene Kontur in (a = Höhe über der
   Rohrachse, r = Abstand von der Abzweigachse), wie bei revolve. Punkte,
   die unter der Schnittkurve liegen, werden auf sie gehoben. */
export function sattelRevolve(profile, opt) {
  const { mainR, segments = SEG_VIS, thetas = null, mod = null } = opt;
  const N = profile.length;
  const S = thetas ? thetas.length : segments + 1;
  const pos = new Float32Array(N * S * 3);
  const uv = new Float32Array(N * S * 2);
  const wear = new Float32Array(N * S);

  /* v-Koordinate wie bei revolve: Bogenlänge entlang der Kontur. */
  const vArr = new Float32Array(N);
  let total = 0;
  for (let i = 1; i < N; i++) {
    const dx = profile[i].a - profile[i - 1].a;
    const dr = profile[i].r - profile[i - 1].r;
    total += Math.hypot(dx, dr);
    vArr[i] = total;
  }
  if (total > 0) for (let i = 0; i < N; i++) vArr[i] /= total;

  for (let j = 0; j < S; j++) {
    const th = thetas ? thetas[j] : (j / segments) * Math.PI * 2;
    /* Modulation wie bei revolve im Core: mod(θ) verschiebt den Radius
       der Punkte mit w > 0 — hier für die Griffrippen des Bosses (M10).
       Der Sattelschnitt rechnet mit dem UNMODULIERTEN r weiter: die
       Rippen enden oberhalb des Tellers und erreichen die Schnittkurve
       nicht. */
    const m = mod ? mod(th) : 0;
    const c = Math.cos(th), s = Math.sin(th);
    for (let i = 0; i < N; i++) {
      const p = profile[i];
      const pr = Math.max(0, p.r + m * (p.w || 0));
      const yCut = sattelY(mainR, p.r, th);
      const y = Math.max(p.a, yCut);
      const k = j * N + i;
      pos[k * 3] = pr * c;
      pos[k * 3 + 1] = y;
      pos[k * 3 + 2] = pr * s;
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
      const D = (j + 1) * N + i;
      idx.push(A, C, B, A, D, C);
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

/* Der Boden des Sattels: die Ringfläche zwischen Fußaußenrand und
   Spigotbohrung, beide auf die Schnittkurve gelegt. Ohne sie steht der
   Sattel unten offen. */
export function sattelBoden(rInnen, rAussen, mainR, segments = SEG_VIS) {
  const S = segments + 1;
  const pos = new Float32Array(2 * S * 3);
  const uv = new Float32Array(2 * S * 2);
  const wear = new Float32Array(2 * S);
  for (let j = 0; j < S; j++) {
    const th = (j / segments) * Math.PI * 2;
    const c = Math.cos(th), s = Math.sin(th);
    [rInnen, rAussen].forEach((r, i) => {
      const k = (j * 2 + i) * 3;
      pos[k] = r * c;
      pos[k + 1] = sattelY(mainR, r, th);
      pos[k + 2] = r * s;
      uv[(j * 2 + i) * 2] = th / (Math.PI * 2);
      uv[(j * 2 + i) * 2 + 1] = i;
    });
  }
  const idx = [];
  for (let j = 0; j < S - 1; j++) {
    const a = j * 2, b = j * 2 + 1, c = (j + 1) * 2 + 1, d = (j + 1) * 2;
    idx.push(a, b, c, a, c, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setAttribute('aWear', new THREE.BufferAttribute(wear, 1));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/* Hilfe für den Prüfbericht: die Satteltiefe, also der Höhenunterschied
   der Schnittkurve zwischen Rohrlängsrichtung und Querrichtung. Sie ist
   das Maß, an dem sich zeigt, ob der Sattel überhaupt einer ist —
   bei einer ebenen Unterseite wäre sie null. */
export function satteltiefe(mainR, r) {
  return sattelY(mainR, r, 0) - sattelY(mainR, r, Math.PI / 2);
}

