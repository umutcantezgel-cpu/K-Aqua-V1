import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { Stagger } from "@/components/ui/Stagger";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { CTABand } from "@/components/ui/CTABand";
import { StatBand } from "@/components/ui/StatBand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Droplet, Thermometer, ShieldCheck, Repeat } from "@/components/ui/icon";

export const legionellenpraeventionZirkulation: NewsPost = {
  slug: "legionellenpraevention-warmwassernetze-zirkulationssysteme-ppr",
  title: {
    de: "Legionellenprävention mit PPR Rohren",
    en: "Legionella Prevention with PPR Pipes",
    ar: "الوقاية من الفيلقية باستخدام أنابيب PPR"
  },
  date: "2025-02-01",
  excerpt: {
    de: "Lauwarmes Stagnationswasser ist das größte Risiko in der Trinkwasserhygiene. Erfahren Sie, wie durchdachte Zirkulationssysteme und K Aqua PPR Rohrsysteme zuverlässig vor Legionellen schützen und die Trinkwasserverordnung erfüllen.",
    en: "Lukewarm stagnant water is the greatest risk in drinking water hygiene. Discover how well-designed circulation systems and K Aqua PPR pipe systems provide reliable protection against Legionella and ensure compliance with drinking water regulations.",
    ar: "المياه الراكدة الفاترة هي الخطر الأكبر في نظافة مياه الشرب. اكتشف كيف توفر أنظمة التدوير المصممة بعناية وأنظمة أنابيب K Aqua PPR حماية موثوقة ضد الفيلقية وتلبي لوائح مياه الشرب."
  },
  coverImage: "/images/news/legionella-prevention-circulation.jpg",
  category: "Trinkwasser & Hygiene",
  tags: ["Legionellen", "Trinkwasser", "Hygiene", "Zirkulation", "Thermische Desinfektion", "PPR", "Rohrsysteme"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Flow) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Trinkwasserhygiene & Legionellenprävention</span>
                </div>
              }
              title="Keine Chance für Biofilme in PPR Zirkulationssystemen"
              lead="Legionellen vermehren sich explosionsartig bei Temperaturen zwischen 25°C und 50°C, insbesondere wenn Wasser in den Leitungen stagniert. Für Planer und Betreiber von Großgebäuden (Hotels, Krankenhäuser, Wohnanlagen) bedeutet das: Das Warmwassernetz muss kontinuierlich zirkulieren und auf Temperatur gehalten werden. K Aqua PPR Rohrsysteme unterstützen dieses Ziel durch extrem glatte Innenoberflächen, welche die Biofilmbildung wirksam erschweren, sowie absolute Beständigkeit bei regelmäßigen thermischen Desinfektionen."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            <PipeFX variant="flow" size={380} />
          </div>
        </div>
      </Reveal>

      {/* Deep Technical Prose Area */}
      <Reveal>
        <div className="max-w-4xl mx-auto px-4 md:px-8 prose prose-lg dark:prose-invert">
          <h2>Legionellen im Visier: Wie moderne PP-R Zirkulationssysteme die Trinkwasserhygiene revolutionieren</h2>
          <p>
            Die Trinkwasserhygiene ist eines der kritischsten Themen in der modernen Gebäudetechnik. Spätestens seit den drastischen Verschärfungen der Trinkwasserverordnung (TrinkwV) und den strengen Richtlinien des DVGW (z.B. W 551) wissen Planer, Installateure und Betreiber von Großanlagen: Fehler in der Planung oder Materialwahl können fatale gesundheitliche und juristische Konsequenzen haben. Der gefährlichste Feind im System ist die Legionella pneumophila – ein Bakterium, das schwere bis tödliche Lungenentzündungen (Legionärskrankheit) auslösen kann, wenn es über fein zerstäubtes Wasser, etwa unter der Dusche, eingeatmet wird. K Aqua PP-R Rohrsysteme sind präzise auf die Prävention dieser Gefahren ausgerichtet.
          </p>
          
          <h3>Die Brutstätte: Stagnation und kritische Temperaturen</h3>
          <p>
            Legionellen sind in geringsten Konzentrationen natürlicher Bestandteil des Grundwassers. Gefährlich werden sie erst, wenn sie sich im Gebäude massenhaft vermehren. Dies geschieht vor allem dann, wenn zwei Faktoren zusammenkommen: <strong>Stagnation</strong> (stehendes Wasser) und <strong>lauwarme Temperaturen</strong> (zwischen 25 °C und 50 °C). 
          </p>
          <p>
            Das klassische Problem in Großgebäuden (Krankenhäuser, Hotels) sind die langen Wege vom zentralen Trinkwassererwärmer im Keller bis zur entferntesten Dusche im Dachgeschoss. Wenn in dieser langen Leitung das Wasser in der Nacht abkühlt und stagniert, entsteht eine ideale Brutstätte. Um dies zu verhindern, schreibt die Norm zwingend <strong>Zirkulationssysteme</strong> für Großanlagen vor.
          </p>

          <h3>Die Mechanik der Zirkulation</h3>
          <p>
            In einem Zirkulationsnetz wird eine zweite, parallele Rohrleitung (die Zirkulationsleitung) installiert. Eine Zirkulationspumpe sorgt dafür, dass das heiße Wasser (Trinkwasser warm - PWH) kontinuierlich vom Warmwasserspeicher bis kurz vor die letzte Entnahmestelle gepumpt und über die Zirkulationsleitung (PWH-C) wieder zurück in den Speicher geführt wird. Das Wasser befindet sich in ständiger Bewegung (keine Stagnation) und kühlt auf dem Weg durch das Gebäude nicht aus.
          </p>
          <p>
            Die DVGW-Richtlinie schreibt vor: Das Wasser muss den Speicher mit mindestens 60 °C verlassen, und es darf auf dem gesamten Zirkulationsweg um maximal 5 Kelvin (also auf 55 °C) abkühlen. K Aqua PP-R Rohre unterstützen diese Anforderung durch ihre hervorragenden wärmedämmenden Eigenschaften (geringe Wärmeleitfähigkeit von 0,24 W/mK). Während ungedämmte Kupferrohre die Hitze massiv an den Schacht abgeben würden, hält PP-R die Temperatur im System stabil, was die Zirkulationsverluste minimiert.
          </p>

          <h3>Der Kampf gegen den Biofilm</h3>
          <p>
            Bakterien schwimmen nicht gerne frei im Wasser. Sie heften sich an die Rohrinnenwände und bilden zusammen mit organischen Nährstoffen und Kalkablagerungen eine schleimige Schicht – den Biofilm. Dieser Biofilm schützt die Legionellen wie ein Bunker vor Chlor und teilweise sogar vor Hitze.
          </p>
          <p>
            Hier spielt PP-R seinen größten hygienischen Trumpf aus: Die Rohrinnenfläche von K Aqua Rohren ist spiegelglatt (Rauheit &lt; 0,007 mm) und chemisch absolut neutral. Im Gegensatz zu rauen Guss- oder verzinkten Stahlrohren, die durch Korrosion tiefe Krater bilden, entzieht PP-R dem Biofilm den mechanischen Haftgrund. Ohne Biofilm keine massenhafte Vermehrung von Legionellen.
          </p>

          <h3>Thermische Desinfektion: Der Stresstest für das Rohr</h3>
          <p>
            Trotz Zirkulation schreiben Hygienepläne (oder ein akuter Legionellenbefall) die regelmäßige thermische Desinfektion vor. Dabei wird das gesamte Rohrnetz inklusive aller Armaturen für mindestens 3 Minuten mit über 70 °C heißem Wasser durchspült. Diese "Hitzeschocks" töten die Legionellen im System zuverlässig ab.
          </p>
          <p>
            Viele Standardkunststoffe oder minderwertige Dichtungsringe altern unter diesen extremen Temperaturschwankungen rapide und werden spröde. K Aqua PP-R Systeme sind wärmestabilisiert und speziell für diese thermischen Härtetests konzipiert. Da die Verbindungstechnik auf Muffenschweißung (ohne O-Ringe) basiert, gibt es keine Elastomere, die durch das kochende Wasser zersetzt werden könnten. Das System bleibt für Jahrzehnte 100 % dicht und sicher.
          </p>

          <h3>Hydraulischer Abgleich: Tödliche Kurzschlüsse vermeiden</h3>
          <p>
            Eine Zirkulation funktioniert nur, wenn das Wasser auch in den entferntesten Steigstrang fließt. Da Wasser stets den Weg des geringsten Widerstands wählt, würde es ohne Regulierung nur durch die Rohre im Erdgeschoss zirkulieren, während das Wasser im 5. Stock stagniert. Deshalb ist ein präziser hydraulischer Abgleich durch Zirkulationsregulierventile in jedem Steigstrang zwingend notwendig. K Aqua bietet die passenden, fein abgestuften Rohrdimensionen (z. B. DN 15 bis DN 32), um das hydraulische Profil des Gebäudes perfekt abzubilden.
          </p>

          <h3>Häufig gestellte Fragen (FAQ) zur Legionellenprävention</h3>
          <h4>Dürfen Zirkulationspumpen nachts abgeschaltet werden?</h4>
          <p>
            Nein, aus hygienischen Gründen dürfen Zirkulationspumpen gemäß VDI 6023 maximal für 8 Stunden in 24 Stunden abgeschaltet werden – Experten raten jedoch dringend zu einem 24/7 Dauerbetrieb, um Stagnation und ein Absinken der Temperatur unter 55°C absolut auszuschließen.
          </p>
          <h4>Was ist eine Totleitung?</h4>
          <p>
            Eine Totleitung (oder Stagnationsstrecke) ist ein Rohrabschnitt, der nicht durchströmt wird (z. B. eine abgeschnittene Leitung nach dem Rückbau eines Waschbeckens). Diese Leitungen müssen unmittelbar am abzweigenden T-Stück der Hauptleitung (ohne Restvolumen) getrennt werden, da das stehende Wasser die Hauptleitung rückwirkend verkeimen würde.
          </p>
          <h4>Warum ist die Reihen- oder Ringinstallation besser als die T-Stück-Installation?</h4>
          <p>
            Bei der klassischen T-Stück-Installation endet jede Leitung blind an einer Zapfstelle. Wird das Gäste-WC Wochen nicht genutzt, stagniert das Wasser dort. Bei der Ring- oder Reiheninstallation wird die Leitung "durchgeschleift". Wenn die letzte Zapfstelle (idealerweise die Toilette) gespült wird, wird das Wasser in allen Rohren davor ausgetauscht.
          </p>
        </div>
      </Reveal>

      {/* Stagger: 3 Säulen */}
      <Reveal>
        <SectionHead
          title="Die 3 Säulen der Hygiene"
          lead="Wie K Aqua bei der Einhaltung der Trinkwasserverordnung hilft."
          align="center"
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "1. Temperaturhaltung",
                description: "Warmwasser (PWH) muss das System mit 60°C verlassen und darf im Zirkulationsrücklauf (PWH C) nicht unter 55°C fallen. PPR Rohre bieten hierbei einen natürlichen Isolationsvorteil gegenüber Metallen."
              },
              {
                title: "2. Stagnationsvermeidung",
                description: "Das Wasser muss fließen. Zirkulationssysteme sorgen dafür, dass das heiße Wasser bis kurz vor die Zapfstellen gepumpt und wieder zurückgeführt wird. Totleitungen sind absolut verboten."
              },
              {
                title: "3. Biofilmmanagement",
                description: "Biofilme dienen Legionellen als Nahrung und Schutzschild. Die extrem geringe Oberflächenrauheit von K Aqua Rohren (0,007 mm) bietet Bakterien im Vergleich zu rauen Metallrohren kaum Ansiedlungsfläche."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* StatBand: Thermische Desinfektion */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "70", u: "°C", l: "Geforderte Mindesttemperatur für eine effektive thermische Desinfektion (für mind. 3 Minuten an jeder Zapfstelle)." },
              { n: "0,007", u: "mm", l: "Oberflächenrauheit des K Aqua Rohrs. Verhindert Inkrustationen und Biofilme effektiv." },
              { n: "55", u: "°C", l: "Mindesttemperatur im Rücklauf des Zirkulationssystems (gemäß DVGW W 551)." }
            ]}
          />
        </div>
      </Reveal>

      {/* BentoGrid: Installationskonzepte */}
      <Reveal>
        <SectionHead
          title="Leitungsführung im Vergleich"
          lead="Das Rohrnetzdesign bestimmt die Hygiene maßgeblich."
        />
        <BentoGrid
          items={[
            {
              title: "T Stück Installation",
              description: "Der Klassiker, aber hygienisch am anfälligsten. Abzweige zu selten genutzten Zapfstellen (Gäste-WC) werden zu Stagnationszonen, die das gesamte System verkeimen können.",
              icon: <Droplet className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Reiheninstallation",
              description: "Die Hauptleitung schleift durch alle Wandscheiben. Der am häufigsten genutzte Verbraucher (z.B. WC) muss am Ende sitzen, um die davor liegenden Strecken bei jeder Nutzung mitzuspülen.",
              icon: <Repeat className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Ringinstallation (K Aqua Favorit)",
              description: "Alle Zapfstellen sind ringförmig verbunden. Egal welche Armatur geöffnet wird, das Wasser fließt von zwei Seiten heran. Das gesamte Rohrvolumen der Etage wird umgewälzt. Perfekt für K Aqua Rohrsysteme durch einfache Schweißtechnik.",
              icon: <Thermometer className="w-6 h-6 text-primary" />,
              size: "large"
            }
          ]}
        />
      </Reveal>

      {/* DeepFAQ: Zirkulation Planer */}
      <Reveal>
        <SectionHead
          title="Planer-FAQ: Zirkulationsnetze"
          lead="Kritische Parameter bei der Auslegung."
        />
        <DeepFAQ
          items={[
            {
              q: "Wie dimensioniere ich die Zirkulationsleitung?",
              a: "So klein wie möglich, aber groß genug für den nötigen Volumenstrom. Zu groß dimensionierte Rohre verlängern die Fließzeit und erhöhen die Auskühlung. K Aqua bietet feine Abstufungen (z.B. DN 20, DN 25) für die exakte Anpassung."
            },
            {
              q: "Verkraftet PPR ständige thermische Desinfektionen?",
              a: "Ja. Das K Aqua System ist für einen Dauerbetrieb bei hohen Temperaturen ausgelegt. Thermische Desinfektionen (z.B. wöchentlich 70°C) haben bei korrekter Druckeinstellung keinen negativen Einfluss auf die Lebensdauer von 50 Jahren."
            },
            {
              q: "Was ist der hydraulische Abgleich im Zirkulationsnetz?",
              a: "Damit das heiße Wasser nicht nur den kürzesten Weg (durch den ersten Steigstrang) nimmt, müssen Zirkulationsregulierventile in jedem Strang installiert werden. Sie drosseln kurze Stränge und zwingen das Wasser auch in weit entfernte Gebäudeteile."
            }
          ]}
        />
      </Reveal>

      {/* CTABand: Hygieneberatung */}
      <Reveal>
        <CTABand
          title="Sicheres Trinkwasser planen"
          subtitle="Unsere Experten prüfen Ihr Rohrnetzdesign auf Totleitungen, Stagnationsrisiken und die korrekte Dimensionierung von Zirkulationskreisen."
          buttonText="Hygiene Review anfordern"
          buttonLink="/ressourcen/support"
          icon={<ShieldCheck className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
