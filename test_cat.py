import json

with open('messages/de.json') as f:
    de = json.load(f)

# Keep only catalogx items text
items = de['catalogx']['items']
char_count = sum(len(items[k].get('seo_p1', '')) + len(items[k].get('seo_p2', '')) + len(items[k].get('seo_p3', '')) for k in items)
print("Characters in catalogx.items SEO texts:", char_count)
