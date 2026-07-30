import json

patch = {
"academy.schulungen.hero.eyebrow": "K Aqua Academy",
"academy.schulungen.timeline.items": [
  {"year": "HƏFTƏ 01", "title": "NƏZƏRİ DOKTRİNA", "text": "Fizika qanunlarına və material elminə (polimer fizikasına) dərin inteqrasiya. Qəbul olunmuş praktikalardan uzaqlaşma və mühəndislik reallığına yönəlmə."},
  {"year": "HƏFTƏ 02", "title": "SİMULYASİYA VƏ PLANLAŞDIRMA", "text": "K Aqua proqram təminatı mühitində şəbəkə dizaynı. Tələbələr şəhər miqyaslı şəbəkələr layihələndirir və proqram onları kəskin şəkildə sınaqdan keçirir."},
  {"year": "HƏFTƏ 03", "title": "TƏTBİQİ MÜHƏNDİSLİK (MEXANİKA)", "text": "Materialla birbaşa iş. İri qaynaq avadanlıqlarının, elektrofüzyon cihazlarının istifadəsi və millimetrlik dəqiqliklə təzyiq altında yerinə yetirilmə."},
  {"year": "HƏFTƏ 04", "title": "SINAQ VƏ SERTİFİKATLAŞDIRMA", "text": "Yekun imtahan xətaları bağışlamır. Tam quraşdırılmış sistemin ekstremal təzyiq sınağı. Sızan hər damcı dərhal kəsilməyə səbəb olur."},
  {"year": "YEKUN", "title": "SERTİFİKATIN VERİLMƏSİ", "text": "DVS 2207-11 standartlarına uyğun olaraq uğurla başa vuran məzunlar K Aqua rəsmi sertifikatına layiq görülür."}
],
"academy.schulungen.spec.eyebrow": "Sınaq Şərtləri",
"academy.schulungen.spec.desc": "Bizim buraxılış testlərimiz ən yüksək Avropa sənaye standartlarına (ISO/DVS) əsaslanır. Keçid balı yoxdur. Yalnız tam uğur və ya uğursuzluq var.",
"academy.schulungen.spec.items": [
  {"val": "100%", "label": "Nəzəri Keçid Həddi"},
  {"val": "25 bar", "label": "Təzyiq Sınağı"},
  {"val": "0 mm", "label": "Xətt Toleransı"},
  {"val": "DVS", "label": "Sertifikatlaşdırma Modeli"}
],
"academy.schulungen.cta.desc": "K Aqua sisteminin düzgün işlənməsi üçün mütəxəssislərimiz sizə fərdi təlim təklifi verməyə hazırdır.",
"academy.zertifizierung.hero.eyebrow": "Standartlar və Sertifikatlar",
"academy.zertifizierung.bento.eyebrow": "DVS Standartları",
"academy.zertifizierung.bento.title": "Təhlükəsizliyin Təməli.",
"academy.zertifizierung.bento.lead": "Mükəmməl bir qaynaq tikişi üçün hansı parametrlər vacibdir? DVS 2207-11 standartı bunu aydın şəkildə müəyyən edir.",
"academy.zertifizierung.bento.items": [
  {"title": "DVS 2207-11: Qanun", "desc": "Termoplastiklərin qaynağı üçün Alman sənaye standartı. O, qızdırıcı elementin temperaturunu, isinmə müddətlərini və soyuma intervallarını mütləq riyazi dəqiqliklə diktə edir."},
  {"title": "Kinetik Sınaq", "desc": "Heç bir quraşdırma yoxlanılmadan buraxılmır. DIN EN 806-4 standartına uyğun olaraq aparılan təzyiq sınaqları sistemin maksimum yük limitinə qədər itələnməsini tələb edir."},
  {"title": "İzləniləbilirlik və Sənədləşdirmə", "desc": "K Aqua şəbəkəsindəki hər bir əsas qaynaq tikişi qeyd olunur. Müasir elektrofüzyon cihazları rəqəmsal bir audit izi yaradır."},
  {"title": "Təlim Lisenziyası", "desc": "Yalnız K Aqua sertifikatına malik podratçılara beynəlxalq zəmanətimizlə əhatə olunan sistemləri quraşdırmağa icazə verilir."}
],
"academy.zertifizierung.certifications.items[0].p1": "Almaniya",
"academy.zertifizierung.certifications.items[0].p2": "İçməli su üçün toksikoloji uyğunluq və əyilmə dayanıqlığı.",
"academy.zertifizierung.certifications.items[1].p1": "Almaniya",
"academy.zertifizierung.certifications.items[1].p2": "Daimi monitorinq ilə davamlı hidravlik sınaq və termal stabillik.",
"academy.zertifizierung.certifications.items[2].p1": "Birləşmiş Krallıq",
"academy.zertifizierung.certifications.items[2].p2": "Britaniyanın içməli su şəbəkələrində istifadə üçün təsdiq.",
"academy.zertifizierung.certifications.items[3].p1": "Niderland",
"academy.zertifizierung.certifications.items[3].p2": "Aqressiv su şərtləri altında materialın bütövlüyü.",
"academy.zertifizierung.lab.eyebrow": "K-Aqua Laboratoriyası",
"academy.zertifizierung.lab.items": [
  {"val": "120+", "label": "Bar Dağıdıcı Partlama Təzyiqi"},
  {"val": "8760+", "label": "Saatlıq Davamlı Termal Sınaq"},
  {"val": "0.007", "label": "mm Daxili Sürtünmə Əmsalı"}
],
"academy.zertifizierung.timeline.items": [
  {"year": "MƏRHƏLƏ 01", "title": "SƏNƏDLƏŞDİRMƏ VƏ AUDİT", "text": "Mövcud layihələrin, avadanlıqların saxlanılmasının və planlaşdırma komandasının biliklərinin nəzərdən keçirilməsi."},
  {"year": "MƏRHƏLƏ 02", "title": "USTALIQ TƏLİMİ", "text": "Seçilmiş işçilərin K Aqua mütəxəssisləri tərəfindən DVS standartları üzrə intensiv təlimi."},
  {"year": "MƏRHƏLƏ 03", "title": "PRAKTİK QİYMƏTLƏNDİRMƏ", "text": "Təzyiq sınağı. İştirakçılar nəzarət altında kompleks qaynaq sxemlərini həyata keçirməlidir."},
  {"year": "MƏRHƏLƏ 04", "title": "SERTİFİKATIN VERİLMƏSİ", "text": "Şirkət 3 illik qlobal icazə alır. Mütəmadi nəzarət yoxlamaları məcburidir."}
],
"academy.zertifizierung.cta.title": "Gözüyumlu etibar edə biləcəyiniz keyfiyyət.",
"academy.zertifizierung.cta.desc": "Rəsmi sertifikatlarımızı yükləyin və ya növbəti meqalayihənizin spesifikasiyaları barədə birbaşa mühəndislik komandamızla danışın.",
"academy.glossar.hero.eyebrow": "Texniki Lüğət",
"academy.glossar.manifesto.eyebrow": "Doktrina",
"academy.glossar.manifesto.title": "Xətasızlığın Memarlığı.",
"academy.glossar.manifesto.lead": "Boru kəməri sistemi hər bir meqalayihənin ürək-damar sistemidir. Uğursuzluq infrastruktur baxımından infarkt deməkdir. Buna görə də biz sadəcə borulardan yox, həyati əhəmiyyətli sənaye arteriyalarından danışırıq. Bu lüğətdəki hər bir termin bizim \"Sıfır Xəta\" fəlsəfəmizin bir sütununu təmsil edir.",
"academy.glossar.scroll.eyebrow": "Kinematika və Material Elmi",
"academy.glossar.scroll.title": "K Aqua Prosesi.",
"academy.glossar.scroll.lead": "Molekulyar qranul səviyyəsindən son təzyiq sınağına qədər. Sistemlərimizi məhv edilməz edən fiziki prinsipləri anlayın.",
"academy.glossar.scroll.items": [
  {"title": "Yüksək Təzyiq Altında Ekstruziya Dinamikası", "desc": "Fabriklərimizdəki termoplastik deformasiya 0.1°C dəqiqliyində ciddi temperatur nəzarətinə tabedir. Bu kristal mükəmməllik qüsursuz, homogen molekulyar struktura zəmanət verir."},
  {"title": "Hidrostatik Yük Sınaqları", "desc": "Sınaq laboratoriyalarımızda hər bir boru real şərtləri dəfələrlə üstələyən hidrostatik simulyasiyaya məruz qalır. Biz hər hansı normativ tələbləri (SDR sinfindən asılı olaraq 100 bar-a qədər) aşan daxili təzyiqlər tətbiq edirik."},
  {"title": "Polifüzyon Qaynaq Texnologiyası", "desc": "Ənənəvi sistemlərdə bağlantılar həssas nöqtədir. K Aqua polifüzyon vasitəsilə bu riski aradan qaldırır. Molekulyar səviyyədə boru və fitinq bir bütöv kimi əriyir."},
  {"title": "Kavitasiya Müqaviməti və Axın Mexanikası", "desc": "Ultra hamar daxili divar (pürüzlülük < 0.007 mm) sayəsində K Aqua boruları axın müqavimətini demək olar ki, sıfıra endirir. Bu biofilmlərin əmələ gəlməsinin qarşısını alır."}
],
"academy.glossar.bento.items": [
  {"title": "PP-R (Polipropilen Random Kopolimer)", "desc": "Molekulyar əsas. Yüksək temperatur və təzyiqlərə qarşı müstəsna müqavimət təklif edən yüksək kristal termoplastik polimer."},
  {"title": "Xətti Termal Genişlənmə", "desc": "Temperatur dəyişikliyi zamanı materialın uzunluğunun dəyişməsi. Şüşə liflə gücləndirilmiş borularımız bu dəyəri minimuma endirir (α = 0,035 mm/mK)."},
  {"title": "Sürünmə kəsilməsi gücü (Creep Rupture Strength)", "desc": "Sistemin deformasiya olmadan onilliklər boyu müəyyən temperaturlarda davamlı daxili təzyiqə tab gətirmək qabiliyyəti. K Aqua boruları 50+ il üçün kalibrlənir."},
  {"title": "Təzyiq İtkisi Əmsalı", "desc": "Borunun daxili divarındakı sürtünmə nəticəsində yaranan axın enerji itkisini təsvir edən riyazi dəyər."},
  {"title": "SDR (Standart Ölçü Nisbəti)", "desc": "Xarici diametr (d) və divar qalınlığı (s) arasındakı nisbət. Düzgün seçim sistem dizaynı üçün həlledicidir.", "label": "50+ İL"}
],
"academy.glossar.timeline.items": [
  {"year": "DIN 8077/8078", "title": "Normativ Əsas", "text": "Alman boru kəməri standartlarının əsası. Biz bu standartları hədəf kimi deyil, mütləq minimum kimi görürük."},
  {"year": "ISO 15874", "title": "Qlobal Sınaq", "text": "İsti və soyuq su quraşdırmaları üçün plastik boru sistemlərinin beynəlxalq keyfiyyət möhürü."},
  {"year": "SDR 6 - SDR 11", "title": "Standart Ölçü Nisbətləri", "text": "Xarici diametrin divar qalınlığına dəqiq nisbəti. Mühəndislərimiz optimal axın sürətində maksimum təzyiq müqavimətinə zəmanət vermək üçün hər partiyanı kalibrləyirlər."},
  {"year": "SKZ və DVGW", "title": "Gigiyena və Material Sınağı", "text": "Mütləq qida və içməli su təhlükəsizliyini təsdiq edən sertifikatlar. Ağır metallar yoxdur, yuyulma (sızma) yoxdur."}
],
"academy.glossar.conclusion.title": "Ekstremal hallarda dağılma müqaviməti.",
"academy.glossar.conclusion.p1": "Sənaye tətbiqlərində boru kəməri sisteminin keyfiyyətini təyin edən normal iş deyil, sərhəd zonalarındakı (limitlərdəki) dayanıqlıqdır. Kimyəvi korroziya, təzyiq dalğalanmaları və termal şoklar (istilik zərbələri) ənənəvi qurğuların təbii düşmənləridir.",
"academy.glossar.conclusion.p2": "<span className=\"font-semibold\">K Aqua Matrix</span> sistemi inert bir maneə (baryer) qatı vasitəsilə nəql edilən mühiti ətrafdan təcrid edir. İon mübadiləsi baş vermir. Metal sistemlər su onların içindən axdığı andan etibarən zəifləməyə (aşınmağa) başlayır. Bizim PP-R sistemimiz onilliklərdən sonra belə daxildə qüsursuz qalır.",
"academy.glossar.conclusion.p3": "<span className=\"font-semibold\">Ətraf mühitin gərginliklə çatlama müqaviməti (ESCR)</span> anlayışı polimer kimyasında mərkəzi əhəmiyyətə malikdir. Biz kopolimerimizin molekulyar çəkisini elə dəyişirik (modifikasiya edirik) ki, o, qırılmaq (parçalanmaq) əvəzinə yük piklərini yumşaltsın.",
"academy.glossar.conclusion.p4": "Boru kəməri texnologiyasının terminologiyasını anlayan hər kəs burada güzəştlərin nə üçün məhvə səbəb ola biləcəyini də başa düşür. Alman mühəndisliyi (German Engineering) boş bir vəd deyil, istehsalımızın hər santimetrində təzahür etdirdiyimiz dəqiq fiziki parametrlərin cəmidir.",
"academy.glossar.cta.desc": "Mühəndislərimizi ən çətin texniki tələblərinizlə qarşı-qarşıya qoyun (bizə müraciət edin). Biz sistem arxitekturasını (memarlığını) təqdim edirik.",
"academy.videos[0].t": "Əl ilə Mufa Qaynağı (Socket welding)",
"academy.videos[0].s": "d63-ə qədər: Əl qaynaq aparatı",
"academy.videos[1].t": "Maşınla Mufa Qaynağı",
"academy.videos[1].s": "orta ölçülər (diametrlər)",
"academy.videos[2].t": "Elektrik (Elektrofüzyon) Qaynağı",
"academy.videos[2].s": "İstilik telləri olan (Electrofusion) fitinqlər",
"academy.videos[3].t": "Alın qaynağı (Butt welding)",
"academy.videos[3].s": "d630-a qədər böyük ölçülər",
"academy.quiz[0].o": ["Əl ilə Mufa Qaynağı", "Alın qaynağı (Butt Fusion)", "Yapışdırma"],
"academy.quiz[1].o": ["Standard Dimension Ratio (d/s) - Standart Ölçü Nisbəti", "Static Density Rating - Statik Sıxlıq Dərəcəsi", "Sicherheits-Druck-Reserve - Təzyiq Təhlükəsizlik Ehtiyatı"],
"academy.quiz[2].o": ["Daha aşağı qiymət", "Dəyişdirilmiş (Modifikasiya olunmuş) kristal struktur → daha çox temperatur və təzyiq müqaviməti", "Metal gücləndirmə (Metal dəstək)"],
"academy.quiz[3].o": ["Kod 3", "Kod 5", "Kod 7"],
"academy.quiz[4].o": ["qızdırıcı elementdən (güzgüdən)", "fitinqə quraşdırılmış (inteqrasiya olunmuş) isitmə (qızdırıcı) məftillərindən", "isti havadan"]
}

with open("az.json", "r") as f:
    az = json.load(f)

for k, v in patch.items():
    parts = k.split(".")
    curr = az
    for p in parts[:-1]:
        if p.endswith("]"):
            p_name, idx = p[:-1].split("[")
            idx = int(idx)
            curr = curr[p_name][idx]
        else:
            curr = curr[p]
    
    last = parts[-1]
    if last.endswith("]"):
        p_name, idx = last[:-1].split("[")
        idx = int(idx)
        curr[p_name][idx] = v
    else:
        curr[last] = v

with open("az.json", "w") as f:
    json.dump(az, f, indent=2, ensure_ascii=False)
