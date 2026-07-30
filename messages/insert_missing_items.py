import json

with open('es-419.json', 'r') as f:
    es = json.load(f)

with open('scratch_catalogx_items_missing_es.json', 'r') as f:
    missing = json.load(f)

for k, v in missing.items():
    es['catalogx']['items'][k] = v

with open('es-419.json', 'w') as f:
    json.dump(es, f, indent=2, ensure_ascii=False)
