import json

extendedMarketText = "Bu bölgədəki şəhər infrastrukturu boru kəməri sistemlərinin uzunömürlülüyü və etibarlılığı üçün xüsusi tələblər qoyur. Ekstremal iqlim şərtləri və su gigiyenasına olan yüksək tələblərlə yanaşı, K-Aqua-nın PP-R və PPRCT həlləri həlledici üstünlük təmin edir. Ənənəvi metal borular tez-tez korroziyadan və mineral çöküntülərdən əziyyət çəkir ki, bu da əhəmiyyətli təzyiq itkisinə və sızmalar nəticəsində su israfına səbəb olur. K-Aqua sistemləri isə korroziyaya uğramayan material quruluşu və homogen polifüzyon qaynağı sayəsində 50 ildən çox müddətə tamamilə sızdırmaz, texniki qulluq tələb etməyən quraşdırmaya zəmanət verir. Bundan əlavə, hamar daxili səth optimal hidravlik axın xüsusiyyətlərini təmin edir və dövriyyə nasoslarının enerji ehtiyacını kəskin şəkildə azaldır. Bu amillər K-Aqua-nı şəhər sektorunda irimiqyaslı otel kompleksləri, xəstəxanalar, sənaye soyutma sistemləri və tələbkar yaşayış tikintisi layihələri üçün üstünlük verilən seçim halına gətirir."

cities = ["amman", "kairo", "istanbul", "singapur", "kualalumpur", "mumbai", "kapstadt", "nairobi"]

with open("az.json", "r") as f:
    az = json.load(f)

for city in cities:
    az["geoContent"][city]["extendedMarketText"] = extendedMarketText

with open("az.json", "w") as f:
    json.dump(az, f, indent=2, ensure_ascii=False)
