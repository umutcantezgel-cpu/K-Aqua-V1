import json

with open('es-419_scaffold.json') as f:
    es = json.load(f)

res = set()
def extract_strings(obj):
    if isinstance(obj, dict):
        for k, v in obj.items():
            extract_strings(v)
    elif isinstance(obj, list):
        for v in obj:
            extract_strings(v)
    elif isinstance(obj, str) and obj.startswith('TRANSLATE_ME: '):
        res.add(obj[14:])

for sec in ['products', 'solutions', 'academy', 'resources', 'kontaktBlocks']:
    extract_strings(es[sec])

import sys
with open('all_german_strings.json', 'w') as f:
    json.dump(list(res), f, indent=2, ensure_ascii=False)
print(f"Unique strings: {len(res)}")
