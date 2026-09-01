/**
 * Gemeinsame Typen für den Mailversand.
 *
 * Diese Datei importiert absichtlich nichts. Sie beschreibt eine Nachricht so,
 * wie beide Versandwege sie annehmen können — Resend und nodemailer — ohne dass
 * einer der beiden Namen hier auftaucht. Nur `send.ts` kennt die Pakete.
 */

/**
 * Ein Anhang.
 *
 * `contentBase64` ist bewusst ein String und KEIN Buffer, obwohl beide
 * Bibliotheken laut Typdeklaration `string | Buffer` annehmen:
 *
 * Resend schickt die gesamte Nachricht als JSON über HTTP
 * (`resend/dist/index.mjs`, `body: JSON.stringify(entity)`). Ein Node-Buffer
 * wird dabei zu `{"type":"Buffer","data":[137,80,78,71,…]}` serialisiert — je
 * Byte bis zu vier Zeichen. Aus einem 4-MB-PDF würden rund 14 MB Rumpf, und
 * die Anfrage stirbt am Größenlimit, bevor sie den Anbieter erreicht. Base64
 * kostet dagegen den Faktor 1,37 und ist genau das, was am Ende ohnehin über
 * die Leitung geht.
 *
 * Wer das hier zu `Buffer` „vereinfacht", baut den Fehler zurück ein.
 */
export interface MailAttachment {
  /** Bereits bereinigt: ohne Pfadtrenner, Steuerzeichen und Zeilenumbrüche. */
  readonly filename: string;
  readonly contentBase64: string;
  /** Aus der eigenen Whitelist, NIE aus `File.type` des Browsers. */
  readonly contentType: string;
}

export interface MailMessage {
  readonly to: readonly string[];
  readonly subject: string;
  readonly html: string;
  /**
   * Klartextfassung derselben Nachricht.
   *
   * Eine Mail, die NUR aus HTML besteht, ist aus drei Gruenden schlechter:
   * Spamfilter werten das reine Fehlen eines Textteils als Merkmal, manche
   * Firmenclients und Vorschauzeilen zeigen ausschliesslich den Textteil, und
   * Vorlesegeraete kommen damit besser zurecht als mit einem
   * Tabellenlayout.
   *
   * Beide Versender koennen das: Resend nimmt `text` neben `html`, nodemailer
   * ebenso — es entsteht dann eine `multipart/alternative`-Nachricht.
   */
  readonly text?: string;
  readonly replyTo?: string;
  readonly attachments?: readonly MailAttachment[];
}

/** Welcher Weg die Nachricht genommen hat — auch für die Diagnose. */
export type MailChannel = 'resend' | 'smtp' | 'console' | 'none';

/**
 * Fehlerklassen, die der Kunde ohne Vorwissen zuordnen kann. Die Zuordnung von
 * Anbietermeldung zu Klasse steht in `diagnose.ts` und ist dort geprüft.
 */
export type MailFailure =
  | 'not-configured'
  | 'auth'
  | 'sender'
  | 'recipient'
  | 'network'
  | 'provider';

export type MailResult =
  | { readonly ok: true; readonly channel: MailChannel; readonly id?: string }
  | {
      readonly ok: false;
      readonly channel: MailChannel;
      readonly reason: MailFailure;
      /** Klartext für Terminal und Log. Enthält nie einen Schlüssel. */
      readonly detail: string;
    };
