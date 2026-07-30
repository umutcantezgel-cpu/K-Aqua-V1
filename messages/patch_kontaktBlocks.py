import json

patch = {
  "home": {
    "kicker": "Bina Texnologiyası Mütəxəssisləri",
    "head": "Birbaşa layihə üzrə mühəndislik məsləhəti.",
    "short": "Mühəndislərimizlə əlaqə saxlayın",
    "text": "Biz 50 ildir PP-R istehsal edirik. İstər dizaynda hidravlik problemlər olsun, istərsə də istifadə olunacaq borunun növü haqqında suallar – biz mütəxəssislərlə göz hizasında məsləhət veririk. Telefon nömrənizi buraxın.",
    "interest": "Boru sistemləri",
    "done": "Layihə mühəndisimiz bir iş günü ərzində sizinlə əlaqə saxlayacaq."
  },
  "produkte_pipes": {
    "kicker": "Boru Proqramı (Pipes)",
    "head": "Doğru divar qalınlığı və təzyiq dərəcəsini tapın.",
    "short": "Layihəniz üçün boru dizaynı",
    "text": "SDR 6, 7.4 yoxsa 11? Layihəniz üçün ehtiyacınız olan əməliyyat temperaturunu və maksimum təzyiqi bizə deyin, uyğun K Aqua PP-R və ya PPRCT borusunu tövsiyə edəcəyik.",
    "interest": "Məsləhət",
    "done": "Texniki şöbə ən yaxşı boru konfiqurasiyası ilə bağlı sizə məlumat verəcək."
  },
  "produkte_fittings": {
    "kicker": "Fitinqlər",
    "head": "Düzgün fitinqlərlə təzyiq itkilərini minimuma endirin.",
    "short": "Sistem tərkibi üçün məsləhət",
    "text": "Kollektor dizaynı və ya xüsusi qovşaqlar planlaşdırırsınız? 90 dərəcəlik dirsəklərin, yoxsa əyri keçidlərin hidravlik cəhətdən daha mantıqlı olduğunu sizinlə müzakirə edərik.",
    "interest": "Məsləhət",
    "done": "Mühəndisimiz fitinq detallarını aydınlaşdırmaq üçün sizinlə əlaqə saxlayacaq."
  },
  "produkte_tools": {
    "kicker": "Qaynaq Alətləri",
    "head": "İcarə və ya satınalma: Düzgün qaynaq maşını.",
    "short": "Alət ehtiyaclarını soruşun",
    "text": "d160-dan etibarən alın qaynaq maşını tələb olunur. Alətlərin satınalınması yoxsa icarə modelinin sizin komandanız üçün daha sərfəli olduğunu araşdırırıq.",
    "interest": "Məsləhət",
    "done": "Alət üzrə mütəxəssisimiz avadanlıq variantları barədə məlumat verəcək."
  },
  "produkte_valves": {
    "kicker": "Klapanlar",
    "head": "Sıx inteqrasiya olunmuş klapanlar (Unterputzventil).",
    "short": "Gizli klapanlar barədə məlumat",
    "text": "Metal klapanlara keçiddə korroziyadan qaçın. Nə qədər kəsici nöqtəyə ehtiyacınız olduğunu bizə bildirin, sizə tam uyğun olan klapan hissələrini və uzatmaları təqdim edərik.",
    "interest": "Məsləhət",
    "done": "Sizə uyğun olan klapan modeli ilə bağlı məlumat veriləcək."
  },
  "produkte_transition_fittings": {
    "kicker": "Keçid Fitinqləri",
    "head": "Mis və ya paslanmayan polad infrastruktura qoşulma.",
    "short": "Keçid hissələri üçün məsləhət",
    "text": "Binalarda mövcud xətləri necə təmiz şəkildə birləşdirə biləcəyinizi sizə göstərəcəyik. Tələb olunan metal yiv ölçüsünü qeyd edin, uyğun keçid parçasını seçək.",
    "interest": "Məsləhət",
    "done": "Biz uyğun keçid fitinqi barədə məlumat verəcəyik."
  },
  "produkte_accessories": {
    "kicker": "Aksesuarlar",
    "head": "Səs izolyasiyası üçün düzgün boru sıxacları.",
    "short": "Sıxaclar və montaj ləvazimatları",
    "text": "Fikslənmiş (sabit) yoxsa sürüşən nöqtələr? Səs keçirməz rezin əlavəli orijinal K Aqua boru sıxacları ilə səs ötürülməsinin necə qarşısını ala biləcəyinizi göstəririk.",
    "interest": "Məsləhət",
    "done": "Montaj mütəxəssisimiz sizə lazım olan sıxac tipləri barədə məlumat verəcək."
  },
  "produkte_weld_in_saddles": {
    "kicker": "Qaynaq Yəhərləri",
    "head": "Şəbəkəyə sonradan təhlükəsiz müdaxilə.",
    "short": "T-birləşmələrə alternativlər",
    "text": "Böyük bir əsas xətdə yeni bir budağa (şaxəyə) ehtiyacınız varmı? Qaynaq yəhərinin T-birləşmədən nə vaxt daha sərfəli olduğunu izah edəcəyik.",
    "interest": "Məsləhət",
    "done": "Biz qaynaq yəhərlərinin tətbiqi barədə sizə məlumat verəcəyik."
  },
  "produkte": {
    "kicker": "Katalog və Çeşid",
    "head": "Axtardığınız məhsulu tapmadınız?",
    "short": "Xüsusi ölçülər barədə məlumat alın",
    "text": "Kataloqda d630-dan yuxarı ölçülər və ya xüsusi reduksiyalar axtarırsınız? Çox güman ki, biz bunları layihə çərçivəsində təmin edə bilərik.",
    "interest": "Məsləhət",
    "done": "Məhsul mütəxəssisi axtardığınız hissənin mövcudluğunu yoxlayacaq."
  },
  "academy": {
    "kicker": "Qaynaqçı Təlimi",
    "head": "Komandanız üçün yerində (şantiyədə) təlim sifariş edin.",
    "short": "Quraşdırma təlimi xidməti",
    "text": "Podratçılar və quraşdırıcılar (santexniklər) üçün mühəndisimiz tərəfindən birbaşa tikinti sahəsində praktiki polifüzyon və alın qaynağı təlimləri təşkil edirik.",
    "interest": "BIM Məlumatları",
    "done": "Təlimin vaxtını və yerini dəqiqləşdirmək üçün sizinlə əlaqə saxlayacağıq."
  },
  "maerkte_chemie": {
    "kicker": "Kimya Sənayesi",
    "head": "Mühitə uyğun xüsusi boru dizaynı.",
    "short": "Kimyəvi davamlılığı yoxlayın",
    "text": "Boru xəttindən aqressiv mayelər axır? Konsentrasiyanı və temperaturu bildirin, laboratoriyamız PP-R və ya PPRCT-nin dayanıqlığını təsdiqləsin.",
    "interest": "Məsləhət",
    "done": "Laboratoriyamız kimyəvi müqaviməti yoxlayacaq və sizinlə əlaqə saxlayacaq."
  },
  "maerkte_schiffbau": {
    "kicker": "Gəmiqayırma & Dənizçilik",
    "head": "Gəmi şəbəkələri üçün yüngül və vibrasiyaya davamlı.",
    "short": "Gəmiqayırma sertifikatlarını tələb edin",
    "text": "Boz, qara və ya ballast suyu fərq etməz: Gəminin sinfini bizə bildirin. Sizə sistemimiz üçün müvafiq təsnifat sertifikatlarını (DNV, Lloyd's) göndərəcəyik.",
    "interest": "Məsləhət",
    "done": "Dənizçilik eksperti sizə müvafiq sertifikatları göndərəcək."
  },
  "maerkte_landwirtschaft": {
    "kicker": "Kənd Təsərrüfatı & İstixanalar",
    "head": "Maksimum məhsuldarlıq üçün möhkəm suvarma şəbəkələri.",
    "short": "Suvarma sistemlərinin dizaynı",
    "text": "Hektar sayını və su ehtiyacını bizə bildirin. Tamamilə işıq keçirməzliyi sayəsində yosunların yaranmasının qarşısını alan şaxtaya davamlı, uzunömürlü PP-R şəbəkəsi tərtib edəcəyik.",
    "interest": "İçməli su şəbəkələri",
    "done": "Suvarma şəbəkənizi müzakirə etmək üçün tezliklə sizinlə əlaqə saxlayacağıq."
  },
  "maerkte": {
    "kicker": "Regional Bazarlar",
    "head": "Regionunuz üçün ixracat (export) mütəxəssisi ilə danışın.",
    "short": "Ölkəniz üçün logistika və sertifikatlaşdırma",
    "text": "Biz dünya üzrə ixrac edirik. Təyinat ölkəsini qeyd edin və sizi yerli standartlar, yerli distribyutorlar və fabrikimizdən real dəniz yükü tranzit vaxtları barədə məlumatlandıraq.",
    "interest": "Məsləhət",
    "done": "Bölgəniz üzrə ixrac meneceri sizinlə əlaqə saxlayacaq."
  },
  "loesungen_hochhaus": {
    "kicker": "Çoxmərtəbəli Binalar",
    "head": "Ekstremal qaldırıcı xətlərdə təzyiq stabilizasiyası.",
    "short": "Çoxmərtəbəli binalarda təzyiq itkisini hesablayın",
    "text": "Binalarda hidromexanika səhvləri bağışlamır. Binanın hündürlüyünü və mərtəbələrin sayını bizə deyin, təzyiq tənzimləyicilərinin və genişləndirmə dirsəklərinin yerləşdirilməsində kömək edəcəyik.",
    "interest": "BIM Məlumatları",
    "done": "Bina hidravlikası üzrə mütəxəssis müzakirə üçün sizinlə əlaqə saxlayacaq."
  },
  "loesungen_krankenhaus": {
    "kicker": "Xəstəxanalar",
    "head": "Klinikalarda sterillik və Legionella profilaktikası.",
    "short": "Klinikalar üçün içməli su gigiyenası",
    "text": "İmmuniteti zəif olan xəstələrin qorunması əsas prioritetdir. Biz sizə PP-R sistemimizlə dairəvi xətlər, ölü zonaların (dead space) qarşısının alınması və termal dezinfeksiya barədə məsləhət veririk.",
    "interest": "İçməli su şəbəkələri",
    "done": "İçməli su gigiyenası üzrə mütəxəssis dərhal sizinlə əlaqə saxlayacaq."
  },
  "loesungen_hotel": {
    "kicker": "Otel Kompleksləri",
    "head": "Qonaqlarınızın rahat yuxusu üçün akustik izolyasiya.",
    "short": "Otellərdə səs izolyasiyası",
    "text": "Bitişik otaqlardakı axın səsləri şikayətlərə səbəb olur. Divar konstruksiyalarını bildirin, biz sizə səs izolyasiyalı bərkidicilər və axının optimallaşdırılmasını tövsiyə edəcəyik.",
    "interest": "Məsləhət",
    "done": "Obyektinizdə səs izolyasiyasını optimallaşdırmaq üçün sizinlə əlaqə saxlayacağıq."
  },
  "loesungen": {
    "kicker": "Xüsusi Həllər",
    "head": "Mürəkkəb tikinti layihələri üçün fərdi sistem həlləri.",
    "short": "Xüsusi layihəniz üçün texniki məsləhət",
    "text": "Standart həllər layihəniz üçün kifayət deyil? Problemi izah edin, dizayn şöbəmiz fərdi kollektorlar (paylayıcılar) və xüsusi komponentlər hazırlayacaqdır.",
    "interest": "Məsləhət",
    "done": "Dizayn şöbəmiz sorğunuzu nəzərdən keçirəcək və əlaqə saxlayacaq."
  },
  "co2_rechner": {
    "kicker": "CO2 Qənaəti",
    "head": "Layihənizin ekoloji izini təsdiqləyək.",
    "short": "Ətraflı CO2 balansını tələb edin",
    "text": "Kalkulyator ilkin təlimat dəyərlərini verir. Dəqiq material siyahısını göndərin və davamlılıq auditi (sustainability audit) üçün metal borulara nisbətən CO2 qənaəti barədə ətraflı sertifikat tərtib edək.",
    "interest": "Məsləhət",
    "done": "Davamlılıq üzrə mütəxəssisimiz sertifikat hazırlamaq üçün əlaqə saxlayacaq."
  },
  "trust_center": {
    "kicker": "Sertifikatlar & Standartlar",
    "head": "Tikinti təhvil-təslimi üçün xüsusi sertifikata ehtiyacınız varmı?",
    "short": "Tikinti auditi üçün sertifikatlar tələb edin",
    "text": "Əgər tikinti sahəsindəki müfəttiş müəyyən bir sertifikat (DVGW, SKZ, KIWA) tələb edirsə, standartı bizə bildirin. Müvafiq sənədi PDF olaraq dərhal sizə göndərəcəyik.",
    "interest": "BIM Məlumatları",
    "done": "Müvafiq sertifikatı tapıb sizə göndərəcəyik."
  },
  "projektanfrage": {
    "kicker": "Layihə Başlanğıcı",
    "head": "Əsas məlumatları verin, biz sizə ilkin büdcə təqdim edək.",
    "short": "Podratçılar üçün sürətli büdcə təxmini",
    "text": "Növbəti addımda planlarınızı yükləyin və ya təxmini kvadrat metr və istifadə növünü telefonla bizə bildirin. Sizə ilkin qiymət çərçivəsi verəcəyik.",
    "interest": "Boru sistemləri",
    "done": "Layihə qrupu büdcəni müzakirə etmək üçün sizinlə əlaqə saxlayacaq."
  },
  "kontakt": {
    "kicker": "Birbaşa Xətt",
    "head": "K Aqua mərkəzinə ən qısa yolunuz.",
    "short": "Biz sizə tikinti sahəsində zəng edirik",
    "text": "Gözləmə yoxdur. Nömrənizi daxil edin və mövzunu göstərin. Satış və ya texniki şöbədən müvafiq mütəxəssis sizinlə dərhal əlaqə saxlayacaqdır.",
    "interest": "Məsləhət",
    "done": "Sorğunuz qəbul edildi. Müvafiq məsləhətçi sizinlə əlaqə saxlayacaq."
  },
  "news": {
    "kicker": "Mətbuat & Media",
    "head": "Mətbuat şərhi və ya məhsul yenilikləri ilə bağlı suallar?",
    "short": "Korporativ kommunikasiya ilə əlaqə",
    "text": "Yüksək keyfiyyətli şəkillər, rəhbərliklə müsahibələr və ya yeniliklərimiz barədə texniki arxa plan məlumatı üçün sadəcə əlaqə məlumatlarınızı buraxın.",
    "interest": "Məsləhət",
    "done": "Mətbuat şöbəmiz tezliklə sizinlə əlaqə saxlayacaq."
  },
  "karriere": {
    "kicker": "K-Aqua-da Karyera",
    "head": "Vakansiyalarımız haqqında qeyri-rəsmi sual verin.",
    "short": "İnsan resursları şöbəsi ilə birbaşa əlaqə",
    "text": "Profilinizin uyğun olub-olmadığına əmin deyilsiniz, yoxsa müraciət etməzdən əvvəl gündəlik iş barədə məlumat almaq istəyirsiniz? HR komandamız telefon vasitəsilə suallarınızı rahatlıqla cavablandıracaq.",
    "interest": "Məsləhət",
    "done": "İnsan Resursları şöbəsi qısa tanışlıq üçün sizinlə əlaqə saxlayacaq."
  },
  "partnerschaft": {
    "kicker": "Distribyutor Olun",
    "head": "Çeşidinizi Alman premium borusu ilə genişləndirin.",
    "short": "Distribyutor (Satıcı) şərtləri üçün müraciət edin",
    "text": "Topdansatışçısınız və etibarlı bir PP-R təchizatçısı axtarırsınız? Regionunuzu və hədəf qrupunuzu qeyd edin, müstəsnalıq (eksklüzivlik) modellərini və satıcı şərtlərini müzakirə edək.",
    "interest": "Məsləhət",
    "done": "Tərəfdaşlıq üzrə satış menecerimiz sizinlə əlaqə saxlayacaq."
  },
  "impressum": {
    "kicker": "Hüquqi",
    "head": "Şirkət məlumatlarımız barədə suallarınız var?",
    "short": "K Aqua Katibliyi ilə əlaqə",
    "text": "Şirkətimizlə bağlı hüquqi və ya rəsmi suallarınız varsa, nömrənizi burada qeyd edin.",
    "interest": "Məsləhət",
    "done": "Sualınızı aydınlaşdırmaq üçün sizinlə əlaqə saxlayacağıq."
  },
  "datenschutz": {
    "kicker": "Məlumatların Qorunması",
    "head": "Məlumatların qorunması üzrə məsul şəxslə danışın.",
    "short": "Məlumatlarınız barədə məlumat tələb edin",
    "text": "Biz sizin məxfiliyinizi ciddiyə alırıq. Məlumatlarınızın işlənməsi ilə bağlı məlumat, silinmə və ya təfərrüatlar istəyirsinizsə, lütfən, əlaqə məlumatlarınızı buraxın.",
    "interest": "Məsləhət",
    "done": "Məlumatların qorunması üzrə məsul şəxs (DPO) dərhal sizinlə əlaqə saxlayacaq."
  },
  "fallback": {
    "kicker": "Əlaqə",
    "head": "Birbaşa mühəndislərimizlə danışın.",
    "short": "Mühəndislərimizə birbaşa çıxış",
    "text": "Telefon nömrəsi, e-poçt və mövzuya klikləmək kifayətdir. Qalanını müzakirə əsnasında aydınlaşdıracağıq.",
    "interest": "Məsləhət",
    "done": "Texniki mütəxəssis (Məsləhətçi) bir iş günü ərzində sizinlə əlaqə saxlayacaq."
  }
}

with open("az.json", "r") as f:
    az = json.load(f)

az["kontaktBlocks"] = patch

with open("az.json", "w") as f:
    json.dump(az, f, indent=2, ensure_ascii=False)
