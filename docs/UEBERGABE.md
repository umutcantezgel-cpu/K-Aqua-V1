# K-Aqua — Übergabe

Was du brauchst, um die Seite live zu schalten, und was du wissen musst,
damit dich später nichts überrascht.

Dieses Dokument ist die maßgebliche Quelle für die Inbetriebnahme. Wo
`docs/VERCEL_DEPLOY.md` oder `docs/LAUNCH_PLAN.md` etwas anderes sagen, gilt
das hier — die beiden stammen aus einer früheren Phase.

---

## 1. Die Schlüssel, die du besorgen musst

Alle Werte gehören in **Vercel → Settings → Environment Variables**, jeweils
für **Production _und_ Preview**.

> **`NEXT_PUBLIC_*` wird zur Bauzeit eingesetzt.** Nach dem Eintragen musst du
> einen **Redeploy** anstoßen. Speichern allein ändert am ausgelieferten
> JavaScript nichts. Das ist die häufigste Stolperstelle.

### Pflicht

| Variable | Wert / Woher | Was passiert ohne sie |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://k-aqua.de` | Kein Fehler — und genau das ist gefährlich. `lib/env.ts` fällt auf die Vercel-Domain zurück, und Canonicals, hreflang, Sitemap, robots.txt und **sämtliche** strukturierten Daten bezeichnen die Seite gegenüber Google als `*.vercel.app`. |
| `RESEND_API_KEY` | resend.com → Konto → API Keys | **Kein Kontaktformular und keine Bewerbung kommt an.** Jedes Formular meldet dem Besucher einen Fehler (absichtlich, siehe Abschnitt 3). |
| `MAIL_FROM` | `K-Aqua Website <noreply@k-aqua.de>` | Resend weist unverifizierte Absender ab. |

**Resend einrichten — drei Schritte:**

1. Konto auf [resend.com](https://resend.com) anlegen. Bis 3.000 Mails/Monat
   kostenlos; die Seite wird das nicht ausreizen.
2. Unter *Domains* `k-aqua.de` hinterlegen und die dort genannten
   **DNS-Einträge setzen** (SPF und DKIM). Das ist der einzige Schritt, der
   Wartezeit hat — DNS braucht bis zu einer Stunde.
3. Unter *API Keys* einen Schlüssel mit Senderecht erzeugen.

Ohne verifizierte Domain lehnt Resend den Versand ab. Der Selbsttest
(Abschnitt 2) sagt dir das dann wörtlich.

**Alternative statt Resend:** eigenes Postfach per SMTP —
`SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`. Deckt
ebenfalls beide Formulare ab. Port 587 mit `SMTP_SECURE=false` oder 465 mit
`true`; **Port 25 blockiert Vercel**. Sind beide Wege gesetzt, hat Resend
Vorrang.

### Optional

| Variable | Wozu |
|---|---|
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | Karte auf `/referenzen`. Fehlt sie, bleibt der Kartenbereich leer, sonst funktioniert die Seite normal. |
| `MAIL_TO_LEADS` / `MAIL_TO_JOBS` | Andere Empfänger als `info@` / `jobs@`. Mehrere kommagetrennt. |
| `MAIL_SELFTEST_TOKEN` | Schaltet `GET /api/mail/selftest` frei (Abschnitt 2). Ohne sie gibt es den Endpunkt nicht. |
| `MAIL_TRANSPORT=console` | Erzwingt den Mock. **Für Preview-Umgebungen empfohlen** — sonst schickt dort jeder Testklick eine echte Mail an den Vertrieb. |
| `CRM_WEBHOOK_URL` | Jeder Lead geht zusätzlich als JSON dorthin. |

### Was du im Google-Konto tun musst

Der Maps-Schlüssel ist im Browser **immer** sichtbar — das lässt sich nicht
im Code lösen, der Browser muss ihn kennen. Der Schutz kommt aus dem Konto:

1. Google Cloud Console → APIs & Dienste → Anmeldedaten → Schlüssel wählen
2. Anwendungseinschränkungen → „Websites" → `https://k-aqua.de/*` und
   `https://www.k-aqua.de/*`
3. API-Einschränkungen → nur „Maps JavaScript API"
4. Abrechnung → Budget und Benachrichtigung setzen

**Und: den bisherigen Schlüssel ersetzen, nicht nur beschränken.** Er steht im
Klartext in Commit `0fd00278` in der Git-Historie. Commit `50af1cd1` hat ihn
nur aus dem Arbeitsstand entfernt — in der Historie ist er weiterhin lesbar.
Solange er gültig ist, ist er auf deine Rechnung nutzbar.

### Nichts zu beschaffen

Für Analytics, CMS, Captcha, Sentry, Supabase, Algolia, Calendly, HubSpot und
Mailchimp brauchst du nichts — **keiner dieser Dienste ist eingebunden.**
Die früheren Platzhalter `CMS_API_URL`, `CMS_API_TOKEN`, `CONTACT_INBOX` und
`NEXT_PUBLIC_ANALYTICS_ID` in `.env.example` wurden nirgends im Code gelesen
und sind entfernt.

---

## 2. Prüfen, ob es wirklich läuft

### Vor dem Deploy, auf dem eigenen Rechner

```bash
npm run mail:selftest
```

Zeigt, welcher Versandweg greift, an welche Adressen und mit welchem
Absender. Mit `-- --senden` schickt er **eine** echte Testmail.

### Nach dem Deploy, gegen die Live-Umgebung

Das ist der wichtigere der beiden: Der lokale Befehl liest `.env.local` auf
deinem Rechner, **nicht** die Vercel-Umgebung. Ein grüner Lauf dort beweist
nicht, dass der Schlüssel in Vercel angekommen ist.

Setze `MAIL_SELFTEST_TOKEN` in Vercel, dann:

```bash
curl -H "x-mail-selftest-token: DEIN_TOKEN" https://k-aqua.de/api/mail/selftest
```

Antwortet mit dem gewählten Versandweg, dem Absender, den Empfängern und
einem Klartexthinweis. **Es wird nichts verschickt** — dafür brauchst du
`?senden=1`.

Beispiel, wenn alles steht:

```json
{ "kanal": "resend", "absender": "K-Aqua Website <noreply@k-aqua.de>",
  "empfaengerAnfragen": ["info@k-aqua.de"], "ok": true, "versendet": false,
  "hinweis": "Bereit. Für eine echte Testmail dieselbe Adresse mit ?senden=1 aufrufen." }
```

Beispiel, wenn der Schlüssel fehlt (HTTP 503):

```json
{ "kanal": "none", "ok": false,
  "hinweis": "Kein Versandweg konfiguriert. Setze RESEND_API_KEY …" }
```

Häufige Fehler kommen im Klartext zurück, nicht als Anbieter-Code: abgelehnter
Schlüssel, nicht verifizierte Absenderdomain, falscher SMTP-Port, falscher
TLS-Schalter. Der Schlüssel selbst steht **nie** in der Antwort.

### Der ganze Prüflauf

```bash
npx tsc --noEmit && npm run lint && npm test && npm run i18n:check && \
npm run i18n:usage && npm run i18n:placeholders && npm run 3d:check && npm run build
```

Dazu `npm run verify:h1` (soll 41/41 melden) und `npm run verify:meta`
(582/582).

---

## 3. Was du über den Mailversand wissen musst

**Bis vor Kurzem hat kein Formular dieser Website etwas versendet — und alle
meldeten „Vielen Dank".** Ohne Zugangsdaten fielen `app/actions/lead.ts` und
`app/api/apply/route.ts` auf `console.log` zurück und gaben danach Erfolg
zurück. Auf Vercel überlebte eine Anfrage damit nur im Function-Log.

Das ist behoben, und die Folge musst du kennen:

> **Deployst du, bevor die Schlüssel stehen, sieht ein Besucher eine
> Fehlermeldung** — mit der Telefonnummer daneben. Das ist unangenehm, aber
> gewollt: Ein sichtbarer Fehler ist besser als eine still verlorene Anfrage.

Setz die Schlüssel also **vor** dem ersten öffentlichen Deploy, und prüfe mit
dem Selbsttest.

Weiteres zum Verhalten:

- **Es gibt keine Datenbank.** Anfragen gehen ausschließlich per Mail raus.
  Es existiert keine zweite Kopie. Wer eine will, setzt `CRM_WEBHOOK_URL`.
- **Der Spamschutz verwirft nichts mehr.** Eine auffällig schnell abgeschickte
  Anfrage wird zugestellt und im Betreff mit `[PRUEFEN]` markiert. Nur wer die
  unsichtbare Honigfalle ausfüllt, wird still verworfen — das trifft
  praktisch nur Bots.
- **Bewerbungen** gehen an `jobs@k-aqua.de`, mit Antwortadresse des Bewerbers.
  Anhänge: PDF, DOC, DOCX, bis 4 MB. Die Grenze liegt unter Vercels 4,5-MB-Limit,
  damit der Bewerber eine verständliche Meldung bekommt statt eines nackten 413.

---

## 4. Was bewusst nicht gebaut ist

Kein Mangel, sondern Entscheidungen — damit dich nichts überrascht:

- **Keine Reichweitenmessung.** Kein Google Analytics, kein Plausible, nichts.
  Der Einwilligungsdialog ist gebaut, aber kein Dienst registriert. Das ist
  datenschutzrechtlich die sauberste Variante. Nachrüsten geht ohne Umbau —
  aber die CSP in `next.config.ts` muss dann mit, sonst sendet der Dienst
  nichts (`script-src` **und** `connect-src`).
- **Referenzprojekte sind abgeschaltet.** `lib/flags.ts` →
  `ZEIGE_UNBELEGTE_REFERENZEN = false`. Sichtbar sind nur die vier im
  Herstellerkatalog S. 7 belegten Projekte. Freigaben der Bauherren einholen,
  dann umstellen.
- **Kein CMS.** Produkt- und Geodaten sind statische TypeScript-Module.
  Inhaltsänderungen sind Code-Änderungen.
- **`/projektanfrage` öffnet das Mailprogramm** des Besuchers (`mailto:`)
  statt serverseitig zu senden. Wer kein Mailprogramm eingerichtet hat, sieht
  trotzdem den Erfolgsschritt. Das ist der einzige Formularweg ohne
  Servereingang.

---

## 5. Was noch offen ist — und nur du entscheiden kannst

### Rechtlich

| Was | Warum du |
|---|---|
| **Name des nach § 18 Abs. 2 MStV Verantwortlichen** | Eine natürliche Person, die die Verantwortung für redaktionelle Inhalte trägt. Haftungsfrage. Solange er fehlt, blendet `app/[locale]/impressum/page.tsx` den Abschnitt aus, statt einen Platzhalter zu zeigen. Eintragen in `messages/{de,en,ar}.json` → `legal.impressum.sections.4.content`; danach erscheint der Abschnitt von selbst. |
| **`lib/data/geo.ts:28-29`** | Aufsichtsbehörden und Normen je Markt tragen `TODO(content): fachlich prüfen`. Das sind Konformitätsaussagen auf allen Markt- und Städteseiten — eine falsche Normzusage ist keine Formalie. |
| **`components/tools/Career.tsx:10`** | Die Benefit-Beträge (Sachbezug 50 €, Lunch 108 € …) sind Branchenwerte, keine echten K-Aqua-Zahlen. Sie stehen als Zusage auf der Karriereseite. |

### Inhaltlich

- **38 von 73 Produkten haben kein Foto**, darunter alle 14 Werkzeuge und
  alle 3 Einschweißsättel. Die Galerie fängt das ab und zeigt statt eines
  leeren Rahmens die technische Übersicht — die Produkte sind also sauber
  dargestellt, aber ohne Bild.
- **14 Grafik-Platzhalter** auf vier Ressourcen-Seiten
  (`PremiumAssetPlaceholder` ohne Medium).
- **1 von 71 3D-Modellen fehlt** (`union-for-watermeters`). Die Produktseite
  zeigt ersatzweise die normale Verschraubung.

### Technisch, benannt

- **three.js wird zweimal geladen** (~400 kB): gebündelt aus `node_modules`
  und über die Importmap. Kostet Ladezeit und lässt zwei THREE-Instanzen
  nebeneinander laufen. Kein Fehler, aber technische Schuld.
- **Zwei Animationsbibliotheken** (`framer-motion` ^12 und `motion` ^11) sind
  installiert und beide in Benutzung.
- **Die Suche kennt 36 von 73 Produkten.** `lib/search-data.ts` ist ein
  handgepflegter Index; er läuft bei jedem neuen Produkt weiter auseinander.
  Außerdem tragen die Einträge nur de/en/ar — andere Sprachen bekommen
  deutsche Treffertitel.
- **Der CO₂-Rechner ist einsprachig deutsch**, in allen 65 Sprachen.
  `eslint.config.mjs` nimmt genau diese Pfade von der i18n-Prüfung aus,
  deshalb ist es nie aufgefallen.

### Im Repository

67 versionierte Dateien unter `_Pitch_Backlink_Strategie_K-Aqua/`,
`_K-Aqua_Dossiers_Gesammelt/` und `knowledge_gem/` — darunter Preis-,
Budget- und ROI-Unterlagen. Wer das Repository klont, bekommt sie mit. Ob sie
bleiben, ist deine Entscheidung.

---

## 6. Reihenfolge für den Livegang

1. Resend-Konto anlegen, Domain verifizieren, Schlüssel erzeugen
2. `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `MAIL_FROM` in Vercel eintragen
   (Production **und** Preview)
3. Für Preview zusätzlich `MAIL_TRANSPORT=console` — sonst mailt jeder
   Testklick an den Vertrieb
4. `MAIL_SELFTEST_TOKEN` setzen
5. **Redeploy anstoßen**
6. `curl -H "x-mail-selftest-token: …" https://k-aqua.de/api/mail/selftest`
7. Mit `?senden=1` eine echte Testmail auslösen und im Posteingang nachsehen
8. Maps-Schlüssel neu ausstellen, beschränken, eintragen, erneut deployen
9. Namen für § 18 Abs. 2 MStV nachtragen
