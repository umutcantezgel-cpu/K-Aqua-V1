import json

with open('de.json') as f:
    de = json.load(f)

def strip_strings(obj):
    if isinstance(obj, dict):
        return {k: strip_strings(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [strip_strings(v) for v in obj]
    else:
        return "TRANSLATE_ME: " + str(obj)

with open('es-419.json') as f:
    es = json.load(f)

for section in ['products', 'solutions', 'academy', 'resources', 'kontaktBlocks']:
    if section not in es:
        es[section] = {}
    
    # We will just merge the stripped German structure into ES where missing
    def merge(target, source):
        for k, v in source.items():
            if k not in target:
                target[k] = strip_strings(v)
            elif isinstance(v, dict):
                merge(target[k], v)
            elif isinstance(v, list) and not target[k]:
                target[k] = strip_strings(v)

    merge(es[section], de[section])

with open('es-419_scaffold.json', 'w') as f:
    json.dump(es, f, indent=2, ensure_ascii=False)
