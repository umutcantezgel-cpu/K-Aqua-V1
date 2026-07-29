import json
import time
import translators as ts

with open('missing_ro.json', 'r') as f:
    data = json.load(f)

def recurse_translate(obj):
    for k, v in obj.items():
        if isinstance(v, str):
            try:
                res = ts.translate_text(v, translator='bing', from_language='de', to_language='ro')
                obj[k] = res
                print(f"Translated: {res[:20]}...")
            except Exception as e:
                print("Error:", e)
                # retry with google
                try:
                    res = ts.translate_text(v, translator='google', from_language='de', to_language='ro')
                    obj[k] = res
                except:
                    pass
        elif isinstance(v, dict):
            recurse_translate(v)
        elif isinstance(v, list):
            for i in range(len(v)):
                if isinstance(v[i], str):
                    try:
                        v[i] = ts.translate_text(v[i], translator='bing', from_language='de', to_language='ro')
                    except:
                        pass
                elif isinstance(v[i], dict):
                    recurse_translate(v[i])

recurse_translate(data)

with open('translated_ro_bing.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
print("DONE")
