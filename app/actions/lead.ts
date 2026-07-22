"use server";
import { headers } from "next/headers";
import nodemailer from "nodemailer";

export interface LeadResult { ok: boolean; error?: string }

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));

export async function submitLead(formData: FormData): Promise<LeadResult> {
  // Honeypot + Zeitschwelle statt Captcha
  if (formData.get("firma2")) return { ok: true }; // Bot: still schlucken
  const startedAt = Number(formData.get("startedAt") || 0);
  if (startedAt && Date.now() - startedAt < 1500) return { ok: true };

  const cc = String(formData.get("cc") || "").trim();
  const phoneRaw = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const interest = String(formData.get("interest") || "");
  const page = String(formData.get("page") || "fallback");

  if (!phoneRaw) return { ok: false, error: "phone" };
  if (!/.+@.+\..+/.test(email)) return { ok: false, error: "email" };

  const phone = cc ? `${cc} ${phoneRaw}` : phoneRaw;
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

  // CRM-Webhook ist optional und darf den Lead nie blockieren
  if (process.env.CRM_WEBHOOK_URL) {
    try {
      await fetch(process.env.CRM_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch (error) {
      console.error("CRM-Webhook fehlgeschlagen (Lead wird trotzdem gemailt)", error);
    }
  }

  const cleanPhone = phone.replace(/[^0-9+]/g, "");
  const htmlBody = `
    <h2>Neue Anfrage über k-aqua.de</h2>
    <p><strong>Interesse:</strong> ${esc(interest || "Kontakt")}</p>
    <p><strong>Telefon:</strong> <a href="tel:${esc(cleanPhone)}">${esc(phone)}</a></p>
    <p><strong>E-Mail:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
    <hr />
    <p><strong>Quellseite:</strong> ${esc(page)}</p>
    <p><strong>Pfad:</strong> ${esc(lead.pfad)}</p>
    <p><strong>Sprache:</strong> ${esc(lead.sprache)}</p>
    <p><strong>Zeit:</strong> ${lead.zeit}</p>
    <p>Ziel: Rückruf innerhalb von Minuten.</p>
  `;

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"K-Aqua Website" <noreply@k-aqua.de>`,
        to: "info@k-aqua.de",
        replyTo: email,
        subject: `Neue Anfrage: ${interest || "Kontakt"} (${page})`,
        html: htmlBody,
      });
    } catch (error) {
      console.error("Lead-E-Mail fehlgeschlagen", error);
      return { ok: false, error: "send" };
    }
  } else {
    // Mock für Entwicklung ohne SMTP-Zugangsdaten (gleiches Muster wie /api/apply)
    console.log("=== LEAD-EMAIL MOCK (keine SMTP-Zugangsdaten) ===");
    console.log(`To: info@k-aqua.de · Reply-To: ${email}`);
    console.log(`Subject: Neue Anfrage: ${interest || "Kontakt"} (${page})`);
    console.log(JSON.stringify(lead, null, 2));
    console.log("=================================================");
  }

  return { ok: true };
}
