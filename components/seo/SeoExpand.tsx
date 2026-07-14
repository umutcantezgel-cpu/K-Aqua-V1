import React from 'react';
import { useTranslations } from 'next-intl';

interface SeoExpandProps {
  pageType: 'impressum' | 'kontakt' | 'projektanfrage' | 'news' | 'maerkte';
}

export function SeoExpand({ pageType }: SeoExpandProps) {
  const tAbout = useTranslations('about');

  let paragraphs: string[] = [];

  switch (pageType) {
    case 'impressum':
      paragraphs = [
        tAbout('intro.desc'),
        tAbout('values.desc'),
        "Als führender Anbieter im Bereich der PP-R und PP-RCT Rohrsysteme ist uns Transparenz und rechtliche Absicherung wichtig. Auf dieser Seite finden Sie alle relevanten rechtlichen Informationen zu unserem Unternehmen. Wir legen großen Wert darauf, unsere geschäftlichen Aktivitäten im Einklang mit den geltenden Vorschriften und Gesetzen zu führen.",
        "Unser Impressum enthält wichtige Angaben zu unserem Sitz, den Vertretungsberechtigten sowie unseren Kontaktmöglichkeiten. Wir sind bestrebt, alle Informationen aktuell und korrekt zu halten. Bei Fragen zu unseren rechtlichen Angaben können Sie sich jederzeit an uns wenden. Vertrauen und Zuverlässigkeit sind die Grundpfeiler unserer Partnerschaften weltweit."
      ];
      break;
    case 'kontakt':
      paragraphs = [
        tAbout('hero.desc'),
        tAbout('values.items.0.desc'),
        "Unser engagiertes Team steht Ihnen jederzeit zur Verfügung, um Ihre Fragen zu beantworten und maßgeschneiderte Lösungen für Ihre Projekte zu finden. Ob es sich um technische Spezifikationen, Lieferzeiten oder individuelle Anfragen handelt – wir helfen Ihnen gerne weiter.",
        "Zögern Sie nicht, uns anzurufen oder eine E-Mail zu schreiben. Wir legen großen Wert auf eine schnelle und kompetente Beratung. Ihr Erfolg ist unser Antrieb, und wir freuen uns darauf, Sie bei Ihren Vorhaben im Bereich der Trinkwasser- und Klimatechnik bestmöglich zu unterstützen."
      ];
      break;
    case 'projektanfrage':
      paragraphs = [
        tAbout('timeline.items.2.text'),
        tAbout('bento.lead'),
        "Jedes Projekt hat seine eigenen spezifischen Anforderungen und Herausforderungen. Um Ihnen ein passgenaues Angebot und die beste technische Unterstützung bieten zu können, bitten wir Sie, uns möglichst detaillierte Informationen zu Ihrem Vorhaben zur Verfügung zu stellen.",
        "Unsere Experten prüfen Ihre Anfrage umgehend und setzen sich mit Ihnen in Verbindung, um die nächsten Schritte zu besprechen. Wir garantieren Ihnen eine professionelle Begleitung von der ersten Idee bis zur finalen Umsetzung Ihres Rohrleitungsprojekts."
      ];
      break;
    case 'news':
      paragraphs = [
        tAbout('timeline.desc'),
        tAbout('timeline.items.3.text'),
        "Bleiben Sie immer auf dem Laufenden über die neuesten Entwicklungen, Produkte und Meilensteine bei K-Aqua. Unser News-Bereich bietet Ihnen aktuelle Informationen aus der Welt der Rohrleitungstechnik und Einblicke in unsere innovativen Projekte weltweit.",
        "Wir informieren Sie regelmäßig über wichtige Branchen-Updates, technologische Fortschritte und Unternehmensnachrichten. Erfahren Sie aus erster Hand, wie K-Aqua die Zukunft der Wasserversorgung und Klimatechnik mitgestaltet."
      ];
      break;
    case 'maerkte':
      paragraphs = [
        tAbout('sticky.items.0.desc'),
        tAbout('sticky.items.1.desc'),
        tAbout('sticky.items.2.desc')
      ];
      break;
  }

  return (
    <section className="py-16 bg-background border-t border-card-border mt-12">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="prose dark:prose-invert text-muted-foreground text-sm max-w-none text-start">
          <p className="font-bold text-foreground mb-4">K-Aqua PP-R / PP-RCT Systems</p>
          {paragraphs.map((text, idx) => (
            <p key={idx} className="mb-4">{text}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
