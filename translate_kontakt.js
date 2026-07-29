const fs = require('fs');

const kontaktBlocks = {
  "home": {
    "kicker": "För planerare & företag",
    "head": "Tveka inte att skicka oss dina systemspecifikationer.",
    "short": "Be om snabb rådgivning",
    "text": "Oavsett om det gäller att dimensionera ditt dricksvattennät, beräkna värmeförluster eller ta fram anbudstexter (GAEB) – våra ingenjörer stöttar dig från första ritningen. Kontakta oss direkt.",
    "interest": "Beratung",
    "done": "Tack! En teknisk rådgivare kontaktar dig inom kort."
  },
  "unternehmen": {
    "kicker": "Bli en partner",
    "head": "Vill du inkludera K Aqua i ditt sortiment?",
    "short": "Grossistförfrågan",
    "text": "Vi utökar vårt globala nätverk. Lämna dina uppgifter om du driver VVS-grossistverksamhet och är intresserad av ett säljpartnerskap. Vårt exportteam kommer att diskutera villkoren med dig.",
    "interest": "Beratung",
    "done": "Din förfrågan är mottagen. Vårt exportteam återkommer."
  },
  "produkte_fittings": {
    "kicker": "Systemrördelar",
    "head": "Har du frågor om Zeta-värden eller tryckförluster för våra rördelar?",
    "short": "Teknisk rådgivning för rördelar",
    "text": "Korrekt hydraulik sparar pumpeffekt. Om du planerar komplexa nätverk och behöver de exakta motståndskoefficienterna (zeta-värden) för våra rördelar för dina beräkningar, skicka en snabb förfrågan.",
    "interest": "Rohrsysteme",
    "done": "En systemtekniker hör av sig med nödvändig data."
  },
  "produkte_rohre": {
    "kicker": "Rörledningssystem",
    "head": "Osäker på vilken SDR-klass ditt projekt kräver?",
    "short": "Tryck- & dimensioneringshjälp",
    "text": "SDR 6, 7.4 eller 11? Valet beror på systemtryck och temperatur. Berätta vad du ska transportera, så rekommenderar vi rätt rörserie enligt gällande standarder.",
    "interest": "Rohrsysteme",
    "done": "Din förfrågan har mottagits. Vi återkommer med en rekommendation."
  },
  "produkte_armaturen": {
    "kicker": "Systemventiler",
    "head": "Söker du blyfria avstängningsventiler för sjukhus?",
    "short": "Rådgivning kring dricksvattenhygien",
    "text": "Dricksvattenhygien tolererar inga kompromisser. Vi förser dig med all information om våra friflödesventiler och förklarar varför PP-R kranar minimerar risken för legionella.",
    "interest": "Trinkwassernetze",
    "done": "Vår hygienspecialist kommer att kontakta dig."
  },
  "produkte_werkzeuge": {
    "kicker": "Svetsverktyg",
    "head": "Skall du svetsa dimensioner över 125 mm för första gången?",
    "short": "Fråga om verktyg och maskiner",
    "text": "Stumsvetsning kräver precision. Lämna ditt nummer så ger vår applikationstekniker dig råd om val av maskin, svetsparametrar och nödvändiga DVS-utbildningar.",
    "interest": "Beratung",
    "done": "Vår applikationstekniker kontaktar dig inom kort."
  },
  "produkte_uebergaenge": {
    "kicker": "Övergångskopplingar",
    "head": "Rådgivning kring metallövergångar?",
    "short": "Fråga om gängor & kopplingar",
    "text": "Vill du veta vilket gängtätningsmedel som är godkänt för K Aquas mässingsinsatser, eller behöver du data om draghållfastheten? Lämna en förfrågan, vi svarar direkt.",
    "interest": "Rohrsysteme",
    "done": "Vi återkommer med all teknisk information."
  },
  "produkte_zubehoer": {
    "kicker": "Systemtillbehör",
    "head": "Frågor om fäst- & glidpunkter?",
    "short": "Stöd vid rörklamring",
    "text": "Termisk längdutvidgning måste hanteras kontrollerat. Skicka oss din ruttplan, så beräknar vi korrekta klammeravstånd och de nödvändiga expansionsbågarna åt dig.",
    "interest": "Beratung",
    "done": "Våra experter på rörklamring återkommer."
  },
  "katalog": {
    "kicker": "Katalog & Sortiment",
    "head": "Hittar du inte en specifik dimension?",
    "short": "Förfrågan om specialdelar",
    "text": "I katalogen hittar du standardmåtten upp till d125. Behöver du rör upp till d630 eller specialfördelare för ditt projekt? Skriv till oss – vi tillverkar även speciallösningar på beställning.",
    "interest": "Rohrsysteme",
    "done": "Vår försäljningsavdelning kontaktar dig angående dina behov."
  },
  "finder": {
    "kicker": "Artikelfinder",
    "head": "Problem med att slå upp gamla artikelnummer?",
    "short": "Hjälp med att identifiera artiklar",
    "text": "Om du har ett äldre anbud framför dig och behöver de aktuella K Aqua artikelnumren för ett systembyte, ladda upp listan. Vi 'översätter' den till nuvarande artiklar åt dig.",
    "interest": "Beratung",
    "done": "Vi tar hand om översättningen av dina artiklar och återkommer."
  },
  "produkte": {
    "kicker": "K Aqua Sortiment",
    "head": "Vilket system är optimalt för ditt byggprojekt?",
    "short": "Allmän produktrådgivning",
    "text": "Beskriv ditt projekt kort: Är det ett hotellkomplex, en industrianläggning eller en bostadsbyggnad? Vi skickar dig en översikt över de mest lämpliga produktlinjerna och referenserna.",
    "interest": "Rohrsysteme",
    "done": "Tack! Vi skickar en projektanpassad översikt."
  },
  "academy": {
    "kicker": "K Aqua Academy",
    "head": "Vill du certifiera ditt monteringsteam?",
    "short": "Boka platser i Academy",
    "text": "Våra svetsutbildningar äger rum i Waldsolms eller direkt på din byggarbetsplats (globalt). Ange gruppstorlek och önskad plats, så kontaktar vår Academy Manager dig.",
    "interest": "Beratung",
    "done": "Vår Academy Manager återkommer för att planera utbildningen."
  },
  "referenzen": {
    "kicker": "Referensprojekt",
    "head": "Vill du prata med en av våra tidigare kunder?",
    "short": "Begär referenskontakt",
    "text": "Investeringar i infrastruktur bygger på förtroende. Om du överväger ett större projekt ordnar vi gärna en kontakt med en teknisk ledare från ett jämförbart projekt.",
    "interest": "Beratung",
    "done": "Vi ordnar en kontakt med en lämplig referens."
  },
  "support": {
    "kicker": "Teknisk Support",
    "head": "Akuta frågor på byggarbetsplatsen?",
    "short": "Teknisk krissupport",
    "text": "Står teamet stilla för att en rördragning är oklar eller en svetsmaskin är felinställd? Lämna ditt nummer – vår tekniska nödhjälp ringer tillbaka omgående.",
    "interest": "Beratung",
    "done": "Vi ringer upp dig direkt på byggarbetsplatsen!"
  },
  "ausschreibungstexte": {
    "kicker": "Anbudstexter",
    "head": "Saknar du en textmodul i vårt GAEB-bibliotek?",
    "short": "Begär anpassade GAEB-texter",
    "text": "Kräver din anbudsinbjudan speciella, objektrelaterade formuleringar som inte finns med i standardlistan? Våra planerare skapar VOB-kompatibla specialtexter för dina system direkt och kostnadsfritt.",
    "interest": "Beratung",
    "done": "Våra anbudsspecialister kontaktar dig angående dina texter."
  },
  "service": {
    "kicker": "Kundtjänst",
    "head": "Har du frågor kring leveranstider, pallar eller logistik?",
    "short": "Kontakt för logistik & frakt",
    "text": "Rör kräver mycket utrymme. Om du behöver veta hur många containrar ditt projekt fyller eller när produktionstiden för en stor beställning kan slutföras, fråga vårt logistikteam.",
    "interest": "Beratung",
    "done": "Logistikteamet återkommer med fraktinformation."
  },
  "maerkte_trinkwasser": {
    "kicker": "Dricksvatteninstallationer",
    "head": "Behöver du det senaste DVGW-certifikatet för systemet?",
    "short": "Ladda ner certifikat & hygien",
    "text": "Om besiktningsmannen kräver officiella bevis för bakteriologisk säkerhet eller materialrenhet, ge oss en signal. Vi skickar de senaste globala certifikaten (DVGW, KIWA, SKZ) som en PDF direkt.",
    "interest": "Trinkwassernetze",
    "done": "Vi skickar de senaste certifikaten direkt."
  },
  "maerkte_klima": {
    "kicker": "Kyla & Värme",
    "head": "Vill du isolera dina kylanläggningar mot kondensvatten?",
    "short": "Beräkning av daggpunkt & isolering",
    "text": "Berätta mediets temperatur och rumsfuktigheten för oss. Vi beräknar den exakta tjocklek på isoleringen du behöver för PP-R-systemet för att säkert undvika att daggpunkten underskrids.",
    "interest": "Beratung",
    "done": "En klimatspecialist kontaktar dig med daggpunktsberäkningen."
  },
  "maerkte_industrie": {
    "kicker": "Industrianläggningar",
    "head": "Resistent mot kemikalierna i din anläggning?",
    "short": "Kontrollera kemisk beständighet",
    "text": "Skicka oss säkerhetsdatabladet för mediet (inklusive koncentration och drifttemperatur). Vårt laboratorium kontrollerar PP-R-resistensen och utfärdar vid behov en skriftlig garanti.",
    "interest": "Beratung",
    "done": "Vårt laboratorium kontrollerar beständigheten och återkommer."
  },
  "maerkte_schiffbau": {
    "kicker": "Fartyg & Marin",
    "head": "Lättvikt och vibrationsresistens för marina nätverk.",
    "short": "Begär marint godkännande",
    "text": "Oavsett om det är grå-, svart- eller ballastvatten: Meddela oss fartygsklassen. Vi skickar relevanta klassificeringscertifikat (DNV, Lloyd's) för vårt system.",
    "interest": "Beratung",
    "done": "En marinexpert skickar dig de relevanta certifikaten."
  },
  "maerkte_landwirtschaft": {
    "kicker": "Jordbruk & Växthus",
    "head": "Robusta bevattningsnät för maximal skörd.",
    "short": "Designa bevattningssystem",
    "text": "Ge oss antalet hektar och vattenbehovet. Vi designar ett frostsäkert, långlivat PP-R nät som förhindrar blockeringar från algtillväxt tack vare sin totala ljustäthet.",
    "interest": "Trinkwassernetze",
    "done": "Vi återkommer snart för att diskutera ditt bevattningsnät."
  },
  "maerkte": {
    "kicker": "Regionala Marknader",
    "head": "Prata med en exportspecialist för din region.",
    "short": "Logistik och godkännanden för ditt land",
    "text": "Vi exporterar globalt. Namnge destinationslandet, så informerar vi dig om lokala standarder, lokala försäljningspartners och realistiska sjöfrakttider från vår fabrik.",
    "interest": "Beratung",
    "done": "En exportchef för din region kommer att kontakta dig."
  },
  "loesungen_hochhaus": {
    "kicker": "Skyskrapor",
    "head": "Tryckstabilisering i extrema stigledningar.",
    "short": "Beräkna tryckfall i höghus",
    "text": "Hydromekaniken i skyskrapor tolererar inga fel. Uppge byggnadens höjd och antal våningar, så hjälper vi till att positionera tryckreducerare och expansionsbågar.",
    "interest": "BIM Daten",
    "done": "En specialist på höghushydraulik kontaktar dig."
  },
  "loesungen_krankenhaus": {
    "kicker": "Sjukhus",
    "head": "Sterilitet och legionellaförebyggande i klinisk drift.",
    "short": "Dricksvattenhygien för kliniker",
    "text": "Skyddet av immunsvaga patienter har högsta prioritet. Vi ger dig råd om ringledningar, förebyggande av dödutrymmen och termisk desinfektion med vårt PP-R system.",
    "interest": "Trinkwassernetze",
    "done": "En expert på dricksvattenhygien kommer att höra av sig omgående."
  },
  "loesungen_hotel": {
    "kicker": "Hotell",
    "head": "Akustisk isolering för ostörd sömn åt dina gäster.",
    "short": "Ljudisolering i hotellbyggen",
    "text": "Flödesljud i intilliggande rum leder till klagomål. Meddela oss väggkonstruktionen, så rekommenderar vi ljudisolerande klamrar och flödesoptimeringar.",
    "interest": "Beratung",
    "done": "Vi kontaktar dig angående optimering av ljudisolering."
  },
  "loesungen": {
    "kicker": "Speciallösningar",
    "head": "Skräddarsydda systemlösningar för komplexa byggprojekt.",
    "short": "Teknisk rådgivning för specialprojekt",
    "text": "Räcker inte standardlösningar för ditt projekt? Skissa utmaningen för oss; vår designavdelning skapar skräddarsydda fördelare och specialkomponenter.",
    "interest": "Beratung",
    "done": "Vår designavdelning granskar din förfrågan och återkommer."
  },
  "co2_rechner": {
    "kicker": "CO2-besparing",
    "head": "Låt oss validera din projekts klimatavtryck.",
    "short": "Begär detaljerad CO2-rapport",
    "text": "Kalkylatorn ger initiala uppskattningar. Skicka oss den exakta materiallistan så utfärdar vi ett detaljerat certifikat på CO2-besparingen jämfört med metallrör för din hållbarhetsrevision.",
    "interest": "Beratung",
    "done": "En hållbarhetsexpert kommer att kontakta dig angående certifikatet."
  },
  "trust_center": {
    "kicker": "Certifikat & Standarder",
    "head": "Behöver du ett specifikt certifikat för byggnadsbesiktningen?",
    "short": "Begär certifikat för besiktning",
    "text": "Om besiktningsmannen frågar efter ett specifikt dokument (DVGW, SKZ, KIWA), ange vilken standard det gäller. Vi skickar det aktuella dokumentet direkt som PDF.",
    "interest": "BIM Daten",
    "done": "Vi letar fram rätt certifikat och skickar det till dig."
  },
  "projektanfrage": {
    "kicker": "Projektstart",
    "head": "Ge oss grunddatat, vi levererar en första budget.",
    "short": "Snabb budgetuppskattning för byggherrar",
    "text": "Ladda upp dina ritningar i nästa steg, eller ring oss och uppge ungefärliga kvadratmeter och användningstyp. Vi ger dig en initial prisuppskattning.",
    "interest": "Rohrsysteme",
    "done": "Projektteamet kommer att kontakta dig för att diskutera budgeten."
  },
  "kontakt": {
    "kicker": "Direktlinje",
    "head": "Din snabbaste väg till K Aqua HQ.",
    "short": "Vi ringer dig på byggarbetsplatsen",
    "text": "Inga telefonköer. Ange ditt nummer och ange det allmänna ämnet. Rätt fackrådgivare från försäljning eller teknik kommer att kontakta dig omgående.",
    "interest": "Beratung",
    "done": "Din förfrågan har mottagits. Rätt rådgivare ringer upp strax."
  },
  "news": {
    "kicker": "Press & Media",
    "head": "Frågor om ett pressmeddelande eller ny produkt?",
    "short": "Kontakt för företagskommunikation",
    "text": "För högupplösta bilder, intervjuer med ledningen eller teknisk bakgrundsinformation om våra innovationer – lämna bara dina kontaktuppgifter.",
    "interest": "Beratung",
    "done": "Vår pressavdelning kommer att kontakta dig inom kort."
  },
  "karriere": {
    "kicker": "Karriär hos K-Aqua",
    "head": "Ställ en informell fråga om våra lediga tjänster.",
    "short": "Kort väg till personalavdelningen",
    "text": "Är du osäker på om din profil passar, eller vill du klargöra detaljer om det dagliga arbetet innan du ansöker? Vårt HR-team besvarar enkelt dina frågor via telefon.",
    "interest": "Beratung",
    "done": "Personalavdelningen kontaktar dig för en kort introduktion."
  },
  "partnerschaft": {
    "kicker": "Bli en Återförsäljare",
    "head": "Utöka ditt sortiment med tyska premiumrör.",
    "short": "Fråga om villkor för återförsäljare",
    "text": "Är du en grossist som söker en pålitlig PP-R-leverantör? Ange din region och målgrupp, så diskuterar vi exklusivitetsmodeller och återförsäljarvillkor.",
    "interest": "Beratung",
    "done": "Vår försäljningschef för partnerskap kommer att kontakta dig."
  },
  "impressum": {
    "kicker": "Juridiskt",
    "head": "Frågor om våra företagsdetaljer?",
    "short": "Kontakta K Aqua-sekretariatet",
    "text": "Lämna ditt telefonnummer här om du har juridiska eller formella frågor om vårt företag.",
    "interest": "Beratung",
    "done": "Vi kommer att kontakta dig för att klargöra dina frågor."
  },
  "datenschutz": {
    "kicker": "Integritetsskydd",
    "head": "Prata med vårt dataskyddsombud.",
    "short": "Begär information om dina data",
    "text": "Vi tar din integritet på allvar. Lämna dina kontaktuppgifter om du vill ha information om, radering av, eller detaljer kring behandlingen av dina data.",
    "interest": "Beratung",
    "done": "Dataskyddsombudet kommer att kontakta dig omgående."
  },
  "fallback": {
    "kicker": "Kontakt",
    "head": "Prata direkt med våra ingenjörer.",
    "short": "Direktlinje till våra ingenjörer",
    "text": "Telefonnummer, e-post, ett klick på ditt ämne. Det är allt som krävs, vi tar resten när vi pratar.",
    "interest": "Beratung",
    "done": "En teknisk rådgivare kommer att kontakta dig inom en arbetsdag."
  }
};

const fileStr = fs.readFileSync('messages/sv.json', 'utf8');
let replacementText = JSON.stringify(kontaktBlocks, null, 2);
const toReplace = `  "kontaktBlocks": ${replacementText.split('\n').map((line, i) => i === 0 ? line : '  ' + line).join('\n')}`;
fs.writeFileSync('kontaktBlocks_sv_payload.txt', toReplace);
