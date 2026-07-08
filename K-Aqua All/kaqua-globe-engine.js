/* K-Aqua Globe Suite — shared rendering engine (plain JS, no deps).
   Provides: token resolution (canvas can't read var() directly, so we
   resolve computed CSS custom properties once and re-resolve on theme
   change), a real-world coastline loader (world-atlas 110m, graticule
   fallback — same data source as kaqua-loader.js), an orthographic
   sphere projector, and a Fibonacci sphere point generator for the
   dot-matrix variation. Pure light-mode: callers always read light
   tokens (kaqua-tokens.css [data-theme="light"]). */
(function () {
  var DATA_URL = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';
  var worldLines = null;
  var listeners = [];

  function decodeTopo(topo) {
    var tr = topo.transform;
    var sx = tr.scale[0], sy = tr.scale[1], tx = tr.translate[0], ty = tr.translate[1];
    var lines = [];
    for (var i = 0; i < topo.arcs.length; i++) {
      var arc = topo.arcs[i];
      var x = 0, y = 0, line = [];
      for (var j = 0; j < arc.length; j++) {
        x += arc[j][0]; y += arc[j][1];
        line.push([x * sx + tx, y * sy + ty]);
      }
      if (line.length > 1) lines.push(line);
    }
    return lines;
  }

  function graticuleLines() {
    var lines = [], lon, lat, line;
    for (lon = -180; lon < 180; lon += 30) {
      line = [];
      for (lat = -80; lat <= 80; lat += 5) line.push([lon, lat]);
      lines.push(line);
    }
    for (lat = -60; lat <= 60; lat += 30) {
      line = [];
      for (lon = -180; lon <= 180; lon += 5) line.push([lon, lat]);
      lines.push(line);
    }
    return lines;
  }
  var fallbackLines = graticuleLines();

  fetch(DATA_URL).then(function (r) { return r.json(); }).then(function (topo) {
    worldLines = decodeTopo(topo);
    listeners.forEach(function (fn) { fn(worldLines); });
  }).catch(function () { /* graticule fallback stays authoritative */ });

  function getWorldLines(cb) {
    if (worldLines) { cb(worldLines); return; }
    cb(fallbackLines);
    listeners.push(cb);
  }

  /* ---- orthographic projection: lon/lat (deg) -> unit sphere coords ---- */
  function project(lon, lat, rotDeg, tiltRad) {
    var lam = (lon + rotDeg) * Math.PI / 180;
    var phi = lat * Math.PI / 180;
    var cp = Math.cos(phi);
    var x = cp * Math.sin(lam);
    var y = Math.sin(phi);
    var z = cp * Math.cos(lam);
    var cT = Math.cos(tiltRad), sT = Math.sin(tiltRad);
    return { x: x, y: y * cT - z * sT, z: y * sT + z * cT };
  }

  /* ---- Fibonacci sphere: N evenly-distributed unit-vector points ---- */
  function fibonacciSphere(n) {
    var pts = [];
    var golden = Math.PI * (3 - Math.sqrt(5));
    for (var i = 0; i < n; i++) {
      var y = 1 - (i / (n - 1)) * 2;
      var r = Math.sqrt(Math.max(0, 1 - y * y));
      var theta = golden * i;
      pts.push({ x: Math.cos(theta) * r, y: y, z: Math.sin(theta) * r });
    }
    return pts;
  }

  function rotatePoint(p, rotYdeg, tiltRad) {
    var rad = rotYdeg * Math.PI / 180;
    var cy = Math.cos(rad), sy = Math.sin(rad);
    var x1 = p.x * cy + p.z * sy;
    var z1 = -p.x * sy + p.z * cy;
    var cT = Math.cos(tiltRad), sT = Math.sin(tiltRad);
    var y2 = p.y * cT - z1 * sT;
    var z2 = p.y * sT + z1 * cT;
    return { x: x1, y: y2, z: z2 };
  }

  /* ---- read resolved token colors from the live DOM (light theme) ---- */
  function readTokens(rootEl) {
    var cs = getComputedStyle(rootEl || document.documentElement);
    var g = function (name) { return cs.getPropertyValue(name).trim(); };
    return {
      primary: g('--primary') || '#5B2D8C',
      primaryHover: g('--primary-hover') || '#4a2470',
      background: g('--background') || '#fafaf9',
      backgroundSubtle: g('--background-subtle') || '#f5f4f2',
      card: g('--card') || '#ffffff',
      cardBorder: g('--card-border') || '#e5e2ea',
      mutedForeground: g('--muted-foreground') || '#78757e',
      faintForeground: g('--faint-foreground') || '#9d9aa1',
      foreground: g('--foreground') || '#38363c',
    };
  }

  function prefersReducedMotion() {
    return typeof window !== 'undefined' && window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  window.KAquaGlobeEngine = {
    getWorldLines: getWorldLines,
    project: project,
    fibonacciSphere: fibonacciSphere,
    rotatePoint: rotatePoint,
    readTokens: readTokens,
    prefersReducedMotion: prefersReducedMotion,
  };
})();
