# Original User Request

## Initial Request — 2026-07-26T12:51:50Z

# Teamwork Project Prompt — Draft

> Status: Launched
> Goal: Craft prompt → get user approval → delegate to teamwork_preview

Behebung aller gefundenen SEO-Probleme aus dem Seobility-Audit für die K-Aqua Website, um einen perfekten Onpage-Score von 100/100 Punkten in allen drei Kategorien (Technik & Meta, Struktur, Inhalt) zu erreichen. Die Fehler sollen direkt im Quellcode behoben werden. Alle Kategorien werden parallel abgearbeitet.

Working directory: /Users/umurey/Downloads/K-Aqua-V1-main
Integrity mode: development

## Requirements

### R1. Technik & Meta Optimierung
Direkte Behebung aller Fehler zu Meta-Titeln, Descriptions, Ladezeiten, Dateigrößen, URLs, Canonical Links und Alt-Attributen im Quellcode.

### R2. Struktur & Verlinkung Optimierung
Korrektur der internen Verlinkung, Klicktiefen, kaputten Weiterleitungen, Canonical-Fehler und Sitemaps im Quellcode und in der Konfiguration.

### R3. Inhalt & Keyword Optimierung
Lösung von H1-Fehlern, Thin Content, Duplicate Content, fehlendem Keyword-Fokus und widersprüchlichen Sprachangaben (hreflang/lang) durch Anpassung der Seiten und Übersetzungen.

### R4. Globale Regel
Die Agenten sind strikt daran gebunden, manuell Dateien zu editieren. Die Verwendung von Skripten, die den Quellcode automatisiert umschreiben, ist strengstens untersagt (No-Scripts-Regel aus den Global Rules). Skripte dürfen nur für read-only Verifizierungen (z.B. Crawling/Prüfung) verwendet werden.

## Acceptance Criteria

### Vollständigkeit & Stabilität
- [ ] Jedes im Audit aufgeführte Problem wurde adressiert und gelöst.
- [ ] Ein abschließender `npm run build` läuft fehlerfrei durch.

### Programmatische Verifizierung
- [ ] Es existiert ein lokales Read-Only-Prüfskript (z. B. Python/Node.js), das den lokalen Build crawlt oder die Quell-Dateien parst und bestätigt, dass jede Seite exakt eine H1-Überschrift hat.
- [ ] Ein weiteres Prüfskript bestätigt, dass Meta-Titles und Meta-Descriptions für jede URL eindeutig sind.
