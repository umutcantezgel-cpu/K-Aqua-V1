import json

with open('scratch_catalogx_es_base.json') as f:
    # Need to add {} around it to parse
    base_text = '{' + f.read() + '}'
    base_data = json.loads(base_text)

with open('test_items_fixed.json') as f:
    items_data = json.load(f)

base_data['items'] = items_data['items']

with open('scratch_catalogx_final.json', 'w') as f:
    f.write('  "catalogx": ' + json.dumps(base_data, indent=2, ensure_ascii=False) + ',')
