import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const jobId = formData.get("jobId") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const startDate = formData.get("startDate") as string;

    const cv = formData.get("cv") as File | null;
    const experienceRaw = formData.get("experience") as string | null;
    const educationRaw = formData.get("education") as string | null;
    const skills = formData.get("skills") as string | null;

    let attachments: any[] = [];
    let builderHtml = "";

    if (cv) {
      const buffer = Buffer.from(await cv.arrayBuffer());
      attachments.push({
        filename: cv.name,
        content: buffer,
        contentType: cv.type,
      });
    } else if (experienceRaw && educationRaw) {
      const experience = JSON.parse(experienceRaw);
      const education = JSON.parse(educationRaw);
      
      builderHtml = `
        <h3>Generierter Lebenslauf</h3>
        <h4>Berufserfahrung</h4>
        <ul>
          ${experience.map((e: any) => `<li><strong>${e.role}</strong> bei ${e.company} (${e.from} - ${e.to})</li>`).join("")}
        </ul>
        <h4>Ausbildung</h4>
        <ul>
          ${education.map((e: any) => `<li><strong>${e.degree}</strong> an ${e.school} (${e.from} - ${e.to})</li>`).join("")}
        </ul>
        <h4>Fähigkeiten</h4>
        <p>${skills || 'Keine angegeben'}</p>
      `;
    }

    const htmlBody = `
      <h2>Neue Bewerbung eingegangen</h2>
      <p><strong>Job-ID:</strong> ${jobId}</p>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>E-Mail:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${phone || "Nicht angegeben"}</p>
      <p><strong>Frühestmögliches Eintrittsdatum:</strong> ${startDate || "Nicht angegeben"}</p>
      <hr />
      ${builderHtml}
    `;

    // Try to send via SMTP if configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
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
        to: "andrea.nickel@k-aqua.de",
        subject: `Neue Bewerbung: ${firstName} ${lastName} (${jobId})`,
        html: htmlBody,
        attachments,
      });
    } else {
      // Mock for development
      console.log("=== EMAIL MOCK (No SMTP credentials found) ===");
      console.log(`To: andrea.nickel@k-aqua.de`);
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
