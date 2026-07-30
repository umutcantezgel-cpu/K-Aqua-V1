import json
import re

with open("geo_de.json", "r") as f:
    de = json.load(f)

# Very basic dictionary mapping for common terms, but I will just hardcode the translations for 28 cities since I am the LLM. Wait, generating 318 lines manually is fast.

translations = {
  "frankfurt": {
    "regulator": "DVGW / İçməli Su Qaydaları (TrinkwV)",
    "water": "Sərt su (14–20 °dH): Korroziyasız PP-R/PPRCT kobud metal səthlərdə ərp yığılmasının qarşısını alır.",
    "focus": [
      "Çoxmərtəbəli bina qaldırıcı xətləri (Banklar məhəlləsi)",
      "Otel və Ofis təmiri",
      "Məlumat mərkəzləri (Data Center) soyutma suyu"
    ],
    "note": "Reyn-Main bölgəsində K Aqua birbaşa Waldsolms fabrikindən, çox vaxt elə həmin gün çatdırılma edir.",
    "focusHeading": "Frankfurt am Main-da tipik layihələr"
  },
  "berlin": {
    "regulator": "DVGW / İçməli Su Qaydaları (TrinkwV)",
    "water": "Orta və sərt su: PP-R sistemi 50 ildən sonra belə sabit bir boru kəsiyini təmin edir.",
    "focus": [
      "İctimai binaların təmiri",
      "Geniş miqyaslı yaşayış tikintisi",
      "Xəstəxanalar və klinikalar"
    ],
    "note": "K Aqua, paytaxt bölgəsini Waldsolms fabrikindən müntəzəm logistika ilə təchiz edir.",
    "focusHeading": "Böyük Berlin ərazisindəki layihələrin diqqət mərkəzi"
  },
  "muenchen": {
    "regulator": "DVGW / İçməli Su Qaydaları (TrinkwV)",
    "water": "Çox sərt su (Alp dağlarından gələn su): K Aqua boruları köhnə metal borular kimi daralmır və ya tıxanmır.",
    "focus": [
      "Otel kompleksi inşası",
      "Sənaye sahələrində soyutma şəbəkələri",
      "Bələdiyyə infrastrukturunun təmiri"
    ],
    "note": "Sürətli və layihəyə xas material tədarükü birbaşa istehsalçı tərəfindən həyata keçirilir.",
    "focusHeading": "Münxen və ətrafında K Aqua"
  },
  "hamburg": {
    "regulator": "DVGW / İçməli Su Qaydaları (TrinkwV)",
    "water": "Yumşaq, lakin bəzən aqressiv su (aşağı pH dəyəri): Plastiklə misə nisbətən heç bir çuxur korroziyası riski yoxdur.",
    "focus": [
      "Dənizçilik (Marine) və Liman infrastrukturu",
      "Böyük ofis kompleksləri",
      "Hafencity (Liman şəhəri) layihələri"
    ],
    "note": "Dəniz limanına yaxınlıq K Aqua üçün həm də beynəlxalq dəniz yük logistikası baxımından vacibdir.",
    "focusHeading": "Hanza şəhəri Hamburqda tətbiq sahələri"
  },
  "wien": {
    "regulator": "ÖVGW",
    "water": "Dağ bulaq suyu, regional olaraq dəyişir: K Aqua-nın neytral dadı suyun yüksək keyfiyyətini qoruyur.",
    "focus": [
      "Köhnə binaların qismən yenilənməsi",
      "Yüksək mərtəbəli yaşayış binaları (Donau City)",
      "Termal və spa (sağlamlıq) qurğuları"
    ],
    "note": "Avstriya standartlarına uyğun fərdiləşdirilmiş spesifikasiyalar qısa müddət ərzində mümkündür.",
    "focusHeading": "Vyanada mühüm layihə sahələri"
  },
  "zuerich": {
    "regulator": "SVGW",
    "water": "Müxtəlif dərəcələrdə sərtlik. Yüksək bina standartlarına görə optimal səs izolyasiyalı təhlükəsiz PPRCT sistemləri tələb olunur.",
    "focus": [
      "Lüks yaşayış binaları",
      "Banklar və məlumat mərkəzləri (Data Center)",
      "Əczaçılıq sənayesi üçün layihələr"
    ],
    "note": "İsveçrənin ən yüksək tikinti standartları üçün kompromissiz keyfiyyət.",
    "focusHeading": "Sürix və İsveçrə layihələri"
  },
  "dubai": {
    "regulator": "DCL / ESMA (Emirates Authority for Standardization)",
    "water": "Duzsuzlaşdırılmış (desalinated), yüksək xlorlu dəniz suyu: PP-R metaldan fərqli olaraq korroziyaya uğramır.",
    "focus": [
      "Göybdələnlər (Burj Khalifa tipli layihələr)",
      "Lüks otellər və kurortlar (resorts)",
      "District Cooling (Mərkəzləşdirilmiş Soyutma) sistemləri"
    ],
    "note": "Xüsusi günəş radiasiyası üçün xüsusi UV stabilləşdirilmiş borularla mövcuddur.",
    "focusHeading": "Dubayda tikinti layihələri"
  },
  "abudhabi": {
    "regulator": "QCC (Quality and Conformity Council)",
    "water": "Son dərəcə aqressiv içməli su şərtləri. K Aqua boruları kimyəvi korroziyaya davamlıdır.",
    "focus": [
      "Hökumət binaları və infrastruktur",
      "Xəstəxanalar (Səhiyyə mərkəzləri)",
      "Masdar City kimi ekoloji cəhətdən davamlı (sustainable) inkişaflar"
    ],
    "note": "Birbaşa Almaniyadan olan etibarlı mühəndislik Əmirliklərin böyük layihələrində yüksək qiymətləndirilir.",
    "focusHeading": "Əbu-Dabi və ətrafı"
  },
  "riad": {
    "regulator": "SASO (Saudi Standards, Metrology and Quality Org)",
    "water": "İsti iqlimlərdə şəbəkə suları: PPRCT-nin termo-stabilliyi hətta ifrat mühit temperaturlarında belə deformasiyanın qarşısını alır.",
    "focus": [
      "Mega City və Giga-Layihələr (Vision 2030)",
      "Geniş miqyaslı xəstəxana kompleksləri",
      "Kütləvi mənzil tikintisi"
    ],
    "note": "K Aqua irimiqyaslı layihələr üçün xüsusi diametrlər (d630-a qədər) və layihəyə xas dəstək təqdim edir.",
    "focusHeading": "Səudiyyə Ərəbistanındakı əsas layihələr"
  },
  "dschidda": {
    "regulator": "SASO",
    "water": "Yüksək rütubətli sahil bölgəsi. Qatılaşmanın (kondensasiya) qarşısını almaq üçün soyutma sistemlərində aşağı istilik keçiriciliyi vacibdir.",
    "focus": [
      "Sahil otelləri",
      "Dəniz suyunun duzsuzlaşdırılması (Desalination) infrastrukturu",
      "Sənaye liman obyektləri"
    ],
    "note": "Jeddah Islamic Port vasitəsilə sürətli beynəlxalq yüklərin çatdırılması mümkündür.",
    "focusHeading": "Ciddə və Qırmızı dəniz sahili"
  },
  "neom": {
    "regulator": "SASO / NEOM xüsusi layihə standartları",
    "water": "Tamamilə gələcəyə hesablanmış infrastruktur. Sıfır karbon izi (Zero Carbon) tələb olunur – PP-R mükəmməl uyğun gəlir.",
    "focus": [
      "The Line (Xətt) və bənzəri Meqa layihələr",
      "Aqrotex (Agro-Tech) və Su təsərrüfatı",
      "Mütləq sızdırmaz infrastruktur xətləri"
    ],
    "note": "K Aqua, davamlı (sustainable) və yenilikçi sular şəbəkələri üçün innovativ boru sistemləri təqdim edir.",
    "focusHeading": "NEOM Giga-Layihəsi"
  },
  "doha": {
    "regulator": "Kahramaa (Qatar General Electricity & Water Corp)",
    "water": "Şəbəkədə yüksək xlor dioksid yükü. K Aqua xüsusi oksidləşməyə davamlı borular təklif edir.",
    "focus": [
      "İdman və tədbir stadionları",
      "District Cooling (Soyutma şəbəkələri)",
      "Ali təhsil müəssisələri və şəhərciklər (Education City)"
    ],
    "note": "Qətərin sərt infrastrukturu üçün alman mühəndislik zəmanəti.",
    "focusHeading": "Dohada K Aqua layihələri"
  },
  "istanbul": {
    "regulator": "TSE (Türk Standardları Enstitüsü)",
    "water": "Değişən şəbəkə təzyiqləri: PPRCT-nin elastikliyi su çəkiclərini (water hammer) və təzyiq zərbələrini amortizasiya edir (söndürür).",
    "focus": [
      "Kütləvi mənzil inşası (TOKİ)",
      "Şəhər xəstəxanaları (Mega Hospitals)",
      "Boğaz (Bosphorus) sahili otelləri"
    ],
    "note": "Mükəmməl zəlzələ müqaviməti: Elastik PP-R boruları torpaq yerdəyişmələrində qırılmır.",
    "focusHeading": "İstanbul və Mərmərə bölgəsi"
  },
  "london": {
    "regulator": "WRAS (Water Regulations Advisory Scheme)",
    "water": "London suyu çox sərt və kalsiumla zəngindir. PP-R-ın hamar daxili səthi kalsifikasiyanın (ərp yığılmasının) qarşısını alır.",
    "focus": [
      "Bahalı (Lüks) mənzillərin yenidənqurulması",
      "Canary Wharf kimi ofis qüllələri",
      "Metro (Underground) infrastrukturunun yenilənməsi"
    ],
    "note": "Dar köhnə bina şaftları üçün kiçik və quraşdırması asan mufa qaynaq həlləri.",
    "focusHeading": "London ətrafındakı inkişaf"
  },
  "paris": {
    "regulator": "ACS (Attestation de Conformité Sanitaire)",
    "water": "Orta dərəcədə sərt su. Köhnə (tarixi) binalarda korroziyaya uğramış mis boruların dəyişdirilməsi vacibdir.",
    "focus": [
      "La Défense-da ofis binaları",
      "Lüks otellərin (Palaces) təmiri",
      "Sosial mənzil layihələri (HLM)"
    ],
    "note": "Zərif (həssas) köhnə binaların qismən yenilənməsi üçün mükəmməl keçid fitinqləri.",
    "focusHeading": "Paris layihələri"
  },
  "mailand": {
    "regulator": "UNI / ICIM",
    "water": "Sənaye şəbəkələri və içməli su. Soyutma və isitmə (radiator) üçün PPRCT-dən istifadə olunur.",
    "focus": [
      "Moda və sərgi mərkəzləri",
      "Lombardiya sənaye müəssisələri",
      "Şəhər yeniləmə (Urban Renewal) layihələri"
    ],
    "note": "Dizayn mərkəzi Milan üçün etibarlı bina texnologiyası.",
    "focusHeading": "Milan və Şimali İtaliya"
  },
  "warschau": {
    "regulator": "PZH (Państwowy Zakład Higieny)",
    "water": "Polşada mərkəzi istilik (District heating) çox yayılıb: PPRCT yüksək temperaturlarda əla xidmət edir.",
    "focus": [
      "Göybdələn (Skyscraper) bumu",
      "Logistika və Anbar mərkəzləri",
      "Yaşayış massivləri"
    ],
    "note": "İsti su şəbəkələrində PPRCT borularının istifadəsi enerji səmərəliliyini artırır.",
    "focusHeading": "Varşava şəhərsalma layihələri"
  },
  "prag": {
    "regulator": "SZÚ (Státní zdravotní ústav)",
    "water": "Çexiya standartlarına tam uyğunluq. İsti su şəbəkələrində enerji itkisini azaldır.",
    "focus": [
      "Şəhərətrafı yeni tikililər",
      "Tarixi binaların təmiri",
      "Otellər"
    ],
    "note": "K Aqua, Mərkəzi Avropada ən yaxşı temperatur dayanıqlığını (PPRCT) təqdim edir.",
    "focusHeading": "Praqa layihələri"
  },
  "manama": {
    "regulator": "Bəhreyn Su Qaydaları",
    "water": "Tamamilə duzsuzlaşdırılmış dəniz suyu (Desalinated). Korroziyaya qarşı qorunma ən yüksək prioritetdir.",
    "focus": [
      "Bahrain Bay (Körfəz) inkişaf layihələri",
      "Sənaye obyektləri (ALBA və s.)",
      "Lüks yaşayış binaları"
    ],
    "note": "Körfəz (Gulf) iqliminin çətinliklərinə davamlı xüsusi qatqılar (UV, oksidləşmə).",
    "focusHeading": "Manamada layihələr"
  },
  "maskat": {
    "regulator": "Oman Su və Çirkab Su İdarəsi",
    "water": "Çətin sənaye və şor su şərtləri. K Aqua boruları kimyəvi cəhətdən inertdir.",
    "focus": [
      "Neft və Qaz sənayesi işçiləri üçün qəsəbələr",
      "Lüks turizm layihələri (Resorts)",
      "Hökumət binaları"
    ],
    "note": "Ənənəvi Oman memarlığına problemsiz şəkildə inteqrasiya edən müasir boru texnologiyası.",
    "focusHeading": "Oman sultanlığında K Aqua"
  },
  "kuwait": {
    "regulator": "MEW (Ministry of Electricity and Water)",
    "water": "Yay aylarında su çənləri son dərəcə isti olur. K Aqua PPRCT boruları yüksək istilik və təzyiqə tab gətirir.",
    "focus": [
      "Silk City (İpək Şəhər) layihələri",
      "Xəstəxanalar",
      "Su təmizləmə qurğuları"
    ],
    "note": "Şiddətli temperatur dalğalanmalarına tab gətirən şüşə lif (Fiberglass) ilə gücləndirilmiş borular.",
    "focusHeading": "Küveytdə infrastruktur"
  },
  "kairo": {
    "regulator": "Misir Su Təchizatı Qurumu",
    "water": "Nil suyu şəbəkəsi. Çöküntülər (Sediments) pürüzsüz K Aqua borularında toplanmır.",
    "focus": [
      "Yeni İnzibati Paytaxt (New Capital)",
      "Qahirə metropoliteninin genişləndirilməsi",
      "Kənd təsərrüfatı və suvarma layihələri"
    ],
    "note": "Meqalayihələri təmin etmək üçün kütləvi həcmdə tədarük qabiliyyəti.",
    "focusHeading": "Qahirə və Yeni Paytaxt"
  },
  "nairobi": {
    "regulator": "KEBS (Kenya Bureau of Standards)",
    "water": "Təzyiq dalğalanmaları və nasos sistemləri mövcuddur. K Aqua boruları nasos titrəyişlərini udur.",
    "focus": [
      "Ticarət mərkəzləri (Malls)",
      "Texnoloji parklar (Silicon Savannah)",
      "Təhsil müəssisələri"
    ],
    "note": "Afrika qitəsindəki sürətli urbanizasiyanı Alman mühəndisliyi ilə dəstəkləyirik.",
    "focusHeading": "Keniya layihələri"
  },
  "kapstadt": {
    "regulator": "SABS (South African Bureau of Standards)",
    "water": "Tez-tez quraqlıq səbəbindən sıfır sızma şəbəkələri məcburidir. K Aqua tam sızdırmaz polifüzyon qaynaq (qaynama) sistemi təklif edir.",
    "focus": [
      "Xəstəxanalar",
      "Suya qənaət edən yaşayış layihələri",
      "Otellər və turizm infrastrukturu"
    ],
    "note": "Suyun hər damlası dəyərlidir. Bizim borular suyun israfını və çirklənməsini sıfıra endirir.",
    "focusHeading": "Keyptaunda (Cape Town) suyun mühafizəsi layihələri"
  },
  "mumbai": {
    "regulator": "BIS (Bureau of Indian Standards)",
    "water": "Musson və yüksək rütubət şərtləri. Yoğuşma (kondensasiya) riski səbəbindən plastik borular metaldan qat-qat üstündür.",
    "focus": [
      "Meqapolis (Megacity) göydələnləri",
      "Sənaye və istehsalat müəssisələri",
      "Əczaçılıq sənayesi"
    ],
    "note": "Hindistan bazarında böyük ölçülü kommersiya layihələrini əhatə edirik.",
    "focusHeading": "Mumbay və ətrafı"
  },
  "singapur": {
    "regulator": "PUB (Public Utilities Board)",
    "water": "NEWater (Təkrar emal edilmiş su). PP-R təkrar emal olunmuş sulara və içməli suyun yüksək gigiyena standartlarına mükəmməl uyğunlaşır.",
    "focus": [
      "Məlumat mərkəzləri (Data Centers)",
      "HDB (Housing & Development Board) ictimai yaşayış binaları",
      "Davamlı, yaşıl binalar (Green Buildings)"
    ],
    "note": "Sinqapurun ekoloji standartlarına (Green Mark) tam dəstək verən yaşıl sertifikatlı material.",
    "focusHeading": "Sinqapurun davamlı inkişafı"
  },
  "kualalumpur": {
    "regulator": "SPAN (Suruhanjaya Perkhidmatan Air Negara)",
    "water": "Tropik iqlim şərtləri. Yüksək istilik keçirmə müqaviməti bina daxilindəki kondisioner şəbəkələrində enerjiyə qənaət edir.",
    "focus": [
      "Göybdələnlər və qüllələr",
      "Ticarət kompleksləri",
      "Səhiyyə mərkəzləri"
    ],
    "note": "Malayziyanın sürətli tikinti mühitinə asan və sürətli qaynaq (quraşdırma) həlləri təqdim edirik.",
    "focusHeading": "Kuala Lumpur tikinti sənayesi"
  },
  "amman": {
    "regulator": "JSMO (Jordan Standards and Metrology Organization)",
    "water": "Suyun qıtlığı səbəbindən damla sızma belə qəbuledilməzdir. Etibarlı homogen qaynaq xətləri həyati əhəmiyyət daşıyır.",
    "focus": [
      "Hökumət layihələri",
      "Universitet şəhərcikləri",
      "Böyük yaşayış kompleksləri"
    ],
    "note": "Çətin iqlim şəraitində əməkdaşlığımız və yüksək dayanıqlı borularımız fərq yaradır.",
    "focusHeading": "Amman layihələri"
  }
}

with open("az.json", "r") as f:
    az = json.load(f)

for k, v in translations.items():
    if k in de:
        if "geoContent" not in az: az["geoContent"] = {}
        az["geoContent"][k] = v

with open("az.json", "w") as f:
    json.dump(az, f, indent=2, ensure_ascii=False)
