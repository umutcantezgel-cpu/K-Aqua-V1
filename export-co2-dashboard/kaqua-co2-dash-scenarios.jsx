/* K-Aqua CO2 Dashboard — Szenario-Manager: Parametersätze einfrieren,
   vergleichen, als gestrichelte Overlays in den Hauptchart legen (max. 2). */
const { useState: uSS } = React;

function Co2Scenarios({ paramsNow, scenarios, setScenarios, overlayIds, setOverlayIds, onApply, summarize, describe, fmt }) {
  const [name, setName] = uSS('');
  function freeze() {
    const sc = { id: 'sc' + Date.now(), name: name.trim() || `Szenario ${String.fromCharCode(65 + (scenarios.length % 26))}`, params: paramsNow, savedAt: new Date().toLocaleDateString('de-DE') };
    setScenarios(scenarios.concat(sc));
    setName('');
  }
  function toggleOverlay(id) {
    setOverlayIds(overlayIds.indexOf(id) !== -1 ? overlayIds.filter((x) => x !== id) : overlayIds.concat(id).slice(-2));
  }
  const now = summarize(paramsNow);
  return (
    <div className="co2-scn">
      <div className="co2-scn-row is-now">
        <div>
          <strong>Aktueller Stand</strong>
          <span className="co2-scn-chips">{describe(paramsNow)}</span>
        </div>
        <div className="co2-scn-val"><strong>{fmt(now.savings)}</strong><small>Ersparnis vs. {now.oppLabel}</small></div>
      </div>
      <div className="co2-scn-new">
        <input type="text" className="co2-inp" value={name} placeholder="Name, z. B. Variante Ausschreibung" maxLength={40}
          onChange={(e) => setName(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') freeze(); }} aria-label="Szenario-Name" />
        <button type="button" className="co2-play-btn" onClick={freeze}><Icons.Check size={14} />Stand einfrieren</button>
      </div>
      {scenarios.length === 0 ? (
        <p className="co2-mod-note">Noch keine Szenarien. Regler einstellen, benennen, einfrieren — dann hier vergleichen und als Overlay in den Chart legen.</p>
      ) : (
        <div className="co2-scn-list">
          {scenarios.map((sc) => {
            const s = summarize(sc.params);
            const ov = overlayIds.indexOf(sc.id) !== -1;
            return (
              <div className="co2-scn-row" key={sc.id}>
                <div>
                  <strong>{sc.name} <small>· {sc.savedAt}</small></strong>
                  <span className="co2-scn-chips">{describe(sc.params)}</span>
                </div>
                <div className="co2-scn-val"><strong>{fmt(s.savings)}</strong><small>vs. {s.oppLabel}</small></div>
                <div className="co2-scn-actions">
                  <button type="button" className={`co2-mini-btn ${ov ? 'is-on' : ''}`} aria-pressed={ov} onClick={() => toggleOverlay(sc.id)} title="Als gestrichelte Kurven im Chart überlagern (max. 2)">Overlay</button>
                  <button type="button" className="co2-mini-btn" onClick={() => onApply(sc.params)} title="Parameter in die Regler übernehmen">Laden</button>
                  <button type="button" className="co2-mini-btn is-danger" onClick={() => { setScenarios(scenarios.filter((x) => x.id !== sc.id)); setOverlayIds(overlayIds.filter((x) => x !== sc.id)); }} aria-label={`${sc.name} löschen`}><Icons.X size={13} /></button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <p className="co2-mod-note">Szenarien werden lokal gespeichert und mit dem aktuellen Betrachtungshorizont neu berechnet. Overlays erscheinen in der Ansicht „Kumulativ".</p>
    </div>
  );
}
Object.assign(window, { Co2Scenarios });
