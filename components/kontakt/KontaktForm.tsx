// components/kontakt/KontaktForm.tsx
"use client";
import { useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [sel, setSel] = useState(interest);
  const [errs, setErrs] = useState<{ p?: boolean; m?: boolean }>({});
  const started = useRef(Date.now());
  const uid = useId();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const p = !String(fd.get("phone") || "").trim();
    // Only validate email if it's present in the DOM layout
    const m = !!e.currentTarget.elements.namedItem("email") && !/.+@.+\..+/.test(String(fd.get("email") || ""));
    setErrs({ p, m });
    if (p || m) return;
    fd.set("interest", sel); fd.set("page", slug); fd.set("startedAt", String(started.current));
    setState("loading");
    const res = await submitLead(fd);
    setState(res.ok ? "success" : "error");
  }

  const phoneField = (
    <div className={`kqk-fld${errs.p ? " err" : ""}`}>
      <label htmlFor={`${uid}-phone`}>{t("phoneLabel")}</label>
      <div className="kqk-in">
        <select name="cc" aria-label={t("ccAria")} defaultValue="+49">
          {["+49", "+41", "+43", "+971", "+1"].map(c => <option key={c}>{c}</option>)}
        </select>
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
        />
      </div>
      <span className="emsg" id={`${uid}-phone-err`} role="alert">{t("phoneError")}</span>
    </div>
  );

  const emailField = (
    <div className={`kqk-fld${errs.m ? " err" : ""}`}>
      <label htmlFor={`${uid}-email`}>{t("emailLabel")}</label>
      <div className="kqk-in">
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
        />
      </div>
      <span className="emsg" id={`${uid}-email-err`} role="alert">{t("emailError")}</span>
    </div>
  );

  const chipsField = (max?: number) => (
    <div className="kqk-fld">
      <label>{t("chipsLabel")}</label>
      <div className="kqk-chips">
        {INTERESSEN.slice(0, max || INTERESSEN.length).map(n => (
          <button key={n.key} type="button" className="kqk-chip" aria-pressed={sel === n.value} onClick={() => setSel(n.value)}>
            {t(`interests.${n.key}`)}
          </button>
        ))}
      </div>
    </div>
  );

  const hpField = <input className="kqk-hp" type="text" name="firma2" tabIndex={-1} autoComplete="off" aria-hidden="true" />;

  const sendBtn = (text?: string) => (
    <button className={`kqk-send${state === "loading" ? " loading" : ""}`} disabled={state === "loading"} type="submit">
      <span className="tx">{text ?? t("send")}</span><span className="sp" />
    </button>
  );

  const legal = <span className="kqk-legal" data-nosnippet="true">{t("legal")} <Link href="/datenschutz">{t("legalLink")}</Link></span>;

  const errorBanner = state === "error" ? (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="kqk-error" role="alert">
      {t("sendError")} <a href={`tel:${DIREKTWAHL_TEL}`}>{DIREKTWAHL_DISPLAY}</a>
    </motion.div>
  ) : null;

  const renderForm = () => {
    if (layout === "row") {
      return (
        <form className="kqk-form kqk-lrow" onSubmit={onSubmit} noValidate>
          {phoneField}
          {emailField}
          {hpField}
          {sendBtn()}
          {errorBanner}
        </form>
      );
    }
    if (layout === "stack") {
      return (
        <form className="kqk-form kqk-stack" onSubmit={onSubmit} noValidate>
          {phoneField}
          {emailField}
          {chipsField(3)}
          {hpField}
          {errorBanner}
          <div className="kqk-actions">{sendBtn()}</div>
          {legal}
        </form>
      );
    }
    // Full layout
    return (
      <form className="kqk-form" onSubmit={onSubmit} noValidate>
        <div className="kqk-row2">
          {phoneField}
          {emailField}
        </div>
        {chipsField()}
        {hpField}
        {errorBanner}
        <div className="kqk-actions">
          {sendBtn()}
          {legal}
        </div>
      </form>
    );
  };

  return (
    <div className={`kqk-right${state === "success" ? " success-inner" : ""}`} aria-live="polite">
      <AnimatePresence mode="wait">
        {state !== "success" ? (
          <motion.div key="form" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.4, ease: "anticipate" }}>
            {renderForm()}
          </motion.div>
        ) : (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }} className="flex justify-center items-center h-full w-full">
            {slimDone ? (
              <div className="kqk-done slim shadow-2xl border border-primary/20 bg-card/80 backdrop-blur-md rounded-2xl p-6" style={{ opacity: 1, transform: "none", pointerEvents: "auto" }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.3 }} className="ring flex items-center justify-center bg-primary/10 text-primary w-12 h-12 rounded-full mb-4 mx-auto">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><polyline points="4 12.5 10 18 20 6" /></svg>
                </motion.div>
                <div className="text-center">
                  <div className="font-heading font-bold text-lg mb-2 text-foreground">{t("doneTitleSlim")}</div>
                  <p className="text-muted-foreground text-sm">{done}</p>
                </div>
              </div>
            ) : (
              <div className="kqk-done shadow-2xl border border-primary/20 bg-card/80 backdrop-blur-md rounded-3xl p-10 text-center" style={{ opacity: 1, transform: "none", pointerEvents: "auto" }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.3 }} className="ring flex items-center justify-center bg-primary/10 text-primary w-16 h-16 rounded-full mb-6 mx-auto">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true"><polyline points="4 12.5 10 18 20 6" /></svg>
                </motion.div>
                <div className="font-heading font-bold text-2xl mb-4 text-foreground">{t("doneTitle")}</div>
                <p className="text-muted-foreground mb-6">{done}</p>
                <div className="alt text-sm font-medium text-foreground bg-background/50 rounded-xl p-4 border border-card-border">
                  {t("direct")} <a href={`tel:${DIREKTWAHL_TEL}`} className="text-primary hover:underline">{DIREKTWAHL_DISPLAY}</a>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
