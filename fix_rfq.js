const fs = require('fs');
let code = fs.readFileSync('components/tools/RfqWizard.tsx', 'utf8');

code = code.replace(
  '{step === 0 && (',
  '<div className={step === 0 ? "block" : "hidden"}>'
).replace(
  '                  </div>\n                )}\n\n                {/* Step 1: Bedarf */}',
  '                  </div>\n                </div>\n\n                {/* Step 1: Bedarf */}'
).replace(
  '{step === 1 && (',
  '<div className={step === 1 ? "block" : "hidden"}>'
).replace(
  '                  </div>\n                )}\n\n                {/* Step 2: Termin & Region */}',
  '                  </div>\n                </div>\n\n                {/* Step 2: Termin & Region */}'
).replace(
  '{step === 2 && (',
  '<div className={step === 2 ? "block" : "hidden"}>'
).replace(
  '                  </div>\n                )}\n\n                {/* Step 3: Kontakt */}',
  '                  </div>\n                </div>\n\n                {/* Step 3: Kontakt */}'
).replace(
  '{step === 3 && (',
  '<div className={step === 3 ? "block" : "hidden"}>'
).replace(
  '                  </div>\n                )}\n              </div>\n\n              {/* Wizard Footer Controls */}',
  '                  </div>\n                </div>\n              </div>\n\n              {/* Wizard Footer Controls */}'
);

fs.writeFileSync('components/tools/RfqWizard.tsx', code);
