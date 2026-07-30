import json

with open('sw.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

with open('schiffbau_sw.json', 'r', encoding='utf-8') as f:
    schiffbau_data = json.load(f)

data['markets']['schiffbau'] = schiffbau_data

with open('sw.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

