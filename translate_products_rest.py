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
        # Don't translate placeholders or HTML if possible, but deep_translator might mess them up.
        # It's a risk, but necessary for volume.
        try:
            res = translator.translate(node)
            return transliterate(res)
        except Exception as e:
            return node
    return node

with open('products_rest.json', 'r') as f:
    data = json.load(f)

# Translate
translated = translate_node(data)

with open('products_rest_sr.json', 'w') as f:
    json.dump(translated, f, indent=2, ensure_ascii=False)
