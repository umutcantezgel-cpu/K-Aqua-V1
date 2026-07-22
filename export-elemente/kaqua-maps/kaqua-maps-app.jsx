/* K Aqua Maps Suite — App Schale mit Sprachumschalter (DE, EN, AR). */
function MapsSuiteApp() {
  const [locale, setLocale] = useState(() => {
    try { return localStorage.getItem('kmapsLocale') || 'de'; } catch (e) { return 'de'; }
  });
  const t = KMapsData.T[locale];
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = t.dir;
    try { localStorage.setItem('kmapsLocale', locale); } catch (e) {}
  }, [locale]);
  return (
    <div className="kms-app">
      <header className="kms-top">
        <div className="kms-top-brand">
          <span className="kms-logo">K</span>
          <span><b>{t.brand}</b><i>{t.brandSub}</i></span>
        </div>
        <nav className="kms-top-nav">
          <a href="#kmsHq">{t.navHq}</a>
          <a href="#kmsRefs">{t.navRefs}</a>
          <a href="#kmsSpec">{t.navSpec}</a>
        </nav>
        <div className="kms-langs" role="group" aria-label="Locale">
          {['de', 'en', 'ar'].map((l) => (
            <button type="button" key={l} className={locale === l ? 'on' : ''} onClick={() => setLocale(l)}>{l.toUpperCase()}</button>
          ))}
        </div>
      </header>
      <div className="kms-hero">
        <div className="kms-kicker">{t.suiteKicker}</div>
        <h1>{t.suiteTitle}</h1>
        <p>{t.suiteLede}</p>
        <a className="kms-planlink" href="K Aqua Google Maps Masterplan.html">{t.toPlan}</a>
        <div className="kms-stats">
          <div className="kms-stat"><b>27</b><span>{t.stats.markets}</span></div>
          <div className="kms-stat"><b>79</b><span>{t.stats.catalog}</span></div>
          <div className="kms-stat"><b>3</b><span>{t.stats.seals}</span></div>
          <div className="kms-stat"><b>{kFmt(KMapsData.REFERENCE_SITES.reduce((a, s) => a + (KMapsData.YEAR_NOW - s.year), 0), locale)}</b><span>{t.stats.years}</span></div>
        </div>
      </div>
      <HqMapSection t={t} locale={locale} />
      <RefsMapSection t={t} locale={locale} />
      <SpecMapSection t={t} locale={locale} />
      <footer className="kms-footer">
        <p>{t.footer}</p>
        <p className="dim">{t.modelNote}</p>
      </footer>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<MapsSuiteApp />);
