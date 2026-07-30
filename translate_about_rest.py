import json
with open('messages/de.json', 'r') as f:
    de = json.load(f)

about = de['about']
keys_to_fetch = [
  'seo',          'eyebrow',
  'title1',       'titleGrad',
  'lead',         'h2',
  'p1',           'p2',
  'polEyebrow',   'polTitle',
  'polLead',      'cards',
  'genauEyebrow', 'genauTitle',
  'genauLead',    'points',
  'certTitle',    'certText',
  'hero'
]

rest = {k: about[k] for k in keys_to_fetch if k in about}
print(json.dumps(rest, indent=2, ensure_ascii=False))
