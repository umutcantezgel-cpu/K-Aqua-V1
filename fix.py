with open("ko_merged_end.json", "r", encoding="utf-8") as f:
    merged = f.read().strip()
    # merged is { "markets": ..., "seoArticle": ..., "kontaktBlocks": ... }
    # I want to take the inside and append it.
    inner = merged[1:-1].strip()

with open("fix.txt", "w", encoding="utf-8") as f:
    f.write('      "desc": "냉수 및 공조 시스템에 대한 플래닝 문의."\n    }\n  },\n  ' + inner + '\n}')
