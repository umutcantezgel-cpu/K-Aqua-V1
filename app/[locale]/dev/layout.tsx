import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { constructMetadata } from '@/lib/seo/metadata';

export const dynamic = 'force-dynamic';

// `params` ist in Next 15 immer ein Promise. Die Union mit der blossen Form
// stammt aus der Zeit vor der Umstellung und erfuellt die von Next erzeugte
// `LayoutProps`-Bedingung nicht — der Typprueferlauf des Baus beanstandet sie,
// sobald er die erzeugten Routentypen zu sehen bekommt. `await` arbeitet in
// beiden Faellen gleich; am Verhalten aendert sich nichts.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: 'Dev Tools',
    description: 'Development Tools',
    path: '/dev',
    locale,
    noIndex: true,
  });
}

/**
 * Entwicklerseiten gibt es in Produktion nicht.
 *
 * `notFound` wurde in dieser Datei seit jeher IMPORTIERT und nie aufgerufen —
 * der Riegel war offensichtlich geplant und ist nie eingebaut worden. Damit
 * waren /dev/ui, /dev/tokens, /dev/globe und /dev/3d-test oeffentlich
 * erreichbar. `app/robots.ts` und `noIndex` halten nur Suchmaschinen ab, nicht
 * jemanden, der die Adresse kennt; /dev/ui zeigt den kompletten
 * Komponentenkatalog samt unfertiger Platzhalter.
 *
 * In der Entwicklung bleiben die Seiten selbstverstaendlich erreichbar — dafuer
 * sind sie da.
 */
export default function DevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NODE_ENV === 'production') notFound();
  return <>{children}</>;
}
