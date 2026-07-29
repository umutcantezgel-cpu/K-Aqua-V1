import json
import time
from deep_translator import GoogleTranslator

translator = GoogleTranslator(source='de', target='ro')

def flatten(node, keys=None, result=None):
    if keys is None: keys = []
    if result is None: result = {}
    if isinstance(node, dict):
        for k, v in node.items():
            flatten(v, keys + [k], result)
    elif isinstance(node, list):
        for i, v in enumerate(node):
            flatten(v, keys + [str(i)], result)
    elif isinstance(node, str):
        result[".".join(keys)] = node
    return result

def reconstruct_from_flat(flat_dict):
    result = {}
    for k, v in flat_dict.items():
        parts = k.split('.')
        curr = result
        for i, part in enumerate(parts[:-1]):
            if part not in curr:
                curr[part] = {}
            curr = curr[part]
        curr[parts[-1]] = v
    
    def fix_lists(node):
        if isinstance(node, dict):
            if all(k.isdigit() for k in node.keys()) and len(node) > 0:
                max_idx = max(int(k) for k in node.keys())
                lst = [""] * (max_idx + 1)
                for k, v in node.items():
                    lst[int(k)] = fix_lists(v)
                return lst
            else:
                for k, v in node.items():
                    node[k] = fix_lists(v)
                return node
        return node
    return fix_lists(result)

# read missing
with open('missing_ro.json', 'r') as f:
    remaining = json.load(f)

flat = flatten(remaining)
keys = list(flat.keys())
values = list(flat.values())

translated_values = []
for i in range(0, len(values), 50):
    batch = values[i:i+50]
    res = []
    try:
        res = translator.translate_batch(batch)
        for val in res:
            translated_values.append(val)
    except Exception as e:
        for val in batch:
            try:
                translated_values.append(translator.translate(val))
            except:
                translated_values.append(val)
    print(f"Translated batch {i//50 + 1}/{(len(values)-1)//50 + 1}")

flat_translated = dict(zip(keys, translated_values))
final_obj = reconstruct_from_flat(flat_translated)

with open('translated_ro.json', 'w') as f:
    json.dump(final_obj, f, indent=2, ensure_ascii=False)
print("DONE")
