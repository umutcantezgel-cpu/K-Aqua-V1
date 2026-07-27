import json
import re

with open('messages/en.json', 'r') as f:
    data = json.load(f)

def is_german(text):
    if not isinstance(text, str):
        return False
    # Simple heuristic
    german_keywords = [' und ', ' der ', ' die ', ' das ', ' für ', ' mit ', ' von ', ' im ', ' ist ', ' nicht ', ' zu ', ' auf ', ' eine ', ' ein ', ' sich ', ' des ', ' den ', ' dem ', ' in ', ' an ', ' als ', ' um ', ' aus ', ' zur ']
    text_lower = text.lower()
    for kw in german_keywords:
        if kw in text_lower:
            return True
    return False

def check_dict(d, path=""):
    for k, v in d.items():
        current_path = f"{path}.{k}" if path else k
        if isinstance(v, dict):
            check_dict(v, current_path)
        elif isinstance(v, list):
            for i, item in enumerate(v):
                if isinstance(item, dict):
                    check_dict(item, f"{current_path}[{i}]")
                elif isinstance(item, str) and is_german(item):
                    if current_path.startswith("products.") or current_path.startswith("solutions."):
                        print(f"{current_path}[{i}]: {item}")
        elif isinstance(v, str):
            if is_german(v):
                if current_path.startswith("products.") or current_path.startswith("solutions."):
                    print(f"{current_path}: {v}")

check_dict(data)
