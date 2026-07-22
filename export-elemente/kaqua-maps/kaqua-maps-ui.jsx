/* K Aqua Maps Suite — gemeinsame UI Bausteine (MapShell, Glaspanel, Marker, Siegel).
   Google Maps JavaScript API Integration. */
const { useState, useEffect, useRef, useCallback, useMemo } = React;

/* Sichtfeldmontage mit Vorlauf (useInViewMount.ts) */
function useInViewMount(margin) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current || inView) return;
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) { setInView(true); io.disconnect(); }
    }, { rootMargin: (margin || 200) + 'px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [inView]);
  return [ref, inView];
}

/* Engine Hook: montiert Google Maps auf ein container Div, sobald mounted */
function useKMap(opts) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const apiRef = useRef(null);
  const overlayRef = useRef(null);
  const [ready, setReady] = useState(false);
  const optsRef = useRef(opts);
  optsRef.current = opts;
  const mounted = opts.mounted !== false;

  useEffect(() => {
    if (!mounted || !mapContainerRef.current || mapRef.current) return;

    let checkTimer = null;

    function initGoogleMap() {
      if (!window.google || !window.google.maps) {
        checkTimer = setTimeout(initGoogleMap, 100);
        return;
      }

      const center = optsRef.current.center || { lat: 50.487, lng: 8.485 };
      const zoom = optsRef.current.zoom || 5;

      const gmap = new google.maps.Map(mapContainerRef.current, {
        center: center,
        zoom: zoom,
        minZoom: optsRef.current.minZoom || 2,
        maxZoom: optsRef.current.maxZoom || 18,
        mapId: 'DEMO_MAP_ID',
        disableDefaultUI: true,
        zoomControl: false,
        cameraControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        gestureHandling: optsRef.current.interactive === false ? 'none' : 'greedy'
      });

      mapRef.current = gmap;

      // Create an OverlayView to get accurate projection for DOM coordinates
      class CustomProjectionOverlay extends google.maps.OverlayView {
        onAdd() {}
        draw() {
          if (apiRef.current && apiRef.current._triggerMove) {
            apiRef.current._triggerMove();
          }
        }
        onRemove() {}
      }
      const overlay = new CustomProjectionOverlay();
      overlay.setMap(gmap);
      overlayRef.current = overlay;

      const listeners = { move: [], click: [], ready: [] };

      const api = {
        map: gmap,
        overlay: overlay,
        reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        _listeners: listeners,
        _triggerMove: function() {
          listeners.move.forEach(fn => fn(api));
        },
        camera: function() {
          const c = gmap.getCenter();
          return {
            x: c ? c.lng() : 0,
            y: c ? c.lat() : 0,
            zoom: gmap.getZoom() || 5,
            center: { lat: c ? c.lat() : 0, lng: c ? c.lng() : 0 }
          };
        },
        setCamera: function(target) {
          if (target.lat != null && target.lng != null) gmap.panTo({ lat: target.lat, lng: target.lng });
          if (target.zoom != null) gmap.setZoom(target.zoom);
          api._triggerMove();
        },
        flyTo: function(target, duration, done) {
          const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (target.lat != null && target.lng != null) {
            gmap.panTo({ lat: target.lat, lng: target.lng });
          }
          if (target.zoom != null) {
            gmap.setZoom(target.zoom);
          }
          api._triggerMove();
          if (done) setTimeout(done, reduced ? 50 : (duration || 800));
        },
        zoomBy: function(dz) {
          const z = gmap.getZoom() || 5;
          gmap.setZoom(Math.max(2, Math.min(18, z + dz)));
          api._triggerMove();
        },
        panBy: function(dx, dy) {
          gmap.panBy(-dx, -dy);
          api._triggerMove();
        },
        invalidate: function() {
          api._triggerMove();
        },
        project: function(lng, lat) {
          if (overlay && overlay.getProjection()) {
            const p = overlay.getProjection().fromLatLngToContainerPixel(new google.maps.LatLng(lat, lng));
            if (p) return [p.x, p.y];
          }
          return [0, 0];
        },
        metersPerPixel: function() {
          const c = gmap.getCenter();
          const lat = c ? c.lat() : 50;
          const z = gmap.getZoom() || 5;
          return 156543.03392 * Math.cos(lat * Math.PI / 180) / Math.pow(2, z);
        },
        size: function() {
          if (mapContainerRef.current) {
            return { w: mapContainerRef.current.clientWidth, h: mapContainerRef.current.clientHeight };
          }
          return { w: 800, h: 500 };
        },
        on: function(ev, fn) {
          if (!listeners[ev]) listeners[ev] = [];
          listeners[ev].push(fn);
          return function() {
            const idx = listeners[ev].indexOf(fn);
            if (idx >= 0) listeners[ev].splice(idx, 1);
          };
        },
        isReady: function() {
          return ready;
        },
        destroy: function() {
          if (overlay) overlay.setMap(null);
          mapRef.current = null;
        }
      };

      apiRef.current = api;

      gmap.addListener('idle', () => {
        setReady(true);
        listeners.ready.forEach(fn => fn(api));
      });

      gmap.addListener('bounds_changed', () => {
        api._triggerMove();
      });

      gmap.addListener('click', (e) => {
        if (e.latLng && optsRef.current.onClick) {
          const ll = { lat: e.latLng.lat(), lng: e.latLng.lng() };
          optsRef.current.onClick(ll, { x: 0, y: 0 });
        }
      });

      gmap.addListener('dragstart', () => {
        if (optsRef.current.onUserMove) optsRef.current.onUserMove();
      });
    }

    initGoogleMap();

    return () => {
      if (checkTimer) clearTimeout(checkTimer);
      if (overlayRef.current) overlayRef.current.setMap(null);
      mapRef.current = null;
      apiRef.current = null;
    };
  }, [mounted]);

  return { mapContainerRef, canvasRef: mapContainerRef, apiRef, ready, hint: false };
}

/* Projizierte Punkte für DOM Marker: aktualisiert bei jeder Kartenbewegung */
function useProjected(apiRef, points, mounted) {
  const [pos, setPos] = useState([]);
  useEffect(() => {
    if (!mounted || !apiRef.current) return;
    const api = apiRef.current;
    const update = () => {
      const c = api.camera();
      setPos(points.map((p) => {
        const s = api.project(p.lng, p.lat);
        return { x: s[0], y: s[1], zoom: c.zoom };
      }));
    };
    update();
    const off = api.on('move', update);
    return () => off();
  }, [mounted, points, apiRef]);
  return pos;
}

/* Kartenbühne: Zoomregler */
function KMapStage({ t, height, mounted, ready, hint, canvasRef, children, onZoom, ariaLabel, onKeyPan }) {
  return (
    <div className="kms-stage" style={{ height, position: 'relative', overflow: 'hidden' }} tabIndex={0} role="application" aria-label={ariaLabel}
      onKeyDown={(e) => {
        if (!onKeyPan) return;
        const step = 60;
        if (e.key === 'ArrowLeft') { onKeyPan(step, 0); e.preventDefault(); }
        else if (e.key === 'ArrowRight') { onKeyPan(-step, 0); e.preventDefault(); }
        else if (e.key === 'ArrowUp') { onKeyPan(0, step); e.preventDefault(); }
        else if (e.key === 'ArrowDown') { onKeyPan(0, -step); e.preventDefault(); }
        else if (e.key === '+' || e.key === '=') { onZoom && onZoom(1); e.preventDefault(); }
        else if (e.key === '-') { onZoom && onZoom(-1); e.preventDefault(); }
      }}>
      <div ref={canvasRef} className="kms-canvas" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}></div>
      {(!mounted || !ready) && (
        <div className="kms-poster">
          <div className="kms-poster-mark">K Aqua</div>
        </div>
      )}
      {mounted && ready && children}
      {onZoom && mounted && ready && (
        <div className="kms-zoomctl" style={{ zIndex: 10 }}>
          <button type="button" aria-label="Zoom +" onClick={() => onZoom(1)}>+</button>
          <button type="button" aria-label="Zoom −" onClick={() => onZoom(-1)}>&#8722;</button>
        </div>
      )}
    </div>
  );
}

/* Sektionskopf */
function KSecHead({ kicker, title, lede, right }) {
  return (
    <header className="kms-sechead">
      <div>
        <div className="kms-kicker">{kicker}</div>
        <h2 className="kms-title">{title}</h2>
        <p className="kms-lede">{lede}</p>
      </div>
      {right}
    </header>
  );
}

/* Glaspanel */
function KGlass({ title, onClose, t, children, tone }) {
  return (
    <div className={'kms-glass' + (tone ? ' ' + tone : '')}>
      <div className="kms-glass-h">
        <h3>{title}</h3>
        {onClose && <button type="button" className="kms-x" onClick={onClose} aria-label={t.close}>&#215;</button>}
      </div>
      {children}
    </div>
  );
}

function KRow({ k, v, model, t }) {
  return (
    <div className="kms-row">
      <span className="kms-row-k">{k}</span>
      <span className="kms-row-v">{v}{model && <em className="kms-model" title={t.modelNote}>{t.model}</em>}</span>
    </div>
  );
}

/* Maßstabsleiste, live aus der Kartenauflösung */
function KScaleBar({ apiRef, ready, locale }) {
  const [s, setS] = useState(null);
  useEffect(() => {
    if (!ready || !apiRef.current) return;
    const api = apiRef.current;
    const upd = () => {
      const mpp = api.metersPerPixel();
      const opts = [20000000, 10000000, 5000000, 2000000, 1000000, 500000, 200000, 100000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 200];
      for (let i = 0; i < opts.length; i++) {
        const px = opts[i] / mpp;
        if (px <= 120) { setS({ px, label: opts[i] >= 1000 ? kFmt(opts[i] / 1000, locale) + ' km' : kFmt(opts[i], locale) + ' m' }); return; }
      }
    };
    upd();
    const off = api.on('move', upd);
    return off;
  }, [ready, locale]);
  if (!s) return null;
  return <div className="kms-scale" style={{ width: s.px, zIndex: 10 }}><span>{s.label}</span></div>;
}

/* Zertifikatsleiste: jedes Siegel öffnet den realen Nachweis */
function KSeals({ locale }) {
  const url = locale === 'de'
    ? 'https://www.k-aqua.de/PDF/KWT%20Zertifikat%20Deutsch.pdf'
    : 'https://www.k-aqua.de/PDF/KWT%20Zertifikate%20English.pdf';
  return (
    <div className="kms-seals">
      {['ISO 9001:2015', 'ISO 14001:2015', 'ISO 50001:2018'].map((s) => (
        <a key={s} className="kms-seal" href={url} target="_blank" rel="noopener">{s}</a>
      ))}
      <span className="kms-seal dim">DAkkS</span>
      <span className="kms-seal dim">GENAU</span>
    </div>
  );
}

function KBtn({ children, primary, href, onClick, download }) {
  const cls = 'kms-btn' + (primary ? ' primary' : '');
  if (href) return <a className={cls} href={href} target={href.indexOf('http') === 0 ? '_blank' : undefined} rel="noopener" download={download}>{children}</a>;
  return <button type="button" className={cls} onClick={onClick}>{children}</button>;
}

function KChip({ active, onClick, children }) {
  return <button type="button" className={'kms-chip' + (active ? ' on' : '')} onClick={onClick}>{children}</button>;
}

function KToast({ msg }) {
  if (!msg) return null;
  return <div className="kms-toast" role="status">{msg}</div>;
}

/* Nummernformat je Locale (Ostziffern für Arabisch als Marktentscheidung) */
function kFmt(n, locale) {
  return new Intl.NumberFormat(KMapsData.T[locale].num).format(n);
}

/* Download Helper */
function kDownload(name, meta) {
  const body = 'K Aqua BIM Ausgabefach\n' + name + '\n' + meta;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([body], { type: 'text/plain' }));
  a.download = name.replace(/\s+/g, '_') + '.txt';
  document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 400);
}

Object.assign(window, { useInViewMount, useKMap, useProjected, KMapStage, KSecHead, KGlass, KRow, KSeals, KScaleBar, KBtn, KChip, KToast, kFmt, kDownload });
