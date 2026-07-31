'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

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

      <motion.div
        initial={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="overflow-hidden"
      >
        <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0 text-body text-muted-foreground leading-relaxed border-t border-card-border/50 mt-2 pt-4">
          {answer}
        </div>
      </motion.div>
    </div>
  );
}

interface Props {
  title: string;
  faqs: { q: string, a: string }[];
}

export default function ProductFAQ({ title, faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary-soft flex items-center justify-center text-primary shrink-0">
          <MessageCircleQuestion className="w-5 h-5" />
        </div>
        <h3 className="font-heading font-bold text-h3 text-foreground">
          {title}
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
