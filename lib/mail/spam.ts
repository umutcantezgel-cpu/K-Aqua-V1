/**
 * Spam-Urteil für die Lead-Formulare.
 *
 * Ersetzt die beiden Zeilen, die bis hierher in `app/actions/lead.ts:15-17`
 * standen. Drei Fehler steckten darin, und der offensichtliche war nicht der
 * schlimmste:
 *
 * **1. Zwei Uhren.** `startedAt` war `Date.now()` auf dem CLIENT, verglichen
 * mit `Date.now()` auf dem SERVER. Geht die Uhr des Besuchers vor, ist die
 * Differenz negativ und die Pruefung greift nie; geht sie nach, schlaegt sie
 * bei echten Menschen zu. Ein Bot setzt den Wert ohnehin frei. Die Pruefung war
 * also gleichzeitig wirkungslos gegen Absicht und schaedlich gegen Zufall.
 * Jetzt misst der Client die verstrichene DAUER mit `performance.now()` — eine
 * Uhr, monoton, immun gegen Zeitzonen und NTP-Spruenge.
 *
 * **2. Der Nullpunkt lag beim Einhaengen.** Bei Klappe und Dialog entsteht das
 * Formular erst beim Oeffnen, die Uhr lief also mit der Einblendanimation los.
 * Wer den Knopf drueckt und den Passwortspeicher beide Felder fuellen laesst,
 * war unter 1,5 s. Jetzt startet die Uhr bei der ersten echten Eingabe.
 *
 * **3. Stiller Erfolg.** Der schwerste Fehler: Eine zu schnelle Eingabe bekam
 * `{ ok: true }` und verschwand. Jetzt wird sie ZUGESTELLT und nur MARKIERT.
 * Damit kosten Fehlalarme nichts mehr — der Vertrieb sieht den Hinweis und
 * entscheidet selbst. Fuer ein B2B-Formular mit wenigen Anfragen pro Woche ist
 * eine verlorene echte Anfrage teurer als zehn markierte Spammails.
 *
 * Der Honigtopf bleibt hart: `firma2` ist kein Feldname, den ein Autofill
 * kennt, und hat praktisch keine Fehlalarme.
 */

export type LeadUrteil =
  | { readonly art: 'bot' }
  | { readonly art: 'verdaechtig'; readonly hinweis: string }
  | { readonly art: 'ok' };

export interface LeadSignale {
  /** Inhalt des versteckten Feldes `firma2`. */
  readonly honeypot: string;
  /** Millisekunden zwischen erster Eingabe und Absenden, oder `null`. */
  readonly elapsedMs: number | null;
}

/** Unter diesem Wert gilt eine Eingabe als auffaellig schnell. */
export const TEMPO_SCHWELLE_MS = 1500;

export function bewerteLead(signale: LeadSignale): LeadUrteil {
  if (signale.honeypot.trim().length > 0) return { art: 'bot' };

  // Fehlende Messung ist KEIN Verdacht. Wer kein `performance.now()` hat oder
  // ein Feld per Tastatur ueberspringt, darf darunter nicht leiden — im
  // Zweifel nie gegen den Nutzer.
  if (signale.elapsedMs === null || !Number.isFinite(signale.elapsedMs)) return { art: 'ok' };
  if (signale.elapsedMs < 0) return { art: 'ok' };

  if (signale.elapsedMs < TEMPO_SCHWELLE_MS) {
    return {
      art: 'verdaechtig',
      hinweis: `Formular in ${Math.round(signale.elapsedMs)} ms abgeschickt (Schwelle ${TEMPO_SCHWELLE_MS} ms).`,
    };
  }
  return { art: 'ok' };
}

/** Liest die Dauer aus dem Formularfeld. Alles Unbrauchbare wird zu `null`. */
export function leseDauer(roh: FormDataEntryValue | null): number | null {
  if (typeof roh !== 'string' || roh.trim().length === 0) return null;
  const zahl = Number(roh);
  return Number.isFinite(zahl) ? zahl : null;
}
