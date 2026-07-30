import json

patch = {
  "schulungen": {
    "hero": {
      "title1": "Sənaye Elitasının",
      "title2": "Sınaqdan Keçirilməsi.",
      "desc": "K Aqua təlim proqramı adi bir təhsil deyil. Bu, Alman boru kəməri mühəndisliyinin güzəştsiz dünyasına bir başlanğıcdır. Material çatışmazlığının (qüsurunun) bir seçim deyil, mütləq bir fəlakət olduğu meqalayihələrə cavabdeh olan mühəndislər və texniklər üçün. Biz mikrometrlərlə öyrədirik, on illərlə düşünürük.",
      "cta1": "Akademiyaya müraciətə başlayın",
      "cta2": "Tədris proqramına baxın"
    },
    "manifesto": {
      "title1": "Dəqiqlik",
      "title2": "<span className=\"text-primary\">təsadüfi</span>",
      "title3": "deyil.",
      "p1": "Bu, amansız metodologiyanın və soyuqqanlı sənaye intizamının nəticəsidir. Minlərlə kubmetr su böyük təzyiq altında 100 mərtəbəli göydələnin həyat damarlarından pompalandıqda, təxmini dəyərlərə və ya şərhlərə yer qalmır.",
      "p2": "K Aqua təlim proqramı nəzəri biliklərlə qüsursuz maşın mükəmməlliyi arasındakı boşluğu doldurmaq üçün hazırlanmışdır. Akademiyamızda təlim keçənlər artıq sadə bir sənətkar kimi çıxış etmirlər. Onlar mükəmməl, deterministik sistemin icraedici orqanına çevrilirlər."
    },
    "typography": {
      "t1": "SIFIR SƏHV",
      "t2": "TOLERANTI."
    },
    "curriculum": {
      "eyebrow": "TƏDRİS PROQRAMI",
      "title": "Akademik Güzəştsizlik.",
      "lead": "Dörd modul. Bir doktrina. Tədris proqramımızın hər bir seqmenti icra mərhələsindəki zəiflikləri (boşluqları) müəyyən etmək və onları sistemli şəkildə yox etmək üçün tərtib edilmişdir."
    },
    "sticky": {
      "items": [
        {
          "title": "Modul Alfa: Axın Mexanikası və Kinetikası",
          "desc": "Suyun riyaziyyatı. Biz mürəkkəb kavitasiya effektlərini və təzyiq zərbəsi ssenarilərini hesablana bilən dəyişənlərə ayırırıq. Siz hidrodinamik şok simptomlarını sadəcə yumşaltmağı deyil, həm də sistemli şəkildə aradan qaldırmağı öyrənirsiniz. Tam və səssiz mükəmməlliklə işləyən boru şəbəkələri üçün."
        },
        {
          "title": "Modul Beta: Parametrik Boru Xətti Dizaynı",
          "desc": "Alqoritmik nizam-intizam kimi boru kəməri sistemlərinin layihələndirilməsi. Təlim materialdan istifadəni optimallaşdırmaq və toqquşmaları (clashes) yoxlamaq üçün ən müasir CAD/BIM alətlərinin istifadəsini əhatə edir. Təxminlərə yer yoxdur. Saf, soyuqqanlı hesablama."
        },
        {
          "title": "Modul Qamma: Gigiyena Memarlığı və Mikrobiologiya",
          "desc": "Struktur səviyyədə Legionella profilaktikası. Mürəkkəb dairəvi sistemlərdə (loop systems) ölü xətlərdən (dead lines) necə qaçınmaq, durğunluq zonalarını necə yox etmək və su temperaturunun təbəqələşməsinə (stratifikasiyasına) necə nəzarət etmək olar. Təmizliyi sistem diktə edir, biz heç nəyi təsadüfə buraxmırıq."
        },
        {
          "title": "Modul Delta: Termo-Fizika və Davamlılıq (Kinetika)",
          "desc": "Fiziki stressə tab gətirmək. Polimerlərin istilik genişlənməsini və büzülməsini hesablamaq. Gərginliyi dağıtmaq üçün sabit nöqtələri (fiks nöqtələrini) və genişləndirmə (kompensasiya) dirsəklərini elmi dəqiqliklə yerləşdirmək. Sıfır material yorğunluğu (fatigue) ilə 50 illik istismar üçün."
        }
      ]
    },
    "timeline": {
      "title": "YETİŞDİRMƏ XRONOLOGİYASI.",
      "desc": "Biz insanları sadəcə öyrətmirik. Biz onları kalibrləyirik (tənzimləyirik). Sertifikatlaşdırılmış sistem memarına gedən amansız yol.",
      "items": [
        {
          "year": "HƏFTƏ 01",
          "title": "NƏZƏRİ DOKTRİNA",
          "text": "Fizika qanunlarına və material elminə (polimer fizikasına) dərin inteqrasiya. Qəbul olunmuş praktikalardan uzaqlaşma və mühəndislik reallığına yönəlmə."
        },
        {
          "year": "HƏFTƏ 02",
          "title": "SİMULYASİYA VƏ PLANLAŞDIRMA",
          "text": "K Aqua proqram təminatı mühitində şəbəkə dizaynı. Tələbələr şəhər miqyaslı (metropoliten səviyyəli) şəbəkələr layihələndirir və proqram onları kəskin şəkildə sınaqdan keçirir."
        },
        {
          "year": "HƏFTƏ 03",
          "title": "TƏTBİQİ MÜHƏNDİSLİK (MEXANİKA)",
          "text": "Materialla birbaşa iş. İri (böyük) qaynaq avadanlıqlarının, elektrofüzyon cihazlarının istifadəsi və millimetrlik dəqiqliklə təzyiq altında yerinə yetirilmə."
        },
        {
          "year": "HƏFTƏ 04",
          "title": "SINAQ (TƏFTİŞ) VƏ SERTİFİKATLAŞDIRMA",
          "text": "Yekun imtahan xətaları bağışlamır. Tam quraşdırılmış sistemin ekstremal təzyiq sınağı (testi). Sızan hər damcı dərhal kəsilməyə (uğursuzluğa) səbəb olur."
        }
      ]
    },
    "spec": {
      "title": "Sertifikatlaşdırma (Test) Parametrləri",
      "p1": "Bizim buraxılış testlərimiz ən yüksək Avropa sənaye standartlarına (ISO/DVS) əsaslanır. Keçid balı yoxdur. Yalnız tam (mütləq) uğur və ya uğursuzluq var.",
      "list": [
        {"val": "100%", "label": "Nəzəri (Test) Keçid Həddi"},
        {"val": "25 bar", "label": "Təzyiq Sınağı"},
        {"val": "0 mm", "label": "Xətt (Ox) Toleransı"},
        {"val": "DVS", "label": "Təsdiqləmə (Sertifikatlaşdırma) Modeli"}
      ]
    },
    "cta": {
      "title1": "Mükəmməllik.",
      "title2": "Öyrənilə (tətbiq edilə) bilər.",
      "button": "Proqrama qoşulun"
    }
  },
  "zertifizierung": {
    "hero": {
      "title1": "Nizamlama (Standart)",
      "title2": "Xaosun Qarşısında.",
      "desc": "Qlobal miqyasda mürəkkəb infrastruktur layihələrini idarə edərkən standartlaşdırma yalnız bir təlimat deyil - bu, son müdafiə xəttidir. K Aqua-nın sertifikatlaşdırma proqramı şübhəyə yer qoymur və fəlakətli uğursuzluq (versagen) ehtimalını ləğv edir.",
      "cta1": "DVS Təlimatlarını Yükləyin",
      "cta2": "Sertifikatlaşdırma Auditi Tələb Edin"
    },
    "manifesto": {
      "title1": "Sənaye",
      "title2": "Standartları",
      "title3": "Mütləqdir.",
      "p1": "Güzəştlər çökmüş sistemlərə aparan ilk addımdır. Yüzlərlə qaynaq birləşməsinin divarların və ya təməllərin arxasında (altında) dəfn edildiyi bir şəbəkədə subyektiv fərziyyələrə yer yoxdur. Sızdırmazlığın tək bir tərifi var: Sıfır sızma.",
      "p2": "Biz Alman mühəndisliyinin sərt qanunları, xüsusən də DVS 2207-11 (Alman Qaynaq Cəmiyyəti - German Welding Society) üzrə fəaliyyət göstəririk. Bu normativlər bələdçi deyil; onlar fizikanın qanunları kimi dəqiq şəkildə qəbul edilməli olan riyazi göstərişlərdir."
    },
    "bento": {
      "items": [
        {
          "title": "DVS 2207-11: Qanun",
          "desc": "Termoplastiklərin qaynağı (PP) üçün Alman sənaye standartı (Norm). O, qızdırıcı elementin (matrisin) temperaturunu, isinmə müddətlərini (vaxtlarını), çevirmə vaxtlarını və soyuma intervallarını mütləq riyazi dəqiqliklə diktə edir. K Aqua sertifikatlı hər bir ustadan bu cədvəli əzbərləməsi və avtomatik tətbiq etməsi tələb olunur."
        },
        {
          "title": "Kinetik (Təzyiq) Sınağı",
          "desc": "Heç bir quraşdırma yoxlanılmadan buraxılmır. DIN EN 806-4 standartına uyğun olaraq aparılan təzyiq sınaqları sistemin maksimum yük limitinə (nominal təzyiqin 1.5 qatına qədər) qədər itələnməsini tələb edir. Dəyişən temperatur sınaqları materialın strukturunu kəskin şəkildə yoxlayır."
        },
        {
          "title": "İzləniləbilirlik (Traceability) və Dokumentasiya (Sənədləşdirmə)",
          "desc": "K Aqua şəbəkəsindəki hər bir əsas qaynaq tikişi qeyd olunur. Müasir elektrofüzyon (Electrofusion) cihazları qaynaq prosesinin məlumatlarını, barkod nömrələrini (kodlarını), temperatur profillərini və hətta mühit (ətraf) şəraitini qeyd edərək bulud (cloud) sistemində rəqəmsal bir audit izi (digital audit trail) yaradır."
        },
        {
          "title": "Təlimat (Təlim) Lisenziyası",
          "desc": "Yalnız K Aqua sertifikatına malik podratçılara (icraçılara) beynəlxalq zəmanətimizlə əhatə olunan (sığortalanan) sistemləri quraşdırmağa icazə verilir. Sertifikatlaşdırma (lisenziya) hər üç ildən bir yenilənməlidir; keyfiyyətə nəzarətdən kənarda qalmaq (düşmək) lisenziyanın (zəmanətin) dərhal ləğvi deməkdir."
        }
      ]
    },
    "certifications": {
      "eyebrow": "QLOBAL UYĞUNLUQ",
      "title": "Təsdiq (Təsdiqlənmə) Nişanələri.",
      "lead": "Bizim borularımız dünyanın ən sərt laboratoriyalarında - Almaniyadan Avstraliyaya qədər sınaqdan keçirilmişdir.",
      "items": [
        {"title": "DVGW", "subtitle": "Almaniya", "text": "İçməli su üçün toksikoloji uyğunluq (təhlükəsizlik) və əyilmə dayanıqlığı (müqaviməti)."},
        {"title": "SKZ", "subtitle": "Almaniya", "text": "Daimi monitorinq ilə davamlı (fasiləsiz) qabarıq hidravlik sınaq və termal dayanıqlıq (stabillik)."},
        {"title": "WRAS", "subtitle": "Birləşmiş Krallıq", "text": "Britaniyanın içməli su şəbəkələrində tam (mütləq) istifadə üçün icazə (təsdiq)."},
        {"title": "KIWA", "subtitle": "Niderland", "text": "Şiddətli (aqressiv) su şərtləri altında materialın (boru infrastrukturunun) tam toxunulmazlığı (bütövlüyü)."}
      ]
    },
    "lab": {
      "title1": "K Aqua",
      "title2": "Laboratoriyası.",
      "desc": "Fabrikimizdəki daxili sınaq (test) avadanlıqlarımız rəsmi sınaq institutlarından (laboratoriyalarından) daha rəhmsizdir (sərtdir). Biz partlama (burst pressure) sınaqlarında boruları bilərəkdən məhv edilmə həddinə çatdırırıq, beləliklə, onların real iş şəraitində heç vaxt xəta etməyəcəklərini (versagen) qarantiyaya alırıq.",
      "stats": [
        {"val": "120+", "label": "Bar Dağıdıcı Partlama Təzyiqi (Burst Pressure)"},
        {"val": "8760+", "label": "Saatlarla (Saatlıq) Davamlı Termal Sınaq (İsti Sınağı)"},
        {"val": "0.007", "label": "mm Daxili (Pürüzlülük) Sürtünmə Əmsalı"}
      ]
    },
    "timeline": {
      "title": "SERTİFİKATLAŞDIRMA (TƏSDİQLƏNMƏ) PROSESİ.",
      "desc": "Tərəfdaşlarımızın necə yoxlanıldığını (sertifikat aldığını) addım-addım görün.",
      "items": [
        {
          "year": "MƏRHƏLƏ 01",
          "title": "SƏNƏDLƏŞDİRMƏ VƏ AUDİT (NƏZƏRDƏN KEÇİRMƏ)",
          "text": "Mövcud layihələrin, avadanlıqların saxlanılmasının və mühəndislik (planlaşdırma) komandasının (qrupunun) biliklərinin nəzərdən keçirilməsi."
        },
        {
          "year": "MƏRHƏLƏ 02",
          "title": "USTALIQ (USTA DƏRƏCƏSİ) TƏLİMİ",
          "text": "Seçilmiş işçilərin K Aqua mühəndisləri (Mütəxəssisləri) tərəfindən DVS standartları üzrə intensiv (dərinləşdirilmiş) təlimi."
        },
        {
          "year": "MƏRHƏLƏ 03",
          "title": "PRAKTİK QİYMƏTLƏNDİRMƏ (SINAQ)",
          "text": "Təzyiq (Stress) sınağı. İştirakçılar nəzarət altında (mürəkkəb) kompleks qaynaq sxemlərini həyata keçirməlidir. (Sıfır xəta)."
        },
        {
          "year": "MƏRHƏLƏ 04",
          "title": "SERTİFİKATIN (LİSENZİYANIN) VERİLMƏSİ",
          "text": "Şirkət 3 illik qlobal icazə (zəmanət statusu) alır. Mütəmadi nəzarət yoxlamaları məcburidir."
        }
      ]
    },
    "cta": {
      "button1": "Təftiş (Sertifikat) Auditinə Başla",
      "button2": "DVS Sənədlərini (Standartlarını) Yüklə"
    }
  },
  "glossar": {
    "hero": {
      "title1": "Boru Kəməri",
      "title2": "Leksikonu.",
      "desc": "Mükəmməl mühəndislik dəqiq dildən (terminologiyadan) başlayır. Qarışıqlığa (qeyri-müəyyənliyə) yer yoxdur. Sənaye standartlarına (normativlərinə) və polimer fizikasına əsaslanan terminlərin (anlayışların) və anlayışların qəti (izahlı) lüğəti.",
      "cta1": "Terminləri Axtar",
      "cta2": "PDF Formatında Yüklə"
    },
    "manifesto": {
      "title1": "Dəqiq Dil",
      "title2": "Dəqiq Nəticələr",
      "title3": "Verir (Yaradaraq).",
      "p1": "Qeyri-müəyyənlik sistemlərin çökməsinə (dağılmasına) gətirib çıxarır. Bir mühəndis SDR-i PN ilə səhv salanda, o, bütöv bir göydələnin su infrastrukturunu təhlükəyə atır. Texniki təfərrüatların düzgün (aydın) təyini pedantik (xırdaçı) bir iş deyil - bu, təhlükəsizliyin əsasıdır.",
      "p2": "K Aqua lüğəti sadəcə təriflər (izahlar) siyahısı deyil; o, peşəkarların eyni tezlikdə (kontekstdə) işləməsini təmin edən kalibrləmə alətidir. Qlobal komandaların və beynəlxalq tikinti sahələrinin koordinasiyası üçün."
    },
    "scroll": {
      "items": [
        "SDR (Standard Dimension Ratio - Standart Ölçü Nisbəti)",
        "PPRCT (Yüksək Temperaturlu Random Kopolimer PP)",
        "MFR (Ərimə Axın Sürəti - Melt Flow Rate)",
        "Polifüzyon Qaynağı (Polyfusion)",
        "Oksidləşdirici İnduksiya Vaxtı (OIT)",
        "DVS 2207-11 Standartı",
        "Kavitasiya (Cavitation)",
        "Termal Qalıq Gərginlik (Eigenspannung)",
        "Sürünmə Kəsilməsi Əyrisi (Creep Rupture Curve)"
      ]
    },
    "bento": {
      "eyebrow": "ƏSAS TERMİNLƏR (KONSEPSİYALAR)",
      "title": "Terminologiyanın (Lüğətin) Açılışı.",
      "lead": "Sistem (Layihələndirmə) planlaşdırılması üçün kritik olan (tələb olunan) anlayışların tərifi.",
      "items": [
        {
          "title": "SDR (Standart Ölçü Nisbəti)",
          "desc": "Xarici diametrin divar qalınlığına nisbəti (d/s). Kiçik SDR, daha yüksək təzyiqə davamlılığa bərabər olan (işarə edən) daha qalın (kəskin) boru divarını bildirir."
        },
        {
          "title": "PPRCT",
          "desc": "Dəyişdirilmiş (modifikasiya olunmuş) kristallıq (məməcikli struktura malik) və artan temperatur müqaviməti olan (davamsız) polipropilen random kopolimeri. Gələcək nəsillər (Yeni Nəsil) üçün ən yüksək səmərəliyə malik (davamlı) boru materialı."
        },
        {
          "title": "Polifüzyon",
          "desc": "İki (və ya daha çox) polimerin molekulyar səviyyədə termal qaynağı (homogen birləşdirilməsi). Qaynaq birləşməsi (tikişi) ən azı əsas boru (material) qədər davamlı (elastik) və möhkəmdir."
        },
        {
          "title": "OIT (Oksidləşdirici İnduksiya Vaxtı)",
          "desc": "Polimerin oksidləşməsinə qarşı nə qədər dayanıqlı (stabil) olduğunu təyin (ölçmək) edən əsas göstərici (sınaq parametri). Polimerin qocalma (köhnəlmə) və istismar müddətini təyin (sübut) etmək üçün xidmət edir."
        }
      ]
    },
    "timeline": {
      "title": "QAYNAQ ÜSULLARI",
      "desc": "Hər bir əlaqə (qaynaq) növünün qısa xülasəsi.",
      "items": [
        {
          "year": "HƏFTƏ 01",
          "title": "MUFA (Yuva) QAYNAĞI (Socket Welding)",
          "text": "Kiçik və orta ölçülü borular (d20-dən d125-ə qədər). Boru (sistem) isidilir (istilik verilir) və mufanın içərisinə birbaşa yeridilir (daxil edilir)."
        },
        {
          "year": "HƏFTƏ 02",
          "title": "ALIN QAYNAĞI (Butt Welding)",
          "text": "Böyük diametrli borular (d160-dan yuxarı) üçün tətbiq olunur. Boruların (iki kənarın) ucları təmizlənir, əridilir (qızdırılır) və yüksək təzyiqlə (presslə) bir-birinə bərkidilir (sixilir)."
        },
        {
          "year": "HƏFTƏ 03",
          "title": "ELEKTROFÜZYON (Elektromufa) QAYNAĞI",
          "text": "Məhdud yerlərdə (dar məkanlarda) mürəkkəb quraşdırmalar (məntəqələr) üçün istifadə olunur. Mufanın (fitinqin) içindəki mis (qızdırıcı) məftillər elektrik cərəyanı (birləşməsi) ilə avtomatik (elektrik istiliyi) olaraq qızdırılır (əridilir) və qaynaqlanır."
        }
      ]
    },
    "conclusion": {
      "title1": "Heç Nəyi Təsadüfə",
      "title2": "Buraxmırıq (Buraxmayın).",
      "desc": "Texniki cəhətdən səhv (yanlış) anlaşılmalar baha başa gələ bilər. Layihənizdə (sisteminizdə) müvəffəqiyyəti təmin etmək üçün K Aqua Lüğətini standart istinadınız (bələdçiniz) kimi istifadə edin.",
      "stats": [
        {"val": "200+", "label": "Təyin Olunmuş Termin (Əsas Konsepsiya)"},
        {"val": "ISO", "label": "Standartlarına Uyğun (Göstəricilər)"},
        {"val": "100%", "label": "Həqiqi İzah (Dəqiq Aydınlıq)"}
      ]
    },
    "cta": {
      "title1": "Elmin Təməli.",
      "title2": "Əlinizin (Ehtiyacınızın) Altında.",
      "button": "PDF Versiyasını Endirin (Lüğəti Yükləyin)"
    }
  },
  "videos": [
    {
      "id": "socket-welding",
      "title": "Mufa Qaynağı (Socket Welding)",
      "desc": "d20-dən d125-ə qədər borular üçün standart (klassik) polifüzyon qaynağı. Əl cihazları (maşınları) və isitmə müddəti (temperatur) qaydaları."
    },
    {
      "id": "butt-welding",
      "title": "Alın Qaynağı (Butt Welding)",
      "desc": "Böyük sənaye ölçüləri (d160-dan d630-a qədər) üçün CNC (maşınla) idarə olunan (nizamlanmış) qaynaq."
    },
    {
      "id": "electrofusion",
      "title": "Elektrofüzyon Qaynağı (Electrofusion)",
      "desc": "Elektromufa (Electrofusion) fitinqlərinin istifadəsi və barkod skaneri (scanner) vasitəsilə qaynaq cihazının qurulması."
    },
    {
      "id": "weld-in-saddle",
      "title": "Qaynaq Yəhərləri (Weld-in Saddles)",
      "desc": "Əsas (şəbəkə) boruyu tam kəsmədən, T-birləşmələrə alternativ olaraq şaxələnmə (yeni bağlantıların quraşdırılması) üsulu."
    }
  ],
  "quiz": [
    {
      "q": "PPRCT sistemləri (boruları) nədə (hansı xüsusiyyətlərində) fərqlənir?",
      "a": [
        "Yalnız (tək) yüksək rütubətli bölgələrdə istifadə olunur.",
        "Artan temperaturda (istilik şəraitində) yüksək (daha böyük) təzyiq müqaviməti.",
        "Korroziyaya (paslanmağa) daha çox meyillidir.",
        "Onların mütləq yapışdırılması lazımdır."
      ],
      "correct": 1
    },
    {
      "q": "Qaynaq cihazının (matrisinin) düzgün (standart) iş temperaturu (dərəcəsi) nə qədərdir?",
      "a": ["200°C", "240°C", "260°C", "300°C"],
      "correct": 2
    },
    {
      "q": "DVS 2207-11 nədir?",
      "a": [
        "Polipropilenin termal (polifüzyon) qaynağı üçün əsas Alman standartı.",
        "İçməli suyun (su xəttinin) filtrasiya (təmizlənmə) standartı.",
        "Göydələnlərin layihələndirilməsi norması.",
        "Materialın (xammalın) istilik genişlənmə ölçüsü."
      ],
      "correct": 0
    },
    {
      "q": "SDR (Standard Dimension Ratio) nəyi ifadə (təyin) edir?",
      "a": [
        "Müqavimətin temperatur dəyişməsi əmsalını (Nisbətini).",
        "Xarici (xarici) diametrin boru divarının (divar) qalınlığına olan nisbətini (ölçüsünü).",
        "Sıxlıq (Dərinlik) və Dözümlülük Standartını.",
        "Sistemin Maksimum Təzyiq həddini."
      ],
      "correct": 1
    },
    {
      "q": "Alın qaynağı (Butt Welding) hansı ölçülər (diametrlər) üçün tətbiq olunur?",
      "a": ["Yalnız d20-dən d63-ə qədər (ölçülərdə).", "Yalnız d160-dan d630-a (və daha böyük) qədər ölçülərdə.", "Bütün (hər cür) diametrlər üçün.", "Yalnız sənaye kranlarında (vana)."],
      "correct": 1
    }
  ]
}

with open("az.json", "r") as f:
    az = json.load(f)

for k, v in patch.items():
    if k in az["academy"]:
        if isinstance(v, dict) and isinstance(az["academy"][k], dict):
            az["academy"][k].update(v)
        else:
            az["academy"][k] = v
    else:
        az["academy"][k] = v

with open("az.json", "w") as f:
    json.dump(az, f, indent=2, ensure_ascii=False)
