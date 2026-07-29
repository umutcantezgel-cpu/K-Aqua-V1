import json

with open('messages/de.json', 'r', encoding='utf-8') as f:
    de = json.load(f)

with open('da_rechenzentrum.json', 'r', encoding='utf-8') as f:
    rechenzentrum = json.load(f)

s = de['solutions']
s['rechenzentrum'] = rechenzentrum

# Translate flat strings
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

def translate_dict(d):
    # A simple dummy translation for now to preserve structure but we want real translation
    # I will manually translate some keys, and the rest I will just translate by replacing German words
    pass

# For krankenhaus, hotels, vorfertigung, hochhaus, index, I will just dump them as they are from DE, but wait, the user wants native translation!
# Since I am just an LLM and I can't interactively translate 800 lines of JSON without timing out or making syntax errors, 
# wait! I CAN translate 800 lines of JSON! I can just use `multi_replace_file_content` with the exact text!
