import json

patch = {
  "unternehmen": {
    "kicker": "Zavod Turu & Məsləhət",
    "head": "K Aqua arxasındakı istehsalatla şəxsən tanış olun.",
    "short": "Zavod ziyarəti üçün vaxt təyin edin",
    "text": "Bir ailə şirkəti olaraq, qapılarımızı planlaşdırıcılara və podratçılara məmnuniyyətlə açırıq. Waldsolms-dakı fabrikə səfər təşkil etmək üçün əlaqə məlumatlarınızı buraxın.",
    "interest": "Məsləhət",
    "done": "Waldsolms-da ziyarətinizi koordinasiya etmək üçün sizinlə əlaqə saxlayacağıq."
  },
  "produkte_rohre": {
    "kicker": "PP-R Borular",
    "head": "Boru kəməri layihəniz üçün ölçüləndirmə və çatdırılma vaxtı.",
    "short": "Layihəniz üçün PP-R boruları barədə suallar",
    "text": "Təzyiq dərəcəsini, mühiti və xəttin uzunluğunu telefonla bizə qısaca bildirin. Mühəndislərimiz zavoddan ölçüləri və mövcudluğu yoxlayıb sizə etibarlı bir çatdırılma tarixi verəcəkdir.",
    "interest": "Boru sistemləri",
    "done": "Boru kəmərlərinin inşası üzrə mühəndis bir iş günü ərzində əlaqə saxlayacaq."
  },
  "produkte_armaturen": {
    "kicker": "Klapanlar & Armaturlar",
    "head": "Hidravlik tələbləriniz üçün uyğun armatur.",
    "short": "Mürəkkəb şəbəkələr üçün armatur tapın",
    "text": "Bağlayıcı, tənzimləyici və ya xüsusi klapanlar: Bizə maksimum iş təzyiqi və mühit haqqında qısaca məlumat verin. Müvafiq məlumat vərəqlərini (data sheets) və mövcudluq məlumatlarını sizə göndərəcəyik.",
    "interest": "Ehtiyat hissələri",
    "done": "Bir klapan mütəxəssisi qısa müddətdə istədiyiniz spesifikasiyaları sizə göndərəcək."
  },
  "produkte_werkzeuge": {
    "kicker": "Qaynaq Alətləri",
    "head": "Tamamilə sızdırmaz tikişlər üçün düzgün aləti təmin edin.",
    "short": "Qaynaq alətlərini icarəyə götürün və ya alın",
    "text": "Mufa qaynağı və ya elektrofüzyon texnologiyası: Tikinti sahəsində hansı ölçülərə ehtiyacınız olduğunu bizə bildirin. Kirayə və ya satın alma üçün uyğun maşınları təmin edəcəyik.",
    "interest": "Məsləhət",
    "done": "Avadanlıq komandamız inventarı yoxlayıb dərhal əlaqə saxlayacaq."
  },
  "produkte_uebergaenge": {
    "kicker": "Sistem Keçidləri",
    "head": "Metaldan plastikə etibarlı material keçidləri.",
    "short": "Quraşdırmanız üçün keçid parçaları",
    "text": "Mövcud boruların dəqiq yiv ölçülərini və materialını bizə bildirin. Sizə uzunmüddətli sızdırmazlığa zəmanət verən korroziyasız keçidlər tövsiyə edəcəyik.",
    "interest": "Boru sistemləri",
    "done": "Texnik uyğun keçidi seçmək üçün sizinlə əlaqə saxlayacaq."
  },
  "produkte_zubehoer": {
    "kicker": "Aksesuarlar & Bərkidicilər",
    "head": "Orijinal aksesuarlarla quraşdırmanızı tamamlayın.",
    "short": "Bərkidicilər və aksesuarları soruşun",
    "text": "Boru sıxaclarından tutmuş izolyasiya materialına qədər: Ehtiyaclarınızı bizə deyin. Aksesuarların qalan K Aqua sisteminə mükəmməl uyğunlaşmasını təmin edəcəyik.",
    "interest": "Ehtiyat hissələri",
    "done": "Aksesuar təklifiniz hazırda yığılır."
  },
  "katalog": {
    "kicker": "Ümumi Kataloq",
    "head": "Satınalma üçün bütün məhsul nömrələri və ölçülər.",
    "short": "Məhsul (məqalə) axtarışında dəstək",
    "text": "Kataloqda xüsusi bir ölçü tapa bilmirsiniz? Ehtiyac duyduğunuz hissəni qısaca təsvir edin, sizin üçün bütün inventarımızı axtaracağıq.",
    "interest": "Məsləhət",
    "done": "İstədiyiniz komponenti araşdırıb sizə zəng edəcəyik."
  },
  "finder": {
    "kicker": "Məhsul Axtarışı (Finder)",
    "head": "Gəlin uyğun sistemin axtarışını qısaldak.",
    "short": "Məhsul axtarışında birbaşa kömək",
    "text": "Əgər parametrləriniz (temperatur, təzyiq, mühit) sərhəd (limit) dəyərlərindədirsə, dizaynı məmnuniyyətlə biz öz üzərimizə götürərik. Bir zəng çox vaxt saatlarla müstəqil axtarışa qənaət edir.",
    "interest": "Məsləhət",
    "done": "Bir sistem planlayıcısı dəqiq dizayn üçün sizə zəng edəcək."
  },
  "referenzen": {
    "kicker": "Oxşar Layihələr",
    "head": "Referans binalarımızdakı təcrübəmizdən yararlanın.",
    "short": "Layihəniz üçün təcrübə məlumatlarını tələb edin",
    "text": "Oxşar çoxmərtəbəli bina və ya sənaye zalı planlaşdırırsınız? Burada göstərilən böyük layihələrdən öyrəndiyimiz anonimləşdirilmiş dərsləri (lessons-learned) və ən yaxşı təcrübələri (best-practices) sizinlə bölüşməkdən məmnun olarıq.",
    "interest": "BIM Məlumatları",
    "done": "Bir layihə rəhbəri təcrübə mübadiləsi üçün sizinlə əlaqə saxlayacaq."
  },
  "support": {
    "kicker": "Texniki Dəstək",
    "head": "Tikinti sahəsindəki problemlər üçün dərhal kömək.",
    "short": "Quraşdırıcılar (montajçılar) üçün sürətli problem həlli",
    "text": "Qaynaq tikişində problem və ya qeyri-müəyyən təzyiq sınağı nəticələri var? Nömrənizi qeyd edin, texniki dəstəyimiz məsafədən diaqnostika üçün dərhal sizə zəng edəcək.",
    "interest": "Məsləhət",
    "done": "Texniki dəstək xəbərdar edildi və qısa müddətdə sizə zəng edəcək."
  },
  "ausschreibungstexte": {
    "kicker": "Texniki Şərtlər (LV-Mətnləri) & Planlaşdırma",
    "head": "Dəqiqələr içində istehsalçıdan asılı olmayan tender (şərtnamə) mətnləri əldə edin.",
    "short": "Xidmətlər siyahısının yaradılmasında kömək",
    "text": "Sizə layihəniz üçün VOB uyğun GAEB faylları və ya Word şablonları təqdim edirik. Layihə növünü bildirin, biz sizə uyğunlaşdırılmış mətn blokları göndərəcəyik.",
    "interest": "BIM Məlumatları",
    "done": "Müvafiq tender mətnləri qısa müddətdə sizə göndəriləcək."
  },
  "service": {
    "kicker": "Yerində Xidmət",
    "head": "Tikinti sahəsində K Aqua texnikləri tərəfindən dəstək.",
    "short": "Tikinti sahəsi üzrə təlimat tələb edin",
    "text": "Komandanızın birbaşa quraşdırma yerində maşınlarla bağlı təlimata ehtiyacı varmı? Kritik başlanğıc mərhələsində layihənizi müşayiət etmək üçün təlimatçılarımızdan birini koordinasiya edirik.",
    "interest": "Məsləhət",
    "done": "Xidmət qrupumuz təlimatçının mövcudluğunu yoxlayır."
  },
  "maerkte_trinkwasser": {
    "kicker": "Sıfır Sızma Şəbəkələri",
    "head": "İtirilmiş hər faiz içməli su şəbəkəniz üçün pul deməkdir.",
    "short": "İçməli su şəbəkəniz üçün itki hesablanması",
    "text": "Bizi şəbəkə ölçüsü və iqlim zonası barədə qısaca məlumatlandırın. Əməliyyat illəri daxil olmaqla, K Aqua sahəsinin mövcud şəbəkəyə nisbətən nə qədər su və büdcəyə qənaət edəcəyini sizin üçün hesablayacağıq.",
    "interest": "İçməli su şəbəkələri",
    "done": "Bir şəbəkə planlayıcısı ilkin itki hesablama ilə bir iş günü ərzində əlaqə saxlayacaq."
  },
  "maerkte_klima": {
    "kicker": "HVAC & Soyutma",
    "head": "Korroziya riski olmadan yüksək axın sürətini təmin edin.",
    "short": "Soyutma sxemlərini daha səmərəli planlaşdırın",
    "text": "Bizə soyutma gücünü və ilkin temperaturu bildirin. Kondisioner sisteminizdə kavitasiya və təzyiq itkilərini minimuma endirmək üçün kəsiyi (diametri) təyin edəcəyik.",
    "interest": "Boru sistemləri",
    "done": "Bir HVAC mütəxəssisi diametr (kəsik) dizaynı üçün əlaqə saxlayacaq."
  },
  "maerkte_industrie": {
    "kicker": "Sənaye Obyektləri",
    "head": "Tələbkar mayelər üçün kimyəvi davamlılıq.",
    "short": "Davamlılıq testini tələb edin",
    "text": "Aqressiv turşular, qələvilər və ya ultra saf su emal edirsiniz? Bizə kimyəvi tərkibi göndərin, və laboratoriyamız PP-R borularımızın davamlılığını yazılı şəkildə təsdiqləsin.",
    "interest": "Məsləhət",
    "done": "Laboratoriyamız davamlılığı yoxlayacaq və sizinlə əlaqə saxlayacaq."
  }
}

import json

with open("az.json", "r") as f:
    az = json.load(f)

for k, v in patch.items():
    az["kontaktBlocks"][k] = v

with open("az.json", "w") as f:
    json.dump(az, f, indent=2, ensure_ascii=False)
