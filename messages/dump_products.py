import json

with open('de.json') as f:
    data = json.load(f)

p = data['products']

# I will write a script to find all scalar keys (strings) and output them.
# To keep structure, I will just dump the entire products object, then I'll manually edit it.
# Let's save products to scratch_products_de_full.json
with open('scratch_products_de_full.json', 'w') as f:
    json.dump(p, f, indent=2, ensure_ascii=False)
