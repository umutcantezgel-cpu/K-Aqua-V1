import json

patch = {
"krankenhaus.bento.items": [
  {
    "title": "100% Korroziyaya Davamlılıq",
    "desc": "Metal borulardan fərqli olaraq, K Aqua elektrokimyəvi korroziyaya, oyuq (deşik) korroziyasına və kalsiumlu (kirəcli) suya qarşı tamamilə immunitetlidir (davamlıdır). 50 illik davamlı iş (istismar) müddətində heç bir inkrustasiya (ərp), heç bir təzyiq itkisi yoxdur.",
    "badge": "0% Paslanma"
  },
  {
    "title": "İldırım sürətində Quraşdırma",
    "desc": "Bizim homogen qaynaq texnologiyamız quraşdırma vaxtlarını (müddətini) metal sistemlərlə (və ya lehimləmə/yapışdırma ilə) müqayisədə 50%-ə qədər azaldır. Vaxtın (Sürətin) böyük rol oynadığı meqalayihələr üçün inqilabi."
  },
  {
    "title": "Yüksək İstilik (Termal) İzolyasiyası",
    "desc": "PP-R materialının təbii izolyasiya xüsusiyyətləri sayəsində (boru xətlərində) istilik itkisi kəskin şəkildə azalır (minimuma enir). Bu, xəstəxanalarda (isti) suyun sabit (daimi) istilikdə (dərəcədə) qalmasına kömək edir."
  },
  {
    "title": "Zərbə (Sok) Absorbsiyası",
    "desc": "Binalardakı dinamik qüvvələri (təzyiqləri) və seysmik (titrəmə) şokları udur (neytrallaşdırır), boru kəmərlərinin (şəbəkənin) qırılmasının (çatlamasının) qarşısını alır."
  }
],
"krankenhaus.specs.lead": "Klinika və Səhiyyə mərkəzləri üçün xüsusi layihələndirilmiş fiziki parametrlər:",
"krankenhaus.specs.therm": "Ekstremal istiliyə (termal) davamlılıq, 95°C-dən yuxarı temperaturlara asanlıqla tab gətirir.",
"krankenhaus.specs.mech": "Yüksək təzyiq (reytinqi) və mexaniki güc (dayanıqlılıq) (PN 25, SDR 6).",
"krankenhaus.cta.eyebrow": "MƏSLƏHƏT (KONSULTASİYA) VƏ PLANLAŞDIRMA",
"krankenhaus.cta.button": "Klinika Mütəxəssislərimizlə (Ekspertlərlə) Əlaqə",
"hotels.textSection.h3": "Homogen Qaynaq Birləşmələri: Sızmanın (Leckagen) Sonu",
"hotels.textSection.p4": "K Aqua sistemləri bütün beynəlxalq keyfiyyət standartlarını (xüsusiyyətlərini) asanlıqla (rahatlıqla) aşır.",
"hotels.textSection.p5": "Hər hansı bir boru kəməri sisteminin ən zəif həlqəsi (nöqtəsi) birləşmədir (tikişdir). Yivlər (vintli birləşmələr) korroziyaya uğrayır, sızdırmazlıq halqaları (rezin contalar) məsaməli (məsaməli/deşikli) olur, yapışdırıcı birləşmələr termal tsiklləşmə (istilik dövrləri) səbəbindən (nəticəsində) aşınır (yorulur).",
"hotels.textSection.p6": "Biz molekulyar füzyon (ərimə) prinsipindən istifadə edirik. Boru və fitinq (hissə) termal (istiliklə) olaraq tam (dəqiqliklə) 260°C-yə qədər qızdırılır və sonra (bir-birinə) birləşdirilir. Saniyənin bir (kiçik) hissəsində hər iki (hissənin) komponentin polimer zəncirləri ayrılmaz, monolit (bütöv) bir vahidə (birliyə) əriyərək (birləşir). Nəticə: Artıq heç bir (zəif/fiziki) \"birləşmə\" mövcud deyil. Boru və fitinq vahid, kəsintisiz (davamlı) bir material kütləsidir (parçasıdır). Contasız, zəif (riskli) nöqtə olmadan, 100% iş (fəaliyyət) təhlükəsizliyi ilə.",
"hotels.sticky.items[0].p1": "Geniş otel (kurort) şəbəkələrində (sistemlərində) müvəqqəti (zaman-zaman) istifadə olunmayan suitlərdəki durğun (axmayan) su ölümcül bir tələyə çevrilə bilər. Legionellalar (Bakteriyalar) kobud (pürüzlü) boru divarlarında (səthində) əmələ gələn biofilmlərdə (təbəqələrdə) çoxalır.",
"hotels.sticky.items[0].p2": "K Aqua PP-R (borusunun) mikroskopik səth kələ-kötürlüyü 0.007 mm-dir. Heç bir məsamə (deşik), heç bir boşluq, heç bir (bakteriya üçün) lövbər (tutunma) nöqtəsi yoxdur. Termal dezinfeksiya ilə birlikdə (kombinasiyada), biz fiziki olaraq mümkün olan ən steril (təmiz) mühiti (şəraiti) təmin edirik.",
"hotels.sticky.items[1].p1": "Hər bir desibel əhəmiyyətlidir (vacibdir). Lüks kurortlarda (otellərdə) qonşu (yan) suitdəki (otaqdakı) tualet (su) axıdılması (işlədilməsi) və ya duş qəbul edilməsi eşidilməməlidir.",
"hotels.sticky.items[1].p2": "Kompozit materialımızın (K Aqua Fiber Kompozit/Lifli) yüksək (sıxlığı) və yüksək daxili amortizasiya (udma/boğma) faktoru sayəsində biz gövdə (struktur) səs-küyünü (titrəməni) metal sistemlərlə (borularla) müqayisədə 80%-ə qədər azaldırıq. Qonaqlarınızın eşitməyəcəyi (hiss etməyəcəyi) bir fərq.",
"hotels.sticky.items[2].p1": "80, 100 və ya 120 mərtəbəli (qatlı) otellər şaquli (qaldırıcı) xətlərə (borulara) ekstremal tələblər (şərtlər) irəli sürür (qoyur). Binanın aşağı (alt) hissəsindəki (qatlarındakı) hidrostatik təzyiq (çox) böyükdür.",
"hotels.sticky.items[2].p2": "K Aqua fiber (lif) gücləndirilməsi ilə (kombinasiyada) xüsusi (daha yüksək) təzyiq sinifləri (dərəcələri) (SDR 6 / PN 20) təklif edir, bu da hətta 70°C temperaturlarda (davamlı) daimi yük (təzyiq) altında (belə) 50 ildən çox (bir) xidmət (ömür) müddətinə (işləməyə) zəmanət verir. Biz qravitasiyanı (cazibə qüvvəsini) məğlub edirik (məhv edirik).",
"hotels.sticky.items[3].p1": "Dubay və ya Ər-Riyad kimi səhra (çöl) bölgələrində soyuq ən bahalı (qiymətli) əmtəədir (nemətdir). Mərkəzləşdirilmiş Soyutma (District Cooling) sistemləri soyudulmuş (buzlu) suyu böyük məsafələr (üzərindən) qət edərək (kurortlara/otellərə) kurorta daşıyır.",
"hotels.sticky.items[3].p2": "PP-R-in mükəmməl (qüsursuz) izolyasiya dəyərləri (xüsusiyyətləri) kondensasiyanın (yoğuşmanın) yaranmasının qarşısını alır və soyutma (soyuqluq) itkisini kütləvi şəkildə minimuma endirir. Artıq korroziyaya uğramış (paslanmış) Çiller (Chiller) boruları yoxdur, damlayan (su sızdıran) tavanlar yoxdur. Yalnız saf, təmiz (mütləq) səmərəlilik (effektivlik).",
"hotels.perf.items": [
  {"val": "0.007", "unit": "mm", "title": "Səth Kələ-kötürlüyü", "desc": "Biofilmlərə (Bakteriyalara) və inkrustasiyaya (ərpə) qarşı mütləq (tam) müqavimət."},
  {"val": "100", "unit": "%", "title": "Homogen Füzyon (Birləşmə)", "desc": "Molekulyar səviyyədə (bir-birinə) əriyən (homogen) qaynaq birləşmələri (tikişləri)."},
  {"val": ">50", "unit": "İl", "title": "İl Ömür (Xidmət Müddəti)", "desc": "Ən sərt ISO standartlarına (normalarına) əsasən sınaqdan keçirilmiş və təsdiqlənmişdir."},
  {"val": "0", "unit": "", "title": "Baxım (Texniki Xidmət) Tələbi", "desc": "Quraşdırın, (möhkəmcə) bağlayın və (birdəfəlik) əbədiyyən unudun."}
],
"hotels.timeline.items[0].year": "Dubay",
"hotels.timeline.items[0].text": "800 suitin (otağın) və 4 nəhəng (böyük) hovuz mənzərəsinin (ərazisinin) təchizatı. Ekstremal duzluluq və 50°C-yə qədər olan ətraf mühit (hava) temperaturları maksimum (yüksək) termal (istilik) və kimyəvi (maddələrə qarşı) davamlılıq tələb edirdi (şərt qoyurdu). K Aqua bütün soyuq və isti su (təchizatı) şəbəkəsini (sistemini), o cümlədən District Cooling (Mərkəzi Soyutma) bağlantısını (təchiz etdi/çatdırdı).",
"hotels.timeline.items[1].year": "İsveçrə",
"hotels.timeline.items[1].text": "2000 metr hündürlükdə yerləşən (olan) 6 ulduzlu (lüks) kurort (otel). Çətinlik (Problem): Tikinti (quraşdırma) mərhələsində ekstremal donma (şaxta) təhlükəsi və səs izolyasiyası (akustika) üçün maksimum (ən sərt) tələblər. Bizim PP-R fiber-kompozit (lifli) borularımız termal uzunluq (genişlənmə) dəyişikliklərini inamla (mütləq) udur (boğur) və səssiz (axıcı) işləməyə (işə) zəmanət verirdi.",
"hotels.timeline.items[2].year": "Sinqapur",
"hotels.timeline.items[2].text": "Ekoloji arxitekturanın (dizaynın) 65 mərtəbəli şah əsəri (göydələni). Minlərlə balkon bitkisi (ağacı) üçün (olan) mürəkkəb suvarma sistemi və bütün (bütöv) içməli su infrastrukturu K Aqua ilə (istifadə edilərək) həyata keçirilmişdir. Homogen qaynaq (əritmə) texnologiyası binanı mikroskopik sızmalardan qorudu (xilas etdi).",
"hotels.timeline.items[3].year": "Maldiv Adaları",
"hotels.timeline.items[3].text": "Birbaşa qayalıqların (riflərin) üzərində (dənizdə) tikilmiş (inşa edilmiş), mütləq (tam) ekoloji (təbii) uyğunluq tələb olunurdu. K Aqua boruları 100% təkrar emal (recycelbar) oluna bilir, suya (heç bir) mikroplastik və ya ağır metallar buraxmır (ayrılmır) və heç bir aşınma (deqradasiya) olmadan yüksək (dərəcədə) korroziyalı duzlu dəniz havasına (suyuna) tab gətirir (dözür).",
"hotels.timeline.items[4].year": "Gələcək",
"hotels.timeline.items[4].text": "Arxitekturanın (Memarlığın/İnşaatın) sərhədləri (limitləri) hər gün irəliləyir (dəyişir). Biz sizin ən cəsarətli (böyük) vizyonlarınızın (layihələrinizin) təməlini (özülünü) tökməyə hazırıq. Öz (İçində olduğu) dövrünü (zamanını) onilliklər (qabaqlayan) üstələyən texnologiya (material) ilə.",
"hotels.research.eyebrow": "Tədqiqat & İnkişaf (Ar-Ge/R&D)",
"hotels.research.items": [
  "Azaldılmış (Minimuma endirilmiş) xətti genişlənmə (Alfa dəyəri: 0.035 mm/mK)",
  "Eyni təzyiq sinfində (dərəcəsində) daha nazik (az) divar qalınlıqları sayəsində artırılmış (böyüdülmüş) axın (daxili) kəsiyi",
  "Otel (Kurort) hovuz (su) zonasında xlor (kimyəvi) birləşmələrinə qarşı mütləq (tam) müqavimət (davamlılıq)",
  "Toksikoloji baxımdan tamamilə (100%) zərərsiz, qida (və içməli su) təhlükəsizliyi təsdiqlənmişdir"
],
"hotels.certs.eyebrow": "Uyğunluq (Standartlar) & Sertifikatlaşdırma",
"hotels.certs.lead": "Beynəlxalq layihələr beynəlxalq təsdiqlər (sertifikatlar) tələb edir. K Aqua dünyanın ən sərt (ən ciddi) tənzimləyici orqanları tərəfindən dünya (qlobal) miqyasında (təsdiqlənmiş) sınaqdan keçirilmiş, (uğurla) yoxlanmış və (istifadəyə) buraxılmışdır (təsdiqlənmişdir).",
"hotels.cta.button1": "Layihəni (Təfərrüatları) Qiymətləndir (Evaluasiya)",
"hotels.cta.button2": "Birbaşa Əlaqə Satış (Şöbəsi)",
"vorfertigung.hero.badge": "German Engineering. Qlobal (Beynəlxalq) Təsir (Səmərəlilik).",
"vorfertigung.intro.eyebrow": "Mükəmməllik (Qüsursuzluq) Fəlsəfəsi",
"vorfertigung.intro.title": "Dünya bazarı (Qlobal Liderlər) nə üçün K Aqua-ya etibar edir (güvənir).",
"vorfertigung.intro.lead": "Siz göylərə (buludlara) toxunan (yüksələn) bir bina (göydələn) və ya (içərisində) hər saniyənin önəmli (kritik) olduğu bir xəstəxana dizayn etdiyiniz (layihələndirdiyiniz) zaman, (siz) şantiyə (tikinti) quraşdırmasının (istehsalının) dəyişkən (riskli) amillərinə (şərtlərinə) arxalana (etibar edə) bilməzsiniz. Sizə sənaye səviyyəli (miqyaslı) qabaqcadan istehsalın (vorfertigung-un) klinik (mütləq) dəqiqliyi (qüsursuzluğu) lazımdır.",
"hochhaus.meta": {
  "title": "Şaquli (Göydələn) İnfrastruktur | K Aqua",
  "desc": "K Aqua Göydələn (Hochhausbau): Qlobal meqalayihələr üçün Alman mühəndisliyi ilə kompromissiz təhlükəsizlik. Yüksək mərtəbəli (şaquli) həllərimiz (sistemlərimiz) haqqında daha çox öyrənin."
},
"hochhaus.intro.eyebrow": "Meqalayihələrin (Meqabinaların) Anatomiyası",
"hochhaus.intro.lead": "500 metr hündürlükdə fizika konstruksiya (dizayn/inşaat) xətalarını (səhvlərini) bağışlamır. Şaquli (Qaldırıcı) xəttdəki (sadəcə/çox kiçik) bir (mikroskopik) haç (saç/mikro) çatı milyonlarla (dollarlıq) fəlakətli (böyük) zərərlər (ziyan) deməkdir. Məhz buna görə də, (biz) K Aqua olaraq heç nəyi (heç bir detalı) şansa (təsadüfə) buraxmırıq (təslim etmirik).",
"hochhaus.intro.p1": "Göydələnlər (Çoxmərtəbəli binalar) şaquli (dik) şəhərlərdir. Onlar (O binalar) nəbz kimi atır (titrəyir), onlar hərəkət edir, onlar nəfəs alır. Hər mərtəbə (artdıqca) ilə hidrostatik təzyiq (su təzyiqi) eksponensial şəkildə artır (çoxalır). Külək yükləri (təzyiqi) bütün struktura (binaya) mikro titrəmələr (vibrasiyalar) verir (yayır). Buz (kimi soyuq) fundament (özül) ilə günəşə (birbaşa) məruz qalan (qaynar) zirvə arasındakı temperatur fərqləri nəhəng (böyük) termal (istiliklə bağlı) uzununa genişlənmələrə (və daralmalara) səbəb olur.",
"hochhaus.intro.p2": "Ənənəvi (Klassik) metal boru kəməri sistemləri (məhz) burada mütləq (öz) fiziki hüdudlarına (limitlərinə) çatır (dayanır). Korroziya (Pas), oyuq korroziyası, inkrustasiya (ərp) və qaynaq tikişlərindəki (qopma/sınma) material (maddə) yorğunluğu (sınması) \"Görəsən (Olar) ?\" sualı deyil, \"Nə vaxt (olacaq)?\" sualıdır (yəni labüddür). Göydələn (Yüksək mərtəbəli bina) tikintisində sızma (qaçaq) sadəcə texniki (adi) bir problem deyil. Bu, bütün (bütöv) layihəni (binanı) riskə ata biləcək maliyyə riskidir.",
"hochhaus.intro.p3": "K Aqua yüksək performanslı polimerləri (PP-R & PPRCT) göydələn infrastrukturunun oyun (fəaliyyət) qaydalarını fundamental şəkildə dəyişir. Onlar (Bu borular) korroziyaya uğramır (paslanmır). Onlar (Bu borular) kirəclənmir (ərp bağlamır). Və homogen termal (istiliklə) qaynaq texnologiyamız (üsulumuz) sayəsində boru və fitinq (birləşdirici hissə) molekulyar səviyyədə (bir-birinə) əriyərək vahid, ayrılmaz (bütöv) bir hissəyə çevrilir. (Bununla da) Dövriyyə sistemi (Boru şəbəkəsi) materialın (borunun) özü qədər (son dərəcə) güclü olur."
}

with open("az.json", "r") as f:
    az = json.load(f)

for k, v in patch.items():
    parts = k.split(".")
    curr = az["solutions"]
    for p in parts[:-1]:
        if p.endswith("]"):
            name, idx = p[:-1].split("[")
            idx = int(idx)
            curr = curr[name][idx]
        else:
            if p not in curr:
                curr[p] = {}
            curr = curr[p]
    
    last = parts[-1]
    if last.endswith("]"):
        name, idx = last[:-1].split("[")
        idx = int(idx)
        curr[name][idx] = v
    else:
        curr[last] = v

with open("az.json", "w") as f:
    json.dump(az, f, indent=2, ensure_ascii=False)
