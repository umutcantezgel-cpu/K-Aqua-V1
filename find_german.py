import json
import re

with open('messages/en.json') as f:
    data = json.load(f)

german_words = {"der", "die", "und", "für", "mit", "ist", "sind", "eine", "einer", "ein", "zu", "auf", "von", "in", "den", "das", "nicht", "sich", "auch", "wie"}

def check_dict(node, path=""):
    if isinstance(node, dict):
        for k, v in node.items():
            check_dict(v, path + "." + k if path else k)
    elif isinstance(node, list):
        for i, v in enumerate(node):
            check_dict(v, path + f"[{i}]")
    elif isinstance(node, str):
        words = set(re.findall(r'\b[a-zäöüß]+\b', node.lower()))
        hits = len(words.intersection(german_words))
        if hits > 0:
            print(f"{path}: {hits} hits -> {node[:50]}")

check_dict(data.get('products', {}), "products")
