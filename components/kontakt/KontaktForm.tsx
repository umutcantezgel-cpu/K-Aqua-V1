// components/kontakt/KontaktForm.tsx
"use client";
import { useRef, useState } from "react";
import { submitLead } from "@/app/actions/lead";
import { INTERESSEN, DIREKTWAHL } from "@/content/kontakt-bloecke";

interface Props {
  slug: string;
  interest: string;
  done: string;
  layout?: "full" | "row" | "stack";
  slimDone?: boolean;
}

export function KontaktForm({ slug, interest, done, layout = "full", slimDone = false }: Props) {
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");
  const [sel, setSel] = useState(interest);
  const [errs, setErrs] = useState<{ p?: boolean; m?: boolean }>({});
  const started = useRef(Date.now());

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
    setState(res.ok ? "success" : "idle");
  }

  const phoneField = (
    <div className={`kqk-fld${errs.p ? " err" : ""}`}>
      <label>Telefon</label>
      <div className="kqk-in">
        <select name="cc" aria-label="Landesvorwahl" defaultValue="+49">
          {["+49", "+41", "+43", "+971", "+1"].map(c => <option key={c}>{c}</option>)}
        </select>
        <input name="phone" type="tel" placeholder="160 1234567" autoComplete="tel" disabled={state === "loading"} />
      </div>
      <span className="emsg">Bitte Telefonnummer angeben</span>
    </div>
  );

  const emailField = (
    <div className={`kqk-fld${errs.m ? " err" : ""}`}>
      <label>Email</label>
      <div className="kqk-in"><input name="email" type="email" placeholder="einkauf@firma.com" autoComplete="email" disabled={state === "loading"} /></div>
      <span className="emsg">Bitte gueltige Email angeben</span>
    </div>
  );

  const chipsField = (max?: number) => (
    <div className="kqk-fld">
      <label>Was benoetigen Sie</label>
      <div className="kqk-chips">
        {INTERESSEN.slice(0, max || INTERESSEN.length).map(n => (
          <button key={n} type="button" className="kqk-chip" aria-pressed={sel === n} onClick={() => setSel(n)}>{n}</button>
        ))}
      </div>
    </div>
  );

  const hpField = <input className="kqk-hp" type="text" name="firma2" tabIndex={-1} autoComplete="off" aria-hidden="true" />;
  
  const sendBtn = (text = "Anfrage senden") => (
    <button className={`kqk-send${state === "loading" ? " loading" : ""}`} disabled={state === "loading"} type="submit">
      <span className="tx">{text}</span><span className="sp" />
    </button>
  );

  const legal = <span className="kqk-legal">Keine Werbung, keine Weitergabe. <a href="/datenschutz">Datenschutz</a></span>;

  const renderForm = () => {
    if (layout === "row") {
      return (
        <form className="kqk-form kqk-lrow" onSubmit={onSubmit} noValidate>
          {phoneField}
          {emailField}
          {hpField}
          {sendBtn()}
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
        <div className="kqk-actions">
          {sendBtn()}
          {legal}
        </div>
      </form>
    );
  };

  return (
    <div className={`kqk-right${state === "success" ? " success-inner" : ""}`}>
      {state !== "success" ? renderForm() : (
        slimDone ? (
          <div className="kqk-done slim" style={{ opacity: 1, transform: "none", pointerEvents: "auto" }}>
            <div className="ring"><svg viewBox="0 0 24 24"><polyline points="4 12.5 10 18 20 6" /></svg></div>
            <div>
              <h3>Danke, Anfrage ist da.</h3>
              <p>{done}</p>
            </div>
          </div>
        ) : (
          <div className="kqk-done" style={{ opacity: 1, transform: "none", pointerEvents: "auto" }}>
            <div className="ring"><svg viewBox="0 0 24 24"><polyline points="4 12.5 10 18 20 6" /></svg></div>
            <h3>Danke, Ihre Anfrage ist da.</h3>
            <p>{done}</p>
            <div className="alt">Eilig? Direktwahl <a href={`tel:${DIREKTWAHL.replace(/ /g, "")}`}>{DIREKTWAHL}</a></div>
          </div>
        )
      )}
    </div>
  );
}
