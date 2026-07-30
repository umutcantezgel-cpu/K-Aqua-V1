const fs = require('fs');

const missingTranslations = {
  // products
  "products.narrative": {
    "title": "Qat'iy muhandislik. Murakkab bo'lmagan mukammallik.",
    "lead": "Biz mukammallikni oddiylik orqali aniqlaymiz. Bizning quvur tizimlarimiz shunchaki mahsulot emas; ular suv ta'minoti va barqarorlik muammolarini hal qilish uchun ishlab chiqilgan keng qamrovli echimlardir."
  },
  "products.seoArticle.pipes.areas": "Sanoat sovutish, Ichimlik suvi, Isitish tizimlari, Kema qurilishi",
  "products.seoArticle.pipes.advTitle": "K Aqua quvurlarining (Pipes) afzalliklari",
  "products.seoArticle.pipes.advList": [
    "Chidamlilik: K Aqua PP-RCT quvurlari standart PP-R quvurlariga qaraganda 50 yillik muddatda yuqori harorat va bosimlarga bardosh beradi.",
    "Gigiyena: Mikroblar rivojlanishi va legionella ko'payishining oldini olish uchun juda silliq ichki yuzalar (NSF va DVGW tasdiqlangan).",
    "Energiya samaradorligi: Metall quvurlarga nisbatan juda past issiqlik o'tkazuvchanligi, qo'shimcha izolyatsiya xarajatlarini kamaytiradi.",
    "Korroziyaga qarshilik: Kislotali va gidroksidi muhitlarga (pH 2 dan 12 gacha) mutlaq qarshilik, sanoat uchun ideal.",
    "Atrof-muhit: 100% qayta ishlanadigan va ishlab chiqarish hamda tashishda C02 emissiyasi metallarga nisbatan ancha past."
  ],
  "products.seoArticle.pipes.seoText": "K Aqua PP-RCT quvurlari (Pipes) barqaror va yuqori unumdor suyuqlik tashish tizimlarida innovatsiya cho'qqisidir. Kengaytirilgan kristalli tuzilishi tufayli bizning quvurlarimiz juda yupqa devor qalinligi bilan yuqori bosim va haroratlarda mislsiz gidravlik quvvatni taklif etadi. Ushbu quvurlar turar-joy loyihalari, shifoxonalar va yirik sanoat inshootlari uchun tanlovdir.",
  "products.seoArticle.pipes.guideTitle": "O'rnatish bo'yicha qo'llanma: K Aqua quvurlari qanday qilib to'g'ri o'rnatiladi",
  "products.seoArticle.pipes.guideText": "<p>K Aqua polipropilen quvurlarini o'rnatish ham xavfsiz, ham samarali. Optimal ishlash uchun quyidagi muhim qadamlarga e'tibor bering:</p><ul><li><span class=\"font-semibold\">Tayyorlash va kesish:</span> Quvurni quvur qaychisi yoki maxsus K Aqua quvur kesgich yordamida har doim burchak ostida (90 gradus) to'g'ri kesing. Qiya kesishlar payvandlash sifatiga salbiy ta'sir ko'rsatishi mumkin.</li><li><span class=\"font-semibold\">Kalibrlash (Faser quvurlari uchun):</span> Tashqi qatlamda alyuminiy folga yoki maxsus shisha tolali qatlam bo'lsa, payvandlash zonasi maxsus ochuvchi (peeler) bilan tayyorlanishi kerak.</li><li><span class=\"font-semibold\">Isitish va payvandlash:</span> K Aqua payvandlash moslamasi yordamida quvur va fitting kerakli haroratgacha qizdiriladi. O'rnatilgandan so'ng sovish vaqti tugashini kuting.</li><li><span class=\"font-semibold\">Bosim sinovi:</span> Tarmoqni yopishdan oldin suv orqali standart bosim sinovi o'tkazilishi tavsiya etiladi.</li></ul>",
  "products.seoArticle.weldInSaddles.areas": "Qo'shimcha tarmoqlar, Quvur tarmog'ini kengaytirish, Taqsimlash",
  "products.seoArticle.weldInSaddles.advTitle": "Maksimal moslashuvchanlik uchun payvandlanadigan egarlar (Weld-in Saddles)",
  "products.seoArticle.weldInSaddles.advList": [
    "Qo'shimcha o'rnatish: Asosiy quvurni kesmasdan mavjud PP-R quvur tarmoqlarini kengaytirish.",
    "Vaqtni tejash: Burg'ulash, qizdirish, payvandlash bir necha daqiqada yakunlanadi.",
    "Bosimga chidamli: Egar payvandlashi asosiy quvur kabi bir xil bosim darajasiga erishadi.",
    "To'liq oqim: Asosiy quvurda kesma qisqarishi yo'q.",
    "Ko'p qirrali: Metall tishli o'tish (ichki/tashqi tishli) bilan yoki usiz mavjud."
  ],
  "products.seoArticle.weldInSaddles.seoText": "Maksimal moslashuvchanlik uchun payvandlanadigan egarlar (Weld-in Saddles) mavjud quvur tarmoqlarida qo'shimcha tarmoqlar yaratish uchun ajoyib yechimdir. Asosiy quvurni qiyinchilik bilan kesish va T-qismlarini kiritish o'rniga, quvur shunchaki burg'ulanadi va egar sirtga bir hil payvandlanadi. Ushbu texnika sanoat taqsimlash tizimlarida o'rnatish vaqti va material xarajatlarini sezilarli darajada tejaydi.",
  "products.seoArticle.weldInSaddles.guideTitle": "O'rnatish bo'yicha qo'llanma: Payvandlanadigan egarlar yordamida moslashuvchanlik",
  "products.seoArticle.weldInSaddles.guideText": "<p>Mavjud sanoat va tijorat quvur tarmoqlarini o'zgartirish yoki kengaytirish ko'pincha katta kuch talab qiladi. Bu erda <span class=\"font-semibold\">K Aqua payvandlanadigan egarlari</span> liniyani to'xtatmasdan qo'shimcha tarmoqlar yaratish uchun samarali va o'ta xavfsiz yechim taklif qiladi.</p><p>Asosiy texnik afzalliklar:</p><ul><li><span class=\"font-semibold\">Minimal o'rnatish vaqti:</span> Asosiy quvurni kesish o'rniga u faqat aniq burg'ulanadi va egar payvandlanadi. Bu xarajatlarni keskin kamaytiradi.</li><li><span class=\"font-semibold\">Tizim yaxlitligini saqlash:</span> Egar quvur devori bilan uzviy bog'lanib, tizimning asl bosim va haroratga chidamliligini (PN 25 gacha) saqlaydi.</li><li><span class=\"font-semibold\">Moslashuvchan ulanishlar:</span> Datchiklar yoki manometrlarni bevosita ulash imkonini beradi.</li></ul>",
  "products.seoArticle.accessories.faq.2": {
    "q": "Sanoat maqsadlarida foydalanish uchun maxsus aksessuarlar bormi?",
    "a": "Ha, bizning assortimentimiz po'lat yadroli og'ir yuk flaneslari, EPDM maxsus muhrlari va ekstremal sanoat yuklariga osongina bardosh bera oladigan mustahkamlangan quvur qisqichlarini o'z ichiga oladi."
  },
  "products.seoArticle.tools.advList.4": "Keng qamrovli: Oddiy quvur qaychilaridan tortib katta diametrli CNC mashinalarigacha.",
  "products.seoArticle.fallback.advList.3": "Optimal ko'p qirralilik: Barcha standart qo'llanilishlarga mos echimlar.",
  "products.seoArticle.fallback.advList.4": "Oson kengaytirish imkoniyati: Har bir komponent tizimni muammosiz kengaytirish uchun mo'ljallangan.",
  "products.tools.metaTitle": "Kesish va payvandlash asboblari | K Aqua",
  "products.tools.metaDesc": "K Aqua quvur tizimlarini aniq kesish va payvandlash uchun yuqori sifatli asboblar.",
  "products.tools.heroEyebrow": "Asboblar va Aksessuarlar",
  "products.tools.heroTitle": "PP-R o'rnatish uchun payvandlash asboblari",
  "products.tools.heroSubtitle": "Texnologiya orqali aniqlik",
  "products.tools.heroDesc": "Quvur payvandlash mashinalari, isitish halqasi texnologiyasi va kalibrlash asboblari: K Aqua asl asboblari yordamida har bir qurilish maydonchasida standartlarga mos keladigan, doimiy germetik payvand choklari yaratiladi. PP-R o'rnatish uchun professional asboblar.",
  "products.tools.heroBtnPrimary": "Texnik hujjatlarni yuklab olish",
  "products.tools.heroBtnSecondary": "Katalogga o'tish",
  "products.tools.bentoEyebrow": "Asboblar oilasi",
  "products.tools.bentoTitle": "Murosasiz sifat uchun maxsus asboblar",
  "products.tools.bentoLead": "Har bir K Aqua vositasi bitta aniq maqsad uchun yaratilgan: mutlaqo xavfsiz va aniq ulanishni ta'minlash.",
  "products.tools.bento1Title": "Payvandlash mashinalari",
  "products.tools.bento1Desc": "Yilni dizayn, raqamli harorat nazorati. O'lchamlari 125 mm gacha bo'lgan quvurlar uchun ideal.",
  "products.tools.bento2Title": "Quvur kesgichlar",
  "products.tools.bento2Desc": "Deformatsiyasiz silliq va aniq burchakli kesishlar uchun ergonomik dizayn.",
  "products.tools.bento3Title": "Stumpf payvandlash mashinalari",
  "products.tools.bento3Desc": "250 mm gacha bo'lgan o'lchamlar uchun. Mutlaq takrorlanuvchanlik uchun CNC boshqariladi.",
  "products.tools.bento4Title": "Ta'mirlash to'plamlari va Zaxira qismlar",
  "products.tools.bento4Desc": "Burg'ulash uchlari, ta'mirlash egarlari va qo'shimcha tarmoqlar uchun burg'ular.",
  "products.tools.scrollEyebrow": "Chuqur texnologiya",
  "products.tools.scrollTitle": "Xatoliklarga o'rin yo'q.",
  "products.tools.scrollLead": "Bizning asboblarimizni tasdiqlangan o'rnatuvchilar uchun birinchi raqamli tanlovga aylantiradigan texnologik tafsilotlarni kashf eting.",
  "products.tools.scroll1Title": "Mukammal termodinamika. Har bir payvandda.",
  "products.tools.scroll1Desc": "Bizning isitish elementimiz payvandlash asboblari teflon bilan qoplangan yuqori aniqlikdagi isitish mandrellari va isitish butalari bilan jihozlangan. Mikroprotsessor tomonidan boshqariladigan haroratni nazorat qilish hatto global qurilish maydonchalarida ekstremal tashqi haroratlarda ham 260°C doimiy payvandlash haroratini kafolatlaydi. Shunday qilib, molekulyar darajada ajralmas, bir hil ulanish yaratiladi.",
  "products.tools.scroll2Title": "CNC boshqariladigan payvandlash.",
  "products.tools.scroll2Desc": "Katta nominal o'lchamlar uchun (250 mm va undan ko'p) biz CNC boshqariladigan payvandlash mashinalariga tayanamiz. Avtomatik bosim va vaqtni hisoblash inson xatosini bartaraf qiladi. Qurilishni qabul qilish uchun to'liq kuzatuvni ta'minlash uchun har bir payvandlash davri raqamli ravishda qayd etiladi. Germaniya muhandisligining eng yuqori darajasi.",
  "products.tools.scroll3Title": "Nozik quvur tozalagichlar (Peeler). Millimetrgacha aniq.",
  "products.tools.scroll3Desc": "Tayyorgarlik payvandlashning 80% dir. Bizning mexanik va elektr quvur tozalagichlarimiz K Aqua quvurlaridagi oksid qatlamini mutlaqo bir tekis kesish chuqurligi bilan olib tashlaydi. Bu mikro yoriqlar paydo bo'lishining oldini oladi va mukammal sintez darajasini ta'minlaydi. Avlodlardan o'tadigan asbob.",
  "products.tools.scroll4Title": "Aniq kesish uchun sovuq dairesel arralar.",
  "products.tools.scroll4Desc": "Quvur qaychi materialni deformatsiyalashi mumkin. Bizning sanoat sovuq dairesel arralarimiz mukammal burchakli, burilishsiz kesiklarni kafolatlaydi. Natija: Payvandlash jarayonidan oldin kuchlanish tufayli yoriqlar yo'q, bosim yo'qotilishi yo'q.",
  "products.tools.timelineTitle": "K Aqua payvandlash jarayoni",
  "products.tools.timelineDesc": "Kesishdan molekulyar sintezgacha. 100% oqishsiz va texnik xizmat ko'rsatmaydigan quvur tizimlariga olib keladigan standartlashtirilgan jarayon.",
  "products.tools.timeline1Year": "1-bosqich: Materialni tayyorlash",
  "products.tools.timeline1Title": "Mukammal kesish.",
  "products.tools.timeline1Text": "Yumshoq, 90 gradusli kesish doimiy ulanishning asosidir. Bizning nozik to'sarlarimiz va arralarimiz polipropilenning mikro tuzilmali deformatsiyalarisiz mutlaqo tekis sirtni kafolatlaydi.",
  "products.tools.timeline2Year": "2-bosqich: Kalibrlash va tozalash",
  "products.tools.timeline2Title": "Oksid qatlamini olib tashlash.",
  "products.tools.timeline2Text": "Payvandlashdan oldin quvur aniq kalibrlanadi va tashqi oksid qatlami bizning maxsus tozalash asboblarimiz yordamida millimetrgacha o'chiriladi. Bu termik sintez jarayoni uchun 100% toza sirtni ta'minlaydi.",
  "products.tools.timeline3Year": "3-bosqich: Termik sintez",
  "products.tools.timeline3Title": "Molekulyar birlashish.",
  "products.tools.timeline3Text": "Quvur va fitting teflon qoplamali isitish matritsasida bir vaqtning o'zida 260°C ga qadar isitiladi. K Aqua payvandlash mashinalarining mikroprotsessor tomonidan boshqariladigan termostati haroratni shamol yoki ob-havodan qat'iy nazar barqaror ushlab turadi.",
  "products.tools.timeline4Year": "4-bosqich: Ulanish",
  "products.tools.timeline4Title": "Umrbod xavfsizlik.",
  "products.tools.timeline4Text": "Belgilangan o'tish vaqtida isitiladigan qismlar burilishsiz birlashtiriladi. Sovutish bosqichidan so'ng yangi, butunlay bir xil ish qismi yaratiladi. 50 yildan ortiq texnik xizmat ko'rsatmaydi.",
  "products.tools.specsTitle": "Sanoat avtoriteti. <br/> Eng mayda tafsilotlargacha.",
  "products.tools.specsP1": "O'nlab yillar davomida biz Germaniyaning markazidagi bosh zavodimizda hunarmandchilik faxrini zamonaviy, yuqori darajada avtomatlashtirilgan ishlab chiqarish texnologiyasi bilan birlashtirib kelamiz.",
  "products.tools.specsP2": "Dunyodagi eng og'ir cho'llarda va eng ekstremal iqlim zonalarida qo'llaniladigan materialimiz har kuni o'zini isbotlaydi. Biz butun dunyo amal qiladigan standartni o'rnatamiz.",
  "products.tools.specsList1": "ISO 9001 sertifikati",
  "products.tools.specsList2": "A sinfidagi teflon PTFE qoplamasi",
  "products.tools.specsList3": "Raqamli harorat kalibrlash",
  "products.tools.ctaTitle": "Murosasiz sifatga tayyormisiz?",
  "products.tools.ctaDesc": "Keyingi mega loyihangiz haqida bizning muhandislik guruhimiz bilan gaplashing va asboblarimiz namunalarini so'rang.",
  "products.tools.ctaBtn": "Loyiha so'rovini boshlash",
  "products.tools.hero": {
    "eyebrow": "Asboblar va Zaxira qismlar",
    "title": "PP-R o'rnatish uchun payvandlash asboblari",
    "lead": "Quvur payvandlash mashinalari, isitish halqasi texnologiyasi va kalibrlash asboblari: K Aqua asl asboblari yordamida har bir qurilish maydonchasida standartlarga mos keladigan, doimiy germetik payvand choklari yaratiladi."
  },
  "products.transitionFittings.sticky": {
    "eyebrow": "Chuqur texnologiya (Deep Tech)",
    "title": "Buzilmaslik anatomiyasi.",
    "lead": "Biz o'tish moslamasiga (Transition Fitting) shunchaki aksessuar sifatida emas, balki juda murakkab mexanik asbob sifatida qaraymiz. Devor qalinligining har bir millimetri, har bir ip - chekli elementlar tahlilining (FEA) natijasidir.",
    "items": [
      {
        "title": "Metall va polimer simbiozi",
        "desc": "Bizning o'tish moslamalarimiz sinklanishga chidamli CW617N misining qattiq mexanik kuchi va PPRCT ning kimyoviy inertsiyasini birlashtiradi. Ushbu material sintezi oddiy presslash emas, balki ajralmas molekulyar o'zaro bog'lanishni ta'minlaydigan termo-mexanik in'ektsion kalıplama jarayoni orqali erishiladi."
      },
      {
        "title": "Ekstremal buralish va moment",
        "desc": "Standart armaturadagi muhim nosozlik mezonlaridan biri o'rnatish paytida ortiqcha buralish momentidir. K Aqua o'tishlari plastik gilzada patentlangan olti burchakli mahkamlash profilini birlashtiradi. Natija: chegara qatlamini de-laminatsiyasiz 300 Nm dan ortiq kafolatlangan burilish qarshiligi."
      },
      {
        "title": "Muvozanatdagi issiqlik kengayish koeffitsientlari",
        "desc": "Haroratning o'zgarishida metallar va plastmassalar turli xil kengayadi (Δα). Mis qismidagi aniq hisoblangan mikro-kengaytiruvchi bo'g'inlar orqali bizning moslamalarimiz millisekundlarda -20°C dan +95°C gacha bo'lgan ekstremal zarbalarni mutlaqo sizib chiqmasdan kompensatsiya qiladi."
      },
      {
        "title": "Nol tolerantlik sifat nazorati",
        "desc": "Har bir individual gibrid komponent to'liq avtomatlashtirilgan geliy qochqin sinovidan va 3D optik o'lchovdan o'tadi. Agar 10^-5 mbar·l/s chegarasiga bir oz bo'lsa ham tegilgan bo'lsa, tizimimiz komponentni rad etadi. Germaniya muhandisligi murosaga toqat qilmaydi."
      }
    ]
  },
  "products.transitionFittings.bento": {
    "eyebrow": "Texnik xususiyatlari",
    "title": "Ishlash arxitekturasi.",
    "lead": "Agar siz o'n minglab ulanishlarga ega bo'lgan mega loyihalarni rejalashtirmoqchi bo'lsangiz, statistik ishonchlilik eng muhim sarmoyadir. K Aqua buning uchun sizga jismoniy kafolat beradi.",
    "items": [
      {
        "title": "DZR mis yadrosi",
        "desc": "CW617N darajasidagi sinklanishga chidamli guruch (DIN EN 12164 ga muvofiq) agressiv suv sifatlarida tanlangan korroziya xavfini yo'q qiladi."
      },
      {
        "title": "Aylanishga qarshi dizayn",
        "desc": "Ko'pburchakli pastki kesiklar plastik ko'ylagi zo'riqtirmasdan ekstremal momentlarni o'zlashtiradigan geometrik qulf hosil qiladi."
      },
      {
        "title": "Chuqur chizilgan iplar",
        "desc": "Konussimon va silindrsimon ISO 7/1 yoki ISO 228 iplari, mukammal zichlik uchun ±0.01 mm bardoshlik bilan ishlangan."
      },
      {
        "title": "PPRCT matritsasi",
        "desc": "Bizning tasodifiy polipropilen kopolimerimizning yuqori kristalli tuzilishi yuqori haroratlarda ajoyib uzoq muddatli kuchlanish yorilishi qarshiligini ta'minlaydi."
      }
    ]
  },

  // about
  "about.genauManagement.title1": "Standartlar",

  // trust
  "trust.certs": {
    "tab1": "Sertifikatlar",
    "tab2": "Muvofiqlik"
  },
  "trust.accred": "Akkreditatsiya",
  "trust.certNo": "Sertifikat raqami",
  "trust.valid": "Yaroqlilik muddati",
  "trust.download": "Hujjatni yuklab olish",
  "trust.genauEyebrow": "GENAU Boshqaruvi",
  "trust.genauTitle": "Nol nuqsonli ishlab chiqarish",
  "trust.genauLead": "K-Aqua sifat zanjiridagi har bir bosqich GENAU boshqaruv tizimi orqali nazorat qilinadi.",
  "trust.genau": {
    "title1": "Xom ashyo nazorati",
    "desc1": "Har bir partiya sinovdan o'tkaziladi. Oqim indeksi, zichlik va barqarorlik tekshiriladi.",
    "title2": "In-line nazorat",
    "desc2": "Lazerli o'lchov va ultratovush tekshiruvi. Barcha parametrlarning uzluksiz monitoringi.",
    "title3": "Laboratoriya sinovlari",
    "desc3": "Zarba sinovi, termik tsikl va bosim ostida uzoq muddatli barqarorlik.",
    "title4": "Kuzatiluvchanlik",
    "desc4": "Barcha quvurlar va fittinglar seriya raqami va shtrix kod orqali to'liq kuzatilishi mumkin."
  },
  "trust.rfpEyebrow": "Loyiha so'rovi",
  "trust.rfpTitle": "Mega loyihalarni rejalashtirish",
  "trust.rfpLead": "K-Aqua sizning yirik loyihalaringiz uchun maxsus texnik va logistika yechimlarini taklif etadi.",
  "trust.docs": {
    "title": "Tender hujjatlari",
    "desc": "Me'morlar va rejalashtiruvchilar uchun texnik matnlar, SAPR ma'lumotlari va tender hujjatlari to'plami."
  },
  "trust.inPackage": "Paketga kiritilgan:",
  "trust.pickLeft": "So'rov uchun mavzuni tanlang",
  "trust.requestZip": "ZIP faylni so'rash",
  "trust.requestBtn": "Muhandislik yordamini so'rash",
  "trust.mailSubject": "Loyiha so'rovi: K-Aqua",
  "trust.mailBody": "Iltimos, loyihangiz haqida batafsil ma'lumot bering...",
  "trust.scope3": "K-Aqua mahsulotlari bilan Scope 3 emissiyalarini kamaytirish haqida bilib oling.",

  // partner
  "partner.onionAria": "Global hamkorlar tarmog'i",
  "partner.rings": {
    "center": "K-Aqua Bosh ofisi",
    "ring1": "Yevropa Distribyutorlari",
    "ring2": "Global Hamkorlar",
    "ring3": "Xalqaro Loyihalar"
  },
  "partner.whyEyebrow": "Nima uchun biz?",
  "partner.whyTitle": "Ishonchli va Barqaror",
  "partner.cards": {
    "1": {
      "title": "Texnik yordam",
      "desc": "Loyiha bosqichida va o'rnatish jarayonida doimiy maslahat."
    },
    "2": {
      "title": "Sertifikatlangan Sifat",
      "desc": "Mahsulotlarimiz barcha xalqaro standartlarga javob beradi."
    },
    "3": {
      "title": "Global Logistika",
      "desc": "Dunyodagi istalgan nuqtaga tez va ishonchli yetkazib berish."
    },
    "4": {
      "title": "Innovatsiyalar",
      "desc": "Tadqiqot va rivojlanish markazimiz eng so'nggi texnologiyalarni yaratadi."
    }
  },

  // academy
  "academy.schulungen": {
    "title": "Treninglar",
    "desc": "O'rnatuvchilar va muhandislar uchun amaliy darslar va sertifikatlashtirish."
  },
  "academy.zertifizierung": {
    "title": "Sertifikatlash",
    "desc": "K-Aqua rasmiy sertifikatiga ega bo'lish orqali malakangizni oshiring."
  },
  "academy.glossar": {
    "title": "Glossariy",
    "desc": "PP-R va sanitariya texnologiyalari bo'yicha texnik atamalar lug'ati."
  },

  // geoContent
  "geoContent": {
    "germany": {
      "title": "Germaniya",
      "desc": "Bosh ofis va ishlab chiqarish bazasi."
    },
    "zuerich": {
      "regulator": "SVGW / TBDV"
    },
    "dschidda": {
      "regulator": "SASO / SWCC"
    }
  },

  // seoArticle
  "seoArticle.transitionFittings": {
    "title": "O'tish qismlari",
    "desc": "Plastik va metall quvurlar o'rtasida ishonchli va germetik ulanish."
  },
  "seoArticle.valves": {
    "title": "Klapanlar",
    "desc": "Yuqori bosimli tizimlar uchun ishonchli boshqaruv va xavfsizlik klapanlari."
  },
  "seoArticle.fittings": {
    "title": "Fittinglar",
    "desc": "Har qanday loyiha uchun keng qamrovli PP-R va PPRCT fittinglari."
  },
  "seoArticle.weldInSaddles": {
    "title": "Payvandlanadigan egarlar",
    "desc": "Quvur tarmoqlarini kengaytirish va qo'shimcha tarmoqlar yaratish."
  },
  "seoArticle.tools": {
    "title": "Asboblar",
    "desc": "K-Aqua tizimlarini o'rnatish uchun professional asbob-uskunalar."
  },
  "seoArticle.accessories": {
    "title": "Aksessuarlar",
    "desc": "O'rnatish jarayonini osonlashtiruvchi qo'shimcha komponentlar."
  },

  // kontaktBlocks
  "kontaktBlocks.home": { "title": "Bosh sahifa" },
  "kontaktBlocks.unternehmen": { "title": "Kompaniya" },
  "kontaktBlocks.produkte_fittings": { "title": "Fittinglar" },
  "kontaktBlocks.produkte_rohre": { "title": "Quvurlar" },
  "kontaktBlocks.produkte_armaturen": { "title": "Armaturalar" },
  "kontaktBlocks.produkte_werkzeuge": { "title": "Asboblar" },
  "kontaktBlocks.produkte_uebergaenge": { "title": "O'tish qismlari" },
  "kontaktBlocks.produkte_zubehoer": { "title": "Aksessuarlar" },
  "kontaktBlocks.katalog": { "title": "Katalog" },
  "kontaktBlocks.finder": { "title": "Mahsulot qidiruvchi" },
  "kontaktBlocks.produkte": { "title": "Mahsulotlar" },
  "kontaktBlocks.academy": { "title": "Akademiya" },
  "kontaktBlocks.referenzen": { "title": "Loyihalar" },
  "kontaktBlocks.support": { "title": "Qo'llab-quvvatlash" },
  "kontaktBlocks.ausschreibungstexte": { "title": "Tender matnlari" },
  "kontaktBlocks.service": { "title": "Xizmat" },
  "kontaktBlocks.maerkte_trinkwasser": { "title": "Ichimlik suvi" },
  "kontaktBlocks.maerkte_klima": { "title": "Iqlim nazorati" },
  "kontaktBlocks.maerkte_industrie": { "title": "Sanoat" },
  "kontaktBlocks.maerkte_schiffbau": { "title": "Kema qurilishi" },
  "kontaktBlocks.maerkte_landwirtschaft": { "title": "Qishloq xo'jaligi" },
  "kontaktBlocks.maerkte": { "title": "Bozorlar" },
  "kontaktBlocks.loesungen_hochhaus": { "title": "Ko'p qavatli binolar" },
  "kontaktBlocks.loesungen_krankenhaus": { "title": "Kasalxonalar" },
  "kontaktBlocks.loesungen_hotel": { "title": "Mehmonxonalar" },
  "kontaktBlocks.loesungen": { "title": "Yechimlar" },
  "kontaktBlocks.co2_rechner": { "title": "CO2 Hisoblagich" },
  "kontaktBlocks.trust_center": { "title": "Trust Center" },
  "kontaktBlocks.projektanfrage": { "title": "Loyiha so'rovi" },
  "kontaktBlocks.kontakt": { "title": "Aloqa" },
  "kontaktBlocks.news": { "title": "Yangiliklar" },
  "kontaktBlocks.karriere": { "title": "Karyera" },
  "kontaktBlocks.partnerschaft": { "title": "Hamkorlik" },
  "kontaktBlocks.impressum": { "title": "Impressum" },
  "kontaktBlocks.datenschutz": { "title": "Maxfiylik siyosati" },
  "kontaktBlocks.fallback": { "title": "Umumiy so'rov" },

  // kontaktForm
  "kontaktForm.phoneLabel": "Telefon raqami",
  "kontaktForm.phonePlaceholder": "+998 90 123 45 67",
  "kontaktForm.phoneError": "Iltimos, yaroqli telefon raqamini kiriting",
  "kontaktForm.emailLabel": "E-pochta",
  "kontaktForm.emailPlaceholder": "ism@kompaniya.uz",
  "kontaktForm.emailError": "Yaroqli elektron pochta manzilini kiriting",
  "kontaktForm.chipsLabel": "Qiziqishlaringiz",
  "kontaktForm.send": "Xabarni yuborish",
  "kontaktForm.sendError": "Yuborishda xatolik yuz berdi",
  "kontaktForm.legal": "Men maxfiylik siyosatiga roziman",
  "kontaktForm.legalLink": "Maxfiylik siyosatini o'qish",
  "kontaktForm.doneTitle": "Rahmat!",
  "kontaktForm.doneTitleSlim": "Xabaringiz yuborildi",
  "kontaktForm.direct": "To'g'ridan-to'g'ri aloqa",
  "kontaktForm.promise": "Biz ma'lumotlaringizni xavfsiz saqlaymiz.",
  "kontaktForm.ccAria": "Nusxa olish",
  "kontaktForm.closeAria": "Yopish",
  "kontaktForm.fabAria": "Aloqa tugmasi",
  "kontaktForm.interests": {
    "1": "Mahsulotlar",
    "2": "Hamkorlik",
    "3": "Texnik yordam",
    "4": "Boshqa"
  },

  // enterprise
  "enterprise.eyebrow": "K-Aqua Enterprise",
  "enterprise.heroTitleEm": "Sanoat standarti",
  "enterprise.telemetry": {
    "title": "Telemetriya va monitoring",
    "desc": "Tizim holati haqida real vaqtda ma'lumot oling."
  },
  "enterprise.layers": {
    "title": "Ko'p qatlamli himoya",
    "desc": "Maksimal xavfsizlik va chidamlilik uchun ilg'or texnologiyalar."
  },
  "enterprise.comply": {
    "title": "Muvofiqlik",
    "desc": "Xalqaro sifat va ekologiya standartlariga to'liq moslik."
  },
  "enterprise.rangeTitle": "Mahsulot assortimenti",
  "enterprise.network": {
    "title": "Global tarmoq",
    "desc": "Dunyodagi eng yirik loyihalar uchun ishonchli ta'minot tarmog'i."
  },

  // referenzenPage
  "referenzenPage.hero": {
    "title": "Loyihalar",
    "desc": "Butun dunyo bo'ylab K-Aqua ishtirok etgan eng muhim inshootlar."
  },
  "referenzenPage.manifesto": {
    "title": "Bizning yondashuvimiz",
    "desc": "Har bir loyiha - mukammallik va ishonchlilik dalili."
  },
  "referenzenPage.metrics": {
    "title": "Raqamlarda",
    "desc": "Bizning yutuqlarimiz va ta'sirimiz haqida ma'lumot."
  },
  "referenzenPage.cta": {
    "title": "Sizning loyihangiz",
    "desc": "Biz bilan bog'laning va loyihangizni birgalikda amalga oshiramiz."
  },
  "referenzenPage.icons": {
    "building": "Bino",
    "water": "Suv",
    "energy": "Energiya"
  },

  // seoExpansion
  "seoExpansion.t1": "Barqarorlik",
  "seoExpansion.p1": "K-Aqua atrof-muhitni muhofaza qilishni o'zining asosiy maqsadlaridan biri deb biladi.",
  "seoExpansion.t2": "Sifat kafolati",
  "seoExpansion.p2": "Har bir mahsulot qat'iy sifat nazoratidan o'tadi.",
  "seoExpansion.t3": "Innovatsiyalar",
  "seoExpansion.p3": "Biz materialshunoslik va quvur tizimlari sohasidagi so'nggi yutuqlarni qo'llaymiz.",
  "seoExpansion.t4": "Texnik yordam",
  "seoExpansion.p4": "Bizning muhandislar jamoasi har doim yordamga tayyor."
};

fs.writeFileSync('missing_uz_translations.json', JSON.stringify(missingTranslations, null, 2));
