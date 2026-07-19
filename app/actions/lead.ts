"use server";
import { headers } from "next/headers";

export interface LeadResult { ok: boolean; error?: string }

export async function submitLead(formData: FormData): Promise<LeadResult> {
  // Honeypot + Zeitschwelle statt Captcha
  if (formData.get("firma2")) return { ok: true }; // Bot: still schlucken
  const startedAt = Number(formData.get("startedAt") || 0);
  if (startedAt && Date.now() - startedAt < 1500) return { ok: true };

  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const interest = String(formData.get("interest") || "");
  const page = String(formData.get("page") || "fallback");
  
  if (!phone) return { ok: false, error: "phone" };
  if (!/.+@.+\..+/.test(email)) return { ok: false, error: "email" };

  const h = await headers();
  const lead = {
    phone, 
    email, 
    interest,
    quellSeite: page,
    pfad: h.get("referer") || "",
    sprache: h.get("accept-language")?.split(",")[0] || "",
    zeit: new Date().toISOString(),
  };

  try {
    // 1. CRM Webhook (falls ENV gesetzt)
    if (process.env.CRM_WEBHOOK_URL) {
      await fetch(process.env.CRM_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    }

    // 2. Sofort-Benachrichtigung an den Vertrieb mit tel: Link (Mock/Console fuer nun)
    // Im echten System waere das z.B. eine Slack/Teams API oder Email.
    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    console.log(`
      🚨 NEUER LEAD: ${interest}
      ---------------------------------
      Quelle: ${page}
      Email: ${email}
      Tel: ${phone} -> Klick fuer Rueckruf: tel:${cleanPhone}
      
      Ziel: Rueckruf innerhalb von Minuten!
    `);
  } catch (error) {
    console.error("Fehler beim Verarbeiten des Leads", error);
    // Den User nicht stoeren, falls CRM hakt
  }

  return { ok: true };
}
