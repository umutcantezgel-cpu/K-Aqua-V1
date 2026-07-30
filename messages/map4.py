# -*- coding: utf-8 -*-
import json

with open('ur.json', 'r') as f: ur_data = json.load(f)

ur_data['seoArticle']['fittings']['seoTitle'] = "PP-R کے لیے پلاسٹک فٹنگز اور اجزاء"
ur_data['seoArticle']['fittings']['seoText'] = "K-Aqua PP-R فٹنگز کے ساتھ محفوظ اور یکساں رابطے۔ پائپ کی تنصیب میں اعلیٰ ترین مطالبات کے لیے ہماری فٹنگز کی وسیع رینج دریافت کریں۔"

with open('ur.json', 'w', encoding='utf-8') as f:
    json.dump(ur_data, f, ensure_ascii=False, indent=2)
