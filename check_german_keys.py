import json
import re

with open('/Users/umurey/Downloads/K-Aqua-V1-main/messages/en.json') as f:
    data = json.load(f)

german_words = {"der", "die", "und", "für", "mit", "ist", "sind", "eine", "einer", "ein", "zu", "auf", "von", "in", "den", "das", "nicht", "sich", "auch", "wie"}

def count_german(node):
    count = 0
    if isinstance(node, dict):
        for v in node.values():
            count += count_german(v)
    elif isinstance(node, list):
        for item in node:
            count += count_german(item)
    elif isinstance(node, str):
        words = set(re.findall(r'\b[a-zäöüß]+\b', node.lower()))
        count += len(words.intersection(german_words))
    return count

for key in data.keys():
    gc = count_german(data[key])
    if gc > 5:
        print(f"Key '{key}' has {gc} German hits.")
