import json

with open('es-419.json', 'r') as f:
    es = json.load(f)

with open('es-419_scaffold.json', 'r') as f:
    scaffold = json.load(f)

es['products'] = scaffold['products']

with open('es-419.json', 'w') as f:
    json.dump(es, f, indent=2, ensure_ascii=False)
