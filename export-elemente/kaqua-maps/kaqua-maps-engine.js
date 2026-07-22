/* K Aqua Maps Suite — helle Kartenengine (Canvas 2D, Web Mercator).
   Prototypischer Ersatz für die Google Maps Vektorkarte: gleiche Kamerasemantik
   (center/zoom, flyTo mit Neigung ausgespart), Landmassen aus world-atlas 110m,
   Beschriftung je Locale, Zoometikette mit Strg, Ruhelast null bei Inaktivität. */
(function () {
  'use strict';
  if (window.KMapsEngine) return;

  var DATA_URL = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';
  var TILE = 256;
  var STYLE = {
    ocean: '#D9E9F2',
    land: '#FBFAFC',
    landEdge: '#E4E0EA',
    border: '#D8D3E0',
    labelBig: '#8B8598',
    label: '#6E6880',
    halo: 'rgba(255,255,255,0.85)'
  };

  /* ---------- Weltdaten: einmal laden, überall teilen ---------- */
  var worldPromise = null;
  function loadWorld() {
    if (worldPromise) return worldPromise;
    worldPromise = fetch(DATA_URL).then(function (r) { return r.json(); }).then(function (topo) {
      var fc = topojson.feature(topo, topo.objects.countries);
      var rings = [];
      fc.features.forEach(function (f) {
        var g = f.geometry; if (!g) return;
        var polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
        polys.forEach(function (poly) {
          poly.forEach(function (ring, ri) {
            var pts = new Float64Array(ring.length * 2);
            var minX = 999, minY = 999, maxX = -999, maxY = -999;
            for (var i = 0; i < ring.length; i++) {
              var m = merc(ring[i][0], ring[i][1]);
              pts[i * 2] = m[0]; pts[i * 2 + 1] = m[1];
              if (m[0] < minX) minX = m[0]; if (m[0] > maxX) maxX = m[0];
              if (m[1] < minY) minY = m[1]; if (m[1] > maxY) maxY = m[1];
            }
            rings.push({ pts: pts, hole: ri > 0, minX: minX, minY: minY, maxX: maxX, maxY: maxY });
          });
        });
      });
      return rings;
    });
    return worldPromise;
  }

  /* ---------- Projektion (Welt in [0,1]) ---------- */
  function merc(lng, lat) {
    var x = (lng + 180) / 360;
    var s = Math.sin(lat * Math.PI / 180);
    s = Math.max(-0.9999, Math.min(0.9999, s));
    var y = 0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI);
    return [x, y];
  }
  function unmerc(x, y) {
    var lng = x * 360 - 180;
    var n = Math.PI - 2 * Math.PI * y;
    var lat = 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
    return { lng: lng, lat: lat };
  }
  function easeInOut(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

  /* Großkreis zwischen zwei Orten (für die Lieferachse) */
  function geodesic(a, b, n) {
    n = n || 64;
    var toR = Math.PI / 180, toD = 180 / Math.PI;
    var la1 = a.lat * toR, lo1 = a.lng * toR, la2 = b.lat * toR, lo2 = b.lng * toR;
    var d = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin((la2 - la1) / 2), 2) + Math.cos(la1) * Math.cos(la2) * Math.pow(Math.sin((lo2 - lo1) / 2), 2)));
    if (d < 1e-9) return [a, b];
    var out = [];
    for (var i = 0; i <= n; i++) {
      var f = i / n;
      var A = Math.sin((1 - f) * d) / Math.sin(d), B = Math.sin(f * d) / Math.sin(d);
      var x = A * Math.cos(la1) * Math.cos(lo1) + B * Math.cos(la2) * Math.cos(lo2);
      var y = A * Math.cos(la1) * Math.sin(lo1) + B * Math.cos(la2) * Math.sin(lo2);
      var z = A * Math.sin(la1) + B * Math.sin(la2);
      out.push({ lat: Math.atan2(z, Math.sqrt(x * x + y * y)) * toD, lng: Math.atan2(y, x) * toD });
    }
    return out;
  }
  function haversineKm(a, b) {
    var R = 6371, toR = Math.PI / 180;
    var dLa = (b.lat - a.lat) * toR, dLo = (b.lng - a.lng) * toR;
    var h = Math.sin(dLa / 2) * Math.sin(dLa / 2) + Math.cos(a.lat * toR) * Math.cos(b.lat * toR) * Math.sin(dLo / 2) * Math.sin(dLo / 2);
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  /* ---------- Engine ---------- */
  function create(canvas, opts) {
    opts = opts || {};
    var ctx = canvas.getContext('2d');
    var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var cam = { x: 0.5, y: 0.36, z: opts.zoom || 3 };
    if (opts.center) { var m0 = merc(opts.center.lng, opts.center.lat); cam.x = m0[0]; cam.y = m0[1]; }
    var minZ = opts.minZoom || 2.2, maxZ = opts.maxZoom || 13.5;
    var rings = null, ready = false;
    var W = 0, H = 0, DPR = 1;
    var dirty = true, raf = 0, active = true, visible = true;
    var anim = null;
    var labels = opts.labels || [];
    var locale = opts.locale || 'de';
    var listeners = { move: [], click: [], ready: [] };
    var interactive = opts.interactive !== false;
    var dead = false;

    function emit(ev, a, b) { listeners[ev].forEach(function (f) { f(a, b); }); }
    function on(ev, f) { listeners[ev].push(f); return function () { var i = listeners[ev].indexOf(f); if (i >= 0) listeners[ev].splice(i, 1); }; }

    function scale() { return TILE * Math.pow(2, cam.z); }
    function project(lng, lat) {
      var m = merc(lng, lat), s = scale();
      return [(m[0] - cam.x) * s + W / 2, (m[1] - cam.y) * s + H / 2];
    }
    function unproject(px, py) {
      var s = scale();
      return unmerc(cam.x + (px - W / 2) / s, cam.y + (py - H / 2) / s);
    }
    function metersPerPixel() {
      var lat = unmerc(cam.x, cam.y).lat;
      return 156543.03392 * Math.cos(lat * Math.PI / 180) / Math.pow(2, cam.z);
    }

    function resize() {
      var r = canvas.getBoundingClientRect();
      DPR = Math.min(2, window.devicePixelRatio || 1);
      W = Math.max(10, r.width); H = Math.max(10, r.height);
      canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
      dirty = true; tick();
    }

    function render() {
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      var wg = ctx.createLinearGradient(0, 0, 0, H);
      wg.addColorStop(0, '#DEEDF5'); wg.addColorStop(1, '#D2E3EF');
      ctx.fillStyle = wg; ctx.fillRect(0, 0, W, H);
      var s = scale();
      if (cam.z <= 5.6) {
        ctx.strokeStyle = 'rgba(90,120,150,0.08)'; ctx.lineWidth = 1; ctx.beginPath();
        for (var lg = -180; lg <= 180; lg += 15) { var gx = ((lg + 180) / 360 - cam.x) * s + W / 2; if (gx < -2 || gx > W + 2) continue; ctx.moveTo(gx, 0); ctx.lineTo(gx, H); }
        for (var lt = -75; lt <= 75; lt += 15) { var gm = merc(0, lt), gy = (gm[1] - cam.y) * s + H / 2; if (gy < -2 || gy > H + 2) continue; ctx.moveTo(0, gy); ctx.lineTo(W, gy); }
        ctx.stroke();
      }
      var vx0 = cam.x - (W / 2) / s, vx1 = cam.x + (W / 2) / s;
      var vy0 = cam.y - (H / 2) / s, vy1 = cam.y + (H / 2) / s;
      if (rings) {
        ctx.beginPath();
        for (var i = 0; i < rings.length; i++) {
          var rg = rings[i];
          if (rg.maxX < vx0 || rg.minX > vx1 || rg.maxY < vy0 || rg.minY > vy1) continue;
          if ((rg.maxX - rg.minX) * s < 1.6 && (rg.maxY - rg.minY) * s < 1.6) continue;
          tracePath(ctx, rg, s);
        }
        ctx.strokeStyle = 'rgba(96,158,196,0.20)'; ctx.lineWidth = 4.5; ctx.stroke();
        ctx.fillStyle = STYLE.land; ctx.fill('evenodd');
        ctx.strokeStyle = cam.z > 5.5 ? STYLE.landEdge : STYLE.border;
        ctx.lineWidth = cam.z > 5.5 ? 1.1 : 0.7;
        ctx.stroke();
      } else {
        /* Rückfall bis Daten da sind: feines Gradnetz */
        ctx.strokeStyle = STYLE.border; ctx.lineWidth = 0.5; ctx.beginPath();
        for (var gx = 0; gx <= 1.001; gx += 1 / 24) { var px = (gx - cam.x) * s + W / 2; ctx.moveTo(px, 0); ctx.lineTo(px, H); }
        for (var gy = 0; gy <= 1.001; gy += 1 / 24) { var py = (gy - cam.y) * s + H / 2; ctx.moveTo(0, py); ctx.lineTo(W, py); }
        ctx.stroke();
      }
      if (opts.drawUnderLabels) opts.drawUnderLabels(ctx, api);
      drawLabels();
      if (opts.drawOverlay) opts.drawOverlay(ctx, api);
      emit('move', api);
    }

    function tracePath(c, rg, s) {
      var pts = rg.pts;
      var x0 = (pts[0] - cam.x) * s + W / 2, y0 = (pts[1] - cam.y) * s + H / 2;
      c.moveTo(x0, y0);
      var lastX = x0, lastY = y0;
      for (var i = 2; i < pts.length; i += 2) {
        var x = (pts[i] - cam.x) * s + W / 2, y = (pts[i + 1] - cam.y) * s + H / 2;
        if (Math.abs(x - lastX) + Math.abs(y - lastY) < 0.8 && i < pts.length - 2) continue;
        c.lineTo(x, y); lastX = x; lastY = y;
      }
      c.closePath();
    }

    function drawLabels() {
      if (!labels.length) return;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      for (var i = 0; i < labels.length; i++) {
        var L = labels[i];
        if (cam.z < L.min || cam.z > L.max) continue;
        var p = project(L.lng, L.lat);
        if (p[0] < -80 || p[0] > W + 80 || p[1] < -20 || p[1] > H + 20) continue;
        var txt = L[locale] || L.de;
        if (L.big) {
          ctx.font = '600 12.5px Inter, sans-serif';
          ctx.strokeStyle = STYLE.halo; ctx.lineWidth = 3;
          var up = txt.toUpperCase();
          ctx.strokeText(up, p[0], p[1]); ctx.fillStyle = STYLE.labelBig; ctx.fillText(up, p[0], p[1]);
        } else {
          ctx.font = '500 12px Inter, sans-serif';
          ctx.strokeStyle = STYLE.halo; ctx.lineWidth = 3;
          ctx.strokeText(txt, p[0], p[1] - 10); ctx.fillStyle = STYLE.label; ctx.fillText(txt, p[0], p[1] - 10);
          ctx.fillStyle = STYLE.label; ctx.beginPath(); ctx.arc(p[0], p[1], 2, 0, 6.2832); ctx.fill();
        }
      }
    }

    function tick() {
      if (raf || dead) return;
      raf = requestAnimationFrame(function step(now) {
        raf = 0;
        if (dead || !active || !visible) return;
        if (anim) {
          var t = Math.min(1, (now - anim.t0) / anim.dur);
          var e = easeInOut(t);
          cam.x = anim.x0 + (anim.x1 - anim.x0) * e;
          cam.y = anim.y0 + (anim.y1 - anim.y0) * e;
          cam.z = anim.z0 + (anim.z1 - anim.z0) * e;
          if (t >= 1) { var done = anim.done; anim = null; render(); if (done) done(); }
          else { render(); raf = requestAnimationFrame(step); }
          return;
        }
        if (dirty) { dirty = false; render(); }
      });
    }
    function invalidate() { dirty = true; tick(); }

    function flyTo(target, duration, done) {
      var m = merc(target.lng, target.lat);
      var z = Math.max(minZ, Math.min(maxZ, target.zoom != null ? target.zoom : cam.z));
      if (reduced || duration === 0) { cam.x = m[0]; cam.y = m[1]; cam.z = z; anim = null; invalidate(); if (done) done(); return; }
      anim = { t0: performance.now(), dur: duration || 1400, x0: cam.x, y0: cam.y, z0: cam.z, x1: m[0], y1: m[1], z1: z, done: done };
      tick();
    }
    function setCamera(target) { flyTo(target, 0); }
    function zoomBy(dz, px, py) {
      var z1 = Math.max(minZ, Math.min(maxZ, cam.z + dz));
      if (z1 === cam.z) return;
      if (px != null) {
        var before = unproject(px, py);
        cam.z = z1;
        var mb = merc(before.lng, before.lat), s = scale();
        cam.x = mb[0] - (px - W / 2) / s; cam.y = mb[1] - (py - H / 2) / s;
      } else cam.z = z1;
      anim = null; invalidate();
    }
    function panBy(dx, dy) { var s = scale(); cam.x -= dx / s; cam.y -= dy / s; anim = null; invalidate(); }

    /* ---------- Eingaben ---------- */
    var down = null, moved = 0;
    function onPointerDown(e) {
      if (!interactive) return;
      down = { x: e.clientX, y: e.clientY }; moved = 0;
      canvas.setPointerCapture && canvas.setPointerCapture(e.pointerId);
    }
    function onPointerMove(e) {
      if (!down) return;
      var dx = e.clientX - down.x, dy = e.clientY - down.y;
      moved += Math.abs(dx) + Math.abs(dy);
      down = { x: e.clientX, y: e.clientY };
      if (moved > 3) { panBy(dx, dy); if (opts.onUserMove) opts.onUserMove(); }
    }
    function onPointerUp(e) {
      if (!down) return;
      var wasClick = moved <= 3; down = null;
      if (wasClick) {
        var r = canvas.getBoundingClientRect();
        emit('click', unproject(e.clientX - r.left, e.clientY - r.top), { x: e.clientX - r.left, y: e.clientY - r.top });
      }
    }
    function onWheel(e) {
      if (!interactive) return;
      if (!e.ctrlKey && !e.metaKey) { if (opts.onZoomHint) opts.onZoomHint(); return; }
      e.preventDefault();
      var r = canvas.getBoundingClientRect();
      zoomBy(-e.deltaY * 0.0022, e.clientX - r.left, e.clientY - r.top);
      if (opts.onUserMove) opts.onUserMove();
    }
    function onDbl(e) {
      if (!interactive) return;
      var r = canvas.getBoundingClientRect();
      zoomBy(1, e.clientX - r.left, e.clientY - r.top);
      if (opts.onUserMove) opts.onUserMove();
    }
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    canvas.addEventListener('dblclick', onDbl);
    canvas.style.touchAction = 'pan-y';
    canvas.style.cursor = interactive ? 'grab' : 'default';

    var ro = new ResizeObserver(resize);
    ro.observe(canvas);
    var io = new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting;
      if (visible) invalidate();
    }, { threshold: 0 });
    io.observe(canvas);
    function onVis() { active = !document.hidden; if (active) invalidate(); }
    document.addEventListener('visibilitychange', onVis);

    loadWorld().then(function (r) {
      if (dead) return;
      rings = r; ready = true; invalidate(); emit('ready', api);
    }).catch(function () { if (!dead) { ready = true; invalidate(); emit('ready', api); } });

    var api = {
      project: function (lng, lat) { return project(lng, lat); },
      unproject: unproject,
      flyTo: flyTo,
      setCamera: setCamera,
      zoomBy: zoomBy,
      panBy: panBy,
      invalidate: invalidate,
      on: on,
      camera: function () { return { x: cam.x, y: cam.y, zoom: cam.z, center: unmerc(cam.x, cam.y) }; },
      size: function () { return { w: W, h: H }; },
      metersPerPixel: metersPerPixel,
      setLocale: function (l) { locale = l; invalidate(); },
      isReady: function () { return ready; },
      reduced: reduced,
      destroy: function () {
        dead = true;
        ro.disconnect(); io.disconnect();
        document.removeEventListener('visibilitychange', onVis);
        if (raf) cancelAnimationFrame(raf);
      }
    };
    resize();
    return api;
  }

  window.KMapsEngine = { create: create, geodesic: geodesic, haversineKm: haversineKm, merc: merc, STYLE: STYLE };
})();
