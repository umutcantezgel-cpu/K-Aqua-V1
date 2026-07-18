export const CO2_DIAMETERS = [20, 25, 32, 40, 50, 63, 75, 90, 110, 125, 140, 160, 200, 250, 315, 400, 500, 630];
export const CO2_SDR_CLASSES = [6, 7.4, 9, 11, 17];

export const CO2_REGIONS = [
  { id: 'de', label: 'Deutschland', gridIntensity: 344 },
  { id: 'eu', label: 'EU-Durchschnitt', gridIntensity: 210 },
  { id: 'fr', label: 'Frankreich', gridIntensity: 55 },
  { id: 'pl', label: 'Polen', gridIntensity: 620 },
];

export const CO2_OPERATING_MODES = [
  { id: 'cold', label: 'Trinkwasser (kalt)', hoursPerYear: 800 },
  { id: 'cooling', label: 'Klima & Kühlung', hoursPerYear: 6000 },
  { id: 'hot', label: 'Warmwasser/Heizung', hoursPerYear: 8760 },
];
export const CO2_PUMP_ETA = 0.55;
export const CO2_NU = 1.0e-6;

export const CO2_MATERIALS = [
  { id: 'kaqua', label: 'K-Aqua PP-RCT', density: 0.905, productionFactor: 1.7, installFactor: 0.06, roughnessMm: 0.007, roughnessGrowthMmPerYr: 0, maintenanceRate: 0.0015, lifespanYears: 50, recyclingRate: 0.85, recyclingCreditShare: 0.3, eolFactor: 0.1, wallMode: 'sdr', color: 'var(--accent-strong)' },
  { id: 'pvc', label: 'PVC-C', density: 1.55, productionFactor: 2.6, installFactor: 0.08, roughnessMm: 0.01, roughnessGrowthMmPerYr: 0, maintenanceRate: 0.002, lifespanYears: 50, recyclingRate: 0.45, recyclingCreditShare: 0.15, eolFactor: 0.12, wallMode: 'sdr', color: 'var(--co2-pvc)' },
  { id: 'copper', label: 'Kupfer', density: 8.94, productionFactor: 1.93, installFactor: 0.35, roughnessMm: 0.01, roughnessGrowthMmPerYr: 0.015, maintenanceRate: 0.003, lifespanYears: 50, recyclingRate: 0.9, recyclingCreditShare: 0.41, eolFactor: 0.07, wallMode: 'cu', color: 'var(--co2-copper)' },
  { id: 'steel', label: 'Edelstahl', density: 7.9, productionFactor: 7.62, installFactor: 0.45, roughnessMm: 0.045, roughnessGrowthMmPerYr: 0.005, maintenanceRate: 0.003, lifespanYears: 50, recyclingRate: 0.9, recyclingCreditShare: 0.06, eolFactor: 0.07, wallMode: 'st', color: 'var(--co2-steel)' },
];

export const CO2_PHASES = [
  { id: 'production', label: 'Herstellung (A1–A3)', color: 'oklch(0.6 0.13 300)' },
  { id: 'transport', label: 'Transport zur Baustelle', color: 'oklch(0.6 0.13 270)' },
  { id: 'installation', label: 'Installation', color: 'oklch(0.6 0.13 255)' },
  { id: 'replacement', label: 'Ersatzzyklen', color: 'oklch(0.6 0.13 240)' },
  { id: 'operation', label: 'Betrieb (Pumpenergie)', color: 'oklch(0.6 0.13 225)' },
  { id: 'maintenance', label: 'Wartung & Inspektion', color: 'oklch(0.6 0.13 210)' },
  { id: 'eol', label: 'Rückbau (netto)', color: 'oklch(0.6 0.13 195)' },
];

export function co2WallMm(material: any, d: number, sdr: number) {
  if (material.wallMode === 'cu') return d <= 22 ? 1.0 : d <= 54 ? 1.5 : d <= 89 ? 2.0 : d <= 108 ? 2.5 : d <= 159 ? 3.0 : Math.max(3, d * 0.022);
  if (material.wallMode === 'st') return d <= 18 ? 1.0 : d <= 28 ? 1.2 : d <= 54 ? 1.5 : d <= 108 ? 2.0 : d <= 168 ? 2.6 : Math.max(2.6, d * 0.02);
  return d / sdr;
}
export function pipeMassKg(material: any, d: number, sdr: number, lengthM: number) {
  const wall = co2WallMm(material, d, sdr);
  const areaMm2 = Math.PI * (d - wall) * wall;
  return areaMm2 * material.density / 1000 * lengthM;
}
export function installBreakdown(material: any, ctx: any) {
  const mass = pipeMassKg(material, ctx.d, ctx.sdr, ctx.lengthM) * (1 + (ctx.fittingsPct || 0) / 100);
  const production = mass * material.productionFactor;
  const transport = (mass / 1000) * ctx.transportKm * 0.09;
  const installation = ctx.lengthM * material.installFactor;
  return { mass, production, manufacturing: 0, transport, installation, total: production + transport + installation };
}
export function co2GridAt(ctx: any, calendarYear: number) {
  if (ctx.gridPath !== 'path') return ctx.region.gridIntensity;
  return Math.max(40, ctx.region.gridIntensity * Math.pow(0.975, calendarYear || 0));
}
export function co2PressureLossPaPerM(material: any, d: number, sdr: number, flowLps: number, ageYears: number) {
  const wall = co2WallMm(material, d, sdr);
  const di = Math.max(0.004, (d - 2 * wall) / 1000);
  const A = Math.PI * di * di / 4;
  const v = (flowLps / 1000) / A;
  const k = (material.roughnessMm + material.roughnessGrowthMmPerYr * ageYears) / 1000;
  const Re = Math.max(2300, v * di / CO2_NU);
  const f = Re < 4000 ? 64 / Re : 0.25 / Math.pow(Math.log10(k / (3.7 * di) + 5.74 / Math.pow(Re, 0.9)), 2);
  return { paPerM: f * (1 / di) * 500 * v * v, v };
}
export function operationYearKg(material: any, ctx: any, yearsSinceInstall: number, calendarYear: number) {
  const { paPerM } = co2PressureLossPaPerM(material, ctx.d, ctx.sdr, ctx.flowLps, yearsSinceInstall);
  const hydraulicW = (ctx.flowLps / 1000) * paPerM * ctx.lengthM;
  const kWh = (hydraulicW / CO2_PUMP_ETA) * (ctx.opMode.hoursPerYear || 0) / 1000;
  return kWh * co2GridAt(ctx, calendarYear == null ? yearsSinceInstall : calendarYear) / 1000;
}
export function eolBreakdown(material: any, mass: number) {
  const gross = mass * material.eolFactor;
  const credit = mass * material.recyclingRate * material.recyclingCreditShare * material.productionFactor;
  const creditEffective = Math.min(credit, gross);
  return { gross, credit, creditEffective, net: gross - creditEffective };
}
export function computeFullResult(material: any, ctx: any, horizonYears: number) {
  const lifespan = (ctx.lifespans && ctx.lifespans[material.id]) || material.lifespanYears;
  const install = installBreakdown(material, ctx);
  const eolOne = eolBreakdown(material, install.mass);
  const points = [{ year: 0, value: install.total }];
  const events = [{ year: 0, type: 'install', label: 'Installation & Herstellung', value: install.total, detail: null }];
  let cumulative = install.total, totalOperation = 0, totalMaintenance = 0, replacements = 0;
  for (let year = 1; year <= horizonYears; year++) {
    const yearsSinceInstall = lifespan ? year % lifespan : year;
    const opKg = operationYearKg(material, ctx, yearsSinceInstall, year);
    const maintKg = install.total * material.maintenanceRate;
    totalOperation += opKg; totalMaintenance += maintKg;
    cumulative += opKg + maintKg;
    if (lifespan && year % lifespan === 0 && year !== horizonYears) {
      replacements += 1;
      cumulative += eolOne.net + install.total;
      events.push({ year, type: 'replace', label: replacements + '. Ersatzzyklus', value: eolOne.net + install.total, detail: { rueckbau: eolOne.gross, gutschrift: eolOne.creditEffective, neubau: install.total } });
    }
    points.push({ year, value: cumulative });
  }
  const recyclingCreditTotal = replacements * eolOne.creditEffective;
  const grandTotal = points[horizonYears].value;
  return {
    material, points, install, totalOperation, totalMaintenance, replacements, recyclingCreditTotal, grandTotal, events,
    phaseValues: {
      production: install.production, manufacturing: 0, transport: install.transport,
      installation: install.installation, replacement: replacements * install.total, operation: totalOperation,
      maintenance: totalMaintenance, eol: replacements * eolOne.net,
    },
  };
}

export function co2Trees(kg: number) { return Math.max(0, Math.round(kg / 25)); }
export function co2CarKm(kg: number) { return Math.max(0, Math.round(kg / 0.15)); }
export function co2Fmt(kg: number) {
  const n = Math.max(0, kg);
  return n >= 1000
    ? (n / 1000).toLocaleString('de-DE', { maximumFractionDigits: 1 }) + ' Tonnen'
    : Math.round(n).toLocaleString('de-DE') + ' Kilogramm';
}

export function findBreakEven(kaPoints: any[], opPoints: any[]) {
  for (let i = 0; i < kaPoints.length; i++) {
    const d = (opPoints[i] ? opPoints[i].value : 0) - kaPoints[i].value;
    if (d > 0) return { year: kaPoints[i].year, lead: d };
  }
  return null;
}
export function computePortfolioResult(material: any, ctxList: any[], horizonYears: number) {
  const parts = ctxList.map((c) => computeFullResult(material, c, horizonYears));
  const points = parts[0].points.map((p: any, i: number) => ({ year: p.year, value: parts.reduce((a, r) => a + r.points[i].value, 0) }));
  const phaseValues: any = {};
  CO2_PHASES.forEach((ph) => { phaseValues[ph.id] = parts.reduce((a, r) => a + (r.phaseValues[ph.id] || 0), 0); });
  const evMap: any = {};
  parts.forEach((r) => r.events.forEach((e: any) => {
    const k = e.type + '-' + e.year;
    if (!evMap[k]) evMap[k] = Object.assign({}, e, { detail: null });
    else evMap[k].value += e.value;
  }));
  return {
    material, points, phaseValues,
    install: { total: parts.reduce((a, r) => a + r.install.total, 0), mass: parts.reduce((a, r) => a + r.install.mass, 0) },
    totalOperation: parts.reduce((a, r) => a + r.totalOperation, 0),
    totalMaintenance: parts.reduce((a, r) => a + r.totalMaintenance, 0),
    replacements: parts.reduce((a, r) => a + r.replacements, 0),
    recyclingCreditTotal: parts.reduce((a, r) => a + r.recyclingCreditTotal, 0),
    grandTotal: points[points.length - 1].value,
    events: Object.keys(evMap).map((k) => evMap[k]).sort((a: any, b: any) => a.year - b.year),
  };
}

export function co2LifespanGuide(materialId: string, opModeId: string, v: number) {
  if (materialId !== 'copper') return null;
  const limit = opModeId === 'hot' ? 1.5 : 2.4;
  if (v > limit) return { years: opModeId === 'hot' ? 30 : 40, limit, over: true, reason: `Fließgeschwindigkeit ≈ ${v.toLocaleString('de-DE', { maximumFractionDigits: 1 })} m/s überschreitet den Kupfer-Richtwert von ${limit.toLocaleString('de-DE')} m/s ${opModeId === 'hot' ? 'für Warmwasser/Zirkulation' : 'für Kaltwasser'} — erhöhtes Erosionskorrosionsrisiko an Bögen und Formteilen.` };
  return { years: 50, limit, over: false, reason: `Fließgeschwindigkeit ≈ ${v.toLocaleString('de-DE', { maximumFractionDigits: 1 })} m/s hält den Kupfer-Richtwert von ${limit.toLocaleString('de-DE')} m/s ein.` };
}

export const CO2_PRESETS = [
  { id: 'office', label: 'Bürogebäude', icon: 'Layers', params: { lengthKm: 2.5, diameter: 63, sdr: 11, opModeId: 'cold', flowLps: 2 } },
  { id: 'clinic', label: 'Klinik', icon: 'Shield', params: { lengthKm: 8, diameter: 110, sdr: 9, opModeId: 'hot', flowLps: 4 } },
  { id: 'industry', label: 'Industriehalle', icon: 'Factory', params: { lengthKm: 5, diameter: 160, sdr: 17, opModeId: 'cooling', flowLps: 6 } },
  { id: 'datacenter', label: 'Rechenzentrum', icon: 'Thermometer', params: { lengthKm: 12, diameter: 250, sdr: 17, opModeId: 'cooling', flowLps: 10 } },
  { id: 'quarter', label: 'Wohnquartier', icon: 'Users', params: { lengthKm: 15, diameter: 110, sdr: 11, opModeId: 'hot', flowLps: 5 } },
];
export const CO2_EQUIVALENTS = [
  { id: 'trees', label: 'Bäume-Äquivalent', unit: 'Bäume', per: 25, icon: 'Leaf', note: '≈ 25 kg CO₂-Jahresbindung je Baum (UBA-Näherung)' },
  { id: 'car', label: 'Pkw-Kilometer', unit: 'km', per: 0.15, icon: 'MapPin', note: '≈ 0,15 kg CO₂e je Pkw-Kilometer (UBA-Durchschnitt)' },
  { id: 'flight', label: 'Flüge Berlin–München', unit: 'Flüge', per: 150, icon: 'ArrowUpRight', note: '≈ 150 kg CO₂e je Kurzstreckenflug (Atmosfair-Größenordnung)' },
  { id: 'household', label: 'Haushalts-Jahresstrom', unit: 'Haushalte', per: 1030, icon: 'Flame', note: '≈ 3.000 kWh × 344 g/kWh je Haushalt und Jahr' },
];

export const CO2_SOURCES = [
  { t: 'Strommix Deutschland: 344 g CO₂/kWh (2025)', d: 'Umweltbundesamt, „Entwicklung der spezifischen Treibhausgas-Emissionen des deutschen Strommix", Stand März 2026. 2024: 353 g, 2023: 379 g — der Klimapfad-Schalter schreibt diesen Trend mit −2,5 %/Jahr fort (Untergrenze 40 g).' },
  { t: 'Strommix EU/FR/PL: 210 / 55 / 620 g CO₂/kWh', d: 'Ember Electricity Data 2024/25, gerundete Größenordnungen. Polen führt die EU-Liste an, Frankreich liegt durch Kernkraft weit darunter.' },
  { t: 'Edelstahl-Systemrohr: 7,62 kg CO₂e/kg (A1–A3)', d: 'EPD Geberit Mapress CrNiMo-Systemrohr nach EN 15804+A2 (ecoinvent 3.10, One Click LCA), GWP-fossil je kg inkl. Umformen/Schweißen. Wanddicken der Systemrohr-Reihe (z. B. d28×1,2 = 0,80 kg/m) sind im Massenmodell hinterlegt.' },
  { t: 'Kupferrohr: 1,93 kg CO₂e/kg (A1–A3) + 37 % Modul-D-Gutschrift', d: 'Durchschnitts-EPD Markenkupferrohre (KME/Gütegemeinschaft, Ökobaudat) nach EN 1057; Recycling-Gutschrift Modul D ≈ 0,733 kg CO₂e/kg ≈ 37–41 % der Produktionslast — als recyclingCreditShare übernommen.' },
  { t: 'PP-Rohr: 1,7 kg CO₂e/kg (A1–A3)', d: 'PP-Rohr-EPDs (One Click LCA/ecoinvent, z. B. 1,55–1,66 kg CO₂e/kg GWP je kg) zzgl. Sicherheitsaufschlag für druckfeste PP-RCT-Compounds. Produktspezifische K-Aqua-EPD ersetzt diesen Wert, sobald vorhanden.' },
  { t: 'PVC-C: 2,6 kg CO₂e/kg (Sekundärliteratur)', d: 'Abgeleitet aus PVC-Harz-Ökoprofilen (Plastics Europe) zzgl. Chlorierungsschritt; größte Einzelunsicherheit im Datensatz, ±30 % empfohlen.' },
  { t: 'CO₂-Preis: nEHS-Korridor 55–65 €/t (2026)', d: 'DEHSt/BEHG: Versteigerungsphase ab 2026 mit gesetzlichem Korridor 55–65 €/t (Default hier: 55 €, konservativ). ETS-2-Szenarien ab 2028 deutlich darüber — der Slider reicht deshalb bis 300 €.' },
  { t: 'Hydraulik: Darcy-Weisbach + Swamee-Jain', d: 'Druckverlust je Meter aus Innendurchmesser (reale Wanddicken), Durchfluss und alternder Rauheit k(t) = k₀ + Zuwachs×Jahre; Pumpenergie = Q·Δp/η bei η = 0,55. Rauheitszuwachs (Kupfer 0,015 mm/a, Edelstahl 0,005 mm/a durch Ablagerung/Kalk; Kunststoff 0) ist eine dokumentierte Annahme.' },
  { t: 'Transport: 0,09 kg CO₂e je t·km', d: 'Lkw-Fernverkehr, UBA/GLEC-Größenordnung; wirkt auf die Rohrmasse inkl. Formteil-Zuschlag.' },
  { t: 'Kupfer: Geschwindigkeits-Grenzwerte 2,4 / 1,5 / 0,9 m/s', d: 'Richtwerte gegen Erosionskorrosion (Kupferinstitut/SHK-Fachliteratur): Kaltwasser ≤2,4 m/s, bis 60 °C und Zirkulationsleitungen ≤1,5 m/s, dauerhaft über 60 °C ≤0,9 m/s. Der Rechner prüft die reale Geschwindigkeit aus Nennweite und Durchfluss und empfiehlt bei Überschreitung eine verkürzte Nutzungsdauer — der Ersatz-Sprung im Chart ist dann begründet, nicht behauptet.' },
  { t: 'Metall-Warmwasserleitungen: 15–30 Jahre bei ungünstigen Bedingungen', d: 'Nach VDI-2067-Lesart der Fachliteratur erreichen verzinkte Eisenwerkstoffe kalt bis 40 Jahre (bei kontinuierlicher Instandhaltung); bei Warmwasser oder ungünstigen Wasserverhältnissen 15–30 Jahre. Grundlage der 30/40-Jahre-Empfehlung bei Grenzwertüberschreitung.' },
  { t: 'Kunststoff-Rohre: 50 Jahre bei 70 °C normativ nachgewiesen', d: 'Klasse-II-Anforderung nach ISO 10508 (Ofenalterung ISO 2578) bzw. Referenzpunkt 70 °C/15 bar/49 Jahre nach DVGW W 542 / EN ISO 21003-2 — Basis der festen 50-Jahre-Ansetzung für PP-RCT.' },
  { t: 'Nutzungsdauer: 50 Jahre als Ausgangswert — je Werkstoff einstellbar', d: 'Planungshorizont nach VDI-2067-Praxis für fest verlegte Rohrleitungen als neutraler Default. Weil die reale Nutzungsdauer von Wasserqualität, Temperatur und Betriebsweise abhängt (z. B. Erosionskorrosion bei Kupfer-Zirkulation), ist sie für den Vergleichswerkstoff als Regler ausgeführt — die Annahme steht sichtbar im Bericht statt versteckt im Code.' },
];

export const CO2_DISCLAIMER = 'Berechnung auf Basis öffentlicher Quellen (EPDs nach EN 15804, UBA-Strommix 2025, Ember, DEHSt; Stand Juli 2026) und dokumentierter Annahmen — Quellen je Faktor im Methodik-Tab. Projektverbindlich sind produktspezifische Typ-III-EPDs.';

export const CO2_SEO_COPY = {
  h1: 'K-Aqua CO₂-Rechner: Nachhaltigkeit von PP-RCT gegenüber Metallrohrsystemen in der TGA',
  intro: 'Der K-Aqua CO₂-Rechner modelliert den Kohlenstoff-Fußabdruck von Trinkwasser- und Kühlleitungen über den gesamten Lebenszyklus — von der werkseitigen Vorfertigung in Waldsolms über Transport, Installation und Jahrzehnte im Betrieb bis zum Rückbau (Cradle-to-Grave). Er vergleicht das PP-RCT-Rohrsystem von K-Aqua nach Nennweite, Wandstärke (SDR-Klasse), Trassenlänge, Energiemix und Betriebsart direkt mit Kupfer, Edelstahl und PVC-C — auf Basis veröffentlichter EPDs und einer echten Druckverlustrechnung.',
  methEyebrow: 'Methodik',
  methTitle: 'So rechnet der Rechner.',
  methLead: 'Transparenz statt Blackbox — jeder Baustein mit Quelle im Abschnitt Datenquellen.',
  meth: [
    { t: 'Massenmodell aus realen Wanddicken', d: 'Kunststoffrohre folgen der SDR-Geometrie (Wand = da/SDR), Kupfer der EN-1057-Reihe, Edelstahl der Systemrohr-Reihe. Ringquerschnitt × Länge × Dichte ergibt die Masse — für Metalle also dünnwandig-realistisch, nicht SDR-fiktiv.' },
    { t: 'Herstellung als EPD-Wert (A1–A3)', d: 'Je Werkstoff ein GWP-Faktor aus veröffentlichten EPDs nach EN 15804 (inkl. Fertigungsenergie — daher keine Doppelzählung). Transport Werk→Baustelle mit 0,09 kg CO₂e/t·km zusätzlich.' },
    { t: 'Betrieb: echte Druckverlustrechnung', d: 'Darcy-Weisbach mit Swamee-Jain-Reibungsbeiwert aus Innendurchmesser, Durchfluss und Rauheit. Metallrohre starten dank dünner Wand hydraulisch günstig, altern aber durch Inkrustation; Kunststoff bleibt glatt. Pumpenergie × Strommix des Betriebsjahres ergibt die Betriebslast.' },
    { t: 'Lebenszyklus & Ersatzzyklen (Cradle-to-Grave)', d: 'Nutzungsdauer einheitlich 50 Jahre (VDI-2067-Praxis) — Ersatzzyklen entstehen erst jenseits davon und werden mit Rückbau, Gutschrift und Neubau verbucht. Der Vergleich wird bewusst nicht über strittige Lebensdauer-Annahmen entschieden.' },
    { t: 'Rückbau & Recycling-Gutschrift (Modul D)', d: 'Gutschrift = Masse × Recyclingquote × Modul-D-Anteil × Produktionsfaktor — bei Kupfer z. B. 37–41 % der Produktionslast gemäß Branchen-EPD. Konservativ: angerechnet wird höchstens der Rückbauaufwand, Ersatzzyklen werden nie durch Recycling „belohnt".' },
    { t: 'Anschauliche Äquivalente', d: 'Umrechnung mit ≈ 25 kg CO₂ Jahresbindung je Baum und ≈ 0,15 kg CO₂e je Pkw-Kilometer (UBA-Näherungen) — Größenordnungen fürs Projektmeeting.' },
  ],
  certEyebrow: 'Green Building',
  certTitle: 'Wo die Zahlen einzahlen.',
  certLead: 'CO₂-Nachweise sind kein Selbstzweck — sie zahlen direkt auf Gebäudezertifizierungen ein.',
  certs: [
    { t: 'LEED', d: 'EPDs nach EN 15804 zahlen auf die Material-Credits ein — der Rechner liefert das Vorab-Argument, die EPD den Nachweis.' },
    { t: 'BREEAM', d: 'Lebenszyklusdaten der Materialien fließen in die Bewertung — belastbar durch Typ-III-Deklarationen.' },
    { t: 'DGNB', d: 'Die Ökobilanz des Gebäudes entscheidet ganze Kriteriengruppen — Materialwahl mit niedrigem GWP wirkt direkt.' },
  ],
  scopeTitle: 'Scope 1, 2, 3 — kurz erklärt',
  scopeText: 'Scope 1 umfasst direkte Emissionen des Werks, Scope 2 den eingekauften Strom, Scope 3 die Lieferkette — also auch Ihre eingekauften Rohre. Deshalb stellt K-Aqua Scope-3-Daten und EPD-Rohdaten auf Anfrage bereit: proaktive Transparenz für Ihre eigene Klimabilanz.',
  closing: 'Für Planer und Fachingenieure aus Klima & Kühlung sowie Trinkwasser liefert der Rechner ein belastbares Vorab-Argument für die Ausschreibung — korrosionsfreies, recycelbares PP-RCT statt metallischer Leitungen, werkseitig vorgefertigt und auf Nachhaltigkeit über den gesamten Cradle-to-Grave-Zyklus ausgelegt.',
};
