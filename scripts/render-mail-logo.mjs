#!/usr/bin/env node
/**
 * Erzeugt die beiden Logo-Bilder für die E-Mails.
 *
 *   node scripts/render-mail-logo.mjs
 *
 * WARUM ES DAS BRAUCHT
 * E-Mail-Programme können kein SVG. Im Repo lag als Raster nur
 * `public/images/logo.png` — die Wortmarke zwar mit Transparenz, aber in ein
 * 512×512-Quadrat einlaminiert, in dem sie nur das obere Drittel belegt, und
 * mit grauer Schrift, die auf dem violetten Kopfbalken unlesbar wäre.
 *
 * Erzeugt werden deshalb zwei Fassungen im echten Seitenverhältnis 3,2:1:
 *   public/mail/logo-dunkel.png  Wortmarke in Originalfarben, transparent
 *
 * EINE Fassung, nicht zwei. Zuerst war zusätzlich eine weiße für den
 * Markenbalken geplant. Sie lässt sich aus dieser Vorlage nicht sauber
 * gewinnen: Die Bildmarke ist ein Quadrat in Schriftgrau mit einem violetten
 * K darauf. Färbt man beides weiß, verschwindet das K im Quadrat; lässt man
 * das K violett, verschwindet es auf dem violetten Grund. Statt die Marke zu
 * vereinfachen, bekommt sie im Kopf eine eigene weiße Fläche — siehe
 * `kopfbalken()` in lib/mail/vorlage/bausteine.ts.
 *
 * Beide in doppelter Auflösung (360×113), im Markup auf 180 px gesetzt —
 * sonst sind sie auf Retina-Bildschirmen unscharf.
 *
 * ZUR ABGRENZUNG: Das ist eine einmalige ASSET-ERZEUGUNG, kein
 * Änderungsskript. Es liest die Vektorquelle und schreibt zwei Bilddateien;
 * es fasst keine handgeschriebene Datei an. Die Auftraggeber-Direktive
 * schließt Skripte aus, die Quellcode mutieren — das hier tut das nicht.
 *
 * Gerendert wird mit Playwright, das ohnehin als devDependency vorliegt.
 */
import { readFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
/* Aus `@playwright/test`, nicht aus `playwright` — im Projekt liegt nur das
   Testpaket, und es reicht dieselbe Browser-API mit heraus. */
import { chromium } from '@playwright/test';

const WURZEL = process.cwd();
const QUELLE = path.join(WURZEL, 'docs', 'kaqua_logo.svg');
const ZIEL = path.join(WURZEL, 'public', 'mail');

/* Die Vektorquelle stammt aus der EPS-Vorlage und nutzt #542791. Der Code
   verwendet durchgaengig #5B2D8C -- Favicon, Manifest, Logo-Komponente,
   Vorschaubilder. Fuer die Mail gilt der Wert, den der Empfaenger auf der
   Website ohnehin sieht. */
const MARKE_QUELLE = '#542791';
const MARKE_CODE = '#5B2D8C';
const SCHRIFT_GRAU = '#656a6f';

const BREITE = 360;
const HOEHE = 113; // 360 / 3.2, auf ganze Pixel

async function main() {
  if (!existsSync(QUELLE)) {
    console.error(`Vektorquelle nicht gefunden: ${QUELLE}`);
    process.exit(1);
  }
  mkdirSync(ZIEL, { recursive: true });

  const svgRoh = readFileSync(QUELLE, 'utf8');

  const fassungen = [
    {
      datei: 'logo-dunkel.png',
      zweck: 'helle Flaechen',
      svg: svgRoh.split(MARKE_QUELLE).join(MARKE_CODE),
    },
  ];

  const browser = await chromium.launch();
  try {
    for (const f of fassungen) {
      const seite = await browser.newPage({
        viewport: { width: BREITE, height: HOEHE },
        deviceScaleFactor: 1,
      });
      await seite.setContent(
        `<!DOCTYPE html><html><head><style>
           html,body{margin:0;padding:0;background:transparent;}
           svg{display:block;width:${BREITE}px;height:${HOEHE}px;}
         </style></head><body>${f.svg}</body></html>`,
        { waitUntil: 'load' }
      );
      const ziel = path.join(ZIEL, f.datei);
      // omitBackground haelt die Transparenz -- ohne das kaeme ein weisser
      // Grund heraus, und der waere auf dem violetten Balken ein Kasten.
      await seite.screenshot({ path: ziel, omitBackground: true });
      await seite.close();
      console.log(`  ${f.datei.padEnd(18)} ${BREITE}x${HOEHE}  (${f.zweck})`);
    }
  } finally {
    await browser.close();
  }

  console.log('\nFertig. Im Markup mit width="180" einbinden (doppelte Aufloesung).');
}

main().catch((fehler) => {
  console.error('Rendern fehlgeschlagen:', fehler);
  process.exit(1);
});
