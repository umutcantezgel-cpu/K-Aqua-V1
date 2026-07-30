import sys
with open('lt.json', 'r') as f:
    text = f.read()

target = '''      "hero": {
        "eyebrow": "Vožtuvai ir armatūra",
        "title": "PP-R armatūra",
        "lead": "Korozijai atspari hidraulika ir vokiškas tikslumas."
      }
    }'''

with open('patch_all_products.json', 'r') as f:
    patch = f.read()

new_text = text.replace(target, target + patch)

with open('lt.json', 'w') as f:
    f.write(new_text)

print("Updated lt.json!")
