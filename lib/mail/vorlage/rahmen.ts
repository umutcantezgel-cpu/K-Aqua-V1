import { esc } from '../html';
import { FARBE, BREITE, RADIUS } from './tokens';
import { richtung, type Mailsprache } from '../sprache';
import { vorschautext, type Satzkontext } from './bausteine';

/**
 * Setzt Kopf, Inhalt und Fuß zu einem vollständigen Mail-Dokument zusammen.
 *
 * Hier stehen die wenigen Sonderbehandlungen, die 2026 tatsächlich noch nötig
 * sind. Jede ist unten begründet — E-Mail-Entwicklung ist voll von Regeln, die
 * vor zehn Jahren galten und heute nur noch Aberglaube sind, und ich möchte
 * keine davon weitergeben.
 */

export function satzkontext(sprache: Mailsprache): Satzkontext {
  return { sprache, dir: richtung(sprache) };
}

export interface Dokument {
  readonly sprache: Mailsprache;
  /** Für den Titel und die Vorschauzeile im Posteingang. */
  readonly titel: string;
  readonly vorschau: string;
  /** Bereits fertige `<tr>`-Blöcke der Inhaltstabelle. */
  readonly zeilen: string;
}

export function baueDokument(d: Dokument): string {
  const dir = richtung(d.sprache);

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="${esc(d.sprache)}" dir="${dir}">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<!-- Verhindert, dass Apple Mail die Schrift eigenmaechtig hochskaliert. -->
<meta name="x-apple-disable-message-reformatting" />
<!--
  Sagt dem Programm, dass diese Mail nur fuer helle Darstellung entworfen ist.
  Apple Mail und Outlook mobil invertieren Farben sonst selbsttaetig, und eine
  automatisch invertierte Mail trifft nie die Marke: Aus Violett auf Weiss wird
  ein schmutziges Helllila auf Dunkelgrau. Wir geben die Kontrolle also nicht
  ab, sondern erklaeren die Absicht.
-->
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>${esc(d.titel)}</title>
<!--[if mso]>
<noscript><xml><o:OfficeDocumentSettings>
  <o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings></xml></noscript>
<![endif]-->
<style type="text/css">
  /*
    NUR ZUGABE. Gmail behaelt diesen Block, Outlook.com stutzt ihn, manche
    Programme werfen ihn ganz weg. Alles Tragende steht deshalb inline; hier
    steht ausschliesslich, was die Mail lediglich etwas huebscher macht.
  */
  a { color: ${FARBE.marke}; }
  @media only screen and (max-width: 620px) {
    .kq-huelle { width: 100% !important; }
    .kq-rand { padding-left: 20px !important; padding-right: 20px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;width:100%;background-color:${FARBE.grund};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
${vorschautext(d.vorschau)}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;background-color:${FARBE.grund};">
  <tr>
    <td align="center" style="padding:24px 12px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="${BREITE.aussen}" class="kq-huelle" dir="${dir}"
             style="width:${BREITE.aussen}px;max-width:${BREITE.aussen}px;border-collapse:collapse;background-color:${FARBE.karte};border-radius:${RADIUS.karte}px;overflow:hidden;">
${d.zeilen}
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}
