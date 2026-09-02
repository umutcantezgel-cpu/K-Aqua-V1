import React from 'react';
import { getTranslations } from 'next-intl/server';
import type { ArticleTable as Artikeltabelle, ArticleColumn } from '@/lib/bim/article-table';
import { articleNamesFor, hasAnyArticleName, KEIN_NAME } from '@/lib/article-names';
import { formatCatalogNumber } from '@/lib/catalog-format';

/**
 * Die Artikeltabelle einer Produktseite.
 *
 * Server-Komponente, kein Client-JavaScript. Bis hierher wurde die Tabelle als
 * rohes HTML aus der Markdown gesetzt (`dangerouslySetInnerHTML`) — mit
 * englischen Spaltenkoepfen in allen 65 Sprachen, Abschnittszeilen als fetter
 * Zelle mit leeren Nachbarn und Fussnotenzeichen ohne jede Beziehung zu dem
 * Hinweis darunter.
 */

interface ArticleTableProps {
  table: Artikeltabelle;
  /** Die bereits uebersetzte Ueberschrift („Artikeltabelle"). */
  heading: string;
  locale: string;
  /** Fuer die Tabellenunterschrift, die nur Vorleser hoeren. */
  productName: string;
  /** Macht die Fussnotenanker eindeutig, falls je zwei Tabellen auf eine Seite kommen. */
  slug: string;
}

/*
 * Die WORTARTIGEN Spaltenkoepfe des Bestands und ihr Nachrichtenschluessel.
 *
 * Nur sieben. Die uebrigen 37 — d, D, l, z, s, Rp, DN, SW, D1, l1, h, G, R,
 * t, A, C, P ... — sind Katalogsymbole und stehen im franzoesischen wie im
 * deutschen Druckkatalog gleich; die zu uebersetzen waere der Fehler.
 * `kg` und `s min.` bleiben aus demselben Grund: eine Einheit und eine
 * Abkuerzung, die alle Sprachen gleich setzen.
 *
 * Ein handgeschriebenes Woerterbuch und keine Ableitung aus dem Kopf: next-intl
 * nimmt den Punkt als Pfadtrenner, ein Schluessel `Pack.` funktioniert also
 * nicht. Wird ein Kopf nicht gefunden, erscheint er unveraendert — der
 * Fehlerfall ist ein englischer Kopf, nie ein falscher.
 */
const KOPF_SCHLUESSEL: Readonly<Record<string, string>> = {
  'Pack.': 'pack',
  Weight: 'weight',
  'Water capacity': 'waterCapacity',
  'Dimension G': 'dimensionG',
  'Nut thread': 'nutThread',
  System: 'system',
  // Steht in der Quelle mit zwei Leerzeichen; die Suche normalisiert sie weg.
  'L adjustable': 'lAdjustable',
};

/** Der Gedankenstrich, den dieselbe Tabelle bereits fuer „nicht angegeben" fuehrt. */
const LEER = '–';

export async function ArticleTable({
  table,
  heading,
  locale,
  productName,
  slug,
}: ArticleTableProps) {
  const t = await getTranslations({ locale, namespace: 'products.labels.articleTable' });

  const codes = table.rows.map((r) => r.code);
  /* Die Spalte erscheint nur, wenn das Produkt ueberhaupt einen Namen hat.
     Die Abdeckung ist praktisch alles-oder-nichts: 31 Produktdateien sind
     vollstaendig gedeckt, 39 gar nicht, 3 teilweise. Eine Spalte aus lauter
     Gedankenstrichen auf den Rohrseiten waere Ballast. */
  const zeigeNamen = hasAnyArticleName(codes);
  const namen = zeigeNamen ? articleNamesFor(codes, locale) : {};

  const spaltenzahl = 1 + (zeigeNamen ? 1 : 0) + table.columns.length;

  /* `col.key`, nicht `col.label`. `label` ist der rohe Kopf einschliesslich
     Einheit (`D (mm)`), und die Einheit wird darunter eigens gesetzt — mit
     `label` stuende in den Rohrtabellen `D (mm) mm`. `key` ist derselbe Kopf
     ohne die Klammer, genau das gesuchte Katalogsymbol. */
  function kopf(col: ArticleColumn): string {
    const schluessel = KOPF_SCHLUESSEL[col.key.replace(/\s+/g, ' ').trim()];
    return schluessel ? t(`columns.${schluessel}`) : col.key;
  }

  /* Ein Zeichen der Laenge n verweist auf die n-te Fussnote — die uebliche
     Konvention. Im Bestand gibt es je Tabelle hoechstens eine Fussnote und als
     Zeichen ausschliesslich den einfachen Stern; die Laengenregel kostet drei
     Zeilen und traegt den Tag, an dem eine zweite dazukommt. */
  function fussnote(marker: string): { nummer: number; anker: string } | null {
    const nummer = marker.length;
    if (nummer < 1 || nummer > table.footnotes.length) return null;
    return { nummer, anker: `fn-${slug}-${nummer}` };
  }

  /* Auch die Abschnittszeile traegt ein Fussnotenzeichen — im Bestand steht
     dort `SDR 11*`, und die Fussnote darunter nennt die Verbindungsart. Der
     Parser laesst das Zeichen im Abschnittstext stehen; ohne diese Trennung
     stuende in der Tabelle ein nackter Stern, waehrend Nummern und Werte
     daneben einen Verweis bekommen. */
  function abschnitt(text: string): { text: string; marker: string | null } {
    const m = /^(.*?)(\*+)$/.exec(text.trim());
    return m ? { text: m[1]!.trim(), marker: m[2]! } : { text: text.trim(), marker: null };
  }

  function Verweis({ marker }: { marker: string }) {
    const f = fussnote(marker);
    if (!f) return null;
    return (
      <sup className="ms-0.5">
        <a
          href={`#${f.anker}`}
          className="text-primary no-underline hover:underline"
          aria-label={`${t('footnotes')} ${f.nummer}`}
        >
          {marker}
        </a>
      </sup>
    );
  }

  const kopfKlasse =
    'bg-card p-4 font-heading font-bold text-foreground border-b-2 border-primary whitespace-nowrap text-start align-bottom';
  /* Ohne `whitespace-*`. Die Klasse wird unten je Zelle ergaenzt: Masszahlen
     duerfen nicht umbrechen, Bezeichnungen muessen es. Beide Klassen an
     dieselbe Zelle zu haengen funktioniert nicht — sie haben gleiche
     Spezifitaet, und es gewinnt die, die spaeter im Stylesheet steht, nicht
     die spaeter in der Klassenliste. */
  const zellKlasse = 'p-4 border-b border-card-border text-muted-foreground text-start';

  return (
    <section className="my-8">
      <h2 className="font-heading font-bold text-h3 text-foreground mb-6">{heading}</h2>

      <div className="overflow-x-auto rounded-xl border border-card-border bg-card shadow-sm">
        <table className="w-full text-sm border-collapse">
          <caption className="sr-only">{t('caption', { product: productName })}</caption>

          <thead>
            <tr>
              <th scope="col" className={kopfKlasse}>
                {t('code')}
              </th>
              {zeigeNamen && (
                <th scope="col" className={`${kopfKlasse} hidden md:table-cell`}>
                  {t('name')}
                </th>
              )}
              {table.columns.map((col) => (
                <th key={col.key} scope="col" className={kopfKlasse}>
                  {kopf(col)}
                  {col.unit && (
                    <span className="block text-xs font-normal text-muted-foreground">{col.unit}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {table.rows.map((row, i) => {
              const vorher = i > 0 ? table.rows[i - 1] : undefined;
              /* Die Abschnittszeile („SDR 11") trennt Muffenschweiss- von
                 Stumpfschweissgroessen und gilt fuer alles darunter. Als
                 `<th scope="colgroup">` sagt sie das auch einem Vorleser; als
                 fette Zelle mit leeren Nachbarn sagte sie gar nichts. */
              const neuerAbschnitt = row.section && row.section !== (vorher?.section ?? null);
              const kopfzeile = abschnitt(row.section ?? '');
              const name = namen[row.code.toUpperCase()];

              return (
                <React.Fragment key={row.code}>
                  {neuerAbschnitt && (
                    <tr>
                      <th
                        scope="colgroup"
                        colSpan={spaltenzahl}
                        /* Die Trennung traegt die LINIE, nicht die Flaeche.
                           Nachgemessen: `bg-background-subtle` und `bg-card` fallen
                           in der Dunkelfassung auf denselben Wert (rgb(21,24,34)),
                           die Flaeche allein sagt dort also nichts. Ein Anstrich in
                           `primary-soft` half nicht — 1,06:1 gegen den Zeilengrund,
                           ein reiner Farbtonunterschied ohne Helligkeitsunterschied —
                           und `text-primary` darauf kam nur auf 4,29:1 und damit
                           unter AA. Mit `text-foreground` sind es 15,96:1.
                           Die 2px-Markenlinie oben ist in beiden Fassungen ein
                           echter, hoher Kontrast; der zarte Grund hilft in der
                           hellen Fassung zusaetzlich und schadet in der dunklen
                           nicht. */
                        className="bg-background-subtle p-4 font-heading font-bold text-foreground text-start border-t-2 border-b border-primary"
                      >
                        {kopfzeile.text}
                        {kopfzeile.marker && <Verweis marker={kopfzeile.marker} />}
                      </th>
                    </tr>
                  )}
                  <tr className="transition-colors hover:bg-primary-soft/30">
                    <th scope="row" className={`${zellKlasse} whitespace-nowrap font-mono font-semibold text-foreground`}>
                      {row.code}
                      {row.footnoteMarker && <Verweis marker={row.footnoteMarker} />}
                      {/* Auf dem Telefon steht der Name als zweite Zeile in der
                          Nummernzelle — Nummer und Bezeichnung bleiben so ganz
                          links, gescrollt wird nur durch Zahlen. Die echte
                          Spalte ist dort `display:none` und damit auch fuer
                          Vorleser weg; sichtbar und vorlesbar ist immer genau
                          eine der beiden Fassungen, nie beide. */}
                      {zeigeNamen && (
                        <span className="md:hidden block font-sans font-normal text-xs text-muted-foreground whitespace-normal mt-1">
                          {name ?? KEIN_NAME}
                        </span>
                      )}
                    </th>
                    {zeigeNamen && (
                      <td className={`${zellKlasse} hidden md:table-cell`}>
                        {name ?? KEIN_NAME}
                      </td>
                    )}
                    {table.columns.map((col) => {
                      const roh = row.rawValues[col.key] ?? '';
                      const marker = row.valueMarkers[col.key];
                      return (
                        <td key={col.key} className={`${zellKlasse} whitespace-nowrap tabular-nums`}>
                          {roh === '' ? LEER : formatCatalogNumber(roh, locale)}
                          {marker && <Verweis marker={marker} />}
                        </td>
                      );
                    })}
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {table.footnotes.length > 0 && (
        <div className="mt-4">
          <h3 className="sr-only">{t('footnotes')}</h3>
          <ol className="text-xs text-muted-foreground space-y-1 list-none ps-0">
            {table.footnotes.map((text, i) => (
              <li key={text} id={`fn-${slug}-${i + 1}`} className="scroll-mt-24">
                <span className="text-primary me-1" aria-hidden="true">
                  {'*'.repeat(i + 1)}
                </span>
                {text}
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
