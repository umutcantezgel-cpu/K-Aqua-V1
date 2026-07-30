const fs = require('fs');

const missing = {
  "solutions": {
    "index": {
      "bento": {
        "eyebrow": "Application Areas",
        "title": "Built for Extremes.",
        "lead": "Von hygienisch sensibler Trinkwasserversorgung bis zum Transport hochaggressiver Chemikalien. Die Einsatzgrenzen des K-AQUA Systems übersteigen herkömmliche Standards.",
        "items": [
          {
            "title": "Trinkwasserhygiene & Sanitär",
            "desc": "Absolute Lebensmittelechtheit und toxikologische Unbedenklichkeit. Verhinderung von Legionellenbildung durch opakes, lichtundurchlässiges Materialdesign."
          },
          {
            "title": "HVAC & Klimatechnik",
            "desc": "Hocheffiziente thermische Isolation durch geringe Wärmeleitfähigkeit. Kondensatminimierung bei Kühlwasserleitungen."
          },
          {
            "title": "Druckluftnetzwerke",
            "desc": "Leckagefreie Übertragung bei extremen Arbeitsdrücken. Keine Kontamination der Druckluft durch Rost oder abplatzende Partikel."
          },
          {
            "title": "Schiffbau & Offshore",
            "desc": "Resistent gegen saline Umgebungen und massive Vibrationen. Erhebliche Gewichtsreduktion im Vergleich zu Stahlinstallationen."
          },
          {
            "title": "Industrieller Fluidtransport",
            "desc": "Kompromisslose Performance beim Transport aggressiver Chemikalien, abrasiver Schlämme oder hochreiner Prozessflüssigkeiten. Das K-AQUA System garantiert eine ununterbrochene, sichere Produktion."
          }
        ]
      },
      "stats": {
        "0": {
          "label": "Jahre garantierte Lebensdauer",
          "desc": "Unter Standard-Betriebsbedingungen (20°C / 10 bar) übersteigt die Haltbarkeit von K-AQUA PPR-Systemen problemlos ein halbes Jahrhundert ohne signifikante Materialdegradation."
        },
        "1": {
          "label": "W/mK Wärmeleitfähigkeit",
          "desc": "Im Vergleich zu Kupfer (380 W/mK) oder Stahl (50 W/mK) isoliert K-AQUA von Natur aus, was massive Einsparungen bei externer Dämmung und Energieverlusten bedeutet."
        },
        "2": {
          "label": "Homogene Verbindungen",
          "desc": "Durch molekulares Schweißen entsteht ein absolut nahtloses System. Das Rohr und der Fitting werden zu einer einzigen, untrennbaren Komponente fusioniert."
        },
        "title": "Ingenieurskunst in Zahlen."
      },
      "cta": {
        "eyebrow": "PROJEKT-INITIIERUNG",
        "title1": "BEREIT FÜR DIE",
        "title2": "NÄCHSTE DIMENSION.",
        "desc": "Kontaktieren Sie unsere Ingenieure für eine detaillierte technische Evaluation Ihrer Spezifikationen und Herausforderungen.",
        "button1": "Ingenieursteam kontaktieren",
        "button2": "Spezifikationen ansehen"
      }
    },
    "rechenzentrum": {
      "scroll": {
        "items": [
          {
            "title": "Die thermische Herausforderung von KI und HPC",
            "desc": "Moderne High-Performance Computing (HPC) und Künstliche Intelligenz (KI) Racks produzieren immense Abwärme. Luftkühlung allein stößt an ihre physikalischen Grenzen. Die Zukunft gehört Liquid Cooling und damit Wasser als kritischem Wärmeträgermedium direkt am Chip."
          },
          {
            "title": "Korrosion ist der Feind der Verfügbarkeit",
            "desc": "Metallische Rohrleitungssysteme unterliegen im Dauerbetrieb Lochfraß, Rost und chemischer Zersetzung. Ein Mikroriss in einem Rechenzentrum kann Millionenschäden durch Serverausfälle verursachen. K Aqua eliminiert dieses Risiko durch zu 100 % korrosionsfreies Polypropylen Random Copolymer (PP-R)."
          },
          {
            "title": "Ultraschall-verschweißte Molekularverbindungen",
            "desc": "Wo herkömmliche Rohre auf fehleranfällige Dichtungen oder Schraubverbindungen setzen, verschmelzen K Aqua Systeme auf molekularer Ebene. Das Resultat: Ein vollkommen homogenes, absolut leckagefreies Pipelinenetzwerk. Zero-Tolerance für Undichtigkeiten."
          },
          {
            "title": "Nachhaltigkeit & PUE-Optimierung",
            "desc": "Ein niedriger PUE-Wert (Power Usage Effectiveness) ist der Heilige Gral der Data-Center-Betreiber. K Aqua Rohre verfügen über exzellente thermodynamische Eigenschaften. Geringere Rohrreibungsverluste und optimale Wärmeisolation minimieren Energieverluste bei der Kühlwasserzirkulation massiv."
          }
        ]
      },
      "timeline": {
        "items": [
          {
            "year": "Phase 1",
            "title": "Strömungssimulation & Design",
            "text": "Unsere Ingenieure analysieren die Kühlungsanforderungen des Rechenzentrums. Wir berechnen Volumenströme, eliminieren Flaschenhälse und dimensionieren das Rohrnetz auf maximale hydrodynamische Effizienz."
          },
          {
            "year": "Phase 2",
            "title": "Präzisions-Vorfertigung",
            "text": "Im Stammwerk in Deutschland werden komplexe Verteiler-Spools nach Maß vorgefertigt. Zentimetergenau, vollautomatisiert und unter Laborbedingungen qualitätsgesichert."
          },
          {
            "year": "Phase 3",
            "title": "Just-In-Time Logistik",
            "text": "Megaprojekte verzeihen keine Lieferverzögerungen. Wir koordinieren die weltweite Logistik direkt auf das Baufeld, synchronisiert mit dem strengen Takt der Generalunternehmer."
          },
          {
            "year": "Phase 4",
            "title": "Homogene Verschweißung",
            "text": "Lokale Installationsteams werden durch K Aqua Master-Schweißer geprüft. Die molekulare Verschweißung auf der Baustelle garantiert eine 100 % leckagefreie, homogene Leitungsstruktur ohne Schwachstellen."
          },
          {
            "year": "Phase 5",
            "title": "Druckprüfung & Prüfung",
            "text": "Vor der Übergabe erfolgt eine unerbittliche hydraulische Druck- und Belastungsprüfung. Erst wenn das System diese Tests besteht, erteilen wir die Freigabe und übernehmen die volle Systemgarantie."
          }
        ],
        "title": "Der Engineering-Prozess",
        "desc": "Von der hydrodynamischen Skizze bis zur finalen Abnahme: Wie wir globale Hyperscale-Infrastrukturen ohne Kompromisse und in Rekordzeit realisieren."
      },
      "section1": {
        "eyebrow": "Mission-Critical Cooling",
        "title": "Warum klassische Rohre scheitern.",
        "lead": "Die Anforderungen moderner Hyperscaler und KI-Cluster überschreiten die physikalischen Grenzen traditioneller Metallsysteme."
      },
      "section2": {
        "eyebrow": "Die Überlegenheit von PP-R",
        "title": "Materialwissenschaft für das 21. Jahrhundert.",
        "lead": "Jedes atomare Detail unseres Systems wurde für absolute Ausfallsicherheit und Dauerhaftigkeit optimiert."
      },
      "bento": {
        "items": [
          {
            "title": "Chemische Neutralität & Reinheit",
            "desc": "Geschlossene Kühlkreisläufe benötigen Konditionierungsmittel. K Aqua verhält sich absolut inert gegenüber aggressiven Additiven und verhindert Algen- sowie Biofilmbildung vollständig. Keine chemische Zersetzung, keine Partikel im Kühlwasser."
          },
          {
            "title": "Druckresilienz im Hochhaus",
            "desc": "Ausgelegt für konstante Höchstlasten unter extremen PN10 / PN20 Druckbedingungen in vertikalen Hochhaus-Rechenzentren."
          },
          {
            "title": "Deutsche Vorfertigung",
            "desc": "Wir schweißen komplexe Verteilerblöcke in unserem Stammwerk in Deutschland vor. Plug-and-Play Lieferung für drastisch verkürzte Bauzeiten."
          },
          {
            "title": "Erdbebensicher (Seismic Resistance)",
            "desc": "Im Gegensatz zu starren Metallsystemen verfügt unser PP-R-System über eine definierte intrinsische Elastizität. Schockwellen und massive Vibrationen durch Notstromaggregate oder starke seismische Aktivitäten werden absorbiert statt zerstörerische Brüche zu verursachen."
          }
        ]
      },
      "cta": {
        "title": "Bereit für kompromisslose Sicherheit?",
        "desc": "Verbinden Sie sich mit unserem Engineering Team. Wir analysieren Ihr nächstes Rechenzentrums-Megaprojekt und liefern die Infrastruktur der Zukunft.",
        "button": "Engineering-Gespräch vereinbaren"
      }
    }
  }
};

const translated = {
  "solutions": {
    "index": {
      "bento": {
        "eyebrow": "အသုံးပြုနိုင်သောနယ်ပယ်များ",
        "title": "အလွန်အမင်း ပြင်းထန်သော အခြေအနေများအတွက် တည်ဆောက်ထားသည်။",
        "lead": "သန့်ရှင်းမှု အလွန်အရေးကြီးသော သောက်သုံးရေပေးဝေမှုမှအစ အလွန်ပြင်းထန်သော ဓာတုဗေဒပစ္စည်းများ ပို့ဆောင်မှုအထိ။ K-AQUA စနစ်၏ အသုံးပြုနိုင်မှု ကန့်သတ်ချက်များသည် သာမန်စံချိန်စံညွှန်းများကို ကျော်လွန်ပါသည်။",
        "items": [
          {
            "title": "သောက်သုံးရေ သန့်ရှင်းရေးနှင့် ရေပိုက်စနစ်",
            "desc": "အစားအသောက်အတွက် အပြည့်အဝ ဘေးကင်းပြီး အဆိပ်အတောက်ကင်းစင်မှု။ အလင်းမပေါက်နိုင်သော ပစ္စည်းဒီဇိုင်းဖြင့် Legionella ဘက်တီးရီးယား ပေါက်ဖွားမှုကို ကာကွယ်ပေးခြင်း။"
          },
          {
            "title": "လေအေးပေးစက်နှင့် အပူပေးစနစ် (HVAC)",
            "desc": "အပူလျှပ်ကူးမှု နည်းပါးခြင်းကြောင့် အလွန်စွမ်းဆောင်ရည်မြင့်မားသော အပူကာကွယ်မှု။ အအေးပေးရေပိုက်များတွင် ရေငွေ့ရိုက်ခြင်းကို အနည်းဆုံးဖြစ်စေခြင်း။"
          },
          {
            "title": "လေဖိအားသုံး ကွန်ရက်များ",
            "desc": "အလွန်မြင့်မားသော အလုပ်လုပ်ဖိအားများတွင် ယိုစိမ့်မှုကင်းစင်စွာ ပို့ဆောင်ပေးခြင်း။ သံချေး သို့မဟုတ် ကွာကျနေသော အမှုန်များကြောင့် လေဖိအား ညစ်ညမ်းမှု မရှိခြင်း။"
          },
          {
            "title": "သင်္ဘောတည်ဆောက်ရေးနှင့် ကမ်းလွန်လုပ်ငန်း",
            "desc": "ဆားငန်သော ပတ်ဝန်းကျင်များနှင့် ကြီးမားသော တုန်ခါမှုများကို ခံနိုင်ရည်ရှိခြင်း။ သံမဏိတပ်ဆင်မှုများနှင့် နှိုင်းယှဉ်ပါက အလေးချိန် သိသိသာသာ လျော့နည်းခြင်း။"
          },
          {
            "title": "စက်မှုလုပ်ငန်းသုံး အရည်ပို့ဆောင်မှု",
            "desc": "ပြင်းထန်သော ဓာတုပစ္စည်းများ၊ ပွတ်တိုက်စားစေသော ရွှံ့နွံများ သို့မဟုတ် အလွန်သန့်စင်သော လုပ်ငန်းစဉ်အရည်များကို ပို့ဆောင်ရာတွင် အလျှော့ပေးမှုမရှိသော စွမ်းဆောင်ရည်။ K-AQUA စနစ်သည် အဆက်မပြတ်၊ ဘေးကင်းသော ထုတ်လုပ်မှုကို အာမခံပါသည်။"
          }
        ]
      },
      "stats": {
        "0": {
          "label": "နှစ်ပေါင်း အာမခံသက်တမ်း",
          "desc": "စံသတ်မှတ်ထားသော လည်ပတ်မှုအခြေအနေများအောက်တွင် (20°C / 10 bar)၊ K-AQUA PPR စနစ်များ၏ ကြာရှည်ခံနိုင်မှုသည် သိသာထင်ရှားသော ပစ္စည်းပျက်စီးယိုယွင်းမှုမရှိဘဲ ရာစုနှစ်ဝက်ကျော်လွန်ပါသည်။"
        },
        "1": {
          "label": "W/mK အပူလျှပ်ကူးနိုင်စွမ်း",
          "desc": "ကြေးနီ (380 W/mK) သို့မဟုတ် သံမဏိ (50 W/mK) တို့နှင့် နှိုင်းယှဉ်ပါက K-AQUA သည် သဘာဝအတိုင်း အပူကာကွယ်ပေးပြီး ပြင်ပအပူကာကွယ်မှုနှင့် စွမ်းအင်ဆုံးရှုံးမှုများတွင် ကြီးမားသော သက်သာမှုကို ဆိုလိုသည်။"
        },
        "2": {
          "label": "တစ်သားတည်းဖြစ်သော ချိတ်ဆက်မှုများ",
          "desc": "မော်လီကျူးအဆင့် ဆက်စပ်ခြင်းဖြင့် အပြည့်အဝ အပေါက်အပြဲမရှိသော စနစ်ကို ဖန်တီးသည်။ ပိုက်နှင့် ဆက်သွယ်ရေးပစ္စည်းသည် ခွဲခြား၍မရသော တစ်ခုတည်းသော အစိတ်အပိုင်းအဖြစ် ပေါင်းစပ်သွားသည်။"
        },
        "title": "အင်ဂျင်နီယာအတတ်ပညာ၏ ကိန်းဂဏန်းများ။"
      },
      "cta": {
        "eyebrow": "စီမံကိန်း စတင်ခြင်း",
        "title1": "နောက်ထပ် အတိုင်းအတာတစ်ခုအတွက်",
        "title2": "အသင့်ဖြစ်ပြီလား။",
        "desc": "သင့်သတ်မှတ်ချက်များနှင့် စိန်ခေါ်မှုများကို အသေးစိတ် နည်းပညာပိုင်းဆိုင်ရာ အကဲဖြတ်ရန် ကျွန်ုပ်တို့၏ အင်ဂျင်နီယာများကို ဆက်သွယ်ပါ။",
        "button1": "အင်ဂျင်နီယာအဖွဲ့ကို ဆက်သွယ်ရန်",
        "button2": "သတ်မှတ်ချက်များကို ကြည့်ရှုရန်"
      }
    },
    "rechenzentrum": {
      "scroll": {
        "items": [
          {
            "title": "AI နှင့် HPC တို့၏ အပူပိုင်းဆိုင်ရာ စိန်ခေါ်မှု",
            "desc": "ခေတ်မီ High-Performance Computing (HPC) နှင့် Artificial Intelligence (AI) ရပ်ကွက်များသည် ကြီးမားသော အပူကို ထုတ်လွှတ်သည်။ လေအေးပေးခြင်းတစ်ခုတည်းဖြင့် ၎င်း၏ ရုပ်ပိုင်းဆိုင်ရာ ကန့်သတ်ချက်များသို့ ရောက်ရှိနေပြီဖြစ်သည်။ အနာဂတ်သည် Liquid Cooling အတွက်ဖြစ်ပြီး၊ ထို့ကြောင့် ရေကို ချစ်ပ်ပြားပေါ်တွင် တိုက်ရိုက် အရေးကြီးသော အပူသယ်ဆောင်ရာ ကြားခံအဖြစ် အသုံးပြုသည်။"
          },
          {
            "title": "သံချေးတက်ခြင်းသည် ရရှိနိုင်မှု၏ ရန်သူဖြစ်သည်",
            "desc": "သတ္တုပိုက်စနစ်များသည် အဆက်မပြတ် လည်ပတ်နေစဉ်အတွင်း အပေါက်ဖြစ်ခြင်း၊ သံချေးတက်ခြင်းနှင့် ဓာတုဗေဒဆိုင်ရာ ယိုယွင်းမှုတို့ကို ခံစားရသည်။ ဒေတာစင်တာတစ်ခုရှိ အဏုစိတ်အက်ကွဲမှုတစ်ခုသည် ဆာဗာချို့ယွင်းမှုများမှတစ်ဆင့် ဒေါ်လာသန်းပေါင်းများစွာ ပျက်စီးမှုကို ဖြစ်စေနိုင်သည်။ K Aqua သည် 100% သံချေးကင်းစင်သော Polypropylene Random Copolymer (PP-R) ဖြင့် ဤအန္တရာယ်ကို ဖယ်ရှားပေးပါသည်။"
          },
          {
            "title": "အာထရာဆောင်းဖြင့် ဆက်စပ်ထားသော မော်လီကျူးချိတ်ဆက်မှုများ",
            "desc": "ရိုးရာပိုက်များသည် ချို့ယွင်းလွယ်သော တံဆိပ်များ သို့မဟုတ် ဝက်အူချိတ်ဆက်မှုများအပေါ် အားကိုးနေရသော်လည်း၊ K Aqua စနစ်များသည် မော်လီကျူးအဆင့်တွင် ပေါင်းစပ်သွားသည်။ ရလဒ်အနေဖြင့် - အပြည့်အဝ တစ်သားတည်းဖြစ်ပြီး၊ အကြွင်းမဲ့ ယိုစိမ့်မှုကင်းစင်သော ပိုက်လိုင်းကွန်ရက်။ ယိုစိမ့်မှုများအတွက် သုည-သည်းခံမှု။"
          },
          {
            "title": "ရေရှည်တည်တံ့မှုနှင့် PUE ပိုမိုကောင်းမွန်အောင်လုပ်ခြင်း",
            "desc": "နိမ့်သော PUE (Power Usage Effectiveness) တန်ဖိုးသည် ဒေတာစင်တာ လည်ပတ်သူများ၏ အမြင့်ဆုံးပန်းတိုင်ဖြစ်သည်။ K Aqua ပိုက်များသည် အထူးကောင်းမွန်သော အပူလှုပ်ရှားမှု ဂုဏ်သတ္တိများရှိသည်။ ပိုက်ပွတ်တိုက်မှု ဆုံးရှုံးမှုများ နည်းပါးခြင်းနှင့် အကောင်းဆုံး အပူကာကွယ်ခြင်းသည် အအေးပေးရေလည်ပတ်မှုအတွင်း စွမ်းအင်ဆုံးရှုံးမှုများကို သိသာစွာ လျှော့ချပေးသည်။"
          }
        ]
      },
      "timeline": {
        "items": [
          {
            "year": "အဆင့် ၁",
            "title": "စီးဆင်းမှု သရုပ်ပြခြင်းနှင့် ဒီဇိုင်း",
            "desc": "ကျွန်ုပ်တို့၏ အင်ဂျင်နီယာများသည် ဒေတာစင်တာ၏ အအေးပေးရန် လိုအပ်ချက်များကို ခွဲခြမ်းစိတ်ဖြာသည်။ ကျွန်ုပ်တို့သည် ထုထည်စီးဆင်းမှုများကို တွက်ချက်ကာ၊ ပိတ်ဆို့မှုများကို ဖယ်ရှားပြီး ပိုက်ကွန်ရက်ကို အမြင့်ဆုံး အရည်စီးဆင်းမှု စွမ်းဆောင်ရည်အတွက် အရွယ်အစား သတ်မှတ်သည်။"
          },
          {
            "year": "အဆင့် ၂",
            "title": "တိကျသော ကြိုတင်ထုတ်လုပ်မှု",
            "desc": "ဂျာမနီရှိ ပင်မစက်ရုံတွင်၊ ရှုပ်ထွေးသော ဖြန့်ဖြူးရေးစပူးများကို တိုင်းတာထုတ်လုပ်သည်။ စင်တီမီတာအတိအကျ၊ အပြည့်အဝ အလိုအလျောက်နှင့် ဓာတ်ခွဲခန်း အခြေအနေများအောက်တွင် အရည်အသွေး အာမခံချက်ရှိသည်။"
          },
          {
            "year": "အဆင့် ၃",
            "title": "အချိန်ကိုက် ထောက်ပံ့ပို့ဆောင်ရေး",
            "desc": "ဧရာမစီမံကိန်းများသည် ပို့ဆောင်မှုနှောင့်နှေးခြင်းကို ခွင့်မလွှတ်ပါ။ ကျွန်ုပ်တို့သည် ပင်မကန်ထရိုက်တာများ၏ တင်းကျပ်သော အချိန်ဇယားနှင့်အညီ ကမ္ဘာတစ်ဝှမ်း ထောက်ပံ့ပို့ဆောင်ရေးကို ဆောက်လုပ်ရေးဆိုက်သို့ တိုက်ရိုက် ညှိနှိုင်းဆောင်ရွက်ပေးပါသည်။"
          },
          {
            "year": "အဆင့် ၄",
            "title": "တစ်သားတည်းဖြစ်အောင် ဆက်စပ်ခြင်း",
            "desc": "ဒေသခံ တပ်ဆင်ရေးအဖွဲ့များကို K Aqua ကျွမ်းကျင်ဂဟေဆော်သူများမှ စစ်ဆေးသည်။ ဆောက်လုပ်ရေးဆိုက်ရှိ မော်လီကျူးအဆင့် ဆက်စပ်ခြင်းသည် 100% ယိုစိမ့်မှုကင်းစင်ပြီး အားနည်းချက်များမရှိသော တစ်သားတည်းဖြစ်သည့် ပိုက်လိုင်းဖွဲ့စည်းပုံကို အာမခံပါသည်။"
          },
          {
            "year": "အဆင့် ၅",
            "title": "ဖိအားစမ်းသပ်ခြင်းနှင့် စစ်ဆေးခြင်း",
            "desc": "လွှဲပြောင်းမပေးမီ အကြွင်းမဲ့ ဟိုက်ဒရောလစ် ဖိအားနှင့် ဝန်စမ်းသပ်မှုကို ပြုလုပ်သည်။ စနစ်သည် ဤစမ်းသပ်မှုများကို အောင်မြင်မှသာ ကျွန်ုပ်တို့ ခွင့်ပြုချက်ထုတ်ပေးပြီး အပြည့်အဝ စနစ်အာမခံကို တာဝန်ယူပါသည်။"
          }
        ],
        "title": "အင်ဂျင်နီယာလုပ်ငန်းစဉ်",
        "desc": "အရည်စီးဆင်းမှု ပုံကြမ်းမှ နောက်ဆုံးလက်ခံမှုအထိ - အလျှော့ပေးမှုမရှိဘဲ စံချိန်တင်အချိန်အတွင်း ကမ္ဘာလုံးဆိုင်ရာ Hyperscale အခြေခံအဆောက်အအုံများကို ကျွန်ုပ်တို့ မည်သို့ အကောင်အထည်ဖော်ပုံ။"
      },
      "section1": {
        "eyebrow": "အလွန်အရေးကြီးသော အအေးပေးစနစ်",
        "title": "ရိုးရာပိုက်များ အဘယ်ကြောင့် ကျရှုံးသနည်း။",
        "lead": "ခေတ်မီ Hyperscalers များနှင့် AI အစုအဖွဲ့များ၏ လိုအပ်ချက်များသည် ရိုးရာသတ္တုစနစ်များ၏ ရုပ်ပိုင်းဆိုင်ရာ ကန့်သတ်ချက်များကို ကျော်လွန်နေသည်။"
      },
      "section2": {
        "eyebrow": "PP-R ၏ သာလွန်မှု",
        "title": "၂၁ ရာစုအတွက် ပစ္စည်းသိပ္ပံ။",
        "lead": "ကျွန်ုပ်တို့စနစ်၏ အက်တမ်အဆင့် အသေးစိတ်တိုင်းကို အကြွင်းမဲ့ ယုံကြည်စိတ်ချရမှုနှင့် တာရှည်ခံမှုအတွက် အကောင်းဆုံး ပြင်ဆင်ထားသည်။"
      },
      "bento": {
        "items": [
          {
            "title": "ဓာတုဗေဒဆိုင်ရာ ကြားနေမှုနှင့် သန့်စင်မှု",
            "desc": "ပိတ်ထားသော အအေးပေးစနစ်များသည် အခြေအနေထိန်းသိမ်းရေးပစ္စည်းများ လိုအပ်သည်။ K Aqua သည် ပြင်းထန်သော ဖြည့်စွက်ပစ္စည်းများကို လုံးဝတုံ့ပြန်မှုမရှိဘဲ အယ်လဂါနှင့် ဘက်တီးရီးယားလွှာ ဖြစ်ပေါ်မှုကို လုံးဝကာကွယ်ပေးသည်။ ဓာတုဗေဒဆိုင်ရာ ပြိုကွဲမှုမရှိ၊ အအေးပေးရေတွင် အမှုန်အမွှားများ မရှိပါ။"
          },
          {
            "title": "အထပ်မြင့်အဆောက်အအုံများတွင် ဖိအားခံနိုင်ရည်",
            "desc": "ဒေါင်လိုက် အထပ်မြင့် ဒေတာစင်တာများရှိ အလွန်ပြင်းထန်သော PN10 / PN20 ဖိအားအခြေအနေများအောက်တွင် အဆက်မပြတ် အမြင့်ဆုံးဝန်များအတွက် ဒီဇိုင်းထုတ်ထားသည်။"
          },
          {
            "title": "ဂျာမန် ကြိုတင်ထုတ်လုပ်မှု",
            "desc": "ကျွန်ုပ်တို့သည် ဂျာမနီရှိ ကျွန်ုပ်တို့၏ ပင်မစက်ရုံတွင် ရှုပ်ထွေးသော ဖြန့်ဖြူးရေးလုပ်ကွက်များကို ကြိုတင်ဂဟေဆက်သည်။ ဆောက်လုပ်ရေးအချိန်များကို သိသိသာသာ တိုတောင်းစေရန် Plug-and-Play ပို့ဆောင်မှု။"
          },
          {
            "title": "မြေငလျင်ဒဏ်ခံနိုင်ရည် (Seismic Resistance)",
            "desc": "တောင့်တင်းသော သတ္တုစနစ်များနှင့် မတူဘဲ၊ ကျွန်ုပ်တို့၏ PP-R စနစ်တွင် သတ်မှတ်ထားသော အတွင်းပိုင်း ပျော့ပျောင်းမှု ပါရှိသည်။ အရေးပေါ် လျှပ်စစ်ထုတ်စက်များ သို့မဟုတ် ပြင်းထန်သော ငလျင်လှုပ်ရှားမှုများကြောင့် ဖြစ်ပေါ်လာသော တုန်ခါမှုလှိုင်းများနှင့် ကြီးမားသော တုန်ခါမှုများကို ပျက်စီးစေသော အက်ကွဲမှုများ ဖြစ်စေမည့်အစား စုပ်ယူလိုက်သည်။"
          }
        ]
      },
      "cta": {
        "title": "အလျှော့ပေးမှုမရှိသော လုံခြုံရေးအတွက် အသင့်ဖြစ်ပြီလား။",
        "desc": "ကျွန်ုပ်တို့၏ အင်ဂျင်နီယာအဖွဲ့နှင့် ချိတ်ဆက်ပါ။ သင်၏ နောက်ထပ် ဒေတာစင်တာ ဧရာမစီမံကိန်းကို ကျွန်ုပ်တို့ ခွဲခြမ်းစိတ်ဖြာပြီး အနာဂတ်၏ အခြေခံအဆောက်အအုံကို ပံ့ပိုးပေးပါမည်။",
        "button": "အင်ဂျင်နီယာနှင့် ဆွေးနွေးရန် စီစဉ်ပါ"
      }
    }
  }
};

fs.writeFileSync('solutions_trans.json', JSON.stringify(translated, null, 2));

