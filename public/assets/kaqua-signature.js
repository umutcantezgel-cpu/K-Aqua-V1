/* ============================================================
   K-Aqua Signature-Sektionen — globales Skript (Segment 13)
   EINMAL pro Seite vor </body>. Guard: data-ka-init.
   Dynamisch nachgeladenes Markup: window.KAquaSignature.init()
   ============================================================ */
(function () {
  'use strict';
  function scan() {

    /* ── 13 · vertical-velocity ── */
    try {
      (function () {
        document.querySelectorAll('.ka-vvelocity:not([data-ka-init])').forEach(function (host) {
          host.setAttribute('data-ka-init', '1');
          host.querySelectorAll('.col').forEach(function (colEl) {
            var items = (colEl.getAttribute('data-items') || '').split('|');
            var track = colEl.querySelector('.track');
            var dur = parseFloat(colEl.getAttribute('data-dur')) || 28;
            track.style.setProperty('--dur', dur + 's');
            colEl.style.setProperty('--dur', dur + 's');
            track.textContent = '';
            for (var r = 0; r < 2; r++) {
              for (var i = 0; i < items.length; i++) {
                var s = document.createElement('span');
                s.textContent = items[i];
                track.appendChild(s);
              }
            }
          });
        });
      })();
    } catch (e) { console.error('[kaqua-signature] vertical-velocity:', e); }

    /* ── 13 · edge-index ── */
    try {
      (function () {
        document.querySelectorAll('.ka-edgeindex:not([data-ka-init])').forEach(function (idx) {
          idx.setAttribute('data-ka-init', '1');
          idx.querySelectorAll('.row').forEach(function (row) {
            var lbl = row.querySelector('b').textContent.trim();
            var meta = row.querySelector('.meta').textContent.trim();
            var one = lbl + '\u2002\u2192\u2002' + meta + '\u2002\u00B7\u2002';
            var half = '';
            for (var i = 0; i < 5; i++) half += one;
            row.querySelector('.track').textContent = half + half;
            function fromTop(e) {
              var b = row.getBoundingClientRect();
              return (e.clientY - b.top) < b.height / 2;
            }
            row.addEventListener('pointerenter', function (e) {
              row.classList.toggle('from-top', fromTop(e));
              requestAnimationFrame(function () { row.classList.add('is-hover'); });
            });
            row.addEventListener('pointerleave', function (e) {
              row.classList.remove('is-hover');
              row.classList.toggle('from-top', fromTop(e));
            });
          });
        });
      })();
    } catch (e) { console.error('[kaqua-signature] edge-index:', e); }

    /* ── 13 · hover-preview-liste ── */
    try {
      (function () {
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.querySelectorAll('.ka-previewlist:not([data-ka-init])').forEach(function (host) {
          host.setAttribute('data-ka-init', '1');
          var preview = host.querySelector('.preview');
          var label = host.querySelector('.ph-label');
          var mx = 0, my = 0, px = 0, py = 0, active = false;
          host.addEventListener('pointermove', function (e) {
            var b = host.getBoundingClientRect();
            mx = e.clientX - b.left + 24;
            my = e.clientY - b.top - 70;
            mx = Math.min(mx, b.width - 224);
          });
          host.querySelectorAll('.row').forEach(function (row) {
            row.addEventListener('pointerenter', function () {
              label.innerHTML = row.getAttribute('data-label') || '';
              host.classList.add('show');
              active = true;
            });
          });
          host.addEventListener('pointerleave', function () {
            host.classList.remove('show');
            active = false;
          });
          function loop() {
            if (!host.isConnected) return;
            var k = reduce ? 1 : 0.16;
            px += (mx - px) * k;
            py += (my - py) * k;
            if (active || Math.abs(mx - px) > 0.5) {
              preview.style.transform = 'translate(' + px.toFixed(1) + 'px,' + py.toFixed(1) + 'px) scale(' + (active ? 1 : 0.86) + ')';
            }
            requestAnimationFrame(loop);
          }
          requestAnimationFrame(loop);
        });
      })();
    } catch (e) { console.error('[kaqua-signature] hover-preview-liste:', e); }

    /* ── 13 · liquid-headline ── */
    try {
      (function () {
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.querySelectorAll('.ka-liquidhead:not([data-ka-init])').forEach(function (host) {
          host.setAttribute('data-ka-init', '1');
          var line = host.querySelector('.line');
          var level = 35, target = 35, t = 0;
          function measure() {
            var b = host.getBoundingClientRect();
            var vh = window.innerHeight || 800;
            var p = 1 - (b.top + b.height / 2) / (vh + b.height);
            target = Math.max(6, Math.min(96, p * 130 - 10));
          }
          window.addEventListener('scroll', measure, { passive: true });
          window.addEventListener('resize', measure);
          measure();
          if (reduce) { line.style.setProperty('--level', '55%'); return; }
          function loop() {
            if (!host.isConnected) return;
            t += 0.03;
            level += (target - level) * 0.07;
            var bob = Math.sin(t) * 1.6;
            line.style.setProperty('--level', (level + bob).toFixed(2) + '%');
            requestAnimationFrame(loop);
          }
          requestAnimationFrame(loop);
        });
      })();
    } catch (e) { console.error('[kaqua-signature] liquid-headline:', e); }

    /* ── 13 · spotlight-grid ── */
    try {
      (function () {
        document.querySelectorAll('.ka-spotgrid:not([data-ka-init])').forEach(function (grid) {
          grid.setAttribute('data-ka-init', '1');
          var cells = grid.querySelectorAll('.cell');
          grid.addEventListener('pointermove', function (e) {
            cells.forEach(function (cell) {
              var b = cell.getBoundingClientRect();
              cell.style.setProperty('--mx', (e.clientX - b.left) + 'px');
              cell.style.setProperty('--my', (e.clientY - b.top) + 'px');
            });
          });
          grid.addEventListener('pointerleave', function () {
            cells.forEach(function (cell) {
              cell.style.setProperty('--mx', '-300px');
              cell.style.setProperty('--my', '-300px');
            });
          });
        });
      })();
    } catch (e) { console.error('[kaqua-signature] spotlight-grid:', e); }

    /* ── 13 · diagonal-band ── */
    try {
      (function () {
        document.querySelectorAll('.ka-diagband:not([data-ka-init])').forEach(function (host) {
          host.setAttribute('data-ka-init', '1');
          host.querySelectorAll('.track').forEach(function (track) {
            var txt = track.getAttribute('data-text') || '';
            var half = '';
            for (var i = 0; i < 4; i++) half += txt;
            track.textContent = half + half;
          });
        });
      })();
    } catch (e) { console.error('[kaqua-signature] diagonal-band:', e); }
  }
  window.KAquaSignature = { init: scan };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan);
  else scan();
})();
