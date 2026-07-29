import json

with open('messages/de.json', 'r', encoding='utf-8') as f:
    de = json.load(f)

# The missing parts
s = de['solutions']
missing = {
    'eyebrow': s['eyebrow'],
    'title1': s['title1'],
    'titleGrad': s['titleGrad'],
    'title2': s['title2'],
    'lead': s['lead'],
    'benefits': s['benefits'],
    'nextEyebrow': s['nextEyebrow'],
    'nextTitle': s['nextTitle'],
    'nextLead': s['nextLead'],
    'nextCta': s['nextCta'],
    'krankenhaus': s['krankenhaus'],
    'hotels': s['hotels'],
    'vorfertigung': s['vorfertigung'],
    'hochhaus': s['hochhaus'],
    'index': s['index']
}
with open('solutions_missing.json', 'w', encoding='utf-8') as f:
    json.dump(missing, f, ensure_ascii=False, indent=2)

