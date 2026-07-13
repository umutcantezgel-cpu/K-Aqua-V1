from bs4 import BeautifulSoup
import sys
from collections import Counter

with open(sys.argv[1], 'r') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

texts = [p.get_text(strip=True) for p in soup.find_all('p') if len(p.get_text(strip=True)) > 50]
c = Counter(texts)
for k, v in c.items():
    if v > 1:
        print(f"Count: {v}\nText: {k[:100]}...\n")
