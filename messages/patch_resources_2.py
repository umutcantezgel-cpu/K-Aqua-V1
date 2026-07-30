import json

patch = {
  "downloads": {
    "hero": {
      "eyebrow": "Texniki Kitabxana",
      "title1": "Mühəndislik (Layihə) Məlumatları.",
      "title2": "Sadələşdirilmiş (Kataloqlaşdırılmış).",
      "desc": "Texniki planlaşdırma sənədlərimizin, quraşdırma təlimatlarımızın (montaj rəhbərliklərinin) və beynəlxalq ISO sertifikatlarımızın rəsmi arxivi. Sistem arxitekturası (memarlığı) üçün (lazım olan) bütün məlumatlar bir baxışda (əlçatan).",
      "searchPlaceholder": "Məsələn, 'Kataloq 2024' və ya 'SKZ Sertifikatı' axtarın...",
      "noResults": "Heç bir nəticə tapılmadı. Zəhmət olmasa başqa bir axtarış termini yoxlayın."
    },
    "categories": {
      "all": "Bütün sənədlər",
      "catalog": "Kataloqlar və Broşürlər",
      "manual": "Quraşdırma (Montaj) Təlimatları",
      "certificate": "Sertifikatlar və Təsdiqlər (Laboratoriya Rəyləri)",
      "specs": "Texniki Məlumat Vərəqləri"
    },
    "table": {
      "name": "Sənədin adı",
      "category": "Kateqoriya",
      "size": "Ölçü",
      "download": "Yüklə"
    },
    "docs": [
      {
        "id": "catalog-main-2024",
        "title": "K Aqua Əsas Kataloqu (Baş Kataloq) 2024",
        "category": "catalog",
        "size": "12.4 MB"
      },
      {
        "id": "manual-welding",
        "title": "Təlimat: DVS 2207-11-ə uyğun olaraq Polifüzyon Qaynağı",
        "category": "manual",
        "size": "3.1 MB"
      },
      {
        "id": "cert-skz",
        "title": "SKZ Sertifikatı (Təsdiqi) – PP-R & PPRCT Boru Sistemləri",
        "category": "certificate",
        "size": "1.8 MB"
      },
      {
        "id": "cert-dvgw",
        "title": "DVGW Sertifikatı – İçməli Suya Uyğunluq (Təhlükəsizliyi)",
        "category": "certificate",
        "size": "2.0 MB"
      },
      {
        "id": "spec-pressure",
        "title": "Sürünmə Kəsilməsi Gücü (Creep Rupture Strength) & Təzyiq Cədvəlləri SDR 6 / 7.4 / 11",
        "category": "specs",
        "size": "4.5 MB"
      },
      {
        "id": "manual-electrofusion",
        "title": "Elektrofüzyon (Elektromufa) Qaynağı üçün Quraşdırma (Montaj) Təlimatları",
        "category": "manual",
        "size": "2.2 MB"
      },
      {
        "id": "cert-iso9001",
        "title": "ISO 9001:2015 Keyfiyyət İdarəetmə (Management) Sistemi",
        "category": "certificate",
        "size": "1.1 MB"
      }
    ],
    "metaTitle": "Yükləmələr (Downloads): Kataloqlar, Təlimatlar & Sertifikatlar"
  },
  "bim": {
    "hero": {
      "eyebrow": "Rəqəmsal (Digital) Əkizlər",
      "title1": "BIM Modelləri.",
      "title2": "Toqquşmasız (Clash-free) Planlaşdırma.",
      "desc": "K Aqua boru sistemlərini birbaşa Revit və ya AutoCAD layihələrinizə inteqrasiya edin. Məlumatla zənginləşdirilmiş (geniş) 3D ailələrimiz (komponentlərimiz) kəsişmədən (toqquşmasız) dizayna, dəqiq kütlə (həcm) hesablamalarına və qüsursuz tikinti icrasına (həyata keçirilməsinə) zəmanət verir.",
      "cta1": "BIM Modellərini Yükləyin (Endirin)",
      "cta2": "Ailələri (Families) Gözdən Keçirin (Keçir)"
    },
    "manifesto": {
      "title1": "CAD bitir (başa çatır).",
      "title2": "BIM başlayır.",
      "p1": "Gələcəyin arxitekturası 2D xətlərdə deyil, obyekt yönümlü verilənlər bazalarında layihələndirilir. Hər kəsişmənin (toqquşmanın) minlərlə avroya başa gəldiyi (zərər vurduğu) meqalayihələrdə və ya hər santimetrin (dəqiqliyin) vacib olduğu mürəkkəb bina xidmətləri layihələrində məlumatın dəqiqliyi fərq yaradır.",
      "p2": "Buna görə də, biz BIM komponentlərimizi kütlələrdən (nəhəng kitabxanalardan) alınan sadəcə qrafik (həndəsi) məlumatlar (obyektlər) kimi deyil, ağıllı, parametrik qovşaqlar (düyünlər) kimi başa düşürük (təqdim edirik). Onlar real vaxt rejimində (real-time) material (boru) xüsusiyyətlərini, təzyiq itkisi əmsallarını (göstəricilərini) və məkan tələblərini simulyasiya edir. K Aqua ilə sizin rəqəmsal modeliniz reallıq qədər dəqiqdir."
    },
    "bento": {
      "eyebrow": "Məlumat Zənginliyi",
      "title": "Ağıllı Komponentlər (Parametrik modellər).",
      "lead": "Sistem (Boru kəməri) dizaynınızı rəqəmsal əkizlə (digital twin) optimallaşdırmaq üçün hər (bütün) detal modellərimizə inteqrasiya edilmişdir.",
      "items": [
        {
          "title": "Yerli (Native) Revit Formatı (.rfa)",
          "desc": "Xarici (üçüncü tərəf) plaginlərə (qoşmalara) və ya konvertasiya zədələrinə ehtiyac (tələb) olmadan birbaşa (tamamilə) inteqrasiya. Bizim boru sistemlərimiz Autodesk Revit-də rəvan (asan) marşrutlaşdırma (routing) üçün avadanlıq (komponent) ailələri kimi yerli (orijinal formatda) proqramlaşdırılıb."
        },
        {
          "title": "Avtomatik Marşrutlaşdırma Seçimləri (Routing Preferences)",
          "desc": "Siz sadəcə borunu çəkirsiniz. Revit, sizin bucaqlarınıza və ölçülərinizə əsaslanaraq avtomatik olaraq düzgün (müvafiq) K Aqua dirsəklərini, T-birləşmələrini (T-pieces) və reduksiyaları yerləşdirir. Sıfır mexaniki iş (zəhmət)."
        },
        {
          "title": "Parametrik (Fiziki) Çatışmazlıqların Həlli (Clash Detection)",
          "desc": "Məkan ölçüləri o qədər dəqiqdir (dəqiqliklə tənzimlənib) ki, Navisworks-də avtomatlaşdırılmış (rəqəmsal) kəsişmə yoxlanışı (clash check) beton tökülməzdən əvvəl dizayn səhvlərini 100% aşkar edir."
        },
        {
          "title": "LOI (Məlumat Səviyyəsi) 400-500",
          "desc": "Sadəcə həndəsə deyil. Modellərimiz məhsul (komponent) nömrələrini, təzyiq dərəcələrini (siniflərini), çəkiləri (ağırlığı) və texniki xüsusiyyətləri ehtiva edir - bir kliklə (basmaqla) dəqiq kütlənin hesablanması və BOM (material siyahısı) əldə edilməsi (eksportu) üçün."
        },
        {
          "title": "Parametrik Ölçüləndirmə (İdarə)",
          "desc": "K Aqua borularının bütün ölçüləri (ölçü sinifləri) vahid ailədə (family) toplanıb. d20-dən d630-a qədər, komponentləri yenidən yükləmədən açılan (dropdown) menyu vasitəsilə sadəcə genişləndirin (dəyişin)."
        }
      ]
    },
    "grid": {
      "title": "Rəqəmsal Portfelimiz.",
      "desc": "Geniş BIM məlumat bazamızdan nələr (hansı elementləri) yükləyə bilərsiniz:",
      "items": [
        {
          "title": "PPR-C & PPRCT Boruları",
          "desc": "SDR 6-dan SDR 11-ə qədər, standart və Faserverbund (şüşə liflə gücləndirilmiş) texnologiyası daxil olmaqla, bütün mövcud rəng (kodlaşdırma) variantlarında (Yaşıl, Boz, Mavi)."
        },
        {
          "title": "Fitinqlər (Birləşdirici Elementlər)",
          "desc": "Dirsəklər (45°, 90°), T-birləşmələr (T-pieces), reduksiyalar və tıxacların (end caps) tam dəsti (çeşidi). Qüsursuz quraşdırma (çəkilmə) üçün dəqiqliklə nizamlanıb (kalibrlənib)."
        },
        {
          "title": "Keçid Fitinqləri (Transition Fittings)",
          "desc": "Müxtəlif sistem arxitekturalarının qarışığı (birləşməsi) üçün daxili və xarici yivləri (dişləri) olan hibrid komponentlərin modelləşdirilməsi."
        },
        {
          "title": "Klapanlar və Armaturlar",
          "desc": "Şar valfların (Kugelhähne) və bucaqlı klapanların (Schrägsitzventile) dəqiq ölçülü modelləri, kran (tutacaq) idarəetməsi (fırlanma) üçün kəsişmə bölgələri daxildir."
        },
        {
          "title": "Qaynaq Yəhərləri (Weld-in Saddles)",
          "desc": "Sonradan ediləcək T-birləşmələrinin hesablanması (layihələndirilməsi) üçün çətin olan kəsişmələr daxildir."
        },
        {
          "title": "Bərkitmə Sistemi (Fastening)",
          "desc": "Termal gərginliyi (uzununa genişlənməni) vizuallaşdırmaq (hesablamaq) üçün fiks (sabit) və sürüşmə (hərəkətli) dayaqlara malik boru sıxacları (klemmalar)."
        }
      ]
    },
    "cta": {
      "title": "Dərhal Layihələndirməyə Başlayın.",
      "desc": "Autodesk Revit və digər ümumi BIM/CAD sistemləri üçün tam məlumat paketlərinizi yükləyin.",
      "btn1": "BIM Paketini Yüklə",
      "btn2": "Plug-in-i (Qoşmanı) Endir (Tezliklə)"
    }
  },
  "ausschreibungstexte": {
    "timeline": {
      "items": [
        {
          "year": "HƏFTƏ 1",
          "title": "Layihəyə Xüsusi (Özəl) Seçim",
          "text": "Binaların növünə, təzyiq ehtiyaclarına və xüsusi şərtlərə uyğun olaraq düzgün (müvafiq) SDR siniflərinin (ölçülərinin) və boru növlərinin müəyyənləşdirilməsi (Təyini)."
        },
        {
          "year": "HƏFTƏ 2",
          "title": "Sənədlərin VOB/C Uyğunluğunun (Şərtlərinin) Yoxlanılması",
          "text": "Dövlət (İctimai) və ya beynəlxalq tikinti müqavilələri standartlarına zəmanət (uyğunlaşdırma). Hər hansı hüquqi (məhkəmə) risklərindən (boşluqlarından) qaçınmaq (yaxa qurtarmaq)."
        },
        {
          "year": "HƏFTƏ 3",
          "title": "İnteqrasiya",
          "text": "GAEB fayllarının birbaşa (vasitəsiz) olaraq mövcud AVA proqram təminatınıza (ORCA, iTWO) daxil edilməsi (idxalı)."
        },
        {
          "year": "HƏFTƏ 4",
          "title": "Sifariş (Müqavilə)",
          "text": "Qüsursuz sənədləşdirmənin (spesifikasiyanın) nəticəsi onilliklər boyu xətasız işləyən sistemdir. Korroziya, ərp (inkrustasiya) və kimyəvi deqradasiyaya qarşı maksimum dözümlülük (müqavimət). Nəsilləri əhatə edən (aşacaq) təhlükəsizlik, Almaniyada mühəndisləşdirilib (Engineered in Germany)."
        }
      ],
      "title": "Tenderdən (Xülasədən) Əbədiyyətə.",
      "desc": "K Aqua-nın tender (spesifikasiya) mətni adi bir sənəd deyil. Bu, inşa ediləcək reallıq üçün mənbə (qaynaq) kodudur. O, ilk eskizdən tutmuş onilliklər boyu (davam edən) istifadəyə qədər binanın (obyektin) bütün həyat (fəaliyyət) dövrünü müəyyən edir, qoruyur və diktə edir."
    },
    "hero": {
      "eyebrow": "K Aqua Resurs Mərkəzi",
      "title1": "Tender Mətnləri.",
      "title2": "Almaniyada Layihələndirilib (Mühəndisləşdirilib).",
      "desc": "Memarlıq (Layihə) bir fikirlə başlayır. Mühəndislik isə bir spesifikasiya (tələbnamə) ilə başlayır. K-Aqua tender (şərtlər) mətnlərimiz kompromissiz PP-R boru sistemləri üçün hüquqi cəhətdən məcburi (etibarlı) təməldir (bünövrədir). Millimetr dəqiqliyində. VOB-a uyğun (mütənasib). Rədd edilə (Təkzib oluna) bilməz.",
      "cta1": "GAEB mətnlərini yükləyin",
      "cta2": "Planlaşdırma məsləhəti (dəstəyi) tələb edin (sorğulayın)"
    },
    "manifesto": {
      "title1": "Qeyri-müəyyənliyin sonu.",
      "title2": "Mütləq nəzarətin başlanğıcı.",
      "p1": "Çoxmərtəbəli bina memarlığında və sənaye zavodu mühəndisliyində qeyri-müəyyən (aydın olmayan) ifadələr (terminlər) ən böyük (əsas) ekzistensial riskdir. Spesifikasiyada (Xidmət təsvirində) bircə qeyri-dəqiq (yalnış) söz onilliklər boyu texniki qulluq tələb etməyən sistemlə 50 mərtəbəli göydələndə (yüksək binada) fəlakətli su (sızma) zərəri (zədəsi) arasındakı fərq demək ola bilər.",
      "p2": "Buna görə də biz sadəcə tender mətnləri yazmırıq, onları <span class=\"text-foreground font-medium font-semibold\">mühəndisləşdiririk</span>. Hər bir fərdi K Aqua boru hissəsində olduğu kimi, rəqəmsal məlumat (data) paketlərimiz də Almaniyada inkişaf etdirilir, ekstremal şəraitdə sınaqdan keçirilir (yoxlanılır). Onlar fiziki (material) üstünlüyü hüquqi (qanuni) və iqtisadi (bazar) rədd edilə bilməzliyə çevirirlər."
    },
    "bento": {
      "eyebrow": "Məlumatların Memarlığı",
      "title": "Qoruyan (Zəmanət Verən) Spesifikasiyalar.",
      "lead": "Milyard dollarlıq layihələrin planlaşdırılmasında səhvlərə yol verə (təhammül edə) bilməyən TGA (Bina Xidmətləri) mütəxəssisləri, memarlar və vizyoner mühəndislər üçün hazırlanmışdır.",
      "items": [
        {
          "title": "VOB/C & DIN 18381 Uyğunluğu",
          "desc": "Hər bir maddə (xidmət) tikinti işləri (xidmətləri) üçün ən son satınalma (tender) və müqavilə (şərtlər) qaydalarına tam olaraq uyğundur (müvafiqdir). Siz hüquqi baxımdan tam təhlükəsiz tərəfdəsiniz və öhdəlik (zərər) risklərini (ehtimallarını) kəskin şəkildə (əhəmiyyətli dərəcədə) minimuma endirirsiniz."
        },
        {
          "title": "Native GAEB Formatları",
          "desc": "XML, d81, d83. ORCA, RIB iTWO, Nevaris və bütün (digər) populyar AVA (satınalma) sistemləri üçün mükəmməl idxal (import) uyğunluğu. Sintaksis səhvləri və ya müvəqqəti (əlavə) həll yolları (workarounds) yoxdur."
        },
        {
          "title": "İstehsalçıdan Asılı Olmayan Variantlar (Versiyalar)",
          "desc": "Dövlət satınalmaları (ictimai tenderlər) üçün biz tədarük (satınalma) qaydalarını (prinsiplərini) pozmadan mükafat (premium) standartını (tələbini) təyin edən hüquqi cəhətdən (qanuni) təhlükəsiz, mütləq (tamamilə) məhsul baxımından neytral təsvirlər təqdim edirik."
        },
        {
          "title": "Ətraflı Aksesuar Matrisi (Sxemi)",
          "desc": "Mürəkkəb fitinqdən (komponentlərdən) tutmuş bağlayıcı klapana (armatura) və termodinamik bərkidici (boru) sıxaca qədər: Bütün ekosistemin (sistemin) qüsursuz qeydə alınması (qavranması) bahalı əlavələrin (gözlənilməz xərclərin) qarşısını alır."
        },
        {
          "title": "BIM-Ready İnteqrasiya",
          "desc": "Real vaxt rejimində mütəmadi (davamlı), kəsişməsiz (toqquşmasız) 5D planlaşdırma (layihələndirmə) üçün tender (şərt) mətnlərimizi yüksək detallı Revit modellərimizlə problemsiz (birbaşa) şəkildə birləşdirin (əlaqələndirin)."
        }
      ]
    },
    "grid": {
      "title": "Xidmət Maddəsinin (Bölməsinin) Anatomiyası.",
      "desc": "Biz heç nəyi təsadüfə buraxmırıq. Hər bir xidmət maddəsi mətn formasında (məzmunda) cəmlənmiş (şifrələnmiş) Alman mühəndislik (texnologiya) sənətinin şah əsəridir. Mətnlərimizin (sənədlərimizin) detallı şəkildə (təfərrüatlı) əhatə etdiyi (ehtiva etdiyi) məqamlar bunlardır:",
      "items": [
        {
          "title": "Boru Sistemləri SDR 6 / SDR 7.4",
          "desc": "PN 20. Maksimum forma sabitliyi (forma qorunması) üçün inteqrasiya (daxil) edilmiş uzununa genişlənmə minimallaşdırması ilə şüşə lif kompozit texnologiyası."
        },
        {
          "title": "Elektrofüzyon (Elektromufa) Mufaları",
          "desc": "Tam avtomatlaşdırılmış (elektron) qaynaq sənədləşdirməsi (protokolu) və 100% homogen, ayrılmaz (möhkəm) və sızdırmaz əlaqələr."
        },
        {
          "title": "Keçid Fitinqləri (Birləşmələri)",
          "desc": "Sinkləşməyə davamlı (DZR) Premium mis (pirinc), PP-R matrisinə daimi (qalıcı) və ayrılmaz şəkildə (möhkəm) dökülmüşdür (yerləşdirilmişdir)."
        },
        {
          "title": "Klapanlar (Bağlayıcı Armaturlar)",
          "desc": "Legionella (Bakteriya) profilaktikası (qarşısının alınması) üçün axını (cərəyanı) optimallaşdırılmış və ölü sahələri (boşluqları) minimuma endirilmiş texniki qulluq tələb etməyən şar (Kugelhähne) və bucaqlı klapanlar."
        },
        {
          "title": "Paylayıcı (Kollektor) Sistemlər",
          "desc": "Böyük layihələrdə mürəkkəb qaldırıcı (şaquli) xətlər və mərtəbə (qat) bağlantıları üçün modulyar (toplanabilən), yüksək tutumlu (həcmli) paylayıcılar."
        },
        {
          "title": "GEG-ə Uyğun İzolyasiya",
          "desc": "İstilik itkilərinin və kondensat (şeh nöqtəsi/nəmlik) əmələ gəlməsinin (yoğuşmanın) qəti şəkildə qarşısını almaq üçün inteqrasiya edilmiş təlimatlar (qaydalar)."
        },
        {
          "title": "Yanğından Mühafizə Manşetləri",
          "desc": "Təhlükəsiz (etibarlı) divar və tavan (zəmin) keçidləri (boru xətləri) üçün R90/R120 standartına uyğun, yüksək reaktiv arakəsmə sistemləri."
        },
        {
          "title": "Sistem Bərkitmələri",
          "desc": "Termal uzununa genişlənmənin (uzanmanın) nəzarət altında alınması (kompensasiyası) üçün dəqiq sabit və hərəkətli dayaq (fiksasiya) spesifikasiyaları."
        }
      ]
    },
    "cta": {
      "title": "Spesifikasiya ilə başlayın.",
      "desc": "Tam (ətraflı), daim (davamlı) yenilənən (güncəlləşən) tender mətnləri kitabxanamıza (bazasina) daxil olun. Zəmanətli şəkildə (qətiyyən) xətasız, standartlara uyğun və növbəti beynəlxalq meqalayihənizdə (sənaye layihənizdə) istifadə üçün hazırdır.",
      "btn1": "Yükləmə Portalına (Download Mərkəzinə) Keçid",
      "btn2": "Məsləhət (Planlaşdırma) Qrupu ilə Əlaqə"
    },
    "deep": {
      "items": [
        {
          "title": "Mütləq Hüquqi Təhlükəsizlik (VOB/C)",
          "desc": "Beynəlxalq meqalayihələrin planlaşdırılmasında qeyri-müəyyənlik (qeyri-dəqiqlik) ən böyük düşməndir. Xidmət spesifikasiyasında (Tenderdə) çatışmayan bircə (tək) söz onilliklər boyu texniki qulluq tələb etməyən sistemlə fəlakətli (milyonlarla dəyəri olan) zərər (ziyan) arasındakı fərqi yarada bilər. Bizim tender (şərt) mətnlərimiz VOB/C və DIN 18381 standartlarına uyğun olaraq millimetr dəqiqliyi (ciddiliyi) ilə standartlaşdırılmışdır. Hər bir xidmət təsviri (maddəsi) elə kalibrlənmişdir (nizamlanmışdır) ki, texniki boşluqlar (açıqlar), dizayn boşluqları və hüquqi (qanuni) boz zonalar (mübahisəli məqamlar) tamamilə (köklü şəkildə) aradan qaldırılır (yox edilir). Bununla da biz kağız üzərində göstərdiyiniz keyfiyyətin, şantiyədə quraşdırılacaq (tətbiq olunacaq) keyfiyyətlə eyni (birə-bir) olmasına zəmanət (sığorta) veririk."
        },
        {
          "title": "100% GAEB & ÖNORM Uyğunluğu",
          "desc": "Müasir (innovativ) planlaşdırma prosesi qüsursuz məlumat (data) axını tələb edir (ehtiyac duyur). Bizim məlumat paketlərimiz (sənədlərimiz) sadəcə (adi) mətn deyil, istənilən (bütün) peşəkar AVA (Tender, Müqavilə bağlama, Mühasibatlıq) proqram təminatına dərhal (problemsiz) inteqrasiya olunmaq (birləşdirilmək) üçün nəzərdə tutulmuş yüksək dərəcədə strukturlaşdırılmış (formatlanmış), maşın tərəfindən oxuna bilən artefaktlardır (fayllardır). Biz Datanorm və ÖNORM ilə yanaşı, native (orijinal) formatları (GAEB 90, GAEB 2000, GAEB DA XML) da təqdim edirik. Konversiya (çevrilmə) itkiləri yoxdur. Əl ilə yenidən (sonradan) işlənməyə ehtiyac yoxdur. Planlaşdırma prosesində (gedişatında) səmərəliliyi (müvəffəqiyyəti) 40%-ə qədər artıran və eyni zamanda (paralel olaraq) ötürmə (data) səhvlərini riyazi (mütləq) olaraq istisna (rədd) edən rəqəmsal (avtomatlaşdırılmış) bir iş axını (workflow)."
        },
        {
          "title": "Material Spesifikasiyası: PPR-C (Tip 3)",
          "desc": "Su infrastrukturu bir binanın sinir sistemidir. Bizim performans göstəricilərimiz (texniki şərtlərimiz) Polipropilen Random Kopolimerimizin (PPR-C Tip 3) üstün (qüsursuz) molekulyar strukturunu aydın və birmənalı (şübhəsiz) şəkildə müəyyən (təyin) edir. Onlar (bizim mətnlərimiz) sürünmə kəsilməsi gücü (creep rupture), qırılma davranışı və termal uzununa genişlənmə kimi mühüm (həlledici) parametrləri düzəldir (nizamlayır). Yalnız bu cür amansız (dəqiq) təfərrüat dərinliyi ilə (sayəsində) siz layihənizi (sisteminizi) 20 Bar (maksimum) pik təzyiqlərdə və ya temperatur dalğalanmalarında (ani dəyişikliklərdə) istər-istəməz təslim (məhv) olacaq aşağı keyfiyyətli (zəif) törəmələrdən və təhlükəli saxtalaşdırmalardan (surətlərdən) effektiv (uğurla) şəkildə qoruya (sığortalaya) bilərsiniz."
        },
        {
          "title": "Termodinamik və Akustik Dəqiqlik",
          "desc": "Premium (Əla keyfiyyətli) arxitektura Premium fizika (hesablamalar) tələb edir. Peşəkar bir tender (şərtnamə) yalnız (sadəcə) çılpaq (boş) boru sistemini (şəbəkəsini) deyil, bütün fiziki (struktur) ekosistemi əhatə etməlidir. Bizim mətnlərimiz (sənədlərimiz) Bina Enerji Qanununa (GEG) / EnEV-ə uyğun istilik itkisi əmsalları (koeffisientləri), həmçinin ciddi səs (akustik) izolyasiyası ölçüləri (DIN 4109) üzrə ətraflı (spesifik) təlimatları (parametrləri) ehtiva edir (saxlayır). Bu, sisteminizin (infrastrukturun) nəinki (təkcə) mexaniki cəhətdən (struktur olaraq) son dərəcə davamlı (möhkəm) olmasını, həm də termodinamik baxımdan (temperatur olaraq) yüksək səmərəli (effektiv) olmasını və mütləq (tam) Premium seqmentində (Sükut/Fısıltı Standartı) akustik (səssiz) olaraq işləməsini təmin (qarantiyaya) edir."
        },
        {
          "title": "Davamlılıq Metrikləri (ESG & LEED)",
          "desc": "Tikintinin (İnşaatın) gələcəyi dairəvi (təkrar istifadəyə yararlı) və CO2 ilə optimallaşdırılmış (azaldılmış) olmasıdır. Bu gün tenderlər (spesifikasiyalar) yaşıl (ekoloji) standartları sübut etməlidir. K Aqua mətnləri (sənədləri) tam EPD-ləri (Ekoloji Məhsul Bəyannamələrini) və həyat dövrünün (life cycle) təhlillərini özündə birləşdirir (inteqrasiya edir). Biz dəqiq ekoloji (karbon) ayaq izini (təsirini), təkrar emal oluna bilmə (recyclability) qabiliyyətini və ekstruziya (istehsal) prosesində enerji səmərəliliyini müəyyən (təyin) edirik. DGNB, LEED, BREEAM və ya WELL-ə uyğun olaraq (onların standartlarına əsasən) sertifikatlaşdırılacaq (test ediləcək) binalar üçün mükəmməl dərəcədə uyğundur (dizayn edilib). Yalnız yaşıl vədlər deyil, yaşıl performansı (həqiqi nəticəni) spesifikasiya (tələb) edin."
        }
      ]
    }
  }
}

with open("az.json", "r") as f:
    az = json.load(f)

if "resources" not in az:
    az["resources"] = {}

for k, v in patch.items():
    az["resources"][k] = v

with open("az.json", "w") as f:
    json.dump(az, f, indent=2, ensure_ascii=False)
