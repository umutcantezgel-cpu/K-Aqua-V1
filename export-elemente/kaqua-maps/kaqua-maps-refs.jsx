/* Karte Zwei — Die globale Dichtheitskarte (Masterplan Sektion 04).
   Google Maps API Edition with Geodesic Supply Polylines & Advanced Markers. */
function kFitCam(api, pts, padFrac, maxZ, done) {
  if (!api || !api.map) return;
  const bounds = new google.maps.LatLngBounds();
  pts.forEach(p => bounds.extend(p));
  api.map.fitBounds(bounds, { top: 50, bottom: 50, left: 50, right: 50 });
  if (done) setTimeout(done, 500);
}

const KMS_GLYPHS = {
  hotel: <path d="M6 1l5 5-5 5-5-5z" />,
  wohnen: <rect x="2.2" y="2.2" width="7.6" height="7.6" />,
  infra: <path d="M6 1.6l5 8.8H1z" />,
  klinik: <path d="M4.6 1h2.8v3.6H11v2.8H7.4V11H4.6V7.4H1V4.6h3.6z" />,
  buero: <circle cx="6" cy="6" r="4.2" />
};

const KMS_REGIONS = {
  world: { lat: 24, lng: 30, z: 2.5 },
  europe: { lat: 50, lng: 12, z: 4.3 },
  gulf: { lat: 25.5, lng: 51, z: 5.1 },
  asia: { lat: 12, lng: 96, z: 3.5 },
  africa: { lat: -8, lng: 25, z: 3.3 }
};

function TightCalc({ t, locale }) {
  const C = t.refs.calc, R = t.refs;
  const [bldg, setBldg] = useState('hotel');
  const [units, setUnits] = useState(400);
  const [clim, setClim] = useState('hot');
  const PER = { hotel: 220, wohnen: 130, klinik: 300, buero: 40 };
  const m3 = Math.round(units * PER[bldg] * 0.07 * (clim === 'hot' ? 1.35 : 1));
  const eur = Math.round(m3 * 2.5);
  return (
    <div className="kms-glass kms-calc">
      <div className="kms-glass-h"><h3>{C.t}</h3></div>
      <p className="kms-note">{C.lede}</p>
      <div className="kms-calcgrid">
        <div>
          <div className="kms-subhead">{C.bldg}</div>
          <div className="kms-chips">
            {['hotel', 'wohnen', 'klinik', 'buero'].map((k) => <KChip key={k} active={bldg === k} onClick={() => setBldg(k)}>{R.sectors[k]}</KChip>)}
          </div>
          <div className="kms-subhead">{C.unitName[bldg]}: <b className="kms-calcval">{kFmt(units, locale)}</b></div>
          <input type="range" min="50" max="2000" step="10" value={units} aria-label={C.unitName[bldg]} onChange={(e) => setUnits(+e.target.value)} />
          <div className="kms-subhead">{C.clim}</div>
          <div className="kms-chips">
            <KChip active={clim === 'temperate'} onClick={() => setClim('temperate')}>{C.temperate}</KChip>
            <KChip active={clim === 'hot'} onClick={() => setClim('hot')}>{C.hot}</KChip>
          </div>
        </div>
        <div className="kms-outcol">
          <div className="kms-out"><b>{kFmt(m3, locale)}</b><span>{C.m3}<em className="kms-model" title={t.modelNote}>{t.model}</em></span></div>
          <div className="kms-out"><b>{kFmt(eur, locale)}</b><span>{C.eur}<em className="kms-model" title={t.modelNote}>{t.model}</em></span></div>
          <p className="kms-note dim">{C.note}</p>
        </div>
      </div>
    </div>
  );
}

function RefsMapSection({ t, locale }) {
  const D = KMapsData, R = t.refs, HQ = D.HQ_SITE;
  const [secRef, inView] = useInViewMount(200);
  const [sector, setSector] = useState('all');
  const [sel, setSel] = useState(null);
  const [hov, setHov] = useState(null);
  const [view, setView] = useState('map');
  const [toast, setToast] = useState('');
  const [dossier, setDossier] = useState(null);
  const hovT = useRef(0);
  const firstFit = useRef(true);
  const polylinesRef = useRef([]);

  const sites = useMemo(() => sector === 'all' ? D.REFERENCE_SITES : D.REFERENCE_SITES.filter((s) => s.sector === sector), [sector]);
  const points = useMemo(() => sites.map((s) => ({ lat: s.position.lat, lng: s.position.lng })).concat([HQ.position]), [sites]);
  const startAr = locale === 'ar';

  const { canvasRef, apiRef, ready } = useKMap({
    mounted: inView,
    center: startAr ? { lat: KMS_REGIONS.gulf.lat, lng: KMS_REGIONS.gulf.lng } : { lat: 26, lng: 34 },
    zoom: startAr ? 4.4 : 2.7, minZoom: 2.2, maxZoom: 14, locale,
    onClick: () => setSel(null)
  });

  // Render Geodesic Supply Polylines on Google Maps
  useEffect(() => {
    if (!ready || !apiRef.current || !apiRef.current.map) return;
    const gmap = apiRef.current.map;

    // Clear previous polylines
    polylinesRef.current.forEach(p => p.setMap(null));

    // Draw geodesic supply line from Waldsolms HQ to each visible reference site
    const polylines = sites.map((site) => {
      return new google.maps.Polyline({
        path: [HQ.position, site.position],
        geodesic: true,
        strokeColor: '#702cb4',
        strokeOpacity: 0.45,
        strokeWeight: 2,
        map: gmap
      });
    });

    polylinesRef.current = polylines;

    return () => {
      polylines.forEach(p => p.setMap(null));
    };
  }, [ready, sites]);

  const pos = useProjected(apiRef, points, inView);

  useEffect(() => {
    if (!ready || !apiRef.current) return;
    if (firstFit.current) { firstFit.current = false; return; }
    kFitCam(apiRef.current, points, 0.4, 6.2);
  }, [ready, points]);

  useEffect(() => { if (!toast) return; const x = setTimeout(() => setToast(''), 3400); return () => clearTimeout(x); }, [toast]);
  useEffect(() => { setSel(null); setHov(null); }, [sector]);
  useEffect(() => {
    if (!dossier) return;
    const h = (e) => { if (e.key === 'Escape') setDossier(null); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [dossier]);

  const years = sites.reduce((a, s) => a + (D.YEAR_NOW - s.year), 0);
  const shownId = sel || hov;
  const shown = shownId ? D.REFERENCE_SITES.find((s) => s.id === shownId) : null;
  const enter = (id) => { clearTimeout(hovT.current); hovT.current = setTimeout(() => setHov(id), 120); };
  const leave = () => { clearTimeout(hovT.current); hovT.current = setTimeout(() => setHov(null), 160); };
  const yearsOf = (s) => D.YEAR_NOW - s.year;

  const dossierText = (s) => [
    R.dossierT + ': ' + R.names[s.id].n, R.names[s.id].c, '',
    R.tightSince(yearsOf(s)),
    R.sysT + ': ' + s.sys, R.dimsT + ': ' + s.dims, R.pnT + ': ' + s.pn,
    R.weldT + ': ' + R.weld[s.weld],
    s.kessel ? R.kesselT + ': ' + R.kesselV : '',
    R.yearT + ': ' + s.year, '', t.modelNote
  ].filter(Boolean).join('\n');

  const toSpec = (s) => {
    window.dispatchEvent(new CustomEvent('kmsSpecSite', { detail: { lat: s.position.lat, lng: s.position.lng, label: R.names[s.id].c } }));
    location.hash = '#kmsSpec';
  };

  const panelBody = (s, inModal) => (
    <React.Fragment>
      <div className="kms-city">{R.names[s.id].c}</div>
      <div className="kms-tight">{R.tightSince(yearsOf(s))}<em className="kms-model" title={t.modelNote}>{t.model}</em></div>
      <p className="kms-note">{R.names[s.id].d}</p>
      <KRow k={R.sysT} v={s.sys} t={t} />
      <KRow k={R.dimsT} v={s.dims} t={t} />
      <KRow k={R.pnT} v={s.pn} t={t} />
      <KRow k={R.weldT} v={R.weld[s.weld]} t={t} />
      {s.kessel && <KRow k={R.kesselT} v={R.kesselV} t={t} />}
      <KRow k={R.yearT} v={String(s.year)} model t={t} />
      {s.hot > 0 && <KRow k={R.hotT} v={kFmt(s.hot, locale) + ' °C'} model t={t} />}
      {inModal && <div className="kms-subhead">{t.hq.sealsT}</div>}
      {inModal && <KSeals locale={locale} />}
      <div className="kms-ctarow">
        {!inModal && <KBtn primary onClick={() => setDossier(s.id)}>{R.ctaDossier}</KBtn>}
        {inModal && <KBtn primary onClick={() => kDownload(R.dossierT + ' ' + R.names[s.id].n, dossierText(s))}>{R.dossierDl}</KBtn>}
        <KBtn onClick={() => toSpec(s)}>{R.ctaToSpec}</KBtn>
        {inModal && <KBtn onClick={() => setToast(R.dossierOk)}>{R.ctaSales}</KBtn>}
      </div>
    </React.Fragment>
  );

  return (
    <section className="kms-sec" id="kmsRefs" ref={secRef} data-screen-label="Karte Zwei Dichtheitskarte">
      <KSecHead kicker={R.kicker} title={R.title} lede={R.lede} right={
        <div className="kms-balance">
          <div className="kms-balance-n">{kFmt(years, locale)}</div>
          <div className="kms-balance-u">{R.balanceUnit}<em className="kms-model" title={t.modelNote}>{t.model}</em></div>
          <div className="kms-balance-env">{R.envLine}</div>
        </div>
      } />
      <div className="kms-toolbar">
        <div className="kms-chips">
          <KChip active={sector === 'all'} onClick={() => setSector('all')}>{R.allSectors}</KChip>
          {Object.keys(R.sectors).map((k) => <KChip key={k} active={sector === k} onClick={() => setSector(k)}>{R.sectors[k]}</KChip>)}
        </div>
        <div className="kms-chips">
          <KChip active={view === 'map'} onClick={() => setView('map')}>{t.mapView}</KChip>
          <KChip active={view === 'list'} onClick={() => setView('list')}>{t.listView}</KChip>
        </div>
      </div>
      <div style={{ display: view === 'map' ? 'block' : 'none' }}>
        <KMapStage t={t} height={560} mounted={inView} ready={ready} hint={false} canvasRef={canvasRef}
          ariaLabel={R.title} onZoom={(d) => apiRef.current && apiRef.current.zoomBy(d)}
          onKeyPan={(x, y) => apiRef.current && apiRef.current.panBy(x, y)}>
          <div className="kms-regionbar" style={{ zIndex: 10 }}>
            {Object.keys(KMS_REGIONS).map((k) => (
              <button type="button" key={k} className="kms-caption-btn" onClick={() => apiRef.current && apiRef.current.flyTo({ lat: KMS_REGIONS[k].lat, lng: KMS_REGIONS[k].lng, zoom: KMS_REGIONS[k].z }, 1250)}>{R.regions[k]}</button>
            ))}
          </div>
          {pos.map((p, i) => {
            if (i === sites.length) {
              return (
                <div key="hq" className="kms-hqmark small" style={{ left: p.x, top: p.y, zIndex: 5 }}>
                  <div className="em">K</div>
                  {p.zoom > 4 && <div className="kms-marklabel">{R.hqMarker}</div>}
                </div>
              );
            }
            const s = sites[i];
            return (
              <button type="button" key={s.id} className={'kms-refmark' + (shownId === s.id ? ' on' : '')}
                style={{ left: p.x, top: p.y, zIndex: 6 }} aria-label={R.names[s.id].n}
                onMouseEnter={() => enter(s.id)} onMouseLeave={leave}
                onClick={(e) => { e.stopPropagation(); setSel(sel === s.id ? null : s.id); }}
                onFocus={() => setHov(s.id)} onBlur={() => setHov(null)}>
                <svg viewBox="0 0 12 12" width="12" height="12" fill="#fff" aria-hidden="true">{KMS_GLYPHS[s.sector]}</svg>
              </button>
            );
          })}
          {shown && (
            <div className="kms-mappanel" style={{ zIndex: 15 }} onMouseEnter={() => clearTimeout(hovT.current)} onMouseLeave={leave}>
              <KGlass title={R.names[shown.id].n} onClose={() => { setSel(null); setHov(null); }} t={t}>
                {panelBody(shown, false)}
              </KGlass>
            </div>
          )}
          <KScaleBar apiRef={apiRef} ready={ready} locale={locale} />
        </KMapStage>
        <p className="kms-note dim">{R.netLine}</p>
      </div>
      {view === 'list' && (
        <div className="kms-tablewrap">
          <table className="kms-table">
            <thead><tr>{R.listCols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
            <tbody>
              {sites.map((s) => (
                <tr key={s.id} className={sel === s.id ? 'on' : ''} onClick={() => setDossier(s.id)}>
                  <td><b>{R.names[s.id].n}</b><span className="kms-td-sub">{R.names[s.id].c}</span></td>
                  <td>{R.sectors[s.sector]}</td>
                  <td>{s.sys}</td>
                  <td>{s.year}<em className="kms-model" title={t.modelNote}>{t.model}</em></td>
                  <td><b>{kFmt(yearsOf(s), locale)}</b></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="kms-note dim">{t.modelNote}</p>
        </div>
      )}
      <TightCalc t={t} locale={locale} />
      {dossier && (
        <div className="kms-modal" onClick={(e) => { if (e.target === e.currentTarget) setDossier(null); }}>
          <div className="kms-modal-card" role="dialog" aria-modal="true" aria-label={R.dossierT}>
            <KGlass title={R.dossierT + ': ' + R.names[dossier].n} onClose={() => setDossier(null)} t={t} tone="plain">
              {panelBody(D.REFERENCE_SITES.find((s) => s.id === dossier), true)}
            </KGlass>
          </div>
        </div>
      )}
      <KToast msg={toast} />
    </section>
  );
}
Object.assign(window, { RefsMapSection, kFitCam, TightCalc });
