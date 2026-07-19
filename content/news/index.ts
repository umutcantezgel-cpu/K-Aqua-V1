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
};

export const getAllNews = () => Object.values(newsRegistry);

export const getNewsBySlug = (slug: string) => newsRegistry[slug];
