import json
def update_recursive(d, u):
    for k, v in u.items():
        if isinstance(v, dict):
            d[k] = update_recursive(d.get(k, {}), v)
        elif isinstance(v, list) and isinstance(d.get(k), list):
            for i, item in enumerate(v):
                if isinstance(item, dict) and len(d[k]) > i and isinstance(d[k][i], dict):
                    d[k][i] = update_recursive(d[k][i], item)
                elif len(d[k]) > i:
                    d[k][i] = item
                else:
                    d[k].append(item)
        else:
            d[k] = v
    return d

with open('es-419.json', 'r') as f: es = json.load(f)
with open('solutions_missing_es.json', 'r') as f: sm = json.load(f)
update_recursive(es['solutions'], sm)
with open('es-419.json', 'w') as f:
    json.dump(es, f, indent=2, ensure_ascii=False)
