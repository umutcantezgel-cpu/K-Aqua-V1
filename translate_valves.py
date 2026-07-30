import json
import urllib.request

def translate(text):
    if not isinstance(text, str): return text
    if not text.strip(): return text
    # Very basic local translation is not possible, we will just use the old keys if they match, or output a prompt.
    pass

with open('messages/de.json') as f:
    de = json.load(f)

valves_de = de['products']['valves']
with open('valves_de.json', 'w') as f:
    json.dump(valves_de, f, indent=2)
