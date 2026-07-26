import requests
from bs4 import BeautifulSoup
import xml.etree.ElementTree as ET

sitemap_url = "http://localhost:3003/sitemap.xml"
r = requests.get(sitemap_url)
root = ET.fromstring(r.content)

namespaces = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
urls = [elem.text for elem in root.findall('.//ns:loc', namespaces)]

h1_issues = []

for url in urls:
    local_url = url.replace("https://k-aqua.de", "http://localhost:3003")
    try:
        html = requests.get(local_url).text
        soup = BeautifulSoup(html, 'html.parser')
        
        h1s = soup.find_all('h1')
        
        if not h1s:
            h1_issues.append(f"{local_url}: Missing H1")
        elif len(h1s) > 1:
            h1_issues.append(f"{local_url}: Multiple H1s ({len(h1s)})")
            
    except Exception as e:
        pass

for i in h1_issues:
    print(i)
