/* ============================================================
   K-Aqua Element-Bibliothek — globales Skript
   EINMAL pro Seite einbinden (vor </body>):
     <script src="kaqua-elemente.js" defer></script>
   Initialisiert ALLE Element-Instanzen auf der Seite (Guard via
   data-ka-init — Mehrfachaufruf & mehrfache Instanzen sind sicher).
   Dynamisch nachgeladenes Markup: window.KAquaElemente.init() aufrufen.
   ============================================================ */
(function () {
  'use strict';
  function scan() {

    /* ── 08 · shapegrid ── */
    try {
      (function () {
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        function col(n, fb) {
          var v = getComputedStyle(document.documentElement).getPropertyValue(n).trim();
          return v || fb;
        }
        document.querySelectorAll('.ka-shapegrid:not([data-ka-init])').forEach(function (host) {
          host.setAttribute('data-ka-init', '1');
          var cv = document.createElement('canvas');
          host.appendChild(cv);
          var ctx = cv.getContext('2d');
          var cell = parseFloat(host.getAttribute('data-cell')) || 42;
          var speed = parseFloat(host.getAttribute('data-speed')) || 0.5;
          var dpr = Math.min(window.devicePixelRatio || 1, 2);
          var W = 0, H = 0, off = 0, mx = -9999, my = -9999, visible = true;
          function size() {
            W = host.clientWidth; H = host.clientHeight;
            cv.width = W * dpr; cv.height = H * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          }
          function hexPath(x, y, r) {
            ctx.beginPath();
            for (var i = 0; i < 6; i++) {
              var a = Math.PI / 3 * i + Math.PI / 6;
              var px = x + r * Math.cos(a), py = y + r * Math.sin(a);
              if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.closePath();
          }
          function draw() {
            ctx.clearRect(0, 0, W, H);
            var line = col('--primary', '#5B2D8C');
            var r = cell / 2, hStep = cell * 0.87, vStep = cell * 0.75;
            var best = null, bd = 1e9;
            ctx.lineWidth = 1;
            ctx.strokeStyle = line;
            for (var row = -1; row * vStep < H + cell; row++) {
              for (var c = -2; c * hStep < W + cell * 2; c++) {
                var x = c * hStep + ((row % 2) ? hStep / 2 : 0) + (off % hStep);
                var y = row * vStep;
                ctx.globalAlpha = 0.22;
                hexPath(x, y, r - 2);
                ctx.stroke();
                var d = (x - mx) * (x - mx) + (y - my) * (y - my);
                if (d < bd) { bd = d; best = [x, y]; }
              }
            }
            if (best && bd < cell * cell) {
              ctx.globalAlpha = 0.85;
              ctx.fillStyle = line;
              hexPath(best[0], best[1], r - 2);
              ctx.fill();
            }
            ctx.globalAlpha = 1;
          }
          function loop() {
            if (visible && host.isConnected) { off += speed * 0.4; draw(); }
            if (host.isConnected) requestAnimationFrame(loop);
          }
          host.addEventListener('pointermove', function (e) {
            var b = host.getBoundingClientRect();
            mx = e.clientX - b.left; my = e.clientY - b.top;
          });
          host.addEventListener('pointerleave', function () { mx = -9999; my = -9999; });
          if ('ResizeObserver' in window) new ResizeObserver(function () { size(); draw(); }).observe(host);
          if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(host);
          size(); draw();
          if (!reduce) requestAnimationFrame(loop);
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] shapegrid:', e); }

    /* ── 08 · dotfield ── */
    try {
      (function () {
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        function col(n, fb) {
          var v = getComputedStyle(document.documentElement).getPropertyValue(n).trim();
          return v || fb;
        }
        document.querySelectorAll('.ka-dotfield:not([data-ka-init])').forEach(function (host) {
          host.setAttribute('data-ka-init', '1');
          var cv = document.createElement('canvas');
          host.appendChild(cv);
          var ctx = cv.getContext('2d');
          var gap = parseFloat(host.getAttribute('data-gap')) || 14;
          var r = parseFloat(host.getAttribute('data-r')) || 1.5;
          var bulge = parseFloat(host.getAttribute('data-bulge')) || 67;
          var glow = parseFloat(host.getAttribute('data-glow')) || 160;
          var dpr = Math.min(window.devicePixelRatio || 1, 2);
          var W = 0, H = 0, mx = -9999, my = -9999, visible = true;
          function size() {
            W = host.clientWidth; H = host.clientHeight;
            cv.width = W * dpr; cv.height = H * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          }
          function draw() {
            ctx.clearRect(0, 0, W, H);
            var c1 = col('--primary', '#5B2D8C');
            var c2 = col('--accent', '#3AA6C0');
            for (var y = gap / 2; y < H; y += gap) {
              for (var x = gap / 2; x < W; x += gap) {
                var dx = x - mx, dy = y - my;
                var d = Math.sqrt(dx * dx + dy * dy);
                var t = Math.max(0, 1 - d / glow);
                var push = t * t * (bulge / 6);
                var px = x + (d > 0.01 ? dx / d * push : 0);
                var py = y + (d > 0.01 ? dy / d * push : 0);
                ctx.globalAlpha = 0.3 + t * 0.6;
                ctx.fillStyle = t > 0.45 ? c2 : c1;
                ctx.beginPath();
                ctx.arc(px, py, r + t * 1.6, 0, Math.PI * 2);
                ctx.fill();
              }
            }
            ctx.globalAlpha = 1;
          }
          function loop() {
            if (visible && host.isConnected) draw();
            if (host.isConnected) requestAnimationFrame(loop);
          }
          host.addEventListener('pointermove', function (e) {
            var b = host.getBoundingClientRect();
            mx = e.clientX - b.left; my = e.clientY - b.top;
          });
          host.addEventListener('pointerleave', function () { mx = -9999; my = -9999; });
          if ('ResizeObserver' in window) new ResizeObserver(function () { size(); draw(); }).observe(host);
          if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(host);
          size(); draw();
          if (!reduce) requestAnimationFrame(loop);
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] dotfield:', e); }

    /* ── 08 · dotgrid-shockwave ── */
    try {
      (function () {
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        function col(n, fb) {
          var v = getComputedStyle(document.documentElement).getPropertyValue(n).trim();
          return v || fb;
        }
        document.querySelectorAll('.ka-dotgrid:not([data-ka-init])').forEach(function (host) {
          host.setAttribute('data-ka-init', '1');
          var cv = document.createElement('canvas');
          host.appendChild(cv);
          var ctx = cv.getContext('2d');
          var gap = parseFloat(host.getAttribute('data-gap')) || 18;
          var dot = parseFloat(host.getAttribute('data-dot')) || 4;
          var prox = parseFloat(host.getAttribute('data-prox')) || 150;
          var shock = parseFloat(host.getAttribute('data-shock')) || 4;
          var dpr = Math.min(window.devicePixelRatio || 1, 2);
          var W = 0, H = 0, mx = -9999, my = -9999, dots = [], visible = true;
          function size() {
            W = host.clientWidth; H = host.clientHeight;
            cv.width = W * dpr; cv.height = H * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            dots = [];
            for (var y = gap / 2; y < H; y += gap)
              for (var x = gap / 2; x < W; x += gap)
                dots.push({ x: x, y: y, ox: 0, oy: 0, vx: 0, vy: 0 });
          }
          function draw() {
            ctx.clearRect(0, 0, W, H);
            var c1 = col('--primary', '#5B2D8C');
            var c2 = col('--accent', '#3AA6C0');
            for (var i = 0; i < dots.length; i++) {
              var p = dots[i];
              p.vx += -p.ox * 0.06; p.vy += -p.oy * 0.06;
              p.vx *= 0.88; p.vy *= 0.88;
              p.ox += p.vx; p.oy += p.vy;
              var dx = p.x - mx, dy = p.y - my;
              var t = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / prox);
              ctx.globalAlpha = 0.35 + t * 0.65;
              ctx.fillStyle = t > 0.4 ? c2 : c1;
              ctx.beginPath();
              ctx.arc(p.x + p.ox, p.y + p.oy, dot / 2 + t, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.globalAlpha = 1;
          }
          function loop() {
            if (visible && host.isConnected) draw();
            if (host.isConnected) requestAnimationFrame(loop);
          }
          host.addEventListener('pointermove', function (e) {
            var b = host.getBoundingClientRect();
            mx = e.clientX - b.left; my = e.clientY - b.top;
          });
          host.addEventListener('pointerleave', function () { mx = -9999; my = -9999; });
          host.addEventListener('pointerdown', function (e) {
            var b = host.getBoundingClientRect();
            var cx = e.clientX - b.left, cy = e.clientY - b.top;
            for (var i = 0; i < dots.length; i++) {
              var p = dots[i];
              var dx = p.x - cx, dy = p.y - cy;
              var d = Math.sqrt(dx * dx + dy * dy) || 1;
              var f = Math.max(0, 1 - d / 220) * shock * 3.2;
              p.vx += dx / d * f; p.vy += dy / d * f;
            }
            if (reduce) draw();
          });
          if ('ResizeObserver' in window) new ResizeObserver(function () { size(); draw(); }).observe(host);
          if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(host);
          size(); draw();
          if (!reduce) requestAnimationFrame(loop);
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] dotgrid-shockwave:', e); }

    /* ── 08 · lightrays ── */
    try {
      (function () {
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        function col(n, fb) {
          var v = getComputedStyle(document.documentElement).getPropertyValue(n).trim();
          return v || fb;
        }
        document.querySelectorAll('.ka-lightrays:not([data-ka-init])').forEach(function (host) {
          host.setAttribute('data-ka-init', '1');
          var cv = document.createElement('canvas');
          host.appendChild(cv);
          var ctx = cv.getContext('2d');
          var count = parseInt(host.getAttribute('data-count'), 10) || 9;
          var dpr = Math.min(window.devicePixelRatio || 1, 2);
          var W = 0, H = 0, t = 0, mx = 0.5, visible = true;
          function size() {
            W = host.clientWidth; H = host.clientHeight;
            cv.width = W * dpr; cv.height = H * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          }
          function draw() {
            ctx.clearRect(0, 0, W, H);
            var c = col('--primary', '#5B2D8C');
            var ox = W + 30, oy = -30;
            var L = Math.sqrt(W * W + H * H) * 1.4;
            for (var i = 0; i < count; i++) {
              var base = Math.PI * 0.52 + (i / (count - 1)) * Math.PI * 0.42;
              var a = base + (mx - 0.5) * 0.14 + Math.sin(t * 0.008 + i) * 0.012;
              var pulse = 0.5 + 0.5 * Math.sin(t * 0.02 + i * 1.7);
              var w = 0.014 + 0.012 * ((i * 37) % 10) / 10;
              ctx.globalAlpha = 0.05 + pulse * 0.1;
              ctx.fillStyle = c;
              ctx.beginPath();
              ctx.moveTo(ox, oy);
              ctx.lineTo(ox + Math.cos(a - w) * L, oy + Math.sin(a - w) * L);
              ctx.lineTo(ox + Math.cos(a + w) * L, oy + Math.sin(a + w) * L);
              ctx.closePath();
              ctx.fill();
            }
            ctx.globalAlpha = 1;
          }
          function loop() {
            if (visible && host.isConnected) { t++; draw(); }
            if (host.isConnected) requestAnimationFrame(loop);
          }
          host.addEventListener('pointermove', function (e) {
            var b = host.getBoundingClientRect();
            mx = (e.clientX - b.left) / Math.max(1, b.width);
          });
          if ('ResizeObserver' in window) new ResizeObserver(function () { size(); draw(); }).observe(host);
          if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(host);
          size(); draw();
          if (!reduce) requestAnimationFrame(loop);
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] lightrays:', e); }

    /* ── 08 · siderays ── */
    try {
      (function () {
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        function col(n, fb) {
          var v = getComputedStyle(document.documentElement).getPropertyValue(n).trim();
          return v || fb;
        }
        document.querySelectorAll('.ka-siderays:not([data-ka-init])').forEach(function (host) {
          host.setAttribute('data-ka-init', '1');
          var cv = document.createElement('canvas');
          host.appendChild(cv);
          var ctx = cv.getContext('2d');
          var dpr = Math.min(window.devicePixelRatio || 1, 2);
          var W = 0, H = 0, t = 0, visible = true;
          function size() {
            W = host.clientWidth; H = host.clientHeight;
            cv.width = W * dpr; cv.height = H * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          }
          function draw() {
            ctx.clearRect(0, 0, W, H);
            var c1 = col('--primary', '#5B2D8C');
            var c2 = col('--accent', '#3AA6C0');
            var ox = W * 0.96, oy = -20;
            var L = Math.sqrt(W * W + H * H) * 1.4;
            var n = 12;
            for (var i = 0; i < n; i++) {
              var a = Math.PI * 0.5 + (i / (n - 1)) * Math.PI * 0.46 + 0.06 + Math.sin(t * 0.006 + i * 0.6) * 0.008;
              var w = 0.02 + 0.01 * (i % 3);
              ctx.globalAlpha = (i % 2 === 0) ? 0.1 : 0.07;
              ctx.fillStyle = (i % 2 === 0) ? c1 : c2;
              ctx.beginPath();
              ctx.moveTo(ox, oy);
              ctx.lineTo(ox + Math.cos(a - w) * L, oy + Math.sin(a - w) * L);
              ctx.lineTo(ox + Math.cos(a + w) * L, oy + Math.sin(a + w) * L);
              ctx.closePath();
              ctx.fill();
            }
            ctx.globalAlpha = 1;
          }
          function loop() {
            if (visible && host.isConnected) { t++; draw(); }
            if (host.isConnected) requestAnimationFrame(loop);
          }
          if ('ResizeObserver' in window) new ResizeObserver(function () { size(); draw(); }).observe(host);
          if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(host);
          size(); draw();
          if (!reduce) requestAnimationFrame(loop);
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] siderays:', e); }

    /* ── 08 · metaballs ── */
    try {
      (function () {
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        function col(n, fb) {
          var v = getComputedStyle(document.documentElement).getPropertyValue(n).trim();
          return v || fb;
        }
        document.querySelectorAll('.ka-metaballs:not([data-ka-init])').forEach(function (host) {
          host.setAttribute('data-ka-init', '1');
          var cv = document.createElement('canvas');
          host.appendChild(cv);
          var ctx = cv.getContext('2d');
          var count = parseInt(host.getAttribute('data-count'), 10) || 9;
          var dpr = Math.min(window.devicePixelRatio || 1, 2);
          var W = 0, H = 0, t = 0, mx = -9999, my = -9999, balls = [], visible = true;
          function size() {
            W = host.clientWidth; H = host.clientHeight;
            cv.width = W * dpr; cv.height = H * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            balls = [];
            for (var i = 0; i < count; i++) balls.push({
              r: 14 + (i % 4) * 8,
              ax: 0.2 + (i * 53 % 100) / 160,
              ay: 0.2 + (i * 31 % 100) / 160,
              px: (i * 97 % 100) / 100, py: (i * 61 % 100) / 100,
              ph: i * 2.4
            });
          }
          function draw() {
            ctx.clearRect(0, 0, W, H);
            var c1 = col('--primary', '#5B2D8C');
            var c2 = col('--accent', '#3AA6C0');
            ctx.fillStyle = c1;
            for (var i = 0; i < balls.length; i++) {
              var b = balls[i];
              var x = W / 2 + Math.sin(t * 0.0035 * b.ax * 2 + b.ph) * W * 0.36 * b.px;
              var y = H / 2 + Math.cos(t * 0.0035 * b.ay * 2 + b.ph * 1.3) * H * 0.34 * (0.4 + b.py * 0.6);
              ctx.beginPath();
              ctx.arc(x, y, b.r, 0, Math.PI * 2);
              ctx.fill();
            }
            if (mx > -999) {
              ctx.fillStyle = c2;
              ctx.beginPath();
              ctx.arc(mx, my, 22, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          function loop() {
            if (visible && host.isConnected) { t += 3.5; draw(); }
            if (host.isConnected) requestAnimationFrame(loop);
          }
          host.addEventListener('pointermove', function (e) {
            var b = host.getBoundingClientRect();
            mx = e.clientX - b.left; my = e.clientY - b.top;
          });
          host.addEventListener('pointerleave', function () { mx = -9999; my = -9999; });
          if ('ResizeObserver' in window) new ResizeObserver(function () { size(); draw(); }).observe(host);
          if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(host);
          size(); draw();
          if (!reduce) requestAnimationFrame(loop);
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] metaballs:', e); }

    /* ── 08 · ribbons ── */
    try {
      (function () {
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        function col(n, fb) {
          var v = getComputedStyle(document.documentElement).getPropertyValue(n).trim();
          return v || fb;
        }
        document.querySelectorAll('.ka-ribbons:not([data-ka-init])').forEach(function (host) {
          host.setAttribute('data-ka-init', '1');
          var cv = document.createElement('canvas');
          host.appendChild(cv);
          var ctx = cv.getContext('2d');
          var dpr = Math.min(window.devicePixelRatio || 1, 2);
          var W = 0, H = 0, visible = true;
          var mx = -1, my = -1;
          var N = 26;
          var ribbons = [
            { k: 0.34, pts: [], varName: '--primary', fb: '#5B2D8C' },
            { k: 0.2, pts: [], varName: '--accent', fb: '#3AA6C0' }
          ];
          function size() {
            W = host.clientWidth; H = host.clientHeight;
            cv.width = W * dpr; cv.height = H * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ribbons.forEach(function (rb) {
              rb.pts = [];
              for (var i = 0; i < N; i++) rb.pts.push({ x: W / 2, y: H / 2 });
            });
          }
          function draw() {
            ctx.clearRect(0, 0, W, H);
            ribbons.forEach(function (rb) {
              var head = rb.pts[0];
              var tx = mx < 0 ? W / 2 : mx, ty = my < 0 ? H / 2 : my;
              head.x += (tx - head.x) * rb.k;
              head.y += (ty - head.y) * rb.k;
              for (var i = 1; i < N; i++) {
                rb.pts[i].x += (rb.pts[i - 1].x - rb.pts[i].x) * 0.42;
                rb.pts[i].y += (rb.pts[i - 1].y - rb.pts[i].y) * 0.42;
              }
              ctx.strokeStyle = col(rb.varName, rb.fb);
              ctx.lineCap = 'round';
              ctx.lineJoin = 'round';
              for (var j = 0; j < N - 1; j++) {
                var a = 1 - j / (N - 1);
                ctx.globalAlpha = a * 0.55;
                ctx.lineWidth = 22 * a;
                ctx.beginPath();
                ctx.moveTo(rb.pts[j].x, rb.pts[j].y);
                ctx.lineTo(rb.pts[j + 1].x, rb.pts[j + 1].y);
                ctx.stroke();
              }
            });
            ctx.globalAlpha = 1;
          }
          function loop() {
            if (visible && host.isConnected) draw();
            if (host.isConnected) requestAnimationFrame(loop);
          }
          host.addEventListener('pointermove', function (e) {
            var b = host.getBoundingClientRect();
            mx = e.clientX - b.left; my = e.clientY - b.top;
          });
          if ('ResizeObserver' in window) new ResizeObserver(function () { size(); }).observe(host);
          if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(host);
          size(); draw();
          if (!reduce) requestAnimationFrame(loop);
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] ribbons:', e); }

    /* ── 09 · flowingmenu ── */
    try {
      (function () {
        document.querySelectorAll('.ka-flowmenu:not([data-ka-init])').forEach(function (menu) {
          menu.setAttribute('data-ka-init', '1');
          menu.querySelectorAll('.ka-flowmenu-item').forEach(function (item) {
            var lbl = item.querySelector('.lbl').textContent.trim();
            var one = lbl + '\u2002\u00B7\u2002';
            var half = '';
            for (var i = 0; i < 6; i++) half += one;
            item.querySelector('.track').textContent = half + half;
            function edge(e) {
              var b = item.getBoundingClientRect();
              return (e.clientY - b.top) < b.height / 2;
            }
            item.addEventListener('pointerenter', function (e) {
              item.classList.toggle('from-top', edge(e));
              requestAnimationFrame(function () { item.classList.add('is-hover'); });
            });
            item.addEventListener('pointerleave', function (e) {
              item.classList.remove('is-hover');
              item.classList.toggle('from-top', edge(e));
            });
          });
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] flowingmenu:', e); }

    /* ── 09 · staggeredmenu ── */
    try {
      (function () {
        document.querySelectorAll('.ka-stagmenu:not([data-ka-init])').forEach(function (m) {
          m.setAttribute('data-ka-init', '1');
          var btn = m.querySelector('.ka-stagmenu-btn');
          var panel = m.querySelector('.ka-stagmenu-panel');
          var links = panel.querySelectorAll('a');
          links.forEach(function (a, i) { a.style.transitionDelay = (0.08 + i * 0.06) + 's'; });
          btn.addEventListener('click', function () {
            var open = m.classList.toggle('open');
            btn.textContent = open ? 'Menü schließen ✕' : 'Menü öffnen';
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
            panel.setAttribute('aria-hidden', open ? 'false' : 'true');
            if (!open) links.forEach(function (a) { a.style.transitionDelay = '0s'; });
            else links.forEach(function (a, i) { a.style.transitionDelay = (0.08 + i * 0.06) + 's'; });
          });
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] staggeredmenu:', e); }

    /* ── 09 · infinitemenu ── */
    try {
      (function () {
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.querySelectorAll('.ka-ring3d:not([data-ka-init])').forEach(function (host) {
          host.setAttribute('data-ka-init', '1');
          var stage = host.querySelector('.ka-ring3d-stage');
          var cards = stage.querySelectorAll('.ka-ring3d-card');
          var n = cards.length, R = 190;
          cards.forEach(function (c, i) {
            c.style.transform = 'rotateY(' + (360 / n * i) + 'deg) translateZ(' + R + 'px)';
          });
          var angle = 0, vel = 0.22, dragging = false, lastX = 0, visible = true;
          function apply() { stage.style.transform = 'rotateX(-8deg) rotateY(' + angle + 'deg)'; }
          function loop() {
            if (visible && host.isConnected && !dragging) {
              angle += vel;
              vel += (0.22 - vel) * 0.02;
              apply();
            }
            if (host.isConnected) requestAnimationFrame(loop);
          }
          host.addEventListener('pointerdown', function (e) {
            dragging = true; lastX = e.clientX;
            if (host.setPointerCapture) host.setPointerCapture(e.pointerId);
          });
          host.addEventListener('pointermove', function (e) {
            if (!dragging) return;
            var dx = e.clientX - lastX; lastX = e.clientX;
            angle += dx * 0.45; vel = dx * 0.45;
            apply();
          });
          ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (ev) {
            host.addEventListener(ev, function () { dragging = false; });
          });
          if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(host);
          apply();
          if (!reduce) requestAnimationFrame(loop);
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] infinitemenu:', e); }

    /* ── 09 · scrollreveal ── */
    try {
      (function () {
        document.querySelectorAll('.ka-scrollreveal:not([data-ka-init])').forEach(function (el) {
          el.setAttribute('data-ka-init', '1');
          var words = (el.getAttribute('data-text') || el.textContent).trim().split(/\s+/);
          el.textContent = '';
          words.forEach(function (w, i) {
            var s = document.createElement('span');
            s.className = 'w';
            s.textContent = w;
            s.style.transitionDelay = (i * 0.07) + 's';
            el.appendChild(s);
            if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
          });
          el.classList.add('armed');
          if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (en) {
              if (en[0].isIntersecting) { el.classList.add('in'); io.disconnect(); }
            }, { threshold: 0.4 });
            io.observe(el);
          } else { el.classList.add('in'); }
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] scrollreveal:', e); }

    /* ── 09 · fadecontent ── */
    try {
      (function () {
        document.querySelectorAll('.ka-fadecontent:not([data-ka-init])').forEach(function (el) {
          el.setAttribute('data-ka-init', '1');
          el.classList.add('armed');
          if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (en) {
              if (en[0].isIntersecting) { requestAnimationFrame(function () { el.classList.add('in'); }); io.disconnect(); }
            }, { threshold: 0.3 });
            io.observe(el);
          } else { el.classList.add('in'); }
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] fadecontent:', e); }

    /* ── 09 · animatedcontent ── */
    try {
      (function () {
        document.querySelectorAll('.ka-animcontent:not([data-ka-init])').forEach(function (el) {
          el.setAttribute('data-ka-init', '1');
          var dir = el.getAttribute('data-dir') === 'y' ? 'y' : 'x';
          var dist = parseFloat(el.getAttribute('data-dist')) || 80;
          el.classList.add('armed');
          el.style.transform = dir === 'x' ? 'translateX(' + dist + 'px)' : 'translateY(' + dist + 'px)';
          if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (en) {
              if (en[0].isIntersecting) { requestAnimationFrame(function () { el.classList.add('in'); }); io.disconnect(); }
            }, { threshold: 0.3 });
            io.observe(el);
          } else { el.classList.add('in'); }
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] animatedcontent:', e); }

    /* ── 10 · blurtext ── */
    try {
      (function () {
        document.querySelectorAll('.ka-blurtext:not([data-ka-init])').forEach(function (el) {
          el.setAttribute('data-ka-init', '1');
          var words = (el.getAttribute('data-text') || el.textContent).trim().split(/\s+/);
          el.textContent = '';
          words.forEach(function (w, i) {
            var s = document.createElement('span');
            s.className = 'w';
            s.textContent = w;
            s.style.transitionDelay = (i * 0.09) + 's';
            el.appendChild(s);
            if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
          });
          el.classList.add('armed');
          if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (en) {
              if (en[0].isIntersecting) { requestAnimationFrame(function () { el.classList.add('in'); }); io.disconnect(); }
            }, { threshold: 0.4 });
            io.observe(el);
          } else { el.classList.add('in'); }
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] blurtext:', e); }

    /* ── 10 · rotatingtext ── */
    try {
      (function () {
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.querySelectorAll('.ka-rotatext:not([data-ka-init])').forEach(function (el) {
          el.setAttribute('data-ka-init', '1');
          var items = (el.getAttribute('data-items') || 'Trinkwasser').split('|');
          var idx = 0;
          function show(i) {
            el.textContent = '';
            var word = items[i];
            for (var c = 0; c < word.length; c++) {
              var s = document.createElement('span');
              s.className = 'ch';
              s.textContent = word[c];
              s.style.setProperty('--d', (c * 0.03) + 's');
              el.appendChild(s);
            }
          }
          show(0);
          if (!reduce) setInterval(function () {
            if (!el.isConnected) return;
            idx = (idx + 1) % items.length;
            show(idx);
          }, 2500);
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] rotatingtext:', e); }

    /* ── 10 · scrambledtext ── */
    try {
      (function () {
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.querySelectorAll('.ka-scramble:not([data-ka-init])').forEach(function (el) {
          el.setAttribute('data-ka-init', '1');
          if (reduce) return;
          var pool = el.getAttribute('data-chars') || '0123456789d';
          var text = el.textContent;
          el.textContent = '';
          var spans = [];
          for (var i = 0; i < text.length; i++) {
            var s = document.createElement('span');
            s.className = 'ch';
            s.textContent = text[i];
            s.setAttribute('data-orig', text[i]);
            el.appendChild(s);
            spans.push(s);
          }
          el.addEventListener('pointermove', function (e) {
            spans.forEach(function (s) {
              if (s.getAttribute('data-orig') === ' ') return;
              var b = s.getBoundingClientRect();
              var dx = e.clientX - (b.left + b.width / 2);
              var dy = e.clientY - (b.top + b.height / 2);
              if (Math.sqrt(dx * dx + dy * dy) < 46 && !s._busy) {
                s._busy = true;
                s.classList.add('hot');
                var n = 0;
                var iv = setInterval(function () {
                  s.textContent = pool[Math.floor(Math.random() * pool.length)];
                  if (++n > 5) {
                    clearInterval(iv);
                    s.textContent = s.getAttribute('data-orig');
                    s.classList.remove('hot');
                    s._busy = false;
                  }
                }, 45);
              }
            });
          });
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] scrambledtext:', e); }

    /* ── 10 · scrollvelocity ── */
    try {
      (function () {
        document.querySelectorAll('.ka-velocity:not([data-ka-init])').forEach(function (host) {
          host.setAttribute('data-ka-init', '1');
          host.querySelectorAll('.ka-velocity-row').forEach(function (row) {
            var txt = row.getAttribute('data-text') || '';
            var half = '';
            for (var i = 0; i < 4; i++) half += txt;
            row.querySelector('.track').textContent = half + half;
          });
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] scrollvelocity:', e); }

    /* ── 10 · variableproximity ── */
    try {
      (function () {
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.querySelectorAll('.ka-proximity:not([data-ka-init])').forEach(function (el) {
          el.setAttribute('data-ka-init', '1');
          var min = parseFloat(el.getAttribute('data-min')) || 300;
          var max = parseFloat(el.getAttribute('data-max')) || 800;
          var text = el.textContent;
          el.textContent = '';
          var spans = [];
          for (var i = 0; i < text.length; i++) {
            var s = document.createElement('span');
            s.className = 'ch';
            s.textContent = text[i];
            el.appendChild(s);
            spans.push(s);
          }
          if (reduce) return;
          var raf = null;
          el.addEventListener('pointermove', function (e) {
            if (raf) return;
            raf = requestAnimationFrame(function () {
              raf = null;
              spans.forEach(function (s) {
                var b = s.getBoundingClientRect();
                var dx = e.clientX - (b.left + b.width / 2);
                var dy = e.clientY - (b.top + b.height / 2);
                var t = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 120);
                var w = Math.round(min + (max - min) * t * t);
                s.style.fontVariationSettings = '"wght" ' + w;
              });
            });
          });
          el.addEventListener('pointerleave', function () {
            spans.forEach(function (s) { s.style.fontVariationSettings = '"wght" ' + min; });
          });
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] variableproximity:', e); }

    /* ── 10 · texttype ── */
    try {
      (function () {
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.querySelectorAll('.ka-typewriter:not([data-ka-init])').forEach(function (el) {
          el.setAttribute('data-ka-init', '1');
          var items = (el.getAttribute('data-items') || 'Leading in Water Supply.').split('|');
          var out = el.querySelector('.txt');
          if (reduce) { out.textContent = items[0]; return; }
          var idx = 0, pos = 0, deleting = false;
          function tick() {
            if (!el.isConnected) return;
            var word = items[idx];
            if (!deleting) {
              pos++;
              out.textContent = word.slice(0, pos);
              if (pos >= word.length) { deleting = true; setTimeout(tick, 1600); return; }
              setTimeout(tick, 45);
            } else {
              pos--;
              out.textContent = word.slice(0, pos);
              if (pos <= 0) { deleting = false; idx = (idx + 1) % items.length; setTimeout(tick, 350); return; }
              setTimeout(tick, 24);
            }
          }
          setTimeout(tick, 400);
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] texttype:', e); }

    /* ── 11 · borderglow ── */
    try {
      (function () {
        document.querySelectorAll('.ka-borderglow:not([data-ka-init])').forEach(function (el) {
          el.setAttribute('data-ka-init', '1');
          el.addEventListener('pointermove', function (e) {
            var b = el.getBoundingClientRect();
            el.style.setProperty('--gx', ((e.clientX - b.left) / b.width * 100) + '%');
            el.style.setProperty('--gy', ((e.clientY - b.top) / b.height * 100) + '%');
          });
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] borderglow:', e); }

    /* ── 11 · logoloop ── */
    try {
      (function () {
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.querySelectorAll('.ka-logoloop:not([data-ka-init])').forEach(function (host) {
          host.setAttribute('data-ka-init', '1');
          var track = host.querySelector('.track');
          var items = (host.getAttribute('data-items') || '').split('|');
          var speed = parseFloat(host.getAttribute('data-speed')) || 66;
          for (var r = 0; r < 2; r++) items.forEach(function (t) {
            var s = document.createElement('span');
            s.className = 'item';
            s.textContent = t;
            track.appendChild(s);
          });
          var x = 0, paused = false, visible = true, last = performance.now();
          host.addEventListener('pointerenter', function () { paused = true; });
          host.addEventListener('pointerleave', function () { paused = false; });
          if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(host);
          function loop(now) {
            if (!host.isConnected) return;
            var dt = Math.min(64, now - last); last = now;
            if (!paused && visible) {
              x -= speed * dt / 1000;
              var half = track.scrollWidth / 2;
              if (half > 0 && -x >= half) x += half;
              track.style.transform = 'translateX(' + x + 'px)';
            }
            requestAnimationFrame(loop);
          }
          if (!reduce) requestAnimationFrame(loop);
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] logoloop:', e); }

    /* ── 11 · stepper ── */
    try {
      (function () {
        document.querySelectorAll('.ka-stepper:not([data-ka-init])').forEach(function (st) {
          st.setAttribute('data-ka-init', '1');
          var labels = (st.getAttribute('data-labels') || '1|2|3').split('|');
          var dots = st.querySelector('.ka-stepper-dots');
          labels.forEach(function (l, i) {
            var d = document.createElement('span');
            d.className = 'dot';
            d.textContent = (i + 1);
            d.title = l;
            dots.appendChild(d);
            if (i < labels.length - 1) {
              var b = document.createElement('span');
              b.className = 'bar';
              b.appendChild(document.createElement('i'));
              dots.appendChild(b);
            }
          });
          var panes = st.querySelector('.ka-stepper-panes');
          var prev = st.querySelector('.prev');
          var next = st.querySelector('.next');
          var cur = 0, max = labels.length - 1;
          function render() {
            panes.style.transform = 'translateX(-' + (cur * 100) + '%)';
            dots.querySelectorAll('.dot').forEach(function (d, i) { d.classList.toggle('on', i <= cur); });
            dots.querySelectorAll('.bar').forEach(function (b, i) { b.classList.toggle('full', i < cur); });
            prev.disabled = cur === 0;
            next.textContent = cur === max ? 'Anfrage senden' : 'Weiter';
          }
          prev.addEventListener('click', function () { if (cur > 0) { cur--; render(); } });
          next.addEventListener('click', function () { cur = cur === max ? 0 : cur + 1; render(); });
          render();
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] stepper:', e); }

    /* ── 11 · countup ── */
    try {
      (function () {
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.querySelectorAll('.ka-countup:not([data-ka-init])').forEach(function (el) {
          el.setAttribute('data-ka-init', '1');
          var to = parseFloat(el.getAttribute('data-to')) || 0;
          var suffix = el.getAttribute('data-suffix') || '';
          if (reduce) { el.textContent = to + suffix; return; }
          function run() {
            var t0 = performance.now(), dur = 1200;
            function frame(now) {
              if (!el.isConnected) return;
              var t = Math.min(1, (now - t0) / dur);
              var e = 1 - Math.pow(1 - t, 4);
              el.textContent = Math.round(to * e) + suffix;
              if (t < 1) requestAnimationFrame(frame);
            }
            requestAnimationFrame(frame);
          }
          if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (en) {
              if (en[0].isIntersecting) { run(); io.disconnect(); }
            }, { threshold: 0.5 });
            io.observe(el);
          } else { run(); }
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] countup:', e); }

    /* ── 11 · progressindicator ── */
    try {
      (function () {
        document.querySelectorAll('.ka-progress:not([data-ka-init])').forEach(function (pg) {
          pg.setAttribute('data-ka-init', '1');
          var dots = pg.querySelectorAll('.dot');
          var fill = pg.querySelector('.fill');
          var num = pg.querySelector('.num');
          var prev = pg.querySelector('.prev');
          var next = pg.querySelector('.next');
          var cur = 0, max = dots.length - 1;
          function render() {
            dots.forEach(function (d, i) { d.classList.toggle('on', i <= cur); });
            fill.style.width = (cur / max * 100) + '%';
            num.textContent = (cur + 1);
            prev.disabled = cur === 0;
            next.textContent = cur === max ? 'Fertig' : 'Weiter';
          }
          prev.addEventListener('click', function () { if (cur > 0) { cur--; render(); } });
          next.addEventListener('click', function () { cur = cur === max ? 0 : cur + 1; render(); });
          render();
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] progressindicator:', e); }

    /* ── 11 · rotatingearth ── */
    try {
      (function () {
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        function col(n, fb) {
          var v = getComputedStyle(document.documentElement).getPropertyValue(n).trim();
          return v || fb;
        }
        document.querySelectorAll('.ka-earth:not([data-ka-init])').forEach(function (host) {
          host.setAttribute('data-ka-init', '1');
          var cv = document.createElement('canvas');
          host.appendChild(cv);
          var ctx = cv.getContext('2d');
          var dpr = Math.min(window.devicePixelRatio || 1, 2);
          var S = 0, R = 0, rot = 0, visible = true;
          var tilt = -0.35;
          function size() {
            S = Math.min(host.clientWidth, host.clientHeight) - 20;
            cv.width = S * dpr; cv.height = S * dpr;
            cv.style.width = S + 'px'; cv.style.height = S + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            R = S / 2 - 8;
          }
          function pt(lat, lon) {
            var x = Math.cos(lat) * Math.sin(lon + rot);
            var y = Math.sin(lat);
            var z = Math.cos(lat) * Math.cos(lon + rot);
            var y2 = y * Math.cos(tilt) - z * Math.sin(tilt);
            var z2 = y * Math.sin(tilt) + z * Math.cos(tilt);
            return { x: S / 2 + x * R, y: S / 2 - y2 * R, z: z2 };
          }
          function polyline(points, color, alpha) {
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            var started = false;
            ctx.beginPath();
            for (var i = 0; i < points.length; i++) {
              var p = points[i];
              if (p.z > -0.02) {
                if (!started) { ctx.moveTo(p.x, p.y); started = true; }
                else ctx.lineTo(p.x, p.y);
              } else started = false;
            }
            ctx.globalAlpha = alpha;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
          function draw() {
            ctx.clearRect(0, 0, S, S);
            var c1 = col('--primary', '#5B2D8C');
            var c2 = col('--accent', '#3AA6C0');
            ctx.globalAlpha = 0.5;
            ctx.strokeStyle = c1;
            ctx.beginPath();
            ctx.arc(S / 2, S / 2, R, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1;
            var i, j, pts;
            for (i = 0; i < 12; i++) {
              pts = [];
              var lon = Math.PI / 6 * i;
              for (j = 0; j <= 60; j++) pts.push(pt(-Math.PI / 2 + Math.PI * j / 60, lon));
              polyline(pts, c1, 0.4);
            }
            for (i = 1; i < 7; i++) {
              pts = [];
              var lat = -Math.PI / 2 + Math.PI * i / 7;
              for (j = 0; j <= 80; j++) pts.push(pt(lat, Math.PI * 2 * j / 80));
              polyline(pts, Math.abs(lat) < 0.1 ? c2 : c1, Math.abs(lat) < 0.1 ? 0.9 : 0.4);
            }
          }
          function loop() {
            if (visible && host.isConnected) { rot += 0.004; draw(); }
            if (host.isConnected) requestAnimationFrame(loop);
          }
          if ('ResizeObserver' in window) new ResizeObserver(function () { size(); draw(); }).observe(host);
          if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(host);
          size(); draw();
          if (!reduce) requestAnimationFrame(loop);
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] rotatingearth:', e); }

    /* ── 11 · textparallax ── */
    try {
      (function () {
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.querySelectorAll('.ka-textparallax:not([data-ka-init])').forEach(function (host) {
          host.setAttribute('data-ka-init', '1');
          if (reduce) return;
          var head = host.querySelector('.ka-textparallax-head');
          host.addEventListener('scroll', function () {
            head.style.transform = 'translateY(' + (host.scrollTop * 0.35) + 'px)';
          }, { passive: true });
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] textparallax:', e); }

    /* ── 11 · floatingiconshero ── */
    try {
      (function () {
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.querySelectorAll('.ka-floathero:not([data-ka-init])').forEach(function (host) {
          host.setAttribute('data-ka-init', '1');
          var labels = ['ISO 9001', 'ISO 14001', 'ISO 50001', 'KESSEL', 'DIN 1988', 'Made in DE', 'SDR 7,4', 'PN 20', 'GENAU', 'd630'];
          var spots = [[8, 14], [30, 6], [55, 12], [78, 8], [90, 30], [84, 72], [62, 86], [36, 90], [12, 78], [4, 45]];
          var chips = labels.map(function (l, i) {
            var c = document.createElement('span');
            c.className = 'chip';
            c.textContent = l;
            c.style.left = spots[i][0] + '%';
            c.style.top = spots[i][1] + '%';
            host.appendChild(c);
            return { el: c, ox: 0, oy: 0, tx: 0, ty: 0 };
          });
          if (reduce) return;
          var mx = -9999, my = -9999, visible = true;
          host.addEventListener('pointermove', function (e) {
            var b = host.getBoundingClientRect();
            mx = e.clientX - b.left; my = e.clientY - b.top;
          });
          host.addEventListener('pointerleave', function () { mx = -9999; my = -9999; });
          if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(host);
          function loop() {
            if (!host.isConnected) return;
            if (visible) chips.forEach(function (c) {
              var b = c.el.getBoundingClientRect();
              var hb = host.getBoundingClientRect();
              var cx = b.left - hb.left + b.width / 2 - c.ox;
              var cy = b.top - hb.top + b.height / 2 - c.oy;
              var dx = cx - mx, dy = cy - my;
              var d = Math.sqrt(dx * dx + dy * dy) || 1;
              var f = Math.max(0, 1 - d / 130);
              c.tx = dx / d * f * 46;
              c.ty = dy / d * f * 46;
              c.ox += (c.tx - c.ox) * 0.14;
              c.oy += (c.ty - c.oy) * 0.14;
              c.el.style.transform = 'translate(' + c.ox.toFixed(1) + 'px,' + c.oy.toFixed(1) + 'px)';
            });
            requestAnimationFrame(loop);
          }
          requestAnimationFrame(loop);
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] floatingiconshero:', e); }

    /* ── 11 · maparc ── */
    try {
      (function () {
        document.querySelectorAll('.ka-maparc:not([data-ka-init])').forEach(function (svg) {
          svg.setAttribute('data-ka-init', '1');
          svg.classList.add('armed');
          if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (en) {
              if (en[0].isIntersecting) {
                requestAnimationFrame(function () { svg.classList.add('in'); });
                io.disconnect();
              }
            }, { threshold: 0.4 });
            io.observe(svg);
          } else { svg.classList.add('in'); }
        });
      })();
    } catch (e) { console.error('[kaqua-elemente] maparc:', e); }
  }
  window.KAquaElemente = { init: scan };
})();
