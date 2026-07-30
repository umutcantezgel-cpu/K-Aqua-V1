import json
with open('messages/de.json', 'r') as f:
    de = json.load(f)

res = {
  "krankenhaus_sticky": de['solutions']['krankenhaus'].get('sticky'),
  "hotels_intro_rest": {k: de['solutions']['hotels']['intro'].get(k) for k in ['title1', 'title2', 'titleGrad', 'desc']},
  "hotels_bentoSection": de['solutions']['hotels'].get('bentoSection'),
  "hotels_bento": de['solutions']['hotels'].get('bento'),
  "hotels_textSection": de['solutions']['hotels'].get('textSection'),
  "vorfertigung_meta": de['solutions']['vorfertigung'].get('meta'),
  "vorfertigung_hero_badge": de['solutions']['vorfertigung']['hero'].get('badge'),
  "vorfertigung_intro_rest": {k: de['solutions']['vorfertigung']['intro'].get(k) for k in ['eyebrow', 'title', 'lead']},
  "hochhaus_meta": de['solutions']['hochhaus'].get('meta'),
  "hochhaus_intro_rest": {k: de['solutions']['hochhaus']['intro'].get(k) for k in ['eyebrow', 'lead', 'p1', 'p2', 'p3']}
}
print(json.dumps(res, indent=2, ensure_ascii=False))
