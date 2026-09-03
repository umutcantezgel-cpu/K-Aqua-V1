import { test, expect } from '@playwright/test';

/* Metadaten und strukturierte Daten der deutschen Hauptrouten.
 *
 * WAS HIER SCHIEFLAG. Der Test verlangte `@type` am OBERSTEN Rand jedes
 * JSON-LD-Blocks. Die Website setzt ihre Seitendaten aber als `@graph` —
 * einen Container mit mehreren verknüpften Knoten, wie es Schema.org für
 * mehrere Entitäten je Seite vorsieht und wie es die Projektvorgabe verlangt.
 * Ein `@graph`-Container trägt kein eigenes `@type`; er IST der Container,
 * nicht der Knoten.
 *
 * Die Folge war doppelt. Erstens scheiterten 19 von 19 Routen. Zweitens —
 * und schlimmer — waren die inhaltlichen Prüfungen in
 * `if (parsedSchema['@type'] === 'Organization')` geschachtelt. Da `@type`
 * am Container immer `undefined` ist, war diese Bedingung NIE wahr:
 * „KWT GmbH", „Auweg 3", die Telefonnummer und die gesamte FAQPage-Prüfung
 * sind nie ausgeführt worden. Der Test war nicht nur rot, seine wertvollsten
 * Zusicherungen waren toter Code.
 *
 * Jetzt werden die Knoten aus beiden Formen eingesammelt und die Prüfungen
 * laufen UNBEDINGT — auf allen 19 Routen, nicht nur auf der Startseite. */

type Kontaktpunkt = { telephone?: string };

type JsonLdKnoten = {
  /* Darf ein Array sein: der Werksknoten führt ["LocalBusiness","ProfessionalService"]. */
  '@type'?: string | string[];
  name?: string;
  address?: { streetAddress?: string };
  contactPoint?: Kontaktpunkt | Kontaktpunkt[];
  mainEntity?: Array<{ '@type'?: string; acceptedAnswer?: { '@type'?: string } }>;
};

/* Ein <script type="application/ld+json">-Block. Zwei Formen kommen vor, beide gültig:
 *   `@graph` — lib/seo/schema.ts, zwei Blöcke mit zusammen 7 bis 13 Knoten je Seite.
 *   flach    — components/seo/JsonLd.tsx, etwa die vier VideoObject auf /academy. */
type JsonLdBlock = JsonLdKnoten & {
  '@context'?: string;
  '@graph'?: JsonLdKnoten[];
};

/** Die Knoten eines Blocks: bei `@graph` dessen Inhalt, sonst der Block selbst. */
function knotenVon(block: JsonLdBlock): JsonLdKnoten[] {
  return Array.isArray(block['@graph']) ? block['@graph'] : [block];
}

function hatTyp(knoten: JsonLdKnoten, typ: string): boolean {
  const t = knoten['@type'];
  return Array.isArray(t) ? t.includes(typ) : t === typ;
}

function ersterMit(knoten: JsonLdKnoten[], typ: string): JsonLdKnoten | undefined {
  return knoten.find((k) => hatTyp(k, typ));
}

const ACTIVE_ROUTES = [
  '/',
  '/produkte',
  '/produkte/finder',
  '/loesungen',
  '/co2-rechner',
  '/academy',
  '/trust-center',
  '/partnerschaft',
  '/service',
  '/maerkte',
  '/maerkte/frankfurt',
  '/maerkte/dubai',
  '/referenzen',
  '/unternehmen',
  '/karriere',
  '/projektanfrage',
  '/news',
  '/kontakt',
  '/impressum',
];

test.describe('Step 19: SEO Metadata & JSON-LD Validation', () => {
  for (const route of ACTIVE_ROUTES) {
    test(`should render valid metadata and JSON-LD for German route: ${route}`, async ({ page }) => {
      const response = await page.goto(`http://localhost:3001/de${route === '/' ? '' : route}`);
      expect(response?.status()).toBe(200);

      const title = await page.title();
      expect(title).toContain('K-Aqua');

      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      expect(description!.length).toBeGreaterThan(10);

      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBeTruthy();
      expect(canonical).toContain('https://k-aqua.de/de');

      // Verify hreflang alternates are present
      if (route !== '/produkte/finder' && route !== '/co2-rechner') {
        const alternates = page.locator('link[rel="alternate"]');
        const alternateCount = await alternates.count();
        expect(alternateCount).toBeGreaterThanOrEqual(3); // de, en, ar, and x-default
      }

      const jsonLdScripts = page.locator('script[type="application/ld+json"]');
      const count = await jsonLdScripts.count();
      expect(count).toBeGreaterThanOrEqual(1);

      const knoten: JsonLdKnoten[] = [];

      for (let i = 0; i < count; i++) {
        const content = await jsonLdScripts.nth(i).innerHTML();
        expect(content, `Block ${i} ist leer`).toBeTruthy();

        let block: JsonLdBlock = {};
        expect(() => {
          block = JSON.parse(content);
        }, `Block ${i} ist kein lesbares JSON`).not.toThrow();

        expect(block['@context'], `Block ${i}`).toBe('https://schema.org');

        const eigene = knotenVon(block);
        expect(eigene.length, `Block ${i} enthält keinen Knoten`).toBeGreaterThanOrEqual(1);

        /* Jeder Knoten braucht ein `@type` — ohne ihn ist er für einen
           Suchmaschinen-Parser bedeutungslos und wird verworfen. */
        for (const [j, k] of eigene.entries()) {
          expect(k['@type'], `Block ${i}, Knoten ${j} ohne @type`).toBeTruthy();
        }

        knoten.push(...eigene);
      }

      /* Organization, WebSite und BreadcrumbList stehen auf allen 19 Routen —
         nachgemessen am Produktionsbau, nicht angenommen. Deshalb unbedingt
         gefordert und nicht in eine Bedingung geschachtelt. */
      const organisation = ersterMit(knoten, 'Organization');
      expect(organisation, 'kein Organization-Knoten auf der Seite').toBeTruthy();
      expect(organisation!.name).toBe('KWT GmbH');
      expect(organisation!.address?.streetAddress).toBe('Auweg 3');
      const kontakt = Array.isArray(organisation!.contactPoint)
        ? organisation!.contactPoint[0]
        : organisation!.contactPoint;
      expect(kontakt?.telephone).toContain('9868-410');

      expect(ersterMit(knoten, 'WebSite'), 'kein WebSite-Knoten').toBeTruthy();
      expect(ersterMit(knoten, 'BreadcrumbList'), 'kein BreadcrumbList-Knoten').toBeTruthy();

      /* Die Stadtseiten tragen eine FAQPage — sie ist die Voraussetzung für das
         FAQ-Rich-Result und damit der Grund, warum die Seiten so gebaut sind. */
      const faq = ersterMit(knoten, 'FAQPage');
      if (route.startsWith('/maerkte/')) {
        expect(faq, `${route} ohne FAQPage`).toBeTruthy();
      }

      /* Wo eine FAQPage steht, muss JEDER Eintrag vollständig sein. Google
         verwirft den ganzen Block, wenn ein Question ohne Answer dabei ist —
         der frühere Test sah nur den ersten Eintrag an. */
      if (faq) {
        const fragen = faq.mainEntity ?? [];
        expect(Array.isArray(faq.mainEntity), 'FAQPage.mainEntity ist kein Array').toBe(true);
        expect(fragen.length).toBeGreaterThanOrEqual(1);
        for (const [j, frage] of fragen.entries()) {
          expect(frage['@type'], `FAQ-Eintrag ${j}`).toBe('Question');
          expect(frage.acceptedAnswer?.['@type'], `FAQ-Eintrag ${j}`).toBe('Answer');
        }
      }
    });
  }
});
