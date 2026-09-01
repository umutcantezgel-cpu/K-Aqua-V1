"use client";

import { useId, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { submitLead } from "@/app/actions/lead";
import { INTERESSEN, DIREKTWAHL_DISPLAY, DIREKTWAHL_TEL } from "@/content/kontakt-bloecke";

interface Props {
  slug: string;
  interest: string;
  done: string;
  layout?: "full" | "row" | "stack";
  slimDone?: boolean;
}

export function KontaktForm({ slug, interest, done, layout = "full", slimDone = false }: Props) {
  const t = useTranslations("kontaktForm");
  /* Fuer die Sprache der Bestaetigungsmail — siehe fd.set("locale", …) unten. */
  const locale = useLocale();
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [sel, setSel] = useState(interest);
  const [errs, setErrs] = useState<{ p?: boolean; m?: boolean }>({});
  const uid = useId();

  /* Die Uhr für den Tempo-Spamschutz.
     Zwei Änderungen gegenüber der bisherigen Fassung, beide mit Grund:

     1. `performance.now()` statt `Date.now()`. Der Server verglich bisher
        einen CLIENT-Zeitstempel mit seiner EIGENEN Uhr — zwei Uhren. Ging die
        des Besuchers vor, griff die Prüfung nie; ging sie nach, traf sie
        Menschen. Jetzt schickt der Client die verstrichene DAUER, gemessen mit
        einer monotonen Uhr, die von Zeitzonen und Zeitumstellung unberührt
        bleibt.

     2. Der Nullpunkt liegt bei der ersten Eingabe, nicht beim Einhängen.
        Bei Klappe und Dialog entsteht dieses Formular erst beim Öffnen — die
        Uhr lief also mit der Einblendanimation los, und wer den Passwortspeicher
        beide Felder füllen ließ, war unter der Schwelle und verlor seine
        Anfrage. */
  const start = useRef<number | null>(null);
  const merkeStart = () => {
    if (start.current === null) start.current = performance.now();
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const p = !String(fd.get("phone") || "").trim();
    // Only validate email if it's present in the DOM layout
    const m = !!e.currentTarget.elements.namedItem("email") && !/.+@.+\..+/.test(String(fd.get("email") || ""));
    setErrs({ p, m });
    if (p || m) return;
    fd.set("interest", sel);
    fd.set("page", slug);
    /* Die gelesene Sprache mitsenden, damit die Eingangsbestaetigung in
       derselben Sprache ankommt wie die Seite, auf der abgeschickt wurde.
       Der Server kann sonst nur den `referer` auswerten. */
    fd.set("locale", locale);
    fd.set(
      "elapsed",
      start.current === null ? "" : String(Math.round(performance.now() - start.current))
    );
    setState("loading");
    const res = await submitLead(fd);
    setState(res.ok ? "success" : "error");
  }

  const phoneField = (
    <div className={`kqk-fld w-full flex flex-col gap-1.5${errs.p ? " err" : ""}`}>
      <label htmlFor={`${uid}-phone`} className="block font-heading font-semibold text-xs sm:text-sm text-foreground/90 tracking-wide text-start">
        {t("phoneLabel")}
      </label>
      <div className="kqk-in relative flex items-center h-[52px] rounded-xl transition-all duration-300 w-full border border-card-border bg-card shadow-sm hover:border-primary/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
        <div className="flex items-center gap-1 pl-3.5 pr-2 shrink-0">
          <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
          <select
            name="cc"
            aria-label={t("ccAria")}
            defaultValue="+49"
            className="bg-transparent border-0 font-semibold text-xs sm:text-sm outline-none cursor-pointer p-0 pr-1 text-foreground"
          >
            {["+49", "+41", "+43", "+971", "+1", "+33", "+44", "+39", "+34", "+48", "+90"].map(c => (
              <option key={c} value={c} className="bg-card text-foreground">{c}</option>
            ))}
          </select>
        </div>
        <div className="w-[1px] h-6 bg-card-border shrink-0 mx-1"></div>
        <input
          id={`${uid}-phone`}
          name="phone"
          type="tel"
          placeholder={t("phonePlaceholder")}
          autoComplete="tel"
          disabled={state === "loading"}
          aria-required="true"
          aria-invalid={errs.p || undefined}
          aria-describedby={errs.p ? `${uid}-phone-err` : undefined}
          className="flex-1 min-w-0 bg-transparent border-0 pl-2 pr-4 py-3 text-sm sm:text-base font-medium outline-none text-foreground placeholder:text-muted-foreground/60"
        />
      </div>
      <span className="emsg text-xs mt-0.5 text-red-500 font-semibold text-start" id={`${uid}-phone-err`} role="alert">{t("phoneError")}</span>
    </div>
  );

  const emailField = (
    <div className={`kqk-fld w-full flex flex-col gap-1.5${errs.m ? " err" : ""}`}>
      <label htmlFor={`${uid}-email`} className="block font-heading font-semibold text-xs sm:text-sm text-foreground/90 tracking-wide text-start">
        {t("emailLabel")}
      </label>
      <div className="kqk-in relative flex items-center h-[52px] rounded-xl transition-all duration-300 w-full border border-card-border bg-card shadow-sm hover:border-primary/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
        <div className="pl-3.5 pr-2 shrink-0 flex items-center pointer-events-none">
          <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
        </div>
        <input
          id={`${uid}-email`}
          name="email"
          type="email"
          placeholder={t("emailPlaceholder")}
          autoComplete="email"
          disabled={state === "loading"}
          aria-required="true"
          aria-invalid={errs.m || undefined}
          aria-describedby={errs.m ? `${uid}-email-err` : undefined}
          className="flex-1 min-w-0 bg-transparent border-0 pl-1 pr-4 py-3 text-sm sm:text-base font-medium outline-none text-foreground placeholder:text-muted-foreground/60"
        />
      </div>
      <span className="emsg text-xs mt-0.5 text-red-500 font-semibold text-start" id={`${uid}-email-err`} role="alert">{t("emailError")}</span>
    </div>
  );

  const chipsField = (max?: number) => (
    <div className="kqk-fld w-full flex flex-col gap-2">
      <label className="block font-heading font-semibold text-xs sm:text-sm text-foreground/90 tracking-wide text-start">
        {t("chipsLabel")}
      </label>
      <div className="kqk-chips flex flex-wrap gap-2">
        {INTERESSEN.slice(0, max || INTERESSEN.length).map(n => (
          <button
            key={n.key}
            type="button"
            className={`kqk-chip px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-150 cursor-pointer ${
              sel === n.value
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-background-subtle text-muted-foreground border-card-border hover:border-primary/40 hover:text-foreground"
            }`}
            aria-pressed={sel === n.value}
            onClick={() => setSel(n.value)}
          >
            {t(`interests.${n.key}`)}
          </button>
        ))}
      </div>
    </div>
  );

  const hpField = <input className="kqk-hp hidden" type="text" name="firma2" tabIndex={-1} autoComplete="off" aria-hidden="true" />;

  const sendBtn = (text?: string) => (
    <button
      className={`kqk-send group/btn relative flex items-center justify-center gap-2.5 h-[52px] px-8 rounded-xl bg-primary text-primary-foreground font-heading font-bold text-sm sm:text-base cursor-pointer shadow-md hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 w-full lg:w-auto shrink-0 ${state === "loading" ? " loading opacity-75" : ""}`}
      disabled={state === "loading"}
      type="submit"
    >
      <span className="tx flex items-center justify-center gap-2">
        <span>{text ?? t("send")}</span>
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform rtl:-scale-x-100" />
      </span>
      <span className="sp" />
    </button>
  );

  const legal = (
    <span className="kqk-legal text-xs text-muted-foreground text-start" data-nosnippet="true">
      {t("legal")}{" "}
      <Link href="/datenschutz" className="underline hover:text-primary transition-colors font-medium">
        {t("legalLink")}
      </Link>
    </span>
  );

  const errorBanner = state === "error" ? (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="kqk-error w-full p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold text-start" role="alert">
      {t("sendError")} <a href={`tel:${DIREKTWAHL_TEL}`} className="underline font-bold">{DIREKTWAHL_DISPLAY}</a>
    </motion.div>
  ) : null;

  const renderForm = () => {
    if (layout === "row") {
      return (
        <form className="kqk-form flex flex-col lg:flex-row gap-4 lg:gap-3 items-stretch lg:items-end w-full" onSubmit={onSubmit} onFocusCapture={merkeStart} onInputCapture={merkeStart} noValidate>
          <div className="flex-1 min-w-0">{phoneField}</div>
          <div className="flex-1 min-w-0">{emailField}</div>
          {hpField}
          <div className="w-full lg:w-auto lg:shrink-0 pt-1 lg:pt-0">{sendBtn()}</div>
          {errorBanner}
          {/* Der Datenschutzhinweis fehlte AUSGERECHNET in diesem Layout.
              `stack` und `full` zeigen ihn seit jeher; `row` nicht — und `row`
              steckt hinter den Varianten band, hero, inline und row, also auch
              unter dem Formular auf der Startseite. `basis-full` schiebt ihn in
              der Zeilenanordnung auf eine eigene Zeile. */}
          <div className="w-full lg:basis-full">{legal}</div>
        </form>
      );
    }
    if (layout === "stack") {
      return (
        <form className="kqk-form flex flex-col gap-4 w-full" onSubmit={onSubmit} onFocusCapture={merkeStart} onInputCapture={merkeStart} noValidate>
          {phoneField}
          {emailField}
          {chipsField(3)}
          {hpField}
          {errorBanner}
          <div className="w-full pt-1">{sendBtn()}</div>
          {legal}
        </form>
      );
    }
    // Full layout
    return (
      <form className="kqk-form flex flex-col gap-5 w-full" onSubmit={onSubmit} onFocusCapture={merkeStart} onInputCapture={merkeStart} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 w-full">
          {phoneField}
          {emailField}
        </div>
        {chipsField()}
        {hpField}
        {errorBanner}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
          {sendBtn()}
          {legal}
        </div>
      </form>
    );
  };

  return (
    <div className={`kqk-right w-full${state === "success" ? " success-inner" : ""}`} aria-live="polite">
      <AnimatePresence mode="wait">
        {state !== "success" ? (
          <motion.div key="form" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.3 }} className="w-full">
            {renderForm()}
          </motion.div>
        ) : (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="flex justify-center items-center h-full w-full">
            {slimDone ? (
              <div className="kqk-done slim shadow-xl border border-primary/20 bg-card rounded-2xl p-6 w-full text-center sm:text-left flex flex-col sm:flex-row items-center gap-4">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="ring flex items-center justify-center bg-primary/10 text-primary w-12 h-12 rounded-full shrink-0 border border-primary/20">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><polyline points="4 12.5 10 18 20 6" /></svg>
                </motion.div>
                <div>
                  <div className="font-heading font-bold text-lg text-foreground">{t("doneTitleSlim")}</div>
                  <p className="text-muted-foreground text-sm">{done}</p>
                </div>
              </div>
            ) : (
              <div className="kqk-done shadow-2xl border border-primary/20 bg-card rounded-3xl p-8 sm:p-10 text-center w-full">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="ring flex items-center justify-center bg-primary/10 text-primary w-16 h-16 rounded-full border border-primary/20 mb-5 mx-auto">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><polyline points="4 12.5 10 18 20 6" /></svg>
                </motion.div>
                <div className="font-heading font-bold text-2xl mb-3 text-foreground">{t("doneTitle")}</div>
                <p className="text-muted-foreground mb-6 text-sm sm:text-base">{done}</p>
                <div className="alt text-sm font-mono font-medium text-foreground bg-background-subtle rounded-xl p-4 border border-card-border inline-flex items-center gap-2">
                  <span>{t("direct")}</span>
                  <a href={`tel:${DIREKTWAHL_TEL}`} className="text-primary font-bold hover:underline">{DIREKTWAHL_DISPLAY}</a>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
