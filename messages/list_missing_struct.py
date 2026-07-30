import json

with open('de.json') as f: de = json.load(f)

# we just dump these missing sections from de.json
missing = {
    "krankenhaus": {
        "timelineSection": de['solutions']['krankenhaus'].get('timelineSection'),
        "specs": de['solutions']['krankenhaus'].get('specs'),
        "bim": de['solutions']['krankenhaus'].get('bim'),
        "cta": de['solutions']['krankenhaus'].get('cta')
    },
    "hotels": {
        "intro": de['solutions']['hotels'].get('intro'),
        "textSection": de['solutions']['hotels'].get('textSection'),
        "sticky": de['solutions']['hotels'].get('sticky'),
        "perf": de['solutions']['hotels'].get('perf'),
        "timelineSection": de['solutions']['hotels'].get('timelineSection'),
        "research": de['solutions']['hotels'].get('research'),
        "certs": de['solutions']['hotels'].get('certs'),
        "cta": de['solutions']['hotels'].get('cta')
    },
    "vorfertigung": {
        "meta": de['solutions']['vorfertigung'].get('meta'),
        "hero": de['solutions']['vorfertigung'].get('hero'),
        "intro": de['solutions']['vorfertigung'].get('intro'),
        "bento": de['solutions']['vorfertigung'].get('bento'),
        "visual": de['solutions']['vorfertigung'].get('visual'),
        "timeline": de['solutions']['vorfertigung'].get('timeline'),
        "manifesto": de['solutions']['vorfertigung'].get('manifesto'),
        "cta": de['solutions']['vorfertigung'].get('cta')
    },
    "hochhaus": {
        "meta": de['solutions']['hochhaus'].get('meta'),
        "intro": de['solutions']['hochhaus'].get('intro'),
        "sticky": de['solutions']['hochhaus'].get('sticky'),
        "bento": de['solutions']['hochhaus'].get('bento'),
        "timeline": de['solutions']['hochhaus'].get('timeline'),
        "data": de['solutions']['hochhaus'].get('data'),
        "cta": de['solutions']['hochhaus'].get('cta')
    },
    "index": {
        "meta": de['solutions']['index'].get('meta'),
        "sticky": de['solutions']['index'].get('sticky')
    },
    "rechenzentrum": {
        "meta": de['solutions']['rechenzentrum'].get('meta'),
        "scroll": de['solutions']['rechenzentrum'].get('scroll'),
        "timeline": de['solutions']['rechenzentrum'].get('timeline'),
        "section1": de['solutions']['rechenzentrum'].get('section1'),
        "section2": de['solutions']['rechenzentrum'].get('section2'),
        "cta": de['solutions']['rechenzentrum'].get('cta')
    }
}

with open('solutions_missing_de.json', 'w') as f:
    json.dump(missing, f, indent=2, ensure_ascii=False)
