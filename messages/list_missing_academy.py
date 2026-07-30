import json

def get_missing(de_node, es_node, current_path=""):
    missing = {}
    if isinstance(de_node, dict):
        es_dict = es_node if isinstance(es_node, dict) else {}
        for k, v in de_node.items():
            path = f"{current_path}.{k}" if current_path else k
            if k not in es_dict:
                missing[k] = v
            else:
                sub_missing = get_missing(v, es_dict[k], path)
                if sub_missing:
                    missing[k] = sub_missing
    elif isinstance(de_node, list):
        es_list = es_node if isinstance(es_node, list) else []
        for i, item in enumerate(de_node):
            path = f"{current_path}[{i}]"
            if i >= len(es_list):
                missing[str(i)] = item
            else:
                sub_missing = get_missing(item, es_list[i], path)
                if sub_missing:
                    missing[str(i)] = sub_missing
    return missing

with open('de.json') as f: de = json.load(f)
with open('es-419.json') as f: es = json.load(f)

m = get_missing(de['academy'], es.get('academy', {}))

with open('academy_missing.json', 'w') as f:
    json.dump(m, f, indent=2, ensure_ascii=False)
