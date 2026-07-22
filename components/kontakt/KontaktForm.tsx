// components/kontakt/KontaktForm.tsx
"use client";
import { useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
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

  const legal = <span className="kqk-legal">{t("legal")} <Link href="/datenschutz">{t("legalLink")}</Link></span>;

  const errorBanner = state === "error" ? (
    <div className="kqk-error" role="alert">
      {t("sendError")} <a href={`tel:${DIREKTWAHL_TEL}`}>{DIREKTWAHL_DISPLAY}</a>
    </div>
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
      {state !== "success" ? renderForm() : (
        slimDone ? (
          <div className="kqk-done slim" style={{ opacity: 1, transform: "none", pointerEvents: "auto" }}>
            <div className="ring"><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="4 12.5 10 18 20 6" /></svg></div>
            <div>
              <h3>{t("doneTitleSlim")}</h3>
              <p>{done}</p>
            </div>
          </div>
        ) : (
          <div className="kqk-done" style={{ opacity: 1, transform: "none", pointerEvents: "auto" }}>
            <div className="ring"><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="4 12.5 10 18 20 6" /></svg></div>
            <h3>{t("doneTitle")}</h3>
            <p>{done}</p>
            <div className="alt">{t("direct")} <a href={`tel:${DIREKTWAHL_TEL}`}>{DIREKTWAHL_DISPLAY}</a></div>
          </div>
        )
      )}
    </div>
  );
}
