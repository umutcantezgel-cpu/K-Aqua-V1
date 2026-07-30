import json
with open('es-419_scaffold.json') as f:
    es = json.load(f)

for k, v in es['products'].items():
    if isinstance(v, str) and v.startswith('TRANSLATE_ME'):
        print(f"Missing {k}: {v}")
    elif isinstance(v, dict):
        for k2, v2 in v.items():
            if isinstance(v2, str) and v2.startswith('TRANSLATE_ME'):
                print(f"Missing {k}.{k2}")
            elif isinstance(v2, list):
                for i, v3 in enumerate(v2):
                    if isinstance(v3, str) and v3.startswith('TRANSLATE_ME'):
                        print(f"Missing {k}.{k2}[{i}]")
