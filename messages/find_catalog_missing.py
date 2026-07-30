import json

with open('es-419.json') as f:
    es = json.load(f)

with open('de.json') as f:
    de = json.load(f)

count = 0
for k, v in de['catalogx']['items'].items():
    if k not in es['catalogx']['items']:
        print(f"Missing full item: {k}")
        count += len(v) + len(v['faq']) * 2
print(f"Total missing keys in catalogx.items: {count}")
