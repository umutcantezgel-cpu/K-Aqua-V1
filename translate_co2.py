import json
with open('messages/de.json', 'r') as f:
    de = json.load(f)
print(json.dumps(de['co2'], indent=2, ensure_ascii=False))
