/**
 * Gestaltungswerte für die HTML-E-Mails.
 *
 * Alles hier sind FESTE WERTE, keine CSS-Variablen. E-Mail-Programme kennen
 * `var()` nicht zuverlässig — Outlook rendert mit der Word-Engine und ignoriert
 * es vollständig. Jede Farbe steht deshalb als Hex im ausgelieferten Markup.
 *
 * Die Werte stammen aus dem Repo, nicht aus dem Gefühl. Wo zwei Quellen
 * auseinandergehen (`app/globals.css` rechnet in oklch, `public/assets/
 * kaqua-elemente.css` führt Hex-Rückfallwerte), gilt die Hex-Reihe: Sie liegt
 * garantiert im sRGB-Raum, ist in sich stimmig, und `#5B2D8C` ist die Farbe,
 * die der Empfänger auf Website, Favicon und Vorschaubildern ohnehin sieht
 * (`app/icon.svg`, `app/manifest.ts`, `components/ui/Logo.tsx`,
 * `lib/seo/og-frame.tsx`).
 */

export const FARBE = {
  /** Die Marke. Kopfbalken, Knöpfe, Hervorhebungen. */
  marke: '#5B2D8C',
  markeDunkel: '#4A2374',
  /** Sehr helle Markenfläche für ruhige Hinterlegungen. */
  markeZart: '#F1E9F8',

  akzent: '#3AA6C0',
  akzentStark: '#2E8CA6',

  /** Der Grund, auf dem die Mail liegt. */
  grund: '#FAF8FB',
  /** Die Karte darauf. */
  karte: '#FFFFFF',
  rahmen: '#E7E3EC',

  text: '#221C2C',
  textZweit: '#6C6579',
  textSchwach: '#948DA1',

  dunkel: '#231D2E',
  aufDunkel: '#F5F3F7',
  aufMarke: '#FFFFFF',

  /* Warnton für den Auffälligkeitshinweis.
     Ersetzt die Ad-hoc-Orangetöne #fff4e5 / #d98324 aus lead-message.ts, die
     im Designsystem nirgends vorkommen. Diese hier sind aus der Markenfamilie
     abgeleitet: derselbe violettstichige Neutralton, nur warm gedreht. */
  warnFlaeche: '#FBF1E4',
  warnLinie: '#B4791F',
  warnText: '#6B4610',
} as const;

/**
 * Abstände nach dem goldenen Schnitt, auf ganze Pixel gerundet.
 *
 * 8 · 13 · 21 · 34 · 55 — jede Zahl ist rund das 1,618-fache der vorigen, und
 * die Reihe ist zugleich Fibonacci. Das ist der Teil der Vorgabe „goldener
 * Schnitt", der wirklich trägt: Abstände sieht man im Verhältnis zueinander.
 *
 * Bei den SCHRIFTGRÖSSEN weiter unten ist die Reihe bewusst NICHT angewandt.
 * Dort führt 1,618 zu Sprüngen wie 16 → 26 → 42, die im schmalen Mailfenster
 * auseinanderfallen, und zu krummen Zwischenwerten ohne sichtbaren Gewinn.
 * Zahlenmystik, die man dem Ergebnis nicht ansieht, ist keine Gestaltung.
 */
export const ABSTAND = {
  xs: 8,
  sm: 13,
  md: 21,
  lg: 34,
  xl: 55,
} as const;

/**
 * Breiten.
 *
 * 600 px ist die Konvention, und sie gilt weiter: Outlooks Lesebereich ist
 * schmal, und schmaler als der Text ist besser als abgeschnitten. Auf dem
 * Telefon läuft die Tabelle über `width: 100%` zusammen.
 *
 * 600 − 2 × 32 = 536 px Satzspiegel. Geteilt im goldenen Schnitt ergibt das
 * 205 / 331 — die Aufteilung der Datenzeilen: links die Beschriftung, rechts
 * der Wert, der mehr Platz braucht.
 */
export const BREITE = {
  aussen: 600,
  innenrand: 32,
  satzspiegel: 536,
  spalteLabel: 205,
  spalteWert: 331,
} as const;

/**
 * Schriftgrößen in Pixel.
 *
 * Feste px, kein `rem` und kein `clamp` — beides ist in E-Mail unzuverlässig.
 * Fließtext bei 16 px: Darunter wird es auf dem Telefon eng, und Gmail auf
 * Android skaliert Text unter 14 px eigenmächtig hoch, was Layouts zerreißt.
 */
export const SCHRIFT = {
  klein: 12,
  zweit: 14,
  text: 16,
  lead: 19,
  h3: 20,
  h2: 26,
  h1: 30,
} as const;

export const ZEILE = {
  eng: 1.3,
  normal: 1.55,
  weit: 1.7,
} as const;

/**
 * Schriftfamilien.
 *
 * Outfit und Inter sind lokale WOFF2-Dateien (`app/fonts.ts`) und laden in
 * E-Mail nicht — Outlook Desktop, Gmail und die meisten Firmenclients holen
 * keine Webfonts. Es bleibt ein Systemstack.
 *
 * Vorn steht bewusst die jeweils geometrischste verfügbare Systemschrift, weil
 * Outfit eine geometrische Grotesk ist: Auf dem Mac `-apple-system`, unter
 * Windows `Segoe UI`. Das kommt der Marke am nächsten, ohne etwas zu laden.
 */
export const FAMILIE =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

/** Für Arabisch: Systemschriften mit arabischem Zeichensatz zuerst. */
export const FAMILIE_AR =
  "'Segoe UI', Tahoma, 'Geeza Pro', 'Arabic Typesetting', -apple-system, BlinkMacSystemFont, Arial, sans-serif";

/**
 * Eckenradius.
 *
 * Outlook Desktop zeigt Kanten statt Rundungen — das ist hinnehmbar, solange
 * kein Layout davon abhängt. Deshalb sind Radien hier reine Zugabe: Die Mail
 * muss mit rechten Winkeln genauso aussehen wie mit runden.
 */
export const RADIUS = {
  karte: 12,
  knopf: 8,
} as const;
