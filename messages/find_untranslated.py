import json

def find_untranslated(de_node, fi_node, path=""):
    untranslated = []
    if isinstance(de_node, dict):
        for k, v in de_node.items():
            untranslated.extend(find_untranslated(v, fi_node[k], path + "." + k))
    elif isinstance(de_node, list):
        for i, v in enumerate(de_node):
            untranslated.extend(find_untranslated(v, fi_node[i], path + f"[{i}]"))
    elif isinstance(de_node, str):
        if de_node == fi_node:
            # Check if it has actual letters to translate
            import re
            if re.search(r'[a-zA-Z]{3,}', de_node) and de_node not in ["info@k-aqua.de", "support@k-aqua.de", "KWT GmbH"]:
                untranslated.append(path)
    return untranslated

with open('de.json', 'r') as f:
    de = json.load(f)
with open('fi.json', 'r') as f:
    fi = json.load(f)

untranslated = find_untranslated(de, fi)
print(f"Found {len(untranslated)} untranslated strings.")
with open('untranslated.txt', 'w') as f:
    for u in untranslated:
        f.write(u + "\n")
