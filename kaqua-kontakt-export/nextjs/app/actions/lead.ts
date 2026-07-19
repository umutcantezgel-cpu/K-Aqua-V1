// app/actions/lead.ts
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
    phone, email, interest,
    quellSeite: page,
    pfad: h.get("referer") || "",
    sprache: h.get("accept-language")?.split(",")[0] || "",
    zeit: new Date().toISOString(),
  };

  // TODO CRM: an HubSpot/Pipedrive/eigenes Endpoint posten
  // await fetch(process.env.CRM_WEBHOOK_URL!, { method: "POST", body: JSON.stringify(lead) });
  // TODO Vertrieb: Sofort-Benachrichtigung (Email/Slack/Teams) mit tel: Link fuer Rueckruf in Minuten
  console.log("LEAD", lead);

  return { ok: true };
}
