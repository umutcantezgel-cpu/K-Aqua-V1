/* Karte Eins — Der Hauptsitz Anker Waldsolms (Masterplan Sektion 03).
   Google Maps API Edition. */
function HqMapSection({ t, locale }) {
  const D = KMapsData, HQ = D.HQ_SITE, h = t.hq;
  const [secRef, inView] = useInViewMount(200);
  const [chapter, setChapterState] = useState(-1);
  const [street, setStreet] = useState(false);
  const [toast, setToast] = useState('');
  const chRef = useRef(-1);
  const tourRef = useRef({ cancelled: false, ran: false, timer: 0 });
  const streetContainerRef = useRef(null);
  const streetPanoramaRef = useRef(null);
  const circlesRef = useRef([]);

  const setCh = (i) => { chRef.current = i; setChapterState(i); };
  const CH = [
    { c: { lat: 49.6, lng: 9.8 }, z: 6.2 },
    { c: { lat: 50.38, lng: 8.58 }, z: 8.5 },
    { c: HQ.position, z: 12.0 }
  ];

  const stopTour = () => {
    const tr = tourRef.current;
    tr.cancelled = true;
    clearTimeout(tr.timer);
    if (chRef.current < 3) setCh(3);
  };

  const { canvasRef, apiRef, ready } = useKMap({
    mounted: inView,
    center: { lat: 50.4, lng: 8.6 }, zoom: 5.4, minZoom: 2.6, maxZoom: 16, locale,
    onUserMove: stopTour
  });

  // Setup Google Maps Circles for distance rings & Marker
  useEffect(() => {
    if (!ready || !apiRef.current || !apiRef.current.map) return;
    const gmap = apiRef.current.map;

    // Add distance rings
    const circles = [10000, 25000, 50000].map((radiusMeters) => {
      return new google.maps.Circle({
        strokeColor: '#2b6c96',
        strokeOpacity: 0.35,
        strokeWeight: 1.5,
        fillColor: '#2b6c96',
        fillOpacity: 0.03,
        map: gmap,
        center: HQ.position,
        radius: radiusMeters,
        clickable: false
      });
    });
    circlesRef.current = circles;

    // Add AdvancedMarkerElement or Marker
    let markerObj = null;
    if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
      const pinContent = document.createElement('div');
      pinContent.className = 'kms-hqmark-gmaps';
      pinContent.style.cssText = 'position:relative;display:flex;align-items:center;gap:8px;transform:translate(-50%,-50%);cursor:pointer;';
      pinContent.innerHTML = `<div class="em kms-pulse" style="width:36px;height:36px;background:#5B2D8C;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px;box-shadow:0 4px 14px rgba(91,45,140,0.4);">K</div><div class="kms-marklabel" style="background:rgba(255,255,255,0.92);padding:4px 10px;border-radius:6px;font-size:12px;font-weight:600;color:#2b5d80;box-shadow:0 2px 8px rgba(0,0,0,0.12);white-space:nowrap;">${h.markerLabel}</div>`;

      markerObj = new google.maps.marker.AdvancedMarkerElement({
        map: gmap,
        position: HQ.position,
        content: pinContent,
        title: h.markerLabel
      });
    } else {
      markerObj = new google.maps.Marker({
        map: gmap,
        position: HQ.position,
        title: h.markerLabel
      });
    }

    return () => {
      circles.forEach(c => c.setMap(null));
      if (markerObj) markerObj.map = null;
    };
  }, [ready]);

  // Street View Panorama toggle
  useEffect(() => {
    if (street && streetContainerRef.current && ready && apiRef.current) {
      const pano = new google.maps.StreetViewPanorama(streetContainerRef.current, {
        position: HQ.position,
        pov: { heading: 165, pitch: 0 },
        zoom: 1,
        disableDefaultUI: false
      });
      streetPanoramaRef.current = pano;
      apiRef.current.map.setStreetView(pano);
    } else if (!street && apiRef.current && apiRef.current.map) {
      apiRef.current.map.setStreetView(null);
    }
  }, [street, ready]);

  const runTour = () => {
    const api = apiRef.current; if (!api) return;
    tourRef.current = { cancelled: false, ran: true, timer: 0 };
    if (api.reduced) { api.setCamera({ ...CH[2].c, zoom: CH[2].z }); setCh(3); return; }
    api.setCamera({ lat: 51.5, lng: 12, zoom: 4.0 });
    const go = (i) => {
      const tr = tourRef.current; if (tr.cancelled) return;
      setCh(i);
      api.flyTo({ ...CH[i].c, zoom: CH[i].z }, i === 0 ? 1150 : 1250, () => {
        tr.timer = setTimeout(() => { if (i < 2) go(i + 1); else setCh(3); }, 850);
      });
    };
    go(0);
  };

  const skip = () => {
    if (chRef.current >= 3) return;
    tourRef.current.cancelled = true; clearTimeout(tourRef.current.timer);
    setCh(3);
    apiRef.current && apiRef.current.flyTo({ ...CH[2].c, zoom: CH[2].z }, 650);
  };

  useEffect(() => { if (inView && ready && !tourRef.current.ran) runTour(); }, [inView, ready]);
  useEffect(() => { if (!toast) return; const x = setTimeout(() => setToast(''), 3400); return () => clearTimeout(x); }, [toast]);

  const pts = useMemo(() => [HQ.position], []);
  const pos = useProjected(apiRef, pts, inView);
  const m = pos[0];

  return (
    <section className="kms-sec" id="kmsHq" ref={secRef} data-screen-label="Karte Eins Hauptsitz">
      <KSecHead kicker={h.kicker} title={h.title} lede={h.lede} />
      <div className="kms-secgrid">
        <div>
          <KMapStage t={t} height={540} mounted={inView} ready={ready} hint={false} canvasRef={canvasRef}
            ariaLabel={h.title} onZoom={(d) => apiRef.current && apiRef.current.zoomBy(d)}
            onKeyPan={(x, y) => apiRef.current && apiRef.current.panBy(x, y)}>
            {m && (
              <div className="kms-hqmark" style={{ left: m.x, top: m.y, zIndex: 5 }}>
                <div className="em kms-pulse">K</div>
                {m.zoom > 6 && <div className="kms-marklabel">{h.markerLabel}</div>}
              </div>
            )}
            <div className="kms-caption" style={{ zIndex: 10 }}>
              {chapter >= 0 && chapter < 3 && (
                <React.Fragment>
                  <span className="kms-caption-steps">{[0, 1, 2].map((i) => <i key={i} className={i <= chapter ? 'on' : ''}></i>)}</span>
                  <b>{h['ch' + (chapter + 1) + 't']}</b>
                  <span className="kms-caption-d">{h['ch' + (chapter + 1) + 'd']}</span>
                  <button type="button" className="kms-caption-btn" onClick={skip}>{t.skip}</button>
                </React.Fragment>
              )}
              {chapter === 3 && (
                <React.Fragment>
                  <b>{h.ch3t}</b>
                  <span className="kms-caption-d">{h.ch3d}</span>
                  <button type="button" className="kms-caption-btn" onClick={runTour}>{t.replay}</button>
                </React.Fragment>
              )}
            </div>
            {street && (
              <div className="kms-street" style={{ zIndex: 20 }}>
                <div className="kms-street-frame" ref={streetContainerRef} style={{ width: '100%', height: '300px', borderRadius: '8px' }}>
                  <b>{h.streetT}</b>
                  <p>{h.streetNote}</p>
                  <p className="kms-street-addr">{HQ.address.join(' · ')}</p>
                </div>
                <button type="button" className="kms-caption-btn" onClick={() => setStreet(false)}>{h.streetClose}</button>
              </div>
            )}
            <button type="button" className="kms-streettoggle" style={{ zIndex: 10 }} onClick={() => setStreet(!street)}>{street ? h.streetClose : h.streetToggle}</button>
            <KScaleBar apiRef={apiRef} ready={ready} locale={locale} />
          </KMapStage>
        </div>
        <div className="kms-sidecol">
          <KGlass title={h.panelT} t={t}>
            <ul className="kms-feats">
              {[h.f1, h.f2, h.f3, h.f4].map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <div className="kms-subhead">{h.sealsT}</div>
            <KSeals locale={locale} />
            <p className="kms-note">{h.genau}</p>
            <p className="kms-note dim">{h.ringNote}</p>
            <div className="kms-subhead">{h.regT}</div>
            <KRow k={h.regCourt} v={HQ.registry.court + ' ' + HQ.registry.number} t={t} />
            <KRow k={h.regSeat} v={h.regSeatV} t={t} />
            <KRow k="Kontakt" v={HQ.phone} t={t} />
            <div className="kms-ctarow">
              <KBtn primary onClick={() => setToast(h.auditOk)}>{h.ctaAudit}</KBtn>
              <KBtn href={HQ.dirUrl}>{h.ctaRoute}</KBtn>
            </div>
          </KGlass>
        </div>
      </div>
      <KToast msg={toast} />
    </section>
  );
}
Object.assign(window, { HqMapSection });
