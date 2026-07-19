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

export interface NewsPost {
  slug: string;
  date: string;
  tag: string;
  title: string;
  teaser: string;
  content: React.ReactNode;
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
};

export const getAllNews = () => Object.values(newsRegistry);

export const getNewsBySlug = (slug: string) => newsRegistry[slug];
