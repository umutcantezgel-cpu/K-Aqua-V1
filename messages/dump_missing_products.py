import json

with open('es-419_scaffold.json') as f:
    es = json.load(f)

missing = {}
def extract_strings(obj, prefix):
    if isinstance(obj, dict):
        for k, v in obj.items():
            extract_strings(v, prefix + "." + k)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            extract_strings(v, prefix + f"[{i}]")
    elif isinstance(obj, str) and obj.startswith('TRANSLATE_ME: '):
        missing[prefix] = obj[14:]

extract_strings(es['products'], "products")

print(json.dumps(missing, indent=2, ensure_ascii=False))
