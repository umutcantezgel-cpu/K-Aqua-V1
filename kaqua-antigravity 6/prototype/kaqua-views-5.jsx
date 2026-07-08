// K-Aqua Redesign — Views 5: Karriere-Tools (Benefits-Rechner, Culture Matcher) + Referenz-Globus
const { useState: useS5, useEffect: useE5, useRef: useRef5 } = React;

/* =====================  KARRIERE: BENEFITS-RECHNER + CULTURE MATCHER  ===================== */
const K_BENEFITS = [
  { id: 'sachbezug', label: 'Sachbezugskarte', net: 50, d: 'Steuerfreier Sachbezug — monatlich aufs Kartenkonto.' },
  { id: 'lunch', label: 'Essenszuschuss', net: 108, d: 'Digitale Essensmarken für Mittagessen & Supermarkt.' },
  { id: 'internet', label: 'Internetpauschale', net: 50, d: 'Zuschuss zur privaten Internetnutzung.' },
  { id: 'jobrad', label: 'JobRad-Leasing', net: 45, d: 'Wunschrad per Gehaltsumwandlung — Ersparnis vs. Privatkauf.' },
  { id: 'kita', label: 'Kita-Zuschuss', net: 100, d: 'Steuerfreier Zuschuss zur Kinderbetreuung.' },
  { id: 'vwl', label: 'Vermögenswirksame Leistungen', net: 40, d: 'Monatlicher Sparbeitrag vom Arbeitgeber.' },
];

const K_CULTURE = [
  { q: 'Wie arbeiten Sie am liebsten?', opts: ['Klare Abläufe, eingespieltes Team', 'Jeden Tag etwas Neues ausprobieren'], scores: [1, 0] },
  { q: 'Großserie läuft. Eine Maschine meldet eine Abweichung.', opts: ['Sofort hinschauen, Ursache finden', 'Erstmal weiterlaufen lassen'], scores: [1, 0] },
  { q: 'Was motiviert Sie mehr?', opts: ['Ein Produkt, das 50 Jahre hält', 'Schnelle, sichtbare Ergebnisse'], scores: [1, 0.5] },
  { q: 'Schichtarbeit ist für Sie …', opts: ['Planbar und okay', 'Eher schwierig'], scores: [1, 0] },
  { q: 'Ihr Verhältnis zu Technik?', opts: ['Ich will verstehen, wie Dinge funktionieren', 'Hauptsache es läuft'], scores: [1, 0.5] },
];

/* =====================  CV / BEWERBUNGSGENERATOR  ===================== */
function CVGenerator({ L }) {
  const [p, setP] = useDraft('cv-profile', { name: '', city: '', email: '', phone: '', about: '' });
  const [exp, setExp] = useDraft('cv-exp', [{ role: '', company: '', period: '' }]);
  const [edu, setEdu] = useDraft('cv-edu', [{ degree: '', school: '', period: '' }]);
  const [skills, setSkills] = useDraft('cv-skills', '');
  const [files, setFiles] = useDraft('cv-files', []);
  const [sent, setSent] = useS5(false);

  const setP1 = (k, v) => setP((o) => ({ ...o, [k]: v }));
  const setRow = (list, setList, i, k, v) => setList(list.map((r, j) => (j === i ? { ...r, [k]: v } : r)));
  const addRow = (setList, tmpl) => setList((l) => l.concat({ ...tmpl }));
  const removeRow = (list, setList, i) => setList(list.filter((_, j) => j !== i));
  const skillChips = skills.split(',').map((s) => s.trim()).filter(Boolean);

  const addFile = (e) => {
    const f = e.target.files[0];
    if (f) setFiles((fl) => fl.concat(f.name));
    e.target.value = '';
  };
  const removeFile = (i) => setFiles((fl) => fl.filter((_, j) => j !== i));

  const send = () => {
    const lines = [
      L.cvName + ': ' + p.name, L.cvCity + ': ' + p.city, L.cvEmail + ': ' + p.email, L.cvPhone + ': ' + p.phone,
      p.about ? L.cvAbout + ': ' + p.about : '', '',
      L.cvExpTitle + ':',
    ];
    exp.filter((e) => e.role || e.company).forEach((e) => lines.push('- ' + e.role + ' @ ' + e.company + ' (' + e.period + ')'));
    lines.push('', L.cvEduTitle + ':');
    edu.filter((e) => e.degree || e.school).forEach((e) => lines.push('- ' + e.degree + ', ' + e.school + ' (' + e.period + ')'));
    lines.push('');
    if (skillChips.length) lines.push(L.cvSkillsTitle + ': ' + skillChips.join(', '));
    if (files.length) lines.push(L.cvUploadTitle + ': ' + files.join(', ') + ' (bitte manuell anh\u00e4ngen)');
    const body = lines.filter((x) => x !== undefined).join('\n');
    window.open('mailto:andrea.nickel@k-aqua.de?subject=' + encodeURIComponent(L.cvMailSubject) + '&body=' + encodeURIComponent(body), '_blank');
    setSent(true);
  };

  if (sent) {
    return (
      <BentoCard tint style={{ alignItems: 'center', textAlign: 'center', gap: 'var(--sp-3)', maxWidth: 480, marginInline: 'auto' }}>
        <div className="k-icon-chip" style={{ width: 56, height: 56 }}><Icons.Check size={26} /></div>
        <h3 className="k-h3">{L.cvDoneTitle}</h3>
        <p className="k-body">{L.cvDoneText}</p>
        <button type="button" className="k-link" onClick={() => setSent(false)}>{L.cvSend}</button>
      </BentoCard>
    );
  }

  return (
    <div className="k-cv-grid">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
        <BentoCard className="k-cv-block">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--sp-3)' }}>
            <label className="k-field"><span>{L.cvName} *</span><input className="k-input" value={p.name} placeholder={L.cvNamePlaceholder} onChange={(e) => setP1('name', e.target.value)} /></label>
            <label className="k-field"><span>{L.cvCity}</span><input className="k-input" value={p.city} onChange={(e) => setP1('city', e.target.value)} /></label>
            <label className="k-field"><span>{L.cvEmail} *</span><input className="k-input" type="email" value={p.email} onChange={(e) => setP1('email', e.target.value)} /></label>
            <label className="k-field"><span>{L.cvPhone}</span><input className="k-input" type="tel" value={p.phone} onChange={(e) => setP1('phone', e.target.value)} /></label>
          </div>
          <label className="k-field"><span>{L.cvAbout}</span><textarea className="k-input" rows="2" placeholder={L.cvAboutPlaceholder} value={p.about} onChange={(e) => setP1('about', e.target.value)}></textarea></label>
        </BentoCard>

        <BentoCard className="k-cv-block">
          <h3 className="k-h3" style={{ fontSize: 17 }}>{L.cvExpTitle}</h3>
          {exp.map((row, i) => (
            <div className="k-cv-row" key={i}>
              <label className="k-field"><span>{L.cvExpRole}</span><input className="k-input" value={row.role} onChange={(e) => setRow(exp, setExp, i, 'role', e.target.value)} /></label>
              <label className="k-field"><span>{L.cvExpCompany}</span><input className="k-input" value={row.company} onChange={(e) => setRow(exp, setExp, i, 'company', e.target.value)} /></label>
              <label className="k-field"><span>{L.cvExpPeriod}</span><input className="k-input" value={row.period} onChange={(e) => setRow(exp, setExp, i, 'period', e.target.value)} /></label>
              <button type="button" className="k-cv-row-remove" aria-label={L.cvRemove} onClick={() => removeRow(exp, setExp, i)}><Icons.X size={16} /></button>
            </div>
          ))}
          <button type="button" className="k-link" onClick={() => addRow(setExp, { role: '', company: '', period: '' })}>{L.cvAddExp}</button>
        </BentoCard>

        <BentoCard className="k-cv-block">
          <h3 className="k-h3" style={{ fontSize: 17 }}>{L.cvEduTitle}</h3>
          {edu.map((row, i) => (
            <div className="k-cv-row" key={i}>
              <label className="k-field"><span>{L.cvEduDegree}</span><input className="k-input" value={row.degree} onChange={(e) => setRow(edu, setEdu, i, 'degree', e.target.value)} /></label>
              <label className="k-field"><span>{L.cvEduSchool}</span><input className="k-input" value={row.school} onChange={(e) => setRow(edu, setEdu, i, 'school', e.target.value)} /></label>
              <label className="k-field"><span>{L.cvEduPeriod}</span><input className="k-input" value={row.period} onChange={(e) => setRow(edu, setEdu, i, 'period', e.target.value)} /></label>
              <button type="button" className="k-cv-row-remove" aria-label={L.cvRemove} onClick={() => removeRow(edu, setEdu, i)}><Icons.X size={16} /></button>
            </div>
          ))}
          <button type="button" className="k-link" onClick={() => addRow(setEdu, { degree: '', school: '', period: '' })}>{L.cvAddEdu}</button>
        </BentoCard>

        <BentoCard className="k-cv-block">
          <h3 className="k-h3" style={{ fontSize: 17 }}>{L.cvSkillsTitle}</h3>
          <input className="k-input" value={skills} placeholder={L.cvSkillsPlaceholder} onChange={(e) => setSkills(e.target.value)} />
        </BentoCard>

        <BentoCard className="k-cv-block">
          <h3 className="k-h3" style={{ fontSize: 17 }}>{L.cvUploadTitle}</h3>
          <p className="k-body" style={{ fontSize: 13 }}>{L.cvUploadHint}</p>
          <div className="k-cv-upload-list">
            {files.map((f, i) => (
              <div className="k-cv-upload-item" key={i}><span>{f}</span><button type="button" onClick={() => removeFile(i)} aria-label={L.cvRemove}><Icons.X size={14} /></button></div>
            ))}
          </div>
          <label className="k-btn k-btn--ghost" style={{ cursor: 'pointer', display: 'inline-flex', width: 'fit-content' }}>
            <Icons.FileText size={18} /> {L.cvUploadBtn}
            <input type="file" style={{ display: 'none' }} onChange={addFile} />
          </label>
        </BentoCard>
      </div>

      <div>
        <div id="k-cv-print" className="k-cv-preview">
          <span className="name">{p.name || L.cvNamePlaceholder}</span>
          <span className="meta">{[p.city, p.email, p.phone].filter(Boolean).join(' \u00b7 ') || L.cvPreviewEmpty}</span>
          {p.about ? <p className="about">{p.about}</p> : null}
          {exp.some((e) => e.role || e.company) ? (
            <React.Fragment>
              <h4>{L.cvExpTitle}</h4>
              {exp.filter((e) => e.role || e.company).map((e, i) => (
                <div className="k-cv-entry" key={i}><span className="t">{e.role}{e.company ? ' \u2014 ' + e.company : ''}</span><span className="s">{e.period}</span></div>
              ))}
            </React.Fragment>
          ) : null}
          {edu.some((e) => e.degree || e.school) ? (
            <React.Fragment>
              <h4>{L.cvEduTitle}</h4>
              {edu.filter((e) => e.degree || e.school).map((e, i) => (
                <div className="k-cv-entry" key={i}><span className="t">{e.degree}{e.school ? ' \u2014 ' + e.school : ''}</span><span className="s">{e.period}</span></div>
              ))}
            </React.Fragment>
          ) : null}
          {skillChips.length ? (
            <React.Fragment>
              <h4>{L.cvSkillsTitle}</h4>
              <div className="k-cv-skills">{skillChips.map((s) => <span className="k-cv-skill" key={s}>{s}</span>)}</div>
            </React.Fragment>
          ) : null}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)', marginTop: 'var(--sp-4)' }}>
          <KButton onClick={() => window.print()} variant="ghost" icon={<Icons.Download size={18} />}>{L.cvPrint}</KButton>
          <KButton onClick={send} disabled={!p.name || !/.+@.+\..+/.test(p.email)} icon={<Icons.ArrowUpRight size={18} />}>{L.cvSend}</KButton>
          <span className="k-body" style={{ fontSize: 12 }}>{L.cvPrivacy}</span>
        </div>
      </div>
    </div>
  );
}

function CareerToolsView({ go }) {
  const L = usePageL('career');
  const { lang } = useT();
  const [sel, setSel] = useS5(['sachbezug', 'lunch']);
  const [used, setUsed] = useS5(false);
  const [cStep, setCStep] = useS5(-1);
  const [cScore, setCScore] = useS5(0);

  const toggleB = (id) => {
    setSel(sel.includes(id) ? sel.filter((x) => x !== id) : sel.concat(id));
  };
  const net = K_BENEFITS.filter((b) => sel.includes(b.id)).reduce((s, b) => s + b.net, 0);
  const grossEquiv = Math.round(net / 0.55 / 10) * 10; // ≈ what a raise would need to be, demo

  const cAnswer = (i) => {
    const sc = cScore + K_CULTURE[cStep].scores[i];
    setCScore(sc);
    const s = cStep + 1;
    setCStep(s);
  };
  const cPct = Math.round((cScore / K_CULTURE.length) * 100);

  return (
    <main className="k-page" style={{ paddingTop: 72 }}>
      <PageHero eyebrow={L.eyebrow} title={<span>{L.title1} <span className="k-grad-text">{L.titleGrad}</span></span>}
        lead={L.lead} />

      {/* Benefits-Rechner */}
      <section className="k-section" style={{ paddingTop: 0 }}>
        <div className="k-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: 'var(--sp-8)', alignItems: 'start' }}>
          <div>
            <SectionHead eyebrow={L.benEyebrow} title={L.benTitle} lead={L.benLead} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--sp-3)' }}>
              {K_BENEFITS.map((b) => (
                <label key={b.id} className={`k-doc-check ${sel.includes(b.id) ? 'is-on' : ''}`} style={{ alignItems: 'flex-start', paddingBlock: 'var(--sp-3)' }}>
                  <input type="checkbox" checked={sel.includes(b.id)} onChange={() => toggleB(b.id)} style={{ marginTop: 3 }} />
                  <span>
                    <strong style={{ display: 'block', fontFamily: 'var(--font-heading)' }}>{(L.benefits[b.id] || [b.label])[0]} <span style={{ color: 'var(--primary)' }}>+{b.net} €</span></strong>
                    <span style={{ fontSize: 13.5, color: 'var(--muted-foreground)' }}>{(L.benefits[b.id] || [b.label, b.d])[1]}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
          <BentoCard tint className="k-sticky-result" style={{ gap: 'var(--sp-2)' }}>
            <span style={{ fontSize: 13.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>{L.resultLabel}</span>
            <span className="k-result-num">{net} €</span>
            <p className="k-body">{L.resultNote1} <strong style={{ color: 'var(--foreground)' }}>{kFmt(L.resultNote2, { n: grossEquiv.toLocaleString(lang) })}</strong> {L.resultNote3} <span style={{ fontSize: 13 }}>{L.resultNote4}</span></p>
            <KButton href="mailto:andrea.nickel@k-aqua.de?subject=Bewerbung%20bei%20K-Aqua" icon={<Icons.ArrowUpRight size={18} />}>{L.apply}</KButton>
            <a className="k-link" href="tel:+4960859868410">{L.call}</a>
          </BentoCard>
        </div>
      </section>

      <GlobeScrollFX variant="fluid" fx="driftR" size={280} />

      {/* Culture Matcher */}
      <section className="k-section k-section--subtle">
        <div className="k-container" style={{ maxWidth: 720 }}>
          <SectionHead align="center" eyebrow={L.cmEyebrow} title={L.cmTitle} />
          <BentoCard style={{ minHeight: 280 }}>
            {cStep === -1 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)', alignItems: 'center', textAlign: 'center', margin: 'auto' }}>
                <div className="k-icon-chip" style={{ width: 64, height: 64 }}><Icons.Users size={32} /></div>
                <p className="k-body">{L.cmIntro}</p>
                <KButton onClick={() => { setCStep(0); setCScore(0); }} icon={<Icons.ArrowRight size={18} />}>{L.cmStart}</KButton>
              </div>
            ) : cStep < K_CULTURE.length ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--primary)' }}>{L.qLabel} {cStep + 1} / {K_CULTURE.length}</span>
                <h3 className="k-h3">{L.cmQ[cStep].q}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
                  {L.cmQ[cStep].o.map((o, i) => (
                    <button key={o} type="button" className="k-quiz-opt" onClick={() => cAnswer(i)}>{o}</button>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)', alignItems: 'center', textAlign: 'center', margin: 'auto' }}>
                <span className="k-result-num">{cPct}%</span>
                <p className="k-body">
                  {cPct >= 80 ? L.resHigh : cPct >= 50 ? L.resMid : L.resLow}
                </p>
                <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <KButton href="mailto:andrea.nickel@k-aqua.de?subject=Bewerbung%20bei%20K-Aqua">{L.sendApp}</KButton>
                  <KButton variant="ghost" onClick={() => { setCStep(-1); setCScore(0); }}>{L.again}</KButton>
                </div>
              </div>
            )}
          </BentoCard>
        </div>
      </section>

      {/* CV / Application Generator */}
      <GlobeScrollFX variant="contour" fx="zoom" size={280} />
      <section className="k-section k-section--subtle">
        <div className="k-container">
          <SectionHead align="center" eyebrow={L.cvEyebrow} title={L.cvTitle} lead={L.cvLead} />
          <CVGenerator L={L} />
        </div>
      </section>

      {/* Recruiting Engine — direct, low-friction contact */}
      <section className="k-section">
        <div className="k-container" style={{ maxWidth: 760 }}>
          <SectionHead align="center" eyebrow={L.recEyebrow} title={L.recTitle} lead={L.recLead} />
          <RecruitingForm L={L} cultureScorePct={cStep === K_CULTURE.length ? cPct : null} />
        </div>
      </section>

      <CareerDeep />
    </main>
  );
}

/* =====================  RECRUITING ENGINE  ===================== */
function RecruitingForm({ L, cultureScorePct }) {
  const [f, setF] = useDraft('recruiting', { position: (L.positions || [])[0] || '', availability: (L.availabilities || [])[0] || '', name: '', email: '', fileName: '', motivation: '' });
  const [sent, setSent] = useS5(false);
  const set = (k, v) => setF((o) => ({ ...o, [k]: v }));
  const valid = f.name.trim() && /.+@.+\..+/.test(f.email);

  const send = () => {
    const body = [
      `${L.fPosition}: ${f.position}`,
      `${L.fAvailability}: ${f.availability}`,
      `${L.fName}: ${f.name}`,
      `${L.fEmail}: ${f.email}`,
      f.fileName ? `${L.fCV}: ${f.fileName} (bitte manuell anh\u00e4ngen)` : '',
      cultureScorePct != null ? `${L.cultureNote}: ${cultureScorePct}%` : '',
      f.motivation ? `${L.fMotivation}: ${f.motivation}` : '',
    ].filter(Boolean).join('\n');
    window.open('mailto:andrea.nickel@k-aqua.de?subject=' + encodeURIComponent(L.recMailSubject + ' \u2014 ' + f.position) + '&body=' + encodeURIComponent(body), '_blank');
    setSent(true);
  };

  if (sent) {
    return (
      <BentoCard tint style={{ alignItems: 'center', textAlign: 'center', gap: 'var(--sp-3)' }}>
        <div className="k-icon-chip" style={{ width: 56, height: 56 }}><Icons.Check size={26} /></div>
        <h3 className="k-h3">{L.recDoneTitle}</h3>
        <p className="k-body">{L.recDoneText}</p>
        <button type="button" className="k-link" onClick={() => setSent(false)}>{L.recSend}</button>
      </BentoCard>
    );
  }

  return (
    <BentoCard style={{ gap: 'var(--sp-4)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--sp-3)' }}>
        <label className="k-field">
          <span>{L.fPosition}</span>
          <select className="k-input" value={f.position} onChange={(e) => set('position', e.target.value)}>
            {(L.positions || []).map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </label>
        <label className="k-field">
          <span>{L.fAvailability}</span>
          <select className="k-input" value={f.availability} onChange={(e) => set('availability', e.target.value)}>
            {(L.availabilities || []).map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </label>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--sp-3)' }}>
        <label className="k-field"><span>{L.fName} *</span><input className="k-input" type="text" value={f.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" /></label>
        <label className="k-field"><span>{L.fEmail} *</span><input className="k-input" type="email" value={f.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" /></label>
      </div>
      <label className="k-field">
        <span>{L.fCV}</span>
        <input className="k-input" type="file" onChange={(e) => set('fileName', e.target.files[0] ? e.target.files[0].name : '')} />
      </label>
      {f.fileName ? <p className="k-body" style={{ fontSize: 13 }}>{L.cvHint}</p> : null}
      <label className="k-field"><span>{L.fMotivation}</span><textarea className="k-input" rows="3" value={f.motivation} onChange={(e) => set('motivation', e.target.value)}></textarea></label>
      {cultureScorePct != null ? (
        <span className="k-chip"><Icons.Users size={14} style={{ color: 'var(--accent-strong)' }} /><strong>{L.cultureNote}: {cultureScorePct}%</strong></span>
      ) : null}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
        <KButton onClick={send} disabled={!valid} icon={<Icons.ArrowUpRight size={18} />}>{L.recSend}</KButton>
        <span className="k-body" style={{ fontSize: 12.5 }}>{L.recPrivacy}</span>
      </div>
    </BentoCard>
  );
}

/* =====================  REFERENZ-GLOBUS  ===================== */
const K_PROJECTS = [
  { lat: 50.4, lon: 8.5, title: 'Waldsolms, Deutschland', d: 'Stammwerk & Entwicklung — hier entsteht jedes K-Aqua-Rohr.' },
  { lat: 25.2, lon: 55.3, title: 'Dubai, VAE', d: 'Hochhaus-Steigleitungen — PP-RCT für Heißwasser unter Wüstenbedingungen.' },
  { lat: 52.2, lon: 21.0, title: 'Warschau, Polen', d: 'Wohnquartier-Neubau — komplette Trinkwasserinstallation d20–d110.' },
  { lat: 41.0, lon: 28.9, title: 'Istanbul, Türkei', d: 'Hotelkomplex — Zirkulationsleitungen mit Faserverbundrohr.' },
  { lat: 1.35, lon: 103.8, title: 'Singapur', d: 'Infrastrukturprojekt — Großdimensionen bis d630 im Stumpfschweißverfahren.' },
  { lat: -33.9, lon: 18.4, title: 'Kapstadt, Südafrika', d: 'Krankenhausneubau — hygienische Trinkwasserverteilung.' },
  { lat: 51.5, lon: -0.1, title: 'London, UK', d: 'Bürosanierung — korrosionsfreier Ersatz für Bestandsleitungen.' },
];

function GlobeRefView({ go }) {
  const L = usePageL('refs');
  const canvasRef = useRef5(null);
  const [active, setActive] = useS5(K_PROJECTS[0]);
  const [spun, setSpun] = useS5(false);

  useE5(() => {
    if (!canvasRef.current || !window.KAquaLoader) return;
    const globe = KAquaLoader.createGlobe(canvasRef.current, {
      size: 460, interactive: true, whirl: false, speed: 0.006,
      markers: K_PROJECTS.map((p) => ({ ...p })),
      onMarker: (mk) => setActive(K_PROJECTS.find((p) => p.title === mk.title) || K_PROJECTS[0]),
      onDrag: () => setSpun(true),
    });
    return () => globe.stop();
  }, []);

  return (
    <main className="k-page" style={{ paddingTop: 72 }}>
      <PageHero eyebrow={L.eyebrow} title={<span>{L.title1} <span className="k-grad-text">{L.titleGrad}</span></span>}
        lead={L.lead} />

      <PipeFX variant="isonet" size={320} />

      <section className="k-section" style={{ paddingTop: 0 }}>
        <div className="k-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)', gap: 'var(--sp-8)', alignItems: 'center' }}>
          <div style={{ display: 'grid', placeItems: 'center' }}>
            <canvas ref={canvasRef} aria-label={L.canvasAria}></canvas>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
            <BentoCard tint>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
                <div className="k-icon-chip" style={{ width: 40, height: 40, borderRadius: 12 }}><Icons.MapPin size={20} /></div>
                <h3 className="k-h3">{active.title}</h3>
              </div>
              <p className="k-body">{active.d}</p>
            </BentoCard>
            <div className="k-chips">
              {K_PROJECTS.map((p) => (
                <button key={p.title} type="button" className={`k-filter-chip ${active.title === p.title ? 'is-on' : ''}`}
                  onClick={() => setActive(p)}>{p.title.split(',')[0]}</button>
              ))}
            </div>
            <p className="k-body" style={{ fontSize: 13.5 }}>{L.note}</p>
          </div>
        </div>
      </section>

      <RefsDeep />
    </main>
  );
}

Object.assign(window, { CareerToolsView, GlobeRefView, K_PROJECTS, RecruitingForm });
