import json
import os

missing_de = {
    "accessories_backing-flange-pp-steel-sfbf": "Losflansch PP-Stahl (SF/BF)",
    "tools_pipe-cutter-50125": "Rohrabschneider d50-d125",
    "tools_hand-welding-machine-2032-complete-set": "Hand-Schweißgerät d20-d32",
    "valves_tee-90-female-thread-for-internal-valve": "T-Stück 90° (IG) für UP-Ventil",
    "valves_pp-r-ball-valve-ball-in-brass-chromium-plated": "PP-R Kugelhahn (Messing/Chrom)",
    "fittings_cross-over-with-socket": "PP-R Übersprungsbogen mit Muffe",
    "fittings_elbow-90-femalemale": "PP-R Winkel 90° IG/AG",
    "fittings_elbow-90-large-sizes": "PP-R Standard Winkel 90° (Groß)",
}

missing_ar = {
    "accessories_backing-flange-pp-steel-sfbf": "فلنجة دعم (SF/BF)",
    "tools_pipe-cutter-50125": "قاطع أنابيب d50-d125",
    "tools_hand-welding-machine-2032-complete-set": "آلة لحام يدوية d20-d32",
    "valves_tee-90-female-thread-for-internal-valve": "تي 90° (سن داخلي) للصمام الداخلي",
    "valves_pp-r-ball-valve-ball-in-brass-chromium-plated": "صمام كروي PP-R (نحاس/كروم)",
    "fittings_cross-over-with-socket": "وصلة عبور PP-R مع مقبس",
    "fittings_elbow-90-femalemale": "كوع PP-R 90° داخلي/خارجي",
    "fittings_elbow-90-large-sizes": "كوع PP-R قياسي 90° (كبير)",
}

def patch_file(file_path, updates):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    if "productNames" not in data:
        data["productNames"] = {}
        
    for k, v in updates.items():
        data["productNames"][k] = v
        
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

patch_file('messages/de.json', missing_de)
patch_file('messages/ar.json', missing_ar)
print("Messages patched.")
