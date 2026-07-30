import json

patch = {
"landwirtschaft": {
  "metaTitle": "Kənd Təsərrüfatı İnfrastrukturu",
  "metaDesc": "K Aqua Kənd Təsərrüfatı (Landwirtschaft): Qlobal aqrar layihələr üçün yüksək performanslı infrastruktur. Alman mühəndisliyi (German Engineering) ilə kompromissiz təhlükəsizlik.",
  "heroEyebrow": "K Aqua Bazarı (Sektoru): Kənd Təsərrüfatı",
  "heroTitle": "Aqrar İnfrastruktur.",
  "heroSubtitle": "Almaniyada Mühəndisləşdirilib (Engineered in Germany).",
  "heroDesc": "Qlobal qida təhlükəsizliyi suvarma zamanı güzəştə (kompromisə) yol vermir. K Aqua dünyanın ən böyük kənd təsərrüfatı (aqrar) layihələri üçün yüksək performanslı sistemlər təqdim edir. Ən ciddi sənaye standartlarına uyğun (dəqiqliklə) istehsal edilmişdir. Boru qırılmasının (partlamasının) milyonlara başa gəldiyi yerdə K Aqua yeganə məntiqi (düzgün) seçimdir.",
  "heroBtnPrimary": "Aqrar layihə üçün sorğu (tələb) göndər",
  "heroBtnSecondary": "Texniki Spesifikasiyaları oxuyun (gözdən keçirin)",
  "section1Eyebrow": "Ölçü (Standart)",
  "section1Title": "Suyun səhra ilə qovuşduğu (qarşılaşdığı) yer.",
  "section1Lead": "Böyük (Nəhəng) suvarma sistemləri Saxaranın mərkəzində və ya Avstraliya çöllərində (çöllüklərində) qurulduqda, (bununla) buğda samandan ayrılır (ən yaxşısı bəlli olur). Ənənəvi sistemlər UV (Ultrabənövşəyi) yükü (təsiri), daimi təzyiq dəyişiklikləri və aqressiv torpaq (qradiyenti) kimyası altında iflasa uğrayır. K Aqua məhz bu ekstremal şərtlər üçün inkişaf etdirilmişdir (yaradılmışdır).",
  "section2Eyebrow": "Texnologiya",
  "section2Title": "Dözümlülüyün (Müqavimətin) Anatomiyası.",
  "section2Lead": "Boru kəməri sistemlərimizin hər bir millimetri polimer (plastik) texnologiyası sahəsində onilliklər boyu (davam edən) Alman tədqiqat və inkişafının nəticəsidir.",
  "scroll1Title": "Mütləq (Tam) UV və hava şəraitinə (iqlimə) davamlılıq",
  "scroll1Desc": "Müasir kənd təsərrüfatı sənayesində boru kəməri sistemləri (şəbəkələri) tez-tez (çox vaxt) illərlə (uzun müddət) rəhmsizcəsinə (amansızca) birbaşa günəş işığına və kəskin temperatur dalğalanmalarına (dəyişikliklərinə) məruz qalır. Xüsusi (patentli) polimer matrisimiz (quruluşumuz) molekulyar səviyyədə deqradasiya olmadan (aşınmadan) UV (Ultrabənövşəyi) radiasiyanı udur (neytrallaşdırır). Nəticə: Səhrada istifadədən onilliklər sonra (belə) heç bir kövrəklik, mikro çatlar yoxdur, 100% struktur bütövlüyü (möhkəmliyi).",
  "scroll2Title": "Mürəkkəb suvarma üçün təzyiq sabitliyi",
  "scroll2Desc": "Böyük sahəli qovşaq (fırlanan) suvarma sistemləri və damcı (suvarma) şlanqları böyük (geniş) məsafələr üzərində sabit, nəhəng (yüksək) su təzyiqi tələb edir. K Aqua sistemləri təzyiq piklərini və hidravlik zərbələri (Water Hammer) kinetik (mexaniki) olaraq yumşaltmaq (azaltmaq) üçün nəzərdə tutulmuşdur. Diksiz (qüsursuz) qaynaq texnologiyası hər bir birləşmədə mütləq (tam) sızdırmazlığa və maksimum resurs (enerji) səmərəliliyi üçün sıfır sızma (qaçaq) tolerantlığına zəmanət verir.",
  "scroll3Title": "Gübrələrə qarşı kimyəvi müqavimət (davamlılıq)",
  "scroll3Desc": "Müasir fertigasiya (maye gübrələrin və pestisidlərin suvarma sistemi vasitəsilə tətbiqi/verilməsi) aqressiv kimyəvi maddələrə, turşulara və qələvilərə (alkalilərə) qarşı yüksək müqavimətə (dözümlülüyə) malik (olan) borular tələb edir. Bizim K Aqua PPR sistemimiz aqrokimyəvi maddələrlə heç bir (sıfır) reaksiyaya girmir, güzgü kimi hamar (pürüzsüz) daxili divarı (səthi) sayəsində çöküntülərin (ərp) yaranmasının qarşısını alır və torpağın sağlamlığını qoruyur.",
  "scroll4Title": "Biotəhlükəsizlik (Bio-təhlükəsizlik) vasitəsilə məhsuldarlığın təminatı",
  "scroll4Desc": "Boru xətlərinin daxilində (içərisində) mikrobioloji (bakteriya) artımı (böyüməsi) bütün (bütöv) məhsulu məhv edə bilər. K Aqua biofilmlərin (bakteriya təbəqələrinin) formalaşmasını və yosunların artımını demək olar ki, qeyri-mümkün edən yapışmayan (anti-adhäsiv) daxili səthdən istifadə edir. Mənbədə təmiz su, bitkidə (tətbiq nöqtəsində) təmiz su olaraq qalır. Qlobal qida təhlükəsizliyi üçün Alman mühəndislik (German Engineering) sənəti.",
  "section3Eyebrow": "Sistemin Üstünlükləri",
  "section3Title": "Mühəndislik (Layihələndirmə) vasitəsilə (gələn) üstünlük.",
  "section3Lead": "K Aqua-nı seçmək riyazi bir əminlikdir (dəqiqlikdir). Mütləq (tam) əməliyyat (istismar) təhlükəsizliyi ilə birlikdə (kombinasiyada) Mülkiyyətin Daha Aşağı Ümumi Dəyəri (TCO/Total Cost of Ownership).",
  "bento1Title": "Homogen Qaynaq",
  "bento1Desc": "O-halqalarını (rezin contaları), yapışqanları və ya mexaniki fitinqləri unudun. K Aqua boruları və fitinqləri (birləşdirici hissələri) molekulyar səviyyədə bir-birinə əriyərək vahid, ayrılmaz (bütöv) bir hissəyə (elementə) çevrilir. Sızma riski riyazi olaraq tam 0%-ə düşür.",
  "bento2Title": "Yüngül Konstruksiya (Dizayn)",
  "bento2Desc": "Metal sistemlərlə (borularla) müqayisədə, K Aqua boruları onun yalnız (kiçik) bir hissəsi qədər ağırlığa (çəkiyə) malikdir. Bu, tikinti (şantiye) logistikasında inqilab edir, nəqliyyat (daşıma) xərclərini əhəmiyyətli dərəcədə (kəskin şəkildə) azaldır və hətta əlçatmaz (çətin gedilən) ərazilərdə belə sürətli quraşdırmaya (çəkilməyə) imkan verir.",
  "bento3Title": "Seysmik Çeviklik (Elastiklik)",
  "bento3Desc": "Material (Maddə) özünəməxsus çevikliyə (elastikliyə) malikdir. Yer (torpaq) hərəkətləri (zəlzələlər), çökmələr (sürüşmələr) və ya kəskin temperatur dəyişiklikləri zamanı boru sistemi (şəbəkəsi) qırılmadan (çatlamadan) uyğunlaşır. Polad qırılır (cırılır), K Aqua əyilir (çeviklik göstərir).",
  "bento4Title": "Güzgü (Kimi) Hamar Hidravlika",
  "bento4Desc": "Sürtünmə əmsalı sıfıra (0-a) yaxındır. Bu, uzun məsafələrdə (xətlərdə) daha az təzyiq itkisi deməkdir və (bunun sayəsində) nasos sistemlərinin (avadanlıqlarının) əhəmiyyətli dərəcədə (çox) kiçik ölçülərdə layihələndirilməsinə imkan verir. Bu (Bu amil), təkcə ilkin (başlanğıc) kapitala qənaət etmir, həm də onilliklər ərzində (uzun müddətdə) enerji xərclərini kütləvi (böyük ölçüdə) şəkildə azaldır.",
  "section4Title": "Bunun üçün (əsas) həyat (qan) damarı",
  "section4Highlight": "Qlobal Meqalayihələr",
  "section4P1": "Suvarma sistemlərinin sıradan çıxması (işləməməsi) minlərlə hektar məhsulun (əkin sahəsinin) tamamilə itirilməsi (məhv olması) deməkdirsə, ənənəvi (standart) göstəricilər (metriklər) artıq (daha) kifayət etmir. Biz etibarlılığı nəsillərlə (uzunömürlü olaraq) ölçürük.",
  "section4P2": "K Aqua sənaye (aqrar) təyinatlı kənd təsərrüfatı xətlərini reallığı (həqiqəti) xeyli (çox) üstələyən istismar (əməliyyat) ssenariləri (şərtləri) üçün sınaqdan keçirib (test edib). Bircə (tək) boru belə Almaniyadakı fabrikimizi (zavodumuzu) tərk etməzdən əvvəl (biz) ekstremal hidravlik zərbələri, yeyici (aqressiv) kimyəvi kokteylləri (qarışıqları) və daimi seysmik mikrovibrasiyaları simulyasiya edirik (canlandırırıq).",
  "section4Stat1Val": "50+",
  "section4Stat1Lbl": "İllik Həyat Dövrü (İstismar Müddəti)",
  "section4Stat2Val": "0%",
  "section4Stat2Lbl": "Korroziya Riski",
  "section5Title": "Əməliyyat (İstismar) Üstünlüyü",
  "section5Desc": "Ən sərt şərtlər altında layihənizi zəmanət altına alan mühəndislik cəhətdən təsdiqlənmiş dəyərlər (parametrlər):",
  "section5List1": "PN20 / SDR 6-ya qədər nominal (işçi) təzyiq",
  "section5List2": "DIN EN ISO 15874 standartına uyğun sertifikatlaşdırılmışdır",
  "section5List3": "Ozon və UV (Ultrabənövşəyi) şüalara mütləq (tam) davamlıdır",
  "section5List4": "Bioloji biofilmin (bakteriya) yaranmasına davamlı (rezistent)",
  "section5List5": "Xətasız (qüsursuz) elektrofüzyon (qaynaq) birləşmə texnologiyası",
  "timelineTitle": "Mükəmməlliyin Xronologiyası (Tarixi)",
  "timelineDesc": "K Aqua sisteminin ilk konsepsiyadan (ideyasından) tutmuş bir ömür (uzun) boyu istismarına qədər sizin aqrar (kənd təsərrüfatı) layihənizə necə uyğunlaşması (xidmət etməsi).",
  "timeline1Year": "Mərhələ 01",
  "timeline1Title": "Simulyasiya & TGA (Bina Texnikası) Dizaynı",
  "timeline1Text": "İnfrastrukturun rəqəmsal (digital) vizuallaşdırılması. Təzyiq pikləri və hidravlik (maye) dinamikası real istehsaldan (çəkilmədən) aylar əvvəl xətasız (qüsursuz) marşrutu təmin etmək (qarantiyalamaq) üçün BIM modellərimizdə (sistemlərimizdə) simulyasiya edilir.",
  "timeline2Year": "Mərhələ 02",
  "timeline2Title": "Molekulyar (Struktur) Konfiqurasiya",
  "timeline2Text": "Almaniyada ekstruziya. PP-R xammalı boruya çevrilir (formalaşır) - layihənizin iqlim (hava) profili üçün fərdi (xüsusi) olaraq hesablanmış, mikrometr (dəqiqliyində) tolerantlıqları olan yüksək gərginliyə davamlı (High-Tension) matris (struktur).",
  "timeline3Year": "Mərhələ 03",
  "timeline3Title": "İnfra-Quraşdırma (İcra)",
  "timeline3Text": "Şantiyədəki (Sahədəki) qüvvələr (komandalar) K Aqua qaynaq texnologiyasından istifadə edərək boruları (sistemi) vahid, homogen bir infrastruktura (şəbəkəyə) birləşdirir (əridir). Mexaniki (klassik) fitinqlər yoxdur. Zəif (həssas) nöqtələr yoxdur.",
  "timeline4Year": "Mərhələ 04",
  "timeline4Title": "Təzyiq Sınağı & Qəbul (Təhvil)",
  "timeline4Text": "Sistemi istismara (istifadəyə) verməzdən əvvəl normativ olaraq sənədləşdirilmiş yüksək təzyiq sınağı. Bu, vəd (söz) deyil (sadəcə), 100% möhkəmliyə (sızdırmazlığa) zəmanət verən rəsmi (qanuni), hüquqi cəhətdən etibarlı (təsdiqlənmiş) sənəddir.",
  "timeline5Year": "Mərhələ 05",
  "timeline5Title": "Baxımsız (Xidmətsiz) İstismar",
  "timeline5Text": "Gələcək nəsillər üçün çalışır. Layihə heç bir (əlavə) texniki xidmət (qulluq), pasdan (korroziyadan) qorunma (təmizləmə) və dəyişdirmə hissələri olmadan etibarlı şəkildə istismar edilir. Güzəştsiz Alman mühəndisliyinin (German Engineering) nəticəsi."
},
"ctaBtn1": "Sənaye Departamentimizlə Əlaqə",
"ctaBtn2": "Spesifikasiyaları yüklə (Download)",
"ctaDesc": "Növbəti meqalayihənizin spesifikasiyaları (təfərrüatları) haqqında birbaşa bizim mühəndislik (layihələndirmə) komandamızla danışın.",
"ctaTitle": "Gözüyumlu etibar edə (güvənə) biləcəyiniz keyfiyyət."
}

with open("az.json", "r") as f:
    az = json.load(f)

for k, v in patch.items():
    if k.startswith("cta"):
        az["markets"]["landwirtschaft"][k] = v
    else:
        az["markets"][k] = v

with open("az.json", "w") as f:
    json.dump(az, f, indent=2, ensure_ascii=False)
