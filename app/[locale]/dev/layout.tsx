import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { constructMetadata } from '@/lib/seo/metadata';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> | { locale: string } }): Promise<Metadata> {
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
  if (process.env.NODE_ENV === 'production') notFound();
  return <>{children}</>;
}
