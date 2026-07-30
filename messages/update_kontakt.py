import json
from fix_update_exact import update_recursive

with open('es-419.json', 'r') as f: es = json.load(f)

if 'kontaktBlocks' not in es:
    es['kontaktBlocks'] = {}

with open('kontakt_blocks_es.json', 'r') as f: kb = json.load(f)
update_recursive(es['kontaktBlocks'], kb['kontaktBlocks'])

with open('es-419.json', 'w') as f:
    json.dump(es, f, indent=2, ensure_ascii=False)
