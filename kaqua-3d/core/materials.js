/* K-Aqua 3D · Core — Materialien.

   Eine Registry, 13 Rezepte. Kein Produkt kodiert je eine eigene Farbe:
   es nennt Schlüssel, materials() liefert die THREE-Materialien.

   Alle Werte als Verhältnisse gedacht — beim Tuning die Relation
   matt (Körper) : glänzend (Bedienteil) beibehalten.

   Zu jedem Rezept mit noise:true erzeugt materials() automatisch eine
   zweite Fassung <key>B mit anderem Noise-Seed. Perfekte Symmetrie in
   der Roughness ist ein CG-Erkennungsmerkmal (Teil 7). */

import * as THREE from 'three';

/* Eine einzige Konstante für das PP-R-Grün, damit eine CI-Korrektur
   eine Ein-Zeilen-Änderung bleibt.
   ASSUMPTION: #17A46B ist der auf Albedo hochgerechnete Wert der
   Fotomessung (#00906D…#03997B im Mittelton). Marken-Token (#3AAA35)
   und Website-Hero (#5BB182) widersprechen sich; Foto ist die
   verlässlichste Quelle. Gegen das Originalbauteil zu verifizieren. */
export const PPR_GREEN = '#17A46B';

/* ── Registry ──
   noise  Roughness-Map aus prozeduralem Rauschen (Spritzguss)
   wear   Absenkung der Roughness an Fasen (aWear-Attribut), 0 = aus
   sheenFrom  Glanzfarbe wird aus der Grundfarbe gegen Weiß gemischt */
export const MAT = {
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
export function noiseTexture(seed, size = 512) {
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
export function patchWear(mat, amount = 0.42) {
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
export function materials(keys, seed = 17) {
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

export function disposeMaterials(M) {
  if (!M) return;
  M._all.forEach((m) => m.dispose());
  M._tex.forEach((t) => t.dispose());
}
