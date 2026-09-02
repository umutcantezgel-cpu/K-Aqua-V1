import { isoZertifizierung } from './iso-zertifizierung';
import { rueckverfolgbarkeit } from './rueckverfolgbarkeit';
import { warumPpr } from './warum-pp-r';
import { messingPolypropylen } from './messing-polypropylen';
import { trinkwasserhygieneLegionellen } from './trinkwasserhygiene-legionellen';
import { nachhaltigkeitOekobilanz } from './nachhaltigkeit-oekobilanz';
import { chemischeBestaendigkeitIndustrie } from './chemische-bestaendigkeit-industrie';
import { druckverlustStroemungsdynamik } from './druckverlust-stroemungsdynamik';
import { schweisstechnikSicherheit } from './schweisstechnik-sicherheit';
import { gewichtsreduktionLogistik } from './gewichtsreduktion';
import { schallschutzAkustik } from './schallschutz-akustik';
import { flexibilitaetErdbebenresistenz } from './flexibilitaet-erdbebenresistenz';
import { lebenszykluskostenTco } from './lebenszykluskosten-tco';
import { brandschutzFeuerwiderstandsklasse } from './brandschutz-feuerwiderstandsklasse';
import { trinkwasserverordnungNormenZertifikate } from './trinkwasserverordnung-normen-zertifikate';
import { greenBuildingZertifizierung } from './green-building-zertifizierung-leed-breeam-ppr';
import { bimBuildingInformationModeling } from './bim-building-information-modeling-rohrleitungsplanung-ppr';
import { fernwaermeNahwaerme } from './fernwaerme-nahwaerme-ppr-rohrsysteme-isoliert';
import { klimaanlagenKuehldecken } from './klimaanlagen-kuehldecken-kaltwasser-pprct';
import { druckluftanlagenSicherheit } from './druckluftanlagen-rohrsysteme-sicherheit-ppr';
import { schiffbauOffshore } from './schiffbau-offshore-rohrleitungen-salzwasser-ppr';
import { geothermieErdwaerme } from './geothermie-erdwaerme-waermepumpen-rohre-ppr';
import { recyclingPpr } from './recycling-ppr-kunststoff-nachhaltigkeit-kreislaufwirtschaft';
import { wasserstoffH2Ready } from './wasserstoff-h2-ready-kunststoffrohre-ppr';
import { kuehltuermeAusseneinsatz } from './kuehltuerme-verdunstungskuehler-pprct-ausseneinsatz';
import { sportstaettenSchwimmbaeder } from './sportstaetten-schwimmbaeder-chlorwasser-heizung-ppr';
import { heizungsverteilungHochhaus } from './heizungsverteilung-hochhaus-steigleitungen-pprct';
import { trinkwasserhygieneKrankenhaus } from './trinkwasserhygiene-krankenhaus-legionellen-schutz-ppr';
import { rechenzentrumKuehlung } from './rechenzentrum-kuehlung-datacenter-ausfallsicherheit-pprct';
import { lebensmittelindustrieHygiene } from './lebensmittelindustrie-rohrleitungen-hygiene-ktw-fda-ppr';
import { altbausanierungFlexibilitaet } from './altbausanierung-rohrleitungen-flexibilitaet-ppr-schnelle-verlegung';
import { leckageErkennungSicherheit } from './leckage-erkennung-sicherheit-rohrnetze-ppr-ueberwachung';
import { vorfertigungPrefabrication } from './vorfertigung-prefabrication-rohrverteiler-ppr-bauzeit';
import { wartungsfreiheitLebenszykluskosten } from './wartungsfreiheit-lebenszykluskosten-ppr-rohrsysteme-tco';
import { umweltfreundlicheKuehlwasserleitungen } from './umweltfreundliche-kuehlwasserleitungen-prozessindustrie-ppr-chemie';
import { brandschutzRohrschachtVerlegung } from './brandschutz-rohrschacht-verlegung-ppr-leitungen-abschottung';
import { klimadeckenFlaechenkuehlung } from './klimadecken-flaechenkuehlung-anbindung-ppr-netz-taupunkt';
import { bimRohrnetzPlanungPpr } from './bim-building-information-modeling-rohrnetz-planung-ppr';
import { schweissverfahrenVergleich } from './schweissverfahren-vergleich-heizelementmuffenschweissung-heizwendel-ppr';
import { isoliermaterialRohrdammungVergleich } from './isoliermaterial-rohrdammung-vergleich-pir-pur-eps-ppr';
import { waermeausdehnungKunststoffrohre } from './waermeausdehnung-kunststoffrohre-berechnen-kompensieren-ppr';
import { pprMehrschichtverbundrohrVergleich } from './ppr-rohrsysteme-vergleich-mehrschichtverbundrohr-pex-alu-pex';
import { chemischeReinigungDesinfektion } from './chemische-reinigung-rohrnetze-spuelen-desinfektion-ppr';
import { vibrationsentkopplungSchallschutz } from './vibrationsentkopplung-schallschutz-pumpen-rohrnetz-ppr';
import { uvBestaendigkeitFreiverlegung } from './ppr-rohrsysteme-uv-bestaendigkeit-freiverlegung-aussenbereich';
import { hochhausInstallationSteigleitungen } from './hochhaus-installation-steigleitungen-druckstufen-ppr-verteilung';
import { chemischeResistenzIndustrie } from './chemische-resistenz-ppr-industrieanwendungen-galvanik-saeuren';
import { legionellenpraeventionZirkulation } from './legionellenpraevention-warmwassernetze-zirkulationssysteme-ppr';
import { erdverlegungGrabenlos } from './erdverlegung-grabenloser-rohrleitungsbau-horizontalbohrverfahren-ppr';
import { lebensdauerBerechnungPpr } from './lebensdauer-berechnung-kunststoffrohre-arrhenius-gleichung-ppr';

export type LocalizedContent = { de: string; en: string; ar: string } | string;

export interface NewsPost {
  slug: string;
  date: string;
  tag?: string;
  category?: string;
  title: LocalizedContent;
  teaser?: LocalizedContent;
  excerpt?: LocalizedContent;
  content: React.ReactNode;
  coverImage?: string;
  tags?: string[];
}

/**
 * Löst einen mehrsprachigen News-Wert auf.
 *
 * RÜCKFALL: Zielsprache → Englisch → Deutsch.
 *
 * Bis hierher stand hier `[locale] || content.de` — ohne Englisch dazwischen.
 * `LocalizedContent` führt nur `de`, `en` und `ar`, also traf der Rückfall
 * jede der übrigen 62 Sprachen: Ein französischer Besucher las auf jeder
 * News-Seite deutschen Text.
 *
 * Das war die einzige Stelle im Projekt, die der Regel widersprach. Überall
 * sonst gilt sie längst — `lib/i18n/request.ts:90` merged
 * `de → en → Zielsprache`, und weil `en.json` eine vollständige Obermenge von
 * `de.json` ist, zeigt ein fehlender Schlüssel dort Englisch.
 *
 * Für `de`, `en` und `ar` ändert sich nichts.
 */
export function resolveLocalized(content: LocalizedContent | undefined, locale: string): string {
  if (!content) return '';
  if (typeof content === 'string') return content;
  const werte = content as Record<string, string>;
  return werte[locale] || content.en || content.de || '';
}

// Zentrale Registry fuer alle News (derzeit 4 von 50 geplanten)
export const newsRegistry: Record<string, NewsPost> = {
  [isoZertifizierung.slug]: isoZertifizierung,
  [rueckverfolgbarkeit.slug]: rueckverfolgbarkeit,
  [warumPpr.slug]: warumPpr,
  [messingPolypropylen.slug]: messingPolypropylen,
  [trinkwasserhygieneLegionellen.slug]: trinkwasserhygieneLegionellen,
  [nachhaltigkeitOekobilanz.slug]: nachhaltigkeitOekobilanz,
  [chemischeBestaendigkeitIndustrie.slug]: chemischeBestaendigkeitIndustrie,
  [druckverlustStroemungsdynamik.slug]: druckverlustStroemungsdynamik,
  [schweisstechnikSicherheit.slug]: schweisstechnikSicherheit,
  [gewichtsreduktionLogistik.slug]: gewichtsreduktionLogistik,
  [schallschutzAkustik.slug]: schallschutzAkustik,
  [flexibilitaetErdbebenresistenz.slug]: flexibilitaetErdbebenresistenz,
  [lebenszykluskostenTco.slug]: lebenszykluskostenTco,
  [brandschutzFeuerwiderstandsklasse.slug]: brandschutzFeuerwiderstandsklasse,
  [trinkwasserverordnungNormenZertifikate.slug]: trinkwasserverordnungNormenZertifikate,
  [greenBuildingZertifizierung.slug]: greenBuildingZertifizierung,
  [bimBuildingInformationModeling.slug]: bimBuildingInformationModeling,
  [fernwaermeNahwaerme.slug]: fernwaermeNahwaerme,
  [klimaanlagenKuehldecken.slug]: klimaanlagenKuehldecken,
  [druckluftanlagenSicherheit.slug]: druckluftanlagenSicherheit,
  [schiffbauOffshore.slug]: schiffbauOffshore,
  [geothermieErdwaerme.slug]: geothermieErdwaerme,
  [recyclingPpr.slug]: recyclingPpr,
  [wasserstoffH2Ready.slug]: wasserstoffH2Ready,
  [kuehltuermeAusseneinsatz.slug]: kuehltuermeAusseneinsatz,
  [sportstaettenSchwimmbaeder.slug]: sportstaettenSchwimmbaeder,
  [heizungsverteilungHochhaus.slug]: heizungsverteilungHochhaus,
  [trinkwasserhygieneKrankenhaus.slug]: trinkwasserhygieneKrankenhaus,
  [rechenzentrumKuehlung.slug]: rechenzentrumKuehlung,
  [lebensmittelindustrieHygiene.slug]: lebensmittelindustrieHygiene,
  [altbausanierungFlexibilitaet.slug]: altbausanierungFlexibilitaet,
  [leckageErkennungSicherheit.slug]: leckageErkennungSicherheit,
  [vorfertigungPrefabrication.slug]: vorfertigungPrefabrication,
  [wartungsfreiheitLebenszykluskosten.slug]: wartungsfreiheitLebenszykluskosten,
  [umweltfreundlicheKuehlwasserleitungen.slug]: umweltfreundlicheKuehlwasserleitungen,
  [brandschutzRohrschachtVerlegung.slug]: brandschutzRohrschachtVerlegung,
  [klimadeckenFlaechenkuehlung.slug]: klimadeckenFlaechenkuehlung,
  [bimRohrnetzPlanungPpr.slug]: bimRohrnetzPlanungPpr,
  [schweissverfahrenVergleich.slug]: schweissverfahrenVergleich,
  [isoliermaterialRohrdammungVergleich.slug]: isoliermaterialRohrdammungVergleich,
  [waermeausdehnungKunststoffrohre.slug]: waermeausdehnungKunststoffrohre,
  [pprMehrschichtverbundrohrVergleich.slug]: pprMehrschichtverbundrohrVergleich,
  [chemischeReinigungDesinfektion.slug]: chemischeReinigungDesinfektion,
  [vibrationsentkopplungSchallschutz.slug]: vibrationsentkopplungSchallschutz,
  [uvBestaendigkeitFreiverlegung.slug]: uvBestaendigkeitFreiverlegung,
  [hochhausInstallationSteigleitungen.slug]: hochhausInstallationSteigleitungen,
  [chemischeResistenzIndustrie.slug]: chemischeResistenzIndustrie,
  [legionellenpraeventionZirkulation.slug]: legionellenpraeventionZirkulation,
  [erdverlegungGrabenlos.slug]: erdverlegungGrabenlos,
  [lebensdauerBerechnungPpr.slug]: lebensdauerBerechnungPpr,
};

export const NEWS_SLUG_ALIASES: Record<string, string> = {
  'trinkwasserhygiene-legionellen': 'trinkwasserhygiene-legionellenpraevention-ppr',
  'brandschutz-feuerwiderstandsklasse': 'brandschutz-feuerwiderstandsklasse-b1-ppr-rohre',
  'schweisstechnik-sicherheit': 'schweisstechnik-sicherheit-homogene-materialverbindung-ppr',
  'lebenszykluskosten-tco': 'lebenszykluskosten-tco-investition-ppr-rohre',
  'messing-polypropylen': 'messing-trifft-polypropylen-uebergaenge-bestand',
  'druckverlust-stroemungsdynamik': 'druckverlust-stroemungsdynamik-effizienz-ppr',
  'schallschutz-akustik': 'schallschutz-akustik-ppr-rohre-hotel-krankenhaus',
  'iso-zertifizierung': 'iso-zertifizierung-qualitaet-umwelt-energie',
  'rueckverfolgbarkeit': 'fortlaufende-kennzeichnung-rueckverfolgbarkeit',
  'warum-pp-r': 'warum-eigentlich-ppr-materialkunde',
  'warum-ppr': 'warum-eigentlich-ppr-materialkunde',
  'nachhaltigkeit-oekobilanz': 'nachhaltigkeit-oekobilanz-gruener-fussabdruck-ppr',
  'chemische-bestaendigkeit-industrie': 'chemische-bestaendigkeit-ppr-im-industriellen-anlagenbau',
  'gewichtsreduktion': 'gewichtsreduktion-logistik-handling-ppr',
  'flexibilitaet-erdbebenresistenz': 'flexibilitaet-erdbebenresistenz-ppr-rohre',
};

export const getAllNews = () => Object.values(newsRegistry);

export const getNewsBySlug = (slug: string) => {
  if (newsRegistry[slug]) return newsRegistry[slug];
  const targetSlug = NEWS_SLUG_ALIASES[slug];
  if (targetSlug && newsRegistry[targetSlug]) return newsRegistry[targetSlug];
  return undefined;
};
