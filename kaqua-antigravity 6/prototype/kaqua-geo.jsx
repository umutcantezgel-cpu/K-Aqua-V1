// K-Aqua Redesign — Geo/Local-SEO layer: market database + 360° world + city landing pages
const { useState: useG, useEffect: useGE, useRef: useGR, useMemo: useGM } = React;

/* ---------- market database (the "Daten-Slice" source) ---------- */
const K_HOME_LATLON = { lat: 50.37, lon: 8.51 }; // Waldsolms

const K_REGIONS = [
  { id: 'dach', label: 'DACH' },
  { id: 'europa', label: 'Europa' },
  { id: 'nahost', label: 'Naher & Mittlerer Osten' },
  { id: 'global', label: 'Afrika & Asien-Pazifik' },
];

const K_GEO = [
  /* ---------- DACH ---------- */
  { slug: 'frankfurt', city: 'Frankfurt am Main', country: 'Deutschland', region: 'dach', lat: 50.11, lon: 8.68,
    regulator: 'DVGW / Trinkwasserverordnung (TrinkwV)',
    norms: ['DIN EN ISO 15874', 'DVGW W 544', 'KTW-BWGL Bewertungsgrundlage'],
    water: 'Hartes Wasser (14–20 °dH) — korrosionsfreies PP-R/PP-RCT verhindert Kalk-Inkrustation an rauen Metalloberflächen.',
    focus: ['Hochhaus-Steigleitungen (Bankenviertel)', 'Hotel- & Bürosanierung', 'Rechenzentrums-Kühlwasser'],
    note: 'Im Rhein-Main-Gebiet liefert K-Aqua ab Werk Waldsolms — oft am selben Tag.' },
  { slug: 'berlin', city: 'Berlin', country: 'Deutschland', region: 'dach', lat: 52.52, lon: 13.41,
    regulator: 'DVGW / TrinkwV, Berliner Wasserbetriebe',
    norms: ['DIN EN ISO 15874', 'DVGW W 544', 'DIN 1988 (TRWI)'],
    water: 'Mittelhartes Wasser aus Uferfiltrat — hygienische Neutralität des PP verhindert Biofilmbildung in weitläufigen Netzen.',
    focus: ['Wohnquartier-Neubau', 'Schul- & Verwaltungsbau', 'Bestandssanierung Altbau'],
    note: 'Großprojekte in der Hauptstadtregion werden über Speditionspartner in 24 h beliefert.' },
  { slug: 'muenchen', city: 'München', country: 'Deutschland', region: 'dach', lat: 48.14, lon: 11.58,
    regulator: 'DVGW / TrinkwV, SWM',
    norms: ['DIN EN ISO 15874', 'DVGW W 544', 'DIN 1988 (TRWI)'],
    water: 'Weiches Alpenwasser mit niedrigem pH-Spielraum — PP ist beständig, wo Kupfer auf erhöhte Löslichkeit trifft.',
    focus: ['Premium-Wohnbau', 'Klinik- & Laborbau', 'Brauerei- & Prozesswasser'],
    note: 'Süddeutschland-Logistik über Nachtsprung; Schweißtechnik-Schulung vor Ort buchbar.' },
  { slug: 'hamburg', city: 'Hamburg', country: 'Deutschland', region: 'dach', lat: 53.55, lon: 9.99,
    regulator: 'DVGW / TrinkwV, Hamburg Wasser',
    norms: ['DIN EN ISO 15874', 'DVGW W 544', 'DIN 1988 (TRWI)'],
    water: 'Weiches bis mittelhartes Grundwasser — geschmacksneutrale PP-Systeme erhalten die hohe Rohwasserqualität.',
    focus: ['HafenCity-Neubau', 'Hotellerie', 'Maritime Versorgungstechnik'],
    note: 'Norddeutschland ab Lager; Großdimensionen d250+ projektbezogen direkt ab Extrusion.' },
  { slug: 'wien', city: 'Wien', country: 'Österreich', region: 'dach', lat: 48.21, lon: 16.37,
    regulator: 'ÖVGW / Trinkwasserverordnung (AT)',
    norms: ['ÖNORM EN ISO 15874', 'ÖVGW W 1.303', 'ÖNORM B 2531'],
    water: 'Hochquellwasser mit exzellenter Güte — Werterhalt durch absolut inerte Rohrwerkstoffe.',
    focus: ['Gemeindebau-Sanierung', 'Hotel- & Gewerbeprojekte', 'Fernwärme-Subverteilung'],
    note: 'EU-Binnenmarkt: keine Zollformalitäten, Lieferung 48 h.' },
  { slug: 'zuerich', city: 'Zürich', country: 'Schweiz', region: 'dach', lat: 47.38, lon: 8.54,
    regulator: 'SVGW / TBDV',
    norms: ['SN EN ISO 15874', 'SVGW W3', 'SIA 385'],
    water: 'See- und Quellwasser-Mix — Schweizer Hygieneanforderungen verlangen zertifizierte Materialneutralität.',
    focus: ['Hochpreis-Wohnbau', 'Banken- & Bürosanierung', 'Spitalbau'],
    note: 'Exportabwicklung inkl. Schweizer Konformitätsnachweisen aus einer Hand.' },

  /* ---------- Europa ---------- */
  { slug: 'london', city: 'London', country: 'Vereinigtes Königreich', region: 'europa', lat: 51.51, lon: -0.13,
    regulator: 'WRAS — Water Regulations Approval Scheme',
    norms: ['BS EN ISO 15874', 'BS 7291 Referenzrahmen', 'Water Fittings Regulations 1999'],
    water: 'Sehr hartes Wasser (Themse-Becken) — PP-RCT bleibt frei von Kesselstein-Anhaftung und Querschnittsverengung.',
    focus: ['High-Rise Residential', 'Heritage-Sanierung', 'Distriktweite Heißwassernetze'],
    note: 'WRAS-konforme Dokumentation und englischsprachige Datenblätter verfügbar.' },
  { slug: 'paris', city: 'Paris', country: 'Frankreich', region: 'europa', lat: 48.86, lon: 2.35,
    regulator: 'ACS — Attestation de Conformité Sanitaire',
    norms: ['NF EN ISO 15874', 'ACS-Zulassung', 'DTU 60.1'],
    water: 'Hartes Seine-Wasser mit Kalkfracht — glatte PP-Innenflächen halten Druckverluste über Jahrzehnte konstant.',
    focus: ['Grand-Paris-Wohnquartiere', 'Hotel- & Denkmalsanierung', 'Olympia-Nachnutzung'],
    note: 'ACS-Konformitätsnachweise und französische Verlegerichtlinien im Lieferumfang.' },
  { slug: 'mailand', city: 'Mailand', country: 'Italien', region: 'europa', lat: 45.46, lon: 9.19,
    regulator: 'DM 174/2004 (Trinkwasserkontakt, IT)',
    norms: ['UNI EN ISO 15874', 'DM 174/2004', 'UNI 9182'],
    water: 'Grundwasser aus der Po-Ebene mit hoher Härte — inkrustationsfreie Systeme senken Wartungskosten spürbar.',
    focus: ['Hochhaus-Cluster Porta Nuova', 'Mode- & Retail-Flagships', 'Industrie Norditalien'],
    note: 'Alpen-Transit-Logistik 48–72 h; italienische Unterlagen verfügbar.' },
  { slug: 'warschau', city: 'Warschau', country: 'Polen', region: 'europa', lat: 52.23, lon: 21.01,
    regulator: 'PZH-Hygienezertifikat (Państwowy Zakład Higieny)',
    norms: ['PN-EN ISO 15874', 'PZH-Atest', 'Warunki Techniczne'],
    water: 'Weichsel-Uferfiltrat — wachstumsstarker Wohnungsmarkt mit hohem Bedarf an schnell verlegbaren Systemen.',
    focus: ['Wohnquartier-Neubau', 'Logistik- & Industriehallen', 'Modernisierung Plattenbau'],
    note: 'EU-Logistik 24–48 h; polnischsprachige Verarbeitungsrichtlinien vorhanden.' },
  { slug: 'prag', city: 'Prag', country: 'Tschechien', region: 'europa', lat: 50.08, lon: 14.44,
    regulator: 'SZÚ-Hygienezulassung (CZ)',
    norms: ['ČSN EN ISO 15874', 'SZÚ-Attest', 'Vyhláška 409/2005'],
    water: 'Moldau-Talsperrenwasser — stabile Qualität, starker Sanierungsmarkt im Gründerzeitbestand.',
    focus: ['Altbau-Strangsanierung', 'Hotellerie', 'Automotive-Zulieferindustrie'],
    note: 'Nachbarmarkt ab Werk: Lieferung in 24 h, technische Hotline auf Deutsch und Englisch.' },

  /* ---------- Naher & Mittlerer Osten (Schwerpunkt) ---------- */
  { slug: 'dubai', city: 'Dubai', country: 'VAE', region: 'nahost', lat: 25.2, lon: 55.27,
    regulator: 'DEWA — Dubai Electricity & Water Authority',
    norms: ['ISO 15874', 'DEWA Water Code', 'Dubai Building Code'],
    water: 'Entsalztes Meerwasser mit hoher Chloridfracht und Dauertemperaturen >30 °C — das Kernszenario für PP-RCT-Temperaturreserven.',
    focus: ['Super-High-Rise-Türme', 'Hotel-Resorts', 'District Cooling Make-up'],
    note: 'Seefracht-FCL ab Hamburg; Stumpfschweiß-Supervision auf der Baustelle buchbar.' },
  { slug: 'abudhabi', city: 'Abu Dhabi', country: 'VAE', region: 'nahost', lat: 24.45, lon: 54.38,
    regulator: 'DoE Abu Dhabi / Estidama',
    norms: ['ISO 15874', 'Estidama Pearl Rating', 'ADQCC-Konformität'],
    water: 'Entsalzungswasser mit Nachhärtung — Estidama-Nachhaltigkeitspunkte honorieren recycelbare Rohrwerkstoffe.',
    focus: ['Regierungs- & Kulturbauten', 'Saadiyat-Resorts', 'Industriezonen KIZAD'],
    note: 'Pearl-Rating-Dokumentation (Materialtransparenz) liegt dem Angebot bei.' },
  { slug: 'doha', city: 'Doha', country: 'Katar', region: 'nahost', lat: 25.29, lon: 51.53,
    regulator: 'Kahramaa — Qatar General Electricity & Water Corp.',
    norms: ['ISO 15874', 'QCS 2024 (Qatar Construction Specifications)', 'Kahramaa-Zulassung'],
    water: 'Zu 99 % entsalztes Wasser, Netztemperaturen bis 40 °C im Sommer — Langzeit-Druckstandfestigkeit ist das zentrale Auswahlkriterium.',
    focus: ['Lusail-Stadtentwicklung', 'Stadien-Nachnutzung', 'Hospitality'],
    note: 'QCS-konforme Einreichunterlagen und Drittprüfberichte verfügbar.' },
  { slug: 'riad', city: 'Riad', country: 'Saudi-Arabien', region: 'nahost', lat: 24.71, lon: 46.68,
    regulator: 'SASO / Saudi Water Authority',
    norms: ['SASO ISO 15874', 'Saudi Building Code (SBC 701)', 'SASO Quality Mark'],
    water: 'Mix aus Entsalzung (SWCC-Pipelines) und fossilem Grundwasser — extreme Sommerhitze verlangt PP-RCT-Reserven.',
    focus: ['Vision-2030-Giga-Projekte', 'King Salman Park', 'Wohnstadt-Erweiterungen'],
    note: 'SASO-Zertifizierung und SABER-Registrierung werden projektbezogen bereitgestellt.' },
  { slug: 'dschidda', city: 'Dschidda', country: 'Saudi-Arabien', region: 'nahost', lat: 21.49, lon: 39.19,
    regulator: 'SASO / SWCC',
    norms: ['SASO ISO 15874', 'SBC 701', 'SWCC-Anschlussrichtlinien'],
    water: 'Rotmeer-Entsalzung mit hoher Salzfracht im Umfeld — absolute Korrosionsfreiheit ist hier ein KO-Kriterium gegen Metall.',
    focus: ['Jeddah Central Project', 'Hafen- & Logistikbauten', 'Pilger-Hospitality (Makkah-Korridor)'],
    note: 'Seefracht direkt nach Jeddah Islamic Port; arabischsprachige Datenblätter in Arbeit.' },
  { slug: 'neom', city: 'NEOM / The Line', country: 'Saudi-Arabien', region: 'nahost', lat: 27.96, lon: 35.27,
    regulator: 'NEOM Authority / SASO',
    norms: ['ISO 15874', 'NEOM Design Codes', 'LEED/Estidama-Äquivalente'],
    water: '100 % erneuerbar betriebene Entsalzung geplant — das Projekt fordert vollständig kreislauffähige Materialien: Recycling-Code 5 inklusive.',
    focus: ['Linearstadt-Infrastruktur', 'Oxagon-Industriehafen', 'Trojena-Bergresorts'],
    note: 'Frühe Planungsphase: K-Aqua unterstützt mit EPD-Daten und parametrischen Rohrnetz-Modellen.' },
  { slug: 'kuwait', city: 'Kuwait-Stadt', country: 'Kuwait', region: 'nahost', lat: 29.38, lon: 47.99,
    regulator: 'MEW — Ministry of Electricity & Water',
    norms: ['ISO 15874', 'MEW-Spezifikationen', 'Kuwait Building Code'],
    water: 'Entsalztes Golfwasser, gemischt mit Brackwasser — chloridresistente Kunststoffsysteme sind Standardempfehlung.',
    focus: ['Silk-City-Planung', 'Wohnstädte (PAHW)', 'Öl- & Gas-Begleitinfrastruktur'],
    note: 'MEW-Präqualifikation über lokale Partner; Lieferung via Shuwaikh Port.' },
  { slug: 'maskat', city: 'Maskat', country: 'Oman', region: 'nahost', lat: 23.59, lon: 58.41,
    regulator: 'Nama Water Services (vormals Diam)',
    norms: ['ISO 15874', 'Oman Plumbing Code', 'Nama-Materialzulassung'],
    water: 'Entsalzung plus Aflaj-Tradition — Oman honoriert langlebige, wartungsarme Systeme in öffentlichen Ausschreibungen.',
    focus: ['Hafenstadt Duqm', 'Hotel- & Tourismusprojekte', 'Moschee- & Kulturbauten'],
    note: 'GCC-Logistikkorridor via Jebel Ali; technische Abnahme nach Nama-Protokoll.' },
  { slug: 'manama', city: 'Manama', country: 'Bahrain', region: 'nahost', lat: 26.23, lon: 50.59,
    regulator: 'EWA — Electricity & Water Authority',
    norms: ['ISO 15874', 'EWA-Spezifikationen', 'Bahrain Building Code'],
    water: 'Vollständig entsalztes Netz mit hohen Sommertemperaturen — PP-RCT hält die Druckreserve, wo PVC altert.',
    focus: ['Bahrain Bay', 'Bankenviertel-Sanierung', 'Inselerschließungen'],
    note: 'Kompakter Markt mit kurzen Wegen — Komplettpakete inkl. Schweißtechnik-Verleih.' },
  { slug: 'amman', city: 'Amman', country: 'Jordanien', region: 'nahost', lat: 31.95, lon: 35.93,
    regulator: 'WAJ — Water Authority of Jordan / Miyahuna',
    norms: ['JS EN ISO 15874', 'WAJ-Standards', 'Jordanian Plumbing Code'],
    water: 'Eines der wasserärmsten Länder der Welt — leckagefreie Schweißverbindungen sind aktive Wassersparpolitik (Non-Revenue Water < 2 %).',
    focus: ['Disi-Pipeline-Subnetze', 'Krankenhaus- & Universitätsbau', 'Flüchtlingsstadt-Infrastruktur'],
    note: 'Entwicklungsbank-finanzierte Projekte: K-Aqua liefert Tender-konforme Dokumentation.' },
  { slug: 'kairo', city: 'Kairo', country: 'Ägypten', region: 'nahost', lat: 30.04, lon: 31.24,
    regulator: 'HCWW — Holding Company for Water & Wastewater',
    norms: ['ES ISO 15874 (EOS)', 'HCWW-Spezifikationen', 'Egyptian Code of Practice'],
    water: 'Nilwasser mit saisonaler Trübung — glatte PP-Oberflächen minimieren Ablagerung in der Hausinstallation.',
    focus: ['New Administrative Capital', 'Wohnstädte (NUCA)', 'Hotel-Korridor Rotes Meer'],
    note: 'EOS-Registrierung über lokale Partner; Mittelmeer-Seefracht ab Hamburg 10–14 Tage.' },
  { slug: 'istanbul', city: 'Istanbul', country: 'Türkei', region: 'nahost', lat: 41.01, lon: 28.98,
    regulator: 'İSKİ / TSE-Zertifizierung',
    norms: ['TS EN ISO 15874', 'TSE K 309', 'İSKİ-Anschlussrichtlinien'],
    water: 'Talsperrenwasser mit saisonalen Schwankungen — erdbebensicheres, duktiles Rohrverhalten ist Planungskriterium.',
    focus: ['Hotelkomplexe', 'Hochhaus-Wohnbau', 'Krankenhaus-Neubauten'],
    note: 'Flexible Lieferketten über Landweg (5–7 Tage) oder Seefracht.' },

  /* ---------- Afrika & Asien-Pazifik ---------- */
  { slug: 'singapur', city: 'Singapur', country: 'Singapur', region: 'global', lat: 1.35, lon: 103.82,
    regulator: 'PUB — Public Utilities Board',
    norms: ['SS 636', 'ISO 15874', 'PUB Stamp of Compliance'],
    water: 'NEWater & entsalztes Wasser, tropische Dauerwärme — höchste Anforderungen an Langzeit-Druckstandfestigkeit.',
    focus: ['Public Housing (HDB)', 'Marina-Hochhäuser', 'Halbleiter-Reinstwasser-Vorstufen'],
    note: 'Seefracht ab Hamburg; vollständige PUB-Einreichunterlagen verfügbar.' },
  { slug: 'kualalumpur', city: 'Kuala Lumpur', country: 'Malaysia', region: 'global', lat: 3.14, lon: 101.69,
    regulator: 'SPAN — National Water Services Commission',
    norms: ['MS ISO 15874', 'SPAN-Produktzulassung', 'UBBL Building By-Laws'],
    water: 'Tropisches Oberflächenwasser, hohe Umgebungsfeuchte — UV- und alterungsbeständige Systeme sind Standard.',
    focus: ['TRX-Finanzdistrikt', 'Mixed-Use-Türme', 'Industriekorridor Johor'],
    note: 'SPAN-Listung über Distributionspartner; ASEAN-Drehkreuz für die Region.' },
  { slug: 'mumbai', city: 'Mumbai', country: 'Indien', region: 'global', lat: 19.08, lon: 72.88,
    regulator: 'BIS — Bureau of Indian Standards',
    norms: ['IS 15801', 'ISO 15874', 'NBC India (Plumbing)'],
    water: 'Monsun-geprägte Talsperrenversorgung mit Intervallbetrieb — druckstoßfeste Schweißverbindungen zählen doppelt.',
    focus: ['High-Rise Redevelopment', 'Krankenhaus- & Pharmabau', 'Smart-Cities-Programm'],
    note: 'BIS-Konformität projektbezogen; technische Schulung remote + vor Ort.' },
  { slug: 'kapstadt', city: 'Kapstadt', country: 'Südafrika', region: 'global', lat: -33.92, lon: 18.42,
    regulator: 'SABS / SANS-Normenwerk',
    norms: ['SANS 15874', 'SABS-Zulassung', 'SANS 10252-1'],
    water: 'Wasserknappheit nach „Day Zero" — leckagefreie Schweißverbindungen sind hier Wassersparpolitik.',
    focus: ['Krankenhaus- & Hotelbau', 'Township-Infrastruktur', 'Weingut-Prozesswasser'],
    note: 'Projektgeschäft mit lokalem Partnernetz; Schulung der Schweißteams inklusive.' },
  { slug: 'nairobi', city: 'Nairobi', country: 'Kenia', region: 'global', lat: -1.29, lon: 36.82,
    regulator: 'KEBS — Kenya Bureau of Standards',
    norms: ['KS ISO 15874', 'KEBS Diamond Mark', 'NCA-Baurichtlinien'],
    water: 'Talsperren- und Grundwasser-Mix in schnell wachsender Metropole — robuste, einfach schulbare Verbindungstechnik gefragt.',
    focus: ['Affordable-Housing-Programm', 'Tatu City', 'Kranken- & Bildungsbauten'],
    note: 'Ostafrika-Hub: Lieferung via Mombasa; Schweißtraining als Capacity Building.' },
];

function geoDist(a, b) {
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad, dLon = (b.lon - a.lon) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
  return Math.round(6371 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)));
}
function geoRelated(slug) {
  const me = K_GEO.find((g) => g.slug === slug);
  return K_GEO.filter((g) => g.slug !== slug)
    .map((g) => ({ g, d: geoDist(me, g) }))
    .sort((a, b) => a.d - b.d).slice(0, 3).map((x) => x.g);
}

/* =====================  MARKETS INDEX — 360° interactive world  ===================== */
function MarketsView({ go }) {
  const { t, lang } = useT();
  const R = usePageL('regions');
  const canvasRef = useGR(null);
  const globeRef = useGR(null);
  const [hover, setHover] = useG(null);
  const [region, setRegion] = useG('all');
  const [spun, setSpun] = useG(false);

  useGE(() => {
    if (!canvasRef.current || !window.KAquaLoader) return;
    const globe = KAquaLoader.createGlobe(canvasRef.current, {
      size: 540, interactive: true, whirl: false, speed: 0,   // stilled, 360° draggable
      markers: K_GEO.map((g) => ({ lat: g.lat, lon: g.lon, title: g.slug, label: g.city })),
      onMarker: (mk) => go('geo/' + mk.title),
      onHover: (mk) => setHover(mk ? mk.title : null),
      onDrag: () => setSpun(true),
    });
    globe.flyTo(K_HOME_LATLON.lon, K_HOME_LATLON.lat);
    globeRef.current = globe;
    return () => globe.stop();
  }, []);

  const flyTo = (g) => {
    if (globeRef.current) { globeRef.current.flyTo(g.lon, g.lat); globeRef.current.setActive(g.slug); }
    setHover(g.slug);
  };
  const hovered = K_GEO.find((g) => g.slug === hover);
  const list = useGM(() => region === 'all' ? K_GEO : K_GEO.filter((g) => g.region === region), [region]);
  const countries = new Set(K_GEO.map((g) => g.country)).size;

  return (
    <main className="k-page" style={{ paddingTop: 72 }}>
      <PageHero eyebrow={t.geo.eyebrow} title={<span>{t.geo.title1} <span className="k-grad-text">{t.geo.title2}</span></span>}
        lead={kFmt(t.geo.lead, { n: K_GEO.length, c: countries })} />

      <section className="k-section" style={{ paddingTop: 0 }}>
        <div className="k-container">
          <div className="k-chips" style={{ marginBottom: 'var(--sp-8)' }}>
            <button type="button" className={`k-filter-chip ${region === 'all' ? 'is-on' : ''}`}
              aria-pressed={region === 'all'} onClick={() => setRegion('all')}>{t.geo.all} ({K_GEO.length})</button>
            {K_REGIONS.map((r) => (
              <button key={r.id} type="button" className={`k-filter-chip ${region === r.id ? 'is-on' : ''}`}
                aria-pressed={region === r.id} onClick={() => setRegion(r.id)}>
                {R[r.id] || r.label} ({K_GEO.filter((g) => g.region === r.id).length})
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)', gap: 'var(--sp-8)', alignItems: 'center' }}>
            <div style={{ position: 'relative', display: 'grid', placeItems: 'center' }}>
              <canvas ref={canvasRef} aria-label="Interaktive Weltkugel der K-Aqua-Märkte — frei drehbar in alle Richtungen, Marker anklicken"></canvas>
              {hovered ? (
                <div className="k-geo-tooltip" role="status">
                  <strong>{hovered.city}</strong>
                  <span>{hovered.country} · {geoDist(K_HOME_LATLON, hovered).toLocaleString(lang)} {t.geo.fromPlant}</span>
                </div>
              ) : null}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 580, overflowY: 'auto', paddingRight: 4 }}>
              {list.map((g) => (
                <button key={g.slug} type="button"
                  className={`k-geo-item ${hover === g.slug ? 'is-hot' : ''}`}
                  onMouseEnter={() => flyTo(g)}
                  onFocus={() => flyTo(g)}
                  onClick={() => go('geo/' + g.slug)}>
                  <span className="city">{g.city}</span>
                  <span className="meta">{g.country} · {g.regulator.split('—')[0].split('/')[0].trim()}</span>
                  <Icons.ArrowRight size={18} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =====================  GEO LANDING PAGE TEMPLATE  ===================== */
function GeoCityView({ go, slug }) {
  const { t, lang } = useT();
  const R = usePageL('regions');
  const g = K_GEO.find((x) => x.slug === slug) || K_GEO[0];
  const dist = geoDist(K_HOME_LATLON, g);
  const related = geoRelated(g.slug);
  const canvasRef = useGR(null);
  const regionLabel = R[g.region] || (K_REGIONS.find((r) => r.id === g.region) || {}).label;

  useGE(() => {
    if (!canvasRef.current || !window.KAquaLoader) return;
    const globe = KAquaLoader.createGlobe(canvasRef.current, {
      size: 280, whirl: false, speed: 0, interactive: true,
      markers: [{ lat: g.lat, lon: g.lon, title: g.city, label: g.city }],
    });
    globe.flyTo(g.lon, g.lat);
    globe.setActive(g.city);
    return () => globe.stop();
  }, [slug]);

  return (
    <main className="k-page" style={{ paddingTop: 72 }}>
      <section className="k-section" style={{ position: 'relative', overflow: 'hidden', paddingBottom: 'clamp(40px, 5vw, 64px)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'var(--hero-wash)', pointerEvents: 'none' }}></div>
        <div className="k-container" style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: 'var(--sp-8)', alignItems: 'center' }}>
          <div>
            <Reveal>
              <button type="button" className="k-link" onClick={() => go('markets')} style={{ marginBottom: 'var(--sp-4)' }}>
                <Icons.Globe size={16} /> {t.geo.allMarkets}
              </button>
            </Reveal>
            <Reveal delay={50}><Eyebrow>{g.country} · {regionLabel}</Eyebrow></Reveal>
            <Reveal delay={100}>
              <h1 className="k-h1" style={{ fontSize: 'clamp(34px, 4.2vw, 56px)' }}>
                {kCityTitle(t.geo.cityTitle, g.city)}
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="k-lead">{t.geo.cityLead} {g.regulator}.</p>
            </Reveal>
            <Reveal delay={250}>
              <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap', marginTop: 'var(--sp-6)' }}>
                <KButton onClick={() => go('contact')} icon={<Icons.ArrowRight size={18} />}>{t.geo.request}</KButton>
                <KButton variant="ghost" onClick={() => go('finder')}>{t.geo.finder}</KButton>
              </div>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <div style={{ display: 'grid', placeItems: 'center' }}>
              <canvas ref={canvasRef} aria-label={`Globus zentriert auf ${g.city} — frei drehbar`}></canvas>
              <span className="k-chip" style={{ marginTop: 'var(--sp-2)' }}>
                <Icons.MapPin size={14} /><span><strong>{dist.toLocaleString(lang)}</strong> {t.geo.fromPlant}</span>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="k-section" style={{ paddingTop: 0 }}>
        <div className="k-container">
          <div className="k-bento">
            <Reveal style={{ gridColumn: 'span 3' }}>
              <BentoCard tint style={{ height: '100%' }}>
                <div className="k-icon-chip"><Icons.Shield size={24} /></div>
                <h2 className="k-h3">{t.geo.regFrame}</h2>
                <p className="k-body" style={{ fontWeight: 600, color: 'var(--foreground)' }}>{g.regulator}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
                  {g.norms.map((n) => (
                    <li key={n} style={{ display: 'flex', gap: 'var(--sp-2)', alignItems: 'center', color: 'var(--muted-foreground)' }}>
                      <span style={{ color: 'var(--accent-strong)' }}><Icons.Check size={16} /></span>{n}
                    </li>
                  ))}
                </ul>
              </BentoCard>
            </Reveal>
            <Reveal delay={80} style={{ gridColumn: 'span 3' }}>
              <BentoCard style={{ height: '100%' }}>
                <div className="k-icon-chip"><Icons.Droplet size={24} /></div>
                <h2 className="k-h3">{t.geo.water}</h2>
                <p className="k-body">{g.water}</p>
              </BentoCard>
            </Reveal>
            <Reveal delay={120} style={{ gridColumn: 'span 4' }}>
              <BentoCard style={{ height: '100%' }}>
                <div className="k-icon-chip"><Icons.Factory size={24} /></div>
                <h2 className="k-h3">{kFmt(t.geo.typical, { city: g.city })}</h2>
                <div className="k-chips">
                  {g.focus.map((f) => <span key={f} className="k-chip" style={{ fontSize: 14 }}>{f}</span>)}
                </div>
                <p className="k-body">{g.note}</p>
              </BentoCard>
            </Reveal>
            <Reveal delay={180} style={{ gridColumn: 'span 2' }}>
              <BentoCard style={{ height: '100%', justifyContent: 'space-between' }}>
                <div className="k-icon-chip"><Icons.Wrench size={24} /></div>
                <h2 className="k-h3">{t.geo.onSite}</h2>
                <p className="k-body">{t.geo.onSiteText}</p>
                <button type="button" className="k-link" onClick={() => go('academy')}>{t.geo.toAcademy} <Icons.ArrowRight size={16} /></button>
              </BentoCard>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="k-section k-section--subtle">
        <div className="k-container">
          <SectionHead eyebrow={t.geo.nearbyEyebrow} title={t.geo.nearby} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--sp-4)' }}>
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 70}>
                <BentoCard style={{ height: '100%', cursor: 'pointer' }} className="k-card--link">
                  <button type="button" onClick={() => go('geo/' + r.slug)} style={{ all: 'unset', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
                    <span style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>{r.country} · {geoDist(g, r).toLocaleString(lang)} km</span>
                    <span className="k-h3" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>{r.city} <Icons.ArrowRight size={18} style={{ color: 'var(--primary)' }} /></span>
                    <span className="k-body" style={{ fontSize: 14 }}>{r.regulator.split('—')[0].trim()}</span>
                  </button>
                </BentoCard>
              </Reveal>
            ))}
          </div>
          <p className="k-body" style={{ fontSize: 13, marginTop: 'var(--sp-6)' }}>
            Hinweis Produktion: Diese Seiten entsprechen dem Programmatic-SEO-Template (Daten-Slice: Produkt × Regulatorik × Region). In Next.js werden sie per ISR aus dem Headless CMS generiert — inkl. hreflang, Product-/Offer-Schema und semantischer interner Verlinkung.
          </p>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { MarketsView, GeoCityView, K_GEO, K_REGIONS });
