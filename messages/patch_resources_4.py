import json

patch = {
"resources.ausschreibungstexte.meta": {
  "title": "PP-R Boru Sistemləri üçün Rəsmi Tender Mətnləri",
  "desc": "Ətraflı K-Aqua tender (şərt) mətnlərini yükləyin. Qlobal meqalayihələriniz üçün Alman mühəndisliyi (German Engineering) ilə kompromissiz təhlükəsizlik təklif edirik (təmin edirik)."
}
}

with open("az.json", "r") as f:
    az = json.load(f)

# Delete the meta keys first to reset it
if "meta" in az["resources"]["ausschreibungstexte"]:
    del az["resources"]["ausschreibungstexte"]["meta"]

for k, v in patch.items():
    parts = k.split(".")
    curr = az
    for p in parts[:-1]:
        curr = curr[p]
    curr[parts[-1]] = v

with open("az.json", "w") as f:
    json.dump(az, f, indent=2, ensure_ascii=False)
