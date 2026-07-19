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
};

export const getAllNews = () => Object.values(newsRegistry);

export const getNewsBySlug = (slug: string) => newsRegistry[slug];
