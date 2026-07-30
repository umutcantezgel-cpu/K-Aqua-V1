import json
import glob

with open('scratch_catalogx_items_de.json') as f:
    de_data = json.load(f)

translated = set()
for file in glob.glob('scratch_catalogx_items*_es.json'):
    try:
        with open(file) as f:
            content = "{" + f.read() + "}"
            content = content.replace("},\n}", "}\n}")
            # This might not be valid JSON, let's just parse the keys using regex
    except:
        pass

import re
for file in glob.glob('scratch_catalogx_items*_es.json'):
    with open(file) as f:
        matches = re.findall(r'^    "([^"]+)": \{', f.read(), re.MULTILINE)
        translated.update(matches)

missing = [k for k in de_data.keys() if k not in translated]
print(f"Missing: {len(missing)}")
for i in range(0, min(8, len(missing))):
    k = missing[i]
    print(f'    "{k}": {json.dumps(de_data[k], indent=2, ensure_ascii=False)},')
