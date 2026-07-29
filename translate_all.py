import json
import time
from deep_translator import GoogleTranslator

# Cyrillic to Latin transliteration mapping
cyr_to_lat = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'ђ': 'đ', 'е': 'e',
    'ж': 'ž', 'з': 'z', 'и': 'i', 'ј': 'j', 'к': 'k', 'л': 'l', 'љ': 'lj',
    'м': 'm', 'н': 'n', 'њ': 'nj', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's',
    'т': 't', 'ћ': 'ć', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'č',
    'џ': 'dž', 'ш': 'š',
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Ђ': 'Đ', 'Е': 'E',
    'Ж': 'Ž', 'З': 'Z', 'И': 'I', 'Ј': 'J', 'К': 'K', 'Л': 'L', 'Љ': 'Lj',
    'М': 'M', 'Н': 'N', 'Њ': 'Nj', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S',
    'Т': 'T', 'Ћ': 'Ć', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C', 'Ч': 'Č',
    'Џ': 'Dž', 'Ш': 'Š'
}

def transliterate(text):
    if not isinstance(text, str): return text
    return "".join(cyr_to_lat.get(c, c) for c in text)

translator = GoogleTranslator(source='de', target='sr')

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

def unflatten(flat_dict):
    result = {}
    for k, v in flat_dict.items():
        keys = k.split('.')
        current = result
        for key in keys[:-1]:
            if key.isdigit():
                key = int(key)
            if isinstance(current, dict):
                if key not in current:
                    next_key = keys[keys.index(str(key))+1] if isinstance(key, int) else keys[keys.index(key)+1]
                    current[key] = [] if next_key.isdigit() else {}
                current = current[key]
            elif isinstance(current, list):
                # lists are handled slightly differently in unflattening but we'll adapt
                # to simplify, we can just use dicts and convert to list later
                pass
    return result

def reconstruct_from_flat(flat_dict):
    import re
    result = {}
    for k, v in flat_dict.items():
        parts = k.split('.')
        curr = result
        for i, part in enumerate(parts[:-1]):
            # If the next part is an index, we need a list, but wait, python dicts can emulate this.
            # Actually, standard unflattening:
            if part not in curr:
                next_part = parts[i+1]
                if next_part.isdigit():
                    curr[part] = {} # we'll keep everything as dict and fix lists after
                else:
                    curr[part] = {}
            curr = curr[part]
        curr[parts[-1]] = v
    
    # recursively fix dicts that have only string digit keys into lists
    def fix_lists(node):
        if isinstance(node, dict):
            if all(k.isdigit() for k in node.keys()) and len(node) > 0:
                # convert to list
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

# read files
with open('messages/de.json', 'r') as f:
    de_data = json.load(f)

with open('messages/sr.json', 'r') as f:
    sr_data = json.load(f)

# get remaining
remaining = {}
for k in de_data.keys():
    if k not in sr_data:
        remaining[k] = de_data[k]
    elif k == 'products':
        # Check products partially
        # Actually I just overwrote a tiny bit of products. Let's just do the whole products again 
        # and we can overwrite it.
        remaining[k] = de_data[k]

flat = flatten(remaining)
keys = list(flat.keys())
values = list(flat.values())

# process in batches of 100
translated_values = []
for i in range(0, len(values), 100):
    batch = values[i:i+100]
    # some strings might be empty or too large, translate_batch handles list
    # but let's do it safely
    res = []
    try:
        res = translator.translate_batch(batch)
        for val in res:
            translated_values.append(transliterate(val))
    except Exception as e:
        # fallback to individual
        for val in batch:
            try:
                translated_values.append(transliterate(translator.translate(val)))
            except:
                translated_values.append(val)
    print(f"Translated batch {i//100 + 1}/{(len(values)-1)//100 + 1}")

flat_translated = dict(zip(keys, translated_values))
final_obj = reconstruct_from_flat(flat_translated)

with open('remaining_sr.json', 'w') as f:
    json.dump(final_obj, f, indent=2, ensure_ascii=False)
print("DONE")
