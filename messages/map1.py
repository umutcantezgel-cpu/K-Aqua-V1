import json

translations = {
  "Our equipment team will check the inventory and get back to you promptly.": "ہماری آلات کی ٹیم انوینٹری چیک کرے گی اور فوری طور پر آپ سے رابطہ کرے گی۔",
  "The Academy team will contact you with suggested dates for training.": "اکیڈمی کی ٹیم تربیت کی تجویز کردہ تاریخوں کے ساتھ آپ سے رابطہ کرے گی۔",
  "The Lifeline for ": "کے لیے لائف لائن",
  "A pipeline construction engineer will contact you within one business day.": "ایک پائپ لائن تعمیراتی انجینئر ایک کاروباری دن کے اندر آپ سے رابطہ کرے گا۔",
  "We will contact you to coordinate your visit in Waldsolms.": "ہم والڈسولمز میں آپ کے دورے کو مربوط کرنے کے لیے آپ سے رابطہ کریں گے۔",
  "Arrange an appointment for a factory visit": "فیکٹری کے دورے کے لیے ملاقات کا وقت طے کریں",
  "ISO 9001:2015 Quality Management": "ISO 9001:2015 کوالٹی مینجمنٹ",
  "Sound-Absorbing Structure": "آواز جذب کرنے والی ساخت",
  "Give us rough parameters such as pipe diameter and route length. We will check the production capacities in our German plant and give you realistic delivery times.": "ہمیں پائپ قطر اور راستے کی لمبائی جیسے تخمینی پیرامیٹرز دیں۔ ہم اپنے جرمن پلانٹ میں پیداواری صلاحیتوں کو چیک کریں گے اور آپ کو حقیقت پسندانہ ترسیل کے اوقات دیں گے۔",
  "Where the failure of a cooling system can have catastrophic consequences, where the freshwater supply of thousands of passengers must be absolutely guaranteed, that is where our field of application begins. We set the standard that the rest of the world follows. A standard defined by absolute reliability.": "جہاں کولنگ سسٹم کی ناکامی کے تباہ کن نتائج ہو سکتے ہیں، جہاں ہزاروں مسافروں کو میٹھے پانی کی فراہمی کی بالکل ضمانت دی جانی چاہیے، وہیں سے ہماری درخواست کا میدان شروع ہوتا ہے۔ ہم نے وہ معیار مقرر کیا جس پر باقی دنیا چلتی ہے۔ مطلق وشوسنییتا کے ذریعہ بیان کردہ معیار۔",
  "In industrial cooling and building air conditioning, condensation, constant temperature fluctuations, and aggressive cooling media place extreme demands on the piping system. Metallic pipes react to this with condensate corrosion, insulation damage, and creeping pressure loss.": "صنعتی کولنگ اور بلڈنگ ایئر کنڈیشنگ میں، کنڈینسیشن، مسلسل درجہ حرارت میں اتار چڑھاؤ، اور جارحانہ کولنگ میڈیا پائپنگ سسٹم پر انتہائی مطالبات رکھتے ہیں۔ دھاتی پائپ گاڑھا ہونا سنکنرن، موصلیت کو پہنچنے والے نقصان، اور بڑھتے ہوئے دباؤ کے نقصان کے ساتھ اس پر ردعمل ظاہر کرتے ہیں۔",
  "K Aqua tests its industrial agricultural pipelines for operating scenarios that far exceed reality. We simulate extreme water hammers, corrosive chemical cocktails, and constant seismic micro-vibrations before a single pipe leaves our factory in Germany.": "K Aqua اپنی صنعتی زرعی پائپ لائنوں کو آپریٹنگ منظرناموں کے لیے جانچتا ہے جو حقیقت سے کہیں زیادہ ہیں۔ ایک پائپ کے جرمنی میں ہماری فیکٹری سے نکلنے سے پہلے ہم انتہائی پانی کے ہتھوڑوں، سنکنرن کیمیائی کاک ٹیلوں، اور مسلسل زلزلے کے مائیکرو وائبریشنز کی نقل کرتے ہیں۔",
  "Insulated Perfection": "موصل کمال",
  "We will research the requested component and call you.": "ہم درخواست کردہ جزو کی تحقیق کریں گے اور آپ کو کال کریں گے۔",
  "K-Pipe PPRCT SDR 7.4": "K-Pipe PPRCT SDR 7.4",
  "Superiority at the Molecular Level.": "مالیکیولر لیول پر برتری۔",
  "K Aqua MARITIME": "K Aqua بحری",
  "If your parameters (temperature, pressure, medium) are borderline, we will gladly take over the design. One call often saves hours of independent research.": "اگر آپ کے پیرامیٹرز (درجہ حرارت، دباؤ، درمیانے) بارڈر لائن ہیں، تو ہم خوشی سے ڈیزائن سنبھال لیں گے۔ ایک کال اکثر آزاد تحقیق کے گھنٹوں کی بچت کرتی ہے۔",
  "Request fittings for your PP-R system": "اپنے PP-R سسٹم کے لیے متعلقہ اشیاء کی درخواست کریں",
  "Chilled water systems made of steel inevitably suffer from corrosion, leading to pitting, leaks, and the gradual destruction of the system. K Aqua systems are 100% corrosion-resistant. No incrustation, no rust formation, no narrowing of the pipe cross-section over the entire lifespan of more than 50 years.": "سٹیل سے بنے ہوئے ٹھنڈے پانی کے نظام کو ناگزیر طور پر سنکنرن کا سامنا کرنا پڑتا ہے، جس سے گڑھا پڑنا، لیک ہونے اور سسٹم کی بتدریج تباہی ہوتی ہے۔ K Aqua سسٹمز 100% سنکنرن مزاحم ہیں۔ 50 سال سے زیادہ کی پوری عمر میں کوئی جڑاؤ، زنگ کی تشکیل، پائپ کے کراس سیکشن کا کوئی تنگ نہیں ہونا۔",
  "Whether socket welding or electrofusion technology: Tell us what dimensions are required on the construction site. We will take care of the right machines for rent or purchase.": "چاہے ساکٹ ویلڈنگ ہو یا الیکٹرو فیوژن ٹیکنالوجی: ہمیں بتائیں کہ تعمیراتی سائٹ پر کیا جہتیں درکار ہیں۔ ہم کرائے یا خریداری کے لیے صحیح مشینوں کا خیال رکھیں گے۔",
  "Factory Tour & Consulting": "فیکٹری ٹور اور کنسلٹنگ",
  "Fittings & Connectors": "فٹنگز اور کنیکٹرز",
  "A system planner will call you back for exact dimensioning.": "ایک سسٹم پلانر درست طول و عرض کے لیے آپ کو واپس کال کرے گا۔",
  "General Catalog": "جنرل کیٹلاگ",
  "One of our engineers will check your parameters and get back to you promptly.": "ہمارے انجینئرز میں سے ایک آپ کے پیرامیٹرز کو چیک کرے گا اور فوری طور پر آپ سے رابطہ کرے گا۔",
  "The right valve for your hydraulic requirements.": "آپ کی ہائیڈرولک ضروریات کے لیے صحیح والو۔",
  "The K Aqua Process": "K Aqua عمل",
  "Simple and safe installation thanks to prefabrication and welding technology": "پہلے سے تعمیر اور ویلڈنگ ٹیکنالوجی کی بدولت سادہ اور محفوظ تنصیب",
  "Tell us the pressure rating, medium, and route length roughly over the phone. Our engineers will check dimensioning and availability ex works and give you a reliable delivery date.": "ہمیں دباؤ کی درجہ بندی، درمیانے، اور راستے کی لمبائی تقریباً فون پر بتائیں۔ ہمارے انجینئر فیکٹری سے باہر جہت اور دستیابی کو چیک کریں گے اور آپ کو ایک قابل اعتماد ترسیل کی تاریخ دیں گے۔",
  "Dimensioning and delivery time for your piping project.": "آپ کے پائپنگ پروجیکٹ کے لیے طول و عرض اور ترسیل کا وقت۔",
  "Can't find a special custom size in the catalog? Briefly describe the required component, and we will search our entire inventory for you.": "کیٹلاگ میں کوئی خاص اپنی مرضی کے سائز نہیں مل سکتا؟ مطلوبہ جزو کو مختصر طور پر بیان کریں، اور ہم آپ کے لیے اپنی پوری انوینٹری تلاش کریں گے۔",
  "Let us shorten the search for the right system.": "آئیے ہم صحیح نظام کی تلاش کو مختصر کریں۔",
  "All article numbers and dimensions for your procurement.": "آپ کی خریداری کے لیے آرٹیکل کے تمام نمبر اور طول و عرض۔",
  "Are you planning a similar high-rise building or industrial hall? We will gladly share anonymized lessons learned and best practices from the large-scale projects shown here with you.": "کیا آپ اسی طرح کی اونچی عمارت یا صنعتی ہال کی منصوبہ بندی کر رہے ہیں؟ ہم خوشی سے آپ کے ساتھ یہاں دکھائے گئے بڑے پیمانے کے پروجیکٹس سے سیکھے گئے گمنام اسباق اور بہترین طریقہ کار کا اشتراک کریں گے۔",
  "Welding Tools": "ویلڈنگ کے اوزار",
  "Complete your installation with original accessories.": "اصلی لوازمات کے ساتھ اپنی تنصیب مکمل کریں۔",
  "Request spots in the K Aqua Academy": "K Aqua اکیڈمی میں اسپاٹس کی درخواست کریں",
  "Individual extrusion of K Aqua piping systems in our German main plant. Every batch is subject to high-resolution ultrasonic testing.": "ہمارے جرمن مین پلانٹ میں K Aqua پائپنگ سسٹم کا انفرادی اخراج۔ ہر بیچ ہائی ریزولوشن الٹراسونک ٹیسٹنگ کے تابع ہے۔",
  "A valve expert will send you the requested specifications shortly.": "ایک والو ماہر آپ کو مطلوبہ وضاحتیں جلد ہی بھیج دے گا۔",
  "We have pushed material science to its limits to create a piping system that doesn't fight the nature of the elements, but masters them. A system that doesn't burden the ship, but actively increases its lifespan and efficiency. This is the result of German engineering in its purest form.": "ہم نے میٹریل سائنس کو اس کی حدوں تک دھکیل دیا ہے تاکہ ایک ایسا پائپنگ سسٹم بنایا جا سکے جو عناصر کی نوعیت سے لڑتا نہیں ہے بلکہ ان میں مہارت رکھتا ہے۔ ایک ایسا نظام جو جہاز پر بوجھ نہیں ڈالتا، بلکہ اس کی زندگی اور کارکردگی کو فعال طور پر بڑھاتا ہے۔ یہ جرمن انجینئرنگ کا خالص ترین شکل میں نتیجہ ہے۔",
  "Spare Parts": "فالتو پرزے",
  "Transition pieces for your installation": "آپ کی تنصیب کے لیے ٹرانزیشن کے ٹکڑے",
  "Corrosion-Free Architecture": "سنکنرن سے پاک فن تعمیر",
  "From pipe clamps to insulation material: Tell us what you need. We ensure that the accessories fit seamlessly into the rest of the K Aqua system.": "پائپ کلیمپس سے لے کر موصلیت کے مواد تک: ہمیں بتائیں کہ آپ کو کیا ضرورت ہے۔ ہم اس بات کو یقینی بناتے ہیں کہ لوازمات باقی K Aqua سسٹم میں بغیر کسی رکاوٹ کے فٹ ہوں۔",
  "Certified Safety": "مصدقہ حفاظت",
  "The heart of our safety technology. Through polyfusion, the pipe and fitting merge at the molecular level into an inseparable, homogeneous unit. Without O-rings, without mechanical connecting elements that fatigue over time. The result is absolute tightness, even under the strongest pressure fluctuations and mechanical loads.": "ہماری حفاظتی ٹیکنالوجی کا دل۔ پولی فیوژن کے ذریعے، پائپ اور فٹنگ مالیکیولر لیول پر ایک لازم و ملزوم، یکساں اکائی میں ضم ہو جاتے ہیں۔ O-rings کے بغیر، میکانی جڑنے والے عناصر کے بغیر جو وقت کے ساتھ تھک جاتے ہیں۔ نتیجہ مکمل تنگی ہے، یہاں تک کہ دباؤ کے شدید اتار چڑھاؤ اور میکانکی بوجھ میں بھی۔",
  "Similar Projects": "اسی طرح کے پروجیکٹس"
}

with open('ur.json', 'r') as f:
    ur_data = json.load(f)

def replace_eng(node):
    if isinstance(node, dict):
        for k, v in node.items():
            if isinstance(v, str):
                for eng, ur in translations.items():
                    if eng == v:
                        node[k] = ur
            else:
                replace_eng(v)
    elif isinstance(node, list):
        for i, item in enumerate(node):
            if isinstance(item, str):
                for eng, ur in translations.items():
                    if eng == item:
                        node[i] = ur
            else:
                replace_eng(item)

replace_eng(ur_data)

with open('ur.json', 'w', encoding='utf-8') as f:
    json.dump(ur_data, f, ensure_ascii=False, indent=2)
