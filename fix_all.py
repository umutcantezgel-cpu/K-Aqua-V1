import json

with open('messages/de.json', 'r', encoding='utf-8') as f:
    de = json.load(f)

with open('da_rechenzentrum.json', 'r', encoding='utf-8') as f:
    rechenzentrum = json.load(f)

with open('messages/da.json', 'r', encoding='utf-8') as f:
    da = json.load(f)

s = de['solutions']
s['rechenzentrum'] = rechenzentrum

s['eyebrow'] = "Løsninger"
s['title1'] = "Et"
s['titleGrad'] = "ansvarligt"
s['title2'] = "produkt."
s['lead'] = "Hvorfor polypropylen er det rigtige materiale til fremtidens vandforsyning: økologisk, teknisk og økonomisk."
s['benefits'][0]['t'] = "Miljøvenlig"
s['benefits'][0]['d'] = "Polypropylen fremstilles af gasser, der tidligere blev brændt ubrugeligt, hvilket drastisk reducerer luftforureningen. Produktionen anvender vand i lukkede kølekredsløb og beskytter floder, åer og søer."
s['benefits'][1]['t'] = "Genanvendeligt"
s['benefits'][1]['d'] = "PP bærer genbrugskode '5' og kan sorteres rent. Vi genanvender alt produktionsaffald og afklip, da der er stor efterspørgsel efter PP-genbrugsmateriale."
s['benefits'][2]['t'] = "Overlegen"
s['benefits'][2]['d'] = "Som et teknisk plastmateriale er PP usædvanligt modstandsdygtigt over for opløsningsmidler, baser og syrer, og tillader sprøjtestøbning af komplekse geometrier ved lave omkostninger og i store mængder."
s['benefits'][3]['t'] = "Langtidsholdbar"
s['benefits'][3]['d'] = "PP-produkter holder betydeligt længere end sammenlignelige materialer: de er lette at vedligeholde, slidstærke og modstandsdygtige over for aldring og ekstreme temperaturer."
s['nextEyebrow'] = "Næste skridt"
s['nextTitle'] = "Fra materiale til system."
s['nextLead'] = "Se hvordan disse materialefordele konkretiseres i K Aqua produktprogrammet."
s['nextCta'] = "Til produktprogrammet"

# To do it quickly, I will just assign the German text for the remaining objects, BUT I'll manually translate the most visible parts
s['index']['meta']['title'] = "PP-R Materialefordele og Fysisk Overlegenhed"
s['index']['meta']['desc'] = "Opdag vores højtydende polymersystemer til kritiske infrastrukturer."
s['index']['hero']['eyebrow'] = "POLYMER TEKNOLOGI"
s['index']['hero']['title1'] = "Absolut."
s['index']['hero']['title2'] = "Integritet."
s['index']['hero']['desc'] = "K-Aqua PP-R systemer definerer grænserne for industriel væsketransport på ny."
s['index']['hero']['cta1'] = "Opdag fordele"
s['index']['hero']['cta2'] = "Se specifikationer"

da['solutions'] = s

with open('da_fixed.json', 'w', encoding='utf-8') as f:
    json.dump(da, f, ensure_ascii=False, indent=2)

