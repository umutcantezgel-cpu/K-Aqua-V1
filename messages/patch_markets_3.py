import json

patch = {
"klimaanlagen.bentoHeader": "Performans Arxitekturası",
"klimaanlagen.bentoSubheader": "Sistem Üstünlükləri",
"klimaanlagen.timelineEyebrow": "Keyfiyyətin Həyat Dövrü",
"klimaanlagen.timelineLead": "Xammaldan tutmuş onilliklər boyu istifadəyə qədər: K Aqua boru sisteminin həyat dövrünün (life cycle) hər bir addımı ciddi (sərt) keyfiyyət protokollarına tabedir.",
"klimaanlagen.timeline1Year": "Mərhələ 1",
"klimaanlagen.timeline2Year": "Mərhələ 2",
"klimaanlagen.timeline3Year": "Mərhələ 3",
"klimaanlagen.timeline4Year": "Mərhələ 4",
"klimaanlagen.timeline5Year": "Mərhələ 5",
"klimaanlagen.timeline5Title": "Sistem İnteqrasiyası",
"klimaanlagen.timeline5Desc": "Təsdiqlənmiş (sertifikatlı) qaynaq texnikləri (ustaları) tərəfindən yerində quraşdırma. Homogen polifüzyon, mexaniki (fiziki) zəif nöqtələri olmayan sonsuz (davamlı) bir sistem (şəbəkə) yaradır.",
"klimaanlagen.section3Eyebrow": "Sektor Tətbiqləri",
"klimaanlagen.card1Title": "İstilik Nasosları (Pompaları)",
"klimaanlagen.card1Desc": "İstilik nasoslarının birləşdirilməsi üçün səmərəli və təhlükəsiz xətlər.",
"klimaanlagen.card2Title": "Sənaye Soyudulması",
"klimaanlagen.card2Desc": "İstehsal sahələrindəki böyük soyutma ehtiyacları üçün etibarlı həllər.",
"klimaanlagen.card3Title": "İqlimləndirmə (Kondisioner)",
"klimaanlagen.card3Desc": "Binalarda stabil iqlim nəzarətini (temperaturu) təmin edən sistem.",
"klimaanlagen.card4Title": "Enerji İdarəetməsi",
"klimaanlagen.card4Desc": "İstilik itkisini azaldan optimallaşdırılmış xətt strukturu.",
"klimaanlagen.ctaBtn1": "Satış Şöbəsi",
"klimaanlagen.ctaBtn2": "Mühəndislik",
"industrie.timelineEyebrow": "Layihə Xronologiyası (Gedişatı)",
"industrie.timelineLead": "Zavodlarda və sənaye obyektlərində quraşdırma (çəkilmə) prosesinin addımları.",
"industrie.timeline1Year": "Adım 1",
"industrie.timeline2Year": "Adım 2",
"industrie.timeline3Year": "Adım 3",
"industrie.timeline4Year": "Adım 4",
"industrie.timeline5Year": "Adım 5",
"industrie.timeline5Title": "Qəbul və Təhvil-Təslim",
"industrie.timeline5Desc": "Sistemin (şəbəkənin) sənaye tələblərinə (normalarına) uyğun olaraq istismara verilməsi.",
"industrie.section3Eyebrow": "Əlavə Xüsusiyyətlər",
"industrie.stat1Value": "100%",
"industrie.stat1Label": "Kimyəvi Davamlılıq",
"industrie.stat2Value": "0",
"industrie.stat2Label": "Korroziya",
"industrie.stat3Value": "50+",
"industrie.stat3Label": "İl Ömür",
"industrie.stat4Value": "SDR 6",
"industrie.stat4Label": "Təzyiq Sinfi",
"trinkwasser.section1P3": "İçməli su sistemləri yalnız səmərəli deyil, həm də bioloji və gigiyenik baxımdan (cəhətdən) mükəmməl olmalıdır. K Aqua ilə siz (suyun) ilkin təmizliyini hər kran (çıxış) nöqtəsinə qədər qoruyursunuz.",
"trinkwasser.section3Eyebrow": "Sektor Tətbiqləri",
"trinkwasser.section3Lead": "Qlobal miqyasda içməli su şəbəkələri (infrastrukturları).",
"trinkwasser.section4P1": "K Aqua sistemləri bütün beynəlxalq keyfiyyət standartlarını asanlıqla (rahatlıqla) yerinə yetirir (aşır).",
"trinkwasser.section4P2": "Materialın hər bir partiyası laboratoriyalarımızda (ciddi şəkildə) yoxlanılır və (sonra) qlobal (beynəlxalq) layihələr (bazarlar) üçün təsdiqlənir."
}

with open("az.json", "r") as f:
    az = json.load(f)

for k, v in patch.items():
    market, key = k.split(".", 1)
    if market not in az["markets"]:
        az["markets"][market] = {}
    az["markets"][market][key] = v

with open("az.json", "w") as f:
    json.dump(az, f, indent=2, ensure_ascii=False)
