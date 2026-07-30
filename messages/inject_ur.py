import json

with open('ur.json', 'r') as f:
    ur_data = json.load(f)

# 1. seoExpansion & kontaktForm
with open('ur_seoExpansion_kontaktForm.json', 'r') as f:
    d = json.load(f)
    ur_data['seoExpansion'] = d['seoExpansion']
    ur_data['kontaktForm'] = d['kontaktForm']

# 2. seoArticle 1 & 2
with open('ur_seoArticle_1.json', 'r') as f:
    d = json.load(f)
    ur_data['seoArticle']['transitionFittings'] = d['seoArticle']['transitionFittings']
    ur_data['seoArticle']['weldInSaddles'] = d['seoArticle']['weldInSaddles']

with open('ur_seoArticle_2.json', 'r') as f:
    d = json.load(f)
    ur_data['seoArticle']['tools'] = d['seoArticle']['tools']
    ur_data['seoArticle']['accessories'] = d['seoArticle']['accessories']

# 3. customerReviews & referenzenPage
with open('ur_customerReviews_referenzenPage.json', 'r') as f:
    d = json.load(f)
    ur_data['customerReviews'] = d['customerReviews']
    ur_data['referenzenPage'] = d['referenzenPage']

# 4. productNames
with open('ur_productNames_ur.json', 'r') as f:
    d = json.load(f)
    ur_data['productNames'] = d['productNames']

with open('ur.json', 'w', encoding='utf-8') as f:
    json.dump(ur_data, f, ensure_ascii=False, indent=2)
