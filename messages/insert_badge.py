import json

with open('sw.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

data['markets']['schiffbau']['heroBadge'] = "K Aqua MARITIME"

with open('sw.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

