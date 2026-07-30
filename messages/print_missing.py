import json

def get_missing(de_node, fi_node, path=""):
    missing = []
    if isinstance(de_node, dict):
        if not isinstance(fi_node, dict):
            return [path]
        for k, v in de_node.items():
            missing.extend(get_missing(v, fi_node.get(k, None), path + "." + k if path else k))
    elif isinstance(de_node, list):
        if not isinstance(fi_node, list):
            return [path]
        for i in range(len(de_node)):
            if i < len(fi_node):
                missing.extend(get_missing(de_node[i], fi_node[i], path + f"[{i}]"))
            else:
                missing.append(path + f"[{i}]")
    else:
        if fi_node is None:
            missing.append(path)
    return missing

with open('de.json', 'r') as f:
    de = json.load(f)
with open('fi.json', 'r') as f:
    fi = json.load(f)

missing = get_missing(de, fi)
for m in missing:
    if m.startswith('about.'):
        print(m)
