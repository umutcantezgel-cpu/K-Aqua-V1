import json

patch = {
  "pipes": {
    "meta": {
      "title": "PP-R & PPRCT Boru Sistemləri | K Aqua",
      "desc": "PP-R və PPRCT-dən yüksək performanslı boru sistemləri. İçməli su, iqlim və sənaye üçün Alman mühəndisliyi. Meqalayihələr üçün güzəştsiz təhlükəsizlik."
    },
    "hero": {
      "eyebrow": "Boru Sistemləri",
      "title": "d20-dən d630-a qədər PP-R & PPRCT Boruları",
      "lead": "İçməli su, isitmə və sənaye üçün K Aqua PP-R boruları və PPRCT çoxqatlı boruları: Almaniyada DIN 8077/8078 standartlarına uyğun istehsal edilmiş, bütün təzyiq dərəcələrində tək və ya şüşə lifli kompozit variantlarda mövcuddur. Daimi sızdırmaz birləşmələr üçün d20-dən d630-a qədər təmin edilir."
    },
    "sticky": {
      "eyebrow": "Material Elmi",
      "title": "Mükəmməl Polimer Mühəndisliyi.",
      "lead": "PP-R və PPRCT borularımızın molekulyar strukturu ekstremal termo-mexaniki yüklər üçün optimallaşdırılmışdır. Alman mühəndisliyinin şah əsəri.",
      "items": [
        {
          "title": "PPRCT Çoxqatlı Memarlıq",
          "desc": "Ən yeni nəsil PPRCT (Dəyişdirilmiş Kristallaşma və Temperatur Müqavimətinə malik Polipropilen Random Kopolimerləri) borularımızda inteqrasiya edilmiş şüşə lif (fiberglas) birləşmə təbəqəsi var. Bu, standart PP-R boruları ilə müqayisədə termal uzununa genişlənməni 75%-ə qədər azaldır və yüksək temperaturlarda təzyiqə davamlılığı kəskin şəkildə artırır. Nəticədə, artan axın tutumu ilə yanaşı, daha incə divar qalınlıqları əldə edilir."
        },
        {
          "title": "Homogen Qaynaq",
          "desc": "Mexaniki sıxışdırma fitinqləri və ya yapışdırıcı birləşmələrdən fərqli olaraq, biz polifüzyon qaynaq prosesindən istifadə edirik. Boru və fitinq 260°C-də əriyərək vahid, ayrılmaz bir molekulyar quruluşa çevrilir. Sistem o-ringlər və ya mexaniki contalar olmadan tamamilə işləyir. Birləşmə nöqtəsi fiziki olaraq borunun özündən daha möhkəmdir: 100% sızdırmaz ömür zəmanəti verilir."
        },
        {
          "title": "Mütləq Korroziyasızlıq",
          "desc": "Metal sistemlər aqressiv su keyfiyyəti, aşağı pH və ya yüksək xlorid miqdarı qarşısında təslim olur. K Aqua polimer boruları isə tamamilə reaksiyasızdır (inertdir). Çuxur korroziyası, yarıq korroziyası, qalvanik korroziya və ya ərp əmələ gəlməsi fiziki olaraq qeyri-mümkündür. Borunun sürtünmə itkisi (pürüzlülük dəyəri k=0.007 mm) 50 illik istismardan sonra belə ilk günkü səviyyəsində qalır və bu da nasos enerjisini kəskin şəkildə azaldır."
        },
        {
          "title": "Termal və Akustik İzolyasiya",
          "desc": "PP-R-ın polad (50 W/mK) və ya misə (380 W/mK) nisbətən aşağı istilik keçiriciliyi (0.24 W/mK) sayəsində soyutma sistemlərində kondensasiya yaranması kəskin şəkildə gecikir və isitmə sistemlərində istilik itkiləri minimuma endirilir. Həmçinin, qalın divarlı polimer borularımız axın səslərini və su çəkicini (Water Hammers) effektiv şəkildə udaraq yüksək mərtəbəli binalarda və otellərdə akustik rahatlığı mükəmməlləşdirir."
        }
      ]
    },
    "timeline": {
      "title": "Sıfır Hata Toleransı",
      "desc": "Borularımızın hər santimetri ekstruziya prosesində izlənilir. Qranuldan hazır məhsula qədər: Alman istehsalı keyfiyyəti.",
      "items": [
        {
          "year": "Mərhələ 01",
          "title": "Premium Xammal",
          "text": "Biz yalnız dünyanın qabaqcıl polimer istehsalçılarının yüksək təmizlikli PP-R və PPRCT qranullarını emal edirik. Hər bir partiya ekstruziya üçün təsdiqlənməzdən əvvəl daxili laboratoriyamızda MFR testi (Ərimə Axın Sürəti - Melt Flow Rate) və oksidləşdirici induksiya vaxtı (OIT) ölçmələrindən keçir."
        },
        {
          "year": "Mərhələ 02",
          "title": "Dəqiq Ekstruziya",
          "text": "Bizim ən müasir ekstruziya maşınlarımız mikrometr dəqiqliyi ilə 3 qatlı şüşə lif kompozit borular istehsal edir. 360° üzrə real vaxtda ultrasəs divar qalınlığının ölçülməsi hətta SDR 6 borularında belə icazə verilən minimum tolerantlıqların aşılmamasını təmin edir."
        },
        {
          "year": "Mərhələ 03",
          "title": "Termal Şərtləndirmə (Kondisionerləşdirmə)",
          "text": "Borular ekstruziyadan dərhal sonra xüsusi olaraq temperaturu tənzimlənən su hamamlarında tədricən soyudulur. Bu zərif soyutma prosesi material daxilində daxili qalıq gərginliyin qarşısını alır və bütün ölçülər üzrə yüksək ölçü dəqiqliyini təmin edir."
        },
        {
          "year": "Mərhələ 04",
          "title": "100% İzlənəbilirlik",
          "text": "Hər bir boru, dəqiq partiya (batch) və istehsal vaxtı məlumatı ilə silinməz lazer çapına sahibdir. Hətta on illərlə divarın içində qaldıqdan sonra da, hər bir K Aqua borusunun mənşəyini qranul partiyasına qədər izləmək olar."
        },
        {
          "year": "Mərhələ 05",
          "title": "Sınaq və Təsdiq",
          "text": "95°C-də 1000 saat ərzində hidravlik partlama təzyiqi (burst pressure) testi, dartılma sınaqları, zərbə müqaviməti və toksikoloji təhlükəsizlik testləri. Yalnız bütün standartları (DIN 8077/8078, EN ISO 15874) üstələdikdə məhsul zavodumuzu tərk edə bilər."
        }
      ]
    },
    "bento": {
      "eyebrow": "Spesifikasiyalar",
      "title": "Hər bir tələb üçün fərqli bir ölçü.",
      "lead": "d20 ev birləşmələrindən d500 sənaye qaldırıcı xətlərinə qədər miqyaslana bilən sistemimiz layihənizin ölçüləri ilə birlikdə böyüyür.",
      "items": [
        {
          "title": "d20-dən d500-ə qədər ölçülər",
          "desc": "Borular və fitinqlərin qüsursuz portfeli. Nəhəng ölçülərdə T-birləşmələr, reduksiyalar və ya flanşlı bağlantılar olmasından asılı olmayaraq, biz tam sistemi tək bir mənbədən təmin edirik. Hidravlikada güzəştlər yoxdur."
        },
        {
          "title": "SDR Sinifləri 6 ilə 11 arası",
          "desc": "Müxtəlif Standart Ölçü Nisbətləri (Standard Dimension Ratios - SDR) vasitəsilə fərdiləşdirilmiş təzyiq dərəcələri (PN10-dan PN25-ə qədər). Material istifadəsini və axını optimallaşdırın."
        },
        {
          "title": "İçməli Su Gigiyenası",
          "desc": "Ən sərt Avropa standartlarına (UBA, DVGW) cavab verir. Tamamilə qida üçün təhlükəsizdir, dad və qoxu neytraldır. İstəyə bağlı antibakterial daxili örtük mümkündür."
        },
        {
          "title": "UV-yə Davamlı Xarici Borular",
          "desc": "Ekstremal iqlim zonalarında (məs., Yaxın Şərq) açıq hava quraşdırmaları üçün xüsusi UV-stabilləşdirilmiş borular təklif edirik. Qoruyucu xarici təbəqə UV şüalanmasını bloklayır və polimerin deqradasiyasının qarşısını alır."
        }
      ]
    },
    "cta": {
      "title": "Layihənizi mütəxəssislərə ölçüləndirin.",
      "desc": "İzometriyalarınızı və ya P&ID planlarınızı bizə göndərin. Mühəndislik komandamız meqalayihəniz üçün hidravlik hesablamaları və material siyahılarının hazırlanmasını öz üzərinə götürəcəkdir.",
      "primary": "Layihə sorğusuna başlayın"
    }
  },
  "transitionFittings": {
    "meta": {
      "title": "PP-R Keçid Fitinqləri | Metaldan Plastikə | K Aqua",
      "desc": "Möhkəm PP-R keçid fitinqlərimizlə plastik boruları mövcud metal şəbəkələrə təhlükəsiz şəkildə bağlayın. Daxili və xarici yivlər (dişlər) mövcuddur."
    },
    "hero": {
      "eyebrow": "Sistem Keçidləri",
      "title": "Mükəmməl Birləşmə.",
      "lead": "K Aqua keçid fitinqləri ənənəvi metal infrastruktur ilə qabaqcıl polimer texnologiyamız arasındakı qüsursuz əlaqədir. Ən yüksək mexaniki gərginliklər və maksimum davamlılıq üçün nəzərdə tutulmuşdur."
    },
    "sticky": {
      "eyebrow": "Dizayn Üstünlüyü",
      "title": "Bağlantıda Güzəşt Yoxdur.",
      "lead": "Metal və plastikin birləşdirilməsi material elminin şah əsəridir. K Aqua keçidləri nasosların, klapanların və qazanların təhlükəsiz birləşdirilməsini təmin etmək üçün xüsusi olaraq dizayn edilmişdir.",
      "items": [
        {
          "title": "Fırlanmaya Davamlı",
          "desc": "DZR mis (sinkləşməyə davamlı) taxmalarımız xüsusi səth quruluşuna malikdir. PP-R qəlibləndikdən sonra misə sıxılaraq plastik və metal arasında dönməyə qarşı qırılmaz bir mexaniki əlaqə yaradır."
        },
        {
          "title": "Korroziyaya Davamlı",
          "desc": "Sinkləşməyə davamlı misin istifadəsi, standart mis fitinqləri zədələyən həm ümumi korroziyanı, həm də dezinkifikasiyanı (sinkləşməni) aradan qaldırır. Beləliklə, isti su şəbəkələrində hətta illər keçsə də etibarlı qalır."
        },
        {
          "title": "Kritik Keçidlər",
          "desc": "Orijinal keçid fitinqləri, mövcud polad və ya mis sistemləri müasir, korroziyasız polimer infrastrukturlarla əvəz edərkən bina yenidənqurma işlərinin əsas hissəsini təşkil edir."
        }
      ]
    },
    "timeline": {
      "title": "Bağlantının Arxasındakı Mühəndislik",
      "desc": "Metal və plastik - bu materialları birləşdirmək yüksək texnologiya tələb edir.",
      "items": [
        {
          "year": "Mərhələ 1",
          "title": "Xammalın İşlənməsi (CW617N)",
          "text": "Mis 750°C-də yüksək dəqiqlikli matrislərə sıxılır, ardınca sızdırmaz profili yaratmaq üçün mikrometr diapazonunda CNC ilə idarə olunan emal aparılır."
        },
        {
          "year": "Mərhələ 2",
          "title": "Səthin Passivləşdirilməsi",
          "text": "Qalvanik korroziyanı aradan qaldırmaq üçün yivli (dişli) taxmalar elektrolitik ultrasəs hamamlarında çoxmərhələli passivasiya prosesindən keçir."
        },
        {
          "year": "Mərhələ 3",
          "title": "İnyeksiya Qəlibləmə (Injection Molding)",
          "text": "Yüksək təzyiqli inyeksiya qəlibləmə maşınlarında (2000 bar) əridilmiş PPRCT misin ətrafını sarır. Plastik hər bir alt kəsiyi tamamilə doldurur."
        },
        {
          "year": "Mərhələ 4",
          "title": "Nəzarətli Soyuma",
          "text": "Proqramlaşdırılmış, tədrici temperatur azalması plastik daxilindəki qalıq gərginliklərin qarşısını alır və fitinqin konsentrik forma düzgünlüyünü təmin edir."
        },
        {
          "year": "Mərhələ 5",
          "title": "Təzyiq & Fırlanma Sınağı",
          "text": "120 bar-a qədər təsadüfi partlama sınaqları və uzunmüddətli yorğunluq (fatigue) sınaqları 50 illik ən aqressiv sənaye davamlılığını simulyasiya edir."
        }
      ]
    },
    "stats": {
      "eyebrow": "Sertifikatlar & Parametrlər",
      "title": "Sərt Faktlar.",
      "lead": "Biz yalnız standartlara əsasən sınaqdan keçirmirik. Biz onları müəyyən edirik. Daxili test protokollarımız DVGW, SKZ və ISO tələblərini 300%-ə qədər üstələyir.",
      "items": [
        {
          "label": "İş Təzyiqi (PN)",
          "value": "25 bar-a qədər",
          "sub": "20°C suda"
        },
        {
          "label": "Temperatur Spektri",
          "value": "-20°C-dən +95°C-yə qədər",
          "sub": "110°C-yə qədər pik yük"
        },
        {
          "label": "Yiv Standartları",
          "value": "ISO 7/1, ISO 228",
          "sub": "İç və çöl yiv (diş)"
        },
        {
          "label": "Həyat Dövrü",
          "value": "> 50 İl",
          "sub": "Sənaye şəraitində"
        },
        {
          "label": "Mis Xəlitəsi",
          "value": "CW617N / CW614N",
          "sub": "DZR / Sinkləşməyə davamlı"
        },
        {
          "label": "Plastik",
          "value": "PPRCT / PP-R",
          "sub": "İçməli su üçün sertifikatlı"
        },
        {
          "label": "İçməli Suya Uyğunluq",
          "value": "UBA, DVGW",
          "sub": "100% Qurğuşunsuz (Lead-free) seçimlər"
        },
        {
          "label": "Keyfiyyət Zəmanəti",
          "value": "ISO 9001:2015",
          "sub": "100% Partiya (Batch) İzlənməsi"
        }
      ]
    },
    "cta": {
      "title": "Layihənizin ən güclü əlaqəsi.",
      "desc": "Sübut edilmiş Alman mühəndisliyinə etibar edin. Texniki məlumat vərəqləri (data sheets), BIM modelləri və ya fərdi layihə məsləhətləri üçün bizimlə əlaqə saxlayın.",
      "primary": "Layihə sorğusuna başlayın",
      "secondary": "CAD & Spesifikasiyalar"
    }
  },
  "hero": {
    "eyebrow": "SİSTEM MİMARİSİ",
    "title1": "K-AQUA: SUYUN MÜTLƏQ",
    "title2": "MİMARİSİ.",
    "desc": "Molekulyar səviyyədə dəqiqlik. Əbədiyyət üçün dizayn edilmişdir. Bizim boru sistemlərimiz, fitinqlərimiz və klapanlarımız sənaye və mülki su infrastrukturu üçün qlobal standartı müəyyən edir. Güzəştlərə yer yoxdur. Yalnız xalis performans."
  },
  "sticky": {
    "eyebrow": "MƏHSUL SPEKTRİ",
    "title": "GÜZƏŞTSİZ MÜHƏNDİSLİK.",
    "lead": "Hər bir komponent qapalı, mükəmməl bir sistemin hissəsidir. Daxilolmadan son nöqtəyə qədər, suyun, kimyəvi maddələrin və qazların axınına amansız etibarlılıqla nəzarət edirik.",
    "items": [
      {
        "title": "PPR BORU SİSTEMLƏRİ: YOX EDİLƏ BİLMƏYƏN DAMARLAR",
        "desc": "K Aqua PPR (Polypropylene Random Copolymer) sistemi müasir maye nəqlinin onurğa sütunudur. Homogen bir vahid kimi termal yolla əridilmiş bu sistem ekstremal təzyiqlərə, kimyəvi təsirlərə və termal gərginliklərə davam gətirir. Sızmayan, korroziyaya uğramayan və on illərlə xidmət göstərən bir sistem."
      },
      {
        "title": "FİTİNQLƏR: HƏNDƏSİ MÜKƏMMƏLLİK",
        "desc": "Hər bir K Aqua fitinqi axın mexanikasının şah əsəridir. Azaldılmış kavitasiya, optimallaşdırılmış divar qalınlığı və mikrometr diapazonunda dəqiq tolerantlıqlar minimum təzyiq itkilərinə və maksimum sistem təhlükəsizliyinə zəmanət verir. Axını təsadüfə buraxmırıq."
      },
      {
        "title": "KLAPANLAR VƏ ARMATURLAR: MÜTLƏQ NƏZARƏT",
        "desc": "Dünyanın ən sərt şəraitində fəaliyyət göstərən sənaye bağlayıcı və idarəetmə texnologiyası. Bizim şar valflarımız (kugelhähne), bucaqlı klapanlarımız və çek valflarımız (non-return valves) performans itkisi olmadan on minlərlə dövr (döngü) üçün sınaqdan keçirilmişdir. Maksimum yük altında maksimum sızdırmazlıq."
      },
      {
        "title": "ÇOXQATLI BORULAR: MATERİALLARIN SİNERJİSİ",
        "desc": "Alüminium yüksək performanslı polimerlə qovuşur. K Aqua çoxqatlı boruları metalın mexaniki stabilliyini plastikin elastikliyi və kimyəvi müqaviməti ilə birləşdirir. 100% oksigen sızdırmaz. Minimum uzununa genişlənmə. Mürəkkəb HVAC (İqlimləndirmə) sistemləri üçün mükəmməl həll."
      }
    ]
  },
  "bento": {
    "eyebrow": "PERFORMANS MƏLUMATLARI",
    "title": "TEXNOLOJİ ÜSTÜNLÜK. MƏLUMATLARLA DƏSTƏKLƏNİR.",
    "lead": "K Aqua sistemləri sadəcə borular deyil. Onlar mayelər üçün yüksək performanslı şəbəkələrdir. Ən sərt Alman sənaye standartlarına uyğun dizayn edilmişdir.",
    "items": [
      {
        "title": "Termal Füzyon (Qaynaq)",
        "desc": "Homogen qaynaq tikişləri. Material bir bütövə çevrilir. Uğursuzluğa məruz qala bilən yapışdırıcı və ya sızdırmazlıq halqaları (O-Ringlər) yoxdur. Molekulyar səviyyədə sızmalara qarşı 100% təhlükəsizlik."
      },
      {
        "title": "Korroziya İmmuniteti",
        "desc": "Çuxur korroziyasına, paslanmaya və elektrokimyəvi korroziyaya qarşı mütləq davamlılıq. Nəql edilən mühit öz ən saf vəziyyətində qalır."
      },
      {
        "title": "Axın Optimizasiyası",
        "desc": "Minimum sürtünmə əmsalına (0.007 mm pürüzlülük) malik hamar divar texnologiyası çöküntülərin yığılmasının qarşısını alır və təzyiq itkisini kəskin şəkildə minimuma endirir."
      },
      {
        "title": "Təzyiq Davamlılığı PN25+",
        "desc": "Çoxmərtəbəli binalarda, sənaye obyektlərində və kritik infrastrukturlarda maksimum yüklənmələr üçün konstruksiya edilmişdir. 50 illik problemsiz istismar üçün nəzərdə tutulub."
      }
    ]
  },
  "timeline": {
    "title": "QURAŞDIRMA PROSESİ. YENİDƏN MÜƏYYƏN EDİLDİ.",
    "desc": "Daha Sürətli. Daha Təhlükəsiz. Daha Təmiz. Sistemimiz quraşdırma vaxtını kəskin şəkildə azaldır və səhv mənbələrini minimuma endirir. Səmərəliliyin xronologiyası.",
    "items": [
      {
        "year": "MƏRHƏLƏ 01",
        "title": "PLANLAŞDIRMA VƏ ÖLÇÜLƏNDİRMƏ",
        "text": "Boru diametrlərinin dəqiq hidravlik hesablanması və dizaynı. Üstün axın xüsusiyyətləri sayəsində həddindən artıq ölçüləndirmənin qarşısının alınması."
      },
      {
        "year": "MƏRHƏLƏ 02",
        "title": "KƏSMƏ VƏ HAZIRLIQ",
        "text": "Boruların soyuq və talaşsız (buruqsuz) kəsilməsi. Mükəmməl təmiz kəsim kənarları, heç bir çirklənmə riski olmadan qüsursuz qaynaq hazırlığını təmin edir."
      },
      {
        "year": "MƏRHƏLƏ 03",
        "title": "QIZDIRICI ELEMENTLƏ MUFA QAYNAĞI",
        "text": "Alət həm boruyu, həm də fitinqi dəqiq olaraq 260°C-yə qədər qızdırır. Saniyələr içində ayrılmaz bir molekulyar əlaqə yaranır."
      },
      {
        "year": "MƏRHƏLƏ 04",
        "title": "TƏZYİQ SINAĞI VƏ TƏHVİL-TƏSLİM",
        "text": "Sistem ekstremal test təzyiqi altına salınır. Sızmalara qarşı heç bir tolerantlıq yoxdur. K Aqua ilk damcıdan etibarən 100% təhlükəsizliyi təmin edir."
      },
      {
        "year": "MƏRHƏLƏ 05",
        "title": "ON İLLƏRLƏ DAVAM EDƏN İSTİSMAR",
        "text": "Texniki qulluq tələb etmir. Səssiz işləyir. Sistem dünyanın ən müasir binalarının arxa planında amansız etibarlılıqla fəaliyyət göstərir."
      }
    ]
  }
}

with open("az.json", "r") as f:
    az = json.load(f)

for k, v in patch.items():
    az["products"][k] = v

with open("az.json", "w") as f:
    json.dump(az, f, indent=2, ensure_ascii=False)
