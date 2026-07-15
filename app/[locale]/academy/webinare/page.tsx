/* eslint-disable react/jsx-no-literals */
import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CTABand } from '@/components/ui/CTABand';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { Globe, Award, Shield, Layers, Factory, Wrench, ArrowRight } from '@/components/ui/icon';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return constructMetadata({
    title: "Webinare & Technical Training | K-Aqua",
    description: "K-Aqua Webinare – Kompromisslose Sicherheit durch German Engineering für globale Megaprojekte.",
    path: "/academy/webinare", locale,
  });
}

export default async function WebinarePage() {

  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground">

      {/* Deep Dive Text Section */}
      <section className="py-32 bg-background border-b border-card-border">
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight mb-8">
            Nicht einfach nur Rohre. <br/>
            <span className="text-primary">Lebensadern für Megastrukturen.</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-12">
            Ein Webinar bei K-Aqua ist keine Verkaufsveranstaltung. Es ist ein tiefer technischer Diskurs unter Ingenieuren. Wir sprechen über Zeta-Werte, Längenausdehnungskoeffizienten, Kristallinitätsgrade und Zeitstandinnendruckfestigkeit. Wer an unseren Sessions teilnimmt, verlässt sie mit anwendbarem, hochspezialisiertem Wissen, das Gebäude sicherer, effizienter und langlebiger macht.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-start">
            <Card className="p-8 border-primary/20 bg-primary/5">
              <div className="font-heading font-bold text-4xl text-primary mb-4">10k+</div>
              <div className="font-bold text-lg mb-2">Geschulte Ingenieure</div>
              <p className="text-muted-foreground text-sm">Weltweit haben Experten unser Zertifizierungsprogramm durchlaufen und wenden K-Aqua Standards an.</p>
            </Card>
            <Card className="p-8">
              <div className="font-heading font-bold text-4xl text-foreground mb-4">50+</div>
              <div className="font-bold text-lg mb-2">Länderspezifische Normen</div>
              <p className="text-muted-foreground text-sm">Unsere Webinare berücksichtigen lokale Bauvorschriften von den VAE bis nach Südostasien.</p>
            </Card>
            <Card className="p-8">
              <div className="font-heading font-bold text-4xl text-foreground mb-4">100%</div>
              <div className="font-bold text-lg mb-2">Praxisrelevanz</div>
              <p className="text-muted-foreground text-sm">Keine theoretischen Konstrukte. Reale Projekt-Case-Studies und bewährte Best-Practices aus dem Feld.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* 4) CTA Band */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-h2 font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              Sichern Sie Ihren Wettbewerbsvorteil.
            </h2>
            <p className="text-lead text-inverse-foreground/80 leading-relaxed max-w-[560px]">
              Melden Sie sich für das nächste Experten-Webinar an und erweitern Sie Ihre Planungskompetenz mit German Engineering.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Button variant="inverse" size="lg" href="/kontakt">
                Zum Webinarplan
              </Button>
              <Button variant="secondary" size="lg" className="bg-transparent text-inverse-foreground border-inverse-foreground/30 hover:bg-inverse-foreground/10" href="/kontakt">
                Individuelle Schulung anfragen
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
