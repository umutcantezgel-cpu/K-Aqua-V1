import json

with open('sw.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

with open('trinkwasser_sw.json', 'r', encoding='utf-8') as f:
    trink_data = json.load(f)

data['markets']['trinkwasser'] = trink_data

with open('sw.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

