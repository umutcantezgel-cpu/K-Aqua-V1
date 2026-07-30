import json

with open('es-419.json', 'r') as f: es = json.load(f)
with open('solutions_p1.json', 'r') as f: s1 = json.load(f)
with open('solutions_p2.json', 'r') as f: s2 = json.load(f)

s = {**s1, **s2}
es['solutions'] = s

with open('es-419.json', 'w') as f:
    json.dump(es, f, indent=2, ensure_ascii=False)
