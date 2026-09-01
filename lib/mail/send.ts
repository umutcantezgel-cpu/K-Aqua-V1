import { kanalName, resolveMailConfig, type MailConfig } from './config';
import { diagnoseMailFehler } from './diagnose';
import type { MailMessage, MailResult } from './types';

/**
 * Der einzige Ort im Projekt, der `resend` oder `nodemailer` kennt.
 *
 * Beide werden DYNAMISCH importiert — so wie es `app/api/apply/route.ts:97`
 * schon vorgemacht hat. Der ungenutzte Versandweg landet damit nie im
 * Serverless-Bündel.
 */

/**
 * Wandelt einen Anhang in die Form, die Resend erwartet.
 *
 * `content` ist der Base64-String, NICHT der Buffer. Der Grund steht
 * ausführlich in `types.ts` bei `MailAttachment` — kurz: Resend schickt die
 * Nachricht als JSON, und ein Buffer bläht sich dabei auf das Vierfache auf.
 */
function anhaengeFuerResend(nachricht: MailMessage) {
  return nachricht.attachments?.map((a) => ({
    filename: a.filename,
    content: a.contentBase64,
    contentType: a.contentType,
  }));
}

/**
 * Dieselben Anhänge für nodemailer.
 *
 * Der einzige Unterschied zum Resend-Zweig ist `encoding: 'base64'`. Ohne das
 * würde nodemailer den Base64-String als Klartext anhängen, und der Empfänger
 * bekäme eine Textdatei voller Buchstaben statt eines PDF.
 */
function anhaengeFuerSmtp(nachricht: MailMessage) {
  return nachricht.attachments?.map((a) => ({
    filename: a.filename,
    content: a.contentBase64,
    encoding: 'base64',
    contentType: a.contentType,
  }));
}

async function sendeUeberResend(
  nachricht: MailMessage,
  config: Extract<MailConfig, { channel: 'resend' }>
): Promise<MailResult> {
  try {
    const { Resend } = await import('resend');
    const client = new Resend(config.apiKey);
    const { data, error } = await client.emails.send({
      from: config.from,
      // Spread, weil `MailMessage.to` `readonly string[]` ist und die
      // Bibliothek ein veränderliches Array erwartet. Eine Zusicherung waere
      // hier die faule Variante.
      to: [...nachricht.to],
      ...(nachricht.replyTo ? { replyTo: nachricht.replyTo } : {}),
      subject: nachricht.subject,
      html: nachricht.html,
      ...(nachricht.text ? { text: nachricht.text } : {}),
      ...(nachricht.attachments?.length ? { attachments: anhaengeFuerResend(nachricht) } : {}),
    });
    if (error) {
      const { reason, detail } = diagnoseMailFehler(error, 'resend');
      console.error('[mail] Resend hat abgelehnt:', detail, error);
      return { ok: false, channel: 'resend', reason, detail };
    }
    return { ok: true, channel: 'resend', ...(data?.id ? { id: data.id } : {}) };
  } catch (fehler) {
    const { reason, detail } = diagnoseMailFehler(fehler, 'resend');
    console.error('[mail] Resend-Aufruf fehlgeschlagen:', detail, fehler);
    return { ok: false, channel: 'resend', reason, detail };
  }
}

async function sendeUeberSmtp(
  nachricht: MailMessage,
  config: Extract<MailConfig, { channel: 'smtp' }>
): Promise<MailResult> {
  try {
    const nodemailer = (await import('nodemailer')).default;
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: { user: config.user, pass: config.pass },
    });
    const info = await transporter.sendMail({
      from: config.from,
      to: [...nachricht.to],
      ...(nachricht.replyTo ? { replyTo: nachricht.replyTo } : {}),
      subject: nachricht.subject,
      html: nachricht.html,
      ...(nachricht.text ? { text: nachricht.text } : {}),
      ...(nachricht.attachments?.length ? { attachments: anhaengeFuerSmtp(nachricht) } : {}),
    });
    return { ok: true, channel: 'smtp', ...(info?.messageId ? { id: info.messageId } : {}) };
  } catch (fehler) {
    const { reason, detail } = diagnoseMailFehler(fehler, 'smtp');
    console.error('[mail] SMTP-Versand fehlgeschlagen:', detail, fehler);
    return { ok: false, channel: 'smtp', reason, detail };
  }
}

function protokolliere(
  nachricht: MailMessage,
  config: Extract<MailConfig, { channel: 'console' }>
): MailResult {
  const grund =
    config.grund === 'explizit' ? 'MAIL_TRANSPORT=console' : 'Entwicklungsumgebung ohne Zugangsdaten';
  console.log(`=== MAIL-MOCK (${grund}) — es wird NICHTS versendet ===`);
  console.log(`Von:      ${config.from}`);
  console.log(`An:       ${nachricht.to.join(', ')}`);
  if (nachricht.replyTo) console.log(`Antwort:  ${nachricht.replyTo}`);
  console.log(`Betreff:  ${nachricht.subject}`);
  if (nachricht.attachments?.length) {
    for (const a of nachricht.attachments) {
      const kb = Math.round((a.contentBase64.length * 0.75) / 1024);
      console.log(`Anhang:   ${a.filename} (${a.contentType}, ~${kb} kB)`);
    }
  }
  console.log(nachricht.html);
  console.log('='.repeat(60));
  return { ok: true, channel: 'console' };
}

/**
 * Versendet eine Nachricht über den konfigurierten Weg.
 *
 * Der `switch` ist erschöpfend über eine unterschiedene Union und hat bewusst
 * KEINEN `default`-Zweig: Kommt ein Kanal hinzu, beanstandet TypeScript die
 * fehlende Behandlung, statt sie stillschweigend durchfallen zu lassen.
 */
export async function sendMail(
  nachricht: MailMessage,
  config: MailConfig = resolveMailConfig()
): Promise<MailResult> {
  switch (config.channel) {
    case 'resend':
      return sendeUeberResend(nachricht, config);
    case 'smtp':
      return sendeUeberSmtp(nachricht, config);
    case 'console':
      return protokolliere(nachricht, config);
    case 'none': {
      const { reason, detail } = diagnoseMailFehler(null, 'none');
      console.error(`[mail] Versand nicht moeglich — ${kanalName('none')}. ${detail}`);
      return { ok: false, channel: 'none', reason, detail };
    }
  }
}
