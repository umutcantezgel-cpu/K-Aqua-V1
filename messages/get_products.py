import json

with open('es-419_scaffold.json') as f:
    es = json.load(f)

def extract_strings(obj, path, res):
    if isinstance(obj, dict):
        for k, v in obj.items():
            extract_strings(v, path + [k], res)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            extract_strings(v, path + [str(i)], res)
    elif isinstance(obj, str) and obj.startswith('TRANSLATE_ME: '):
        res.append((path, obj[14:]))

res = []
extract_strings(es['products'], ['products'], res)
with open('products_strings.json', 'w') as f:
    json.dump(res, f, indent=2, ensure_ascii=False)
print(f"Products strings: {len(res)}")
