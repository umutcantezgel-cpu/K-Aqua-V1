import json
from fix_update_exact import update_recursive

with open('es-419.json', 'r') as f: es = json.load(f)

if 'resources' not in es:
    es['resources'] = {}

with open('resources_support_es.json', 'r') as f: support = json.load(f)
with open('resources_downloads_es.json', 'r') as f: downloads = json.load(f)
with open('resources_bim_es.json', 'r') as f: bim = json.load(f)
with open('resources_common_ausschreibung_es.json', 'r') as f: common = json.load(f)

update_recursive(es['resources'], support)
update_recursive(es['resources'], downloads)
update_recursive(es['resources'], bim)
update_recursive(es['resources'], common)

with open('es-419.json', 'w') as f:
    json.dump(es, f, indent=2, ensure_ascii=False)
