import { esc, escMehrzeilig } from '../html';
import { FARBE, ABSTAND, BREITE, SCHRIFT, ZEILE, FAMILIE, FAMILIE_AR, RADIUS } from './tokens';
import type { Mailsprache } from '../sprache';

/**
 * Die Bausteine, aus denen jede K-Aqua-Mail besteht.
 *
 * Jeder gibt einen HTML-String zurück und hat keine Seiteneffekte — damit ist
 * jeder einzeln prüfbar, ohne eine Mail zu senden oder etwas zu mocken.
 *
 * WARUM TABELLEN: Outlook Desktop rendert HTML mit der Word-Engine. `flex`,
 * `grid`, `float` und `position` tun dort nichts. Verschachtelte Tabellen sind
 * nicht Nostalgie, sondern das einzige Layoutmodell, das überall gleich
 * ankommt. `role="presentation"` sagt Vorlesegeräten, dass es Layout ist und
 * keine Daten — ohne das liest ein Screenreader „Tabelle mit 3 Zeilen" vor,
 * bevor der eigentliche Text kommt.
 *
 * WARUM ALLES INLINE: Gmail behält einen `<style>`-Block im `<head>`, andere
 * Programme werfen ihn weg. Ein Entwurf, der davon abhängt, sieht bei jedem
 * Zweiten anders aus. `<style>` wird hier nur für Dinge benutzt, die ohne ihn
 * lediglich etwas schlichter aussehen — nie für Tragendes.
 */

export interface Satzkontext {
  readonly sprache: Mailsprache;
  readonly dir: 'ltr' | 'rtl';
}

/** Textausrichtung am Zeilenanfang — links, im Arabischen rechts. */
function anfang(k: Satzkontext): string {
  return k.dir === 'rtl' ? 'right' : 'left';
}

function familie(k: Satzkontext): string {
  return k.sprache === 'ar' ? FAMILIE_AR : FAMILIE;
}

/* Die Groessen- und Farbparameter sind ausdruecklich `number` und `string`.
   Ohne die Annotation leitet TypeScript aus dem `as const` der Tokens den
   LITERALTYP des Vorgabewerts ab (`16` statt `number`), und dann laesst sich
   die Funktion mit keinem anderen Token mehr aufrufen. */
function textstil(k: Satzkontext, groesse: number = SCHRIFT.text, farbe: string = FARBE.text): string {
  return `margin:0;font-family:${familie(k)};font-size:${groesse}px;line-height:${ZEILE.normal};color:${farbe};text-align:${anfang(k)};`;
}

/**
 * Der Vorschautext.
 *
 * Die Zeile, die Gmail, Apple Mail und Outlook neben dem Betreff anzeigen.
 * Setzt man sie nicht, nehmen die Programme die ersten Wörter aus dem Markup —
 * oft „Wenn diese Mail nicht richtig angezeigt wird" oder schlicht den
 * Firmennamen. Das ist verschenkter Platz an der auffälligsten Stelle.
 *
 * Die Kette aus Nullbreiten-Leerzeichen dahinter verhindert, dass der
 * Posteingang zusätzlich den Anfang des sichtbaren Textes anhängt.
 */
export function vorschautext(text: string): string {
  /* Nur zehn Wiederholungen, nicht dreissig.
     Die Kette schiebt den sichtbaren Text aus der Vorschauzeile — dafuer
     reicht das. Lange Ketten aus Nullbreiten-Zeichen sind bei Spamfiltern
     selbst ein Merkmal (Zeichenverschleierung), man kauft sich also mit
     Uebereifer genau das Problem ein, das man vermeiden will. */
  const fueller = '&#847;&zwnj;&nbsp;&#8199;&#65279;'.repeat(10);
  return (
    `<div style="display:none;font-size:1px;color:${FARBE.grund};line-height:1px;` +
    `max-height:0;max-width:0;opacity:0;overflow:hidden;">${esc(text)}${fueller}</div>`
  );
}

/**
 * Der Kopfbalken.
 *
 * Volltonfläche in der Markenfarbe, darauf die weiße Wortmarke. Kein Verlauf
 * als Grundlage: `linear-gradient` fällt in Outlook ersatzlos aus, dort bliebe
 * ein weißer Balken mit weißer Schrift. Der Verlauf steht deshalb nur als
 * `background-image` ZUSÄTZLICH zur Vollfarbe — wo er geht, wertet er auf; wo
 * nicht, merkt es niemand.
 *
 * ENTSCHEIDEND: Die meisten Empfänger sehen die Mail zuerst OHNE BILDER.
 * Deshalb trägt die Fläche den Kopf, nicht das Logo. Fehlt das Bild, steht der
 * `alt`-Text in Weiß auf Violett — der Kopf sieht schlichter aus, aber er
 * steht.
 */
export function kopfbalken(k: Satzkontext, opt: { logoUrl: string; unterzeile: string }): string {
  /* ZWEI ZEILEN, nicht eine — und das ist eine Korrektur aus der Vorschau.
   *
   * Zuerst stand das Logo direkt auf dem Markenbalken. Dafuer braeuchte es
   * eine weisse Fassung, und die laesst sich aus dieser Vorlage nicht sauber
   * gewinnen: Die Bildmarke ist ein Quadrat in Schriftgrau mit einem
   * violetten K darauf. Faerbt man beides weiss, verschwindet das K im
   * Quadrat; laesst man das K violett, verschwindet es auf dem violetten
   * Grund. Ein echter Knockout muesste das K als Loch stanzen, und dafuer
   * fehlt der Vektorquelle die Trennung — Quadrat und Wortmarke teilen sich
   * dieselbe Farbe.
   *
   * Statt die Marke zu vereinfachen, bekommt sie ihre eigene Flaeche: weisses
   * Feld mit dem Logo in Originalfarben, darunter der Markenbalken mit der
   * Bezugszeile. Das ist zugleich robuster — auf Weiss ist das Logo in jedem
   * Programm und in jedem Dunkelmodus lesbar. */
  return `
<tr>
  <td align="center" bgcolor="${FARBE.karte}" style="background-color:${FARBE.karte};padding:${ABSTAND.lg}px ${BREITE.innenrand}px ${ABSTAND.md}px;">
    <!-- Der alt-Text ist absichtlich kurz.
         Er ist das, was ein Teil der Empfaenger hier SIEHT, weil Outlook und
         viele Firmenclients Bilder blockieren. "K-Aqua – KWT GmbH" brach
         dort auf zwei Zeilen um; der Markenname allein steht sauber. -->
    <img src="${esc(opt.logoUrl)}" width="180" height="57" alt="K-Aqua"
         style="display:block;border:0;outline:none;text-decoration:none;width:180px;height:57px;color:${FARBE.marke};font-family:${familie(k)};font-size:${SCHRIFT.h2}px;font-weight:700;" />
  </td>
</tr>
<tr>
  <td align="center" bgcolor="${FARBE.marke}" style="background-color:${FARBE.marke};background-image:linear-gradient(135deg,${FARBE.marke} 0%,#0081A5 100%);padding:${ABSTAND.sm}px ${BREITE.innenrand}px;">
    <p style="margin:0;font-family:${familie(k)};font-size:${SCHRIFT.zweit}px;line-height:${ZEILE.eng};color:${FARBE.aufMarke};letter-spacing:0.1em;text-transform:uppercase;font-weight:600;">${esc(opt.unterzeile)}</p>
  </td>
</tr>`;
}

/**
 * Kopfbalken ohne Bild — für die internen Mails.
 *
 * Sie gehen an den eigenen Vertrieb und die eigene Personalabteilung. Ein
 * Logo, das dort erst nach einem Klick auf „Bilder laden" erscheint, hilft
 * niemandem; der Titel sagt in derselben Zeile mehr. Und ein `<img>` mit
 * leerem `src`, nur damit der Baustein wiederverwendbar bleibt, fordert in
 * manchen Programmen einen Abruf der Seite selbst an.
 */
export function kopfbalkenText(k: Satzkontext, titel: string): string {
  return `
<tr>
  <td align="center" bgcolor="${FARBE.marke}" style="background-color:${FARBE.marke};padding:${ABSTAND.md}px ${BREITE.innenrand}px;">
    <p style="margin:0;font-family:${familie(k)};font-size:${SCHRIFT.lead}px;line-height:${ZEILE.eng};font-weight:700;color:${FARBE.aufMarke};">${esc(titel)}</p>
  </td>
</tr>`;
}

/** Ein Inhaltsabschnitt auf der weißen Karte. */
export function abschnitt(inhalt: string, opt?: { oben?: number; unten?: number }): string {
  const oben = opt?.oben ?? ABSTAND.lg;
  const unten = opt?.unten ?? 0;
  return `
<tr>
  <td style="padding:${oben}px ${BREITE.innenrand}px ${unten}px;">${inhalt}</td>
</tr>`;
}

export function ueberschrift(k: Satzkontext, text: string, stufe: 1 | 2 | 3 = 2): string {
  const groesse = stufe === 1 ? SCHRIFT.h1 : stufe === 2 ? SCHRIFT.h2 : SCHRIFT.h3;
  return `<h${stufe} style="margin:0 0 ${ABSTAND.sm}px;font-family:${familie(k)};font-size:${groesse}px;line-height:${ZEILE.eng};font-weight:700;color:${FARBE.text};text-align:${anfang(k)};">${esc(text)}</h${stufe}>`;
}

export function absatz(k: Satzkontext, text: string, opt?: { zweit?: boolean; abstandUnten?: number }): string {
  const farbe = opt?.zweit ? FARBE.textZweit : FARBE.text;
  const unten = opt?.abstandUnten ?? ABSTAND.sm;
  return `<p style="${textstil(k, SCHRIFT.text, farbe)}margin-bottom:${unten}px;">${escMehrzeilig(text)}</p>`;
}

/**
 * Kleine Auszeichnungszeile über einer Überschrift.
 *
 * Auf der Website steht davor ein 6 px breiter Akzentstrich
 * (`components/ui/Eyebrow.tsx`). In E-Mail ist ein solcher Strich als eigene
 * Tabellenzelle nachbaubar; hier genügt die Farbe, weil der Strich bei
 * schmaler Spalte mehr stört als hilft.
 */
export function auszeichnung(k: Satzkontext, text: string): string {
  return `<p style="margin:0 0 ${ABSTAND.xs}px;font-family:${familie(k)};font-size:${SCHRIFT.klein}px;line-height:${ZEILE.eng};font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${FARBE.akzentStark};text-align:${anfang(k)};">${esc(text)}</p>`;
}

export interface Datenzeile {
  readonly label: string;
  /** Bereits maskierter HTML-Inhalt, z. B. ein `mailto:`-Verweis. */
  readonly wertHtml: string;
  /**
   * Normalgewicht statt halbfett.
   *
   * Kurze Werte — ein Name, eine Nummer — vertragen die Auszeichnung und
   * gewinnen dadurch an Halt. Ein mehrzeiliger Fliesstext im selben Gewicht
   * wirkt dagegen wie ein Schreiblaut: In der Vorschau stand die ganze
   * Kundennachricht halbfett und erschlug alles darum.
   */
  readonly leicht?: boolean;
}

/**
 * Die Zusammenfassung der eigenen Angaben.
 *
 * Zwei Spalten im Verhältnis 205 / 331 — der goldene Schnitt des 536 px
 * breiten Satzspiegels. Die Beschriftung braucht weniger Platz als der Wert,
 * und genau in diesem Verhältnis wirkt die Teilung ruhig statt zufällig.
 *
 * Auf schmalen Fenstern bricht die Zeile nicht um: Bei 600 px Außenbreite und
 * einem Telefon in Hochkant staucht das Programm die Tabelle gleichmäßig. Ein
 * Umbruch über Media Queries wäre möglich, hinge aber am `<style>`-Block —
 * und der überlebt nicht überall.
 */
export function datentabelle(k: Satzkontext, zeilen: readonly Datenzeile[]): string {
  if (zeilen.length === 0) return '';
  const inhalt = zeilen
    .map(
      (z, i) => `
      <tr>
        <td width="${BREITE.spalteLabel}" style="width:${BREITE.spalteLabel}px;padding:${i === 0 ? 0 : ABSTAND.sm}px 0 0;vertical-align:top;font-family:${familie(k)};font-size:${SCHRIFT.zweit}px;line-height:${ZEILE.normal};color:${FARBE.textZweit};text-align:${anfang(k)};">${esc(z.label)}</td>
        <td width="${BREITE.spalteWert}" style="width:${BREITE.spalteWert}px;padding:${i === 0 ? 0 : ABSTAND.sm}px 0 0;vertical-align:top;font-family:${familie(k)};font-size:${SCHRIFT.text}px;line-height:${ZEILE.normal};color:${FARBE.text};font-weight:${z.leicht ? 400 : 600};text-align:${anfang(k)};">${z.wertHtml}</td>
      </tr>`
    )
    .join('');

  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" dir="${k.dir}"
       style="width:100%;border-collapse:collapse;background-color:${FARBE.grund};border:1px solid ${FARBE.rahmen};border-radius:${RADIUS.karte}px;">
  <tr><td style="padding:${ABSTAND.md}px;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;">${inhalt}
    </table>
  </td></tr>
</table>`;
}

/**
 * Ein Knopf, der überall ankommt.
 *
 * Die Fläche liegt auf der Tabellenzelle (`bgcolor` UND `background-color` —
 * Outlook liest das Attribut, moderne Programme den Stil), der Innenabstand
 * auf dem `<a>`. So ist die ganze Fläche klickbar, auch wenn das Programm
 * Zellenpolsterung ignoriert.
 *
 * Kein VML für runde Ecken: Outlook zeigt dann eben eine rechteckige Fläche.
 * Das ist ein Schönheitsfehler, kein Funktionsfehler — und VML-Blöcke sind
 * eine bekannte Quelle für kaputtes Markup in Programmen, die sie nicht
 * erwarten.
 */
export function knopf(k: Satzkontext, opt: { text: string; href: string }): string {
  /* Die Polsterung liegt auf `border`, NICHT auf `padding`.
   *
   * Das sieht wie ein Kunstgriff aus und ist einer, aber ein noetiger: Der
   * Word-Renderer in Outlook Desktop ignoriert `padding` an Inline-Elementen,
   * setzt `border` aber um. Mit Polsterung waere die Flaeche dort zwar richtig
   * gefaerbt, klickbar aber nur die rund 20 px hohe Textzeile in der Mitte —
   * der Knopf saehe aus wie ein Knopf und waere keiner.
   *
   * `mso-padding-alt:0` verhindert, dass Outlook zusaetzlich eigene Polsterung
   * erfindet. Die Randfarbe ist dieselbe wie die Flaeche, deshalb sieht man
   * den Rand nicht. */
  const rand = `14px solid ${FARBE.marke}`;
  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
  <tr>
    <td align="center" bgcolor="${FARBE.marke}" style="background-color:${FARBE.marke};border-radius:${RADIUS.knopf}px;mso-padding-alt:0;">
      <a href="${esc(opt.href)}" style="display:inline-block;border-top:${rand};border-bottom:${rand};border-left:28px solid ${FARBE.marke};border-right:28px solid ${FARBE.marke};background-color:${FARBE.marke};font-family:${familie(k)};font-size:${SCHRIFT.text}px;line-height:1;font-weight:700;color:${FARBE.aufMarke};text-decoration:none;border-radius:${RADIUS.knopf}px;mso-padding-alt:0;">${esc(opt.text)}</a>
    </td>
  </tr>
</table>`;
}

/** Waagerechte Trennlinie. `<hr>` wird von Outlook eigenwillig gerendert. */
export function trenner(abstand: number = ABSTAND.lg): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;">
  <tr><td style="padding:${abstand}px 0 0;"><div style="height:1px;line-height:1px;font-size:0;background-color:${FARBE.rahmen};">&nbsp;</div></td></tr>
</table>`;
}

/**
 * Hinweiskasten.
 *
 * Nur für die interne Mail gedacht (Spam-Auffälligkeit). Die Farben sind aus
 * der Markenfamilie abgeleitet statt frei gegriffen — die bisherigen Werte
 * `#fff4e5` und `#d98324` kommen im Designsystem an keiner Stelle vor.
 */
export function hinweiskasten(k: Satzkontext, text: string): string {
  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" dir="${k.dir}"
       style="width:100%;border-collapse:collapse;background-color:${FARBE.warnFlaeche};border-radius:${RADIUS.knopf}px;">
  <tr>
    <td width="4" style="width:4px;background-color:${FARBE.warnLinie};font-size:0;line-height:0;">&nbsp;</td>
    <td style="padding:${ABSTAND.sm}px ${ABSTAND.md}px;font-family:${familie(k)};font-size:${SCHRIFT.zweit}px;line-height:${ZEILE.normal};color:${FARBE.warnText};text-align:${anfang(k)};">${escMehrzeilig(text)}</td>
  </tr>
</table>`;
}

export interface Verweis {
  readonly titel: string;
  readonly beschreibung: string;
  readonly href: string;
}

/**
 * Die nützlichen Verweise.
 *
 * Bewusst als Textliste und nicht als Bildkacheln: Kacheln wären ohne Bilder
 * leer, und die Zusage unter jedem Formular lautet „Keine Werbung, keine
 * Weitergabe" — eine Reihe von Produktbildern liefe dem zuwider.
 */
export function verweisliste(k: Satzkontext, verweise: readonly Verweis[]): string {
  return verweise
    .map(
      (v, i) => `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" dir="${k.dir}" style="width:100%;border-collapse:collapse;">
  <tr>
    <td style="padding:${i === 0 ? 0 : ABSTAND.sm}px 0 0;text-align:${anfang(k)};">
      <a href="${esc(v.href)}" style="font-family:${familie(k)};font-size:${SCHRIFT.text}px;line-height:${ZEILE.normal};font-weight:700;color:${FARBE.marke};text-decoration:underline;">${esc(v.titel)}</a>
      <span style="font-family:${familie(k)};font-size:${SCHRIFT.zweit}px;line-height:${ZEILE.normal};color:${FARBE.textZweit};"> &mdash; ${esc(v.beschreibung)}</span>
    </td>
  </tr>
</table>`
    )
    .join('');
}

/** Die Vertrauenszeile: als Text, nie als Bild — Bilder sind oft blockiert. */
export function vertrauenszeile(k: Satzkontext, punkte: readonly string[]): string {
  return `<p style="margin:0;font-family:${familie(k)};font-size:${SCHRIFT.klein}px;line-height:${ZEILE.normal};color:${FARBE.textSchwach};text-align:${anfang(k)};">${punkte.map((p) => esc(p)).join(' &nbsp;·&nbsp; ')}</p>`;
}

export interface Fusszeilen {
  readonly firma: string;
  readonly anschrift: string;
  readonly kontakt: string;
  readonly register: string;
  readonly datenschutzText: string;
  readonly datenschutzLinkText: string;
  readonly datenschutzHref: string;
  readonly linkedInText: string;
}

/**
 * Der Rechtsfuß.
 *
 * § 35a GmbHG verlangt auf jedem Geschäftsbrief — und dazu zählt jede
 * geschäftliche E-Mail — Rechtsform und Sitz, Registergericht und
 * Registernummer sowie ALLE Geschäftsführer. Das ist hier keine Kür: Fehlt
 * eine dieser Angaben, ist die Mail formell fehlerhaft.
 *
 * Kein Abmeldelink: Eine Eingangsbestätigung ist die transaktionale Antwort
 * auf eine Anfrage (Art. 6 Abs. 1 lit. b DSGVO), kein Werbe-Mailing. Ein
 * Abmeldelink würde sie fälschlich als solches kennzeichnen.
 */
export function fussbereich(k: Satzkontext, z: Fusszeilen): string {
  const zeile = (inhalt: string, farbe: string = '#C4BDCE', groesse: number = SCHRIFT.fuss) =>
    `<p style="margin:0 0 ${ABSTAND.xs}px;font-family:${familie(k)};font-size:${groesse}px;line-height:${ZEILE.normal};color:${farbe};text-align:${anfang(k)};">${inhalt}</p>`;

  return `
<tr>
  <td bgcolor="${FARBE.dunkel}" style="background-color:${FARBE.dunkel};padding:${ABSTAND.lg}px ${BREITE.innenrand}px;">
    ${zeile(`<strong style="color:${FARBE.aufDunkel};">${esc(z.firma)}</strong>`, FARBE.aufDunkel, SCHRIFT.zweit)}
    ${zeile(esc(z.anschrift))}
    ${zeile(z.kontakt)}
    ${zeile(esc(z.register))}
    <div style="height:1px;line-height:1px;font-size:0;background-color:#3A3348;margin:${ABSTAND.md}px 0;">&nbsp;</div>
    ${zeile(`${esc(z.datenschutzText)} <a href="${esc(z.datenschutzHref)}" style="color:#C9B8DE;text-decoration:underline;">${esc(z.datenschutzLinkText)}</a>`)}
    ${zeile(`<a href="https://www.linkedin.com/company/k-aqua" style="color:#C9B8DE;text-decoration:underline;">${esc(z.linkedInText)}</a>`)}
  </td>
</tr>`;
}
