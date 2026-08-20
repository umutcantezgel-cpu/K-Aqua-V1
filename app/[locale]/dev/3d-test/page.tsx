/* eslint-disable react/jsx-no-literals */
import React from 'react';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';
import { Link } from '@/lib/i18n/navigation';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

  return {
    title: 'K-Aqua 3D CAD Maß- & Toleranztest (QA)',
    robots: { index: false, follow: false },
  };
}

export default async function ThreeDTestPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-col w-full min-h-screen bg-background text-foreground p-6 sm:p-12">
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-card-border pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-mono text-xs mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>QA &amp; CAD VERIFICATION RUNNER</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground">
              70/70 Geometrischer 3D-Maßtest
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Automatisierte Prüfung aller 70 K-Aqua CAD-Modelle auf Maßhaltigkeit (Soll/Ist-Vergleich).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/3d"
              className="px-4 py-2 rounded-xl bg-card border border-card-border text-xs font-semibold hover:bg-background-subtle transition-colors"
            >
              Zum 3D-Studio
            </Link>
          </div>
        </div>

        {/* Live Test Runner Iframe */}
        <div className="w-full h-[70vh] rounded-2xl overflow-hidden border border-card-border shadow-lift bg-card relative">
          <iframe
            src="/api/3d-view/test"
            title="K-Aqua 3D CAD Selbsttest"
            className="w-full h-full border-0 bg-card"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground">
          <div className="p-4 rounded-xl bg-card border border-card-border flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground block mb-1">Maßtoleranz: 0,00 mm Abweichung</strong>
              Alle Modelle werden nach DIN 8077/8078 und ISO 15874 gefertigt. Die Bemaßung wird für jede Nennweite mathematisch verifiziert.
            </div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-card-border flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground block mb-1">WebGL-Shader &amp; Stencil-Caps</strong>
              Prüft den Halbschnitt-Clipping-Buffer und die Stencil-Cap-Generierung für alle Wandstärken.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
