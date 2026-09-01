"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ChevronRight, ChevronLeft, Send, Phone, Wrench, MessageSquare, Building2, User, Mail } from "lucide-react";
import { submitLead } from "@/app/actions/lead";

// Ordnet die Auswahl aus Schritt 1 den kanonischen CRM-Interessenwerten zu
// (identisch mit INTERESSEN in content/kontakt-bloecke.ts).
const INTEREST_BY_INQUIRY: Record<string, string> = {
  sales: "Rohrsysteme",
  tech: "Beratung",
  other: "Beratung",
};

interface MultiStepContactFormProps {
  locale: string;
}

import { useTranslations } from 'next-intl';

export function MultiStepContactForm({ locale }: MultiStepContactFormProps) {
  const t = useTranslations('multiStepForm');
  const isRtl = locale === "ar";

  const [step, setStep] = useState(1);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);

  /* Dauer statt Zeitstempel, gemessen mit einer monotonen Uhr und ab der
     ersten echten Eingabe — dieselbe Begründung wie in KontaktForm.tsx. */
  const start = useRef<number | null>(null);
  const merkeStart = () => {
    if (start.current === null) start.current = performance.now();
  };

  /* Die Honigfalle fehlte hier vollständig.
     Der kleine Kontaktblock im Layout trägt sie seit jeher, dieses Formular —
     das HAUPTformular auf /kontakt — nicht. Der Spamschutz griff also an
     genau einem der beiden Eingänge. Weil dieses Formular seine FormData von
     Hand baut, braucht es ein echtes verstecktes Feld mit Ref. */
  const honigtopf = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    inquiryType: "",
    message: "",
    name: "",
    company: "",
    email: "",
    phone: "",
  });

  const updateForm = (key: keyof typeof formData, value: string) => {
    merkeStart();
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setSendError(false);

    const fd = new FormData();
    fd.set("phone", formData.phone);
    fd.set("email", formData.email);
    fd.set("name", formData.name);
    fd.set("company", formData.company);
    fd.set("message", formData.message);
    fd.set("interest", INTEREST_BY_INQUIRY[formData.inquiryType] ?? "Beratung");
    fd.set("page", "kontakt");
    /* Die gelesene Sprache mitsenden.
       Ohne sie kann der Server nur den `referer`-Header auswerten, und die
       Bestaetigungsmail an den Kunden waere im Zweifel deutsch — auch fuer
       jemanden, der die Seite auf Arabisch gelesen hat. Die Locale liegt hier
       schon als Prop vor und wurde bisher nur fuer die Schreibrichtung
       benutzt. */
    fd.set("locale", locale);
    fd.set("firma2", honigtopf.current?.value ?? "");
    fd.set(
      "elapsed",
      start.current === null ? "" : String(Math.round(performance.now() - start.current))
    );

    const res = await submitLead(fd);
    setSending(false);
    if (res.ok) {
      setStep(4);
    } else {
      setSendError(true);
    }
  };

  // Variants for animation
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? (isRtl ? -50 : 50) : (isRtl ? 50 : -50),
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? (isRtl ? -50 : 50) : (isRtl ? 50 : -50),
      opacity: 0
    })
  };

  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    nextStep();
  };
  const handlePrev = () => {
    setDirection(-1);
    prevStep();
  };

  return (
    <div className={`w-full max-w-3xl mx-auto bg-card border border-card-border shadow-lift rounded-3xl overflow-hidden ${isRtl ? 'text-right' : 'text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Progress Bar */}
      <div className="w-full bg-background-subtle h-2 relative">
        <div 
          className="absolute top-0 bottom-0 left-0 bg-primary transition-all duration-500 ease-out"
          style={{ 
            width: `${((step - 1) / 3) * 100}%`,
            ...(isRtl ? { right: 0, left: 'auto' } : { left: 0, right: 'auto' })
          }}
        />
      </div>

      <div className="p-8 lg:p-12 relative min-h-[500px] flex flex-col">
        <AnimatePresence mode="wait" custom={direction}>
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex-1 flex flex-col"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-heading font-extrabold text-foreground mb-3">{t('step1Title')}</h2>
                <p className="text-muted-foreground text-lg">{t('step1Desc')}</p>
              </div>

              <div className="flex flex-col gap-4 flex-1">
                {[
                  { id: "sales", title: t('optSales'), desc: t('optSalesDesc'), icon: Phone },
                  { id: "tech", title: t('optTech'), desc: t('optTechDesc'), icon: Wrench },
                  { id: "other", title: t('optOther'), desc: t('optOtherDesc'), icon: MessageSquare },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      updateForm("inquiryType", opt.id);
                      handleNext();
                    }}
                    className={`group flex items-start gap-5 p-5 lg:p-6 rounded-2xl border-2 transition-all duration-300 text-start ${
                      formData.inquiryType === opt.id 
                        ? 'border-primary bg-primary/5 shadow-md' 
                        : 'border-card-border hover:border-primary/50 bg-background hover:bg-card-tint'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      formData.inquiryType === opt.id ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
                    }`}>
                      <opt.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-xl text-foreground mb-1">{opt.title}</div>
                      <div className="text-muted-foreground">{opt.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex-1 flex flex-col"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-heading font-extrabold text-foreground mb-3">{t('step2Title')}</h2>
                <p className="text-muted-foreground text-lg">{t('step2Desc')}</p>
              </div>

              <div className="flex-1">
                <textarea 
                  className="w-full h-full min-h-[250px] p-5 bg-background border-2 border-card-border focus:border-primary rounded-2xl text-lg text-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none shadow-inner"
                  placeholder={t('messagePlaceholder')}
                  value={formData.message}
                  onChange={(e) => updateForm("message", e.target.value)}
                />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex-1 flex flex-col"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-heading font-extrabold text-foreground mb-3">{t('step3Title')}</h2>
                <p className="text-muted-foreground text-lg">{t('step3Desc')}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                    <User className="w-4 h-4" /> {t('nameLabel')}
                  </label>
                  <input 
                    type="text" 
                    required
                    className="w-full p-4 bg-background border-2 border-card-border focus:border-primary rounded-xl text-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                    value={formData.name}
                    onChange={(e) => updateForm("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> {t('companyLabel')}
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-4 bg-background border-2 border-card-border focus:border-primary rounded-xl text-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                    value={formData.company}
                    onChange={(e) => updateForm("company", e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" /> {t('emailLabel')}
                  </label>
                  <input 
                    type="email" 
                    required
                    className="w-full p-4 bg-background border-2 border-card-border focus:border-primary rounded-xl text-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                    value={formData.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4" /> {t('phoneLabel')}
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full p-4 bg-background border-2 border-card-border focus:border-primary rounded-xl text-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                    value={formData.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, type: "spring" }}
              className="flex-1 flex flex-col items-center justify-center text-center py-12"
            >
              <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-8 relative">
                <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping" />
                <Check className="w-12 h-12 text-green-500 relative z-10" />
              </div>
              <h2 className="text-4xl font-heading font-extrabold text-foreground mb-4">{t('step4Title')}</h2>
              <p className="text-muted-foreground text-xl max-w-md">{t('step4Desc')}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Honigfalle: für Menschen unsichtbar, für einfache Bots verlockend.
            `hidden` statt eines Versatzes außerhalb des Bildes, damit
            Bildschirmleser sie gar nicht erst ansteuern. */}
        <input
          ref={honigtopf}
          className="hidden"
          type="text"
          name="firma2"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        {sendError && step === 3 && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-400"
          >
            {t('sendError')}
          </div>
        )}

        {/* Footer Navigation */}
        {step > 1 && step < 4 && (
          <div className="mt-10 flex items-center justify-between border-t border-card-border pt-6">
            <button 
              onClick={handlePrev}
              className="px-6 py-3 rounded-xl font-bold text-muted-foreground hover:text-foreground hover:bg-background-subtle transition-all flex items-center gap-2"
            >
              {isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              {t('btnBack')}
            </button>
            
            {step === 2 ? (
              <button 
                onClick={handleNext}
                disabled={!formData.message.trim()}
                className="px-8 py-3 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg shadow-primary/25 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('btnNext')}
                {isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            ) : (
              <button
                onClick={submitForm}
                disabled={sending || !formData.name.trim() || !formData.email.trim() || !formData.phone.trim()}
                className="px-8 py-3 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg shadow-primary/25 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                {sending ? t('btnSending') : t('btnSubmit')}
              </button>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="mt-10 flex items-center justify-center border-t border-card-border pt-6">
            <button 
              onClick={() => window.location.href = `/${locale}`}
              className="px-8 py-3 rounded-xl font-bold bg-background text-foreground border-2 border-card-border hover:border-primary transition-all flex items-center gap-2"
            >
              {t('btnHome')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
