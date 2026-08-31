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

export default function DevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
