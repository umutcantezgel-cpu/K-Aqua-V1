# Dokument 7: Mehrsprachigkeit und internationale Marktreife

## Zusammenfassung
Dieses Dokument analysiert die globale Mehrsprachigkeitsarchitektur der K Aqua Plattform. Es dokumentiert die 65 unterstützten Sprachen, die vollständige Parität der drei Hauptsprachen Deutsch, Englisch und Arabisch sowie das neu implementierte Bereinigungssystem für die 62 weiteren Exportmärkte.

## 1. Das globale Sprachkonzept im Überblick
Die K Aqua Website wurde als weltweite Exportplattform konzipiert und unterstützt insgesamt 65 Sprachen. Dadurch können Großprojekte und Ausschreibungen in nahezu allen Regionen der Welt in der jeweiligen Landessprache adressiert werden.

Die drei kuratierten Kernsprachen:
1. Deutsch (de): Die rechtliche und redaktionelle Stammfassung des Herstellers.
2. Englisch (en): Die internationale Geschäftssprache für den weltweiten Handel.
3. Arabisch (ar): Die Leitsprache für den extrem wichtigen Vertriebsmarkt im Nahen Osten und Nordafrika.

## 2. Vollständige Parität der Kernsprachen
In den drei Hauptsprachen Deutsch, Englisch und Arabisch besteht eine hundertprozentige Schlüsselübereinstimmung:
1. Jede der drei Sprachdateien enthält exakt 5338 definierte Textschlüssel.
2. Das bedeutet: Kein einziger Button, keine Tabellenüberschrift und kein Beschreibungstext fehlt in einer dieser drei Sprachen.
3. Automatische Prüfprogramme (wie scripts/check locale parity.mjs) kontrollieren diesen Gleichstand vor jeder Veröffentlichung.

## 3. Die arabische RTL Umsetzung
Für den arabischen Sprachraum reicht eine einfache Übersetzung der Wörter nicht aus. Die gesamte Benutzeroberfläche muss spiegelverkehrt dargestellt werden. Dies wird als Right to Left oder kurz RTL bezeichnet.

Umgesetzte Maßnahmen:
1. Umkehrung der Leseführung von rechts nach links.
2. Spiegelung aller Menüleisten, Navigationspfeile und Symbolanordnungen.
3. Verwendung einer speziell optimierten arabischen Schriftart mit perfekter Lesbarkeit.
4. Separate Metadaten und Titelstrukturen für arabische Suchmaschinen.

## 4. Die 62 Nebensprachen und das Fallback System
Für die weiteren 62 Sprachen (wie Französisch, Spanisch, Portugiesisch, Chinesisch, Türkisch, Polnisch und viele weitere) galt es, historische Datenrückstände zu bereinigen:

1. Bereinigung von Platzhaltern:
In einigen seltenen Sprachdateien (wie Amharisch, Burmesisch oder Khmer) befanden sich früher maschinell erzeugte Füllzeichen wie einzelne Punkte oder Buchstaben.
2. Die dreistufige Sicherheitskaskade:
Um zu verhindern, dass ein Besucher unverständliche Platzhalter sieht, wurde in lib/i18n/request.ts ein automatischer Filter eingebaut. Sobald ein Text in einer Nebensprache nicht qualitativ hochwertig vorliegt, fällt das System nahtlos auf die geprüfte englische Fachübersetzung und im zweiten Schritt auf Deutsch zurück.
3. Ergebnis: Ein Besucher in Lissabon, Tokio oder Bogota sieht zu jedem Zeitpunkt eine saubere, verständliche und professionelle Seite ohne Füllzeichen oder Fehlerhinweise.

## 5. Bedeutung für die internationale Marktreife
Mit dieser Spracharchitektur ist K Aqua für weltweite Ausschreibungen, Messen und B2B Verhandlungen sofort voll einsatzfähig. Sie verschafft dem Unternehmen einen gewaltigen Wettbewerbsvorteil gegenüber national beschränkten Wettbewerbern.
