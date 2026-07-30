import json

with open('de.json') as f:
    de = json.load(f)

with open('es-419.json') as f:
    es = json.load(f)

def find_missing(d_obj, e_obj, path):
    missing = []
    if isinstance(d_obj, dict):
        for k, v in d_obj.items():
            if k not in e_obj:
                missing.append(f"{path}.{k}")
            else:
                missing.extend(find_missing(v, e_obj[k], f"{path}.{k}"))
    elif isinstance(d_obj, list):
        if not isinstance(e_obj, list):
            missing.append(path)
        else:
            for i, v in enumerate(d_obj):
                if i >= len(e_obj):
                    missing.append(f"{path}[{i}]")
                else:
                    missing.extend(find_missing(v, e_obj[i], f"{path}[{i}]"))
    return missing

miss = find_missing(de['products'], es['products'], 'products')
print(f"Missing keys: {len(miss)}")
for m in miss[:20]:
    print(m)
