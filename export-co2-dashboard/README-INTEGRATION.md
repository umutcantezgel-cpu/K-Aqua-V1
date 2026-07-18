# K-Aqua CO₂-Rechner v5 — Integrationspaket
Stand: 18. Juli 2026. Ersetzt das bisherige CO₂-Modul vollständig.

## Inhalt
- co2-dashboard.html — Einstiegsdatei (Referenz für Script-Reihenfolge)
- kaqua-tokens.css — Design-Tokens (entfällt, falls global bereits eingebunden)
- kaqua-co2-dashboard.css — Modul-Styles (Präfixe .dash-/.co2-, kollisionsarm)
- kaqua-co2-dash-data.js — Rechenmodell v3 (EPD-Faktoren, Darcy-Weisbach, Quellen in CO2_SOURCES)
- kaqua-co2-dash-anim.js, kaqua-co2-dash-share.js — Tween-Hooks, URL-Hash/CSV/PNG-Export
- kaqua-ui.jsx — Icons/Logo (entfällt, falls global vorhanden)
- kaqua-co2-chart-*.jsx, kaqua-co2-dash-*.jsx — Chart, Module, Tabs, Shell

## Einbau (Standalone-Seite)
Alle Dateien in EINEN Ordner legen, co2-dashboard.html aufrufen bzw. deren
<head>/<body>-Inhalt in die Seite übernehmen. Script-Reihenfolge exakt beibehalten.
Benötigt: React 18.3.1 + ReactDOM + Babel Standalone (CDN-Tags in der HTML, gepinnt).

## Einbau in bestehende Seite (empfohlen)
1. <div id="root"></div> an die Stelle des alten Moduls setzen (Container mind. 640px hoch; das Modul füllt 100% von html/body — alternativ dem Wrapper eine feste Höhe geben).
2. Alle <link>- und <script>-Tags aus co2-dashboard.html VOR </body> übernehmen (Reihenfolge!).
3. Altes Modul samt Scripts/Styles restlos entfernen.
4. Für Produktion optional: JSX mit Babel CLI vorkompilieren (npx @babel/cli --presets @babel/preset-react), dann type="text/babel" und Babel-CDN streichen.

## Persistenz & Teilen
localStorage-Schlüssel: kaqua-co2-* (Theme, Szenarien, Stränge, Panels, Coachmarks).
Share-Links kodieren den Zustand im URL-Hash (#s=…) — funktioniert ohne Server.

## Datenstand
Faktoren aus öffentlichen EPDs (EN 15804), UBA-Strommix 2025 (344 g/kWh), Ember,
DEHSt nEHS-Korridor 2026. Quellen je Faktor: Methodik-Tab → Datenquellen bzw.
CO2_SOURCES in kaqua-co2-dash-data.js. Produktspezifische K-Aqua-EPD kann den
PP-Faktor (1,7) in CO2_MATERIALS[0].productionFactor direkt ersetzen.
