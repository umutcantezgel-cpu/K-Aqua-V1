import json

with open('es-419_scaffold.json', 'r') as f:
    es = json.load(f)

with open('scratch_products_part3_es.json', 'r') as f:
    p3 = json.load(f)

products = es['products']
for k, v in p3.items():
    products[k] = v

with open('es-419_scaffold.json', 'w') as f:
    json.dump(es, f, indent=2, ensure_ascii=False)
