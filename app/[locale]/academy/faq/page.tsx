/* eslint-disable react/jsx-no-literals */
import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { CTABand } from '@/components/ui/CTABand';

import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return constructMetadata({
    title: "Wissensdatenbank & Spezifikationen | K-Aqua",
    description: "Tiefgreifendes technisches Kompendium für Ingenieure und Planer. Thermodynamik, Materialwissenschaft und kompromisslose Fakten über K-Aqua PPR-Systeme.",
    path: "/academy/faq",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  await params;

  const stickyScrollData = [
    {
      title: "Thermodynamische Lastwechsel",
      description: (
        <div className="flex flex-col gap-6">
          <p>
            Wie verhält sich das K-Aqua PPR-System bei extremen thermischen Lastwechseln? Herkömmliche Rohrsysteme degenerieren unter ständigen Temperatur- und Druckschwankungen. Metall korrodiert, minderwertige Kunststoffe ermüden.
          </p>
          <p>
            K-Aqua nutzt eine hochvernetzte Polypropylen-Struktur (PPR), die kinetische Energie auf molekularer Ebene absorbiert und verteilt.
          </p>
          <ul className="flex flex-col gap-2 border-s-2 border-primary ps-4 py-2 mt-2">
            <li><strong className="text-foreground">Dauerbetriebstemperatur:</strong> bis 70°C</li>
            <li><strong className="text-foreground">Spitzentemperatur:</strong> 95°C für kurzzeitige Lasten</li>
            <li><strong className="text-foreground">Stagnationsdruck:</strong> Stabil bis 10 bar</li>
          </ul>
          <p>
            Resultat: Keine Materialermüdung, keine Mikrorisse. Dies ist keine Schätzung, sondern zertifizierte Thermodynamik, dokumentiert über zehntausende Teststunden.
          </p>
        </div>
      ),
      content: <PremiumAssetPlaceholder label="Thermische Lastwechsel-Simulation (FEM)" />
    },
    {
      title: "Extrapolierte Lebensdauer (ISO 9080)",
      description: (
        <div className="flex flex-col gap-6">
          <p>
            Warum ist die Lebensdauer auf 50+ Jahre kalkuliert? Ist das ein theoretischer Wert? Ingenieure arbeiten nicht mit Hoffnungen oder Marketingversprechen.
          </p>
          <p>
            Die 50-jährige Mindestlebensdauer basiert auf extrapolierten Zeitstand-Innendruckversuchen nach den strengen Vorgaben der ISO 9080. Durch den Einsatz von reinen, hochstabilisierten Polymeren eliminiert K-Aqua umweltbedingte Spannungsrisskorrosion (ESC) vollständig.
          </p>
          <p>
            Das bedeutet faktisch: Wenn das System nach K-Aqua-Standards verschweißt ist, wird es zu einer homogenen, monolithischen Einheit. Ein Halbjahrhundert im Dauereinsatz ist kein Best-Case-Szenario, sondern die kalkulierte Basislinie für unsere Garantievergabe.
          </p>
        </div>
      ),
      content: <PremiumAssetPlaceholder label="Zeitstand-Innendruck-Graphen & Regressionskurven" />
    },
    {
      title: "Inerte Chemische Resistenz",
      description: (
        <div className="flex flex-col gap-6">
          <p>
            Welche chemischen Resistenzen bietet K-Aqua bei aggressiven industriellen Fluiden? In der Industrie entscheidet der pH-Wert über den Lebenszyklus der gesamten Anlage.
          </p>
          <p>
            K-Aqua PPR verhält sich extrem inert gegenüber einer massiven Bandbreite an Säuren, Laugen und aggressiven Lösungsmitteln bei Raumtemperatur. Rost, galvanische Korrosion und Lochfraß sind bei K-Aqua physikalisch unmöglich.
          </p>
          <p>
            Die absolute Glätte der Innenwände (Rauheitswert e = 0,007 mm) verhindert jegliche Kavitation. Kalkablagerungen finden keinen Halt, biologisches Fouling wird auf ein absolutes Minimum reduziert. Die Durchflussrate bleibt von Tag 1 bis Tag 18.250 absolut identisch.
          </p>
        </div>
      ),
      content: <PremiumAssetPlaceholder label="Dynamische Chemische Resistenzmatrix" />
    },
    {
      title: "Absolute Dichtigkeit durch Polyfusion",
      description: (
        <div className="flex flex-col gap-6">
          <p>
            Wie wird die absolute Dichtigkeit der Verbindungen bei extremem Betriebsdruck garantiert? Wir vertrauen nicht auf mechanische Fügetechniken.
          </p>
          <p>
            K-Aqua setzt kompromisslos auf Polyfusion. Beim Schweißvorgang verschmelzen Rohr und Fitting thermisch. Es gibt keine Dichtringe aus Elastomeren, die porös werden könnten. Es gibt keine Gewinde, die unter Druck nachgeben.
          </p>
          <p>
            Nach dem Auskühlen ist das System ein einziger, durchgehender Kunststoffstrang. Tatsächlich ist die Schweißnaht an den Verbindungsstellen dicker und druckresistenter als das Rohr selbst. Eine undichte K-Aqua-Schweißnaht existiert bei fachgerechter Ausführung nicht. Punkt.
          </p>
        </div>
      ),
      content: <PremiumAssetPlaceholder label="Polyfusion Molekular-Analyse" />
    },
    {
      title: "Akustische Isolierung & Druckschlag-Absorption",
      description: (
        <div className="flex flex-col gap-6">
          <p>
            In Großprojekten wie Hotels oder Krankenhäusern sind Fließgeräusche und Druckschläge (Wasserschlag) inakzeptabel.
          </p>
          <p>
            Im Gegensatz zu metallischen Rohren, die Schallwellen ungedämpft weiterleiten, besitzt das K-Aqua PPR-System eine hohe Eigendämpfung. Die molekulare Struktur des Kunststoffs absorbiert die kinetische Energie von Druckschlägen drastisch effizienter.
          </p>
          <p>
            Das Ergebnis ist ein flüsterleiser Betrieb bei hohen Strömungsgeschwindigkeiten und ein System, das sich selbst vor dynamischen Druckspitzen schützt, ohne dass komplexe mechanische Dämpfer installiert werden müssen.
          </p>
        </div>
      ),
      content: <PremiumAssetPlaceholder label="Akustik- und Vibrationsdämpfungs-Spektrum" />
    }
  ];
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">

      {/* 4) Timeline: Der K-Aqua Standard */}

      {/* 5) Intense Data / Specs Section */}
      <section className="py-32 bg-card relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(var(--primary),0.05)_0%,transparent_50%)] pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="flex flex-col gap-8">
              <h2 className="text-4xl lg:text-5xl font-heading font-bold tracking-tight">
                Die Anatomie der Überlegenheit.
              </h2>
              <div className="flex flex-col gap-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Wir bauen keine Rohre. Wir erschaffen die Arterien für die ambitioniertesten Bauwerke der Menschheit. Wenn ein 400-Meter-Wolkenkratzer in der Wüste errichtet wird, darf es tief in den Versorgungsschächten kein Materialversagen geben.
                </p>
                <p>
                  Deshalb liegt unser Fokus nicht auf &quot;ausreichend gut&quot;. Unser Fokus liegt auf massiver Überdimensionierung der Sicherheitsfaktoren. Wir haben den deutschen Maschinenbau auf die Kunststoffextrusion angewendet und einen Standard geschaffen, den die Konkurrenz nur versuchen kann zu kopieren.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mt-4">
                <div className="flex flex-col gap-2">
                  <span className="text-4xl font-heading font-black text-primary">50+</span>
                  <span className="text-sm font-bold tracking-wider uppercase text-muted-foreground">Jahre Zertifizierte Laufzeit</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-4xl font-heading font-black text-primary">0</span>
                  <span className="text-sm font-bold tracking-wider uppercase text-muted-foreground">Kompromisse bei der Sicherheit</span>
                </div>
              </div>
            </div>
            
            <div className="w-full bg-background rounded-3xl border border-card-border p-8 md:p-12 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700" />
              
              <h3 className="text-2xl font-heading font-bold mb-8 flex items-center gap-3">
                <div className="w-2 h-8 bg-primary rounded-full" />
                Spezifikations-Matrix
              </h3>
              
              <div className="flex flex-col gap-0 divide-y divide-card-border/50 font-mono text-sm">
                <div className="flex justify-between py-4">
                  <span className="text-muted-foreground">Dichte (23°C)</span>
                  <span className="font-bold text-foreground">0.90 g/cm³</span>
                </div>
                <div className="flex justify-between py-4">
                  <span className="text-muted-foreground">Schmelzindex (MFI)</span>
                  <span className="font-bold text-foreground">0.3 g/10 min</span>
                </div>
                <div className="flex justify-between py-4">
                  <span className="text-muted-foreground">Wärmeleitfähigkeit</span>
                  <span className="font-bold text-foreground">0.24 W/mK</span>
                </div>
                <div className="flex justify-between py-4">
                  <span className="text-muted-foreground">Linearer Ausdehnungskoeffizient</span>
                  <span className="font-bold text-foreground">0.15 mm/mK</span>
                </div>
                <div className="flex justify-between py-4">
                  <span className="text-muted-foreground">Zugfestigkeit (Streckgrenze)</span>
                  <span className="font-bold text-foreground">25 MPa</span>
                </div>
                <div className="flex justify-between py-4 border-b-transparent">
                  <span className="text-muted-foreground">E-Modul</span>
                  <span className="font-bold text-foreground">800 MPa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6) Ultimate CTA Band */}
      <section className="py-24 bg-background border-t border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-h2 font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              Schluss mit Spekulationen.<br/>Planen Sie mit Gewissheit.
            </h2>
            <p className="text-lead text-inverse-foreground/80 leading-relaxed max-w-[600px]">
              Sie kennen nun die physikalischen Fakten. Buchen Sie einen Beratungstermin mit unserem Engineering-Team und spezifizieren Sie K-Aqua für Ihr nächstes Megaprojekt.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Button variant="inverse" size="lg" href="/projektanfrage">
                Projekt evaluieren lassen
              </Button>
              <Button variant="secondary" className="text-inverse-foreground border-inverse-foreground/30 hover:bg-inverse-foreground/10" size="lg" href="/kontakt">
                Technischen Vertrieb kontaktieren
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
