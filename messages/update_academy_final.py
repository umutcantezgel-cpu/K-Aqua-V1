import json
import sys
from fix_update_exact import update_recursive

with open('es-419.json', 'r') as f: es = json.load(f)
with open('academy_final_es.json', 'r') as f: sm = json.load(f)
update_recursive(es['academy'], sm)
with open('es-419.json', 'w') as f:
    json.dump(es, f, indent=2, ensure_ascii=False)
