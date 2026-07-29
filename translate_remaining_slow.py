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

def translate_node(node):
    if isinstance(node, dict):
        return {k: translate_node(v) for k, v in node.items()}
    elif isinstance(node, list):
        return [translate_node(i) for i in node]
    elif isinstance(node, str):
        # translate individually with a small delay and retry
        retries = 3
        for attempt in range(retries):
            try:
                res = translator.translate(node)
                time.sleep(0.1) # small sleep
                return transliterate(res)
            except Exception as e:
                time.sleep(1)
        return node # fallback to original
    return node

with open('messages/de.json', 'r') as f:
    de_data = json.load(f)

with open('messages/sr.json', 'r') as f:
    sr_data = json.load(f)

# The keys we already translated properly manually:
# "homex", "products" (part 1 and 2), "solutions", etc.
# Actually I haven't injected solutions and products yet.
# Let's just generate the rest of the file from where `sr.json` currently is, EXCLUDING what's already there.

missing_keys = []
for k in de_data.keys():
    if k not in sr_data:
        missing_keys.append(k)

print(f"Missing keys: {len(missing_keys)}")

remaining_data = {k: de_data[k] for k in missing_keys}

translated = translate_node(remaining_data)

with open('rest_sr.json', 'w') as f:
    json.dump(translated, f, indent=2, ensure_ascii=False)
print("DONE")
