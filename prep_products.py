import json

# Read da_test.json to get current fittings, pipes, category
with open('messages/da_test.json', 'r', encoding='utf-8') as f:
    da = json.load(f)

fittings = da['products']['fittings']
fittings['intro']['text1'] = "I årtier har vi på vores hovedfabrik i hjertet af Tyskland forenet håndværksmæssig stolthed med topmoderne, højautomatiseret produktionsteknologi. Hver vinkel, hver muffe, hvert T-stykke bærer det umiskendelige DNA fra tysk ingeniørkunst. I brug i de hårdeste ørkener, mest ekstreme klimazoner og mest krævende industrianlæg i verden, beviser vores materiale sit værd hver eneste dag."
fittings['intro']['text2'] = "Sammensmeltningen af makromolekyler i vores PP-R system skaber et rørnetværk uden svage punkter. Der er ingen tætningsringe, der kan korrodere, ingen limfuger, der kan angribes af kemikalier. Røret og fittingen sammensmeltes termisk til ét enkelt, uadskilleligt emne. Dette er den absolutte definition af sikkerhed."
fittings['timeline']['items'].append({
    "year": "Trin 05",
    "title": "Test & Logistik",
    "text": "Hver batch modtager sit digitale certifikat. Klar til forsendelse til de mest krævende byggepladser i verden."
})
fittings['depth'] = {
    "title": "Levetid > 50 år. Garanteret.",
    "text": "Tid er den ultimative stresstest for ethvert materiale. Vores fittings er designet til at overleve selve bygningens levetid. Ved at tilføje specielle antioxidanter og termiske stabilisatorer i vores PP-R matrix, forsinkes den termisk-oxidative aldring massivt. Selv ved kontinuerlige fremløbstemperaturer på 70°C og trykbelastninger på 10 bar garanterer vi en levetid på over et halvt århundrede. Det er ikke markedsføring. Det er anvendt polymerfysik.",
    "badge": "100% Vedligeholdelsesfri"
}
fittings['cta']['secondary'] = "Se hele sortimentet"
with open('fittings_da.json', 'w', encoding='utf-8') as f:
    json.dump(fittings, f, ensure_ascii=False, indent=2)

pipes = da['products']['pipes']
pipes['timeline']['items'].append({
    "year": "Fase 05",
    "title": "Test & Godkendelse",
    "text": "Hydraulisk sprængtrykstest ved 95°C over 1000 timer. Trækforsøg, slagstyrke og toksikologisk sikkerhedstest. Kun hvis produktet overgår alle standarder (DIN 8077/8078, EN ISO 15874), forlader det vores fabrik."
})
with open('pipes_da.json', 'w', encoding='utf-8') as f:
    json.dump(pipes, f, ensure_ascii=False, indent=2)

category = {
    "title": "Kategorier",
    "all": "Alle Produkter",
    "allProducts": "Alle Produkter",
    "openInFinder": "Åbn i Finder",
    "artNA": "Art. N/A",
    "viewDetails": "Vis produktdetaljer",
    "learnMoreKnowledge": "Opdag PP-R rørsystemer i vidensportalen",
    "learnMoreDesc": "Dyk dybere ned i den tekniske dokumentation og opdag faglige artikler om installation, bæredygtighed og test af vores PP-R-systemer.",
    "toKnowledgeBase": "Opdag faglige artikler i K-Aqua Academy"
}
with open('category_da.json', 'w', encoding='utf-8') as f:
    json.dump(category, f, ensure_ascii=False, indent=2)

