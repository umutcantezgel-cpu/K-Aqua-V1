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

   HERLEITUNG (31.08.2026). Der Wert stammt aus einer Messung über 14
   Herstelleraufnahmen unter Marketing/Produktbilder/ — rund 207 000
   Bildpunkte, die eindeutig zum Bauteil gehören (Hintergrund, Schatten
   und entsättigte Ränder ausgeschlossen):

     Schattenviertel  #1D593C
     Mittelton        #2D7E59      häufigste Töne #207050 / #207858
     Glanzviertel     #45A075

   Der Mittelton, um den Verlust durch Beleuchtung und ACES-Tonemapping
   (Faktor ~0,72) auf Albedo hochgerechnet, ergibt #32A175 — und genau das
   steht hier.

   Warum nicht der vorherige Wert #17A46B: gleiche Helligkeit, aber
   Sättigung 0,86 statt der gemessenen 0,62. Das war der Grund für den
   grellen, unnatürlichen Eindruck. Warum nicht RAL 6024 (#008351): das ist
   die Normfarbe des Granulats und im Rendering deutlich zu dunkel — die
   Aufnahmen des Herstellers zeigen das fertige Bauteil heller.

   Maßgeblich ist also das Bauteil, wie der Hersteller es selbst abbildet. */
export const PPR_GREEN = '#32A175';
/** Normfarbe des Granulats laut Marketing/Produktbilder/grün (RAL 6024). */
export const PPR_GREEN_RAL6024 = '#008351';

/* ── Registry ──
   noise  Roughness-Map aus prozeduralem Rauschen (Spritzguss)
   wear   Absenkung der Roughness an Fasen (aWear-Attribut), 0 = aus
   emboss Prägeschrift „Made in Germany" als Normalmap. Nur auf den
          PP-Körpern: Kennstreifen, Faserkern, Messing, Chrom und Dichtungen
          tragen am realen Bauteil keine.
   sheenFrom  Glanzfarbe wird aus der Grundfarbe gegen Weiß gemischt */
export const MAT = {
  pprGreen: {
    color: PPR_GREEN, roughness: 0.44, metalness: 0,
    clearcoat: 0.25, clearcoatRoughness: 0.5,
    sheen: 0.15, sheenFrom: 0.25, sheenRoughness: 0.8,
    envMapIntensity: 0.9, emboss: true, noise: true, wear: 0.42,
  },
  pprPurple: {
    color: '#8E5BA6', roughness: 0.44, metalness: 0,
    clearcoat: 0.25, clearcoatRoughness: 0.5,
    sheen: 0.15, sheenFrom: 0.25, sheenRoughness: 0.8,
    envMapIntensity: 0.9, emboss: true, noise: true, wear: 0.42,
  },
  pprUvBlack: {
    color: '#1A1A1A', roughness: 0.52, metalness: 0,
    clearcoat: 0.18, clearcoatRoughness: 0.55,
    envMapIntensity: 0.8, emboss: true, noise: true, wear: 0.4,
  },
  /* ── Sonderfarben der Rohrserien ──
     Die Rohrserien sind neben dem Standardgrün auch in Blau, Curry und Mocca
     lieferbar — etwa zur Kennzeichnung getrennter Leitungssysteme.

     Quelle der Farbwerte sind die Ordnernamen des Herstellerarchivs:
     Marketing/Produktbilder/{blau (RAL 5005), curry (RAL 1002),
     Mocca (RAL 7032)}. Maßgeblich ist die RAL-Nummer, nicht der Fotopixel:
     die dort abgelegten Marketing-Renderings sind aufgehellt und gesättigt
     (gemessen ~#2E43A0 / ~#C68B2D / ~#B5A99A) und geben die Norm nicht wieder.

     Rezeptaufbau identisch zu pprGreen — es ist derselbe Werkstoff in einer
     anderen Einfärbung, nicht ein anderes Material. */
  pprBlue: {
    color: '#005387', roughness: 0.44, metalness: 0,
    clearcoat: 0.25, clearcoatRoughness: 0.5,
    sheen: 0.15, sheenFrom: 0.25, sheenRoughness: 0.8,
    envMapIntensity: 0.9, emboss: true, noise: true, wear: 0.42,
  },
  pprCurry: {
    color: '#C6A664', roughness: 0.44, metalness: 0,
    clearcoat: 0.25, clearcoatRoughness: 0.5,
    sheen: 0.15, sheenFrom: 0.25, sheenRoughness: 0.8,
    envMapIntensity: 0.9, emboss: true, noise: true, wear: 0.42,
  },
  pprMocca: {
    color: '#B9B9A8', roughness: 0.44, metalness: 0,
    clearcoat: 0.25, clearcoatRoughness: 0.5,
    sheen: 0.15, sheenFrom: 0.25, sheenRoughness: 0.8,
    envMapIntensity: 0.9, emboss: true, noise: true, wear: 0.42,
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

/* ── Prägeschrift ──

   Ein Spritzgussteil trägt seine Herkunft als Erhebung im Polymer, nicht als
   Aufdruck: gleiche Farbe, gleiche Oberfläche, nur Licht und Schatten machen
   sie lesbar. Genau das leistet eine Normalmap — und nur sie kommt hier
   infrage:

   · Echte Buchstabengeometrie scheidet aus. tests/unit/kaqua3d-geometry.test.ts
     deckelt bei 400 000 Vertices je Produkt und 4 000 000 über die Bibliothek;
     gemessen liegen wir bei 3,64 Mio. Ein lesbarer Schriftzug als Geometrie
     sprengt das Budget.
   · Ein eigener Shaderpatch scheidet ebenfalls aus: patchWear() belegt
     mat.onBeforeCompile bereits, ein zweiter würde ihn ersatzlos überschreiben
     und den Kantenverschleiß aller Bauteile abschalten.

   Bleibt der reguläre normalMap-Slot. Kostet keine Dreiecke und keinen Patch.

   PLATZIERUNG: revolve() bildet den Winkel als u = θ/2π ab (geometry.js).
   Bei Hauptachse X ist y = r·cos θ, θ = 180° also exakt unten — dort bekäme
   die Prägung im Web-Viewer aber nie Licht (Native3DCanvas hat kein Licht von
   unten, anders als die Standalone-Bühne). Deshalb u ≈ 0,555, das sind rund
   200°: an der unteren Flanke, wo sie beim Drehen Streiflicht bekommt und
   lesbar wird, ohne herauszustechen.

   ACHTUNG bei Änderungen: Die erzeugte Textur muss in M._tex landen, sonst
   gibt disposeMaterials() sie nie frei und sie leckt bei jedem Modellwechsel. */
const PRAEGE_TEXT = 'MADE IN GERMANY';

export function embossTexture(text = PRAEGE_TEXT, opt = {}) {
  const W = opt.width ?? 1024;
  const H = opt.height ?? 512;
  /* Mittelpunkt der Schrift in UV. 0,555 ≙ θ ≈ 200° (untere Flanke). */
  const cu = opt.u ?? 0.555;
  const cv = opt.v ?? 0.5;
  const hoehe = opt.strength ?? 1.0;

  /* Ohne brauchbares Canvas KEINE Prägung — und vor allem kein Fehler.
     Die Modelle werden nicht nur im Browser gebaut: `lib/bim/model3d.ts`
     erzeugt sie serverseitig für den IFC- und CAD-Export, und dort gibt es
     weder ein Canvas noch getImageData. Ein Fehler an dieser Stelle nähme
     dem Export die komplette Geometrie — die Prägung ist Oberfläche, sie
     darf niemals das Bauteil kosten. */
  if (typeof document === 'undefined' || typeof document.createElement !== 'function') return null;
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const ctx = c.getContext('2d');
  if (!ctx || typeof ctx.getImageData !== 'function' || typeof ctx.fillText !== 'function') return null;

  /* Schritt 1: Höhenfeld. Weiß auf Schwarz, mittig auf (cu, cv). */
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  /* Inter liegt als Schrift der Seite ohnehin vor; die Kette dahinter fängt
     den Fall ab, dass sie beim Bau der Textur noch nicht geladen ist. */
  ctx.font = `700 ${opt.fontPx ?? 46}px Inter, "Helvetica Neue", Arial, sans-serif`;
  ctx.letterSpacing = '6px';
  ctx.fillText(text, cu * W, cv * H);

  const hf = ctx.getImageData(0, 0, W, H).data;

  /* Schritt 2: Weichzeichnen. Ein Spritzgussteil hat keine scharfen Kanten —
     ohne diesen Schritt bekämen die Buchstaben eine Klippe statt einer
     Flanke, und genau die Flanke ist es, die das Licht bricht. */
  const h = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) h[i] = hf[i * 4] / 255;
  const R = opt.blur ?? 3;
  const tmp = new Float32Array(W * H);
  const kernel = 2 * R + 1;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let s = 0;
      for (let k = -R; k <= R; k++) s += h[y * W + Math.min(W - 1, Math.max(0, x + k))];
      tmp[y * W + x] = s / kernel;
    }
  }
  for (let x = 0; x < W; x++) {
    for (let y = 0; y < H; y++) {
      let s = 0;
      for (let k = -R; k <= R; k++) s += tmp[Math.min(H - 1, Math.max(0, y + k)) * W + x];
      h[y * W + x] = s / kernel;
    }
  }

  /* Schritt 3: Höhenfeld → Normalmap (Sobel). */
  const img = ctx.createImageData(W, H);
  const at = (x, y) => h[Math.min(H - 1, Math.max(0, y)) * W + Math.min(W - 1, Math.max(0, x))];
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const dx =
        (at(x + 1, y - 1) + 2 * at(x + 1, y) + at(x + 1, y + 1)) -
        (at(x - 1, y - 1) + 2 * at(x - 1, y) + at(x - 1, y + 1));
      const dy =
        (at(x - 1, y + 1) + 2 * at(x, y + 1) + at(x + 1, y + 1)) -
        (at(x - 1, y - 1) + 2 * at(x, y - 1) + at(x + 1, y - 1));
      let nx = -dx * hoehe, ny = -dy * hoehe, nz = 1;
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
      nx /= len; ny /= len; nz /= len;
      const o = (y * W + x) * 4;
      img.data[o] = Math.round((nx * 0.5 + 0.5) * 255);
      img.data[o + 1] = Math.round((ny * 0.5 + 0.5) * 255);
      img.data[o + 2] = Math.round((nz * 0.5 + 0.5) * 255);
      img.data[o + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  const t = new THREE.CanvasTexture(c);
  /* Kein RepeatWrapping wie bei der Rauschtextur: der Schriftzug soll genau
     einmal an genau dieser Stelle stehen. */
  t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  /* Eine Normalmap ist keine Farbe und darf nicht sRGB-dekodiert werden. */
  t.colorSpace = THREE.NoColorSpace;
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

function build(key, recipe, tex, emboss) {
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
  /* Prägeschrift. Niedrige normalScale: sie soll das Licht brechen, nicht
     plastisch aufspringen — „nicht herausstechend" ist die Vorgabe. */
  if (emboss) {
    p.normalMap = emboss;
    p.normalScale = new THREE.Vector2(0.4, 0.4);
  }
  const m = new THREE.MeshPhysicalMaterial(p);
  return recipe.wear ? patchWear(m, recipe.wear) : m;
}

/* materials(['pprGreen','ptfe','epdm']) → { pprGreen, pprGreenB, ptfe,
   epdm, caps: {…}, _all, _tex }.

   caps sind die Schnittflächen: dieselbe Farbe abgedunkelt, matt,
   DoubleSide — die Schnittfläche muss massiv wirken, nicht wie eine
   Lücke im Bauteil. */
export function materials(keys, seed = 17, opt = {}) {
  const need = keys.some((k) => MAT[k] && MAT[k].noise);
  const tA = need ? noiseTexture(seed) : null;
  const tB = need ? noiseTexture(seed * 247 + 12) /* 17 -> 4211, wie bisher */ : null;
  /* Die Prägung sitzt auf den PP-Körpern, nicht auf Messing, Chrom oder
     Dichtungen — dort gibt es sie am realen Bauteil auch nicht. `emboss`
     kann per Option abgeschaltet werden (Prüfläufe, Exporte). */
  const praegen = opt.emboss !== false && keys.some((k) => MAT[k] && MAT[k].emboss);
  const tE = praegen ? embossTexture(opt.embossText) : null;

  const M = { _all: [], _tex: [tA, tB, tE].filter(Boolean), caps: {} };

  for (const key of keys) {
    const recipe = MAT[key];
    if (!recipe) throw new Error('K-Aqua: unbekannter Materialschlüssel "' + key + '"');
    const e = recipe.emboss ? tE : null;
    M[key] = build(key, recipe, recipe.noise ? tA : null, e);
    M._all.push(M[key]);
    if (recipe.noise) {
      M[key + 'B'] = build(key + 'B', recipe, tB, e);
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
