import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail/send";
import { resolveEmpfaenger } from "@/lib/mail/config";
import { esc, bereinigeDateiname } from "@/lib/mail/html";
import type { MailAttachment } from "@/lib/mail/types";
import { spracheDerAnfrage } from "@/lib/mail/sprache";
import { baueBewerbungsbestaetigung } from "@/lib/mail/vorlage/bewerber";
import { getBaseUrl } from "@/lib/env";

/**
 * Nimmt Bewerbungen aus dem Bewerberportal entgegen.
 *
 * Diese Route konnte bis hierher NUR SMTP — `RESEND_API_KEY` kannte sie gar
 * nicht. Wer also Resend einrichtete, hatte funktionierende Kontaktformulare
 * und weiterhin tote Bewerbungen. Jetzt laeuft beides ueber `lib/mail`, und
 * ein Schluessel deckt beide Wege ab.
 */

/**
 * Erlaubte Dateiarten, geschluesselt nach Endung.
 *
 * WARUM NICHT `cv.type`: `File.type` stammt aus dem Browser und ist vom
 * Absender frei waehlbar — der leere String eingeschlossen. Die alte Pruefung
 * lautete `if (cv.type && !ALLOWED_MIME_TYPES.has(cv.type))`, sprang also bei
 * leerem Typ vollstaendig ueber die Pruefung hinweg. Wer den MIME-Teil seiner
 * Anfrage leer laesst, konnte damit eine BELIEBIGE Datei an ein Postfach
 * schicken, das Anhaenge von Fremden erwartet und oeffnet.
 *
 * Die Endung ist ebenfalls nicht vertrauenswuerdig — aber sie stammt aus einer
 * geschlossenen Liste, und der `contentType` wird daraus abgeleitet statt
 * uebernommen. Der Anhang traegt damit nie einen Typ, den der Absender
 * bestimmt hat.
 */
const ERLAUBTE_ENDUNGEN: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

/**
 * 4 MB, nicht 5.
 *
 * Vercel weist Anfragen ueber 4,5 MB ab, BEVOR dieser Handler laeuft. Bei 5 MB
 * starb ein Upload zwischen 4,5 und 5 MB also mit einem nackten 413, und der
 * Bewerber sah nur eine allgemeine Fehlermeldung. Mit 4 MB liegt die Grenze
 * innerhalb dessen, was wir selbst beantworten koennen.
 */
const MAX_FILE_SIZE = 4 * 1024 * 1024;

/** Deckel gegen aufgeblaehte Lebenslauf-Baukasten-Daten. */
const MAX_EINTRAEGE = 30;

function endungVon(name: string): string {
  const teile = name.toLowerCase().split(".");
  return teile.length > 1 ? (teile[teile.length - 1] ?? "") : "";
}

interface BaukastenEintrag {
  role?: unknown;
  company?: unknown;
  degree?: unknown;
  school?: unknown;
  from?: unknown;
  to?: unknown;
}

function baukastenListe(roh: unknown, art: "beruf" | "ausbildung"): string {
  if (!Array.isArray(roh)) return "";
  return roh
    .slice(0, MAX_EINTRAEGE)
    .map((e: BaukastenEintrag) =>
      art === "beruf"
        ? `<li><strong>${esc(e.role)}</strong> bei ${esc(e.company)} (${esc(e.from)} - ${esc(e.to)})</li>`
        : `<li><strong>${esc(e.degree)}</strong> an ${esc(e.school)} (${esc(e.from)} - ${esc(e.to)})</li>`
    )
    .join("");
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const jobId = (formData.get("jobId") as string)?.trim();
    const firstName = (formData.get("firstName") as string)?.trim();
    const lastName = (formData.get("lastName") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const startDate = (formData.get("startDate") as string)?.trim();

    if (!jobId || !firstName || !lastName || !email) {
      return NextResponse.json({ success: false, error: "missing-fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "invalid-email" }, { status: 400 });
    }

    const cv = formData.get("cv") as File | null;
    const experienceRaw = formData.get("experience") as string | null;
    const educationRaw = formData.get("education") as string | null;
    const skills = formData.get("skills") as string | null;

    /* Die Sprache fuer die Bestaetigung.
       Hier gibt es KEINEN referer-Rueckfall wie beim Lead: `/api` ist in
       middleware.ts vom next-intl-Matcher ausgenommen, es kommen also gar
       keine Sprachhinweise an. Das Feld aus dem Formular ist die einzige
       Quelle — sonst Deutsch. */
    const sprache = spracheDerAnfrage(formData.get("locale"), null);

    const attachments: MailAttachment[] = [];
    let builderHtml = "";
    /* Fuer die Bestaetigung: Was der Bewerber geschickt hat, wird ihm genannt.
       Wer eine Bewerbung abschickt, hat genau eine Sorge -- ob die Datei
       wirklich angekommen ist. */
    let cvDateiname: string | undefined;
    let cvGroesse: number | undefined;

    if (cv && typeof cv.size === "number" && cv.size > 0) {
      if (cv.size > MAX_FILE_SIZE) {
        return NextResponse.json({ success: false, error: "file-too-large" }, { status: 400 });
      }
      const endung = endungVon(cv.name);
      const contentType = ERLAUBTE_ENDUNGEN[endung];
      if (!contentType) {
        return NextResponse.json({ success: false, error: "invalid-file-type" }, { status: 400 });
      }
      const roh = Buffer.from(await cv.arrayBuffer());
      attachments.push({
        // `bereinigeDateiname` statt `esc`: HTML-Maskierung im MIME-Header war
        // schlicht falsch (aus "Lebenslauf & CV.pdf" wurde "&amp;"), und sie
        // entfernte kein CR/LF — siehe lib/mail/html.ts.
        filename: bereinigeDateiname(cv.name),
        // Base64 und NICHT Buffer — der Grund steht in lib/mail/types.ts.
        contentBase64: roh.toString("base64"),
        contentType,
      });
      cvDateiname = bereinigeDateiname(cv.name);
      cvGroesse = cv.size;
    } else if (experienceRaw && educationRaw) {
      try {
        const experience: unknown = JSON.parse(experienceRaw);
        const education: unknown = JSON.parse(educationRaw);

        builderHtml = `
          <h3>Generierter Lebenslauf</h3>
          <h4>Berufserfahrung</h4>
          <ul>${baukastenListe(experience, "beruf")}</ul>
          <h4>Ausbildung</h4>
          <ul>${baukastenListe(education, "ausbildung")}</ul>
          <h4>Fähigkeiten</h4>
          <p>${esc(skills) || "Keine angegeben"}</p>
        `;
      } catch (err) {
        console.warn("Lebenslauf-Baukasten: JSON nicht lesbar:", err);
      }
    }

    const htmlBody = `
      <h2>Neue Bewerbung eingegangen</h2>
      <p><strong>Job-ID:</strong> ${esc(jobId)}</p>
      <p><strong>Name:</strong> ${esc(firstName)} ${esc(lastName)}</p>
      <p><strong>E-Mail:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
      <p><strong>Telefon:</strong> ${esc(phone) || "Nicht angegeben"}</p>
      <p><strong>Frühestmögliches Eintrittsdatum:</strong> ${esc(startDate) || "Nicht angegeben"}</p>
      <hr />
      ${builderHtml}
    `;

    const ergebnis = await sendMail({
      to: resolveEmpfaenger("jobs"),
      // Fehlte bisher vollstaendig: Die Personalabteilung konnte auf eine
      // Bewerbung nicht einfach antworten.
      replyTo: email,
      subject: `Neue Bewerbung: ${firstName} ${lastName} (${jobId})`,
      html: htmlBody,
      ...(attachments.length ? { attachments } : {}),
    });

    if (!ergebnis.ok) {
      /* Frueher stand hier `return NextResponse.json({ success: true })` —
         auch dann, wenn nur ein console.log gelaufen war. Ein Bewerber lud
         seinen Lebenslauf hoch, las „gesendet", und niemand erfuhr davon. */
      console.error("Bewerbung konnte nicht zugestellt werden:", ergebnis.detail);
      return NextResponse.json({ success: false, error: "send-failed" }, { status: 502 });
    }

    /* Die Eingangsbestaetigung an den Bewerber.
     *
     * Erst NACH der Zustellung an die Personalabteilung und in einem eigenen
     * try/catch: Die Bewerbung ist wichtiger als die Quittung. Scheitert die
     * Bestaetigung, hat der Bewerber trotzdem eine erfolgreich zugestellte
     * Bewerbung — ihm dafuer einen Fehler zu zeigen waere schlicht falsch.
     *
     * OHNE ANHANG: Der Lebenslauf geht an die Personalabteilung, nicht zurueck
     * an den Absender. Er hat ihn ja.
     */
    try {
      const bestaetigung = baueBewerbungsbestaetigung(
        {
          jobId,
          firstName,
          lastName,
          email,
          ...(phone ? { phone } : {}),
          ...(startDate ? { startDate } : {}),
          ...(cvDateiname ? { cvDateiname } : {}),
          ...(typeof cvGroesse === "number" ? { cvGroesse } : {}),
        },
        sprache,
        getBaseUrl()
      );
      const quittung = await sendMail({
        to: [email],
        replyTo: resolveEmpfaenger("jobs")[0] ?? "jobs@k-aqua.de",
        subject: bestaetigung.subject,
        html: bestaetigung.html,
        text: bestaetigung.text,
      });
      if (!quittung.ok) {
        console.error(
          `Eingangsbestaetigung an den Bewerber nicht zugestellt (die Bewerbung selbst ist angekommen): ${quittung.detail}`
        );
      }
    } catch (fehler) {
      console.error(
        "Eingangsbestaetigung an den Bewerber fehlgeschlagen (die Bewerbung selbst ist angekommen)",
        fehler
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Bewerbung fehlgeschlagen:", error);
    return NextResponse.json({ success: false, error: "server-error" }, { status: 500 });
  }
}
