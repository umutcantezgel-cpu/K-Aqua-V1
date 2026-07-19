import { isoZertifizierung } from './iso-zertifizierung';
import { rueckverfolgbarkeit } from './rueckverfolgbarkeit';
import { warumPpr } from './warum-pp-r';
import { messingPolypropylen } from './messing-polypropylen';

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
};

export const getAllNews = () => Object.values(newsRegistry);

export const getNewsBySlug = (slug: string) => newsRegistry[slug];
