import json
from fix_update_exact import update_recursive

with open('es-419.json', 'r') as f: es = json.load(f)

# The base academy dict if not exists
if 'academy' not in es:
    es['academy'] = {}

# Load partials
with open('academy_schulungen_es.json', 'r') as f: sch = json.load(f)
with open('academy_zertifizierung_es.json', 'r') as f: zer = json.load(f)
with open('academy_flat_es.json', 'r') as f: flat = json.load(f)

update_recursive(es['academy'], sch)
update_recursive(es['academy'], zer)
update_recursive(es['academy'], flat)

with open('es-419.json', 'w') as f:
    json.dump(es, f, indent=2, ensure_ascii=False)
