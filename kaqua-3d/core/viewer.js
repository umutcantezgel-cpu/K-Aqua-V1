/* K-Aqua 3D · Core — Viewer.

   Die Bedienlogik. Kennt nur den Produktvertrag: keine Größenliste,
   kein Bauteilname, kein Zustandstext ist hier verdrahtet.

   mount(product, opt) übernimmt den Rest:
     · WebGL-Prüfung, Fallback auf Standbild plus Maßtabelle
     · Größenwahl, Explosion, Schnitt mit Stencil-Caps, Bemaßung
     · Kamera-Presets, Tastatur, prefers-reduced-motion
     · Innenlicht, Overlay, Metaleiste, aria-label
     · window.kaqua — Prüfhaken für Phase 4 */

import * as THREE from 'three';
import { frameHTML, FRAME_CSS } from './ui.js';
import { createOverlay, buildDimLines } from './overlay.js';

export const ISO = { az: -32, el: 18, dist: 1 };

/* Findet die Artikelzeile zu einem Größenschlüssel. product.sizeKey
   nennt das Feld, das eine Zeile eindeutig macht — bei einstufigen
   Produkten 'd', bei reduzierten ein zusammengesetzter Schlüssel wie
   '40x25'. Ohne das kann ein Produkt mit zwei Nennweiten nicht
   adressiert werden. */
export function articleOf(product, key) {
  const field = product.sizeKey || 'd';
  const a = product.articles.find((x) => String(x[field]) === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key + ' in ' + product.id);
  return a;
}

const dez = (v) =>
  typeof v === 'number' || typeof v === 'string' ? String(v).replace('.', ',') : v;

export function mount(product, opt = {}) {
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
