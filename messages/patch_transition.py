import json

patch = {
  "intro": {
    "eyebrow": "Çağırış",
    "title": "Dünyaların toqquşduğu yer.",
    "lead": "Sərt metal boru kəməri sistemlərindən müasir termoplastik şəbəkələrə keçid hər bir bina və sənaye qurğusunun ən həssas nöqtəsidir (Axilles dabanı). Burada maksimum termal və mexaniki kəsmə qüvvələri (shear forces) təsir göstərir."
  },
  "sticky_items": [
    {
      "title": "Metal və Polimerin Simbiozu",
      "desc": "Keçid fitinqlərimiz sinkləşməyə davamlı CW617N misinin amansız mexaniki möhkəmliyini PPRCT-nin kimyəvi inertliyi ilə birləşdirir. Bu material birləşməsi sadəcə presləmə yolu ilə deyil, ayrılmaz bir molekulyar kilidlənmə yaradan termomexaniki inyeksiya qəlibləmə (spritzguss) prosesi vasitəsilə həyata keçirilir."
    },
    {
      "title": "Ekstremal Torsiyon və Fırlanma anı (Tork)",
      "desc": "Standart fitinqlərdə kritik uğursuzluq (versagen) meyarı quraşdırma zamanı fırlanma anının (tork) həddindən artıq yüklənməsidir. K Aqua keçidləri plastik təbəqədə patentləşdirilmiş altıbucaqlı anker profilini birləşdirir. Nəticə: Sərhəd təbəqəsinin delaminasiyası olmadan 300 Nm-dən çox zəmanətli torsiyon müqaviməti."
    },
    {
      "title": "Balanslaşdırılmış Termal Genişlənmə Əmsalları",
      "desc": "Metallar və plastiklər temperatur dəyişiklikləri zamanı (Δα) fərqli şəkildə genişlənir. Mis taxmadakı (insert) dəqiq hesablanmış mikro genişləndirmə birləşmələri sayəsində, fitinqlərimiz -20°C-dən +95°C-yə qədər ekstremal şokları millisaniyələr ərzində tamamilə sızdırmaz şəkildə kompensasiya edir."
    },
    {
      "title": "Sıfır Tolerans Keyfiyyət Nəzarəti",
      "desc": "Hər bir hibrid komponent tam avtomatlaşdırılmış helium sızma testindən və optik 3D ölçməsindən keçir. 10^-5 mbar·l/s həddi (limiti) hətta bir az da olsa təmas edərsə, sistemimiz o hissəni qəti şəkildə xaric edir. Alman mühəndisliyi heç bir güzəştə getmir."
    }
  ],
  "bento": {
    "eyebrow": "Spesifikasiyalar",
    "title": "Performansın Memarlığı.",
    "lead": "On minlərlə birləşməyə malik meqalayihələr planlaşdırdığınız zaman, ən vacib ROI statistik etibarlılıqdır. K Aqua bunun üçün sizə fiziki zəmanət verir.",
    "items": [
      {
        "title": "DZR Brass Core (Mis Nüvə)",
        "desc": "CW617N keyfiyyət sinfində sinkləşməyə davamlı mis (DIN EN 12164 standartına uyğun), aqressiv su keyfiyyətlərində seçici korroziya riskini aradan qaldırır."
      },
      {
        "title": "Fırlanma Əleyhinə Dizayn (Anti-Rotation)",
        "desc": "Poliqonal alt kəsiklər plastik hissəni gərginləşdirmədən ekstremal sıxma anlarını udan həndəsi bir kilid yaradır."
      },
      {
        "title": "Dərin İzlənmiş Yivlər",
        "desc": "Mükəmməl sızdırmazlıq üçün ±0.01mm tolerantlıqla maşınla kəsilmiş konusvari və silindrik ISO 7/1 və ya ISO 228 yivləri (dişləri)."
      },
      {
        "title": "PPRCT Matrisi",
        "desc": "Bizim Polypropylene Random Copolimerin yüksək kristal strukturu yüksək temperaturlarda üstün uzunmüddətli sürünmə kəsilməsi (creep rupture) müqaviməti təmin edir."
      }
    ]
  }
}

with open("az.json", "r") as f:
    az = json.load(f)

az["products"]["transitionFittings"]["intro"] = patch["intro"]
az["products"]["transitionFittings"]["sticky"]["items"] = patch["sticky_items"]
az["products"]["transitionFittings"]["bento"] = patch["bento"]

with open("az.json", "w") as f:
    json.dump(az, f, indent=2, ensure_ascii=False)
