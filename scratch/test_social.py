import glob, re

for f in ['index.html', 'venues.html', 'services.html', 'enterprise.html', 'pricing.html', '404.html']:
    c = open(f, 'r', encoding='utf-8').read()
    links = re.findall(r'<a[^>]*social-circle-link[^>]*>', c)
    all_404 = all('404.html' in l for l in links)
    print(f"{f}: {len(links)} social links found, all pointing to 404.html: {all_404}")
