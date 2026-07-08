'use client';

import { useEffect } from 'react';

export function LiquidEngine() {
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    var ID = 'kq-shape-defs';

    var PATHS: Record<string, string> = {
      'kq-clip-taper-r':
        'M .045 0 L .952 0 C .984 0 .999 .028 .996 .062 L .942 .908 ' +
        'C .938 .968 .912 1 .868 1 L .045 1 C .016 1 0 .978 0 .945 ' +
        'L 0 .055 C 0 .022 .016 0 .045 0 Z',
      'kq-clip-taper-l':
        'M .048 0 L .955 0 C .984 0 1 .022 1 .055 L 1 .945 ' +
        'C 1 .978 .984 1 .955 1 L .132 1 C .088 1 .062 .968 .058 .908 ' +
        'L .004 .062 C .001 .028 .016 0 .048 0 Z',
      'kq-clip-dune':
        'M 0 .34 C .1 .12 .26 .02 .46 .05 C .64 .078 .78 .01 .93 .06 ' +
        'C .975 .075 1 .11 1 .17 L 1 .94 C 1 .974 .978 1 .946 1 ' +
        'L .054 1 C .022 1 0 .974 0 .94 Z',
      'kq-clip-pebble':
        'M .52 .015 C .73 .002 .92 .1 .965 .3 C .998 .52 .945 .78 .755 .915 ' +
        'C .555 .998 .26 .99 .115 .84 C .005 .68 .01 .4 .105 .22 C .2 .06 .34 .03 .52 .015 Z',
      'kq-clip-wave-b':
        'M 0 0 L 1 0 L 1 .88 C .92 .955 .84 .955 .75 .9 C .66 .845 .58 .845 .5 .9 ' +
        'C .42 .955 .34 .955 .25 .9 C .16 .845 .08 .845 0 .92 Z'
    };

    var CLIP_BY_CLASS: Record<string, string> = {
      'kq-shape--taper-r': 'kq-clip-taper-r',
      'kq-shape--taper-l': 'kq-clip-taper-l',
      'kq-shape--dune': 'kq-clip-dune',
      'kq-shape--pebble': 'kq-clip-pebble',
      'kq-shape--wave-b': 'kq-clip-wave-b',
      'kq-band--wave-b': 'kq-clip-wave-b'
    };

    var NS = 'http://www.w3.org/2000/svg';
    var defsEl: SVGDefsElement | null = null;

    function inject() {
      if (document.getElementById(ID)) {
        defsEl = document.getElementById(ID)?.firstChild as SVGDefsElement;
        return;
      }
      var svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('id', ID);
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('width', '0');
      svg.setAttribute('height', '0');
      svg.style.position = 'absolute';
      var defs = document.createElementNS(NS, 'defs');
      Object.keys(PATHS).forEach(function (id) {
        var clip = document.createElementNS(NS, 'clipPath');
        clip.setAttribute('id', id);
        clip.setAttribute('clipPathUnits', 'objectBoundingBox');
        var p = document.createElementNS(NS, 'path');
        p.setAttribute('d', PATHS[id]);
        clip.appendChild(p);
        defs.appendChild(clip);
      });
      svg.appendChild(defs);
      document.body.insertBefore(svg, document.body.firstChild);
      defsEl = defs;
    }

    function observePause() {
      if (!('IntersectionObserver' in window)) return;
      var els = document.querySelectorAll(
        '.kq-band-fx--tide, .kq-band-fx--duo, .kq-band-fx--swell, .kq-shape.kq-anim, .kq-lava'
      );
      if (!els.length) return;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) e.target.removeAttribute('data-kq-pause');
          else e.target.setAttribute('data-kq-pause', '');
        });
      }, { rootMargin: '120px' });
      els.forEach(function (el) { io.observe(el); });
    }

    function parsePath(d: string) {
      var tokens = d.match(/[MLCZ]|-?\.?\d+(?:\.\d+)?(?:e-?\d+)?/gi) || [];
      var segs = [], i = 0;
      var need: Record<string, number> = { M: 2, L: 2, C: 6 };
      while (i < tokens.length) {
        var cmd = tokens[i++];
        if (cmd === 'Z' || cmd === 'z') { segs.push({ c: 'Z', n: [] as number[] }); continue; }
        var count = need[cmd.toUpperCase()] || 0;
        var nums = [];
        for (var k = 0; k < count; k++) nums.push(parseFloat(tokens[i++]));
        segs.push({ c: cmd.toUpperCase(), n: nums });
      }
      return segs;
    }

    function parseRadius(str: string, w: number, h: number) {
      var parts = (str || '0px').trim().split(/\s+/);
      function px(v: string, base: number) {
        if (v.indexOf('%') > -1) return parseFloat(v) / 100 * base;
        return parseFloat(v) || 0;
      }
      var x = px(parts[0], w);
      var y = px(parts[1] !== undefined ? parts[1] : parts[0], h);
      return [x, y];
    }

    let isDestroyed = false;
    let rAFId: number;

    function motionInit() {
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (!('IntersectionObserver' in window)) return;
      document.documentElement.classList.add('kq-motion');

      var vh = window.innerHeight;
      window.addEventListener('resize', function () { vh = window.innerHeight; }, { passive: true });

      var riseEls = document.querySelectorAll('.kq-rise');
      if (riseEls.length) {
        var rio = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.setAttribute('data-kq-in', ''); rio.unobserve(e.target); }
          });
        }, { threshold: 0.22 });
        riseEls.forEach(function (el) { rio.observe(el); });
      }

      document.querySelectorAll('.kq-lava').forEach(function (el) {
        if (el.querySelector('.kq-lava__blob')) return;
        for (var i = 0; i < 4; i++) {
          var b = document.createElement('i');
          b.className = 'kq-lava__blob';
          b.setAttribute('aria-hidden', 'true');
          el.prepend(b);
        }
      });

      var tracked: any[] = [];
      var liqN = 0;
      document.querySelectorAll('.kq-ix, .kq-lava, .kq-float, .kq-liquid').forEach(function (el: any) {
        var t = {
          el: el,
          seed: tracked.length * 1.618 + 0.7,
          ix: el.classList.contains('kq-ix') || el.classList.contains('kq-lava'),
          fl: el.classList.contains('kq-float'),
          lq: el.classList.contains('kq-liquid'),
          isBand: el.classList.contains('kq-band'),
          px: 0, py: 0, tx: 0, ty: 0, mx: 0.5, my: 0.5,
          par: 0, tpar: 0, e: 0,
          vis: false, hov: false,
          mode: null as string | null, segs: null as any, pathEl: null as any, corners: null as any, edgeBase: 72, tiltBase: -1.2,
          sp: 0.45 + ((tracked.length * 37) % 11) / 22
        };
        if (t.lq) initLiquid(t);
        tracked.push(t);
        el._kqT = t;
      });
      if (!tracked.length) return;

      function initLiquid(t: any) {
        var el = t.el, cls = el.classList;
        for (var key in CLIP_BY_CLASS) {
          if (cls.contains(key)) {
            var clip = document.createElementNS(NS, 'clipPath');
            var cid = 'kq-liq-' + (liqN++);
            clip.setAttribute('id', cid);
            clip.setAttribute('clipPathUnits', 'objectBoundingBox');
            var p = document.createElementNS(NS, 'path');
            p.setAttribute('d', PATHS[CLIP_BY_CLASS[key]]);
            clip.appendChild(p);
            defsEl!.appendChild(clip);
            el.style.clipPath = 'url("#' + cid + '")';
            t.mode = 'clip';
            t.segs = parsePath(PATHS[CLIP_BY_CLASS[key]]);
            t.pathEl = p;
            return;
          }
        }
        if (t.isBand) {
          if (cls.contains('kq-band-fx--tide') || cls.contains('kq-band-fx--duo') ||
              cls.contains('kq-band-fx--swell') || cls.contains('kq-band-fx--reveal')) {
            t.mode = 'none';
          } else if (cls.contains('kq-band-fx--tilt') || cls.contains('kq-band--sweep')) {
            t.mode = 'tilt';
          } else {
            t.mode = 'edge';
            var cs = getComputedStyle(el).getPropertyValue('--kq-edge');
            t.edgeBase = parseFloat(cs) || 72;
          }
          return;
        }
        t.mode = 'radius';
        var r = el.getBoundingClientRect();
        var w = Math.max(r.width, 1), h = Math.max(r.height, 1);
        var cs2 = getComputedStyle(el);
        t.corners = [
          parseRadius(cs2.borderTopLeftRadius, w, h),
          parseRadius(cs2.borderTopRightRadius, w, h),
          parseRadius(cs2.borderBottomRightRadius, w, h),
          parseRadius(cs2.borderBottomLeftRadius, w, h)
        ];
      }

      var vio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e: any) { if (e.target._kqT) e.target._kqT.vis = e.isIntersecting; });
      }, { rootMargin: '160px' });
      tracked.forEach(function (t) { vio.observe(t.el); });

      var pX = -1e4, pY = -1e4, lpX = -1e4, lpY = -1e4, pActive = false;
      const pointerMoveHandler = function (ev: PointerEvent) {
        pX = ev.clientX; pY = ev.clientY; pActive = true;
      };
      const pointerLeaveHandler = function () { pActive = false; };

      document.addEventListener('pointermove', pointerMoveHandler, { passive: true });
      document.addEventListener('pointerleave', pointerLeaveHandler, { passive: true });

      var lastSY = window.scrollY, scrollE = 0;
      var clamp = function (v: number, a: number, b: number) { return v < a ? a : (v > b ? b : v); };

      function frame(now: number) {
        if (isDestroyed) return;
        var time = now / 1000;
        var sy = window.scrollY;
        scrollE = clamp(scrollE * 0.9 + Math.abs(sy - lastSY) * 0.004, 0, 1);
        lastSY = sy;
        var pv = (lpX > -1e3) ? Math.hypot(pX - lpX, pY - lpY) : 0;
        lpX = pX; lpY = pY;

        for (var i = 0; i < tracked.length; i++) {
          var t = tracked[i];
          if (!t.vis) continue;
          var el = t.el;
          var r = el.getBoundingClientRect();
          var s = t.seed, sp = t.sp;

          var inside = pActive &&
            pX >= r.left - 80 && pX <= r.right + 80 &&
            pY >= r.top - 80 && pY <= r.bottom + 80;
          var strictly = pActive && pX >= r.left && pX <= r.right && pY >= r.top && pY <= r.bottom;
          if (inside) t.e = clamp(t.e + pv * 0.005, 0, 1);
          t.e *= 0.945;

          if (t.ix) {
            if (strictly) {
              t.tx = ((pX - r.left) / r.width - 0.5) * 2;
              t.ty = ((pY - r.top) / r.height - 0.5) * 2;
              t.mx = (pX - r.left) / r.width;
              t.my = (pY - r.top) / r.height;
              el.style.setProperty('--kq-mx', t.mx.toFixed(3));
              el.style.setProperty('--kq-my', t.my.toFixed(3));
            } else { t.tx = 0; t.ty = 0; }
            if (strictly !== t.hov) {
              t.hov = strictly;
              if (strictly) el.setAttribute('data-kq-hover', '');
              else el.removeAttribute('data-kq-hover');
            }
            var nx = t.px + (t.tx - t.px) * 0.1;
            var ny = t.py + (t.ty - t.py) * 0.1;
            if (Math.abs(nx - t.px) > 0.0006 || Math.abs(ny - t.py) > 0.0006) {
              t.px = nx; t.py = ny;
              el.style.setProperty('--kq-px', nx.toFixed(3));
              el.style.setProperty('--kq-py', ny.toFixed(3));
            }
          }

          if (t.fl) {
            var c = r.top + r.height / 2;
            var pt = (c - vh / 2) / (vh / 2 + r.height / 2);
            t.tpar = clamp(-pt, -1, 1);
            var np = t.par + (t.tpar - t.par) * 0.08;
            if (Math.abs(np - t.par) > 0.0012) {
              t.par = np;
              el.style.setProperty('--kq-par', np.toFixed(4));
            }
          }

          if (!t.lq) continue;
          var energy = t.e + scrollE * 0.6;

          if (t.mode === 'radius') {
            var out = '', outY = '';
            for (var k = 0; k < 4; k++) {
              var bx = t.corners[k][0], by = t.corners[k][1];
              var A = Math.max(Math.min(bx * 0.33, 15), 5) + energy * 22;
              var bulge = 0;
              if (t.hov) {
                var cxn = (k === 1 || k === 2) ? 1 : 0, cyn = (k >= 2) ? 1 : 0;
                var d = Math.hypot(t.mx - cxn, t.my - cyn);
                bulge = Math.exp(-Math.pow(d * 2.2, 2)) * (14 + 26 * (0.4 + t.e));
              }
              var vx = bx + A * Math.sin(time * sp + s + k * 1.618) +
                       A * 0.5 * Math.sin(time * sp * 1.83 + k * 2.9) + bulge;
              var vy = by + A * 0.8 * Math.sin(time * sp * 1.31 + s + k * 2.2 + 2.1) + bulge * 0.7;
              out += Math.max(vx, 4).toFixed(1) + 'px ';
              outY += Math.max(vy, 4).toFixed(1) + 'px ';
            }
            el.style.borderRadius = out + '/ ' + outY;
          } else if (t.mode === 'clip') {
            var amp = 0.011 + energy * 0.02;
            var mxn = t.mx, myn = t.my, hov = t.hov;
            var d2 = '';
            var idx = 0;
            for (var g = 0; g < t.segs.length; g++) {
              var seg = t.segs[g];
              if (seg.c === 'Z') { d2 += 'Z'; continue; }
              d2 += seg.c;
              for (var q = 0; q < seg.n.length; q += 2) {
                var x0 = seg.n[q], y0 = seg.n[q + 1];
                idx++;
                var dx = amp * 0.6 * Math.sin(time * sp * 1.4 + s + idx * 2.1);
                var dy = amp * (Math.sin(time * sp + s + idx * 1.7) +
                         0.6 * Math.sin(time * sp * 1.83 + idx * 2.9));
                if (hov) {
                  var local = Math.exp(-Math.pow((x0 - mxn) * 2.6, 2));
                  dy += (myn < y0 ? -1 : 1) * 0.03 * local * (0.35 + t.e);
                }
                d2 += ' ' + clamp(x0 + dx, 0, 1).toFixed(4) + ' ' + clamp(y0 + dy, 0, 1).toFixed(4);
              }
            }
            t.pathEl.setAttribute('d', d2);
          } else if (t.mode === 'edge') {
            var edge = t.edgeBase + (5 + energy * 16) * Math.sin(time * sp * 0.9 + s) +
                       3 * Math.sin(time * sp * 1.7 + s * 2);
            el.style.setProperty('--kq-edge', Math.max(edge, 8).toFixed(1) + 'px');
          } else if (t.mode === 'tilt') {
            var tl = t.tiltBase + (0.14 + energy * 0.3) * Math.sin(time * sp * 0.8 + s);
            el.style.setProperty('--kq-tilt', tl.toFixed(3) + 'deg');
          }

          if (!t.isBand) {
            var st = el.style;
            st.setProperty('--kq-lq-r', ((0.3 + energy * 0.5) * Math.sin(time * sp * 0.55 + s)).toFixed(3) + 'deg');
            st.setProperty('--kq-lq-x', ((2.5 + energy * 6) * Math.sin(time * sp * 0.4 + s * 2)).toFixed(2) + 'px');
            st.setProperty('--kq-lq-y', ((2 + energy * 5) * Math.sin(time * sp * 0.62 + s)).toFixed(2) + 'px');
            st.setProperty('--kq-lq-s', (1 + 0.006 * Math.sin(time * sp * 0.75 + s * 3) + energy * 0.012).toFixed(4));
            st.setProperty('--kq-lm-x', ((2.5 + energy * 10) * Math.sin(time * sp * 0.7 + s + 1.3)).toFixed(2) + 'px');
            st.setProperty('--kq-lm-y', ((2 + energy * 8) * Math.sin(time * sp * 0.9 + s + 2.4)).toFixed(2) + 'px');
          }
        }
        rAFId = window.requestAnimationFrame(frame);
      }

      rAFId = window.requestAnimationFrame(frame);

      return () => {
        isDestroyed = true;
        window.cancelAnimationFrame(rAFId);
        document.removeEventListener('pointermove', pointerMoveHandler as any);
        document.removeEventListener('pointerleave', pointerLeaveHandler);
        vio.disconnect();
      };
    }

    inject();
    observePause();
    // Use a small timeout to allow elements to be mounted before we query them
    const timeoutId = setTimeout(() => {
      if (!isDestroyed) {
        motionInit();
      }
    }, 100);

    return () => {
      isDestroyed = true;
      clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
