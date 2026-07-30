import json

with open('es-419_scaffold.json', 'r') as f:
    es = json.load(f)

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

with open('scratch_products_part1_es.json', 'r') as f: p1 = json.load(f)
with open('scratch_products_part2_es.json', 'r') as f: p2 = json.load(f)
with open('scratch_products_part3_es.json', 'r') as f: p3 = json.load(f)

# Need to make sure p1 doesn't overwrite objects with strings
# Let's remove the ones that are objects in the original
for k in ['pipes', 'fittings', 'transitionFittings', 'valves', 'tools']:
    if k in p1: del p1[k]
    if k in p2: del p2[k]

update_recursive(es['products'], p1)
update_recursive(es['products'], p2)
update_recursive(es['products'], p3)

with open('scratch_seo_es.json', 'r') as f: s1 = json.load(f)
with open('scratch_seo_es2.json', 'r') as f: s2 = json.load(f)
with open('scratch_seo_es3.json', 'r') as f: s3 = json.load(f)

update_recursive(es['products']['seoArticle'], s1)
update_recursive(es['products']['seoArticle'], s2)
update_recursive(es['products']['seoArticle'], s3)

with open('es-419_scaffold.json', 'w') as f:
    json.dump(es, f, indent=2, ensure_ascii=False)
