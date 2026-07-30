import json
def get_paths(obj, prefix=""):
    paths = []
    if isinstance(obj, dict):
        for k, v in obj.items():
            paths.extend(get_paths(v, prefix + k + "."))
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            paths.extend(get_paths(v, prefix + str(i) + "."))
    else:
        paths.append(prefix[:-1])
    return paths

de = json.load(open('de.json'))['markets']
lt = json.load(open('lt.json'))['markets']

de_paths = set(get_paths(de))
lt_paths = set(get_paths(lt))
missing = de_paths - lt_paths
for p in sorted(list(missing)):
    print(p)
