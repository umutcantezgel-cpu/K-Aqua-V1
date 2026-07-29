const fs = require('fs');

const hu = {
  "service": {
    "eyebrow": "Szolgáltatások",
    "title1": "Ügyfélszolgálat &",
    "titleGrad": "Szakértelem.",
    "lead": "Ügyfélszolgálatunk és szakértelmünk. Műszaki dokumentációk letöltését és lépésről lépésre bemutató videókat biztosítunk minden hegesztési eljáráshoz.",
    "dlEyebrow": "Letöltések",
    "dlTitle": "Műszaki Dokumentációk",
    "downloads": [
      {
        "t": "K-Aqua Termékprogram",
        "s": "Teljes katalógus méretekkel és cikkekkel"
      },
      {
        "t": "K-Aqua Terméktulajdonságok",
        "s": "Műszaki jellemzők és anyagadatok"
      },
      {
        "t": "K-Aqua Minőségbiztosítás",
        "s": "Vizsgálati eljárások és minőségi szabványok"
      }
    ],
    "vidEyebrow": "Telepítés",
    "vidTitle": "Hegesztési Eljárások Videón",
    "vidLead": "Négy eljárás, négy videó, egyenesen a gyakorlatból.",
    "videos": [
      {
        "t": "Tokos hegesztés kézi hegesztőgéppel",
        "s": "PP-R/PPRCT cső és idom"
      },
      {
        "t": "Tokos hegesztés hegesztőgéppel",
        "s": "PP-R tokos hegesztés (Socket Welding)"
      },
      {
        "t": "Elektrofúziós hegesztés (Electrofusion)",
        "s": "PP-R/PPRCT cső és idom"
      },
      {
        "t": "Tompahegesztés (Butt Fusion)",
        "s": "PP-R/PPRCT nagy méretek"
      }
    ]
  }
};

const lines = JSON.stringify(hu, null, 2).split('\n');
const inner = lines.slice(1, -1).map(l => '  ' + l).join('\n');
fs.writeFileSync('replace_service.txt', inner);
