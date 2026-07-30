import json

patch = {
  "titleGrad": "məsuliyyətli (dürüst)",
  "benefits": [
    {
      "t": "Ekoloji təmiz (Çevre dostu)",
      "d": "Polipropilen əvvəllər faydasız şəkildə yandırılan qazlardan yaranır və beləliklə havanın çirklənməsini (kəskin şəkildə) azaldır. İstehsal (prosesi) qapalı soyutma dövrəsindəki (sistemindəki) sudan istifadə edir və çayları, dərələri (bulaqları) və gölləri qoruyur."
    },
    {
      "t": "Təkrar emal edilə bilən (Recycelbar)",
      "d": "PP \"5\" təkrar emal kodunu daşıyır və növünə görə çeşidlənə (ayrıla) bilər. PP (təkrar) materialına yüksək tələbat olduğu halda, biz bütün istehsalat tullantılarını (qalıqları) təkrar emal edirik."
    },
    {
      "t": "Üstün",
      "d": "Texniki bir plastik (polimer) kimi, PP həlledicilərə, qələvilərə və turşulara qarşı qeyri-adi dərəcədə davamlıdır və enjeksiyon (kalıplama/Spritzguss) prosesində aşağı xərclərlə və yüksək həcmlərdə (miqdarlarda) mürəkkəb həndəsələr (formalar) yaradır."
    },
    {
      "t": "Uzunömürlü (Davamlı)",
      "d": "PP məhsulları müqayisə oluna bilən materiallardan (analoqlardan) çox daha uzunömürlüdür (daha uzun yaşayır): baxımı asan, aşınmaya davamlı və yaşlanmağa (qocalmağa) və ekstremal temperaturlara qarşı rezistentdir (davamlıdır)."
    }
  ],
  "nextEyebrow": "Növbəti Addım",
  "nextTitle": "Materialdan Sistemə.",
  "nextLead": "Bu material (xammal) üstünlüklərinin K Aqua məhsul xəttində (proqramında) necə konkretləşdiyini (öz əksini tapdığını) görün.",
  "nextCta": "Məhsul Qrupuna (Proqramına) Keçid"
}

with open("az.json", "r") as f:
    az = json.load(f)

for k, v in patch.items():
    az["solutions"][k] = v

with open("az.json", "w") as f:
    json.dump(az, f, indent=2, ensure_ascii=False)
