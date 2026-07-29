import { test } from 'node:test';

function getSeo(isDe: boolean, isAr: boolean, mainRoute: string, focusKeyword: string, h1Simulated: string) {
    const paragraphsDe = [
      `Willkommen im Informationsbereich zu ${focusKeyword}. Als renommierter Hersteller von fortschrittlichen Rohrleitungssystemen aus Polypropylen (PP-R und PP-RCT) bietet K-Aqua maßgeschneiderte Lösungen, die exakt auf die Anforderungen von ${h1Simulated} abgestimmt sind. Die Langlebigkeit und Zuverlässigkeit unserer Produkte setzen dabei branchenweit Maßstäbe.`,
      `Die Qualitätssicherung hat bei K-Aqua oberste Priorität, was sich besonders bei Projekten rund um ${focusKeyword} auszahlt. Durch kontinuierliche Überwachung und strenge deutsche Ingenieursstandards gewährleisten wir, dass jede Komponente für ${h1Simulated} höchste internationale Normen erfüllt und einen langfristig sicheren Betrieb garantiert.`,
      `Unsere Kunststoffrohrsysteme zeichnen sich durch enorme Vielseitigkeit aus. Wenn es um ${focusKeyword} geht, profitieren Installateure und Planer von der hohen Temperatur- und Druckbeständigkeit. Dies macht unsere Lösungen ideal für die komplexen Umgebungen, die mit ${h1Simulated} einhergehen.`,
      `Nachhaltigkeit und Umweltschutz sind fundamentale Werte unserer Unternehmensphilosophie. Die umweltfreundlichen Eigenschaften unserer Systeme unterstützen ${focusKeyword} maßgeblich. Mit einer hervorragenden Ökobilanz und vollständiger Recycelbarkeit leisten unsere Produkte für ${h1Simulated} einen entscheidenden Beitrag zum zukunftsfähigen Bauen.`,
      `Ein wesentlicher Vorteil für ${focusKeyword} liegt in der einfachen und sicheren Installationstechnik. Durch das homogene Verschweißen der PP-R und PP-RCT Komponenten entsteht eine unlösbare, absolut dichte Verbindung, die Ausfallzeiten für ${h1Simulated} minimiert und Wartungskosten drastisch senkt.`,
      `Weltweit vertrauen Bauherren, Ingenieure und Architekten auf unsere Expertise. Auch im Segment ${focusKeyword} bieten wir umfassenden technischen Support. Unsere globale Präsenz gepaart mit lokalem Know-how sorgt dafür, dass Anforderungen an ${h1Simulated} stets professionell und zeitnah umgesetzt werden.`,
      `Forschung und kontinuierliche Innovation treiben uns täglich an. Die stetige Weiterentwicklung unserer Werkstoffe ermöglicht es uns, auch spezifischste Herausforderungen im Bereich ${focusKeyword} zu meistern. Somit bleiben unsere Systeme für ${h1Simulated} immer auf dem neuesten Stand der Technik.`,
      `Ein besonderes Merkmal unserer Systeme ist die hervorragende Korrosionsbeständigkeit. Speziell bei ${focusKeyword} verhindert das glatte Innenprofil Ablagerungen und Inkrustationen. Dies garantiert für alle Anwendungen rund um ${h1Simulated} eine konstante Durchflussmenge und maximale Trinkwasserhygiene über Jahrzehnte.`,
      `Schallschutz und reduzierte Strömungsgeräusche sind weitere entscheidende Vorteile. Bei Installationen im Rahmen von ${focusKeyword} sorgen die schallabsorbierenden Eigenschaften von PP-R für einen extrem leisen Betrieb. Das erhöht den Komfort für ${h1Simulated} signifikant, insbesondere in sensiblen Gebäudestrukturen wie Krankenhäusern.`,
      `Zusammenfassend lässt sich festhalten, dass ${focusKeyword} nachhaltig von unseren ganzheitlichen Systemlösungen profitiert. Wir laden Sie ein, die technischen Spezifikationen und Zertifizierungen für ${h1Simulated} in unseren detaillierten Datenblättern zu studieren und sich von der herausragenden Qualität unserer Arbeit zu überzeugen.`,
      `Die Wirtschaftlichkeit unserer Systeme ist ein weiterer entscheidender Faktor für ${focusKeyword}. Dank der schnellen Verlegung und des wartungsfreien Betriebs amortisieren sich Investitionen im Kontext von ${h1Simulated} in kürzester Zeit, was langfristige Kosteneinsparungen garantiert.`,
      `Wir danken Ihnen für Ihr Interesse an ${focusKeyword} und freuen uns darauf, gemeinsam mit Ihnen anspruchsvolle Projekte im Bereich ${h1Simulated} zu realisieren. K-Aqua bleibt weltweit Ihr verlässlicher Partner für wegweisende Rohrleitungslösungen.`
    ];
    return paragraphsDe;
}

const p1 = getSeo(true, false, 'maerkte', 'Maerkte - Kuwait', 'Kuwait');
const p2 = getSeo(true, false, 'maerkte', 'Maerkte - Kuwait - Kuwait', 'Kuwait');
console.log(p1[9]);
console.log(p2[9]);
