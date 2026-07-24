import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { constructMetadata } from '@/lib/seo/metadata';

export function generateMetadata({ params: { locale } }: { params: { locale: string } }): Metadata {
  return constructMetadata({
    title: 'Dev Tools',
    description: 'Development Tools',
    locale,
    noIndex: true,
  });
}

export default function DevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.NODE_ENV === 'production') notFound();
  return <>{children}</>;
}
