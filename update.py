import json

with open('messages/el.json', 'r', encoding='utf-8') as f:
    el = json.load(f)

with open('target_krankenhaus.json', 'r', encoding='utf-8') as f:
    # It starts with "krankenhaus": { ... }, so let's wrap it
    k_content = "{" + f.read() + "}"
    k = json.loads(k_content)
    
el['solutions']['krankenhaus'] = k['krankenhaus']

with open('messages/el.json', 'w', encoding='utf-8') as f:
    json.dump(el, f, ensure_ascii=False, indent=2)
