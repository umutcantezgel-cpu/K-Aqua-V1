import json

patch = {
"resources.downloads.sticky.items": [
  {
    "title": "Spesifikasiyalarımızın Anatomiyası (Quruluşu)",
    "desc": "K Aqua məlumat vərəqi sadəcə (adi) kağız deyil. O, minlərlə saatlıq çətin (ağır) yük sınaqlarının (testlərinin) distillə edilmiş (saflaşdırılmış) nəticəsidir. Biz mikrometr diapazonunda (dəqiqliyində) tolerantlıqları (güzəştləri) sənədləşdiririk, çünki meqalayihələrdə bir millimetrlik kənaraçıxma (sapma) fəlakətli nəticələrə səbəb ola bilər."
  },
  {
    "title": "Materialşünaslıq: PPRCT Rəqəmlərdə",
    "desc": "Yükləmələrimiz dərin molekulyar təhlillər (analizlər) təqdim edir. Siz PPRCT materialımızın (xam maddəmizin) kristal strukturunun (quruluşunun) 90°C davamlı (davam edən) yüklənmədə (təzyiqdə) 50 il ərzində nə üçün stabil qaldığını (qorunduğunu) dəqiq öyrənəcəksiniz. Struktur mühəndislərinə və layihələndiricilərə (memarlara) mütləq (tam) təhlükəsizlik verən məlumatlar."
  },
  {
    "title": "Hidravlik Dəqiqlik",
    "desc": "Axın sürətləri, təzyiq itkisi cədvəlləri, kavitasiya limitləri (hədləri). Sənədlərimiz praktikada dərhal tətbiq (istifadə) edilməyə hazırlanmış akademik səviyyədə maye (axın) mexanikasını təqdim edir. Suyun ekstremal qravitasiyaya (cazibə qüvvəsinə) qarşı nəql edilməli (daşınmalı) olduğu göydələnlər (yüksək mərtəbəli binalar) üçün planlaşdırılmışdır."
  },
  {
    "title": "Sınaqdan keçirilmişdir. Bütün dünyada.",
    "desc": "SKZ, DVGW, WRAS, KIWA: bizim yükləmə bölməmiz (hissəmiz) qlobal (dünya səviyyəsində) keyfiyyət möhürlərinin kimidir (seyfidir). Hər bir sertifikat kompromissiz \"Sıfır Xəta\" (sıfır dözümlülük) siyasətimizin (mədəniyyətimizin) yazılı sübutudur."
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
