import json

with open('sw.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

with open('industrie_sw.json', 'r', encoding='utf-8') as f:
    industrie_data = json.load(f)

data['markets']['industrie'] = industrie_data

with open('sw.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

