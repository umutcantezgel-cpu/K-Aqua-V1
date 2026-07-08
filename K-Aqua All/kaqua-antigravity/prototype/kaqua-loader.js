/* K-Aqua Loading Indicator — spinning globe with real country outlines.
   Monochrome (brand purple) on off-white, 200×200, with whirl trails.
   Plain JS, no dependencies. Country borders: world-atlas 110m (fetched,
   minimal inline TopoJSON decoder). Falls back to a graticule globe until
   data arrives. Animation is rAF-driven; in non-painting iframes it simply
   renders one static frame. Overlay auto-dismisses via KAquaLoader.hideOverlay()
   (min display time) plus a hard 8s fallback. */
(function () {
  var COLOR = '#5B2D8C';
  var BG = '#FAF9F7';
  var SIZE = 200;
  var R = 62;                 // globe radius in px
  var DATA_URL = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';

  /* resolve a live CSS custom property (theme/brand-color aware — re-read
     every frame so dark-mode toggle + brand-color tweaks apply instantly) */
  function readToken(name, fallback) {
    try {
      var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return v || fallback;
    } catch (e) { return fallback; }
  }

  var worldLines = null;      // array of [lon,lat][] polylines (shared borders + coasts)
  var redrawHooks = [];

  /* ---- minimal TopoJSON arc decoder: every arc once = clean border mesh ---- */
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

  fetch(DATA_URL).then(function (r) { return r.json(); }).then(function (topo) {
    worldLines = decodeTopo(topo);
    redrawHooks.forEach(function (fn) { fn(); });
  }).catch(function () { /* graticule fallback stays */ });

  /* ---- graticule fallback (meridians + parallels) ---- */
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

  /* ---- orthographic projection ---- */
  var TILT = -0.32;
  var cosT = Math.cos(TILT), sinT = Math.sin(TILT);
  function project(lon, lat, rotDeg, cT, sT) {
    if (cT === undefined) { cT = cosT; sT = sinT; }
    var lam = (lon + rotDeg) * Math.PI / 180;
    var phi = lat * Math.PI / 180;
    var cp = Math.cos(phi);
    var x = cp * Math.sin(lam);
    var y = Math.sin(phi);
    var z = cp * Math.cos(lam);
    return { x: x, y: y * cT - z * sT, z: y * sT + z * cT };
  }

  function createGlobe(canvas, opts) {
    opts = opts || {};
    var size = opts.size || SIZE;
    var R = opts.radius || Math.round(size * 0.31);
    var colorOverride = opts.color;
    var showWhirl = opts.whirl !== false;
    var speed = opts.speed != null ? opts.speed : 0.028;
    var markers = opts.markers || [];
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    var cx = size / 2, cy = size / 2;
    var dragOffset = 0, dragging = false, dragStartX = 0, dragStartY = 0, dragStartOffset = 0, dragStartTilt = 0;
    var tilt = opts.tiltRad != null ? opts.tiltRad : TILT;   // vertical rotation (radians)
    var lastT = 0, activeMarker = null, targetLon = null, targetLat = null;
    var velX = 0, velY = 0, prevX = 0, prevY = 0;
    var TILT_MAX = 1.45;

    function drawWhirl(t) {
      var color = colorOverride || readToken('--primary', COLOR);
      // three comet trails orbiting the globe
      var trails = [
        { r: R + R * 0.21, speed: 0.0016, span: 1.9, width: 2.0, phase: 0 },
        { r: R + R * 0.34, speed: -0.0011, span: 1.4, width: 1.5, phase: 2.4 },
        { r: R + R * 0.47, speed: 0.0007, span: 2.3, width: 1.0, phase: 4.2 },
      ];
      trails.forEach(function (tr) {
        var head = tr.phase + t * tr.speed;
        var steps = 26;
        for (var i = 0; i < steps; i++) {
          var a0 = head - (i / steps) * tr.span;
          var a1 = head - ((i + 1) / steps) * tr.span;
          ctx.beginPath();
          ctx.arc(cx, cy, tr.r, a1, a0);
          ctx.strokeStyle = color;
          ctx.globalAlpha = 0.55 * (1 - i / steps);
          ctx.lineWidth = tr.width * (1 - 0.6 * i / steps);
          ctx.lineCap = 'round';
          ctx.stroke();
        }
      });
      ctx.globalAlpha = 1;
    }

    function drawGlobe(t) {
      var color = colorOverride || readToken('--primary', COLOR);
      var rot = t * speed + dragOffset;
      var cT = Math.cos(tilt), sT = Math.sin(tilt);
      // sphere fill + rim
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = readToken('--primary-soft', 'rgba(91, 45, 140, 0.05)');
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.9;
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.globalAlpha = 1;

      var lines = worldLines || fallbackLines;
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(0.65, R / 95 * 0.65);
      ctx.globalAlpha = 0.85;
      ctx.lineJoin = 'round';
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var started = false;
        ctx.beginPath();
        for (var j = 0; j < line.length; j++) {
          var p = project(line[j][0], line[j][1], rot, cT, sT);
          if (p.z > 0.02) {
            var px = cx + p.x * R, py = cy - p.y * R;
            if (started) ctx.lineTo(px, py); else { ctx.moveTo(px, py); started = true; }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // markers (project points, remember screen position for hit tests)
      for (var m = 0; m < markers.length; m++) {
        var mk = markers[m];
        var mp = project(mk.lon, mk.lat, rot, cT, sT);
        if (mp.z <= 0.05) { mk._sx = null; continue; }
        var mx = cx + mp.x * R, my = cy - mp.y * R;
        mk._sx = mx; mk._sy = my;
        ctx.beginPath();
        ctx.arc(mx, my, mk === activeMarker ? 7 : 4.5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(mx, my, mk === activeMarker ? 12 : 9, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.globalAlpha = 1;
        if (mk === activeMarker && mk.label) {
          ctx.font = '600 13px Inter, sans-serif';
          var tw = ctx.measureText(mk.label).width;
          var lx = Math.min(Math.max(mx + 16, 8), size - tw - 16);
          var ly = my - 14;
          ctx.fillStyle = 'rgba(10, 10, 15, 0.78)';
          ctx.beginPath();
          ctx.roundRect(lx - 7, ly - 14, tw + 14, 22, 6);
          ctx.fill();
          ctx.fillStyle = '#fff';
          ctx.fillText(mk.label, lx, ly + 2);
        }
      }
    }

    function frame(t) {
      ctx.clearRect(0, 0, size, size);
      if (showWhirl) drawWhirl(t);
      drawGlobe(t);
    }

    var running = true;
    function normDeg(a) { return ((a + 180) % 360 + 360) % 360 - 180; }
    function clampTilt(v) { return Math.max(-TILT_MAX, Math.min(TILT_MAX, v)); }
    function loop(t) {
      if (!running) return;
      lastT = t;
      if (!dragging) {
        if (targetLon !== null) {
          var desired = -targetLon - t * speed;
          var diff = normDeg(desired - dragOffset);
          if (Math.abs(diff) < 0.15) { dragOffset = desired; } else { dragOffset += diff * 0.07; }
        }
        if (targetLat !== null) {
          var dLat = targetLat - tilt;
          if (Math.abs(dLat) < 0.003) { tilt = targetLat; } else { tilt += dLat * 0.07; }
        }
        // inertia after release
        if (targetLon === null && Math.abs(velX) > 0.01) { dragOffset += velX; velX *= 0.94; }
        if (targetLat === null && Math.abs(velY) > 0.0004) { tilt = clampTilt(tilt + velY); velY *= 0.94; }
      }
      frame(t);
      requestAnimationFrame(loop);
    }
    frame(0);                       // static first frame (non-painting iframes)
    requestAnimationFrame(loop);
    redrawHooks.push(function () { frame(lastT); });

    /* 360° drag-to-rotate + inertia + marker interaction */
    if (opts.interactive) {
      canvas.style.touchAction = 'none';
      canvas.style.cursor = 'grab';
      canvas.addEventListener('pointerdown', function (e) {
        dragging = true;
        dragStartX = e.clientX; dragStartY = e.clientY;
        dragStartOffset = dragOffset; dragStartTilt = tilt;
        prevX = e.clientX; prevY = e.clientY;
        velX = 0; velY = 0;
        targetLon = null; targetLat = null;
        canvas.style.cursor = 'grabbing';
        try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
      });
      canvas.addEventListener('pointermove', function (e) {
        var rect = canvas.getBoundingClientRect();
        if (dragging) {
          dragOffset = dragStartOffset + (e.clientX - dragStartX) * 0.45;
          tilt = clampTilt(dragStartTilt + (e.clientY - dragStartY) * 0.008);
          velX = (e.clientX - prevX) * 0.45 * 0.55;
          velY = (e.clientY - prevY) * 0.008 * 0.55;
          prevX = e.clientX; prevY = e.clientY;
          if (opts.onDrag) opts.onDrag();
          frame(lastT);
          return;
        }
        var px = e.clientX - rect.left, py = e.clientY - rect.top;
        var hit = null;
        for (var i = 0; i < markers.length; i++) {
          var mk = markers[i];
          if (mk._sx != null && Math.hypot(px - mk._sx, py - mk._sy) < 14) { hit = mk; break; }
        }
        if (hit !== activeMarker) { activeMarker = hit; frame(lastT); }
        canvas.style.cursor = hit ? 'pointer' : 'grab';
        if (opts.onHover) opts.onHover(hit);
      });
      canvas.addEventListener('pointerup', function (e) {
        var moved = Math.abs(e.clientX - dragStartX) > 6 || Math.abs(e.clientY - dragStartY) > 6;
        dragging = false;
        canvas.style.cursor = 'grab';
        if (moved) return;
        velX = 0; velY = 0;
        var rect = canvas.getBoundingClientRect();
        var px = e.clientX - rect.left, py = e.clientY - rect.top;
        for (var i = 0; i < markers.length; i++) {
          var mk = markers[i];
          if (mk._sx != null && Math.hypot(px - mk._sx, py - mk._sy) < 14) {
            if (opts.onMarker) opts.onMarker(mk);
            break;
          }
        }
      });
    }

    return {
      stop: function () { running = false; },
      redraw: function () { frame(lastT); },
      flyTo: function (lon, lat) {
        targetLon = lon;
        if (lat != null) targetLat = clampTilt(lat * Math.PI / 180);
        velX = 0; velY = 0;
      },
      clearTarget: function () { targetLon = null; targetLat = null; },
      setActive: function (title) {
        activeMarker = markers.find(function (m) { return m.title === title; }) || null;
        frame(lastT);
      },
    };
  }

  /* ---- fullscreen overlay (auto when script tag has data-auto) ---- */
  var overlay = null, overlayGlobe = null, shownAt = 0, MIN_SHOW = 1400;

  function mountOverlay() {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:' + readToken('--background', BG) +
      ';display:grid;place-items:center;';
    var canvas = document.createElement('canvas');
    overlay.appendChild(canvas);
    document.body.appendChild(overlay);
    overlayGlobe = createGlobe(canvas);
    shownAt = Date.now();
    // hard fallback: never trap the user
    setTimeout(hideOverlay, 8000);
  }

  function hideOverlay() {
    if (!overlay) return;
    var el = overlay; overlay = null;
    var wait = Math.max(0, MIN_SHOW - (Date.now() - shownAt));
    setTimeout(function () {
      el.style.transition = 'opacity 380ms ease';
      el.style.opacity = '0';
      setTimeout(function () {
        if (el.getAnimations) el.getAnimations().forEach(function (a) { try { a.finish(); } catch (e) {} });
        if (overlayGlobe) overlayGlobe.stop();
        el.remove();
      }, 420);
    }, wait);
  }

  window.KAquaLoader = { createGlobe: createGlobe, mountOverlay: mountOverlay, hideOverlay: hideOverlay };

  var script = document.currentScript;
  if (script && script.hasAttribute('data-auto')) mountOverlay();
})();
