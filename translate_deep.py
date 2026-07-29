import json
from deep_translator import GoogleTranslator
from concurrent.futures import ThreadPoolExecutor

translator = GoogleTranslator(source='de', target='sk')

def translate_str(text):
    if not text.strip(): return text
    try:
        return translator.translate(text)
    except Exception as e:
        print(f"Error translating: {text[:20]}... - {e}")
        return text

def translate_recursive(obj):
    if isinstance(obj, dict):
        for k, v in obj.items():
            if isinstance(v, str):
                obj[k] = translate_str(v)
            else:
                translate_recursive(v)
    elif isinstance(obj, list):
        for i in range(len(obj)):
            if isinstance(obj[i], str):
                obj[i] = translate_str(obj[i])
            else:
                translate_recursive(obj[i])

with open('messages/de.json', 'r') as f:
    de = json.load(f)

target_keys = ['trustx', 'partnerx', 'academyx', 'aboutx', 'legal', 'resources', 'markets', 'productsx']
extracted = {}
for k in target_keys:
    if k in de:
        extracted[k] = de[k]

print("Translating...", flush=True)

# Flatten strings to translate in parallel
strings = []
def flatten(obj, paths, current_path=""):
    if isinstance(obj, dict):
        for k, v in obj.items():
            if isinstance(v, str):
                strings.append((current_path + f"/{k}", v))
            else:
                flatten(v, paths, current_path + f"/{k}")
    elif isinstance(obj, list):
        for i in range(len(obj)):
            if isinstance(obj[i], str):
                strings.append((current_path + f"/{i}", obj[i]))
            else:
                flatten(obj[i], paths, current_path + f"/{i}")

flatten(extracted, [])
print(f"Found {len(strings)} strings to translate.", flush=True)

translated_map = {}
def do_translation(item):
    path, text = item
    return path, translate_str(text)

with ThreadPoolExecutor(max_workers=10) as executor:
    results = list(executor.map(do_translation, strings))

for path, t_text in results:
    translated_map[path] = t_text

def apply_translation(obj, current_path=""):
    if isinstance(obj, dict):
        for k, v in obj.items():
            if isinstance(v, str):
                obj[k] = translated_map.get(current_path + f"/{k}", v)
            else:
                apply_translation(v, current_path + f"/{k}")
    elif isinstance(obj, list):
        for i in range(len(obj)):
            if isinstance(obj[i], str):
                obj[i] = translated_map.get(current_path + f"/{i}", obj[i])
            else:
                apply_translation(obj[i], current_path + f"/{i}")

apply_translation(extracted)

with open('translated_fast.json', 'w') as f:
    json.dump(extracted, f, indent=2, ensure_ascii=False)

print("Saved to translated_fast.json")
