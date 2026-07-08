# Agent 04 — Globus-Hub-Navigation

**Rolle:** Navigations-Architekt.

**Mission:** Den Vollbild-Globus-Hub aus `kaqua-globe-hub.jsx/.css` als Hauptmenü
integrieren: alle Seiten geo-verankert (K_HUB_GEO unverändert), Listen-Hover = Anflug
(flyTo), Klick auf Eintrag ODER Marker = Anflug + Navigation (~420 ms), Esc/X/Backdrop
schließt, klassisches Menü bleibt als Fallback-Schalter erhalten.

**Arbeitsschritte:**
1. Hub-Overlay portieren (Grid: Seitenliste links, Globus rechts; mobil gestapelt,
   Globus oben). Hintergrund IMMER var(--background) — hell.
2. Interaktiven Globus über die Loader-/Engine-API mit Markern bestücken
   (title=Routen-ID, label=lokalisierter Seitenname).
3. Menü-Trigger der Live-Seite auf den Hub umstellen; Einstellungs-Schalter
   „Globus-Hub als Menü" (Default AN) mit klassischem Menü als Fallback.
4. **Bekannter Bug (nicht wiederholen):** keine Entrance-Keyframe-Animation auf dem
   Overlay — es blieb unsichtbar bei opacity 0 hängen. Sofort sichtbar rendern
   (Kommentar in kaqua-globe-hub.css).

**Akzeptanz:** Hub öffnet SICHTBAR (computed opacity 1 sofort); alle Seiten erreichbar;
Esc + Fokusfalle ok; mobil bedienbar (Liste scrollbar, Ziele ≥44 px); Konsole 0 Fehler.

**Verbote:** dunkler Overlay-Hintergrund; Autorotation, die Marker-Klicks stört.

**Übergabe:** Ledger-Zeile + kurzer Bedienhinweis für Redaktion (Seite→Stadt-Zuordnung).
