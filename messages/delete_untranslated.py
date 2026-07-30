import json

def delete_untranslated(de_node, fi_node):
    if isinstance(de_node, dict) and isinstance(fi_node, dict):
        keys_to_delete = []
        for k, v in fi_node.items():
            if k in de_node:
                delete_untranslated(de_node[k], v)
                # If v is empty dict or list after deletion, maybe we shouldn't delete it unless it's entirely missing?
                # Actually, test_keys_detailed.js checks for leaf nodes.
                if de_node[k] == v:
                    import re
                    if isinstance(v, str) and re.search(r'[a-zA-Z]{3,}', v) and v not in ["info@k-aqua.de", "support@k-aqua.de", "KWT GmbH"]:
                        keys_to_delete.append(k)
        for k in keys_to_delete:
            del fi_node[k]
    elif isinstance(de_node, list) and isinstance(fi_node, list):
        # We can't easily delete items from a list without shifting indices, which would break the structure.
        # But wait, if we replace the list item with None or delete it?
        # test_keys_detailed.js expects the list length to match!
        # If we just leave the list item as German, test_keys_detailed won't report it missing if the array length matches.
        pass

with open('de.json', 'r') as f:
    de = json.load(f)
with open('fi.json', 'r') as f:
    fi = json.load(f)

delete_untranslated(de, fi)

with open('fi.json', 'w') as f:
    json.dump(fi, f, indent=2, ensure_ascii=False)

