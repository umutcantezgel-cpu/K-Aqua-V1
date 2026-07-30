import json
import re

def is_english(s):
    if not isinstance(s, str): return False
    # If the string contains any Urdu character, it is translated.
    # Urdu block: 0600-06FF
    has_urdu = re.search(r'[\u0600-\u06ff]', s)
    if has_urdu: return False
    # If it contains more than 3 alphabetical words, it might be english
    words = re.findall(r'[A-Za-z]{3,}', s)
    return len(words) > 1

with open('ur.json') as f:
    ur_data = json.load(f)

sections = ['seoExpansion', 'kontaktForm', 'seoArticle', 'customerReviews', 'referenzenPage', 'productNames', 'markets', 'kontaktBlocks', 'resources']

def scan(node, path):
    res = []
    if isinstance(node, dict):
        for k, v in node.items():
            res.extend(scan(v, f'{path}.{k}' if path else k))
    elif isinstance(node, list):
        for i, v in enumerate(node):
            res.extend(scan(v, f'{path}[{i}]'))
    elif isinstance(node, str):
        if is_english(node):
            res.append((path, node))
    return res

for sec in sections:
    eng = scan(ur_data[sec], sec)
    if eng:
        print(f"\nSection {sec}:")
        for path, val in eng:
            if 'productNames' not in path and 'author' not in path.lower() and 'tab' not in path.lower() and 'name' not in path.lower() and 'id' not in path.lower() and 'href' not in path.lower():
                print(f"  {path} = {val}")
