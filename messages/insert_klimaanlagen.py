import json

with open('sw.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

with open('klimaanlagen_sw.json', 'r', encoding='utf-8') as f:
    klima_data = json.load(f)

data['markets']['klimaanlagen'] = klima_data

with open('sw.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

