import json
import re

with open('messages/ar.json', 'r') as f:
    data = json.load(f)

real_german_words = {"der", "und", "für", "mit", "ist", "sind", "eine", "einer", "ein", "auf", "von", "den", "das", "nicht", "sich", "auch", "wie", "werden", "oder"}

def check_dict(d, path=""):
    for k, v in d.items():
        current_path = f"{path}.{k}" if path else k
        if isinstance(v, dict):
            check_dict(v, current_path)
        elif isinstance(v, list):
            for i, item in enumerate(v):
                if isinstance(item, dict):
                    check_dict(item, f"{current_path}[{i}]")
                elif isinstance(item, str):
                    words = set(re.findall(r'\b[a-zäöüß]+\b', item.lower()))
                    if len(words.intersection(real_german_words)) > 2:
                        print(f"{current_path}[{i}]")
        elif isinstance(v, str):
            words = set(re.findall(r'\b[a-zäöüß]+\b', v.lower()))
            if len(words.intersection(real_german_words)) > 2:
                print(f"{current_path}")

check_dict(data)
