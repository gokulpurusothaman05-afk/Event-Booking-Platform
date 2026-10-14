import glob, re

pages = ['index.html', 'venues.html', 'services.html', 'enterprise.html', 'pricing.html', '404.html']

for p in pages:
    content = open(p, 'r', encoding='utf-8').read()
    hdr = re.search(r'<header class="site-header".*?</header>', content, re.DOTALL)
    ftr = re.search(r'<footer class="site-footer".*?</footer>', content, re.DOTALL)
    
    print(f'=== {p} ===')
    if hdr:
        # Check active link in header
        active_links = re.findall(r'<a[^>]*class="[^"]*active[^"]*"[^>]*>.*?</a>', hdr.group(0))
        print(f'  Header length: {len(hdr.group(0))}, Active nav: {active_links}')
    else:
        print('  NO HEADER')
        
    if ftr:
        has_social = 'social-circle-link' in ftr.group(0)
        has_news = 'newsletter-box' in ftr.group(0)
        print(f'  Footer length: {len(ftr.group(0))}, Social: {has_social}, Newsletter: {has_news}')
    else:
        print('  NO FOOTER')
