from deep_translator import PonsTranslator
try:
    print("Pons:", PonsTranslator(source='de', target='ro').translate("Hallo Welt"))
except Exception as e:
    print("Pons Error:", e)
