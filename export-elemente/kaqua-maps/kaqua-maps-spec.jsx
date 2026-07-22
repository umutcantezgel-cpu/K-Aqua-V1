/* Karte Drei — Der Projektstandort Spezifikator (Masterplan Sektion 05).
   Google Maps API Edition with Places Autocomplete & Geodesic Supply Axis. */
function SpecMapSection({ t, locale }) {
  const D = KMapsData, S = t.spec, HQ = D.HQ_SITE;
  const [secRef, inView] = useInViewMount(200);
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [site, setSite] = useState(null);
  const [mail, setMail] = useState('');
  const [toast, setToast] = useState('');
  const siteRef = useRef(null);
  const inputRef = useRef(null);
  const polylineRef = useRef(null);
  const markerRef = useRef(null);

  const { canvasRef, apiRef, ready } = useKMap({
    mounted: inView,
    center: { lat: 42, lng: 22 }, zoom: 2.9, minZoom: 2.2, maxZoom: 14, locale,
    onClick: (ll) => selectSite({ lat: ll.lat, lng: ll.lng, label: coordLabel(ll) })
  });

  // Attach Google Places Autocomplete to Search Input
  useEffect(() => {
    if (!ready || !inputRef.current || !window.google || !window.google.maps || !google.maps.places) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      types: ['(cities)'],
      fields: ['geometry', 'formatted_address', 'name']
    });

    const listener = autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place && place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const label = place.name || place.formatted_address || coordLabel({ lat, lng });
        selectSite({ lat, lng, label });
      }
    });

    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [ready]);

  // Update Geodesic Polyline Supply Axis & Pin Marker when site changes
  useEffect(() => {
    if (!ready || !apiRef.current || !apiRef.current.map) return;
    const gmap = apiRef.current.map;

    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }
    if (markerRef.current) {
      markerRef.current.map = null;
      markerRef.current = null;
    }

    if (site) {
      // Draw geodesic supply axis polyline
      const line = new google.maps.Polyline({
        path: [HQ.position, { lat: site.lat, lng: site.lng }],
        geodesic: true,
        strokeColor: '#2b5d80',
        strokeOpacity: 0.85,
        strokeWeight: 3,
        map: gmap
      });
      polylineRef.current = line;

      // Draw AdvancedMarkerElement or Marker
      if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
        const pinDiv = document.createElement('div');
        pinDiv.className = 'kms-sitepin-gmaps';
        pinDiv.style.cssText = 'position:relative;display:flex;flex-direction:column;align-items:center;transform:translate(-50%,-100%);cursor:pointer;';
        pinDiv.innerHTML = `<svg width="26" height="34" viewBox="0 0 26 34"><path d="M13 1C6.4 1 1 6.4 1 13c0 8.5 12 20 12 20s12-11.5 12-20C25 6.4 19.6 1 13 1z" fill="#2b5d80" stroke="#fff" stroke-width="2"/><circle cx="13" cy="13" r="4.5" fill="#fff"/></svg><div className="kms-marklabel" style="background:rgba(255,255,255,0.92);padding:3px 8px;border-radius:4px;font-size:11px;font-weight:600;color:#2b5d80;box-shadow:0 2px 6px rgba(0,0,0,0.12);white-space:nowrap;margin-top:2px;">${site.label}</div>`;

        markerRef.current = new google.maps.marker.AdvancedMarkerElement({
          map: gmap,
          position: { lat: site.lat, lng: site.lng },
          content: pinDiv,
          title: site.label
        });
      } else {
        markerRef.current = new google.maps.Marker({
          map: gmap,
          position: { lat: site.lat, lng: site.lng },
          title: site.label
        });
      }
    }
  }, [ready, site]);

  const readyRef = useRef(false); readyRef.current = ready;
  const pendingRef = useRef(null);

  useEffect(() => {
    const h = (e) => {
      if (readyRef.current && apiRef.current) selectSite(e.detail);
      else pendingRef.current = e.detail;
    };
    window.addEventListener('kmsSpecSite', h);
    return () => window.removeEventListener('kmsSpecSite', h);
  }, []);

  useEffect(() => {
    if (ready && pendingRef.current) { const d = pendingRef.current; pendingRef.current = null; selectSite(d); }
  }, [ready]);

  function coordLabel(ll) {
    return Math.abs(ll.lat).toFixed(1) + (ll.lat >= 0 ? ' N, ' : ' S, ') + Math.abs(ll.lng).toFixed(1) + (ll.lng >= 0 ? ' E' : ' W');
  }

  function selectSite(st) {
    siteRef.current = st;
    setSite(st); setQ(st.label); setOpen(false);
    const api = apiRef.current; if (!api) return;
    kFitCam(api, [HQ.position, st], 0.42, 8.5);
  }

  const sugg = useMemo(() => {
    const v = q.trim().toLowerCase();
    if (v.length < 1) return [];
    return D.PLACES.filter((p) => [p.de, p.en, p.ar].some((n) => n.toLowerCase().indexOf(v) >= 0)).slice(0, 7);
  }, [q]);

  useEffect(() => { if (!toast) return; const x = setTimeout(() => setToast(''), 3800); return () => clearTimeout(x); }, [toast]);

  // Compute market matching based on lat/lng distance
  const market = useMemo(() => {
    if (!site) return null;
    let best = null, bd = 1e9;
    D.MARKET_PROFILES.forEach((mp) => {
      const d = haversineKm(site, mp);
      if (d < bd) { bd = d; best = mp; }
    });
    return best;
  }, [site]);

  function haversineKm(a, b) {
    const R = 6371, toR = Math.PI / 180;
    const dLa = (b.lat - a.lat) * toR, dLo = (b.lng - a.lng) * toR;
    const h = Math.sin(dLa / 2) * Math.sin(dLa / 2) + Math.cos(a.lat * toR) * Math.cos(b.lat * toR) * Math.sin(dLo / 2) * Math.sin(dLo / 2);
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  const airKm = useMemo(() => {
    if (!site) return 0;
    if (window.google && window.google.maps && google.maps.geometry && google.maps.geometry.spherical) {
      return Math.round(google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(HQ.position.lat, HQ.position.lng),
        new google.maps.LatLng(site.lat, site.lng)
      ) / 1000);
    }
    return Math.round(haversineKm(HQ.position, site));
  }, [site]);

  const roadKm = Math.round(airKm * 1.22);

  const systems = useMemo(() => {
    if (!market) return [];
    const out = [S.sysStd];
    if (market.tempC >= 40) out.push(S.sysHot);
    out.push(S.sysRiser);
    if (market.tempC >= 45) out.push(S.sysUv);
    return out;
  }, [market, S]);

  const pts = useMemo(() => site ? [HQ.position, site] : [HQ.position], [site]);
  const pos = useProjected(apiRef, pts, inView);

  const submitPkg = () => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail.trim())) { setToast(S.gateOk); setMail(''); }
    else setToast(S.gateErr);
  };

  return (
    <section className="kms-sec" id="kmsSpec" ref={secRef} data-screen-label="Karte Drei Spezifikator">
      <KSecHead kicker={S.kicker} title={S.title} lede={S.lede} />
      <div className="kms-search">
        <input ref={inputRef} type="text" value={q} placeholder={S.searchPh} aria-label={S.searchPh}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => { if (e.key === 'Enter' && sugg.length) selectSite({ lat: sugg[0].lat, lng: sugg[0].lng, label: sugg[0][locale] || sugg[0].de }); if (e.key === 'Escape') setOpen(false); }} />
        {open && sugg.length > 0 && (
          <div className="kms-sug">
            {sugg.map((p) => (
              <button type="button" key={p.en} onClick={() => selectSite({ lat: p.lat, lng: p.lng, label: p[locale] || p.de })}>
                {p[locale] || p.de}<span>{S.marketNames[p.market]}</span>
              </button>
            ))}
          </div>
        )}
        <span className="kms-search-note">{S.pinNote}</span>
      </div>
      <div className="kms-secgrid spec">
        <div>
          <KMapStage t={t} height={620} mounted={inView} ready={ready} hint={false} canvasRef={canvasRef}
            ariaLabel={S.title} onZoom={(d) => apiRef.current && apiRef.current.zoomBy(d)}
            onKeyPan={(x, y) => apiRef.current && apiRef.current.panBy(x, y)}>
            {pos[0] && (
              <div className="kms-hqmark small" style={{ left: pos[0].x, top: pos[0].y, zIndex: 5 }}>
                <div className="em">K</div>
                {pos[0].zoom > 4.2 && <div className="kms-marklabel">{t.refs.hqMarker}</div>}
              </div>
            )}
            {site && pos[1] && (
              <div className="kms-sitepin" style={{ left: pos[1].x, top: pos[1].y, zIndex: 6 }}>
                <svg width="26" height="34" viewBox="0 0 26 34" aria-hidden="true">
                  <path d="M13 1C6.4 1 1 6.4 1 13c0 8.5 12 20 12 20s12-11.5 12-20C25 6.4 19.6 1 13 1z" fill="oklch(0.47 0.12 155)" stroke="#fff" strokeWidth="2" />
                  <circle cx="13" cy="13" r="4.5" fill="#fff" />
                </svg>
                <div className="kms-marklabel">{site.label}</div>
              </div>
            )}
            <KScaleBar apiRef={apiRef} ready={ready} locale={locale} />
          </KMapStage>
        </div>
        <div className="kms-sidecol">
          {!site && (
            <KGlass title={S.emptyT} t={t}><p className="kms-note">{S.emptyD}</p></KGlass>
          )}
          {site && market && (
            <React.Fragment>
              <KGlass title={S.resultT} t={t} tone="gn">
                <KRow k={S.marketT} v={S.marketNames[market.slug]} t={t} />
                <KRow k={S.normT} v={market.reg} model t={t} />
                <KRow k={S.climateT} v={S.climateV(kFmt(market.tempC, locale))} model t={t} />
                <div className="kms-subhead">{S.sysT}</div>
                <ul className="kms-feats">{systems.map((s, i) => <li key={i}>{s}</li>)}</ul>
                <p className="kms-note dim">{S.orient}</p>
              </KGlass>
              <KGlass title={S.axisT} t={t}>
                <KRow k={S.axisAir} v={kFmt(airKm, locale) + ' km'} t={t} />
                <KRow k={S.axisRoad} v={kFmt(roadKm, locale) + ' km'} model t={t} />
                <p className="kms-note">{airKm <= 150 ? S.axisSameDay : S.axisWorks}</p>
                <p className="kms-note dim">{S.axisRoadNote}</p>
              </KGlass>
            </React.Fragment>
          )}
          <KGlass title={S.bimT} t={t}>
            <p className="kms-note">{S.bimNote}</p>
            {D.BIM_INDEX.map((b) => (
              <div className="kms-bimrow" key={b.id}>
                <div>
                  <b>{S.bimItems[b.id]}</b>
                  <span className="kms-td-sub">{b.fmt} {b.ext} · {b.ver} · {b.size} · {S.langState}: {b.langs.join(', ')}</span>
                </div>
                <KBtn onClick={() => kDownload(S.bimItems[b.id], b.fmt + ' ' + b.ver + ' ' + b.size)}>{S.dl}</KBtn>
              </div>
            ))}
            <div className="kms-gate">
              <input type="email" value={mail} placeholder={S.mailPh} aria-label={S.mailPh} onChange={(e) => setMail(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') submitPkg(); }} />
              <KBtn primary onClick={submitPkg}>{S.dlAll}</KBtn>
            </div>
            <p className="kms-note dim">{S.gateNote}</p>
          </KGlass>
        </div>
      </div>
      <KToast msg={toast} />
    </section>
  );
}
Object.assign(window, { SpecMapSection });
