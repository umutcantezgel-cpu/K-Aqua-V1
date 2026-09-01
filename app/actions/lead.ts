"use server";
import { headers } from "next/headers";
import { sendMail } from "@/lib/mail/send";
import { resolveEmpfaenger } from "@/lib/mail/config";
import { leadBetreff, leadRumpf, type LeadDaten } from "@/lib/mail/lead-message";
import { bewerteLead, leseDauer } from "@/lib/mail/spam";

export interface LeadResult { ok: boolean; error?: string }

/**
 * Nimmt eine Anfrage aus den Kontaktformularen entgegen.
 *
 * Die Rueckgabeform bleibt absichtlich unveraendert (`{ ok, error? }`), damit
 * kein einziges Formular angefasst werden muss.
 *
 * WAS SICH GEAENDERT HAT, und warum:
 *
 * 1. **Kein Erfolg mehr ohne Zustellung.** Frueher endete diese Funktion bei
 *    fehlenden Zugangsdaten in einem `console.log` und gab danach `{ ok: true }`
 *    zurueck. Auf Vercel ueberlebte eine Anfrage damit nur im Function-Log,
 *    waehrend der Besucher „Vielen Dank" las. Jetzt entscheidet
 *    `lib/mail/send.ts`, und in Produktion ohne Zugangsdaten ist das ein
 *    Fehler, den das Formular anzeigt — samt Telefonnummer.
 *
 * 2. **Der Webhook ist ein zweiter Zustellweg, kein Beiwerk.** Er lief schon
 *    immer, aber sein Ergebnis wurde weggeworfen. Jetzt zaehlt es: Hat das CRM
 *    den Lead angenommen, ist er erfasst — auch wenn der Mailversand streikt.
 *
 * 3. **Verdaechtiges wird markiert, nicht verschluckt.** Siehe `lib/mail/spam.ts`.
 */
export async function submitLead(formData: FormData): Promise<LeadResult> {
  const urteil = bewerteLead({
    honeypot: String(formData.get("firma2") || ""),
    /* `elapsed` ist die auf dem Client mit `performance.now()` gemessene DAUER
       seit der ersten Eingabe. Frueher stand hier `startedAt`, ein
       Client-Zeitstempel, der gegen die SERVER-Uhr verglichen wurde — zwei
       Uhren, und bei jeder Abweichung traf es entweder niemanden oder die
       falschen. Aeltere, noch im Browser zwischengespeicherte Seiten senden
       `elapsed` nicht; dann ist der Wert `null` und gilt als unauffaellig.
       Der Rueckfall geht damit immer zugunsten des Nutzers aus. */
    elapsedMs: leseDauer(formData.get("elapsed")),
  });

  // Ein sicherer Bot wird weiterhin still geschluckt: Wer die Honigfalle
  // ausfuellt, soll nicht erfahren, dass er aufgefallen ist.
  if (urteil.art === "bot") return { ok: true };

  const cc = String(formData.get("cc") || "").trim();
  const phoneRaw = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const interest = String(formData.get("interest") || "");
  const page = String(formData.get("page") || "fallback");

  // Optionale Felder des mehrstufigen Formulars (/kontakt)
  const name = String(formData.get("name") || "").trim();
  const company = String(formData.get("company") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!phoneRaw) return { ok: false, error: "phone" };
  if (!/.+@.+\..+/.test(email)) return { ok: false, error: "email" };

  const phone = cc ? `${cc} ${phoneRaw}` : phoneRaw;
  const h = await headers();
  const daten: LeadDaten = {
    phone,
    email,
    interest,
    page,
    ...(name && { name }),
    ...(company && { company }),
    ...(message && { message }),
    pfad: h.get("referer") || "",
    sprache: h.get("accept-language")?.split(",")[0] || "",
    zeit: new Date().toISOString(),
  };

  /* Der Webhook laeuft zuerst und sein Ergebnis wird ausgewertet.
     Er darf weiterhin scheitern, ohne den Lead zu blockieren — geaendert hat
     sich nur, DASS wir hinsehen. */
  let webhookOk = false;
  if (process.env.CRM_WEBHOOK_URL) {
    try {
      const antwort = await fetch(process.env.CRM_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...daten, auffaellig: urteil.art === "verdaechtig" }),
      });
      webhookOk = antwort.ok;
      if (!antwort.ok) {
        console.error(`CRM-Webhook antwortete mit ${antwort.status} (Lead wird trotzdem gemailt)`);
      }
    } catch (error) {
      console.error("CRM-Webhook fehlgeschlagen (Lead wird trotzdem gemailt)", error);
    }
  }

  const ergebnis = await sendMail({
    to: resolveEmpfaenger("leads"),
    replyTo: email,
    subject: leadBetreff(daten, urteil),
    html: leadRumpf(daten, urteil),
  });

  if (ergebnis.ok || webhookOk) return { ok: true };

  /* Beide Wege sind gescheitert — die Anfrage ist verloren.
     Der Notfall-Protokolleintrag ist NICHT standardmaessig an: Er schreibt
     Name, Telefon und E-Mail in die Logs des Hosters (Aufbewahrung je nach
     Tarif, Serverstandort USA). Das ist als letzter Rettungsanker vertretbar
     und allemal besser als Datenverlust — aber es gehoert ins
     Verarbeitungsverzeichnis, und diese Entscheidung trifft der Auftraggeber,
     nicht diese Datei. Einschalten mit LEAD_NOTFALL_LOG=true. */
  if (process.env.LEAD_NOTFALL_LOG === "true") {
    console.error("LEAD-VERLOREN", JSON.stringify(daten));
  } else {
    console.error(
      `LEAD-VERLOREN (Inhalt nicht protokolliert, LEAD_NOTFALL_LOG ist aus) — Grund: ${ergebnis.detail}`
    );
  }
  return { ok: false, error: "send" };
}
