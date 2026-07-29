import json
import time
from googletrans import Translator

def translate_obj(obj, translator):
    if isinstance(obj, dict):
        new_dict = {}
        for k, v in obj.items():
            new_dict[k] = translate_obj(v, translator)
        return new_dict
    elif isinstance(obj, list):
        return [translate_obj(item, translator) for item in obj]
    elif isinstance(obj, str):
        if not obj.strip():
            return obj
        try:
            return translator.translate(obj, src='de', dest='el').text
        except Exception as e:
            print("Failed to translate:", obj[:30], e)
            return obj
    else:
        return obj

translator = Translator()

with open('messages/de.json') as f:
    de = json.load(f)

with open('messages/el.json') as f:
    el = json.load(f)

# The missing keys in el are:
# products.range (list of dicts)
# products.tableRows (list of strings/lists)
# products.fittings.timeline
# products.pipes.timeline
# resources.support.timeline
# resources.downloads.timeline
# resources.downloads.files
# resources.bim.timeline
# resources.ausschreibungstexte.timeline
# catalogx
# We should fully copy these from 'de' and translate them.

def replace_and_translate(path):
    keys = path.split('.')
    de_curr = de
    for key in keys:
        de_curr = de_curr[key]
    
    print(f"Translating {path} ...")
    translated = translate_obj(de_curr, translator)
    
    el_curr = el
    for key in keys[:-1]:
        el_curr = el_curr[key]
    el_curr[keys[-1]] = translated

paths = [
    "products.range",
    "products.tableRows",
    "products.fittings.timeline",
    "products.pipes.timeline",
    "resources.support.timeline",
    "resources.downloads.timeline",
    "resources.downloads.files",
    "resources.bim.timeline",
    "resources.ausschreibungstexte.timeline",
    "catalogx"
]

for path in paths:
    replace_and_translate(path)

with open('messages/el.json', 'w') as f:
    json.dump(el, f, indent=2, ensure_ascii=False)

print("Done translating missing paths.")
