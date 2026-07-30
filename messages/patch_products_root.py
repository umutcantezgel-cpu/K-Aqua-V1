import json

patch = {
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
