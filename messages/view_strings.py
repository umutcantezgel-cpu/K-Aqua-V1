import json
with open('all_german_strings.json') as f:
    strings = json.load(f)
for i, s in enumerate(strings[:50]):
    print(f"[{i}] {s}")
