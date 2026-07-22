# K-AQUA FINAL QUALITY AUDIT & BLUEPRINT

Audit-Datum: 22.07.2026 · Geprüft: Live-Site `https://k-aqua-v1.vercel.app` (DE/EN/AR) + lokaler Codebase `K-Aqua-V1-main` (Next.js 15, next-intl, Tailwind 4)
Methodik: Statische Code-Analyse (Routen, Komponenten, alle 3 Kern-Locales programmatisch diffed), Live-HTML-Prüfung der Kernseiten, Link-/Asset-Verifikation. Browser-Screenshot-QA (375/768/1440, Konsole, Dark-Mode-Kontrastmessung) war in diesem Lauf nicht möglich (Chrome-Extension nicht verbunden) — siehe Abschnitt 4 „Restprüfung".

---

## 1. Executive Summary

Die Website ist architektonisch stark (saubere App-Router-Struktur, zentrale `constructMetadata`, JSON-LD, CSP-Nonce-Middleware, i18n-Routing, durchdachte Komponentenbibliothek) und inhaltlich auf DE bereits nahe am Premium-Anspruch. Drei Befund-Cluster verhindern aktuell die Abgabefähigkeit:

1. **Deployment-Drift (kritischster Einzelbefund):** Das Live-Deployment ist ÄLTER als der lokale Code. Beweise: `/ar` rendert live rohe Keys (`footer.tagline`, `footer.copyright`, `© 2026 footer.rights`), obwohl `messages/ar.json` lokal vollständig übersetzt ist; `/de/produkte` liefert live einen alten Header/Footer (inkl. Footer-Sitemap mit toten Links wie `/loesungen/hotels`, `/ressourcen/downloads` — beide live als 404 verifiziert), der im lokalen `Footer.tsx` nicht mehr existiert. Ohne frisches Deployment + Cache-Invalidierung ist jede weitere Detailoptimierung nicht verifizierbar.
2. **Lokalisierung EN/AR unvollständig:** 107 DE-Strings liegen identisch (deutsch) in `en.json` (v. a. komplette Namespaces `solutions.index.*`, `solutions.hotels.*`); dazu hartkodiert deutsche Komponenten (`EnterpriseSection`, gesamter Kontakt-Layer `KontaktForm`/`kontakt-bloecke.ts`, Footer-Trust-Badges), deutscher Cookie-Banner auf AR, deutscher Title-Tag auf `/en/loesungen`.
3. **Vertrauens-/Funktionslücken:** Interne Dokumente (signierte Projektvereinbarungs-PDFs, Agentur-Prompts, Scrape-Exporte) sind öffentlich unter `/images/new-k-aqua/` abrufbar (live verifiziert); Produkt-Downloads sind Attrappen (`href="#"` mit fingierten Dateigrößen); das Lead-Formular versendet ohne gesetzte ENV-Variable nichts (nur `console.log`).

Reifegrad-Einschätzung: DE-Content 85 %, EN 60 %, AR 70 %, Technik/SEO 75 %, Funktionalität 70 %. Mit dem untenstehenden Katalog (33 Findings, davon 8× P0, 15× P1) ist das Premium-Niveau in einem fokussierten Durchgang erreichbar.

---

## 2. Detaillierter Mängel- & Optimierungskatalog

### [P0 – KRITISCH]

**P0-1 · Stale Deployment / ISR-Cache — Live ≠ Repo**
- Betroffene URL / Komponente: gesamtes Live-Deployment; verifiziert an `https://k-aqua-v1.vercel.app/ar` (Footer) und `https://k-aqua-v1.vercel.app/de/produkte` (alter Header/Footer, Title „Produktsystem · K-Aqua")
- Problem: Live rendert rohe i18n-Keys (`footer.tagline`, `footer.rights`, `footer.imprint`, `footer.privacy`) und ein altes Footer-Markup mit toten Links (`/ar/loesungen/hochhaus`, `/ar/ressourcen/downloads`, `/ar/academy/schulungen`, `/ar/maerkte/trinkwasser` u. a. — `GEO_MARKETS` kennt nur Städte-Slugs). `/de/loesungen/hotels` und `/de/ressourcen/downloads` liefern live leere 404-Responses. Der lokale Code enthält diese Fehler nicht mehr.
- Soll-Zustand / Lösung: Aktuellen `main`-Stand (HEAD `2543f43`) neu auf Vercel deployen; danach Data-Cache/ISR purgen (Vercel Dashboard → Deployment → „Redeploy" ohne Build-Cache bzw. `revalidatePath('/', 'layout')`). Anschließend `/ar` (Footer übersetzt?), `/de/produkte` (neuer Header?) und die vier o. g. 404-Pfade erneut prüfen. Alle nachfolgenden Fixes erst nach diesem Schritt live verifizieren.

**P0-2 · Interne/vertrauliche Dateien öffentlich abrufbar**
- Betroffene URL / Komponente: `public/images/new-k-aqua/` → live z. B. `https://k-aqua-v1.vercel.app/images/new-k-aqua/Antigravity_Prompt_K-Aqua_Erweiterung.md` (Abruf im Audit bestätigt, voller Inhalt öffentlich)
- Problem: Öffentlich ausgeliefert werden: 3× `Digitale_Signatur_Projektvereinbarung__Prof*.pdf` (signierte Vertragsdokumente!), `Antigravity_Prompt_K-Aqua_Erweiterung.md` (interner Agentur-Prompt inkl. Stammdaten/Arbeitsanweisungen), `Asset-Manifest_K-Aqua.md`, `Datenschutz.md`, 7× `project-301.webtm.ru*.md`-Scrape-Exporte, `screencapture-…pdf`, kryptisches `Bhj4iO12M8ajYOlPLpNX86n2xHqkZ2hj9eYTtE7P.png`.
- Soll-Zustand / Lösung: Alle Nicht-Web-Assets aus `public/` entfernen (in `/docs` außerhalb von `public/` bzw. ganz aus dem Repo). In `public/images/new-k-aqua/` verbleiben ausschließlich referenzierte Bilder/Videos. Nach Deployment Abruf der o. g. URLs erneut testen → muss 404 sein.

**P0-3 · EN-Locale enthält 107 deutsche Strings — /en/loesungen ist faktisch deutsch**
- Betroffene URL / Komponente: `messages/en.json`; live `https://k-aqua-v1.vercel.app/en/loesungen`
- Problem: Programmatischer Diff: 107 Values in `en.json` sind identisch mit `de.json` und eindeutig deutsch. Schwerpunkte: `solutions.index.*` (meta.title, meta.desc, hero.desc, intro.p1/p2, sticky.*, timeline.*, bento.header.desc), `solutions.hotels.*` (komplett), `products.transitionFittings.stats.*`/`cta.*`, `products.localDesc`. Folge live: `/en/loesungen` hat deutschen Title-Tag („Industrielle & Bautechnische Lösungen | EN · K-Aqua"), deutsche Meta-Description und deutsche Sektionen.
- Soll-Zustand / Lösung: Alle 107 Keys in `en.json` professionell ins Englische übersetzen (Liste generierbar via Diff-Skript: Werte `en===de` mit Umlaut-/Funktionswort-Heuristik). Ton: technisches Engineering-Englisch analog der bereits übersetzten Namespaces (`solutionsx`, `homex`).

**P0-4 · `EnterpriseSection` hartkodiert deutsch (H1 der Lösungen-Seite!)**
- Betroffene URL / Komponente: `components/sections/EnterpriseSection.tsx` (Z. 161–164 ff.), gerendert via `SolutionsDeep` auf `/de|en|ar/loesungen`
- Problem: Die gesamte Sektion ist JSX-hartkodiert deutsch: `<h1 className="ent-hero-title">Hochleistungs-<em>Rohrsysteme</em></h1>`, Lead „Für industrielle Anwendungen…", dazu alle Panels („Faserverbund-Technologie", „Compliance & Normen", „Globales Netzwerk" …). Da dies die einzige H1 der Seite ist, hat `/en/loesungen` und `/ar/loesungen` eine deutsche H1.
- Soll-Zustand / Lösung: Kompletten Text der Sektion in einen neuen Namespace `enterprise` in `de/en/ar.json` extrahieren; Komponente auf `getTranslations('enterprise')` umstellen (Server Component, analog `SolutionsDeep`). Widersprüchliche Zahl beachten: Sektion behauptet „40+ Länder", Rest der Site sagt „27 Märkte" / „35+ Exportländer" → auf einen Wert vereinheitlichen (Stammdaten: 35+).

**P0-5 · Kompletter Kontakt-Layer (Form, FAB, Modal, Content-Map) nur Deutsch — auf allen 15 Locales**
- Betroffene URL / Komponente: `components/kontakt/KontaktForm.tsx`, `KontaktFab.tsx`, `KontaktModal.tsx`, `content/kontakt-bloecke.ts`; sichtbar auf JEDER Seite (Layout rendert `KontaktBlock` + `KontaktFab` global)
- Problem: (a) Labels/Fehlermeldungen/CTA hartkodiert deutsch: „Telefon", „Bitte Telefonnummer angeben", „Bitte gueltige Email angeben", „Was benoetigen Sie", „Anfrage senden", „Keine Werbung, keine Weitergabe.", aria-labels „Landesvorwahl"/„Kontakt"/„Schliessen". (b) Gesamte Content-Map `KONTAKT` (36 Slugs × kicker/head/short/text/done) nur deutsch. (c) Durchgängig ASCII-Ersatzschreibweise statt Umlauten: „naechstes", „Uebergeben", „gueltige", „benoetigen", „familiengefuehrtes", „oeffnen" — auf der DE-Seite live sichtbar; für den Anspruch „kompromisslose deutsche Ingenieurskunst" inakzeptabel.
- Soll-Zustand / Lösung: (1) `kontakt-bloecke.ts` nach `messages/*.json` migrieren (Namespace `kontaktBlocks.<slug>.*`), EN/AR übersetzen. (2) Formular-Strings via `useTranslations('kontaktForm')`. (3) Alle ue/ae/oe/ss-Schreibweisen durch echte Umlaute/ß ersetzen (betrifft auch `done`-Texte und `INTERESSEN`-Chips „Beratung/Ersatzteile/…"). (4) aria-labels mitlokalisieren.
- **Zusatzfund (im Verifikations-Pass): DUMMY-Telefonnummer live.** `content/kontakt-bloecke.ts` Z. 317: `export const DIREKTWAHL = "+49 6085 999 99 99"` — diese erfundene Nummer wird im Kontakt-Layer sitewide als „Eilig? Direktwahl" angezeigt und verlinkt (`KontaktForm.tsx` Z. 133). Anrufer erreichen niemanden. Sofort auf die echte Nummer `+49 (0)60 85 / 9868-410` ändern, `href` als `tel:+4960859868410`.

**P0-6 · Lead-Formular versendet keine Anfragen (Datenverlust)**
- Betroffene URL / Komponente: `app/actions/lead.ts`
- Problem: Ohne gesetzte `CRM_WEBHOOK_URL` wird der Lead ausschließlich per `console.log` „verarbeitet" und dem Nutzer trotzdem Erfolg gemeldet. `nodemailer` ist installiert, aber ungenutzt. Auf einer Site, deren zentrales Conversion-Element auf jeder Seite zweimal ein Lead-Formular ist, gehen Anfragen real verloren.
- Soll-Zustand / Lösung: E-Mail-Versand implementieren (nodemailer/SMTP oder Resend) an `info@k-aqua.de` mit Reply-To des Absenders; `CRM_WEBHOOK_URL`-Zweig als Zusatz behalten. Bei Versandfehler `{ ok:false, error:"send" }` zurückgeben und im UI eine lokalisierte Fehlermeldung zeigen (aktuell fällt der Fehler still unter den Tisch). ENV-Variablen in Vercel setzen und mit Testlead verifizieren.

**P0-7 · Produkt-Downloads sind Attrappen mit fingierten Dateigrößen**
- Betroffene URL / Komponente: `components/product/ProductDownloads.tsx`, gerendert auf allen `produkte/[category]/[slug]`-Detailseiten
- Problem: Alle drei „Downloads" (Datenblatt, Zertifikate, Installations-Guide) verlinken `href="#"` und zeigen erfundene Größen („1.2 MB", „4.5 MB", „2.8 MB"). Klick = Sprung an Seitenanfang. Das untergräbt exakt das Vertrauensversprechen („Downloads als Self-Service"), mit dem die Startseite wirbt.
- Soll-Zustand / Lösung: Entweder (a) echte PDFs unter `public/pdf/` hosten (die auf `/service` verlinkten Dokumente `K-Aqua_Product_Range_en.pdf`, `K-Aqua_Product_Features_en.pdf`, `K-Aqua_Quality_Assurance_en.pdf`, ISO-Zertifikate von `www.k-aqua.de` übernehmen) und pro Karte korrekt verlinken (`download`-Attribut, echte Größe, `target="_blank" rel="noopener"`), oder (b) die Sektion bis Vorliegen der PDFs entfernen. Fake-Größen ersatzlos streichen.

**P0-8 · AR-Navigation/MegaMenu und Cookie-Banner gemischt Deutsch**
- Betroffene URL / Komponente: live `https://k-aqua-v1.vercel.app/ar` (MegaMenu-Gruppentitel/Beschreibungen); `messages/ar.json` → `cookieConsent.*`, `navigation.cookieDesc`
- Problem: Live zeigt das AR-Menü deutsche Gruppen/Beschreibungen („Rohrsysteme", „Digitale Tools", „Alle Produkte Übersicht aller K-Aqua PP-R Lösungen", „Schulungen & Zertifikate" …). Im lokalen `ar.json` sind zudem nachweislich deutsch: `cookieConsent.description`, `cookieConsent.essentialTitle`, `cookieConsent.essentialDesc`, `cookieConsent.analyticsDesc`, `cookieConsent.marketingDesc`, `navigation.cookieDesc` → der DSGVO-Consent-Banner erscheint arabischen Nutzern auf Deutsch. Ebenfalls deutsch in AR: `partnerx.flow.0.t`, `resources.downloads.cta.desc`, `customerReviews.reviews.a5Author`.
- Soll-Zustand / Lösung: Nach dem Redeploy (P0-1) prüfen, welche Menü-Strings noch deutsch sind, und die genannten `ar.json`-Keys ins Arabische übersetzen. Cookie-Banner-Texte prioritär (rechtlich relevant).

### [P1 – HOCH]

**P1-1 · Fünf Produktkategorie-Seiten ohne H1**
- Betroffene URL / Komponente: `app/[locale]/produkte/{pipes|fittings|valves|tools|transition-fittings}/page.tsx`
- Problem: Alle fünf Marketing-Landingpages beginnen direkt mit `<h2>`-Sektionen — `grep '<h1'` = 0 Treffer pro Datei. Pro Seite fehlt die exakt eine geforderte H1; Meta-Titles existieren, haben aber kein On-Page-Pendant.
- Soll-Zustand / Lösung: Je Seite einen Hero mit `<h1>` aus dem vorhandenen Namespace ergänzen (z. B. `products.pipes.meta.title`-Basis: „PP-R & PP-RCT Rohre — Mono- und Multilayer von d20 bis d630"), H1-Keyword im ersten Absatz aufgreifen. Bestehende erste `<h2>`-Sektion bleibt als zweite Ebene.

**P1-2 · Indexierungs-Widerspruch: noindex vs. sitemap.xml vs. hreflang**
- Betroffene URL / Komponente: `lib/seo/metadata.ts` (`isNonDePlaceholder`, `isGlobalNoIndex`), `app/sitemap.ts`
- Problem: (a) `/academy`, `/co2-rechner`, `/karriere`, `/maerkte*` werden für alle Locales ≠ de auf `noindex,nofollow` gesetzt — die EN/AR-Inhalte dieser Seiten sind aber vollständig übersetzt (Academy live geprüft). (b) `/referenzen` ist GLOBAL `noindex,nofollow` — auch auf DE. (c) sitemap.xml listet dieselben EN/AR-URLs mit hreflang-Alternates → Suchmaschinen erhalten „indexiere mich" (Sitemap) und „indexiere mich nicht" (Meta) gleichzeitig.
- Soll-Zustand / Lösung: `isNonDePlaceholder` entfernen (Seiten sind keine Platzhalter mehr) und `isGlobalNoIndex` für `/referenzen` streichen — oder, falls Referenzen bewusst nicht ranken sollen, die Route konsequent aus `sitemap.ts` UND aus den hreflang-`languages` nehmen. Regel: Jede URL ist entweder (indexierbar + in Sitemap + hreflang) oder (noindex + nirgends gelistet).

**P1-3 · sitemap.xml unvollständig**
- Betroffene URL / Komponente: `app/sitemap.ts` (`staticRoutes`)
- Problem: Es fehlen existierende, indexwürdige Routen: `datenschutz`, `ressourcen/support`, `ressourcen/ausschreibungstexte`, `produkte/pipes`, `produkte/fittings`, `produkte/valves`, `produkte/tools`, `produkte/transition-fittings`, `sitemap` (HTML), alle `news/[slug]`-Artikel und `produkte/katalog/[category]/[slug]`.
- Soll-Zustand / Lösung: `staticRoutes` um die acht statischen Pfade ergänzen; News-Slugs (Quelle: `lib`-News-Daten) und Katalog-Slugs (`CATALOG`) als dynamische Blöcke analog der Produkte anhängen.

**P1-4 · OG-Fallback-Bild ist 404**
- Betroffene URL / Komponente: `lib/seo/metadata.ts` → `images: [{ url: '${siteUrl}/images/og-default.jpg' }]`; live `https://k-aqua-v1.vercel.app/images/og-default.jpg` → 404 (verifiziert)
- Problem: Jede Seite ohne eigenes `ogImage` (fast alle) liefert ein totes og:image → Link-Previews in LinkedIn/WhatsApp/Slack ohne Bild.
- Soll-Zustand / Lösung: `public/images/og-default.jpg` erstellen (1200×630, Logo + Claim + Rohr-Visual, < 300 KB) — oder den Fallback auf die vorhandene dynamische Route `app/[locale]/opengraph-image.tsx` umstellen und den statischen Pfad entfernen.

**P1-5 · Title-Suffix „| DE · K-Aqua" (Locale-Code im Title)**
- Betroffene URL / Komponente: `lib/seo/metadata.ts` (Z. „if (finalTitle.length < 50) finalTitle = `${cleanTitle} | ${locale.toUpperCase()} · K-Aqua`")
- Problem: Kurze Titles bekommen den Locale-Code injiziert — live: „Führend in der Wasserversorgung | DE · K-Aqua", „Privacy Policy | EN · K-Aqua". Sprachkürzel im Title sind für Nutzer Rauschen und wirken generiert.
- Soll-Zustand / Lösung: Locale-Logik ersetzen durch sprechenden Claim-Suffix, z. B. DE: „… | K-Aqua — PP-R Rohrsysteme", EN: „… | K-Aqua — PP-R Piping Systems", AR analog. Länge 50–60 Zeichen anstreben.

**P1-6 · Datenschutz-Link im Kontakt-Layer ohne Locale-Präfix → DE-Nutzer landen auf EN-Seite**
- Betroffene URL / Komponente: `components/kontakt/KontaktForm.tsx` (`<a href="/datenschutz">`)
- Problem: Plain-`<a>` statt i18n-`Link`. `/datenschutz` wird per Middleware auf die DEFAULT-Locale umgeleitet — verifiziert: 308 → `https://k-aqua-v1.vercel.app/en/datenschutz`. Ein deutscher Nutzer, der im Formular „Datenschutz" klickt, liest die englische Privacy Policy.
- Soll-Zustand / Lösung: `import { Link } from '@/lib/i18n/navigation'` und `<Link href="/datenschutz">` verwenden (Label lokalisieren, s. P0-5).

**P1-7 · defaultLocale 'en' widerspricht x-default → /de**
- Betroffene URL / Komponente: `lib/i18n/routing.ts` (`defaultLocale: 'en'`), `lib/seo/metadata.ts` (`x-default` → `/de`)
- Problem: SEO deklariert DE als Default (`x-default` zeigt auf /de), das Routing schickt unpräfixte URLs aber nach /en. Inkonsistente Signale + der P1-6-Effekt.
- Soll-Zustand / Lösung: Entscheidung treffen und vereinheitlichen. Empfehlung bei deutscher Kernzielgruppe: `defaultLocale: 'de'` (Middleware-Redirects gehen dann nach /de); alternativ `x-default` auf /en drehen. Eine der beiden Änderungen, nicht beide.

**P1-8 · Datenschutzerklärung beschreibt Features, die die Site nicht hat**
- Betroffene URL / Komponente: `/de|en/datenschutz` (Quelle: `components/sections/LegalContent.tsx` bzw. `legal.*`-Messages)
- Problem: Der Text ist eine generische eRecht24-Vorlage: Facebook-Like-Buttons, Google+1 (!), Twitter, Google Analytics inkl. Browser-Opt-Out, Newsletter-Doppel-Opt-In, Registrierung, YouTube, Google Maps — nichts davon existiert auf der Site (kein GA-Snippet im Code, kein Social-Plugin, keine Registrierung). DSGVO-Grundsatz: Die Erklärung muss die TATSÄCHLICHE Verarbeitung beschreiben (Lead-Formular + Server-Action, Server-Logs/Vercel, Cookie-Consent-Kategorien, ggf. Vercel Analytics). Auf `/en/datenschutz` steht zudem die TOC-Überschrift deutsch („Inhalt"), und der Seiten-Kontaktblock ist deutsch (P0-5).
- Soll-Zustand / Lösung: Erklärung auf reale Verarbeitungen zuschneiden (Verantwortlicher KWT GmbH, DSB SILA Consulting beibehalten), Google+-Relikte entfernen, EN/AR-Versionen konsistent übersetzen. Hinweis im Output an den Betreiber: finaler Text ist juristisch freizugeben (keine Rechtsberatung durch uns/Antigravity).

**P1-9 · A11y: `sr-only` + `aria-hidden` kombiniert — Hero-Text doppelt im DOM**
- Betroffene URL / Komponente: `components/sections/HeroScrolly.tsx` Z. 155, `components/ui/ParallaxHero.tsx` Z. 78
- Problem: `<span className="sr-only" aria-hidden="true">{title}</span>` ist für niemanden wahrnehmbar, dupliziert aber H1-Wortlaut im DOM — live sichtbar als doppelter Hero-Text („Führend in der Wasserversorgung Führend in der Wasserversorgung K-Aqua entwickelt…"). Kein Nutzen, SEO-Duplikat, Screenreader-Hygiene.
- Soll-Zustand / Lösung: Beide Spans ersatzlos entfernen (der sichtbare Titel ist bereits zugänglich). Falls der Span ein Layout-Hack für Animationen ist: `aria-hidden="true"` behalten, `sr-only` entfernen UND `data-nosnippet` setzen.

**P1-10 · A11y: Formular ohne Label-Zuordnung, Fehler ohne Announcement**
- Betroffene URL / Komponente: `components/kontakt/KontaktForm.tsx`
- Problem: `<label>Telefon</label>` ohne `htmlFor`/`id`-Bindung an die Inputs; Fehlermeldungen (`.emsg`) erscheinen rein visuell ohne `aria-invalid`/`aria-describedby`/`role="alert"`; kein `aria-live` für den Success-State; Inputs ohne `required`/`aria-required`.
- Soll-Zustand / Lösung: `id` + `htmlFor` pro Feld; bei Fehler `aria-invalid="true"` + `aria-describedby` auf die `.emsg`-ID; `.emsg` als `role="alert"`; Success-Container `aria-live="polite"`; `aria-required="true"` auf Pflichtfeldern.

**P1-11 · Hartkodiert englische/deutsche UI-Fragmente in geteilten Komponenten**
- Betroffene URL / Komponente: `components/layout/Header.tsx` (aria-label `"Open Map Navigation"` englisch hartkodiert), `components/layout/FooterTrustBadges.tsx` (deutsch hartkodiert: „Nachhaltigkeit", „PP-R Rohrstandards", „Integriertes Management", „Produktion in Waldsolms"), `components/layout/Footer.tsx` Z. 40 (Button „Projekt anfragen" hartkodiert), Home-Sektion „Global Reach": Message-VALUES englisch in `de.json`/`ar.json` (`…grEyebrow: "Global Reach"` Z. 1721, `…grExportLabel: "Key Export Markets"` Z. 1727; Städteliste „Singapur/Lateinamerika" deutsch auf EN/AR)
- Problem: Sichtbare Sprachmischung auf jeder Sprachversion; Trust-Badges und Footer-Button stehen auf JEDER Seite.
- Soll-Zustand / Lösung: Hartkodierte Strings in `Header.tsx`/`FooterTrustBadges.tsx`/`Footer.tsx` in Namespaces überführen und de/en/ar pflegen; die `gr*`-Values in `de.json` eindeutschen („Globale Reichweite", „Export-Kernmärkte", „HQ & Produktion") und in `ar.json` arabisieren; Städtenamen pro Locale korrekt (EN: „Singapore/Latin America").

**P1-12 · Placeholder-Grafiken in Produktion sichtbar**
- Betroffene URL / Komponente: `components/ui/PremiumAssetPlaceholder.tsx`; eingesetzt auf `/referenzen`, `/ressourcen/support`, `/ressourcen/ausschreibungstexte`, `/loesungen` (u. a.)
- Problem: Karten zeigen „Premium 3D Asset Placeholder — Visualisierung folgt in finaler Version" — ein explizites Eingeständnis der Unfertigkeit auf Live-Seiten.
- Soll-Zustand / Lösung: Vorhandene echte Assets einsetzen (`public/images/new-k-aqua/*.webp/jpg`, `public/videos/*.mp4`) oder betroffene Slots ausblenden. Der Platzhalter-Hinweistext darf in Produktion nie rendern (z. B. nur bei `NODE_ENV !== 'production'`).

**P1-13 · Referenzen-Seite: themenfremde Tech-Icons + global noindex**
- Betroffene URL / Komponente: `app/[locale]/referenzen/page.tsx`
- Problem: Import/Verwendung von `ShieldAlert, Server, Network, Database, Lock, Binary…` (lucide) — Ikonografie eines SaaS-Templates, nicht eines Rohrsystemherstellers. Zusammen mit `noindex` (P1-2) wirkt die wichtigste Vertrauensseite unfertig.
- Soll-Zustand / Lösung: Icons austauschen (Droplet, Factory, Building2, Globe2, Gauge, Wrench aus dem vorhandenen Icon-Set), noindex entfernen, Referenz-Inhalte auf echte Projekte/Regionen schärfen (NEOM, Singapur, Kapstadt, Istanbul sind in den Messages vorhanden).

**P1-14 · Messages-Lücken: Produkt-FAQ fehlt in EN und AR**
- Betroffene URL / Komponente: `messages/en.json`, `messages/ar.json` → `products.seoArticle.pipes.faq.0–4` (fehlen; DE hat 5 Q/A-Paare); zusätzlich fehlen in EN `products.sticky.lead`, `products.sticky.items.3.*`
- Problem: FAQ-Sektion (inkl. potenziellem FAQPage-JSON-LD) entfällt auf EN/AR bzw. Guards greifen und Inhalt fehlt.
- Soll-Zustand / Lösung: Die 5 FAQ-Paare + Sticky-Keys nach EN/AR übersetzen; danach `node`-Paritäts-Diff erneut ausführen (Soll: 0 fehlende Keys zwischen de/en/ar).

**P1-15 · AR-Detailfehler: Mojibake und inkonsistente Transliteration**
- Betroffene URL / Komponente: `messages/ar.json` (Hero-Karten/Stats), live `/ar`
- Problem: „ISO 9001 ب14001 ب50001" — das Trennzeichen „·" ist als „ب" korrumpiert (2 Vorkommen live). Ortsname Waldsolms mal „فالدزولمس", mal „فالزولمس" (CustomerReviews). `customerReviews.reviews.a5Author` ist unübersetzt identisch zu DE.
- Soll-Zustand / Lösung: „·" wiederherstellen (`ISO 9001 · 14001 · 50001`), Transliteration auf „فالدزولمس" vereinheitlichen (projektweite Suche in ar.json), a5Author prüfen.

### [P2 – MITTEL]

**P2-1 · Doppelt gemountete Initializer + doppelte Footer-Zeilen**
- Betroffene URL / Komponente: `app/[locale]/layout.tsx` (`<KAquaElementeInitializer />` wird ZWEIMAL gerendert — vor `ThemeProvider` und innerhalb `NextIntlClientProvider`); `components/layout/Footer.tsx` (tagline als `<h2>` UND nochmals als `<p>`; „© 2026 KWT GmbH." + „© 2026 Alle Rechte vorbehalten." doppelt)
- Problem: Doppel-Initialisierung riskiert doppelte Event-Listener/Animationen; doppelte Tagline/Copyright wirken unsauber (live sichtbar). Die Tagline als `<h2>` verzerrt zudem die Heading-Hierarchie im Footer. Im `clientMessages`-pick sind `toggle_theme_light/dark` doppelt gelistet (kosmetisch).
- Soll-Zustand / Lösung: Einen der beiden Initializer entfernen (den außerhalb des Providers). Footer: Tagline einmalig als `<p>`, eine Copyright-Zeile („© {Jahr dynamisch} KWT GmbH. Alle Rechte vorbehalten." — Jahr aus `new Date().getFullYear()`). Doppelte pick-Einträge bereinigen.

**P2-2 · Marquee-Duplikate ohne `data-nosnippet`**
- Betroffene URL / Komponente: `app/[locale]/page.tsx` Z. 150–154 (1 sichtbarer Track + 3 `aria-hidden`-Kopien)
- Problem: `aria-hidden` löst Screenreader korrekt, verhindert aber nicht, dass Google die 4-fach duplizierte Textwurst als Snippet zieht (live: 4 identische Zeilen im Textextrakt).
- Soll-Zustand / Lösung: Auf alle Dekor-Kopien zusätzlich `data-nosnippet` setzen; gleiche Regel für alle weiteren Dekor-Marquees/Loops (projektweite Suche nach `aria-hidden`-Loops in `VerticalVelocity`, `DiagonalBand`).

**P2-3 · tel:-Link-Hygiene**
- Betroffene URL / Komponente: Live-Altfooter auf `/de/produkte` (`tel:+49(0)6085/9868-410` — verschwindet mit P0-1-Redeploy); im Repo sind `RfqWizard.tsx`/`Career.tsx` bereits korrekt E.164 (`tel:+4960859868410`)
- Problem: Klammern/Slash im `tel:`-URI des alten Footers → Wählfehler; die Dummy-Direktwahl ist unter P0-5 erfasst.
- Soll-Zustand / Lösung: Nach Redeploy alle live ausgegebenen `tel:`-Hrefs stichproben (Soll: durchgängig E.164); zentrale Helper-Funktion `toTelHref()` für zukünftige Nummern-Ausgaben.

**P2-4 · Externe PDF-Abhängigkeit + englische PDFs auf DE-Seiten**
- Betroffene URL / Komponente: `/de/produkte` Hero-CTA „Produktkatalog (PDF)" → `https://www.k-aqua.de/PDF/K-Aqua_Product_Range_en.pdf`; `servicex.libRows.*` (5 Links auf www.k-aqua.de)
- Problem: Kern-Downloads hängen an der Alt-Domain (Single Point of Failure, kein Einfluss auf Verfügbarkeit/HTTPS-Header) und sind auf der DE-Seite englischsprachig beschriftete EN-Dokumente.
- Soll-Zustand / Lösung: PDFs nach `public/pdf/` spiegeln, Links umstellen (`/pdf/k-aqua-produktprogramm-en.pdf` …), `lang`-Badge („EN") wie auf `/service` überall ausweisen; Verfügbarkeit der Alt-Domain-PDFs vor Übernahme prüfen.

**P2-5 · Bild-Dateinamen mit Leerzeichen, Umlauten und Sonderzeichen**
- Betroffene URL / Komponente: `public/images/new-k-aqua/` (z. B. `Treffen Sie K Aqua auf der Big 5 Messe in Saudi-Arabien!.webp`, `K Aqua Einblick – Warum PPR-Rohre….jpg`)
- Problem: URL-Encoding-Ketten (`%20`, `%E2%80%93`), Cache-/CDN-Hygiene, schwer referenzierbar; zudem laden Karten-Bilder mit `w=3840` (Overkill für Card-Slots).
- Soll-Zustand / Lösung: Kebab-case-Umbenennung (`big5-messe-saudi-arabien.webp` …), Referenzen in Komponenten/Messages aktualisieren; bei `next/image` sinnvolle `sizes`-Attribute setzen, damit nicht 3840er-Varianten geladen werden.

**P2-6 · Heading-/Titel-Feinschliff**
- Betroffene URL / Komponente: (a) `components/tools/TrustCenter.tsx` — H1 nutzt `text-h2`-Klasse; (b) `app/[locale]/produkte/katalog/[category]/[slug]/page.tsx` — H1 mit `text-h2`; (c) Academy-Meta-Title „Welding Academy für PP-R Rohr-Installation" (Denglisch); (d) alte Title-Muster „·" vs „|" mischen sich (live `/de/produkte`: „Produktsystem · K-Aqua")
- Problem: Visuelle H1-Hierarchie uneinheitlich; Denglisch bricht die DE-Tonalität.
- Soll-Zustand / Lösung: H1 durchgängig `text-h1`; Academy-Title DE: „Schweiß-Academy für PP-R Installation | K-Aqua"; ein Titel-Trennzeichen festlegen (Empfehlung „|", siehe P1-5) und nach Redeploy alle Titles stichproben.

**P2-7 · Kontakt-Layer doppelt pro Seite**
- Betroffene URL / Komponente: `app/[locale]/layout.tsx` (globaler `KontaktBlock` vor Footer) + seiteneigene `KontaktBlock`-Instanzen (z. B. Academy mit ZWEI Blöcken: „Plätze anfragen" mitten auf der Seite + globaler Block)
- Problem: Zwei identische Lead-Formulare pro Seite verwässern die Conversion-Hierarchie und blähen das DOM (Formular-Duplikate mit identischen `name`-Attributen).
- Soll-Zustand / Lösung: Pro Seite maximal ein voller Block; entweder globalen Block per Slug-Blacklist unterdrücken, wenn die Seite eine eigene Instanz rendert, oder seiteneigene Instanzen auf die kompakte `row`-Variante reduzieren.

**P2-8 · `main`-Offset hart auf 72 px**
- Betroffene URL / Komponente: `app/[locale]/layout.tsx` (`<main className="pt-[72px]…">`)
- Problem: Headerhöhe als Magic Number; ändert sich die Header-Höhe an einem Breakpoint, entstehen Überlappung oder Lücke (CLS-Risiko).
- Soll-Zustand / Lösung: CSS-Variable `--header-h` im Header setzen und `padding-top: var(--header-h)` nutzen (bzw. Tailwind arbitrary `pt-[var(--header-h)]`).

**P2-9 · Coday-Attribution unübersetzt**
- Betroffene URL / Komponente: `components/layout/CodayAttribution.tsx` (String hartkodiert Z. 9/34); live in allen Locales „Ein Projekt der Coday Web Agency"
- Problem: Deutscher Satz auf EN/AR. (`rel`-Attribute sind vorhanden und korrekt.)
- Soll-Zustand / Lösung: String lokalisieren („A project by Coday Web Agency" / arabisches Pendant); optional `data-nosnippet`.

### [P3 – NIEDRIG / WOW-EFFEKT]

**P3-1 · Dev-Routen in Produktion erreichbar**
- Betroffene URL / Komponente: `app/[locale]/dev/{ui,tokens,globe}` (robots disallow't `/dev/`, Seiten sind aber abrufbar)
- Soll-Zustand / Lösung: In `dev/layout.tsx` bei `process.env.NODE_ENV === 'production'` `notFound()` werfen.

**P3-2 · Repo-Hygiene für die Abgabe**
- Betroffene URL / Komponente: Repo-Root: `patch_articles.js`, `patch_de.js`, `patch_seo_titles.py`, `patch_seo_titles_json.js`, `fix_rfq.js`, `extract.ts`, `build_output.log`, `slugs.txt`, `ORIGINAL_REQUEST.md`, `export-elemente/`, `kaqua-kontakt-export/`, Ordner `019f5b26… 2/`, `.DS_Store`
- Soll-Zustand / Lösung: Einmalskripte/Exporte/Logs nach `/docs` bzw. löschen; `.DS_Store` in `.gitignore`. (Kein Build-Impact, aber Handover-Qualität.)

**P3-3 · JSON-LD auf Produktdetail ohne CSP-Nonce**
- Betroffene URL / Komponente: `app/[locale]/produkte/[category]/[slug]/page.tsx` Z. 211 (`<script type="application/ld+json" dangerouslySetInnerHTML…>` direkt statt via `JsonLd`-Komponente)
- Soll-Zustand / Lösung: Auf die zentrale `JsonLd`-Komponente umstellen und Nonce durchreichen; danach im Browser prüfen, dass keine CSP-Violation für ld+json geloggt wird. Gleiches gilt für die `<Script src="/assets/kaqua-*.js">`-Einbindungen (mit `strict-dynamic` verifizieren).

**P3-4 · Sprach-Vollständigkeit der 12 Zusatz-Locales kennzeichnen**
- Betroffene URL / Komponente: `/language` (LanguageGlobeHub), Locales fr/es/it/pl/ru/…
- Soll-Zustand / Lösung: Da nur de/en/ar kuratiert sind (robots blockt den Rest korrekt), auf der Sprachauswahl die Zusatzsprachen als „Beta" kennzeichnen oder vorerst auf die 3 Kernsprachen reduzieren — verhindert Qualitätseindrucks-Brüche.

**P3-5 · Micro-Polish für den Wow-Effekt (optional)**
- Vorschläge: (a) `prefers-reduced-motion`-Abdeckung für `WaterCursor` und HeroScrolly-Parallax verifizieren (globals.css hat Reduce-Block — WaterCursor auf `pointer: coarse` zusätzlich deaktivieren); (b) Footer-Bereich `FooterNewsletter` mit echtem Double-Opt-In verbinden oder ausblenden (derzeit ohne Backend denselben Effekt wie P0-6); (c) EdgeIndex-Karte „02 Produktfinder" auf `/produkte/finder` statt `/produkte` verlinken und Home-Bento „Produktfinder"-Karte ebenso (`toolItems[0].href`), „Benefits-Rechner"-Karte in der Signature-Grid-Variante verlinkt auf `/` statt `/karriere` — Href-Mapping in `SpotlightGrid`-Zuspielung korrigieren; (d) Kontakt-Chips um „gewählt"-Häkchen-Icon ergänzen (aria-pressed ist schon da).

---

## 3. Direkter Handlungsauftrag an Antigravity

Reihenfolge einhalten — Block A entsperrt die Verifikation aller übrigen Blöcke.

**Block A — Deployment & Exposition (P0-1, P0-2)**
- [ ] `public/images/new-k-aqua/`: alle `.md`, alle `Digitale_Signatur*.pdf`, `screencapture*.pdf`, `project-301*`-Dateien löschen/verschieben (nur referenzierte Bilder/Videos behalten)
- [ ] Redeploy von HEAD auf Vercel ohne Build-Cache; ISR/Data-Cache invalidieren
- [ ] Live-Nachtest: `/ar` Footer übersetzt · `/de/produkte` neuer Header/Footer · `/de/loesungen/hotels`, `/de/ressourcen/downloads` = saubere lokalisierte 404 · `…/Antigravity_Prompt_K-Aqua_Erweiterung.md` = 404

**Block B — Lokalisierung (P0-3, P0-4, P0-5, P0-8, P1-11, P1-14, P1-15, P2-9)**
- [ ] `en.json`: 107 deutsche Werte übersetzen (Diff-Skript: Werte mit `en === de` + Umlaut-Heuristik ausgeben)
- [ ] `EnterpriseSection.tsx` → Namespace `enterprise` (de/en/ar), Zahl „40+ Länder" → „35+" vereinheitlichen
- [ ] `content/kontakt-bloecke.ts` → `messages/*` migrieren; `KontaktForm`/`KontaktFab`/`KontaktModal` auf `useTranslations` umstellen; ALLE ue/ae/oe/ss-Schreibweisen durch ü/ä/ö/ß ersetzen
- [ ] `ar.json`: `cookieConsent.*`, `navigation.cookieDesc`, `partnerx.flow.0.t`, `resources.downloads.cta.desc`, Mojibake „ب"→„·", Transliteration „فالدزولمس" vereinheitlichen
- [ ] `products.seoArticle.pipes.faq.0–4` nach en/ar; `products.sticky.*`-Lücken in en schließen
- [ ] Header-aria „Open Map Navigation", Trust-Badges, „Projekt anfragen", „Global Reach"-Sektion, Coday-Attribution lokalisieren
- [ ] Abschlusstest: Paritäts-Skript = 0 fehlende Keys; `grep -r "ue\b\|ae\b"`-Stichprobe ohne Treffer in Nutzertexten

**Block C — Funktionalität (P0-6, P0-7, P1-6, P2-3, P3-5b/c)**
- [ ] **`DIREKTWAHL`-Dummy-Nummer `+49 6085 999 99 99` durch echte Nummer ersetzen (kontakt-bloecke.ts Z. 317)**
- [ ] `lead.ts`: SMTP/Resend-Versand an info@k-aqua.de implementieren, Fehlerpfad ans UI, ENV in Vercel, Testlead senden
- [ ] `ProductDownloads.tsx`: echte PDFs unter `public/pdf/` + korrekte Links/Größen ODER Sektion entfernen
- [ ] Datenschutz-Link in `KontaktForm` auf i18n-`Link` umstellen
- [ ] `tel:`-Hrefs auf E.164 normalisieren
- [ ] Bento/EdgeIndex-Hrefs: Produktfinder → `/produkte/finder`, Benefits → `/karriere`
- [ ] `FooterNewsletter`: anbinden oder ausblenden

**Block D — SEO (P1-1 bis P1-5, P1-7, P2-2, P2-6)**
- [ ] H1 auf den 5 Kategorie-Seiten ergänzen (Keyword im Lead aufgreifen)
- [ ] `isNonDePlaceholder` + `isGlobalNoIndex` entfernen bzw. Sitemap/hreflang konsistent machen
- [ ] `sitemap.ts`: 8 fehlende statische Routen + News- und Katalog-Slugs ergänzen
- [ ] `public/images/og-default.jpg` (1200×630) erstellen oder Fallback auf `opengraph-image`-Route
- [ ] Title-Suffix „| {LOCALE} ·" durch Claim-Suffix ersetzen; Trennzeichen vereinheitlichen
- [ ] `defaultLocale` vs. `x-default` Entscheidung umsetzen (Empfehlung: `defaultLocale: 'de'`)
- [ ] `data-nosnippet` auf alle Marquee-/Dekor-Duplikate

**Block E — A11y & Struktur (P1-9, P1-10, P2-1, P2-7, P2-8, P3-1, P3-3)**
- [ ] sr-only/aria-hidden-Spans in `HeroScrolly` + `ParallaxHero` entfernen
- [ ] KontaktForm: htmlFor/id, aria-invalid, aria-describedby, role=alert, aria-live
- [ ] Doppelten `KAquaElementeInitializer` entfernen; Footer-Dubletten (tagline/copyright) bereinigen, tagline ≠ `<h2>`
- [ ] Kontakt-Block-Doppelung pro Seite auflösen
- [ ] `--header-h`-Variable statt `pt-[72px]`
- [ ] `/dev/*` in Produktion `notFound()`
- [ ] Produkt-JSON-LD über `JsonLd`-Komponente mit Nonce

**Block F — Content & Trust (P1-8, P1-12, P1-13, P2-4, P2-5, P3-2, P3-4)**
- [ ] Datenschutzerklärung auf reale Verarbeitung kürzen (Entwurf, juristische Freigabe durch Betreiber vermerken); EN/AR konsistent
- [ ] `PremiumAssetPlaceholder`-Slots mit echten Assets füllen oder ausblenden; Placeholder-Text nie in Produktion
- [ ] Referenzen: Icons tauschen, Inhalte schärfen
- [ ] PDFs von www.k-aqua.de nach `public/pdf/` spiegeln, Links umstellen
- [ ] Bild-Dateinamen kebab-case + `sizes`-Attribute
- [ ] Repo-Root aufräumen; Sprachauswahl der 12 Beta-Locales kennzeichnen

---

## 4. Restprüfung nach Redeploy (im Audit nicht abschließbar)

Ohne verbundenen Browser konnten folgende Punkte nicht gemessen werden und sind nach Umsetzung von Block A als finaler QA-Gate durchzuführen:

1. Screenshot-QA bei 375 px / 768 px / 1440 px auf: Home, Produkte-Hub, eine Produktdetailseite, Lösungen, Kontakt, Karriere, AR-Home (RTL-Spiegelung von MegaMenu, Marquee-Richtung, Zahlen-Ausrichtung).
2. Konsolen-/CSP-Fehler (insb. `strict-dynamic` mit `/assets/kaqua-elemente.js`, ld+json ohne Nonce, Framer-Motion-Hydration-Warnings).
3. Dark-Mode-Kontrastmessung (WCAG AA: `muted-foreground` auf `background-subtle`, Chips, Footer-Weißabstufungen `white/50`).
4. Interaktionstests: MegaMenu-Fokusfalle, Mobile-Menü mit Tastatur, KontaktModal ESC/Fokus-Return, Produktfinder-Filter, CO₂-Rechner-Charts, 3D-Viewer-Fallback, Sprachwechsel mit Pfaderhalt.
5. Lighthouse/CWV (LCP-Kandidat: Hero-Video/Bild `w=3840`; CLS: Header-Offset; INP: WaterCursor auf Low-End).

Sobald die Chrome-Extension verbunden ist, kann ich diese Restprüfung automatisiert nachziehen und den Report um die Messwerte ergänzen.
