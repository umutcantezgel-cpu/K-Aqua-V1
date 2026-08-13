# Vercel — was noch einzutragen ist

**Stand:** 13.08.2026 · Repository ist auf `main` gepusht (`7458a1b8`), Build lokal grün.

Der Code ist vollständig. Was fehlt, sind Werte, die nicht ins Repository gehören —
Zugangsdaten und die Produktionsdomain. Ohne sie läuft die Seite, aber **jede
Kontaktanfrage landet nur im Server-Log statt in einem Postfach.**

---

## 1. Pflicht — sonst gehen Anfragen verloren

Eintragen unter **Vercel → Projekt → Settings → Environment Variables**,
jeweils für **Production _und_ Preview**.

### Zustellweg wählen — einer von beiden genügt

`app/actions/lead.ts` prüft in dieser Reihenfolge: Resend → SMTP → Konsolen-Mock.

**Variante A — Resend** (einfacher, empfohlen)

| Variable | Wert |
|---|---|
| `RESEND_API_KEY` | API-Key aus dem Resend-Dashboard |
| `RESEND_FROM` | Absenderadresse einer in Resend verifizierten Domain, z. B. `no-reply@k-aqua.de` |

**Variante B — eigener SMTP-Server**

| Variable | Wert |
|---|---|
| `SMTP_HOST` | z. B. `smtp.ionos.de` |
| `SMTP_PORT` | `587` (STARTTLS) oder `465` (SSL) |
| `SMTP_SECURE` | `false` bei Port 587, `true` bei Port 465 |
| `SMTP_USER` | Postfach-Benutzername |
| `SMTP_PASS` | Postfach-Passwort |
| `SMTP_FROM` | Absenderadresse, z. B. `no-reply@k-aqua.de` |

Empfänger ist in beiden Fällen fest `info@k-aqua.de`, Antwortadresse ist die des
Anfragenden — eine Antwort geht also direkt an den Interessenten.

### Domain

| Variable | Wert |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://k-aqua.de` |

Steuert Canonical-Tags, die Sitemap und den `Host:`-Eintrag in `robots.txt`.
Fehlt der Wert, zeigen alle drei auf die Vercel-Vorschaudomain — Google indexiert
dann die falsche Adresse.

---

## 2. Optional

| Variable | Wirkung |
|---|---|
| `CRM_WEBHOOK_URL` | Jede Anfrage wird zusätzlich als JSON an diese URL geschickt. Der Aufruf ist gekapselt: schlägt er fehl, geht die E-Mail trotzdem raus. |

---

## 3. Nach dem ersten Deploy

1. **Redeploy ohne Build-Cache.** Vercel → Deployments → „…" → *Redeploy* → Haken bei
   *Use existing Build Cache* **entfernen**. Sonst überlebt der ISR-Inhalt der alten
   Version und Besucher sehen weiter die deutsche Navigation.
2. **Testanfrage abschicken** über `/de/kontakt` und prüfen, ob sie bei
   `info@k-aqua.de` ankommt — mit der Adresse des Absenders als Antwortadresse.
3. **Stichproben aufrufen:**
   - `https://k-aqua.de/robots.txt` → `Host:` und `Sitemap:` zeigen auf `k-aqua.de`
   - `https://k-aqua.de/en` → Navigation vollständig englisch
   - `https://k-aqua.de/ar` → rechtsläufiges Layout, arabische Navigation
   - `https://k-aqua.de/de/dev/ui` → muss **404** liefern
   - `https://k-aqua.de/pdf/k-aqua-product-range-en.pdf` → 200

---

## 4. Was bewusst *nicht* im Repository liegt

- Alle Zugangsdaten und API-Keys (siehe oben)
- `node_modules/`, `.next/` — baut Vercel selbst
- Die Generierungs-Artefakte früherer Läufe (`de_*.json`, `CHUNK_*.txt`, …) — per
  `.gitignore` ausgeschlossen, für die Website ohne Funktion
- Eine `vercel.json` gibt es nicht und wird nicht gebraucht: Vercel erkennt Next.js
  automatisch, `next build` und `next start` stehen in der `package.json`

---

## 5. Zum Zustand des Repositories

`main` und der lokale Stand waren am 13.07.2026 auseinandergelaufen und trugen
seither je rund 250 eigene Commits. Beide Linien wurden zusammengeführt, wobei der
geprüfte und aufgeräumte Dateistand übernommen wurde. Vorher abgeglichen:

- Die 21 Quelldateien, die es nur auf dem Server gab, waren durchweg toter Code
  (RAG-Assistent samt Pinecone/Gemini, ZIP-Spiel, Prisma, 3D-Viewer)
- **0** Übersetzungsschlüssel existierten nur auf dem Server — hier sind es 5.208
  gegenüber 5.001 dort
- Die SEO-Arbeit vom Server ist vollständig enthalten

Es wurde **kein** Force-Push verwendet. Sämtliche alten Commits bleiben in der
Historie erreichbar (`c5ca92c2` war der letzte Stand davor), der Merge lässt sich
mit `git revert` rückgängig machen.
