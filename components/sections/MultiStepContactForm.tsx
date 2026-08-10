"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

type FormLang = "de" | "en" | "ar";

const DICTIONARY: Record<FormLang, Record<string, string>> = {
  de: {
    step1Title: "Wie können wir Ihnen helfen?",
    step1Desc: "Wählen Sie den passenden Bereich für Ihr Anliegen.",
    optSales: "Vertrieb & Projekte",
    optSalesDesc: "Preisanfragen, Großprojekte und Lieferzeiten.",
    optTech: "Technischer Support",
    optTechDesc: "Spezifikationen, Installation und Systemauslegung.",
    optOther: "Allgemeine Anfrage",
    optOtherDesc: "Marketing, Karriere oder Sonstiges.",
    
    step2Title: "Details zu Ihrem Anliegen",
    step2Desc: "Bitte beschreiben Sie kurz Ihr Projekt oder Ihre Frage.",
    messagePlaceholder: "Ihre Nachricht an uns...",
    
    step3Title: "Ihre Kontaktdaten",
    step3Desc: "Fast geschafft! Wie können wir Sie erreichen?",
    nameLabel: "Vollständiger Name",
    companyLabel: "Firma / Organisation",
    emailLabel: "E-Mail Adresse",
    phoneLabel: "Telefonnummer",
    
    step4Title: "Nachricht gesendet!",
    step4Desc: "Vielen Dank für Ihre Anfrage. Einer unserer Experten wird sich in Kürze bei Ihnen melden.",
    
    btnNext: "Weiter",
    btnBack: "Zurück",
    btnSubmit: "Anfrage Senden",
    btnSending: "Wird gesendet…",
    btnHome: "Zurück zur Startseite",
    sendError: "Senden fehlgeschlagen. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an: +49 (0)60 85 / 9868-410",
  },
  en: {
    step1Title: "How can we help you?",
    step1Desc: "Select the appropriate department for your inquiry.",
    optSales: "Sales & Projects",
    optSalesDesc: "Pricing, large projects, and delivery times.",
    optTech: "Technical Support",
    optTechDesc: "Specifications, installation, and system design.",
    optOther: "General Inquiry",
    optOtherDesc: "Marketing, career, or other topics.",
    
    step2Title: "Inquiry Details",
    step2Desc: "Please briefly describe your project or question.",
    messagePlaceholder: "Your message to us...",
    
    step3Title: "Your Contact Info",
    step3Desc: "Almost done! How can we reach you?",
    nameLabel: "Full Name",
    companyLabel: "Company / Organization",
    emailLabel: "Email Address",
    phoneLabel: "Phone Number",
    
    step4Title: "Message sent!",
    step4Desc: "Thank you for your inquiry. One of our experts will contact you shortly.",
    
    btnNext: "Next",
    btnBack: "Back",
    btnSubmit: "Submit Inquiry",
    btnSending: "Sending…",
    btnHome: "Return to Homepage",
    sendError: "Sending failed. Please try again or call us directly: +49 (0)60 85 / 9868-410",
  },
  ar: {
    step1Title: "كيف يمكننا مساعدتك؟",
    step1Desc: "حدد القسم المناسب لاستفسارك.",
    optSales: "المبيعات والمشاريع",
    optSalesDesc: "الأسعار، المشاريع الكبيرة، وأوقات التسليم.",
    optTech: "الدعم الفني",
    optTechDesc: "المواصفات، التركيب، وتصميم النظام.",
    optOther: "استفسار عام",
    optOtherDesc: "التسويق، الوظائف، أو مواضيع أخرى.",
    
    step2Title: "تفاصيل الاستفسار",
    step2Desc: "يرجى وصف مشروعك أو سؤالك باختصار.",
    messagePlaceholder: "رسالتك إلينا...",
    
    step3Title: "معلومات الاتصال بك",
    step3Desc: "أوشكنا على الانتهاء! كيف يمكننا الوصول إليك؟",
    nameLabel: "الاسم الكامل",
    companyLabel: "الشركة / المنظمة",
    emailLabel: "عنوان البريد الإلكتروني",
    phoneLabel: "رقم الهاتف",
    
    step4Title: "تم إرسال الرسالة!",
    step4Desc: "شكراً لاستفسارك. سيتصل بك أحد خبرائنا قريباً.",
    
    btnNext: "التالي",
    btnBack: "رجوع",
    btnSubmit: "إرسال الاستفسار",
    btnSending: "جارٍ الإرسال…",
    btnHome: "العودة للصفحة الرئيسية",
    sendError: "تعذّر الإرسال. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة: ‎+49 (0)60 85 / 9868-410",
  }
};

export function MultiStepContactForm({ locale }: MultiStepContactFormProps) {
  const lang: FormLang = (locale === "de" || locale === "en" || locale === "ar") ? locale : "en";
  const dict = DICTIONARY[lang];
  const isRtl = lang === "ar";

  const [step, setStep] = useState(1);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const started = useRef(Date.now());
  const [formData, setFormData] = useState({
    inquiryType: "",
    message: "",
    name: "",
    company: "",
    email: "",
    phone: "",
  });

  const updateForm = (key: keyof typeof formData, value: string) => {
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
    fd.set("startedAt", String(started.current));

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
                <h2 className="text-3xl font-heading font-extrabold text-foreground mb-3">{dict.step1Title}</h2>
                <p className="text-muted-foreground text-lg">{dict.step1Desc}</p>
              </div>

              <div className="flex flex-col gap-4 flex-1">
                {[
                  { id: "sales", title: dict.optSales, desc: dict.optSalesDesc, icon: Phone },
                  { id: "tech", title: dict.optTech, desc: dict.optTechDesc, icon: Wrench },
                  { id: "other", title: dict.optOther, desc: dict.optOtherDesc, icon: MessageSquare },
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
                <h2 className="text-3xl font-heading font-extrabold text-foreground mb-3">{dict.step2Title}</h2>
                <p className="text-muted-foreground text-lg">{dict.step2Desc}</p>
              </div>

              <div className="flex-1">
                <textarea 
                  className="w-full h-full min-h-[250px] p-5 bg-background border-2 border-card-border focus:border-primary rounded-2xl text-lg text-foreground focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none shadow-inner"
                  placeholder={dict.messagePlaceholder}
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
                <h2 className="text-3xl font-heading font-extrabold text-foreground mb-3">{dict.step3Title}</h2>
                <p className="text-muted-foreground text-lg">{dict.step3Desc}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                    <User className="w-4 h-4" /> {dict.nameLabel}
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
                    <Building2 className="w-4 h-4" /> {dict.companyLabel}
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
                    <Mail className="w-4 h-4" /> {dict.emailLabel}
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
                    <Phone className="w-4 h-4" /> {dict.phoneLabel}
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
              <h2 className="text-4xl font-heading font-extrabold text-foreground mb-4">{dict.step4Title}</h2>
              <p className="text-muted-foreground text-xl max-w-md">{dict.step4Desc}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {sendError && step === 3 && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-400"
          >
            {dict.sendError}
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
              {dict.btnBack}
            </button>
            
            {step === 2 ? (
              <button 
                onClick={handleNext}
                disabled={!formData.message.trim()}
                className="px-8 py-3 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg shadow-primary/25 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {dict.btnNext}
                {isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            ) : (
              <button
                onClick={submitForm}
                disabled={sending || !formData.name.trim() || !formData.email.trim() || !formData.phone.trim()}
                className="px-8 py-3 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary-hover shadow-lg shadow-primary/25 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                {sending ? dict.btnSending : dict.btnSubmit}
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
              {dict.btnHome}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
