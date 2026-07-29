import json
with open('messages/de.json') as f:
    de = json.load(f)

for k, v in de['catalogx']['items'].items():
    if 'faq' in v:
        print(f'"{k}": {len(v["faq"])},')
