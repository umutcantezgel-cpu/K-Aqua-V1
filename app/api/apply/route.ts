import { NextResponse } from "next/server";

function esc(str: unknown): string {
  if (typeof str !== "string") return "";
  return str.replace(/[&<>'"]/g, (tag) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  }[tag] || tag));
}

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

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
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email format" }, { status: 400 });
    }

    const cv = formData.get("cv") as File | null;
    const experienceRaw = formData.get("experience") as string | null;
    const educationRaw = formData.get("education") as string | null;
    const skills = formData.get("skills") as string | null;

    const attachments: { filename: string; content: Buffer; contentType: string }[] = [];
    let builderHtml = "";

    if (cv && typeof cv.size === "number" && cv.size > 0) {
      if (cv.size > MAX_FILE_SIZE) {
        return NextResponse.json({ success: false, error: "File exceeds 5MB limit" }, { status: 400 });
      }
      if (cv.type && !ALLOWED_MIME_TYPES.has(cv.type)) {
        return NextResponse.json({ success: false, error: "Invalid file format. Allowed: PDF, DOC, DOCX" }, { status: 400 });
      }
      const buffer = Buffer.from(await cv.arrayBuffer());
      attachments.push({
        filename: esc(cv.name) || "Lebenslauf.pdf",
        content: buffer,
        contentType: cv.type || "application/pdf",
      });
    } else if (experienceRaw && educationRaw) {
      try {
        const experience = JSON.parse(experienceRaw);
        const education = JSON.parse(educationRaw);
        
        builderHtml = `
          <h3>Generierter Lebenslauf</h3>
          <h4>Berufserfahrung</h4>
          <ul>
            ${Array.isArray(experience) ? experience.map((e: { role: string; company: string; from: string; to: string }) => `<li><strong>${esc(e.role)}</strong> bei ${esc(e.company)} (${esc(e.from)} - ${esc(e.to)})</li>`).join("") : ""}
          </ul>
          <h4>Ausbildung</h4>
          <ul>
            ${Array.isArray(education) ? education.map((e: { degree: string; school: string; from: string; to: string }) => `<li><strong>${esc(e.degree)}</strong> an ${esc(e.school)} (${esc(e.from)} - ${esc(e.to)})</li>`).join("") : ""}
          </ul>
          <h4>Fähigkeiten</h4>
          <p>${esc(skills) || 'Keine angegeben'}</p>
        `;
      } catch (err) {
        console.warn("Could not parse builder experience/education JSON:", err);
      }
    }

    const htmlBody = `
      <h2>Neue Bewerbung eingegangen</h2>
      <p><strong>Job-ID:</strong> ${esc(jobId)}</p>
      <p><strong>Name:</strong> ${esc(firstName)} ${esc(lastName)}</p>
      <p><strong>E-Mail:</strong> ${esc(email)}</p>
      <p><strong>Telefon:</strong> ${esc(phone) || "Nicht angegeben"}</p>
      <p><strong>Frühestmögliches Eintrittsdatum:</strong> ${esc(startDate) || "Nicht angegeben"}</p>
      <hr />
      ${builderHtml}
    `;

    // Try to send via SMTP if configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const nodemailer = (await import("nodemailer")).default;
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
        from: process.env.SMTP_FROM || `"K-Aqua Bewerberportal" <noreply@k-aqua.de>`,
        to: "jobs@k-aqua.de",
        subject: `Neue Bewerbung: ${firstName} ${lastName} (${jobId})`,
        html: htmlBody,
        attachments,
      });
    } else {
      // Mock for development
      console.log("=== EMAIL MOCK (No SMTP credentials found) ===");
      console.log(`To: jobs@k-aqua.de`);
      console.log(`Subject: Neue Bewerbung: ${firstName} ${lastName} (${jobId})`);
      console.log(`Attachments: ${attachments.length}`);
      console.log("HTML Body:");
      console.log(htmlBody);
      console.log("==============================================");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Application submission failed:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
