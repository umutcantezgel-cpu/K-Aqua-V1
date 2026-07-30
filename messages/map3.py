# -*- coding: utf-8 -*-
import json

translations = {
  "Give us a brief overview of which systems you want to connect. We will show you how to build a homogeneous and tight system with our portfolio.": "ہمیں اس بات کا مختصر جائزہ دیں کہ آپ کن سسٹمز کو جوڑنا چاہتے ہیں۔ ہم آپ کو دکھائیں گے کہ ہمارے پورٹ فولیو کے ساتھ ہم آہنگ اور سخت نظام کیسے بنایا جائے۔",
  "Questions about the compatibility of our PP-R components?": "ہمارے PP-R اجزاء کی مطابقت کے بارے میں سوالات؟",
  "Project Execution": "پروجیکٹ پر عمل درآمد",
  "Talk directly to production": "پروڈکشن سے براہ راست بات کریں۔",
  "The maritime industry is facing unprecedented challenges. Ships are getting larger, routes more extreme, and environmental regulations stricter. In this environment, traditional metallic piping systems are no longer up to date. They are heavy, prone to corrosion, and complex to install. K Aqua offers the paradigm shift.": "سمندری صنعت کو بے مثال چیلنجوں کا سامنا ہے۔ بحری جہاز بڑے ہو رہے ہیں، راستے زیادہ انتہائی، اور ماحولیاتی ضابطے سخت ہیں۔ اس ماحول میں، روایتی دھاتی پائپنگ سسٹم اب اپ ٹو ڈیٹ نہیں ہیں۔ وہ بھاری ہیں، سنکنرن کا شکار ہیں، اور نصب کرنے کے لیے پیچیدہ ہیں۔ K Aqua پیراڈائم شفٹ پیش کرتا ہے۔",
  "Leakage Tolerance": "رساو رواداری",
  "Secure the warranty through professional installation. Tell us the number of your employees and we will suggest dates for in-house or factory training.": "پیشہ ورانہ تنصیب کے ذریعے وارنٹی کو محفوظ کریں۔ ہمیں اپنے ملازمین کی تعداد بتائیں اور ہم اندرون خانہ یا فیکٹری ٹریننگ کے لیے تاریخیں تجویز کریں گے۔",
  "From the first hydrodynamic analysis to the final fusion on site. A fully orchestrated process for maximum scalability.": "پہلے ہائیڈرو ڈائنامک تجزیہ سے لے کر سائٹ پر حتمی فیوژن تک۔ زیادہ سے زیادہ اسکیل ایبلٹی کے لیے مکمل طور پر ترتیب دیا گیا عمل۔",
  "Start your next pipe project with solid figures.": "اپنے اگلے پائپ پروجیکٹ کو ٹھوس اعداد و شمار کے ساتھ شروع کریں۔",
  "Measurable superiority in every dimension of industrial refrigeration and air conditioning technology.": "صنعتی ریفریجریشن اور ایئر کنڈیشنگ ٹیکنالوجی کی ہر جہت میں قابل پیمائش برتری۔",
  "After commissioning the system, the infrastructure disappears from consciousness. It simply works. For the next 50+ years. Without a maintenance cycle.": "سسٹم کو شروع کرنے کے بعد، بنیادی ڈھانچہ شعور سے غائب ہو جاتا ہے۔ یہ بس کام کرتا ہے۔ اگلے 50+ سالوں تک۔ دیکھ بھال کے سائیکل کے بغیر۔",
  "Your accessories offer is currently being compiled.": "آپ کی لوازمات کی پیشکش فی الحال مرتب کی جا رہی ہے۔",
  "As a family-run company, we are happy to open our doors to planners and builders. Leave your contact details to arrange a visit to the Waldsolms plant.": "خاندانی طور پر چلنے والی کمپنی کے طور پر، ہم منصوبہ سازوں اور معماروں کے لیے اپنے دروازے کھول کر خوش ہیں۔ والڈسولمز پلانٹ کے دورے کا بندوبست کرنے کے لیے اپنے رابطے کی تفصیلات چھوڑیں۔",
  "Years Service Life": "سال سروس کی زندگی",
  "When a failure of the irrigation systems means the total loss of thousands of hectares of crops, conventional metrics are no longer sufficient. We measure reliability in generations.": "جب آبپاشی کے نظام کی ناکامی کا مطلب ہزاروں ہیکٹر فصلوں کا مکمل نقصان ہوتا ہے، تو روایتی میٹرکس اب کافی نہیں ہوتے۔ ہم نسلوں میں وشوسنییتا کی پیمائش کرتے ہیں۔",
  "Find valves for complex networks": "پیچیدہ نیٹ ورکس کے لیے والوز تلاش کریں۔",
  "Accessories & Fastening": "لوازمات اور بندھن",
  "Performance Parameters": "کارکردگی کے پیرامیٹرز",
  "DIN EN ISO 15874": "DIN EN ISO 15874",
  "Training & Certification": "تربیت اور سرٹیفیکیشن",
  "From Conception to Maiden Voyage.": "تصور سے میڈن وائیج تک۔",
  "Support with article search": "آرٹیکل کی تلاش میں مدد کریں۔",
  "Direct help with the product finder": "پروڈکٹ فائنڈر کے ساتھ براہ راست مدد",
  "Core Technology": "بنیادی ٹیکنالوجی",
  "Product Range": "پروڈکٹ کی حد",
  "GAEB 90 / GAEB XML": "GAEB 90 / GAEB XML",
  "Questions about PP-R pipes for your project": "آپ کے پروجیکٹ کے لیے PP-R پائپوں کے بارے میں سوالات",
  "Shut-off, control, or special valves: Briefly describe the maximum operating pressure and the pumped medium. We will forward the appropriate data sheets and availability to you.": "شٹ آف، کنٹرول، یا خصوصی والوز: زیادہ سے زیادہ آپریٹنگ پریشر اور پمپ شدہ میڈیم کو مختصراً بیان کریں۔ ہم آپ کو مناسب ڈیٹا شیٹس اور دستیابی بھیجیں گے۔",
  "Benefit from our experience with reference buildings.": "حوالہ عمارتوں کے ساتھ ہمارے تجربے سے فائدہ اٹھائیں۔",
  "Complete containerization and worldwide transport. Our systems are lightweight and optimized for transport to the most remote growing areas on earth.": "مکمل کنٹینرائزیشن اور دنیا بھر میں نقل و حمل۔ ہمارے سسٹمز ہلکے ہیں اور زمین کے دور دراز کے بڑھتے ہوئے علاقوں میں نقل و حمل کے لیے موزوں ہیں۔",
  "System consulting for K Aqua products": "K Aqua مصنوعات کے لیے سسٹم کنسلٹنگ",
  "Our technical sales team will contact you to discuss the bill of materials.": "ہماری تکنیکی فروخت کی ٹیم آپ سے مواد کے بل پر بات کرنے کے لیے رابطہ کرے گی۔"
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
