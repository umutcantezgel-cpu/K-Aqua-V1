# -*- coding: utf-8 -*-
import json

translations = {
  "Get to know the production behind K Aqua personally.": "K Aqua کے پیچھے کی پیداوار کو ذاتی طور پر جانیں۔",
  "Discover the design principles that make K Aqua the first choice for international MEP planners and general contractors.": "ڈیزائن کے ان اصولوں کو دریافت کریں جو K Aqua کو بین الاقوامی MEP منصوبہ سازوں اور جنرل کنٹریکٹرز کے لیے پہلا انتخاب بناتے ہیں۔",
  "SKZ Quality Monitoring": "SKZ کوالٹی مانیٹرنگ",
  "Choosing K Aqua is a mathematical certainty. Lower Total Cost of Ownership (TCO) paired with absolute operational reliability.": "K Aqua کا انتخاب ایک ریاضیاتی یقین ہے۔ کم ٹوٹل کاسٹ آف اونرشپ (TCO) کے ساتھ مطلق آپریشنل قابل اعتمادی۔",
  "System Transitions": "سسٹم ٹرانزیشنز",
  "Product Finder": "پروڈکٹ فائنڈر",
  "Request empirical values for your project": "اپنے پروجیکٹ کے لیے تجرباتی اقدار کی درخواست کریں",
  "GAEB 90 / GAEB XML": "GAEB 90 / GAEB XML",
  "Global Megaprojects": "عالمی میگا پروجیکٹس",
  "DIN EN ISO 15874": "DIN EN ISO 15874",
  "Valves & Fittings": "والوز اور فٹنگز",
  "We will get back to you with technical details on system compatibility.": "ہم سسٹم کی مطابقت پر تکنیکی تفصیلات کے ساتھ آپ سے رابطہ کریں گے۔",
  "High-Pressure Testing up to 25 Bar": "25 بار تک ہائی پریشر ٹیسٹنگ",
  "<span class=\"font-semibold\">K Aqua Polypropylene Systems (PP-R & PPRCT)</span> break this paradigm. Our piping networks are completely inert to corrosion, offer outstanding flow properties without incrustation, and have an intrinsic thermal insulation capacity that drastically reduces the need for external insulation. This is not a pipe, it is an infrastructural insurance policy.": "<span class=\"font-semibold\">K Aqua Polypropylene Systems (PP-R & PPRCT)</span> اس پیراڈائم کو توڑ دیتے ہیں۔ ہمارے پائپنگ نیٹ ورکس سنکنرن کے خلاف مکمل طور پر غیر فعال ہیں، بغیر انکرسٹیشن کے شاندار بہاؤ کی خصوصیات پیش کرتے ہیں، اور ان میں اندرونی تھرمل موصلیت کی صلاحیت ہے جو بیرونی موصلیت کی ضرورت کو نمایاں طور پر کم کرتی ہے۔ یہ ایک پائپ نہیں ہے، یہ ایک بنیادی ڈھانچے کی انشورنس پالیسی ہے۔",
  "Request fastenings and accessories": "فاسٹننگز اور لوازمات کی درخواست کریں",
  "A promise, cast in polymer.": "ایک وعدہ، پولیمر میں کاسٹ۔",
  "We do not believe in shortcuts. We believe in physical stress tests, redundant quality controls, and engineers who can sleep soundly every night knowing that the system they designed will hold up under all conceivable circumstances. K Aqua is not just a product. It is the distilled trust of the maritime industry.": "ہم شارٹ کٹس پر یقین نہیں رکھتے۔ ہم فزیکل سٹریس ٹیسٹ، بے کار کوالٹی کنٹرولز، اور ایسے انجینئرز پر یقین رکھتے ہیں جو ہر رات یہ جان کر سکون کی نیند سو سکتے ہیں کہ ان کا ڈیزائن کردہ نظام ہر ممکنہ حالات میں برقرار رہے گا۔ K Aqua صرف ایک پروڈکٹ نہیں ہے۔ یہ سمندری صنعت کا کشیدہ اعتماد ہے۔",
  "Send us the dimensions and quantities of the fittings you need. We will estimate availability and, if desired, recommend optimizations for hydraulic balancing.": "ہمیں درکار فٹنگز کے طول و عرض اور مقدار بھیجیں۔ ہم دستیابی کا تخمینہ لگائیں گے اور، اگر چاہیں تو، ہائیڈرولک توازن کے لیے اصلاح کی سفارش کریں گے۔",
  "Give us the exact thread dimensions and the material of the existing pipes. We recommend corrosion-free transitions that guarantee permanent tightness.": "ہمیں موجودہ پائپوں کے صحیح دھاگے کے طول و عرض اور مواد بتائیں۔ ہم سنکنرن سے پاک ٹرانزیشن کی تجویز کرتے ہیں جو مستقل تنگی کی ضمانت دیتے ہیں۔",
  "Our engineers analyze the topological and climatic conditions of the agricultural project via satellite databases and create a hydrodynamic profile.": "ہمارے انجینئرز سیٹلائٹ ڈیٹا بیس کے ذریعے زرعی منصوبے کے ٹاپولوجیکل اور ماحولیاتی حالات کا تجزیہ کرتے ہیں اور ایک ہائیڈرو ڈائنامک پروفائل بناتے ہیں۔",
  "Homogeneous Welding": "یکساں ویلڈنگ",
  "Bill of materials check for your fittings and connections.": "آپ کی فٹنگز اور کنکشنز کے لیے مواد کے بل کی جانچ۔",
  "Rent or buy welding tools": "ویلڈنگ کے اوزار کرائے پر لیں یا خریدیں۔",
  "A technician will contact you to select the right transition.": "صحیح ٹرانزیشن کو منتخب کرنے کے لیے ایک ٹیکنیشن آپ سے رابطہ کرے گا۔",
  "DVGW Approval": "DVGW کی منظوری",
  "Modern air conditioning systems require whisper-quiet operation. K Aqua plastic piping systems absorb flow noises and pump vibrations significantly more effectively than metallic alternatives. This enables use in noise-sensitive zones such as operating theaters, luxury hotels, and concert halls without complex secondary sound insulation.": "جدید ایئر کنڈیشنگ سسٹم کو خاموش آپریشن کی ضرورت ہوتی ہے۔ K Aqua پلاسٹک کے پائپنگ سسٹم دھاتی متبادلات کے مقابلے میں بہاؤ کے شور کو جذب کرتے ہیں اور پمپ کے وائبریشن کو نمایاں طور پر زیادہ موثر طریقے سے جذب کرتے ہیں۔ یہ شور کے حوالے سے حساس زونز جیسے آپریٹنگ تھیٹر، لگژری ہوٹلز، اور کنسرٹ ہالز میں پیچیدہ ثانوی آواز کی موصلیت کے بغیر استعمال کے قابل بناتا ہے۔",
  "Book a practical seminar for your installers.": "اپنے انسٹالرز کے لیے ایک عملی سیمینار بک کریں۔",
  "K Aqua agricultural systems are certified by the most renowned international testing institutes. We don't just meet standards, we often redefine them.": "K Aqua کے زرعی سسٹمز کو سب سے مشہور بین الاقوامی جانچ کے اداروں نے تصدیق کی ہے۔ ہم صرف معیارات پر پورا نہیں اترتے، ہم اکثر ان کی نئی تعریف کرتے ہیں۔",
  "Fully recyclable and environmentally friendly": "مکمل طور پر ری سائیکل کے قابل اور ماحول دوست",
  "Our PP-R and PPRCT systems naturally have extremely low thermal conductivity. This largely eliminates the risk of condensation forming on the outside of the pipe, a critical factor in modern air conditioning technology. Unlike metallic systems, expensive and time-consuming additional insulation is often unnecessary.": "ہمارے PP-R اور PPRCT سسٹمز میں قدرتی طور پر انتہائی کم تھرمل چالکتا ہوتی ہے۔ اس سے پائپ کے باہر کنڈینسیشن بننے کا خطرہ بڑی حد تک ختم ہو جاتا ہے، جو جدید ایئر کنڈیشنگ ٹیکنالوجی کا ایک اہم عنصر ہے۔ دھاتی نظام کے برعکس، مہنگی اور وقت طلب اضافی موصلیت اکثر غیر ضروری ہوتی ہے۔",
  "Direct Contact": "براہ راست رابطہ",
  "Homogeneous welded connections directly on site. Our thermoplastic fusion technology creates a monolithic piping system without weak points or seals.": "سائٹ پر براہ راست یکساں ویلڈیڈ کنکشن۔ ہماری تھرمو پلاسٹک فیوژن ٹیکنالوجی کمزور پوائنٹس یا سیل کے بغیر ایک یک سنگی پائپنگ سسٹم بناتی ہے۔",
  "Download Documentation": "دستاویزات ڈاؤن لوڈ کریں۔",
  "High chemical resistance to ballast water, cooling media, and cleaning agents": "بیلسٹ پانی، کولنگ میڈیا، اور کلیننگ ایجنٹس کے خلاف اعلی کیمیائی مزاحمت",
  "100% maintenance-free over the entire service life": "پوری سروس لائف کے دوران 100% دیکھ بھال سے پاک",
  "Request Technical Consulting": "تکنیکی مشاورت کی درخواست کریں",
  "Our commitment does not end with delivery. We view ourselves as an integral partner in the entire shipbuilding value chain.": "ہماری وابستگی ترسیل کے ساتھ ختم نہیں ہوتی۔ ہم جہاز سازی کی پوری ویلیو چین میں خود کو ایک لازمی پارٹنر کے طور پر دیکھتے ہیں۔",
  "Secure material transitions from metal to plastic.": "دھات سے پلاسٹک تک محفوظ مادی ٹرانزیشن۔",
  "Secure the right tool for absolutely tight seams.": "بالکل تنگ سیون کے لیے صحیح ٹول کو محفوظ کریں۔"
}

with open('ur.json', 'r') as f: ur_data = json.load(f)

def replace_eng(node):
    if isinstance(node, dict):
        for k, v in node.items():
            if isinstance(v, str):
                for eng, ur in translations.items():
                    if eng == v: node[k] = ur
            else: replace_eng(v)
    elif isinstance(node, list):
        for i, item in enumerate(node):
            if isinstance(item, str):
                for eng, ur in translations.items():
                    if eng == item: node[i] = ur
            else: replace_eng(item)

replace_eng(ur_data)

with open('ur.json', 'w', encoding='utf-8') as f:
    json.dump(ur_data, f, ensure_ascii=False, indent=2)
