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
        tAbout('values.desc')
      ];
      break;
    case 'kontakt':
      paragraphs = [
        tAbout('hero.desc'),
        tAbout('values.items.0.desc')
      ];
      break;
    case 'projektanfrage':
      paragraphs = [
        tAbout('timeline.items.2.text'),
        tAbout('bento.lead')
      ];
      break;
    case 'news':
      paragraphs = [
        tAbout('timeline.desc'),
        tAbout('timeline.items.3.text')
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
