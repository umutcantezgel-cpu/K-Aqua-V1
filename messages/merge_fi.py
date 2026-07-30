import json

def merge_dict(de_node, fi_node):
    if isinstance(de_node, dict) and isinstance(fi_node, dict):
        result = {}
        for k, v in de_node.items():
            if k in fi_node:
                result[k] = merge_dict(v, fi_node[k])
            else:
                result[k] = v
        return result
    elif isinstance(de_node, list) and isinstance(fi_node, list):
        result = []
        for i in range(len(de_node)):
            if i < len(fi_node):
                result.append(merge_dict(de_node[i], fi_node[i]))
            else:
                result.append(de_node[i])
        return result
    else:
        # If the fi_node is a string, and it differs from de_node, it's translated!
        # Even if it's the same, we just use fi_node.
        # But wait, we only use fi_node if it's of the same type!
        if type(de_node) == type(fi_node):
            return fi_node
        return de_node

with open('de.json', 'r') as f:
    de = json.load(f)
with open('fi.json', 'r') as f:
    fi = json.load(f)

merged = merge_dict(de, fi)

with open('fi.json', 'w') as f:
    json.dump(merged, f, indent=2, ensure_ascii=False)

print("Merged successfully!")
