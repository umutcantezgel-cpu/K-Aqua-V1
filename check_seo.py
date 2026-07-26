import xml.etree.ElementTree as ET
import requests
import concurrent.futures

tree = ET.parse('temp_sitemap.xml')
root = tree.getroot()

urls = []
for child in root:
    loc = child.find('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')
    if loc is not None:
        urls.append(loc.text)

print(f"Found {len(urls)} URLs")

def check_url(url):
    try:
        r = requests.head(url, allow_redirects=False, timeout=10)
        if r.status_code != 200:
            return (url, r.status_code, r.headers.get('Location', ''))
        return None
    except Exception as e:
        return (url, "Error", str(e))

issues = []
with concurrent.futures.ThreadPoolExecutor(max_workers=50) as executor:
    results = executor.map(check_url, urls)
    for res in results:
        if res:
            issues.append(res)

print("ISSUES FOUND:")
for issue in issues:
    print(issue)
