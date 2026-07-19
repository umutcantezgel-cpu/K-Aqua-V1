// components/kontakt/KontaktForm.tsx — Client-Insel, minimales Hydration-Budget.
"use client";
import { useRef, useState } from "react";
import { submitLead } from "@/app/actions/lead";
import { INTERESSEN, DIREKTWAHL } from "@/content/kontakt-bloecke";

export function KontaktForm({ slug, interest, done }: { slug: string; interest: string; done: string }) {
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");
  const [sel, setSel] = useState(interest);
  const [errs, setErrs] = useState<{ p?: boolean; m?: boolean }>({});
  const started = useRef(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const p = !String(fd.get("phone") || "").trim();
    const m = !/.+@.+\..+/.test(String(fd.get("email") || ""));
    setErrs({ p, m });
    if (p || m) return;
    fd.set("interest", sel); fd.set("page", slug); fd.set("startedAt", String(started.current));
    setState("loading");
    const res = await submitLead(fd);
    setState(res.ok ? "success" : "idle");
  }

  return (
    <div className={`kqk-right${state === "success" ? " success-inner" : ""}`}>
      {state !== "success" ? (
        <form className="kqk-form" onSubmit={onSubmit} noValidate>
          <div className="kqk-row2">
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
            <div className={`kqk-fld${errs.m ? " err" : ""}`}>
              <label>Email</label>
              <div className="kqk-in"><input name="email" type="email" placeholder="einkauf@firma.com" autoComplete="email" disabled={state === "loading"} /></div>
              <span className="emsg">Bitte gueltige Email angeben</span>
            </div>
          </div>
          <div className="kqk-fld">
            <label>Was benoetigen Sie</label>
            <div className="kqk-chips">
              {INTERESSEN.map(n => (
                <button key={n} type="button" className="kqk-chip" aria-pressed={sel === n} onClick={() => setSel(n)}>{n}</button>
              ))}
            </div>
          </div>
          <input className="kqk-hp" type="text" name="firma2" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <div className="kqk-actions">
            <button className={`kqk-send${state === "loading" ? " loading" : ""}`} disabled={state === "loading"} type="submit">
              <span className="tx">Anfrage senden</span><span className="sp" />
            </button>
            <span className="kqk-legal">Keine Werbung, keine Weitergabe. <a href="/datenschutz">Datenschutz</a></span>
          </div>
        </form>
      ) : (
        <div className="kqk-done" style={{ opacity: 1, transform: "none", pointerEvents: "auto" }}>
          <div className="ring"><svg viewBox="0 0 24 24"><polyline points="4 12.5 10 18 20 6" /></svg></div>
          <h3>Danke, Ihre Anfrage ist da.</h3>
          <p>{done}</p>
          <div className="alt">Eilig? Direktwahl <a href={`tel:${DIREKTWAHL.replace(/ /g, "")}`}>{DIREKTWAHL}</a></div>
        </div>
      )}
    </div>
  );
}
