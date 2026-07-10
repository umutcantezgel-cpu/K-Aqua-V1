const fs = require('fs');
const path = require('path');

const PAGES = [
  // Produkte
  { route: 'produkte/pipes', title: 'Rohre & Rohrsysteme', type: 'product' },
  { route: 'produkte/fittings', title: 'Formteile & Fittings', type: 'product' },
  { route: 'produkte/valves', title: 'Armaturen & Ventile', type: 'product' },
  { route: 'produkte/tools', title: 'Werkzeuge & Zubehör', type: 'product' },
  { route: 'produkte/transition-fittings', title: 'Übergänge', type: 'product' },

  // Märkte
  { route: 'maerkte/trinkwasser', title: 'Trinkwasser', type: 'market' },
  { route: 'maerkte/klimaanlagen', title: 'Klima & Kühlung', type: 'market' },
  { route: 'maerkte/industrie', title: 'Industrieanlagen', type: 'market' },
  { route: 'maerkte/schiffbau', title: 'Schiffbau', type: 'market' },
  { route: 'maerkte/landwirtschaft', title: 'Landwirtschaft', type: 'market' },

  // Lösungen
  { route: 'loesungen/hochhaus', title: 'Hochhausbau', type: 'solution' },
  { route: 'loesungen/krankenhaus', title: 'Krankenhäuser', type: 'solution' },
  { route: 'loesungen/hotels', title: 'Hotels & Resorts', type: 'solution' },
  { route: 'loesungen/rechenzentrum', title: 'Rechenzentren', type: 'solution' },
  { route: 'loesungen/vorfertigung', title: 'Vorfertigung', type: 'solution' },

  // Academy
  { route: 'wissen', title: 'Wissensdatenbank', type: 'academy' },
  { route: 'academy/schulungen', title: 'Schulungen', type: 'academy' },
  { route: 'academy/webinare', title: 'Webinare', type: 'academy' },
  { route: 'academy/zertifizierung', title: 'Zertifikate', type: 'academy' },
  { route: 'academy/faq', title: 'FAQ & Wissen', type: 'academy' },
  { route: 'academy/glossar', title: 'Glossar', type: 'academy' },

  // Ressourcen
  { route: 'ressourcen/downloads', title: 'Downloads', type: 'resource' },
  { route: 'ressourcen/bim-daten', title: 'BIM Daten', type: 'resource' },
  { route: 'ressourcen/co2-rechner', title: 'CO2-Rechner', type: 'resource' },
  { route: 'ressourcen/ausschreibungstexte', title: 'Ausschreibungstexte', type: 'resource' },
  { route: 'ressourcen/support', title: 'Technischer Support', type: 'resource' },

  // Unternehmen
  { route: 'unternehmen/karriere', title: 'Karriere', type: 'company' },
  { route: 'unternehmen/news', title: 'News & Presse', type: 'company' },
  { route: 'unternehmen/kontakt', title: 'Kontakt', type: 'company' },
  { route: 'unternehmen/partner', title: 'Partnernetzwerk', type: 'company' },
];

function generateTemplate(page) {
  return `import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from '@/components/ui/icon';
import { CTABand } from '@/components/ui/CTABand';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return constructMetadata({
    title: "${page.title} | K-Aqua",
    description: "K-Aqua ${page.title} – Kompromisslose Sicherheit durch German Engineering für globale Megaprojekte.",
    path: "/${page.route}",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      
      {/* 1) Hero Section */}
      <section className="relative overflow-hidden bg-background pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-card-border">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--primary-soft)_0%,transparent_100%)] opacity-30 pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6 relative z-10">
          <div className="max-w-3xl flex flex-col gap-6">
            <span className="font-heading font-bold text-sm tracking-wider uppercase text-primary">
              K-Aqua ${page.type.toUpperCase()}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-[1.08]">
              ${page.title}. <br/><span className="text-muted-foreground">Engineered in Germany.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
              Dieses Modul liefert kompromisslose Sicherheit für die anspruchsvollsten Projekte weltweit. Gefertigt nach den strengsten Industriestandards, um Generationen zu überdauern. Wo Materialversagen keine Option ist.
            </p>
            <div className="flex gap-4 mt-4">
              <Button variant="primary" size="lg" href="/projektanfrage">
                Projekt anfragen
              </Button>
              <Button variant="ghost" size="lg" href="/ressourcen/downloads">
                Technische Daten
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2) Value Proposition Grid */}
      <section className="py-24 bg-background kq-band kq-band--slant-b">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow="German Engineering"
            title="Sicherheit ohne Kompromisse."
            lead="Wenn internationale Generalunternehmer Milliarden-Projekte planen, vertrauen sie nicht auf Versprechungen, sondern auf harte Fakten."
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="flex flex-col gap-4">
                <h3 className="font-heading font-bold text-xl">Nutzenversprechen 0{item}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Jedes Element verlässt unser Werk mit einer absoluten Null-Fehler-Toleranz. Präzisionsgefertigt nach strengsten deutschen Maßstäben für 100 % Wartungsfreiheit.
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3) Deep Dive Content */}
      <section className="py-24 bg-card border-y border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold tracking-tight">
                Die industrielle Autorität für ${page.title}.
              </h2>
              <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
                <p>
                  Seit Jahrzehnten bündeln wir in unserem Stammwerk im Herzen Deutschlands handwerklichen Stolz mit modernster, hochautomatisierter Fertigungstechnologie.
                </p>
                <p>
                  Im Einsatz in den härtesten Wüsten und extremsten Klimazonen der Welt beweist sich unser Material jeden Tag aufs Neue. Wir setzen den Standard, dem der Rest der Welt folgt.
                </p>
              </div>
              <ul className="flex flex-col gap-3 mt-4">
                {['Zertifiziert nach DIN EN ISO 15874', 'Lebensdauer > 50 Jahre', 'Wartungsfrei & Korrosionsbeständig'].map((li, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium">
                    <span className="text-primary">+</span> {li}
                  </li>
                ))}
              </ul>
            </div>
            <div className="aspect-square bg-background border border-card-border rounded-xl shadow-diffuse relative overflow-hidden flex items-center justify-center">
               <span className="text-muted-foreground/50 font-heading tracking-widest uppercase">Visual Asset Placeholder</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4) CTA Band */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-h2 font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              Bereit für kompromisslose Qualität?
            </h2>
            <p className="text-lead text-inverse-foreground/80 leading-relaxed max-w-[560px]">
              Sprechen Sie mit unserem Engineering-Team über Ihr nächstes Megaprojekt.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Button variant="inverse" href="/projektanfrage">
                Technischen Support kontaktieren
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
`;
}

const baseDir = path.join(__dirname, '../app/[locale]');

for (const page of PAGES) {
  const fullPath = path.join(baseDir, page.route);
  
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }

  const filePath = path.join(fullPath, 'page.tsx');
  
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, generateTemplate(page));
    console.log('Created: ' + page.route);
  } else {
    console.log('Skipped (already exists): ' + page.route);
  }
}

console.log('All missing pages have been generated successfully!');
