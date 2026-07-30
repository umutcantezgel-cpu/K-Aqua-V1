import json

patch = {
"academy.schulungen.spec.items": [
  {
    "title": "Beynəlxalq Qüvvədəolma",
    "text": "Dünyanın aparıcı tikinti və tənzimləyici orqanları tərəfindən tanınmışdır."
  },
  {
    "title": "Audit Şəffaflığı",
    "text": "Hər bir qaynaq prosesinin tam (qüsursuz), rəqəmsal sənədləşdirilməsi."
  },
  {
    "title": "Ömürlük Avtoritet",
    "text": "Bir dəfə əldə edildikdən sonra mühəndisi elit (imtiyazlı) bir kastanın üzvü kimi fərqləndirir."
  }
],
"academy.zertifizierung.bento.items": [
  {
    "title": "Ekstremal Təzyiqə Davamlılıq",
    "desc": "PN20/PN25-ə qədər davamlı yüklənmələr üçün sınaqdan keçirilmişdir. Bizim partlama (burst pressure) testlərimiz standartlardan çox kənarda olan ehtiyatları (limitləri) sübut edir. Boru qırılmaları (partlamaları) artıq keçmişdə qaldı."
  },
  {
    "title": "Termal Üstünlük",
    "desc": "-20°C-dən +95°C-yə qədər davamlı olaraq dayanıqlıdır. Hətta ekstremal termal şoklarda belə (temperatur sıçrayışlarında) material yorğunluğu yoxdur, struktur zəifləməsi olmur."
  },
  {
    "title": "Mütləq Gigiyena",
    "desc": "Korroziya yoxdur. Ərp (çöküntü) yığılması yoxdur. Qida üçün təhlükəsizdir, toksikoloji cəhətdən zərərsizdir və Legionella (bakteriya) artımına davamlıdır."
  },
  {
    "title": "Yanğından Mühafizə (B1/B2)",
    "desc": "DIN 4102 standartına görə təsnif edilmişdir. Kritik bina infrastrukturlarında ən yüksək təhlükəsizlik üçün çətin alışan və minimum tüstü emissiyasına malikdir."
  },
  {
    "title": "Həyat Dövrü (Life-cycle) Zəmanəti",
    "desc": "Ən sərt ISO standartlarına uyğun olaraq 50 illik müəyyən edilmiş xidmət müddəti (ömrü). Lakin memarlıq reallığında bütün nəsilləri üstələmək (daha uzun yaşamaq) üçün inşa edilmişdir."
  }
],
"academy.zertifizierung.lab.items": [
  {
    "title": "MFR (Melt Flow Rate - Ərimə Axın Sürəti)",
    "desc": "Ekstruziya və sonrakı (tikinti sahəsindəki) qaynaq zamanı dəqiq özlülüyü (viscosity) təmin etmək üçün ərimə axın sürətinə nəzarət (idarə)."
  },
  {
    "title": "OIT (Oxidation Induction Time)",
    "desc": "Qocalma (köhnəlmə) müqavimətini təyin etmək üçün termal (istilik) analizi. Stabilizatorlarımızın plastiki onilliklər boyu deqradasiyadan (aşınmadan) qoruduğunun sübutu."
  },
  {
    "title": "Sürünmə kəsilməsi (Daxili Təzyiq) Sınağı",
    "desc": "Boru nümunələri (ölçüləri) xüsusi su hamamlarında 95°C-də minlərlə saat ərzində ekstremal təzyiq altında saxlanılır. Çat (Riss) olmadan. Qırılma (Bruch) olmadan."
  }
],
"academy.zertifizierung.timeline.items": [
  {
    "year": "1990",
    "title": "Normun Doğuluşu (Standartın Yaranması)",
    "text": "Plastik boru ekstruziyası üzrə qabaqcıllar (pionerlər) olaraq, o dövrün sənaye tələblərini xeyli üstələyən (aşaraq) daxili sınaq (test) prosedurlarını vaxtından əvvəl (erkən) həyata keçirdik. Güzəştsiz bir keyfiyyət mədəniyyətinin təməl daşı (əsası)."
  },
  {
    "year": "1995",
    "title": "ISO 9001 İnteqrasiyası",
    "text": "Bizim keyfiyyət idarəetmə sistemlərimizin ISO 9001-ə uyğun olaraq tam (ətraflı) auditi (sınağı). Hər bir hərəkət (prosedur), hər bir xammal partiyası, hər bir maşın (cihaz) tənzimlənməsi o andan etibarən sistemli şəkildə sənədləşdirilir və tam izlənilə bilən hala gətirilir."
  },
  {
    "year": "2005",
    "title": "DVGW & SKZ Sınağı",
    "text": "DVGW və SKZ tərəfindən sınaqdan keçirilmiş (təsdiqlənmiş) istehsalçıların eksklüziv (seçilmiş) qrupuna qəbul edilmə. İçməli su (su xəttləri) tətbiqlərində, ən sərt şərtlər altında (mühitdə) mütləq gigiyena, ekstremal təzyiqə davamlılıq (müqavimət) və misilsiz uzunömürlülük üçün rəsmi təsdiq (möhür)."
  },
  {
    "year": "2015",
    "title": "Qlobal Normalar (WRAS, KTW)",
    "text": "Beynəlxalq bazarlar üçün sertifikatların (təsdiqlərin) genişləndirilməsi (çoxalması). Ciddi KTW təlimatlarına (UBA) və Britaniya WRAS spesifikasiyalarına uyğunluq (tələblərinin yerinə yetirilməsi). K Aqua beynəlxalq meqalayihələr üçün qlobal standart halına gəlir (çevrilir)."
  },
  {
    "year": "2024",
    "title": "Next-Gen (Yeni Nəsil) Keyfiyyət Analitikası",
    "text": "Özümüzün (daxili) yüksək dəqiqlikli laboratoriyamızda yüksək səviyyədə (tam) avtomatlaşdırılmış OIT (Oksidləşdirici İnduksiya Vaxtı) və MFR (Ərimə Axın Sürəti) sınaqlarının (testlərinin) tətbiqi. 100% \"Sıfır Xəta\" nisbəti üçün ekstruziya zamanı süni intellektə (AI) əsaslanan xəta (qüsur) analizi."
  }
]
}

with open("az.json", "r") as f:
    az = json.load(f)

for k, v in patch.items():
    parts = k.split(".")
    curr = az
    for p in parts[:-1]:
        curr = curr[p]
    curr[parts[-1]] = v

with open("az.json", "w") as f:
    json.dump(az, f, indent=2, ensure_ascii=False)
