/**
 * Textaufbereitung für Mailinhalte.
 *
 * `esc` stand bisher zweimal im Baum — in `app/actions/lead.ts` und in
 * `app/api/apply/route.ts` — mit unterschiedlicher Reihenfolge der
 * Ersetzungen und unterschiedlichem Verhalten bei Nicht-Strings. Zwei Kopien
 * einer Maskierungsfunktion sind genau die Sorte Verdopplung, die still
 * auseinanderläuft: Wer die eine härtet, härtet die andere nicht mit.
 */

const ERSATZ: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/**
 * Maskiert HTML-Sonderzeichen für den Nachrichtenrumpf.
 *
 * Nimmt `unknown`, weil die Aufrufer aus `FormData` und aus `JSON.parse`
 * speisen — dort ist zur Übersetzungszeit nichts garantiert. Alles, was kein
 * String ist, wird zu einer leeren Zeichenkette; das ist die Fassung aus
 * `apply/route.ts` und die belastbarere von beiden.
 *
 * `?? c` statt der frueheren `as string`-Zusicherung: Unter
 * `noUncheckedIndexedAccess` liefert der Zugriff `string | undefined`, und ein
 * Cast wuerde die Pruefung nur stummschalten statt den Fall zu behandeln.
 */
export function esc(wert: unknown): string {
  if (typeof wert !== 'string') return '';
  return wert.replace(/[&<>"']/g, (c) => ERSATZ[c] ?? c);
}

/** Maskiert und wandelt Zeilenumbrüche in `<br />` — für mehrzeilige Felder. */
export function escMehrzeilig(wert: unknown): string {
  return esc(wert).replace(/\n/g, '<br />');
}

/**
 * Entfernt Steuerzeichen (C0-Bereich und DEL) aus einer Zeichenkette.
 *
 * Bewusst als Codepunkt-Vergleich und NICHT als regulärer Ausdruck: Ein
 * Zeichenklassen-Ausdruck für diesen Bereich enthält die Steuerzeichen
 * entweder wörtlich — dann stehen unsichtbare Zeichen im Quelltext, die jede
 * Formatierung und jedes Kopieren still zerstören kann — oder als
 * Escape-Folgen, die manche Werkzeugkette vorher auflöst. Beides ist mir beim
 * Schreiben dieser Datei tatsächlich passiert. Diese Fassung besteht
 * ausschließlich aus druckbaren Zeichen und ist damit unkaputtbar.
 *
 * Nebeneffekt: kein `eslint-disable` für `no-control-regex` nötig.
 */
function ohneSteuerzeichen(text: string): string {
  let ergebnis = '';
  for (const zeichen of text) {
    const cp = zeichen.codePointAt(0) ?? 0;
    if (cp < 0x20 || cp === 0x7f) continue;
    ergebnis += zeichen;
  }
  return ergebnis;
}

/**
 * Bereinigt einen hochgeladenen Dateinamen für den MIME-Header.
 *
 * Das ist NICHT dieselbe Aufgabe wie `esc`, auch wenn `apply/route.ts` bisher
 * `esc(cv.name)` benutzt hat. Zwei Gründe:
 *
 *  1. HTML-Maskierung ist im Dateinamen schlicht falsch. Aus
 *     `Lebenslauf & CV.pdf` wurde `Lebenslauf &amp; CV.pdf` — genau so kam es
 *     in der Personalabteilung an.
 *  2. `esc` entfernt kein CR/LF. Ein Dateiname mit Zeilenumbruch kann in einem
 *     Mail-Header zusätzliche Kopfzeilen einschleusen. Genau davor sollte die
 *     Maskierung an dieser Stelle vermutlich schützen — sie tat es nicht.
 *
 * Entfernt werden Steuerzeichen, Anführungszeichen und Pfadtrenner; die Länge
 * wird gekappt. Der Name ist Beiwerk, der Inhalt zählt: Bleibt nichts übrig,
 * gilt der Vorgabename.
 */
export function bereinigeDateiname(name: unknown, vorgabe = 'Lebenslauf.pdf'): string {
  if (typeof name !== 'string') return vorgabe;
  const sauber = ohneSteuerzeichen(name)
    .replace(/[\\/]/g, '_')
    .replace(/["']/g, '')
    .trim()
    .slice(0, 120);
  return sauber.length > 0 ? sauber : vorgabe;
}
