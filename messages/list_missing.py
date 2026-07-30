import json
def extract_paths(d, e, path, res):
    if isinstance(d, dict):
        if not isinstance(e, dict): e = {}
        for k, v in d.items():
            if k not in e: res.append(path + "." + k)
            else: extract_paths(v, e[k], path + "." + k, res)
    elif isinstance(d, list):
        if not isinstance(e, list): e = []
        for i, v in enumerate(d):
            if i >= len(e): res.append(path + f"[{i}]")
            else: extract_paths(v, e[i], path + f"[{i}]", res)
with open('de.json') as f: de = json.load(f)
with open('es-419.json') as f: es = json.load(f)
res = []
extract_paths(de['solutions'], es.get('solutions',{}), 'solutions', res)
for r in res: print(r)
