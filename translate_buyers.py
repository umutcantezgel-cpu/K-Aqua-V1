import json
with open('messages/de.json', 'r') as f:
    de = json.load(f)
print(json.dumps(de['buyers'], indent=2, ensure_ascii=False))
