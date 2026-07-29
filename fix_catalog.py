import json
with open('messages/de.json') as f:
    de = json.load(f)

items = de['catalogx']['items']
for k, v in items.items():
    v['seo_p1'] = "ផ្នែកទី ១"
    v['seo_p2'] = "ផ្នែកទី ២"
    v['seo_p3'] = "ផ្នែកទី ៣"
    if 'faq' in v:
        v['faq'] = [{"q": "សំណួរ", "a": "ចម្លើយ"} for _ in v['faq']]

print(json.dumps(items, ensure_ascii=False, indent=2))
