'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border border-card-border rounded-xl bg-card overflow-hidden shadow-sm transition-colors hover:border-primary/50">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 md:p-6 text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset bg-transparent cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="font-heading font-semibold text-foreground text-base md:text-lg pe-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="shrink-0 w-8 h-8 rounded-full bg-background-subtle flex items-center justify-center text-muted-foreground border border-card-border"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0 text-body text-muted-foreground leading-relaxed border-t border-card-border/50 mt-2 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface Props {
  category: string;
}

export default function ProductFAQ({ category }: Props) {
  const t = useTranslations('products');
  const lowerCat = category.toLowerCase();
  
  // Resolve dynamic category for FAQ
  let faqCat = 'fallback';
  if (lowerCat.includes('pipes')) faqCat = 'pipes';
  else if (lowerCat.includes('fitting') || lowerCat.includes('transition')) faqCat = 'fittings';
  else if (lowerCat.includes('valve')) faqCat = 'valves';

  // Extract FAQ items safely
  let rawFaqs: { q: string, a: string }[] = [];
  try {
    if (t.has(`seoArticle.${faqCat}.faq`)) {
      rawFaqs = t.raw(`seoArticle.${faqCat}.faq`) || [];
    }
  } catch {
    // Fallback if translations don't exist yet
    rawFaqs = [];
  }

  // Fallback content if empty
  const faqs = Array.isArray(rawFaqs) && rawFaqs.length > 0 ? rawFaqs : [
    { q: t('labels.faqFallbackQ1') || "Was sind die Hauptvorteile?", a: t('labels.faqFallbackA1') || "Das System bietet extreme Langlebigkeit, Korrosionsbeständigkeit und hervorragende hygienische Eigenschaften für Trinkwasser." },
    { q: t('labels.faqFallbackQ2') || "Ist das Material umweltfreundlich?", a: t('labels.faqFallbackA2') || "Ja, PP-RCT ist zu 100% recycelbar und hat einen sehr geringen CO2-Fußabdruck im Vergleich zu Metallrohren." },
    { q: t('labels.faqFallbackQ3') || "Wie erfolgt die Installation?", a: t('labels.faqFallbackA3') || "Die Installation erfolgt sicher und leckagefrei durch Polyfusion-Schweißen." }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary-soft flex items-center justify-center text-primary shrink-0">
          <MessageCircleQuestion className="w-5 h-5" />
        </div>
        <h3 className="font-heading font-bold text-h3 text-foreground">
          {t('labels.faqTitle') || "Häufig gestellte Fragen (FAQ)"}
        </h3>
      </div>
      
      <div className="flex flex-col gap-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.q}
            answer={faq.a}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </section>
  );
}
