/* eslint-disable react/jsx-no-literals */
import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { CTABand } from '@/components/ui/CTABand';

import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { HorizontalTimeline } from '@/components/ui/HorizontalTimeline';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
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

  const timelineItems = [
    { 
      year: "Protokoll 01", 
      title: "Molekulare Selektion", 
      text: "Strikte Auswahl der Basismaterialien. Nur hochmolekulares PPR-Granulat mit optimalem Schmelzindex und perfekter Viskosität passiert unsere analytische Eingangskontrolle." 
    },
    { 
      year: "Protokoll 02", 
      title: "Hyper-Präzisions-Extrusion", 
      text: "Computergesteuerte Extrusionslinien formen die Rohre mit Toleranzen im Mikrometerbereich. Jede mikroskopische Abweichung führt zur sofortigen automatischen Ausschleusung." 
    },
    { 
      year: "Protokoll 03", 
      title: "Thermische Konditionierung", 
      text: "Ein extrem kontrollierter Abkühlprozess in unseren Wasserbädern verhindert innere molekulare Spannungen und sichert die exakte Rundheit und homogene Wandstärken über die gesamte Rohrlänge." 
    },
    { 
      year: "Protokoll 04", 
      title: "100% Inline-Inspektion", 
      text: "Ultraschall-Wanddickenmessung und Laser-Durchmesserkontrolle in Echtzeit. Kein Millimeter K-Aqua Rohr verlässt die Fertigungslinie ungeprüft. Null-Fehler-Toleranz." 
    },
    { 
      year: "Protokoll 05", 
      title: "Destruktives Testing", 
      text: "Entnahme von Samples für den Zeitstandversuch im Berstdruck-Labor. Härtetest bei 110°C in speziellen Prüföfen. Wir testen bis zur Zerstörung, damit es im Feld niemals passiert." 
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      
      {/* 1) Massive Parallax Hero */}
      <ParallaxHero
        eyebrow="Wissensdatenbank & Spezifikationen"
        title={
          <>
            Wissen ist keine Meinung.<br />
            <span className="text-muted-foreground">Es ist messbar.</span>
          </>
        }
        description="Das ultimative Archiv für Ingenieure, Projektentwickler und Einkäufer. Tiefgreifende technische Fakten, thermodynamische Analysen und kompromisslose Spezifikationen für Rohrleitungssysteme auf dem Zenit der Materialwissenschaft."
      >
        <Button variant="primary" size="lg" href="#deep-dive">
          Technische FAQ lesen
        </Button>
        <Button variant="ghost" size="lg" href="/ressourcen/downloads">
          Prüfberichte herunterladen
        </Button>
      </ParallaxHero>

      {/* 2) Engineering Data Bento Grid */}
      <section className="py-32 bg-background relative z-10 border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6 mb-16">
          <SectionHead
            eyebrow="Harte Fakten"
            title="Die Architektur der Unzerstörbarkeit."
            lead="Wenn Sie Milliarden-Projekte planen, reicht 'gute Qualität' nicht aus. Sie benötigen nachweisbare, messbare, zertifizierte physikalische Überlegenheit."
            align="left"
          />
        </div>
        <BentoGrid>
          <BentoGridItem
            title="ISO 15874 zertifiziert"
            description="K-Aqua Systeme übertreffen die globalen Anforderungen an Kunststoff-Rohrleitungssysteme für die Warm- und Kaltwasserinstallation massiv. Jede Charge ist dokumentiert und rückverfolgbar."
            colSpan={2}
            className="bg-card/50"
            icon={
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            }
          />
          <BentoGridItem
            title="0,007 mm Rauheit"
            description="Absolute Glätte der Innenwände. Kein Druckverlust, keine Inkrustation, keine Biofilmbildung."
            icon={
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            }
          />
          <BentoGridItem
            title="0% Korrosionsrisiko"
            description="Vollkommene Immunität gegen galvanische oder chemische Korrosion, selbst bei hochaggressiven Wässern."
            icon={
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
            }
          />
          <BentoGridItem
            title="10.000h Stresstests"
            description="Unsere Laborprotokolle zwingen das Material unter Druck und Hitze in die Knie. Was bei uns nicht reißt, hält auf der Baustelle für die Ewigkeit. Eine kompromisslose Auslese."
            colSpan={2}
            className="bg-card/50"
            icon={
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            }
          />
        </BentoGrid>
      </section>

      {/* 3) Deep Technical FAQ (Sticky Scroll Reveal) */}
      <section id="deep-dive" className="py-32 bg-background border-b border-card-border overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 mb-16">
          <SectionHead
            eyebrow="Die Ingenieurs-FAQ"
            title="Fragen der Industrie. Antworten der Physik."
            lead="Dies sind keine Konsumenten-Fragen. Dies sind die Antworten auf die härtesten Anforderungen von Planern, Ingenieuren und Generalunternehmern weltweit."
            align="left"
          />
        </div>
        <div className="mx-auto max-w-[1400px] px-0 md:px-6">
          <StickyScrollReveal content={stickyScrollData} />
        </div>
      </section>

      {/* 4) Timeline: Der K-Aqua Standard */}
      <HorizontalTimeline 
        items={timelineItems}
        title="Der K-Aqua Standard"
        description="Jedes Rohr durchläuft eine kompromisslose Kette an Qualitätskontrollen. Wir prüfen nicht nur das Endprodukt – wir überwachen jeden Parameter auf atomarer Ebene, bevor er zur Materie wird."
      />

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
