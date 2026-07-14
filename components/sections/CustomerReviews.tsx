'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { ButtonPrimary } from '@/components/ui/ButtonPrimary';
import { SectionHead } from '@/components/ui/SectionHead';

// Helper for parsing **bold** markdown into <strong> tags
function renderBoldText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="text-foreground font-bold">{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
}

function ReviewCard({ quote, author }: { quote: string; author: string }) {
  return (
    <Card className="flex flex-col h-full bg-card border border-card-border p-6 shadow-diffuse relative overflow-hidden group">
      <div className="absolute top-6 right-6 text-primary/10">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
        </svg>
      </div>
      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-body text-muted-foreground leading-relaxed flex-grow z-10 mb-6">
        {renderBoldText(quote)}
      </p>
      <div className="flex items-center gap-3 mt-auto">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold font-mono">
          {author.charAt(0)}
        </div>
        <span className="font-heading font-bold text-sm text-foreground">
          {author}
        </span>
      </div>
    </Card>
  );
}

export function CustomerReviews() {
  const t = useTranslations('customerReviews');
  const [activeTab, setActiveTab] = useState<'A' | 'B' | 'C'>('A');

  const tabs = [
    { id: 'A', label: t('tabA') },
    { id: 'B', label: t('tabB') },
    { id: 'C', label: t('tabC') },
  ];

  const getReviewsForTab = () => {
    switch (activeTab) {
      case 'A':
        return [
          { quote: t('reviews.a1'), author: t('reviews.a1Author') },
          { quote: t('reviews.a2'), author: t('reviews.a2Author') },
          { quote: t('reviews.a3'), author: t('reviews.a3Author') },
          { quote: t('reviews.a4'), author: t('reviews.a4Author') },
          { quote: t('reviews.a5'), author: t('reviews.a5Author') },
        ];
      case 'B':
        return [
          { quote: t('reviews.b1'), author: t('reviews.b1Author') },
          { quote: t('reviews.b2'), author: t('reviews.b2Author') },
          { quote: t('reviews.b3'), author: t('reviews.b3Author') },
        ];
      case 'C':
        return [
          { quote: t('reviews.c1'), author: t('reviews.c1Author') },
          { quote: t('reviews.c2'), author: t('reviews.c2Author') },
          { quote: t('reviews.c3'), author: t('reviews.c3Author') },
          { quote: t('reviews.c4'), author: t('reviews.c4Author') },
          { quote: t('reviews.c5'), author: t('reviews.c5Author') },
        ];
      default:
        return [];
    }
  };

  const currentReviews = getReviewsForTab();

  return (
    <section className="py-24 lg:py-32 bg-background kq-band kq-band--slant-b relative">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <SectionHead
            eyebrow={t('eyebrow')}
            title={t('title')}
            lead={t('lead')}
            align="center"
          />
          <div className="mt-8 flex items-center gap-4 bg-card border border-card-border px-6 py-3 rounded-full shadow-sm">
            <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div className="flex flex-col text-left">
              <span className="font-bold text-sm text-foreground">{t('trustBadge')}</span>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-bold text-yellow-500">{t('trustStars')}</span>
                <span>{t('trustBasedOn')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'A' | 'B' | 'C')}
              className={`px-6 py-3 rounded-full font-heading font-bold text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-card-border'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {currentReviews.map((review, idx) => (
            <div key={idx} className={activeTab === 'A' && idx >= 3 ? "lg:col-span-1.5" : ""}>
              <ReviewCard quote={review.quote} author={review.author} />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center max-w-2xl mx-auto bg-card border border-primary/20 rounded-2xl p-10 shadow-diffuse">
          <h3 className="font-heading font-black text-3xl tracking-tight mb-4 text-foreground">
            {t('ctaTitle')}
          </h3>
          <p className="text-body text-muted-foreground leading-relaxed mb-8">
            {t('ctaText')}
          </p>
          <ButtonPrimary href="/kontakt" className="w-full sm:w-auto">
            {t('ctaBtn')}
          </ButtonPrimary>
        </div>

        {/* UWG / GDPR Disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-[11px] text-muted-foreground/60 max-w-4xl mx-auto leading-relaxed">
            {t('disclaimer')}
          </p>
        </div>
      </div>
    </section>
  );
}
