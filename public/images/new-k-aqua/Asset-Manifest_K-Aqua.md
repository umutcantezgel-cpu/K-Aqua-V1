# Asset-Manifest – K-Aqua Website-Erweiterung

> **Zweck:** Eindeutige Zuordnung aller Medien aus diesem Workspace zur bestehenden Website (project-301.webtm.ru / K-Aqua). Antigravity liest dieses Manifest zusammen mit dem Master-Prompt ein und nutzt es als verbindliche Quelle für **Bildaustausch und -platzierung**.
> Alle Dateien liegen im Workspace-Wurzelverzeichnis `K-Aqua Erweiterung und Implemention/`.

---

## 1. Grundregel Bildaustausch

1. **Alle bestehenden Platzhalter-/Stockbilder der Website werden entfernt** und durch die unten gelisteten, kuratierten Assets ersetzt (siehe Abschnitt 5 für die zu entfernenden Alt-Pfade).
2. **Erhalten bleiben** (kein Ersatz vorhanden, Entfernen würde die Seite beschädigen): Logo (`logo1.svg`), Favicons (`/assets/favicon/*`), Hintergrund `certificate_bg.webp` sowie die **Zertifikat-Badges** ISO 9001/14001/50001, DVGW, KIWA → siehe Abschnitt 6. Falls der Nutzer hierfür neue Dateien nachliefert, ersetzen.
3. Neue Dateien beim Import in den Codebase **web-freundlich umbenennen** (Spalte „Zielname"): klein, ohne Leer-/Sonderzeichen, mit Bindestrichen.
4. Für jedes platzierte Bild ein aussagekräftiges `alt`-Attribut auf Deutsch setzen (Vorschlag in Spalte „alt-Text").

---

## 2. Produktkategorien (Startseite-Block „Lösungen" + Seite „Produkte")

Jede der 7 Kategorien erhält ihr Profilbild. Gleiches Bild auf Startseite-Kachel und Produktseite verwenden (Konsistenz).

| Quelldatei | Zielname (Vorschlag) | Kategorie | alt-Text |
|---|---|---|---|
| `Fittings Profil Bild.png` | `kategorie-fittings.png` | Fittings | „K-Aqua PPR Fittings" |
| `Pipes Profil Bild.png` | `kategorie-pipes.png` | Pipes (Rohre) | „K-Aqua PPR-Rohre" |
| `Transitions Fittings Profil Bild.png` | `kategorie-transition-fittings.png` | Transition Fittings | „K-Aqua Übergangsfittings" |
| `Valves Profilbild.png` | `kategorie-valves.png` | Valves (Ventile) | „K-Aqua Ventile" |
| `Accessories Profil Bild.png` | `kategorie-accessories.png` | Accessories (Zubehör) | „K-Aqua Zubehör / Rohrschellen" |
| `Tools Profil Bild.png` | `kategorie-tools.png` | Tools (Werkzeuge) | „K-Aqua Werkzeuge" |
| `Weld-IN Saddles.png` | `kategorie-weld-in-saddles.png` | Weld-in saddles | „K-Aqua Weld-in Sättel" |

## 3. Blog / News (6 Beiträge – Reihenfolge wie auf der Live-Seite)

5 von 6 Beiträgen erhalten ihr Titelbild über den Dateinamen 1:1 zugeordnet. Beitrag 6 hat kein neues Bild (siehe Hinweis).

| # | Datum | Beitragstitel | Quelldatei → Zielname | alt-Text |
|---|---|---|---|---|
| 1 | 14.04.2025 | K Aqua Einblick – Warum PPR-Rohre die beste Lösung für moderne Installationen sind | `K Aqua Einblick – Warum PPR-Rohre die beste Lösung für moderne Installationen sind.jpg` → `blog-warum-ppr-rohre.jpg` | „Bunte K-Aqua PPR-Rohre" |
| 2 | 27.03.2025 | K Aqua Messingfittings: Hochwertige Messingeinsätze treffen auf German PPR | `K Aqua Messingfittings- Hochwertige Messingeinsätze treffen auf German PPR – für maximale Leistung.jpg` → `blog-messingfittings.jpg` | „K-Aqua Messingfittings Nahaufnahme" |
| 3 | 27.03.2025 | K Aqua setzt neue Maßstäbe in der Flexibilität bei deutschen PPR-Rohren | `K Aqua setzt neue Maßstäbe in der Flexibilität bei deutschen PPR-Rohren .jpg` → `blog-flexibilitaet.jpg` | „K-Aqua auf der Big-5-Messe" |
| 4 | 23.03.2025 | K Aqua Einblicke: Was ist Polypropylen-Random-Copolymer (PPR)? | `K Aqua Einblicke- Was ist Polypropylen-Random-Copolymer (PPR)?.jpg` → `blog-was-ist-ppr.jpg` | „PPR-Schweißwerkzeuge und -ausrüstung" |
| 5 | 23.03.2025 | Treffen Sie K Aqua auf der Big 5 Messe in Saudi-Arabien! | `Treffen Sie K Aqua auf der Big 5 Messe in Saudi-Arabien!.webp` → `blog-big5-saudi-arabien.webp` | „Big-5-Messehalle Saudi-Arabien" |
| 6 | 23.03.2025 | Spannende Neuigkeiten: K Aqua startet seine neue Webseite! | **kein neues Bild** – bestehende Laptop-/„Built to Last"-Grafik beibehalten **oder** von Antigravity neu gestalten | „K-Aqua Website-Launch" |

> **Hinweis Beitrag 3 vs. 5:** Sowohl der „Flexibilität"- als auch der „Big 5"-Beitrag zeigen Messe-Motive. Zuordnung strikt nach Dateiname (wie oben vom Nutzer benannt), nicht nach Motiv interpretieren.

## 4. Einzelseiten & globale Medien

| Quelldatei → Zielname | Platzierung | alt-Text |
|---|---|---|
| `About Us Bild.webp` → `about-werk.webp` | Seite **Über uns** – Hero/Hauptbild (K-Aqua Werk außen, Gabelstapler, grüne Rohre) | „K-Aqua Produktionswerk in Waldsolms" |
| `Arbeitende arbeiter.webp` → `karriere-team.webp` | Seite **Karriere** – Banner; optional auch Produktions-Abschnitt | „Mitarbeiter in der K-Aqua Produktion" |
| `Fertigungs Bild Pipes.jpg` → `produktion-messing.jpg` | Seite **Produkte** – Abschnitt „Über die Produktion"/Installation | „Fertigung von Messingeinsätzen" |
| `K-Aqua Video.mp4` → `home-hero.mp4` | **Startseite** – Hero-Hintergrundvideo (ersetzt vorhandenes `/storage/uploads/home/...mp4`) | (Video, `muted loop`) |
| `Bhj4iO12M8ajYOlPLpNX86n2xHqkZ2hj9eYTtE7P.png` | **Bereits auf der Seite vorhanden** (Produktbereich, grüne Fittings). Identischer Hash existiert online → unverändert behalten, nicht doppelt importieren. | „K-Aqua PPR-Fittings" |

## 5. Zu ENTFERNENDE Alt-Bilder (Platzhalter/Stock auf der Live-Seite)

Alle Medien unter folgenden Pfaden auf project-301.webtm.ru sind Platzhalter und werden durch die obigen Assets ersetzt bzw. gelöscht:

```
/storage/uploads/home/5w7Oy7sGKDPO2NcygRF9bgEoac2PuoiKkD039Drf.mp4      → ersetzt durch home-hero.mp4
/storage/uploads/solutions/*.png   (4 Dateien)                          → ersetzt durch kategorie-*.png
/storage/uploads/category/*.jpg|*.png|*.webp   (alle)                   → ersetzt durch kategorie-*.png
/storage/uploads/post/*.jpg   (3 Dateien)                               → ersetzt durch blog-*.jpg/.webp
/storage/uploads/about/*.webp|*.jpg   (2 Dateien)                       → ersetzt durch about-werk.webp
/storage/uploads/career/*.webp                                          → ersetzt durch karriere-team.webp
/storage/uploads/contact/*.webp                                         → Kontakt-Hero: about-/karriere-Motiv o. entfernen
/storage/uploads/future/*.png   (4 Dateien)                             → ersetzt/entfernt (Produktions-Abschnitt)
/storage/uploads/installation/*.jpg   (4 Dateien)                       → ersetzt durch produktion-messing.jpg
/storage/uploads/productservice/*.png|*.webp   (Bilder)                 → ersetzt; Bhj4iO...png behalten
```

**Funktionale Dateien NICHT löschen:** die PDFs unter `/storage/uploads/productservice/*.pdf` und `/storage/uploads/test/*.pdf` (Produktpalette, Qualitätssicherung, Produkteigenschaften) sind echte Downloads → behalten.

## 6. Zu ERHALTENDE Brand-/Zertifikat-Assets (kein Ersatz geliefert)

```
/assets/images/logo1.svg                       → Logo, behalten
/assets/favicon/*                              → Favicons, behalten
/assets/images/certificate_bg.webp             → Hintergrund Zertifikat-Sektion, behalten
/storage/uploads/certifications/2GoWaSVt...webp  → ISO 9001/14001/50001 Badge, behalten
/storage/uploads/certifications/8CmJHh8e...webp  → DVGW System approval, behalten
/storage/uploads/certifications/SVRehjxO...webp  → KIWA Hygienic Test, behalten
```

> Falls der Nutzer aktualisierte Zertifikate liefert, hier ersetzen. Andernfalls bleiben die echten Compliance-Nachweise bestehen.

---

## 7. Abdeckungs-Check

- 7/7 Produktkategorien mit Profilbild ✅
- 5/6 Blogbeiträge mit Titelbild ✅ (Beitrag 6 = Bestandsgrafik/Neu)
- Über uns, Karriere, Produktion, Home-Video ✅
- 1 Bestandsbild bewusst beibehalten (Bhj4iO…png) ✅
- Zertifikate/Logo/Favicon bewusst erhalten ✅
